#!/usr/bin/env python3
"""Voz continua: el cuerpo del Reel se genera con el clon en UNA sola toma y acá se reparte en bloques sin recortar nada.

    python herramientas/cine/clon_continuo.py <textos.json> <cuerpo.wav> <cierre.wav> <guion.json> <salida> ig|yt

Pedido de Lean (17/11/2026): «los audios todos mal cortados». Antes cada bloque se generaba aparte y se pegaba con fundidos;
ahora el cuerpo (bloques 01..N-1 en orden) sale de una sola generación de `qwen_escenas.py` (clave «cuerpo»), whisper da los
tiempos por palabra y cada bloque se corta en el medio del silencio que lo separa del siguiente, así que al volver a juntarlos
el audio es idéntico a la toma original. El cierre (IG o YT) va aparte, después de una pausa natural de 0,45 s.
Escribe <salida>/voz/<id>.wav y <salida>/tiempos-<v>.json/.js (window.T del motor cine, "voz_clon": true).
"""
import json, os, re, subprocess, sys, unicodedata
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(__file__))
from voz import agrupar, CADENA
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'voces'))
from a_trabajo import nz  # normaliza y expande números («cien» ↔ «100»)

def palabras_whisper(wav):
    from faster_whisper import WhisperModel
    m = WhisperModel("medium", device="cpu", compute_type="int8")
    # se le pasa el audio ya cargado a 16 kHz (la versión de PyAV del entorno rompe decode_audio con rutas)
    tmp = wav + ".16k.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-ar", "16000", "-ac", "1", tmp], check=True)
    x, _ = sf.read(tmp, dtype="float32"); os.remove(tmp)
    segs, _ = m.transcribe(x, language="es", word_timestamps=True, vad_filter=False)
    out = []
    for s in segs:
        for w in s.words:
            for k in nz(w.word): out.append([w.start, w.end, k])
    return out

def alinear(texto_ws, oidas):
    """Para cada palabra del texto, (ini, fin) tomados de las palabras oídas (alineación por difflib sobre la forma normalizada)."""
    import difflib
    tx = []  # (índice de palabra del texto, token normalizado)
    for i, w in enumerate(texto_ws):
        for k in nz(w): tx.append((i, k))
    sm = difflib.SequenceMatcher(a=[k for _, k in tx], b=[o[2] for o in oidas], autojunk=False)
    t = [None] * len(texto_ws)
    for a, b, n in sm.get_matching_blocks():
        for j in range(n):
            i = tx[a + j][0]; ini, fin = oidas[b + j][0], oidas[b + j][1]
            t[i] = [min(t[i][0], ini), max(t[i][1], fin)] if t[i] else [ini, fin]
    # huecos: interpolar entre vecinos
    for i in range(len(t)):
        if t[i] is None:
            a = next((t[k][1] for k in range(i - 1, -1, -1) if t[k]), 0.0)
            b = next((t[k][0] for k in range(i + 1, len(t)) if t[k]), a + .3)
            t[i] = [a, max(a + .05, b)]
    return t

def main():
    textos, cuerpo, cierre, guion, out, v = sys.argv[1:7]
    TX = json.load(open(textos)); g = json.load(open(guion))
    bl = [b for b in g["bloques"] if not b.get("solo") or b["solo"] == v]
    cuerpo_ids = [b["id"] for b in bl[:-1]]; ult = bl[-1]
    os.makedirs(f"{out}/voz", exist_ok=True)
    # cadena de voz sobre la toma completa (sin cortes)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", cuerpo, "-af", CADENA, "-ar", "48000", "-ac", "1", f"{out}/cuerpo.wav"], check=True)
    a, sr = sf.read(f"{out}/cuerpo.wav")
    oidas = palabras_whisper(f"{out}/cuerpo.wav")
    ws_bloque = [TX[i].split() for i in cuerpo_ids]
    todas = [w for ws in ws_bloque for w in ws]
    tt = alinear(todas, oidas)
    # límites: mitad del silencio entre la última palabra de un bloque y la primera del siguiente (por energía)
    fr = int(.01 * sr); e = np.array([np.sqrt(np.mean(a[i:i + fr] ** 2)) for i in range(0, len(a) - fr, fr)])
    db = 20 * np.log10(e + 1e-9)
    def silencio_medio(t0, t1):
        i0, i1 = int(t0 * 100), max(int(t0 * 100) + 1, int(t1 * 100))
        seg = db[i0:i1]
        if len(seg) == 0: return (t0 + t1) / 2
        q = np.where(seg < seg.min() + 6)[0]; return (i0 + (q[0] + q[-1]) / 2) / 100
    cortes, k = [0.0], 0
    for ws in ws_bloque[:-1]:
        k += len(ws); cortes.append(silencio_medio(tt[k - 1][1], tt[k][0]))
    act = np.where(db > -45)[0]; fin_voz = min(len(a) / sr, (act[-1] + 1) * .01 + .25)
    cortes.append(fin_voz)
    T, k, t = {"bloques": [], "voz_clon": True}, 0, 0.15
    for j, bid in enumerate(cuerpo_ids):
        c0, c1 = cortes[j], cortes[j + 1]
        sf.write(f"{out}/voz/{bid}.wav", a[int(c0 * sr):int(c1 * sr)], sr)
        b = next(x for x in bl if x["id"] == bid); ws = ws_bloque[j]
        pal = [[round(t + tt[k + i][0] - c0, 3), round(t + tt[k + i][1] - c0, 3), w] for i, w in enumerate(ws)]; k += len(ws)
        T["bloques"].append({"id": bid, "nombre": bid, "ini": round(t, 3), "dur": round(c1 - c0, 3), "etiqueta": b.get("etiqueta", ""),
                             "palabras": pal, "subs": agrupar(pal, {**g.get("pantalla", {}), **b.get("pantalla", {})})})
        t += c1 - c0  # sin pausas agregadas: el cuerpo queda idéntico a la toma
    # cierre aparte (corte por energía, con aire)
    t += .45
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", cierre, "-af", CADENA, "-ar", "48000", "-ac", "1", f"{out}/cierre.wav"], check=True)
    c, _ = sf.read(f"{out}/cierre.wav"); e2 = np.array([np.sqrt(np.mean(c[i:i + fr] ** 2)) for i in range(0, len(c) - fr, fr)])
    ac = np.where(20 * np.log10(e2 + 1e-9) > -45)[0]; c0 = max(0, ac[0] * .01 - .06); c1 = min(len(c) / sr, (ac[-1] + 1) * .01 + .3)
    cc = c[int(c0 * sr):int(c1 * sr)].copy(); n = int(.03 * sr); cc[:n] *= np.linspace(0, 1, n); m = int(.2 * sr); cc[-m:] *= np.linspace(1, 0, m)
    sf.write(f"{out}/voz/{ult['id']}.wav", cc, sr)
    wsc = TX[ult.get("wav", ult["id"])].split(); oc = palabras_whisper(f"{out}/voz/{ult['id']}.wav"); tc = alinear(wsc, oc)
    pal = [[round(t + x[0], 3), round(t + x[1], 3), w] for x, w in zip(tc, wsc)]
    T["bloques"].append({"id": ult["id"], "nombre": ult["id"], "ini": round(t, 3), "dur": round(len(cc) / sr, 3), "etiqueta": ult.get("etiqueta", ""),
                         "palabras": pal, "subs": agrupar(pal, {**g.get("pantalla", {}), **ult.get("pantalla", {})})})
    T["total"] = round(t + len(cc) / sr + .3, 2)
    json.dump(T, open(f"{out}/tiempos-{v}.json", "w"), ensure_ascii=False)
    open(f"{out}/tiempos-{v}.js", "w").write("window.T=" + json.dumps(T, ensure_ascii=False) + ";")
    print("total", T["total"], [(b["id"], b["ini"]) for b in T["bloques"]])

if __name__ == "__main__":
    main()
