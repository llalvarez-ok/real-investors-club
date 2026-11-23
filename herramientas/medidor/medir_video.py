#!/usr/bin/env python3
"""Medidor de Reels y Shorts: mide lo que se puede medir de un video corto y lo compara contra referencias.

    venv-qwen/bin/python herramientas/medidor/medir_video.py <salida_dir> nuestro1.mp4 [nuestro2.mp4 ...] [--refs ref1.mp4 ref2.mp4 ...]

Qué mide (por video):
- cortes: PySceneDetect (BSD-3), ContentDetector. Da la cantidad, los cortes por minuto, el largo medio de
  toma y el segundo del primer corte.
- cara: detector Haar de OpenCV (Apache-2.0) a 2 cuadros/s. Da el % del video con una cara, si hay cara en el
  primer medio segundo y el tamaño medio de la cara.
- voz: faster-whisper con tiempos por palabra. Da el segundo en que arranca la voz, las palabras dichas en los
  primeros 3 s, las palabras por minuto, la frase del gancho y el silencio más largo.
- cambio visual: diferencia media entre cuadros por segundo. Da el % de segundos casi quietos.
- cuadro 0: brillo, contraste y «colorido» (métrica de Hasler y Süsstrunk).
- volumen: LUFS integrado (ffmpeg ebur128).
Además deja una hoja con los cuadros de 0; 0,5; 1; 2; 3; 5 y 8 s de cada video, para mirarla al lado de las referencias.

Idea tomada de riccivr/retention-analyzer (MIT): cortes por minuto, largo de toma y primer corte. La clasificación del
gancho sigue la taxonomía de thec0urier/reelscan (MIT): pregunta, impacto, demostración, transformación, polémica,
historia, lista, tendencia. La hace una persona o el agente mirando la hoja; este script no la adivina.
Los modelos de calidad «estética» que existen (DOVER) son de uso no comercial: no se usan.
"""
import json, os, re, subprocess, sys
import numpy as np, cv2


def sh(args):
    return subprocess.run(args, capture_output=True, text=True)


def duracion(f):
    r = sh(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f])
    return float(r.stdout.strip())


def cortes(f):
    from scenedetect import detect, ContentDetector
    escenas = detect(f, ContentDetector(threshold=27.0), show_progress=False)
    return [s[0].get_seconds() for s in escenas[1:]]


def lufs(f):
    r = sh(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128", "-f", "null", "-"])
    m = re.findall(r"I:\s+(-?\d+\.\d)\s+LUFS", r.stderr)
    return float(m[-1]) if m else None


def cuadros(f, fps=2):
    cap = cv2.VideoCapture(f); vfps = cap.get(cv2.CAP_PROP_FPS) or 30
    paso = max(1, round(vfps / fps)); i = 0; out = []
    while True:
        ok, im = cap.read()
        if not ok: break
        if i % paso == 0: out.append((i / vfps, im))
        i += 1
    cap.release(); return out


def colorido(im):
    b, g, r = [x.astype(float) for x in cv2.split(im)]
    rg = r - g; yb = 0.5 * (r + g) - b
    return float(np.sqrt(rg.std() ** 2 + yb.std() ** 2) + 0.3 * np.sqrt(rg.mean() ** 2 + yb.mean() ** 2))


YUNET = os.path.join(os.path.dirname(__file__), "modelos", "yunet.onnx")
YUNET_URL = "https://huggingface.co/opencv/face_detection_yunet/resolve/main/face_detection_yunet_2023mar.onnx"


def caras(muestras):
    # YuNet (OpenCV Zoo, MIT): OpenCV 5 ya no trae los detectores Haar
    if not os.path.exists(YUNET):
        os.makedirs(os.path.dirname(YUNET), exist_ok=True)
        subprocess.run(["curl", "-sL", "-m", "120", "-o", YUNET, YUNET_URL], check=True)
    det = None; con = []; areas = []
    for t, im in muestras:
        h, w = im.shape[:2]; esc = 480 / max(h, w); im2 = cv2.resize(im, (int(w * esc), int(h * esc)))
        if det is None: det = cv2.FaceDetectorYN.create(YUNET, "", (im2.shape[1], im2.shape[0]), 0.8)
        _, fs = det.detect(im2); fs = [] if fs is None else fs
        con.append((t, len(fs) > 0))
        if len(fs): areas.append(max(f[2] * f[3] for f in fs) / (im2.shape[0] * im2.shape[1]))
    pct = 100 * sum(c for _, c in con) / max(1, len(con))
    inicio = any(c for t, c in con if t <= 0.5)
    return round(pct, 1), inicio, round(100 * float(np.mean(areas)), 1) if areas else 0.0


def cambio(muestras):
    difs = []
    prev = None
    for t, im in muestras:
        g = cv2.resize(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), (270, 480)).astype(float)
        if prev is not None: difs.append(float(np.abs(g - prev).mean()))
        prev = g
    difs = np.array(difs) if difs else np.zeros(1)
    return round(float(difs.mean()), 2), round(100 * float((difs < 1.0).mean()), 1)


def voz(f, modelo):
    tmp = f + ".16k.wav"
    sh(["ffmpeg", "-v", "error", "-y", "-i", f, "-ar", "16000", "-ac", "1", tmp])
    import soundfile as sf
    x, _ = sf.read(tmp, dtype="float32"); os.remove(tmp)
    segs, _ = modelo.transcribe(x, language="es", word_timestamps=True, vad_filter=True)
    ws = [w for s in segs for w in s.words]
    if not ws: return dict(arranque=None, palabras_3s=0, ppm=0, gancho="", silencio_max=None, texto="")
    gaps = [ws[i + 1].start - ws[i].end for i in range(len(ws) - 1)]
    habla = ws[-1].end - ws[0].start
    texto = " ".join(w.word.strip() for w in ws)
    gancho = " ".join(w.word.strip() for w in ws if w.start < 3.0)
    return dict(arranque=round(ws[0].start, 2), palabras_3s=sum(1 for w in ws if w.start < 3.0),
                ppm=round(60 * len(ws) / max(1, habla)), gancho=gancho,
                silencio_max=round(max(gaps), 2) if gaps else 0, texto=texto)


def hoja(f, salida, alto=480):
    ts = [0, 0.5, 1, 2, 3, 5, 8]; imgs = []
    cap = cv2.VideoCapture(f)
    for t in ts:
        cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000); ok, im = cap.read()
        if not ok: im = np.zeros((alto, int(alto * 9 / 16), 3), np.uint8)
        im = cv2.resize(im, (int(im.shape[1] * alto / im.shape[0]), alto))
        cv2.putText(im, f"{t:g}s", (8, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
        imgs.append(im)
    cap.release(); cv2.imwrite(salida, np.hstack(imgs), [cv2.IMWRITE_JPEG_QUALITY, 85])


def medir(f, modelo, outdir):
    d = duracion(f); c = cortes(f); m = cuadros(f)
    pct, ini, area = caras(m); dif, quietos = cambio(m)
    im0 = m[0][1] if m else None
    nombre = os.path.splitext(os.path.basename(f))[0]
    hoja(f, os.path.join(outdir, f"hoja-{nombre}.jpg"))
    r = dict(video=os.path.basename(f), duracion=round(d, 1),
             cortes=len(c), cortes_por_min=round(60 * len(c) / d, 1), toma_media=round(d / (len(c) + 1), 2),
             primer_corte=round(c[0], 2) if c else None,
             cara_pct=pct, cara_en_0=ini, cara_area_pct=area,
             cambio_medio=dif, seg_quietos_pct=quietos,
             brillo_0=round(float(cv2.cvtColor(im0, cv2.COLOR_BGR2GRAY).mean()), 1) if im0 is not None else None,
             contraste_0=round(float(cv2.cvtColor(im0, cv2.COLOR_BGR2GRAY).std()), 1) if im0 is not None else None,
             colorido_0=round(colorido(im0), 1) if im0 is not None else None,
             lufs=lufs(f))
    r.update(voz(f, modelo)); return r


CAMPOS = [("duracion", "Duración (s)"), ("cortes_por_min", "Cortes por minuto"), ("toma_media", "Toma media (s)"),
          ("primer_corte", "Primer corte (s)"), ("cara_pct", "% con cara"), ("cara_en_0", "Cara en el cuadro 0"),
          ("cara_area_pct", "Tamaño de la cara (% del cuadro)"), ("seg_quietos_pct", "% de segundos quietos"),
          ("arranque", "Arranque de la voz (s)"), ("palabras_3s", "Palabras en 0–3 s"), ("ppm", "Palabras por minuto"),
          ("silencio_max", "Silencio más largo (s)"), ("colorido_0", "Colorido del cuadro 0"),
          ("contraste_0", "Contraste del cuadro 0"), ("lufs", "LUFS")]


def mediana(vals):
    v = [float(x) for x in vals if isinstance(x, (int, float)) and not isinstance(x, bool)]
    b = [x for x in vals if isinstance(x, bool)]
    if b and len(b) == len(vals): return f"{sum(b)}/{len(b)}"
    return round(float(np.median(v)), 2) if v else "—"


def main():
    a = sys.argv[1:]; outdir = a.pop(0); os.makedirs(outdir, exist_ok=True)
    refs = []
    if "--refs" in a: i = a.index("--refs"); refs = a[i + 1:]; a = a[:i]
    from faster_whisper import WhisperModel
    modelo = WhisperModel("small", device="cpu", compute_type="int8")
    nuestros = [medir(f, modelo, outdir) for f in a]
    referencias = [medir(f, modelo, outdir) for f in refs]
    json.dump(dict(nuestros=nuestros, referencias=referencias), open(os.path.join(outdir, "medidas.json"), "w"),
              ensure_ascii=False, indent=1)
    cab = ["Medida"] + [r["video"] for r in nuestros] + (["Mediana de las referencias"] if referencias else [])
    filas = ["| " + " | ".join(cab) + " |", "|" + "---|" * len(cab)]
    for k, nom in CAMPOS:
        fila = [nom] + [str(r.get(k)) for r in nuestros]
        if referencias: fila.append(str(mediana([r.get(k) for r in referencias])))
        filas.append("| " + " | ".join(fila) + " |")
    filas.append("")
    for r in nuestros + referencias: filas.append(f"- **{r['video']}** · gancho (0–3 s): «{r['gancho']}»")
    open(os.path.join(outdir, "medidas.md"), "w").write("\n".join(filas) + "\n")
    print("\n".join(filas))


if __name__ == "__main__":
    main()
