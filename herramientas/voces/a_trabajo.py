#!/usr/bin/env python3
"""Pasa las escenas generadas con Qwen a un dir de trabajo de pizarra (el formato de edge-tts).

    python herramientas/voces/a_trabajo.py <textos.json> <dir de wav> <dir de trabajo> [NN=otro_dir ...]

Escribe <trabajo>/audio/NN.mp3 y NN.json ([{"texto","ini","fin"}] con las palabras del texto) usando faster-whisper
(medium, sin pista: con el texto como pista se salta el comienzo de algunas escenas) para los tiempos. NN=dir reemplaza la escena NN por la de otro dir (regeneradas).
Después: herramientas/unir_voz.sh, musica_fondo.py y tiempos_pizarra.py como siempre.
"""
import difflib, json, os, re, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel
from num2words import num2words

def nz(w):
    """Palabra normalizada; los números (y %) se expanden a varias palabras: «30%» → treinta por ciento."""
    w = w.lower()
    out = []
    for p in re.findall(r"\d+(?:[.,]\d+)*%?|[^\W\d_]+%?|%", w):
        pc = p.endswith("%"); p = p.rstrip("%")
        if p and p[0].isdigit():
            p = p.replace(".", "")
            if "," in p:
                a, b = p.split(",", 1); out += num2words(int(a), lang="es").split() + ["coma"] + num2words(int(b), lang="es").split()
            else:
                out += num2words(int(p), lang="es").split()
        elif p:
            out.append(p)
        if pc: out += ["por", "ciento"]
    return out

def main():
    textos = json.load(open(sys.argv[1])); wd = sys.argv[2]; tr = sys.argv[3]
    otros = dict(a.split("=", 1) for a in sys.argv[4:])
    os.makedirs(os.path.join(tr, "audio"), exist_ok=True)
    m = WhisperModel("medium", device="cpu", compute_type="int8")
    for k, t in textos.items():
        f = os.path.join(otros.get(k, wd), f"{k}.wav")
        a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ar", "16000", "-ac", "1", "-f", "f32le", "-"],
                                         capture_output=True).stdout, np.float32)
        segs, _ = m.transcribe(a, language="es", word_timestamps=True)  # sin pista: con el texto como pista whisper se salta el comienzo
        ws = [(w.start, w.end, w.word.strip()) for s in segs for w in s.words]
        gv = t.split()
        # whisper puede juntar o separar números: comparar por palabras normalizadas (números a letras)
        # cada palabra del texto y de lo oído se expande; se alinea por sub-palabras y se vuelve a la palabra original
        gn, gi = [], []
        for i, w in enumerate(gv):
            for x in nz(w) or [""]: gn.append(x); gi.append(i)
        on, ot = [], []
        for a0, a1, w in ws:
            xs = nz(w) or [""]
            for q, x in enumerate(xs):
                d = (a1 - a0) / len(xs); on.append(x); ot.append((a0 + d * q, a0 + d * (q + 1)))
        sm = difflib.SequenceMatcher(None, gn, on, autojunk=False); ti = [None] * len(gv)
        for i, j, n in sm.get_matching_blocks():
            for q in range(n):
                k2 = gi[i + q]; a0, a1 = ot[j + q]
                ti[k2] = (min(ti[k2][0], a0), max(ti[k2][1], a1)) if ti[k2] else (a0, a1)
        ws2 = ws; ws = [(a, b, "") for a, b in ot]  # para el reparto de huecos, en sub-palabras
        for op, i1, i2, j1, j2 in sm.get_opcodes():  # tramos distintos: repartir el tiempo de lo oído
            idx = sorted({gi[q] for q in range(i1, i2) if ti[gi[q]] is None})
            if op in ("replace", "delete") and idx:
                prev = next((ti[x][1] for x in range(idx[0] - 1, -1, -1) if ti[x]), 0)
                t0 = ws[j1][0] if j1 < len(ws) and j2 > j1 else prev
                t1 = ws[j2 - 1][1] if j2 > j1 else t0 + .25 * len(idx)
                for n_, q in enumerate(idx):
                    a0 = t0 + (t1 - t0) * n_ / len(idx); ti[q] = (a0, a0 + (t1 - t0) / len(idx))
        for q in range(len(gv)):  # lo que quede sin tiempo: pegado a la anterior
            if ti[q] is None:
                p0 = ti[q - 1][1] if q and ti[q - 1] else 0; ti[q] = (p0, p0 + .2)
        json.dump([{"texto": w, "ini": round(x, 3), "fin": round(y, 3)} for w, (x, y) in zip(gv, ti)],
                  open(os.path.join(tr, "audio", f"{k}.json"), "w"), ensure_ascii=False)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-ar", "48000", "-ac", "1", "-b:a", "192k",
                        os.path.join(tr, "audio", f"{k}.mp3")], check=True)
        print(k, f"{sm.ratio():.0%}", flush=True)

if __name__ == "__main__":
    main()
