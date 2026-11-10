#!/usr/bin/env python3
"""Datos reales del oro (GC=F, Yahoo Finance) para P26: velas diarias, giros (zigzag) y ejemplos.

    SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python produccion/p26-graficos/datos_oro.py   → produccion/p26-graficos/oro.js
"""
import json, os
import yfinance as yf
AQUI = os.path.dirname(os.path.abspath(__file__))

def bajar(**k):
    d = yf.download("GC=F", progress=False, auto_adjust=False, **k); d.columns = [c[0] for c in d.columns]; return d.dropna()

def zigzag(d, umbral):
    """Giros: máximos y mínimos alternados que se separan más de `umbral` (fracción)."""
    pts, tipo, ext, iext = [], None, d.Close.iloc[0], 0
    for i in range(1, len(d)):
        h, l = d.High.iloc[i], d.Low.iloc[i]
        if tipo in (None, "max") and h >= ext if tipo == "max" else False: ext, iext = h, i
        if tipo == "min" and l <= ext: ext, iext = l, i
        if tipo is None:
            if h > d.Close.iloc[0] * (1 + umbral): tipo, ext, iext = "max", h, i; pts.append(("min", 0, d.Low.iloc[0]))
            elif l < d.Close.iloc[0] * (1 - umbral): tipo, ext, iext = "min", l, i; pts.append(("max", 0, d.High.iloc[0]))
            continue
        if tipo == "max" and l < ext * (1 - umbral): pts.append(("max", iext, ext)); tipo, ext, iext = "min", l, i
        elif tipo == "min" and h > ext * (1 + umbral): pts.append(("min", iext, ext)); tipo, ext, iext = "max", h, i
    pts.append((tipo, iext, ext)); return pts

def velas(d):
    return [[x.strftime("%Y-%m-%d"), round(o, 1), round(h, 1), round(l, 1), round(c, 1)] for x, o, h, l, c in
            zip(d.index, d.Open, d.High, d.Low, d.Close)]

def main():
    d = bajar(start="2025-06-01", end="2026-11-10", interval="1d")
    tramos = {"sube": ("2025-08-15", "2025-10-20"), "baja": ("2026-02-25", "2026-03-31"), "lateral": ("2026-04-06", "2026-05-20")}
    out = {"fuente": "GC=F (futuro del oro, COMEX), Yahoo Finance, velas diarias", "tramos": {}}
    for k, (a, b) in tramos.items():
        x = d[a:b]; z = zigzag(x, {"sube": 0.04, "baja": 0.05, "lateral": 0.035}[k])
        out["tramos"][k] = {"desde": a, "hasta": b, "velas": velas(x), "giros": [[t, int(i), round(p, 1)] for t, i, p in z],
                            "max": round(x.High.max(), 1), "min": round(x.Low.min(), 1), "cambio": round((x.Close.iloc[-1] / x.Open.iloc[0] - 1) * 100, 1)}
    out["mecha_sup"] = velas(d["2026-06-11":"2026-06-11"])[0]
    out["mecha_inf"] = velas(d["2026-03-23":"2026-03-23"])[0]
    out["contexto_mecha_inf"] = velas(d["2026-03-09":"2026-04-08"])
    out["ano"] = velas(d["2025-11-01":"2026-11-09"])
    json.dump(out, open(os.path.join(AQUI, "oro.json"), "w"), ensure_ascii=False)
    open(os.path.join(AQUI, "oro.js"), "w").write("window.ORO=" + json.dumps(out, ensure_ascii=False) + ";")
    for k, v in out["tramos"].items(): print(k, v["desde"], v["hasta"], "máx", v["max"], "mín", v["min"], "cambio", v["cambio"], "%", "giros", [(g[0], d[v["desde"]:].index[g[1]].strftime("%d/%m"), g[2]) for g in v["giros"]])
    print("mecha sup", out["mecha_sup"], "mecha inf", out["mecha_inf"])

if __name__ == "__main__":
    main()
