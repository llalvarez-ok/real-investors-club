#!/usr/bin/env python3
"""Shorts verticales (1080x1920) a partir de los clips del avatar de una lección ya montada con montar_avatar.py.

    python herramientas/crear_shorts.py produccion/<id>/shorts.json produccion/<id>/avatar.json <dir clips> <dir montaje> <dir salida>

<dir montaje> es el dir de trabajo de montar_avatar.py (usa sus láminas y los clips de escena con animación o zoom).
Cada Short: arriba el gancho y la lámina (o el clip de la escena), abajo el avatar, subtítulos grandes palabra por
palabra (la palabra que se dice va en oro), el aviso legal fijo y, en los últimos segundos, la invitación a la lección.
"""
import json
import os
import re
import subprocess
import sys

from montar_avatar import corregir, tramos_de_voz, transcribir
from producir_leccion import FPS, RAIZ, sh

W, H = 1080, 1920
PANEL = (40, 330, 1000, 563)  # x, y, ancho, alto de la lámina
AVATAR_Y, AVATAR_RECORTE_Y = 950, 170  # dónde va el avatar y desde qué altura del clip vertical se toma
CTA_SEG = 2.6
ORO, BLANCO = "&H008CC6E2&", "&H00F9F1EC&"  # #e2c68c y #ecf1f9 en BGR de ASS


def html_plantilla(texto, kicker):
    t = re.sub(r"\*\*(.+?)\*\*", r'<span class="oro">\1</span>', texto)
    x, y, w, h = PANEL
    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=IBM+Plex+Mono:wght@600&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:{W}px;height:{H}px;overflow:hidden;background:linear-gradient(170deg,#071426 0%,#0d2142 100%);color:#ecf1f9}}
.grid{{position:absolute;inset:0;background-image:linear-gradient(rgba(91,155,216,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(91,155,216,.06) 1px,transparent 1px);background-size:60px 60px}}
#logo{{position:absolute;left:40px;top:44px}} #logo svg{{height:54px;width:auto}}
.kicker{{position:absolute;right:40px;top:58px;font-family:'IBM Plex Mono',monospace;font-size:24px;letter-spacing:.2em;color:#e2c68c;text-transform:uppercase}}
h1{{position:absolute;left:40px;right:40px;top:128px;height:180px;display:flex;align-items:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:76px;line-height:1.05}}
.oro{{background:linear-gradient(180deg,#e2c68c,#c7a35e 46%,#8e7140);-webkit-background-clip:text;background-clip:text;color:transparent}}
.panel{{position:absolute;left:{x - 4}px;top:{y - 4}px;width:{w + 8}px;height:{h + 8}px;border:4px solid #274a80;border-radius:22px}}
</style></head><body><div class="grid"></div><div id="logo"></div><div class="kicker">{kicker}</div>
<h1><span>{t}</span></h1><div class="panel"></div></body></html>"""


def plantilla(texto, kicker, destino):
    html = destino[:-4] + ".html"
    open(html, "w", encoding="utf-8").write(html_plantilla(texto, kicker))
    sh("node", os.path.join(RAIZ, "herramientas", "miniatura.js"), html, destino, str(W), str(H))


def fundido(destino):
    """Degradé del azul del fondo a transparente, para que el borde superior del avatar no sea un corte seco."""
    from PIL import Image
    img = Image.new("RGBA", (W, 140))
    for yy in range(140):
        a = int(255 * (1 - yy / 139) ** 1.6)
        for xx in range(W):
            img.putpixel((xx, yy), (0x0b, 0x1c, 0x38, a))
    img.save(destino)


def ts(t):
    h, r = divmod(max(t, 0), 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02}:{s:05.2f}"


def ass(palabras, dur, destino):
    """Subtítulos de 1 a 3 palabras, con la que se está diciendo en oro, y el aviso legal fijo abajo."""
    grupos, actual = [], []
    for p in palabras:
        actual.append(p)
        largo = sum(len(q["texto"]) + 1 for q in actual)
        if len(actual) == 3 or largo > 18 or re.search(r"[.,:;?!]$", p["texto"]):
            grupos.append(actual)
            actual = []
    if actual:
        grupos.append(actual)
    filas = []
    for gi, g in enumerate(grupos):
        fin_grupo = min(g[-1]["fin"] + 0.25, grupos[gi + 1][0]["ini"] if gi + 1 < len(grupos) else dur)
        for i, p in enumerate(g):
            a = p["ini"] if i else max(p["ini"], filas[-1][1] if filas else 0)
            b = g[i + 1]["ini"] if i + 1 < len(g) else fin_grupo
            texto = " ".join((f"{{\\c{ORO}}}{q['texto']}{{\\c{BLANCO}}}" if j == i else q["texto"]) for j, q in enumerate(g))
            filas.append((a, max(b, a + 0.05), texto))
    with open(destino, "w", encoding="utf-8") as fh:
        fh.write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Archivo Black,82,{BLANCO},{BLANCO},&H00071426&,&H96071426&,0,0,0,0,100,100,0,0,1,7,3,2,60,60,210,1
Style: Aviso,IBM Plex Sans SemiBold,26,&H00D1B5A3&,&H00D1B5A3&,&H00071426&,&HAA071426&,0,0,0,0,100,100,0,0,3,10,0,2,40,40,34,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,{ts(0)},{ts(dur)},Aviso,,0,0,0,,Contenido educativo. No constituye recomendación de inversión.
""")
        for a, b, t in filas:
            fh.write(f"Dialogue: 1,{ts(a)},{ts(b)},Sub,,0,0,0,,{t}\n")


def tramo_mp4(t, base, cfg_avatar, dir_clips, dir_montaje, laminas, trabajo, idx):
    """Un tramo del Short: plantilla + panel (lámina o clip de escena) + avatar + voz. Devuelve (mp4, palabras, dur)."""
    n = t["escena"]
    raw = os.path.join(dir_clips, n + ".mp4")
    a_n = tramos_de_voz(raw)[0][0]  # donde empieza la voz en el montaje de la lección
    desde = a_n if t["desde"] is None else t["desde"]
    hasta = t["hasta"]
    dur = hasta - desde
    crudas = transcribir(raw, os.path.join(dir_montaje, "audio", n + "-whisper.json"))
    arreglos = [(v, nueva) for esc, v, nueva in cfg_avatar.get("correcciones_subtitulos", []) if esc == n]
    palabras = []
    for p in corregir(crudas, arreglos):
        # whisper estira la primera palabra sobre el silencio inicial: cuenta si termina dentro del tramo
        if (desde <= p["ini"] < hasta) or (p["ini"] < desde < p["fin"] and p["fin"] - desde > 0.15):
            palabras.append({**p, "ini": max(0.0, p["ini"] - desde), "fin": min(dur, p["fin"] - desde)})
    x, y, w, h = PANEL
    if t["panel"] == "clip":
        panel = ["-ss", f"{desde - a_n:.3f}", "-t", f"{dur:.3f}", "-i", os.path.join(dir_montaje, "clips", n + ".mp4")]
        filtro_panel = f"[1:v]fps={FPS},scale={w}:{h},setpts=PTS-STARTPTS[pan]"
    else:
        panel = ["-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", laminas[int(n) - 1]]
        filtro_panel = f"[1:v]scale={w}:{h}[pan]"
    destino = os.path.join(trabajo, f"tramo-{idx:02}.mp4")
    filtro = (f"{filtro_panel};[2:v]fps={FPS},crop={W}:{H - AVATAR_Y}:0:{AVATAR_RECORTE_Y},setpts=PTS-STARTPTS[av];"
              f"[0:v][av]overlay=0:{AVATAR_Y}[f1];[f1][3:v]overlay=0:{AVATAR_Y - 4}[f2];"
              f"[f2][pan]overlay={x}:{y},format=yuv420p[v];"
              f"[2:a]asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st={dur - 0.06:.3f}:d=0.06[a]")
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", base,
       *panel, "-ss", f"{desde:.3f}", "-t", f"{dur:.3f}", "-i", raw, "-loop", "1", "-i", os.path.join(trabajo, "fundido.png"),
       "-filter_complex", filtro, "-map", "[v]", "-map", "[a]", "-t", f"{dur:.3f}",
       "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)
    return destino, palabras, dur


def main():
    cfg_path, avatar_path, dir_clips, dir_montaje, salida = (os.path.abspath(x) for x in sys.argv[1:6])
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    cfg_avatar = json.load(open(avatar_path, encoding="utf-8"))
    laminas = [l["png"] for l in json.load(open(os.path.join(dir_montaje, "laminas", "laminas.json"), encoding="utf-8"))]
    os.makedirs(salida, exist_ok=True)
    informe = []
    for s in cfg["shorts"]:
        trabajo = os.path.join(salida, "trabajo", s["id"])
        os.makedirs(trabajo, exist_ok=True)
        base, cta = os.path.join(trabajo, "base.png"), os.path.join(trabajo, "cta.png")
        plantilla(s["gancho"], "Real Investors Club", base)
        plantilla(cfg["cta"].replace("lección completa", "**lección completa**"), "Real Investors Club", cta)
        fundido(os.path.join(trabajo, "fundido.png"))
        partes, palabras, t0 = [], [], 0.0
        for i, t in enumerate(s["tramos"]):
            mp4, pal, dur = tramo_mp4(t, base, cfg_avatar, dir_clips, dir_montaje, laminas, trabajo, i)
            partes.append(mp4)
            palabras += [{**p, "ini": p["ini"] + t0, "fin": p["fin"] + t0} for p in pal]
            t0 += dur
        ass(palabras, t0, os.path.join(trabajo, "subs.ass"))
        destino = os.path.join(salida, s["id"] + ".mp4")
        entradas = sum((["-i", p] for p in partes), [])
        k = len(partes)
        filtro = ("".join(f"[{i}:v][{i}:a]" for i in range(k)) + f"concat=n={k}:v=1:a=1[v0][a];"
                  f"[{k}:v]crop={W}:{PANEL[1] - 10}:0:0[cta];"
                  f"[v0][cta]overlay=0:0:enable='gte(t,{t0 - CTA_SEG:.3f})',"
                  f"subtitles='{os.path.join(trabajo, 'subs.ass')}',format=yuv420p[v]")
        sh("ffmpeg", "-loglevel", "error", "-y", *entradas, "-loop", "1", "-i", cta, "-filter_complex", filtro,
           "-map", "[v]", "-map", "[a]", "-t", f"{t0:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
           "-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", destino)
        informe.append({"short": s["id"], "duracion_s": round(t0, 2), "titulo": s["titulo_youtube"],
                        "texto": " ".join(p["texto"] for p in palabras)})
        print(s["id"], round(t0, 1), "s", flush=True)
    json.dump(informe, open(os.path.join(salida, "shorts.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
