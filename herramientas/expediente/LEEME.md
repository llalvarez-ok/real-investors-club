# Estilo «expediente» (Reels y Shorts de noticias)

Referencia: el Reel de ARQV sobre Corea del Norte (Drive, `corea.mp4`): fondo oscuro, fotos con cinta, recortes de diario,
cifras grandes y sellos. Primer video: `produccion/reel-corea/`.

1. Guion por bloques en `produccion/<id>/guion.json` (voseo para Instagram, números en palabras, pronunciaciones escritas).
2. Voz: `python voz.py guion.json <modelo Daniela> <dir voz> 1.0` (Piper; el modelo se baja de las releases de sherpa-onnx en GitHub).
3. Tiempos por palabra con whisper → `tiempos-<ig|yt>.js` (`window.T`); corregir a mano lo que whisper escucha mal.
4. Escena: `produccion/<id>/escena.html?v=ig|yt`. Cada elemento lleva `data-b` (bloque), `data-w` (palabra) o `data-o`
   (segundos), `data-e` (sube, pop, golpe, sello, foto, izq, escribe, cuenta, barra, aparece) y `data-s` (efecto de sonido).
   Las fotos van en `fotos/<nombre>.jpg`; si faltan, queda el hueco marcado.
5. `node foto.js "<escena>?v=ig" <prefijo> <segundos…>`: cuadros sueltos para revisar.
6. `node render.js "<escena>?v=ig" <dir> <duración> 4`: cuadros a 30 fps (~1,5 min por 53 s).
7. `python mezcla.py tiempos.json <dir voz> <dir>/eventos.json audio.wav`: voz, cama musical con ducking y efectos.
8. ffmpeg: cuadros + audio, loudnorm −14 LUFS. En YouTube solo cambia el bloque 09 (se renderiza solo el final).
