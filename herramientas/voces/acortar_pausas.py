#!/usr/bin/env python3
"""Acorta las pausas largas dentro de cada escena (audio/NN.mp3) y corre los tiempos de sus palabras (NN.json).

    python herramientas/voces/acortar_pausas.py <dir de trabajo> [máx=0.45] [queda=0.35] [umbral_dB=-40]

Toda pausa de más de `máx` s por debajo de `umbral_dB` (no al principio ni al final) queda en `queda` s; las palabras que
siguen se corren lo mismo. Hay que correrlo antes de unir_voz.sh y tiempos_pizarra.py.
"""
import glob, json, os, subprocess, sys
import numpy as np
tr = sys.argv[1]; MAX = float(sys.argv[2]) if len(sys.argv) > 2 else .45; QUEDA = float(sys.argv[3]) if len(sys.argv) > 3 else .35
UMB = float(sys.argv[4]) if len(sys.argv) > 4 else -40; R = 48000
for mp3 in sorted(glob.glob(os.path.join(tr, "audio", "[0-9][0-9].mp3"))):
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", mp3, "-ac", "1", "-ar", str(R), "-f", "f32le", "-"], capture_output=True).stdout, np.float32)
    v = int(.01 * R); n = len(x) // v
    e = 20 * np.log10(np.sqrt((x[:n * v].reshape(n, v) ** 2).mean(1)) + 1e-9); sil = e < UMB
    cortes, i = [], 0
    while i < n:
        j = i
        while j < n and sil[j] == sil[i]: j += 1
        if sil[i] and i > 0 and j < n and (j - i) * v > MAX * R:
            a = i * v + int(QUEDA * R / 2); b = j * v - int(QUEDA * R / 2); cortes.append((a, b))
        i = j
    if not cortes: continue
    partes, prev = [], 0
    for a, b in cortes: partes.append(x[prev:a]); prev = b
    partes.append(x[prev:]); y = np.concatenate(partes)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(R), "-ac", "1", "-i", "-", "-b:a", "192k", mp3], input=y.astype(np.float32).tobytes(), check=True)
    jf = mp3[:-4] + ".json"; ws = json.load(open(jf))
    def mover(t):
        q = sum((b - a) / R for a, b in cortes if b / R <= t + 1e-6)
        return round(t - q, 3)
    for w in ws: w["ini"], w["fin"] = mover(w["ini"]), mover(w["fin"])
    json.dump(ws, open(jf, "w"), ensure_ascii=False)
    print(os.path.basename(mp3), len(cortes), "pausas,", round(sum(b - a for a, b in cortes) / R, 2), "s menos")
