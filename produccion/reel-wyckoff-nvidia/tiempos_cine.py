"""Tiempos de la voz de Lean (palabras-ig.json y palabras-yt_cierre.json) en el formato del motor cine (window.T)."""
import json
P0 = json.load(open('palabras-ig.json'))
# Apertura «¿Fue culpa del CEO?» (12/11/2026): la voz real de Lean dice «Si comprás en los récords, mirá esto.» (palabras 0-6),
# sigue la frase del clon de su voz (Qwen3-TTS, ver apertura-ceo.md) desde 3,25 s y vuelve la grabación desde «Richard» (+3,90 s).
CLON = json.load(open('palabras-clon-ceo.json'))
INI_CLON, CORRE = 3.25, 3.90
P = P0[:7] + [dict(w=w['w'], i=round(w['i'] + INI_CLON, 2), f=round(w['f'] + INI_CLON, 2)) for w in CLON] + \
    [dict(w=w['w'], i=round(w['i'] + CORRE, 2), f=round(w['f'] + CORRE, 2)) for w in P0[19:]]
C = json.load(open('palabras-yt_cierre.json'))
CORTES = [('01', 0, 'EXPEDIENTE · NVIDIA'), ('02', 33, 'MÉTODO WYCKOFF'), ('03', 48, 'FASE 1 · EUFORIA'), ('04', 54, 'FASE 2 · CAÍDA'),
          ('05', 61, 'FASE 3 · TRAMPA'), ('06', 74, 'FASE 4 · RUPTURA'), ('07', 91, 'HOY · 12/11'), ('08', 107, 'FASE E'),
          ('09', 116, 'ESCENARIO'), ('10', 141, 'LA LECCIÓN'), ('11', 153, 'CIERRE')]
FIN_CUERPO = 153           # la última palabra del cuerpo es la 152
OFF_YT = 58.80 + 3.90             # en voz_yt.wav el cierre de YouTube arranca acá
def bloques(cierre, total):
    out = []
    for k, (bid, i0, et) in enumerate(CORTES[:-1]):
        i1 = CORTES[k + 1][1]
        ws = [[w['i'], w['f'], w['w']] for w in P[i0:i1]]
        out.append(dict(id=bid, ini=0 if k == 0 else round(ws[0][0] - .08, 2), etiqueta=et, palabras=ws, subs=ws))
    out.append(dict(id='11', ini=round(cierre[0][0] - .08, 2), etiqueta='CIERRE', palabras=cierre, subs=cierre))
    for k, b in enumerate(out):
        b['dur'] = round((out[k + 1]['ini'] if k + 1 < len(out) else total) - b['ini'], 2)
    return dict(total=total, voz_grabada=True, bloques=out)
ig = bloques([[w['i'], w['f'], w['w']] for w in P[FIN_CUERPO:]], 64.9)
yt = bloques([[round(w['i'] + OFF_YT, 2), round(w['f'] + OFF_YT, 2), w['w']] for w in C], 68.05)
for v, d in (('ig', ig), ('yt', yt)):
    open(f'tiempos-{v}.js', 'w').write('window.T=' + json.dumps(d, ensure_ascii=False) + ';\n')
    print(v, [(b['id'], b['ini']) for b in d['bloques']])
