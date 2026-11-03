#!/usr/bin/env python3
"""Shorts verticales (1080x1920) cortados de un vivo de Lean (grabación de Zoom: TradingView a pantalla completa y su
cámara chica arriba a la derecha).

    python herramientas/vivo_shorts.py produccion/vivos-shorts/<pieza>.json <vivo.mp4> <dir de trabajo> <salida.mp4>

La pieza (JSON) dice: tramos [[desde, hasta], ...] en segundos del vivo; palabras (tiempos absolutos, sacados con
faster-whisper sobre el vivo) con correcciones; gancho (texto arriba, **palabra** en oro); fecha del vivo; y opcional
"insertos": PNGs o un MP4 que se agregan al final antes de la tarjeta de cierre.
Arriba el gancho, en el medio la cámara de Lean agrandada y el gráfico (sin la fila del título, donde aparece el
nombre del bróker), abajo los subtítulos palabra por palabra (la que se dice en oro), y los 380 px de abajo libres.
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H, FPS = 1080, 1920, 30
NOCHE, ORO, TXT, GRIS = (7, 20, 38), (226, 198, 140), (236, 241, 249), (163, 181, 209)
F_TIT = os.path.expanduser("~/.fonts/f1.ttf")   # Archivo Black
F_TXT = os.path.expanduser("~/.fonts/f2.ttf")   # IBM Plex Sans SemiBold
CAM = (1068, 0, 212, 120)        # cámara de Lean en la grabación de 1280x720
GRAF = (100, 192, 1065, 455)     # gráfico, sin la fila del título del símbolo (ahí aparece el bróker)


def sh(*a):
    subprocess.run([str(x) for x in a], check=True)


def fondo(gancho, fecha, ruta):
    im = Image.new("RGB", (W, H), NOCHE)
    d = ImageDraw.Draw(im)
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=(16, 33, 58))
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=(16, 33, 58))
    logo = Image.open(os.path.join(RAIZ, "marca", "logo-oro.png")).convert("RGBA")
    logo = logo.resize((230, int(230 * logo.height / logo.width)), Image.LANCZOS)
    im.paste(logo, (60, 56), logo)
    f = ImageFont.truetype(F_TXT, 30)
    pill = f"EN VIVO · {fecha}"
    tw = d.textlength(pill, font=f)
    x0 = W - 60 - tw - 62
    d.rounded_rectangle([x0, 74, W - 60, 124], 25, fill=(229, 56, 59))
    d.ellipse([x0 + 18, 91, x0 + 34, 107], fill=(255, 255, 255))
    d.text((x0 + 44, 80), pill, font=f, fill=(255, 255, 255))
    # gancho: **palabra** en oro, partido en líneas de hasta ~16 caracteres
    ft = ImageFont.truetype(F_TIT, 76)
    tokens = []
    for i, trozo in enumerate(gancho.split("**")):
        for p in trozo.split():
            tokens.append((p, i % 2 == 1))
    ancho = lambda ts: d.textlength(" ".join(x[0] for x in ts), font=ft)
    if ancho(tokens) <= W - 120:
        lineas = [tokens]
    else:  # dos líneas parejas
        k = min(range(1, len(tokens)), key=lambda i: max(ancho(tokens[:i]), ancho(tokens[i:])))
        lineas = [tokens[:k], tokens[k:]]
    y = 200
    for l in lineas:
        x = (W - d.textlength(" ".join(p for p, _ in l), font=ft)) / 2
        for p, oro in l:
            d.text((x, y), p, font=ft, fill=ORO if oro else TXT)
            x += d.textlength(p + " ", font=ft)
        y += 92
    fa = ImageFont.truetype(F_TXT, 24)
    aviso = "Contenido educativo. No es recomendación de inversión."
    d.text(((W - d.textlength(aviso, font=fa)) / 2, 1505), aviso, font=fa, fill=GRIS)
    im.save(ruta)
    return y


def cierre(ruta):
    im = Image.new("RGB", (W, H), NOCHE)
    d = ImageDraw.Draw(im)
    logo = Image.open(os.path.join(RAIZ, "marca", "logo-oro.png")).convert("RGBA")
    logo = logo.resize((640, int(640 * logo.height / logo.width)), Image.LANCZOS)
    im.paste(logo, ((W - 640) // 2, 560), logo)
    ft = ImageFont.truetype(F_TIT, 64)
    for txt, y, col in [("Real Investors Club", 960, TXT), ("Suscribite", 1060, ORO)]:
        d.text(((W - d.textlength(txt, font=ft)) / 2, y), txt, font=ft, fill=col)
    im.save(ruta)


def ass(palabras, tramos, ruta):
    """Subtítulos palabra por palabra: frases de hasta 4 palabras, la que suena en oro. Tiempos llevados al corte."""
    def a_corte(t):
        acum = 0
        for a, b in tramos:
            if a <= t <= b:
                return acum + (t - a)
            acum += b - a
        return None
    ws = [(a_corte(p["a"]), a_corte(p["b"]), p["p"]) for p in palabras]
    ws = [w for w in ws if w[0] is not None and w[1] is not None]
    cab = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,Archivo Black,70,&H00F9F1EC,&H00F9F1EC,&H00260E07,&H00000000,0,0,0,0,100,100,0,0,1,6,0,5,60,60,0

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    tc = lambda s: f"{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}"
    ev = []
    grupos = [ws[i:i + 4] for i in range(0, len(ws), 4)]
    for g in grupos:
        for j, (a, b, _) in enumerate(g):
            fin = g[j + 1][0] if j + 1 < len(g) else b + 0.25
            partes = [("{\\c&H008CC6E2&}" + p + "{\\c&H00F9F1EC&}") if k == j else p for k, (_, _, p) in enumerate(g)]
            ev.append(f"Dialogue: 0,{tc(a)},{tc(fin)},S,,0,0,0,,{{\\pos(540,1390)}}" + " ".join(partes))
    open(ruta, "w").write(cab + "\n".join(ev) + "\n")


def main():
    pieza, vivo, trab, salida = sys.argv[1:5]
    cfg = json.load(open(pieza))
    os.makedirs(trab, exist_ok=True)
    tramos = cfg["tramos"]
    dur = sum(b - a for a, b in tramos)
    y_gancho = fondo(cfg["gancho"], cfg["fecha"], f"{trab}/fondo.png")
    cierre(f"{trab}/cierre.png")
    ass(cfg["palabras"], tramos, f"{trab}/subs.ass")
    # 1) cortes del vivo unidos (video y audio)
    fc, n = [], len(tramos)
    for i, (a, b) in enumerate(tramos):
        fc.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[a{i}]")
    fc.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[vc][ac]")
    cx, cy, cw, ch = CAM
    gx, gy, gw, gh = GRAF
    cam_w = 720
    cam_h = int(cam_w * ch / cw)
    cam_y = max(y_gancho + 30, 430)
    graf_h = int(W * gh / gw)
    graf_y = cam_y + cam_h + 40
    fc.append(f"[vc]split[s1][s2];[s1]crop={cw}:{ch}:{cx}:{cy},scale={cam_w}:{cam_h}:flags=lanczos,unsharp=5:5:0.8,"
              f"pad={cam_w + 12}:{cam_h + 12}:6:6:color=0xC7A35E[cam];"
              f"[s2]crop={gw}:{gh}:{gx}:{gy},scale={W}:{graf_h}:flags=lanczos[gra];"
              f"[1:v][cam]overlay={(W - cam_w - 12) // 2}:{cam_y}[f1];[f1][gra]overlay=0:{graf_y},"
              f"ass={trab}/subs.ass,fps={FPS},format=yuv420p[vf]")
    fc.append("[ac]highpass=f=80,afftdn=nf=-25,acompressor=threshold=-20dB:ratio=3:attack=8:release=150:makeup=3,"
              "loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000[af]")
    sh("ffmpeg", "-loglevel", "error", "-y", "-i", vivo, "-loop", "1", "-t", dur, "-i", f"{trab}/fondo.png",
       "-filter_complex", ";".join(fc), "-map", "[vf]", "-map", "[af]", "-t", dur,
       "-c:v", "libx264", "-crf", "17", "-preset", "medium", "-c:a", "aac", "-b:a", "192k", f"{trab}/cuerpo.mp4")
    # 2) insertos opcionales y tarjeta de cierre (2,5 s), con el mismo formato
    partes = [f"{trab}/cuerpo.mp4"]
    for i, ins in enumerate(cfg.get("insertos", [])):
        partes.append(ins)
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-t", 2.5, "-i", f"{trab}/cierre.png", "-f", "lavfi", "-t", 2.5,
       "-i", "anullsrc=r=48000:cl=stereo", "-vf", f"fps={FPS},format=yuv420p", "-c:v", "libx264", "-crf", "17",
       "-c:a", "aac", "-b:a", "192k", "-shortest", f"{trab}/cierre.mp4")
    partes.append(f"{trab}/cierre.mp4")
    ins = []
    for p in partes:
        ins += ["-i", p]
    fcc = "".join(f"[{i}:v][{i}:a]" for i in range(len(partes))) + f"concat=n={len(partes)}:v=1:a=1[v][a]"
    sh("ffmpeg", "-loglevel", "error", "-y", *ins, "-filter_complex", fcc, "-map", "[v]", "-map", "[a]",
       "-c:v", "libx264", "-crf", "17", "-preset", "medium", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", salida)
    print(salida)


if __name__ == "__main__":
    main()
