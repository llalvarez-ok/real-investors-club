# Revisión del canal: 01/11/2026

Datos de la API de YouTube (`herramientas/revisar_canal.py`, guarda todo en un JSON). Analytics tarda 2 o 3 días:
los videos del 30 y 31/10 todavía figuran con 0 en Analytics, aunque el contador público ya tiene vistas.

## El canal hoy
- **54 suscriptores**, 2.408 vistas en total y 14 videos públicos (26 contando no listados y programados).
- Desde abril (Analytics): 1.455 vistas, 1.154 minutos vistos (19 horas), +53 / −6 suscriptores.
- Monetización: hacen falta 1.000 suscriptores y 4.000 horas en 12 meses (o 10 millones de vistas de Shorts en 90 días). Estamos muy lejos: el foco sigue siendo suscriptores.

## De dónde vienen las vistas (octubre)
| Fuente | Vistas | Minutos |
|---|---|---|
| Shorts | 879 | 80 |
| Links externos (web, WhatsApp) | 68 | 266 |
| Suscriptores | 47 | 45 |
| Búsqueda de YouTube | 31 | 13 |
| Página del canal | 24 | 19 |

- Los **Shorts traen casi todas las vistas**, pero casi nada de tiempo de visualización.
- Los **links externos traen poco volumen, pero la mayor parte del tiempo de visualización**.
- La página principal de YouTube sigue sin traer vistas.

## Rendimiento por video
| Video | Tipo | Vistas | Retención media |
|---|---|---|---|
| Le robaron US$ 6.300 M a Binance… | Short (31/10) | **664** (contador público) | sin datos aún |
| 3 señales de que una inversión es humo | Short | 314 | 68 % |
| ¿Se puede vivir del trading con 1.000 dólares? | Short | 293 | 81 % |
| ¿Cuánto rinde de verdad invertir? | Short (30/10) | 291 (contador) | sin datos aún |
| ¿10 % semanal garantizado? | Short | 256 | 208 % (se repite en bucle) |
| Las creencias sobre el dinero que heredaste · Lección 5 | Lección | 147 | 54 % |
| El error que hace abandonar… | Short | 98 | 71 % |
| Por qué la mayoría pierde · Lección 2 | Lección | 84 | 53 % |
| Qué es el trading y qué no · Lección 1 | Lección | 69 | 46 % |
| ¿Cuánto se puede ganar con trading? · Lección 6 | Lección | 50 | **39 %** |
| Cómo aprender trading desde cero · Lección 4 | Lección | 47 | 68 % |
| Trading o inversión · Lección 3 | Lección | 38 | 68 % |
| Por qué vendes justo cuando baja (P09) | Pilar | 21 en Analytics (38 en el contador) | **35 %** |
| Velas japonesas · Nivel 1 | Lección no listada | 12 | 81 % |
| 31 de octubre de 2026 (perfil de volumen) | Short (31/10) | **9** | sin datos aún |

**Lectura**
- Lo que más funciona son los **Shorts con un número o una noticia fuerte**: Binance, 10 %, 1.000 dólares, 3 señales.
- Los videos largos más nuevos (P09 y la Lección 6) retienen poco, entre 35 y 39 %. Hay que revisar sus primeros 30 segundos con `ric-retencion` cuando tengan más vistas. Con menos de 100 vistas, la curva todavía es ruido.

## Errores en lo cargado
1. **El Short de perfil de volumen (MFnMqDKPk-w) se publicó con el título «31 de octubre de 2026»**, el nombre por defecto. Por eso tiene 9 vistas. La descripción y las etiquetas están bien. El título correcto, según el reporte: «Perfil de volumen: lo que las velas NO te muestran 📊 POC y área de valor #shorts».
2. **Los Shorts de Binance y de perfil de volumen no avisan que la voz es sintética** en la descripción. Los Shorts del avatar sí lo hacen. Además, la API no deja confirmar si se marcó «contenido alterado o sintético»: hay que revisarlo en Studio.
3. **Las lecciones 1 a 6 no tienen el aviso «Contenido educativo. No constituye recomendación de inversión.»** en la descripción (está solo en el video). Los Shorts y los pilar sí lo tienen.
4. **Hay dos estrenos a la misma hora:** el pilar P10 y el Short de P09 «Por qué vendes lo que gana…» salen los dos el 04/11 a las 19:00. Conviene mover el Short al 04/11 a las 13:00 o al día siguiente.
5. **La lección no listada «Velas japonesas» (Nivel 1)** no está en ninguna playlist y conserva el título viejo («| Nivel 1 · Lección 10 | Real Investors Club»).
6. **Ningún Short está en una playlist.** Una playlist «Noticias y conceptos en 1 minuto» para Binance, perfil de volumen y los que sigan ayudaría a que se encadenen.
7. **Mezcla de «tú» y voseo:** los Shorts de Binance y de perfil de volumen van en voseo en la voz y en la descripción; todo el resto del canal va con «tú». Hay que decidir una regla (ver CLAUDE.md, decisiones pendientes).
8. Los Shorts programados figuran con los comentarios desactivados. Puede ser solo porque todavía son privados. Hay que revisarlo cuando se publique el primero (hoy a las 19:00).

Lo que está bien: categoría Educación en todos, idioma español, ninguno marcado como para niños, miniaturas cargadas, web en todas las descripciones y los dos pilar en su playlist.

## Actualización: 01/11/2026, 16:00 de Argentina
- **62 suscriptores** (eran 54 a la mañana). Analytics llega solo hasta el 29/10: el 28/10 sumó +21 y el 29/10 +6.
- **El arreglo del título del Short de perfil de volumen funcionó:** pasó de 24 a **171 vistas** en el día. El de Binance: 690 vistas, 41 me gusta y 4 comentarios.
- **Comentarios:** los 3 comentarios del canal (2 en Binance y 1 en la Lección 6) ya tienen respuesta y no hay ninguno retenido para revisión.
- **Descripciones:** en los 26 videos la categoría es Educación, la web está en la descripción y el aviso legal también. Ninguno está marcado como para niños.
- **Los 11 Shorts programados siguen con los comentarios desactivados** (la API devuelve 403 «has disabled comments»). Se confirma a las 19:00, cuando sale el primero (WKZJ9gdU68A).
- **Shorts que no están en ninguna playlist:** los 5 de la 0-1-1 y P09 que ya son públicos (BUJwplULfj0, 8ehRdk3q7NA, _olHq7c9EeY, an_hMeK6cQg, 6yh_31WWOew) y los 10 programados de P09 y P10. Propuesta: una playlist «Psicología del dinero en 1 minuto» o sumarlos a la de los pilar. Necesita el OK de Lean.
- **La retención de P09 (35 %) y de la Lección 6 (39 %) todavía no se puede leer:** tienen 21 y 50 vistas en Analytics. Se revisa con `ric-retencion` cuando pasen las 100.
- **Países (octubre):** Argentina 378 y España 98; el resto no figura.
- **El contenido sintético sigue sin poder confirmarse por la API** (devuelve vacío en los 26). Hay que mirarlo en Studio.
