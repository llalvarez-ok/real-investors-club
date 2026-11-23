# La vara de RIC · Estándar de excelencia para Reels y Shorts

Fecha: 23/11/2026. Responsable: Valeria (`.claude/agents/ric-reclutadora.md`). Se revisa cada mes o cuando Lean manda una
referencia (las de Lean valen más que cualquiera de esta lista).

## Cómo se armó

- **Búsqueda:** API de YouTube (credenciales `RIC_YT_*`). Se buscaron Shorts (`videoDuration=short`, hasta 180 s) de los
  últimos 12 meses, ordenados por vistas: en español con «trading», «bitcoin», «invertir dinero», «finanzas personales» y
  «bolsa de valores», y en inglés con «day trader», «forex trading» y «crypto crash». Para cada canal se calculó la mediana
  de vistas de sus Shorts recientes (últimos 50 videos, solo los de más de 14 días), con la lógica de `herramientas/nicho.py`.
  Gasto: unas 1.400 unidades de cuota de 10.000.
  - `nicho.py` con consultas con «#shorts» trajo basura (canales de juguetes, Minecraft): para Shorts conviene filtrar por
    duración en la búsqueda. Queda anotado para mejorar la herramienta.
  - Se descartaron: videos con pauta paga evidente (ING España ×235 y XM ×107.268, con 40.000 y 132.000 suscriptores), los
    que no son del nicho («fidget trading», Minecraft) y los de idiomas que no leemos.
- **Transcripción:** Supadata, 8 consultas (subtítulos existentes, con tiempos). Una vino vacía (TV Azteca). Contador del mes:
  56 de 100.
- **Lo que no se pudo ver:** `www.youtube.com` e `i.ytimg.com` están bloqueados en la nube, y vidIQ no tiene créditos hasta
  el 04/12. **No vimos la imagen de ninguna referencia.** Lo de «cara» y «estilo» sale de la transcripción (quién habla,
  si hay diálogo, si alguien dice «yo»). Donde no se puede saber, dice «sin dato». Antes de usar esta lista para juzgar
  la imagen, Lean (o una sesión con navegador) tiene que mirar los cuadros 0, 1 y 3 de las referencias 1 a 7 y completar
  la columna.

## Las referencias

Vistas al 23/11/2026. Múltiplo = vistas ÷ mediana de los Shorts de su canal.

| # | Short | Canal | Vistas | Múltiplo | Largo | Palabras/s |
|---|---|---|---|---|---|---|
| 1 | [Millonario VS Millonario Inteligente](https://youtu.be/ybJJbziaoR0) | Andres Garza (MX, 5,5 M) | 8.472.745 | ×45,9 | 52 s | 2,9 |
| 2 | [Le pregunté a los BILLONARIOS dónde invierten](https://youtu.be/2VEiS56j-2Q) | InvierteConPepe (MX, 1,35 M) | 4.291.339 | ×24,4 | 142 s | 2,6 |
| 3 | [México HUMILLÓ a Wall Street](https://youtu.be/zq8wvM8M6dY) | InvierteConPepe | 3.703.606 | ×21,1 | 117 s | 2,5 |
| 4 | [TV Azteca sale de BOLSA: ¿JUGADA o CRISIS?](https://youtu.be/TbpZaSgtiAs) | Luis Mi Negocios (MX, 1,8 M) | 2.491.800 | ×177,5 | 102 s | sin dato |
| 5 | [Enseña A Hacer Dinero](https://youtu.be/-eyJxY8tI5I) | Andres Garza | 2.421.324 | ×13,1 | 52 s | sin dato |
| 6 | [El BOTÓN que apaga a Wall Street](https://youtu.be/QML9QA7-9s4) | InvierteConPepe | 1.779.319 | ×10,1 | 79 s | sin dato |
| 7 | [Hackers roban 6 mil 300 millones de dólares en criptomonedas](https://youtu.be/nWM5ncQRebQ) | Latinus (MX, 2,4 M) | 1.545.814 | sin dato (pocos Shorts) | 58 s | 2,9 |
| 8 | [4 años de educación financiera en 60 segundos](https://youtu.be/of4GpywH_fQ) | Richard Gracia (ES, 229 k) | 1.113.573 | ×22,9 | 74 s | sin dato |
| 9 | [Si empezara a INVERTIR hoy, haría ESTO](https://youtu.be/gZLSQbf3w6k) | Luis Mi Negocios | 726.250 | ×51,7 | 94 s | sin dato |
| 10 | [¡Bitcoin se DESPLOMA y nadie lo esperaba!](https://youtu.be/_mqbh-oC_c8) | Luis Mi Negocios | 339.348 | ×24,2 | 91 s | 2,6 |
| 11 | [SE ENCIENDEN LAS ALARMAS EN LA BOLSA DE BRASIL](https://youtu.be/2PlPpEwUJ2I) | Hector Chamizo (ES, 184 k) | 810.090 | ×20,1 | 142 s | sin dato |
| 12 | [I Trade This One Candle Daily (It's Stupid and Simple)](https://youtu.be/-wDFP7NFZ38) | Jesse Rogers · Casper Trading (US, 568 k) | 4.253.982 | ×182,8 | 112 s | 3,3 |
| 13 | [90% of Traders Fail This Price Action Test](https://youtu.be/f2VGFJToZqw) | Price Action Intel (RO, 74 k) | 1.768.846 | ×164,7 | 47 s | 2,7 |
| 14 | [Day Trading Expectations Vs Reality](https://youtu.be/_NrB71qiRbk) | Relentless Trader (US, 34 k) | 1.424.413 | ×199,2 | 113 s | sin dato |

Las 10 y 11 no llegan al millón pero superan ×20 a su canal y son de cripto y mercados, lo más cercano a lo nuestro.

### Primeros segundos (transcripción con tiempos)

| # | 0–1 s | 1–3 s | 3–10 s | Cara / quién habla | Estilo (según el audio) | Cierre |
|---|---|---|---|---|---|---|
| 1 | «Y oficialmente, millonario.» | «Ahora sí, a comprarme ese auto nuevo.» | Segundo personaje: «Yo también soy millonario, pero voy a seguir invirtiendo…». Emergencia médica: uno paga un dineral, el otro tiene seguro. | Sí: dos personajes en escena (sketch, el creador actúa) | Sketch «dos vidas»: mismo punto de partida, decisiones opuestas | Gag en personaje: «debí haber seguido a ese tal Andrés Garza. Síguelo, aún estás a tiempo.» |
| 2 | «Perdón, pero ¿cuánto dinero dijiste que manejas?» | «Unos 270.000 millones de dólares.» | «Con eso te alcanzo para comprar Starbucks, Spotify y Nintendo.» Entrevista a un «billonario» actuado. | Sí: entrevista actuada (diálogo) | Sketch de entrevista, una cifra enorme en el segundo 2 | Pase a su web para ver los portafolios |
| 3 | «Eh, ¿tú a quién representabas?» | «Apple, Coca-Cola, Google, Nike, las 500…» | «Wall Street en persona. ¿Y cuánto generaste en 2025? Casi 18 %.» Los índices son personajes que compiten. | Sí: personificación (índices que hablan) | Competencia entre personajes con un número cada 3 s | Autopromoción en personaje |
| 4 | sin dato (sin subtítulos) | sin dato | sin dato | sin dato | Título en forma de dilema: «¿JUGADA o CRISIS?» | sin dato |
| 7 | «Este podría ser el robo del siglo.» | «¿Sabe cuánto se llevaron los ladrones?» | «6.300 millones de dólares.» (segundo 4,6) «No se llevaron dinero de un banco…» | Sí: conductor de noticias conocido | Noticia contada como un robo, con villano | Dato final: el grupo de Corea del Norte |
| 10 | «Bitcoin acaba de borrar 1,2 billones…» | «…en tan solo 6 semanas y podría ponerse peor.» | «Hace nada estaba en 126.000, máximo histórico, todo era fiesta…» Cuenta la caída como historia. | Sí (habla en primera persona y es su canal de cara; imagen sin dato) | Presentador + noticia, amenaza en el segundo 3 | Publicidad de su web |
| 12 | «I trade one candle every day…» | «…at the same time.» | «And this boring strategy made me over $100,000 in a single month…» y la regla en una frase. | Sí: el trader habla de sí mismo | Persona + resultado propio + método simple | «Save this video…» (guardar) |
| 13 | «Is this a buy or a sell?» | «3 seconds to decide.» | Pausa (segundos 5,5–6,8 sin voz) y después la explicación sobre el gráfico. | Sin dato (posible voz en off sobre gráfico) | **Desafío sobre un gráfico**: el que mira juega antes de que le expliquen | Revela la respuesta |

## Lo que comparten las que llegan al millón

1. **Una persona, no una presentación.** En 6 de las 7 transcripciones con tiempos habla alguien con nombre y cara: el
   creador actuando (1, 2, 3), un conductor conocido (7), un presentador que da la cara (10) o un trader que cuenta lo
   suyo (12). La única excepción posible (13) compensa haciendo **jugar** al que mira. Ninguna es una narración sintética
   sobre gráficos sin nadie.
2. **En el segundo 0 ya hay un conflicto con personas o plata en juego, sin contexto previo.** Dos personajes que se
   enfrentan, una entrevista que ya arrancó («Perdón, pero…»), un robo, una caída que «podría ponerse peor», un desafío
   («3 segundos para decidir»). El número grande llega **antes del segundo 5** (270.000 millones, 6.300 millones, 1,2
   billones, US$ 100.000). Nunca arrancan con un dato para analizar ni con una metáfora que haya que descifrar.
3. **Historia con progresión, no una lista de datos.** Cada 3 a 5 s pasa algo nuevo a un personaje (le llega la
   emergencia médica, el índice responde, los ladrones entran a las billeteras). Los datos aparecen como golpes de la
   historia, no como un informe. Cierre con autopromoción en personaje o con «guardalo»; ninguna pide una predicción.

Otros rasgos medidos: dicen entre 2,5 y 3,3 palabras por segundo; los títulos usan contraste y verbos fuertes («VS»,
«HUMILLÓ», «se DESPLOMA», «el BOTÓN que apaga»); en español el formato que más se repite entre los de más de 2 M es el
**sketch con personajes** (1, 2, 3, 5), y en noticias, **el presentador**. El largo no decide: van de 47 a 142 s.

**El tema solo no alcanza:** el robo a Binance (ref. 7) hizo 1,5 M en el canal de Latinus. Nuestro Short del mismo tema
hizo 664 vistas en YouTube y el Reel de Corea llegó a 5.727 cuentas en Instagram. Mismo tema, distinta cara y distinto
tamaño de cuenta.

## Lo nuestro, con datos (Instagram, `analisis/2026-11-14-revision-instagram.md`)

| Reel | Se va antes de 3 s | Visto en promedio | Alcance | Qué dejó |
|---|---|---|---|---|
| Bitcoin, dos zonas (13/11, expediente cine, clon) | **35,8 %** | 47 % | 4.015 (1 día) | 23 guardados, 0 compartidos |
| Corea robó Binance (01/11, expediente cine, voz de Lean) | **37,3 %** | 39 % | 5.727 | 17 compartidos, 10 comentarios |
| Nvidia, «¿Fue culpa del CEO?» (12/11) | 66,2 % | 22 % | 278 | — |
| Elecciones (04/11, voz por WhatsApp) | 65,4 % | 22 % | 203 | 2 comentarios |
| Binance con partículas (31/10) | 59,1 % | — | 835 | 9 compartidos |
| Clase 14 con «CURSO» (29/10) | 66,1 % | — | 246 | 8 comentarios |
| Históricos con Lean a cámara (01/04 y 10/01) | sin dato | — | 760 | **27 y 29 comentarios** |

Lo que anduvo: cripto, algo en juego del que mira o una cifra con villano en el cuadro 0, foto real y expediente.
Lo que no: temas que hay que conocer de antes, preguntas con siglas, partículas, más de 60 s. Lo que trae comentarios:
Lean en persona. Nuestro mejor resultado (5.727 cuentas) está **dos órdenes de magnitud** debajo del millón.

## Criterios medibles (la vara)

Cada uno se califica de 0 a 10 mirando la hoja de contacto, los cuadros 0, 1 y 3 en tamaño celular y la transcripción de
la mezcla final. Para aprobar: **todos en 8 o más y la comparación a ciegas ganada**.

| # | Criterio | Cómo se mide | 10 | 0 |
|---|---|---|---|---|
| C1 | Cuadro 0 sin sonido | Cuadro 0 a 360 px de ancho, 0,5 s, sin audio: ¿se entiende quién o qué está en juego? | Una cara, una persona o un objeto real en conflicto + un número o una frase de 5 palabras como máximo | Un gráfico chico, una pregunta o un rótulo |
| C2 | Primera frase | Las primeras 8 palabras de la transcripción | Escena, conflicto o plata del que mira, sin contexto previo | «Hoy te explico», una sigla o una pregunta que necesita saber algo |
| C3 | Número grande antes del segundo 5 | Tiempo de la primera cifra en la transcripción | ≤ 3 s | > 8 s o ninguna |
| C4 | Persona | ¿Hay una persona (Lean o un personaje con nombre que actúa o le pasa algo) en la imagen o en la historia? | Lean a cámara o en su voz grabada | Nadie; solo datos |
| C5 | Ocupación de la pantalla | En la hoja de contacto, % del área útil (x 140–870, y 250–1440) que ocupa el protagonista | ≥ 50 % en la mayoría de los cuadros | < 25 %, mitades vacías |
| C6 | Cambio visual | Cuadros seguidos de la hoja (cada ~3,5 s) con el mismo título y la misma composición | 0 repetidos | 3 o más iguales |
| C7 | Progresión | ¿Cada 3 a 5 s le pasa algo nuevo a alguien o cambia lo que está en juego? | Siempre | Lista de datos |
| C8 | Audio | Whisper sobre la mezcla: palabras cortadas, pausas > 0,5 s, cola de frase cortada, palabras mal dichas | 0 | 2 o más |
| C9 | Subtítulos | Ningún subtítulo partido a mitad de idea en pantalla (ej.: «SI TU PLATA ESTÁ EN») | 0 | 2 o más |
| C10 | Ritmo de voz | Palabras por segundo de la mezcla | 2,6–3,3 | < 2,3 o > 3,6 |
| C11 | Cierre | El pedido es fácil, sobre el que mira o con un regalo, y llega antes del 60 % del video en el texto | Palabra con regalo o pregunta sobre uno mismo | Pide una predicción en público |
| C12 | Reglas | `CLAUDE.md`: sin recomendaciones ni promesas, datos verificados, aviso, contenido sintético marcado, zonas seguras | Todo | Cualquier falta = 0 y no sale |

**Comparación a ciegas:** se ponen la nuestra y las 3 referencias más parecidas (por tema y formato) en una fila de
4 cuadros 0, sin nombres. Si alguien que no la hizo (Valeria y un segundo revisor) dice que la nuestra es la que saltea, o
«capaz», se rechaza.

## Formatos que sí tienen evidencia para RIC

1. **Lean a cámara + expediente** (lo que pedía el 14/11 y lo que hacen las ref. 7, 10, 12): Lean dice la primera frase
   a cámara, el expediente cine pone las pruebas. Es el que más acerca a la vara.
2. **Sketch de dos vidas** (ref. 1, 2, 3, 5 y nuestra fórmula del 02/11): dos traders con nombre, mismo comienzo, final
   opuesto; con Lean actuando o con actores. Ya tenemos la fórmula escrita (`diseno/ganchos.json`) y un Short hecho sin cara («Dos traders», 02/11).
3. **Desafío sobre un gráfico real** (ref. 13): «¿Compra o venta? 3 segundos». Es el único formato del millón sin cara
   comprobada y el que mejor usa lo que ya sabemos hacer (velas reales). Revela la respuesta: no pide predecir en público.

El expediente cine sin cara (Corea, Bitcoin) es nuestro mejor formato propio, pero está lejos del millón: sirve de base,
no de techo.
