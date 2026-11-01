#!/usr/bin/env python3
"""Audio de un Reel/Short «expediente cine»: voz, cama de suspenso y efectos con reverberación.

    python herramientas/cine/mezcla.py <tiempos.json> <dir voz> <eventos.json> <salida.wav>

- Voz: los WAV de herramientas/cine/voz.py, cada uno en su tiempo.
- Cama: drone en re menor que respira, pulso grave (latido) a 92 bpm, pad de cuerdas sintético y una subida antes de
  cada cambio de bloque. Baja sola (ducking) cuando habla la voz.
- Efectos: los de la escena (data-s y "son" de las partículas), sintetizados con los de herramientas/expediente/mezcla.py,
  más un golpe grave con cola de reverberación en cada impacto y sello.
Sale en estéreo a 48 kHz; el loudnorm a −14 LUFS lo hace ffmpeg al unir con el video.
"""
import json, os, subprocess, sys, wave
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "expediente"))
from mezcla import R, SFX, lp, leer, impacto, whoosh  # noqa: E402

rng = np.random.default_rng(5)


def reverb(x, seg=1.8, mezcla=.35):
    """Reverberación de sala: convolución con ruido que decae (por FFT)."""
    n = int(seg * R); t = np.arange(n) / R
    ir = rng.standard_normal(n) * np.exp(-t / (seg / 6.9)); ir = lp(ir, 6); ir[0] = 0; ir /= np.abs(ir).sum() / 6
    m = len(x) + n; f = np.fft.rfft(x, m) * np.fft.rfft(ir, m)
    return x * (1 - mezcla) + np.fft.irfft(f, m)[:len(x)] * mezcla


def boom():
    """Golpe grave de cine: el impacto de la mezcla del expediente más un sub que baja."""
    n = int(1.6 * R); t = np.arange(n) / R
    sub = np.sin(2 * np.pi * (48 * t - 14 * t ** 2)) * np.exp(-t / .45)
    return np.pad(impacto(), (0, n - len(impacto()))) * .8 + sub * .9


def riser(d=.9):
    """Subida de ruido y tono que anticipa el cambio de bloque."""
    n = int(d * R); t = np.arange(n) / R; x = rng.standard_normal(n)
    y = x - lp(x, 30) * (1 - t / d)
    return y * (t / d) ** 2.2 * .22 + np.sin(2 * np.pi * np.cumsum(120 + 500 * (t / d) ** 2) / R) * (t / d) ** 2 * .08


def main():
    tj, vdir, ev, out = sys.argv[1:5]
    T = json.load(open(tj)); total = T["total"] + .4; n = int(total * R); t = np.arange(n) / R
    voz = np.zeros(n)
    for b in T["bloques"]:
        v = leer(f"{vdir}/{b['nombre']}.wav"); i = int(b["ini"] * R); voz[i:i + len(v)] += v[:n - i]
    voz = voz / (np.abs(voz).max() + 1e-9) * .92
    # cama
    lfo = .5 + .5 * np.sin(2 * np.pi * .05 * t)
    cama = .15 * np.sin(2 * np.pi * 36.71 * t) + .08 * np.sin(2 * np.pi * 73.42 * t + 1) + .05 * np.sin(2 * np.pi * 55.0 * t) * lfo
    pad = sum(np.sign(np.sin(2 * np.pi * f * t + p)) * a for f, a, p in ((146.83, .03, 0), (174.61, .025, 1), (220.0, .022, 2), (293.66, .012, .5)))
    cama += lp(pad, 60) * (.6 + .4 * lfo)
    cama += lp(rng.standard_normal(n), 400) * .2
    for s in np.arange(.15, total, 60 / 92):  # latido: dos golpes graves
        for d, a in ((0, .4), (.16, .25)):
            i = int((s + d) * R); L = int(.3 * R); tt = np.arange(L) / R
            k = np.sin(2 * np.pi * np.cumsum(42 + 60 * np.exp(-tt * 28)) / R) * np.exp(-tt * 11) * a
            cama[i:i + L] += k[:max(0, n - i)]
    cama = np.tanh(cama * 1.2) * .75
    fx = np.zeros(n)
    for b in T["bloques"][1:]:  # subida antes de cada bloque
        r = riser(.9); i = int((b["ini"] - .9) * R)
        if i > 0: fx[i:i + len(r)] += r[:n - i]
    for e in json.load(open(ev)):
        s = boom() if e["s"] in ("impacto", "sello") else SFX.get(e["s"], whoosh)()
        i = int(max(0, e["t"] - (.15 if e["s"] in ("whoosh", "cohete") else 0)) * R); fx[i:i + len(s)] += s[:n - i]
    fx = reverb(fx, 1.6, .3)
    hab = lp(np.abs(voz), int(.25 * R)); duck = 1 - .7 * np.clip(hab / .04, 0, 1)
    mez_c = cama * .5 * duck
    vozr = voz if T.get("voz_grabada") else reverb(voz, .5, .06)  # la voz grabada ya trae su sala
    # estéreo: la cama y los efectos un poco abiertos, la voz al centro
    izq = mez_c + vozr + fx * .6
    der = np.roll(mez_c, int(.012 * R)) + vozr + np.roll(fx, int(.008 * R)) * .6
    if os.environ.get("MUSICA"):
        # música real en lugar de la cama sintetizada: MUSICA=<archivo> MUSICA_DESDE=<segundo del tema> MUSICA_DB=<nivel>
        # Queda ~MUSICA_DB dB por debajo de la voz mientras se habla y sube 6 dB en las pausas; los efectos bajan un poco.
        raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", os.environ.get("MUSICA_DESDE", "0"), "-i", os.environ["MUSICA"],
                              "-t", f"{total:.2f}", "-ac", "2", "-ar", str(R), "-f", "f32le", "-"], capture_output=True, check=True).stdout
        mu = np.frombuffer(raw, np.float32).reshape(-1, 2); mu = np.pad(mu, ((0, max(0, n - len(mu))), (0, 0)))[:n]
        rv = np.sqrt(np.mean(voz[np.abs(voz) > .02] ** 2)); rm = np.sqrt(np.mean(mu ** 2)) + 1e-9
        mu = mu * rv / rm * 10 ** (-float(os.environ.get("MUSICA_DB", "20")) / 20)
        abre = 1 + np.clip(1 - hab / .03, 0, 1) * (10 ** (6 / 20) - 1)  # en las pausas sube 6 dB
        g = lp(abre, int(.2 * R)) * np.minimum(1, t / .4)
        izq = vozr + fx * .45 + mu[:, 0] * g; der = vozr + np.roll(fx, int(.008 * R)) * .45 + mu[:, 1] * g
    for c in (izq, der):
        c[:int(.05 * R)] *= np.linspace(0, 1, int(.05 * R)); c[-int(.8 * R):] *= np.linspace(1, 0, int(.8 * R))
    y = np.stack([izq, der], 1); y = y / max(1, np.abs(y).max() / .97)
    w = wave.open(out, "w"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(R)
    w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
    print(out, f"{total:.2f} s")


if __name__ == "__main__":
    main()
