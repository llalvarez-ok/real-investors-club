# El equipo de agentes de RIC: quién falta y qué tareas programar (02/11/2026)

Pedido de Lean: ver qué «empleados» faltan (alguien que audite, un editor de video…) y con qué tareas programadas.

## Cómo estamos
Hoy todo lo hace un solo chat por canal (YouTube e Instagram). Los roles existen, pero mezclados: el mismo chat escribe,
edita, publica y se revisa a sí mismo. Lo que se ve en las últimas semanas:
- **Nadie revisa con otros ojos.** Los errores los encontró Lean: voz que decía mal palabras, calidad baja en Dos traders,
  promoción no pedida, títulos por defecto, un Short programado el día equivocado, una transmisión vacía pública.
- **Nada corre solo.** Los números, los comentarios y el calendario se miran solo cuando Lean pregunta.
- **Hay 11 decisiones pendientes** desperdigadas en CLAUDE.md.

## El equipo propuesto (10)
| Personaje | Rol | Qué hace | Hoy |
|---|---|---|---|
| Elena | Coordinadora de producción | prioridades, calendario sin choques, mantiene la Central y CLAUDE.md al día | **falta** |
| Julián | Productor de YouTube | publica, carga datos por la API, playlists, programación | existe |
| Camila | Productora de Instagram | Reels, textos, ManyChat, números de IG | existe (bloqueada por Meta) |
| Diego | Guionista y pizarra | guiones (ric-guion), pilares en pizarra | existe |
| Bruno | Editor de video | montaje, render, Shorts y Reels, reedición de clases y de los vivos, voz de Lean | **falta como rol** (lo hacía el productor) |
| Carla | Diseñadora | miniaturas, portadas, empaque (ric-empaque), tarjetas | **falta** |
| Ana | Analista | métricas diarias, retención (ric-retencion), qué funciona | existe |
| Pablo | Investigador de tendencias | nicho (ric-nicho), noticias verificadas en medios, ideas probadas en inglés | **falta** |
| Lucía | Community manager | comentarios de YouTube e Instagram, borradores de respuestas, comentarios fijados | **falta** |
| Marta | Auditora de calidad | revisa todo antes de que salga y lo publicado cada día | **falta** |

**Faltan 6** (Elena, Bruno, Carla, Pablo, Lucía, Marta). Los tres más urgentes: **Marta** (calidad), **Lucía** (los
comentarios responden al algoritmo y nadie los mira a diario) y **Elena** (que la Central y el calendario no dependan de que
Lean pregunte).

## Qué revisa Marta (la auditora)
Antes de entregar y cada noche sobre lo publicado:
1. Reglas editoriales: «tú» en lecciones y pilares, nada de voseo donde no va, coma decimal, sin promesas ni brókers.
2. Datos: gráficos con datos reales (yfinance) y ejemplos marcados como ejemplo.
3. Avisos: aviso legal, contenido sintético marcado cuando hay voz de IA, créditos de fotos (licencias CC).
4. Técnica: duración, volumen (−16 LUFS), huecos, textos tapados, resolución y bitrate (la regla de calidad de Lean).
5. Publicación: título, categoría, idioma, playlist, horario sin choques, comentarios habilitados.
6. Repo: CLAUDE.md y fichas al día, nada de MP4, tokens ni datos personales en git (el repo es público).
Deja un informe en `analisis/auditoria/AAAA-MM-DD.md` y suma lo que encuentre a «Decisiones de Lean» en la Central.

## Tareas programadas propuestas
Cada una abre una sesión nueva en este entorno a la hora indicada (hora de Argentina). Ninguna publica, responde ni
cambia nada en los canales sin el OK de Lean: preparan, revisan y dejan todo listo en la Central.
| Quién | Tarea | Cuándo |
|---|---|---|
| Elena | Parte del día: lee CLAUDE.md, actualiza la Central (agentes, calendario, decisiones), avisa choques de horario | todos los días 08:40 |
| Ana | Números del día con `herramientas/central_ric.py` y `revisar_canal.py`; retención de los videos con más de 100 vistas los lunes | todos los días 09:10 |
| Lucía | Lee los comentarios nuevos, redacta respuestas y las deja para aprobar | todos los días 10:20 y 19:40 |
| Marta | Auditoría de lo publicado y lo entregado en el día | todos los días 23:10 |
| Pablo | Informe del nicho y noticias de la semana (máx. 10 consultas de Supadata), 3 temas propuestos | lunes 16:20 |
| Camila | Recordatorio de la descarga de seguidores y `revisar_instagram.py` cuando vuelva la API | domingos 20:10 |
Bruno, Carla, Diego y Julián trabajan a pedido (necesitan material o aprobación de Lean), así que no llevan tarea fija.

**Costo:** cada tarea programada consume uso de Claude cada vez que corre (unas 6 a 8 sesiones por día con todas).
Conviene arrancar con 3 (Ana, Lucía y Marta) y sumar las otras si suman valor.
