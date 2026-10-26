# Proyecto: canal de YouTube "Real Investors Club" (RIC)

Academia de trading e inversiones en español para Latinoamérica (realinvestors.club). Canal: @REALinvestorsc, creado el 19/04/2026. El director es Lean Alvarez; habla español rioplatense (voseo) en el chat.

Este proyecto es independiente del canal Atajos IA: no mezclar contenido, credenciales ni herramientas entre ambos.

Claude trabaja como productor de video de RIC. Las reglas completas están en `docs/prompt-maestro.md` y mandan sobre este resumen.

## Objetivo del canal
Captar alumnos para el club y llegar a la monetización de YouTube. El Nivel 0 es público. Los niveles 1 a 5 son material del club y van **no listados**.

## Material del repo
- `contenido/curriculum-data.js`: títulos oficiales, módulos, niveles y precios. Es la fuente de verdad del programa.
- `contenido/nivel-N.js`: la lectura de cada lección (`resumen`, `lectura` en HTML, `claves`), con IDs `nivel-módulo-lección` (por ejemplo `0-1-0`).
- `youtube/metadatos.json`: título, descripción y etiquetas por lección, sacados del `.docx` con `herramientas/docx_a_json.py`.
- `diseno/ESQUEMA.md`: los tipos de lámina y el criterio editorial de las láminas.
- `diseno/generar.js`: el generador de láminas de la PC, como referencia de diseño. Tiene la ruta `C:/ric/assets/logo.svg` fija; en este repo el logo está en `marca/logo.svg`.
- `marca/`: el logo oficial (`logo.svg`) y sus versiones PNG. Nunca redibujar el logo.
- `guiones/`: los guiones. `muestra-presentacion-lean-y-realy.txt` marca el tono, pero es una presentación de Lean y va en voseo; las lecciones van con "tú".
- `analisis/`: diagnósticos del canal con fecha.

## Reglas editoriales (no negociables)
- Lecciones en español neutro con "tú", nunca voseo. Coma decimal.
- Presentador: Realy. En pantalla se escribe "Realy"; en el texto para la voz, "Reali". Nunca decir "la IA" ni "el asistente".
- Gancho en los primeros 5 segundos, nunca "hola, bienvenidos". Guion de 700 a 1.000 palabras (5 a 7 minutos), frases cortas, tono de conversación.
- Estructura: gancho → qué vas a aprender → conceptos → ejemplo con persona y números → error común → "Así lo hacemos en RIC" → actividad en demo → resumen → cierre con la próxima lección.
- El video tiene que ser más rico que la lectura: analogías y ejemplos con personas con nombre y números concretos.
- Nunca recomendaciones de compra o venta ni promesas de ganancia. No nombrar brókers salvo que la lectura lo haga. No mencionar exámenes de certificación ni la palabra "temario" dentro de las lecciones.
- No revelar cómo opera Realy por dentro (indicadores, reglas, filtros).
- Gráficos de velas, soportes o tendencias: datos reales (yfinance) que confirmen lo que dice la voz. Si no hay ejemplo real, cambiar el ejemplo.
- Cierre con el logo, la web y el aviso "Contenido educativo. No constituye recomendación de inversión."
- Si un dato no está en la lectura ni es conocimiento general estable, preguntar o marcarlo como ejemplo ("Supón que…").

## Estilo visual
Fondo azul noche (#071426 a #0d2142) con grilla tenue. Oro (#e2c68c, #c7a35e, #8e7140) para la palabra clave. Texto #ecf1f9 y #a3b5d1. Verde #3dd68c y rojo #ff6b6b solo para subir y bajar. Bordes #274a80. Tipografías Archivo (títulos), IBM Plex Sans (texto) e IBM Plex Mono (etiquetas). Barra inferior "Realy · Real Investors Club" y la esquina inferior derecha libre (680 px).

## Flujo por lección
1. Guion en `produccion/<id>/spec.json`: una lámina por escena con el formato de `diseno/ESQUEMA.md`, más `escena` (L lámina, C gráfico, A animación, P solo voz) y `voz` (el texto que se locuta). Lean lo aprueba antes de seguir.
   Producción completa: `python herramientas/producir_leccion.py produccion/<id>/spec.json <dir de trabajo>` (con `--maqueta`, sin voz). La miniatura sale de `produccion/<id>/miniatura.html`.
2. Láminas y hoja de contacto para aprobar.
3. Video final `RIC-N{n}-M{m}-L{l}.mp4` y miniatura de 1280x720. Los MP4 y PNG pesados no van a git: se entregan en Google Drive.
4. Verificar duración, cortes de audio, huecos de más de 0,5 s y textos tapados. Reportar qué se verificó y qué no.
5. Lean sube el video a mano hasta que haya credenciales de la API de YouTube para la cuenta de RIC.

## Estado
- Publicadas: 0-0-0, 0-0-1, 0-0-2, 0-0-3 y 0-1-0 (públicas). La última subida fue el 17/09/2026.
- 0-1-1: guion, láminas, animación, miniatura y maqueta sin voz hechos el 26/10/2026, sin aprobar todavía. Falta la voz (red bloqueada).
- Los videos publicados no tienen cargadas las etiquetas de `youtube/metadatos.json`.
- Programa: 215 lecciones (Nivel 0: 21, incluido el módulo de la CNV agregado en septiembre de 2026). El `.docx` de títulos es anterior y cubre 170: faltan fichas para 45 lecciones, entre ellas 0-5-0 a 0-5-2.
- En `curriculum-data.js` el módulo de la CNV está antes de "Tu primer contacto con el mercado", pero en `nivel-0.js` tiene el ID 0-5-x. Confirmar con Lean el orden de publicación.
- Red de la nube: hay que habilitar en el entorno `speech.platform.bing.com` (voz), `query1.finance.yahoo.com` y `query2.finance.yahoo.com` (gráficos), `huggingface.co` (whisper), y Pexels y Pixabay (stock).
- Pendiente: decidir con Lean si se suman videos públicos fuera del programa y Shorts, y si los títulos se ajustan o se usan tal cual el `.docx`.
- Pendiente: credenciales de la API de YouTube para la cuenta de RIC (separadas de las de Atajos IA).
