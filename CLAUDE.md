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
5. Lean sube el video a mano. Después, por la API y con su visto bueno, se ajustan título, descripción, etiquetas y configuración con el criterio de `docs/prompt-maestro.md`, sección 6: título con el problema primero y " · Lección N" al final, "tú" en la descripción, categoría Educación, idioma español y contenido sintético marcado siempre (todas las lecciones usan presentador generado con IA, confirmado por Lean el 27/10/2026).

## Estado
- Publicadas: 0-0-0, 0-0-1, 0-0-2, 0-0-3, 0-1-0 y 0-1-1 (públicas), más la 1-2-0 "Velas japonesas" (no listada, 08/09/2026). La 0-1-1 la subió Lean el 27/10/2026.
- Auditoría del canal: `analisis/2026-10-27-auditoria-canal.md` (se repite con `python herramientas/auditar_canal.py`). El 75 % de las vistas viene de la web, WhatsApp y suscriptores; la página principal de YouTube no trae ninguna. Arreglos aplicados el 27/10/2026 por la API (antes y después en `youtube/cambios-2026-10-27.json`): categoría Educación, idioma, etiquetas, títulos con el problema primero y "· Lección N" al final, descripciones con "tú" y enlaces, contenido sintético en las 7 lecciones y los 5 Shorts, descripción, palabras clave, país y tráiler del canal, y playlist renombrada. Los títulos publicados ya no son los del `.docx`; Lean aprobó el criterio nuevo para las próximas. Faltan: los comentarios fijados (el entorno bloqueó publicarlos), la sección del canal, la playlist del Nivel 1 y confirmar en Studio el contenido sintético (la API no lo devuelve al leer).
- 0-1-1: versión con el avatar de HeyGen de Lean (5:00) entregada y publicada el 27/10/2026 (en YouTube dura 5:01; no se verificó que sea exactamente la entregada). Clips en Drive, RIC/videos (01, 03 a 13, verticales 1080x1920); la escena 02 va con voz de edge-tts es-US-AlonsoNeural porque no hubo créditos. Montaje: `python herramientas/montar_avatar.py produccion/0-1-1/spec.json produccion/0-1-1/avatar.json <dir clips> <dir de trabajo>`; `avatar.json` define por escena pip (avatar en la esquina), dividida (avatar a la izquierda y lámina achicada) o lamina, más cortes y correcciones de subtítulos. Se cortó en la 13 un agregado en voseo; en la 07 y la 09 quedaron agregados de Lean que no están en el guion. La versión anterior, solo con voz de edge-tts (5:39), se descartó por robótica.
- Shorts de la 0-1-1: 5 hechos el 27/10/2026 (`herramientas/crear_shorts.py`, `produccion/0-1-1/shorts.json`). Lean los publicó y programó (2 públicos; los otros salen el 28, 29 y 30/10 a las 18:00 de Argentina); el formato le gustó tal cual.
- 0-1-2: guion (`produccion/0-1-2/spec.json`, 818 palabras) y guion para HeyGen (`heygen.txt`, de `herramientas/guion_heygen.py`) hechos el 27/10/2026. Falta que Lean apruebe el guion y genere los clips.
- Estrategia: `analisis/2026-10-27-estudio-crecimiento.md` (pilares fuera del programa, plan de 8 semanas). Avatar gratis: `analisis/2026-10-27-avatar-gratis.md` (voz clonada en CPU sí; lip-sync solo con GPU externa). La voz clonada con Chatterbox quedó descartada: tiene el timbre de Lean, pero acento latino neutro o mexicano, no rioplatense.
- Láminas: la esquina inferior derecha no queda libre en todas (la tabla, el resumen y el ejemplo llegan al borde); por eso el avatar va en la esquina solo donde hay apenas un ícono.
- Pipeline: los subtítulos y las marcas de la animación salen de los tiempos por palabra de edge-tts (WordBoundary, `audio/NN.json`); la animación se sincroniza con `animacion.marcas_voz` en el spec. Se recorta el ~1 s de silencio que edge-tts deja al final de cada audio (aire de 0,2 s, ~0,45 s entre escenas). El zoom de los gráficos se encuadra para no cortar el título ni la lectura.
- Programa: 215 lecciones (Nivel 0: 21, incluido el módulo de la CNV agregado en septiembre de 2026). El `.docx` de títulos es anterior y cubre 170: faltan fichas para 45 lecciones, entre ellas 0-5-0 a 0-5-2.
- En `curriculum-data.js` el módulo de la CNV está antes de "Tu primer contacto con el mercado", pero en `nivel-0.js` tiene el ID 0-5-x. Confirmar con Lean el orden de publicación.
- Red de la nube: funcionan voz (`speech.platform.bing.com`, con el CA del proxy vía `SSL_CERT_FILE`), Yahoo Finance, whisper (hacen falta `huggingface.co`, `us.aws.cdn.hf.co` y `cas-server.xethub.hf.co`, y `HF_HUB_DISABLE_XET=1`) y descargas de Drive con link público (`drive.google.com`, `drive.usercontent.google.com`). El conector de Drive solo baja archivos de hasta 10 MB. Pexels y Pixabay sin probar.
- Contenido público fuera del programa (pedido de Lean del 27/10/2026, para sumar suscriptores y monetizar): plan en `analisis/2026-10-27-plan-contenido-publico.md`. Videos pilar de 8 a 12 minutos, con el formato de la sección 6 del plan (sin bloques de clase), en `produccion/pNN-<tema>/` y con `"archivo": "RIC-PNN-<tema>"` en el spec. Estilo de los pilar (pedido de Lean del 28/10/2026, referencia Aprendiz Financiero): animación ilustrada sobre papel crema, una metáfora central, narración en off sin avatar; guía en `diseno/ESTILO-PILAR.md` y escena de prueba `herramientas/animaciones/ponzi.html` (esquema Ponzi, 28,6 s, voz provisoria de edge-tts), pendiente de que Lean la apruebe. P01 "Cómo saber si una inversión es una estafa: 7 señales": hay un guion (`spec.json`, 1.318 palabras) en el formato de láminas, que hay que rehacer con el estilo nuevo (metáfora propuesta: la gallina de los huevos de oro). Pendiente de Lean: si el resto del Nivel 0 sale público o no listado, y cuántos minutos de HeyGen hay por mes.
- API de YouTube: hay credenciales de la cuenta de RIC en el entorno (`RIC_YT_CLIENT_ID`, `RIC_YT_CLIENT_SECRET`, `RIC_YT_REFRESH_TOKEN`), con permiso de escritura (`youtube.force-ssl`) y de lectura de Analytics. Cambiar algo en el canal requiere el visto bueno de Lean. `i.ytimg.com` y `www.youtube.com` están bloqueados en la nube: no se ven miniaturas ni páginas.
