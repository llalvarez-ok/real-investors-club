#!/usr/bin/env python3
"""Voz de un video pilar de pizarra, escena por escena, con edge-tts.

    SSL_CERT_FILE=<CA del proxy> python herramientas/voz_pizarra.py produccion/<id>/guion.json <dir de trabajo> [escenas]

Escribe <dir>/audio/NN.mp3 y NN.json (cada palabra con su inicio y fin, de WordBoundary) con la voz del guion
("voz": {voice, rate, pitch}). [escenas] es una lista opcional como "3,14" para regenerar solo esas.
Después: herramientas/unir_voz.sh <dir>, herramientas/musica_fondo.py y herramientas/tiempos_pizarra.py.
"""
import asyncio
import json
import os
import ssl
import sys

import edge_tts
import edge_tts.communicate


async def escena(e, voz, destino):
    palabras = []
    with open(destino + ".mp3", "wb") as fh:
        async for m in edge_tts.Communicate(e["voz"], voz["voice"], rate=voz["rate"], pitch=voz["pitch"], boundary="WordBoundary").stream():
            if m["type"] == "audio":
                fh.write(m["data"])
            elif m["type"] == "WordBoundary":
                palabras.append({"texto": m["text"], "ini": m["offset"] / 1e7, "fin": (m["offset"] + m["duration"]) / 1e7})
    json.dump(palabras, open(destino + ".json", "w", encoding="utf-8"), ensure_ascii=False)
    return len(palabras)


async def main():
    guion, trabajo = sys.argv[1:3]
    solo = {int(x) for x in sys.argv[3].split(",")} if len(sys.argv) > 3 else None
    if os.environ.get("SSL_CERT_FILE"):  # detrás del proxy de la nube, edge-tts tiene que usar su CA
        edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])
    g = json.load(open(guion, encoding="utf-8"))
    os.makedirs(os.path.join(trabajo, "audio"), exist_ok=True)
    for e in g["escenas"]:
        if solo and e["n"] not in solo:
            continue
        n = await escena(e, g["voz"], os.path.join(trabajo, "audio", f"{e['n']:02}"))
        print(f"{e['n']:02}: {n} palabras", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
