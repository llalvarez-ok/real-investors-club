# Voz clonada de Lean con Qwen3-TTS (Apache 2.0)

**Es la voz de todos los videos de RIC desde el 07/11/2026** (decisión de Lean), salvo que él grabe. Elegida entre 5 muestras (`analisis/2026-11-07-voces-abiertas.md`).

Instalación (una vez por máquina, ~4 GB del modelo 1.7B Base desde Hugging Face):
```bash
python3 -m venv --system-site-packages venv-qwen && venv-qwen/bin/pip install qwen-tts
```
Referencia: 13 s de Lean (toma de Elecciones limpiada con DeepFilterNet3) con su texto exacto; mejor con 1-2 min grabados
limpios. `qwen_p22.py` arma el «prompt» de la voz una vez y genera cada escena (~5 s de cálculo por segundo de audio en CPU).

Pizarra con voz clonada (probado con el Short 2 de P22):
1. Copiar `audio/NN.json` y `NN.mp3` del trabajo original a un trabajo nuevo y reemplazar las escenas del Short: el WAV de
   Qwen pasado a MP3 y el JSON de palabras sacado con faster-whisper (medium, `initial_prompt` = el texto) alineado a las
   palabras del texto (`[{"texto","ini","fin"}]`, el formato de edge-tts).
2. `unir_voz.sh`, `musica_fondo.py` y `tiempos_pizarra.py` sobre el trabajo nuevo → `tiempos-lean.js`; copia de la escena
   (`pizarra-lean.html`) que carga esos tiempos (y textos en pantalla en voseo si cambian).
3. `render_pizarra.js` solo del tramo (desde/hasta en segundos), video con fondo blanco antes del tramo, y
   `shorts_pizarra.py` con una copia de `shorts.json` que tiene solo esa pieza (con `cta` en voseo).
Los Shorts van en voseo (acertás, operás, hacés) y con contenido sintético marcado.


## Referencias de la voz y emoción (12/11/2026, Reel de Wyckoff)
Lean: «la voz suena triste, sin emoción». El clon copia el tono de la referencia: 18 s del vivo explicando una operación
(«El error que cometí en vivo») dan una voz plana (variación de tono 2,9 semitonos). Se buscaron tramos del vivo del 02/11
(Drive, RIC/referencias, 1:35 h) con más variación de tono (librosa: desvío de semitonos en ventanas de 16 s, sin música,
con piso de ruido bajo) y se probaron 3: el mejor fue Lean charlando del partido de Boca (79:06, 15 s): 4,1 semitonos,
ritmo más ágil. Un tramo del vivo de análisis tranquilo (43:47) salió peor (1,9).
**No usar `corea.mp4` de RIC/referencias:** es el Reel de otra cuenta (otra voz y música de fondo), no la voz de Lean.
Lo mejor a futuro: que Lean grabe 30 a 60 s leyendo un texto con energía (Notas de voz del iPhone, cerca de la boca) y
lo suba a Drive, RIC/audios, como referencia fija para todos los chats.
