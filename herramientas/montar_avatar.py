#!/usr/bin/env python3
"""Monta una lección de RIC con los clips del avatar de HeyGen (uno por escena, 01.mp4 … NN.mp4).

    python herramientas/montar_avatar.py produccion/0-1-1/spec.json produccion/0-1-1/avatar.json <dir clips> <dir de trabajo>

Usa las láminas, el zoom, la animación y el montaje de producir_leccion.py, pero la voz sale de cada clip.
avatar.json dice, por escena, cómo se ve el avatar:
  pip       lámina a pantalla completa y el avatar en un recuadro abajo a la derecha (la esquina libre de 680 px)
  dividida  el avatar vertical completo a la izquierda y la lámina achicada a la derecha
  lamina    solo la lámina (o el gráfico, o la animación) con la voz del clip
y además: voz_edge (la escena no tiene clip: voz de edge-tts), cortar (tramos del clip que se sacan),
ocultar_avatar (tramos en los que no se muestra el recuadro) y marcas_voz (palabras que sincronizan la animación).
Los tiempos por palabra salen de faster-whisper (modelo small) y sirven para los subtítulos y la animación;
el texto de los subtítulos es lo que se dice en el clip, con las correcciones de avatar.json.
"""
import asyncio
import json
import os
import re
import subprocess
import sys

import producir_leccion as pl
from producir_leccion import FPS, RAIZ, duracion, sh

AIRE = 0.25  # más ~0,05 s de margen a cada lado de la voz: ~0,35 s entre escenas
PIP_W, PIP_H, PIP_MARGEN_X, PIP_MARGEN_Y = 468, 520, 48, 104  # recuadro dentro de la esquina libre, sobre la barra
PIP_RECORTE = "1080:1200:0:250"  # del clip vertical: de la cabeza a las manos
DIV_W = 608  # el clip vertical a 1080 de alto


def transcribir(clip, destino):
    """Palabras con tiempos (faster-whisper). Se guarda en un .json para no repetirlo."""
    if os.path.exists(destino):
        return json.load(open(destino, encoding="utf-8"))
    import numpy as np
    from faster_whisper import WhisperModel
    if not hasattr(transcribir, "modelo"):
        transcribir.modelo = WhisperModel("small", device="cpu", compute_type="int8")
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", clip, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                         capture_output=True, check=True).stdout
    audio = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    segs, _ = transcribir.modelo.transcribe(audio, language="es", word_timestamps=True, beam_size=5)
    pal = [{"texto": w.word.strip(), "ini": round(w.start, 3), "fin": round(w.end, 3)} for s in segs for w in s.words]
    json.dump(pal, open(destino, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    return pal


def corregir(palabras, correcciones):
    """Reemplaza secuencias de palabras de whisper (un mismo tramo de tiempo) y normaliza los porcentajes."""
    pal = [dict(p) for p in palabras]
    for viejas, nueva in correcciones:
        k = len(viejas)
        for i in range(len(pal) - k + 1):
            if [p["texto"] for p in pal[i:i + k]] == viejas:
                pal[i:i + k] = [{"texto": nueva, "ini": pal[i]["ini"], "fin": pal[i + k - 1]["fin"]}]
                break
        else:
            raise ValueError(f"no encontré {viejas}")
    salida = []
    for p in pal:
        if salida and p["texto"].startswith("%"):  # "8" "%" -> "8 %"
            salida[-1] = {**salida[-1], "texto": salida[-1]["texto"] + " " + p["texto"], "fin": p["fin"]}
        else:
            salida.append({**p, "texto": re.sub(r"(\d)%", r"\1 %", p["texto"])})
    return salida


def silencios(archivo, umbral="-40dB", minimo=0.2):
    err = subprocess.run(["ffmpeg", "-i", archivo, "-af", f"silencedetect=noise={umbral}:d={minimo}", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    ini = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    fin = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return list(zip(ini, fin))


def tramos_de_voz(clip, cortar=(), minimo=0.2):
    """Tramos del clip que se usan: sin el silencio del principio y del final (con 50 ms de margen) y sin los cortes."""
    dur = duracion(clip)
    sil = silencios(clip, minimo=minimo)
    a = sil[0][1] - 0.05 if sil and sil[0][0] < 0.05 else 0.0
    b = sil[-1][0] + 0.05 if sil and sil[-1][1] >= dur - 0.05 else dur
    tramos, t = [], max(0.0, a)
    for c0, c1 in sorted(cortar):
        tramos.append((t, c0))
        t = c1
    tramos.append((t, min(b, dur)))
    return tramos


def mover_palabras(palabras, tramos):
    """Pasa los tiempos del clip original a los del audio recortado (se pierden las palabras de los cortes)."""
    salida, base = [], 0.0
    for a, b in tramos:
        for p in palabras:
            # whisper estira la primera palabra sobre el silencio inicial: entra si empieza antes del primer tramo
            dentro = min(b, p["fin"]) - max(a, p["ini"])
            if (a <= p["ini"] < b and p["fin"] <= p["ini"]) or (
                    dentro > 0 and (dentro >= (p["fin"] - p["ini"]) / 2 or p["ini"] < tramos[0][0])):
                salida.append({**p, "ini": round(max(0.0, p["ini"] - a + base), 3), "fin": round(min(b, p["fin"]) - a + base, 3)})
        base += b - a
    return salida


def audio_de_clip(clip, tramos, destino):
    partes = "".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,"
                     f"afade=t=out:st={b - a - 0.03:.3f}:d=0.03[a{i}];" for i, (a, b) in enumerate(tramos))
    filtro = partes + "".join(f"[a{i}]" for i in range(len(tramos))) + f"concat=n={len(tramos)}:v=0:a=1[a]"
    sh("ffmpeg", "-loglevel", "error", "-y", "-i", clip, "-filter_complex", filtro, "-map", "[a]",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


async def voz_edge(texto, cfg, destino):
    """Escena sin clip: voz de edge-tts con tiempos por palabra (igual que producir_leccion.sintetizar)."""
    viejo = dict(pl.VOZ)
    pl.VOZ.update(cfg)
    try:
        await pl.sintetizar(texto, destino)
    finally:
        pl.VOZ.clear()
        pl.VOZ.update(viejo)


def mascaras(trabajo):
    """Máscara con esquinas redondeadas y borde #274a80 para el recuadro del avatar."""
    from PIL import Image, ImageDraw
    m, b = os.path.join(trabajo, "pip-mascara.png"), os.path.join(trabajo, "pip-borde.png")
    esc = 4
    img = Image.new("L", (PIP_W * esc, PIP_H * esc), 0)
    ImageDraw.Draw(img).rounded_rectangle([0, 0, PIP_W * esc - 1, PIP_H * esc - 1], radius=28 * esc, fill=255)
    img.resize((PIP_W, PIP_H), Image.LANCZOS).save(m)
    img = Image.new("RGBA", (PIP_W * esc, PIP_H * esc), (0, 0, 0, 0))
    ImageDraw.Draw(img).rounded_rectangle([0, 0, PIP_W * esc - 1, PIP_H * esc - 1], radius=28 * esc,
                                          outline=(0x27, 0x4a, 0x80, 255), width=4 * esc)
    img.resize((PIP_W, PIP_H), Image.LANCZOS).save(b)
    return m, b


def clip_pip(png, clip, a, voz, dur, audio, ocultar, mascara, borde, destino):
    """Lámina fija con el avatar en el recuadro de la esquina. a: segundo del clip donde empieza la voz."""
    x, y = 1920 - PIP_W - PIP_MARGEN_X, 1080 - PIP_H - PIP_MARGEN_Y
    vis = "*".join(f"not(between(t,{o0 - a:.3f},{o1 - a:.3f}))" for o0, o1 in ocultar) or "1"
    filtro = (f"[1:v]fps={FPS},crop={PIP_RECORTE},scale={PIP_W}:{PIP_H},tpad=stop_mode=clone:stop_duration={AIRE + 1},"
              f"format=rgba[av];[2:v]format=gray[m];[av][m]alphamerge[avm];[avm][3:v]overlay=0:0[pip];"
              f"[0:v][pip]overlay={x}:{y}:enable='{vis}',format=yuv420p[v];[4:a]apad[a]")
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", png,
       "-ss", f"{a:.3f}", "-t", f"{voz:.3f}", "-i", clip, "-loop", "1", "-i", mascara, "-loop", "1", "-i", borde,
       "-i", audio, "-filter_complex", filtro, "-map", "[v]", "-map", "[a]", "-t", f"{dur:.3f}",
       "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def clip_dividido(png, clip, a, voz, dur, audio, destino):
    """El avatar vertical entero a la izquierda y la lámina achicada a la derecha, sobre la misma lámina desenfocada."""
    ancho = 1920 - DIV_W
    alto = round(ancho * 1080 / 1920)
    filtro = (f"[0:v]scale=1920:1080,boxblur=30:3,eq=brightness=-0.08[fondo];[0:v]scale={ancho}:{alto}[lam];"
              f"[fondo][lam]overlay={DIV_W}:{(1080 - alto) // 2}[f2];"
              f"[1:v]fps={FPS},scale={DIV_W}:1080,tpad=stop_mode=clone:stop_duration={AIRE + 1}[av];"
              f"[f2][av]overlay=0:0,drawbox=x={DIV_W}:y=0:w=3:h=1080:color=0x274a80:t=fill,format=yuv420p[v];[2:a]apad[a]")
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", png,
       "-ss", f"{a:.3f}", "-t", f"{voz:.3f}", "-i", clip, "-i", audio, "-filter_complex", filtro,
       "-map", "[v]", "-map", "[a]", "-t", f"{dur:.3f}",
       "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def main():
    spec_path, cfg_path, dir_clips, trabajo = (os.path.abspath(x) for x in sys.argv[1:5])
    spec = json.load(open(spec_path, encoding="utf-8"))
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    lec = spec["lecciones"][0]
    n_, m_, l_ = lec["id"].split("-")
    nombre = f"RIC-N{n_}-M{m_}-L{l_}"
    os.makedirs(trabajo, exist_ok=True)
    entrega = os.path.join(trabajo, "entrega")
    os.makedirs(os.path.join(entrega, "laminas"), exist_ok=True)

    # 1. Láminas
    dir_laminas = os.path.join(trabajo, "laminas")
    sh("node", os.path.join(RAIZ, "diseno", "generar.js"), spec_path,
       env={**os.environ, "RIC_VIDEO": "1", "RIC_OUT": dir_laminas})
    sh("node", os.path.join(RAIZ, "herramientas", "render.js"), dir_laminas)
    indice = json.load(open(os.path.join(dir_laminas, "laminas.json"), encoding="utf-8"))

    # 2. Voz y tiempos por escena
    dir_audio = os.path.join(trabajo, "audio")
    os.makedirs(dir_audio, exist_ok=True)
    escenas = []
    for i, (l, ix) in enumerate(zip(lec["laminas"], indice), 1):
        n = f"{i:02}"
        c = cfg["escenas"][n]
        audio = os.path.join(dir_audio, n + ".m4a")
        clip, a = None, 0.0
        if "voz_edge" in c:
            mp3 = os.path.join(dir_audio, n + "-edge.mp3")
            asyncio.run(voz_edge(l["voz"], c["voz_edge"], mp3))
            tramos = tramos_de_voz(mp3, minimo=0.08)  # edge-tts deja ~0,1 s al principio y ~1 s al final
            audio_de_clip(mp3, tramos, audio)
            palabras = mover_palabras(json.load(open(mp3[:-4] + ".json", encoding="utf-8")), tramos)
        else:
            clip = os.path.join(dir_clips, n + ".mp4")
            crudas = transcribir(clip, os.path.join(dir_audio, n + "-whisper.json"))
            tramos = tramos_de_voz(clip, c.get("cortar", ()))
            a = tramos[0][0]
            audio_de_clip(clip, tramos, audio)
            arreglos = [(v, nueva) for esc, v, nueva in cfg.get("correcciones_subtitulos", []) if esc == n]
            palabras = mover_palabras(corregir(crudas, arreglos), tramos)
        dv = duracion(audio)
        escenas.append({**l, "n": i, "png": ix["png"], "foco": ix.get("foco"), "evitar": ix.get("evitar"),
                        "audio": audio, "palabras": palabras, "dur_voz": dv, "dur": dv + AIRE,
                        "voz": l["voz"] if "voz_edge" in c else " ".join(p["texto"] for p in palabras), "clip_avatar": clip, "desde": a,
                        "modo": c["modo"], "cfg": c})
        print(f"voz {n} {dv:5.1f} s  {c['modo']}", flush=True)

    # 3. Clips por escena
    dir_salida = os.path.join(trabajo, "clips")
    os.makedirs(dir_salida, exist_ok=True)
    mascara, borde = mascaras(trabajo)
    for e in escenas:
        destino = os.path.join(dir_salida, f"{e['n']:02}.mp4")
        c = e["cfg"]
        if e["modo"] == "pip":
            clip_pip(e["png"], e["clip_avatar"], e["desde"], e["dur_voz"], e["dur"], e["audio"],
                     c.get("ocultar_avatar", ()), mascara, borde, destino)
        elif e["modo"] == "dividida":
            clip_dividido(e["png"], e["clip_avatar"], e["desde"], e["dur_voz"], e["dur"], e["audio"], destino)
        elif e["tipo"] == "animacion":
            anim = {**e, "animacion": {**e["animacion"], "marcas_voz": c.get("marcas_voz", e["animacion"].get("marcas_voz"))}}
            pl.clip_animacion(anim, e["audio"], e["dur"], trabajo, destino)
        elif e["tipo"] == "grafico" and e.get("zoom") and e.get("foco"):
            pl.clip_grafico(e["png"], e["audio"], e["dur"], e["foco"], e["zoom"].get("factor", 1.7), destino,
                            e.get("evitar") or ())
        else:
            pl.clip_fijo(e["png"], e["audio"], e["dur"], destino)
        e["clip"] = destino
        print("clip", e["n"], e["modo"], flush=True)

    # 4. Montaje con el filtro concat (recodificando)
    video = os.path.join(entrega, nombre + ".mp4")
    entradas = sum((["-i", e["clip"]] for e in escenas), [])
    filtro = "".join(f"[{i}:v][{i}:a]" for i in range(len(escenas))) + f"concat=n={len(escenas)}:v=1:a=1[v][a]"
    sh("ffmpeg", "-loglevel", "error", "-y", *entradas, "-filter_complex", filtro, "-map", "[v]", "-map", "[a]",
       "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(FPS),
       "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", video)

    # 5. Subtítulos (lo que se dice), guion, láminas y miniatura
    pl.srt(escenas, os.path.join(entrega, nombre + ".srt"))
    with open(os.path.join(entrega, nombre + "-guion.txt"), "w", encoding="utf-8") as fh:
        for e in escenas:
            fh.write(f"[{e['n']:02} · {e['escena']} · {e['tipo']} · {e['modo']}]\n{e['voz']}\n\n")
    for e in escenas:
        if e["tipo"] != "animacion":
            sh("cp", e["png"], os.path.join(entrega, "laminas", f"{e['n']:02}.png"))
    mini = os.path.join(RAIZ, "produccion", lec["id"], "miniatura.html")
    if os.path.exists(mini):
        sh("node", os.path.join(RAIZ, "herramientas", "miniatura.js"), mini, os.path.join(entrega, nombre + "-portada.png"))

    # 6. Verificación
    total = duracion(video)
    huecos = [round(float(h), 2) for h in re.findall(r"silence_duration: ([\d.]+)", subprocess.run(
        ["ffmpeg", "-i", video, "-af", "silencedetect=noise=-45dB:d=0.5", "-f", "null", "-"],
        capture_output=True, text=True).stderr)]
    # Silencio real en cada unión entre escenas (los tiempos de whisper no son precisos en los bordes de la voz).
    uniones, t = [], 0.0
    for e in escenas[:-1]:
        t += duracion(e["clip"])
        uniones.append(t)
    sil = silencios(video, umbral="-40dB", minimo=0.15)
    en_uniones = [round(next((b - a for a, b in sil if a - 0.05 < u < b + 0.05), 0.0), 2) for u in uniones]
    informe = {
        "video": video, "duracion_s": round(total, 2), "duracion_esperada_s": round(sum(e["dur"] for e in escenas), 2),
        "escenas": [{"n": e["n"], "modo": e["modo"], "voz_s": round(e["dur_voz"], 2)} for e in escenas],
        "silencios_de_mas_de_0_5_s": huecos,  # incluye las pausas entre frases del propio clip
        "silencio_en_cada_union_s": en_uniones,
        "palabras": sum(len(e["voz"].split()) for e in escenas),
    }
    json.dump(informe, open(os.path.join(entrega, "verificacion.json"), "w"), ensure_ascii=False, indent=1)
    print(json.dumps(informe, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
