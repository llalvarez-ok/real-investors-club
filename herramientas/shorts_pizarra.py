#!/usr/bin/env python3
"""Shorts de YouTube y reels de Instagram (1080x1920) a partir de un video pilar de pizarra ya montado.

    python herramientas/shorts_pizarra.py produccion/<id>/shorts.json <video.mp4> <dir de trabajo> <dir salida>

<dir de trabajo> es el de la voz (audio/NN.json, audio/pNN.wav), para los tiempos de cada palabra.
Cada pieza de shorts.json toma uno o más tramos de escenas completas ("tramos": [[desde, hasta], ...], números de
escena del guion) y arma: arriba el logo y el gancho; en el medio el centro del video (1600x1080, achicado);
abajo los subtítulos grandes palabra por palabra (la palabra que se dice va en rojo); el aviso legal fijo; y en los
últimos segundos la invitación al video completo ("cta" de la pieza, o el de su formato).
"formato": "youtube" (Short) o "instagram" (reel). Los dos dejan libres los 380 px de abajo y el costado derecho,
donde cada app pone sus botones.
"""
import json
import os
import re
import subprocess
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H, FPS = 1080, 1920, 30
PANEL_Y, PANEL_H, RECORTE = 470, 729, 1600  # el centro de 1600x1080 del video, achicado a 1080 de ancho
AIRE = 0.15                  # el de unir_voz.sh
CTA_SEG = 2.8
ROJO, TINTA = "&H003F3AD9&", "&H003D2114&"  # #d93a3f y #14213d en BGR de ASS
CTA = {"youtube": "Mira el video **completo** en el canal", "instagram": "Video **completo** en YouTube · link en la bio"}


def sh(*a):
    subprocess.run(a, check=True)


def duracion(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True, check=True).stdout)


def escenas(trabajo):
    """Inicio, duración y palabras (con su texto original) de cada escena, en segundos del video."""
    res, ini = [], 0.0
    n = 1
    while os.path.exists(os.path.join(trabajo, "audio", f"p{n:02}.wav")):
        dur = duracion(os.path.join(trabajo, "audio", f"p{n:02}.wav")) + AIRE
        pal = json.load(open(os.path.join(trabajo, "audio", f"{n:02}.json"), encoding="utf-8"))
        res.append({"ini": ini, "dur": dur, "palabras": [{**p, "ini": p["ini"] + ini, "fin": p["fin"] + ini} for p in pal]})
        ini += dur
        n += 1
    return res


def plantilla(texto, cta, destino):
    def oro(t):
        return re.sub(r"\*\*(.+?)\*\*", r'<em>\1</em>', t)
    html = f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Caveat:wght@700&family=IBM+Plex+Mono:wght@600&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:{W}px;height:{H}px;overflow:hidden;background:#fdfdfb}}
.vin{{position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,transparent 62%,rgba(0,0,0,.08))}}
#logo{{position:absolute;left:44px;top:56px;background:#0d2142;border-radius:16px;padding:12px 16px}} #logo svg{{width:170px;height:auto;display:block}}
.url{{position:absolute;right:48px;top:84px;font:600 26px 'IBM Plex Mono',monospace;color:#8e7140}}
h1{{position:absolute;left:48px;right:48px;top:170px;height:270px;display:flex;align-items:center;font-family:'Archivo',sans-serif;font-weight:900;font-size:{"72" if len(cta or texto) > 38 else "84"}px;line-height:1.04;color:#14213d}}
em{{font-style:normal;color:#d93a3f}}
.panel{{position:absolute;left:0;top:{PANEL_Y - 6}px;width:{W}px;height:{PANEL_H + 12}px;border-top:4px solid #e3dccd;border-bottom:4px solid #e3dccd}}
</style></head><body><div class="vin"></div><div id="logo"></div><div class="url">realinvestors.club</div>
<h1><span>{oro(cta or texto)}</span></h1><div class="panel"></div></body></html>"""
    archivo = destino[:-4] + ".html"
    open(archivo, "w", encoding="utf-8").write(html)
    sh("node", os.path.join(RAIZ, "herramientas", "miniatura.js"), archivo, destino, str(W), str(H))


def ts(t):
    h, r = divmod(max(t, 0), 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02}:{s:05.2f}"


def ass(palabras, dur, destino):
    """Subtítulos de 1 a 3 palabras, con la que se dice en rojo, y el aviso legal fijo.
    Los grupos se cortan también en las pausas de la voz: los tiempos de edge-tts no traen la puntuación."""
    grupos, actual = [], []
    for p in palabras:
        actual.append(p)
        siguiente = palabras[palabras.index(p) + 1] if p is not palabras[-1] else None
        pausa = siguiente is not None and siguiente["ini"] - p["fin"] > 0.18
        if len(actual) == 3 or sum(len(q["texto"]) + 1 for q in actual) > 17 or pausa or re.search(r"[.,:;?!]$", p["texto"]):
            grupos.append(actual)
            actual = []
    if actual:
        grupos.append(actual)
    filas = []
    for gi, g in enumerate(grupos):
        fin_g = min(g[-1]["fin"] + 0.25, grupos[gi + 1][0]["ini"] if gi + 1 < len(grupos) else dur)
        for i, p in enumerate(g):
            a = p["ini"] if i else max(p["ini"], filas[-1][1] if filas else 0)
            b = g[i + 1]["ini"] if i + 1 < len(g) else fin_g
            texto = " ".join((f"{{\\c{ROJO}}}{q['texto']}{{\\c{TINTA}}}" if j == i else q["texto"]) for j, q in enumerate(g))
            filas.append((a, max(b, a + 0.05), texto))
    with open(destino, "w", encoding="utf-8") as fh:
        fh.write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Archivo Black,80,{TINTA},{TINTA},&H00FBFDFD&,&H00FBFDFD&,0,0,0,0,100,100,0,0,1,6,0,8,70,110,{PANEL_Y + PANEL_H + 45},1
Style: Aviso,IBM Plex Sans SemiBold,28,&H00977D7D&,&H00977D7D&,&H00FBFDFD&,&H00FBFDFD&,0,0,0,0,100,100,0,0,1,0,0,8,60,110,{H - 440},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,{ts(0)},{ts(dur)},Aviso,,0,0,0,,Contenido educativo. No constituye recomendación de inversión.
""")
        for a, b, t in filas:
            fh.write(f"Dialogue: 1,{ts(a)},{ts(b)},Sub,,0,0,0,,{t}\n")


def main():
    cfg_path, video, trabajo_voz, salida = (os.path.abspath(x) for x in sys.argv[1:5])
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    esc = escenas(trabajo_voz)
    os.makedirs(salida, exist_ok=True)
    informe = []
    for s in cfg["piezas"]:
        trabajo = os.path.join(salida, "trabajo", s["id"])
        os.makedirs(trabajo, exist_ok=True)
        base, cta = os.path.join(trabajo, "base.png"), os.path.join(trabajo, "cta.png")
        plantilla(s["gancho"], None, base)
        plantilla("", s.get("cta") or CTA[s["formato"]], cta)
        cortes, palabras, t0 = [], [], 0.0
        for a, b in s["tramos"]:
            ini, fin = esc[a - 1]["ini"], esc[b - 1]["ini"] + esc[b - 1]["dur"] - AIRE
            cortes.append((ini, fin))
            for e in esc[a - 1:b]:
                palabras += [{**p, "ini": p["ini"] - ini + t0, "fin": p["fin"] - ini + t0} for p in e["palabras"]]
            t0 += fin - ini
        ass(palabras, t0, os.path.join(trabajo, "subs.ass"))
        k = len(cortes)
        # Cada tramo es una entrada aparte, buscada con -ss: varios trim del mismo video agotan la memoria
        partes = "".join(f"[{i}:v]setpts=PTS-STARTPTS,crop={RECORTE}:1080:{(1920 - RECORTE) // 2}:0,"
                         f"drawbox=x=0:y=0:w=150:h=210:color=0xf8f8f5:t=fill,scale={W}:{PANEL_H}[v{i}];"  # tapa el borde del logo del video con el color de la pizarra (arriba ya está el de la plantilla)
                         f"[{i}:a]asetpts=PTS-STARTPTS,afade=t=in:d=0.08,afade=t=out:st={b - a - 0.25:.3f}:d=0.25[a{i}];"
                         for i, (a, b) in enumerate(cortes))
        filtro = (partes + "".join(f"[v{i}][a{i}]" for i in range(k)) + f"concat=n={k}:v=1:a=1[vid][aud];"
                  f"[{k}:v][vid]overlay=0:{PANEL_Y}[c1];"
                  f"[{k + 1}:v]crop={W}:{PANEL_Y - 20}:0:0[cta];"
                  f"[c1][cta]overlay=0:0:enable='gte(t,{t0 - CTA_SEG:.3f})',"
                  f"subtitles='{os.path.join(trabajo, 'subs.ass')}',format=yuv420p[v]")
        destino = os.path.join(salida, s["id"] + ".mp4")
        entradas = sum((["-ss", f"{a:.3f}", "-t", f"{b - a:.3f}", "-i", video] for a, b in cortes), [])
        sh("ffmpeg", "-loglevel", "error", "-y", *entradas, "-loop", "1", "-i", base, "-loop", "1", "-i", cta,
           "-filter_complex", filtro, "-map", "[v]", "-map", "[aud]", "-t", f"{t0:.3f}", "-r", str(FPS),
           "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", destino)
        informe.append({"pieza": s["id"], "formato": s["formato"], "duracion_s": round(t0, 2), "titulo": s["titulo"],
                        "texto": s.get("texto", "")})
        print(s["id"], round(t0, 1), "s", flush=True)
    json.dump(informe, open(os.path.join(salida, "piezas.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
