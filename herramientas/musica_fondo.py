#!/usr/bin/env python3
"""Mezcla la voz de un video con la música de fondo.

    python herramientas/musica_fondo.py <voz> <música> <salida> [--loop-desde 35] [--loop-hasta 185] [--nivel -32]

- Arma una base del largo de la voz: la intro del tema hasta --loop-desde y después repite el tramo
  [--loop-desde, --loop-hasta] con un fundido cruzado de 3 s, para que el corte no se note.
- Normaliza la música a --nivel LUFS (por defecto -32, unos 16 dB por debajo de la voz a -16) y la baja todavía más
  mientras la voz habla (sidechaincompress, que funciona como ducking). Fundido de entrada de 1,5 s y de salida de 3 s.
- La voz entra tal cual; procesarla con la cadena de diseno/ESTILO-PILAR.md va antes de esto.
Salida en AAC 192 kbps, 48 kHz, estéreo.
"""
import argparse
import subprocess


def duracion(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True, check=True).stdout)


def main():
    a = argparse.ArgumentParser()
    a.add_argument("voz"); a.add_argument("musica"); a.add_argument("salida")
    a.add_argument("--loop-desde", type=float, default=35.0)
    a.add_argument("--loop-hasta", type=float, default=185.0)
    a.add_argument("--nivel", type=float, default=-32.0)
    o = a.parse_args()
    total = duracion(o.voz)
    tramo, cruce = o.loop_hasta - o.loop_desde, 3.0
    vueltas = max(1, int((total - o.loop_desde) // (tramo - cruce)) + 1)
    # Intro + n vueltas del tramo, encadenadas con acrossfade
    partes = [f"[1:a]atrim=0:{o.loop_desde + cruce},asetpts=PTS-STARTPTS[m0]"]
    for i in range(vueltas):
        partes.append(f"[2:a]atrim={o.loop_desde}:{o.loop_hasta},asetpts=PTS-STARTPTS[l{i}]")
    previo = "m0"
    for i in range(vueltas):
        partes.append(f"[{previo}][l{i}]acrossfade=d={cruce}:c1=tri:c2=tri[c{i}]")
        previo = f"c{i}"
    partes += [
        f"[{previo}]atrim=0:{total:.3f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,"
        f"loudnorm=I={o.nivel}:TP=-6:LRA=11,afade=t=in:d=1.5,afade=t=out:st={max(0, total - 3):.3f}:d=3[base]",
        "[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[voz][clave]",
        "[base][clave]sidechaincompress=threshold=0.03:ratio=5:attack=30:release=450:makeup=1[bajo]",
        "[voz][bajo]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[sal]",
    ]
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", o.voz, "-i", o.musica, "-i", o.musica,
                    "-filter_complex", ";".join(partes), "-map", "[sal]", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                    o.salida], check=True)
    print(o.salida, f"{total:.2f} s, {vueltas} vuelta(s) del loop")


if __name__ == "__main__":
    main()
