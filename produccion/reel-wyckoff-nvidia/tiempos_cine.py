"""Tiempos de la voz de Lean (palabras-ig.json y palabras-yt_cierre.json) en el formato del motor cine (window.T)."""
import json
P = json.load(open('palabras-ig.json'))
C = json.load(open('palabras-yt_cierre.json'))
CORTES = [('01', 0, 'EXPEDIENTE · NVIDIA'), ('02', 19, 'MÉTODO WYCKOFF'), ('03', 34, 'FASE 1 · EUFORIA'), ('04', 40, 'FASE 2 · CAÍDA'),
          ('05', 47, 'FASE 3 · TRAMPA'), ('06', 60, 'FASE 4 · RUPTURA'), ('07', 77, 'HOY · 12/11'), ('08', 93, 'FASE E'),
          ('09', 102, 'ESCENARIO'), ('10', 127, 'LA LECCIÓN'), ('11', 139, 'CIERRE')]
FIN_CUERPO = 139           # la última palabra del cuerpo es la 138
OFF_YT = 58.80             # en voz_yt.wav el cierre de YouTube arranca acá
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
ig = bloques([[w['i'], w['f'], w['w']] for w in P[FIN_CUERPO:]], 61.0)
yt = bloques([[round(w['i'] + OFF_YT, 2), round(w['f'] + OFF_YT, 2), w['w']] for w in C], 64.15)
for v, d in (('ig', ig), ('yt', yt)):
    open(f'tiempos-{v}.js', 'w').write('window.T=' + json.dumps(d, ensure_ascii=False) + ';\n')
    print(v, [(b['id'], b['ini']) for b in d['bloques']])
