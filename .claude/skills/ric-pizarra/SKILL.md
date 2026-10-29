---
name: ric-pizarra
description: >-
  Producir un video pilar de RIC en estilo pizarra de punta a punta: voz, música, animación sincronizada con cada
  palabra, render, Shorts, reel de Instagram, textos para subir y publicación programada por la API. Usar para
  "hacé el próximo video", "producí P11", "armá los Shorts", "cargale los datos y programalo".
---

# ric-pizarra

Todo en `produccion/pNN-<tema>/`. Guía visual y de voz: `diseno/ESTILO-PILAR.md`. Trabajo pesado (audio, cuadros,
MP4) en el scratchpad, nunca en git.

## 1. Guion
`guion.json` con `escenas[{n, titulo, voz, visual}]` y `voz: {voice: en-US-BrianMultilingualNeural}`, más
`guion.md` legible. Seguir `ric-guion` y pasar `herramientas/revisar_guion.py` sin errores. Lean lo aprueba.

## 2. Voz, música y tiempos
```bash
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python herramientas/voz_pizarra.py produccion/<id>/guion.json <trabajo> [escenas]
bash herramientas/unir_voz.sh <trabajo>                       # cadena de voz + huecos de menos de 0,5 s
python herramientas/musica_fondo.py <trabajo>/voz.wav <musica.mp3> <trabajo>/audio-final.m4a
python herramientas/tiempos_pizarra.py <trabajo> produccion/<id>/tiempos.js
```
Música: «Futile» en Drive, RIC/audios (`diseno/ESTILO-PILAR.md`).

## 3. Escena
`produccion/<id>/pizarra.html` sobre `herramientas/animaciones/pizarra.js` (copiar la cabecera de P10). Cada
elemento atado a una palabra con `w("palabra", n)`; cada escena en su zona; título al arranque de cada escena; nada
de tramos de más de ~8 s sin algo nuevo. Datos reales en un `.js` (yfinance). Objetos nuevos: sumarlos a
`herramientas/recursos_pizarra.jsx` y regenerar (`recursos/LICENCIAS.md`).
Revisar antes de renderizar: palabras que faltan (`window.FALTAN` vacío), huecos por escena y una hoja de contacto
con un cuadro al final de cada escena (0,95 s antes del cambio de zona).

## 4. Render y video
```bash
NODE_PATH=$(npm root -g) node herramientas/render_pizarra.js produccion/<id>/pizarra.html <dur> <trabajo>/cuadros 4 30
ffmpeg -framerate 30 -i <trabajo>/cuadros/%05d.jpg -i <trabajo>/audio-final.m4a -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a copy -shortest RIC-PNN-<tema>.mp4
```
~6 min para 6 min de video. Para corregir un tramo: el mismo comando con `desde` y `hasta` y volver a unir.
Verificar: duración igual a la voz, −16 LUFS aprox., sin silencios de más de 0,6 s, cuadros exactos con
`ffmpeg -ss` (la hoja con `fps=1/N` engaña).

## 5. Miniatura, Shorts y textos
`miniatura.html` (ver `ric-empaque`) → `node herramientas/miniatura.js`. `shorts.json` con 5 Shorts y un reel de
escenas completas que se entiendan solas → `python herramientas/shorts_pizarra.py`. Fuentes de subtítulos en
`~/.fonts` (ver CLAUDE.md). `subir.md` con título, descripción con capítulos (de `tiempos.js`), etiquetas,
comentario fijado y textos de cada Short.

## 6. Publicación (con el visto bueno de Lean)
Lean sube los MP4. Por la API: título, descripción, etiquetas, categoría 27, idioma es, `containsSyntheticMedia`,
`thumbnails.set`, playlist `PLEaK47BmSetA`, y `publishAt` (19:00 de Argentina = 22:00 UTC): el video largo antes
que sus Shorts, un Short por día. Registrar los IDs en `produccion/<id>/publicados.json` y el estado en CLAUDE.md.
Lo que queda a mano en Studio: comentario fijado, pantalla final y video relacionado de cada Short.
