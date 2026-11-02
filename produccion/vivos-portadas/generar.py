#!/usr/bin/env python3
"""Portadas (1280x720) de las clases en vivo de Lean en YouTube, con el estilo de RIC.

    python produccion/vivos-portadas/generar.py            # escribe portada-N.html
    node herramientas/miniatura.js produccion/vivos-portadas/portada-1.html <salida.png>

Fotos reales de Wikimedia Commons (fotos/, créditos en LEEME.md) y velas reales de 15 minutos (velas.json, Yahoo Finance:
NQ=F para Nueva York, ^N225 para Asia). Para actualizar las velas, volver a bajar velas.json (ver LEEME.md).
"""
import json
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
VELAS = json.load(open(os.path.join(AQUI, "velas.json")))

PORTADAS = [
    # n, foto, posición de la foto, etiqueta, en vivo, título (líneas; *palabra* en oro), bajada, dato, velas, modo
    dict(n=1, foto="ny.jpg", pos="70% 40%", etiqueta="PLAN DEL DÍA", vivo=False,
         titulo=["Pre apertura", "*Nueva York*"], bajada="El plan antes de la campana: niveles, noticias y escenarios",
         dato="Apertura 9:30 NY", velas="NQ=F", modo="plan"),
    dict(n=2, foto="ny2.jpg", pos="60% 50%", etiqueta="EN VIVO", vivo=True,
         titulo=["Operando", "en vivo", "*Nueva York*"], bajada="La sesión en tiempo real, operación por operación",
         dato="Nasdaq · S&P 500", velas="NQ=F", modo="vivo"),
    dict(n=3, foto="tokio.jpg", pos="50% 35%", etiqueta="PLAN DEL DÍA", vivo=False,
         titulo=["Pre apertura", "*Asia*"], bajada="Mercado asiático: qué mirar antes de que abra Tokio",
         dato="Apertura 9:00 Tokio", velas="^N225", modo="plan"),
    dict(n=4, foto="tokio.jpg", pos="50% 70%", etiqueta="EN VIVO", vivo=True,
         titulo=["Operando", "en vivo", "*Asia*"], bajada="La sesión asiática, en tiempo real",
         dato="Nikkei 225", velas="^N225", modo="vivo"),
    dict(n=5, foto="rey2.jpg", pos="55% 60%", etiqueta="EN VIVO", vivo=True,
         titulo=["Psicología", "del *trading*"], bajada="Disciplina, rachas y control emocional",
         dato="La mente también se entrena", velas=None, modo="mente"),
]


def velas_svg(clave, modo, ancho=500, alto=250):
    v = VELAS[clave]["v"]
    lo, hi = min(x[2] for x in v), max(x[1] for x in v)
    y = lambda p: 12 + (hi - p) / (hi - lo) * (alto - 24)
    paso = ancho / len(v)
    partes = []
    if modo == "plan":  # niveles del plan: máximo, mínimo y el cierre previo, punteados en oro
        for p, txt in [(hi, "máximo"), (lo, "mínimo"), (v[len(v) // 2][3], "pivote")]:
            partes.append(f'<line x1="0" x2="{ancho}" y1="{y(p):.1f}" y2="{y(p):.1f}" stroke="#c7a35e" stroke-width="2" stroke-dasharray="8 7" opacity=".85"/>'
                          f'<text x="{ancho - 4}" y="{(y(p) + 20 if y(p) < 30 else y(p) - 7):.1f}" text-anchor="end" class="niv">{txt}</text>')
    for i, (o, h, l, c) in enumerate(v):
        x = i * paso + paso / 2
        col = "#3dd68c" if c >= o else "#ff6b6b"
        op = ".55" if modo == "plan" else "1"
        top, bot = y(max(o, c)), y(min(o, c))
        partes.append(f'<g opacity="{op}"><line x1="{x:.1f}" x2="{x:.1f}" y1="{y(h):.1f}" y2="{y(l):.1f}" stroke="{col}" stroke-width="2"/>'
                      f'<rect x="{x - paso * .32:.1f}" y="{top:.1f}" width="{paso * .64:.1f}" height="{max(2, bot - top):.1f}" fill="{col}" rx="1"/></g>')
    if modo == "vivo":  # línea del último precio
        c = v[-1][3]
        partes.append(f'<line x1="0" x2="{ancho}" y1="{y(c):.1f}" y2="{y(c):.1f}" stroke="#ecf1f9" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>'
                      f'<circle cx="{(len(v) - .5) * paso:.1f}" cy="{y(c):.1f}" r="7" fill="#ff6b6b"/>'
                      f'<circle cx="{(len(v) - .5) * paso:.1f}" cy="{y(c):.1f}" r="15" fill="none" stroke="#ff6b6b" stroke-width="2" opacity=".6"/>')
    return f'<svg viewBox="0 0 {ancho} {alto}" width="{ancho}" height="{alto}">{"".join(partes)}</svg>'


def html(p):
    titulo = "".join(f"<div>{l.replace('*', '<em>', 1).replace('*', '</em>', 1)}</div>" for l in p["titulo"])
    pill = ('<div class="pill vivo"><span class="punto"></span>EN VIVO</div>' if p["vivo"]
            else f'<div class="pill">{p["etiqueta"]}</div>')
    grafico = (f'<div class="velas">{velas_svg(p["velas"], p["modo"])}</div>'
               f'<div class="fuente">{"NASDAQ 100 FUT" if p["velas"] == "NQ=F" else "NIKKEI 225"} · 15 MIN · DATOS REALES</div>') if p["velas"] else ""
    return f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=IBM+Plex+Sans:wght@500;600&family=IBM+Plex+Mono:wght@600&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1280px;height:720px;overflow:hidden;background:#071426}}
.foto{{position:absolute;inset:0;background:url(fotos/{p['foto']}) {p['pos']}/cover no-repeat;filter:saturate(.75) contrast(1.08)}}
.tinte{{position:absolute;inset:0;background:linear-gradient(90deg,#071426 0%,rgba(7,20,38,.94) 34%,rgba(13,33,66,.55) 62%,rgba(13,33,66,.25) 100%),
  linear-gradient(0deg,rgba(7,20,38,.9) 0%,rgba(7,20,38,0) 40%)}}
.grilla{{position:absolute;inset:0;background-image:linear-gradient(rgba(39,74,128,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(39,74,128,.22) 1px,transparent 1px);background-size:64px 64px;
  -webkit-mask-image:linear-gradient(90deg,#000 0%,rgba(0,0,0,.4) 55%,transparent 80%)}}
.marco{{position:absolute;inset:18px;border:1.5px solid rgba(199,163,94,.45);border-radius:6px}}
#logo{{position:absolute;left:58px;top:46px;width:190px}} #logo svg{{width:100%;height:auto;display:block}}
.col{{position:absolute;left:58px;top:168px;width:660px;display:flex;flex-direction:column;align-items:flex-start;gap:20px}}
.pill{{font:600 22px 'IBM Plex Mono',monospace;letter-spacing:.16em;color:#071426;background:linear-gradient(180deg,#e2c68c,#c7a35e);padding:9px 18px 8px;border-radius:6px}}
.pill.vivo{{background:#e5383b;color:#fff;display:flex;align-items:center;gap:12px;box-shadow:0 0 30px rgba(229,56,59,.55)}}
.punto{{width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 0 5px rgba(255,255,255,.3)}}
h1{{font:900 84px/0.97 'Archivo',sans-serif;white-space:nowrap;color:#ecf1f9;letter-spacing:-.01em;text-transform:uppercase;text-shadow:0 4px 24px rgba(0,0,0,.45)}}
h1 em{{font-style:normal;background:linear-gradient(180deg,#e2c68c,#c7a35e 60%,#8e7140);-webkit-background-clip:text;background-clip:text;color:transparent}}
.bajada{{width:600px;font:500 28px/1.28 'IBM Plex Sans',sans-serif;color:#a3b5d1}}
.dato{{position:absolute;left:60px;bottom:58px;font:600 22px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#e2c68c;text-transform:uppercase;border-left:4px solid #c7a35e;padding-left:14px}}
.velas{{position:absolute;right:44px;bottom:84px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.5))}}
.niv{{font:600 15px 'IBM Plex Mono',monospace;fill:#e2c68c;letter-spacing:.08em;text-transform:uppercase}}
.fuente{{position:absolute;right:48px;bottom:52px;font:600 13px 'IBM Plex Mono',monospace;letter-spacing:.14em;color:rgba(163,181,209,.75)}}
.emo{{position:absolute;right:56px;bottom:56px;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font:600 22px 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase}}
.emo span{{color:rgba(163,181,209,.8);text-decoration:line-through;text-decoration-color:#ff6b6b;text-decoration-thickness:3px}}
.emo b{{font:900 44px 'Archivo',sans-serif;letter-spacing:.02em;color:#e2c68c}}
.web{{position:absolute;right:48px;top:52px;font:600 18px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:rgba(226,198,140,.9)}}
</style></head><body>
<div class="foto"></div><div class="tinte"></div><div class="grilla"></div>
{grafico}
<div class="marco"></div>
<div id="logo"></div>
<div class="web">realinvestors.club</div>
<div class="col">{pill}
<h1>{titulo}</h1>
<div class="bajada">{p['bajada']}</div></div>
<div class="dato">{p['dato']}</div>
{'<div class="emo"><span>miedo</span><span>codicia</span><span>revancha</span><b>disciplina</b></div>' if p['modo'] == 'mente' else ''}
</body></html>
"""


if __name__ == "__main__":
    for p in PORTADAS:
        open(os.path.join(AQUI, f"portada-{p['n']}.html"), "w").write(html(p))
    print(len(PORTADAS), "portadas")
