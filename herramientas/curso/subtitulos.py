"""Subtítulos ASS (panel inferior izquierdo) desde la transcripción del audio ya editado."""
import json, sys, re
trans, out, desfase = sys.argv[1], sys.argv[2], float(sys.argv[3])
REP = [(r"\b(orden|order) ?blocs?\b", "order block"), (r"\bhorreblos?\b", "order block"), (r"\bordeblocks?\b", "order block"),
       (r"\bos puedes\b", "puedes"), (r"\besta análisis\b", "este análisis"), (r"\bmire\b", "mira"), (r"^¿(Significa[^?]*)\?$", r"\1.")]
ws = [[a, b, t.strip()] for s in json.load(open(trans)) for a, b, t in s["palabras"] if t.strip()]
def ts(t):
    t += desfase; return f"{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}"
grupos, g = [], []
for i, w in enumerate(ws):
    g.append(w); sig = ws[i + 1] if i + 1 < len(ws) else None
    largo = len(" ".join(x[2] for x in g))
    if not sig or sig[0] - w[1] > 0.5 or largo > 46 or (largo > 26 and w[2][-1] in ",.?") or w[2][-1] in ".?":
        grupos.append(g); g = []
lineas = []
for k, g in enumerate(grupos):
    txt = " ".join(x[2] for x in g)
    for a, b in REP: txt = re.sub(a, b, txt)
    txt = txt.rstrip(",")
    fin = g[-1][1] + 0.3
    if k + 1 < len(grupos): fin = min(fin, grupos[k + 1][0][0])
    lineas.append(f"Dialogue: 0,{ts(g[0][0])},{ts(fin)},S,,0,0,0,,{txt}")
cab = """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,IBM Plex Sans SemiBold,44,&H00F9F1EC,&H00F9F1EC,&H00261407,&H80000000,0,0,0,0,100,100,0,0,1,0,0,1,40,600,92,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
open(out, "w").write(cab + "\n".join(lineas) + "\n")
print(len(lineas), "subtítulos, el más largo:", max(len(l.split(",,")[-1]) for l in lineas))
