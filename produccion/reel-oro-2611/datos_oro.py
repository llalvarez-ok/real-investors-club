"""Datos reales del oro (GC=F), el dólar (DX-Y.NYB) y el bono a 10 años (^TNX) de Yahoo Finance para el Reel «El oro perdió
un tercio en diez meses» (26/11/2026). Escribe oro.json y oro.js (window.ORO) con:
  - velas diarias del oro desde el 01/12/2025 (gráfico de enero a noviembre, el de lote y capital);
  - cierres mensuales del oro desde 2000 (gráfico de la historia) y la única caída de 30 % o más desde el récord de cierre
    (primer cierre: 20/06/2013) con su precio un año después;
  - récord (máximo intradiario), mínimo de noviembre, último cierre, media de 200 días;
  - el dólar (DXY) diario de 2026 con su máximo del año y el último rendimiento del bono a 10 años.
El precio de referencia del guion es 3.611 (dato del 26/11; las cuentas del bloque 09 salen de ahí): se guarda aparte.
Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt venv-qwen/bin/python produccion/reel-oro-2611/datos_oro.py"""
import json
from pathlib import Path
import pandas as pd
import yfinance as yf

AQUI = Path(__file__).parent
REF = 3611  # precio del guion (Lean aprobó la voz con «casi dos mil» y «ciento diez» calculados desde acá)


def hist(t, **k):
    h = yf.Ticker(t).history(**k)
    h.index = h.index.tz_localize(None)
    return h


h = hist("GC=F", period="max", interval="1d")
c = h["Close"]
d = h[h.index >= "2025-12-01"]
velas = [{"f": i.strftime("%Y-%m-%d"), "o": round(r.Open, 1), "h": round(r.High, 1), "l": round(r.Low, 1), "c": round(r.Close, 1)}
         for i, r in d.iterrows()]
c2 = c[c.index >= "2000-01-01"]
mensual = [[i.strftime("%Y-%m"), round(float(v), 1)] for i, v in c2.resample("ME").last().dropna().items()]
dd = c2 / c2.cummax() - 1
f13 = dd[dd <= -.30].index[0]
un_ano = c2[c2.index >= f13 + pd.Timedelta(days=365)]
caso = {"f": f13.strftime("%Y-%m-%d"), "precio": round(float(c2[f13]), 1), "record": round(float(c2.cummax()[f13]), 1),
        "f1": un_ano.index[0].strftime("%Y-%m-%d"), "precio1": round(float(un_ano.iloc[0]), 1),
        "r1": round((float(un_ano.iloc[0]) / float(c2[f13]) - 1) * 100, 1),
        "tramo": [[i.strftime("%Y-%m-%d"), round(float(v), 1)] for i, v in c2[(c2.index >= "2011-06-01") & (c2.index <= "2014-08-01")].iloc[::5].items()]}
nov = h[h.index >= "2026-11-01"]
rec = h[h.index >= "2025-06-01"]
dx = hist("DX-Y.NYB", start="2026-01-01", interval="1d")
tnx = hist("^TNX", period="1mo", interval="1d")
out = {
    "fuente": "Yahoo Finance: GC=F, DX-Y.NYB y ^TNX diarios", "generado": pd.Timestamp.now().strftime("%Y-%m-%d"),
    "velas": velas, "mensual": mensual, "caso2013": caso,
    "record": {"f": rec["High"].idxmax().strftime("%Y-%m-%d"), "v": round(float(rec["High"].max()))},
    "minimo_nov": {"f": nov["Low"].idxmin().strftime("%Y-%m-%d"), "v": round(float(nov["Low"].min()))},
    "ultimo": {"f": c.index[-1].strftime("%Y-%m-%d"), "v": round(float(c.iloc[-1]), 1)},
    "ref": REF, "m200": round(float(c.rolling(200).mean().iloc[-1])),
    "dxy": [[i.strftime("%Y-%m-%d"), round(float(v), 2)] for i, v in dx["Close"].items()],
    "dxy_max": {"f": dx["High"].idxmax().strftime("%Y-%m-%d"), "v": round(float(dx["High"].max()), 1)},
    "tnx": {"f": tnx.index[-1].strftime("%Y-%m-%d"), "v": round(float(tnx["Close"].iloc[-1]), 2)},
}
out["caida"] = round((REF / out["record"]["v"] - 1) * 100, 1)
out["hasta_record"] = out["record"]["v"] - REF
out["hasta_piso"] = REF - out["minimo_nov"]["v"]
(AQUI / "oro.json").write_text(json.dumps(out, ensure_ascii=False))
(AQUI / "oro.js").write_text("window.ORO=" + json.dumps(out, ensure_ascii=False) + ";")
print({k: v for k, v in out.items() if k not in ("velas", "mensual", "dxy", "caso2013")}, {k: v for k, v in caso.items() if k != "tramo"})
