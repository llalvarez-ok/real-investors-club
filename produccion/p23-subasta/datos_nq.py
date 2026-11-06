#!/usr/bin/env python3
"""Datos reales de P23: futuro del Nasdaq 100 (NQ=F, Yahoo Finance), sesión de Nueva York del 3, 4 y 5/11/2026.
Escribe produccion/p23-subasta/nq.js con velas de 5 minutos y el perfil de volumen aproximado de cada día
(volumen de cada vela de 1 minuto repartido en partes iguales entre su máximo y su mínimo, niveles de 10 puntos;
área de valor = 70 % del volumen alrededor del punto de control).
Yahoo solo da velas de 1 minuto de los últimos ~30 días: se corrió el 06/11/2026 y el resultado quedó en nq.js.
    SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python produccion/p23-subasta/datos_nq.py
"""
import json
import numpy as np
import pandas as pd
import yfinance as yf

DIAS = ["2026-11-03", "2026-11-04", "2026-11-05"]
d = yf.download("NQ=F", start="2026-11-02", end="2026-11-06", interval="1m", progress=False, auto_adjust=False)
if isinstance(d.columns, pd.MultiIndex):
    d.columns = d.columns.get_level_values(0)
d.index = d.index.tz_convert("America/New_York")
out = {}
for dia in DIAS:
    x = d.loc[dia].between_time("09:30", "15:59")
    r = x.resample("5min").agg({"Open": "first", "High": "max", "Low": "min", "Close": "last"}).dropna()
    tick = 10
    lo = np.floor(x.Low.min() / tick) * tick
    hi = np.ceil(x.High.max() / tick) * tick
    bins = np.arange(lo, hi + tick, tick)
    v = np.zeros(len(bins))
    for l, h, vol in zip(x.Low, x.High, x.Volume):
        i0, i1 = int((l - lo) // tick), int((h - lo) // tick)
        v[i0:i1 + 1] += vol / (i1 - i0 + 1)
    orden, c, sel = np.argsort(-v), 0, []
    for i in orden:
        sel.append(i)
        c += v[i]
        if c >= 0.7 * v.sum():
            break
    out[dia] = {
        "velas": [[t.strftime("%H:%M"), round(o, 2), round(h, 2), round(l, 2), round(cl, 2)] for t, (o, h, l, cl) in r.iterrows()],
        "perfil": [[int(b), round(vv / v.max(), 4)] for b, vv in zip(bins, v)],
        "poc": int(bins[v.argmax()]), "val": int(bins[min(sel)]), "vah": int(bins[max(sel)] + tick),
        "max": float(x.High.max()), "min": float(x.Low.min()), "apertura": float(x.Open.iloc[0]), "cierre": float(x.Close.iloc[-1]),
    }
    print(dia, out[dia]["poc"], out[dia]["val"], out[dia]["vah"], len(out[dia]["velas"]))
open("produccion/p23-subasta/nq.js", "w").write("window.NQ = " + json.dumps(out) + ";\n")
