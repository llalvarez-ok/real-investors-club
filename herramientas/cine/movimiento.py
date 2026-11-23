#!/usr/bin/env python3
"""Chequeo de movimiento de un video (idea de motioncheck.py de Lemo-Opuscar, MIT, adaptada a 30 fps y vertical).

    python3 -I herramientas/cine/movimiento.py <video.mp4> [--umbral 0.08] [--max 1.0]

Mide la diferencia media entre cuadros consecutivos (luma a 270x480) y avisa de:
- tramos de más de --max segundos (1 s por defecto) en los que la imagen casi no cambia (diferencia < --umbral);
- cuadros negros sueltos y saltos bruscos (un cuadro que cambia mucho más que sus vecinos).
Correrlo sobre el render SIN grano: el grano de ffmpeg cambia todos los cuadros y taparía los tramos quietos.
Código 0 si pasa, 1 si hay tramos quietos o cuadros negros.
"""
import subprocess, sys
import numpy as np

args = sys.argv[1:]
f = args[0]
op = lambda k, d: float(args[args.index(k) + 1]) if k in args else d
UMBRAL, MAX = op('--umbral', .08), op('--max', 1.0)
W, H = 270, 480
info = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', f],
                      capture_output=True, text=True).stdout.strip()
n_, d_ = info.split('/'); fps = float(n_) / float(d_)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.int16)
d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))
negros = [i for i in range(len(fr)) if fr[i].mean() < 3]
quietos, ini = [], None
for i, x in enumerate(list(d) + [9e9]):
    if x < UMBRAL and ini is None: ini = i
    if x >= UMBRAL and ini is not None:
        if (i - ini) / fps > MAX: quietos.append((ini / fps, i / fps))
        ini = None
fpsi = int(round(fps)); por_seg = [d[i * fpsi:(i + 1) * fpsi].mean() for i in range(len(d) // fpsi)]
salto = max(d[i] / max(.25, np.median(d[max(0, i - 3):i + 4])) for i in range(len(d)))
print(f'cuadros {len(fr)} a {fps:.0f} fps · umbral {UMBRAL} · máximo quieto {MAX} s')
print('movimiento por segundo: ' + ' '.join(f'{x:.2f}' for x in por_seg))
print(f'segundo más quieto {min(por_seg):.2f} · más movido {max(por_seg):.2f} · peor salto de un cuadro ×{salto:.1f}')
print('tramos quietos: ' + (', '.join(f'{a:.2f}–{b:.2f} s' for a, b in quietos) if quietos else 'ninguno'))
print('cuadros negros: ' + (str(negros[:10]) if negros else 'ninguno'))
sys.exit(1 if quietos or negros else 0)
