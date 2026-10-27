# Auditoría del canal: 27/10/2026

Fuente: API de YouTube (Data v3 y Analytics v2) con la cuenta de RIC, solo lectura. Las métricas de Analytics llegan con 2 o 3 días de atraso: lo subido el 27/10 todavía no figura. No pude ver las miniaturas (`i.ytimg.com` está bloqueado en la nube) ni los ajustes que la API no expone (pantallas finales, video relacionado de los Shorts, CTR e impresiones). Se repite con `python herramientas/auditar_canal.py`.

## Resumen

1. **YouTube todavía no recomienda el canal.** El 75 % de las vistas las trae Lean (la web, WhatsApp y los suscriptores). Búsqueda da 4 %, videos sugeridos 2 % y la página principal 0 %.
2. **Todos los videos están en la categoría "Música"** (ID 10). Tiene que ser "Educación" (27). Es el error de configuración más grave porque le dice al algoritmo a quién mostrarlos.
3. **La lección 6 se publicó con el avatar de Lean sin declarar contenido sintético.** En finanzas YouTube lo exige, y un avatar sin declarar se parece a las estafas que denuncia la CNV.
4. Ningún video tiene etiquetas ni subtítulos propios, el canal no tiene idioma, país ni palabras clave, y la descripción del canal y las de los videos están en voseo.
5. La retención es aceptable para el tamaño del canal; lo flojo son los primeros 30 segundos de las lecciones 1, 2 y 5.

## Números (desde el 19/04/2026)

- 22 suscriptores (26 ganados, 4 perdidos), 415 vistas y 15,8 h de reproducción.
- Para el nivel inicial del YPP faltan 478 suscriptores y ~2.984 h; para anuncios, 978 suscriptores y ~3.984 h (desde el 01/02/2027, ~7.984 h).
- El 87 % de las vistas es de gente no suscripta. El 59 % es desde el celular. Argentina es el único país con datos (96 vistas); el resto queda bajo el umbral de privacidad.
- Vistas por semana: pico de 190 la semana de la lección 5 (14/09), después cae a 6 en la del 12/10 y sube a 31 en la del 19/10. Cada pico coincide con una publicación difundida por Lean.

### Videos

| Video | Estado | Duración | Vistas | % visto | Retención a 30 s | Subs |
|---|---|---|---|---|---|---|
| L1 Qué es (y qué NO es) el trading | Pública | 3:56 | 69 | 46 % | 66 % | 4 |
| L2 Por qué el 90 % pierde | Pública | 6:22 | 84 | 53 % | 70 % | 5 |
| L3 Trading vs Inversión | Pública | 5:35 | 38 | 68 % | 75 % | 0 |
| L4 El mapa completo | Pública | 5:13 | 46 | 68 % | 79 % | 0 |
| L5 Las creencias sobre el dinero | Pública | 6:08 | 147 | 54 % | 64 % | 2 |
| L6 Expectativas realistas (0-1-1, avatar) | Pública, 27/10 | 5:01 | 10 | sin datos | sin datos | sin datos |
| N1 L10 Velas japonesas | No listada, 08/09 | 7:53 | 12 | 81 % | 83 % | 0 |
| Short: 10 % semanal | Público, 27/10 | 0:31 | 44 | sin datos | | |
| Short: vivir del trading con 1.000 USD | Público, 27/10 | 0:30 | 6 | sin datos | | |
| Short: 3 señales de humo | Programado 28/10 18:00 (AR) | 0:22 | | | | |
| Short: el error que hace abandonar | Programado 29/10 18:00 (AR) | 0:24 | | | | |
| Short: cuánto rinde de verdad invertir | Programado 30/10 18:00 (AR) | 0:43 | | | | |

- La retención a 30 s pasa la meta de 60 % en todas, pero la "retención relativa" de YouTube (frente a videos de duración parecida) está por debajo de la media en L1, L2 y L5 (0,38 a 0,51). Las que más vistas tienen son las que peor retienen: les llega gente de afuera que no sabe qué va a ver. Con 40 a 150 vistas por video, es una señal, no una conclusión.
- L1 pierde la mitad del público antes de la mitad del video y es la más corta: es la puerta del curso y la que peor funciona.
- 0 comentarios en todo el canal. Cada una de las 5 primeras lecciones tiene exactamente 1 "no me gusta"; sin importancia con estas cifras.

### De dónde vienen las vistas

| Fuente | Vistas | % |
|---|---|---|
| Enlaces externos (realinvestors.club 112, WhatsApp 28, Instagram 1) | 181 | 44 % |
| Feed de suscripciones | 129 | 31 % |
| Página del canal | 41 | 10 % |
| Directas o sin enlace | 27 | 7 % |
| Búsqueda de YouTube | 16 | 4 % |
| Playlists | 11 | 3 % |
| Videos sugeridos | 7 | 2 % |
| Página principal (browse) | 0 | 0 % |

La única búsqueda con datos es "aprender trading desde cero" (1 vista). La web de RIC es el motor del canal: conviene medir también el camino inverso (YouTube → web).

## Configuración

| Qué | Estado | Qué hacer |
|---|---|---|
| Categoría de los 11 videos | Música (10) | Educación (27) |
| Contenido sintético en L6 y sus Shorts | Sin declarar | Marcarlo |
| Idioma del video | Falta el idioma del audio en L1 a L5 y N1-L10, y todo en los 3 Shorts programados | Español en título y audio |
| Etiquetas | 0 en todos | Las de `youtube/metadatos.json`; los Shorts, unas 5 propias |
| Subtítulos | Solo los automáticos | Subir el `.srt` de cada video (los de L6 salen de los tiempos por palabra del pipeline) |
| Idioma, país y palabras clave del canal | Sin configurar | Español, Argentina y palabras clave del nicho |
| Secciones de la página del canal y tráiler | Sin configurar | Tráiler para no suscriptos (L2 o L6) y secciones por playlist |
| Playlists | Una: "Nivel 0 - Metodo F.O.C.U.S." (6 videos, sin descripción, "Metodo" sin tilde) | Descripción, tilde y las playlists de pilares del estudio de crecimiento |
| Shorts | Fuera de toda playlist; la descripción dice "Lección completa en el canal" sin enlace | Enlace directo a L6 en la descripción y, en YouTube Studio, el video relacionado |
| Pantallas finales y video relacionado | No visibles por la API | Revisar a mano en YouTube Studio |
| Miniaturas | No pude verlas | Revisar a mano o pasarlas por Drive |

## Textos

- **Descripción del canal:** en voseo ("Aprendé", "Suscribite"), promete "operativas en vivo" y "nuevo contenido cada semana", y apunta a "Stocks, Forex y Crypto", que hoy no es lo que el canal publica. Hay una propuesta en `analisis/2026-10-27-estudio-crecimiento.md`, sección 5.
- **Descripciones de las lecciones:** el resumen va con "tú", pero la llamada a la acción va en voseo ("Inscribite gratis, hacé el examen y desbloqueá tu certificado"). Dicen "Lección N de 18" y el Nivel 0 ahora tiene 21. Mencionan examen y certificado: la regla lo prohíbe dentro de las lecciones, no en la descripción, pero conviene que Lean lo confirme.
- **Títulos:** siguen el formato del `.docx` ("… | Nivel 0 · Lección N | RIC"), y la marca alterna entre "RIC" y "Real Investors Club". Los Shorts sí usan títulos de problema y funcionan mejor (el de 10 % semanal sumó 44 vistas en horas). La propuesta de retitular sigue pendiente de Lean.
- La lección 6 se subió el mismo día en que se entregó; no verifiqué si es exactamente la versión entregada (la que tiene en la 07 y la 09 agregados de Lean fuera del guion). Dura 5:01 contra 5:00 de la entrega.

## Prioridades

**Hoy (cada punto se puede aplicar por la API si Lean lo aprueba):**
1. Declarar contenido sintético en L6 y en los 5 Shorts.
2. Pasar los 11 videos a la categoría Educación.
3. Idioma español (título y audio) en todos y en los Shorts programados antes de que salgan.
4. Etiquetas de `metadatos.json` en las 6 lecciones del Nivel 0 y en la del Nivel 1.
5. Enlace a L6 en la descripción de los 5 Shorts.

**Esta semana:**
6. Descripción del canal con "tú", sin promesas que no se cumplen, y la aclaración de que Realy es el avatar digital de Lean.
7. Corregir en las descripciones el voseo y el "de 18", y decidir qué hacer con examen y certificado.
8. Subtítulos propios en L6; en las anteriores, revisar los automáticos.
9. Comentario fijado con una pregunta en cada lección.
10. Tráiler del canal, secciones y descripción de la playlist.

**Para decidir con Lean:**
- Retitular las 5 lecciones publicadas (propuesta en el estudio de crecimiento).
- Rehacer el arranque de L1: es la puerta del curso y retiene peor que el resto.
- Ritmo: el canal crece solo cuando Lean empuja un video. Hace falta cadencia fija (1 lección o pilar y 4 Shorts por semana) para que YouTube empiece a recomendar.

## Qué no se verificó

- CTR, impresiones y origen por miniatura (la API de Analytics no los da; se ven en YouTube Studio).
- Las miniaturas, las pantallas finales, las tarjetas y el video relacionado de los Shorts.
- El contenido del video de L6 que está subido.
- Las vistas de abril a junio (20 vistas y 2 suscriptores): no hay videos de esa época en el canal; puede que se hayan borrado.
