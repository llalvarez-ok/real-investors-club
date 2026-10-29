"""Plan de cortes: tramos elegidos a mano y, dentro de cada uno, los silencios de más de 0,35 s se acortan a 0,2 s."""
import json, sys, wave, numpy as np
c = json.load(open(sys.argv[1])); out = sys.argv[2]
w = wave.open(sys.argv[3]); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
H = 160  # 10 ms a 16 kHz
f = a[:len(a) // H * H].reshape(-1, H); db = 20 * np.log10(np.sqrt((f ** 2).mean(1)) + 1e-9)
sil = db < -50
subs = []
def ajusta(i):  # el corte cae en el punto más silencioso a ±0,15 s
    return i - 15 + int(np.argmin(db[i - 15:i + 16]))
for t0, t1 in c["tramos"]:
    i0, i1 = ajusta(int((t0 - c["desde"]) * 100)), ajusta(int((t1 - c["desde"]) * 100))
    cur = i0; i = i0
    while i < i1:
        if sil[i]:
            j = i
            while j < i1 and sil[j]: j += 1
            if j - i > 35 and i > i0 and j < i1:
                subs.append([cur, i + 10]); cur = j - 10
            elif j - i > 35 and i == i0: cur = j - 10
            elif j - i > 35 and j >= i1: i1 = i + 10
            i = j
        else: i += 1
    subs.append([cur, i1])
subs = [[c["desde"] + s / 100, c["desde"] + e / 100] for s, e in subs if e - s > 5]
# palabras en la línea de tiempo nueva
ws = json.load(open(c["palabras"])); nuevas = []; t = 0
for s, e in subs:
    for p0, p1, txt in ws:
        m = (p0 + min(p1, p0 + 0.6)) / 2
        if s <= m < e: nuevas.append([round(t + max(p0, s) - s, 2), round(t + min(p1, e) - s, 2), txt])
    t += e - s
json.dump({"segmentos": subs, "duracion": t, "palabras": nuevas}, open(out, "w"), ensure_ascii=False)
print(len(subs), "segmentos,", round(t, 1), "s")
