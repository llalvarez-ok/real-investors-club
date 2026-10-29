"""Efectos sintetizados (sin bancos de sonido): whoosh, impacto, golpe, pop, ding y brillo, mezclados en los tiempos de eventos.json."""
import json, sys, wave, numpy as np
R = 48000; rng = np.random.default_rng(7)
def env(n, a, d): t = np.arange(n) / R; return np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d)
def lp(x, k):  # pasa bajos simple (media móvil)
    return np.convolve(x, np.ones(k) / k, mode="same")
def whoosh():
    n = int(.45 * R); t = np.arange(n) / R; x = rng.standard_normal(n)
    hi = x - lp(x, 9); lo = lp(x, 40); mix = np.where(t < .2, lo + hi * (t / .2), hi * 0.6 + lo * 0.4)
    return mix * np.sin(np.pi * t / t[-1]) ** 2 * 0.5
def impacto():
    n = int(.6 * R); t = np.arange(n) / R
    boom = np.sin(2 * np.pi * (90 * t - 40 * t ** 2)) * np.exp(-t / .16)
    clic = lp(rng.standard_normal(n), 4) * np.exp(-t / .03)
    return (boom * 0.9 + clic * 0.5) * 0.8
def golpe(): return impacto() * 0.6
def pop():
    n = int(.18 * R); t = np.arange(n) / R; f = 900 * np.exp(-t / .05) + 300
    return np.sin(2 * np.pi * np.cumsum(f) / R) * env(n, .003, .05) * 0.6
def ding():
    n = int(1.2 * R); t = np.arange(n) / R
    return sum(np.sin(2 * np.pi * f * t) * a for f, a in ((1318.5, .5), (1975.5, .3), (2637, .15))) * env(n, .004, .35) * 0.55
def brillo():
    n = int(.7 * R); t = np.arange(n) / R; x = np.zeros(n)
    for i, f in enumerate((1568, 2093, 2637, 3136)):
        s = int(i * .07 * R); m = n - s; tt = np.arange(m) / R
        x[s:] += np.sin(2 * np.pi * f * tt) * env(m, .002, .12) * .25
    return x
SON = dict(whoosh=whoosh, impacto=impacto, golpe=golpe, pop=pop, ding=ding, brillo=brillo)
ev, dur, out = json.load(open(sys.argv[1])), float(sys.argv[2]), sys.argv[3]
y = np.zeros(int(dur * R) + R)
for e in ev:
    s = SON[e["s"]](); i = int(max(0, e["t"] - (0.12 if e["s"] == "whoosh" else 0)) * R); y[i:i + len(s)] += s
y = np.clip(y[:int(dur * R)] * 0.9, -1, 1)
w = wave.open(out, "w"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(R); w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
