#!/usr/bin/env python3
"""Reel vertical (1080x1920) con voz en off y gráficos animados, sin avatar.

    python herramientas/crear_reel.py produccion/<reel>/ <dir de trabajo> [--muestra 3.5,20,41]

En la carpeta del reel:
  guion.json    segmentos con la voz (edge-tts, con tiempos por palabra), el texto para pantalla si difiere, y los sfx
  escenas.html  las escenas: expone window.cuadro(segundo) y lee window.TL (tiempos de cada segmento y palabra)
Salida: <dir de trabajo>/entrega/<nombre>.mp4 con subtítulos palabra por palabra, música de fondo y efectos.
"""
import asyncio
import difflib
import json
import os
import re
import subprocess
import sys

import producir_leccion as pl
from crear_shorts import ass
from montar_avatar import audio_de_clip, mover_palabras, tramos_de_voz
from producir_leccion import FPS, RAIZ, duracion, letras, sh

W, H = 1080, 1920
PROCESOS = 4


def voz(g, s, destino):
    if os.path.exists(destino) and os.path.exists(destino[:-4] + ".json"):
        return
    pl.VOZ.clear()
    pl.VOZ.update({**g["voz_default"], **{k: s[k] for k in ("voice", "rate", "pitch") if k in s}})
    asyncio.run(pl.sintetizar(s["voz"], destino))


def palabras_pantalla(texto_voz, texto_pantalla, palabras):
    """Pasa los tiempos de las palabras dichas al texto de pantalla (p. ej. "seis mil trescientos" -> "6.300")."""
    tv = [t for t in texto_voz.split() if letras(t)]
    if len(tv) != len(palabras):  # edge-tts separó distinto: se usa lo dicho
        return palabras
    tp = texto_pantalla.split()
    sm = difflib.SequenceMatcher(a=[letras(t) for t in tv], b=[letras(t) for t in tp], autojunk=False)
    salida = []
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        if op == "equal":
            salida += [{**palabras[a0 + k], "texto": tp[b0 + k]} for k in range(b1 - b0)]
        elif b1 > b0:
            ini = palabras[a0]["ini"] if a1 > a0 else (salida[-1]["fin"] if salida else palabras[0]["ini"])
            fin = palabras[a1 - 1]["fin"] if a1 > a0 else ini + 0.2
            paso = (fin - ini) / (b1 - b0)
            salida += [{"texto": tp[b0 + k], "ini": ini + k * paso, "fin": ini + (k + 1) * paso} for k in range(b1 - b0)]
    return salida


def sintetizado(expr, dur, destino, filtros=""):
    sh("ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", f"aevalsrc='{expr}':s=48000:d={dur}",
       *(["-af", filtros] if filtros else []), destino)


def efectos(trabajo):
    """Efectos cortos sintetizados con ffmpeg (sin bibliotecas externas)."""
    d = os.path.join(trabajo, "sfx")
    os.makedirs(d, exist_ok=True)
    sintetizado("0.9*sin(2*PI*(38+90*exp(-14*t))*t)*exp(-3.5*t)", 1.3, f"{d}/golpe.wav", "lowpass=f=300")
    sintetizado("0.5*sin(2*PI*2400*t)*exp(-90*t)+0.6*sin(2*PI*180*t)*exp(-40*t)", 0.12, f"{d}/clic.wav")
    sintetizado("0.35*sin(2*PI*1750*t)*exp(-55*t)", 0.12, f"{d}/tic.wav")
    sintetizado("0.45*sin(2*PI*(380+700*t*6)*t)*exp(-14*t)", 0.18, f"{d}/pop.wav")
    sintetizado("0.28*sin(2*PI*880*t)*lt(mod(t,0.24),0.11)", 0.48, f"{d}/alarma.wav", "lowpass=f=2500")
    sh("ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anoisesrc=d=0.55:c=pink:a=0.6:r=48000",
       "-af", "highpass=f=400,lowpass=f=5000,afade=t=in:d=0.3,afade=t=out:st=0.3:d=0.25,volume=0.55", f"{d}/swoosh.wav")
    sh("ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anoisesrc=d=0.5:c=white:a=0.5:r=48000",
       "-af", "bandpass=f=3000:w=2000,acrusher=bits=6:mix=0.6,afade=t=out:st=0.05:d=0.4,volume=0.5", f"{d}/glitch.wav")
    return d


def musica(dur, cambios, destino):
    """Cama de tensión a 96 BPM: bombo grave, pulso de ruido y un bordón que se vuelve más cálido en la solución."""
    b = 60 / 96
    calma = cambios.get("calma", dur)
    alerta0, alerta1 = cambios.get("alerta", (dur, dur))
    expr = (f"0.55*sin(2*PI*(45+70*exp(-30*mod(t,{b})))*mod(t,{b}))*exp(-7*mod(t,{b}))"
            f"+0.10*sin(2*PI*55*t)*(0.7+0.3*sin(2*PI*0.12*t))+0.07*sin(2*PI*82.41*t)"
            f"+0.05*sin(2*PI*69.30*t)*gte(t,{calma})+0.04*sin(2*PI*110*t)*gte(t,{calma})"
            f"+0.06*(random(0)-0.5)*exp(-35*mod(t+{b / 2},{b}))"
            f"+0.08*(random(1)-0.5)*between(t,{alerta0},{alerta1})*(t-{alerta0})/({alerta1}-{alerta0}+0.01)")
    sintetizado(expr, round(dur, 2), destino,
                f"lowpass=f=1800,afade=t=in:d=1.5,afade=t=out:st={dur - 2.5:.2f}:d=2.5")


def main():
    carpeta, trabajo = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    g = json.load(open(os.path.join(carpeta, "guion.json"), encoding="utf-8"))
    nombre = os.path.basename(carpeta.rstrip("/"))
    entrega = os.path.join(trabajo, "entrega")
    for d in ("voz", "cuadros", entrega):
        os.makedirs(os.path.join(trabajo, d), exist_ok=True)

    # 1. Voz por segmento (sin el silencio de los bordes) y línea de tiempo
    tl, t, partes, subs = {}, 0.4, [], []
    for s in g["segmentos"]:
        mp3 = os.path.join(trabajo, "voz", s["id"] + ".mp3")
        voz(g, s, mp3)
        tramos = tramos_de_voz(mp3, minimo=0.08)
        m4a = mp3[:-4] + ".m4a"
        audio_de_clip(mp3, tramos, m4a)
        pal = mover_palabras(json.load(open(mp3[:-4] + ".json", encoding="utf-8")), tramos)
        pant = palabras_pantalla(s["voz"], s.get("pantalla", s["voz"]), pal)
        d = duracion(m4a)
        tl[s["id"]] = {"ini": round(t, 3), "fin": round(t + d, 3),
                       "palabras": [{"t": p["texto"], "i": round(t + p["ini"], 3), "f": round(t + p["fin"], 3)} for p in pal]}
        subs += [{**p, "ini": t + p["ini"], "fin": t + p["fin"]} for p in pant]
        partes.append((m4a, t))
        print(f"{s['id']:10} {t:6.2f} +{d:5.2f}", flush=True)
        t += d + g.get("pausa", 0.28)
    dur = round(t + g.get("cola", 1.6), 2)
    tl["_dur"] = dur

    # 2. Cuadros: escenas.html con la línea de tiempo, en paralelo
    html = os.path.join(trabajo, "escenas.html")
    src = open(os.path.join(carpeta, "escenas.html"), encoding="utf-8").read()
    open(html, "w", encoding="utf-8").write(src.replace("/*TIMELINE*/", "window.TL = " + json.dumps(tl, ensure_ascii=False) + ";"))
    n = round(dur * FPS)
    cuadros = os.path.join(trabajo, "cuadros")
    if "--muestra" in sys.argv:  # solo unos cuadros sueltos para revisar el diseño: --muestra 3.5,20,41
        segs = [float(x) for x in sys.argv[sys.argv.index("--muestra") + 1].split(",")]
        dm = os.path.join(trabajo, "muestra")
        for x in segs:
            f = round(x * FPS)
            sh("node", os.path.join(RAIZ, "herramientas", "render_reel.js"), html, str(FPS), str(f), str(f + 1), dm)
        json.dump(tl, open(os.path.join(trabajo, "linea_de_tiempo.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        return
    hechos = len([f for f in os.listdir(cuadros) if f.endswith(".png")])
    procs = [] if hechos == n else [subprocess.Popen(["node", os.path.join(RAIZ, "herramientas", "render_reel.js"), html, str(FPS),
                               str(k * n // PROCESOS), str((k + 1) * n // PROCESOS), cuadros]) for k in range(PROCESOS)]
    if any(p.wait() for p in procs):  # si ya están todos los cuadros (se rehízo solo el audio), no se renderiza de nuevo
        sys.exit("falló el render de cuadros")

    # 3. Audio: voz + música + efectos
    sfx = efectos(trabajo)
    cambios = {"calma": tl[g["musica"]["calma"]]["ini"] if "musica" in g else dur,
               "alerta": (tl[g["musica"]["alerta"]]["ini"], tl[g["musica"]["alerta"]]["fin"]) if "musica" in g else (dur, dur)}
    musica(dur, cambios, os.path.join(trabajo, "musica.wav"))
    entradas, filtros, k = [], [], 0
    for m4a, t0 in partes:
        entradas += ["-i", m4a]
        filtros.append(f"[{k}:a]adelay={int(t0 * 1000)}:all=1[v{k}]")
        k += 1
    nv = k
    entradas += ["-i", os.path.join(trabajo, "musica.wav")]
    filtros.append(f"[{k}:a]volume=0.22[mus]")
    k += 1
    efs = []
    for e in g.get("sfx", []):
        seg = tl[e["segmento"]]
        if "palabra" in e:
            cand = [p for p in seg["palabras"] if letras(p["t"]).startswith(letras(e["palabra"]))]
            t0 = cand[e.get("n", 0)]["i"] if len(cand) > e.get("n", 0) else seg["ini"]
        else:
            t0 = seg["ini"] + e.get("desde", 0)
        t0 += e.get("ajuste", 0)
        entradas += ["-i", os.path.join(sfx, e["tipo"] + ".wav")]
        filtros.append(f"[{k}:a]volume={e.get('volumen', 0.5)},adelay={max(0, int(t0 * 1000))}:all=1[e{k}]")
        efs.append(f"[e{k}]")
        k += 1
    voces = "".join(f"[v{i}]" for i in range(nv))
    filtros.append(f"{voces}amix=inputs={nv}:normalize=0[voz]")
    filtros.append(f"[voz]apad,asplit=2[voz1][voz2]")  # apad: el ducking no corta la música donde termina la voz
    filtros.append(f"[mus][voz2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[musd]")
    filtros.append(f"[voz1][musd]{''.join(efs)}amix=inputs={2 + len(efs)}:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]")  # -14 LUFS, lo estándar en Reels
    audio = os.path.join(trabajo, "audio.wav")
    sh("ffmpeg", "-loglevel", "error", "-y", *entradas, "-filter_complex", ";".join(filtros), "-map", "[a]",
       "-t", str(dur), "-ar", "48000", audio)
    if duracion(audio) < dur - 0.1:
        sys.exit(f"el audio dura {duracion(audio):.2f} s y el video {dur} s")

    # 4. Subtítulos y montaje final
    subs_ass = os.path.join(trabajo, "subs.ass")
    ass(subs, dur, subs_ass)
    video = os.path.join(entrega, nombre + ".mp4")
    sh("ffmpeg", "-loglevel", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(cuadros, "%05d.png"), "-i", audio,
       "-vf", f"subtitles='{subs_ass}',format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
       "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", video)
    json.dump(tl, open(os.path.join(trabajo, "linea_de_tiempo.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(video, duracion(video))


if __name__ == "__main__":
    main()
