#!/usr/bin/env python3
"""Voz grabada por Lean (una toma de corrido) en lugar de la voz sintética, para un Reel/Short «expediente cine».

    HF_HUB_DISABLE_XET=1 SSL_CERT_FILE=/root/.ccr/ca-bundle.crt \
    python herramientas/cine/voz_grabada.py produccion/<id>/guion.json <audio> <dir de trabajo> [correcciones.json]

1. Sonido de estudio, estilo stream: reducción de ruido, filtro de graves, compuerta suave, compresión, ecualización
   (cuerpo, menos «caja», presencia y aire), de-esser, una reverb de sala corta y limitador.
2. Whisper (con tiempos por palabra) sobre toda la toma; cada palabra dicha se alinea con las del guion para saber a qué
   bloque pertenece (Lean puede cambiar palabras: lo que manda es el audio).
3. Corta un WAV por bloque y achica los silencios largos (más de 0,34 s → 0,22 s).
4. Vuelve a transcribir cada bloque ya cortado y arma tiempos-ig/yt.json y .js como herramientas/cine/voz.py:
   "palabras" sigue los índices del guion (la escena se ata a esas palabras, con data-w) y "subs" es lo que se dice de verdad.
   correcciones.json (opcional): {"*": {"oye whisper": "va en pantalla"}, "02": {...}} (por bloque); "" la saca del subtítulo.
   Los números se juntan solos («6» «.300» «millones» → «US$ 6.300 M»).
"""
import difflib, json, os, re, subprocess, sys
import numpy as np
from pedalboard import Pedalboard, NoiseGate, Compressor, LowShelfFilter, PeakFilter, HighShelfFilter, Reverb, Limiter, Gain
from faster_whisper import WhisperModel

R = 48000


def norm(s): return re.sub(r"[^\wáéíóúñü]", "", s.lower().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u"))


def leer(f):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(R), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def escribir(f, x):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(R), "-ac", "1", "-i", "-", "-c:a", "pcm_s16le", f],
                   input=np.clip(x, -1, 1).astype(np.float32).tobytes(), check=True)


def estudio(f, salida):
    """La cadena de estudio. Primero ffmpeg (ruido, graves, de-esser), después pedalboard."""
    tmp = salida + ".pre.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-ac", "1", "-ar", str(R), "-af",
                    "adeclip,highpass=f=75,afftdn=nr=12:nf=-48:tn=1,deesser=i=0.35:m=0.5:f=0.5", tmp], check=True)
    x = leer(tmp); os.remove(tmp)
    x = x / (np.abs(x).max() + 1e-9) * .7
    seco = Pedalboard([
        NoiseGate(threshold_db=-48, ratio=2.5, attack_ms=2, release_ms=180),
        LowShelfFilter(cutoff_frequency_hz=140, gain_db=2.5),
        PeakFilter(cutoff_frequency_hz=320, gain_db=-3, q=1.1),
        PeakFilter(cutoff_frequency_hz=3400, gain_db=2.5, q=.8),
        HighShelfFilter(cutoff_frequency_hz=9500, gain_db=2.5),
        Compressor(threshold_db=-20, ratio=3.5, attack_ms=4, release_ms=90),
        Gain(gain_db=4),
    ])(x, R)
    # reverb de sala chica (la de un estudio de stream): poca y oscura, para que no suene a baño
    sala = Pedalboard([Reverb(room_size=.2, damping=.65, wet_level=1, dry_level=0, width=.6), PeakFilter(cutoff_frequency_hz=5000, gain_db=-4, q=.7)])(seco, R)
    y = seco + sala * .11
    y = Pedalboard([Limiter(threshold_db=-2, release_ms=80)])(y, R)
    return y


def silencios(x, a, b, umbral_db=None, minimo=.34, queda=.22):
    """Tramos de x[a:b] a recortar: silencios de más de `minimo` s que quedan en `queda` s."""
    v = int(.02 * R); seg = x[a:b]; n = len(seg) // v
    e = 20 * np.log10(np.sqrt((seg[:n * v].reshape(n, v) ** 2).mean(1)) + 1e-9)
    if umbral_db is None: umbral_db = np.percentile(e, 8) + 9  # el piso de ruido de esta toma, más 9 dB
    cortes, i = [], 0
    while i < n:
        if e[i] < umbral_db:
            j = i
            while j < n and e[j] < umbral_db: j += 1
            if (j - i) * v / R > minimo:
                d = (j - i) * v - int(queda * R); c = a + i * v + int(queda * R / 2)
                cortes.append((c, c + d))
            i = j
        else: i += 1
    return cortes


def main():
    guion, audio, trabajo = sys.argv[1:4]
    corr = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}
    g = json.load(open(guion, encoding="utf-8")); os.makedirs(f"{trabajo}/voz", exist_ok=True)
    x = estudio(audio, f"{trabajo}/estudio.wav"); escribir(f"{trabajo}/estudio.wav", x)
    m = WhisperModel("medium", device="cpu", compute_type="int8")
    pista = ", ".join(sorted({w for b in g["bloques"] for w in re.findall(r"[A-ZÁÉÍÓÚ][\wáéíóú]+", b["voz"])}))
    def oir(seg):
        a16 = np.interp(np.arange(int(len(seg) * 16000 / R)) * R / 16000, np.arange(len(seg)), seg).astype(np.float32)
        ss, _ = m.transcribe(a16, language="es", word_timestamps=True, beam_size=5, initial_prompt=pista, vad_filter=True)
        return [[w.start, w.end, w.word.strip()] for s in ss for w in s.words]
    dicho = oir(x)
    # a qué bloque pertenece cada palabra dicha: alineación con el guion completo
    gw = [(b["id"], k, w) for b in g["bloques"] for k, w in enumerate(b["voz"].split())]
    sm = difflib.SequenceMatcher(None, [norm(w[2]) for w in dicho], [norm(w[2]) for w in gw], autojunk=False)
    blq = [None] * len(dicho)
    for a, b2, n in sm.get_matching_blocks():
        for k in range(n): blq[a + k] = gw[b2 + k][0]
    i = 0
    while i < len(blq):  # tramos de palabras que no coinciden con el guion (Lean cambió algo)
        if blq[i] is not None: i += 1; continue
        j = i
        while j < len(blq) and blq[j] is None: j += 1
        corte = i == 0 or dicho[i][0] - dicho[i - 1][1] > .4 or re.search(r"[.?!]$", dicho[i - 1][2])
        q = (blq[j] if j < len(blq) else blq[i - 1]) if corte else blq[i - 1]  # después de una pausa abren el bloque siguiente
        for k in range(i, j): blq[k] = q
        i = j
    json.dump([[w[0], w[1], w[2], q] for w, q in zip(dicho, blq)], open(f"{trabajo}/dicho.json", "w"), ensure_ascii=False)
    tiempos = {}
    for v in ("ig", "yt"):
        t, bl = .15, []
        for b in g["bloques"]:
            if b.get("solo") and b["solo"] != v: continue
            ws = [w for w, q in zip(dicho, blq) if q == b["id"]]
            ia, ib = int(max(0, ws[0][0] - .12) * R), int(min(len(x) / R, ws[-1][1] + .3) * R)
            seg = x[ia:ib]
            for c0, c1 in reversed(silencios(x, ia, ib)):
                c0, c1 = c0 - ia, c1 - ia; f = int(.015 * R)
                seg = np.concatenate([seg[:c0], seg[c0:c0 + f] * np.linspace(1, 0, f) + seg[c1:c1 + f] * np.linspace(0, 1, f), seg[c1 + f:]])
            seg[-int(.08 * R):] *= np.linspace(1, 0, int(.08 * R))
            escribir(f"{trabajo}/voz/{b['id']}.wav", seg)
            pal = oir(seg); dur = len(seg) / R
            # subtítulos: lo que se dice, con las correcciones de pantalla
            pant = {**corr.get("*", {}), **corr.get(b["id"][:2], {})}
            subs = []
            for a0, a1, w in pal:
                if subs and re.match(r"^[.,%]\d*%?[.,?]?$", w):  # «6» + «.300», «40» + «%»
                    subs[-1][1] = round(t + a1, 3); subs[-1][2] += w if w[0] != "%" else " %"; continue
                k = pant.get(w, w)
                if k: subs.append([round(t + a0, 3), round(t + a1, 3), k])
            for i in range(len(subs) - 1, 0, -1):  # «6.300» + «millones» → «US$ 6.300 M»
                if re.fullmatch(r"[\d.]+", subs[i - 1][2]) and norm(subs[i][2]) == "millones":
                    subs[i - 1] = [subs[i - 1][0], subs[i][1], f"US$ {subs[i - 1][2]} M" + re.sub(r"[\wáéíóú]", "", subs[i][2])]; del subs[i]
            # palabras del guion con el tiempo de la palabra dicha que les corresponde (o interpolado)
            gv = b["voz"].split(); s2 = difflib.SequenceMatcher(None, [norm(w) for w in gv], [norm(w[2]) for w in pal], autojunk=False)
            ti = [None] * len(gv)
            for a, c, n in s2.get_matching_blocks():
                for k in range(n): ti[a + k] = (pal[c + k][0], pal[c + k][1])
            conocidos = [k for k in range(len(gv)) if ti[k]]
            for k in range(len(gv)):
                if ti[k] is None:
                    ant = max([q for q in conocidos if q < k], default=None); sig = min([q for q in conocidos if q > k], default=None)
                    t0 = ti[ant][1] if ant is not None else 0; t1 = ti[sig][0] if sig is not None else dur - .3
                    na = ant if ant is not None else -1; ns = sig if sig is not None else len(gv)
                    p0 = t0 + (t1 - t0) * (k - na - 1) / max(1, ns - na - 1); ti[k] = (p0, p0 + .2)
            palabras = [[round(t + a, 3), round(t + c, 3), w] for (a, c), w in zip(ti, gv)]
            bl.append({"id": b["id"], "nombre": b["id"], "ini": round(t, 3), "dur": round(dur, 3), "etiqueta": b.get("etiqueta", ""),
                       "palabras": palabras, "subs": subs, "dicho": " ".join(w[2] for w in pal)})
            print(v, b["id"], f"{dur:.2f} s ·", " ".join(w[2] for w in pal), flush=True)
            t += dur + b.get("pausa", .3) * .6
        T = {"total": round(t + .2, 2), "voz_grabada": True, "bloques": bl}
        json.dump(T, open(f"{trabajo}/tiempos-{v}.json", "w"), ensure_ascii=False)
        open(f"{trabajo}/tiempos-{v}.js", "w").write("window.T=" + json.dumps(T, ensure_ascii=False) + ";")
        print(v, "total", T["total"])


if __name__ == "__main__":
    main()
