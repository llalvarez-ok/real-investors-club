# Efectos «a cámara» (15/11/2026)

Idea tomada del Reel de @infomindshft.ai (https://www.instagram.com/reel/DfndlIByap0/, 994 likes y 538 comentarios):
efectos sobre un video de alguien hablando a cámara, pedidos con un comando. Nuestra versión, para los Reels de Lean a
cámara del plan de Instagram (`analisis/2026-11-14-revision-instagram.md`).

## Efectos
| `tipo` | Qué hace | Capa |
|---|---|---|
| `foco` | oscurece y desatura el fondo, con viñeta; Lean queda iluminado | fondo |
| `titulo` | título gigante en dorado **detrás** de Lean (se ajusta al ancho) | detrás |
| `cristal` | paneles de vidrio esmerilado flotando a los costados (título + valor) | detrás |
| `orbita` | imágenes (miniaturas, gráficos) girando alrededor de la cabeza; pasan por detrás y por delante | detrás y delante |
| `checklist` | lista que se va tildando cuando Lean dice cada punto | delante |
Además: subtítulos palabra por palabra (clave en dorado, zona segura y ≈ 1330) y la marca «REAL INVESTORS CLUB».

## Uso
1. `python herramientas/efectos/preparar.py <video.mp4> <dir> <rvm_mobilenetv3_fp32.onnx>` (con `venv-qwen`, que tiene
   faster-whisper): cuadros 1080x1920, silueta de Lean con RobustVideoMatting (modelo de las releases de GitHub,
   GPL-3.0, se usa como herramienta y no se distribuye), posición de la cabeza y palabras con tiempos.
2. Un `cfg.js` con `window.CFG = {clave: "…", efectos: [{tipo, desde, hasta, …}]}`. Las anclas son `{s: segundos}`,
   `{w: índice de palabra}` o `{txt: "palabra", n: ocurrencia}`. Ejemplo en la sección siguiente.
3. `node herramientas/cine/render.js "herramientas/efectos/efectos.html?dir=<dir>&cfg=<cfg.js>" <salida> <segundos> 4`
   y ffmpeg con `audio.wav` (pasarlo antes por `herramientas/cine/voz_grabada.py` si suena a sala).

```js
window.CFG = { clave: "errores|plan|miedo", efectos: [
  { tipo: "titulo", texto: "3 ERRORES", desde: { s: 0 }, hasta: { txt: "primero" } },
  { tipo: "foco", desde: { s: 0 }, hasta: { txt: "primero" } },
  { tipo: "cristal", desde: { txt: "riesgo" }, hasta: { s: 9 }, paneles: [{ titulo: "Riesgo por operación", valor: "1 %" }] },
  { tipo: "checklist", desde: { s: 9 }, hasta: { s: 16 }, items: [{ txt: "Arriesgar de más", marca: { txt: "arriesgar" } }] } ] };
```

## Estado
Probado el 15/11/2026 con una foto animada (sin persona a cámara): funcionan las capas, el título detrás, el checklist
y los subtítulos. **Falta probarlo con un video real de Lean a cámara** (20–40 s, vertical, iPhone, a Drive RIC/videos)
para ajustar la cabeza, el recorte y las posiciones de cristal y órbita.
