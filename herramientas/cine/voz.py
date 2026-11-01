#!/usr/bin/env python3
"""Voz de un Reel/Short «expediente cine» con edge-tts (por defecto es-AR-TomasNeural), bloque por bloque.

    SSL_CERT_FILE=<CA del proxy> python herramientas/cine/voz.py produccion/<id>/guion.json <dir de trabajo> <ig|yt>

Por cada bloque: <dir>/voz/<id>.wav (procesada: EQ, compresión, sin el silencio del final) y los tiempos por palabra
de WordBoundary. Arma <dir>/tiempos-<v>.json y .js (window.T) con los bloques uno detrás del otro.
Los subtítulos salen de las palabras de la voz; "pantalla" del guion reemplaza grupos de palabras por lo que se lee
(por ejemplo "seis mil trescientos millones" → "US$ 6.300 M"), con el tiempo del grupo entero.
"""
import asyncio, json, os, ssl, subprocess, sys, re
import edge_tts, edge_tts.communicate

CADENA = ("highpass=f=70,equalizer=f=160:t=q:w=1:g=2.5,equalizer=f=3000:t=q:w=1.2:g=2,equalizer=f=7500:t=q:w=2:g=-3,"
          "acompressor=threshold=-20dB:ratio=3:attack=6:release=120:makeup=2.5")


def norm(s):
    return re.sub(r"[^\wáéíóúñü]", "", s.lower())


async def bloque(texto, voz, base):
    pal = []
    with open(base + ".mp3", "wb") as fh:
        async for m in edge_tts.Communicate(texto, voz["voice"], rate=voz.get("rate", "+0%"), pitch=voz.get("pitch", "+0Hz"),
                                            boundary="WordBoundary").stream():
            if m["type"] == "audio": fh.write(m["data"])
            elif m["type"] == "WordBoundary":
                pal.append([m["offset"] / 1e7, (m["offset"] + m["duration"]) / 1e7, m["text"]])
    fin = pal[-1][1] + 0.18
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", base + ".mp3", "-af", CADENA + f",atrim=0:{fin:.3f},afade=t=out:st={fin-0.08:.3f}:d=0.08",
                    "-ar", "48000", "-ac", "1", base + ".wav"], check=True)
    return pal, fin


def agrupar(pal, pantalla):
    """Une palabras según los reemplazos de pantalla; devuelve [[ini, fin, texto], ...]."""
    out, i = [], 0
    reps = [(k.split(), v) for k, v in pantalla.items()]
    while i < len(pal):
        hecho = False
        for ks, v in reps:
            n = len(ks)
            if [norm(w[2]) for w in pal[i:i + n]] == [norm(k) for k in ks]:
                cola = re.sub(r"[\wáéíóúñü]", "", pal[i + n - 1][2].split()[-1])[-1:] if pal[i + n - 1][2] else ""
                out.append([pal[i][0], pal[i + n - 1][1], v + (cola if cola in ".,?:!" else "")]); i += n; hecho = True; break
        if not hecho: out.append(pal[i]); i += 1
    return out


async def main():
    guion, trabajo, v = sys.argv[1:4]
    if os.environ.get("SSL_CERT_FILE"):
        edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])
    g = json.load(open(guion, encoding="utf-8"))
    voz = g.get("voz", {"voice": "es-AR-TomasNeural", "rate": "+5%"})
    os.makedirs(f"{trabajo}/voz", exist_ok=True)
    t, bl = 0.15, []
    for b in g["bloques"]:
        if b.get("solo") and b["solo"] != v: continue
        base = f"{trabajo}/voz/{b['id']}"
        pal, dur = await bloque(b["voz"], voz, base)
        # el texto de WordBoundary viene sin signos: se los devuelvo desde el guion, palabra por palabra
        gw = b["voz"].split()
        if len(gw) == len(pal):
            for w, s in zip(pal, gw): w[2] = s
        pal = [[round(t + a, 3), round(t + c, 3), s] for a, c, s in pal]
        subs = agrupar(pal, {**g.get("pantalla", {}), **b.get("pantalla", {})})
        bl.append({"id": b["id"], "nombre": b["id"], "ini": round(t, 3), "dur": round(dur, 3), "etiqueta": b.get("etiqueta", ""),
                   "palabras": pal, "subs": subs})
        print(b["id"], f"{dur:.2f} s", "OK" if len(gw) == len(pal) else f"palabras {len(gw)} vs {len(pal)}", flush=True)
        t += dur + b.get("pausa", 0.3)
    T = {"total": round(t + 0.2, 2), "bloques": bl}
    json.dump(T, open(f"{trabajo}/tiempos-{v}.json", "w"), ensure_ascii=False)
    open(f"{trabajo}/tiempos-{v}.js", "w").write("window.T=" + json.dumps(T, ensure_ascii=False) + ";")
    print("total", T["total"])


if __name__ == "__main__":
    asyncio.run(main())
