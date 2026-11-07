#!/usr/bin/env python3
"""Pasa las escenas generadas con Qwen a un dir de trabajo de pizarra (el formato de edge-tts).

    python herramientas/voces/a_trabajo.py <textos.json> <dir de wav> <dir de trabajo> [NN=otro_dir ...]

Escribe <trabajo>/audio/NN.mp3 y NN.json ([{"texto","ini","fin"}] con las palabras del texto) usando faster-whisper
(medium, con el texto como pista) para los tiempos. NN=dir reemplaza la escena NN por la de otro dir (regeneradas).
Después: herramientas/unir_voz.sh, musica_fondo.py y tiempos_pizarra.py como siempre.
"""
import difflib, json, os, re, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel
from num2words import num2words

def nz(w):
    w = re.sub(r"[^\wáéíóúüñ%]", "", w.lower()).replace("%", "")
    return " ".join(num2words(int(w), lang="es").split()) if w.isdigit() else w

def main():
    textos = json.load(open(sys.argv[1])); wd = sys.argv[2]; tr = sys.argv[3]
    otros = dict(a.split("=", 1) for a in sys.argv[4:])
    os.makedirs(os.path.join(tr, "audio"), exist_ok=True)
    m = WhisperModel("medium", device="cpu", compute_type="int8")
    for k, t in textos.items():
        f = os.path.join(otros.get(k, wd), f"{k}.wav")
        a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ar", "16000", "-ac", "1", "-f", "f32le", "-"],
                                         capture_output=True).stdout, np.float32)
        segs, _ = m.transcribe(a, language="es", word_timestamps=True, initial_prompt=t)
        ws = [(w.start, w.end, w.word.strip()) for s in segs for w in s.words]
        gv = t.split()
        # whisper puede juntar o separar números: comparar por palabras normalizadas (números a letras)
        gn = [nz(w) for w in gv]; on = [nz(w[2]) for w in ws]
        sm = difflib.SequenceMatcher(None, gn, on, autojunk=False); ti = [None] * len(gv)
        for i, j, n in sm.get_matching_blocks():
            for q in range(n): ti[i + q] = (ws[j + q][0], ws[j + q][1])
        for op, i1, i2, j1, j2 in sm.get_opcodes():  # tramos distintos: repartir el tiempo de lo oído
            if op in ("replace", "delete") and i2 > i1:
                t0 = ws[j1][0] if j1 < len(ws) and j2 > j1 else (ti[i1 - 1][1] if i1 and ti[i1 - 1] else 0)
                t1 = ws[j2 - 1][1] if j2 > j1 else t0 + .25 * (i2 - i1)
                for q in range(i1, i2):
                    a0 = t0 + (t1 - t0) * (q - i1) / (i2 - i1); ti[q] = (a0, a0 + (t1 - t0) / (i2 - i1))
        json.dump([{"texto": w, "ini": round(x, 3), "fin": round(y, 3)} for w, (x, y) in zip(gv, ti)],
                  open(os.path.join(tr, "audio", f"{k}.json"), "w"), ensure_ascii=False)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-ar", "48000", "-ac", "1", "-b:a", "192k",
                        os.path.join(tr, "audio", f"{k}.mp3")], check=True)
        print(k, f"{sm.ratio():.0%}", flush=True)

if __name__ == "__main__":
    main()
