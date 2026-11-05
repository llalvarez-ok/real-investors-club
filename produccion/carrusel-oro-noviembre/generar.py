"""Genera las 11 láminas del carrusel (1080x1350 PNG) con el precio real del oro.

Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python produccion/carrusel-oro-noviembre/generar.py <dir_salida>
"""
import sys
from pathlib import Path

import yfinance as yf
import subprocess

AQUI = Path(__file__).resolve().parent


def grafico():
    d = yf.Ticker("GC=F").history(period="6mo", interval="1d")["Close"].dropna()
    v = list(d.values)
    lo, hi = min(v), max(v)
    pts = [(i * 1000 / (len(v) - 1), 200 - (x - lo) / (hi - lo) * 180) for i, x in enumerate(v)]
    linea = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    area = linea + f" L1000,220 L0,220 Z"
    ult = v[-1]
    desde = (ult / hi - 1) * 100
    precio = f"{ult:,.0f}".replace(",", ".")
    print(f"Oro {d.index[-1].date()}: {ult:.1f} · máximo {hi:.1f} ({d.idxmax().date()}) · {desde:.1f} %")
    return {"__LINEA__": linea, "__AREA__": area, "__UX__": f"{pts[-1][0]:.1f}", "__UY__": f"{pts[-1][1]:.1f}",
            "__PRECIO__": precio, "__DESDEMAX__": f"{desde:.0f} %".replace("-", "−")}


def main():
    salida = Path(sys.argv[1] if len(sys.argv) > 1 else "carrusel")
    salida.mkdir(parents=True, exist_ok=True)
    html = (AQUI / "carrusel.html").read_text(encoding="utf-8")
    for k, v in grafico().items():
        html = html.replace(k, v)
    tmp = AQUI / "_render.html"
    tmp.write_text(html, encoding="utf-8")
    js = """
const { chromium } = require('playwright');
(async () => {
  const [url, dir] = process.argv.slice(1);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1400 } });
  await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(500);
  for (let i = 1; i <= 11; i++) {
    const f = `${dir}/oro-noviembre-${String(i).padStart(2, '0')}.png`;
    await pg.locator(`#l${i}`).screenshot({ path: f });
    console.log(f);
  }
  await b.close();
})();
"""
    try:
        subprocess.run(["node", "-e", js, tmp.as_uri(), str(salida.resolve())], check=True)
    finally:
        tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
