# Lemo-Opuscar (22/11/2026)

Pedido de Lean: revisar el plugin de GitHub Lemo-Opuscar (https://github.com/lemomo-ai/lemo-opuscar, ~19.900 estrellas,
v2.0.0) para ver si mejora nuestros videos. Se leyó un clon local sin ejecutar nada.

## Qué es
- Una biblioteca de 99 estilos de «película hecha en código».
- Cada estilo trae:
  - `styles/<slug>/STYLE.md`: esencia, color, tipografía, cámara, sonido, movimientos propios y errores típicos;
  - una demo hecha en código.
- Dos guías generales: `DIRECTOR.md` (dirección) y `TECHNIQUE.md` (construcción).
- Motor: páginas canvas, three.js o WebGL con `window.render(t)`, capturadas cuadro a cuadro con Playwright. Es lo mismo
  que nuestro `cuadro(t)` + `render.js`.
- Voz: Kokoro o edge-tts, con chequeo de whisper.
- El plugin es una sola skill. Su instalación clona el repo, hace `npm install`, crea un entorno de Python y baja modelos.

## Licencia
- Código: MIT.
- Textos y prompts de los estilos: CC BY-NC 4.0, con un permiso extra para leerlos, seguirlos y adaptarlos al hacer
  películas propias, también comerciales. No se pueden redistribuir ni vender.
- Películas demo: CC BY 4.0.
- Lo que hagamos con la biblioteca es nuestro y no lleva crédito.

## Decisión: no instalar el plugin, sí copiar ideas
Instalarlo duplicaría nuestro pipeline y traería su propia voz, 24 fps y 1920x1080 (nosotros usamos el clon de Lean,
30 fps y vertical).

Lo que sí sirve, para `ric-motion` y `herramientas/cine/LEEME.md` (con palabras propias):
- **Dirección:**
  - gancho en los primeros 3 s y un final que vuelva al comienzo;
  - un movimiento propio del estilo en el pico;
  - al menos 4 movimientos de cámara distintos;
  - transiciones hechas con el propio medio, no fundidos;
  - un silencio antes del giro.
- **Lectura:** cada texto queda en pantalla al menos (letras ÷ 15 + 1,5) s, y cada subtítulo al menos 1,8 s.
- **Grano:** se agrega en ffmpeg y no dibujado en la página. Dibujado en la página, cada cuadro queda incomprimible y el
  video pierde nitidez al codificarlo. Hay que revisarlo en los Reels de expediente cine, que sí tienen grano en la página.
- **Estilos de referencia:**
  - `dark-keynote`: fondo oscuro, grilla fina, un acento y el número gigante. Es el más cercano a nuestra paleta.
  - `caption-news`: noticias que se entienden sin sonido.
  - `dataviz`: el gráfico es la película.
  - `halftone-dossier`: expediente con sellos.
  - `glass-product`: vidrio y luz, para metáforas.
- **Chequeos para adaptar (MIT):**
  - `core/render/readcheck.mjs`: si cada texto llega a leerse;
  - `motioncheck.py`: tramos de más de 1 s sin movimiento;
  - whisper sobre la mezcla final.

## Primer paso propuesto
Pasar el grano de un Reel de expediente cine a ffmpeg y comparar peso y nitidez contra el render actual. Después,
adaptar `readcheck` y `motioncheck` a `cuadro(t)` y 30 fps.
