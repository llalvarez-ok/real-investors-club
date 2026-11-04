# Estilo «expediente cine» (Reels y Shorts de noticias)

Pedido de Lean del 01/11/2026: reemplaza por completo al «expediente» liso (`herramientas/expediente/`) y lo fusiona con
las partículas doradas del Short de Binance (`herramientas/particulas/`), con todo **más realista**. Primer video:
`produccion/reel-corea/` («¿Por qué Corea del Norte robó Binance?»).

## Qué tiene
- **Fotos reales** (Wikimedia Commons, con autor y licencia en pantalla) a pantalla completa, con cámara: zoom y paneo lentos,
  gradación (`noche`, `frio`, `rojo`, `oro`, `doc`), desenfoque de profundidad cuando el texto tiene que leerse y degradé
  arriba y abajo.
- **Partículas doradas** (4.200, con brillo) que toman forma con la voz: texto y cifras, mira, misil, signo de pregunta, ₿,
  anillo de porcentaje, barras, candado cerrado o abierto y cursor. Una foto puede **deshacerse en partículas**
  (`forma: 'foto'`, `inst: true`): se toman solo las luces de la imagen, con sus colores, y después vuelan a la forma siguiente.
- **Expediente** en DOM: polaroids y recortes de diario que caen en 3D, sellos con golpe, etiquetas, contadores, marcador rojo,
  bandera, barra del navegador con cursor y la tarjeta de cierre (Instagram con los números reales de la cuenta o YouTube).
- **Acabado de cine:** grano de película, viñeta, polvo dorado en el aire, fuga de luz cálida, destellos en los cortes,
  zoom de entrada con desenfoque en cada bloque y temblor de cámara en los impactos.
- **Subtítulos palabra por palabra**: la palabra que suena se enciende y las claves van en dorado; los números se escriben en
  cifras (`pantalla` del guion).
- **Voz:** `es-AR-TomasNeural` (edge-tts, masculina argentina). Reemplaza a Daniela (Piper), que pronunciaba mal muchas
  palabras (ver abajo).

## Nitidez (pedido de Lean del 01/11/2026: «el video se ve borroso»)
- Nada de desenfoque para que el texto se lea: se oscurece la foto (`oscuro: [a, b]` en el plano).
- Sin desenfoque de entrada en los cortes (solo el golpe de zoom). Grano fino a resolución completa, `soft-light` al 10 %.
- Fotos de al menos 2.500-3.000 px de ancho (miniatura de 3840 px o el original de Wikimedia) y zoom de cámara de hasta 1,2.
  Una foto chica (por ejemplo, 960 px) va en un recuadro de vigilancia (`caja` + `marco`), nunca ampliada a pantalla completa.
- Codificar a CRF 19 con tope de 12 Mbps (sale ~110 MB por 70 s); con menos bitrate el grano se empasta.

## Reglas de Lean (02/11/2026, después del Reel «Dos traders»)
1. **Calidad máxima siempre.** Fotos en su resolución original (3.000 px o más; nunca miniaturas de 1.280), cuadros con
   `CALIDAD=100 node herramientas/cine/render.js …`, grano suave (`grano: .05` en `ESC`) y codificación CRF 16 con tope de
   20 Mbps. Instagram y YouTube recomprimen: lo que sale de acá tiene que ser lo mejor posible.
2. **No meter promociones que no se pidieron.** Un Reel de contenido no promociona el curso ni otra cosa: eso va en piezas aparte.
3. **Cierres con las tarjetas reales.** Instagram: foto real de Lean (`herramientas/particulas/avatar.png`) y los números del
   día sacados de la API (seguidores, publicaciones, seguidos), con «Seguí esta cuenta». YouTube: el logo oficial del canal
   (`marca/logo-navy.png`), «Real Investors Club», @REALinvestorsc y el botón de suscripción.
4. **Bancos de imágenes y video que prefiere Lean:** Pexels (fotos y videos 4K, también verticales), Pixabay, Mixkit y Coverr
   (licencias de uso comercial sin atribución obligatoria). Al 02/11/2026 están bloqueados en la red de la nube: hacen falta
   los dominios habilitados y las claves de API de Pexels (`RIC_PEXELS_KEY`) y Pixabay (`RIC_PIXABAY_KEY`). Mientras tanto, Wikimedia.

## Pasos
1. Guion en `produccion/<id>/guion.json`: `voz` ({voice, rate}), `pantalla` (palabras de la voz → texto en pantalla) y
   `bloques` (id `NN-nombre`, `etiqueta`, `voz`, `pausa`, `solo: ig|yt`).
2. Voz y tiempos por palabra (WordBoundary, exactos; no hace falta whisper):
   `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python herramientas/cine/voz.py produccion/<id>/guion.json <trabajo> ig` (y `yt`).
   Copiar `<trabajo>/tiempos-*.js*` a `produccion/<id>/`.
3. **Escuchar con whisper** antes de renderizar (lo que dice contra el guion). Si una palabra sale mal, cambiar la frase,
   no solo la ortografía.
4. Escena `produccion/<id>/escena.html?v=ig|yt`: `window.ESC` con `fotos`, `planos` (fotos con cámara) y `particulas`
   (formas), y elementos con `data-b` (bloque), `data-w` (palabra) u `data-o` (segundos), `data-e` (efecto: sube, pop, golpe,
   sello, foto, tres, izq, der, escribe, cuenta, barra, tacha, aparece, glitch), `data-s` (sonido) y `data-hb`/`data-hw`
   (hasta cuándo). `data-o="ya"` = visible desde el cuadro 0 (el gancho).
5. Cuadros sueltos para revisar: `node herramientas/cine/render.js "<escena>?v=ig" <prefijo> foto 0 5 12,5`.
6. Render: `node herramientas/cine/render.js "<escena>?v=ig" <dir> <duración> 5` (~4 min para 57 s con 4 núcleos).
   La versión de YouTube cambia solo el cierre: se renderiza desde el inicio del bloque 09 y se reusan los cuadros de Instagram.
7. Audio: `python herramientas/cine/mezcla.py <tiempos.json> <trabajo>/voz <dir>/eventos.json audio.wav` (cama de suspenso
   con latido, subida antes de cada bloque, golpes con reverberación y ducking).
   Con música real en lugar de la cama sintetizada: `MUSICA=<mp3> MUSICA_DESDE=<seg> MUSICA_DB=20 python herramientas/cine/mezcla.py …`
   (queda 20 dB por debajo de la voz mientras se habla y sube 6 dB en las pausas; los efectos bajan un poco).
8. ffmpeg: cuadros a 30 fps + audio, H.264 CRF 17, AAC 192k, `loudnorm=I=-14:TP=-1.5:LRA=9`.

Necesita las fuentes Inter (Inter Display Black) en `/usr/share/fonts/opentype/inter/` (de las releases de rsms/inter en
GitHub, `Inter-4.1.zip`, carpeta `extras/otf`), JetBrains Mono y Liberation Serif (ya vienen en la imagen de la nube).

## Con la voz de Lean (grabada)
Lean graba el texto de corrido (un bloque tras otro, con una pausa entre bloques) y lo manda por el chat o por Drive.
`HF_HUB_DISABLE_XET=1 SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python herramientas/cine/voz_grabada.py produccion/<id>/guion.json <audio> <trabajo> produccion/<id>/correcciones-lean.json`
- Sonido de estudio, estilo stream: reducción de ruido, graves, compuerta suave, ecualización (cuerpo, menos «caja»,
  presencia y aire), de-esser, compresión, reverb de sala corta y oscura (11 %) y limitador.
- Whisper alinea lo que dijo con el guion: si cambió palabras, el video no se toca; los subtítulos muestran lo que dice.
  Los silencios de más de 0,34 s quedan en 0,22 s (sin acelerar la voz).
- `correcciones-lean.json` arregla lo que whisper escribe mal en los subtítulos («quédate» → «quedate», «puede» → «podés»).
- Escribe `tiempos-ig/yt` con `"voz_grabada": true`: la mezcla no le suma otra reverb y el pie no dice «voz generada con IA».
  La versión con voz sintética se guarda como `tiempos-tomas-*` y se ve con `escena.html?voz=tomas`.

## Fotos
Los bancos de imágenes libres están bloqueados en la nube, pero `upload.wikimedia.org` funciona: con el nombre exacto del
archivo (buscado con WebSearch en `commons.wikimedia.org`) la ruta es `thumb/<md5[0]>/<md5[0:2]>/<archivo>/1280px-<archivo>`,
con un User-Agent propio y pausas de 20 s entre descargas (si no, responde 429). Verificar la licencia de cada foto y ponerla
en pantalla (autor y licencia). Una imagen que no es del hecho (por ejemplo un misil de EE. UU.) va como «imagen ilustrativa».

## Voz: por qué Tomás y no Daniela (01/11/2026)
Con whisper, Daniela (Piper es_AR) decía «LFB» por «FBI», «rellos» por «ellos», «aiciada» por «aislada», «naciones humillas»,
«misillas», «ogan» por «robaban», «finance» por «Báinans», «Seguir» por «Seguí» y «entene» por «entendé». Tomás leyó todo bien;
solo «Báinans» después de una pausa sonaba «by Inance», y se arregló cambiando la frase («a Báinans le robaron…»).
Escribir «Báinans» para Binance y «jaquean» para hackean; FBI, Naciones Unidas y Drift se leen bien escritos normal.

## Zonas seguras (04/11/2026, captura de Lean en su iPhone)
En celulares altos (19,5:9) la app llena la pantalla a lo alto y **recorta unos 100 px de cada costado** del video de 1080x1920,
y además tapa: arriba la barra de estado, la flecha y la lupa (0 a ~250 px), abajo el nombre del canal, el título y la música
(desde ~1450 px) y a la derecha la columna de botones (me gusta, comentarios, compartir: x > 870 entre y 1000 y 1720).
Regla: **todo texto, cifra, sello o etiqueta va entre x 140 y 870 (o 940 por encima de y 1000) y entre y 250 y 1440**.
El fondo (fotos, partículas) puede llenar todo el cuadro. Ejemplo aplicado: `produccion/reel-elecciones/escena.html`.
Look `limpio` en `motor.js` para gráficos de datos (sin gradación, verde y rojo tal cual).
