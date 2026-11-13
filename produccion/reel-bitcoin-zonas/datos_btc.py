"""Velas diarias reales de BTC-USD (Yahoo Finance) desde junio de 2026, media de 200 semanas y Fibonacci de la suba
del 01/07 al 21/09/2026, para el Reel «Bitcoin cayó donde se juntan dos zonas». Escribe btc.json y btc.js.
Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python produccion/reel-bitcoin-zonas/datos_btc.py"""
import json
from pathlib import Path
import yfinance as yf
AQUI = Path(__file__).parent
t = yf.Ticker("BTC-USD")
d = t.history(start="2026-06-01", interval="1d")
w = t.history(period="6y", interval="1wk")
w["ma"] = w["Close"].rolling(200).mean()
vm = d["Volume"].rolling(20).mean().shift(1)
velas = []
for i, r in d.iterrows():
    ma = w["ma"][w.index <= i]
    velas.append({"f": i.strftime("%Y-%m-%d"), "o": round(r.Open), "h": round(r.High), "l": round(r.Low), "c": round(r.Close),
                  "v": int(r.Volume), "vr": round(r.Volume / vm[i], 2) if vm[i] == vm[i] else None, "ma200s": round(float(ma.iloc[-1])) if len(ma) else None})
m15 = t.history(period="2d", interval="15m")
lo = float(m15[m15.index.strftime("%Y-%m-%d") == "2026-11-13"]["Low"].min())
L, H = 57748, 87364  # mínimo 01/07/2026 y máximo 21/09/2026 (diarios)
out = {"velas": velas, "minimo_13_11": round(lo), "fib": {"desde": ["2026-07-01", L], "hasta": ["2026-09-21", H],
       "618": round(H - (H - L) * .618), "65": round(H - (H - L) * .65), "786": round(H - (H - L) * .786)}}
(AQUI / "btc.json").write_text(json.dumps(out, ensure_ascii=False))
(AQUI / "btc.js").write_text("window.BTC=" + json.dumps(out, ensure_ascii=False) + ";")
print(len(velas), velas[-1], out["minimo_13_11"], out["fib"])
