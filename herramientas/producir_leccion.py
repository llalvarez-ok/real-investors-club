#!/usr/bin/env python3
"""Produce el video de una lección de RIC a partir de produccion/<id>/spec.json.

    python herramientas/producir_leccion.py produccion/0-1-1/spec.json <dir de trabajo> [--maqueta]

--maqueta: sin voz (silencio con la duración estimada del texto), para revisar imagen y ritmo
cuando no hay acceso a la voz.

Pasos: láminas (diseno/generar.js + herramientas/render.js), voz por escena (edge-tts,
es-AR-TomasNeural), animaciones (herramientas/animar.js), zoom en los gráficos, montaje con
ffmpeg (filtro concat recodificando), subtítulos .srt, miniatura y hoja de contacto.
Al final verifica duración, huecos entre escenas y que cada escena tenga audio.
"""
import asyncio
import json
import os
import re
import shutil
import subprocess
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30
AIRE = 0.2  # más la cola y el arranque de la voz: ~0,45 s de silencio real entre escenas (límite: 0,5 s)
VOZ = dict(voice="es-AR-TomasNeural", rate="-8%", pitch="-10Hz")


def sh(*cmd, **kw):
    subprocess.run(cmd, check=True, **kw)


def duracion(archivo):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", archivo],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def texto_voz(t):
    # En pantalla "Realy"; para la voz "Reali", así se pronuncia en español.
    return re.sub(r"\bRealy\b", "Reali", t)


async def sintetizar(texto, destino):
    import edge_tts
    if os.environ.get("SSL_CERT_FILE"):
        # edge-tts usa el bundle de certifi; detrás de un proxy con CA propia (la nube) hay que usar SSL_CERT_FILE.
        import ssl
        import edge_tts.communicate
        edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])
    # Además del audio guarda el tiempo real de cada palabra (WordBoundary, en unidades de 100 ns),
    # para los subtítulos y para sincronizar las animaciones con la voz.
    palabras = []
    with open(destino, "wb") as fh:
        async for m in edge_tts.Communicate(texto_voz(texto), boundary="WordBoundary", **VOZ).stream():
            if m["type"] == "audio":
                fh.write(m["data"])
            elif m["type"] == "WordBoundary":
                palabras.append({"texto": m["text"], "ini": m["offset"] / 1e7, "fin": (m["offset"] + m["duration"]) / 1e7})
    json.dump(palabras, open(destino[:-4] + ".json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)


def recortar_cola(audio, destino):
    """edge-tts deja ~1 s de silencio al final de cada audio, que sumado al aire pasa el límite de 0,5 s entre escenas.
    Corta donde empieza ese silencio final (debajo de -50 dB), con 30 ms de margen y un fundido corto."""
    dur = duracion(audio)
    sil = subprocess.run(["ffmpeg", "-i", audio, "-af", "silencedetect=noise=-50dB:d=0.3", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    inicios = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", sil)]
    finales = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", sil)]
    corte = dur
    if inicios and finales and finales[-1] >= dur - 0.05:  # el último silencio llega hasta el final del archivo
        corte = min(dur, inicios[-1] + 0.03)
    sh("ffmpeg", "-loglevel", "error", "-y", "-i", audio, "-af", f"atrim=0:{corte:.3f},afade=t=out:st={corte - 0.03:.3f}:d=0.03",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def letras(t):
    return re.sub(r"[^0-9a-záéíóúüñ]", "", t.lower())


def marcas_voz(palabras, claves, dur):
    """Fracción del clip en la que la voz empieza cada palabra clave (en orden de aparición)."""
    marcas, i = [], 0
    for c in claves:
        while letras(palabras[i]["texto"]) != letras(c):
            i += 1
        marcas.append(round(palabras[i]["ini"] / dur, 4))
        i += 1
    return marcas


def suave(p):
    return f"({p})*({p})*(3-2*({p}))"


def centro_zoom(foco, factor, evitar=()):
    """Centro y factor del acercamiento (en px de la lámina de 1920x1080). El cuadro no corta textos por la mitad:
    se encuadra en el espacio libre entre el texto de arriba y el de abajo del foco; si ese espacio es más bajo
    que el cuadro, se acerca un poco más (hasta 1,9x) y, si aun así no entra, deja afuera el texto de arriba."""
    cx, cy = foco["x"] + foco["w"] / 2, foco["y"] + foco["h"] / 2
    techo = max([e["y"] + e["h"] + 12 for e in evitar if e["y"] + e["h"] <= foco["y"]], default=0)
    piso = min([e["y"] - 12 for e in evitar if e["y"] >= foco["y"] + foco["h"]], default=1080)
    factor = max(factor, min(1.9, 1080 / (piso - techo)))
    mitad = 1080 / factor / 2
    cy = min(max(cy, techo + mitad), piso - mitad)
    return cx, min(max(cy, mitad), 1080 - mitad), factor


def clip_grafico(png, audio, dur, foco, factor, destino, evitar=()):
    """Plano general, acercamiento a la zona destacada mientras habla la voz y vuelta al plano general."""
    cx, cy, factor = centro_zoom(foco, factor, evitar)
    cx, cy = cx * 2, cy * 2  # la lámina se escala a 3840 px
    n = round(dur * FPS)
    p = f"(on/{n})"
    s = (f"if(lt({p},0.25),0,if(lt({p},0.40),{suave(f'({p}-0.25)/0.15')},"
         f"if(lt({p},0.75),1,if(lt({p},0.90),1-{suave(f'({p}-0.75)/0.15')},0))))")
    z = f"1+{factor - 1}*{s}"
    zp = (f"zoompan=z='{z}':x='max(0,min(iw-iw/zoom,{cx}-iw/zoom/2))':"
          f"y='max(0,min(ih-ih/zoom,{cy}-ih/zoom/2))':d=1:s=1920x1080:fps={FPS}")
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", png,
       "-i", audio, "-filter_complex", f"[0:v]scale=3840:2160,fps={FPS},{zp},format=yuv420p[v];[1:a]apad[a]",
       "-map", "[v]", "-map", "[a]", "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def clip_fijo(png, audio, dur, destino):
    sh("ffmpeg", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS), "-t", f"{dur:.3f}", "-i", png,
       "-i", audio, "-filter_complex", "[0:v]format=yuv420p[v];[1:a]apad[a]", "-map", "[v]", "-map", "[a]",
       "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-tune", "stillimage",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def clip_animacion(spec, audio, dur, trabajo, destino):
    a = spec["animacion"]
    html = os.path.join(RAIZ, "herramientas", "animaciones", a["tipo"] + ".html")
    cuadros = os.path.join(trabajo, "cuadros")
    shutil.rmtree(cuadros, ignore_errors=True)
    if a.get("marcas_voz") and spec.get("palabras"):
        a = {**a, "marcas": ",".join(map(str, marcas_voz(spec["palabras"], a["marcas_voz"], dur)))}
    qs = "&".join(f"{k}={v}" for k, v in a.items() if k not in ("tipo", "marcas_voz"))
    sh("node", os.path.join(RAIZ, "herramientas", "animar.js"), html, f"{dur:.3f}", cuadros, qs)
    sh("ffmpeg", "-loglevel", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(cuadros, "%05d.png"),
       "-i", audio, "-filter_complex", "[0:v]format=yuv420p[v];[1:a]apad[a]", "-map", "[v]", "-map", "[a]",
       "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def frases(texto, largo=84):
    """Corta en oraciones y, si una oración es larga para un subtítulo, también en las comas."""
    salida = []
    for f in (f.strip() for f in re.split(r"(?<=[.?!:])\s+", texto)):
        if not f:
            continue
        actual = ""
        for parte in re.split(r"(?<=,)\s+", f):
            if actual and len(actual) + len(parte) + 1 > largo:
                salida.append(actual)
                actual = parte
            else:
                actual = f"{actual} {parte}".strip()
        salida.append(actual)
    # lo que siga largo (oraciones sin comas) se parte en el espacio más cercano a la mitad
    while any(len(f) > largo for f in salida):
        i = next(i for i, f in enumerate(salida) if len(f) > largo)
        f = salida[i]
        corte = min((j for j, ch in enumerate(f) if ch == " "), key=lambda j: abs(j - len(f) / 2))
        salida[i:i + 1] = [f[:corte], f[corte + 1:]]
    return salida


def srt(escenas, destino):
    """Subtítulos con el texto del guion. Con los tiempos de palabra de la voz, cada frase va de su primera
    a su última palabra; sin ellos (maqueta), se reparte la escena según el largo de cada frase."""
    def ts(t):
        h, r = divmod(t, 3600)
        m, s = divmod(r, 60)
        return f"{int(h):02}:{int(m):02}:{s:06.3f}".replace(".", ",")
    filas, t0 = [], 0.0
    for e in escenas:
        fs = frases(e["voz"])
        pal = e.get("palabras")
        if pal:
            # Se alinea por cantidad de letras: las palabras de la voz salen del mismo texto ("Reali" = "Realy").
            acum, n = [], 0
            for p in pal:
                n += len(letras(p["texto"]))
                acum.append(n)
            hecho = 0
            for f in fs:
                ini = next(i for i, a in enumerate(acum) if a > hecho)
                hecho += len(letras(f))
                fin = next((i for i, a in enumerate(acum) if a >= hecho), len(pal) - 1)
                filas.append((t0 + pal[ini]["ini"], t0 + pal[fin]["fin"], f))
        else:
            total = sum(len(f) for f in fs)
            t = t0
            for f in fs:
                d = e["dur_voz"] * len(f) / total
                filas.append((t, t + d, f))
                t += d
        t0 += e["dur"]
    with open(destino, "w", encoding="utf-8") as fh:
        for i, (a, b, f) in enumerate(filas, 1):
            fh.write(f"{i}\n{ts(a)} --> {ts(b)}\n{f}\n\n")


def main():
    spec_path, trabajo = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    maqueta = "--maqueta" in sys.argv[3:]
    spec = json.load(open(spec_path, encoding="utf-8"))
    lec = spec["lecciones"][0]
    n_, m_, l_ = lec["id"].split("-")
    nombre = f"RIC-N{n_}-M{m_}-L{l_}" + ("-maqueta" if maqueta else "")
    os.makedirs(trabajo, exist_ok=True)
    entrega = os.path.join(trabajo, "entrega")
    os.makedirs(os.path.join(entrega, "laminas"), exist_ok=True)

    # 1. Láminas
    dir_laminas = os.path.join(trabajo, "laminas")
    sh("node", os.path.join(RAIZ, "diseno", "generar.js"), spec_path,
       env={**os.environ, "RIC_VIDEO": "1", "RIC_OUT": dir_laminas})
    sh("node", os.path.join(RAIZ, "herramientas", "render.js"), dir_laminas)
    indice = json.load(open(os.path.join(dir_laminas, "laminas.json"), encoding="utf-8"))
    assert len(indice) == len(lec["laminas"])

    # 2. Voz por escena
    dir_audio = os.path.join(trabajo, "audio")
    os.makedirs(dir_audio, exist_ok=True)
    escenas = []
    for i, (l, ix) in enumerate(zip(lec["laminas"], indice), 1):
        audio = os.path.join(dir_audio, f"{i:02}.mp3")
        if maqueta:
            audio = os.path.join(dir_audio, f"{i:02}-maqueta.m4a")
            seg = len(l["voz"].split()) / 2.4  # ritmo aproximado de la voz con rate -8 %
            sh("ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
               "-t", f"{seg:.2f}", "-c:a", "aac", audio)
        elif not (os.path.exists(audio) and os.path.exists(audio[:-4] + ".json")):
            asyncio.run(sintetizar(l["voz"], audio))
        palabras = None if maqueta else json.load(open(audio[:-4] + ".json", encoding="utf-8"))
        if not maqueta:
            recortado = audio[:-4] + "-recortado.m4a"
            recortar_cola(audio, recortado)
            audio = recortado
        dv = duracion(audio)
        escenas.append({**l, "n": i, "png": ix["png"], "foco": ix.get("foco"), "evitar": ix.get("evitar"),
                        "audio": audio, "palabras": palabras, "dur_voz": dv, "dur": dv + AIRE})
        print(f"voz {i:02} {dv:5.1f} s")

    # 3. Clips por escena
    dir_clips = os.path.join(trabajo, "clips")
    os.makedirs(dir_clips, exist_ok=True)
    for e in escenas:
        destino = os.path.join(dir_clips, f"{e['n']:02}.mp4")
        if e["tipo"] == "animacion":
            clip_animacion(e, e["audio"], e["dur"], trabajo, destino)
        elif e["tipo"] == "grafico" and e.get("zoom") and e.get("foco"):
            clip_grafico(e["png"], e["audio"], e["dur"], e["foco"], e["zoom"].get("factor", 1.7), destino,
                         e.get("evitar") or ())
        else:
            clip_fijo(e["png"], e["audio"], e["dur"], destino)
        e["clip"] = destino
        print("clip", e["n"], e["tipo"])

    # 4. Montaje con el filtro concat (recodificando)
    video = os.path.join(entrega, nombre + ".mp4")
    entradas = sum((["-i", e["clip"]] for e in escenas), [])
    filtro = "".join(f"[{i}:v][{i}:a]" for i in range(len(escenas))) + f"concat=n={len(escenas)}:v=1:a=1[v][a]"
    sh("ffmpeg", "-loglevel", "error", "-y", *entradas, "-filter_complex", filtro, "-map", "[v]", "-map", "[a]",
       "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(FPS),
       "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", video)

    # 5. Subtítulos, guion, láminas y miniatura
    srt(escenas, os.path.join(entrega, nombre + ".srt"))
    with open(os.path.join(entrega, nombre + "-guion.txt"), "w", encoding="utf-8") as fh:
        for e in escenas:
            fh.write(f"[{e['n']:02} · {e['escena']} · {e['tipo']}]\n{e['voz']}\n\n")
    for e in escenas:
        if e["tipo"] != "animacion":
            shutil.copy(e["png"], os.path.join(entrega, "laminas", f"{e['n']:02}.png"))
    mini = os.path.join(RAIZ, "produccion", lec["id"], "miniatura.html")
    if os.path.exists(mini):
        sh("node", os.path.join(RAIZ, "herramientas", "miniatura.js"), mini, os.path.join(entrega, nombre + "-portada.png"))

    # 6. Verificación
    total = duracion(video)
    esperado = sum(e["dur"] for e in escenas)
    sil = subprocess.run(["ffmpeg", "-i", video, "-af", "silencedetect=noise=-45dB:d=0.5", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    huecos = re.findall(r"silence_duration: ([\d.]+)", sil)
    informe = {
        "video": video, "duracion_s": round(total, 2), "duracion_esperada_s": round(esperado, 2),
        "escenas": [{"n": e["n"], "tipo": e["tipo"], "voz_s": round(e["dur_voz"], 2)} for e in escenas],
        "silencios_de_mas_de_0_5_s": [round(float(h), 2) for h in huecos],
        # De la última palabra de una escena a la primera de la siguiente (sin contar las pausas entre frases).
        "huecos_entre_escenas_s": [round(a["dur"] - a["palabras"][-1]["fin"] + b["palabras"][0]["ini"], 2)
                                   for a, b in zip(escenas, escenas[1:])]
        if not maqueta else None,
        "palabras_guion": sum(len(e["voz"].split()) for e in escenas),
    }
    json.dump(informe, open(os.path.join(entrega, "verificacion.json"), "w"), ensure_ascii=False, indent=1)
    print(json.dumps(informe, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
