/* ============================================================
   REAL INVESTORS CLUB (RIC) — Programa Educativo F.O.C.U.S
   Fuente única de verdad del curriculum (Web + App)
   ============================================================ */

const RIC_CURRICULUM = {
  academia: "REAL INVESTORS CLUB",
  siglas: "RIC",
  anagrama: "F.O.C.U.S",
  lema: "De cero a inversor profesional. El programa más completo de Latinoamérica.",
  pilares: [
    {
      id: "personal",
      nombre: "Finanzas Personales",
      corto: "Personales",
      color: "#5b9bd8",
      desc: "Tu economía antes que el mercado: fondo de emergencia, capital de riesgo, presupuesto con ingreso variable, fiscalidad y patrimonio.",
    },
    {
      id: "trading",
      nombre: "Trading e Inversión",
      corto: "Trading",
      color: "#c7a35e",
      desc: "La técnica: análisis, estructura de mercado, ejecución, sistemas propios, instrumentos y automatización.",
    },
    {
      id: "psico",
      nombre: "Psicología del Inversor",
      corto: "Psicología",
      color: "#3dd68c",
      desc: "La mente como parte del sistema: sesgos, disciplina, gestión del drawdown, presión y longevidad en la carrera.",
    },
  ],
  niveles: [
    {
      id: 0,
      letra: "★",
      codigo: "RIC-0",
      nombre: "DESPERTAR",
      subtitulo: "Despertar Financiero",
      gratuito: true,
      precioUSD: 0,
      duracion: "3 semanas",
      pitch:
        "Descubre cómo funcionan de verdad los mercados y decide con claridad si este camino es para ti. Sin costo, sin tarjeta y sin riesgo.",
      destrezas: [
        "Entender cómo funcionan los mercados y quiénes los mueven realmente",
        "Detectar estafas y falsos gurús antes de que te cuesten dinero",
        "Dar tus primeros pasos en una cuenta de práctica, guiado y sin arriesgar nada",
        "Conocer tu perfil de inversor y tu punto de partida real",
      ],
      color: "#8B9DC3",
      objetivo:
        "Romper los mitos del trading, entender qué son realmente los mercados financieros y decidir con claridad si este camino es para ti. Sin costo, sin compromiso.",
      resultado:
        "Sabrás cómo funcionan los mercados, identificarás estafas comunes en LATAM y tendrás tu cuenta demo operativa con un plan de estudio personalizado.",
      modulos: [
        {
          nombre: "Bienvenido al mundo real de las inversiones",
          pilar: "trading",
          lecciones: [
            "Qué es (y qué NO es) el trading: mitos vs realidad",
            "Historias reales: por qué el 90% pierde y cómo estar en el 10%",
            "Trading vs Inversión: dos caminos, un mismo club",
            "El mapa completo: qué aprenderás en RIC nivel por nivel",
          ],
        },
        {
          nombre: "Tu relación con el dinero",
          pilar: "psico",
          lecciones: [
            "Las creencias sobre el dinero que traés de casa (y cómo te operan)",
            "Expectativas realistas: qué rendimiento es posible y cuál es humo",
            "El costo emocional de aprender: lo que nadie cuenta del primer año",
          ],
        },
        {
          nombre: "Los mercados financieros sin filtro",
          pilar: "trading",
          lecciones: [
            "Qué se puede operar: acciones, forex, cripto, futuros, índices",
            "Quiénes mueven el mercado: bancos, fondos e institucionales",
            "Cómo gana dinero un trader: compra, venta y apalancamiento",
            "Horarios de mercado y sesiones (con horarios LATAM)",
          ],
        },
        {
          nombre: "Protégete: seguridad financiera en LATAM",
          pilar: "personal",
          lecciones: [
            "Cómo detectar estafas: pirámides, gurús falsos y señales pagas",
            "Cómo elegir un broker regulado desde Latinoamérica",
            "Custodia de fondos: qué preguntar antes de depositar un dólar",
          ],
        },
        {
          nombre: "El mercado regulado argentino",
          pilar: "trading",
          clave: 5, // índice de sus ids de lección (n-5-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Quién regula el mercado en Argentina: la CNV y la Ley de Mercado de Capitales",
            "Oferta pública vs. estafa: por qué invertir solo con agentes registrados",
            "Abrir una cuenta comitente en Argentina: perfil del inversor, custodia en Caja de Valores y costos",
          ],
        },
        {
          nombre: "Tu primer contacto con el mercado",
          pilar: "trading",
          clave: 4, // sus ids de lección siguen siendo n-4-x aunque ahora haya un módulo antes
          lecciones: [
            "Instala y configura tu cuenta DEMO (MetaTrader 5 / TradingView)",
            "Tu primera operación simulada, paso a paso",
            "Test vocacional RIC: descubre tu perfil de inversor",
            "Clase en vivo de bienvenida + plan de estudio personalizado",
          ],
        },
      ],
      incluye: [
        "6 módulos / 21 lecciones en video",
        "Cuenta demo guiada",
        "Test de perfil de inversor",
        "1 clase en vivo grupal",
        "Acceso a comunidad abierta de Discord",
      ],
    },
    {
      id: 1,
      letra: "F",
      codigo: "RIC-F",
      nombre: "FUNDAMENTOS",
      subtitulo: "Fundamentos del Inversor",
      gratuito: false,
      precioUSD: 49,
      duracion: "9 semanas",
      pitch:
        "La base teórico-práctica que el 90% de los traders nunca construye — y la razón por la que ese 90% pierde.",
      destrezas: [
        "Leer gráficos con fluidez y entender qué mueve los precios",
        "Dominar los instrumentos financieros: cuál te conviene y por qué",
        "Interpretar la economía global sin necesidad de ser economista",
        "Ordenar tus finanzas personales antes de arriesgar un solo dólar",
        "Operar en demo con criterio y método profesional",
      ],
      color: "#4FC3F7",
      objetivo:
        "Construir la base teórica y práctica que el 90% de los traders nunca aprende: economía, instrumentos financieros, lectura de gráficos y finanzas personales aplicadas a LATAM.",
      resultado:
        "Leerás gráficos con fluidez, entenderás noticias económicas, dominarás los instrumentos financieros y operarás en demo con criterio técnico básico.",
      modulos: [
        {
          nombre: "Economía global para traders",
          pilar: "trading",
          lecciones: [
            "Inflación, tasas de interés y bancos centrales (FED, BCE, bancos LATAM)",
            "Ciclos económicos y cómo afectan a cada activo",
            "Indicadores macro clave: NFP, CPI, PIB, FOMC",
            "El dólar como eje del mundo: DXY y monedas emergentes",
          ],
        },
        {
          nombre: "Instrumentos financieros a fondo",
          pilar: "trading",
          lecciones: [
            "Acciones y ETFs: propiedad, dividendos y índices (S&P500, Nasdaq)",
            "Forex: pares, pips, lotes y apalancamiento",
            "Criptomonedas: Bitcoin, Ethereum y el ecosistema",
            "Futuros, CFDs y derivados: qué son y cuándo usarlos",
            "Renta fija y bonos: la pata defensiva del portafolio",
          ],
        },
        {
          nombre: "Análisis técnico: los cimientos",
          pilar: "trading",
          lecciones: [
            "Velas japonesas: anatomía y patrones esenciales",
            "Soportes, resistencias y zonas de valor",
            "Tendencias, canales y estructura de mercado",
            "Temporalidades: del mensual al minuto",
            "Volumen: la huella del dinero real",
          ],
        },
        {
          nombre: "Análisis fundamental básico",
          pilar: "trading",
          lecciones: [
            "Cómo leer un balance y un estado de resultados",
            "Ratios esenciales: P/E, EPS, ROE explicados fácil",
            "Calendario económico: cómo operar (o evitar) las noticias",
          ],
        },
        {
          nombre: "Finanzas personales del inversor LATAM",
          pilar: "personal",
          lecciones: [
            "Presupuesto, fondo de emergencia y capital de riesgo",
            "Cuánto capital necesitas realmente para empezar",
            "Dolarización y protección contra inflación local",
            "Introducción fiscal: impuestos al trading por país (AR, MX, CO, CL, PE)",
          ],
        },
        {
          nombre: "Hábitos y sesgos del inversor principiante",
          pilar: "psico",
          lecciones: [
            "Los 5 sesgos que ya te están costando dinero sin que lo notes",
            "El diario de trading desde tu primera operación en demo",
            "Rutina de estudio sostenible: 5 horas semanales que rinden más que 20",
            "Por qué mirar el gráfico todo el día te vuelve peor inversor",
          ],
        },
        {
          nombre: "Instrumentos y agentes del mercado argentino",
          pilar: "trading",
          clave: 7, // índice de sus ids de lección (n-7-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Valores negociables: acciones, títulos públicos, ON, CEDEAR y otros instrumentos",
            "Los agentes del mercado: mercados, cámaras compensadoras, ALyC, AN, productores, AAGI y Caja de Valores",
            "Fondos Comunes de Inversión: qué son, clases, suscripción y rescate (Ley 24.083)",
            "Valuación de bonos: condiciones de emisión, VAN, TIR y riesgos de la renta fija",
            "Prevención del lavado de activos: GAFI, UIF, etapas del lavado y sujetos obligados",
          ],
        },
        {
          nombre: "Operar en el mercado argentino, paso a paso",
          pilar: "trading",
          clave: 8, // ids 1-8-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "Dólar MEP paso a paso: comprar bonos en pesos y venderlos en dólares",
            "CEDEAR: comprar acciones del mundo en pesos, ratios y dólar implícito",
            "Cauciones, Lecap y fondos money market: qué hacer con los pesos que esperan",
            "Tu primera orden en la app del agente: tipos de orden, plazos y costos reales",
          ],
        },
        {
          nombre: "Práctica guiada en demo",
          pilar: "trading",
          clave: 6, // sus ids de lección siguen siendo n-6-x aunque ahora haya un módulo antes
          lecciones: [
            "Configuración profesional de TradingView y MT5",
            "20 operaciones demo guiadas con checklist",
            "Tu primer diario de trading (journaling)",
            "Examen de certificación Nivel F",
          ],
        },
      ],
      incluye: [
        "9 módulos / 38 lecciones en video HD",
        "2 clases en vivo por semana",
        "Cuaderno de ejercicios + plantillas",
        "Simulador con misiones prácticas",
        "Comunidad privada Nivel F",
        "Certificado digital RIC-F",
      ],
    },
    {
      id: 2,
      letra: "O",
      codigo: "RIC-O",
      nombre: "OPERATIVA",
      subtitulo: "Operativa Técnica Profesional",
      gratuito: false,
      precioUSD: 89,
      duracion: "12 semanas",
      pitch:
        "El salto de mirar el mercado a operarlo: ejecución precisa, lectura limpia del precio y validación con datos.",
      destrezas: [
        "Leer la estructura del mercado sin depender de indicadores",
        "Ejecutar con precisión profesional: entradas, salidas y protección",
        "Analizar en múltiples temporalidades como los profesionales",
        "Validar tu operativa con datos y estadística, no con sensaciones",
        "Cuidar tu capital con reglas escritas antes de cada operación",
      ],
      color: "#81C784",
      objetivo:
        "Dominar la ejecución: análisis técnico avanzado, price action puro, gestión de órdenes y backtesting. Aquí dejas de mirar el mercado y empiezas a operarlo.",
      resultado:
        "Ejecutarás setups completos con entradas, stops y objetivos definidos, tendrás tu primer backtesting documentado y operarás en demo con reglas escritas.",
      modulos: [
        {
          nombre: "Tu capital de riesgo antes de operar",
          pilar: "personal",
          lecciones: [
            "Fondo de emergencia: el requisito previo innegociable",
            "Cuánto capital de riesgo te corresponde según tu situación real",
            "Separar cuentas: gastos, ahorro e inversión",
            "Qué hacer con las ganancias: retirar, reinvertir o capitalizar",
          ],
        },
        {
          nombre: "Price Action puro",
          pilar: "trading",
          lecciones: [
            "Estructura de mercado avanzada: HH, HL, BOS y cambios de carácter",
            "Patrones de velas en contexto (no de memoria)",
            "Rupturas reales vs falsas: cómo diferenciarlas",
            "Confluencias: cuando el mercado grita la entrada",
          ],
        },
        {
          nombre: "Patrones chartistas y figuras",
          pilar: "trading",
          lecciones: [
            "Triángulos, banderas, cuñas y canales",
            "Doble techo/piso, hombro-cabeza-hombro con volumen",
            "Rangos: cómo operar el mercado lateral (80% del tiempo)",
          ],
        },
        {
          nombre: "Indicadores: uso profesional",
          pilar: "trading",
          lecciones: [
            "Medias móviles: EMA, SMA y cruces con contexto",
            "RSI y divergencias que sí funcionan",
            "MACD, Bandas de Bollinger y ATR para volatilidad",
            "Fibonacci: retrocesos y extensiones aplicados",
            "Por qué más indicadores = peores resultados",
          ],
        },
        {
          nombre: "Ejecución y gestión de órdenes",
          pilar: "trading",
          lecciones: [
            "Tipos de órdenes: market, limit, stop, OCO",
            "Spread, slippage y comisiones: los costos ocultos",
            "Stop loss técnico vs monetario",
            "Take profit: parciales, trailing y ratio riesgo/beneficio",
          ],
        },
        {
          nombre: "Multi-temporalidad y contexto",
          pilar: "trading",
          lecciones: [
            "Análisis top-down: del semanal al ejecutivo",
            "Sesiones y liquidez: Asia, Londres, Nueva York",
            "Correlaciones entre activos: DXY, oro, índices y cripto",
          ],
        },
        {
          nombre: "Backtesting y validación",
          pilar: "trading",
          lecciones: [
            "Cómo backtestear a mano con Replay de TradingView",
            "Registro de datos: winrate, R promedio, drawdown",
            "Tu primer reporte de 100 operaciones backtesteadas",
            "Examen de certificación Nivel O",
          ],
        },
        {
          nombre: "Reglas de juego del mercado regulado",
          pilar: "trading",
          clave: 8, // índice de sus ids de lección (n-8-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Transparencia: información privilegiada, manipulación del mercado y hechos relevantes",
            "Régimen informativo de las emisoras: información periódica y ocasional en la AIF",
            "Código de conducta, Responsable de Relaciones con el Público Inversor y atención al inversor: consultas, reclamos y denuncias",
            "Liquidación, compensación y garantías: cómo se cierra una operación en el mercado argentino",
          ],
        },
        {
          nombre: "Inversión de largo plazo para el trader",
          pilar: "personal",
          clave: 9, // ids 2-9-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "ETFs e índices: la forma más simple de invertir en el mundo desde LATAM",
            "DCA, carteras por objetivo y rebalanceo: automatizar lo que no se opera",
            "Cartera núcleo y satélite: cómo conviven el trading y la inversión pasiva",
          ],
        },
        {
          nombre: "La mente en la etapa técnica",
          pilar: "psico",
          clave: 7, // sus ids de lección siguen siendo n-7-x aunque ahora haya un módulo antes
          lecciones: [
            "Sobreoperar: por qué el rango es lo que más cuentas rompe",
            "FOMO: el miedo a quedarte afuera del movimiento",
            "Síndrome del sistema nuevo: por qué cambiás de método cada tres semanas",
            "Aceptar no operar: la habilidad más rentable y menos entrenada",
          ],
        },
      ],
      incluye: [
        "10 módulos / 38 lecciones en video HD",
        "3 clases en vivo por semana + análisis de mercado diario",
        "Biblioteca de setups descargable",
        "Herramienta de backtesting RIC",
        "Revisión mensual de tu diario de trading",
        "Certificado digital RIC-O",
      ],
    },
    {
      id: 3,
      letra: "C",
      codigo: "RIC-C",
      nombre: "CONSISTENCIA",
      subtitulo: "Consistencia, Riesgo y Psicotrading",
      gratuito: false,
      precioUSD: 129,
      duracion: "13 semanas",
      pitch:
        "El nivel que separa aficionados de profesionales: aquí se pasa de demo a cuenta real, con matemática y cabeza fría.",
      destrezas: [
        "Gestionar el riesgo con matemática exacta, no con intuición",
        "Dominar tu psicología y sostener la disciplina bajo presión real",
        "Construir un sistema propio con ventaja estadística demostrable",
        "Pasar de demo a dinero real con un protocolo probado",
        "Mantener la consistencia cuando el mercado no acompaña",
      ],
      color: "#FFB74D",
      objetivo:
        "El nivel que separa aficionados de profesionales: gestión de riesgo matemática, psicología de trading aplicada y construcción de TU sistema propio con ventaja estadística comprobada.",
      resultado:
        "Tendrás un plan de trading completo por escrito, un sistema propio validado con estadística real y control emocional entrenado. Pasarás de demo a cuenta real con capital pequeño.",
      modulos: [
        {
          nombre: "Gestión de riesgo matemática",
          pilar: "trading",
          lecciones: [
            "Riesgo por operación: el 1% y por qué existe",
            "Esperanza matemática: la fórmula de la rentabilidad",
            "Riesgo de ruina: cuántas pérdidas seguidas soporta tu cuenta",
            "Position sizing: cálculo exacto por activo",
            "Drawdown: gestión y recuperación profesional",
          ],
        },
        {
          nombre: "Psicotrading: tu mente es el sistema",
          pilar: "psico",
          lecciones: [
            "Sesgos cognitivos del trader: FOMO, aversión a la pérdida, exceso de confianza",
            "El ciclo emocional de una operación (y cómo romperlo)",
            "Revenge trading y sobreoperar: protocolos de emergencia",
            "Rutinas pre-mercado y post-mercado de traders profesionales",
            "Meditación y estado óptimo de ejecución",
          ],
        },
        {
          nombre: "Economía personal del trader",
          pilar: "personal",
          lecciones: [
            "Presupuestar con ingreso variable: el problema que nadie resuelve",
            "¿Cuándo se puede vivir del trading? La matemática honesta",
            "Dolarización y protección del capital en LATAM",
            "Colchón, seguros y horizonte: tu casa como unidad económica",
          ],
        },
        {
          nombre: "Estadística aplicada al trading",
          pilar: "trading",
          lecciones: [
            "Muestras, varianza y por qué 10 trades no dicen nada",
            "Winrate vs ratio R: la matriz de la rentabilidad",
            "Rachas: matemática de pérdidas consecutivas",
            "Métricas profesionales: Sharpe, profit factor, expectancy",
          ],
        },
        {
          nombre: "Construcción de tu sistema propio",
          pilar: "trading",
          lecciones: [
            "Anatomía de un sistema: contexto, gatillo, gestión, salida",
            "Define tu ventaja (edge): de idea a reglas escritas",
            "Backtesting formal de tu sistema (mín. 200 muestras)",
            "Forward testing: validación en tiempo real",
            "Optimización sin sobreajuste (overfitting)",
          ],
        },
        {
          nombre: "El plan de trading profesional",
          pilar: "psico",
          lecciones: [
            "Documento maestro: activos, horarios, setups, riesgo, reglas",
            "Escenarios: qué hacer cuando todo sale mal",
            "Rutina semanal de revisión y mejora continua",
          ],
        },
        {
          nombre: "Análisis de inversiones profesional",
          pilar: "trading",
          clave: 7, // índice de sus ids de lección (n-7-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Análisis fundamental de acciones argentinas: estructura del mercado y ratios de liquidez, endeudamiento y rentabilidad",
            "Estados contables bajo NIIF, auditoría externa e informe del auditor: qué controla la CNV",
            "Prevención de lavado en la práctica: perfil del cliente, señales de alerta y reporte de operaciones sospechosas",
          ],
        },
        {
          nombre: "Contexto de mercado: intermercado y posicionamiento",
          pilar: "trading",
          clave: 8, // ids 3-8-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "Análisis intermercado: dólar, tasas, bonos, oro y petróleo se mueven juntos",
            "Curva de rendimientos y bancos centrales: cómo las tasas mueven el forex y el oro",
            "Informe COT y posicionamiento: qué hacen los grandes cuando nadie mira",
            "Estacionalidad, amplitud de mercado y VIX: el termómetro del contexto",
          ],
        },
        {
          nombre: "Transición a cuenta real",
          pilar: "psico",
          clave: 6, // sus ids de lección siguen siendo n-6-x aunque ahora haya un módulo antes
          lecciones: [
            "Protocolo RIC de paso a real: requisitos y checklist",
            "Primeras 30 operaciones en real con capital reducido",
            "Gestión emocional del dinero real: qué cambia",
            "Examen de certificación Nivel C + defensa de tu plan",
          ],
        },
      ],
      incluye: [
        "9 módulos / 37 lecciones en video HD",
        "3 clases en vivo por semana + sala de psicotrading quincenal",
        "Calculadora de riesgo y position sizing RIC",
        "Plantilla profesional de plan de trading",
        "Mentoría grupal mensual",
        "Certificado digital RIC-C",
      ],
    },
    {
      id: 4,
      letra: "U",
      codigo: "RIC-U",
      nombre: "UNIVERSO",
      subtitulo: "Universo de Mercados Avanzados",
      gratuito: false,
      precioUSD: 199,
      duracion: "17 semanas",
      pitch:
        "Opera lo que operan los profesionales: mercados avanzados, lectura institucional y gestión de patrimonio multi-activo.",
      destrezas: [
        "Leer los movimientos del dinero institucional y anticiparte",
        "Usar herramientas profesionales de volumen y flujo de órdenes",
        "Operar mercados avanzados y derivados con gestión seria del riesgo",
        "Construir y proteger un portafolio diversificado multi-activo",
        "Optimizar tu estructura fiscal y patrimonial desde LATAM",
      ],
      color: "#BA68C8",
      objetivo:
        "Expandir tu arsenal al nivel institucional: Smart Money Concepts, order flow, futuros, opciones, cripto avanzado y construcción de portafolios multi-activo con visión macro.",
      resultado:
        "Operarás como los institucionales: leerás liquidez y volumen real, dominarás derivados profesionales y gestionarás un portafolio diversificado con estrategia fiscal LATAM optimizada.",
      modulos: [
        {
          nombre: "Smart Money Concepts (SMC)",
          pilar: "trading",
          lecciones: [
            "Liquidez: dónde están los stops y por qué el precio va a buscarlos",
            "Order blocks, imbalances (FVG) y mitigación",
            "Manipulación institucional: inducement y stop hunts",
            "Modelo completo SMC: de la trampa a la entrada",
          ],
        },
        {
          nombre: "Order Flow y volumen institucional",
          pilar: "trading",
          lecciones: [
            "Perfil de volumen: POC, VAH, VAL y áreas de valor",
            "Footprint charts y delta: lectura de agresión real",
            "DOM (Depth of Market) y absorción",
            "VWAP institucional: el precio de referencia de los fondos",
          ],
        },
        {
          nombre: "Futuros profesionales",
          pilar: "trading",
          lecciones: [
            "Contratos, márgenes y vencimientos (ES, NQ, GC, CL)",
            "Micro futuros: acceso profesional con poco capital",
            "Rollover, contango y backwardation",
            "Operativa intradía en índices americanos",
          ],
        },
        {
          nombre: "Opciones financieras",
          pilar: "trading",
          lecciones: [
            "Calls y puts: derecho vs obligación",
            "Las griegas: delta, gamma, theta, vega sin dolor",
            "Estrategias de ingreso: covered calls, cash-secured puts",
            "Spreads: verticales, iron condors y protección de portafolio",
          ],
        },
        {
          nombre: "Cripto avanzado y on-chain",
          pilar: "trading",
          lecciones: [
            "Análisis on-chain: flujos de exchanges, holders, MVRV",
            "DeFi: staking, liquidity pools y riesgos reales",
            "Narrativas y ciclos: halving, altseason, dominancia BTC",
            "Autocustodia profesional y seguridad de wallets",
          ],
        },
        {
          nombre: "Macro trading y portafolios",
          pilar: "trading",
          lecciones: [
            "Análisis intermarket: bonos, dólar, commodities, acciones",
            "Construcción de portafolio: núcleo + satélites",
            "Rebalanceo, correlación y gestión de exposición",
            "Cobertura (hedging) en crisis: casos 2008, 2020, 2022",
          ],
        },
        {
          nombre: "Fiscalidad y estructura patrimonial LATAM",
          pilar: "personal",
          lecciones: [
            "Optimización fiscal por país: Argentina, México, Colombia, Chile, Perú",
            "Brokers internacionales y reporte de cuentas en el exterior",
            "Estructuras: cuándo conviene una sociedad",
            "Examen de certificación Nivel U",
          ],
        },
        {
          nombre: "Estructuras del mercado de capitales",
          pilar: "trading",
          clave: 8, // índice de sus ids de lección (n-8-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Derivados en el mercado argentino: opciones y prima, spreads, futuros, forwards, swaps y coberturas",
            "Fideicomisos financieros: partes, valores representativos de deuda, certificados de participación y securitización",
            "OPA, gobierno corporativo y régimen sancionatorio: la vida de una emisora bajo oferta pública",
          ],
        },
        {
          nombre: "Acciones: temporada de balances",
          pilar: "trading",
          clave: 9, // ids 4-9-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "Anatomía de un reporte de resultados: EPS, ingresos, guidance y consenso",
            "Operar earnings: movimiento implícito, gaps y estrategias con riesgo definido",
            "Calendario, sectores y rotación: cómo se mueve el mercado durante la temporada",
          ],
        },
        {
          nombre: "Cripto más allá del trading: custodia, DeFi y rendimiento",
          pilar: "trading",
          clave: 10, // ids 4-10-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "Wallets y custodia: frase semilla, hardware wallets y cómo no perderlo todo",
            "DeFi: exchanges descentralizados, préstamos e impermanent loss",
            "Staking y rendimiento: de dónde sale el yield y cuándo es una trampa",
            "Airdrops y protocolos nuevos: cómo evaluar sin ser la liquidez de salida",
          ],
        },
        {
          nombre: "Psicología de la complejidad",
          pilar: "psico",
          clave: 7, // sus ids de lección siguen siendo n-7-x aunque ahora haya un módulo antes
          lecciones: [
            "Sobrecarga cognitiva: por qué más instrumentos dan peores decisiones",
            "Drawdown prolongado: sostener el proceso cuando el sistema no paga",
            "El ego del trader avanzado: la trampa de complicar lo que funciona",
            "Decidir bajo incertidumbre: tu tolerancia real vs la declarada",
          ],
        },
      ],
      incluye: [
        "11 módulos / 42 lecciones en video HD",
        "4 clases en vivo por semana + sala avanzada en horario NY",
        "Acceso a datos profesionales de mercado en vivo",
        "Simuladores avanzados de práctica",
        "Mentoría grupal quincenal",
        "Certificado digital RIC-U",
      ],
    },
    {
      id: 5,
      letra: "S",
      codigo: "RIC-S",
      nombre: "SELECTO",
      subtitulo: "Sala Selecta: Trading Profesional de Élite",
      gratuito: false,
      precioUSD: 349,
      duracion: "21 semanas",
      pitch:
        "La élite del programa: capital profesional, automatización y operativa diaria junto a traders que viven de esto.",
      destrezas: [
        "Acceder a capital de terceros y operar cuentas profesionales",
        "Automatizar tu operativa sin necesidad de ser programador",
        "Operar en vivo todos los días junto a traders profesionales",
        "Construir un track record auditable para una carrera de largo plazo",
        "Certificarte como RIC Professional Trader",
      ],
      color: "#C7A35E",
      objetivo:
        "El nivel de élite: fondeo profesional, trading algorítmico con Python, gestión de capital, operativa en vivo con traders profesionales y la certificación completa RIC F.O.C.U.S.",
      resultado:
        "Estarás preparado para superar evaluaciones de fondeo, automatizar tu sistema, gestionar capital propio o de terceros y vivir del trading con estructura profesional real.",
      modulos: [
        {
          nombre: "Fondeo profesional (prop firms)",
          pilar: "trading",
          lecciones: [
            "Cómo funcionan las prop firms: modelo de negocio y letra chica",
            "Estrategia específica para pasar evaluaciones (FTMO, Apex, etc.)",
            "Gestión de drawdown diario y total en cuentas fondeadas",
            "Escalado: de 10K a 400K en cuentas de fondeo",
            "Retiros, splits e impuestos sobre pagos de prop firms",
          ],
        },
        {
          nombre: "Trading algorítmico con Python",
          pilar: "trading",
          lecciones: [
            "Python desde cero para traders (no necesitas ser programador)",
            "Descarga y análisis de datos: pandas, APIs de brokers",
            "De tu sistema manual a reglas programadas",
            "Backtesting automatizado con métricas profesionales",
            "Tu primer bot en demo: ejecución automática con MT5",
            "IA aplicada al trading: qué sirve y qué es humo",
          ],
        },
        {
          nombre: "Order flow institucional avanzado",
          pilar: "trading",
          lecciones: [
            "Lectura combinada: footprint + perfil + DOM en tiempo real",
            "Subastas de mercado: teoría y aplicación práctica",
            "Eventos de liquidez: aperturas, cierres y noticias de alto impacto",
          ],
        },
        {
          nombre: "Gestión de capital profesional",
          pilar: "personal",
          lecciones: [
            "Gestión de capital de terceros: marco legal en LATAM",
            "Reportes profesionales para inversores",
            "Construcción de track record auditable",
            "Del trader al gestor: escalando tu carrera",
          ],
        },
        {
          nombre: "Sala de trading en vivo RIC",
          pilar: "trading",
          lecciones: [
            "Operativa en vivo diaria con head traders RIC",
            "Análisis pre-mercado institucional (playbook diario)",
            "Revisión de operaciones en tiempo real",
            "Simulacros de evaluación de fondeo en grupo",
          ],
        },
        {
          nombre: "Psicología del trader profesional",
          pilar: "psico",
          lecciones: [
            "Operar capital ajeno: la presión que no existía en tu cuenta",
            "Burnout: la carrera se corta más por cansancio que por pérdidas",
            "Identidad y desempeño: cuando tu resultado define tu autoestima",
            "Longevidad: qué hacen distinto los que siguen operando a los diez años",
          ],
        },
        {
          nombre: "Visión integral del mercado regulado",
          pilar: "trading",
          clave: 7, // índice de sus ids de lección (n-7-x): va antes del último módulo, que lleva al examen
          lecciones: [
            "Mapa integral del mercado de capitales argentino: normas, actores e instrumentos en un solo esquema",
            "Trabajar en el mercado regulado: roles, agentes y habilitaciones profesionales",
            "Casos integradores: de la norma a la decisión de inversión",
          ],
        },
        {
          nombre: "Trading cuantitativo e institucional",
          pilar: "trading",
          clave: 8, // ids 5-8-x: va antes del último módulo, que lleva al examen
          lecciones: [
            "Microestructura del mercado: libro de órdenes, CVD, órdenes iceberg, spoofing y layering",
            "Griegas de segundo orden y superficie de volatilidad: gamma squeeze, vanna, volga, smile y skew",
            "Reversión a la media y cointegración: la base del pairs trading y el arbitraje estadístico",
            "Riesgo cuantitativo: VaR, CVaR (Expected Shortfall), MAE y MFE",
            "Validación robusta: walk-forward, Monte Carlo y el sesgo de data snooping",
            "Ejecución institucional: algoritmos TWAP/VWAP, colocation, latencia y probabilidad de ejecución",
          ],
        },
        {
          nombre: "Mentoría y certificación final",
          pilar: "psico",
          clave: 6, // sus ids de lección siguen siendo n-6-x aunque ahora haya un módulo antes
          lecciones: [
            "Mentoría 1:1 mensual con trader profesional asignado",
            "Auditoría completa de tu operativa y métricas",
            "Examen final F.O.C.U.S: teoría + operativa auditada",
            "Certificación RIC Professional Trader + ingreso a la red de egresados",
          ],
        },
      ],
      incluye: [
        "9 módulos / 39 lecciones en video HD",
        "Sala de trading en vivo todos los días de mercado (mientras tu acceso esté activo)",
        "Mentoría 1:1 mensual personalizada",
        "1 cuenta de evaluación de fondeo 10K pagada por RIC (al aprobar simulacros)",
        "Curso completo de automatización de estrategias",
        "Certificación RIC Professional Trader",
        "Acceso vitalicio a la red de egresados y bolsa de oportunidades",
      ],
    },
  ],
  tarifas: {
    mesesPrograma: 17,
    semanasPrograma: 75,
    moneda: "USD",
    nota: "Precios en dólares. Pago con tarjeta local, transferencia y billeteras virtuales en Argentina, México, Colombia, Chile y Perú.",
    comparacion: [
      {
        modalidad: "Por nivel",
        entrada: "$49",
        total: "$815",
        propiedad: "Cada nivel comprado se desbloquea (con los anteriores) por 1 año",
        conviene: "Querés avanzar sin suscripción y decidir nivel por nivel si seguís.",
      },
      {
        modalidad: "Membresía mensual",
        entrada: "$45/mes",
        total: "~$765",
        propiedad: "Acceso mientras la membresía esté activa",
        conviene: "Querés la barrera de entrada más baja y poder cancelar en cualquier momento.",
      },
      {
        modalidad: "Membresía anual",
        entrada: "$450/año",
        total: "~$675",
        propiedad: "Acceso mientras la membresía esté activa",
        conviene: "Ya decidiste que vas a cursar al menos un año. Equivale a 10 meses pagos.",
      },
      {
        modalidad: "F.O.C.U.S Completo",
        entrada: "$649",
        total: "$649",
        propiedad: "Los 6 niveles, tuyos de por vida",
        conviene: "Vas a completar el programa y querés el precio final más bajo.",
      },
    ],
    aclaraciones: [
      "El Nivel 0 es gratuito para siempre en todas las modalidades. No pide tarjeta.",
      "El costo total asume el ritmo recomendado de 5 a 8 horas semanales (75 semanas, unos 17 meses). Si avanzás más rápido, la membresía te sale más barata; si vas más lento, te sale más cara.",
      "Podés empezar por nivel y pasarte a vitalicio después: descontamos lo que ya pagaste.",
      "La compra por nivel dura 12 meses e incluye todos los niveles anteriores. También existe en cuota mensual por nivel, más baja que la membresía completa.",
      "La membresía da acceso al nivel que estés cursando y a todos los anteriores. Si la cancelás, tu progreso y certificados quedan guardados: al volver, seguís donde dejaste.",
      "Ningún plan incluye capital para operar ni promete rentabilidad. Es formación.",
    ],
  },
  planes: [
    {
      id: "gratis",
      nombre: "Nivel 0 — Despertar",
      precio: 0,
      periodo: "gratis para siempre",
      resumen: "El punto de partida, no un plan. Sin tarjeta.",
      sello: "",
      destacado: false,
      items: [
        "Curso Despertar Financiero completo (5 módulos / 18 lecciones)",
        "Los tres pilares desde el primer nivel",
        "Comunidad abierta de Discord",
        "1 clase en vivo grupal",
        "Test de perfil de inversor",
      ],
      cta: "Empezar gratis",
    },
    {
      id: "nivel",
      nombre: "Por nivel",
      precio: 49,
      periodo: "desde · pago único por nivel",
      resumen: "Comprás solo el nivel que vas a cursar: ese y todos los anteriores, por 1 año.",
      sello: "",
      destacado: false,
      items: [
        "F $49 · O $89 · C $129 · U $199 · S $349",
        "Sin suscripción y sin renovación automática",
        "12 meses de acceso al nivel comprado y anteriores",
        "También en cuota mensual por nivel, más baja que la membresía",
        "Clases en vivo y comunidad de ese nivel",
        "Certificado al aprobar el examen",
      ],
      cta: "Ver niveles",
    },
    {
      id: "mensual",
      nombre: "Membresía F.O.C.U.S",
      precio: 45,
      periodo: "/mes · cancelás cuando quieras",
      resumen: "La forma más barata de empezar.",
      sello: "MÁS ELEGIDO",
      destacado: true,
      items: [
        "Acceso al nivel que cursás y a todos los anteriores",
        "Todas las clases en vivo de tu nivel",
        "Comunidad privada + análisis diario",
        "Herramientas RIC: riesgo, backtesting y diario",
        "Certificados digitales por nivel",
        "Avanzás a tu ritmo: el examen desbloquea el siguiente nivel",
      ],
      cta: "Unirme al club",
    },
    {
      id: "vitalicio",
      nombre: "F.O.C.U.S Completo",
      precio: 649,
      periodo: "pago único · acceso vitalicio",
      resumen: "El precio final más bajo del programa completo.",
      sello: "MEJOR PRECIO FINAL",
      destacado: false,
      items: [
        "Los 6 niveles completos (0 al 5) de por vida",
        "Sala de trading en vivo del Nivel S, vitalicia",
        "Mentoría 1:1 mensual durante 12 meses",
        "Cuenta de evaluación de fondeo 10K incluida",
        "Todas las actualizaciones futuras del programa",
      ],
      cta: "Acceso vitalicio",
    },
  ],
};

if (typeof module !== "undefined") module.exports = RIC_CURRICULUM;
