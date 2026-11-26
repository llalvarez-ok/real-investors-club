"""Datos reales del oro (GC=F), el dólar (DX-Y.NYB) y el bono a 10 años (^TNX) de Yahoo Finance para el Reel «El oro perdió
un tercio en diez meses» (26/11/2026). Escribe oro.json y oro.js (window.ORO) con:
  - velas diarias del oro desde el 01/12/2025 (gráfico de enero a noviembre, el de lote y capital);
  - cierres mensuales del oro desde 2000 (gráfico de la historia) y la única caída de 30 % o más desde el récord de cierre
    (primer cierre: 20/06/2013) con su precio un año después;
  - récord (máximo intradiario), mínimo de noviembre, último cierre, media de 200 días;
  - el dólar (DXY) diario de 2026 con su máximo del año y el último rendimiento del bono a 10 años.
El precio de referencia del guion es 3.597 (26/11 en curso; las cuentas del bloque 09 salen de ahí): se guarda aparte.
Corrección del 26/11 (veredicto de Valeria): el mínimo del 25/11 se toma de la vela horaria (3.453,8 a las 10:00 de Nueva York;
la diaria marca 3.425,2 y es dudosa) y la vela del 26/11 se marca «en curso». Si la horaria no baja, quedan los números a mano.
Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt venv-qwen/bin/python produccion/reel-oro-2611/datos_oro.py"""
import json
from pathlib import Path
import pandas as pd
import yfinance as yf

AQUI = Path(__file__).parent
REF = 3597  # precio del 26/11 (voz: «casi dos mil» hasta el récord y «unos ciento cuarenta» hasta el mínimo de esta semana)
# vela real del 25/11 (Yahoo GC=F diaria O/H/C; mínimo de la horaria, sesión 24/11 18:00 a 25/11 17:00 de Nueva York)
V2511 = {"f": "2026-11-25", "o": 3559.3, "h": 3588.9, "l": 3453.8, "c": 3535.8}


def hist(t, **k):
    h = yf.Ticker(t).history(**k)
    h.index = h.index.tz_localize(None)
    return h


h = hist("GC=F", period="max", interval="1d")
c = h["Close"]
d = h[h.index >= "2025-12-01"]
velas = [{"f": i.strftime("%Y-%m-%d"), "o": round(r.Open, 1), "h": round(r.High, 1), "l": round(r.Low, 1), "c": round(r.Close, 1)}
         for i, r in d.iterrows()]
try:  # mínimo del 25/11 desde la horaria
    hh = yf.Ticker("GC=F").history(period="5d", interval="1h"); hh.index = hh.index.tz_convert("America/New_York")
    ses = hh[(hh.index >= "2026-11-24 18:00") & (hh.index < "2026-11-25 17:00")]
    if len(ses): V2511["l"] = round(float(ses["Low"].min()), 1)
except Exception as e:
    print("horaria no disponible, mínimo del 25/11 a mano:", e)
velas = [v for v in velas if v["f"] != "2025-11-25" and v["f"] != "2026-11-25"]
velas.append(V2511); velas.sort(key=lambda v: v["f"])
for v in velas:
    if v["f"] == "2026-11-26": v["curso"] = True; v["etq"] = "26/11 (en curso)"
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
    "minimo_nov": (lambda m: {"f": m["f"], "v": round(m["l"])})(min((v for v in velas if v["f"] >= "2026-11-01"), key=lambda v: v["l"])),
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
