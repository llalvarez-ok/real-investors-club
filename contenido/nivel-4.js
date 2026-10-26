/* RIC — Material de lectura · Nivel 4 (UNIVERSO) */
(function () {
  const L = (window.RIC_LECCIONES = window.RIC_LECCIONES || {});

  /* ============ MÓDULO 0 · Smart Money Concepts (SMC) ============ */

  L["4-0-0"] = {
    resumen:
      "La liquidez es el combustible del mercado: los stops agrupados son órdenes que las instituciones necesitan para llenar posiciones grandes. Aprende a mapear dónde están.",
    duracionVideo: "9–12 min",
    lectura: `<p>Ya operas con un sistema validado. Este módulo no viene a reemplazarlo, sino a explicarte <strong>por qué</strong> el precio se mueve como se mueve. Y la respuesta empieza con una palabra: liquidez.</p>
<h4>Qué es la liquidez en términos prácticos</h4>
<p>Una institución que quiere comprar 5.000 contratos de un futuro no puede hacerlo de golpe: movería el precio en su contra antes de completar la orden. Necesita que haya vendedores dispuestos en la zona donde quiere comprar. ¿Y dónde hay vendedores garantizados? Donde están los <strong>stops de los compradores minoristas</strong>: un stop loss de una posición larga es una orden de venta a mercado esperando a ser ejecutada.</p>
<p>Por eso los stops agrupados funcionan como imanes. Debajo de un mínimo obvio hay cientos de stops de largos; encima de un máximo obvio hay stops de cortos. Cuando el precio barre esos niveles, se ejecuta un bloque enorme de órdenes en milisegundos: esa es la contraparte que la institución necesitaba.</p>
<h4>Ejemplo numérico</h4>
<p>Imagina el oro con un mínimo visible en 2.310. Miles de traders compraron cerca de 2.315 y pusieron su stop en 2.308, "debajo del soporte". Eso significa que en 2.308 hay una piscina de órdenes de venta. Si un fondo quiere acumular largos, el movimiento eficiente es empujar el precio hasta 2.307, absorber toda esa venta forzada, y recién entonces dejar que el precio suba. El minorista ve "me sacaron por 2 dólares y después voló"; la institución ve "conseguí liquidez al mejor precio".</p>
<h4>Nada de esto es magia nueva</h4>
<p>Importante: SMC no es una secta ni un descubrimiento secreto. Es la <strong>Teoría de Dow y la lectura clásica de soportes, resistencias y volumen</strong> con nomenclatura moderna. "Liquidity pool" es lo que un operador de piso llamaba "zona de stops" hace 50 años. Te enseñamos la mecánica, no el dogma.</p>
<h4>Aplicación práctica</h4>
<ul>
<li>Marca en tu gráfico los máximos y mínimos <em>obvios</em>: iguales, dobles, o de rangos claros. Ahí vive la liquidez.</li>
<li>Antes de entrar, pregúntate: ¿mi stop está donde están los stops de todos? Si es así, espéralo: el precio probablemente vaya a buscarlo antes del movimiento real.</li>
<li>Las mejores entradas suelen aparecer <strong>después</strong> del barrido de un nivel obvio, no antes.</li>
</ul>
<p>El error común del alumno avanzado: ver liquidez en todas partes y justificar cualquier entrada. La liquidez es contexto, no señal. Tu sistema sigue mandando; esto te ayuda a elegir mejores zonas para ejecutarlo.</p>`,
    claves: [
      "Un stop loss ajeno es la orden de mercado que la institución necesita",
      "Los máximos y mínimos obvios concentran liquidez",
      "SMC es Teoría de Dow con nombres nuevos, no una secta",
      "Las mejores entradas aparecen después del barrido, no antes",
    ],
  };

  L["4-0-1"] = {
    resumen:
      "Order blocks y fair value gaps: huellas que deja una orden institucional grande. Qué son, cómo marcarlos y qué significa que el precio los mitigue.",
    duracionVideo: "10–14 min",
    lectura: `<p>Si la liquidez explica hacia dónde va el precio, los order blocks y los imbalances explican <strong>desde dónde</strong> reacciona. Son las huellas que deja una participación institucional que no terminó de ejecutarse.</p>
<h4>Order block: la última vela antes del desequilibrio</h4>
<p>Un <strong>order block</strong> es la última vela contraria antes de un movimiento impulsivo que rompe estructura. Ejemplo: el precio cae, imprime una última vela bajista en 5.610 del S&amp;P, e inmediatamente sube 40 puntos rompiendo el máximo anterior. Esa vela bajista marca la zona donde una institución acumuló compras usando la venta disponible. Si el precio regresa a 5.610, es probable que queden órdenes sin llenar y el nivel reaccione.</p>
<h4>FVG: el hueco que deja la prisa</h4>
<p>Un <strong>fair value gap</strong> (imbalance) aparece cuando el precio se mueve tan rápido que deja un hueco entre la mecha de la vela 1 y la mecha de la vela 3, sin solapamiento. En ese tramo prácticamente no hubo negociación en ambos sentidos: todo fue agresión de un lado. El mercado tiende a volver a esos huecos para "rellenar" la negociación que faltó, igual que un gap clásico de apertura tiende a cerrarse.</p>
<h4>Mitigación: el retorno a la zona</h4>
<p>Cuando el precio vuelve a un order block o a un FVG y reacciona, decimos que la zona fue <strong>mitigada</strong>: las órdenes pendientes se ejecutaron. Una zona mitigada pierde fuerza; una zona fresca (nunca revisitada) tiene más probabilidad de generar reacción. Esto es idéntico al principio clásico de que un soporte pierde fuerza con cada toque, solo que con lupa institucional.</p>
<h4>Ejemplo numérico completo</h4>
<ol>
<li>NQ cae de 20.150 a 20.080 y deja un FVG entre 20.120 y 20.135.</li>
<li>La última vela alcista antes de la caída (20.140–20.150) es el order block bajista.</li>
<li>El precio rebota, sube hasta 20.128 (dentro del FVG), lo rellena parcialmente y retoma la caída.</li>
<li>Entrada corta en el FVG con stop sobre el order block: riesgo definido de unos 20 puntos con objetivo en el mínimo previo.</li>
</ol>
<h4>Error común</h4>
<p>Marcar veinte zonas por gráfico. Si todo es un order block, nada lo es. Filtra: solo zonas que originaron rupturas de estructura reales, en la temporalidad donde opera tu sistema, y alineadas con la dirección de la liquidez que estudiaste en la lección anterior.</p>`,
    claves: [
      "Order block: última vela contraria antes del impulso que rompe estructura",
      "FVG: hueco de negociación entre la vela 1 y la 3",
      "Zona fresca reacciona mejor que zona mitigada",
      "Si marcas veinte zonas por gráfico, no estás filtrando nada",
    ],
  };

  L["4-0-2"] = {
    resumen:
      "El inducement y el stop hunt no son conspiración: son la forma eficiente de ejecutar tamaño institucional. Aprende a reconocer la trampa antes de ser la trampa.",
    duracionVideo: "8–12 min",
    lectura: `<p>La palabra "manipulación" vende cursos, así que aclaremos primero qué es y qué no es. Ningún fondo se levanta pensando en cazarte a ti. Pero sí es cierto que ejecutar tamaño institucional <strong>requiere</strong> generar liquidez, y la forma más barata de generarla es inducir al minorista a posicionarse donde su stop sirva de contraparte. Eso tiene mecánica reconocible.</p>
<h4>Inducement: la carnada antes del nivel real</h4>
<p>Un <strong>inducement</strong> es un nivel intermedio atractivo que invita a entrar antes de tiempo. Ejemplo: el precio forma un order block alcista en 1,0820 del euro-dólar, pero antes deja un pequeño mínimo en 1,0838. Ese mínimo intermedio es la carnada: los traders que "ya aprendieron SMC" compran su ruptura o apoyan stops debajo. El precio barre 1,0838, ejecuta esos stops, y recién entonces llega a 1,0820, la zona de interés real, desde donde sale el movimiento verdadero.</p>
<h4>Stop hunt: el barrido con retorno</h4>
<p>Un <strong>stop hunt</strong> clásico se reconoce por tres elementos: (1) un nivel obvio con stops acumulados, (2) una ruptura rápida y con mecha que lo atraviesa, y (3) un retorno inmediato al rango. La clave es la <em>velocidad del rechazo</em>: si el precio rompe un mínimo y en una o dos velas está de vuelta arriba, lo que hubo fue ejecución de stops y absorción, no un cambio de tendencia. Si rompe y se queda abajo construyendo, la ruptura era genuina.</p>
<h4>Cómo usarlo sin volverte paranoico</h4>
<ul>
<li>Antes de entrar en una zona, busca el nivel intermedio obvio que podría actuar de inducement. Si existe, espera a que lo barran.</li>
<li>Coloca tus stops donde la estructura invalide tu idea, no "un poco debajo del mínimo" como todos.</li>
<li>Un barrido con rechazo violento a favor de tu análisis es de las confirmaciones más fiables que existen.</li>
</ul>
<h4>El error común</h4>
<p>Ver manipulación en cada vela y no ejecutar nunca, o al revés: usarla de excusa ("me cazaron los market makers") para no auditar un stop mal puesto. La estadística de tu diario sigue siendo el juez. Si tus stops mueren sistemáticamente por mechas que luego revierten, no te persigue nadie: estás poniendo el stop en la piscina de todos. Muévelo detrás de la estructura y mide el cambio en tus métricas.</p>`,
    claves: [
      "El inducement es la carnada antes de la zona de interés real",
      "Stop hunt: ruptura veloz, mecha y retorno inmediato al rango",
      "La velocidad del rechazo distingue barrido de ruptura genuina",
      "Si tus stops mueren por mechas, están en la piscina de todos",
    ],
  };

  L["4-0-3"] = {
    resumen:
      "El modelo completo: liquidez barrida, cambio de carácter, zona fresca y entrada con riesgo definido. Una secuencia ordenada, no señales sueltas.",
    duracionVideo: "12–16 min",
    lectura: `<p>Ya tienes las piezas: liquidez, order blocks, FVG, inducement. Esta lección las ordena en una secuencia operativa completa. El valor de SMC no está en ningún concepto aislado, sino en el <strong>orden</strong> en que se encadenan.</p>
<h4>La secuencia en cinco pasos</h4>
<ol>
<li><strong>Contexto:</strong> define la dirección en la temporalidad mayor (4H o diario). ¿La estructura hace máximos y mínimos crecientes o decrecientes? Solo buscarás entradas a favor de esa dirección.</li>
<li><strong>Liquidez objetivo:</strong> identifica la piscina que el precio debería barrer antes de moverse: un mínimo igualado, el inducement bajo la zona de interés.</li>
<li><strong>El barrido:</strong> espera a que el precio tome esa liquidez. Sin barrido no hay trade: esa es la disciplina que separa este modelo de comprar en cualquier soporte.</li>
<li><strong>Cambio de carácter (CHoCH):</strong> tras el barrido, el precio debe romper la microestructura contraria en tu temporalidad de entrada. Esa ruptura confirma que la liquidez capturada se está usando en la dirección esperada.</li>
<li><strong>Entrada:</strong> en el order block o FVG que originó ese cambio de carácter, con stop detrás del extremo del barrido.</li>
</ol>
<h4>Ejemplo numérico</h4>
<p>Oro en 4H alcista. Mínimo igualado en 2.355 (liquidez). El precio cae, mecha hasta 2.352 (barrido), y en 15 minutos rompe el último máximo menor en 2.361 (cambio de carácter) dejando un FVG entre 2.357 y 2.359. Entrada: 2.358. Stop: 2.351, debajo del barrido. Objetivo: la liquidez opuesta en 2.378, sobre los máximos iguales. Riesgo 7 dólares, recorrido 20: ratio 1:2,8. Cada elemento tiene una función; ninguno se negocia.</p>
<h4>Integración con tu sistema, no reemplazo</h4>
<p>Nivel 4 no te pide tirar tu sistema validado por la ventana. Trata este modelo como un <em>filtro de calidad</em>: si tus entradas actuales coinciden con barrido más cambio de carácter, tu esperanza matemática probablemente mejore. Pruébalo en demo o con riesgo reducido durante 30 operaciones registradas antes de darle peso real, exactamente igual que validaste todo lo demás.</p>
<h4>Error común</h4>
<p>Saltarse el paso 3 o el 4 por ansiedad. Entrar en la zona "porque ya llegó" sin barrido ni confirmación es volver a comprar soportes con nombres nuevos. La secuencia completa o nada.</p>`,
    claves: [
      "Contexto, liquidez, barrido, cambio de carácter, entrada: en ese orden",
      "Sin barrido no hay trade",
      "El stop va detrás del extremo del barrido",
      "Es un filtro para tu sistema validado, no un reemplazo",
      "30 operaciones registradas antes de darle riesgo real",
    ],
  };

  /* ============ MÓDULO 1 · Order Flow y volumen institucional ============ */

  L["4-1-0"] = {
    resumen:
      "El perfil de volumen muestra dónde se negoció de verdad: POC, VAH y VAL definen el área de valor. El precio acepta o rechaza esas zonas, y eso es operable.",
    duracionVideo: "10–13 min",
    lectura: `<p>El gráfico de velas te dice a qué precio cotizó el mercado; el <strong>perfil de volumen</strong> te dice a qué precios se negoció de verdad. Es un histograma horizontal: cada nivel de precio muestra cuánto volumen se cruzó ahí. Y eso cambia la lectura por completo.</p>
<h4>Las tres referencias</h4>
<ul>
<li><strong>POC (Point of Control):</strong> el precio con más volumen negociado de la sesión o del rango. Es el nivel donde compradores y vendedores estuvieron más de acuerdo: un imán natural.</li>
<li><strong>Área de valor:</strong> el rango que concentra el 70% del volumen. Su techo es el <strong>VAH</strong> (Value Area High) y su piso el <strong>VAL</strong> (Value Area Low).</li>
<li>Fuera del área de valor el volumen es delgado: el precio atraviesa esas zonas rápido porque hubo poco acuerdo ahí.</li>
</ul>
<h4>Aceptación y rechazo: la lógica operativa</h4>
<p>Todo el trading con perfil se reduce a una pregunta: cuando el precio llega a un extremo del valor, ¿lo <em>acepta</em> o lo <em>rechaza</em>? Si el precio sale del área de valor y construye volumen fuera (velas que cierran y pasan tiempo ahí), el mercado está aceptando precios nuevos: probable inicio de tendencia. Si sale y regresa rápido, fue un rechazo: probable retorno al POC.</p>
<h4>Ejemplo numérico</h4>
<p>Sesión del ES: POC en 5.620, VAH en 5.634, VAL en 5.608. Al día siguiente el precio abre en 5.638, por encima del valor. Escenario 1: cae, entra al área y se sostiene bajo 5.634: la estadística favorece la rotación hacia el POC en 5.620, un recorrido de 14 puntos. Escenario 2: se mantiene sobre 5.634 y construye volumen: la apertura fuera de valor se acepta y el sesgo del día es alcista. La misma apertura, dos planes opuestos, decididos por aceptación o rechazo, no por intuición.</p>
<h4>Aplicación práctica</h4>
<ol>
<li>Marca cada mañana POC, VAH y VAL de la sesión anterior. Son tus niveles objetivos y tus zonas de reacción.</li>
<li>Un POC de días anteriores sin revisitar (naked POC) actúa como imán en sesiones posteriores.</li>
<li>Combina con el módulo anterior: un barrido de liquidez que coincide con el VAL es una confluencia de altísima calidad.</li>
</ol>
<h4>Error común</h4>
<p>Tratar VAH y VAL como líneas mágicas de rebote automático. No lo son: son fronteras donde debes <em>leer</em> la reacción. La zona te dice dónde mirar; la aceptación o el rechazo te dicen qué hacer.</p>`,
    claves: [
      "POC: el precio con más volumen, el imán de la sesión",
      "El área de valor concentra el 70% del volumen entre VAH y VAL",
      "Aceptación fuera de valor: tendencia; rechazo: rotación al POC",
      "Las zonas dicen dónde mirar, la reacción dice qué hacer",
    ],
  };

  L["4-1-1"] = {
    resumen:
      "El footprint abre cada vela y muestra quién agredió: volumen ejecutado en bid y ask, y el delta neto. Es la diferencia entre ver el resultado y ver la pelea.",
    duracionVideo: "11–14 min",
    lectura: `<p>Una vela verde te dice que el precio subió. Un <strong>footprint chart</strong> te dice quién la empujó, con cuánto volumen y si alguien estaba vendiendo en su interior. Abre cada vela y muestra, nivel por nivel, el volumen ejecutado contra el <em>bid</em> (venta agresiva) y contra el <em>ask</em> (compra agresiva).</p>
<h4>Delta: la resta que importa</h4>
<p>El <strong>delta</strong> de una vela es el volumen agresivo comprador menos el vendedor. Si en una vela del NQ se ejecutaron 3.400 contratos contra el ask y 2.100 contra el bid, el delta es +1.300: dominaron los compradores a mercado. El delta acumulado de la sesión te dice quién lleva la iniciativa del día.</p>
<h4>Las divergencias: donde vive la información</h4>
<p>El delta vale oro cuando <strong>contradice</strong> al precio:</p>
<ul>
<li><strong>Precio hace máximo nuevo, delta no acompaña:</strong> los compradores agresivos se agotan. Si además el precio no avanza pese a delta positivo, alguien grande está vendiendo pasivamente contra esa agresión (lo verás mejor en la lección de absorción).</li>
<li><strong>Vela bajista con delta positivo:</strong> hubo compra agresiva y aun así el precio cayó: la oferta pasiva era enorme. Señal de debilidad, no de fuerza.</li>
</ul>
<h4>Ejemplo numérico</h4>
<p>El ES ataca el máximo del día en 5.641. Vela 1: máximo 5.641, delta +2.800. Vela 2: máximo 5.643 (nuevo máximo), delta +600. Vela 3: máximo 5.643,50, delta -400 y cierre bajista. Lectura: cada empuje compró con menos convicción y el último máximo lo hizo con venta neta. Tres velas, una historia completa de agotamiento que el gráfico de velas tradicional no muestra: en velas normales solo verías tres máximos crecientes.</p>
<h4>Aplicación práctica y error común</h4>
<ol>
<li>Usa el footprint solo en la zona de decisión: en tus niveles de perfil, order blocks o barridos. Leerlo vela a vela todo el día es ruido y fatiga.</li>
<li>Busca finales de movimiento: máximos con delta decreciente, mínimos con delta que no confirma.</li>
<li>El error común es invertir la lógica: delta positivo no significa "compra". Significa que hubo compradores agresivos; si el precio no sube con ellos, es una alerta bajista. El contexto del precio siempre interpreta al delta, nunca al revés.</li>
</ol>`,
    claves: [
      "Delta: compra agresiva menos venta agresiva por vela",
      "La información está en las divergencias delta-precio",
      "Máximos nuevos con delta decreciente: agotamiento comprador",
      "El contexto del precio interpreta al delta, nunca al revés",
    ],
  };

  L["4-1-2"] = {
    resumen:
      "El DOM muestra las órdenes límite esperando; la absorción es cuando un jugador grande se come toda la agresión sin dejar que el precio avance. Ahí giran los mercados.",
    duracionVideo: "9–12 min",
    lectura: `<p>El <strong>DOM</strong> (Depth of Market o profundidad de mercado) es la lista de órdenes límite esperando a cada lado del precio: cuántos contratos quieren comprar en cada nivel del bid y vender en cada nivel del ask. Es el mercado antes de ejecutarse: la intención visible.</p>
<h4>Lo que el DOM muestra (y lo que finge)</h4>
<p>Primera advertencia: las órdenes límite se pueden cancelar. Un tamaño enorme en el DOM puede ser <em>spoofing</em>: una orden puesta para asustar que desaparece antes de ejecutarse. Por eso el DOM no se lee por lo que promete, sino por lo que <strong>ejecuta</strong>. La información fiable está en el cruce entre la agresión (market orders) y la pasividad (límites) en el momento del contacto.</p>
<h4>Absorción: la pared invisible</h4>
<p>La <strong>absorción</strong> es el evento clave: llega agresión fuerte a un nivel y el precio no avanza. Alguien con tamaño está recargando su orden límite una y otra vez, comiéndose todo lo que le tiran. En el footprint se ve como volumen altísimo en un nivel con precio detenido; en el DOM, como un nivel que se ejecuta y se rellena repetidamente.</p>
<h4>Ejemplo numérico</h4>
<p>El crudo (CL) cae hasta 78,20. En ese nivel se ejecutan 1.900 contratos contra el bid en tres minutos, un volumen enorme para el horario, y el precio baja apenas 3 ticks y vuelve. Los vendedores agresivos descargaron todo lo que tenían y un comprador pasivo lo absorbió sin ceder terreno. Cuando la venta se agota, no queda nadie por vender: el camino de menor resistencia es hacia arriba. El giro posterior desde 78,20 no fue suerte: quedó impreso en la cinta antes de ocurrir.</p>
<h4>Aplicación práctica</h4>
<ul>
<li>Busca absorción solo en niveles que ya te importaban: VAL, POC previos, zonas de barrido de liquidez. La confluencia entre "dónde" (estructura) y "quién" (order flow) es tu ventaja.</li>
<li>Señal completa: volumen anómalo + precio detenido + giro con delta a favor. Las tres cosas, no una.</li>
<li>Empieza observando en simulado: leer el DOM en vivo requiere horas de pantalla, y es normal que las primeras semanas veas ruido puro.</li>
</ul>
<h4>Error común</h4>
<p>Operar contra la absorción "porque la pared aguanta". Si la absorción falla y el nivel cede, la salida de todos los atrapados acelera el movimiento contrario. La absorción es señal cuando se confirma con el giro, jamás antes.</p>`,
    claves: [
      "El DOM muestra intención; solo la ejecución es información fiable",
      "Absorción: agresión masiva sin avance del precio",
      "Confluencia: absorción en niveles que ya importaban",
      "La absorción se opera confirmada con el giro, nunca antes",
    ],
  };

  L["4-1-3"] = {
    resumen:
      "El VWAP es el precio promedio ponderado por volumen: la vara con la que los fondos miden sus ejecuciones. Por eso funciona como soporte, resistencia y filtro de sesgo.",
    duracionVideo: "8–11 min",
    lectura: `<p>El <strong>VWAP</strong> (Volume Weighted Average Price) es el precio promedio de la sesión ponderado por volumen: cada trade aporta según su tamaño. No es un indicador exótico: es la <strong>vara de medición institucional</strong>. A un ejecutor de un fondo se le evalúa por comprar debajo del VWAP o vender encima; los algoritmos de ejecución (los que trocean órdenes gigantes en miles de pequeñas) lo usan como referencia central.</p>
<h4>Por qué eso lo vuelve operable</h4>
<p>Como los jugadores más grandes ejecutan alrededor del VWAP, el nivel concentra actividad real, no superstición. De ahí salen tres usos concretos:</p>
<ol>
<li><strong>Filtro de sesgo intradía:</strong> precio sobre VWAP con pendiente alcista: solo buscas largos; debajo con pendiente bajista: solo cortos. Es el filtro más barato contra operar contra el día.</li>
<li><strong>Zona de reversión a la media:</strong> en días de rango, los alejamientos extremos del VWAP tienden a regresar. Las bandas de desviación estándar (1 y 2 sigmas) miden qué tan estirado está el precio.</li>
<li><strong>Prueba y continuación:</strong> en tendencia, el retroceso al VWAP que lo respeta es de las entradas de continuación más limpias que existen.</li>
</ol>
<h4>Ejemplo numérico</h4>
<p>NQ abre en 20.100, sube y a las 11:00 cotiza 20.180 con el VWAP en 20.135 subiendo. Retrocede a 20.138, imprime absorción compradora (módulo anterior) y rebota. Entrada larga en 20.140, stop en 20.118 debajo del VWAP y del mínimo local, objetivo en el máximo en 20.180: riesgo 22 puntos por 40 de recorrido. La confluencia VWAP + absorción + tendencia intradía convierte un simple retroceso en un trade con estructura.</p>
<h4>Error común</h4>
<p>Dos, en realidad. Primero: usar el VWAP en temporalidades donde no aplica; es un cálculo de sesión, su versión semanal o mensual existe pero cuenta otra historia. Segundo: operar el toque exacto como si fuera un muro. El VWAP es una <em>zona</em> de interés institucional, no una línea de rebote garantizado: exige confirmación igual que cualquier nivel. Si el precio lo cruza y construye del otro lado, el sesgo del día cambió y tu plan debe cambiar con él.</p>`,
    claves: [
      "El VWAP es la vara de ejecución de los fondos",
      "Sobre VWAP ascendente: sesgo largo; debajo: sesgo corto",
      "El retroceso al VWAP en tendencia es entrada de continuación clásica",
      "Es una zona que exige confirmación, no un muro",
    ],
  };

  /* ============ MÓDULO 2 · Futuros profesionales ============ */

  L["4-2-0"] = {
    resumen:
      "Los futuros son el terreno institucional: contratos estandarizados, apalancamiento vía margen y vencimientos trimestrales. Conoce ES, NQ, GC y CL con números reales.",
    duracionVideo: "11–15 min",
    lectura: `<p>Los futuros son donde opera el dinero institucional de verdad: mercados centralizados (CME, principalmente), profundidad enorme, comisiones bajas y sin conflicto de interés con tu broker, que aquí es solo un intermediario hacia el exchange. Pero exigen entender tres cosas con precisión: el contrato, el margen y el vencimiento.</p>
<h4>El contrato: tamaño y tick</h4>
<p>Cada futuro tiene especificaciones fijas. Los cuatro grandes que nos importan:</p>
<ul>
<li><strong>ES (S&amp;P 500):</strong> multiplicador 50 dólares por punto. Tick mínimo 0,25 puntos = 12,50 dólares.</li>
<li><strong>NQ (Nasdaq 100):</strong> multiplicador 20 dólares por punto. Tick 0,25 = 5 dólares.</li>
<li><strong>GC (oro):</strong> 100 onzas por contrato. Tick 0,10 = 10 dólares.</li>
<li><strong>CL (crudo WTI):</strong> 1.000 barriles. Tick 0,01 = 10 dólares.</li>
</ul>
<p>Traducción a riesgo: un movimiento de 10 puntos en ES son 500 dólares por contrato. Si tu stop habitual es de 10 puntos y tu riesgo por operación es 200 dólares, un contrato ES te queda grande. Ese cálculo, antes de operar, no después.</p>
<h4>El margen: apalancamiento estructural</h4>
<p>No pagas el valor del contrato (un ES a 5.600 puntos "vale" 280.000 dólares); depositas un <strong>margen</strong>. El margen intradía que ofrecen los brokers puede ser de 1.000–2.000 dólares por contrato ES; el margen overnight (mantener posición fuera de horario) lo fija el exchange y ronda los 15.000–18.000. Esa diferencia importa: una posición que era viable intradía puede liquidarte si la mantienes hasta el cierre sin el margen overnight cubierto.</p>
<h4>El vencimiento</h4>
<p>Los índices vencen trimestralmente (marzo, junio, septiembre, diciembre; códigos H, M, U, Z). GC y CL tienen vencimientos mensuales con dinámica propia. Un futuro no es una acción: el contrato de junio deja de existir en junio. La transición al contrato siguiente (rollover) tiene su propia lección en este módulo.</p>
<h4>Error común</h4>
<p>Confundir apalancamiento disponible con apalancamiento usable. Que el broker te deje operar un ES con 1.000 dólares de margen no significa que puedas: con una cuenta de 5.000, un solo stop de 10 puntos es el 10% de tu capital. La regla de riesgo del 1% que traes de niveles anteriores no se suspende porque el instrumento sea más serio; se vuelve más importante.</p>`,
    claves: [
      "ES: 50 dólares por punto; NQ: 20; conoce el multiplicador antes del trade",
      "Margen intradía y overnight son cosas distintas",
      "Los futuros vencen: no son acciones",
      "El apalancamiento disponible no es apalancamiento usable",
    ],
  };

  L["4-2-1"] = {
    resumen:
      "Los micro futuros (MES, MNQ, MGC, MCL) son la décima parte del contrato grande: la puerta de entrada real al mundo de futuros con cuentas pequeñas y riesgo controlable.",
    duracionVideo: "8–11 min",
    lectura: `<p>Durante décadas, los futuros fueron territorio exclusivo de cuentas grandes: si el ES mueve 50 dólares por punto, una cuenta de 3.000 dólares no tenía nada que hacer ahí. En 2019 el CME lanzó los <strong>micro futuros</strong>, contratos a exactamente un décimo del tamaño estándar, y eso cambió el acceso por completo.</p>
<h4>La familia micro</h4>
<ul>
<li><strong>MES (Micro S&amp;P):</strong> 5 dólares por punto (vs 50 del ES).</li>
<li><strong>MNQ (Micro Nasdaq):</strong> 2 dólares por punto (vs 20 del NQ).</li>
<li><strong>MGC (Micro oro):</strong> 10 onzas (vs 100 del GC).</li>
<li><strong>MCL (Micro crudo):</strong> 100 barriles (vs 1.000 del CL).</li>
</ul>
<p>Mismo mercado, mismo gráfico, misma liquidez de referencia: solo cambia el tamaño. Un stop de 10 puntos en MES son 50 dólares en vez de 500. Con una cuenta de 5.000 dólares y riesgo del 1% (50 dólares), un micro contrato con stop de 10 puntos encaja exacto. Los números por fin cierran.</p>
<h4>Por qué esto es una herramienta profesional y no un juguete</h4>
<p>Primero, el escalado gradual: puedes pasar de 1 MES a 2, a 5, a 10 conforme tu curva de capital crece, con pasos de riesgo del 10% en vez de saltos del 100%. Diez micros equivalen a un contrato grande: la transición es continua. Segundo, la validación barata: probar tu sistema en un mercado nuevo (del oro a los índices, por ejemplo) con micros cuesta una décima parte de los errores. Tercero, la psicología: operar tamaño que tu cuenta tolera te deja ejecutar el plan sin que la amígdala tome el control.</p>
<h4>Los costos relativos: la letra chica</h4>
<p>La comisión por micro contrato no es un décimo de la del grande: suele ser algo menos de la mitad. En proporción, operar 10 micros es más caro que operar 1 grande. Ejemplo: si el ES te cuesta 4 dólares ida y vuelta y el MES 1,20, diez micros cuestan 12 dólares contra 4. Mientras escalas, ese sobrecosto es el precio de la granularidad y lo vale; cuando tu tamaño estable supere los 10 micros, migrar al contrato grande reduce fricción.</p>
<h4>Error común</h4>
<p>Usar los micros para sobreoperar ("total, es chiquito"). El tamaño reducido es para dimensionar bien el riesgo, no para multiplicar trades impulsivos. Veinte micro trades malos queman una cuenta igual que dos grandes.</p>`,
    claves: [
      "Micros: exactamente un décimo del contrato estándar",
      "Permiten cumplir la regla del 1% con cuentas chicas",
      "Escalado gradual: de 1 a 10 micros sin saltos de riesgo",
      "En comisiones relativas son más caros: es el precio de la granularidad",
      "Tamaño chico no es licencia para sobreoperar",
    ],
  };

  L["4-2-2"] = {
    resumen:
      "Los futuros vencen y hay que rolar al contrato siguiente. Contango y backwardation explican por qué el siguiente contrato cotiza distinto y qué le hace eso a tu posición.",
    duracionVideo: "9–12 min",
    lectura: `<p>Tu futuro tiene fecha de caducidad, y eso genera dos fenómenos que todo operador de futuros domina: el <strong>rollover</strong> y la estructura temporal de precios (<strong>contango</strong> y <strong>backwardation</strong>).</p>
<h4>Rollover: mudarse de contrato</h4>
<p>Cuando el contrato de junio (M) se acerca a su vencimiento, el volumen migra al de septiembre (U). Rolar es cerrar tu posición en el contrato que muere y abrirla en el siguiente. En índices ocurre en la semana del segundo jueves-viernes de marzo, junio, septiembre y diciembre. La regla práctica: <strong>opera siempre el contrato con más volumen</strong>. Uno o dos días antes del rollover oficial, el volumen ya se mudó; quedarte en el contrato viejo es operar en una pileta que se vacía, con spreads cada vez peores.</p>
<p>Detalle técnico que confunde a todos la primera vez: el contrato nuevo cotiza a un precio distinto. Si ES junio está en 5.600 y septiembre en 5.650, tu gráfico "salta" 50 puntos al cambiar de contrato. No fue un movimiento del mercado: es la diferencia de estructura temporal. Los gráficos de continuidad ajustada corrigen ese salto para que tus niveles históricos sigan siendo válidos: configúralo en tu plataforma.</p>
<h4>Contango y backwardation</h4>
<ul>
<li><strong>Contango:</strong> los contratos lejanos cotizan más caros que el cercano. Es lo normal cuando mantener el activo cuesta dinero (almacenar crudo, financiar la posición). CL en contango: junio 78, septiembre 79,50, diciembre 80,80.</li>
<li><strong>Backwardation:</strong> los lejanos cotizan más baratos que el cercano. Señal de escasez presente: el mercado paga premio por tener el activo hoy. Suele verse en shocks de oferta.</li>
</ul>
<h4>Por qué te importa aunque seas intradía</h4>
<p>Si haces swing con futuros o replicas estrategias de mantener posición, el contango es un costo real: cada rollover en contango compras más caro lo mismo que tenías. Un contango del 2% trimestral son 8% anual de viento en contra: esa es la razón por la que los ETFs de futuros de crudo o volatilidad sangran valor con el tiempo aunque el activo "no baje". Y la estructura es información: un pase de contango a backwardation en crudo es de las señales de tensión de oferta más limpias del mercado.</p>
<h4>Error común</h4>
<p>Dejar una posición abierta hasta demasiado cerca del vencimiento. En contratos con entrega física como CL, un descuido puede dejarte en un mercado ilíquido con obligaciones que no quieres. Rola con el volumen, siempre.</p>`,
    claves: [
      "Opera siempre el contrato con más volumen",
      "El salto de precio entre contratos no es movimiento de mercado",
      "Contango: lejanos más caros; backwardation: escasez presente",
      "El contango es costo real para posiciones que rolan",
    ],
  };

  L["4-2-3"] = {
    resumen:
      "La sesión americana tiene estructura: apertura, rango inicial, horas muertas y cierre. Un plan intradía profesional para ES y NQ respeta esos ritmos y los datos macro.",
    duracionVideo: "12–15 min",
    lectura: `<p>Operar índices americanos intradía no es mirar velas de 5 minutos todo el día: es conocer la <strong>estructura de la sesión</strong> y concentrar el riesgo donde está el movimiento. El ES y el NQ tienen ritmos tan marcados que operarlos sin conocerlos es regalar ventaja.</p>
<h4>El mapa horario (hora del este de EE.UU.)</h4>
<ul>
<li><strong>9:30–10:30:</strong> apertura del contado. La hora con más volumen y volatilidad. Aquí se forma el <em>rango de apertura</em> (primeros 30–60 minutos), referencia del día: su ruptura o su falso quiebre son los setups clásicos de la mañana.</li>
<li><strong>10:00:</strong> datos macro frecuentes (ISM, confianza del consumidor). Movimientos violentos programados.</li>
<li><strong>11:30–13:30:</strong> el almuerzo. Volumen seco, rangos estrechos, trampas por todos lados. Los profesionales reducen tamaño o no operan.</li>
<li><strong>14:00:</strong> días de FOMC: la decisión de tasas mueve todo. Se opera después del polvo, no durante.</li>
<li><strong>15:00–16:00:</strong> la última hora. Rebalanceos institucionales y MOC (market on close): vuelve el volumen y aparecen tendencias de cierre.</li>
</ul>
<h4>Un plan tipo con números</h4>
<p>Supón NQ con rango de apertura 20.080–20.140. A las 10:15 el precio rompe arriba, regresa a testear 20.140, aparece absorción compradora sobre el nivel con el VWAP subiendo por debajo. Entrada 20.148, stop 20.118 (dentro del rango, 30 puntos = 60 dólares en MNQ), objetivo la extensión del rango en 20.200: 52 puntos. Si a las 11:30 el trade no resolvió, se gestiona o se cierra: el almuerzo degrada la probabilidad de continuación.</p>
<h4>Reglas de supervivencia</h4>
<ol>
<li>Calendario económico <strong>antes</strong> de la sesión: CPI, NFP y FOMC no se descubren con la posición abierta.</li>
<li>Uno o dos setups definidos por sesión. El intradía castiga la improvisación más que ningún otro estilo.</li>
<li>Límite de pérdida diario absoluto (por ejemplo 2R). Se toca, se apaga la pantalla. En futuros, una mala tarde sin freno hace el daño de un mal mes.</li>
</ol>
<h4>Error común</h4>
<p>Operar el almuerzo por aburrimiento. La estadística de casi cualquier sistema intradía en índices empeora entre 11:30 y 13:30. Estar sin operar también es una posición, y muchas veces la más rentable.</p>`,
    claves: [
      "La primera hora concentra el movimiento; el almuerzo lo seca",
      "El rango de apertura es la referencia estructural del día",
      "Calendario macro antes de sesión, nunca durante la posición",
      "Límite de pérdida diario: se toca y se apaga la pantalla",
    ],
  };

  /* ============ MÓDULO 3 · Opciones financieras ============ */

  L["4-3-0"] = {
    resumen:
      "Una opción separa el derecho de la obligación: el comprador paga prima por elegir; el vendedor cobra prima por comprometerse. Esa asimetría define todo el mundo de opciones.",
    duracionVideo: "10–13 min",
    lectura: `<p>Las opciones tienen fama de complejas, pero el concepto base cabe en una frase: <strong>el comprador de una opción compra un derecho; el vendedor asume una obligación</strong>. Todo lo demás (griegas, estrategias, spreads) son consecuencias de esa asimetría.</p>
<h4>Calls y puts, sin niebla</h4>
<ul>
<li><strong>Call:</strong> derecho a <em>comprar</em> el activo a un precio fijo (strike) hasta una fecha. La compras si esperas subida.</li>
<li><strong>Put:</strong> derecho a <em>vender</em> al strike hasta la fecha. La compras si esperas caída o quieres seguro.</li>
</ul>
<p>Por ese derecho pagas una <strong>prima</strong>. El vendedor cobra la prima y queda obligado: si el comprador ejerce, el vendedor de la call debe entregar el activo al strike y el de la put debe comprarlo al strike.</p>
<h4>Ejemplo numérico completo</h4>
<p>Una acción cotiza a 100 dólares. Compras una call strike 105 con vencimiento en 30 días pagando 2 dólares de prima (200 dólares, porque cada contrato controla 100 acciones).</p>
<ol>
<li><strong>La acción sube a 115:</strong> tu derecho a comprar a 105 vale al menos 10. Ganancia: 10 - 2 = 8 por acción, 800 dólares. Con 200 de inversión: +400%. La acción subió 15%.</li>
<li><strong>La acción queda en 104:</strong> tu call vence sin valor (nadie ejerce el derecho de comprar a 105 lo que vale 104). Pierdes los 200. La acción subió 4% y tú perdiste todo lo invertido en la opción.</li>
<li><strong>La acción cae a 90:</strong> pierdes los mismos 200, ni un dólar más. Ese es el límite de riesgo del comprador.</li>
</ol>
<p>Fíjate en el escenario 2: es la trampa. Puedes acertar la dirección y perder igual, porque no alcanzó el movimiento ni el tiempo. Las opciones no son una apuesta direccional simple: son una apuesta sobre dirección, magnitud <em>y</em> plazo, simultáneamente.</p>
<h4>La otra cara: el vendedor</h4>
<p>El vendedor de esa call cobró 200 dólares con probabilidad alta de quedárselos (la mayoría de las opciones fuera del dinero vencen sin valor), a cambio de un riesgo potencialmente grande si la acción vuela. Ingreso pequeño y frecuente contra pérdida rara y grande: es el perfil del negocio asegurador, y como todo asegurador, sobrevive solo si dimensiona el riesgo. Las estrategias de venta con riesgo controlado llegan en las próximas lecciones.</p>
<h4>Error común</h4>
<p>Comprar calls u puts muy fuera del dinero y muy cortas "porque son baratas". Son baratas porque casi nunca pagan: es comprar boletos de lotería con disfraz financiero. Precio bajo no es lo mismo que valor.</p>`,
    claves: [
      "Comprador: derecho y riesgo limitado a la prima",
      "Vendedor: obligación, prima cobrada y riesgo mayor",
      "Comprar opciones es apostar dirección, magnitud y plazo a la vez",
      "Puedes acertar la dirección y perder igual",
      "Barato no significa buen valor: la lotería también es barata",
    ],
  };

  L["4-3-1"] = {
    resumen:
      "Delta, gamma, theta y vega: cuatro medidas de sensibilidad que dicen cómo respira tu opción ante precio, tiempo y volatilidad. Sin matemáticas pesadas, con números útiles.",
    duracionVideo: "12–16 min",
    lectura: `<p>Las griegas asustan porque las presentan como cálculo avanzado. En la práctica son cuatro respuestas a cuatro preguntas simples sobre tu posición. Tu plataforma las calcula; tu trabajo es <em>leerlas</em>.</p>
<h4>Delta: ¿cuánto me muevo si el activo se mueve?</h4>
<p>Una call con delta 0,50 gana unos 50 centavos por cada dólar que sube el activo. Delta también funciona como probabilidad aproximada de vencer dentro del dinero: una opción delta 0,20 tiene alrededor de 20% de probabilidad de terminar con valor. Por eso las opciones lejanas son baratas: delta bajo, probabilidad baja.</p>
<h4>Gamma: ¿qué tan rápido cambia mi delta?</h4>
<p>Gamma es el acelerador. Cerca del strike y cerca del vencimiento, gamma es alta: tu delta pasa de 0,40 a 0,70 con un movimiento pequeño y la posición cambia de carácter en minutos. Comprador: gamma juega a tu favor cuando aciertas. Vendedor: gamma alta es la zona donde una posición tranquila se vuelve pesadilla. Regla práctica: la última semana de vida de una opción cerca del dinero es territorio de gamma, y se gestiona con más atención o no se está ahí.</p>
<h4>Theta: ¿cuánto me cuesta cada día?</h4>
<p>Las opciones pierden valor con el paso del tiempo. Una opción con theta -0,08 pierde 8 dólares por contrato cada día que el activo no se mueve. El decaimiento se acelera en los últimos 30–45 días. El comprador paga esa renta; el vendedor la cobra. Toda estrategia de ingreso por venta de opciones es, en esencia, un negocio de cobrar theta asumiendo riesgos definidos.</p>
<h4>Vega: ¿qué me hace la volatilidad?</h4>
<p>Vega mide la sensibilidad a la volatilidad implícita. Una opción con vega 0,12 gana 12 dólares por contrato si la volatilidad implícita sube un punto, la compres call o put. Consecuencia práctica famosa: comprar opciones justo antes de resultados corporativos suele salir mal aunque aciertes la dirección, porque tras el anuncio la volatilidad implícita se desploma (el famoso <em>crush</em>) y vega te quita lo que delta te dio.</p>
<h4>Ejemplo integrador</h4>
<p>Call strike 100, activo en 100, 30 días: delta 0,50, gamma 0,04, theta -0,05, vega 0,11, prima 3,00. El activo sube 2 dólares el mismo día: delta aporta +1,00, gamma suma un extra de +0,08, theta resta 0,05. Prima nueva aproximada: 4,03. Si además la volatilidad cayó 2 puntos: -0,22 de vega, prima 3,81. Las cuatro fuerzas actúan siempre juntas.</p>
<h4>Error común</h4>
<p>Mirar solo la dirección e ignorar theta y vega. La mayoría de los principiantes en opciones pierden sin que el activo les dé la contra: los desangra el tiempo y la volatilidad que no miraron.</p>`,
    claves: [
      "Delta: sensibilidad al precio y probabilidad aproximada",
      "Gamma alta cerca del strike y del vencimiento: máxima atención",
      "Theta es la renta diaria: el comprador la paga, el vendedor la cobra",
      "Vega castiga comprar volatilidad cara antes de eventos",
    ],
  };

  L["4-3-2"] = {
    resumen:
      "Covered calls y cash-secured puts: las dos estrategias de ingreso con las que las instituciones cobran prima con riesgo definido. Con sus números y su costo oculto.",
    duracionVideo: "11–14 min",
    lectura: `<p>Si theta es una renta, estas dos estrategias son las formas más sanas de cobrarla. Ambas venden opciones <strong>con respaldo</strong>: nunca venta descubierta, que en RIC tratamos como lo que es: riesgo ilimitado sin justificación para una cuenta personal.</p>
<h4>Covered call: cobrar alquiler por tus acciones</h4>
<p>Tienes 100 acciones compradas a 95, hoy cotizan 100. Vendes una call strike 105 a 30 días y cobras 1,50 (150 dólares). Escenarios:</p>
<ol>
<li><strong>La acción queda debajo de 105:</strong> la call vence sin valor. Te quedas las acciones y los 150 dólares. Repetible mes a mes: sobre 10.000 dólares de posición, 1,5% mensual de ingreso extra.</li>
<li><strong>La acción sube a 112:</strong> entregas las acciones a 105. Ganaste 10 de apreciación (95 a 105) más 1,50 de prima, pero renunciaste al tramo de 105 a 112. Ese es el costo real de la estrategia: <strong>techo a las subidas grandes</strong>.</li>
<li><strong>La acción cae a 88:</strong> la prima amortigua 1,50, nada más. La covered call no es cobertura: es ingreso con protección mínima.</li>
</ol>
<h4>Cash-secured put: cobrar por esperar tu precio</h4>
<p>Quieres comprar una acción que cotiza a 100, pero a 92. Vendes una put strike 92 a 30 días, cobras 1,20 (120 dólares) y mantienes 9.200 dólares en efectivo reservados. Escenarios:</p>
<ol>
<li><strong>La acción queda sobre 92:</strong> la put expira, te quedas los 120 y repites. Te pagaron por esperar el precio que igual querías.</li>
<li><strong>La acción cae a 89:</strong> compras a 92 (tu precio objetivo), con costo efectivo 90,80 por la prima. Compraste donde querías, con descuento.</li>
<li><strong>La acción se desploma a 70:</strong> compras a 92 algo que vale 70. La put no te protegió de elegir mal la empresa: solo cambió cómo entraste. Por eso la CSP se vende únicamente sobre activos que <em>realmente</em> quieres tener a ese precio.</li>
</ol>
<h4>La disciplina que sostiene ambas</h4>
<ul>
<li>Strikes con delta 0,20–0,30: prima razonable, probabilidad a favor.</li>
<li>Vencimientos de 30–45 días: la zona donde theta rinde más por unidad de riesgo.</li>
<li>Solo sobre activos de calidad que aceptarías mantener años. La prima jamás justifica el subyacente equivocado.</li>
</ul>
<h4>Error común</h4>
<p>Perseguir primas jugosas en acciones volátiles de moda. La prima alta es alta porque el riesgo lo es: terminar con 100 acciones de una empresa en caída libre cobrando 300 dólares de prima es el peor negocio del mercado.</p>`,
    claves: [
      "Covered call: ingreso mensual a cambio de techo en subidas",
      "CSP: te pagan por esperar el precio que ya querías",
      "Siempre con respaldo: la venta descubierta no se negocia",
      "La prima nunca justifica un subyacente que no quieres tener",
    ],
  };

  L["4-3-3"] = {
    resumen:
      "Los spreads definen el riesgo por construcción: verticales para dirección, iron condors para rango y puts protectoras para cubrir portafolio. Máx pérdida conocida antes de entrar.",
    duracionVideo: "12–16 min",
    lectura: `<p>Un <strong>spread</strong> combina opciones compradas y vendidas para que el riesgo quede definido por construcción: sabes la pérdida máxima antes de poner un dólar. Es el salto de "comprar lotería" o "vender con miedo" a estructurar posiciones como un profesional.</p>
<h4>Spread vertical: dirección con presupuesto</h4>
<p>Crees que una acción en 100 subirá moderadamente. Compras la call 100 por 3,00 y vendes la call 110 por 1,00. Costo neto: 2,00 (200 dólares). Máxima ganancia: la distancia entre strikes menos el costo, 10 - 2 = 8 (800 dólares) si cierra sobre 110. Máxima pérdida: los 200 del costo, pase lo que pase. La call vendida financia parte de la comprada y reduce el golpe de theta, a cambio de limitar la ganancia. El vertical de puts funciona en espejo para escenarios bajistas.</p>
<h4>Iron condor: cobrar por el rango</h4>
<p>El <strong>iron condor</strong> vende un vertical de puts abajo y un vertical de calls arriba: cuatro patas que cobran prima si el activo se queda en el rango. Ejemplo con el índice en 5.600: vendes la put 5.450 y compras la 5.400; vendes la call 5.750 y compras la 5.800. Cobras 12 puntos de prima total. Si al vencimiento el índice está entre 5.450 y 5.750, te quedas los 12. Máxima pérdida: el ancho del vertical menos la prima, 50 - 12 = 38, si el índice escapa con fuerza por cualquier lado.</p>
<p>Mira esa relación: arriesgas 38 por ganar 12. El condor gana seguido y pierde fuerte de vez en cuando: vive de que la probabilidad compense la asimetría. Funciona como negocio solo con gestión estricta: cerrar al 50% de la ganancia objetivo, ajustar o cortar cuando el precio ataca un lado, y jamás sostenerlo a través de eventos macro mayores.</p>
<h4>Protección de portafolio: la put como seguro</h4>
<p>Con un portafolio indexado de 100.000 dólares, comprar puts del índice 5% fuera del dinero a 3 meses puede costar alrededor de 1–1,5% del portafolio. En un desplome del 20%, esas puts recuperan una parte sustancial de la caída. Es un seguro: la mayoría de los trimestres pagas la prima y no pasa nada, y ese costo recurrente es exactamente lo que evalúas contra tu tolerancia real al drawdown. El collar (put comprada financiada con call vendida arriba) deja el seguro casi gratis a cambio de techo.</p>
<h4>Error común</h4>
<p>Elegir la estructura por la prima y no por la tesis. Primero decides qué crees: dirección moderada (vertical), rango (condor), miedo a la cola (put protectora). La estructura sirve a la tesis. Al revés, es coleccionar posiciones que no entiendes.</p>`,
    claves: [
      "Spread: pérdida máxima conocida por construcción",
      "Vertical: dirección moderada con costo definido",
      "Iron condor: gana seguido, pierde fuerte; exige gestión estricta",
      "La put protectora es un seguro con prima recurrente",
      "Primero la tesis, después la estructura",
    ],
  };

  /* ============ MÓDULO 4 · Cripto avanzado y on-chain ============ */

  L["4-4-0"] = {
    resumen:
      "La blockchain es un libro contable público: flujos hacia exchanges, comportamiento de holders y MVRV te dicen qué hace el dinero real, no lo que dice Twitter.",
    duracionVideo: "11–14 min",
    lectura: `<p>En acciones, los datos de posicionamiento institucional llegan tarde y filtrados. En cripto, la blockchain es un libro contable público en tiempo real: puedes ver cuántas monedas se mueven, hacia dónde y desde carteras de qué antigüedad. Eso es el <strong>análisis on-chain</strong>: leer lo que el dinero hace, no lo que dice.</p>
<h4>Flujos de exchanges: la intención de venta</h4>
<p>Una moneda dentro de un exchange está a un clic de venderse; en una wallet fría, no. Por eso los flujos importan:</p>
<ul>
<li><strong>Entradas netas grandes a exchanges:</strong> potencial presión vendedora. Picos de 30.000–50.000 BTC entrando en pocos días han precedido correcciones notables.</li>
<li><strong>Salidas netas sostenidas:</strong> acumulación con intención de mantener. Las reservas de BTC en exchanges llevan años en tendencia descendente, y sus aceleraciones acompañaron los grandes suelos.</li>
</ul>
<p>Regla de lectura: importa la <em>tendencia</em> del flujo, no un día suelto. Un movimiento interno entre wallets de un mismo exchange puede parecer una entrada gigante sin serlo.</p>
<h4>Holders: manos viejas y manos nuevas</h4>
<p>Las métricas de antigüedad separan a los <strong>holders de largo plazo</strong> (monedas sin moverse más de 155 días) de los de corto. El patrón histórico de los ciclos: los holders viejos acumulan en los suelos y distribuyen en la euforia; las manos nuevas hacen exactamente lo contrario. Cuando ves a las monedas de más de un año empezar a moverse masivamente tras una gran subida, la distribución está en marcha.</p>
<h4>MVRV: el termómetro de valoración</h4>
<p>El <strong>MVRV</strong> divide el valor de mercado entre el valor realizado (el precio promedio al que cada moneda se movió por última vez: el costo base agregado del mercado). Lectura histórica en BTC:</p>
<ol>
<li><strong>MVRV por debajo de 1:</strong> el mercado en conjunto está en pérdida. Zonas históricas de capitulación y suelo (2015, 2018, 2022).</li>
<li><strong>MVRV entre 1 y 2,5:</strong> terreno neutral a constructivo.</li>
<li><strong>MVRV sobre 3–3,5:</strong> el mercado promedio triplica su costo: euforia. Las cimas de ciclo han impreso valores extremos ahí.</li>
</ol>
<h4>Aplicación práctica y error común</h4>
<p>Usa on-chain como <strong>contexto de ciclo</strong>, no como señal de entrada: opera en marcos de semanas y meses. El error común es doble: usar métricas de ciclo para decisiones intradía, y tratar cada métrica como infalible cuando los datos tienen ruido (etiquetado imperfecto de wallets, movimientos internos). Tres métricas apuntando en la misma dirección valen más que una en extremo.</p>`,
    claves: [
      "La blockchain muestra lo que el dinero hace, no lo que dice",
      "Entradas a exchanges: intención de venta; salidas: acumulación",
      "MVRV bajo 1: capitulación histórica; sobre 3: euforia",
      "On-chain es contexto de ciclo, no señal intradía",
    ],
  };

  L["4-4-1"] = {
    resumen:
      "DeFi paga rendimientos reales con riesgos reales: contratos hackeables, pérdida impermanente y APYs insostenibles. Aprende de dónde sale el rendimiento antes de buscarlo.",
    duracionVideo: "12–15 min",
    lectura: `<p>DeFi (finanzas descentralizadas) replica servicios financieros (préstamos, intercambio, rendimiento) con contratos inteligentes, sin intermediario. Los rendimientos son reales. Los riesgos también, y en RIC se estudian primero.</p>
<h4>De dónde sale el rendimiento</h4>
<ul>
<li><strong>Staking:</strong> bloqueas monedas para asegurar una red proof-of-stake y cobras emisión y comisiones. En ETH, históricamente en el rango del 3–5% anual. Es el rendimiento más explicable de cripto.</li>
<li><strong>Liquidity pools:</strong> depositas dos activos en un intercambiador automático (por ejemplo, un pool ETH/USDC) y cobras parte de las comisiones de cada intercambio.</li>
<li><strong>Préstamos:</strong> depositas en protocolos de crédito colateralizado y cobras el interés que pagan los prestatarios.</li>
</ul>
<p>Regla central: si no puedes explicar <strong>quién paga</strong> ese rendimiento y por qué, el que paga probablemente seas tú. Un APY de 80% sostenido por la emisión del propio token del protocolo es una dilución disfrazada de ganancia: el token que te pagan se deprecia más rápido de lo que cobras.</p>
<h4>Pérdida impermanente: el costo escondido de los pools</h4>
<p>Ejemplo numérico: depositas 1 ETH (a 2.000) y 2.000 USDC en un pool. ETH sube a 4.000. El pool rebalancea automáticamente: al retirar tienes aproximadamente 0,707 ETH y 2.828 USDC, unos 5.657 dólares. Si simplemente hubieras mantenido, tendrías 6.000. Esa diferencia de 343 dólares (5,7%) es la <strong>pérdida impermanente</strong>: el costo de proveer liquidez cuando los precios divergen. Las comisiones cobradas deben superarla para que el pool tenga sentido; muchas veces no lo hacen.</p>
<h4>El riesgo mayor: el contrato y el protocolo</h4>
<p>En DeFi tu contraparte es código. La historia es elocuente: miles de millones de dólares perdidos en hacks de protocolos y puentes entre cadenas (los puentes concentran los mayores robos de la historia cripto: casos individuales superaron los 500 millones de dólares). A eso se suman rug pulls (el equipo desaparece con los fondos), exploits de oráculos de precios y stablecoins que perdieron la paridad, con el colapso de la stablecoin algorítmica de Terra en 2022 como caso de estudio: decenas de miles de millones evaporados en una semana.</p>
<h4>Reglas RIC para DeFi</h4>
<ol>
<li>Solo protocolos con años de historia, auditorías múltiples y valor bloqueado alto. Y aun así: son reducción de riesgo, no garantía.</li>
<li>DeFi es capital satélite: un porcentaje pequeño de tu cripto, que a su vez es una parte de tu portafolio.</li>
<li>APY de dos o tres dígitos = pregunta obligatoria: ¿quién paga esto? Sin respuesta clara, no hay depósito.</li>
</ol>
<p>El error común: perseguir el rendimiento más alto como si fuera un plazo fijo. En DeFi, el rendimiento es el precio del riesgo que otros no quieren.</p>`,
    claves: [
      "Si no sabes quién paga el rendimiento, lo pagas tú",
      "Pérdida impermanente: el pool te deja peor que mantener si los precios divergen",
      "Los hacks de protocolos y puentes suman miles de millones",
      "DeFi solo con capital satélite y protocolos auditados con historia",
    ],
  };

  L["4-4-2"] = {
    resumen:
      "El ciclo cripto tiene anatomía: halving, rotación BTC-altcoins y dominancia como brújula. Las narrativas mueven capital de forma reflexiva y terminan siempre igual: en exceso.",
    duracionVideo: "10–13 min",
    lectura: `<p>Cripto se mueve por ciclos con una anatomía sorprendentemente repetida. Conocerla no te da fechas, pero te da un mapa: saber en qué fase estás cambia qué haces con tu capital.</p>
<h4>El halving como metrónomo</h4>
<p>Cada cuatro años aproximadamente, la recompensa por bloque de Bitcoin se corta a la mitad (2012, 2016, 2020, 2024): la emisión nueva se reduce de golpe. Los tres ciclos completos anteriores compartieron patrón: acumulación tras el desplome, halving, expansión que acelera hasta la euforia 12–18 meses después, y contracción del 70–85% desde máximos. Advertencia estadística seria: son <strong>tres muestras</strong>. Tres casos no son una ley; son un patrón a vigilar con rendimientos decrecientes visibles en cada ciclo (cada uno con múltiplos menores que el anterior).</p>
<h4>Dominancia BTC y la rotación del capital</h4>
<p>La <strong>dominancia</strong> es el porcentaje de la capitalización cripto total que representa Bitcoin. Es la brújula de la rotación clásica del capital dentro del ciclo:</p>
<ol>
<li>El capital entra primero a BTC: la dominancia sube mientras BTC lidera.</li>
<li>BTC se estabiliza y el capital rota a ETH y las grandes altcoins: la dominancia empieza a caer.</li>
<li>Fase final: el capital baja por la curva de riesgo hacia monedas cada vez más especulativas. La <strong>altseason</strong>: dominancia cayendo con fuerza mientras todo lo pequeño multiplica.</li>
</ol>
<p>Esa fase final es simultáneamente la más rentable y la señal de que el ciclo madura: cuando lo más especulativo lidera, el techo históricamente no queda lejos.</p>
<h4>Narrativas: la reflexividad en estado puro</h4>
<p>Cada ciclo tiene sus historias dominantes: ICOs en 2017; DeFi y NFTs en 2020–2021; inteligencia artificial, activos tokenizados y memecoins en el ciclo reciente. La mecánica es reflexiva: la narrativa atrae capital, el capital sube precios, los precios "confirman" la narrativa y atraen más capital. Funciona de verdad durante meses, y termina siempre igual: el precio se despega tanto del uso real que la estructura colapsa sobre los últimos en entrar. La narrativa es un vehículo de capital, no una tesis de inversión permanente.</p>
<h4>Aplicación práctica</h4>
<ul>
<li>Define tu mapa de ciclo con datos (halving, dominancia, MVRV de la primera lección) y ajústale exposición: más agresivo en acumulación, tomas de ganancia programadas en euforia.</li>
<li>Plan de salida <em>escrito antes</em> de la altseason: en euforia, tu cerebro es el peor gestor disponible.</li>
</ul>
<p>Error común: extrapolar el ciclo anterior tal cual ("BTC hará x20 porque la vez pasada lo hizo"). Cada ciclo rinde menos que el anterior y los actores cambian: el mapa orienta, no promete.</p>`,
    claves: [
      "Tres ciclos son un patrón, no una ley",
      "La dominancia BTC es la brújula de la rotación de capital",
      "Altseason: máxima ganancia y señal de ciclo maduro a la vez",
      "Plan de salida escrito antes de la euforia, no durante",
    ],
  };

  L["4-4-3"] = {
    resumen:
      "Sin tus llaves, no son tus monedas: hardware wallet, respaldo físico de la semilla y protocolo antiphishing. La autocustodia es una responsabilidad operativa, no un eslogan.",
    duracionVideo: "10–13 min",
    lectura: `<p>La historia cripto tiene un cementerio de exchanges: Mt. Gox, FTX y decenas más. Millones de usuarios aprendieron de golpe la regla número uno: <strong>si no tienes las llaves, no son tus monedas</strong>; son una promesa del exchange, y las promesas quiebran. La autocustodia elimina el riesgo de contraparte y te transfiere a ti toda la responsabilidad operativa. Este es el manual mínimo.</p>
<h4>La arquitectura correcta</h4>
<ul>
<li><strong>Hardware wallet</strong> (dispositivo físico dedicado) para el capital serio: las llaves privadas nunca tocan un equipo conectado a internet. Se compra únicamente al fabricante oficial, jamás usada ni de terceros.</li>
<li><strong>Hot wallet</strong> (extensión o app) solo con montos pequeños para operar e interactuar.</li>
<li><strong>Exchange:</strong> el saldo mínimo necesario para operar, y nada más.</li>
</ul>
<h4>La semilla: el punto único de fallo</h4>
<p>Las 12 o 24 palabras de recuperación SON tus fondos: quien las tiene, tiene todo; quien las pierde, pierde todo. Reglas absolutas:</p>
<ol>
<li>Se escriben en físico (papel o placa metálica resistente al fuego), mínimo dos copias en ubicaciones separadas.</li>
<li>Jamás en digital: ni foto, ni nota en la nube, ni gestor de contraseñas, ni correo a ti mismo. Un solo malware con acceso a tu galería y se acabó.</li>
<li>Nadie legítimo te pedirá la semilla nunca: ni "soporte técnico", ni una app de "validación", ni un airdrop. Quien la pide, roba. Sin excepciones.</li>
</ol>
<h4>El enemigo real: el phishing y la firma ciega</h4>
<p>La mayoría de las pérdidas individuales no vienen de hackeos sofisticados sino de ingeniería social: sitios clonados con URLs casi idénticas, falsos airdrops que piden "conectar y firmar", y la <strong>firma maliciosa</strong>: apruebas una transacción que en realidad otorga permiso para vaciar tu wallet. Protocolo defensivo: verificar siempre en la pantalla del hardware wallet qué estás firmando, usar wallets separadas para experimentar en DeFi y para custodiar, y revocar periódicamente los permisos otorgados a contratos con herramientas de revocación.</p>
<h4>El plan de herencia</h4>
<p>El punto que casi nadie resuelve: si te pasa algo, ¿tu familia puede recuperar los fondos? Un capital en autocustodia sin plan de acceso para herederos es capital destinado a perderse. Deja instrucciones seguras (por ejemplo, ubicación de las copias de la semilla en instrucciones legales selladas) sin comprometer la seguridad en vida.</p>
<h4>Error común</h4>
<p>Pasar todo a autocustodia en un solo día, sin práctica, y equivocarse en el proceso. Primero una prueba con un monto pequeño: enviar, restaurar la wallet desde la semilla en un dispositivo limpio, verificar, y recién entonces migrar el capital por partes.</p>`,
    claves: [
      "Sin tus llaves, tus monedas son una promesa de un tercero",
      "La semilla jamás en digital: ni foto, ni nube, ni gestor",
      "Quien te pide la semilla, te roba: sin excepciones",
      "Verifica cada firma en la pantalla del dispositivo",
      "Prueba la restauración con monto pequeño antes de migrar todo",
    ],
  };

  /* ============ MÓDULO 5 · Macro trading y portafolios ============ */

  L["4-5-0"] = {
    resumen:
      "Bonos, dólar, commodities y acciones son un solo sistema conectado por las tasas. El análisis intermarket te dice si tu trade rema a favor o en contra de la marea global.",
    duracionVideo: "12–15 min",
    lectura: `<p>Ningún mercado se mueve solo. Bonos, dólar, commodities y acciones forman un sistema de vasos comunicantes cuyo motor central son las <strong>tasas de interés</strong>. El análisis intermarket no predice: te dice si tu operación rema a favor o en contra de la marea.</p>
<h4>El motor: los bonos y sus rendimientos</h4>
<p>El rendimiento del bono del Tesoro americano a 10 años es el precio del dinero a largo plazo, la referencia contra la que se valora todo lo demás. Regla base: precio del bono y rendimiento se mueven al revés. Cuando el rendimiento sube con fuerza, los activos de larga duración sufren: las tecnológicas (cuyo valor está en flujos lejanos) caen más que el mercado, y el oro (que no paga interés) compite peor contra un bono que rinde 5% que contra uno que rinde 1%... salvo que la inflación corra más rápido que la tasa: lo que importa al oro es la <strong>tasa real</strong> (nominal menos inflación).</p>
<h4>El dólar: la contracara de todo</h4>
<p>El índice dólar (DXY) mide el dólar contra las grandes divisas. Dólar fuerte: presión bajista sobre commodities (cotizan en dólares: más caro para el resto del mundo), sobre el oro y sobre los mercados emergentes endeudados en dólares. Dólar débil: viento de cola para todos ellos. Por eso un largo en oro con el DXY rompiendo máximos y las tasas reales subiendo es remar contra dos corrientes a la vez.</p>
<h4>Los regímenes: qué funciona en cada clima</h4>
<ol>
<li><strong>Crecimiento con inflación baja:</strong> acciones lideran, bonos estables. El régimen ideal.</li>
<li><strong>Inflación alta con bancos centrales subiendo tasas:</strong> sufren acciones Y bonos a la vez (2022: el portafolio clásico 60/40 perdió más de 15% porque sus dos patas cayeron juntas). Gana la energía, el dólar, el efectivo remunerado.</li>
<li><strong>Recesión con tasas bajando:</strong> bonos largos brillan, acciones defensivas aguantan, commodities cíclicos sufren.</li>
</ol>
<h4>Aplicación práctica</h4>
<p>Chequeo intermarket semanal de cuatro lecturas: dirección del rendimiento a 10 años, tendencia del DXY, cobre contra oro (apetito por crecimiento) y amplitud del mercado de acciones. Quince minutos que responden una sola pregunta: ¿en qué régimen estoy y mi exposición lo respeta?</p>
<h4>Error común</h4>
<p>Usar correlaciones como leyes fijas. Las relaciones intermarket cambian según el régimen: en 2022, bonos y acciones cayeron juntos y "la cobertura clásica" no cubrió nada. Las correlaciones son estados del clima, no constantes físicas: revísalas, no las recites.</p>`,
    claves: [
      "Las tasas son el motor; el 10 años es la referencia de todo",
      "Dólar fuerte aprieta commodities, oro y emergentes",
      "Al oro lo mueve la tasa real, no la nominal",
      "Las correlaciones son estados del clima, no leyes",
    ],
  };

  L["4-5-1"] = {
    resumen:
      "Núcleo indexado y aburrido que asegura tu futuro; satélites acotados donde cabe tu ventaja: trading, cripto, apuestas temáticas. Cada capital con su trabajo.",
    duracionVideo: "10–13 min",
    lectura: `<p>A esta altura del programa operas varios instrumentos. La pregunta ya no es "qué compro" sino <strong>cómo se organiza todo tu capital</strong>. La respuesta profesional es la arquitectura núcleo-satélite: cada peso con un trabajo asignado.</p>
<h4>El núcleo: 70–90% del capital invertible</h4>
<p>El núcleo es deliberadamente aburrido: fondos indexados globales o regionales de bajo costo, bonos según tu edad y horizonte, quizá algo de oro como diversificador. Su trabajo es capturar el rendimiento de los mercados a largo plazo con costos mínimos y sin depender de que aciertes nada. No se toca por titulares, no se rota por narrativas, no se "mejora" cada mes. La evidencia de décadas es incómoda pero clara: la mayoría de los gestores profesionales no le gana al índice a 10 años; tu núcleo no intenta ganarle, intenta serlo.</p>
<h4>Los satélites: 10–30%, donde vive tu ventaja</h4>
<p>Los satélites son posiciones activas con tesis propia: tu cuenta de trading, tu exposición cripto, una apuesta sectorial o temática. Reglas de convivencia:</p>
<ol>
<li>Cada satélite tiene tamaño máximo asignado <em>por adelantado</em>. Si tu cuenta de trading es el 10% del capital y se duplica, el excedente rota al núcleo: la ganancia especulativa se consolida en patrimonio.</li>
<li>Cada satélite tiene tesis escrita y condición de salida. "Me gusta" no es una tesis.</li>
<li>Un satélite puede irse a cero sin comprometer tu plan de vida. Si no puede, es demasiado grande.</li>
</ol>
<h4>Ejemplo numérico</h4>
<p>Capital invertible: 50.000 dólares. Núcleo 80%: 40.000 (30.000 en indexados globales, 7.000 en bonos, 3.000 en oro). Satélites 20%: 6.000 en tu cuenta de trading de futuros, 3.000 en BTC/ETH en autocustodia, 1.000 en DeFi experimental. Si el trading rinde 50% en el año (+3.000), unos 2.000 rotan al núcleo y la cuenta vuelve a su tamaño asignado. El sistema convierte rachas buenas en patrimonio permanente, y una racha mala en un problema acotado del 12% del capital, no en una crisis familiar.</p>
<h4>Por qué esta estructura te hace mejor trader</h4>
<p>Porque le quita al trading el peso de "tener que funcionar". Con el futuro asegurado por el núcleo, la cuenta de trading puede operar su plan sin desesperación, y la desesperación es la madre de todas las violaciones de sistema que estudiaste en niveles anteriores.</p>
<h4>Error común</h4>
<p>Invertir la pirámide: 80% en apuestas activas "porque el índice es lento", 20% en serio. Es la arquitectura del jugador, no la del inversor. El aburrimiento del núcleo es una característica, no un defecto.</p>`,
    claves: [
      "Núcleo 70–90%: indexado, barato, intocable por titulares",
      "Cada satélite: tamaño máximo, tesis escrita y salida definida",
      "Las ganancias de satélites rotan al núcleo y se vuelven patrimonio",
      "El núcleo asegura tu futuro para que el trading no lo cargue",
    ],
  };

  L["4-5-2"] = {
    resumen:
      "El rebalanceo vende caro y compra barato por sistema, y la correlación real define tu exposición total. Tu riesgo agregado puede ser una sola apuesta disfrazada de diversificación.",
    duracionVideo: "10–13 min",
    lectura: `<p>Diseñar el portafolio es la mitad del trabajo. La otra mitad es mantenerlo: sin mantenimiento, los pesos derivan, la diversificación se degrada y terminas concentrado sin haberlo decidido.</p>
<h4>Rebalanceo: disciplina que compra barato y vende caro</h4>
<p>Tu asignación objetivo era 60% acciones / 25% bonos / 15% oro y satélites. Tras un año alcista de acciones, el portafolio real es 72/18/10: estás más expuesto a acciones que nunca, exactamente cuando ya subieron. Rebalancear es volver a los pesos objetivo: vender parte de lo que subió y comprar lo que quedó atrás. Es el único mecanismo que te obliga <em>estructuralmente</em> a vender caro y comprar barato, sin opinar ni predecir.</p>
<p>Dos métodos válidos: por calendario (una o dos veces al año, simple y suficiente) o por bandas (rebalanceas cuando un activo se desvía más de un umbral, por ejemplo 5 puntos porcentuales de su objetivo). Las bandas responden mejor a movimientos grandes; el calendario es más fácil de cumplir. Elige uno y cúmplelo: el peor método es "cuando me acuerde". Considera el costo fiscal de vender en tu país (módulo siguiente): a veces conviene rebalancear dirigiendo los aportes nuevos hacia lo rezagado en vez de vender.</p>
<h4>Correlación: la diversificación de verdad</h4>
<p>Tener veinte posiciones no es diversificar si todas se mueven juntas. La correlación mide eso: +1 es moverse idéntico, 0 es independencia, -1 es espejo. La trampa del alumno de Nivel 4: cuenta de trading en NQ, acciones tecnológicas en el núcleo, BTC en satélite. En calma parecen tres cosas; en un shock de tasas, las tres caen juntas: la correlación entre Nasdaq y BTC en momentos de estrés ha superado 0,8. Tenías una sola apuesta (activos de larga duración sensibles a tasas) disfrazada de tres.</p>
<h4>Exposición agregada: la cifra que nadie calcula</h4>
<p>Ejercicio obligatorio del nivel: suma tu exposición <em>real</em> por factor, no por cuenta. ¿Cuánto de tu patrimonio total sube o baja si las tasas americanas suben un punto? ¿Si el dólar se fortalece 10%? ¿Si las tecnológicas caen 20%? Si una sola respuesta supera el nivel que tu plan tolera, estás concentrado, tengas las cuentas que tengas.</p>
<h4>Error común</h4>
<p>No rebalancear en las subidas "para dejar correr" y tampoco en las caídas "hasta que recupere". El rebalanceo funciona precisamente porque se ejecuta cuando emocionalmente no dan ganas: es la sistematización del comportamiento contraintuitivo correcto.</p>`,
    claves: [
      "Rebalancear vende caro y compra barato por sistema, sin opinar",
      "Calendario o bandas: el peor método es cuando me acuerde",
      "Veinte posiciones correlacionadas son una sola apuesta",
      "Mide tu exposición agregada por factor, no por cuenta",
    ],
  };

  L["4-5-3"] = {
    resumen:
      "2008, 2020 y 2022: tres crisis, tres mecánicas distintas. Qué coberturas funcionaron en cada una, qué costó tenerlas y por qué la liquidez es la única constante.",
    duracionVideo: "13–17 min",
    lectura: `<p>La cobertura se entiende de verdad estudiando crisis reales. Tres casos, tres mecánicas distintas, y una lección incómoda: <strong>no existe la cobertura universal</strong>: cada crisis castiga a un portafolio distinto.</p>
<h4>2008: crisis de crédito, lenta y profunda</h4>
<p>El S&amp;P cayó más de 50% en 17 meses. Qué cubrió: los bonos del Tesoro largos (subieron con fuerza mientras todo caía: la huida a la calidad clásica), el dólar y las puts compradas con antelación. Qué no cubrió: la diversificación por geografía y por sector (todo cayó junto: en pánico, las correlaciones van a 1) y hasta el oro en la fase aguda, porque los apalancados venden <em>lo que pueden vender</em>, no lo que quieren vender, para cubrir margin calls. Lección: en pánico agudo, la liquidez manda; la tesis espera.</p>
<h4>2020: crisis relámpago</h4>
<p>Marzo de 2020: -34% en 23 sesiones, la caída más rápida de la historia; recuperación en meses por la respuesta monetaria y fiscal masiva. Qué cubrió: las puts (la volatilidad implícita explotó: quien tenía seguros comprados baratos multiplicó su valor), los Treasuries otra vez, y sobre todo <strong>tener efectivo y un plan de compras</strong>. Qué enseñó: la velocidad. Quien quiso cubrirse "cuando lo vio venir" compró seguros a precio de incendio: la cobertura reactiva es carísima. El seguro se compra antes.</p>
<h4>2022: el año que rompió el manual</h4>
<p>Inflación y subidas de tasas agresivas: acciones -19% (Nasdaq -33%) y, la sorpresa histórica, los bonos largos -30% o peor. El 60/40 vivió uno de sus peores años en un siglo: la pata que debía cubrir fue la que más cayó, porque la crisis era <em>de tasas</em>, el factor al que ambos lados estaban expuestos. Qué funcionó: energía y commodities, dólar fuerte, efectivo remunerado y estrategias que siguen tendencias. Lección mayor del módulo: identifica a qué factor está expuesto tu portafolio entero; tu cobertura debe cubrir <strong>ese</strong> factor, no la última crisis.</p>
<h4>El kit de cobertura realista</h4>
<ol>
<li><strong>Efectivo remunerado:</strong> la cobertura más simple: no cae y compra los pánicos de otros.</li>
<li><strong>Puts sobre índices:</strong> protección explícita con costo recurrente conocido (módulo de opciones).</li>
<li><strong>Diversificación por factor:</strong> algo que gane con inflación (commodities), algo que gane con recesión (duración), algo que gane con miedo (dólar, oro).</li>
<li><strong>Tamaño correcto:</strong> la mejor cobertura sigue siendo no estar sobreexpuesto.</li>
</ol>
<h4>Error común</h4>
<p>Cubrirse contra la crisis anterior. Después de 2008 todos temían al crédito; llegó 2022 y el golpe vino por las tasas. La pregunta correcta nunca es "¿cómo me cubro?" sino "¿de qué exactamente me estoy cubriendo y cuánto pago por ello?".</p>`,
    claves: [
      "En pánico agudo las correlaciones van a 1 y la liquidez manda",
      "El seguro se compra antes del incendio, no durante",
      "2022: la cobertura clásica falló porque la crisis era de tasas",
      "Cubre el factor al que estás expuesto, no la crisis anterior",
      "El efectivo remunerado es la cobertura más subestimada",
    ],
  };

  /* ============ MÓDULO 6 · Fiscalidad y estructura patrimonial LATAM ============ */

  L["4-6-0"] = {
    resumen:
      "Cada país LATAM grava el trading distinto: renta financiera, ganancias de capital, residencia fiscal. Principios generales para ordenar tu situación. No es asesoría fiscal.",
    duracionVideo: "13–16 min",
    lectura: `<p>Aclaración antes de todo: <strong>esto no es asesoría fiscal</strong>. Las normas cambian por país, por año y por situación personal; lo que sigue son principios generales vigentes en términos amplios, y la decisión final se toma con un contador especialista en tu jurisdicción. Lo que sí es responsabilidad tuya desde hoy: entender el mapa para hacerle a ese contador las preguntas correctas.</p>
<h4>El principio universal</h4>
<p>Casi toda LATAM grava a sus residentes fiscales por <strong>renta mundial</strong>: lo que ganes en un broker de EE.UU. o en un exchange cripto también tributa en tu país. "No me lo depositaron en mi banco local" no es un criterio fiscal: la ganancia se genera cuando vendes con beneficio (y en varios regímenes, la tenencia misma también cuenta para impuestos patrimoniales).</p>
<h4>El mapa por país, a grandes rasgos</h4>
<ul>
<li><strong>Argentina:</strong> el resultado de activos del exterior tributa en la escala de renta financiera; existe además el impuesto sobre los Bienes Personales por tenencias (locales y del exterior) sobre ciertos mínimos. Los instrumentos locales tienen exenciones específicas. País de alta complejidad y cambios frecuentes: contador obligatorio.</li>
<li><strong>México:</strong> ganancias de bolsa local con retención reducida sobre la ganancia; los ingresos del extranjero se acumulan a tu declaración anual. El SAT ha aumentado la fiscalización de brokers y cripto.</li>
<li><strong>Colombia:</strong> las ganancias van a renta ordinaria o a ganancia ocasional según el caso; la tenencia de activos en el exterior sobre ciertos umbrales se informa en declaración específica.</li>
<li><strong>Chile:</strong> las ganancias de capital del exterior tributan; los instrumentos locales con presencia bursátil gozan de tratamientos preferentes.</li>
<li><strong>Perú:</strong> ganancias de capital de fuente extranjera se suman a rentas del trabajo o tributan como renta de fuente extranjera según el caso; la tasa de segunda categoría local es relativamente baja.</li>
</ul>
<h4>Los tres conceptos que ordenan todo</h4>
<ol>
<li><strong>Residencia fiscal:</strong> define qué país te grava. No es la nacionalidad ni el pasaporte: son criterios de permanencia y centro de intereses vitales.</li>
<li><strong>Hecho imponible:</strong> qué evento dispara el impuesto (venta con ganancia, cobro de dividendo, tenencia al 31 de diciembre). Conocerlo te permite planificar cuándo realizar ganancias.</li>
<li><strong>Registro:</strong> sin un registro limpio de operaciones (fechas, montos, tipo de cambio) no puedes ni declarar bien ni defenderte bien. Tu diario de trading gana una segunda función.</li>
</ol>
<h4>Error común</h4>
<p>Los dos extremos: ignorar el tema "porque nadie declara" (la información bancaria internacional se intercambia automáticamente entre más de cien países: la opacidad de antes ya no existe) y el pánico paralizante. La vía correcta es aburrida: registro ordenado, contador especializado, declaración correcta. El costo fiscal es un costo del negocio; el costo de evadir es el negocio entero.</p>`,
    claves: [
      "Residencia fiscal por renta mundial: lo del exterior también tributa",
      "Cada país tiene hecho imponible y tasas propias: contador local",
      "El intercambio automático de información acabó con la opacidad",
      "Registro limpio de operaciones: tu primera defensa fiscal",
      "Esto es mapa general, no asesoría: la norma cambia por país y por año",
    ],
  };

  L["4-6-1"] = {
    resumen:
      "Operar con broker internacional es legal en casi toda LATAM; lo que existe es la obligación de declarar. Elección del broker, protección del cliente y reportes de cuentas.",
    duracionVideo: "10–13 min",
    lectura: `<p>Mito frecuente: "tener cuenta en un broker de afuera es ilegal". En casi toda LATAM es perfectamente legal; lo que existe es la <strong>obligación de declararla</strong> según las reglas de tu país. Confundir ambas cosas lleva a decisiones malas en las dos direcciones.</p>
<h4>Elegir jurisdicción y broker: qué mirar de verdad</h4>
<ol>
<li><strong>Regulación real:</strong> un broker regulado en EE.UU. (SEC/FINRA) o Reino Unido/UE ofrece protecciones concretas. En EE.UU., el esquema SIPC protege valores del cliente hasta 500.000 dólares <em>ante la quiebra del broker</em> (no ante pérdidas de mercado, que son tuyas). Un broker "regulado" en una isla sin supervisión efectiva ofrece un PDF con sellos.</li>
<li><strong>Segregación de fondos:</strong> tus activos deben estar separados del balance del broker. Es la diferencia entre ser cliente y ser acreedor cuando algo sale mal: la lección de FTX aplica también al mundo tradicional.</li>
<li><strong>Costos totales:</strong> comisión visible más spread, cambio de divisa, mantenimiento e inactividad, y costo de retiro internacional. Un broker "sin comisiones" puede ser más caro que uno con comisión de 1 dólar y buen tipo de cambio.</li>
<li><strong>Acceso operativo:</strong> que ofrezca los instrumentos de este nivel: futuros y micros, opciones, y buena ejecución.</li>
</ol>
<h4>El reporte de cuentas: cómo funciona el mundo hoy</h4>
<p>Más de cien países intercambian información financiera automáticamente bajo el estándar CRS; EE.UU. opera su propio régimen (FATCA). Traducción práctica: tu banco o broker del exterior puede reportar tu saldo a tu país de residencia fiscal sin preguntarte. En paralelo, tu país probablemente exige declarar cuentas y tenencias del exterior sobre ciertos umbrales (declaraciones informativas de activos en el exterior, además del impuesto que corresponda). La estrategia de "cuenta silenciosa afuera" es una bomba de tiempo con intereses y multas acumulándose.</p>
<h4>Flujo de fondos: el eslabón operativo</h4>
<p>Piensa el circuito completo antes de abrir la cuenta: cómo fondeas (transferencia internacional, rieles locales, stablecoins donde sea legal y declarable), qué cuesta cada tramo y cómo repatrías ganancias. Un rendimiento de 15% anual pierde brillo si mover el dinero cuesta 4% entre comisiones y tipos de cambio. Documenta cada transferencia: el origen de fondos te lo van a preguntar, y la respuesta correcta es un papel, no un relato.</p>
<h4>Error común</h4>
<p>Elegir broker por publicidad de influencers o por bonos de bienvenida. Los criterios son regulación, segregación, costos totales y acceso: todo lo demás es marketing. Y el segundo error: abrir cinco cuentas "para diversificar" y perder el control del registro. Dos brokers buenos y bien documentados superan a cinco a medias.</p>`,
    claves: [
      "Tener broker afuera es legal; no declararlo es el problema",
      "Regulación real y segregación de fondos: los dos filtros duros",
      "CRS y FATCA: tu saldo viaja a tu fisco automáticamente",
      "Documenta el circuito completo: fondeo, costos y repatriación",
    ],
  };

  L["4-6-2"] = {
    resumen:
      "Una sociedad tiene sentido con volumen, actividad real y objetivo claro: protección, deducciones o sucesión. Para la mayoría, llega más tarde de lo que el marketing sugiere.",
    duracionVideo: "10–13 min",
    lectura: `<p>En algún momento todo trader rentable escucha el canto de sirena: "ábrete una LLC y dejas de pagar impuestos". La realidad es más aburrida y más útil: una estructura societaria es una herramienta con costos y beneficios concretos, que conviene en casos específicos y sobra en la mayoría. Como siempre en este módulo: <strong>decisión final con especialistas</strong> en tu país; esto es el mapa para esa conversación.</p>
<h4>Qué puede aportar una sociedad (cuando aplica)</h4>
<ul>
<li><strong>Separación patrimonial:</strong> aislar la actividad de riesgo de tu patrimonio personal y familiar.</li>
<li><strong>Deducciones:</strong> una actividad organizada como empresa puede deducir gastos reales del negocio (datos, plataformas, equipos, formación) que como persona física suelen no ser deducibles.</li>
<li><strong>Diferimiento:</strong> en algunos regímenes, la ganancia retenida en la sociedad tributa a tasa corporativa y el impuesto personal se difiere hasta distribuir dividendos: útil si reinviertes sistemáticamente.</li>
<li><strong>Sucesión:</strong> transferir participaciones de una sociedad suele ser más ordenado que heredar veinte cuentas sueltas en tres países.</li>
</ul>
<h4>Lo que el marketing omite</h4>
<ol>
<li><strong>Costos fijos reales:</strong> constitución, contabilidad anual, agentes registrados, presentaciones. Una estructura internacional seria cuesta desde cientos hasta varios miles de dólares al año. Contra una ganancia anual de 10.000, no hay matemática que cierre.</li>
<li><strong>Las reglas antidiferimiento:</strong> la mayoría de los países LATAM tienen normas de transparencia fiscal internacional: si tu sociedad extranjera solo tiene rentas pasivas (trading incluido), el fisco puede atribuirte la ganancia como si fuera tuya directa, sociedad o no. La LLC mágica que "no paga impuestos" suele ser simplemente una LLC mal declarada.</li>
<li><strong>Sustancia:</strong> una sociedad de papel sin actividad real, oficina ni decisiones tomadas donde dice operar es cada vez más fácil de impugnar.</li>
</ol>
<h4>La regla práctica RIC</h4>
<p>Una estructura empieza a discutirse en serio cuando se cumplen dos o tres de estas: la actividad genera ingresos consistentes comparables a un negocio real; hay empleados, socios o capital de terceros; el objetivo principal es protección u orden sucesorio (no "pagar cero"); y el ahorro fiscal proyectado supera con claridad los costos fijos y de cumplimiento. Si tu única motivación es la tasa, probablemente la respuesta sea todavía no.</p>
<h4>Error común</h4>
<p>Comprar estructuras por video de YouTube: la LLC de Delaware o New Mexico como amuleto. Sin analizar tu residencia fiscal y las normas antidiferimiento de tu país, es pagar mantenimiento anual por un problema nuevo. La secuencia correcta: primero orden personal impecable (módulo anterior), después volumen real, y recién entonces estructura con asesoría en ambas jurisdicciones.</p>`,
    claves: [
      "La sociedad es herramienta de protección y orden, no amuleto fiscal",
      "Reglas antidiferimiento: rentas pasivas se te pueden atribuir igual",
      "Los costos fijos anuales exigen volumen real para justificarse",
      "Primero orden personal, después volumen, recién entonces estructura",
    ],
  };

  L["4-6-3"] = {
    resumen:
      "El examen final del Nivel U: 10 preguntas que cruzan los ocho módulos. Cómo prepararlo, qué se evalúa y el criterio de aprobación para certificar el nivel.",
    duracionVideo: "5–7 min",
    lectura: `<p>Llegaste al cierre del Nivel U. El examen de certificación no es un trámite: es el control de calidad de un nivel que amplió tu universo de instrumentos más que ningún otro. Certificar sin dominar sería hacerte trampa a ti mismo con dinero real en juego.</p>
<h4>Qué evalúa</h4>
<p>Diez preguntas de opción múltiple que cruzan los ocho módulos del nivel:</p>
<ul>
<li><strong>SMC:</strong> liquidez, order blocks, FVG, inducement y la secuencia completa del modelo.</li>
<li><strong>Order flow:</strong> perfil de volumen (POC, VAH, VAL), delta y sus divergencias, absorción y VWAP.</li>
<li><strong>Futuros:</strong> especificaciones y multiplicadores, micros, márgenes, rollover, contango y la estructura de la sesión americana.</li>
<li><strong>Opciones:</strong> derechos y obligaciones, las cuatro griegas, estrategias de ingreso y spreads con su riesgo real.</li>
<li><strong>Cripto:</strong> métricas on-chain, riesgos DeFi, ciclos y autocustodia.</li>
<li><strong>Macro y portafolios:</strong> relaciones intermarket, núcleo-satélite, rebalanceo y las lecciones de 2008, 2020 y 2022.</li>
<li><strong>Fiscalidad:</strong> los principios de residencia, declaración y estructuras.</li>
<li><strong>Psicología:</strong> sobrecarga, drawdown, ego e incertidumbre (el módulo que sigue: el examen se rinde al completar todo el nivel).</li>
</ul>
<h4>Cómo prepararlo bien</h4>
<ol>
<li>Repasa las <em>claves</em> de cada lección: condensan lo evaluable.</li>
<li>Rehaz los ejemplos numéricos a mano: el multiplicador del ES, la pérdida impermanente, el costo del vertical. Si puedes reconstruir el número, entendiste el concepto; si solo lo reconoces, todavía no.</li>
<li>Autoexamen honesto por módulo: ¿puedo explicarle esto a otro alumno en dos minutos sin releer? El módulo que no pase esa prueba es el que repasas primero.</li>
</ol>
<h4>Criterio y reglas</h4>
<p>Necesitas al menos 8 de 10 para certificar. Sin límite de tiempo por pregunta: esto mide comprensión, no velocidad. Si no apruebas, no pasa absolutamente nada: repasas los módulos flojos y lo rindes de nuevo cuando estés listo. En RIC preferimos un intento tardío y sólido a una certificación de memoria frágil.</p>
<h4>Después del examen</h4>
<p>Certificar el Nivel U no te obliga a operar todo lo aprendido: te habilita a <strong>elegir con criterio</strong>. La lección más importante del nivel quizá sea esa: conocer todo el universo para especializarte en la porción donde tienes ventaja real. El módulo de psicología que cierra el nivel trata exactamente de eso.</p>`,
    claves: [
      "10 preguntas que cruzan los ocho módulos del nivel",
      "Aprobación: 8 de 10; sin límite de tiempo",
      "Si reconstruyes los números a mano, entendiste; si solo los reconoces, no",
      "Certificar habilita a elegir con criterio, no obliga a operarlo todo",
    ],
  };

  /* ============ MÓDULO 7 · Psicología de la complejidad ============ */

  L["4-7-0"] = {
    resumen:
      "Más instrumentos no significa más oportunidades aprovechables: tu memoria de trabajo es finita. La sobrecarga cognitiva degrada decisiones antes de que lo notes.",
    duracionVideo: "9–12 min",
    lectura: `<p>Este nivel te abrió futuros, opciones, order flow, cripto y macro. Y aquí viene la advertencia que ningún vendedor de cursos te dará: <strong>más instrumentos no significa más oportunidades aprovechables</strong>. Significa más carga cognitiva, y la carga cognitiva degrada decisiones antes de que lo notes.</p>
<h4>La ciencia en corto</h4>
<p>Tu memoria de trabajo maneja un puñado de elementos a la vez: la investigación clásica habla de entre 4 y 7. Cada mercado abierto en pantalla consume varios: su estructura, sus niveles, tu posición, su riesgo. Con tres mercados y dos posiciones abiertas ya estás en el límite; a partir de ahí no decides peor "un poco": empiezas a decidir con atajos. Los estudios sobre fatiga de decisión muestran el patrón en todos los campos: bajo sobrecarga, el cerebro no elige mejor entre opciones, elige la opción que requiere menos esfuerzo, que en trading suele ser la impulsiva.</p>
<h4>Cómo se ve en la práctica</h4>
<ul>
<li>Cierras un trade ganador demasiado pronto en el mercado A porque estabas ansioso por lo que pasaba en el mercado B.</li>
<li>Un stop sin poner porque "estabas mirando otra cosa". Con futuros, ese descuido tiene precio de tres dígitos por minuto.</li>
<li>Al final del día no puedes reconstruir por qué entraste en la cuarta operación. No hay tesis: había ruido.</li>
</ul>
<h4>Ejemplo numérico incómodo</h4>
<p>Un alumno con sistema validado en oro (55% de acierto, ratio 1:2) agrega índices y cripto "para diversificar señales". Seis meses después su diario muestra: en oro sigue en 54%; en los mercados nuevos, 38% con ratio 1:1,3, y su rendimiento total es peor que cuando operaba solo oro. No aprendió dos mercados nuevos: financió dos aprendizajes con el capital que su ventaja real generaba. La diversificación de ingresos no funciona igual que la de portafolio: tu atención no se diversifica, se divide.</p>
<h4>El protocolo RIC de expansión</h4>
<ol>
<li>Un instrumento nuevo a la vez, en simulado o tamaño mínimo, con estadística separada en el diario.</li>
<li>El instrumento nuevo se gana su lugar con 30–50 operaciones registradas rentables, no con entusiasmo.</li>
<li>Máximo de posiciones abiertas simultáneas definido por escrito (para la mayoría: dos). Es un límite de riesgo cognitivo, tan serio como el límite de pérdida diaria.</li>
</ol>
<h4>Error común</h4>
<p>Confundir actividad con progreso. Ocho pantallas y cinco mercados <em>parecen</em> profesionalismo; la mayoría de los profesionales rentables que conocerás dominan un puñado de instrumentos con profundidad quirúrgica. La amplitud es del nivel; la profundidad es tuya.</p>`,
    claves: [
      "La memoria de trabajo es finita: cada mercado abierto la consume",
      "Bajo sobrecarga no eliges mejor: eliges lo que cuesta menos esfuerzo",
      "Un instrumento nuevo a la vez, con estadística separada",
      "Límite escrito de posiciones simultáneas: riesgo cognitivo",
    ],
  };

  L["4-7-1"] = {
    resumen:
      "Todo sistema con ventaja real atraviesa rachas largas sin pagar. Saber distinguir varianza de sistema roto, y sostener el proceso mientras tanto, es la habilidad que separa carreras.",
    duracionVideo: "11–14 min",
    lectura: `<p>Hay un momento que casi ningún curso menciona y casi toda carrera atraviesa: tu sistema validado deja de pagar durante semanas o meses. No un mal día: una travesía. Lo que hagas ahí define si tienes una carrera o una anécdota.</p>
<h4>Primero, los números fríos</h4>
<p>Un sistema con 50% de acierto tiene, en 1.000 operaciones, una probabilidad altísima de sufrir rachas de 8–10 pérdidas seguidas en algún momento. Eso no es el sistema fallando: es el sistema <em>funcionando</em>, porque la varianza es parte del contrato. Con 50% de acierto y ratio 1:2 sigues siendo rentable a largo plazo, pero el camino incluye drawdowns de semanas. Si tu expectativa emocional era una curva suave, el problema no es el sistema: es la expectativa.</p>
<h4>¿Varianza o sistema roto? El diagnóstico</h4>
<p>La pregunta correcta durante el drawdown no es "¿cuánto llevo perdido?" sino "¿cambió algo estructural?". Chequeo en tres capas:</p>
<ol>
<li><strong>Ejecución:</strong> ¿estás siguiendo el plan? Audita el diario: si el drawdown coincide con violaciones de sistema, el problema eres tú, no el sistema. Es la causa más frecuente y la más barata de arreglar.</li>
<li><strong>Régimen:</strong> ¿el mercado cambió de carácter? Un sistema de tendencia en un mercado que entró en rango pagará mal hasta que el régimen vuelva. Eso no es sistema roto: es estacionalidad de la ventaja.</li>
<li><strong>Estructura:</strong> ¿desapareció la ineficiencia que explotabas? Es lo más raro y lo más serio. Se evalúa con datos de meses, no con la frustración de la semana.</li>
</ol>
<h4>El protocolo de travesía</h4>
<ul>
<li><strong>Reduce tamaño, no proceso:</strong> a mitad de riesgo (o menos) mientras dura el diagnóstico. Sobrevivir al drawdown importa más que recuperarlo rápido.</li>
<li><strong>Prohibido "recuperar":</strong> subir tamaño para volver al máximo de la cuenta es la mecánica exacta con la que un drawdown normal se vuelve terminal.</li>
<li><strong>Mide proceso, no resultado:</strong> en travesía, tu métrica es el porcentaje de operaciones ejecutadas según plan. Es lo único que controlas y lo único que predice tu salida.</li>
<li><strong>Sostén la vida alrededor:</strong> el drawdown financiero con el que se puede convivir es el que no compromete el alquiler. Si compromete el alquiler, el error fue de arquitectura de capital (módulo de portafolios), y se corrige ahí.</li>
</ul>
<h4>Error común</h4>
<p>Cambiar de sistema en el fondo del drawdown, justo antes de que pague. Saltar de sistema en sistema garantiza cobrar todos los drawdowns y ninguna recuperación. El sistema se cambia por diagnóstico estructural con datos, jamás por dolor acumulado.</p>`,
    claves: [
      "Rachas de 8–10 pérdidas son estadísticamente normales con ventaja real",
      "Diagnóstico en tres capas: ejecución, régimen, estructura",
      "En travesía: mitad de tamaño y métrica de proceso, no de resultado",
      "Cambiar de sistema por dolor garantiza cobrar todos los drawdowns",
    ],
  };

  L["4-7-2"] = {
    resumen:
      "El alumno avanzado no muere por ignorancia sino por sofisticación: complica lo que funciona para sentirse experto. La complejidad debe ganarse su lugar con datos.",
    duracionVideo: "9–12 min",
    lectura: `<p>Hay una trampa diseñada a medida para el alumno de Nivel 4. No es la ignorancia: es la <strong>sofisticación</strong>. Ahora sabes leer footprint, griegas y flujos on-chain, y una parte de ti quiere usarlo todo, en cada trade, para sentir que ese conocimiento vale. Esa parte es el ego, y opera contra tu cuenta.</p>
<h4>La mecánica de la trampa</h4>
<p>El ego del trader avanzado no dice "soy infalible": dice cosas más elegantes. "Un sistema tan simple no puede ser todo": y le agregas tres filtros que jamás validaste. "Ya estoy para tamaño profesional": y doblas riesgo sin que tu estadística lo justifique. "Esta vez el contexto macro justifica saltarse la regla": y la excepción inteligente resulta ser una violación de sistema con vocabulario caro. El patrón común: la complejidad usada como insignia de estatus en lugar de como herramienta con costo y beneficio.</p>
<h4>Los datos incómodos</h4>
<p>En backtesting esto tiene nombre: <strong>sobreajuste</strong>. Cada filtro que agregas ajusta mejor el pasado y suele rendir peor el futuro, porque optimizas contra el ruido. Un ejemplo típico: sistema base con 200 operaciones registradas, esperanza de 0,4R por trade. Versión "mejorada" con cinco filtros: en el histórico rinde 0,6R, pero filtra tanto que ejecuta un tercio de las señales, y en adelante rinde 0,2R porque dos de los filtros eran casualidad. Más inteligente en el papel, más pobre en la cuenta.</p>
<h4>La navaja RIC: la complejidad se gana su lugar</h4>
<ol>
<li>Cada elemento nuevo (filtro, indicador, instrumento, capa de análisis) entra a prueba con una hipótesis medible: qué métrica debe mejorar y cuánto.</li>
<li>Se evalúa con muestra suficiente (30–50 operaciones mínimo) contra la versión simple.</li>
<li>Si no mejora la esperanza neta con claridad, se elimina sin funeral. La carga cognitiva que consume (lección de sobrecarga) es un costo aunque el rendimiento empate.</li>
</ol>
<h4>La paradoja final del nivel</h4>
<p>El uso más avanzado del conocimiento avanzado es saber cuándo no usarlo. El order flow te sirve aunque no lo mires cada día: te enseñó por qué tus niveles funcionan. Las opciones te sirven aunque solo uses puts protectoras dos veces al año. Aprendiste el universo entero para elegir tu porción con criterio, no para operarlo entero. Los mejores traders que conocerás tienen sistemas que caben en una página y conocimiento que llenaría libros: esa distancia entre lo que saben y lo que ejecutan es exactamente su madurez.</p>
<h4>Error común</h4>
<p>Medir tu progreso por lo que agregas. Mídelo al revés: ¿qué eliminaste este trimestre? Un sistema que se simplifica con el tiempo es la firma de un trader que está madurando.</p>`,
    claves: [
      "El ego avanzado no dice soy infalible: dice esto es demasiado simple",
      "Cada filtro nuevo ajusta mejor el pasado y suele rendir peor el futuro",
      "La complejidad entra a prueba con hipótesis medible o no entra",
      "Saber cuándo no usar lo aprendido es el uso más avanzado",
      "Mide tu progreso por lo que eliminas, no por lo que agregas",
    ],
  };

  L["4-7-3"] = {
    resumen:
      "Tu tolerancia al riesgo declarada se mide en calma; la real aparece con la posición abierta. Calibrar esa brecha con datos de tu propio comportamiento es la última lección del nivel.",
    duracionVideo: "10–13 min",
    lectura: `<p>Cierra el nivel una pregunta que parece filosófica y es brutalmente práctica: ¿cuánto riesgo toleras <em>de verdad</em>? No el que declaraste en un formulario, ni el que tu plan dice en frío. El que tu sistema nervioso sostiene con una posición abierta y el precio en contra. La distancia entre ambos es donde mueren los planes.</p>
<h4>La brecha declarada-real</h4>
<p>En calma, todos aceptamos drawdowns del 20% "porque el largo plazo". Con el drawdown puesto, el cuerpo vota distinto: sueño alterado, pantalla mirada compulsivamente, y las dos salidas clásicas: capitular en el peor momento o doblar riesgo para "terminar rápido". El problema no es ser miedoso o valiente: es haber calibrado el plan con la tolerancia <em>declarada</em> en lugar de la <em>real</em>. Un plan que asume una tolerancia que no tienes es un plan que se abandonará, y el plan abandonado a mitad de crisis es peor que un plan modesto sostenido.</p>
<h4>Cómo medir tu tolerancia real (con datos, no introspección)</h4>
<ol>
<li><strong>Tu historial es el test:</strong> busca en tu diario el peor drawdown que atravesaste sin violar el sistema. Esa cifra, no la del formulario, es tu tolerancia demostrada.</li>
<li><strong>Las señales del cuerpo son datos:</strong> si una posición te quita el sueño, está grande. Literal, no metafórico: el insomnio es el indicador de sobreexposición más fiable que existe.</li>
<li><strong>La prueba del doble:</strong> antes de subir tamaño, pregunta: si mañana pierdo dos veces seguidas el riesgo nuevo, ¿ejecuto la tercera señal según plan? Si la respuesta honesta es no, el tamaño nuevo excede tu tolerancia operativa, diga lo que diga tu cuenta.</li>
</ol>
<h4>Decidir bajo incertidumbre: el marco final</h4>
<p>El trading es decidir con información incompleta, siempre. Los principios que este programa te deja para eso:</p>
<ul>
<li><strong>Piensa en apuestas, no en certezas:</strong> una buena decisión con mal resultado sigue siendo buena; la calidad se evalúa sobre el proceso y la muestra, jamás sobre el trade individual.</li>
<li><strong>Dimensiona para estar equivocado:</strong> el tamaño correcto es el que te deja operar la señal siguiente con la cabeza limpia después de perder esta.</li>
<li><strong>La regla de supervivencia primero:</strong> ninguna oportunidad justifica un riesgo que pueda sacarte del juego. El que sobrevive todas las rachas cobra todas las recuperaciones.</li>
</ul>
<h4>El cierre del nivel</h4>
<p>Saliste del Nivel U con el universo completo de instrumentos y con su antídoto: los límites cognitivos, estadísticos y emocionales dentro de los cuales ese universo es operable. El nivel siguiente es la maestría; el requisito para entrar no es saber más, sino haber calibrado con honestidad cuánto de lo que sabes puedes ejecutar. Esa calibración es, quizá, la ventaja definitiva.</p>`,
    claves: [
      "La tolerancia real se mide con la posición abierta, no en un formulario",
      "Tu peor drawdown atravesado sin violar sistema es tu tolerancia demostrada",
      "El insomnio es el indicador de sobreexposición más fiable",
      "Buena decisión con mal resultado sigue siendo buena decisión",
      "Sobrevivir todas las rachas es cobrar todas las recuperaciones",
    ],
  };

  /* ==================== EXAMEN · NIVEL 4 ==================== */

  const EX = (window.RIC_EXAMENES = window.RIC_EXAMENES || {});
  EX[4] = [
    {
      q: "En SMC, un stop hunt clásico se distingue de una ruptura genuina principalmente por:",
      opciones: [
        "El volumen bajo durante la ruptura",
        "La velocidad del rechazo: rompe el nivel con mecha y regresa al rango de inmediato",
        "Que ocurre siempre en temporalidades menores a 5 minutos",
        "Que el precio rompe el nivel exactamente al inicio de la sesión",
      ],
      correcta: 1,
    },
    {
      q: "En el perfil de volumen, el área de valor se define como:",
      opciones: [
        "El rango entre el máximo y el mínimo de la sesión",
        "La zona donde el precio pasó más tiempo, sin importar el volumen",
        "El rango que concentra el 70% del volumen negociado, entre VAH y VAL",
        "Los dos niveles con mayor cantidad de órdenes límite en el DOM",
      ],
      correcta: 2,
    },
    {
      q: "Respecto a operar con un broker internacional siendo residente fiscal en un país de LATAM, el principio general correcto es:",
      opciones: [
        "Es legal en la mayoría de los países, pero las ganancias y las cuentas deben declararse según las normas locales",
        "Es ilegal tener cuentas fuera del país de residencia",
        "Las ganancias del exterior no tributan si no se transfieren al banco local",
        "El intercambio automático de información solo aplica a cuentas de más de un millón de dólares",
      ],
      correcta: 0,
    },
    {
      q: "Un movimiento de 10 puntos en un contrato ES del S&P 500 equivale a:",
      opciones: [
        "50 dólares",
        "125 dólares",
        "200 dólares",
        "500 dólares",
      ],
      correcta: 3,
    },
    {
      q: "Un mercado de futuros está en contango cuando:",
      opciones: [
        "Los contratos de vencimiento lejano cotizan más caros que el cercano",
        "Los contratos lejanos cotizan más baratos que el cercano",
        "El contrato vence sin volumen suficiente para rolar",
        "El precio del futuro es idéntico al del contado",
      ],
      correcta: 0,
    },
    {
      q: "Compras una call strike 105 pagando 2 de prima con la acción en 100. Al vencimiento la acción cierra en 104. Tu resultado es:",
      opciones: [
        "Ganas 4 por acción porque la acción subió",
        "Ganas 2 por acción: la subida menos la prima",
        "Pierdes toda la prima: la opción vence sin valor",
        "Recuperas la mitad de la prima automáticamente",
      ],
      correcta: 2,
    },
    {
      q: "En un iron condor, el perfil de resultados típico es:",
      opciones: [
        "Pérdida limitada y ganancia ilimitada si el precio tiende con fuerza",
        "Gana con frecuencia una prima limitada y pierde un monto mayor cuando el precio escapa del rango",
        "Ganancia ilimitada por ambos lados a cambio de theta negativo",
        "El mismo perfil que comprar una put protectora",
      ],
      correcta: 1,
    },
    {
      q: "Depositaste 1 ETH y 2.000 USDC en un liquidity pool y ETH duplicó su precio. Al retirar, comparado con simplemente haber mantenido los activos:",
      opciones: [
        "Tienes exactamente lo mismo más las comisiones cobradas",
        "Tienes más, porque el pool rebalancea a tu favor",
        "Tienes menos por la pérdida impermanente, que las comisiones deben compensar",
        "Tienes el doble de USDC y el mismo ETH",
      ],
      correcta: 2,
    },
    {
      q: "La gran lección de cobertura que dejó 2022 fue:",
      opciones: [
        "Los bonos largos siempre protegen la cartera en cualquier crisis",
        "El oro es la única cobertura fiable en todas las crisis",
        "Identificar el factor de riesgo común: acciones y bonos cayeron juntos porque ambos eran sensibles a las tasas",
        "La diversificación geográfica elimina el riesgo sistémico",
      ],
      correcta: 2,
    },
    {
      q: "Tu sistema validado entra en una racha de 9 pérdidas consecutivas. Según el protocolo del nivel, el primer paso correcto es:",
      opciones: [
        "Duplicar el tamaño para recuperar el drawdown más rápido",
        "Cambiar de sistema de inmediato: 9 pérdidas prueban que está roto",
        "Agregar filtros nuevos al sistema durante la racha",
        "Reducir tamaño y auditar el diario: distinguir si es varianza, cambio de régimen o falla de ejecución",
      ],
      correcta: 3,
    },
    /* ---- Preguntas por lección (2 por lección) ---- */
    {
      q: "Compraste largo en oro y pusiste tu stop justo debajo de un mínimo obvio, igual que miles de traders. Desde la perspectiva institucional, ¿qué representa ese stop?",
      opciones: [
        "Una orden de venta a mercado esperando, que puede servir de contraparte a una compra institucional",
        "Una protección invisible que las instituciones no pueden detectar",
        "Una orden límite de compra que agrega liquidez al bid",
        "Un nivel técnico irrelevante para los grandes participantes",
      ],
      correcta: 0,
      leccion: "4-0-0",
    },
    {
      q: "Tu sistema da señal de compra y notas que tu stop quedaría exactamente donde están los stops de todos, bajo un mínimo obvio. Según la lección de liquidez, ¿qué es lo más prudente?",
      opciones: [
        "Entrar de inmediato: los mínimos obvios son soportes fuertes",
        "Cancelar la señal: los niveles obvios nunca funcionan",
        "Esperar el barrido de ese nivel obvio: las mejores entradas suelen aparecer después, no antes",
        "Duplicar el tamaño para compensar el riesgo del stop",
      ],
      correcta: 2,
      leccion: "4-0-0",
    },
    {
      q: "El precio regresa por segunda vez a un order block que ya generó una reacción en su primera visita. ¿Qué debes esperar de esa zona?",
      opciones: [
        "Reacción más fuerte, porque los niveles se refuerzan con cada toque",
        "Menor probabilidad de reacción: la zona ya fue mitigada y las órdenes pendientes se ejecutaron",
        "Una reversión garantizada si coincide con una media móvil",
        "Exactamente la misma probabilidad que en la primera visita",
      ],
      correcta: 1,
      leccion: "4-0-1",
    },
    {
      q: "En una subida veloz del NQ notas que entre la mecha de la vela 1 y la mecha de la vela 3 no hay ningún solapamiento de precios. ¿Qué identificaste y qué implica?",
      opciones: [
        "Un order block alcista: la zona debe romperse para confirmar tendencia",
        "Un doble techo: probable reversión inmediata",
        "Un nivel de spoofing: órdenes falsas en el libro",
        "Un fair value gap: un hueco de negociación unilateral que el precio tiende a volver a rellenar",
      ],
      correcta: 3,
      leccion: "4-0-1",
    },
    {
      q: "Identificas un order block alcista en 1,0820 del euro-dólar, pero antes hay un pequeño mínimo intermedio en 1,0838. Según la lección de inducement, ¿cómo lees ese mínimo?",
      opciones: [
        "Como el soporte principal: es el primer nivel que tocará el precio",
        "Como una zona mitigada sin valor operativo",
        "Como una carnada probable: conviene esperar a que lo barran antes de que el precio llegue a la zona real",
        "Como señal de compra inmediata por la doble confluencia",
      ],
      correcta: 2,
      leccion: "4-0-2",
    },
    {
      q: "Tu diario muestra que tus stops mueren una y otra vez por mechas que luego revierten a favor de tu análisis. ¿Cuál es la conclusión correcta según la lección?",
      opciones: [
        "Estás colocando el stop en la piscina de todos: muévelo detrás de la estructura y mide el cambio en tus métricas",
        "Los market makers identificaron tu cuenta y te cazan directamente",
        "Debes operar sin stop para evitar los barridos",
        "Es mala suerte estadística que se corrige sola con el tiempo",
      ],
      correcta: 0,
      leccion: "4-0-2",
    },
    {
      q: "El precio llega a tu zona de interés en un contexto alcista, pero no hubo barrido de liquidez ni cambio de carácter en tu temporalidad de entrada. Según el modelo completo, ¿qué haces?",
      opciones: [
        "Entras con la mitad del tamaño por precaución",
        "Entras igual: la zona es lo más importante del modelo",
        "Esperas solo el cierre de la vela en la zona para confirmar",
        "No operas: sin barrido y sin cambio de carácter la secuencia está incompleta",
      ],
      correcta: 3,
      leccion: "4-0-3",
    },
    {
      q: "En el modelo completo de SMC, tras el barrido y el cambio de carácter, ¿dónde se coloca el stop de la entrada?",
      opciones: [
        "En el punto de equilibrio del último impulso",
        "Detrás del extremo del barrido de liquidez",
        "Justo debajo de la vela de entrada",
        "A una distancia fija de 10 pips en cualquier mercado",
      ],
      correcta: 1,
      leccion: "4-0-3",
    },
    {
      q: "El ES abre por encima del VAH de ayer, cae, entra al área de valor y se sostiene por debajo del VAH. ¿Qué escenario favorece la estadística del perfil de volumen?",
      opciones: [
        "Rotación hacia el POC: la apertura fuera de valor fue rechazada",
        "Ruptura alcista inmediata del máximo del día",
        "Tendencia bajista hasta perder también el VAL sin pausa",
        "Un rango exacto entre el máximo y el mínimo de ayer",
      ],
      correcta: 0,
      leccion: "4-1-0",
    },
    {
      q: "En la jerga del perfil de volumen, ¿qué es un naked POC y por qué importa?",
      opciones: [
        "El precio con menos volumen de la sesión, que el mercado evita",
        "El punto medio exacto entre VAH y VAL de la sesión actual",
        "Un POC de una sesión anterior que nunca fue revisitado: actúa como imán en sesiones posteriores",
        "El POC de la primera hora, válido solo durante la apertura",
      ],
      correcta: 2,
      leccion: "4-1-0",
    },
    {
      q: "Ves una vela bajista que cerró con delta positivo: hubo más compra agresiva que venta agresiva y aun así el precio cayó. ¿Cuál es la lectura correcta?",
      opciones: [
        "Señal de fuerza: los compradores dominan y el precio subirá",
        "Señal de debilidad: la oferta pasiva absorbió toda la compra agresiva",
        "Un error de datos: una vela bajista no puede tener delta positivo",
        "Confirmación para comprar la siguiente vela sin más análisis",
      ],
      correcta: 1,
      leccion: "4-1-1",
    },
    {
      q: "El ES imprime tres máximos crecientes consecutivos con deltas de +2.800, +600 y -400. ¿Qué historia cuenta esa secuencia en el footprint?",
      opciones: [
        "Acumulación institucional sana: cada máximo confirma la tendencia",
        "Un stop hunt bajista en formación bajo el mínimo del día",
        "Aumento progresivo de la demanda agresiva",
        "Agotamiento comprador: cada empuje llega con menos convicción y el último con venta neta",
      ],
      correcta: 3,
      leccion: "4-1-1",
    },
    {
      q: "En el DOM aparece una orden límite enorme que asusta al mercado, pero desaparece justo antes de que el precio la toque. ¿Qué observaste y qué enseña sobre el DOM?",
      opciones: [
        "Una absorción confirmada: la pared aguantó el ataque",
        "Un error de la plataforma: las órdenes límite no se pueden cancelar",
        "Probable spoofing: el DOM muestra intención, y solo la ejecución es información fiable",
        "Un iceberg institucional que garantiza la reversión",
      ],
      correcta: 2,
      leccion: "4-1-2",
    },
    {
      q: "El crudo cae a 78,20; en tres minutos se ejecutan 1.900 contratos contra el bid y el precio apenas cede 3 ticks antes de volver. ¿Cuál es la lectura y la acción correcta?",
      opciones: [
        "Absorción compradora: la venta agresiva se agotó contra un pasivo grande; se opera tras confirmar el giro",
        "Presión vendedora dominante: abrir corto de inmediato",
        "Baja liquidez del horario: ignorar el evento por completo",
        "Ruptura bajista inminente: colocar stop de venta bajo 78,20",
      ],
      correcta: 0,
      leccion: "4-1-2",
    },
    {
      q: "El NQ cotiza debajo del VWAP y la pendiente del VWAP es bajista, pero tu sistema imprime una señal larga. Según el uso del VWAP como filtro de sesgo, ¿qué corresponde?",
      opciones: [
        "Tomar la señal larga con el doble de tamaño: comprar barato es mejor",
        "Invertir la señal y abrir corto automáticamente",
        "Tomar la señal solo si es viernes",
        "Dejarla pasar: bajo VWAP descendente el sesgo intradía favorece solo cortos",
      ],
      correcta: 3,
      leccion: "4-1-3",
    },
    {
      q: "¿Por qué el VWAP concentra actividad institucional real y no es solo un indicador más?",
      opciones: [
        "Porque es el único indicador que no repinta en ninguna plataforma",
        "Porque los ejecutores de fondos se evalúan contra él y los algoritmos de ejecución lo usan como referencia central",
        "Porque promedia los últimos 200 cierres, igual que la media larga",
        "Porque los exchanges obligan a operar en ese nivel",
      ],
      correcta: 1,
      leccion: "4-1-3",
    },
    {
      q: "Cuenta de 5.000 dólares, riesgo máximo del 1% por operación y un stop habitual de 10 puntos. ¿Puedes operar un contrato ES?",
      opciones: [
        "No: 10 puntos en ES son 500 dólares, diez veces tu riesgo permitido de 50",
        "Sí, porque el margen intradía del broker lo permite",
        "Sí, si el trade tiene ratio mayor a 1:2",
        "No, porque el ES exige mínimo 50.000 dólares de cuenta por regulación",
      ],
      correcta: 0,
      leccion: "4-2-0",
    },
    {
      q: "Abriste un ES con margen intradía de 1.500 dólares y decides mantener la posición hasta mañana. ¿Cuál es el riesgo específico que señala la lección?",
      opciones: [
        "El contrato vence automáticamente al cierre de cada día",
        "La comisión se multiplica por diez fuera de horario",
        "El margen overnight que fija el exchange es mucho mayor; sin cubrirlo, el broker puede liquidarte",
        "El multiplicador del ES cambia de 50 a 100 dólares por la noche",
      ],
      correcta: 2,
      leccion: "4-2-0",
    },
    {
      q: "Operas 10 MES en lugar de 1 ES. En cuanto a costos, ¿qué debes tener claro según la lección de micros?",
      opciones: [
        "Pagas exactamente lo mismo: 10 micros equivalen a 1 grande también en comisiones",
        "En comisiones relativas es más caro: es el precio de la granularidad mientras escalas",
        "Los micros no pagan comisión, por eso existen",
        "El spread de los micros es diez veces mayor que el del grande",
      ],
      correcta: 1,
      leccion: "4-2-1",
    },
    {
      q: "Cuenta de 5.000 dólares, regla del 1% (50 dólares de riesgo) y stop de 10 puntos en el S&P. ¿Qué instrumento encaja exacto con esos números?",
      opciones: [
        "Un contrato ES: 500 dólares de riesgo",
        "Dos contratos ES con stop reducido a la mitad",
        "Ningún futuro: esa cuenta solo alcanza para acciones",
        "Un MES: a 5 dólares por punto, el stop de 10 puntos son exactamente 50 dólares",
      ],
      correcta: 3,
      leccion: "4-2-1",
    },
    {
      q: "Al pasar del contrato de junio al de septiembre, tu gráfico del ES salta 50 puntos hacia arriba. ¿Qué ocurrió?",
      opciones: [
        "Un gap de noticias macro durante el fin de semana",
        "Un error del broker que debes reclamar",
        "No fue movimiento de mercado: es la diferencia de estructura temporal entre contratos; se corrige con continuidad ajustada",
        "Una subasta especial del exchange que reinicia los precios",
      ],
      correcta: 2,
      leccion: "4-2-2",
    },
    {
      q: "El crudo pasa de cotizar en contango a cotizar en backwardation. ¿Cómo interpretas ese cambio de estructura?",
      opciones: [
        "Señal de tensión de oferta: el mercado paga premio por tener el activo hoy",
        "Señal de exceso de inventarios y demanda débil",
        "Un fenómeno técnico sin contenido informativo",
        "Confirmación de que el rollover se adelantó un mes",
      ],
      correcta: 0,
      leccion: "4-2-2",
    },
    {
      q: "Son las 12:15 (hora del este), no tienes setup y te aburres frente al NQ. Según la estructura de la sesión americana, ¿qué corresponde?",
      opciones: [
        "Buscar rupturas: el almuerzo es la hora de las tendencias fuertes",
        "Subir a temporalidad de 1 minuto para encontrar más señales",
        "Operar con tamaño doble para aprovechar el spread bajo",
        "No operar: entre 11:30 y 13:30 el volumen se seca y la estadística de casi cualquier sistema intradía empeora",
      ],
      correcta: 3,
      leccion: "4-2-3",
    },
    {
      q: "Hoy hay decisión de tasas del FOMC a las 14:00 y tienes un setup listo a las 13:50. ¿Qué dicta el plan profesional de sesión?",
      opciones: [
        "Entrar antes del anuncio para capturar todo el movimiento",
        "No abrir posición: los eventos como el FOMC se operan después del polvo, no durante",
        "Entrar con stop doble de lo normal para aguantar la volatilidad",
        "Cubrir la posición con una opinión de Twitter en tiempo real",
      ],
      correcta: 1,
      leccion: "4-2-3",
    },
    {
      q: "Vendes una call cubierta cobrando 200 dólares de prima y la mayoría de tus ventas anteriores vencieron sin valor. ¿Qué perfil de negocio describe la lección para el vendedor de opciones?",
      opciones: [
        "El del asegurador: ingreso pequeño y frecuente contra pérdida rara y grande, que exige dimensionar el riesgo",
        "El del especulador: pérdida limitada y ganancia ilimitada",
        "El del arbitrajista: ganancia garantizada sin riesgo",
        "El del inversor pasivo: rendimiento fijo asegurado cada mes",
      ],
      correcta: 0,
      leccion: "4-3-0",
    },
    {
      q: "Compraste una call pagando 200 dólares de prima y la acción se desploma de 100 a 90. ¿Cuál es tu pérdida total en la opción?",
      opciones: [
        "1.000 dólares: los 10 puntos de caída por 100 acciones",
        "Depende del margen que exija tu broker",
        "Exactamente los 200 dólares de la prima, ni un dólar más",
        "200 dólares más los intereses del apalancamiento",
      ],
      correcta: 2,
      leccion: "4-3-0",
    },
    {
      q: "Compras una call justo antes de los resultados de una empresa. La acción sube tras el anuncio, pero tu opción pierde valor. ¿Qué griega explica ese resultado?",
      opciones: [
        "Delta: la opción quedó fuera del dinero",
        "Vega: la volatilidad implícita se desplomó tras el evento y te quitó lo que delta te dio",
        "Gamma: el delta cambió demasiado rápido",
        "Theta: pasó un día completo desde la compra",
      ],
      correcta: 1,
      leccion: "4-3-1",
    },
    {
      q: "Tienes una opción muy cerca del strike a una semana del vencimiento. Según la lección de griegas, ¿qué caracteriza esa zona?",
      opciones: [
        "Theta desaparece: el tiempo ya no afecta el precio",
        "Vega se vuelve la única griega relevante",
        "Delta queda congelado en 0,50 hasta el vencimiento",
        "Gamma alta: el delta cambia bruscamente con movimientos pequeños y la posición exige máxima atención",
      ],
      correcta: 3,
      leccion: "4-3-1",
    },
    {
      q: "Vendiste una covered call strike 105 sobre acciones compradas a 95, y la acción vuela a 112. ¿Cuál fue el costo real de la estrategia?",
      opciones: [
        "Perdiste la prima cobrada al ser ejercido",
        "Ninguno: cobraste prima y vendiste con ganancia, resultado perfecto",
        "Renunciaste al tramo de 105 a 112: la covered call pone techo a las subidas grandes",
        "Debes recomprar las acciones a 112 obligatoriamente",
      ],
      correcta: 2,
      leccion: "4-3-2",
    },
    {
      q: "Vendiste una cash-secured put strike 92 sobre una acción que luego se desploma a 70. ¿Qué lección deja el escenario?",
      opciones: [
        "La CSP no te protege de elegir mal la empresa: solo se vende sobre activos que realmente quieres tener a ese precio",
        "La put expira sin valor y te quedas la prima sin consecuencias",
        "El broker cancela la asignación cuando la caída supera el 20%",
        "Puedes rechazar la compra pagando una penalidad pequeña",
      ],
      correcta: 0,
      leccion: "4-3-2",
    },
    {
      q: "Compras la call 100 por 3,00 y vendes la call 110 por 1,00. ¿Cuál es tu pérdida máxima y tu ganancia máxima por spread?",
      opciones: [
        "Pérdida ilimitada si la acción se desploma; ganancia de 1.000",
        "Pérdida máxima 300; ganancia máxima 700",
        "Pérdida máxima 1.000; ganancia máxima 200",
        "Pérdida máxima 200 (el costo neto); ganancia máxima 800 (ancho menos costo)",
      ],
      correcta: 3,
      leccion: "4-3-3",
    },
    {
      q: "Tu iron condor cobra 12 puntos de prima con verticales de 50 puntos de ancho. ¿Qué implica esa relación para la gestión?",
      opciones: [
        "Riesgo y beneficio simétricos: no requiere gestión activa",
        "Arriesgas 38 por ganar 12: gana seguido y pierde fuerte, así que exige gestión estricta y no sostenerlo a través de eventos macro",
        "La ganancia máxima es 50 si el precio escapa del rango",
        "Conviene siempre dejarlo expirar para cobrar la prima completa",
      ],
      correcta: 1,
      leccion: "4-3-3",
    },
    {
      q: "Durante varios días seguidos entran decenas de miles de BTC a los exchanges. Según el análisis on-chain, ¿cómo se lee ese flujo?",
      opciones: [
        "Potencial presión vendedora: las monedas en exchange están a un clic de venderse",
        "Acumulación institucional con intención de mantener",
        "Una señal alcista inmediata para operar intradía",
        "Ruido irrelevante: los flujos de exchanges no tienen valor informativo",
      ],
      correcta: 0,
      leccion: "4-4-0",
    },
    {
      q: "El MVRV de Bitcoin cae por debajo de 1. ¿Qué significa y cómo debe usarse ese dato?",
      opciones: [
        "El precio triplica su costo base: euforia de ciclo",
        "Es una señal de venta inmediata para el intradía",
        "El mercado en conjunto está en pérdida: zona histórica de capitulación y suelo, útil como contexto de ciclo en semanas y meses",
        "La red perdió la mitad de sus usuarios activos",
      ],
      correcta: 2,
      leccion: "4-4-0",
    },
    {
      q: "Un protocolo DeFi ofrece 80% de APY pagado en su propio token de emisión. Según la regla central de la lección, ¿cuál es la lectura correcta?",
      opciones: [
        "Es rendimiento genuino: los contratos inteligentes no pueden mentir",
        "Probable dilución disfrazada: si no puedes explicar quién paga ese rendimiento, el que paga eres tú",
        "Es seguro siempre que el protocolo tenga auditoría",
        "Conviene entrar rápido antes de que baje el APY",
      ],
      correcta: 1,
      leccion: "4-4-1",
    },
    {
      q: "Según las reglas RIC para DeFi, ¿qué condiciones mínimas debe cumplir un protocolo antes de depositar capital?",
      opciones: [
        "APY superior al 50% y token propio en tendencia alcista",
        "Estar listado en al menos un exchange centralizado grande",
        "Haber sido lanzado en los últimos seis meses, cuando el rendimiento es mayor",
        "Años de historia, auditorías múltiples y valor bloqueado alto; y aun así, solo capital satélite",
      ],
      correcta: 3,
      leccion: "4-4-1",
    },
    {
      q: "La dominancia de BTC cae con fuerza mientras las monedas más especulativas multiplican su precio. ¿En qué fase del ciclo estás y qué implica?",
      opciones: [
        "Fase de acumulación temprana: momento de máxima agresividad compradora",
        "Inicio del ciclo: el capital recién entra a Bitcoin",
        "Altseason: la fase más rentable y a la vez la señal de que el ciclo madura y el techo históricamente no queda lejos",
        "Un fallo de la métrica: la dominancia no puede caer en mercado alcista",
      ],
      correcta: 2,
      leccion: "4-4-2",
    },
    {
      q: "Un amigo asegura que BTC hará x20 este ciclo porque eso hizo el anterior. Según la lección, ¿cuál es el problema de ese razonamiento?",
      opciones: [
        "Extrapola tres muestras como si fueran una ley, ignorando los rendimientos decrecientes de cada ciclo",
        "Se queda corto: cada ciclo multiplica más que el anterior",
        "El halving dejó de existir después de 2024",
        "Los ciclos de BTC duran exactamente dos años, no cuatro",
      ],
      correcta: 0,
      leccion: "4-4-2",
    },
    {
      q: "Recibes un mensaje de un supuesto soporte técnico que necesita tus 12 palabras para validar tu wallet tras una actualización. ¿Cuál es la respuesta correcta?",
      opciones: [
        "Dárselas solo si el mensaje viene del dominio oficial",
        "Darle las primeras 6 palabras como verificación parcial",
        "Pedirle que se identifique con un video en vivo antes de compartirlas",
        "No dárselas jamás: nadie legítimo pide la semilla; quien la pide, roba, sin excepciones",
      ],
      correcta: 3,
      leccion: "4-4-3",
    },
    {
      q: "Vas a migrar tu capital cripto a una hardware wallet nueva. Según la lección, ¿cuál es el procedimiento correcto?",
      opciones: [
        "Transferir todo el mismo día para minimizar el tiempo de exposición",
        "Probar primero con un monto pequeño: enviar, restaurar la wallet desde la semilla en un dispositivo limpio, verificar, y recién entonces migrar por partes",
        "Guardar una foto de la semilla en la nube como respaldo antes de migrar",
        "Comprar el dispositivo usado para ahorrar y migrar de inmediato",
      ],
      correcta: 1,
      leccion: "4-4-3",
    },
    {
      q: "Quieres abrir un largo en oro, pero el DXY está rompiendo máximos y las tasas reales suben. Según el análisis intermarket, ¿qué describe mejor la situación?",
      opciones: [
        "Remas contra dos corrientes: dólar fuerte y tasas reales al alza presionan al oro a la vez",
        "Contexto ideal: el oro sube siempre con el dólar",
        "Contexto neutro: el oro solo responde a la oferta minera",
        "Da igual el contexto: el intermarket no aplica a metales",
      ],
      correcta: 0,
      leccion: "4-5-0",
    },
    {
      q: "Las tasas nominales suben con fuerza, pero la inflación corre aún más rápido. ¿Qué implica ese escenario para el oro según la lección?",
      opciones: [
        "El oro cae siempre que suben las tasas nominales",
        "El oro deja de cotizar contra el dólar en ese régimen",
        "Puede favorecer al oro: lo que le importa es la tasa real (nominal menos inflación), que en ese caso baja",
        "El oro pasa a comportarse igual que las tecnológicas",
      ],
      correcta: 2,
      leccion: "4-5-0",
    },
    {
      q: "Tu cuenta de trading tenía asignado el 10% del capital total y tras un gran año se duplicó. Según la arquitectura núcleo-satélite, ¿qué corresponde hacer?",
      opciones: [
        "Dejarla crecer: el tamaño asignado era solo para empezar",
        "Rotar el excedente al núcleo: la ganancia especulativa se consolida en patrimonio y el satélite vuelve a su tamaño",
        "Duplicar también los demás satélites para mantener la proporción entre ellos",
        "Retirar todo a efectivo y pausar el trading seis meses",
      ],
      correcta: 1,
      leccion: "4-5-1",
    },
    {
      q: "¿Cuál es el trabajo del núcleo del portafolio según la lección?",
      opciones: [
        "Superar al índice cada año mediante rotación sectorial activa",
        "Financiar los satélites cuando tienen pérdidas",
        "Generar liquidez para promediar a la baja en las caídas del trading",
        "Capturar el rendimiento de los mercados a largo plazo con costos mínimos, sin depender de que aciertes: no intenta ganarle al índice, intenta serlo",
      ],
      correcta: 3,
      leccion: "4-5-1",
    },
    {
      q: "Tu asignación objetivo era 60/25/15 y tras un año alcista de acciones el portafolio real es 72/18/10. ¿Qué hace el rebalanceo en ese momento?",
      opciones: [
        "Nada: los pesos se corrigen solos con el tiempo",
        "Comprar más acciones para acompañar la tendencia ganadora",
        "Vender parte de lo que subió y comprar lo rezagado: el mecanismo estructural de vender caro y comprar barato sin opinar",
        "Pasar todo a efectivo hasta que el mercado corrija",
      ],
      correcta: 2,
      leccion: "4-5-2",
    },
    {
      q: "Operas NQ en tu cuenta de trading, tienes tecnológicas en el núcleo y BTC como satélite. ¿Cuál es la trampa que señala la lección de correlación?",
      opciones: [
        "En un shock de tasas los tres caen juntos: es una sola apuesta a activos sensibles a tasas disfrazada de diversificación",
        "Ninguna: son tres clases de activos distintas y por lo tanto diversificadas",
        "El problema es solo operativo: demasiadas plataformas que vigilar",
        "BTC siempre sube cuando el Nasdaq cae, así que se cubren entre sí",
      ],
      correcta: 0,
      leccion: "4-5-2",
    },
    {
      q: "En la fase aguda de 2008, hasta el oro cayó junto con las acciones. ¿Cuál es la explicación que da la lección?",
      opciones: [
        "El oro dejó de ser refugio de forma permanente ese año",
        "Los bancos centrales vendieron sus reservas de oro coordinadamente",
        "Fue una anomalía estadística sin explicación mecánica",
        "En pánico agudo los apalancados venden lo que pueden vender, no lo que quieren: la liquidez manda y las correlaciones van a 1",
      ],
      correcta: 3,
      leccion: "4-5-3",
    },
    {
      q: "En marzo de 2020, quien quiso cubrirse cuando ya vio venir la caída pagó precios altísimos por las puts. ¿Qué lección de cobertura deja ese episodio?",
      opciones: [
        "Las puts no funcionan en crisis rápidas",
        "El seguro se compra antes del incendio: la cobertura reactiva es carísima",
        "Conviene esperar al fondo para comprar protección barata",
        "La única cobertura válida en 2020 fue el oro",
      ],
      correcta: 1,
      leccion: "4-5-3",
    },
    {
      q: "Un trader LATAM gana 5.000 dólares en un broker de EE.UU. y dice que no tributa porque nunca transfirió el dinero a su banco local. Según la lección, ¿es correcto?",
      opciones: [
        "No: la residencia fiscal por renta mundial grava la ganancia cuando se genera, no cuando se transfiere",
        "Sí: el hecho imponible es el depósito en cuenta local",
        "Sí, siempre que el monto sea menor a 10.000 dólares",
        "Solo tributa si el broker emite factura local",
      ],
      correcta: 0,
      leccion: "4-6-0",
    },
    {
      q: "¿Qué determina qué país tiene derecho a gravarte según los conceptos que ordenan la fiscalidad?",
      opciones: [
        "La nacionalidad que figura en tu pasaporte",
        "El país donde está regulado tu broker",
        "La residencia fiscal: criterios de permanencia y centro de intereses vitales, no la nacionalidad",
        "El país en cuya moneda están denominadas tus cuentas",
      ],
      correcta: 2,
      leccion: "4-6-0",
    },
    {
      q: "Tu broker de EE.UU. quiebra y tenías 200.000 dólares en valores. Además, ese año tu cartera cayó 30% por el mercado. ¿Qué cubre el esquema SIPC?",
      opciones: [
        "Ambas cosas: la quiebra y la pérdida de mercado",
        "Los valores ante la quiebra del broker (hasta 500.000), pero jamás las pérdidas de mercado, que son tuyas",
        "Solo la pérdida de mercado, hasta un 20%",
        "Nada: SIPC solo protege a residentes de EE.UU.",
      ],
      correcta: 1,
      leccion: "4-6-1",
    },
    {
      q: "Un broker se anuncia sin comisiones y otro cobra 1 dólar por operación. Según la lección, ¿cómo se comparan correctamente?",
      opciones: [
        "El sin comisiones gana siempre: cero es cero",
        "Por la cantidad de instrumentos que ofrece cada uno",
        "Por el bono de bienvenida y las reseñas de influencers",
        "Por el costo total: spread, cambio de divisa, mantenimiento y retiros; el sin comisiones puede resultar más caro",
      ],
      correcta: 3,
      leccion: "4-6-1",
    },
    {
      q: "Abres una LLC extranjera cuya única actividad es tu trading personal, esperando dejar de tributar en tu país. ¿Qué advierte la lección?",
      opciones: [
        "Funciona siempre que la LLC esté en Delaware o New Mexico",
        "Funciona si no repatrías los dividendos nunca",
        "Las normas antidiferimiento permiten al fisco atribuirte las rentas pasivas como propias, sociedad o no: suele ser una LLC mal declarada",
        "Es ilegal constituir sociedades en el extranjero desde LATAM",
      ],
      correcta: 2,
      leccion: "4-6-2",
    },
    {
      q: "¿Cuándo empieza a tener sentido discutir en serio una estructura societaria según la regla práctica RIC?",
      opciones: [
        "Cuando hay ingresos consistentes de negocio real, el objetivo es protección u orden sucesorio y el ahorro proyectado supera con claridad los costos fijos",
        "Desde la primera operación rentable, para no perder tiempo",
        "Cuando un video de YouTube muestra el modelo que usan los influencers",
        "Nunca: las sociedades no aportan nada a un trader",
      ],
      correcta: 0,
      leccion: "4-6-2",
    },
    {
      q: "Repasando para el examen del nivel, reconoces el resultado de la pérdida impermanente cuando lo ves, pero no puedes reconstruir el cálculo a mano. Según la lección, ¿qué significa?",
      opciones: [
        "Que ya dominas el tema: reconocer es la meta",
        "Que el ejemplo era demasiado difícil y no será evaluado",
        "Que conviene memorizar el número final y seguir adelante",
        "Que todavía no entendiste el concepto: si solo lo reconoces, no lo dominas; si puedes reconstruirlo, sí",
      ],
      correcta: 3,
      leccion: "4-6-3",
    },
    {
      q: "¿Cuál es el criterio de aprobación del examen del Nivel U y qué pasa si no lo alcanzas?",
      opciones: [
        "6 de 10 con límite de 30 segundos por pregunta",
        "8 de 10 sin límite de tiempo; si no apruebas, repasas los módulos flojos y lo rindes de nuevo sin penalidad",
        "10 de 10 en el primer intento o se repite el nivel completo",
        "8 de 10, con un máximo de dos intentos de por vida",
      ],
      correcta: 1,
      leccion: "4-6-3",
    },
    {
      q: "Un alumno con 55% de acierto en oro agrega índices y cripto; seis meses después mantiene 54% en oro pero 38% en los nuevos, y su resultado global empeoró. ¿Qué diagnóstico da la lección?",
      opciones: [
        "Financió dos aprendizajes con el capital que su ventaja real generaba: la atención no se diversifica, se divide",
        "Diversificó bien: el resultado global mejorará solo con el tiempo",
        "Su sistema de oro se rompió al mismo tiempo, pura coincidencia",
        "Le faltó agregar un cuarto mercado para compensar",
      ],
      correcta: 0,
      leccion: "4-7-0",
    },
    {
      q: "Según el protocolo RIC de expansión, ¿cómo se gana su lugar un instrumento nuevo en tu operativa?",
      opciones: [
        "Con una semana de resultados positivos en real",
        "Con el respaldo de un mentor que ya lo opere",
        "Uno a la vez, en simulado o tamaño mínimo, con estadística separada y 30–50 operaciones registradas rentables",
        "Operándolo en paralelo con todos los demás para comparar rápido",
      ],
      correcta: 2,
      leccion: "4-7-0",
    },
    {
      q: "Estás en drawdown y al auditar el diario descubres que la racha coincide con varias violaciones de tu plan. Según el diagnóstico en tres capas, ¿qué concluyes?",
      opciones: [
        "El mercado cambió de régimen y hay que esperar",
        "El problema es de ejecución: eres tú, no el sistema; es la causa más frecuente y la más barata de arreglar",
        "La ineficiencia estructural desapareció: hay que cambiar de sistema",
        "Es pura varianza: no hay nada que corregir",
      ],
      correcta: 1,
      leccion: "4-7-1",
    },
    {
      q: "Durante la travesía de un drawdown, ¿cuál es la métrica correcta para evaluarte según el protocolo?",
      opciones: [
        "La distancia porcentual hasta el máximo de la cuenta",
        "La cantidad de trades ganadores de la semana",
        "El rendimiento comparado contra el índice de referencia",
        "El porcentaje de operaciones ejecutadas según plan: es lo único que controlas y lo que predice tu salida",
      ],
      correcta: 3,
      leccion: "4-7-1",
    },
    {
      q: "Agregaste cinco filtros a tu sistema: en el histórico la esperanza sube de 0,4R a 0,6R, pero en adelante rinde 0,2R. ¿Qué fenómeno describe la lección?",
      opciones: [
        "Mala suerte transitoria: los filtros necesitan más tiempo",
        "Decaimiento natural de toda estrategia con la edad",
        "Sobreajuste: cada filtro ajusta mejor el pasado optimizando contra el ruido, y rinde peor el futuro",
        "El mercado detectó tus filtros y los arbitró",
      ],
      correcta: 2,
      leccion: "4-7-2",
    },
    {
      q: "Según la navaja RIC, ¿cómo entra un elemento nuevo (filtro, indicador, capa de análisis) a tu sistema?",
      opciones: [
        "A prueba, con hipótesis medible y muestra de 30–50 operaciones contra la versión simple; si no mejora la esperanza neta con claridad, se elimina",
        "Directo a real si tiene lógica sólida: la lógica vale más que la muestra",
        "Solo si lo usan traders institucionales reconocidos",
        "Se agregan varios a la vez para medir el efecto conjunto",
      ],
      correcta: 0,
      leccion: "4-7-2",
    },
    {
      q: "Según la lección de calibración, ¿cuál es el mejor estimador de tu tolerancia real al riesgo?",
      opciones: [
        "El porcentaje que marcaste en el formulario de perfil de riesgo",
        "El drawdown máximo que tu backtest teórico proyecta",
        "El promedio de tolerancia de los traders de tu comunidad",
        "El peor drawdown que atravesaste sin violar el sistema: tu tolerancia demostrada con datos, no declarada",
      ],
      correcta: 3,
      leccion: "4-7-3",
    },
    {
      q: "Quieres subir tu tamaño de posición. Aplicas la prueba del doble: si mañana pierdes dos veces seguidas el riesgo nuevo, ¿ejecutas la tercera señal según plan? Tu respuesta honesta es no. ¿Qué concluyes?",
      opciones: [
        "Puedes subir igual: la disciplina se entrena en vivo",
        "El tamaño nuevo excede tu tolerancia operativa, diga lo que diga el saldo de tu cuenta",
        "Debes subir el doble de lo planeado para desensibilizarte rápido",
        "La prueba solo aplica a traders principiantes",
      ],
      correcta: 1,
      leccion: "4-7-3",
    },
  ];





  /* ===== Módulo CNV · temario examen de idoneidad CNV (se agregó en septiembre de 2026) ===== */
  /* ============ Módulo 8 · Derivados, fideicomisos y estructuras del mercado de capitales (CNV) ============ */

  L["4-8-0"] = {
    resumen: "Opciones, futuros, forwards y swaps con el vocabulario del mercado regulado: prima, strike, lanzador, spreads con números y la diferencia entre cubrirse y especular.",
    duracionVideo: "12-18 min",
    lectura: `<p>Ya operaste derivados en este programa. Ahora vas a verlos con el vocabulario exacto que usa la Comisión Nacional de Valores: aquí no se trata de operar, sino de definir, distinguir y saber quién asume qué riesgo.</p>
<h4>Qué es un derivado y qué es el subyacente</h4>
<p>Un <strong>derivado</strong> es un contrato cuyo valor deriva del valor de otro activo, llamado <strong>subyacente</strong>: una acción, un bono, una moneda, una tasa de interés, un índice o una materia prima (soja, maíz, trigo). Comprar un derivado no es comprar el subyacente: es comprar o vender un derecho o una obligación sobre él.</p>
<h4>Opciones: call y put</h4>
<p>Una <strong>opción</strong> le da a su comprador el derecho, pero no la obligación, de comprar o vender el subyacente a un precio fijado de antemano, el <strong>precio de ejercicio</strong> o <strong>strike</strong>, hasta una fecha de <strong>vencimiento</strong>.</p>
<ul>
<li><strong>Call:</strong> derecho a comprar al strike. Se compra esperando una suba.</li>
<li><strong>Put:</strong> derecho a vender al strike. Se compra esperando una baja o para proteger una tenencia.</li>
<li><strong>Americana:</strong> se ejerce en cualquier momento hasta el vencimiento. <strong>Europea:</strong> solo en la fecha de vencimiento.</li>
</ul>
<h4>Comprador y lanzador: quién arriesga qué</h4>
<p>Esta es la distinción más importante de todo el capítulo. El <strong>comprador o titular</strong> paga la <strong>prima</strong> y adquiere un derecho: si el mercado no lo acompaña, no ejerce, y su <strong>pérdida máxima es la prima pagada</strong>. El <strong>lanzador o vendedor</strong> cobra la prima y asume una obligación: si el comprador ejerce, debe cumplir. Su ganancia máxima es la prima; su pérdida puede ser muy grande.</p>
<p>Cuando el lanzador de un call no tiene las acciones se lo llama <strong>lanzador descubierto</strong>, y su pérdida teórica es ilimitada: el precio puede subir sin techo y él deberá comprar en el mercado para entregar al strike. Por eso se le exigen garantías. Si tiene las acciones depositadas, hay <strong>lanzamiento cubierto</strong>.</p>
<h4>La prima por dentro: valor intrínseco y valor tiempo</h4>
<p><strong>Prima = valor intrínseco + valor tiempo.</strong> El <strong>valor intrínseco</strong> es lo que ganarías ejerciendo ahora mismo; nunca es negativo. El <strong>valor tiempo</strong> es lo que el mercado paga por la posibilidad de que la opción mejore antes del vencimiento, y se consume a medida que esa fecha se acerca. Ejemplo: la acción cotiza a 108 pesos y un call strike 100 vale 11 de prima: 8 de valor intrínseco y 3 de valor tiempo. Al vencimiento el valor tiempo es cero.</p>
<p>Una opción está <strong>in the money</strong> cuando conviene ejercerla (call con strike por debajo del precio de mercado, put con strike por encima), <strong>at the money</strong> cuando el strike es casi igual al precio, y <strong>out of the money</strong> cuando no conviene ejercer y la prima es puro valor tiempo.</p>
<h4>Cuatro estrategias con números</h4>
<p><strong>Lanzamiento cubierto.</strong> Carla tiene 100 acciones compradas a 100 pesos y lanza un call strike 110 cobrando 4 de prima. Si la acción queda en 105 no se la ejercen y conserva la prima. Si sube a 130 se la ejercen: vende a 110 y su resultado queda topeado en 14 pesos por acción. Cambió potencial de suba por un ingreso seguro hoy.</p>
<p><strong>Protective put.</strong> Bruno tiene la acción en 100 y compra un put strike 95 pagando 3. Si la acción cae a 60, igual vende a 95: su pérdida máxima es 8 pesos. Es un seguro con prima.</p>
<p><strong>Bull call spread</strong> (alcista, con calls). Ana compra un call strike 100 pagando 6 y lanza un call strike 120 cobrando 2. Costo neto 4 pesos: esa es su <strong>pérdida máxima</strong>. Su <strong>ganancia máxima</strong> es 120 menos 100 menos 4, igual a 16 pesos, y empieza a ganar desde 104: paga menos que comprando el call solo, pero renuncia a lo que pase de 120.</p>
<p><strong>Bear put spread</strong> (bajista, con puts). Ana compra un put strike 100 pagando 7 y lanza un put strike 80 cobrando 2. Costo neto 5 pesos, su pérdida máxima. Ganancia máxima: 100 menos 80 menos 5, igual a 15 pesos, si la acción cae a 80 o menos. Ambos spreads limitan la ganancia y limitan la pérdida.</p>
<h4>Futuros y forwards: parecidos, muy distintos</h4>
<p>Un <strong>futuro</strong> es un contrato para comprar o vender un subyacente en una fecha futura a un precio pactado hoy. A diferencia de la opción, las dos partes están obligadas. Sus notas distintivas:</p>
<ul>
<li><strong>Estandarizado:</strong> el mercado define tamaño, calidad y vencimiento.</li>
<li><strong>Se negocia en un mercado autorizado por la CNV.</strong> En Argentina, A3 Mercados (fusión de MAE y Matba Rofex) concentra el dólar futuro y los futuros agropecuarios.</li>
<li><strong>Márgenes y ajuste diario:</strong> margen inicial y débito o crédito diario de las diferencias a precio de mercado (mark to market).</li>
<li><strong>Cámara compensadora:</strong> se interpone como contraparte central y garantiza el cumplimiento, de modo que el riesgo de contraparte bilateral desaparece.</li>
</ul>
<p>Un <strong>forward</strong> es el mismo acuerdo pero <strong>OTC</strong> (fuera de mercado): a medida, por el monto y el plazo que las partes quieran, sin estandarización, sin ajuste diario y sin cámara. Se liquida al vencimiento y cada parte carga con el <strong>riesgo de contraparte</strong>: flexibilidad a cambio de riesgo y de menos liquidez.</p>
<h4>Swaps</h4>
<p>Un <strong>swap</strong> intercambia flujos de fondos durante un período. El <strong>swap de tasa</strong> cambia tasa fija por variable (una empresa endeudada a tasa variable que busca previsibilidad); el <strong>swap de monedas</strong> intercambia flujos en dos monedas, útil para quien cobra en pesos y debe en dólares. Son OTC.</p>
<h4>Cobertura, especulación y arbitraje</h4>
<p>El mismo contrato sirve para tres cosas distintas, y se distinguen por la <strong>intención y la posición previa</strong> de quien opera:</p>
<ul>
<li><strong>Cobertura (hedge):</strong> compensa un riesgo que ya se tiene. Un importador que en 90 días debe pagar 500.000 dólares compra dólar futuro: si el dólar sube, gana en el futuro lo que pierde al pagar más caro. Un exportador de soja vende futuros: si el precio cae, la pérdida en el grano se compensa con el contrato. El objetivo no es ganar: es fijar un precio.</li>
<li><strong>Especulación:</strong> se asume riesgo sin posición previa, apostando a una dirección. Es legítima, pero el apalancamiento amplifica las pérdidas.</li>
<li><strong>Arbitraje:</strong> aprovecha una diferencia de precio del mismo activo entre dos mercados o entre contado y futuro, con riesgo acotado.</li>
</ul>
<p><strong>Aplicación práctica:</strong> cuando un cliente te diga que quiere "cubrirse", averigua primero qué posición real tiene hoy. Si no tiene ninguna, no se está cubriendo: está especulando, y el producto y la explicación que le corresponden son otros. RIC no es un agente registrado ante la CNV: esto es formación, no asesoramiento.</p>
<p><strong>Para recordar:</strong> el comprador de una opción paga prima, tiene derecho y pierde como máximo la prima; el lanzador cobra prima, tiene obligación y, descubierto en un call, su pérdida es teóricamente ilimitada. Futuro: estandarizado, en mercado, con márgenes, ajuste diario y cámara. Forward: OTC, a medida, con riesgo de contraparte.</p>`,
    claves: [
      "Derivado: su valor deriva de un activo subyacente",
      "Comprador pierde la prima; lanzador descubierto, mucho más",
      "Prima = valor intrínseco + valor tiempo",
      "Futuro: mercado, márgenes y cámara; forward: OTC y contraparte",
    ],
  };

  L["4-8-1"] = {
    resumen: "Cómo se arma un fideicomiso financiero: quién es quién, qué son los VRD y los certificados de participación, y cómo se securitiza una cartera de créditos paso a paso.",
    duracionVideo: "12-18 min",
    lectura: `<p>El fideicomiso financiero es una de las herramientas más usadas del mercado de capitales argentino y una de las peor entendidas. Sirve para convertir créditos que todavía no se cobraron en dinero fresco hoy.</p>
<h4>El fideicomiso común, en el Código Civil y Comercial</h4>
<p>Hay <strong>fideicomiso</strong> cuando una persona transmite bienes a otra, que se obliga a administrarlos en beneficio de un tercero y a entregarlos al final a quien se haya designado. El Código Civil y Comercial define cuatro partes:</p>
<ul>
<li><strong>Fiduciante:</strong> quien transmite los bienes (también llamado fideicomitente).</li>
<li><strong>Fiduciario:</strong> quien recibe los bienes y los administra según el contrato. No es el dueño para sí: es dueño en confianza, con un destino fijado.</li>
<li><strong>Beneficiario:</strong> quien recibe los frutos o el flujo que genera el fideicomiso.</li>
<li><strong>Fideicomisario:</strong> quien recibe los bienes remanentes cuando el fideicomiso termina.</li>
</ul>
<p>La pieza clave es el <strong>patrimonio separado</strong>: los bienes fideicomitidos salen del patrimonio del fiduciante y no se confunden con el del fiduciario, y no responden por las deudas de ninguno de los dos. Si el fiduciante quiebra, sus acreedores no pueden ir contra esos bienes. Ese aislamiento es lo que hace posible todo lo demás.</p>
<h4>Qué le agrega el fideicomiso financiero</h4>
<p>El <strong>fideicomiso financiero</strong> es una especie dentro del género. Tiene dos particularidades que lo ponen bajo la Comisión Nacional de Valores:</p>
<ul>
<li>El fiduciario debe ser una <strong>entidad financiera</strong> o una sociedad especialmente autorizada por la CNV para actuar como <strong>fiduciario financiero</strong>, inscripta en su registro.</li>
<li>Los beneficiarios son titulares de <strong>valores negociables</strong> emitidos por el propio fideicomiso: <strong>valores representativos de deuda (VRD)</strong> y <strong>certificados de participación (CP)</strong>.</li>
</ul>
<p>Si esos valores se colocan por <strong>oferta pública</strong>, hacen falta autorización de la CNV, un <strong>prospecto</strong> (y el suplemento de prospecto de cada serie) con toda la información del activo subyacente y de los riesgos, y en general una <strong>calificación de riesgo</strong> emitida por un agente de calificación registrado. Recuerda que una calificación es una opinión sobre la capacidad de pago, nunca una recomendación de compra.</p>
<h4>VRD y CP: la diferencia central</h4>
<p>Los <strong>VRD</strong> son deuda: prometen un capital y un interés, y cobran primero. Los <strong>CP</strong> son participación: no prometen una tasa, dan derecho al remanente del flujo una vez pagados todos los VRD y los gastos. Cobran últimos y por eso son el tramo más riesgoso y, potencialmente, el más rentable. Es el mismo razonamiento que separa a un bono de una acción, trasladado al fideicomiso.</p>
<h4>Una securitización paso a paso, con números</h4>
<p>Consumo Sur S.A. es una cadena de electrodomésticos que vende en 12 cuotas. Tiene 20.000 créditos que suman 500 millones de pesos por cobrar a lo largo de un año, pero necesita el dinero ahora. Puede pedir un préstamo o puede <strong>securitizar</strong> (titulizar) esa cartera:</p>
<ol>
<li>Consumo Sur actúa como <strong>fiduciante</strong> y transmite los 500 millones de créditos a un fideicomiso financiero. Los créditos dejan de ser suyos: ahora son patrimonio separado.</li>
<li>Un banco autorizado por la CNV actúa como <strong>fiduciario financiero</strong>, administra el fideicomiso y cobra las cuotas (a veces la cobranza queda delegada en el propio originante).</li>
<li>El fideicomiso <strong>emite valores</strong> contra ese flujo, con oferta pública autorizada por la CNV: 350 millones en <strong>VRD Clase A</strong>, 75 millones en <strong>VRD Clase B</strong> y 75 millones en <strong>certificados de participación</strong>.</li>
<li>Los inversores compran esos valores y el dinero, menos gastos y comisiones, va a Consumo Sur.</li>
<li>Cada mes entran las cuotas. El fiduciario aplica la <strong>cascada de pagos</strong>: primero gastos e impuestos del fideicomiso, después los VRD Clase A, después los VRD Clase B y, si sobra, los CP.</li>
</ol>
<p>Ese orden se llama <strong>subordinación</strong>. Si la mora resulta del 10 %, en lugar de 500 millones entran 450: alcanza para pagar los 350 de la Clase A y los 75 de la Clase B, y los CP cobran 25 en lugar de 75. Con una mora del 30 % los CP no cobran nada y la Clase B empieza a sufrir. La Clase A solo se afecta cuando todo lo que está debajo ya se consumió: por eso recibe la mejor calificación y paga la tasa más baja.</p>
<h4>Los riesgos que hay que explicarle al cliente</h4>
<ul>
<li><strong>Riesgo de crédito o mora:</strong> los deudores de la cartera no pagan. Es el riesgo principal y depende de la calidad del activo subyacente, no del nombre del originante.</li>
<li><strong>Riesgo de precancelación o prepago:</strong> los deudores cancelan antes de tiempo, el flujo se acorta y el rendimiento previsto cambia.</li>
<li><strong>Riesgo del fiduciario y del administrador de la cobranza:</strong> mala gestión, o que el originante que cobra las cuotas no transfiera los fondos.</li>
<li><strong>Riesgo de liquidez:</strong> muchos de estos valores se negocian poco en el mercado secundario.</li>
</ul>
<h4>Para qué se usan en Argentina</h4>
<p>Los usos típicos son tres: <strong>consumo</strong> (cuotas de comercios, préstamos personales, tarjetas), <strong>agro</strong> (fideicomisos que financian una campaña y se cancelan con la cosecha) e <strong>infraestructura</strong> (obras que se repagan con el flujo que generan). También permiten a empresas medianas financiarse sin abrir su balance: lo que se califica y se vende es la cartera, no la empresa.</p>
<h4>En qué se diferencia de un FCI y de una ON</h4>
<ul>
<li><strong>Fondo común de inversión (Ley 24.083):</strong> patrimonio indiviso de muchos cuotapartistas, administrado por una <strong>sociedad gerente</strong> y custodiado por una <strong>sociedad depositaria</strong>. La cartera es variable y hay gestión activa: el gerente decide qué comprar y vender.</li>
<li><strong>Fideicomiso financiero:</strong> patrimonio <strong>cerrado y definido de antemano</strong>, con flujo conocido y fecha de fin. No hay gerente eligiendo activos: hay un fiduciario administrando lo que ya está adentro.</li>
<li><strong>Obligación negociable (Ley 23.576):</strong> deuda de la <strong>propia empresa</strong>, que responde con todo su patrimonio. Si quiebra, el tenedor es un acreedor más. En el fideicomiso el inversor mira la cartera cedida, aislada de esa quiebra.</li>
</ul>
<p><strong>Aplicación práctica:</strong> cuando analices un fideicomiso financiero, no mires primero el nombre del fiduciante ni el del banco fiduciario: mira el activo subyacente (qué créditos son, a quién, con qué historia de mora), el tramo que estás comprando y su lugar en la cascada de pagos. Un VRD Clase A y un certificado de participación del mismo fideicomiso son inversiones de riesgo completamente distinto.</p>
<p><strong>Para recordar:</strong> fiduciante transmite, fiduciario administra, beneficiario cobra, fideicomisario recibe el remanente; patrimonio separado; fiduciario financiero autorizado por la CNV; VRD son deuda y cobran primero, CP son participación y cobran último; oferta pública exige autorización, prospecto y calificación de riesgo.</p>`,
    claves: [
      "Cuatro partes: fiduciante, fiduciario, beneficiario, fideicomisario",
      "Patrimonio separado: aislado de la quiebra del fiduciante",
      "VRD = deuda y cobran primero; CP = participación y cobran último",
      "Securitizar: convertir una cartera de créditos en valores negociables",
    ],
  };

  L["4-8-2"] = {
    resumen: "La vida de una emisora bajo oferta pública: cómo ingresa al régimen, qué órganos la controlan, cuándo una OPA es obligatoria y qué sanciones puede aplicar la CNV.",
    duracionVideo: "12-18 min",
    lectura: `<p>Una empresa que se financia en el mercado de capitales gana acceso a miles de inversores y, a cambio, entrega transparencia y control. Esta lección recorre esa vida, desde que pide autorización hasta que se va del régimen o recibe una sanción.</p>
<h4>El ingreso al régimen de oferta pública</h4>
<p>Para que sus valores puedan ofrecerse al público, la emisora necesita la <strong>autorización previa de la Comisión Nacional de Valores</strong>. Ofrecer valores al público sin esa autorización es una infracción grave y cualquiera puede denunciarla ante la CNV. El trámite exige estados financieros auditados, antecedentes, estatuto y, sobre todo, el <strong>prospecto</strong>: el documento que describe la emisora, el destino de los fondos, las condiciones de emisión y los factores de riesgo. Es la fuente oficial de información para el inversor, y la emisora responde por su contenido. Para negociar en un mercado (BYMA, A3 Mercados, MAV) hace falta además el listado en ese mercado, paso distinto de la autorización de la CNV. Las PyMEs tienen un régimen simplificado (régimen PyME CNV, vinculado a la Ley 24.467).</p>
<h4>Quién controla a la emisora por dentro: Ley 19.550</h4>
<ul>
<li><strong>Asamblea de accionistas:</strong> órgano de gobierno. Aprueba los estados financieros, elige directores y síndicos, y decide dividendos, aumentos de capital y reformas del estatuto.</li>
<li><strong>Directorio:</strong> órgano de administración. Sus miembros tienen deber de lealtad y de diligencia del buen hombre de negocios, y responden por los daños que causen.</li>
<li><strong>Sindicatura o comisión fiscalizadora:</strong> órgano de fiscalización. En las sociedades con oferta pública es colegiada: una <strong>comisión fiscalizadora</strong> de varios síndicos que dictamina sobre los estados financieros.</li>
<li><strong>Consejo de vigilancia:</strong> órgano opcional de accionistas, previsto en la Ley 19.550 y asociado a las sociedades con oferta pública; fiscaliza al directorio con alcance más amplio que la sindicatura.</li>
<li><strong>Comité de auditoría:</strong> obligatorio en las emisoras. Se integra con directores, con mayoría de <strong>directores independientes</strong>, y atiende el control interno, la relación con el auditor externo, las operaciones con partes relacionadas y los conflictos de interés.</li>
</ul>
<h4>Las obligaciones continuas</h4>
<p>Estar en el régimen no es un trámite que se hace una vez. La emisora queda sujeta al <strong>régimen informativo</strong>: estados financieros trimestrales y anuales con informe del auditor y de la comisión fiscalizadora, memoria, reseña informativa, tenencias de directores y accionistas relevantes, y publicación inmediata de todo <strong>hecho relevante</strong> apto para afectar sustancialmente la colocación o la cotización. Todo se publica en la <strong>Autopista de la Información Financiera (AIF)</strong> de la CNV, pública y gratuita. Se suma el <strong>gobierno corporativo</strong>: código de gobierno societario bajo el principio de cumplir o explicar, políticas de dividendos y remuneraciones, y trato equitativo.</p>
<h4>OPA: cuando alguien compra el control</h4>
<p>La <strong>oferta pública de adquisición (OPA)</strong> protege al accionista minoritario cuando cambia de manos el control. Si alguien paga un sobreprecio por el control, el pequeño accionista debe poder vender en las mismas condiciones y no quedar atrapado.</p>
<ul>
<li><strong>OPA obligatoria por toma de control:</strong> quien alcanza una participación de control en una sociedad con oferta pública debe lanzar una oferta al resto de los accionistas, en el plazo y con el alcance que fijan la Ley 26.831 y las Normas CNV. El precio debe ser <strong>equitativo</strong>: se consideran, entre otros parámetros, el valor patrimonial, el valor de la empresa en marcha, el precio promedio de cotización del último período y el que el propio oferente pagó en operaciones recientes.</li>
<li><strong>OPA voluntaria:</strong> la lanza quien quiere comprar sin estar obligado. Cumple igual las reglas de publicidad, trato igualitario y prorrateo.</li>
<li><strong>Retiro de la oferta pública:</strong> si la sociedad deja el régimen, debe lanzar una OPA a los minoritarios para que puedan salir a precio equitativo. No se puede abandonar el mercado dejando adentro a quien confió en él.</li>
<li><strong>Participación residual:</strong> cuando el controlante alcanza una participación casi total (el umbral legal del 95 % o más), puede declarar su voluntad de adquirir todo el capital remanente y, a su vez, los minoritarios pueden exigirle que les compre a precio equitativo. Funciona en los dos sentidos.</li>
</ul>
<h4>Un ejemplo concreto</h4>
<p>Molinos del Plata S.A. cotiza en BYMA. Un grupo inversor le compra al fundador el 60 % del capital a 1.200 pesos por acción, mientras la acción cotiza a 900, y al tomar el control queda obligado a lanzar una OPA por el resto. Ana, que tiene 500 acciones compradas a 850, tiene tres caminos: <strong>aceptar</strong> y vender a un precio que no puede ser inferior a los 1.200 pagados por el control; <strong>no aceptar</strong> y seguir como minoritaria; o, si el controlante supera el 95 %, quedar alcanzada por la participación residual y exigir que le compren. Conserva siempre sus derechos: voto, dividendo, preferencia de suscripción, información y, en ciertos supuestos, receso.</p>
<h4>El régimen sancionatorio de la CNV</h4>
<p>Ante un posible incumplimiento (por denuncia, inspección o monitoreo del mercado) la CNV instruye un <strong>sumario</strong>: notifica los cargos, garantiza el derecho de defensa y la prueba, y luego resuelve. Las sanciones de la Ley 26.831, de menor a mayor gravedad:</p>
<ul>
<li><strong>Apercibimiento</strong> (puede publicarse).</li>
<li><strong>Multa</strong>, extensible solidariamente a directores, administradores, síndicos y gerentes responsables.</li>
<li><strong>Inhabilitación hasta cinco años</strong> para ejercer como director, administrador, síndico, miembro del consejo de vigilancia o del comité de auditoría, contador dictaminante o auditor externo en entidades bajo fiscalización de la CNV.</li>
<li><strong>Suspensión hasta dos años</strong> para efectuar oferta pública o, en su caso, de la autorización para actuar.</li>
<li><strong>Prohibición de efectuar oferta pública</strong> de valores negociables o, para los agentes, prohibición definitiva de actuar.</li>
</ul>
<p>Las sanciones no caen solo sobre la sociedad: alcanzan a <strong>directores, síndicos, gerentes, auditores externos y agentes</strong> según su participación. Y son <strong>recurribles ante la Justicia</strong>: la última palabra nunca es administrativa.</p>
<p><strong>Aplicación práctica:</strong> antes de recomendar una acción, entra a la AIF de la CNV en cnv.gov.ar y revisa tres cosas: los últimos hechos relevantes, la composición del comité de auditoría y si la emisora o sus directores tienen sumarios o sanciones.</p>
<p><strong>Para recordar:</strong> la autorización de la CNV es distinta del listado en un mercado; el comité de auditoría exige mayoría de directores independientes; la OPA obligatoria nace de la toma de control y exige precio equitativo; el retiro del régimen exige OPA; la participación residual opera desde el 95 %; y la escalera de sanciones es apercibimiento, multa, inhabilitación hasta cinco años, suspensión hasta dos años y prohibición de oferta pública, previo sumario y con recurso judicial.</p>`,
    claves: [
      "Oferta pública: autorización previa de la CNV y prospecto",
      "Comité de auditoría con mayoría de directores independientes",
      "OPA obligatoria por toma de control, a precio equitativo",
      "Sanciones: apercibimiento, multa, inhabilitación, suspensión, prohibición",
    ],
  };

  EX[4].push(
    {
      q: "Ana compra un call de una acción con strike 100 pagando una prima de 6 pesos. Al vencimiento la acción cotiza a 92. ¿Cuál es su situación?",
      opciones: [
        "No ejerce y su pérdida es de 6 pesos, el total de la prima pagada",
        "Está obligada a comprar la acción a 100 y pierde 8 pesos",
        "Pierde 14 pesos: la prima más la diferencia entre el strike y el precio",
        "Puede exigirle al lanzador que le compense la caída de la acción",
      ],
      correcta: 0,
      leccion: "4-8-0",
    },
    {
      q: "Un importador debe pagar 500.000 dólares dentro de 90 días y compra dólar futuro en A3 Mercados por ese monto. ¿Cómo se clasifica la operación y por qué?",
      opciones: [
        "Arbitraje, porque aprovecha la diferencia entre el dólar contado y el futuro",
        "Especulación, porque toma una posición apalancada en moneda extranjera",
        "Cobertura, porque compensa un riesgo de tipo de cambio que ya tiene por su deuda comercial",
        "Lanzamiento cubierto, porque respalda el contrato con una obligación de pago",
      ],
      correcta: 2,
      leccion: "4-8-0",
    },
    {
      q: "En un fideicomiso financiero que securitiza créditos de consumo, la mora de la cartera resulta mayor a la prevista. ¿Quién absorbe primero esa pérdida?",
      opciones: [
        "El fiduciario, que responde con su propio patrimonio por el flujo prometido",
        "Los titulares de los certificados de participación, porque cobran después de los valores representativos de deuda",
        "Los titulares de los valores representativos de deuda Clase A, por ser el tramo de mayor monto",
        "El fiduciante, que debe recomprar los créditos en mora hasta cubrir el total emitido",
      ],
      correcta: 1,
      leccion: "4-8-1",
    },
    {
      q: "Un grupo inversor adquiere el paquete de control de una sociedad que hace oferta pública, pagando por él un precio superior al de cotización. ¿Qué obligación surge y para qué sirve?",
      opciones: [
        "Debe solicitar a la CNV el retiro del régimen de oferta pública dentro del plazo previsto",
        "Debe convocar una asamblea extraordinaria para que los minoritarios aprueben la operación",
        "No surge obligación alguna: la compra de acciones entre privados es libre",
        "Debe lanzar una oferta pública de adquisición al resto de los accionistas a un precio equitativo, para que los minoritarios puedan vender en las mismas condiciones",
      ],
      correcta: 3,
      leccion: "4-8-2",
    },
  );

  /* ===== Módulos agregados en septiembre de 2026 (contenidos faltantes) ===== */
  L["4-9-0"] = {
    resumen:
      "Cada trimestre las empresas reportan resultados. Aprende a leer EPS, ingresos, márgenes y guidance, y por qué una empresa puede superar el consenso y aun así caer.",
    duracionVideo: "14–18 min",
    lectura: `<p>Cuatro veces al año, las empresas que cotizan en bolsa publican cómo les fue. A esa publicación se le llama <strong>reporte de resultados</strong> o, en inglés, <em>earnings report</em>. Durante unas semanas concentradas, el mercado deja de mirar solo las tasas y el dólar, y mira balances. Esa ventana se conoce como <strong>temporada de balances</strong>. Para un trader no es un tema contable: es el momento del año en el que una acción puede moverse un 10 % en un segundo. Entenderlo es defensa antes que ataque.</p>
<h4>Qué publica realmente una empresa</h4>
<p>El paquete tiene tres partes. Primero, el <strong>comunicado de prensa</strong> con las cifras principales. Segundo, los <strong>estados contables</strong> completos que se presentan ante el regulador del país donde cotiza. Tercero, la <strong>llamada con analistas</strong> (<em>earnings call</em>), una teleconferencia donde la dirección explica los números y responde preguntas. La llamada suele ser la parte más informativa y la que menos gente lee.</p>
<p>Las cifras que el mercado mira primero son cuatro:</p>
<ul>
<li><strong>Ingresos</strong> (<em>revenue</em> o ventas): cuánto facturó la empresa en el trimestre.</li>
<li><strong>EPS</strong> (<em>earnings per share</em>, ganancia por acción): la ganancia neta dividida por la cantidad de acciones en circulación. Si una empresa gana 200 millones de dólares y tiene 100 millones de acciones, el EPS es 2 dólares.</li>
<li><strong>Márgenes</strong>: qué porcentaje de cada dólar vendido queda como ganancia. El margen bruto descuenta el costo de producir; el margen operativo descuenta además los gastos de operar el negocio.</li>
<li><strong>Guidance</strong>: la proyección que la propia empresa da para el trimestre o el año siguiente. Es lo único del reporte que habla del futuro.</li>
</ul>
<h4>EPS reportado y EPS ajustado</h4>
<p>Vas a ver dos EPS. El <strong>reportado</strong> sigue las normas contables al pie de la letra. El <strong>ajustado</strong> excluye partidas que la empresa considera extraordinarias: una reestructuración, una multa, el pago en acciones a empleados. El ajustado casi siempre es más favorable. No es una trampa en sí, pero es una decisión de la empresa: cuando la brecha entre ambos es grande y se repite trimestre tras trimestre, eso ya es información. Los medios titulan con el ajustado.</p>
<h4>El consenso y la sorpresa</h4>
<p>Antes del reporte, los analistas que cubren la empresa publican sus estimaciones. El promedio de todas ellas es el <strong>consenso</strong>. La diferencia entre lo reportado y el consenso es la <strong>sorpresa</strong>.</p>
<p>Ejemplo. La empresa ficticia Nortelma cotiza a 80 dólares. El consenso espera ingresos por 1.200 millones y un EPS de 1,40. Nortelma publica ingresos por 1.260 millones (5 % por encima) y un EPS de 1,52 (8,6 % por encima). Sorpresa positiva en ambas líneas. Y la acción abre al día siguiente en 71 dólares, un 11 % abajo. ¿Qué pasó?</p>
<h4>Por qué se cae con buenos números</h4>
<p>Tres motivos explican casi todos los casos.</p>
<ol>
<li><strong>El guidance.</strong> Nortelma dijo que para el trimestre siguiente espera ingresos de entre 1.150 y 1.180 millones, cuando el consenso proyectaba 1.300. El mercado paga por lo que viene, no por lo que pasó.</li>
<li><strong>La expectativa ya estaba en el precio.</strong> Si la acción subió 25 % en las cuatro semanas previas, el mercado ya descontó un buen reporte. Superar el consenso por poco, en ese contexto, decepciona.</li>
<li><strong>La calidad del número.</strong> El EPS puede haber subido por recompra de acciones (menos acciones, mismo denominador más chico) o por un ingreso extraordinario, y no porque el negocio crezca. Que los ingresos crezcan menos que el EPS es una señal a revisar.</li>
</ol>
<p>Hay un cuarto motivo, más sutil: <strong>la llamada</strong>. Si el director financiero menciona que la demanda se está enfriando o que un cliente grande redujo pedidos, el precio se mueve durante la llamada, no con el comunicado.</p>
<h4>Dónde leer todo esto</h4>
<p>Toda empresa que cotiza publica esta información gratis en la sección de relaciones con inversores de su sitio web, y en el registro del regulador correspondiente. Los portales financieros muestran el calendario de reportes, el consenso y el historial de sorpresas. No hace falta pagar por datos para prepararse: hace falta leerlos antes, no después del movimiento.</p>
<p><strong>Aplicación práctica:</strong> elige una empresa cuya acción sigas y, antes de su próximo reporte, anota en tu bitácora cuatro datos: consenso de ingresos, consenso de EPS, guidance vigente y cuánto se movió la acción en las cuatro semanas previas. Cuando salga el reporte, compara y escribe qué explicó la reacción. Con tres o cuatro reportes observados así, dejas de sorprenderte.</p>
<p><strong>Para recordar:</strong> el reporte mide el pasado, el precio cotiza el futuro. Superar el consenso no garantiza que la acción suba; lo que decide la reacción es la combinación de sorpresa, guidance y expectativa previa. Esto es formación, no asesoramiento: los datos de cada empresa hay que verificarlos en su fuente oficial.</p>`,
    claves: [
      "EPS, ingresos, márgenes y guidance: las cuatro cifras que mira el mercado",
      "La sorpresa es la diferencia entre lo reportado y el consenso de analistas",
      "Se puede batir el consenso y caer: manda el guidance y lo ya descontado",
      "La llamada con analistas suele mover más el precio que el comunicado",
    ],
  };

  L["4-9-1"] = {
    resumen:
      "El mercado de opciones dice cuánto espera que se mueva una acción con su reporte. Calcula ese movimiento implícito y elige entre no operar, esperar confirmación o usar riesgo definido.",
    duracionVideo: "14–18 min",
    lectura: `<p>Un reporte de resultados es uno de los pocos eventos donde sabes la fecha exacta de un salto de precio, pero no su dirección. Eso cambia por completo la lógica de la operación: no estás leyendo un gráfico, estás tomando posición frente a un sorteo con fecha. Esta lección te da la herramienta para medir ese sorteo y tres formas serias de participar, incluida la de no participar.</p>
<h4>El movimiento implícito</h4>
<p>El mercado de opciones cotiza, en dinero, cuánto espera que se mueva la acción. La forma rápida de leerlo es el <strong>straddle</strong>: la suma de la prima de la opción de compra (<em>call</em>) y la de venta (<em>put</em>) del mismo precio de ejercicio, el más cercano al precio actual, con el vencimiento inmediatamente posterior al reporte.</p>
<p>Ejemplo. La acción de Nortelma cotiza a 80 dólares. El call de 80 con vencimiento el viernes siguiente vale 3,20 y el put de 80 vale 3,00. El straddle vale 6,20. Dividido por el precio: 6,20 / 80 = <strong>7,75 %</strong>. Ese es el movimiento implícito. El mercado espera un salto de aproximadamente 6,20 dólares, hacia arriba o hacia abajo.</p>
<p>Ese número es la vara para medir todo lo demás. Si tu tesis es que la acción sube un 4 %, el mercado ya paga por un movimiento mayor: comprar opciones ahí es caro aunque aciertes la dirección. Y si la acción se mueve 3 % tras el reporte, quien compró el straddle pierde aunque haya acertado que "se iba a mover".</p>
<h4>La compresión de la volatilidad</h4>
<p>Antes del reporte, la volatilidad implícita de las opciones de vencimiento cercano se dispara porque todos quieren cobertura. Apenas se publica el resultado, la incertidumbre desaparece y esa volatilidad colapsa. En la jerga se le llama <em>volatility crush</em>. Consecuencia práctica: comprar opciones simples el día previo es una operación con el viento en contra, porque necesita un movimiento mayor al implícito solo para empatar.</p>
<h4>Gaps: el hueco de apertura</h4>
<p>La mayoría de las empresas reporta antes de la apertura o después del cierre, justamente para que el precio se ajuste sin negociación activa. El resultado es un <strong>gap</strong>: un hueco entre el cierre anterior y la apertura. Dos comportamientos típicos, ninguno garantizado:</p>
<ul>
<li><strong>Continuación:</strong> el gap abre con volumen alto, el primer rango de 15 a 30 minutos se mantiene y el precio sigue en la dirección del hueco. Suele asociarse a sorpresas en ingresos y guidance a la vez.</li>
<li><strong>Reversión:</strong> el gap abre fuerte, no logra superar el máximo de los primeros minutos y se cierra parcial o totalmente. Suele asociarse a movimientos exagerados por posicionamiento previo más que por el dato.</li>
</ul>
<p>Los casos extremos existen y conviene tomarlos como ilustración, no como norma: acciones de gran capitalización han abierto con caídas superiores al 20 % en un solo día tras decepcionar con el guidance, y otras han subido más del 15 % en la misma situación inversa. Las cifras exactas cambian con cada caso; el punto es el orden de magnitud.</p>
<h4>Tres formas de participar</h4>
<ol>
<li><strong>No operar el reporte.</strong> Cierras o reduces la posición antes, dejas pasar el evento y operas la estructura que queda después. Es la opción por defecto para la mayoría, y no es cobardía: es elegir operar cuando tienes lectura y no cuando tienes lotería.</li>
<li><strong>Operar la reacción con confirmación.</strong> Esperas la apertura, dejas que se forme el primer rango de 15 a 30 minutos y operas la ruptura de ese rango en la dirección del gap, con invalidación clara del otro lado. El riesgo está definido por el rango, no por tu esperanza.</li>
<li><strong>Estructuras de opciones con riesgo definido.</strong> Spreads en los que la pérdida máxima es la prima neta pagada y se conoce de antemano. No eliminan el error de tesis; eliminan la posibilidad de que el error te cueste más de lo previsto.</li>
</ol>
<h4>Por qué un CFD apalancado a través del reporte es una apuesta</h4>
<p>Un contrato por diferencia apalancado no tiene pérdida máxima acotada por diseño, y en un gap tu stop no se ejecuta en el precio donde lo pusiste: se ejecuta en la primera cotización disponible después del hueco. Si Bruno tiene una posición apalancada con stop 2 % abajo y la acción abre 11 % abajo, su pérdida real es cercana al 11 % del nominal, no al 2 %. El tamaño es lo único que controlas: si decides mantener una posición a través de un reporte, dimensiona suponiendo que el stop no existe y que el movimiento adverso es al menos el implícito.</p>
<p><strong>Aplicación práctica:</strong> antes del próximo reporte de una acción que sigas, calcula el movimiento implícito con el straddle del vencimiento más cercano y anótalo. Después registra el movimiento real de la apertura. Repítelo cinco veces y vas a tener tu propia estadística de si el mercado suele pagar de más o de menos por esos eventos en ese papel.</p>
<p><strong>Para recordar:</strong> el movimiento implícito es el precio que el mercado le pone a la incertidumbre del reporte. Operar earnings sin conocerlo es apostar a ciegas; conocerlo no te da dirección, pero te dice si tu tesis vale más o menos de lo que ya está pagado. Esto es formación, no asesoramiento.</p>`,
    claves: [
      "Movimiento implícito = (call + put del strike central) dividido el precio",
      "La volatilidad implícita colapsa apenas se publica el resultado",
      "El stop no protege en un gap: se ejecuta en la primera cotización",
      "Tres caminos: no operar, operar la reacción o riesgo definido",
    ],
  };

  L["4-9-2"] = {
    resumen:
      "La temporada tiene un orden: bancos, tecnología, consumo. Saber quién reporta y cuándo te evita sorpresas en índices y te muestra la rotación entre sectores.",
    duracionVideo: "12–16 min",
    lectura: `<p>La temporada de balances no es una lluvia desordenada de reportes. Tiene un calendario bastante estable, y ese orden es información gratuita para quien opera índices, acciones o contratos por diferencia sobre ellos. Aunque nunca compres una acción individual, la temporada te afecta: mueve el índice que sí operas.</p>
<h4>El orden típico</h4>
<p>La temporada arranca unas dos semanas después del cierre de cada trimestre calendario y se concentra en unas cuatro o cinco semanas.</p>
<ul>
<li><strong>Semana 1: los grandes bancos.</strong> Abren la temporada. Sus resultados dicen cómo está el crédito, la morosidad, el consumo financiado y la actividad de fusiones y emisiones.</li>
<li><strong>Semanas 2 y 3: tecnología, semiconductores y consumo discrecional.</strong> Aquí están las empresas de mayor peso en los índices estadounidenses, y por lo tanto el mayor riesgo de movimiento del índice completo.</li>
<li><strong>Semanas 4 y 5: industriales, energía, salud, consumo básico y minoristas.</strong> Las cadenas minoristas suelen cerrar la temporada porque su trimestre contable termina más tarde.</li>
</ul>
<p>Hay un dato previo útil: algunas empresas de calendario contable desfasado reportan antes que todas las demás y funcionan como adelanto informal del clima del trimestre.</p>
<h4>Cómo se lee un sector a partir de sus primeras empresas</h4>
<p>Si los grandes bancos reportan buenos ingresos por intereses pero aumentan las <strong>previsiones por incobrabilidad</strong> (el dinero que apartan anticipando créditos que no van a cobrar), el mensaje no es "los bancos están bien": es "el crédito minorista se está deteriorando". Eso pesa sobre consumo discrecional y sobre las financieras más chicas, aunque todavía no hayan reportado.</p>
<p>Lo mismo hacia el otro lado. Si una empresa grande de semiconductores reporta demanda fuerte de centros de datos, el mercado suele extrapolar a sus proveedores y clientes antes de que estos publiquen. A esa reacción anticipada se le llama <strong>lectura cruzada</strong> (<em>read-across</em>). Es una hipótesis, no un hecho: a veces la fortaleza de una empresa es exactamente la debilidad de su competidora, porque le está quitando participación de mercado.</p>
<h4>Rotación sectorial</h4>
<p>Durante la temporada el dinero no entra y sale del mercado en bloque: se mueve entre sectores. Un índice puede quedar prácticamente plano tres días seguidos mientras por dentro la tecnología cae 3 % y la energía sube 3 %. Si operas solo el índice y no miras los sectores, esa rotación te resulta invisible y tus operaciones parecen no tener causa.</p>
<p>La herramienta simple es comparar el rendimiento de los principales sectores contra el índice en la misma ventana de tiempo, semana a semana. Lo que buscas no es el sector que más subió, sino el cambio de liderazgo: qué sector pasó de rezagado a líder.</p>
<h4>El peso de las megacaps</h4>
<p>Los índices estadounidenses principales se ponderan por capitalización, así que las empresas más grandes mandan. En los últimos años, un puñado de compañías tecnológicas llegó a representar una porción muy alta del índice; el porcentaje exacto cambia todo el tiempo y conviene verificarlo en la fuente del índice. La consecuencia operativa es directa: la noche en que reporta una de esas empresas, tu posición en el índice no es una posición diversificada, es una posición concentrada en esa compañía.</p>
<p>Carla opera un contrato por diferencia sobre un índice tecnológico. Deja la posición abierta un miércoles sin revisar el calendario. Esa noche reporta la empresa de mayor peso del índice, decepciona con el guidance, y el índice abre 2,3 % abajo. Su análisis técnico era correcto y su gestión de riesgo, no.</p>
<h4>Checklist semanal durante la temporada</h4>
<ol>
<li><strong>Lunes:</strong> anota qué empresas del índice que operas reportan esta semana y en qué día y momento (antes de la apertura o después del cierre).</li>
<li>Marca las que pesan más en el índice. Esas fechas son zonas de riesgo, no de oportunidad.</li>
<li>Decide por adelantado qué haces con posiciones abiertas en esas noches: cerrar, reducir o mantener con tamaño ajustado.</li>
<li>Al cierre de la semana, registra qué sectores lideraron y cuáles quedaron atrás.</li>
<li>Revisa si hubo lectura cruzada: alguna empresa que se movió fuerte sin haber reportado, arrastrada por otra.</li>
</ol>
<p><strong>Aplicación práctica:</strong> arma en una hoja una tabla de cinco columnas (empresa, fecha, momento del día, peso aproximado en el índice, decisión sobre posiciones abiertas) y complétala cada lunes durante la próxima temporada. Es quince minutos de trabajo que eliminan la categoría entera de pérdidas por sorpresa evitable.</p>
<p><strong>Para recordar:</strong> la temporada tiene orden y el calendario es público. No revisarlo no es análisis técnico puro: es aceptar un riesgo que podías conocer gratis. Esto es formación, no asesoramiento; los calendarios y las ponderaciones hay que verificarlos en la fuente oficial de cada índice.</p>`,
    claves: [
      "Los bancos abren la temporada; tecnología y consumo la concentran",
      "Lectura cruzada: una empresa mueve a sus pares antes de que reporten",
      "En índices por capitalización, una megacap decide la noche del reporte",
      "Checklist de lunes: quién reporta, cuándo pesa y qué hago con lo abierto",
    ],
  };

  L["4-10-0"] = {
    resumen:
      "Si no controlas las claves, no controlas las monedas. Custodia propia frente a exchange, frase semilla, wallets de hardware, aprobaciones de contratos y plan de herencia.",
    duracionVideo: "14–18 min",
    lectura: `<p>En cripto existe una frase que resume toda la lección: si no controlas las claves, no controlas las monedas. Cuando dejas tus fondos en un exchange, lo que tienes es una anotación en la base de datos de esa empresa y un derecho a reclamarle. Cuando tienes custodia propia, tienes el control directo de un par de claves criptográficas. Son dos cosas distintas, con riesgos distintos, y ninguna es gratis.</p>
<h4>Custodia de terceros frente a custodia propia</h4>
<p>La custodia en un exchange es cómoda: recuperas la contraseña, operas al instante, tienes soporte. El costo es que asumes el riesgo de contraparte. El caso de referencia es la quiebra de FTX en noviembre de 2022: un exchange que era de los más grandes del mundo, con usuarios que vieron sus fondos bloqueados de un día para el otro, en un proceso de recuperación que llevó años. No fue un hackeo: fue el uso indebido de fondos de clientes.</p>
<p>La custodia propia elimina ese riesgo y lo cambia por otro: ahora el punto débil eres tú. No hay botón de recuperar contraseña. Las pérdidas por semillas extraviadas, dispositivos rotos sin respaldo y errores de traspaso son enormes y silenciosas, porque nadie las publica.</p>
<p>La solución práctica no es elegir un bando: es repartir según función. El saldo que estás operando activamente vive en el exchange porque necesita estar ahí. El ahorro de largo plazo vive en custodia propia. Y el tamaño de cada parte lo decides tú, no la comodidad.</p>
<h4>Wallets calientes y frías</h4>
<p>Una <strong>wallet</strong> no guarda monedas: guarda claves. Las monedas están en la cadena de bloques.</p>
<ul>
<li><strong>Caliente:</strong> la clave privada está en un dispositivo conectado a internet (una app de celular, una extensión de navegador). Cómoda para montos chicos y uso frecuente. Expuesta a malware y a sitios maliciosos.</li>
<li><strong>Fría:</strong> la clave privada nunca toca un dispositivo conectado. La firma de la operación ocurre dentro de un aparato dedicado, la <strong>wallet de hardware</strong>, y lo que sale de él es solo la transacción ya firmada.</li>
</ul>
<h4>La frase semilla</h4>
<p>Al crear una wallet obtienes una <strong>frase semilla</strong>: 12 o 24 palabras en un orden determinado. De ella se derivan todas tus claves y todas tus direcciones. Quien tiene esas palabras tiene los fondos, sin importar el dispositivo. Reglas, sin excepciones:</p>
<ol>
<li>Se escribe en papel o metal, a mano. Nunca en una foto, un archivo, un gestor de contraseñas en la nube ni un mensaje a ti mismo.</li>
<li>Nunca se escribe en un teclado, salvo en el momento de restaurar una wallet en un dispositivo que confías.</li>
<li>Se guardan al menos dos copias en lugares físicos distintos, para que un incendio o una inundación no se lleve todo.</li>
<li>Nadie legítimo te la va a pedir jamás. Ni el soporte, ni un administrador, ni una actualización, ni un sorteo. Quien la pide, te está robando.</li>
</ol>
<h4>Firmas y aprobaciones: el robo que no parece robo</h4>
<p>La estafa más eficiente hoy no adivina tu clave: te convence de firmar. Cuando interactúas con una aplicación descentralizada, le das una <strong>aprobación</strong> para mover cierto token de tu wallet. Si esa aprobación es ilimitada y el contrato es malicioso, vacía tu saldo cuando quiera, incluso semanas después. A estos contratos se les llama <em>drainers</em>.</p>
<p>Defensas concretas: lee siempre qué estás firmando y desconfía de aprobaciones ilimitadas; usa una wallet separada y con saldo chico para interactuar con aplicaciones nuevas; revisa y revoca periódicamente las aprobaciones activas con las herramientas públicas de cada red; nunca entres a un sitio por un enlace de un mensaje, anuncio o resultado patrocinado.</p>
<h4>Multifirma y plan de herencia</h4>
<p>Una wallet <strong>multifirma</strong> exige varias claves para mover fondos: por ejemplo, dos de tres. Sirve para montos importantes y para eliminar el punto único de falla. La otra cara del mismo problema es la sucesión: si mañana te pasa algo, ¿alguien puede recuperar esos fondos? Un plan escrito, con instrucciones claras, ubicación de las copias y una persona de confianza que sepa que existen, es parte de la custodia. Sin eso, la custodia propia se convierte en destrucción de patrimonio diferida.</p>
<p><strong>Aplicación práctica:</strong> haz hoy tres cosas. Primero, define qué porcentaje de tu cripto necesita estar en exchange para operar y mueve el resto a custodia propia. Segundo, verifica que tienes dos copias físicas de tu frase semilla en lugares distintos y prueba una restauración con una wallet vacía para confirmar que las palabras son correctas. Tercero, revisa y revoca las aprobaciones que ya no usas.</p>
<p><strong>Para recordar:</strong> custodiar no es un trámite técnico, es la decisión de riesgo más importante de tu cripto. El exchange te expone a una empresa; la custodia propia te expone a tus propios errores. Elige a conciencia y documenta el plan. Esto es formación, no asesoramiento.</p>`,
    claves: [
      "Si no controlas las claves, no controlas las monedas",
      "La frase semilla va en papel o metal, nunca en foto, nube ni teclado",
      "Aprobaciones ilimitadas: el drenaje puede ocurrir semanas después",
      "Custodia propia sin plan de herencia es patrimonio que se pierde",
    ],
  };

  L["4-10-1"] = {
    resumen:
      "Cómo funcionan los intercambios descentralizados, los pools de liquidez y los préstamos con colateral, qué es la pérdida impermanente y dónde están los riesgos reales.",
    duracionVideo: "14–18 min",
    lectura: `<p>DeFi (finanzas descentralizadas) es el conjunto de aplicaciones que replican servicios financieros sobre una cadena de bloques, con contratos inteligentes en lugar de una empresa intermediaria. Intercambiar un token por otro, prestar, pedir prestado y ganar comisiones son las funciones básicas. Todo está a la vista: cualquiera puede auditar el código y ver cada operación. Y todo depende de que ese código esté bien escrito.</p>
<h4>El intercambio descentralizado y el creador de mercado automático</h4>
<p>Un exchange tradicional casa órdenes de compradores y vendedores en un libro. Un intercambio descentralizado (DEX) no tiene libro: tiene <strong>pools de liquidez</strong>. Un pool es un contrato con dos activos adentro, aportados por usuarios. Quien quiere intercambiar entrega uno y retira el otro, y el precio lo fija una fórmula: el <strong>creador de mercado automático</strong> o AMM.</p>
<p>La fórmula clásica dice que el producto de las dos cantidades del pool se mantiene constante. En palabras: si sacas mucho de un activo, quedan menos unidades de ese lado, y la fórmula encarece cada unidad adicional que retires. Eso genera el <strong>deslizamiento</strong>: cuanto más grande es tu operación respecto del tamaño del pool, peor precio obtienes. En un pool chico, una operación mediana se come varios puntos porcentuales.</p>
<p>Quien aporta los dos activos al pool es <strong>proveedor de liquidez</strong> y cobra una parte de la comisión de cada intercambio, típicamente una fracción pequeña de cada operación.</p>
<h4>Pérdida impermanente, con números</h4>
<p>Aquí está el costo que casi nadie calcula. Ana aporta a un pool 1 ETH valuado en 2.000 dólares y 2.000 dólares en stablecoin: 4.000 dólares en total. El ETH sube a 4.000. El pool se rebalancea solo, porque los arbitrajistas le compran el ETH barato hasta que el precio interno coincide con el de mercado.</p>
<p>Al retirar, Ana tiene aproximadamente 0,707 ETH y 2.828 dólares: unos 5.657 dólares. Si no hubiera hecho nada y se hubiera quedado con su ETH y sus dólares, tendría 6.000. La diferencia, unos 343 dólares (5,7 %), es la <strong>pérdida impermanente</strong>. Se llama impermanente porque desaparece si el precio vuelve al punto de partida, pero si Ana retira con los precios divergidos, la pérdida se hace permanente. Las comisiones cobradas tienen que superar esa diferencia para que el pool haya valido la pena, y muchas veces no lo hacen.</p>
<p>Regla derivada: cuanto más divergen los precios de los dos activos, mayor la pérdida impermanente. Por eso los pools de dos stablecoins tienen pérdida impermanente casi nula, y también rendimientos mucho menores.</p>
<h4>Préstamos, colateral y liquidación</h4>
<p>En los protocolos de crédito no hay análisis crediticio: hay <strong>sobrecolateralización</strong>. Para pedir prestados 1.000 dólares en stablecoin, Bruno deposita 2.000 dólares en ETH. Si el ETH cae y su garantía se acerca al umbral mínimo que fija el protocolo, un contrato <strong>liquida</strong> automáticamente parte de su colateral, con una penalidad, para restituir el equilibrio. No hay llamada de aviso ni negociación.</p>
<p>El uso más peligroso es el circular: depositar, pedir prestado, comprar más del mismo activo, volver a depositar. Eso construye apalancamiento real sobre un activo volátil, y una caída moderada puede liquidar toda la posición.</p>
<h4>Stablecoins: no todas son iguales</h4>
<ul>
<li><strong>Con respaldo en moneda fiduciaria:</strong> una empresa dice tener dólares o instrumentos equivalentes por cada unidad emitida. Riesgo: confiar en esa empresa, en su auditoría y en su jurisdicción.</li>
<li><strong>Con respaldo en cripto:</strong> emitidas contra colateral en exceso dentro de un protocolo. Riesgo: caídas bruscas del colateral y liquidaciones en cadena.</li>
<li><strong>Algorítmicas:</strong> sostienen la paridad con un mecanismo de emisión y quema, sin respaldo real suficiente. El colapso de Terra y su stablecoin UST en mayo de 2022 destruyó decenas de miles de millones de dólares en días. El diseño era frágil por construcción.</li>
</ul>
<h4>Los riesgos que no son de precio</h4>
<p>El código puede tener errores explotables, incluso auditado. Los <strong>puentes</strong> entre cadenas concentran fondos y han sido objeto de los mayores robos de la historia del sector, con casos individuales que superaron los cientos de millones de dólares. Los <strong>oráculos</strong>, que llevan el precio externo al contrato, pueden ser manipulados. Y está el <em>rug pull</em>: el equipo se va con los fondos. A eso se suman las comisiones de red, que en momentos de congestión pueden volver antieconómica cualquier operación chica.</p>
<p><strong>Aplicación práctica:</strong> si vas a probar DeFi, hazlo con una wallet separada, en una red conocida y con un monto que puedas perder entero sin que cambie nada en tu vida. Antes de aportar a un pool, calcula la pérdida impermanente que tendrías si uno de los dos activos duplicara su precio y compárala con la comisión anual estimada. Si el número no cierra en esa cuenta, no cierra.</p>
<p><strong>Para recordar:</strong> en DeFi tu contraparte es código y tu riesgo principal no es el precio, es el contrato. La pérdida impermanente es el costo real de proveer liquidez y hay que calcularla antes, no descubrirla al retirar. Esto es formación, no asesoramiento.</p>`,
    claves: [
      "En un AMM el precio lo fija una fórmula: operación grande, peor precio",
      "Pérdida impermanente: el pool rinde menos que mantener si los precios divergen",
      "Los préstamos se liquidan solos, sin aviso, con penalidad incluida",
      "Puentes, oráculos y contratos: los riesgos que no dependen del precio",
    ],
  };

  L["4-10-2"] = {
    resumen:
      "Staking, staking líquido y rendimiento en stablecoins: quién paga cada uno, qué riesgos tiene y cómo distinguir un rendimiento explicable de un esquema que se sostiene con dinero nuevo.",
    duracionVideo: "12–16 min",
    lectura: `<p>Hay una pregunta que resuelve el noventa por ciento de las decisiones de rendimiento en cripto: ¿quién paga esto? Si puedes responderla con precisión, tienes una inversión con un riesgo que puedes dimensionar. Si no puedes, el que paga probablemente seas tú, y solo falta saber cuándo se nota.</p>
<h4>Staking en redes de prueba de participación</h4>
<p>Las cadenas de <strong>prueba de participación</strong> validan transacciones con participantes que bloquean monedas como garantía: los <strong>validadores</strong>. A cambio cobran la emisión de nuevas monedas y una parte de las comisiones de red. Ese es el rendimiento más explicable de todo el sector, porque sabes exactamente de dónde sale: de la propia red, que te paga por asegurarla.</p>
<p>Tres cosas que hay que entender antes de bloquear nada:</p>
<ul>
<li><strong>Periodo de bloqueo:</strong> salir del staking no es instantáneo. Hay una cola de retiro que puede durar días. Si el precio se desploma, no vendes cuando quieres.</li>
<li><strong>Slashing:</strong> si el validador se comporta mal o falla de forma grave, la red confisca parte del monto en garantía. Si delegaste en un tercero, ese castigo te alcanza.</li>
<li><strong>El rendimiento es en la moneda, no en dólares:</strong> ganar 4 % anual en una moneda que cae 40 % sigue siendo una pérdida del 37 % medida en dólares.</li>
</ul>
<p>Las tasas varían por red y en el tiempo; conviene verificarlas en la fuente oficial de cada cadena y no dar por buena la cifra de un anuncio.</p>
<h4>Staking líquido</h4>
<p>Para resolver el bloqueo apareció el <strong>staking líquido</strong>: depositas tu moneda en un protocolo, este la pone en staking y te entrega a cambio un token que representa tu depósito más los intereses acumulados. Ese token se puede vender o usar en otras aplicaciones.</p>
<p>Ganas liquidez y sumas riesgos: el del contrato del protocolo, la concentración de validadores en pocos operadores, y el <strong>riesgo de despegue</strong>, es decir que el token representativo se negocie por debajo del valor de la moneda subyacente en un momento de estrés, justo cuando querías salir.</p>
<h4>Rendimiento sobre stablecoins: la pregunta clave</h4>
<p>Una stablecoin no genera nada por sí misma. Si te ofrecen rendimiento sobre ella, alguien está haciendo algo con tu dinero. Las fuentes legítimas son identificables:</p>
<ol>
<li><strong>Préstamos colateralizados:</strong> otro usuario pide prestada tu stablecoin dejando garantía y paga interés. Riesgo: liquidaciones que fallan en una caída violenta y el contrato del protocolo.</li>
<li><strong>Arbitraje de tasa de financiamiento:</strong> en los futuros perpetuos, cuando hay exceso de posiciones compradoras, estas pagan una tasa a las vendedoras. Una estrategia neutral cobra esa tasa. Riesgo: la tasa puede darse vuelta y hay riesgo del lugar donde está el colateral.</li>
<li><strong>Instrumentos de renta fija tradicionales tokenizados:</strong> el rendimiento viene de afuera del sistema cripto. Riesgo: el emisor y la estructura legal.</li>
</ol>
<p>Si el rendimiento ofrecido supera claramente lo que pagan estas fuentes, la diferencia no aparece de la nada. O hay un riesgo oculto, o hay emisión de un token propio, o hay dinero de los nuevos depositantes.</p>
<h4>Emisión de token propio: dilución disfrazada</h4>
<p>Muchos protocolos pagan rendimientos altísimos en su propio token recién creado. Eso no es un flujo de caja: es imprimir. Carla entra a un programa que ofrece 90 % anual pagado en el token del protocolo. Cobra puntualmente, pero el token pierde 80 % de su valor en tres meses porque todos los que cobran venden. Su rendimiento nominal fue enorme y su resultado en dólares, negativo.</p>
<h4>Señales de esquema insostenible</h4>
<ul>
<li>Rendimiento <strong>fijo</strong> y alto, garantizado, sin explicación de la estrategia.</li>
<li>Programa de referidos que paga por traer gente: el dinero nuevo sostiene al viejo.</li>
<li>Presión de tiempo, cupos limitados, promesas de capital asegurado.</li>
<li>Equipo anónimo, sin auditorías, sin forma de retirar en el momento que quieras.</li>
<li>Explicaciones que usan palabras técnicas sin describir nunca de dónde sale el dinero.</li>
</ul>
<p>En cuanto a impuestos, el tratamiento de las recompensas de staking y del rendimiento en cripto varía mucho según el país y cambia con frecuencia. No inventes reglas ni las copies de un foro: consulta con un contador de tu jurisdicción y guarda registro de cada acreditación con fecha y valor.</p>
<p><strong>Aplicación práctica:</strong> toma cualquier oferta de rendimiento que estés mirando y escribe en una línea, con tus palabras, quién paga y por qué. Si necesitas más de dos oraciones o aparece la palabra "sistema" sin sujeto, no pongas dinero. Después calcula el rendimiento medido en dólares, no en la moneda, suponiendo una caída del 30 % del activo.</p>
<p><strong>Para recordar:</strong> el rendimiento es el precio de un riesgo que alguien no quiso tomar. Si no identificas quién paga y qué riesgo estás asumiendo a cambio, el rendimiento no es tuyo: es el anzuelo. Esto es formación, no asesoramiento.</p>`,
    claves: [
      "Si no sabes quién paga el rendimiento, el rendimiento eres tú",
      "Staking: bloqueo, slashing y ganancia medida en la moneda, no en dólares",
      "Rendimiento pagado con token propio es dilución, no flujo de caja",
      "Tasa fija alta más referidos: señal clásica de esquema insostenible",
    ],
  };

  L["4-10-3"] = {
    resumen:
      "Cómo se ganan los airdrops, qué mirar en un protocolo nuevo (equipo, auditorías, valor bloqueado, tokenomics y desbloqueos) y cómo llevar una cartera de exploración sin quedar atrapado.",
    duracionVideo: "12–16 min",
    lectura: `<p>Un <strong>airdrop</strong> es la entrega gratuita de tokens de un protocolo a usuarios que lo usaron antes de tener token. Para el protocolo es marketing y descentralización de la propiedad. Para el usuario puede ser un ingreso real o meses de trabajo no pagado. La diferencia está en cómo eliges dónde poner tiempo y capital.</p>
<h4>Cómo se ganan</h4>
<p>Los criterios varían, pero se repiten algunos: haber usado la aplicación antes de una fecha de corte, haber aportado liquidez, haber operado en una red de prueba (<em>testnet</em>), haber acumulado puntos en un programa oficial, haber mantenido fondos cierto tiempo. Cada vez más protocolos filtran a los usuarios que operan con decenas de wallets para multiplicar la recompensa, y algunos excluyen direcciones enteras por ese motivo.</p>
<p>Lo importante: un airdrop es una posibilidad, no un contrato. Ninguna cantidad de actividad te da derecho a nada. Si tu plan de ingresos depende de que te regalen algo, no es un plan.</p>
<h4>Cómo se evalúa un protocolo nuevo</h4>
<p>Antes de dedicarle tiempo y comisiones de red, cinco preguntas:</p>
<ol>
<li><strong>Equipo y respaldo.</strong> ¿Hay nombres públicos con trayectoria verificable? ¿Quién lo financió? Un equipo anónimo no es automáticamente una estafa, pero elimina toda consecuencia reputacional si se van con los fondos.</li>
<li><strong>Auditorías.</strong> ¿El código fue auditado, por quién, y los hallazgos se corrigieron? Una auditoría reduce el riesgo, no lo elimina: protocolos auditados fueron vulnerados igual. Ninguna auditoría es peor señal que una vieja.</li>
<li><strong>Valor total bloqueado (TVL).</strong> Cuánto dinero hay depositado en el protocolo. Es un voto de confianza con dinero, pero se puede inflar con incentivos temporales: mira si el TVL se sostiene cuando bajan las recompensas.</li>
<li><strong>Tokenomics.</strong> Cuántos tokens hay, cómo se reparten y para qué sirve el token. Si el equipo y los inversores privados concentran una porción muy alta del total, tu ganancia potencial es su salida.</li>
<li><strong>Desbloqueos.</strong> Este es el punto que más gente ignora. Los tokens del equipo y de los inversores suelen liberarse por tramos en fechas conocidas y públicas. Un desbloqueo grande es una oferta de venta anunciada. Ana compró un token dos semanas antes de que se liberara un tramo equivalente al 15 % del circulante; el precio cayó de forma sostenida durante ese mes. La fecha estaba publicada desde el inicio.</li>
</ol>
<h4>Los riesgos que se cobran en tiempo y en seguridad</h4>
<ul>
<li><strong>Sitios falsos de reclamo.</strong> Después de cada airdrop anunciado aparecen páginas clonadas que piden conectar la wallet y firmar. Lo que firmas es una aprobación que vacía tu saldo. Entra solo por el enlace del canal oficial del protocolo, nunca por un anuncio, un mensaje privado ni un resultado patrocinado.</li>
<li><strong>Tokens que aparecen solos.</strong> Si te llega un token que no pediste, no interactúes con él. Muchos son el anzuelo de un contrato malicioso.</li>
<li><strong>Costo de oportunidad.</strong> Las comisiones de red y las horas invertidas son reales aunque el airdrop no llegue. Mucha gente gasta cientos de dólares persiguiendo recompensas que nunca se materializan.</li>
<li><strong>Ser la liquidez de salida.</strong> Si entras comprando el token el día que cotiza por primera vez, con volumen enorme y euforia, estás del otro lado de quienes recibieron gratis y están vendiendo.</li>
</ul>
<h4>La cartera de exploración</h4>
<p>La forma sana de participar es tratar esto como un presupuesto, no como una esperanza:</p>
<ol>
<li><strong>Capital:</strong> un porcentaje chico de tu cripto, que a su vez es una parte de tu portafolio. Dinero que puedes perder entero.</li>
<li><strong>Wallet separada</strong> de la de tus ahorros, sin conexión con la que tiene tu patrimonio real.</li>
<li><strong>Tiempo acotado:</strong> define cuántas horas por semana le dedicas y respétalo como respetas el horario de operar.</li>
<li><strong>Registro:</strong> una planilla con protocolo, fecha, monto, comisiones pagadas, tiempo dedicado y resultado. Sin ese registro no sabes si esta actividad te da o te quita dinero, y la memoria siempre recuerda el acierto.</li>
<li><strong>Regla de salida:</strong> decide de antemano qué haces si el airdrop llega. Vender una parte al recibir es una decisión, no una traición al proyecto.</li>
</ol>
<p><strong>Aplicación práctica:</strong> abre tu planilla de exploración con las seis columnas del punto 4 y carga lo que ya hiciste este año, incluidas las comisiones de red. Suma el total y divídelo por las horas dedicadas. Ese número, por incómodo que sea, es el dato que te dice si conviene seguir, ajustar o dejarlo.</p>
<p><strong>Para recordar:</strong> evaluar un protocolo es mirar quién lo hizo, quién lo auditó, quién tiene los tokens y cuándo puede venderlos. El airdrop es una posibilidad; los desbloqueos son una certeza con fecha. Esto es formación, no asesoramiento: verifica siempre en las fuentes oficiales del proyecto.</p>`,
    claves: [
      "Un airdrop es una posibilidad, nunca un derecho ni un plan de ingresos",
      "Mira equipo, auditorías, TVL, tokenomics y sobre todo los desbloqueos",
      "Reclama solo desde el canal oficial: los sitios clonados te hacen firmar",
      "Cartera de exploración: wallet aparte, capital perdible y registro escrito",
    ],
  };

  EX[4].push(
    {
      q: "Nortelma publica ingresos 5 % por encima del consenso y un EPS 8 % mejor de lo esperado, pero proyecta para el trimestre siguiente ingresos bastante menores a los que estimaban los analistas. La acción abre 11 % abajo. ¿Cuál es la mejor explicación?",
      opciones: [
        "El mercado cotiza expectativas futuras, y el guidance corrigió a la baja el escenario que ya estaba en el precio",
        "Los ingresos por encima del consenso obligan contablemente a reducir el EPS del trimestre siguiente",
        "Superar el consenso en ingresos siempre provoca toma de ganancias automática al día siguiente",
        "El EPS ajustado invalida el reporte y el mercado espera la presentación ante el regulador",
      ],
      correcta: 0,
      leccion: "4-9-0",
    },
    {
      q: "Una acción cotiza a 80 dólares. El call de strike 80 con vencimiento posterior al reporte vale 3,20 y el put del mismo strike vale 3,00. Bruno cree que la acción va a subir un 4 % con el reporte. ¿Qué le dice el movimiento implícito?",
      opciones: [
        "Que el movimiento esperado es del 4 %, exactamente lo que él proyecta, así que la operación es neutral",
        "Que el mercado ya paga por un movimiento cercano al 7,75 %, mayor que su tesis, así que comprar opciones simples es caro aunque acierte la dirección",
        "Que el movimiento esperado es del 3,9 % hacia arriba, porque el call vale más que el put",
        "Que la volatilidad implícita va a subir después del reporte y favorecerá su posición comprada",
      ],
      correcta: 1,
      leccion: "4-9-1",
    },
    {
      q: "Carla mantiene abierta una posición apalancada en un contrato por diferencia sobre un índice tecnológico ponderado por capitalización. Esa noche reporta la empresa de mayor peso del índice. ¿Cuál es el riesgo principal que está asumiendo?",
      opciones: [
        "Ninguno relevante: al ser un índice, el resultado de una sola empresa queda diluido entre todas las demás",
        "Que el mercado cierre antes del reporte y su posición se liquide automáticamente al precio de apertura",
        "Que su posición deje de estar diversificada esa noche y un gap de apertura ejecute su stop muy lejos del precio previsto",
        "Que las comisiones de financiamiento nocturno aumenten durante la temporada de balances",
      ],
      correcta: 2,
      leccion: "4-9-2",
    },
    {
      q: "Ana recibe un mensaje del supuesto soporte de su wallet: para desbloquear una actualización de seguridad debe ingresar sus 12 palabras en un formulario. ¿Qué debe hacer?",
      opciones: [
        "Ingresarlas solo si el sitio tiene certificado de seguridad y el dominio se parece al oficial",
        "Ingresar únicamente las primeras seis palabras, porque con la mitad no se puede reconstruir la wallet",
        "Ingresarlas desde una computadora sin otros archivos, para aislar el riesgo",
        "No ingresarlas nunca: ningún soporte legítimo pide la frase semilla, y quien la pide está robando",
      ],
      correcta: 3,
      leccion: "4-10-0",
    },
    {
      q: "Ana aporta a un pool 1 ETH valuado en 2.000 dólares y 2.000 dólares en stablecoin. El ETH sube a 4.000 y ella retira. ¿Qué describe mejor su resultado antes de comisiones?",
      opciones: [
        "Retira alrededor de 5.657 dólares, menos que los 6.000 que tendría si solo hubiera mantenido: esa diferencia es la pérdida impermanente",
        "Retira 8.000 dólares, porque el pool duplica ambos lados cuando uno de los activos duplica su precio",
        "Retira exactamente 6.000 dólares: el pool replica el resultado de mantener y las comisiones son ganancia neta",
        "Retira 4.000 dólares, porque el contrato fija el valor del aporte al momento del depósito",
      ],
      correcta: 0,
      leccion: "4-10-1",
    },
    {
      q: "Un protocolo ofrece 90 % anual fijo sobre stablecoins, pagado en su propio token recién emitido, y suma un programa que premia por traer nuevos depositantes. ¿Cuál es la lectura correcta?",
      opciones: [
        "Es una oportunidad válida mientras el token tenga liquidez suficiente para vender cada día lo cobrado",
        "El rendimiento se explica por el arbitraje de la tasa de financiamiento de los futuros perpetuos",
        "Pagar con emisión propia es dilución, no flujo de caja, y los referidos indican que el dinero nuevo sostiene al viejo",
        "Un rendimiento fijo es más seguro que uno variable porque no depende de las condiciones del mercado",
      ],
      correcta: 2,
      leccion: "4-10-2",
    },
    {
      q: "Bruno evalúa comprar el token de un protocolo nuevo. Encuentra que el equipo y los inversores privados concentran buena parte del total y que en tres semanas se libera un tramo grande de esos tokens. ¿Qué implica ese dato?",
      opciones: [
        "Que el proyecto está a punto de recibir financiamiento nuevo, lo que suele impulsar el precio",
        "Que hay una oferta de venta potencial anunciada con fecha, y conviene considerarla antes de comprar",
        "Que el valor total bloqueado va a crecer automáticamente al liberarse los tokens",
        "Que el token pasa a estar auditado, porque los desbloqueos requieren revisión externa del contrato",
      ],
      correcta: 1,
      leccion: "4-10-3",
    },
  );
})();
