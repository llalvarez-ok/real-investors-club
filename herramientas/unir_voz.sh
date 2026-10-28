#!/bin/bash
# Uso: herramientas/unir_voz.sh <dir de trabajo> (con audio/NN.mp3 de edge-tts). Procesa cada escena con la cadena de diseno/ESTILO-PILAR.md,
# recorta el silencio final de edge-tts (deja las pausas internas) y une con ~0,45 s entre escenas (0,2 de cola + 0,15 de aire + resto). Sale <dir>/voz.wav a -16 LUFS.
W=$1; cd $W/audio
CADENA="highpass=f=70,equalizer=f=180:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.2:g=1.5,equalizer=f=7000:t=q:w=2:g=-3,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2"
rm -f lista.txt
ffmpeg -loglevel error -y -f lavfi -i anullsrc=r=48000:cl=mono -t 0.15 -c:a pcm_s16le aire.wav
for f in $(ls [0-9][0-9].mp3 | sort); do
  n=${f%.mp3}
  ffmpeg -loglevel error -y -i $f -af "areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,$CADENA,apad=pad_dur=0.2" -ar 48000 -ac 1 -c:a pcm_s16le p$n.wav
  echo "file 'p$n.wav'" >> lista.txt; echo "file 'aire.wav'" >> lista.txt
done
ffmpeg -loglevel error -y -f concat -safe 0 -i lista.txt -af "loudnorm=I=-16:TP=-1.5:LRA=7" -ar 48000 -c:a pcm_s16le ../voz.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 ../voz.wav
