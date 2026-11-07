#!/usr/bin/env python3
"""Compara la voz generada con el guion, escena por escena: palabras y entonación de las preguntas.

    python herramientas/voces/verificar_voz.py <textos.json> <dir de wav> [informe.json]

Transcribe cada NN.wav con faster-whisper (medium, sin pista del texto, para oír lo que de verdad se dice), pasa los
números a palabras y compara con el texto. Marca:
- PALABRAS: menos del 94 % de coincidencia (palabras cambiadas, comidas o repetidas).
- PREGUNTA: una pregunta del guion que no sonó como pregunta, o una afirmación que sonó como pregunta.
La puntuación de whisper no es perfecta: lo marcado se escucha y, si está mal, se regenera con otra semilla.
"""
import difflib, json, os, re, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel
from num2words import num2words

def palabras(texto):
    """[(palabra normalizada, termina_en_pregunta)]"""
    out = []
    for tok in texto.split():
        q = tok.rstrip().endswith("?")
        t = tok.replace("%", " por ciento").replace(".", "") if re.search(r"\d", tok) else tok
        for p in t.split():
            p = re.sub(r"[^\wáéíóúüñ]", "", p.lower())
            if not p: continue
            if p.isdigit():
                out += [(x, False) for x in num2words(int(p), lang="es").split()]
            else:
                out.append((p, False))
        if out and q: out[-1] = (out[-1][0], True)
    return out

def main():
    textos = json.load(open(sys.argv[1])); d = sys.argv[2]; inf = sys.argv[3] if len(sys.argv) > 3 else None
    m = WhisperModel("medium", device="cpu", compute_type="int8"); res = {}
    for k, t in textos.items():
        f = os.path.join(d, f"{k}.wav")
        if not os.path.exists(f): continue
        a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ar", "16000", "-ac", "1", "-f", "f32le", "-"],
                                         capture_output=True).stdout, np.float32)
        oido = " ".join(s.text for s in m.transcribe(a, language="es")[0])
        g, o = palabras(t), palabras(oido)
        sm = difflib.SequenceMatcher(None, [x[0] for x in g], [x[0] for x in o], autojunk=False)
        mapa = {}
        for i, j, n in sm.get_matching_blocks():
            for q in range(n): mapa[i + q] = j + q
        prob = []
        if sm.ratio() < .94: prob.append(f"PALABRAS {sm.ratio():.0%}")
        for i, (p, q) in enumerate(g):
            j = mapa.get(i)
            if j is None: continue
            oq = any(o[x][1] for x in range(max(0, j - 1), min(len(o), j + 2)))
            if q and not oq: prob.append(f"PREGUNTA no sonó como pregunta: «…{' '.join(x[0] for x in g[max(0,i-4):i+1])}?»")
            if oq and not q and o[j][1]: prob.append(f"AFIRMACIÓN sonó como pregunta: «…{' '.join(x[0] for x in g[max(0,i-4):i+1])}»")
        res[k] = {"ok": not prob, "problemas": prob, "oido": oido}
        print(k, "ok" if not prob else " | ".join(prob), flush=True)
    if inf: json.dump(res, open(inf, "w"), ensure_ascii=False, indent=1)
    print(sum(not r["ok"] for r in res.values()), "escenas para revisar de", len(res))

if __name__ == "__main__":
    main()
