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
AIRE = 0.4
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
    await edge_tts.Communicate(texto_voz(texto), **VOZ).save(destino)


def suave(p):
    return f"({p})*({p})*(3-2*({p}))"


def clip_grafico(png, audio, dur, foco, factor, destino):
    """Plano general, acercamiento a la zona destacada mientras habla la voz y vuelta al plano general."""
    cx, cy = (foco["x"] + foco["w"] / 2) * 2, (foco["y"] + foco["h"] / 2) * 2  # la lámina se escala a 3840 px
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
    qs = "&".join(f"{k}={v}" for k, v in a.items() if k != "tipo")
    sh("node", os.path.join(RAIZ, "herramientas", "animar.js"), html, f"{dur:.3f}", cuadros, qs)
    sh("ffmpeg", "-loglevel", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(cuadros, "%05d.png"),
       "-i", audio, "-filter_complex", "[0:v]format=yuv420p[v];[1:a]apad[a]", "-map", "[v]", "-map", "[a]",
       "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
       "-c:a", "aac", "-b:a", "192k", "-ar", "48000", destino)


def srt(escenas, destino):
    """Subtítulos por frase, con tiempos repartidos según el largo de cada frase dentro de su escena."""
    def ts(t):
        h, r = divmod(t, 3600)
        m, s = divmod(r, 60)
        return f"{int(h):02}:{int(m):02}:{s:06.3f}".replace(".", ",")
    filas, t0 = [], 0.0
    for e in escenas:
        frases = [f.strip() for f in re.split(r"(?<=[.?!:])\s+", e["voz"]) if f.strip()]
        total = sum(len(f) for f in frases)
        t = t0
        for f in frases:
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
        elif not os.path.exists(audio):
            asyncio.run(sintetizar(l["voz"], audio))
        dv = duracion(audio)
        escenas.append({**l, "n": i, "png": ix["png"], "foco": ix.get("foco"), "audio": audio,
                        "dur_voz": dv, "dur": dv + AIRE})
        print(f"voz {i:02} {dv:5.1f} s")

    # 3. Clips por escena
    dir_clips = os.path.join(trabajo, "clips")
    os.makedirs(dir_clips, exist_ok=True)
    for e in escenas:
        destino = os.path.join(dir_clips, f"{e['n']:02}.mp4")
        if e["tipo"] == "animacion":
            clip_animacion(e, e["audio"], e["dur"], trabajo, destino)
        elif e["tipo"] == "grafico" and e.get("zoom") and e.get("foco"):
            clip_grafico(e["png"], e["audio"], e["dur"], e["foco"], e["zoom"].get("factor", 1.7), destino)
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
        "palabras_guion": sum(len(e["voz"].split()) for e in escenas),
    }
    json.dump(informe, open(os.path.join(entrega, "verificacion.json"), "w"), ensure_ascii=False, indent=1)
    print(json.dumps(informe, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
