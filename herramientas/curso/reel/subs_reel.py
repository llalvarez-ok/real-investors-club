"""Subtítulos grandes del reel (1080x1920): grupos cortos en mayúsculas, palabras clave en oro, centrados en y=1101."""
import json, re, sys
ws = [w for w in json.load(open(sys.argv[1])) if w[2]]
REP = [(r"\b(ORDEN|ORDER) ?BLOCS?\b", "ORDER BLOCK"), (r"\bMIRE\b", "MIRA"), (r"^¿(SIGNIFICA.*)$", r"\1")]
CLAVE = r"(ORDER BLOCK|BLOQUE DE ÓRDENES|ÚLTIMA VELA|UNA SOLA VELA|RECHAZO|DIRECCIONALIDAD)"
def ts(t): return f"0:{int(t // 60):02d}:{t % 60:05.2f}"
gr, g = [], []
for i, w in enumerate(ws):
    g.append(w); sig = ws[i + 1] if i + 1 < len(ws) else None
    L = len(" ".join(x[2] for x in g))
    junto = sig and re.match(r"(de|órdenes,?|bloc\.?|vela,?)$", sig[2].lower()) and g[-1][2].lower().rstrip(",") in ("bloque", "de", "orden", "sola", "última")
    if not sig or sig[0] - w[1] > 0.35 or w[2][-1] in ".?," or (L > 14 and not junto):
        gr.append(g); g = []
out = []
for k, g in enumerate(gr):
    t = " ".join(x[2] for x in g).upper()
    for a, b in REP: t = re.sub(a, b, t)
    t = t.rstrip(",.")
    t = re.sub(CLAVE, r"{\\c&H8CC6E2&}\1{\\c&HF9F1EC&}", t)
    fin = g[-1][1] + 0.25
    if k + 1 < len(gr): fin = min(fin, gr[k + 1][0][0])
    out.append(f"Dialogue: 0,{ts(g[0][0])},{ts(fin)},S,,0,0,0,,{{\\pos(540,1101)\\fscx90\\fscy90\\t(0,90,\\fscx100\\fscy100)}}{t}")
cab = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,Archivo Black,64,&H00F9F1EC,&H00F9F1EC,&H00261407,&H90000000,0,0,0,0,100,100,1,0,1,5,2,5,40,40,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
open(sys.argv[2], "w").write(cab + "\n".join(out) + "\n")
print(len(out), max(len(re.sub(r"\{[^}]*\}", "", l.split(",,")[-1])) for l in out))
