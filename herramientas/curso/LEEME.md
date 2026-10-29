# Reedición de las clases del curso anterior

Piloto: clase 14 de «Básicos del trading» (en vivo de 72 min, pantalla de TradingView + cámara chica en la esquina).
Plan de cortes de ejemplo: `produccion/curso-clase14/cortes.json`.

1. Bajar la clase de Drive (link público) y transcribir: `transcribir.py` (faster-whisper small).
2. Elegir los tramos a mano en `cortes.json` (sin charla con el chat, repeticiones ni «me voy a ampliar la imagen»).
   `editar.py cortes.json plan.json tramo.wav`: además acorta a 0,2 s todo silencio de más de 0,35 s y
   lleva cada corte al punto más silencioso a ±0,15 s.
3. `cortar.py <fuente> plan.json <dir>`: video por segmentos con cuadros exactos (30 fps) y audio con fundidos de 10 ms.
4. Volver a transcribir el audio editado (`transcribir.py`, con `OFF=0`) y `subtitulos.py trans.json subs.ass 0`.
5. Cámara: recorte 262x147 en (997,520) del original (deja afuera la marca «droidcam.app»), a 520x292, y
   `fondo_cam.py` con el fondo `bg_cam.png` (recorte de `fondo_cam.html`).
6. Audio: highpass 75, EQ +2 dB en 200 Hz y 3 kHz, deesser, compresor 3:1, loudnorm −16 LUFS; música solo en apertura y cierre.
7. `armar.sh <dir> <cam_out.mp4> <salida.mp4>`: pantalla (1280x505 → 1840x726) y cámara sobre `fondo.png`, subtítulos,
   apertura de 3 s y cierre de 4,5 s con el aviso legal. Las láminas salen de los `.html` con `foto.js` / `foto2.js` (marco transparente).

Tiempos de máquina del piloto (4:35 finales): transcripción ~6 min, corte 1 min, fondo de la cámara 4 min, render 5 min.
