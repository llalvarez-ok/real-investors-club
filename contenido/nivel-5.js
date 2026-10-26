/* RIC — Material de lectura · Nivel 5 (SELECTO) */
(function () {
  const L = (window.RIC_LECCIONES = window.RIC_LECCIONES || {});

  /* ===== Módulo 0 · Fondeo profesional (prop firms) ===== */

  L["5-0-0"] = {
    resumen: "El modelo de negocio real de las prop firms y la letra chica que decide si cobras: no son un regalo, son una empresa con estadísticas a su favor.",
    duracionVideo: "9-12 min",
    lectura: `<p>Antes de pagar tu primera evaluación necesitas entender con quién estás haciendo negocios. Una prop firm moderna no te presta su capital por generosidad: vende evaluaciones. Su ingreso principal proviene de las cuotas que pagan miles de aspirantes, y su modelo funciona porque la gran mayoría no supera las reglas. Si entras sin entender esto, eres parte de la estadística que financia el negocio.</p><h4>El modelo de negocio en números</h4><p>Imagina una firma que cobra 100 dólares por una evaluación de 10.000. Si 1.000 personas la compran, ingresa 100.000 dólares. Los datos públicos del sector sugieren que menos del 10 por ciento aprueba, y de los aprobados una fracción menor llega a cobrar un retiro. Supongamos que 80 traders aprueban y 30 cobran un promedio de 500 dólares: la firma paga 15.000 y retiene 85.000. Muchas cuentas fondeadas son, además, cuentas simuladas: la firma no arriesga capital real hasta que un trader demuestra consistencia, y recién entonces puede copiar sus operaciones a un libro real.</p><h4>La letra chica que debes leer</h4><p>Las reglas no son decorativas: están diseñadas para filtrar. Las más importantes son estas.</p><ul><li><strong>Drawdown diario:</strong> pérdida máxima permitida en un solo día, normalmente entre 4 y 5 por ciento. Se mide sobre balance o sobre equity según la firma, y esa diferencia importa muchísimo.</li><li><strong>Drawdown total:</strong> pérdida máxima acumulada, entre 6 y 12 por ciento. Puede ser estático o trailing.</li><li><strong>Trailing drawdown:</strong> el límite sube con tus ganancias y no baja. Es la regla que más cuentas destruye porque castiga dejar correr ganancias flotantes.</li><li><strong>Reglas de consistencia:</strong> ningún día puede representar más de cierto porcentaje del beneficio total, para evitar que apruebes con una sola apuesta grande.</li></ul><h4>Aplicación práctica</h4><p>El error común es elegir firma por publicidad o por descuento. El criterio profesional es otro: lee el contrato completo, verifica cómo se calcula cada drawdown, busca historial de pagos verificables y reseñas de traders que cobraron más de tres retiros. FTMO y Apex son ejemplos conocidos con reglas públicas y modelos distintos; estúdialas como casos de análisis, no como recomendación. Tu tarea de esta lección: descarga las reglas de dos firmas y compáralas punto por punto en una tabla propia antes de continuar el módulo.</p>`,
    claves: [
      "La prop firm vive de evaluaciones, no de tu éxito",
      "Drawdown diario y total se calculan distinto en cada firma",
      "El trailing drawdown es la regla que más cuentas quema",
      "Lee el contrato completo antes de pagar",
    ],
  };

  L["5-0-1"] = {
    resumen: "Pasar una evaluación no exige tu mejor trading, exige el más controlado: objetivos modestos, riesgo reducido y un plan matemático para no violar reglas.",
    duracionVideo: "10-14 min",
    lectura: `<p>La mayoría falla evaluaciones no porque no sepa operar, sino porque opera la evaluación como si fuera su cuenta personal. Una evaluación es un problema matemático con restricciones: tienes un objetivo de beneficio, un límite diario y un límite total. Tu sistema no cambia; tu gestión sí.</p><h4>El problema con números</h4><p>Toma una evaluación típica de 100.000 dólares: objetivo de 8 por ciento, drawdown diario de 5 por ciento y total de 10 por ciento. Si arriesgas 2 por ciento por operación, tres pérdidas seguidas en un día te dejan a una sola operación de violar el límite diario. Ahora reduce el riesgo a 0,5 por ciento: necesitas diez pérdidas consecutivas en un día para romper la regla, algo estadísticamente remoto para un sistema con 45 por ciento de acierto. Con un ratio 1:2, alcanzar el 8 por ciento requiere unas 25 a 35 operaciones. Es más lento, pero la probabilidad de terminar la evaluación vivo se multiplica.</p><h4>Principios del plan de evaluación</h4><ol><li><strong>Riesgo fijo y bajo:</strong> entre 0,25 y 0,5 por ciento por operación. El objetivo es sobrevivir, no impresionar.</li><li><strong>Presupuesto diario de pérdida:</strong> define tu propio límite en la mitad del oficial. Si la regla es 5 por ciento, tú te detienes en 2,5.</li><li><strong>Solo tus mejores setups:</strong> en evaluación operas únicamente el escenario A de tu playbook. Nada de operaciones de aburrimiento.</li><li><strong>Respeta la consistencia:</strong> si la firma exige que ningún día supere el 30 por ciento del beneficio, reparte el progreso; un día extraordinario puede invalidar tu aprobación.</li></ol><h4>Errores que pagan la cuenta de la firma</h4><p>El primero es acelerar cerca del objetivo: con 7 por ciento ganado, muchos duplican el riesgo para terminar hoy y devuelven todo. El segundo es operar noticias de alto impacto cuando el contrato lo prohíbe: hay firmas que anulan cuentas por una sola operación durante un dato macro. El tercero es encadenar evaluaciones sin pausa tras una quema, comprando de nuevo en caliente. Cada intento debe tratarse como un proyecto: plan escrito, revisión diaria y una auditoría honesta si falla. FTMO y Apex publican sus estadísticas y reglas; úsalas para calibrar tu plan, no para copiar el de otro. La evaluación premia al trader aburrido y metódico, exactamente el perfil que este nivel busca consolidar.</p>`,
    claves: [
      "La evaluación es un problema de restricciones, no de talento",
      "Riesgo por operación de 0,25 a 0,5 por ciento",
      "Tu límite diario personal: la mitad del oficial",
      "Acelerar cerca del objetivo es la muerte clásica",
    ],
  };

  L["5-0-2"] = {
    resumen: "En cuenta fondeada el drawdown es tu verdadero jefe: mide el diario y el total en tiempo real y opera con presupuesto de pérdida, no con esperanza.",
    duracionVideo: "9-12 min",
    lectura: `<p>Aprobar la evaluación es la mitad fácil. Mantener la cuenta fondeada es donde se separan los profesionales: ahora cada violación de regla no cuesta una cuota, cuesta tu fuente de ingresos. La gestión del drawdown deja de ser un concepto y se convierte en tu rutina operativa diaria.</p><h4>Diario versus total: dos relojes distintos</h4><p>El drawdown diario se reinicia cada jornada y suele medirse desde el balance o la equity del cierre anterior. El total acompaña toda la vida de la cuenta. Ejemplo con una cuenta de 50.000, límite diario de 2.000 y total de 3.000: si ayer cerraste con 51.000, hoy tu piso diario está en 49.000. Pero si tu drawdown total es trailing y tu pico de equity fue 52.000, tu piso real de cuenta es 49.000 también, y sube si sigues ganando. Debes conocer ambos números antes de abrir la primera operación del día, no descubrirlos cuando la plataforma te cierre.</p><h4>Operar con presupuesto de pérdida</h4><p>El método profesional consiste en traducir las reglas a un presupuesto. Sigue esta rutina.</p><ol><li>Calcula cada mañana tu distancia exacta al límite diario y al total.</li><li>Asigna como presupuesto operativo del día no más del 40 o 50 por ciento de esa distancia.</li><li>Divide el presupuesto entre tu riesgo por operación: ese es tu número máximo de intentos. Si tu presupuesto es 800 dólares y arriesgas 200, tienes cuatro balas. Se acabaron, se acabó el día.</li><li>Cuidado con la equity flotante: en muchas firmas una posición abierta en pérdida cuenta contra el límite aunque luego se recupere.</li></ol><h4>El error común: recuperar el día</h4><p>El comportamiento que más cuentas fondeadas destruye es intentar recuperar la pérdida de la mañana en la tarde, aumentando tamaño. Matemáticamente es absurdo: si ya perdiste el 60 por ciento de tu presupuesto diario, cualquier operación adicional con tamaño mayor te acerca al límite con menos margen de error que al inicio del día. El profesional acepta días rojos pequeños como costo operativo. Una cuenta fondeada bien gestionada puede tener 40 por ciento de días perdedores y aun así ser rentable y, sobre todo, seguir existiendo. Tu métrica central en fondeo no es la ganancia mensual: es cuántos meses consecutivos llevas sin violar una regla.</p>`,
    claves: [
      "Conoce tu distancia a ambos límites antes de operar",
      "Presupuesto diario: la mitad de la distancia al límite",
      "La equity flotante también cuenta en muchas firmas",
      "Recuperar el día es la causa número uno de quema",
    ],
  };

  L["5-0-3"] = {
    resumen: "El escalado real no es comprar cuentas más grandes: es demostrar consistencia para que la firma amplíe tu capital, sosteniendo el mismo riesgo relativo cuando los números crecen.",
    duracionVideo: "8-11 min",
    lectura: `<p>El plan de carrera en fondeo no termina al cobrar el primer retiro. Las firmas serias ofrecen programas de escalado: si cumples metas de consistencia durante varios meses, amplían tu capital sin costo adicional. Entender cómo funcionan estos programas te permite diseñar una trayectoria de 10.000 a 400.000 dólares gestionados que no dependa de la suerte.</p><h4>Cómo funciona un escalado típico</h4><p>Un esquema habitual: la firma revisa tu cuenta cada tres o cuatro meses y, si acumulaste un beneficio neto del 10 por ciento con reglas intactas, incrementa el capital en 25 por ciento. Partiendo de 100.000, en cuatro ciclos exitosos estarías cerca de 200.000, y en dos o tres años podrías alcanzar los topes de 300.000 o 400.000 que muchas firmas publican. Otra vía es la diversificación: mantener cuentas en dos o tres firmas distintas, lo que además reduce el riesgo de que un cambio de reglas o la quiebra de una firma corte todo tu ingreso.</p><h4>La matemática que cambia con el tamaño</h4><p>Aquí aparece la trampa psicológica. Con 10.000 de capital, un 0,5 por ciento de riesgo son 50 dólares; con 400.000 son 2.000 dólares por operación. El porcentaje es idéntico, pero tu cerebro no procesa porcentajes: procesa el precio de un auto usado en una sola pérdida. Los traders que escalan con éxito hacen la transición gradual: suben el tamaño en escalones del 20 o 25 por ciento y solo consolidan el nuevo nivel tras cuatro semanas operando con normalidad, midiendo que sus métricas no se degraden.</p><h4>Aplicación práctica y errores</h4><ul><li><strong>Documenta tus ciclos:</strong> lleva un registro por trimestre con beneficio neto, drawdown máximo y violaciones (que deben ser cero).</li><li><strong>No acumules cuentas que no puedes atender:</strong> copiar la misma operación en cinco cuentas puede violar reglas de algunas firmas; verifica qué permite cada contrato.</li><li><strong>Error común:</strong> escalar el capital pero no el proceso. A mayor tamaño necesitas mejores registros, más disciplina de horarios y revisiones más frecuentes, no menos.</li></ul><p>El escalado es la prueba de que en este negocio la consistencia vale más que la brillantez: nadie amplía capital al trader del mes espectacular, sino al que lleva ocho trimestres sin romper una regla.</p>`,
    claves: [
      "El escalado premia trimestres limpios, no meses espectaculares",
      "Sube el tamaño en escalones del 20-25 por ciento",
      "Tu cerebro procesa dólares, no porcentajes",
      "Diversificar entre firmas reduce el riesgo de contrato",
    ],
  };

  L["5-0-4"] = {
    resumen: "Cobrar es parte del sistema: splits, ciclos de retiro y tratamiento fiscal de los pagos de prop firms para no perder por desorden lo ganado con disciplina.",
    duracionVideo: "8-11 min",
    lectura: `<p>Un trader fondeado es, a efectos prácticos, un prestador de servicios que cobra de una empresa extranjera. Si no entiendes cómo y cuándo cobras, y qué obligaciones fiscales genera ese cobro, tu rentabilidad real puede ser muy inferior a la que ves en la plataforma.</p><h4>Splits y ciclos de retiro</h4><p>El split es el reparto del beneficio entre tú y la firma. Los rangos habituales van del 70 al 90 por ciento para el trader, y algunas firmas mejoran el porcentaje con la antigüedad. Ejemplo: generas 4.000 dólares en un ciclo con split de 80 por ciento; cobras 3.200 y la firma retiene 800. Los ciclos de retiro varían: hay firmas con pagos quincenales, otras mensuales, y varias exigen un mínimo de días operados o retienen el primer retiro más tiempo. Algunas descuentan del beneficio la parte usada como colchón de la cuenta. Todo esto está en el contrato: léelo antes, no después de tu primer mes ganador.</p><h4>El tratamiento fiscal: ingreso, no magia</h4><p>Aquí va el principio general para LATAM, que luego debes verificar con un contador de tu país: los pagos de una prop firm suelen tratarse como ingreso por servicios profesionales o renta de fuente extranjera, no como ganancia de capital bursátil, porque tú no eres dueño del capital que se opera. Eso implica declararlos como ingresos y, en muchos países, facturarlos o registrarte en algún régimen de actividad. Ejemplo numérico: si cobras 2.000 dólares mensuales y tu jurisdicción grava ese ingreso a un 25 por ciento efectivo, tu neto real es 1.500; planificar con el número bruto es engañarte.</p><h4>Aplicación práctica</h4><ol><li>Guarda cada comprobante de pago y cada estado de cuenta: son la base de tu declaración y de tu track record.</li><li>Separa desde el primer cobro un porcentaje para impuestos en una cuenta aparte; entre 20 y 30 por ciento es un punto de partida prudente.</li><li>Consulta a un contador que conozca ingresos del exterior en tu país antes de que el monto sea grande, no cuando llegue una notificación.</li></ol><p>El error común del trader nuevo en fondeo es tratar los retiros como dinero informal. El profesional entiende que un historial de cobros declarados y ordenados es también un activo: te servirá para acceder a crédito, alquilar y, más adelante, para demostrar seriedad si gestionas capital de terceros.</p>`,
    claves: [
      "El split real y el ciclo de retiro están en el contrato",
      "Los pagos suelen tributar como ingreso por servicios",
      "Separa 20-30 por ciento de cada cobro para impuestos",
      "Comprobantes ordenados: base fiscal y de track record",
    ],
  };

  /* ===== Módulo 1 · Trading algorítmico con Python ===== */

  L["5-1-0"] = {
    resumen: "Python no es para programadores: es la herramienta que te permite dejar de contar velas a mano. Aquí instalas el entorno y entiendes qué puede y qué no puede hacer por ti.",
    duracionVideo: "10-14 min",
    lectura: `<p>Un trader profesional que no puede procesar datos depende de la memoria y de las sensaciones, dos instrumentos notoriamente malos. Python es el estándar de la industria financiera para análisis de datos, y la buena noticia es que no necesitas ser programador: necesitas aprender un vocabulario pequeño y muy repetitivo, como quien aprende las cincuenta palabras de un idioma que usa todos los días.</p><h4>Qué hace Python por un trader</h4><p>Cuatro cosas concretas: descarga datos históricos de precios de forma masiva, calcula estadísticas de tu operativa sin errores de planilla, prueba reglas sobre años de historia en segundos y, más adelante, ejecuta órdenes automáticamente. Un ejemplo del salto de escala: revisar a mano cómo se comportó el oro en las aperturas de Nueva York durante 2 años son unas 500 sesiones; a razón de 2 minutos por sesión, más de 16 horas de trabajo visual. Un script bien escrito responde la misma pregunta en menos de un minuto, sin sesgo de memoria y con resultados reproducibles.</p><h4>Tu entorno de trabajo</h4><p>El punto de partida moderno es instalar una distribución de Python actual y trabajar en cuadernos interactivos (notebooks), que mezclan texto, código y gráficos en un mismo documento. Las piezas del ecosistema que usarás en este módulo son tres: pandas para manejar tablas de datos, matplotlib para graficar y una librería de conexión a tu broker para descargar precios. No las memorices ahora: las irás incorporando lección a lección.</p><h4>Expectativas realistas</h4><ul><li><strong>Python no genera estrategias:</strong> evalúa las que tú defines. La creatividad sigue siendo tuya.</li><li><strong>El primer mes es incómodo:</strong> los errores de sintaxis frustran. Es normal y pasa; el segundo mes ya escribes análisis simples solo.</li><li><strong>No necesitas matemática avanzada:</strong> el 90 por ciento del trabajo es filtrar tablas, agrupar por hora o día y calcular promedios.</li><li><strong>Error común:</strong> intentar construir un bot en la primera semana. El orden correcto es datos, análisis, backtesting y recién al final ejecución.</li></ul><h4>Aplicación práctica</h4><p>Tu tarea de esta lección es dejar el entorno funcionando: instala Python, abre tu primer notebook y ejecuta una celda que sume dos números y otra que imprima un texto. Suena trivial, pero la barrera real del trading algorítmico no es intelectual: es no haber empezado nunca. Cuando el entorno corre, ya perteneces a la minoría de traders que puede hacerle preguntas a los datos en lugar de discutir opiniones.</p>`,
    claves: [
      "Python evalúa tus ideas, no las inventa",
      "Pandas, gráficos y conexión al broker: tu kit base",
      "El orden es datos, análisis, backtest y luego ejecución",
      "La barrera real es no empezar, no la dificultad",
    ],
  };

  L["5-1-1"] = {
    resumen: "Los datos son la materia prima: aprende a descargar precios desde APIs de brokers, cargarlos en pandas y hacer las primeras preguntas estadísticas a tu mercado.",
    duracionVideo: "11-15 min",
    lectura: `<p>Todo análisis serio empieza con datos confiables. En esta lección aprendes el circuito completo: pedir precios históricos a una fuente, guardarlos en una tabla de pandas y explorarlos. Quien domina este circuito puede responder en minutos preguntas que antes eran pura intuición.</p><h4>De dónde salen los datos</h4><p>Las fuentes principales son tres: la API de tu broker (por ejemplo, la librería oficial de MetaTrader 5 permite pedir velas históricas directamente desde Python a tu propia terminal), APIs públicas de datos financieros y archivos CSV exportados desde tu plataforma. Cada fuente entrega lo mismo en esencia: filas con fecha, apertura, máximo, mínimo, cierre y volumen. La calidad importa: verifica siempre husos horarios, huecos de fin de semana y si el volumen es real o solo de tu broker.</p><h4>Pandas: la planilla con esteroides</h4><p>Pandas organiza los datos en un DataFrame, una tabla donde cada fila es una vela y cada columna un atributo. Sobre esa tabla puedes filtrar (quedarte solo con las velas de 9:30 a 11:00), crear columnas nuevas (el rango de cada vela como máximo menos mínimo), agrupar (promedio de rango por hora del día) y ordenar. En prosa, un análisis típico se lee así: carga las velas de 5 minutos del último año, crea una columna con el rango de cada vela, agrupa por hora y calcula el promedio. Con esas cuatro operaciones descubres, por ejemplo, que en tu instrumento el rango promedio de 9:30 a 10:30 duplica al de 13:00 a 14:00, un dato que redefine tus horarios de trabajo.</p><h4>Ejemplo numérico completo</h4><p>Supón que descargas 74.000 velas de 5 minutos de un año del oro. Agrupas por hora y obtienes que la volatilidad media entre 8:00 y 9:00 de Nueva York es de 3,10 dólares por vela, contra 1,20 en la madrugada asiática. Si tu stop típico es de 2 dólares, acabas de aprender que en la madrugada tu stop es enorme en términos relativos y en la apertura es ajustado: mismo sistema, contexto opuesto.</p><h4>Errores comunes</h4><ul><li>Mezclar husos horarios: media sesión de análisis arruinada por dos horas de desfase.</li><li>Confiar en datos con huecos sin revisarlos: grafica siempre antes de calcular.</li><li>Analizar un periodo corto y generalizar: usa al menos uno o dos años para patrones intradía.</li></ul>`,
    claves: [
      "Fecha, OHLC y volumen: la materia prima universal",
      "Verifica huso horario y huecos antes de analizar",
      "Filtrar, crear columnas y agrupar resuelve el 90 por ciento",
      "Un año de velas responde preguntas que la memoria inventa",
    ],
  };

  L["5-1-2"] = {
    resumen: "Si tu sistema no se puede escribir como reglas exactas, todavía no es un sistema: aprende a traducir tu operativa manual a condiciones verificables por una máquina.",
    duracionVideo: "9-13 min",
    lectura: `<p>Este es el paso más valioso del módulo y el que menos gente completa: convertir tu sistema manual en reglas programables. El ejercicio tiene un beneficio doble. Si lo logras, puedes backtestear y automatizar. Y si no lo logras, habrás descubierto algo incómodo pero crucial: parte de tu sistema es discrecionalidad disfrazada de método.</p><h4>El estándar de precisión</h4><p>Una regla programable no admite interpretación. Compara estas dos versiones de la misma idea. Versión vaga: compro cuando hay fuerza alcista tras un retroceso. Versión programable: el precio está por encima de la media de 50 periodos en el gráfico de 15 minutos, retrocede al menos un 50 por ciento del último impulso medido de mínimo a máximo, y aparece una vela de 5 minutos que cierra por encima del máximo de la vela anterior. La segunda versión puede evaluarla una máquina y también un alumno tuyo dentro de cinco años: esa es la prueba de fuego.</p><h4>Anatomía de un sistema completo</h4><p>Para programar tu sistema necesitas definir por escrito seis bloques.</p><ol><li><strong>Universo:</strong> qué instrumento y qué temporalidad.</li><li><strong>Filtro de contexto:</strong> cuándo está permitido buscar entradas (tendencia, horario, volatilidad mínima).</li><li><strong>Disparador de entrada:</strong> la condición exacta que abre la posición.</li><li><strong>Stop inicial:</strong> regla objetiva de invalidación en precio.</li><li><strong>Gestión y salida:</strong> objetivos, parciales, trailing, todo con números.</li><li><strong>Riesgo:</strong> porcentaje por operación y límites diarios.</li></ol><h4>Ejemplo de traducción con números</h4><p>Un trader RIC operaba retrocesos en el Nasdaq y creía tener reglas claras. Al escribirlas descubrió que su entrada dependía de que el retroceso se viera limpio. Lo tradujo así: el retroceso es válido si tiene entre 3 y 8 velas de 5 minutos y ninguna vela contraria supera el 60 por ciento del tamaño del impulso previo. Al backtestear esa definición encontró que su versión mecánica ganaba menos que su recuerdo, pero perdía mucho menos: la memoria le había ocultado la mitad de sus errores.</p><h4>Error común</h4><p>Programar solo la entrada y dejar la gestión a criterio. La gestión discrecional sobre entradas mecánicas destruye la estadística: no sabrás nunca si el sistema falla o fallas tú. Escribe todo, aunque la primera versión sea imperfecta: una regla imperfecta y medible vale más que una intuición brillante e inmedible.</p>`,
    claves: [
      "Regla programable: cero interpretación posible",
      "Seis bloques: universo, filtro, entrada, stop, gestión, riesgo",
      "Escribir el sistema revela tu discrecionalidad oculta",
      "Gestión a criterio sobre entrada mecánica arruina la medición",
    ],
  };

  L["5-1-3"] = {
    resumen: "Backtesting profesional: probar tus reglas sobre años de datos con métricas que importan (expectancy, drawdown, profit factor) y sin engañarte con sobreoptimización.",
    duracionVideo: "11-15 min",
    lectura: `<p>El backtesting responde la única pregunta que importa antes de arriesgar dinero: si hubieras aplicado estas reglas exactas durante los últimos años, qué habría pasado. Hecho con rigor, te ahorra meses de pérdida en vivo. Hecho sin rigor, es la forma más cara de mentirse a uno mismo.</p><h4>El circuito del backtest</h4><p>En prosa, el proceso es este: recorres la historia vela por vela, evalúas tus condiciones de entrada en cada una, y cuando se cumplen simulas la operación completa con su stop, su objetivo y sus comisiones, registrando el resultado. Al final tienes una lista de operaciones simuladas sobre la que calculas métricas. Existen librerías que hacen este recorrido por ti, pero entender la lógica es lo que te permite detectar errores.</p><h4>Las métricas que importan</h4><ul><li><strong>Expectancy:</strong> ganancia media por operación. Con 45 por ciento de acierto, ganancia media de 300 y pérdida media de 150: 0,45 por 300 menos 0,55 por 150 da 52,5 dólares por operación. Positiva y estable es lo que buscas.</li><li><strong>Profit factor:</strong> total ganado dividido por total perdido. Por encima de 1,3 empieza a ser interesante; por encima de 2 en muestras grandes, sospecha de errores.</li><li><strong>Drawdown máximo:</strong> la peor racha histórica. Si el backtest muestra 18 por ciento, en vivo debes estar preparado para más.</li><li><strong>Número de operaciones:</strong> menos de 100 operaciones no es evidencia, es anécdota.</li></ul><h4>Las tres trampas mortales</h4><ol><li><strong>Sobreoptimización:</strong> ajustar parámetros hasta que el pasado luzca perfecto. Un sistema con 9 parámetros afinados al máximo histórico casi siempre fracasa en vivo. Antídoto: pocos parámetros y verificar que resultados similares aparezcan con valores vecinos.</li><li><strong>Lookahead:</strong> usar en la decisión información que en ese momento no existía, como el cierre de una vela que aún no cerró. Invalida todo el estudio.</li><li><strong>Ignorar costos:</strong> spread, comisión y deslizamiento. Un sistema de scalping con 40 dólares brutos por operación y 25 de costos reales es un sistema mediocre disfrazado de excelente.</li></ol><h4>Aplicación práctica</h4><p>Divide tus datos: optimiza sobre una parte (por ejemplo 2020 a 2023) y valida sobre datos que el sistema nunca vio (2024 en adelante). Si el rendimiento se mantiene razonable fuera de muestra, tienes algo. Si se desploma, tenías una fotografía del pasado, no un sistema.</p>`,
    claves: [
      "Expectancy positiva y estable, con costos incluidos",
      "Menos de 100 operaciones es anécdota, no evidencia",
      "Sobreoptimizar el pasado garantiza fracasar en el futuro",
      "Valida siempre fuera de muestra",
    ],
  };

  L["5-1-4"] = {
    resumen: "Tu primer bot en demo con MT5: arquitectura mínima, órdenes automáticas, control de riesgo programado y un protocolo de supervisión antes de pensar en real.",
    duracionVideo: "12-16 min",
    lectura: `<p>Llega el momento de cerrar el círculo: un programa que observa el mercado y ejecuta tus reglas sin ti. La regla de oro de esta lección es innegociable: todo bot vive en demo hasta acumular meses de evidencia. El objetivo aquí no es ganar dinero, es aprender ingeniería de ejecución.</p><h4>Arquitectura mínima de un bot</h4><p>Un bot de MetaTrader 5 controlado desde Python tiene cuatro piezas que se repiten en bucle: conexión (el programa se enlaza con tu terminal MT5 abierta), lectura (descarga las últimas velas y calcula sus indicadores), decisión (evalúa tus reglas y determina si corresponde comprar, vender o esperar) y ejecución (envía la orden con su volumen, stop y objetivo, y registra la respuesta del servidor). En prosa, el ciclo se lee así: cada vez que cierra una vela de 5 minutos, pide las últimas 200 velas, evalúa las condiciones y, si se cumplen y no hay posición abierta, envía una orden de mercado con stop y objetivo calculados.</p><h4>El riesgo también se programa</h4><p>El tamaño de posición debe calcularse en cada señal: riesgo permitido dividido por distancia al stop. Ejemplo: cuenta demo de 10.000, riesgo de 0,5 por ciento (50 dólares), stop a 25 puntos y valor del punto de 1 dólar por lote mínimo: el bot opera 2 lotes mínimos. Además, programa límites duros: pérdida máxima diaria que apaga el bot, número máximo de operaciones por día y horario permitido. Un bot sin apagado automático es un incendio esperando ocurrir.</p><h4>Lo que sale mal en la práctica</h4><ul><li><strong>Rechazos de órdenes:</strong> el servidor puede devolver errores por precio requoteado, volumen inválido o parámetros mal formateados. Tu bot debe registrar cada respuesta y nunca reintentar a ciegas.</li><li><strong>Desconexiones:</strong> internet o terminal caídos con posición abierta. Por eso toda orden lleva stop en el servidor, no solo en la lógica del programa.</li><li><strong>Diferencias con el backtest:</strong> deslizamiento y latencia harán que los resultados en demo difieran del estudio. Compara ambos números tras 50 operaciones.</li></ul><h4>Protocolo de supervisión</h4><p>Durante las primeras semanas revisa el bot a diario: registro de decisiones, órdenes enviadas contra órdenes que tu backtest habría tomado, y contabilidad de errores técnicos. El estándar profesional para siquiera discutir el paso a real: al menos 3 meses en demo, coincidencia razonable con el backtest y cero incidentes de riesgo sin explicación. La automatización no elimina tu trabajo: lo transforma de ejecutar a supervisar.</p>`,
    claves: [
      "Conexión, lectura, decisión y ejecución: el bucle completo",
      "El stop viaja al servidor, no vive solo en tu código",
      "Límites duros programados: pérdida diaria y apagado",
      "Tres meses en demo antes de discutir el paso a real",
    ],
  };

  L["5-1-5"] = {
    resumen: "IA aplicada al trading: dónde aporta valor real (análisis, código, revisión de proceso) y dónde es humo (señales mágicas, predicción de precios garantizada).",
    duracionVideo: "9-12 min",
    lectura: `<p>La inteligencia artificial llegó al trading con una mezcla de herramientas útiles y estafas renovadas. Como trader profesional necesitas un criterio simple para separar ambas: la IA aporta donde acelera tu proceso y es humo donde promete reemplazar tu criterio con resultados garantizados.</p><h4>Dónde aporta valor hoy</h4><ul><li><strong>Asistente de programación:</strong> los modelos de lenguaje escriben y corrigen código de análisis en minutos. El trader que aprendió las bases del módulo puede pedir un script que agrupe velas por hora y auditar el resultado. La palabra clave es auditar: la IA acelera a quien entiende, y confunde a quien no.</li><li><strong>Análisis de tus registros:</strong> pasarle tu diario de operaciones y pedirle patrones (errores repetidos, horarios problemáticos, desviaciones del plan) funciona sorprendentemente bien como segunda mirada.</li><li><strong>Procesamiento de información:</strong> resumir informes, comparar datos macro, explicar conceptos. Ahorra horas de lectura.</li><li><strong>Machine learning serio:</strong> los fondos cuantitativos usan modelos estadísticos con equipos de doctorado, datos carísimos e infraestructura dedicada. Existe, es real, y no es replicable en casa un fin de semana.</li></ul><h4>Dónde es humo</h4><p>Desconfía por sistema de cualquier producto que prometa señales de IA con porcentajes de acierto extraordinarios, bots que ganan mientras duermes vendidos por suscripción, o predicciones garantizadas del precio. El razonamiento es económico y no falla: una máquina que realmente predijera el mercado con 90 por ciento de acierto valdría miles de millones y su dueño no la vendería por 99 dólares al mes. Ejemplo numérico del anzuelo típico: un vendedor muestra un mes con 87 por ciento de acierto. Con operaciones que ganan 10 y pierden 100, ese 87 por ciento pierde dinero: 87 por 10 son 870 ganados contra 13 por 100, es decir 1.300 perdidos. El porcentaje de acierto sin ratio ni riesgo es marketing, no estadística.</p><h4>Aplicación práctica y error común</h4><p>Incorpora la IA a tu flujo con roles definidos: asistente de código, auditor de diario y procesador de información. Nunca como tomadora de decisiones de riesgo. El error común del trader entusiasmado es delegar el criterio: pedirle a un modelo que diga si comprar o vender y ejecutarlo sin sistema. Eso no es trading algorítmico, es tercerizar la ruleta. La tecnología cambia; el principio del nivel no: el proceso es tuyo, las herramientas solo lo aceleran.</p>`,
    claves: [
      "La IA acelera a quien entiende y confunde a quien no",
      "Úsala para código, auditoría de diario y análisis",
      "Acierto sin ratio ni riesgo es marketing",
      "Nunca delegues la decisión de riesgo en un modelo",
    ],
  };

  /* ===== Módulo 2 · Order flow institucional avanzado ===== */

  L["5-2-0"] = {
    resumen: "Footprint, perfil de volumen y DOM dejan de ser tres pantallas separadas: aprende el protocolo para leerlos como una sola historia en tiempo real.",
    duracionVideo: "12-16 min",
    lectura: `<p>En niveles anteriores aprendiste cada herramienta de order flow por separado. El salto profesional es integrarlas: el perfil te dice dónde importa mirar, el footprint te dice qué está pasando ahí, y el DOM te dice quién está dispuesto a qué en este instante. Leídas juntas cuentan una historia; leídas por separado son ruido caro.</p><h4>La jerarquía de lectura</h4><p>El orden importa y va de lo lento a lo rápido.</p><ol><li><strong>Perfil de volumen (contexto):</strong> antes de la sesión identificas las zonas de alto volumen (aceptación) y los huecos de bajo volumen (rechazo). Estas son tus zonas de decisión; fuera de ellas, no operas.</li><li><strong>Footprint (confirmación):</strong> cuando el precio llega a una zona marcada, el footprint muestra el detalle: quién agrede, si el volumen entra con el movimiento o contra él, y si aparecen desequilibrios apilados o absorción.</li><li><strong>DOM (ejecución):</strong> en el momento de entrar, la profundidad te afina el timing: dónde hay liquidez pasiva apilada, cómo se consumen los niveles, si las órdenes grandes se sostienen o desaparecen.</li></ol><h4>Ejemplo integrado con números</h4><p>Supón que el perfil de los últimos cinco días en el futuro del oro marca un nodo de alto volumen en 2.415 y la sesión abre en 2.428 cayendo. Tu plan: esperar la llegada a 2.415. El precio llega y el footprint imprime tres velas donde los vendedores agreden 4.200 contratos pero el precio no avanza: delta negativo con precio quieto, absorción compradora. En el DOM ves una oferta pasiva en 2.414 que se reconstruye cada vez que la consumen. Historia completa: los vendedores empujan, alguien grande compra todo y defiende el nivel. Esa confluencia de tres lecturas es una entrada de calidad institucional; cualquiera de las tres por separado era solo un indicio.</p><h4>Errores comunes</h4><ul><li><strong>Leer footprint sin contexto:</strong> una absorción en medio de la nada tiene una fracción del valor de una absorción en un nodo del perfil.</li><li><strong>Sobrecarga de pantalla:</strong> más ventanas no es más información. Tres herramientas con roles claros superan a ocho sin jerarquía.</li><li><strong>Buscar la historia perfecta en cada operación:</strong> la confluencia completa aparece pocas veces por sesión. El profesional espera; el aficionado rebaja el estándar.</li></ul><p>Tu tarea: define por escrito tu protocolo de lectura en ese orden exacto y practícalo en repetición hasta que tome segundos, no minutos.</p>`,
    claves: [
      "Perfil da contexto, footprint confirma, DOM ejecuta",
      "Opera solo en zonas marcadas antes de la sesión",
      "Delta contra precio quieto delata absorción",
      "La confluencia completa aparece pocas veces por día",
    ],
  };

  L["5-2-1"] = {
    resumen: "El mercado es una subasta continua que busca precio justo: entiende balance, desbalance, excesos y por qué esta teoría ordena todo lo que ves en el order flow.",
    duracionVideo: "10-14 min",
    lectura: `<p>La teoría de subastas es el marco que explica por qué funcionan el perfil y el footprint. El mercado no es una línea que sube y baja: es una subasta de doble vía cuyo trabajo es descubrir el precio donde el negocio se facilita, es decir, donde compradores y vendedores aceptan intercambiar en volumen. Entender esto convierte tus herramientas en un sistema con lógica y no en una colección de trucos.</p><h4>Balance y desbalance</h4><p>La subasta alterna entre dos estados. En <strong>balance</strong>, el precio rota alrededor de un valor aceptado: el perfil engorda en el centro y las puntas se rechazan. En <strong>desbalance</strong>, aparece información o agresión nueva, el precio abandona el área de valor y se desplaza en busca de un nuevo consenso: el perfil se estira y queda delgado. Toda tu operativa puede clasificarse con esta pregunta previa: el mercado está rotando o está migrando. Operar reversiones en pleno desbalance o rupturas en pleno balance es nadar contra el estado de la subasta.</p><h4>El exceso y la señal de rechazo</h4><p>Cuando la subasta estira el precio hasta un punto donde ya no aparecen compradores dispuestos, se produce un exceso: el precio revierte con rapidez dejando volumen mínimo en la punta. Ese rechazo veloz es de la información más valiosa del perfil: marca el precio que la subasta consideró demasiado caro o demasiado barato.</p><h4>Ejemplo numérico</h4><p>El futuro del Nasdaq pasa tres días rotando entre 20.150 y 20.290, con el 70 por ciento del volumen entre 20.190 y 20.250: balance claro, valor aceptado alrededor de 20.220. El cuarto día, tras un dato de inflación, el precio abre en 20.310, por encima de toda el área de valor, y en la primera hora negocia 90.000 contratos sin regresar al rango. Lectura de subasta: desbalance con aceptación arriba; los retrocesos hacia 20.290 son oportunidades de compra mientras el nuevo nivel se sostenga. Si en cambio el precio hubiera abierto en 20.310 y regresado al rango en 30 minutos con volumen, la lectura sería la opuesta: falso desbalance, probable regreso a 20.220.</p><h4>Aplicación práctica</h4><p>Antes de cada sesión responde tres preguntas por escrito: dónde está el valor aceptado, el mercado está en balance o en desbalance, y qué escenario invalida esa lectura. El error común es tener herramientas de subasta y seguir pensando en líneas de soporte: la pregunta profesional no es dónde rebotó el precio, sino dónde se facilitó el negocio.</p>`,
    claves: [
      "El mercado busca el precio donde se facilita el negocio",
      "Balance: rotación; desbalance: migración de valor",
      "El exceso marca el precio rechazado por la subasta",
      "Clasifica el estado antes de elegir la táctica",
    ],
  };

  L["5-2-2"] = {
    resumen: "Aperturas, cierres y noticias de alto impacto concentran la liquidez y el riesgo: protocolos concretos para operar (o no operar) los eventos que mueven el día.",
    duracionVideo: "11-14 min",
    lectura: `<p>La liquidez no se distribuye pareja durante el día: se concentra en eventos. Aperturas de sesión, cierres, y publicaciones macro de alto impacto son los momentos donde el volumen se multiplica, los spreads cambian y las reglas operativas normales dejan de aplicar. El profesional no evita estos eventos por miedo ni los opera por adrenalina: tiene un protocolo para cada uno.</p><h4>Aperturas: la subasta se reinicia</h4><p>La apertura de Nueva York concentra en 30 a 60 minutos una parte enorme del volumen del día. Es el momento donde el mercado decide si acepta o rechaza los precios de la noche. Protocolo típico: marca el rango nocturno y el cierre anterior; en los primeros minutos observa sin operar cómo se resuelve la subasta inicial; opera recién cuando hay dirección con volumen confirmado. Ejemplo: si el oro pasó la noche entre 2.410 y 2.418 y en la apertura el footprint muestra compras agresivas que rompen 2.418 con delta positivo sostenido, el plan es buscar el retroceso a la zona rota, no perseguir el primer impulso.</p><h4>Noticias de alto impacto: el vacío previo</h4><p>Antes de un dato como el informe de empleo o una decisión de tasas, los proveedores de liquidez retiran sus órdenes: el DOM se vacía. En el segundo de la publicación, el precio puede saltar 20, 50 o más puntos sin negociar en los niveles intermedios. Números concretos: si operas con stop de 10 puntos y el dato mueve 40 en un segundo, tu stop puede ejecutarse 30 puntos peor de lo previsto. Por eso el protocolo profesional estándar es: posición cerrada o reducida antes del dato, nada de órdenes nuevas en los minutos previos, y operar la reacción posterior (la segunda ola, cuando la liquidez regresa), no el dato mismo. Recuerda además que muchas prop firms prohíben operar el minuto de la noticia: violarlo cuesta la cuenta.</p><h4>Cierres y vencimientos</h4><p>El cierre de sesión trae rebalanceos de fondos e institucionales que ejecutan al precio de cierre: movimientos con volumen alto que no obedecen a la lógica técnica de la mañana. Los vencimientos trimestrales de futuros y opciones amplifican este efecto. Regla práctica: en los últimos 15 minutos opera solo si tu sistema fue diseñado para ese contexto.</p><h4>Error común</h4><p>Tener un solo modo operativo para todo el día. El mismo trader con el mismo sistema debe comportarse distinto a las 9:30, a las 14:00 y durante un dato macro: eso no es inconsistencia, es lectura de contexto. Escribe tu calendario semanal de eventos cada domingo: es la tarea de esta lección.</p>`,
    claves: [
      "La liquidez se concentra en eventos, no se reparte",
      "En noticias el DOM se vacía y el stop desliza",
      "Opera la segunda ola, nunca el segundo del dato",
      "Calendario de eventos escrito cada domingo",
    ],
  };

  /* ===== Módulo 3 · Gestión de capital profesional ===== */

  L["5-3-0"] = {
    resumen: "Gestionar dinero ajeno sin licencia es ilegal en la mayoría de las jurisdicciones: el mapa legal general de LATAM y las estructuras que sí permiten profesionalizarse.",
    duracionVideo: "10-13 min",
    lectura: `<p>Llega un punto en la carrera donde alguien te ofrece dinero para que lo operes: un familiar, un amigo, un conocido que vio tus resultados. Este es el momento más peligroso de tu carrera profesional, porque la respuesta intuitiva (aceptar y repartir ganancias) es, en la mayoría de los países de LATAM y del mundo, una actividad ilegal si se hace sin licencia. Esta lección existe para que nunca cruces esa línea por ignorancia.</p><h4>El principio general</h4><p>Captar y administrar capital de terceros con discrecionalidad es una actividad regulada en casi todas las jurisdicciones: exige registro ante el regulador de valores del país (las comisiones de valores nacionales y organismos equivalentes), estructura jurídica autorizada, requisitos de capital, auditorías y reglas de conducta. Hacerlo por fuera puede configurar intermediación no autorizada o captación ilegal de ahorro público, con sanciones que van de multas a penas de prisión. El acuerdo privado entre amigos no te protege: la ley regula la actividad, no la confianza entre las partes. Y esto es un principio general, no asesoría legal: la norma exacta varía por país y debes verificarla con un abogado local antes de mover un solo dólar ajeno.</p><h4>Las rutas legales existentes</h4><p>Sin dar recetas jurídicas, las estructuras habituales en la región incluyen: obtener la licencia de asesor o gestor ante el regulador local; operar bajo el paraguas de una entidad ya regulada (una gestora de fondos que te contrata como trader o estructura un fondo con tu estrategia); los esquemas de cuentas administradas ofrecidos por brokers regulados, donde cada cliente mantiene su cuenta a su nombre y firma mandatos específicos, siempre que la jurisdicción lo permita; y el camino de la prop firm, donde el capital es de una empresa que te contrata, no ahorro captado del público. Cada ruta tiene costos y requisitos distintos; todas comparten algo: hay contratos, regulador y auditoría de por medio.</p><h4>Ejemplo del riesgo real</h4><p>Un trader acepta 20.000 dólares de cinco conocidos con un acuerdo de palabra al 50 por ciento de las ganancias. Seis meses después acumula un drawdown del 30 por ciento y dos aportantes exigen su dinero. No hay contrato que lo respalde, la actividad era irregular desde el inicio, y ahora enfrenta reclamos civiles, posible denuncia y una reputación destruida. El caso es hipotético; su patrón se repite en la vida real constantemente.</p><h4>Aplicación práctica</h4><p>Si aspiras a gestionar, el camino empieza hoy pero no con dinero ajeno: empieza con tu track record auditable, tu formación y una consulta profesional sobre la regulación de tu país. Decir todavía no puedo aceptar tu dinero legalmente es una señal de profesionalismo, no de debilidad.</p>`,
    claves: [
      "Gestionar dinero ajeno sin licencia es ilegal en general",
      "El acuerdo privado no te protege: la actividad está regulada",
      "Rutas: licencia propia, entidad regulada o prop firm",
      "Consulta legal local antes de aceptar un solo dólar",
    ],
  };

  L["5-3-1"] = {
    resumen: "Un gestor sin reportes claros es un aficionado con dinero ajeno: qué debe contener un reporte profesional mensual y cómo comunicar también los meses malos.",
    duracionVideo: "8-11 min",
    lectura: `<p>La gestión profesional de capital es un negocio de confianza, y la confianza no se sostiene con promesas: se sostiene con reportes. Aprender a reportar como un profesional te sirve incluso antes de gestionar: los mismos reportes, aplicados a tu propia cuenta, elevan tu disciplina y construyen el material que algún día mostrarás.</p><h4>Qué contiene un reporte profesional</h4><p>El estándar de la industria incluye, como mínimo, estas secciones en un documento mensual.</p><ul><li><strong>Rendimiento del periodo:</strong> neto de comisiones y costos, en porcentaje, junto al acumulado del año.</li><li><strong>Métricas de riesgo:</strong> drawdown máximo del mes y el histórico, volatilidad de los retornos, exposición promedio.</li><li><strong>Detalle de la operativa:</strong> número de operaciones, tasa de acierto, ratio promedio, instrumentos operados.</li><li><strong>Comentario de gestión:</strong> qué pasó en el mercado, qué hizo la estrategia, qué se espera. Tres párrafos honestos valen más que diez de marketing.</li><li><strong>Nota metodológica:</strong> cómo se calculan los números, qué cuenta se reporta y advertencia de que rendimiento pasado no garantiza futuro.</li></ul><h4>El ejemplo que separa profesionales</h4><p>Compara dos reportes del mismo mes negativo. El aficionado escribe: mes difícil, el mercado estuvo imposible, ya recuperaremos. El profesional escribe: el mes cerró en menos 2,8 por ciento, dentro del rango esperado para la estrategia; el drawdown provino de seis operaciones en la semana del dato de inflación, donde el filtro de volatilidad permitió entradas en condiciones que revisaremos; el drawdown histórico máximo sigue siendo 9,4 por ciento y no se superó. El segundo reporte transmite control incluso perdiendo; el primero transmite excusas incluso siendo sincero.</p><h4>Frecuencia y consistencia</h4><p>Elige una frecuencia (mensual es el estándar; algunos añaden una nota trimestral profunda) y cúmplela sin excepción. Un reporte que llega tarde en un mes malo es la forma más rápida de destruir confianza: el inversor asume lo peor. Reporta igual de puntual en el mejor mes y en el peor.</p><h4>Error común</h4><p>Reportar solo el porcentaje de retorno. El retorno sin riesgo es media historia: un 8 por ciento mensual con drawdowns del 40 por ciento es una bomba de tiempo, y el inversor sofisticado (el único que te interesa atraer) lo sabe. Tu tarea de esta lección: genera el reporte de tu propia cuenta del mes pasado con la estructura completa, como si tuvieras un inversor. Ese documento es el embrión de tu carrera como gestor.</p>`,
    claves: [
      "Reporta retorno neto, riesgo y comentario honesto",
      "El mes malo se reporta con más detalle, no con menos",
      "Puntualidad idéntica en meses buenos y malos",
      "Retorno sin métricas de riesgo es media historia",
    ],
  };

  L["5-3-2"] = {
    resumen: "Nadie invierte en capturas de pantalla: cómo construir un track record verificable por terceros — cuenta real, historial exportable, métricas auditadas y años de consistencia.",
    duracionVideo: "9-12 min",
    lectura: `<p>El track record es el currículum del trader profesional: la evidencia verificable de qué hiciste, con qué riesgo y durante cuánto tiempo. Sin él, cualquier conversación con inversores, fondos o prop firms serias es humo. Con él, ni siquiera necesitas convencer: los números hablan en tu lugar.</p><h4>Qué lo hace auditable</h4><p>La palabra clave es verificable por terceros. Una captura de pantalla no lo es; una planilla propia tampoco. Lo que sí funciona:</p><ul><li><strong>Historial completo de cuenta real</strong> exportado del broker, con todas las operaciones, no un resumen editado. Los servicios de verificación que se conectan por contraseña de solo lectura a tu cuenta y publican métricas de forma independiente son el estándar accesible.</li><li><strong>Continuidad:</strong> una serie ininterrumpida. Seis cuentas abandonadas y una ganadora no son track record: son supervivencia sesgada, y un auditor serio pedirá ver todas.</li><li><strong>Duración:</strong> el mínimo para que alguien sofisticado te tome en serio ronda los 2 a 3 años. Doce meses buenos pueden ser suerte; treinta y seis meses con drawdown controlado son evidencia estadística.</li><li><strong>Riesgo documentado:</strong> el retorno importa menos que su costo. Un 25 por ciento anual con drawdown máximo del 8 por ciento es un track record excelente; un 60 por ciento con drawdown del 45 es una advertencia.</li></ul><h4>Ejemplo numérico del estándar</h4><p>Piensa qué evalúa un asignador de capital profesional: 30 meses de historial, retorno anualizado del 18 por ciento, drawdown máximo del 7 por ciento, unas 40 operaciones mensuales (muestra grande), y correlación baja con el mercado. Ese perfil, aunque el retorno parezca modesto frente al marketing de redes sociales, recibe capital. El perfil opuesto (300 por ciento en ocho meses, drawdown desconocido, cuenta nueva) recibe cortesía y ninguna transferencia.</p><h4>Aplicación práctica</h4><ol><li>Conecta hoy tu cuenta real (aunque sea pequeña) a un servicio de verificación independiente. El tamaño no importa: la métrica porcentual y el riesgo, sí.</li><li>Decide tu estrategia y congélala: los cambios constantes de sistema fragmentan el historial y lo invalidan como evidencia.</li><li>Complementa con tus reportes mensuales de la lección anterior: verificación externa más reportes internos es el paquete completo.</li></ol><h4>Error común</h4><p>Esperar a ser rentable en grande para empezar el historial. El track record se construye hacia adelante y no se puede fabricar hacia atrás: cada mes que pasa sin registrar es un mes que ningún auditor podrá acreditarte jamás. Tu carrera de gestor empieza el día que empiezas a registrar, no el día que te llega el capital.</p>`,
    claves: [
      "Verificable por terceros o no es track record",
      "2 a 3 años de serie continua es el estándar",
      "El drawdown pesa tanto como el retorno",
      "Se construye hacia adelante: empieza hoy",
    ],
  };

  L["5-3-3"] = {
    resumen: "El paso de trader a gestor cambia el oficio: tu retorno personal importa menos que tu proceso, tu estructura y tu capacidad de sostener la confianza a escala.",
    duracionVideo: "9-12 min",
    lectura: `<p>Ser buen trader y ser buen gestor son oficios relacionados pero distintos, como ser buen cocinero y dirigir un restaurante. El trader optimiza sus decisiones; el gestor administra un negocio donde las decisiones de trading son solo un departamento. Esta lección te da el mapa del cambio para que decidas con información si ese camino es para ti.</p><h4>La matemática del salto</h4><p>Primero, el motivo económico. Con una cuenta propia de 20.000 dólares y un excelente 30 por ciento anual, generas 6.000 dólares al año: insuficiente como ingreso profesional. Con 2 millones gestionados bajo una estructura regulada con comisión del 2 por ciento de gestión y 20 por ciento de resultados, ese mismo 30 por ciento genera del orden de 40.000 de comisión fija más 120.000 de comisión de éxito. El mismo talento, aplicado a otra escala, cambia de categoría económica. Esa es la promesa; ahora el precio.</p><h4>Lo que cambia de verdad</h4><ul><li><strong>El riesgo se vuelve conservador:</strong> el capital ajeno exige drawdowns menores. Estrategias que tolerabas en tu cuenta (caídas del 25 por ciento) son invendibles: el estándar institucional se incomoda por encima del 10 o 15.</li><li><strong>Aparecen funciones nuevas:</strong> cumplimiento normativo, contabilidad, reportes, relación con inversores, tecnología. O las contratas o te consumen el tiempo de trading.</li><li><strong>La comunicación es la mitad del trabajo:</strong> un gestor con retorno mediocre y comunicación impecable retiene capital; uno brillante que desaparece en los meses malos sufre retiros masivos exactamente cuando más los duele.</li><li><strong>Tu psicología cambia de juego:</strong> perder dinero de otros pesa distinto, y ese peso es el tema del módulo de psicología de este nivel.</li></ul><h4>La secuencia realista</h4><p>El camino ordenado que este programa propone: consolida tu operativa personal y tu track record auditable (2 a 3 años); profesionalízate con capital de prop firms, que es gestión de capital ajeno con estructura ya resuelta; en paralelo, asesórate legalmente sobre las rutas reguladas de tu país; y solo entonces decide entre la licencia propia, integrarte a una gestora existente o mantenerte como trader de firma. Saltarse pasos no acelera la carrera: la termina.</p><h4>Error común</h4><p>Creer que gestionar es el único destino prestigioso. Hay carreras excelentes de traders que nunca gestionan a nadie: viven de su capital y del fondeo, sin empleados ni regulador. Escalar es una opción, no una obligación: elígela por diseño de vida, no por ego.</p>`,
    claves: [
      "Gestor es un negocio; trader es un oficio",
      "El capital ajeno exige drawdowns más bajos",
      "Prop firms: gestión con estructura ya resuelta",
      "Escalar es opción de diseño de vida, no obligación",
    ],
  };

  /* ===== Módulo 4 · Sala de trading en vivo RIC ===== */

  L["5-4-0"] = {
    resumen: "La sala en vivo no es un canal de señales: es un entorno de entrenamiento profesional con protocolo, roles y reglas. Aquí aprendes a usarla para crecer, no para copiar.",
    duracionVideo: "8-10 min",
    lectura: `<p>La sala de operativa en vivo con head traders es probablemente el componente de mayor valor del nivel, y también el más fácil de usar mal. Usada bien, acelera años de aprendizaje: ves a profesionales decidir en tiempo real, con incertidumbre real. Usada mal, se convierte en un canal de señales que destruye tu autonomía. Esta lección define el protocolo para que sea lo primero.</p><h4>Qué es y qué no es</h4><p>En la sala, un head trader comparte su pantalla y su razonamiento durante la sesión: contexto, escenarios, gestión de las posiciones y revisión de errores en caliente. Lo que la sala no es: un servicio donde esperas que alguien grite compra ahora para replicarlo. Copiar operaciones ajenas sin proceso propio tiene el mismo problema que copiar la dieta de un atleta sin entrenar: los resultados no se transfieren, el proceso sí.</p><h4>El protocolo del participante profesional</h4><ol><li><strong>Llega con tu propio plan:</strong> antes de entrar a sala, tu análisis pre-mercado debe estar hecho. La sala contrasta tu lectura con la del head trader; sin lectura propia no hay contraste, solo dependencia.</li><li><strong>Anota divergencias:</strong> cuando tu escenario difiere del planteado, regístralo y sigue ambos durante la sesión. Ahí está tu aprendizaje más rico: entender por qué el profesional leyó distinto.</li><li><strong>Pregunta por el razonamiento, no por la señal:</strong> la pregunta prohibida es entro o no entro; la pregunta valiosa es qué invalidaría este escenario.</li><li><strong>Opera tu sistema, en tu tamaño:</strong> la sala no modifica tu gestión de riesgo. Si el head trader opera un contexto que tu sistema no contempla, tu trabajo es observar y documentar, no improvisar.</li></ol><h4>Ejemplo de uso correcto</h4><p>Un alumno lleva su plan: venta en 20.250 del Nasdaq si hay rechazo con delta negativo. El head trader plantea compras en 20.180 por absorción en el perfil semanal. Ambos niveles se activan durante la sesión. El alumno opera solo el suyo (su sistema no incluye la lectura del head trader), y documenta el escenario ajeno con capturas y notas. En la revisión posterior entiende la lógica del nivel de compra y, tras verlo repetirse semanas, decide backtestearlo antes de incorporarlo. Eso es transferencia de conocimiento profesional: observación, documentación, validación e incorporación. El atajo (copiarlo el primer día) habría sido apostar.</p><h4>Error común</h4><p>Medir el valor de la sala por las ganancias de esa semana. El valor real se mide en preguntas mejores, escenarios que antes no veías y errores que dejas de cometer. Dale al proceso el mismo estándar que a todo en este programa: meses, no días.</p>`,
    claves: [
      "La sala entrena criterio, no reparte señales",
      "Entra siempre con plan propio para contrastar",
      "Pregunta qué invalida el escenario, no si entrar",
      "Observa, documenta, valida y recién incorpora",
    ],
  };

  L["5-4-1"] = {
    resumen: "El playbook pre-mercado institucional: la rutina de 30-40 minutos que convierte la apertura en un examen que ya rendiste — niveles, escenarios y plan de riesgo por escrito.",
    duracionVideo: "10-13 min",
    lectura: `<p>Los equipos institucionales no llegan al mercado a ver qué pasa: llegan con un playbook donde los escenarios más probables ya están pensados, con niveles y respuestas predefinidas. La diferencia entre el profesional y el aficionado rara vez está en la reacción; está en cuánto estaba preparado antes de que hiciera falta reaccionar. Esta lección estandariza tu rutina pre-mercado al nivel que la sala en vivo exige.</p><h4>La estructura del playbook diario</h4><p>El documento se completa en 30 a 40 minutos antes de la apertura y tiene cinco bloques.</p><ol><li><strong>Contexto general:</strong> qué hicieron las sesiones de Asia y Europa, dónde cerró ayer tu instrumento, qué datos macro se publican hoy y a qué hora. Dos o tres frases.</li><li><strong>Mapa de niveles:</strong> máximo y mínimo de ayer y de la noche, área de valor y nodos del perfil, niveles semanales relevantes. Entre cinco y ocho niveles, no veinte: el exceso de niveles es la forma elegante de no tener ninguno.</li><li><strong>Escenarios (el corazón):</strong> dos o tres situaciones tipo si-entonces. Ejemplo: si el precio abre sobre 2.420 y el retroceso a esa zona muestra absorción compradora, busco largos con objetivo en 2.431; si abre dentro del rango de ayer y no toma dirección en la primera hora, opero los extremos del rango o no opero.</li><li><strong>Plan de riesgo del día:</strong> presupuesto de pérdida, número máximo de operaciones, tamaño. Números escritos antes de que exista la tentación.</li><li><strong>Estado personal:</strong> una línea honesta. Dormiste mal, estás ansioso por recuperar, hay algo fuera del trading ocupando tu cabeza. Si la línea es mala, el plan de riesgo se reduce a la mitad. </li></ol><h4>Por qué funciona: decisiones baratas</h4><p>Decidir en frío es barato; decidir en caliente es carísimo. Cuando el precio llega a tu nivel con velocidad y la sala está activa, tu corteza prefrontal está en su peor momento. El playbook traslada la decisión al momento donde eras más inteligente: media hora antes, con café y sin posiciones. En sala en vivo verás que los head traders casi nunca improvisan: ejecutan escenarios que ya escribieron, y cuando el mercado no da ninguno de sus escenarios, no operan.</p><h4>Error común</h4><p>Escribir el playbook una semana y abandonarlo cuando llega una racha ganadora, como si la preparación fuera para principiantes. Es exactamente al revés: la preparación es lo que los profesionales se niegan a abandonar. Tu playbook diario será revisado en las sesiones de sala: llegar sin él es llegar sin entrada.</p>`,
    claves: [
      "Escenarios si-entonces escritos antes de abrir",
      "Cinco a ocho niveles: más es no tener ninguno",
      "El riesgo del día se decide en frío, por escrito",
      "Sin escenario cumplido, el plan es no operar",
    ],
  };

  L["5-4-2"] = {
    resumen: "Revisar operaciones en tiempo real con otros traders: la metodología de comentario en vivo, qué se evalúa (proceso, no resultado) y cómo recibir crítica sin defenderte.",
    duracionVideo: "8-11 min",
    lectura: `<p>Una de las prácticas centrales de la sala RIC es la revisión de operaciones en tiempo real: un trader comparte una posición (propia, abierta o recién cerrada) y el grupo la analiza con el head trader. Es incómodo, es expuesto y es el mecanismo de mejora más rápido que existe en este oficio, porque elimina el tiempo entre el error y su detección.</p><h4>Qué se evalúa: proceso, nunca resultado</h4><p>La regla número uno de la revisión: una operación ganadora puede ser mala y una perdedora puede ser excelente. Se evalúan cuatro preguntas en orden: la operación estaba en tu playbook del día; la entrada cumplió las condiciones exactas de tu sistema; el tamaño y el stop respetaron tu plan de riesgo; la gestión siguió reglas o siguió emociones. Ejemplo: un trader muestra un largo que ganó 400 dólares. La revisión detecta que entró sin que el escenario estuviera en su playbook, con el doble de su tamaño habitual. Veredicto profesional: operación mala con buen resultado, el tipo más peligroso que existe, porque paga por repetir el error. El grupo lo dice con claridad y sin drama; esa cultura es la sala.</p><h4>El protocolo de la revisión en vivo</h4><ol><li>El trader presenta en un minuto: contexto, escenario, entrada, riesgo y estado de la posición. Sin justificaciones, solo hechos.</li><li>El grupo pregunta antes de opinar: qué decía tu playbook, dónde estaba tu invalidación.</li><li>El head trader comenta el proceso y muestra qué habría mirado distinto en el mismo momento, con las herramientas del nivel: perfil, footprint, contexto de subasta.</li><li>Se registra la conclusión en una frase accionable: por ejemplo, mis entradas fuera de playbook llevan tres semanas en negativo; esta semana, cero entradas fuera de playbook.</li></ol><h4>Cómo recibir crítica como profesional</h4><p>La reacción por defecto ante la crítica es defender la operación, y es la reacción que debes entrenar para eliminar. El protocolo personal: escucha completo sin interrumpir, agradece, anota, y decide en frío después de la sesión qué incorporas. No toda crítica es correcta, pero toda crítica de alguien que vio tus datos merece consideración antes que defensa. El trader que se defiende de todo aprende de nada.</p><h4>Error común</h4><p>Compartir solo operaciones ganadoras. La revisión de una pérdida bien gestionada enseña más al grupo que diez ganadoras, y compartir pérdidas con calma es, en sí mismo, un indicador de madurez profesional que la sala valora explícitamente. Trae tu peor operación de la semana: es la que más vale.</p>`,
    claves: [
      "Se evalúa proceso: una ganadora puede ser mala",
      "Presenta hechos en un minuto, sin justificarte",
      "Escucha, anota y decide en frío qué incorporar",
      "Tu peor operación es la más valiosa para revisar",
    ],
  };

  L["5-4-3"] = {
    resumen: "Simulacros de evaluación de fondeo en grupo: replicar reglas reales de prop firms en demo, con presión social y auditoría, antes de pagar la evaluación verdadera.",
    duracionVideo: "8-10 min",
    lectura: `<p>El último componente de la sala une los dos extremos del nivel: la teoría de prop firms del primer módulo y la práctica supervisada. En los simulacros grupales, un grupo de alumnos opera durante dos a cuatro semanas cuentas demo configuradas con las reglas exactas de una evaluación real: mismo objetivo, mismos drawdowns, mismas reglas de consistencia. Quien viola una regla queda eliminado del simulacro, exactamente como en la realidad, pero con costo cero.</p><h4>Por qué simular si es gratis fallar en demo</h4><p>Porque la evaluación real no falla por conocimiento: falla por comportamiento bajo presión, y la presión hay que fabricarla. El simulacro la fabrica con tres ingredientes: reglas duras verificadas por un tercero (no te perdonas a ti mismo el límite diario), visibilidad del grupo (tus métricas se publican en la tabla del simulacro cada semana) y consecuencia simbólica (la eliminación es pública, aunque amable). No es idéntico a arriesgar la cuota de una evaluación, pero activa los mismos mecanismos: miedo a quedar mal, tentación de recuperar, ansiedad por terminar rápido.</p><h4>La mecánica con números</h4><p>Un simulacro típico RIC: cuenta demo de 100.000, objetivo de 8 por ciento, límite diario de 5 por ciento, total de 10 por ciento, mínimo de 10 días operados, máximo de 30. Cada participante entrega su playbook diario y su registro. Resultados habituales de una primera cohorte: de 20 participantes, 5 o 6 alcanzan el objetivo, 8 violan alguna regla (el límite diario es el verdugo habitual) y el resto termina el plazo sin objetivo ni violación. Ese último grupo suele aprender la lección más importante: no violar reglas ya te pone en la mitad superior; la prisa por el objetivo es lo que mata.</p><h4>La auditoría posterior</h4><p>Al cerrar el simulacro, cada cuenta se revisa en grupo con las preguntas del módulo de fondeo: dónde se rompió el presupuesto diario, qué operaciones se tomaron fuera de playbook, cómo se comportó cada uno tras su primer día fuerte en rojo. Los eliminados presentan su análisis de la violación: qué regla, en qué contexto emocional, y qué protocolo la habría evitado. Presentar tu propia eliminación sin excusas es de los ejercicios más formativos del programa.</p><h4>Aplicación práctica y error común</h4><p>Trata cada simulacro como si hubieras pagado por él: mismo pre-mercado, mismo registro, misma seriedad. El error común es operarlo con la soltura del que no arriesga nada; ahí el simulacro no mide nada y solo pierdes semanas. La recomendación del programa es directa: nadie paga una evaluación real sin haber aprobado al menos un simulacro completo con las mismas reglas.</p>`,
    claves: [
      "La presión se fabrica: reglas duras, grupo y tabla pública",
      "El límite diario es el verdugo habitual",
      "No violar reglas ya te pone en la mitad superior",
      "Aprueba el simulacro antes de pagar la evaluación",
    ],
  };

  /* ===== Módulo 5 · Psicología del trader profesional ===== */

  L["5-5-0"] = {
    resumen: "Operar capital ajeno cambia la carga: la pérdida deja de ser privada y aparece el miedo a defraudar. Protocolos para que la responsabilidad no degrade tu ejecución.",
    duracionVideo: "9-12 min",
    lectura: `<p>Todo lo que aprendiste de psicología hasta aquí fue con un supuesto implícito: el dinero en juego era tuyo. Cuando operas una cuenta fondeada o, más adelante, capital gestionado, aparece una carga nueva que ningún backtest predice: la pérdida deja de ser un asunto privado. Ahora hay una firma que puede retirarte la cuenta, o personas que confiaron en ti. Muchos traders excelentes en su cuenta se degradan operando capital ajeno, y no por falta de técnica.</p><h4>Qué cambia en la cabeza</h4><p>Tres mecanismos concretos. Primero, la aversión a la pérdida se amplifica: perder 500 dólares propios duele; perder 500 que evaluará otro duele y avergüenza, y la vergüenza es peor consejera que el dolor. Segundo, aparece el miedo anticipatorio: traders que ejecutaban sin dudar empiezan a filtrar operaciones válidas por miedo a que salga mal justo hoy, degradando la estadística de su sistema al operarlo incompleto. Tercero, se distorsiona la gestión: cortar ganadoras antes de tiempo para asegurar y mostrar algo positivo, o aguantar perdedoras para no reportar la pérdida. Ejemplo numérico: un sistema con expectancy de 40 dólares por operación en 100 operaciones anuales genera 4.000. El mismo trader, filtrando por miedo el 30 por ciento de las señales (usualmente las que parecen más incómodas, que suelen ser las mejores) y cortando ganadoras un 20 por ciento antes, puede llevar esa expectancy cerca de cero sin cometer ni un error visible.</p><h4>Protocolos que funcionan</h4><ol><li><strong>Reencuadra tu trabajo:</strong> no te pagan por ganar hoy; te pagan por ejecutar un proceso con ventaja estadística. La firma y el inversor sofisticado evalúan exactamente eso.</li><li><strong>Presupuesto de pérdida comunicado:</strong> cuando el límite diario y el drawdown esperado están pactados por adelantado (con la firma o el inversor), perder dentro del presupuesto deja de ser un fracaso: es el plan funcionando.</li><li><strong>Mide la fidelidad, no el resultado:</strong> lleva un indicador diario de ejecución (operaciones tomadas del playbook sobre señales válidas). Si cae bajo el 80 por ciento, el problema es la carga, y es momento de reducir tamaño hasta recuperar fidelidad.</li><li><strong>Despersonaliza la cuenta:</strong> opera el proceso, no el saldo. Muchos profesionales ocultan el monto en pantalla y trabajan en unidades de riesgo.</li></ol><h4>Error común</h4><p>Callar la presión por creer que un profesional no debería sentirla. Todos la sienten: la diferencia es que el profesional la nombra, la mide y ajusta el tamaño mientras se adapta. Fingir inmunidad es la vía rápida a la ejecución degradada.</p>`,
    claves: [
      "La vergüenza es peor consejera que el dolor",
      "Filtrar señales por miedo mata la expectancy invisible",
      "Perder dentro del presupuesto es el plan funcionando",
      "Mide fidelidad de ejecución, no solo resultado",
    ],
  };

  L["5-5-1"] = {
    resumen: "Más carreras de trading se terminan por burnout que por pérdidas: señales tempranas, causas estructurales del agotamiento y el diseño de una rutina sostenible a años.",
    duracionVideo: "9-12 min",
    lectura: `<p>El dato que da título a esta lección merece que lo tomes literal: entre traders con sistemas rentables, el motivo más frecuente de abandono no es quebrar la cuenta, es quemarse. El burnout no llega un martes; se acumula en meses de una rutina insostenible, y cuando se nota, ya está avanzado. Un profesional de este nivel gestiona su energía con el mismo rigor que su drawdown.</p><h4>Por qué el trading quema tanto</h4><p>El oficio combina cuatro factores de riesgo que pocas profesiones juntan: incertidumbre permanente (puedes hacerlo todo bien y perder), feedback inmediato y monetario de cada decisión, soledad estructural (sin equipo, sin jefe, sin colegas por defecto) y ausencia de límites naturales (el mercado casi siempre está abierto en algún lado, y siempre existe una sesión más que mirar). Suma la vigilancia fisiológica: horas de alerta sostenida frente a pantallas elevan el cortisol de forma crónica. El resultado típico: un trader rentable que opera 9 horas, revisa el mercado de noche, no descansó un fin de semana completo en meses y se pregunta por qué su disciplina se deteriora.</p><h4>Señales tempranas: tu tablero personal</h4><ul><li>Irritabilidad desproporcionada ante pérdidas normales que antes procesabas bien.</li><li>Fatiga que el fin de semana ya no repara; sueño de mala calidad.</li><li>Errores de descuido en aumento: tamaños mal calculados, órdenes sin stop, playbook a medias.</li><li>Anhedonia operativa: ni las buenas semanas producen satisfacción; solo alivio.</li><li>Aislamiento creciente y sensación de que no puedes parar porque perderías el ritmo.</li></ul><p>Tres o más señales sostenidas dos semanas son un semáforo rojo, con la misma jerarquía que un drawdown del 15 por ciento.</p><h4>Diseño de rutina sostenible</h4><p>El antídoto es estructural, no motivacional. Primero, horario operativo cerrado: se opera la ventana definida (por ejemplo, 3 horas de sesión más 1 de preparación y revisión) y fuera de ella el mercado no existe; los datos del módulo de Python te sirven aquí, porque casi siempre demuestran que 2 o 3 horas concentran tu expectancy. Segundo, descanso programado como regla dura: un día semanal sin pantallas de mercado y una semana completa por trimestre; los profesionales lo agendan como agendan las noticias de alto impacto. Tercero, cuerpo como infraestructura: sueño, ejercicio y comida no son bienestar opcional, son mantenimiento del único hardware con el que decides. Cuarto, comunidad profesional (la sala cumple parte de esa función): despresuriza la soledad y normaliza las rachas.</p><h4>Error común</h4><p>Responder a una mala racha con más horas de pantalla. La racha se revisa con auditoría de proceso, no con sobreexposición: más horas con menos energía es la receta exacta del círculo que termina carreras.</p>`,
    claves: [
      "El burnout termina más carreras que las pérdidas",
      "Tres señales sostenidas dos semanas: semáforo rojo",
      "Horario cerrado y descanso agendado como regla dura",
      "A la mala racha se responde con auditoría, no con horas",
    ],
  };

  L["5-5-2"] = {
    resumen: "Cuando el resultado del mes define tu valor como persona, cada drawdown es una crisis existencial: separar identidad de desempeño es una habilidad profesional, no filosofía.",
    duracionVideo: "8-11 min",
    lectura: `<p>Hay una trampa que espera precisamente a los traders que llegan lejos: cuanto más éxito tienes, más se fusiona tu identidad con tus resultados. Soy trader rentable deja de ser una descripción y se vuelve el pilar de tu autoestima. El problema es matemático: todo sistema tiene rachas perdedoras garantizadas, y si tu valor personal cotiza con tu curva de capital, tu psicología entra en drawdown junto con la cuenta, justo cuando más estabilidad necesitas.</p><h4>Cómo se ve la fusión identidad-resultado</h4><p>Señales concretas: ocultas tus meses malos a tu pareja o tu entorno; sientes euforia desproporcionada en las buenas rachas y vergüenza (no solo frustración) en las malas; te comparas compulsivamente con otros traders; una semana roja te vuelve irritable en ámbitos que nada tienen que ver con el mercado; y la idea de dejar el trading, aunque sea hipotética, se siente como dejar de ser alguien. Ejemplo realista: un trader con 30 meses de historial positivo entra en un drawdown del 12 por ciento, dentro de lo esperado por su backtest. Estadísticamente no pasa nada; identitariamente se derrumba: duda del sistema, reduce tamaño donde no debe, sobreopera para demostrar que sigue siendo bueno. El drawdown técnico dura 3 meses; el identitario, mucho más, porque se retroalimenta.</p><h4>La separación operativa</h4><p>Separar identidad de desempeño no es un eslogan: son prácticas.</p><ol><li><strong>Vocabulario:</strong> entrena la distinción entre tuve un mes perdedor (evento) y soy un perdedor (identidad). El lenguaje interno construye la interpretación; los diarios de operativa bien llevados son también entrenamiento lingüístico.</li><li><strong>Métricas de proceso como fuente de autoevaluación:</strong> tu semana se califica por fidelidad al playbook, calidad de registros y cumplimiento de riesgo, números que sí controlas. El PnL califica al sistema, no a ti.</li><li><strong>Identidad diversificada a propósito:</strong> relaciones, cuerpo, intereses y proyectos fuera del mercado no son distracciones del trading: son los otros pilares que sostienen el techo cuando uno vibra. El trader cuya vida entera es el trading no tiene amortiguación.</li><li><strong>Desempeño público moderado:</strong> cuanto más construyas tu imagen social sobre resultados (redes, promesas a la familia), más cara será cada racha normal. El profesional presume proceso, si acaso.</li></ol><h4>Error común</h4><p>Confundir esta separación con indiferencia. No se trata de que no te importe: se trata de que te importe desde un lugar estable. El competidor de élite quiere ganar intensamente y sabe que perder un partido no lo borra como atleta. Esa combinación (ambición alta, identidad a salvo) es exactamente el perfil psicológico que sobrevive décadas en los mercados.</p>`,
    claves: [
      "Tu valor no puede cotizar con tu curva de capital",
      "Tuve un mes perdedor no es soy un perdedor",
      "Autoevalúate por proceso; el PnL evalúa al sistema",
      "Identidad diversificada: los otros pilares del techo",
    ],
  };

  L["5-5-3"] = {
    resumen: "Los traders que siguen operando a los diez años no son los más brillantes: son los que diseñaron un oficio sobrevivible. Los patrones concretos de la longevidad profesional.",
    duracionVideo: "9-12 min",
    lectura: `<p>Cierra el módulo la pregunta más importante de tu carrera: no cómo ganar este año, sino cómo seguir aquí dentro de diez. La observación repetida de la industria es incómoda para el ego: los sobrevivientes de largo plazo rara vez son los más talentosos de su generación; son los que trataron el trading como una carrera de fondo y diseñaron cada pieza (riesgo, rutina, finanzas, identidad) para durar. La longevidad no es suerte: es arquitectura, y sus patrones se pueden copiar.</p><h4>Los patrones de los que duran</h4><ol><li><strong>Riesgo aburrido durante décadas:</strong> operan con fracciones de riesgo que parecen tímidas (0,25 a 1 por ciento) y jamás tienen el año espectacular. Tampoco tienen el año que borra la cuenta. La matemática del interés compuesto hace el resto: 20 por ciento anual sostenido 10 años multiplica el capital por más de 6; el perfil de 80 por ciento un año y menos 60 el siguiente termina, tras el mismo periodo, cerca de donde empezó o fuera del juego.</li><li><strong>Finanzas personales de fortaleza:</strong> viven por debajo de sus ingresos, mantienen 12 o más meses de gastos fuera del capital de trading e invierten pasivamente en paralelo. Nunca necesitan que este mes sea bueno, y esa ausencia de necesidad es una ventaja operativa directa: la necesidad es el peor parámetro de un sistema.</li><li><strong>Evolución sin reinvención permanente:</strong> ajustan sus sistemas cuando los datos lo piden, pero no persiguen cada novedad. Su ventaja se profundiza en pocos mercados y contextos que conocen íntimamente, en lugar de dispersarse.</li><li><strong>Rutina de atleta veterano:</strong> lo del burnout hecho hábito durante años: horarios cerrados, descansos agendados, cuerpo mantenido. A los diez años, la salud es una ventaja competitiva medible frente a los que llegaron rotos.</li><li><strong>Comunidad y aporte:</strong> muchos terminan enseñando, gestionando o formando equipos. El aporte a otros renueva el sentido cuando la motivación del dinero se agota, y se agota: pocos sostienen décadas de pantalla solo por el ingreso.</li></ol><h4>El examen de los diez años</h4><p>Usa este filtro para cada decisión de carrera que tomes desde hoy: esta decisión aumenta o reduce la probabilidad de que siga operando bien dentro de diez años. Duplicar el riesgo tras un buen trimestre: la reduce. Tomarte la semana trimestral de descanso: la aumenta. Aceptar capital ajeno sin estructura legal: la reduce drásticamente. El filtro es simple y brutalmente clarificador.</p><h4>Error común</h4><p>Optimizar para el año uno lo que se juega en el año diez. El mercado no premia al que corre más rápido la primera vuelta; ni siquiera es una carrera contra otros: es contra tu propia probabilidad de abandono. Todo este nivel (fondeo, automatización, gestión, sala, psicología) apunta a lo mismo: construir un profesional que dure.</p>`,
    claves: [
      "La longevidad es arquitectura, no suerte",
      "Riesgo aburrido más interés compuesto gana la década",
      "No necesitar que este mes sea bueno es ventaja operativa",
      "Filtra cada decisión con el examen de los diez años",
    ],
  };

  /* ===== Módulo 6 · Mentoría y certificación final ===== */

  L["5-6-0"] = {
    resumen: "La mentoría 1:1 mensual con un trader profesional asignado: cómo funciona el ciclo, qué preparar para cada sesión y cómo extraerle el máximo valor sin delegar tu criterio.",
    duracionVideo: "7-10 min",
    lectura: `<p>En la recta final del programa se te asigna un mentor: un trader profesional que revisará tu operativa una vez al mes, en sesión individual, durante el resto del nivel. La mentoría 1:1 es el recurso más caro del programa y el más desaprovechado por quienes llegan sin método: una hora al mes rinde muchísimo o casi nada según cómo la uses. Esta lección define el método.</p><h4>Cómo funciona el ciclo mensual</h4><p>El ciclo tiene tres fases. Antes de la sesión, envías tu paquete de revisión con al menos 48 horas de anticipación: métricas del mes (operaciones, expectancy, drawdown, fidelidad al playbook), tus tres mejores y tres peores operaciones documentadas, y una pregunta principal que quieres resolver. Durante la sesión, el mentor trabaja sobre tus datos, no sobre generalidades: revisa patrones que tú no ves, desafía tus explicaciones y cierra con uno o dos compromisos concretos y medibles. Después, tú ejecutas los compromisos y el mes siguiente se abre revisando su cumplimiento. Sin paquete previo no hay sesión: esa regla es del programa, no del mentor.</p><h4>Qué pedirle y qué no</h4><ul><li><strong>Sí:</strong> auditoría de tus patrones (el mentor ve en tus registros lo que tu sesgo te oculta), criterio ante decisiones de carrera (escalar tamaño, sumar una cuenta de fondeo, cambiar de mercado) y estándares: cómo trabaja un profesional que lleva quince años donde tú llevas tres.</li><li><strong>No:</strong> señales, predicciones del mercado ni la validación emocional de cada operación. Un mentor que te dice qué comprar te está alquilando dependencia; uno que te muestra cómo decidir te está regalando carrera.</li></ul><h4>Ejemplo de sesión bien usada</h4><p>Un alumno llega con este paquete: 42 operaciones en el mes, expectancy de 18 dólares, fidelidad al playbook del 71 por ciento, y la pregunta de por qué su viernes es sistemáticamente su peor día. El mentor cruza los datos y encuentra que el 80 por ciento de sus operaciones fuera de playbook ocurren tras dos días consecutivos en verde: el problema no era el viernes, era la sobreconfianza acumulada de la semana. Compromiso del mes: tras dos días verdes consecutivos, el tamaño del día siguiente se reduce a la mitad. Ese hallazgo específico, imposible de ver sin ojos externos y datos ordenados, es la mentoría funcionando.</p><h4>Error común</h4><p>Tratar la sesión como terapia de resultados: llegar a contar cómo te fue y buscar ánimo. El ánimo es bienvenido, pero el activo es la auditoría. Prepara datos, lleva una pregunta afilada, sal con compromisos escritos. Un año de mentoría así equivale a varios años de prueba y error en soledad.</p>`,
    claves: [
      "Paquete de revisión 48 horas antes o no hay sesión",
      "El mentor audita patrones, no regala señales",
      "Cada sesión cierra con compromisos medibles",
      "Una pregunta afilada por sesión rinde más que diez vagas",
    ],
  };

  L["5-6-1"] = {
    resumen: "La auditoría completa de tu operativa: el proceso formal donde tus métricas, registros y cumplimiento de reglas se revisan con estándar profesional, como antesala del examen final.",
    duracionVideo: "8-11 min",
    lectura: `<p>Antes del examen final, tu operativa completa pasa por una auditoría formal: la revisión sistemática de tus números y tus procesos con el estándar que usaría un asignador de capital. No es un trámite del programa: es el ensayo general de todas las auditorías que enfrentarás en tu carrera, sea ante una prop firm, un inversor o un regulador. Y como toda auditoría seria, no se aprueba con talento: se aprueba con orden.</p><h4>Qué se audita</h4><p>La revisión cubre cuatro bloques con pesos definidos.</p><ol><li><strong>Integridad de registros (el filtro de entrada):</strong> historial completo de la cuenta exportado del broker, diario de operaciones al día y playbooks archivados. Registros incompletos detienen la auditoría: sin datos completos no hay nada que evaluar, y esa es la primera lección profesional del proceso.</li><li><strong>Métricas de desempeño:</strong> expectancy, profit factor, drawdown máximo, distribución de resultados y tamaño de muestra. No se exige un retorno mínimo espectacular: se exige coherencia entre lo que declaras que es tu sistema y lo que los datos muestran.</li><li><strong>Cumplimiento de reglas:</strong> el bloque de mayor peso. Porcentaje de operaciones dentro de playbook, respeto de límites diarios, tamaños según plan. Aquí se aplica el principio de todo el programa: una violación de riesgo pesa más que diez operaciones perdedoras.</li><li><strong>Proceso y mejora:</strong> evidencia de revisiones semanales, compromisos de mentoría cumplidos y ajustes documentados con datos, no con impulsos.</li></ol><h4>Ejemplo del veredicto tipo</h4><p>Una auditoría real de programa puede concluir así: muestra de 214 operaciones en 6 meses, expectancy positiva y estable, drawdown máximo del 6,8 por ciento contra un esperado de 9, fidelidad al playbook del 84 por ciento con tendencia ascendente, dos excesos de tamaño en el mes dos, corregidos y sin recurrencia. Resultado: apto, con observación sobre gestión de tamaño en rachas. Fíjate qué no aparece en el veredicto: cuánto dinero ganó. La auditoría mide si eres operable como profesional, no si tuviste un semestre afortunado.</p><h4>Cómo prepararte desde hoy</h4><p>La preparación de la auditoría no ocurre el mes anterior: ocurre cada día, llevando los registros como si la auditoría fuera mañana. Checklist permanente: exportas tu historial cada mes, tu diario no tiene huecos de más de un día, cada operación es rastreable a un playbook, y tus cambios de sistema tienen fecha y justificación escrita. Si eso está vivo, la auditoría es un espejo; si no, es un examen imposible de aprobar en retrospectiva.</p><h4>Error común</h4><p>Maquillar la muestra: excluir el mes malo, la cuenta quemada o las operaciones impulsivas. Un auditor experimentado detecta huecos de inmediato, y un hueco detectado destruye más credibilidad que el peor mes incluido. En auditoría, la transparencia no es una virtud: es el requisito.</p>`,
    claves: [
      "Sin registros completos la auditoría ni siquiera empieza",
      "Cumplimiento de reglas pesa más que el retorno",
      "Se audita coherencia entre sistema declarado y datos",
      "Un hueco maquillado destruye más que un mes malo",
    ],
  };

  L["5-6-2"] = {
    resumen: "El examen final F.O.C.U.S combina teoría de los seis niveles con la defensa de tu operativa auditada: qué evalúa cada parte, cómo se califica y cómo prepararlo.",
    duracionVideo: "8-10 min",
    lectura: `<p>El examen final del programa F.O.C.U.S es distinto de todos los exámenes de nivel que rendiste hasta aquí, porque evalúa lo único que importa al final de una formación: si eres capaz de operar, explicar y sostener una operativa profesional completa. Consta de dos partes con peso comparable: la teórica integradora y la defensa de tu operativa auditada.</p><h4>Parte 1: teoría integradora</h4><p>No es un repaso de definiciones: son casos que cruzan niveles. Un caso típico te entrega un escenario completo (una cuenta de fondeo con ciertas reglas, un contexto de mercado descrito con perfil y order flow, un estado emocional declarado y un historial reciente) y te pide decisiones fundamentadas: si corresponde operar, con qué tamaño, qué invalidaría el escenario, qué regla de la firma está en riesgo y qué protocolo psicológico aplica. Se califica el razonamiento, no solo la respuesta: una decisión correcta mal fundamentada vale menos que una prudente bien argumentada. Los temas atraviesan todo el programa: gestión de riesgo, estructura y subasta, fondeo, estadística de sistemas, marco legal de la gestión y psicología profesional.</p><h4>Parte 2: defensa de la operativa</h4><p>Con tu auditoría aprobada como requisito previo, presentas tu operativa ante un panel de traders del programa: tu sistema y su lógica, tus métricas con su interpretación honesta, tus peores rachas y cómo las gestionaste, y tu plan de carrera a tres años con números realistas. El panel repregunta como lo haría un comité de riesgo: por qué ese tamaño, por qué ese mercado, qué harías si el drawdown duplicara el histórico. Ejemplo de repregunta real: tu expectancy es 22 dólares con 38 por ciento de acierto; explica por qué tu racha perdedora esperada no viola el drawdown de tu cuenta de fondeo. Si tu sistema es tuyo de verdad, esa respuesta te toma un minuto con lápiz: la probabilidad de rachas y tu presupuesto de riesgo son cálculos que ya dominas desde los módulos de estadística y fondeo.</p><h4>Cómo se aprueba</h4><p>El estándar es explícito: coherencia (tus respuestas teóricas y tu operativa real cuentan la misma historia), rigor (números correctos, riesgos cuantificados) y honestidad (los examinadores premian el reconocimiento claro de límites y penalizan el humo con severidad; es la cultura RIC llevada al examen). Quien llega con registros vivos, mentoría aprovechada y auditoría limpia descubre que el examen es exigente pero no sorpresivo: llevas seis niveles preparándolo.</p><h4>Error común</h4><p>Prepararlo como un examen académico, memorizando definiciones la última semana. La preparación real es retroactiva e imposible de improvisar: son tus registros, tu consistencia y tu comprensión acumulada. La última semana solo ordenas la presentación; el examen lo escribiste durante todo el programa.</p>`,
    claves: [
      "Dos partes: casos integradores y defensa ante panel",
      "Se califica el razonamiento, no solo la respuesta",
      "Coherencia entre lo que dices y lo que tus datos muestran",
      "El examen se prepara durante años, no la última semana",
    ],
  };

  L["5-6-3"] = {
    resumen: "La certificación RIC Professional Trader y la red de egresados: qué acredita el sello, qué puertas abre de verdad y cómo empieza la etapa donde el programa termina y la carrera sigue.",
    duracionVideo: "6-9 min",
    lectura: `<p>Aprobado el examen final, recibes la certificación RIC Professional Trader y el ingreso a la red de egresados. Esta última lección pone ambas cosas en su justa medida: qué valen, qué no acreditan y cómo usarlas para la etapa que empieza cuando el programa termina.</p><h4>Qué acredita la certificación</h4><p>El sello RIC acredita hechos verificables: que completaste un programa de formación de seis niveles, que tu operativa fue auditada con registros completos y reglas cumplidas, y que defendiste tu sistema ante un panel profesional. Eso es mucho y conviene decirlo con precisión, porque también hay que decir lo que no acredita: no es una licencia regulatoria (no te habilita a gestionar capital de terceros: eso sigue dependiendo del regulador de tu país, como estudiaste en este nivel), no garantiza rentabilidad futura y no reemplaza tu track record, que sigue siendo tu credencial principal ante cualquier firma o inversor. Certificación más track record auditable más marco legal claro: ese es el paquete completo del profesional; el sello es una pieza, no el conjunto.</p><h4>La red de egresados: el activo silencioso</h4><p>El trading es estructuralmente solitario, y este nivel te mostró el costo de esa soledad. La red de egresados existe para amortizarlo de forma permanente: acceso continuado a la comunidad de traders certificados, salas y revisiones entre pares, contactos con prop firms y gestoras que se acercan a la red, y oportunidades de las que casi nunca se enteran los traders aislados (un fondo que busca un trader de futuros, una firma que arma un desk, un egresado que estructura una gestora y necesita equipo). Ejemplo concreto del valor: de una cohorte de egresados, es habitual que en los dos años siguientes varios terminen trabajando juntos en estructuras que no existían cuando se certificaron. Esas estructuras nacen de la confianza construida en años de revisiones compartidas: nadie contrata a un desconocido para un desk, pero todos quieren al colega cuyas métricas y disciplina vieron de cerca.</p><h4>Los caminos desde aquí</h4><p>Con el programa completo, los egresados suelen seguir una de cuatro rutas, todas legítimas: trader independiente con capital propio y de fondeo, escalando cuentas como viste en este nivel; camino del gestor, con la ruta legal y el track record como próximos hitos; integración a estructuras existentes (desks, gestoras, prop firms) usando la red; o la vía híbrida con enseñanza y mentoría dentro del ecosistema RIC, que exige mantener operativa viva: aquí no enseña quien dejó de operar.</p><h4>El cierre honesto</h4><p>El error común del recién certificado es creer que terminó algo. Terminaste la formación estructurada; el oficio sigue siendo el de siempre: proceso, registros, riesgo controlado y una década por delante que se gana mes a mes. La certificación no te hace profesional: te acredita como alguien que ya trabaja como tal. Que siga siendo verdad es, desde hoy, tu único examen permanente.</p>`,
    claves: [
      "El sello acredita formación y auditoría, no licencia legal",
      "Tu track record sigue siendo la credencial principal",
      "La red de egresados abre puertas que la soledad cierra",
      "La certificación se sostiene operando, no se cuelga",
    ],
  };

  /* ===== Examen · Nivel 5 ===== */

  const EX = (window.RIC_EXAMENES = window.RIC_EXAMENES || {});
  EX[5] = [
    {
      q: "¿Cuál es la principal fuente de ingresos del modelo de negocio de la mayoría de las prop firms modernas?",
      opciones: [
        "Las comisiones por operación que cobran a los traders fondeados",
        "El interés que generan al invertir el capital de sus traders",
        "Las cuotas de evaluación que paga la gran mayoría que no aprueba",
        "El porcentaje del split que retienen de los retiros exitosos",
      ],
      correcta: 2,
    },
    {
      q: "En una cuenta con trailing drawdown, ¿qué característica distingue a ese límite de pérdida?",
      opciones: [
        "Sube con tus ganancias y no vuelve a bajar, acercándose a tu equity",
        "Se reinicia cada día al cierre de la sesión anterior",
        "Solo se aplica sobre el balance cerrado, nunca sobre posiciones abiertas",
        "Desaparece cuando la cuenta acumula un 10 por ciento de beneficio",
      ],
      correcta: 0,
    },
    {
      q: "Un trader consistente empieza a operar capital ajeno y filtra por miedo el 30 por ciento de las señales válidas de su sistema. ¿Cuál es la consecuencia descrita en el nivel?",
      opciones: [
        "Ninguna relevante, porque las señales filtradas suelen ser las peores",
        "Su expectancy puede caer cerca de cero sin cometer ningún error visible",
        "Su drawdown máximo aumenta aunque la expectancy se mantenga",
        "Mejora su tasa de acierto y por eso el resultado neto sube",
      ],
      correcta: 1,
    },
    {
      q: "En un backtest, usar en la decisión de entrada información que aún no existía en ese momento (como el cierre de una vela sin cerrar) es un error llamado:",
      opciones: [
        "Sobreoptimización de parámetros",
        "Sesgo de supervivencia",
        "Deslizamiento no modelado",
        "Lookahead, e invalida todo el estudio",
      ],
      correcta: 3,
    },
    {
      q: "Un vendedor promociona señales de IA con 87 por ciento de acierto. Si sus operaciones ganan 10 dólares y pierden 100, ¿qué concluyes?",
      opciones: [
        "El sistema pierde dinero: el acierto sin ratio ni riesgo es marketing",
        "El sistema es rentable porque el acierto supera el 50 por ciento",
        "Faltaría conocer el drawdown para saber si es rentable",
        "El sistema es rentable solo si opera en temporalidades altas",
      ],
      correcta: 0,
    },
    {
      q: "En la lectura combinada de order flow, ¿cuál es la jerarquía correcta de las tres herramientas?",
      opciones: [
        "DOM para contexto, perfil para confirmar, footprint para ejecutar",
        "Footprint para contexto, DOM para confirmar, perfil para ejecutar",
        "Perfil para contexto, footprint para confirmar, DOM para afinar la ejecución",
        "Las tres cumplen la misma función y el orden es indistinto",
      ],
      correcta: 2,
    },
    {
      q: "Según la teoría de subastas, un mercado en balance se caracteriza por:",
      opciones: [
        "Precio migrando con perfil delgado en busca de valor nuevo",
        "Rotación alrededor de un valor aceptado, con perfil engordado en el centro",
        "Ausencia total de volumen negociado en el área central",
        "Movimientos verticales provocados por noticias de alto impacto",
      ],
      correcta: 1,
    },
    {
      q: "¿Cuál es el principio legal general sobre gestionar capital de terceros en LATAM?",
      opciones: [
        "Es legal si hay un acuerdo privado firmado entre las partes",
        "Es legal siempre que se gestionen menos de 100.000 dólares",
        "Solo está regulado cuando se operan acciones locales, no divisas ni futuros",
        "Sin licencia o estructura regulada es ilegal en la mayoría de las jurisdicciones",
      ],
      correcta: 3,
    },
    {
      q: "¿Qué acredita la certificación RIC Professional Trader al finalizar el programa?",
      opciones: [
        "Una licencia regulatoria para gestionar capital de terceros",
        "Rentabilidad garantizada avalada por la academia",
        "Formación completa, operativa auditada y defensa ante panel; no reemplaza track record ni licencia",
        "La incorporación automática como gestor en un fondo de la red",
      ],
      correcta: 2,
    },
    {
      q: "En la revisión de operaciones de la sala en vivo, una operación que ganó dinero pero se tomó fuera del playbook y con el doble del tamaño permitido se considera:",
      opciones: [
        "Una operación mala con buen resultado: el tipo más peligroso porque paga por repetir el error",
        "Una operación válida, porque el resultado positivo confirma la lectura",
        "Una operación neutra que no amerita revisión del grupo",
        "Una operación buena si el trader declara que vio confluencia técnica",
      ],
      correcta: 0,
    },
    {
      q: "Una prop firm vende 1.000 evaluaciones a 100 dólares y solo 30 traders terminan cobrando retiros por 15.000 en total. ¿Qué revela este escenario sobre su modelo de negocio?",
      opciones: [
        "Que la firma pierde dinero y lo compensa con comisiones por operación",
        "Que la firma depende de que sus traders fondeados sean rentables",
        "Que la firma retiene la mayor parte de las cuotas porque la gran mayoría no aprueba",
        "Que la firma invierte el capital de las evaluaciones en el mercado real",
      ],
      correcta: 2,
      leccion: "5-0-0",
    },
    {
      q: "Estás por elegir tu primera prop firm. Según el criterio profesional de la lección, ¿qué debería pesar más en tu decisión?",
      opciones: [
        "El contrato completo, el cálculo exacto de cada drawdown y el historial de pagos verificables",
        "El descuento vigente sobre el precio de la evaluación",
        "La cantidad de seguidores y publicidad que tiene la firma",
        "Que ofrezca el objetivo de beneficio más alto del mercado",
      ],
      correcta: 0,
      leccion: "5-0-0",
    },
    {
      q: "En una evaluación de 100.000 con límite diario de 5 por ciento, ¿por qué la lección recomienda arriesgar 0,5 por ciento por operación en lugar de 2?",
      opciones: [
        "Porque con 0,5 alcanzas el objetivo en menos operaciones",
        "Porque con 2 por ciento, tres pérdidas seguidas en un día te dejan a una sola operación de violar el límite diario",
        "Porque las firmas prohíben arriesgar más de 1 por ciento",
        "Porque el ratio 1:2 solo funciona con riesgos pequeños",
      ],
      correcta: 1,
      leccion: "5-0-1",
    },
    {
      q: "Un trader lleva 7 por ciento ganado en una evaluación cuyo objetivo es 8. Decide duplicar el riesgo para terminar hoy mismo. Según la lección, ¿qué está haciendo?",
      opciones: [
        "Aplicar gestión dinámica correcta para capitalizar el momento",
        "Aprovechar el colchón acumulado, que se lo permite matemáticamente",
        "Respetar la regla de consistencia al concentrar el beneficio",
        "Cometer el error clásico de acelerar cerca del objetivo, que suele devolver todo lo ganado",
      ],
      correcta: 3,
      leccion: "5-0-1",
    },
    {
      q: "Tu cuenta fondeada te deja 800 dólares de presupuesto operativo hoy y arriesgas 200 por operación. Siguiendo la rutina de la lección, ¿qué haces tras cuatro pérdidas?",
      opciones: [
        "Terminas el día: se acabaron tus intentos, sin excepciones",
        "Reduces el riesgo a 100 y sigues buscando setups",
        "Sigues operando mientras no toques el límite oficial de la firma",
        "Aumentas el tamaño en la siguiente para recuperar con una sola operación",
      ],
      correcta: 0,
      leccion: "5-0-2",
    },
    {
      q: "Según la lección de gestión en cuentas fondeadas, ¿cuál es la métrica central de un trader fondeado profesional?",
      opciones: [
        "La ganancia porcentual de cada mes",
        "El número de operaciones ganadoras consecutivas",
        "Cuántos meses consecutivos lleva sin violar una regla",
        "La velocidad con la que recupera los días rojos",
      ],
      correcta: 2,
      leccion: "5-0-2",
    },
    {
      q: "Una firma revisa tu cuenta cada trimestre y amplía el capital 25 por ciento si acumulaste 10 por ciento de beneficio con reglas intactas. ¿Qué perfil de trader premia este esquema?",
      opciones: [
        "Al que logra el mes más espectacular del trimestre",
        "Al que opera más volumen y genera más comisiones",
        "Al que recupera rápido después de violar una regla",
        "Al que entrega trimestres limpios y consistentes, aunque sin brillo",
      ],
      correcta: 3,
      leccion: "5-0-3",
    },
    {
      q: "Al escalar de 10.000 a 400.000 gestionados, el riesgo del 0,5 por ciento pasa de 50 a 2.000 dólares por operación. ¿Cuál es la recomendación de la lección para esa transición?",
      opciones: [
        "Saltar directo al nuevo tamaño para adaptarte cuanto antes",
        "Subir en escalones del 20-25 por ciento y consolidar cada nivel unas cuatro semanas midiendo tus métricas",
        "Reducir el riesgo porcentual a la décima parte para que los dólares no cambien",
        "Delegar la ejecución en un bot para eliminar el factor emocional",
      ],
      correcta: 1,
      leccion: "5-0-3",
    },
    {
      q: "Generas 4.000 dólares en un ciclo de retiro con split de 80 por ciento para el trader. ¿Cuánto cobras y cuánto retiene la firma?",
      opciones: [
        "Cobras 4.000 y la firma cobra aparte sus comisiones",
        "Cobras 3.200 y la firma retiene 800",
        "Cobras 2.000 porque el primer retiro siempre se divide a la mitad",
        "Cobras 800 y la firma retiene 3.200",
      ],
      correcta: 1,
      leccion: "5-0-4",
    },
    {
      q: "¿Por qué los pagos de una prop firm suelen tratarse fiscalmente como ingreso por servicios y no como ganancia de capital bursátil?",
      opciones: [
        "Porque las prop firms operan desde jurisdicciones sin impuestos",
        "Porque los montos son demasiado pequeños para calificar como inversión",
        "Porque el trader factura siempre a través de una sociedad",
        "Porque el trader no es dueño del capital que se opera: presta un servicio a la firma",
      ],
      correcta: 3,
      leccion: "5-0-4",
    },
    {
      q: "Según la lección introductoria de Python, ¿cuál es la función real de Python en el proceso de un trader?",
      opciones: [
        "Evaluar con datos las estrategias que el trader define; la creatividad sigue siendo del trader",
        "Generar estrategias rentables automáticamente a partir de datos",
        "Reemplazar el análisis de mercado con predicciones estadísticas",
        "Eliminar la necesidad de definir reglas propias",
      ],
      correcta: 0,
      leccion: "5-1-0",
    },
    {
      q: "Un alumno quiere construir un bot de ejecución en su primera semana con Python. Según la lección, ¿cuál es el orden correcto de trabajo?",
      opciones: [
        "Ejecución primero para motivarse, luego el análisis",
        "Backtesting, ejecución, datos y análisis al final",
        "Datos, análisis, backtesting y recién al final ejecución",
        "El orden es indistinto si el sistema ya está definido",
      ],
      correcta: 2,
      leccion: "5-1-0",
    },
    {
      q: "Descubres con pandas que la volatilidad media por vela del oro es 3,10 dólares en la apertura de Nueva York y 1,20 en la madrugada asiática. Si tu stop típico es de 2 dólares, ¿qué aprendiste?",
      opciones: [
        "Que debes operar solo en la madrugada, donde el stop sobra",
        "Que el stop debe ser siempre de 3,10 para cubrir ambos contextos",
        "Que el mismo stop es enorme en términos relativos en la madrugada y ajustado en la apertura: mismo sistema, contexto opuesto",
        "Que la volatilidad no afecta al tamaño del stop si el sistema es bueno",
      ],
      correcta: 2,
      leccion: "5-1-1",
    },
    {
      q: "Antes de analizar un año de velas descargadas, ¿qué verificaciones de calidad exige la lección sobre los datos?",
      opciones: [
        "Que el archivo provenga de al menos tres fuentes distintas",
        "Husos horarios, huecos en la serie y si el volumen es real o solo de tu broker",
        "Que los datos estén exclusivamente en formato CSV",
        "Que el instrumento tenga al menos diez años de historia",
      ],
      correcta: 1,
      leccion: "5-1-1",
    },
    {
      q: "¿Cuál de estas reglas de entrada cumple el estándar de precisión programable de la lección?",
      opciones: [
        "Compro cuando hay fuerza alcista tras un retroceso limpio",
        "Compro cuando el mercado muestra intención institucional clara",
        "Compro cuando el contexto general favorece a los compradores",
        "Compro si el precio está sobre la media de 50 en 15 minutos, retrocede al menos 50 por ciento del impulso y una vela de 5 minutos cierra sobre el máximo de la anterior",
      ],
      correcta: 3,
      leccion: "5-1-2",
    },
    {
      q: "Un trader programa la entrada de su sistema pero gestiona las salidas a criterio. Según la lección, ¿cuál es la consecuencia?",
      opciones: [
        "Nunca sabrá si falla el sistema o falla él: la gestión discrecional sobre entradas mecánicas arruina la medición",
        "Ninguna: la gestión discrecional mejora los sistemas mecánicos",
        "El backtest sigue siendo válido porque la entrada es lo importante",
        "Solo pierde precisión en mercados laterales",
      ],
      correcta: 0,
      leccion: "5-1-2",
    },
    {
      q: "Un sistema tiene 45 por ciento de acierto, ganancia media de 300 y pérdida media de 150. ¿Cuál es su expectancy por operación?",
      opciones: [
        "150 dólares, la diferencia entre ganancia y pérdida media",
        "52,5 dólares: 0,45 por 300 menos 0,55 por 150",
        "Negativa, porque acierta menos de la mitad de las veces",
        "135 dólares, el 45 por ciento de la ganancia media",
      ],
      correcta: 1,
      leccion: "5-1-3",
    },
    {
      q: "Tu backtest de 2020 a 2023 luce perfecto tras ajustar nueve parámetros, pero el rendimiento se desploma con datos de 2024 que el sistema nunca vio. ¿Qué tienes?",
      opciones: [
        "Una fotografía sobreoptimizada del pasado, no un sistema",
        "Un sistema válido que solo necesita reoptimizarse cada año",
        "Evidencia de que 2024 fue un año anómalo del mercado",
        "Un problema de costos mal modelados, no de parámetros",
      ],
      correcta: 0,
      leccion: "5-1-3",
    },
    {
      q: "¿Por qué la lección exige que el stop de cada orden del bot viaje al servidor y no viva solo en la lógica del programa?",
      opciones: [
        "Porque los stops del servidor se ejecutan siempre sin deslizamiento",
        "Porque las firmas prohíben stops calculados por software externo",
        "Porque si internet o la terminal caen con posición abierta, el stop del servidor sigue protegiendo",
        "Porque el código no puede modificar órdenes ya enviadas",
      ],
      correcta: 2,
      leccion: "5-1-4",
    },
    {
      q: "¿Cuál es el estándar profesional de la lección para siquiera discutir el paso de un bot de demo a cuenta real?",
      opciones: [
        "Un mes en demo con resultado positivo",
        "Que el bot duplique el rendimiento del backtest",
        "Cincuenta operaciones sin errores de código",
        "Al menos 3 meses en demo, coincidencia razonable con el backtest y cero incidentes de riesgo sin explicación",
      ],
      correcta: 3,
      leccion: "5-1-4",
    },
    {
      q: "Según la lección de IA aplicada, ¿qué roles puede ocupar la IA en el flujo de trabajo de un trader profesional?",
      opciones: [
        "Tomadora de decisiones de riesgo cuando el trader duda",
        "Generadora de señales de entrada verificadas",
        "Predictora de precios con horizonte diario",
        "Asistente de código, auditora del diario y procesadora de información",
      ],
      correcta: 3,
      leccion: "5-1-5",
    },
    {
      q: "¿Cuál es el razonamiento económico de la lección para desconfiar de un bot de IA que promete 90 por ciento de acierto por 99 dólares al mes?",
      opciones: [
        "Que el acierto real de la IA nunca supera el 60 por ciento",
        "Que los bots por suscripción son ilegales en la mayoría de los países",
        "Que una máquina que realmente predijera así valdría miles de millones y su dueño no la vendería por suscripción",
        "Que el precio bajo indica que usa datos gratuitos de mala calidad",
      ],
      correcta: 2,
      leccion: "5-1-5",
    },
    {
      q: "En un nodo de alto volumen del perfil, el footprint muestra vendedores agrediendo 4.200 contratos sin que el precio avance, y en el DOM una orden pasiva se reconstruye cada vez que la consumen. ¿Qué historia cuentan las tres lecturas juntas?",
      opciones: [
        "Alguien grande absorbe la venta y defiende el nivel: una entrada de calidad institucional",
        "Los vendedores dominan y la ruptura bajista es inminente",
        "El mercado carece de interés y conviene esperar otra sesión",
        "El delta negativo confirma la continuación bajista",
      ],
      correcta: 0,
      leccion: "5-2-0",
    },
    {
      q: "Ves una absorción clara en el footprint, pero ocurre lejos de cualquier zona marcada del perfil de volumen. Según el protocolo de lectura integrada, ¿qué haces?",
      opciones: [
        "Entras igual: la absorción es la señal más fuerte que existe",
        "No operas: fuera de las zonas marcadas antes de la sesión, ese indicio aislado vale una fracción",
        "Abres el DOM para compensar la falta de contexto",
        "Reduces el tamaño a la mitad y tomas la entrada",
      ],
      correcta: 1,
      leccion: "5-2-0",
    },
    {
      q: "El Nasdaq rota tres días entre 20.150 y 20.290 y al cuarto abre en 20.310 tras un dato, negociando 90.000 contratos en la primera hora sin regresar al rango. ¿Cuál es la lectura de subasta?",
      opciones: [
        "Desbalance con aceptación arriba: los retrocesos a la zona rota son oportunidades de compra mientras se sostenga",
        "Falso desbalance: hay que vender el regreso al valor de 20.220",
        "Balance ampliado: el rango simplemente creció",
        "Exceso comprador: la reversión bajista es inmediata",
      ],
      correcta: 0,
      leccion: "5-2-1",
    },
    {
      q: "El precio estira al alza, revierte con rapidez y deja volumen mínimo en la punta del perfil. ¿Qué información entrega ese exceso?",
      opciones: [
        "Que la subasta aún no encontró vendedores dispuestos",
        "Que el área de valor migrará hacia esa punta",
        "Que el movimiento fue institucional y continuará",
        "Que la subasta consideró ese precio demasiado caro y lo rechazó",
      ],
      correcta: 3,
      leccion: "5-2-1",
    },
    {
      q: "Operas con stop de 10 puntos y se publica un dato de empleo que mueve el precio 40 puntos en un segundo con el DOM vacío. ¿Qué puede pasar con tu stop?",
      opciones: [
        "Se ejecuta exacto porque los stops de servidor son garantizados",
        "Puede ejecutarse hasta 30 puntos peor de lo previsto por la falta de liquidez intermedia",
        "Se cancela automáticamente hasta que vuelva la liquidez",
        "Se convierte en orden límite y espera un precio mejor",
      ],
      correcta: 1,
      leccion: "5-2-2",
    },
    {
      q: "Según el protocolo profesional para noticias de alto impacto, ¿cuándo corresponde operar el evento?",
      opciones: [
        "En el segundo exacto de la publicación, cuando el movimiento es mayor",
        "En los minutos previos, posicionándose en la dirección esperada del dato",
        "En la reacción posterior, la segunda ola, cuando la liquidez regresa",
        "Nunca: los días con noticias no se opera en ningún horario",
      ],
      correcta: 2,
      leccion: "5-2-2",
    },
    {
      q: "Cinco conocidos te ofrecen 20.000 dólares para que los operes con un acuerdo de palabra al 50 por ciento de las ganancias. ¿Cuál es la lectura legal general según la lección?",
      opciones: [
        "Es válido porque el acuerdo es privado y voluntario",
        "Sería una actividad regulada ejercida sin autorización: el acuerdo privado no te protege",
        "Es legal mientras no superes los 100.000 dólares gestionados",
        "Es legal si les entregas reportes mensuales firmados",
      ],
      correcta: 1,
      leccion: "5-3-0",
    },
    {
      q: "¿Por qué operar para una prop firm no constituye captación ilegal de ahorro público?",
      opciones: [
        "Porque el capital es de una empresa que te contrata, no ahorro captado del público",
        "Porque las prop firms tienen licencias bancarias internacionales",
        "Porque el dinero de las evaluaciones cubre cualquier pérdida",
        "Porque las cuentas fondeadas son siempre simuladas",
      ],
      correcta: 0,
      leccion: "5-3-0",
    },
    {
      q: "Dos gestores cierran el mismo mes en negativo. Uno escribe: mes difícil, ya recuperaremos. El otro reporta el menos 2,8 por ciento, su origen y que el drawdown histórico no se superó. ¿Qué transmite cada uno?",
      opciones: [
        "Ambos transmiten lo mismo porque el resultado es idéntico",
        "El primero transmite cercanía y el segundo frialdad excesiva",
        "El primero transmite prudencia; el segundo, exceso de datos",
        "El primero transmite excusas aunque sea sincero; el segundo transmite control incluso perdiendo",
      ],
      correcta: 3,
      leccion: "5-3-1",
    },
    {
      q: "¿Por qué reportar solo el porcentaje de retorno es contar media historia según la lección?",
      opciones: [
        "Porque el retorno debe expresarse siempre en dólares, no en porcentaje",
        "Porque los inversores exigen conocer cada operación individual",
        "Porque sin métricas de riesgo, un 8 por ciento mensual con drawdowns del 40 es una bomba de tiempo indetectable",
        "Porque el retorno sin comparar contra un índice no significa nada",
      ],
      correcta: 2,
      leccion: "5-3-1",
    },
    {
      q: "¿Qué convierte un historial de trading en un track record auditable?",
      opciones: [
        "Capturas de pantalla mensuales de la plataforma",
        "Una planilla propia detallada con todas las operaciones",
        "Verificación por terceros: historial completo exportado del broker o servicios independientes conectados en solo lectura",
        "Un video mostrando la cuenta en tiempo real",
      ],
      correcta: 2,
      leccion: "5-3-2",
    },
    {
      q: "Un asignador de capital compara dos perfiles: 30 meses con 18 por ciento anualizado y drawdown máximo del 7, contra 300 por ciento en 8 meses con drawdown desconocido y cuenta nueva. ¿Qué decide y por qué?",
      opciones: [
        "Financia al segundo: el retorno extraordinario es la mejor evidencia",
        "Financia a ambos y diversifica el riesgo",
        "No financia a ninguno hasta ver cinco años de historial",
        "Financia al primero: duración, muestra grande y riesgo documentado pesan más que el retorno espectacular",
      ],
      correcta: 3,
      leccion: "5-3-2",
    },
    {
      q: "Con 2 millones gestionados bajo comisión del 2 por ciento de gestión y 20 de resultados, un año de 30 por ciento genera para el gestor, según el ejemplo de la lección, aproximadamente:",
      opciones: [
        "40.000 de comisión fija más 120.000 de comisión de éxito",
        "600.000, el 30 por ciento del capital completo",
        "40.000 en total, porque la comisión de éxito se difiere",
        "120.000 de gestión más 40.000 de éxito",
      ],
      correcta: 0,
      leccion: "5-3-3",
    },
    {
      q: "¿Por qué estrategias con caídas del 25 por ciento, tolerables en cuenta propia, se vuelven invendibles al gestionar capital ajeno?",
      opciones: [
        "Porque los reguladores prohíben drawdowns superiores al 20 por ciento",
        "Porque el estándar institucional se incomoda con drawdowns por encima del 10 o 15 por ciento",
        "Porque el capital ajeno opera siempre con apalancamiento menor",
        "Porque los inversores comparan todo contra la renta fija",
      ],
      correcta: 1,
      leccion: "5-3-3",
    },
    {
      q: "¿Por qué el protocolo de la sala en vivo exige llegar con tu propio análisis pre-mercado hecho?",
      opciones: [
        "Porque sin lectura propia no hay contraste con la del head trader, solo dependencia",
        "Porque la sala no admite participantes sin operaciones abiertas",
        "Porque el head trader califica cada plan individual al inicio",
        "Porque el análisis colectivo se construye votando niveles",
      ],
      correcta: 0,
      leccion: "5-4-0",
    },
    {
      q: "En sala, el head trader plantea un escenario que tu sistema no contempla y se activa durante la sesión. ¿Qué corresponde hacer según el protocolo?",
      opciones: [
        "Operarlo con tamaño reducido para aprender haciendo",
        "Observarlo y documentarlo; validarlo con backtest antes de incorporarlo a tu operativa",
        "Replicarlo exacto: para eso está el head trader",
        "Pedirle al head trader que confirme tu entrada en el chat",
      ],
      correcta: 1,
      leccion: "5-4-0",
    },
    {
      q: "¿Por qué la lección limita el mapa de niveles del playbook diario a entre cinco y ocho, y no veinte?",
      opciones: [
        "Porque las plataformas gráficas se saturan con más líneas",
        "Porque los niveles semanales invalidan a los diarios",
        "Porque el exceso de niveles es la forma elegante de no tener ninguno",
        "Porque los head traders solo revisan los primeros ocho",
      ],
      correcta: 2,
      leccion: "5-4-1",
    },
    {
      q: "En el bloque de estado personal de tu playbook escribes que dormiste mal y estás ansioso por recuperar la pérdida de ayer. ¿Qué indica el protocolo?",
      opciones: [
        "Anotarlo y operar el plan normal: las emociones no cambian el sistema",
        "No operar en absoluto durante una semana completa",
        "Duplicar la preparación y operar solo la apertura",
        "Reducir el plan de riesgo del día a la mitad",
      ],
      correcta: 3,
      leccion: "5-4-1",
    },
    {
      q: "Durante una revisión en vivo, un colega critica tu gestión de una posición. ¿Cuál es el protocolo personal correcto?",
      opciones: [
        "Explicar de inmediato por qué tu decisión fue correcta",
        "Aceptar todo cambio sugerido en la próxima operación",
        "Pedir que la crítica se haga en privado después de la sesión",
        "Escuchar completo sin interrumpir, agradecer, anotar y decidir en frío qué incorporar",
      ],
      correcta: 3,
      leccion: "5-4-2",
    },
    {
      q: "¿Por qué la sala pide que traigas tu peor operación de la semana y no solo las ganadoras?",
      opciones: [
        "Porque una pérdida bien gestionada enseña más al grupo, y compartirla con calma es indicador de madurez profesional",
        "Porque las ganadoras no contienen información de proceso",
        "Porque el head trader necesita detectar a los traders no rentables",
        "Porque las estadísticas de la sala se construyen con las pérdidas",
      ],
      correcta: 0,
      leccion: "5-4-2",
    },
    {
      q: "¿Cómo fabrica presión real un simulacro de evaluación si operar en demo no arriesga dinero?",
      opciones: [
        "Con premios en efectivo para los primeros puestos",
        "Con reglas duras verificadas por un tercero, métricas publicadas al grupo y eliminación pública aunque amable",
        "Con sesiones cronometradas y objetivos diarios obligatorios",
        "Exigiendo operar con el triple del tamaño habitual",
      ],
      correcta: 1,
      leccion: "5-4-3",
    },
    {
      q: "En una cohorte típica de 20 participantes del simulacro, ¿cuál suele ser la regla que más eliminados produce?",
      opciones: [
        "La regla de consistencia entre días",
        "El mínimo de días operados",
        "El límite de pérdida diaria",
        "La prohibición de operar noticias",
      ],
      correcta: 2,
      leccion: "5-4-3",
    },
    {
      q: "Tu indicador de fidelidad de ejecución (operaciones del playbook tomadas sobre señales válidas) cae al 70 por ciento operando una cuenta fondeada. ¿Qué indica el protocolo de la lección?",
      opciones: [
        "Cambiar de sistema: ya no se ajusta a tu perfil",
        "Reducir el tamaño hasta recuperar fidelidad: el problema es la carga, no el sistema",
        "Aumentar el número de operaciones para compensar",
        "Pausar la cuenta un mes completo",
      ],
      correcta: 1,
      leccion: "5-5-0",
    },
    {
      q: "¿Por qué pactar por adelantado el presupuesto de pérdida con la firma o el inversor alivia la carga psicológica de operar capital ajeno?",
      opciones: [
        "Porque transfiere la responsabilidad legal de las pérdidas",
        "Porque permite suavizar los días rojos en el reporte",
        "Porque perder dentro del presupuesto deja de ser un fracaso: es el plan funcionando",
        "Porque garantiza que la firma no retire la cuenta",
      ],
      correcta: 2,
      leccion: "5-5-0",
    },
    {
      q: "Detectas irritabilidad desproporcionada, fatiga que el fin de semana no repara y errores de descuido, sostenidos durante dos semanas. ¿Cómo lo clasifica la lección?",
      opciones: [
        "Una fase normal de adaptación al nivel profesional",
        "Un problema de motivación que se corrige con objetivos nuevos",
        "Una señal de que el sistema dejó de funcionar",
        "Un semáforo rojo con la misma jerarquía que un drawdown del 15 por ciento",
      ],
      correcta: 3,
      leccion: "5-5-1",
    },
    {
      q: "Tras una mala racha, un trader responde sumando horas de pantalla y sesiones extra. Según la lección, ¿cuál es la respuesta correcta a una racha?",
      opciones: [
        "Auditoría de proceso: más horas con menos energía es la receta exacta que termina carreras",
        "Sumar horas pero solo en ventanas de baja volatilidad",
        "Duplicar el tamaño para recuperar más rápido",
        "Cambiar de instrumento hasta que vuelva la confianza",
      ],
      correcta: 0,
      leccion: "5-5-1",
    },
    {
      q: "Un trader con 30 meses positivos entra en un drawdown del 12 por ciento, dentro de lo esperado por su backtest, pero duda del sistema y sobreopera para demostrar que sigue siendo bueno. ¿Qué describe la lección?",
      opciones: [
        "Un drawdown identitario que se retroalimenta y dura más que el técnico",
        "Una respuesta adaptativa correcta ante la incertidumbre",
        "Una señal de que el backtest estaba sobreoptimizado",
        "El momento adecuado para cambiar de estrategia",
      ],
      correcta: 0,
      leccion: "5-5-2",
    },
    {
      q: "Según la separación identidad-desempeño, ¿con qué números debes calificar tu semana como trader?",
      opciones: [
        "Con el PnL neto de la semana, que es el resultado objetivo",
        "Con la comparación contra otros traders de tu nivel",
        "Con el retorno acumulado del año en curso",
        "Con fidelidad al playbook, registros y cumplimiento de riesgo: el PnL califica al sistema, no a ti",
      ],
      correcta: 3,
      leccion: "5-5-2",
    },
    {
      q: "Comparando diez años: un perfil sostiene 20 por ciento anual y otro alterna años de más 80 y menos 60 por ciento. ¿Qué muestra la matemática de la lección?",
      opciones: [
        "Ambos terminan parecido porque los promedios convergen",
        "El segundo gana más porque sus años buenos compensan",
        "El primero multiplica el capital por más de 6; el segundo termina cerca de donde empezó o fuera del juego",
        "El resultado depende solo del año de inicio",
      ],
      correcta: 2,
      leccion: "5-5-3",
    },
    {
      q: "Aplicando el examen de los diez años, ¿cuál de estas decisiones aumenta tu probabilidad de seguir operando bien dentro de una década?",
      opciones: [
        "Duplicar el riesgo tras un buen trimestre",
        "Tomarte la semana de descanso trimestral agendada",
        "Aceptar capital ajeno sin estructura legal para escalar antes",
        "Perseguir cada mercado nuevo que muestre volatilidad",
      ],
      correcta: 1,
      leccion: "5-5-3",
    },
    {
      q: "¿Qué debe contener el paquete de revisión que envías a tu mentor al menos 48 horas antes de la sesión mensual?",
      opciones: [
        "Solo el PnL del mes y capturas de tus mejores entradas",
        "Un resumen emocional del mes y tus objetivos del siguiente",
        "El historial completo de tu cuenta desde el inicio del programa",
        "Métricas del mes, tus tres mejores y tres peores operaciones documentadas, y una pregunta principal",
      ],
      correcta: 3,
      leccion: "5-6-0",
    },
    {
      q: "Un alumno pregunta a su mentor por qué el viernes es su peor día, y el mentor descubre que el 80 por ciento de sus operaciones fuera de playbook llegan tras dos días verdes consecutivos. ¿Qué ilustra el caso?",
      opciones: [
        "Que los viernes deben excluirse de toda operativa",
        "Que el mentor audita patrones que tu propio sesgo te oculta, trabajando sobre datos ordenados",
        "Que las rachas ganadoras deben cortarse cerrando la semana antes",
        "Que la fidelidad al playbook importa menos que el resultado semanal",
      ],
      correcta: 1,
      leccion: "5-6-0",
    },
    {
      q: "Llegas a la auditoría formal con el diario incompleto y sin los playbooks archivados. ¿Qué ocurre según el proceso?",
      opciones: [
        "La auditoría se detiene: sin registros completos no hay nada que evaluar",
        "Se audita solo el bloque de métricas de desempeño",
        "Se aprueba con observación si el retorno es positivo",
        "Se reprograma con una penalización en la calificación",
      ],
      correcta: 0,
      leccion: "5-6-1",
    },
    {
      q: "En la auditoría de operativa, ¿cuál es el bloque de mayor peso y su principio rector?",
      opciones: [
        "Las métricas de desempeño: se exige un retorno mínimo espectacular",
        "La integridad de registros: cada hueco resta puntos proporcionales",
        "El cumplimiento de reglas: una violación de riesgo pesa más que diez operaciones perdedoras",
        "El proceso de mejora: se premia cambiar de sistema con frecuencia",
      ],
      correcta: 2,
      leccion: "5-6-1",
    },
    {
      q: "En la parte teórica del examen final F.O.C.U.S, ¿cómo se pondera una decisión correcta mal fundamentada frente a una prudente bien argumentada?",
      opciones: [
        "Valen igual: lo que importa es acertar el escenario",
        "La correcta vale más porque el mercado premia resultados",
        "Vale menos: se califica el razonamiento, no solo la respuesta",
        "Ambas se anulan y se repite el caso con otro escenario",
      ],
      correcta: 2,
      leccion: "5-6-2",
    },
    {
      q: "¿Por qué la lección afirma que el examen final no puede prepararse memorizando la última semana?",
      opciones: [
        "Porque la preparación real es retroactiva: registros vivos, consistencia y comprensión acumulada durante todo el programa",
        "Porque el temario exacto se publica el mismo día del examen",
        "Porque el panel cambia las preguntas según el contexto del mercado",
        "Porque la parte teórica se rinde sin acceso a apuntes",
      ],
      correcta: 0,
      leccion: "5-6-2",
    },
    {
      q: "Un recién certificado RIC quiere empezar a gestionar el dinero de sus familiares mostrando su sello. ¿Qué le falta según la lección?",
      opciones: [
        "Nada: la certificación acredita su capacidad de gestionar",
        "La habilitación regulatoria de su país: el sello no es una licencia para gestionar capital de terceros",
        "Solo un contrato privado que formalice el acuerdo",
        "Renovar la certificación en la categoría de gestor",
      ],
      correcta: 1,
      leccion: "5-6-3",
    },
    {
      q: "¿Por qué la red de egresados genera oportunidades que rara vez alcanzan a los traders aislados?",
      opciones: [
        "Porque la academia contrata directamente a todos los certificados",
        "Porque la red garantiza entrevistas con fondos internacionales",
        "Porque los egresados comparten señales que mejoran sus métricas",
        "Porque las estructuras nacen de la confianza construida en años de revisiones compartidas: nadie contrata a un desconocido para un desk",
      ],
      correcta: 3,
      leccion: "5-6-3",
    },
  ];




  /* ===== Módulo CNV · temario examen de idoneidad CNV (se agregó en septiembre de 2026) ===== */
  /* ============ Módulo 7 · Visión integral del mercado regulado ============ */

  L["5-7-0"] = {
    resumen: "Un solo esquema que conecta todo lo estudiado: qué regula cada ley, qué hace cada actor, qué riesgo trae cada instrumento y cómo viaja tu dinero desde la orden hasta la custodia.",
    duracionVideo: "12-18 min",
    lectura: `<p>Este módulo no agrega materia nueva: ordena la que ya tienes. Conoces las leyes, los organismos, los agentes y los instrumentos del mercado argentino, pero los fuiste viendo de a uno. Un profesional ve el sistema completo y sabe dónde encaja cada operación que hace.</p>
<h4>Primero las normas: qué regula cada una</h4>
<p>El sistema se apoya en un puñado de leyes; cada una cubre una parcela:</p>
<table>
<tr><th>Norma</th><th>Qué regula</th></tr>
<tr><td>Ley 26.831 (reformada por la Ley 27.440)</td><td>El mercado en su conjunto: competencias de la Comisión Nacional de Valores, oferta pública, valores negociables, transparencia, adquisiciones y sanciones.</td></tr>
<tr><td>Normas CNV (texto ordenado 2013)</td><td>La reglamentación de todo lo anterior, por Títulos: emisoras, oferta pública, régimen informativo, inversión colectiva, mercados, agentes, prevención de lavado y atención al inversor.</td></tr>
<tr><td>Ley 24.083</td><td>Fondos comunes de inversión: patrimonio indiviso, cuotapartes, sociedad gerente y depositaria, reglamento de gestión.</td></tr>
<tr><td>Ley 25.246</td><td>Prevención del lavado: crea la Unidad de Información Financiera y define quiénes son sujetos obligados.</td></tr>
<tr><td>Ley 23.576</td><td>Obligaciones negociables: quién puede emitirlas, ON simples y convertibles, requisitos de emisión.</td></tr>
<tr><td>Ley 19.550</td><td>Sociedades: la sociedad anónima, el directorio, la sindicatura, las asambleas. El esqueleto de cualquier emisora.</td></tr>
<tr><td>Ley 24.467</td><td>La pequeña y mediana empresa, base del régimen PyME.</td></tr>
<tr><td>Código Civil y Comercial</td><td>Fideicomisos (fiduciante, fiduciario, beneficiario, fideicomisario, patrimonio separado) y personas jurídicas públicas.</td></tr>
</table>
<p>Súmales el Decreto 1087/93, origen del régimen de calificación de riesgo, y el Decreto 918/2012, sobre congelamiento de fondos vinculados al terrorismo. Todas son públicas en cnv.gov.ar y argentina.gob.ar.</p>
<h4>Después los actores: quién hace qué</h4>
<ul>
<li><strong>Comisión Nacional de Valores:</strong> organismo autárquico del Estado nacional que autoriza la oferta pública, dicta las Normas, lleva los registros, inspecciona, fiscaliza y sanciona.</li>
<li><strong>Unidad de Información Financiera:</strong> recibe y analiza los reportes de operaciones sospechosas. No regula el mercado: se ocupa del lavado y del financiamiento del terrorismo.</li>
<li><strong>Mercados:</strong> BYMA, A3 Mercados y MAV, autorizados por la CNV. Allí se concierta la operación y se fijan las reglas de negociación.</li>
<li><strong>Cámaras compensadoras:</strong> se interponen como contraparte, piden garantías y aseguran la liquidación aunque una punta falle.</li>
<li><strong>Agentes:</strong> ALyC integral o propio, de negociación, productor, asesor global de inversión, de corretaje, de colocación y distribución, de calificación de riesgo, plataformas de financiamiento colectivo. Unos liquidan, otros solo negocian, otros solo asesoran.</li>
<li><strong>Caja de Valores:</strong> el depositario colectivo. Tus valores quedan escriturados en una subcuenta comitente a tu nombre.</li>
<li><strong>Emisoras:</strong> empresas y Estados que buscan financiamiento y, a cambio, asumen el deber de informar.</li>
<li><strong>Calificadoras de riesgo:</strong> opinan sobre la capacidad de pago. Es una opinión, nunca una recomendación de compra.</li>
<li><strong>Sociedad gerente y depositaria:</strong> el par que sostiene un fondo común. La gerente administra y decide; la depositaria custodia, controla a la gerente y paga los rescates.</li>
<li><strong>Fiduciarios financieros:</strong> administran el patrimonio separado de un fideicomiso y emiten los valores que compran los inversores.</li>
</ul>
<h4>Los instrumentos y el riesgo que trae cada uno</h4>
<ul>
<li><strong>Acciones:</strong> participación en el capital. Riesgo de mercado alto y sin flujo asegurado: el dividendo depende de que haya ganancias y de que la asamblea lo apruebe.</li>
<li><strong>Bonos y obligaciones negociables:</strong> deuda con flujo conocido. Riesgo de crédito, de tasa (si suben las tasas, baja el precio), de reinversión, de liquidez, de moneda y de inflación.</li>
<li><strong>Cuotapartes de fondos:</strong> diversificación y gestión profesional con poco dinero, a cambio de comisiones y de no elegir los activos.</li>
<li><strong>Valores fiduciarios:</strong> los VRD cobran primero; los certificados de participación cobran el remanente y absorben la mora.</li>
<li><strong>Cheques de pago diferido, pagarés y facturas:</strong> financiamiento corto para PyMEs; el riesgo baja con aval de una sociedad de garantía recíproca.</li>
<li><strong>Derivados y cauciones:</strong> apalancamiento, márgenes, ajuste diario y, en el lanzador descubierto de opciones, pérdidas que superan lo invertido; la caución es colocación corta garantizada con valores.</li>
</ul>
<h4>El circuito completo de una inversión</h4>
<ol>
<li><strong>Apertura de cuenta:</strong> el agente te identifica, arma tu perfil de inversor y tu perfil transaccional, y documenta el origen de los fondos.</li>
<li><strong>Orden:</strong> das la instrucción por un canal registrado. El agente debe ejecutarla en las mejores condiciones y dejar constancia.</li>
<li><strong>Concertación:</strong> la operación se cierra en el mercado, con prioridad de precio y tiempo.</li>
<li><strong>Liquidación:</strong> entrega de valores contra pago en el plazo pactado, con la cámara respaldando el cumplimiento.</li>
<li><strong>Custodia:</strong> los valores quedan en tu subcuenta comitente, separados del patrimonio del agente.</li>
<li><strong>Información:</strong> la emisora publica hechos relevantes y estados financieros; el agente te envía movimientos y tenencias.</li>
<li><strong>Reclamo:</strong> si algo sale mal, primero el responsable de relaciones con el público inversor; después, la CNV.</li>
</ol>
<h4>Dónde viste cada bloque</h4>
<p>El marco normativo y la oferta pública, en el Nivel 0. Los valores negociables, los agentes, los bonos y los fondos comunes, en el Nivel 1. La transparencia, el régimen informativo, los reclamos y la liquidación, en el Nivel 2. El análisis fundamental, los ratios, las NIIF y la auditoría, en el Nivel 3. Los derivados, los fideicomisos y las adquisiciones de control, en el Nivel 4.</p>
<h4>Un plan de repaso para consolidar</h4>
<ul>
<li><strong>Bloque normativo:</strong> reconstruye de memoria el cuadro de leyes y el organigrama de actores. Si puedes explicar quién controla a quién, lo tienes.</li>
<li><strong>Bloque productos:</strong> toma cinco instrumentos reales y escribe emisor, moneda, flujo, liquidez y los dos riesgos principales de cada uno.</li>
<li><strong>Bloque números:</strong> rehaz a mano una valuación de bono, un cálculo de ratios sobre un balance publicado y el resultado de una opción al vencimiento.</li>
</ul>
<p><strong>Aplicación práctica:</strong> arma una hoja con cinco cuadros: organismos y quién controla a quién; categorías de agentes; instrumentos y su riesgo dominante; circuito de una operación; y estructuras de inversión colectiva. Tenla a mano cuando analices una oportunidad: la mayoría de los errores caros son de encuadre, no de análisis.</p>
<p><strong>Para recordar:</strong> el sistema gira alrededor de una idea, la protección del inversor, y de un mecanismo, la información. Ante una figura nueva, pregúntate quién la autoriza, qué debe publicar y ante quién reclamas.</p>`,
    claves: [
      "Cada ley cubre una parcela: 26.831, 24.083, 25.246, 23.576, 19.550",
      "CNV autoriza y sanciona; la UIF analiza reportes de lavado",
      "Tus valores viven en tu subcuenta comitente en Caja de Valores",
      "El circuito: cuenta, orden, concertación, liquidación, custodia",
    ],
  };

  L["5-7-1"] = {
    resumen: "Las salidas profesionales que se abren dentro del mercado regulado: qué hace cada rol, qué exige el sistema para ocuparlo y dónde termina operar por cuenta propia y empieza asesorar a terceros.",
    duracionVideo: "12-18 min",
    lectura: `<p>Terminar este programa te deja dos caminos abiertos, y no son excluyentes. Uno es operar tu propio capital con criterio profesional. El otro es trabajar dentro de la industria: los agentes, las sociedades gerentes de fondos y los mercados emplean gente, y buena parte de esos puestos se cubren con personas que entienden de normativa y de instrumentos. Esta lección recorre esos roles y las reglas del juego que los ordenan.</p>
<h4>Los roles más frecuentes</h4>
<ul>
<li><strong>Agente productor.</strong> Capta clientes y los acompaña para un ALyC o un agente de negociación. Explica productos, arma la cuenta, hace seguimiento. No maneja fondos ni valores de terceros: la plata y los títulos van siempre a la cuenta del cliente en el agente. Es la puerta de entrada más común al sector y muchas veces se ejerce de forma independiente, con contrato con el agente.</li>
<li><strong>Asesor comercial en un ALyC, un agente de negociación o un agente asesor global de inversión.</strong> Trabaja una cartera de clientes: entiende el perfil de cada uno, propone estrategias, arma portafolios, explica riesgos. Es el rol que más combina conocimiento técnico con trato humano.</li>
<li><strong>Atención al inversor.</strong> Recibe consultas y reclamos, los registra y los responde en plazo. En cada agente hay un responsable de relaciones con el público inversor, que es el primer escalón antes de la CNV, y un equipo que lo apoya. Parece un puesto menor y no lo es: es donde la firma se juega la reputación todos los días.</li>
<li><strong>Análisis en sociedades gerentes de fondos.</strong> Investigar emisores, seguir curvas de bonos, proponer y ejecutar decisiones de cartera, calcular y controlar el valor de cuotaparte. Ideal para quien disfruta del análisis fundamental y de los números.</li>
<li><strong>Mesa de operaciones.</strong> Ejecuta las órdenes, busca la mejor ejecución, cuida el registro y el timing. Ritmo alto, tolerancia al estrés y precisión absoluta: un error de tipeo en una mesa cuesta dinero real.</li>
<li><strong>Oficial de cumplimiento (prevención de lavado de activos y financiamiento del terrorismo).</strong> Diseña y aplica la política de conocimiento del cliente, monitorea operaciones, evalúa alertas y decide si corresponde reportar una operación sospechosa a la UIF, sin avisarle al cliente. Capacita al personal y es el interlocutor del organismo. Es una función designada formalmente y con responsabilidad personal.</li>
<li><strong>Gestión de riesgos.</strong> Mide exposición, límites, garantías y márgenes; controla que la operatoria de los clientes y de la propia firma no ponga en peligro el patrimonio ni la liquidación.</li>
</ul>
<h4>Qué exige el mercado regulado</h4>
<p>Las firmas que operan en este mercado no son empresas comunes: están registradas ante la Comisión Nacional de Valores, deben sostener un patrimonio neto mínimo, presentar información periódica, tener un código de conducta escrito, designar un responsable de relaciones con el público inversor y un oficial de cumplimiento, y responder por lo que hace su personal. Esa cadena de responsabilidad explica por qué el sector es exigente al contratar.</p>
<p>Hay un punto que conviene tener claro desde el primer día: quien vende, promociona o asesora sobre valores negociables frente al público dentro de un agente debe estar inscripto en el registro que la CNV lleva para ese personal, y esa inscripción exige acreditar conocimientos ante el organismo.</p>
<h4>Operar por cuenta propia no es asesorar a terceros</h4>
<p>Es la distinción más importante de toda la lección. Cuando operas tu propio capital, el único patrimonio en juego es el tuyo y no necesitas habilitación de nadie: eres un inversor. Desde el momento en que recomiendas a otra persona qué comprar, administras su dinero o cobras por orientar sus decisiones, cambias de vereda: estás prestando un servicio dentro de una actividad regulada, y eso se hace desde un agente registrado y con el personal habilitado.</p>
<p>La frontera se cruza más seguido de lo que parece. Mostrar tus operaciones en redes y sumar seguidores que copian lo que haces, cobrar una suscripción por señales, administrar la cuenta de un familiar a cambio de una parte de las ganancias: todo eso se parece mucho más a asesorar que a invertir. Ana puede contar cómo analiza el mercado y enseñar método sin problema. Si Ana empieza a decirle a cada seguidor qué comprar y cuánto, o a recibir dinero para operarlo, ya está haciendo otra cosa.</p>
<h4>Ética: lo que separa una carrera larga de una corta</h4>
<ul>
<li><strong>El interés del cliente va primero.</strong> Si un producto te deja mejor comisión pero no le sirve a la persona que tienes enfrente, la respuesta es no.</li>
<li><strong>Los conflictos de interés se declaran, no se esconden.</strong> Si la firma coloca una emisión propia o cobra por distribuir un fondo, el cliente tiene que saberlo.</li>
<li><strong>Nunca garantices un rendimiento.</strong> Ni "esto no puede bajar", ni "te aseguro el capital". Además de ser falso, está prohibido, y la sanción alcanza a la persona, no solo a la firma.</li>
<li><strong>Adecuación al perfil.</strong> Recomendar un instrumento apalancado a alguien que necesita el dinero en tres meses es una infracción, aunque la operación termine ganando.</li>
<li><strong>Confidencialidad.</strong> Lo que sabes de la cartera de un cliente, o de una operación que todavía no es pública, no sale de tu escritorio.</li>
<li><strong>Publicidad honesta.</strong> Mostrar solo las operaciones ganadoras es engañar, aunque cada captura sea verdadera.</li>
</ul>
<h4>Cómo se construye reputación</h4>
<p>En esta industria el capital más escaso no es el dinero: es la confianza. Se construye lento y con cosas aburridas. Avisar cuando algo salió mal antes de que el cliente lo descubra. Poner por escrito lo que se acordó. Decir "no sé" y averiguar. Explicar el costo total sin que te lo pregunten. Reconocer una pérdida sin buscar culpables. Bruno, que perdió un trimestre malo pero llamó uno por uno a sus clientes para explicarlo, conservó la cartera; el que desapareció dos semanas, no.</p>
<p><strong>Aplicación práctica:</strong> elige dos de los roles de esta lección y busca avisos reales de esos puestos en portales de empleo. Anota qué piden: formación, habilitaciones, herramientas, años de experiencia. Con eso arma un plan de doce meses con lo que te falta. Si tu camino es operar tu propio capital, haz el mismo ejercicio contigo mismo: escribe tu método, tus reglas de riesgo y tu registro de operaciones como si tuvieras que mostrárselo a un comité.</p>
<p><strong>Para recordar:</strong> la línea es simple. Tu dinero, tu decisión, tu riesgo: no necesitas permiso. Dinero de otros o consejos por los que alguien paga: actividad regulada, agente registrado y personal habilitado.</p>`,
    claves: [
      "Productor, asesor, atención al inversor, análisis, mesa, cumplimiento",
      "El agente registrado responde por lo que hace su personal",
      "Operar lo propio no requiere habilitación; asesorar a terceros sí",
      "Prohibido garantizar rendimientos; los conflictos se declaran",
    ],
  };

  L["5-7-2"] = {
    resumen: "Seis casos resueltos que cruzan normativa, instrumentos y análisis, para pasar de saber la teoría a decidir con criterio en situaciones reales del mercado argentino.",
    duracionVideo: "15-20 min",
    lectura: `<p>Saber los temas por separado no alcanza: en la vida real llegan mezclados. Estos seis casos cruzan normas, actores e instrumentos. Lee la situación, responde las preguntas guía y recién después mira la resolución.</p>
<h4>Caso 1 · Ana y sus pesos ociosos</h4>
<p><em>Situación:</em> Ana tiene 3.000.000 de pesos que usará dentro de cuatro meses. Duda entre un fondo money market, una Lecap y un plazo fijo.</p>
<p><em>Preguntas guía:</em> ¿cuál da liquidez inmediata? ¿Cuál puede valer menos si necesita el dinero antes?</p>
<p><em>Resolución:</em> el money market rescata en el día y no tiene riesgo de precio, porque invierte en plazos fijos y cuentas remuneradas; sus honorarios ya están descontados en el valor de cuotaparte. La Lecap rinde lo prometido si la mantiene hasta el vencimiento, pero si vende antes cobra precio de mercado: si las tasas subieron, pierde. El plazo fijo paga tasa fija y no se puede romper. Como su horizonte casi coincide con una Lecap a cuatro meses, esa opción probablemente le rinda más; el money market es para el dinero que puede necesitar cualquier día. La decisión no es de rendimiento: es de calce de plazos.</p>
<h4>Caso 2 · Una PyME que necesita capital de trabajo</h4>
<p><em>Situación:</em> una fábrica de maquinaria agrícola necesita financiarse. Le ofrecen tres caminos: una obligación negociable PyME garantizada, descontar cheques de pago diferido avalados por una sociedad de garantía recíproca, o un fideicomiso financiero con su cartera de créditos.</p>
<p><em>Preguntas guía:</em> ¿qué plazo cubre cada uno? ¿Cuál es el más caro de montar?</p>
<p><em>Resolución:</em> los cheques avalados son la vía más rápida y barata para el corto plazo: la SGR avala, el riesgo que ve el inversor es el de la SGR y no el de la fábrica, y se negocian en el MAV. La ON PyME garantizada sirve para plazos más largos: exige prospecto, autorización de la CNV bajo el régimen simplificado y una entidad garante; cuesta más estructurarla, pero es más estable. El fideicomiso financiero solo se justifica con una cartera grande y homogénea para securitizar: se transmite al fiduciario, queda en un patrimonio separado y se emiten VRD y certificados de participación, con calificación de riesgo. Es el más caro y lento; su ventaja es aislar el riesgo del originante. Para esta fábrica: cheques avalados ahora, ON PyME si el plan es a tres años.</p>
<h4>Caso 3 · El hecho relevante y las salvedades</h4>
<p><em>Situación:</em> Bruno va a comprar acciones de una empresa que cotiza. Antes de operar encuentra en la Autopista de la Información Financiera un hecho relevante: perdió un juicio importante. Y en los estados anuales el auditor emitió opinión con salvedades por la valuación de un activo.</p>
<p><em>Preguntas guía:</em> ¿qué obligación cumplió la empresa? ¿Qué significa una opinión con salvedades? ¿Cómo afecta a los ratios?</p>
<p><em>Resolución:</em> la empresa cumplió el régimen informativo: todo hecho apto para afectar sustancialmente la cotización debe informarse en forma inmediata, veraz, suficiente y oportuna, y queda publicado para todos a la vez. Eso evita que unos pocos operen con ventaja. La opinión con salvedades no es adversa: el auditor dice que los estados presentan razonablemente la situación excepto por un punto concreto. Bruno debe leer cuál es: si el activo estaba sobrevaluado, el patrimonio neto real es menor y el ROE y el P/BV que calculó están mejorados artificialmente. Lo razonable es recalcular los ratios ajustando ese activo, estimar el impacto del juicio y recién ahí fijar el precio que le interesa.</p>
<h4>Caso 4 · El importador que cubre el tipo de cambio</h4>
<p><em>Situación:</em> Carla importa insumos y en noventa días debe pagar 200.000 dólares. Le preocupa que el tipo de cambio suba: evalúa comprar dólar futuro o una opción call sobre el dólar.</p>
<p><em>Preguntas guía:</em> ¿qué pasa en cada caso si el dólar baja? ¿Qué desembolsos hay en el medio?</p>
<p><em>Resolución:</em> con el futuro, Carla fija hoy el precio. El mercado le exige un margen inicial y le ajusta diferencias todos los días; la cámara compensadora es la contraparte, así que no depende de que otro cumpla. Si el dólar sube, gana en el futuro lo que pierde en la importación; si baja, pierde en el futuro lo que ahorra: queda cubierta, pero renunció a la baja. Con el call paga una prima y compra el derecho, no la obligación: si el dólar sube está protegida y si baja deja vencer la opción y pierde solo la prima. El futuro es más barato pero simétrico; la opción es un seguro de costo conocido. Lo que no debe hacer es tomar ninguno por más que su exposición real: ahí deja de cubrirse y especula.</p>
<h4>Caso 5 · La oportunidad por redes y el reclamo que no avanza</h4>
<p><em>Situación:</em> a Ana le llega por redes un perfil que promete 8 % mensual en dólares administrando su dinero y pide transferir a una cuenta personal. En paralelo, Bruno pidió el rescate de un fondo hace cinco días y el agente no le acredita el dinero ni le responde.</p>
<p><em>Preguntas guía:</em> ¿cómo se verifica al que ofrece? ¿A quién se recurre en cada caso?</p>
<p><em>Resolución:</em> lo de Ana tiene tres señales juntas: rendimiento garantizado (prohibido), captación de fondos del público sin autorización (oferta pública irregular) y transferencia a una cuenta personal en lugar de una cuenta comitente a su nombre. Corresponde verificar en los registros públicos de cnv.gov.ar si está registrada; si no lo está, no se opera y se denuncia ante la CNV, que puede abrir un sumario. Además, pedir dinero fuera del circuito bancario y sin justificar origen es una alerta clásica de lavado. Lo de Bruno es distinto: hay un agente registrado y un servicio que falló, así que corresponde un reclamo por escrito ante el responsable de relaciones con el público inversor, que debe registrarlo y responderlo en plazo; sin respuesta, recién ahí lleva el reclamo a la CNV. Denuncia y reclamo no son lo mismo: una señala una posible infracción, el otro pide solución a un servicio.</p>
<h4>Caso 6 · Cambio de control y el pequeño accionista</h4>
<p><em>Situación:</em> un grupo compra el paquete de control de una empresa que cotiza y Carla tiene 500 acciones.</p>
<p><em>Preguntas guía:</em> ¿qué obligación tiene el comprador? ¿Qué opciones tiene ella?</p>
<p><em>Resolución:</em> quien adquiere el control de una sociedad con oferta pública debe lanzar una oferta pública de adquisición a los demás accionistas, a un precio equitativo. La lógica es el trato igualitario: el minoritario no queda atrapado en una empresa que cambió de dueño. Carla puede vender en la OPA, quedarse apostando al nuevo plan o vender en el mercado si el precio ahí es mejor. Si el controlante llega a una participación casi total, rige el régimen de participación residual; y si la empresa sale del régimen de oferta pública, también debe ofrecer comprarles a los minoritarios. Antes de decidir conviene leer el prospecto de la OPA.</p>
<p><strong>Aplicación práctica:</strong> toma un caso real de estos días (una emisión, una OPA, un hecho relevante) y escribe media carilla con esta misma estructura: situación, preguntas guía y resolución. Repetirlo una vez por semana durante un trimestre te da un criterio que ninguna definición da.</p>
<p><strong>Para recordar:</strong> ante cualquier propuesta, tres preguntas ordenan casi todo: ¿quién está del otro lado y está registrado?, ¿qué información pública puedo verificar?, ¿cuánto pierdo si me equivoco?</p>`,
    claves: [
      "Elige el instrumento por el calce de plazo, no por la tasa",
      "Salvedades del auditor: ajusta los ratios antes de valuar",
      "Cubrirse es igualar la exposición real, no operar de más",
      "Reclamo al RRPI del agente; denuncia a la CNV por infracción",
    ],
  };

  EX[5].push(
    {
      q: "Ana revisa su cartera y quiere ubicar cada pieza del sistema. ¿Cuál de estas afirmaciones describe correctamente el reparto de funciones?",
      opciones: [
        "La Unidad de Información Financiera autoriza la oferta pública y la CNV recibe los reportes de operaciones sospechosas",
        "La Caja de Valores concierta las operaciones y el mercado custodia los valores de los clientes",
        "La CNV autoriza la oferta pública, dicta las Normas y sanciona; la UIF recibe y analiza los reportes de operaciones sospechosas",
        "Las cámaras compensadoras dictan las Normas aplicables a los agentes y llevan los registros públicos",
      ],
      correcta: 2,
      leccion: "5-7-0",
    },
    {
      q: "Bruno opera su propia cuenta desde hace años y varios conocidos le proponen darle dinero para que lo administre a cambio de una parte de las ganancias. ¿Cómo se encuadra esa situación?",
      opciones: [
        "Administrar dinero de terceros es una actividad regulada: debe hacerse desde un agente registrado y con personal habilitado, a diferencia de operar capital propio",
        "Puede hacerlo libremente mientras no supere diez clientes y no cobre una comisión fija",
        "Puede hacerlo si les entrega un contrato escrito donde los clientes renuncian a reclamar",
        "No hay diferencia entre operar capital propio y administrar el de otros: en ambos casos alcanza con ser inversor",
      ],
      correcta: 0,
      leccion: "5-7-1",
    },
    {
      q: "Carla necesita el dinero dentro de cuatro meses y compara un fondo money market con una Lecap que vence en ese mismo plazo. ¿Cuál es la diferencia central que debe pesar?",
      opciones: [
        "El fondo money market garantiza un rendimiento mínimo y la Lecap no ofrece ninguna garantía",
        "El money market da liquidez inmediata sin riesgo de precio, mientras que la Lecap asegura su rendimiento solo si la mantiene hasta el vencimiento",
        "La Lecap puede rescatarse en el día al valor de suscripción y el fondo exige un preaviso de treinta días",
        "Ninguno de los dos tiene costos, así que la decisión depende solo de la tasa publicada",
      ],
      correcta: 1,
      leccion: "5-7-2",
    },
    {
      q: "A Ana le ofrecen por redes sociales un rendimiento asegurado del 8 % mensual y le piden transferir a una cuenta bancaria personal. ¿Cuál es la lectura correcta y el paso adecuado?",
      opciones: [
        "Es una operación válida si la persona muestra comprobantes de rendimientos anteriores",
        "Conviene invertir un monto pequeño como prueba antes de decidir por el total",
        "Corresponde presentar un reclamo ante el responsable de relaciones con el público inversor de esa persona",
        "Hay señales de captación irregular de fondos y de rendimiento garantizado: verificar el registro en cnv.gov.ar, no operar y denunciar ante la CNV",
      ],
      correcta: 3,
      leccion: "5-7-2",
    },
  );

  /* ===== Módulo cuantitativo e institucional (Nivel 5, ids 5-8-x; septiembre de 2026) ===== */
  L["5-8-0"] = {
    resumen:
      "El libro de órdenes muestra intenciones, no hechos. Aprende a leer CVD, detectar icebergs y reconocer spoofing para no operar contra un tamaño que nunca existió.",
    duracionVideo: "15–20 min",
    lectura: `<p>Todo lo que viste hasta ahora en el gráfico es el resultado. La <strong>microestructura de mercado</strong> estudia el mecanismo que produce ese resultado: cómo se emparejan las órdenes, quién paga por ejecutar y cómo algunos participantes esconden o fingen intención. No es teoría académica: es lo que explica por qué tu stop se llenó tres puntos peor de lo que esperabas.</p>
<h4>El libro de órdenes límite</h4>
<p>El <strong>libro de órdenes</strong> (order book, o DOM cuando lo ves en la plataforma) es la lista de órdenes límite pendientes. Del lado del <em>bid</em> están quienes ofrecen comprar a un precio y esperan; del lado del <em>ask</em>, quienes ofrecen vender. La diferencia entre el mejor bid y el mejor ask es el spread, y la cantidad de contratos o lotes apilados en cada nivel es la <strong>profundidad</strong>.</p>
<p>Las bolsas reguladas emparejan con <strong>prioridad precio-tiempo</strong>: primero manda el mejor precio, y entre órdenes del mismo precio, la que llegó antes. Eso crea una <em>cola</em>. Si colocas una orden límite de compra en 5.640 y delante tuyo hay 800 contratos, necesitas que se ejecuten esos 800 antes de que te toque a ti. Esa posición en la cola es la diferencia entre entrar y quedarte mirando.</p>
<h4>Pasivo contra agresivo: quién paga el spread</h4>
<p>Hay dos formas de operar. La <strong>pasiva</strong> consiste en dejar una orden límite y esperar que alguien venga a ti: obtienes mejor precio pero no tienes garantía de ejecución. La <strong>agresiva</strong> consiste en cruzar el spread con una orden a mercado: ejecución segura, precio peor. Regla mental simple: el agresivo paga el spread, el pasivo lo cobra. Los creadores de mercado viven de ese cobro repetido miles de veces al día.</p>
<h4>Delta y CVD</h4>
<p>Ya conoces el <strong>delta</strong>: volumen ejecutado contra el ask (compra agresiva) menos volumen ejecutado contra el bid (venta agresiva), vela a vela. El <strong>CVD</strong> (Cumulative Volume Delta, delta de volumen acumulado) es simplemente la suma corrida de ese delta a lo largo de la sesión: <code>CVD(t) = CVD(t-1) + delta(t)</code>. Dibujado como línea, te muestra si la agresión neta del día viene de compradores o de vendedores.</p>
<p>Su valor está en las <strong>divergencias</strong>. Ejemplo numérico sobre el ES: entre las 10:00 y las 10:40 el precio sube de 5.630 a 5.642 y el CVD, que arrancó en +4.000, termina en -1.500. Traducción: durante esa subida se ejecutaron 5.500 contratos netos de venta agresiva y aun así el precio subió. Alguien absorbió con órdenes límite compradoras y empujó el precio sin agredir. El caso inverso es el más famoso: el precio hace un máximo nuevo mientras el CVD no lo hace. Los compradores a mercado se están agotando y el que vendía en pasivo no se movió. Es una señal de <strong>absorción</strong>, no de fuerza.</p>
<p>Cuidado con un detalle: en CFD y en cripto el CVD depende de la fuente de datos de tu bróker o de tu exchange. Dos plataformas pueden mostrarte líneas distintas del mismo activo. Úsalo como lectura de comportamiento dentro de una misma fuente, nunca como un dato absoluto.</p>
<h4>Órdenes iceberg</h4>
<p>Una <strong>orden iceberg</strong> muestra en el libro solo una porción pequeña de su tamaño real y se recarga automáticamente al mismo precio cada vez que la porción visible se consume. Un fondo que quiere vender 2.000 contratos en 5.650 no publica 2.000: publica 50, y cuando se los comen, aparecen otros 50, y otros, y otros.</p>
<p>Se detectan por contraste entre lo mostrado y lo ejecutado. Si el DOM muestra 50 contratos en 5.650 y el footprint registra 1.800 contratos ejecutados en ese nivel sin que el precio lo atraviese, no había 50: había un iceberg. Los institucionales las usan para no revelar el tamaño de su posición y evitar que otros se adelanten al movimiento.</p>
<h4>Spoofing y layering</h4>
<p>El <strong>spoofing</strong> consiste en colocar una orden grande sin intención de ejecutarla, para dar la impresión de oferta o demanda, y cancelarla antes de que el precio la alcance. El <strong>layering</strong> es la misma idea repartida en varias capas de precios consecutivos, lo que hace la ilusión más creíble. Ambas son manipulación y ambas son ilegales en Estados Unidos: la ley Dodd-Frank de 2010 las tipificó de forma expresa.</p>
<p>El caso emblemático es el de <strong>Navinder Sarao</strong>, un operador que desde su casa en Londres colocaba y cancelaba órdenes masivas en futuros del E-mini S&amp;P 500. Se lo vinculó con el <em>flash crash</em> del 6 de mayo de 2010, cuando el Dow Jones cayó cerca de 1.000 puntos en minutos y recuperó casi todo enseguida. Sarao fue arrestado en 2015 y se declaró culpable en 2016.</p>
<p>Visualmente el spoofing se ve así: aparece un muro de tamaño desproporcionado a tres o cuatro ticks del precio, el precio se acerca, y el muro desaparece antes de que llegue un solo contrato a tocarlo. En mercados con vigilancia débil, sobre todo en varios exchanges de cripto, la práctica es mucho más frecuente porque el costo de cancelar es cero y la supervisión es desigual.</p>
<h4>La regla que ordena todo</h4>
<p>El libro se lee por lo que se <strong>ejecuta</strong>, no por lo que se <strong>muestra</strong>. Una orden visible es una intención que puede cancelarse en un milisegundo; un contrato ejecutado es un hecho que ya no se deshace. Por eso el footprint y el volumen por precio son más confiables que la foto del DOM.</p>
<p><strong>Aplicación práctica:</strong> si operas CFD en Exness o BlackBull no tienes libro centralizado real, así que no intentes leer profundidad: quédate con el comportamiento del precio en tus niveles y, si tu plataforma lo ofrece, con el delta. Si operas futuros o cripto con datos de profundidad, define tres controles: primero, nunca tomes una decisión por un muro visible; segundo, confirma con volumen ejecutado en el nivel; tercero, marca los precios donde detectes recargas repetidas (posible iceberg) porque suelen ser zonas defendidas por alguien con tamaño. Registra en tu diario cada vez que un muro desapareció al acercarse el precio: en un mes vas a saber si tu mercado está vigilado o no.</p>
<p><strong>Para recordar:</strong> el DOM muestra intenciones cancelables y el footprint muestra hechos consumados. El CVD sirve cuando contradice al precio, el iceberg se delata cuando lo ejecutado supera con creces lo mostrado, y el spoofing es un muro que se evapora justo antes de ser tocado.</p>`,
    claves: [
      "El libro se lee por lo ejecutado, no por lo mostrado",
      "CVD: delta acumulado; su valor está en las divergencias",
      "Iceberg: volumen ejecutado muy superior al tamaño visible",
      "Spoofing y layering son ilegales y frecuentes sin vigilancia",
    ],
  };

  L["5-8-1"] = {
    resumen:
      "Los dealers de opciones cubren delta y ese flujo mueve el precio. Gamma, vanna y volga explican squeezes, imanes de strike y la forma de la superficie de volatilidad.",
    duracionVideo: "15–20 min",
    lectura: `<p>En el módulo de opciones viste las griegas de primer orden: <strong>delta</strong> (cuánto cambia la prima si el subyacente se mueve un punto), <strong>gamma</strong> (cuánto cambia el delta ante ese mismo movimiento), <strong>vega</strong> (sensibilidad a la volatilidad implícita) y <strong>theta</strong> (pérdida de valor por el paso del tiempo). Ahora vas a ver qué pasa cuando miles de contratos de esas opciones obligan a alguien a comprar o vender el activo subyacente.</p>
<h4>Por qué los dealers deben cubrirse</h4>
<p>Los creadores de mercado de opciones no apuestan a la dirección: ganan por el spread y buscan quedar neutrales en delta. Si te venden 100 calls con delta 0,40, quedan cortos de 4.000 acciones equivalentes y compran 4.000 acciones para neutralizarse. El problema es que el delta cambia solo, y ese cambio es la gamma.</p>
<p>Cuando el dealer está <strong>corto de gamma</strong> (típicamente porque vendió opciones), su cobertura es procíclica: si el precio sube, el delta de los calls vendidos crece y debe comprar más subyacente; si baja, debe vender. Compra arriba y vende abajo, amplificando el movimiento. Cuando está <strong>largo de gamma</strong> ocurre lo contrario: vende en las subidas y compra en las caídas, lo que amortigua el rango y produce esos días en que el índice parece pegado a un precio, generalmente un strike con mucho interés abierto.</p>
<h4>Gamma squeeze: GameStop, enero de 2021</h4>
<p>El caso más citado ocurrió con las acciones de GameStop en enero de 2021. La secuencia, paso a paso:</p>
<ol>
<li>Una masa de inversores minoristas compró calls fuera del dinero de vencimiento semanal, baratos y de gamma alta.</li>
<li>Los dealers que vendieron esos calls quedaron cortos de gamma y compraron acciones para cubrirse.</li>
<li>Esa compra empujó el precio hacia arriba.</li>
<li>Al subir el precio, el delta de esos calls aumentó, así que los dealers tuvieron que comprar aún más acciones.</li>
<li>El bucle se realimentó y el precio pasó de menos de 20 dólares a máximos por encima de 400 en pocas sesiones.</li>
</ol>
<p>Conviene no confundirlo con el <strong>short squeeze</strong>, que también estuvo presente. El short squeeze lo provocan los vendedores en corto del activo que recompran para cerrar por pérdidas o llamadas de margen. El gamma squeeze lo provoca la cobertura mecánica de los dealers de opciones. Uno nace de posiciones en acciones, el otro de posiciones en derivados, y en GameStop se alimentaron mutuamente.</p>
<h4>Vanna: el delta que se mueve con la volatilidad</h4>
<p>La <strong>vanna</strong> es una griega de segundo orden: mide cuánto cambia el delta cuando cambia la volatilidad implícita, <code>dDelta/dVol</code>. Importa porque la volatilidad no está quieta. Piensa en un put fuera del dinero comprado como cobertura: con volatilidad implícita alta su delta es relativamente grande, y el dealer que lo vendió tiene cubierta esa exposición con una venta de subyacente. Si el mercado se calma y la volatilidad implícita cae, el delta de ese put se encoge, el dealer queda sobrecubierto y debe <strong>recomprar</strong> subyacente. Ese flujo de recompra, que no responde a ninguna noticia, es el que suele sostener índices durante las semanas posteriores a un susto, cuando el índice de volatilidad baja día tras día.</p>
<h4>Volga y charm</h4>
<p>La <strong>volga</strong> o vomma mide cuánto cambia el vega ante un cambio de volatilidad, <code>dVega/dVol</code>: es la convexidad de la posición respecto de la volatilidad. Una opción con volga alta gana vega cuando la volatilidad sube, por eso las alas de la superficie se revalorizan de forma no lineal en los pánicos. El <strong>charm</strong>, por su parte, mide cómo cambia el delta con el simple paso del tiempo: es la razón de que las coberturas se reajusten en bloque cerca de los vencimientos, sin que el precio se haya movido.</p>
<h4>La superficie de volatilidad: smile y skew</h4>
<p>Si graficas la volatilidad implícita de todas las opciones de un activo contra el strike y contra el vencimiento obtienes la <strong>superficie de volatilidad</strong>. Su forma no es plana, y eso solo ya refuta el supuesto original de Black-Scholes de volatilidad constante.</p>
<ul>
<li><strong>Smile:</strong> las opciones alejadas del dinero, tanto puts como calls, cotizan con más volatilidad implícita que las que están en el dinero. La curva dibuja una sonrisa. Es lo típico en divisas y en cripto, donde el riesgo se percibe simétrico: puede haber un salto violento hacia cualquier lado.</li>
<li><strong>Skew:</strong> en acciones e índices la curva está inclinada: los puts fuera del dinero cuestan bastante más volatilidad implícita que los calls equivalentes. Este patrón se instaló tras el crash de octubre de 1987 y refleja que el mercado accionario cae más rápido de lo que sube y que hay demanda estructural de cobertura.</li>
<li><strong>Estructura temporal:</strong> en calma, la volatilidad implícita sube con el plazo; ante un evento cercano, los vencimientos cortos se disparan e invierten la curva.</li>
</ul>
<p>Un skew que se empina de golpe indica que alguien está pagando caro por protegerse aunque el precio todavía no haya caído. Es un termómetro del miedo, más honesto que muchos titulares.</p>
<p><strong>Aplicación práctica:</strong> como minorista no vas a modelar la superficie, pero sí puedes hacer tres cosas concretas. Primero, mira el calendario de vencimientos: en las jornadas grandes de vencimiento el precio tiende a quedar atrapado cerca de strikes con mucho interés abierto y las rupturas suelen fallar; baja tu expectativa de tendencia esos días. Segundo, nunca vendas opciones descubiertas: estar corto de gamma con la cuenta de un minorista es exactamente lo que destruyó a quienes vendieron calls de GameStop. Tercero, si operas el índice por CFD, usa la lectura de skew y de volatilidad implícita como contexto de régimen: skew empinado y volatilidad subiendo es entorno de defensa, no de perseguir rupturas alcistas.</p>
<p><strong>Para recordar:</strong> la cobertura de los dealers es flujo mecánico, no opinión. Corto de gamma amplifica el movimiento, largo de gamma lo comprime; vanna explica la recompra cuando la volatilidad cae, y el skew mide el precio del miedo. Es una pieza del rompecabezas, no una bola de cristal.</p>`,
    claves: [
      "Dealer corto de gamma amplifica; largo de gamma comprime el rango",
      "Gamma squeeze: cobertura de calls OTM, distinto del short squeeze",
      "Vanna liga delta y volatilidad: al caer la IV, los dealers recompran",
      "Skew en acciones, smile en FX y cripto: el precio del miedo",
    ],
  };

  L["5-8-2"] = {
    resumen:
      "Dos activos cointegrados comparten una deriva común y su spread vuelve a la media. Esa es la base honesta del pairs trading y del arbitraje estadístico.",
    duracionVideo: "15–20 min",
    lectura: `<p>Hasta ahora casi todo tu trabajo fue direccional: comprar porque esperas que suba. El <strong>arbitraje estadístico</strong> propone otra cosa: no apostar a la dirección del mercado, sino a que una relación entre dos activos que se desvió va a volver a su lugar. Para hacerlo bien necesitas entender una distinción que confunde a mucha gente: correlación no es cointegración.</p>
<h4>Series estacionarias y no estacionarias</h4>
<p>Una serie es <strong>estacionaria</strong> cuando su media y su varianza no cambian con el tiempo: se aleja y vuelve, y tiene un nivel al cual regresar. El precio de un activo <em>no</em> es estacionario: no existe un precio de referencia al que el bitcoin o las acciones de una empresa deban volver, y por eso operar un precio "porque está caro" en términos absolutos es un error caro. Los retornos, en cambio, suelen comportarse de manera mucho más estacionaria.</p>
<h4>Correlación contra cointegración</h4>
<p>La <strong>correlación</strong> mide si dos activos se mueven juntos día a día, normalmente calculada sobre retornos. Dos series pueden estar correlacionadas y separarse sin límite: si una sube 1 % diario y la otra 0,5 % diario, la correlación es casi perfecta y la distancia entre ellas crece para siempre. También existe la correlación espuria: dos series con tendencia propia parecen relacionadas sin tener ningún vínculo económico.</p>
<p>La <strong>cointegración</strong> es más exigente y más útil. Dos series no estacionarias están cointegradas si existe una combinación lineal de ambas que sí es estacionaria. En palabras: cada una vaga por su cuenta, pero comparten una deriva común y la distancia entre ellas vuelve a un nivel. La imagen clásica es la del hombre borracho paseando a su perro: ambos recorridos son impredecibles, pero la correa impone que nunca se alejen demasiado. Esa correa es la cointegración.</p>
<h4>Cómo se comprueba: Engle-Granger en dos pasos</h4>
<p>El método más usado y más fácil de explicar es el de Engle y Granger:</p>
<ol>
<li><strong>Regresión.</strong> Se estima una regresión del precio del activo A contra el precio del activo B. El coeficiente que sale, llamado <strong>hedge ratio</strong> o beta, indica cuántas unidades de B equivalen a una de A.</li>
<li><strong>Prueba del residuo.</strong> Se calcula el residuo, es decir el <strong>spread</strong>: <code>spread = A - beta * B</code>. Sobre ese spread se aplica un test de raíz unitaria (el test ADF, de Dickey-Fuller aumentado). Si el test rechaza la raíz unitaria, el residuo es estacionario y el par está cointegrado.</li>
</ol>
<p>La lectura práctica: si el valor p del test es bajo (por convención menor a 0,05), tienes evidencia de cointegración en el período estudiado. Nunca en el futuro: eso es una hipótesis, no una garantía.</p>
<h4>Z-score y half-life</h4>
<p>Una vez que tienes el spread, lo normalizas con el <strong>z-score</strong>: <code>z = (spread - media) / desvio</code>, ambos calculados sobre una ventana móvil. El z-score te dice cuántos desvíos estándar está estirada la relación en este momento.</p>
<p>Falta saber cuánto tarda en volver. Eso lo aproxima la <strong>half-life</strong> o vida media de reversión, tomada del modelo de Ornstein-Uhlenbeck, que describe una variable empujada hacia su media con una fuerza proporcional a la distancia. La half-life responde: si el spread está desviado, cuántos días tarda en recorrer la mitad del camino de regreso. Si te da 4 días, un par de swing tiene sentido. Si te da 60, el capital queda inmovilizado demasiado tiempo y los costos se comen el resultado.</p>
<h4>Reglas de un pairs trade y ejemplo numérico</h4>
<p>Supongamos dos activos ficticios del mismo sector, ALFA y BETA, con beta estimada de 1,5 y spread de media 0 y desvío 2,0 dólares.</p>
<ul>
<li><strong>Entrada:</strong> el spread llega a +4,0, o sea z = +2. ALFA está cara respecto de BETA: vendes ALFA y compras 1,5 unidades de BETA por cada unidad de ALFA.</li>
<li><strong>Salida:</strong> cuando el z-score vuelve a 0, cierras las dos patas. Si la media se restablece, ganas la convergencia sin importar si el sector entero subió o bajó.</li>
<li><strong>Stop:</strong> si el z-score llega a ±3 o si el test de cointegración deja de ser significativo al recalcularlo, cierras. No promedias contra un spread roto.</li>
</ul>
<p>Esto es lo que se llama <strong>neutralidad al mercado</strong>: las dos patas se compensan y tu resultado depende de la relación, no del índice.</p>
<h4>Riesgos reales</h4>
<p>La relación puede romperse de verdad, por una fusión, un cambio regulatorio, un fraude o un cambio de modelo de negocio. Y cuando se rompe, el z-score alto deja de ser oportunidad y pasa a ser información. El caso extremo es <strong>Long-Term Capital Management</strong>, el fondo que en 1998, tras la crisis rusa, vio sus spreads convergentes divergir mientras operaba con un apalancamiento enorme; la Reserva Federal coordinó un rescate privado para evitar un contagio sistémico. Tenían dos premios Nobel y aun así el modelo no contemplaba que todos corrieran hacia la puerta al mismo tiempo. Súmale tres costos que muchos ignoran: pagas spread y comisión en dos patas, no en una; el corto tiene costo de financiamiento o de préstamo; y en CFD arrastras swap en ambas posiciones si las sostienes días.</p>
<p><strong>Aplicación práctica:</strong> empieza por pares con vínculo económico real, no por pares que el algoritmo encontró bonitos: dos CFD de acciones del mismo sector, dos criptomonedas del mismo ecosistema, o un activo contra su índice. Con Python, en la línea del módulo de trading algorítmico, descarga dos o tres años de cierres, corre la prueba de cointegración de statsmodels, estima la beta, calcula la half-life y solo entonces piensa en operar. Aplica el mismo riesgo por operación que usas en direccional, contando la posición como una sola: el par completo es un trade, no dos. Y recalcula la cointegración cada mes, porque las relaciones envejecen.</p>
<p><strong>Para recordar:</strong> la correlación describe el paso; la cointegración describe la correa. Sin correa no hay reversión, solo dos activos que se alejan. Entra por z-score, sal en la media, corta si la relación se rompe, y nunca olvides que LTCM tenía razón en el modelo y perdió igual.</p>`,
    claves: [
      "Precio no estacionario: correlación no implica cointegración",
      "Engle-Granger: regresión, residuo y test ADF sobre el spread",
      "Z-score para entrar y salir; half-life para saber si conviene",
      "El riesgo real es que la relación se rompa, como en LTCM 1998",
    ],
  };

  EX[5].push(
    {
      q: "Operas futuros con datos de profundidad. En 5.612 aparece de golpe una oferta de venta de 900 contratos, cuatro ticks por encima del precio. Mientras el precio se acerca, la oferta se cancela y reaparece más arriba, y el footprint no registra volumen ejecutado en ese nivel. ¿Qué lectura es la correcta?",
      opciones: [
        "Es una orden iceberg: muestra poco tamaño y se recarga al mismo precio",
        "Es un patrón de spoofing: tamaño visible que se retira antes de ser tocado, sin ejecución que lo respalde",
        "Es absorción institucional confirmada, conviene vender junto a ese participante",
        "Es una divergencia de CVD y anticipa continuación alcista",
      ],
      correcta: 1,
      leccion: "5-8-0",
    },
    {
      q: "Un índice pasó dos semanas sin noticias relevantes, con el indicador de volatilidad implícita cayendo día tras día, y aun así sube de forma sostenida y con poco rango diario. ¿Qué explicación vinculada a las griegas de segundo orden es la más consistente?",
      opciones: [
        "Un gamma squeeze en marcha, porque los dealers están cortos de gamma",
        "Volga negativa que obliga a los dealers a vender vega en el mercado de contado",
        "Flujos de vanna: al caer la volatilidad implícita se reduce el delta de los puts vendidos y los dealers recompran subyacente",
        "Charm positivo que empuja la volatilidad implícita al alza antes del vencimiento",
      ],
      correcta: 2,
      leccion: "5-8-1",
    },
    {
      q: "Encuentras dos acciones del mismo sector con correlación de 0,93 sobre los retornos diarios de los últimos dos años, pero al calcular el spread y aplicar el test ADF obtienes un valor p de 0,41. ¿Qué corresponde hacer?",
      opciones: [
        "No operar el par: hay co-movimiento, pero sin evidencia de cointegración el spread no tiene un nivel al que volver",
        "Operar igual, porque una correlación de 0,93 garantiza la reversión del spread",
        "Operar con el doble de tamaño, ya que el valor p alto indica un spread muy estirado",
        "Reemplazar el z-score por la correlación como señal de entrada y salida",
      ],
      correcta: 0,
      leccion: "5-8-2",
    },
  );
  L["5-8-3"] = {
    resumen: "VaR y CVaR miden cuánto puedes perder en un mal día; MAE y MFE miden cuánto sufre y cuánto rinde cada operación antes de cerrarse.",
    duracionVideo: "15–20 min",
    lectura: `<p>Hasta ahora mediste el riesgo con dos herramientas: el porcentaje que arriesgas por operación y el drawdown que soportó tu curva de capital. Son buenas, pero miran hacia atrás y hacia el conjunto. La capa cuantitativa agrega dos preguntas distintas: <em>¿cuánto puedo perder mañana en un día malo?</em> (VaR y CVaR, riesgo de cartera) y <em>¿cuánto sufre cada operación antes de darme la razón?</em> (MAE y MFE, riesgo de operación). Las cuatro métricas son estándar en mesas institucionales y las cuatro se pueden calcular con una planilla y tu historial.</p>
<h4>VaR: Value at Risk</h4>
<p>El VaR (valor en riesgo) responde a una frase con tres partes: <strong>horizonte</strong>, <strong>nivel de confianza</strong> y <strong>monto</strong>. Un VaR diario al 95 % de 197 USD se lee así: "con 95 % de confianza, en un día no perderé más de 197 USD". El complemento importa igual: uno de cada veinte días, en promedio, perderás más que eso.</p>
<p>Trabajemos con una cuenta de 10.000 USD cuya rentabilidad diaria tiene una desviación típica del 1,2 % y media cero. Hay tres formas de calcularlo:</p>
<ol>
<li><strong>Histórico:</strong> ordenas los últimos 500 días de resultados de peor a mejor y tomas el que deja por debajo al 5 % peor, es decir el día número 25. Si ese día fue −2,1 %, tu VaR al 95 % es de 210 USD. No supone ninguna forma de distribución: usa lo que realmente pasó.</li>
<li><strong>Paramétrico o de varianza-covarianza:</strong> supones distribución normal y multiplicas la desviación típica por el factor del nivel de confianza (1,645 para 95 %; 2,326 para 99 %). Aquí: <code>1,645 x 1,2 % = 1,97 %</code>, o sea 197 USD sobre 10.000. Es el más rápido y el más frágil.</li>
<li><strong>Monte Carlo:</strong> simulas miles de trayectorias con los parámetros de tu cartera y lees el percentil 5. Es el más flexible: acepta opciones, no linealidades y colas gruesas.</li>
</ol>
<p>El VaR tiene dos límites que conviene grabarse. Primero, <strong>no dice cuánto pierdes cuando lo superas</strong>: un VaR de 210 USD es compatible con perder 220 o con perder 3.000. Segundo, el método paramétrico supone una normal, y los mercados tienen colas mucho más gruesas que una normal: movimientos de seis o siete desviaciones típicas que la teoría considera imposibles ocurren cada varios años. En 2008 muchas mesas descubrieron que su VaR se excedía varios días seguidos, algo que su modelo declaraba casi imposible. El VaR es un termómetro, no un escudo.</p>
<h4>CVaR o Expected Shortfall</h4>
<p>El CVaR (VaR condicional), también llamado Expected Shortfall, tapa justamente ese agujero: es la <strong>pérdida promedio de los días en que el VaR se supera</strong>. Con los mismos números: si los 25 peores días de tu historial promedian −3,4 %, tu CVaR al 95 % es de 340 USD. La lectura es "cuando el día se pone feo, lo típico es perder 340, no 210".</p>
<p>Por eso el marco regulatorio de Basilea III desplazó el VaR al 99 % por el Expected Shortfall al 97,5 % para el riesgo de mercado de los bancos: castiga la cola, no solo la frontera. Tiene además una propiedad elegante que el VaR no garantiza, la subaditividad: el CVaR de una cartera nunca supera la suma de los individuales, así que diversificar siempre aparece como beneficio.</p>
<p>Para un minorista, el uso realista es este: calcula VaR y CVaR sobre tu historial de resultados diarios, y compáralos con lo que estás dispuesto a ver en pantalla sin cambiar de conducta. Si tu CVaR diario es el 3,4 % de la cuenta y tú te desordenas al perder 2 %, el problema no es el mercado: es tu tamaño de posición.</p>
<h4>MAE y MFE: el riesgo dentro de cada operación</h4>
<p>La <strong>MAE (Maximum Adverse Excursion)</strong> es la mayor pérdida flotante que tuvo una operación antes de cerrarse. La <strong>MFE (Maximum Favorable Excursion)</strong> es la mayor ganancia flotante que llegó a mostrar. Ambas se miden mejor en múltiplos de R, donde 1R es lo que arriesgas por operación, para poder comparar instrumentos distintos. Anotarlas en el diario cuesta dos columnas y cambia el análisis por completo.</p>
<p>John Sweeney popularizó en los años noventa el gráfico de MAE: cada operación es un punto, con la MAE en un eje y el resultado en el otro, separando ganadoras de perdedoras. Si las ganadoras casi nunca sufrieron más de cierto nivel, ese nivel es un buen lugar para el stop: lo colocas donde corta muy pocas ganadoras y en cambio recorta todas las perdedoras. Veamos diez operaciones con un stop inicial de 1,0R:</p>
<table>
<tr><td><strong>Op.</strong></td><td><strong>MAE</strong></td><td><strong>MFE</strong></td><td><strong>Resultado</strong></td></tr>
<tr><td>1</td><td>0,2R</td><td>2,4R</td><td>+1,8R</td></tr>
<tr><td>2</td><td>1,0R</td><td>0,4R</td><td>−1,0R</td></tr>
<tr><td>3</td><td>0,5R</td><td>3,1R</td><td>+2,2R</td></tr>
<tr><td>4</td><td>0,1R</td><td>1,9R</td><td>+1,5R</td></tr>
<tr><td>5</td><td>1,0R</td><td>0,6R</td><td>−1,0R</td></tr>
<tr><td>6</td><td>0,4R</td><td>2,6R</td><td>+2,0R</td></tr>
<tr><td>7</td><td>0,3R</td><td>1,7R</td><td>+1,4R</td></tr>
<tr><td>8</td><td>1,0R</td><td>0,3R</td><td>−1,0R</td></tr>
<tr><td>9</td><td>0,2R</td><td>2,8R</td><td>+1,9R</td></tr>
<tr><td>10</td><td>1,0R</td><td>0,5R</td><td>−1,0R</td></tr>
</table>
<p>Las seis ganadoras suman +10,8R y las cuatro perdedoras −4,0R: el neto es +6,8R, o sea 0,68R por operación. Ahora mira la columna de MAE: <strong>ninguna ganadora sufrió más de 0,5R</strong>. Si el stop hubiera estado en 0,6R, las seis ganadoras habrían sobrevivido igual y las cuatro perdedoras habrían costado 0,6R cada una: −2,4R en vez de −4,0R. El neto pasa a +8,4R, es decir 0,84R por operación, con el mismo sistema y el mismo número de aciertos.</p>
<p>Dos advertencias honestas. Diez operaciones no alcanzan: este análisis pide al menos cien para no estar leyendo ruido. Y un stop más ajustado cambia el sistema, porque algunas perdedoras que ahora mueren en 0,6R quizá habrían vuelto: por eso el nuevo nivel se valida fuera de muestra antes de adoptarlo, no se aplica el mismo día que lo descubres.</p>
<p>La MFE se usa al revés. Si tus ganadoras muestran en promedio 2,4R de MFE pero cierras en 1,2R, estás dejando la mitad del recorrido en la mesa y conviene revisar el objetivo o incorporar un trailing. Si en cambio las operaciones alcanzan 1,8R de MFE y terminan en cero, tu problema es la gestión del cierre, no la entrada. Y la conexión con lo que ya sabes es directa: si acortas el stop a 0,6R manteniendo el mismo riesgo en dinero, el tamaño de posición sube, así que la distancia del stop, el tamaño y el drawdown esperado se mueven siempre juntos.</p>
<p><strong>Aplicación práctica:</strong> agrega cuatro columnas a tu diario (MAE, MFE, R resultante y resultado diario de la cuenta). Con treinta días de resultados diarios calcula tu VaR histórico al 95 % y tu CVaR, y contrástalos con la pérdida que toleras sin desordenarte; con cien operaciones registradas arma el gráfico de MAE y busca el nivel que deja pasar al 90 % de tus ganadoras. Cualquier cambio de stop u objetivo que salga de ahí se prueba fuera de muestra y en demo antes de tocar la cuenta real.</p>
<p><strong>Para recordar:</strong> el VaR marca la frontera del día malo, el CVaR dice qué hay detrás de esa frontera, la MAE indica cuánto tienen que respirar tus operaciones y la MFE cuánto estás dejando ir. Ninguna predice el futuro; todas te dicen si el tamaño que usas hoy es compatible con la persona que quieres ser mañana.</p>`,
    claves: [
      "VaR al 95 %: pérdida no superada en 19 de cada 20 días",
      "CVaR: pérdida promedio cuando el VaR se supera",
      "MAE ubica el stop donde corta pocas ganadoras",
      "MFE muestra cuánto recorrido dejas sin capturar",
    ],
  };

  L["5-8-4"] = {
    resumen: "Un backtest brillante no prueba nada por sí solo: walk-forward, Monte Carlo y conciencia del data snooping son lo que separa un sistema validado de una casualidad bien peinada.",
    duracionVideo: "15–20 min",
    lectura: `<p>Ya sabes que un sistema con muchos parámetros puede memorizar el pasado en vez de aprenderlo, y que la defensa básica es reservar una parte del histórico sin tocar. Esta lección lleva esa idea al nivel en que trabajan los fondos cuantitativos: tres técnicas que convierten "el backtest quedó lindo" en una afirmación medible, y un sesgo estadístico que arruina más estrategias que cualquier error de programación.</p>
<h4>Dentro y fuera de muestra</h4>
<p>El punto de partida es la división del histórico. La parte <strong>in-sample</strong> es donde ajustas: eliges parámetros, filtros y reglas. La parte <strong>out-of-sample</strong> es la que el sistema nunca vio mientras lo construías, y es la única que aporta evidencia. En cuanto miras los resultados fuera de muestra y vuelves a ajustar, esa parte deja de ser virgen: acabas de contaminarla. Por eso los equipos serios guardan además un tramo final que se abre una sola vez.</p>
<h4>Walk-forward</h4>
<p>El problema de una sola división es que solo prueba un régimen de mercado. El <strong>walk-forward</strong> repite el ciclo a lo largo de todo el histórico: optimizas en una ventana, pruebas en la siguiente sin tocar nada, avanzas y repites. Las ventanas fuera de muestra encadenadas forman una curva de capital que se parece mucho más a operar en vivo que cualquier backtest completo.</p>
<ul>
<li><strong>Rodante (rolling):</strong> la ventana de ajuste tiene largo fijo y se desplaza, por ejemplo 24 meses de ajuste y 6 de prueba, avanzando de 6 en 6. Se adapta a mercados cambiantes, pero olvida el pasado lejano.</li>
<li><strong>Anclado (anchored):</strong> el inicio queda fijo y la ventana de ajuste crece: meses 1 al 24, luego 1 al 30, luego 1 al 36. Usa toda la historia disponible y es más estable, aunque reacciona lento a cambios estructurales.</li>
</ul>
<p>La métrica que resume el resultado es la <strong>eficiencia walk-forward</strong>: el rendimiento obtenido fuera de muestra dividido por el obtenido dentro de muestra. Si el sistema rindió un 40 % anualizado en las ventanas de ajuste y un 24 % en las de prueba, la eficiencia es <code>24 / 40 = 60 %</code>. Como referencia práctica, por encima del 50–60 % el comportamiento se considera razonable; por debajo del 30 % casi todo el rendimiento era ajuste al pasado; y una eficiencia superior al 100 % suele ser suerte de una ventana concreta, no una buena señal. Importa igual la consistencia: prefiere un sistema que gana poco en siete de ocho ventanas antes que uno que explota en una y pierde en las demás.</p>
<h4>Monte Carlo sobre la secuencia de operaciones</h4>
<p>Tu historial entregó un drawdown máximo del 12 %. Ese número depende del orden exacto en que ocurrieron las operaciones, y ese orden no se va a repetir. El <strong>Monte Carlo</strong> aplicado a trading toma tu lista de resultados y la reordena al azar miles de veces (o remuestrea con reemplazo, que además permite secuencias de pérdidas más largas que las históricas) para obtener una distribución de los desenlaces posibles.</p>
<p>Con 200 operaciones y 10.000 reordenamientos podrías obtener, por ejemplo: drawdown mediano 11 %, percentil 95 en 22 % y percentil 99 en 28 %. La lectura es incómoda y valiosa: el 12 % que viviste fue un escenario afortunado, y con el mismo sistema un 22 % es perfectamente posible sin que nada se haya roto. De ahí sale también el <strong>riesgo de ruina</strong>: el porcentaje de simulaciones que tocan tu umbral de abandono. Si el 4 % de las trayectorias cae por debajo del 30 % de pérdida y tú cierras la cuenta ahí, tienes una probabilidad real de uno en veinticinco de abandonar un sistema que funciona. La solución no es cambiar el sistema: es reducir el tamaño de posición hasta que esa cifra sea tolerable.</p>
<h4>Data snooping: el sesgo que casi nadie descuenta</h4>
<p>Aquí está el error más caro y menos visible. Si pruebas una estrategia y resulta significativa al 5 %, la probabilidad de que sea casualidad es baja. Pero si pruebas <strong>cien</strong> estrategias, esperas unas cinco significativas por puro azar, y tú te quedarás justamente con la mejor de todas. Eso es el sesgo de pruebas múltiples o <strong>data snooping</strong>.</p>
<p>La analogía clásica: pon a mil personas a lanzar diez monedas cada una. La probabilidad de sacar diez caras seguidas es de 1 entre 1.024, así que lo normal es que una persona lo consiga. Esa persona no tiene talento: es el resultado esperable de mil intentos. Cuando optimizas cincuenta combinaciones y eliges la mejor, haces exactamente lo mismo y lo llamas investigación.</p>
<p>La estadística tiene respuestas para esto. El <strong>Reality Check de Halbert White</strong> (1999) compara tu mejor resultado contra la distribución de los mejores resultados obtenibles por azar dado el número de pruebas realizadas. El <strong>Deflated Sharpe Ratio</strong> de Marcos López de Prado ajusta el Sharpe hacia abajo según cuántas configuraciones probaste y cuán asimétricos son los retornos; un Sharpe de 1,5 obtenido tras mil intentos puede desinflarse hasta dejar de ser significativo. No hace falta que implementes las fórmulas, sí que interiorices la consecuencia: <strong>el resultado de una búsqueda vale menos cuantas más cosas buscaste</strong>.</p>
<p>Defensas concretas: formula la hipótesis económica <em>antes</em> de mirar los datos; usa pocos parámetros; anota cuántas configuraciones probaste y desconfía en proporción; y exige que el resultado sobreviva en otro instrumento o periodo.</p>
<h4>Los otros sesgos del backtest</h4>
<ul>
<li><strong>Look-ahead:</strong> usar información que no estaba disponible en ese instante, como operar con el cierre de la vela que todavía se está formando.</li>
<li><strong>Supervivencia:</strong> probar una estrategia sobre el índice actual ignora a las empresas que quebraron o salieron de él: el resultado mejora solo porque los perdedores desaparecieron de la muestra.</li>
<li><strong>Costos omitidos:</strong> spread, comisión, swap y deslizamiento. Un sistema intradía con 2.000 operaciones al año y un costo real de 0,05 % por operación necesita un 100 % anual bruto solo para empatar.</li>
<li><strong>Selección de datos:</strong> elegir el periodo que mejor le sienta al sistema y presentarlo como representativo.</li>
</ul>
<p>Así trabajamos en RIC: cada sistema que llega a la Sala de máquinas pasa por walk-forward con ventanas encadenadas, se compara contra entradas aleatorias con la misma gestión (si no supera al azar, no hay ventaja), se estresa con Monte Carlo y recién entonces se opera en demo antes de publicarse. Las reglas internas no se comparten; el criterio de validación sí, y es el que acabas de leer.</p>
<p><strong>Aplicación práctica:</strong> toma tu sistema actual y divide el histórico en ventanas de 24 meses de ajuste y 6 de prueba; encadena las ventanas fuera de muestra y calcula la eficiencia walk-forward. Exporta tus operaciones a una planilla o a Python, reordénalas mil veces y anota el percentil 95 del drawdown: ese, y no el histórico, es el número con el que debes dimensionar tu riesgo. Lleva además un registro de cuántas configuraciones probaste antes de quedarte con una.</p>
<p><strong>Para recordar:</strong> lo único que vale es lo que el sistema nunca vio. El walk-forward te dice si la ventaja sobrevive al tiempo, el Monte Carlo cuánto dolor debes estar listo para tolerar, y el data snooping te recuerda que la mejor de cien ideas suele ser la más afortunada, no la mejor.</p>`,
    claves: [
      "Solo los datos que el sistema nunca vio aportan evidencia",
      "Eficiencia walk-forward = rendimiento fuera / dentro de muestra",
      "Monte Carlo revela el drawdown probable, no el histórico",
      "Cuantas más ideas pruebas, menos vale la ganadora",
    ],
  };

  L["5-8-5"] = {
    resumen: "TWAP, VWAP, POV y colocation explican cómo entra al mercado el dinero grande; para ti la lección es concreta: elegir el tipo de orden y medir el deslizamiento real.",
    duracionVideo: "15–20 min",
    lectura: `<p>Cuando tú compras un lote, el mercado no se entera. Cuando un fondo compra cinco millones de acciones, el mercado se entera y le cobra por enterarse. Esa asimetría define toda la ingeniería de ejecución institucional: algoritmos que trocean, infraestructura que compite por microsegundos y una obsesión por medir el costo de operar. Entender esto sirve para dos cosas: leer mejor ciertas huellas en el gráfico y, sobre todo, dejar de perder dinero en tu propia ejecución.</p>
<h4>Impacto de mercado</h4>
<p>El libro de órdenes tiene profundidad finita. Si en el lado vendedor hay 20.000 acciones ofrecidas cerca del precio actual y tú envías una orden a mercado por 500.000, te comes toda esa oferta y sigues subiendo por niveles cada vez peores. Ese encarecimiento se llama <strong>impacto de mercado</strong>, y crece aproximadamente con la raíz del tamaño relativo al volumen diario: pedir el 10 % del volumen del día cuesta bastante menos del doble que pedir el 5 %, pero cuesta. A eso se suma el impacto informativo: si el mercado nota que hay un comprador grande, los demás se adelantan y el precio se mueve antes de que termines.</p>
<h4>Algoritmos de ejecución</h4>
<ul>
<li><strong>TWAP (Time Weighted Average Price):</strong> reparte la orden en trozos iguales a lo largo de un tiempo definido. Para comprar 600.000 unidades en seis horas con cortes cada cinco minutos son 72 tramos de unas 8.333 unidades. Simple y predecible, pero esa misma previsibilidad lo hace detectable.</li>
<li><strong>VWAP (Volume Weighted Average Price):</strong> reparte según el perfil histórico de volumen intradía, que tiene forma de U: mucho en la apertura, poco al mediodía, mucho en el cierre. El objetivo es terminar con un precio medio cercano al VWAP de la sesión, que es la vara con la que se evalúa al trader de ejecución.</li>
<li><strong>POV (Percentage of Volume):</strong> participa de un porcentaje fijo del volumen que se negocia en tiempo real, por ejemplo el 8 %. Si el mercado se activa, compra más; si se seca, se detiene. No garantiza terminar en el plazo.</li>
<li><strong>Implementation Shortfall:</strong> minimiza la diferencia entre el precio de decisión (cuando el gestor dijo "compra") y el precio finalmente obtenido, equilibrando impacto —que pide lentitud— contra riesgo de que el precio se escape —que pide velocidad—.</li>
<li><strong>Iceberg y dark pools:</strong> el iceberg muestra una fracción del tamaño y se recarga al ejecutarse; los dark pools son centros donde las órdenes no se publican antes de cruzarse, pensados para bloques grandes, con el costo de menos transparencia.</li>
</ul>
<p>¿Cómo se ve esto en tu gráfico? Un algoritmo trabajando durante horas deja una compra sostenida sin prisa: el precio no se dispara, pero cada retroceso se frena en el mismo entorno, el delta acumulado sube mientras el precio apenas avanza y el VWAP actúa como imán y como zona de absorción. No es una señal de entrada por sí sola; es contexto que confirma o descarta tu lectura.</p>
<h4>Infraestructura: colocation y latencia</h4>
<p>Las firmas de alta frecuencia alquilan espacio para sus servidores en el mismo centro de datos donde vive el motor de emparejamiento del mercado. Eso es <strong>colocation</strong>. Las direcciones son conocidas: Equinix NY4 en Secaucus (Nueva Jersey) para buena parte del mercado cambiario y de acciones estadounidense, Equinix LD4 en Slough para Londres, y el centro de CME en Aurora (Illinois) para los futuros de Chicago. Dentro del edificio, un <strong>cross-connect</strong> es un cable directo entre tu servidor y el del mercado, y las longitudes se igualan entre clientes para que nadie gane por estar más cerca.</p>
<p>El siguiente eslabón es el transporte entre plazas. Entre Chicago y Nueva York hay redes de microondas y de láser porque las ondas viajan por el aire más rápido que la luz dentro de una fibra óptica: el trayecto ronda los 4 milisegundos por microondas frente a unos 6,5 por fibra. Toda esa carrera se libra en microsegundos, mientras la orden de un minorista con una plataforma en su casa tarda típicamente entre decenas y algunos cientos de milisegundos en llegar al servidor del broker.</p>
<p>La conclusión práctica es liberadora: <strong>no compitas en velocidad</strong>. Esa partida está perdida y no es la tuya. Tu ventaja posible está en el horizonte temporal, en la selección de contexto y en la disciplina, no en llegar primero. La velocidad tampoco garantiza nada: el 1 de agosto de 2012, Knight Capital desplegó mal un software en producción, un código antiguo se reactivó por error y en unos 45 minutos la firma acumuló pérdidas cercanas a los 440 millones de dólares, lo que la dejó fuera del negocio. Automatizar sin controles de despliegue, límites de posición y botón de apagado es más peligroso que operar a mano.</p>
<h4>Deslizamiento y probabilidad de ejecución</h4>
<p>Toda orden vive una disyuntiva: <strong>a mercado</strong> te asegura la ejecución pero no el precio; <strong>limitada</strong> te asegura el precio pero no la ejecución. En el libro, tu orden limitada entra en una cola ordenada por precio y luego por tiempo: si llegas último a un nivel con 900 contratos delante, solo te ejecutarás si se negocian más de 900 a ese precio, y muchas veces lo que ocurre es que el precio se aleja y te quedas fuera justo cuando tenías razón.</p>
<p>El <strong>deslizamiento</strong> (slippage) es la diferencia entre el precio que esperabas y el que obtuviste. Se dispara en tres momentos previsibles: publicaciones de datos macroeconómicos, aperturas y cierres de sesión, y momentos de liquidez fina como el cambio de día en cripto o los feriados. En esos instantes el spread se abre y una orden a mercado puede costarte varias veces lo habitual. La estructura de comisiones también empuja: en el esquema <strong>maker/taker</strong>, quien pone liquidez con orden limitada paga menos —o cobra— y quien la retira con orden a mercado paga más.</p>
<p>Reglas concretas para tu operativa: usa órdenes limitadas en zonas de interés que definiste con antelación, en vez de perseguir el precio a mercado; evita entrar a mercado en el minuto de una noticia importante; exporta tu historial y calcula el deslizamiento medio real por operación para compararlo con el que asumiste en tu backtest, porque si tu sistema promete 0,3R por operación y el mercado te cobra 0,15R en ejecución, la mitad de tu ventaja se evapora; considera cerrar posiciones de swing antes de un evento en vez de confiar en un stop que puede ejecutarse muy lejos; y si automatizas, un servidor virtual cercano al servidor de tu broker reduce desconexiones y algunos milisegundos, aunque no te convierte en competidor de nadie.</p>
<p><strong>Aplicación práctica:</strong> durante un mes registra en tu diario el precio esperado y el obtenido en cada entrada y salida, y saca el deslizamiento medio en pips y en R, separando operaciones normales de las hechas cerca de noticias. Con esos datos ajusta tu backtest a costos realistas y decide, con evidencia, si te conviene entrar con orden limitada o a mercado en cada tipo de escenario.</p>
<p><strong>Para recordar:</strong> el dinero grande trocea, mide y paga por la infraestructura; tú no puedes ganarle en velocidad, pero sí puedes dejar de regalar tu ventaja en la ejecución. Elegir el tipo de orden, evitar los momentos de liquidez fina y medir el deslizamiento real son decisiones tuyas, gratuitas y con efecto inmediato en la curva.</p>`,
    claves: [
      "Los algoritmos trocean para no pagar impacto de mercado",
      "Colocation y microondas: microsegundos que no vas a igualar",
      "A mercado asegura ejecución; limitada asegura precio",
      "Mide tu deslizamiento real y llévalo al backtest",
    ],
  };

  EX[5].push(
    {
      q: "Tu cuenta tiene 20.000 USD y la desviación típica de su rentabilidad diaria es del 1,2 %, con media cero. Usando el método paramétrico (factor 1,645 para el 95 % de confianza), ¿cuál es aproximadamente tu VaR diario al 95 %?",
      opciones: [
        "240 USD, porque el VaR al 95 % es directamente una desviación típica",
        "1.200 USD, porque corresponde al 6 % de la cuenta",
        "395 USD, porque 1,645 x 1,2 % da 1,97 % sobre 20.000 USD",
        "480 USD, porque hay que usar dos desviaciones típicas completas",
      ],
      correcta: 2,
      leccion: "5-8-3",
    },
    {
      q: "Probaste 80 combinaciones de parámetros sobre el mismo histórico y te quedaste con la que dio el mejor Sharpe. ¿Cuál es la lectura estadísticamente correcta de ese resultado?",
      opciones: [
        "Que el resultado está inflado por pruebas múltiples: con 80 intentos la mejor combinación puede destacar por azar, así que debe validarse fuera de muestra y descontarse por la cantidad de pruebas",
        "Que al haber probado muchas combinaciones la evidencia es más sólida, porque se exploró mejor el espacio de parámetros",
        "Que el Sharpe obtenido es confiable siempre que el histórico supere los diez años",
        "Que basta con repetir la misma optimización en otra plataforma para confirmar el hallazgo",
      ],
      correcta: 0,
      leccion: "5-8-4",
    },
    {
      q: "Operas índices y quieres entrar justo en el minuto en que se publica un dato macroeconómico importante. ¿Qué decisión de ejecución es la más coherente con lo visto?",
      opciones: [
        "Enviar una orden a mercado, porque en volatilidad alta el deslizamiento se compensa solo",
        "Colocar una orden limitada lejos del precio y dejarla activa, ya que el fill está garantizado por la prioridad de tiempo",
        "Contratar colocation para competir en velocidad con los algoritmos durante la publicación",
        "Evitar entrar a mercado en ese instante: el spread se abre y el deslizamiento se dispara; mejor esperar a que la liquidez se normalice o usar órdenes limitadas en zonas definidas de antemano",
      ],
      correcta: 3,
      leccion: "5-8-5",
    },
  );
})();
