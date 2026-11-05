"""Carrusel de RESULTADO (4 láminas, 1080x1350) para una fecha del calendario del oro.

Uso:
  SSL_CERT_FILE=/root/.ccr/ca-bundle.crt NODE_PATH=$(npm root -g) \
    python produccion/oro-resultados/resultado.py produccion/oro-resultados/<id>.json <dir_salida>

El JSON trae lo que dice cada lámina (ver prueba-cpi-sept.json). El script baja el oro real (GC=F, velas de 5 min,
Yahoo Finance; solo hay 60 días hacia atrás), mide la reacción desde el minuto anterior al dato y dibuja el gráfico
con la hora del dato marcada, en hora de Argentina. Imprime la reacción para que el texto la use tal cual.
Estilo: el del carrusel del calendario (`produccion/carrusel-oro-noviembre/carrusel.html`), lenguaje para principiantes.
"""
import json
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import yfinance as yf

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
NY, AR = ZoneInfo("America/New_York"), ZoneInfo("America/Argentina/Buenos_Aires")


def reaccion(c):
    t0 = datetime.fromisoformat(f'{c["fecha"]}T{c["hora_ny"]}').replace(tzinfo=NY)
    d = yf.Ticker("GC=F").history(start=(t0 - timedelta(days=1)).date().isoformat(),
                                  end=(t0 + timedelta(days=2)).date().isoformat(), interval="5m")["Close"].dropna()
    d.index = d.index.tz_convert(NY)
    antes = d[d.index < t0]
    if antes.empty:
        raise SystemExit("No hay velas antes del dato (¿más de 60 días o fecha futura?)")
    p0 = float(antes.iloc[-1])
    h = c.get("ventana_min", 60)
    post = d[(d.index >= t0) & (d.index <= t0 + timedelta(minutes=h))]
    if post.empty:
        raise SystemExit("Todavía no hay velas después del dato")
    p1 = float(post.iloc[-1])
    ext = float(post.min()) if p1 < p0 else float(post.max())
    ventana = d[(d.index >= t0 - timedelta(hours=2)) & (d.index <= t0 + timedelta(hours=3))]
    r = dict(p0=p0, p1=p1, ext=ext, pct=(p1 / p0 - 1) * 100, pct_ext=(ext / p0 - 1) * 100,
             hora_ar=t0.astimezone(AR).strftime("%H:%M"), ventana=ventana, t0=t0, h=h)
    print(f"Oro antes del dato {p0:.1f} → {h} min después {p1:.1f} ({r['pct']:+.2f} %); extremo {ext:.1f} ({r['pct_ext']:+.2f} %)")
    return r


def svg(r):
    v = r["ventana"]
    xs = [(t - v.index[0]).total_seconds() for t in v.index]
    lo, hi = float(v.min()), float(v.max())
    pad = (hi - lo) * 0.12 or 1
    lo, hi = lo - pad, hi + pad
    X = lambda s: s / xs[-1] * 1000
    Y = lambda p: 380 - (p - lo) / (hi - lo) * 360
    linea = "M" + " L".join(f"{X(s):.1f},{Y(p):.1f}" for s, p in zip(xs, v.values))
    x0 = X((r["t0"] - v.index[0]).total_seconds())
    col = "#3dd68c" if r["pct"] >= 0 else "#ff6b6b"
    etiquetas = ""
    for t in v.index:
        if t.minute == 0 and t.hour % 1 == 0:
            etiquetas += (f'<text x="{X((t - v.index[0]).total_seconds()):.0f}" y="410" fill="#a3b5d1" font-size="20" '
                          f'font-family="IBM Plex Mono" text-anchor="middle">{t.astimezone(AR):%H:%M}</text>')
    return f'''<svg viewBox="0 0 1000 420" width="100%" height="420">
  <line x1="{x0:.1f}" y1="0" x2="{x0:.1f}" y2="385" stroke="#e2c68c" stroke-width="2" stroke-dasharray="8 8"/>
  <text x="{x0 + 12:.1f}" y="26" fill="#e2c68c" font-size="22" font-family="IBM Plex Mono">SALE EL DATO · {r["hora_ar"]}</text>
  <path d="{linea}" fill="none" stroke="#ecf1f9" stroke-width="3" opacity=".55"/>
  <path d="{"M" + " L".join(f"{X(s):.1f},{Y(p):.1f}" for s, p, t in zip(xs, v.values, v.index) if t >= r["t0"] - timedelta(minutes=5) and t <= r["t0"] + timedelta(minutes=r["h"]))}" fill="none" stroke="{col}" stroke-width="5"/>
  <circle cx="{x0:.1f}" cy="{Y(r["p0"]):.1f}" r="8" fill="#e2c68c"/>
  {etiquetas}
</svg>'''


def num(x, dec=0):
    return f"{x:,.{dec}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def html(c, r):
    base = (RAIZ / "produccion/carrusel-oro-noviembre/carrusel.html").read_text(encoding="utf-8")
    head = base.split("<body>")[0].replace("../../", "../../")
    sube = r["pct"] >= 0
    flecha, verbo, clase = ("🔺", "subió", "s") if sube else ("🔻", "bajó", "b")
    cumplio = c["esperado_oro"] == ("sube" if sube else "baja")
    pie = ('  <div class="pie"><b>Lean Alvarez · <i>Real Investors Club</i></b><small>@leanalvarez.ok</small></div>\n</section>\n')
    marca = lambda t, n: (f'  <div class="marca"><img src="../../marca/logo-oro.png" alt=""><span>{t}</span></div>\n'
                          f'  <div class="paso">{n}/4</div>\n')
    extra = """<style>
.res h1{font-size:86px;margin-top:150px}
.big{margin-top:40px;display:flex;gap:18px}
.big .num b{font-size:64px}
.veredicto{margin-top:34px;border-radius:24px;padding:30px 34px}
.veredicto.b{background:rgba(255,107,107,.10);border:2px solid rgba(255,107,107,.55)}
.veredicto.s{background:rgba(61,214,140,.10);border:2px solid rgba(61,214,140,.55)}
.veredicto .t{font-size:30px;color:var(--txt2)}
.veredicto .r{margin-top:8px;font-family:'Archivo';font-weight:900;font-size:62px;text-transform:uppercase}
.veredicto.b .r{color:var(--rojo)} .veredicto.s .r{color:var(--verde)}
.caja{margin-top:40px;border:2px solid var(--borde);border-radius:22px;background:rgba(7,20,38,.6);padding:24px 26px}
.caja .tt{display:flex;justify-content:space-between;font-family:'IBM Plex Mono';font-size:22px;color:var(--txt2);margin-bottom:10px}
.pasos2{margin-top:40px;display:flex;flex-direction:column;gap:16px}
.p2{display:flex;gap:20px;align-items:flex-start;border:2px solid var(--borde);border-radius:20px;padding:22px 26px;background:rgba(7,20,38,.6);font-size:31px;line-height:1.35}
.p2 .n{flex:none;width:52px;height:52px;border-radius:50%;background:var(--oro1);color:var(--noche1);font-family:'Archivo';font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center}
.lect{margin-top:28px;font-size:30px;line-height:1.4;color:var(--txt2)} .lect b{color:var(--txt)}
</style>"""
    l1 = (f'<section class="lamina res" id="l1">\n' + marca(f'RESULTADO · {c["dia"].upper()}', 1) +
          f'''  <h1>Salió el dato de <span class="oro">{c["nombre"]}</span></h1>
  <div class="big numeros">
    <div class="num"><small>Se esperaba</small><b>{c["esperado"]}</b></div>
    <div class="num"><small>Salió</small><b style="color:var(--{'rojo' if c['comparacion'] == 'más' else 'verde' if c['comparacion'] == 'menos' else 'oro1'})">{c["salio"]}</b></div>
  </div>
  <p class="lect">Salió <b>{c["comparacion"]} {"de lo esperado" if c["comparacion"] != "igual" else "a lo esperado"}</b>. {c.get("frase_dato", "")}</p>
  <div class="veredicto {clase}"><div class="t">En la primera hora, el oro</div><div class="r">{flecha} {verbo} {num(abs(r["pct"]), 1)} %</div></div>
''' + pie)
    l2 = (f'<section class="lamina res" id="l2">\n' + marca("QUÉ HIZO EL ORO", 2) +
          f'''  <h1 style="font-size:76px">De US$ {num(r["p0"])} a <span class="oro">US$ {num(r["p1"])}</span></h1>
  <div class="caja"><div class="tt"><span>ORO · VELAS DE 5 MIN · HORA ARG</span><span>{c["dia"]}</span></div>{svg(r)}</div>
  <p class="lect">{"Pasó lo que <b>suele</b> pasar." if cumplio else "Esta vez hizo <b>lo contrario</b> de lo que suele pasar."} {c["que_hizo"]}</p>
''' + pie)
    pasos = "".join(f'    <div class="p2"><span class="n">{i + 1}</span><span>{p}</span></div>\n' for i, p in enumerate(c["porque"]))
    l3 = (f'<section class="lamina res" id="l3">\n' + marca("¿POR QUÉ?", 3) +
          f'  <h1 style="font-size:80px">Por qué <span class="oro">{verbo}</span></h1>\n  <div class="pasos2">\n{pasos}  </div>\n'
          f'  <p class="lect">{c.get("aprendizaje", "")}</p>\n' + pie)
    l4 = (f'<section class="lamina res" id="l4">\n' + marca("LO QUE VIENE", 4) +
          f'''  <h1 style="font-size:80px">¿Y ahora <span class="oro">qué</span>?</h1>
  <p class="lect" style="font-size:33px;color:var(--txt)">{c["ahora"]}</p>
  <div class="caja" style="margin-top:36px"><div class="tt"><span>PRÓXIMA FECHA</span><span>{c["proxima"]["hora"]}</span></div>
    <div style="font-family:Archivo;font-weight:900;font-size:52px">{c["proxima"]["fecha"]} · <span class="oro">{c["proxima"]["nombre"]}</span></div>
    <p class="lect" style="margin-top:12px">{c["proxima"]["regla"]}</p></div>
  <p class="lect" style="margin-top:34px">📌 <b>Guardalo</b> · 💬 ¿Lo esperabas? <b>Comentá SÍ o NO</b> · ➕ <b>Seguime</b> para la próxima.</p>
  <p class="aviso" style="bottom:120px">Contenido educativo. No constituye recomendación de inversión. Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero. Fuentes: {c["fuentes"]}. Oro: Yahoo Finance (GC=F).</p>
''' + pie)
    return head.replace("</head>", extra + "</head>") + "<body>\n" + l1 + l2 + l3 + l4 + "</body></html>\n"


def main():
    c = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    salida = Path(sys.argv[2]).resolve()
    salida.mkdir(parents=True, exist_ok=True)
    r = reaccion(c)
    tmp = AQUI / "_render.html"
    tmp.write_text(html(c, r), encoding="utf-8")
    js = """
const { chromium } = require('playwright');
(async () => {
  const [url, dir, id] = process.argv.slice(1);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1400 } });
  await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(500);
  for (let i = 1; i <= 4; i++) {
    const f = `${dir}/${id}-${i}.png`;
    await pg.locator(`#l${i}`).screenshot({ path: f });
    console.log(f);
  }
  await b.close();
})();
"""
    try:
        subprocess.run(["node", "-e", js, tmp.as_uri(), str(salida), c["id"]], check=True)
    finally:
        tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
