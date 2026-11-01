"""Audio de un Reel «expediente»: voz por bloque en sus tiempos, cama musical tensa y efectos sintetizados en cada evento.

    python mezcla.py <tiempos.json de la versión> <dir de voces> <eventos.json> <salida.wav>

La cama (drone grave, pulso a 96 bpm y golpe en cada cambio de bloque) baja sola cuando habla la voz.
Los efectos salen de los data-s de la escena: cinta, sello/impacto, tics, maquina, clic, pop, moneda, whoosh, ding, cohete, sube.
"""
import json, sys, wave
import numpy as np

R = 48000
rng = np.random.default_rng(11)


def lp(x, k): return np.convolve(x, np.ones(k) / k, mode="same")
def env(n, a, d): t = np.arange(n) / R; return np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)


def leer(f):
    w = wave.open(f); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
    if w.getnchannels() == 2: x = x.reshape(-1, 2).mean(1)
    sr = w.getframerate()
    return np.interp(np.arange(int(len(x) * R / sr)) * sr / R, np.arange(len(x)), x)


def whoosh(d=.45):
    n = int(d * R); t = np.arange(n) / R; x = rng.standard_normal(n)
    return (x - lp(x, 12)) * np.sin(np.pi * t / t[-1]) ** 2 * .35
def impacto():
    n = int(.7 * R); t = np.arange(n) / R
    return (np.sin(2 * np.pi * (70 * t - 30 * t ** 2)) * np.exp(-t / .18) * .9 + lp(rng.standard_normal(n), 3) * np.exp(-t / .025) * .6) * .8
def cinta():
    n = int(.28 * R); t = np.arange(n) / R; x = rng.standard_normal(n)
    return (x - lp(x, 4)) * np.minimum(1, t / .03) * np.exp(-t / .1) * (1 + .6 * np.sin(2 * np.pi * 60 * t)) * .3
def tic(f=2400, a=.25):
    n = int(.035 * R); t = np.arange(n) / R; return np.sin(2 * np.pi * f * t) * np.exp(-t / .006) * a
def tics(d=1.2):
    y = np.zeros(int((d + .1) * R)); k = 0
    for s in np.cumsum(.03 + .1 * np.linspace(0, 1, 16) ** 2):
        if s > d: break
        i = int(s * R); c = tic(1800 + 60 * k); y[i:i + len(c)] += c[:len(y) - i]; k += 1
    return y
def maquina(d=.9):
    y = np.zeros(int((d + .1) * R))
    for s in np.arange(0, d, .075) + rng.uniform(0, .02, len(np.arange(0, d, .075))):
        i = int(s * R); n = int(.02 * R); c = lp(rng.standard_normal(n), 2) * np.exp(-np.arange(n) / R / .004) * .35
        y[i:i + n] += c[:len(y) - i]
    return y
def clic(): return tic(3200, .5) + np.pad(tic(1200, .3), (int(.012 * R), 0))[:int(.035 * R)]
def pop():
    n = int(.16 * R); t = np.arange(n) / R; f = 800 * np.exp(-t / .04) + 260
    return np.sin(2 * np.pi * np.cumsum(f) / R) * env(n, .003, .05) * .5
def ding():
    n = int(1.1 * R); t = np.arange(n) / R
    return sum(np.sin(2 * np.pi * f * t) * a for f, a in ((1318.5, .45), (1975.5, .25))) * env(n, .003, .3) * .5
def moneda():
    n = int(.6 * R); t = np.arange(n) / R
    return (np.sin(2 * np.pi * 2093 * t) + .6 * np.sin(2 * np.pi * 2637 * t)) * env(n, .002, .12) * .3
def sube():
    n = int(.7 * R); t = np.arange(n) / R
    return np.sin(2 * np.pi * np.cumsum(200 + 900 * t / t[-1]) / R) * np.sin(np.pi * t / t[-1]) * .18
def cohete(): return whoosh(.9) * 1.3 + np.pad(sube(), (0, int(.2 * R)))[:int(.9 * R)] * .5
SFX = dict(whoosh=whoosh, impacto=impacto, sello=impacto, cinta=cinta, tics=tics, maquina=maquina, clic=clic, pop=pop,
           ding=ding, moneda=moneda, sube=sube, cohete=cohete)


def main():
    tj, vdir, ev, out = sys.argv[1:5]
    T = json.load(open(tj)); n = int((T["total"] + .3) * R); t = np.arange(n) / R
    voz = np.zeros(n)
    for b in T["bloques"]:
        v = leer(f"{vdir}/{b['nombre']}.wav"); i = int(b["ini"] * R); voz[i:i + len(v)] += v[:n - i]
    voz = voz / (np.abs(voz).max() + 1e-9) * .9
    # cama: drone en re menor, pulso grave a 96 bpm y golpe en cada cambio de bloque
    lfo = .5 + .5 * np.sin(2 * np.pi * .07 * t)
    cama = .16 * np.sin(2 * np.pi * 36.7 * t) + .09 * np.sin(2 * np.pi * 73.4 * t + 1) + .05 * np.sin(2 * np.pi * 110 * t) * lfo
    cama += lp(rng.standard_normal(n), 300) * .25
    for s in np.arange(0, T["total"], 60 / 96):
        i = int(s * R); L = int(.25 * R); tt = np.arange(L) / R
        k = np.sin(2 * np.pi * np.cumsum(45 + 70 * np.exp(-tt * 30)) / R) * np.exp(-tt * 13) * .35
        cama[i:i + L] += k[:n - i]
    for b in T["bloques"][1:]:
        i = int(b["ini"] * R); g = impacto() * .5; cama[i:i + len(g)] += g[:n - i]
    cama = np.tanh(cama * 1.3) * .7
    fx = np.zeros(n)
    for e in json.load(open(ev)):
        s = SFX.get(e["s"], whoosh)(); i = int(max(0, e["t"] - (.15 if e["s"] in ("whoosh", "cohete") else 0)) * R)
        fx[i:i + len(s)] += s[:n - i]
    hab = lp(np.abs(voz), int(.3 * R)); duck = 1 - .72 * np.clip(hab / .04, 0, 1)
    mez = cama * .45 * duck + voz + fx * .55
    mez[-int(.6 * R):] *= np.linspace(1, 0, int(.6 * R))
    y = (np.clip(mez, -1, 1) * 32767).astype(np.int16)
    w = wave.open(out, "w"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(R); w.writeframes(y.tobytes()); w.close()


if __name__ == "__main__":
    main()
