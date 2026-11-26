"""Datos reales de BTC-USD (Yahoo Finance) para el Reel «Bitcoin: dije 62.000 y siguió hasta 55.000» (26/11/2026).
Escribe btc.json y btc.js (window.BTC) con:
  - velas diarias desde el 01/09/2025 (gráfico de 14 meses, el de noviembre y el de las líneas), con la media de 200 y 50 días;
  - cierres semanales desde 2014 (gráfico de la historia, escala logarítmica);
  - los episodios en que Bitcoin quedó un 45 % o más abajo de su récord de cierre (el primer cierre de cada caída, después de
    un récord nuevo) y su resultado 180 días después: es el cálculo del guion (2015 +38 %, 2018 −19 %, 2021 +67 %, 2022 −36 %);
  - récord (máximo intradiario), mínimo de noviembre, precio actual, y el día en que tocó 62.000 después del 13/11.
Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt venv-qwen/bin/python produccion/reel-btc-2611/datos_btc.py"""
import json
from pathlib import Path
import pandas as pd
import yfinance as yf

AQUI = Path(__file__).parent
h = yf.Ticker("BTC-USD").history(period="max", interval="1d")
h.index = h.index.tz_localize(None)
c = h["Close"]
ma200, ma50 = c.rolling(200).mean(), c.rolling(50).mean()

d = h[h.index >= "2025-09-01"]
velas = [{"f": i.strftime("%Y-%m-%d"), "o": round(r.Open), "h": round(r.High), "l": round(r.Low), "c": round(r.Close),
          "m200": round(float(ma200[i])), "m50": round(float(ma50[i]))} for i, r in d.iterrows()]
sem = c.resample("W-SUN").last().dropna()
semanal = [[i.strftime("%Y-%m-%d"), round(float(v), 1)] for i, v in sem.items()]

ath = c.cummax()
episodios, dentro = [], False
for f, v in (c / ath - 1).items():
    if c[f] >= ath[f] * .999: dentro = False
    if not dentro and v <= -.45:
        dentro = True
        tras = c[(c.index >= f) & (c.index <= f + pd.Timedelta(days=180))]
        fin = c[c.index >= f + pd.Timedelta(days=180)]
        ep = {"f": f.strftime("%Y-%m-%d"), "precio": round(float(c[f]), 1), "record": round(float(ath[f]), 1),
              "camino": [round(float(x) / float(c[f]) - 1, 4) for x in tras.iloc[::3]]}
        if len(fin): ep.update({"f6": fin.index[0].strftime("%Y-%m-%d"), "r6": round((float(fin.iloc[0]) / float(c[f]) - 1) * 100, 1)})
        episodios.append(ep)

nov = h[h.index >= "2026-11-01"]
rec_f = h["High"].idxmax()
toco = h[(h.index > "2026-11-13") & (h["Low"] <= 62000)]
out = {
    "fuente": "Yahoo Finance, BTC-USD diario", "generado": pd.Timestamp.now().strftime("%Y-%m-%d"),
    "velas": velas, "semanal": semanal, "episodios": episodios,
    "record": {"f": rec_f.strftime("%Y-%m-%d"), "v": round(float(h["High"].max()))},
    "record_cierre": {"f": c.idxmax().strftime("%Y-%m-%d"), "v": round(float(c.max()))},
    "minimo_nov": {"f": nov["Low"].idxmin().strftime("%Y-%m-%d"), "v": round(float(nov["Low"].min()))},
    "actual": {"f": c.index[-1].strftime("%Y-%m-%d"), "v": round(float(c.iloc[-1]))},
    "toco_62000": toco.index[0].strftime("%Y-%m-%d") if len(toco) else None,
    "m200": round(float(ma200.iloc[-1])), "m50": round(float(ma50.iloc[-1])),
}
out["caida_record"] = round((out["actual"]["v"] / out["record"]["v"] - 1) * 100, 1)
(AQUI / "btc.json").write_text(json.dumps(out, ensure_ascii=False))
(AQUI / "btc.js").write_text("window.BTC=" + json.dumps(out, ensure_ascii=False) + ";")
print({k: v for k, v in out.items() if k not in ("velas", "semanal", "episodios")})
for e in episodios: print(e["f"], e["precio"], e.get("r6"))
