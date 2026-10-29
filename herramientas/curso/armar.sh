#!/bin/bash
# armar.sh <dir> <cam.mp4> <salida> [segundos]  — compone pantalla + cámara + subtítulos sobre el fondo RIC, con apertura y cierre
set -e
D=$1; CAM=$2; OUT=$3; T=${4:-}
LIM=""; [ -n "$T" ] && LIM="-t $T"
ffmpeg -v error -y $LIM -i $D/cortado_v.mp4 $LIM -i $CAM -loop 1 -i fondo.png -loop 1 -i marco.png -filter_complex "\
[0]crop=1280:505:0:0,scale=1840:726:flags=lanczos,unsharp=5:5:0.45,eq=contrast=1.03:saturation=1.05[scr];\
[2][scr]overlay=40:30:shortest=1[b1];[b1][3]overlay[b2];[b2][1]overlay=1362:770:shortest=1,ass=$D/subs.ass,format=yuv420p[v]" \
 -map "[v]" -r 30 -c:v libx264 -preset medium -crf 18 $D/cuerpo.mp4
ffmpeg -v error -y -loop 1 -t 3 -i apertura.png -vf "fade=t=in:d=0.4,fade=t=out:st=2.6:d=0.4,format=yuv420p" -r 30 -c:v libx264 -crf 18 $D/ap.mp4
ffmpeg -v error -y -loop 1 -t 4.5 -i cierre.png -vf "fade=t=in:d=0.5,fade=t=out:st=4.0:d=0.5,format=yuv420p" -r 30 -c:v libx264 -crf 18 $D/ci.mp4
ffmpeg -v error -y -i $D/ap.mp4 -i $D/cuerpo.mp4 -i $D/ci.mp4 -i $D/audio_final.wav -filter_complex "[1]fade=t=in:d=0.3[c];[0][c][2]concat=n=3:v=1:a=0[v]" \
 -map "[v]" -map 3:a -shortest -c:v libx264 -preset medium -crf 18 -c:a aac -b:a 192k -movflags +faststart $OUT
