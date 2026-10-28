#!/usr/bin/env python3
"""Tiempos de la voz para una escena de pizarra: dónde empieza cada escena y cuándo se dice cada palabra.

    python herramientas/tiempos_pizarra.py <dir de trabajo> <salida.js>

Lee <dir>/audio/NN.json (palabras de edge-tts) y <dir>/audio/pNN.wav (cada escena ya procesada por unir_voz.sh)
y escribe window.TIEMPOS = {total, escenas: [{ini, dur, palabras: [{p, t}]}]}, con t en segundos absolutos del video.
El aire entre escenas tiene que coincidir con el de unir_voz.sh.
"""
import glob
import json
import os
import re
import subprocess
import sys

AIRE = 0.15


def duracion(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True, check=True).stdout)


def main():
    trabajo, salida = sys.argv[1:3]
    escenas, ini = [], 0.0
    for wav in sorted(glob.glob(os.path.join(trabajo, "audio", "p[0-9][0-9].wav"))):
        n = os.path.basename(wav)[1:3]
        palabras = json.load(open(os.path.join(trabajo, "audio", n + ".json"), encoding="utf-8"))
        dur = duracion(wav) + AIRE
        escenas.append({"ini": round(ini, 3), "dur": round(dur, 3),
                        "palabras": [{"p": re.sub(r"[^\wáéíóúüñ]", "", x["texto"].lower()), "t": round(ini + x["ini"], 3)} for x in palabras]})
        ini += dur
    with open(salida, "w", encoding="utf-8") as f:
        f.write("window.TIEMPOS = " + json.dumps({"total": round(ini, 3), "escenas": escenas}, ensure_ascii=False) + ";\n")
    print(salida, len(escenas), "escenas,", round(ini, 2), "s")


if __name__ == "__main__":
    main()
