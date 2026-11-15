---
name: ric-efectos
description: Efectos sobre un video de Lean hablando a cámara (foco, título gigante detrás, paneles de cristal, miniaturas en órbita, checklist que se tilda y subtítulos palabra por palabra). Usar para «poneles efectos a mi video», «/efectos foco», «título detrás», «checklist», o al armar los Reels de Lean a cámara.
---
Seguí `herramientas/efectos/LEEME.md`:
1. Pedile a Lean el video vertical (iPhone, a Drive RIC/videos con link público) si no lo tenés.
2. `preparar.py` (cuadros, silueta con RobustVideoMatting, cabeza y palabras con faster-whisper; usar `venv-qwen`).
3. Escribí `cfg.js` con los efectos anclados a las palabras que dice Lean (`{txt: "palabra"}`), en voseo, sin
   recomendaciones de compra o venta, y con los textos dentro de la zona segura (x 140–870, y 250–1440).
4. Probá 3 o 4 cuadros con `render.js … foto`, corregí y renderizá; audio con `herramientas/cine/voz_grabada.py`.
5. Su voz grabada no lleva contenido sintético; los efectos no cambian eso.
