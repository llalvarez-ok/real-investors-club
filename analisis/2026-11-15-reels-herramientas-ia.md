# Dos Reels de @davidmadrazo.ia: qué nos sirve (15/11/2026)

Pedidos de Lean: revisar el «repo» de https://www.instagram.com/reel/Dfqrc-sGSUV/ y las mejoras posibles de
https://www.instagram.com/reel/Dftr7-lnspE/. Datos con Supadata (transcripción con IA y metadatos).

## 1. «Mi Claude se tragó 3.816 Reels…» (Dfqrc-sGSUV, 43 s, 567 likes, 389 comentarios)
No hay repo público: es un imán de comentarios («Comentá MÁQUINA y te lo enseño por dentro»). El sistema que describe
(buscar Reels que superan 100 veces a su creador → desarmar el mejor → guion con reglas de gancho → voz clonada →
animación y subtítulos → aprobación → publicación sola → «Reel de prueba» si revienta) ya lo tenemos casi entero. Falta:
buscador de Reels que superan a su creador en Instagram (vidIQ sin créditos hasta el 04/12; alternativa: Supadata
`metadata` sobre una lista de cuentas del nicho, 1 consulta por Reel) y publicar solo (la API de Instagram no deja).

## 2. «9 apps de pago con alternativa gratis en GitHub» (Dftr7-lnspE, 54 s)
Formato: lista con número + «Comentá GITHUB y te paso los 9 enlaces por privado» + descuento en su curso.
Qué nos sirve de la lista:
| App de pago → gratis | ¿Para RIC? |
|---|---|
| ElevenLabs → VoiceStudio | No: ya evaluado (motor por defecto CC-BY-NC). Seguimos con Qwen3-TTS. |
| Higgsfield → Open Generative AI | Poco: la interfaz es MIT, pero genera a través de una API paga (Muapi). Para B-roll sigue ViMax con OK de Lean. |
| Intercom → Chatwoot | Quizás: bandeja única para mensajes de Instagram y web, en servidor propio. Alternativa a ManyChat si algún día se automatizan respuestas (hoy descartado). |
| Loom → Cap | Sí para Lean: grabar pantalla (TradingView) y cámara para tutoriales cortos, por ejemplo el del mapa de liquidaciones. |
| Calendly → Cal.diy | Solo si se venden mentorías o llamadas del club. |
| Wispr Flow → OpenWhispr | Opcional: dictar guiones o respuestas. |
| Semrush → OpenSEO, Notion → AppFlowy, Asana → OpenProject | No (tenemos repo, Central y Mesa). |

## Ideas de contenido que salen de los dos
1. **«Herramientas de trading pagas con alternativa gratis»** (mismo formato de lista con número, que en el nicho
   funciona): mapa de liquidaciones (CoinGlass gratis), calendario económico, diario de operaciones, gráficos, etc.
   Cada una verificada como gratis antes de nombrarla, y sin brókers. Encaja con la pregunta del Reel de 62.000.
2. **Detrás de escena: «Así armo mis Reels con un equipo de agentes»**, con Lean a cámara: el formato que más
   comentarios trajo en los dos Reels (389 en el primero).
3. Lo que no copiamos: el pedido de palabra para mandar enlaces por privado (sin ManyChat no se puede cumplir a escala).

## 3. «Comentá efectos» (@infomindshft.ai, DfndlIByap0, 27 s, 994 likes, 538 comentarios)
Un comando que pone efectos sobre el video de alguien hablando a cámara: paneles de cristal, miniaturas en órbita
alrededor de la cabeza, checklist que se tilda mientras habla, foco (fondo oscuro) y título gigante detrás.
**Incorporado:** herramienta propia `herramientas/efectos/` (RobustVideoMatting + whisper + motor HTML) y skill
`ric-efectos`. Falta un video real de Lean a cámara para probarla.

## 4. «Tu Claude edita en 4K y suena en 144p» (@somosvla_, DfX9QOyDnUK, 106 s, 3.038 likes)
Crítica que nos toca: un whoosh en cada corte, un golpe en cada palabra y el mismo sonido 40 veces («ametralladora»),
puesto «a ciegas». Es lo que hace hoy `herramientas/cine/mezcla.py` (whoosh antes de cada bloque, golpe en cada sello).
Tres herramientas gratis:
- **Openverse** (api.openverse.org): más de 5 millones de audios con licencia y crédito. Bloqueado en la red de la nube:
  habría que habilitar el dominio en el entorno RIC.
- **Real SFX** (skill `Clipwing/skills`): pone sonidos grabados en el cuadro exacto y baja los efectos cuando se habla.
- **Earshot** (`Leonxlnx/earshot`, MIT, ~4.700 estrellas, CPU): «oídos» para Claude. `critique` califica un video
  contra lanzamientos profesionales; `sfx`/`kit` ponen efectos generados por código en los cortes con sincronía medida.
  Instalarlo quedó **pendiente del OK de Lean** (el sistema frena instalar código de repos externos sin permiso).
Mejora propia mientras tanto (sin instalar nada): en `mezcla.py`, variar el sonido de cada evento, no poner whoosh en
todos los cambios de bloque, no repetir el mismo efecto seguido y bajarlos cuando habla la voz.
**Aplicado el 15/11/2026 en `herramientas/cine/mezcla.py`:** subida y whoosh solo en uno de cada dos cambios de bloque,
cada efecto con tono (±2,5 semitonos) y nivel distintos, el mismo efecto no se repite a menos de 1,2 s, y los efectos
bajan 35 % cuando habla la voz. Vale para todos los Reels en estilo expediente cine desde ahora.

## 5. Repo «agency-agents» (github.com/msitarzewski/agency-agents, MIT, 330 agentes)
Colección de agentes con personalidad, proceso y métricas para Claude Code y otras herramientas. Casi todo es de
ingeniería o de mercados ajenos (China, etc.). **Incorporados** en `.claude/agents/` (con la licencia y las reglas de
RIC al principio de cada uno, en voseo): `ric-instagram-curator` (Camila), `ric-youtube-optimizacion` (Julián: empaque,
capítulos y metadatos), `ric-edicion-cortos` (Bruno), `ric-carruseles` (Carla), `ric-vivos` (Elena, adaptado de
«livestream commerce») y `ric-cumplimiento` (Marta: revisa avisos y promesas antes de publicar). Quedan para más
adelante: growth hacker, paid media (si se pauta), sales offer/lead gen (para el club).

## 6. Repo «graphify» (github.com/safishamsi/graphify, Apache-2.0 + MIT)
Comando `/graphify .` que arma un **grafo de conocimiento** de un proyecto (código con tree-sitter, local; documentos,
PDF, imágenes y videos con el modelo del asistente) y deja `graph.html` (navegable), `GRAPH_REPORT.md` (conceptos y
conexiones) y `graph.json` (para consultar sin releer archivos). Promete bajar el gasto de tokens de los agentes.
Para RIC: **poco valor directo** (casi no tenemos código complejo; lo pesado son decisiones y notas en Markdown).
Lo que sí nos señala: `CLAUDE.md` pasó los 60 KB y cada chat y tarea programada lo lee entero. La mejora útil (sin
instalar nada) es partir la sección «Estado» en fichas por tema (`estado/voz.md`, `estado/instagram.md`, …) y dejar en
`CLAUDE.md` un índice corto. Si se quiere probar graphify igual, hace falta el permiso de instalación (`uv tool install
graphifyy`), que hoy frena el clasificador, como pasó con Earshot.

## 7. Reel «5 conectores para Claude» (instagram.com/reel/Dfu9iDcgnuY, transcripto con Supadata `--ia`)
Lista: Perplexity (búsqueda), Firecrawl (leer cualquier web y sacar el kit de marca), PostHog (en qué paso de la web
se van los clientes), Playwright (manejar el navegador) y Composio (un conector para Gmail, Drive, Notion…).
Cierre «seguime y comentá <palabra> que te mando el prompt».
- **Ya lo tenemos:** búsqueda web (WebSearch), Playwright (capturas de CoinGlass), Gmail y Drive como conectores.
  Composio no suma y abre acceso a todas las cuentas de golpe: descartado.
- **Sirve: PostHog** (plan gratis de 1 M de eventos por mes). Hoy no sabemos qué pasa cuando alguien entra a
  realinvestors.club desde YouTube o Instagram (0 toques al link en Instagram, el 75 % de las vistas de YouTube viene
  de la web). Con PostHog se ve de dónde llega cada visita y en qué paso se va. Hace falta pegar un fragmento en la
  web (la web no está en este repo): **pendiente de Lean**.
- **Quizás: Firecrawl** (500 créditos gratis): lee páginas que frenan a los robots (CoinGlass cortó las capturas a las
  pocas cargas). Necesita clave y habilitar `api.firecrawl.dev`. Probar solo si vuelve a hacer falta.
- **Formato:** lista numerada de herramientas con una frase de «para qué te sirve» cada una y palabra para comentar.
  Es la idea ya anotada en la sección 2: «5 herramientas gratis para traders» (CoinGlass, TradingView gratis,
  calendario económico, mapa de calor, diario de trading). Gancho reutilizable: «Los que <logran X> tienen esto…».

## 8. Reel «3 plugins para ahorrar tokens en Claude Code» (instagram.com/reel/DfshJx5B1QV, Supadata `--ia`)
Propone Ponytail, Graphify y OmniRoute; cierre «comentá TOKENS».
- **Ponytail** (github.com/DietrichGebert/ponytail): instrucciones para que el asistente escriba menos código. Promete
  hasta −45 % de tokens; pruebas independientes miden mucho menos (~8 % de tokens de salida en la de JetBrains citada
  por MindStudio). Hay copias con otros dueños: si se instala, solo desde el repo oficial. Para RIC sirve poco: casi
  todo nuestro trabajo es guion, voz, render y API, no código largo. **No se instala.**
- **Graphify:** ya analizado en la sección 6. Lo que sí nos sirve de esa idea: `CLAUDE.md` pesa más de 60 KB y lo lee
  entero cada chat y cada tarea programada. **Propuesta:** partir la sección «Estado» en fichas por tema
  (`estado/youtube.md`, `estado/instagram.md`, `estado/voz.md`, `estado/pilares.md`…) y dejar en `CLAUDE.md` las reglas y
  un índice de una línea por ficha. Es el ahorro de tokens real y no requiere instalar nada. Pendiente del OK de Lean
  (cambia cómo arrancan todos los chats).
- **OmniRoute:** cuando se llega al límite, pasa a otro modelo gratis. **No sirve:** otro modelo no conoce nuestras
  reglas ni la voz, rinde menos, y mandar el repo y las claves a un servicio de terceros es un riesgo.
- **Idea de contenido:** el formato «3 herramientas gratis + comentá una palabra» funciona en el nicho de IA; para
  nosotros es el mismo Reel de «herramientas gratis para traders» ya anotado en la sección 2.
