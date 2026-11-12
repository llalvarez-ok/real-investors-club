"""Velas diarias reales de NVDA (y el pre-mercado del 12/11) para el Reel de Wyckoff. Escribe nvda.js y nvda.json.
Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python produccion/reel-wyckoff-nvidia/datos_nvda.py"""
import json
from pathlib import Path
import yfinance as yf
AQUI = Path(__file__).parent
t = yf.Ticker("NVDA")
d = t.history(start="2026-03-01", end="2026-11-13", interval="1d")
d["vm"] = d["Volume"].rolling(50, min_periods=20).mean()
velas = [{"f": i.strftime("%Y-%m-%d"), "o": round(r.Open, 2), "h": round(r.High, 2), "l": round(r.Low, 2),
          "c": round(r.Close, 2), "v": int(r.Volume), "vr": round(r.Volume / r.vm, 2) if r.vm == r.vm else None}
         for i, r in d.iterrows()]
pre = t.history(period="1d", interval="5m", prepost=True)
pre.index = pre.index.tz_convert("America/New_York")
pre = pre[pre.index.strftime("%Y-%m-%d") == "2026-11-12"]
out = {"velas": velas, "premercado_12_11": {"ultimo": round(float(pre["Close"].iloc[-1]), 2), "minimo": round(float(pre["Low"].min()), 2),
       "hora": pre.index[-1].strftime("%H:%M")} if len(pre) else None,
       "marcas": {"climax": ["2026-05-14", 236.00], "caida": ["2026-06-29", 189.59], "trampa": ["2026-10-06", 243.37],
                  "ruptura": ["2026-11-05", 181.60], "minimo_anio": ["2026-03-30", 163.90]}}
(AQUI / "nvda.json").write_text(json.dumps(out, ensure_ascii=False))
(AQUI / "nvda.js").write_text("window.NVDA=" + json.dumps(out, ensure_ascii=False) + ";")
print(len(velas), "velas", out["premercado_12_11"])
