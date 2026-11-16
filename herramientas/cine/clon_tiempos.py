#!/usr/bin/env python3
"""Tiempos del motor cine (window.T) para un Reel con el clon de la voz de Lean (Qwen3-TTS).

    python herramientas/cine/clon_tiempos.py <guion.json> <dir wav de Qwen> <trabajo de a_trabajo.py> <salida> ig|yt

<guion.json>: {"bloques": [{id, etiqueta, pausa, solo, wav (nombre en el dir de Qwen)}], "pantalla": {voz → pantalla}}.
Los tiempos por palabra salen de herramientas/voces/a_trabajo.py (<trabajo>/audio/NN.json, whisper alineado al texto).
Escribe <salida>/voz/<id>.wav (cadena de voz.py, cortado 0,18 s después de la última palabra) y <salida>/tiempos-<v>.json/.js
con "voz_clon": true (el pie dice voz generada con IA).
"""
import json, os, subprocess, sys
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(__file__))
from voz import CADENA, agrupar

guion, wdir, trab, out, v = sys.argv[1:6]
g = json.load(open(guion, encoding="utf-8"))
os.makedirs(f"{out}/voz", exist_ok=True)
t, bl = 0.15, []
for b in g["bloques"]:
    if b.get("solo") and b["solo"] != v: continue
    w = b.get("wav", b["id"])
    pal = [[p["ini"], p["fin"], p["texto"]] for p in json.load(open(f"{trab}/audio/{w}.json"))]
    # Corte por la energía real de la voz (whisper marca el arranque tarde y el corte se comía la primera sílaba):
    # empieza 0,05 s antes del primer sonido y termina 0,15 s después del último, con fundidos suaves.
    a, sr = sf.read(f"{wdir}/{w}.wav"); a = a.mean(1) if a.ndim > 1 else a
    fr = int(.01 * sr); e = np.array([np.sqrt(np.mean(a[i:i + fr] ** 2)) for i in range(0, len(a) - fr, fr)])
    act = np.where(20 * np.log10(e + 1e-9) > -45)[0]
    ini0 = max(0, act[0] * .01 - .05) if len(act) else 0
    fin = min(len(a) / sr, max(pal[-1][1], (act[-1] + 1) * .01) + .15) if len(act) else pal[-1][1] + .18
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{wdir}/{w}.wav", "-af",
                    CADENA + f",atrim={ini0:.3f}:{fin:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={fin-ini0-0.12:.3f}:d=0.12",
                    "-ar", "48000", "-ac", "1", f"{out}/voz/{b['id']}.wav"], check=True)
    dur = fin - ini0
    pal = [[round(t + a - ini0, 3), round(t + c - ini0, 3), s] for a, c, s in pal]
    subs = agrupar(pal, {**g.get("pantalla", {}), **b.get("pantalla", {})})
    bl.append({"id": b["id"], "nombre": b["id"], "ini": round(t, 3), "dur": round(dur, 3), "etiqueta": b.get("etiqueta", ""),
               "palabras": pal, "subs": subs})
    print(b["id"], f"{dur:.2f} s", len(pal), "palabras")
    t += dur + b.get("pausa", 0.3)
T = {"total": round(t + 0.2, 2), "voz_clon": True, "bloques": bl}
json.dump(T, open(f"{out}/tiempos-{v}.json", "w"), ensure_ascii=False)
open(f"{out}/tiempos-{v}.js", "w").write("window.T=" + json.dumps(T, ensure_ascii=False) + ";")
print("total", T["total"])
