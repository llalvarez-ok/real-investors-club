/* RIC — Material de lectura · Nivel 3 (CONSISTENCIA) */
(function () {
  const L = (window.RIC_LECCIONES = window.RIC_LECCIONES || {});

  /* ============ MÓDULO 0 · Gestión de riesgo matemática ============ */

  L["3-0-0"] = {
    resumen: "Por qué arriesgar 1% por operación no es una regla arbitraria: es la línea que separa una mala racha recuperable de una cuenta destruida.",
    duracionVideo: "8–10 min",
    lectura: `<p>Hasta ahora operaste en demo, donde una mala racha solo duele en el ego. En real, cada punto porcentual que arriesgas de más acorta la vida de tu cuenta de forma medible. La regla del 1% existe porque las pérdidas no se recuperan de manera simétrica: la matemática castiga los drawdowns grandes mucho más de lo que premia las ganancias equivalentes.</p>
<h4>La asimetría de la pérdida</h4>
<p>Si pierdes 10% de tu cuenta, necesitas ganar 11,1% para volver al punto de partida. Si pierdes 50%, necesitas ganar 100%. La recuperación exigida crece más rápido que la pérdida sufrida:</p>
<ul>
<li>Pérdida de 5% → recuperación necesaria: 5,3%</li>
<li>Pérdida de 20% → recuperación necesaria: 25%</li>
<li>Pérdida de 50% → recuperación necesaria: 100%</li>
<li>Pérdida de 75% → recuperación necesaria: 300%</li>
</ul>
<p>Con riesgo de 1% por operación, una racha de 10 pérdidas seguidas te deja con un drawdown cercano al 9,6% (no exactamente 10%, porque cada pérdida se calcula sobre un capital ligeramente menor). Es incómodo, pero recuperable. Con riesgo de 5% por operación, esa misma racha te hunde un 40%: ahora necesitas ganar 67% solo para empatar.</p>
<h4>Ejemplo con números reales</h4>
<p>Cuenta de 1.000 USD, riesgo 1% = 10 USD por operación. Si tu stop en EURUSD está a 20 pips y operas un microlote (0,01 lotes, 0,10 USD por pip), tu riesgo es 2 USD. Para arriesgar exactamente 10 USD, operas 0,05 lotes. El tamaño de la posición se deriva del riesgo, nunca al revés. El trader amateur elige primero el lote y después reza; el profesional elige primero cuánto está dispuesto a perder.</p>
<h4>El 1% también protege tu psicología</h4>
<p>Hay una segunda razón, menos matemática pero igual de real: con 1% de riesgo, ninguna operación individual importa demasiado. Puedes ejecutar tu sistema con frialdad porque el resultado de un solo trade es ruido. Con 10% de riesgo, cada vela mueve tus emociones, y las emociones rompen sistemas.</p>
<h4>Aplicación práctica</h4>
<p>Antes de tu próxima operación, escribe el cálculo: capital actual, 1% en dinero, distancia al stop, tamaño de posición resultante. Hazlo por escrito durante 20 operaciones hasta que sea automático. El error común es respetar el 1% cuando ganas y "aflojarlo" tras dos pérdidas para recuperar rápido: ese es exactamente el momento en que la regla te está salvando.</p>`,
    claves: [
      "Perder 50% exige ganar 100% para recuperar",
      "Riesgo fijo 1%: 10 pérdidas seguidas cuestan ~9,6%",
      "El tamaño de posición se deriva del stop, no al revés",
      "El 1% protege la cuenta y también la cabeza",
    ],
  };

  L["3-0-1"] = {
    resumen: "La esperanza matemática es la única fórmula que dice si tu sistema gana dinero a largo plazo: EM = (winrate × ganancia media) − (lossrate × pérdida media).",
    duracionVideo: "9–11 min",
    lectura: `<p>Puedes ganar 7 operaciones de cada 10 y aun así perder dinero. Puedes acertar solo 4 de cada 10 y hacerte rentable. La diferencia no está en el porcentaje de aciertos sino en la esperanza matemática (EM), el número que resume si tu sistema tiene ventaja real o es una máquina de quemar capital con buena apariencia.</p>
<h4>La fórmula</h4>
<p><strong>EM = (winrate × ganancia media) − (lossrate × pérdida media)</strong></p>
<p>Se lee así: lo que esperas ganar por operación, en promedio, después de muchas operaciones. Si es positiva, el tiempo juega a tu favor. Si es negativa, ninguna gestión emocional te salva: solo estás eligiendo la velocidad de tu ruina.</p>
<h4>Dos traders, dos destinos</h4>
<p>Trader A: gana el 70% de las veces. Cuando gana, cobra 10 USD; cuando pierde, entrega 30 USD (corta ganancias, deja correr pérdidas).</p>
<ul>
<li>EM = (0,70 × 10) − (0,30 × 30) = 7 − 9 = <strong>−2 USD por operación</strong></li>
</ul>
<p>Trader B: gana solo el 40% de las veces. Cuando gana, cobra 25 USD; cuando pierde, entrega 10 USD (ratio 2,5:1).</p>
<ul>
<li>EM = (0,40 × 25) − (0,60 × 10) = 10 − 6 = <strong>+4 USD por operación</strong></li>
</ul>
<p>Después de 100 operaciones, A perdió unos 200 USD sintiéndose ganador casi todos los días. B ganó unos 400 USD perdiendo más veces de las que ganó. El winrate es lo que se siente; la esperanza es lo que se cobra.</p>
<h4>Cómo calcular la tuya</h4>
<p>Necesitas tu registro de operaciones (mínimo 50, idealmente 200): cuenta cuántas ganaste y cuántas perdiste, suma lo ganado y divídelo entre las ganadoras (ganancia media), suma lo perdido y divídelo entre las perdedoras (pérdida media). Aplica la fórmula. Un resultado en dinero por operación te permite proyectar: EM de +4 USD × 20 operaciones al mes = expectativa de +80 USD mensuales con ese tamaño de riesgo.</p>
<h4>Error común</h4>
<p>Calcular la EM con 15 operaciones y creer que ya conoces tu sistema. Con muestras pequeñas, el azar domina el resultado (lo veremos a fondo en el módulo de estadística). La esperanza matemática es una propiedad del largo plazo: se estima con muestras grandes y se respeta operación por operación, incluso cuando la racha corta diga lo contrario.</p>`,
    claves: [
      "EM = (winrate × ganancia media) − (lossrate × pérdida media)",
      "Winrate alto no garantiza rentabilidad",
      "EM positiva + repetición = cuenta que crece",
      "Estímala con mínimo 50–200 operaciones registradas",
    ],
  };

  L["3-0-2"] = {
    resumen: "El riesgo de ruina cuantifica la probabilidad de que tu cuenta caiga a un nivel del que ya no puede volver. Depende del riesgo por trade, el winrate y el ratio.",
    duracionVideo: "8–10 min",
    lectura: `<p>Todo sistema, incluso uno rentable, atraviesa rachas perdedoras. La pregunta profesional no es "¿voy a tener una mala racha?" (la vas a tener) sino "¿mi cuenta sobrevive a la peor racha razonable?". Eso es el riesgo de ruina: la probabilidad de perder tanto capital que ya no puedas seguir operando tu sistema.</p>
<h4>La matemática de las rachas</h4>
<p>Si tu sistema pierde el 50% de las veces, la probabilidad de encadenar N pérdidas seguidas es 0,5 elevado a N:</p>
<ul>
<li>5 pérdidas seguidas: 0,5^5 = 3,1% (en una serie de 5)</li>
<li>8 pérdidas seguidas: 0,5^8 = 0,4%</li>
<li>10 pérdidas seguidas: 0,5^10 = 0,1%</li>
</ul>
<p>Parece improbable, pero cuidado: eso es la probabilidad en una ventana de N trades. En 200 operaciones hay muchas ventanas, y la probabilidad de ver al menos una racha de 8 pérdidas en el año se vuelve alta, no exótica. Un trader que opera 300 veces al año con winrate 50% debería <strong>esperar</strong> rachas de 7 u 8 pérdidas como parte normal del juego.</p>
<h4>Del drawdown a la ruina</h4>
<p>Con riesgo del 1%, una racha de 8 pérdidas cuesta ~7,7% de la cuenta: molesto, sobrevivible. Con riesgo del 5%, la misma racha cuesta ~34%, y necesitas +51% para recuperar. Con riesgo del 10%, pierdes ~57% y estás, en la práctica, en ruina operativa: aunque te quede dinero, la exigencia de recuperación (+132%) y el golpe psicológico suelen terminar el proyecto. La ruina casi nunca es llegar a cero: es llegar al punto donde abandonas o rompes todas tus reglas.</p>
<h4>Las tres palancas</h4>
<p>Tu riesgo de ruina baja cuando: (1) reduces el porcentaje arriesgado por operación, (2) mejora tu esperanza matemática (mejor ratio o mejor winrate), y (3) defines un límite de pérdida que corta la sangría antes de la zona irreversible, por ejemplo: si el drawdown llega a 15%, paro, reviso el sistema y vuelvo a demo hasta encontrar la causa.</p>
<h4>Aplicación práctica</h4>
<p>Calcula hoy: con tu winrate estimado, ¿cuál es la racha perdedora que deberías esperar en un año de operaciones? Multiplícala por tu riesgo por trade. Si el resultado supera el 15–20% de tu cuenta, tu riesgo por operación es demasiado alto para tu sistema, por rentable que sea en el papel.</p>`,
    claves: [
      "Probabilidad de N pérdidas seguidas: lossrate elevado a N",
      "En 300 trades al año, una racha de 7–8 pérdidas es esperable",
      "La ruina real es el punto de abandono, no el cero",
      "Riesgo por trade + límite de drawdown = tu seguro de vida",
    ],
  };

  L["3-0-3"] = {
    resumen: "Position sizing: convertir '1% de riesgo' en lotes, contratos o acciones exactas para cada activo. La fórmula es una sola; cambia el valor del punto.",
    duracionVideo: "10–12 min",
    lectura: `<p>Saber que quieres arriesgar 1% no sirve de nada si no sabes traducirlo al tamaño exacto de la posición en cada activo. Este es el cálculo que hace un profesional antes de cada orden, y es siempre la misma fórmula con tres ingredientes.</p>
<h4>La fórmula universal</h4>
<p><strong>Tamaño = Riesgo en dinero ÷ (distancia al stop × valor del punto por unidad)</strong></p>
<ol>
<li><strong>Riesgo en dinero:</strong> capital × porcentaje. Cuenta de 1.000 USD al 1% = 10 USD.</li>
<li><strong>Distancia al stop:</strong> en pips, puntos o dólares, definida por tu análisis técnico, nunca por el tamaño que "quieres" operar.</li>
<li><strong>Valor del punto:</strong> lo que vale cada pip o punto según el activo y el tamaño de contrato.</li>
</ol>
<h4>Tres ejemplos con la misma cuenta (1.000 USD, riesgo 10 USD)</h4>
<ul>
<li><strong>Forex (EURUSD):</strong> stop a 25 pips. Un microlote (0,01) paga 0,10 USD por pip. Riesgo por microlote = 25 × 0,10 = 2,50 USD. Tamaño = 10 ÷ 2,50 = 4 microlotes → operas 0,04 lotes.</li>
<li><strong>Oro (XAUUSD):</strong> stop a 5 USD de distancia. Con 0,01 lotes, cada dólar de movimiento vale 0,10 USD. Riesgo por 0,01 = 5 × 0,10 = 0,50 USD. Tamaño = 10 ÷ 0,50 = 0,20 lotes.</li>
<li><strong>Acciones:</strong> compras a 50 USD con stop en 48 (riesgo 2 USD por acción). Tamaño = 10 ÷ 2 = 5 acciones. No importa que "solo" sean 5 acciones: el riesgo es el correcto.</li>
</ul>
<h4>Lo que este cálculo elimina</h4>
<p>Con position sizing correcto, un stop lejano no significa más riesgo: significa posición más chica. Un stop cercano no significa menos riesgo: significa posición más grande. El riesgo en dinero es constante; lo que varía es el tamaño. Así, todas tus operaciones pesan lo mismo en la estadística y tu esperanza matemática se puede medir de verdad.</p>
<h4>Error común</h4>
<p>Ajustar el stop para que "entre" el lote que querías operar. Eso invierte la lógica: el stop lo dicta el gráfico (estructura, invalidación de la idea), y el lote lo dicta la fórmula. Si el tamaño resultante te parece ridículamente pequeño, el problema no es la fórmula: es que tu capital todavía es chico o tu stop demasiado amplio. Acepta el número y deja que el interés compuesto haga su trabajo.</p>`,
    claves: [
      "Tamaño = riesgo en dinero ÷ (stop × valor del punto)",
      "El stop lo define el gráfico; el lote, la fórmula",
      "Stop más lejano = posición más chica, mismo riesgo",
      "Haz el cálculo antes de cada orden, sin excepciones",
    ],
  };

  L["3-0-4"] = {
    resumen: "El drawdown es la métrica central del riesgo profesional: cuánto cae tu cuenta desde su máximo, cuánto tarda en recuperar y qué protocolo aplicas mientras tanto.",
    duracionVideo: "9–11 min",
    lectura: `<p>Los fondos profesionales no despiden a un gestor por ganar poco un mes: lo despiden por exceder su drawdown máximo. El drawdown (DD) es la caída de tu cuenta medida desde su punto más alto (equity peak) hasta el valle posterior, y es la métrica que mejor resume tu riesgo real, porque combina el tamaño de tus pérdidas con tu capacidad de contenerlas.</p>
<h4>Medirlo bien</h4>
<p>Tu cuenta pasó de 1.000 a 1.180 USD (nuevo máximo) y luego cayó a 1.062. El drawdown es (1.180 − 1.062) ÷ 1.180 = 10%. Nota que se mide desde el máximo, no desde el capital inicial: aunque sigas "en ganancia" respecto a tu depósito, estás en un DD del 10%, y así lo vive tu psicología.</p>
<h4>Las dos dimensiones del drawdown</h4>
<ul>
<li><strong>Profundidad:</strong> cuánto caes. Recuerda la asimetría: −10% exige +11,1%; −25% exige +33%.</li>
<li><strong>Duración:</strong> cuánto tiempo pasas bajo el máximo anterior. Un DD de 8% que dura 6 meses desgasta más que uno de 12% que se recupera en 3 semanas. La mayoría de los abandonos ocurren por duración, no por profundidad.</li>
</ul>
<h4>Protocolo profesional de gestión de DD</h4>
<p>Define los umbrales antes de necesitarlos, por escrito:</p>
<ol>
<li><strong>DD 5%:</strong> alerta. Revisa el diario: ¿las pérdidas respetaron el sistema o hubo errores de ejecución? Si fueron trades válidos, continúas sin cambios.</li>
<li><strong>DD 10%:</strong> reduce el riesgo por operación a la mitad (de 1% a 0,5%). Sigues operando el sistema, pero con menor exposición mientras la racha revierte.</li>
<li><strong>DD 15%:</strong> stop operativo. Pausa de una semana, auditoría completa del sistema y de tu estado personal. Solo vuelves con un diagnóstico escrito.</li>
</ol>
<p>Reducir el riesgo dentro del drawdown tiene una propiedad matemática valiosa: desacelera la caída justo cuando la recuperación exigida crece más rápido. Y al recuperar el máximo anterior, vuelves al riesgo normal.</p>
<h4>Error común</h4>
<p>Hacer exactamente lo contrario: aumentar el tamaño dentro del drawdown para "recuperar rápido". Es la receta directa hacia el riesgo de ruina que calculaste en la lección anterior. La recuperación profesional es aburrida por diseño: riesgo reducido, ejecución impecable, y dejar que la esperanza matemática trabaje.</p>`,
    claves: [
      "DD se mide desde el máximo de la cuenta, no desde el depósito",
      "Duración del DD quiebra más traders que la profundidad",
      "Umbral 10%: riesgo a la mitad; umbral 15%: pausa y auditoría",
      "Nunca aumentes tamaño dentro de un drawdown",
    ],
  };

  /* ============ MÓDULO 1 · Psicotrading: tu mente es el sistema ============ */

  L["3-1-0"] = {
    resumen: "FOMO, aversión a la pérdida y exceso de confianza son sesgos con nombre, mecánica conocida y antídotos concretos. Reconocerlos en vivo es la mitad de la batalla.",
    duracionVideo: "9–11 min",
    lectura: `<p>Tu cerebro no evolucionó para operar mercados: evolucionó para sobrevivir, y varios de sus atajos automáticos (sesgos) son sistemáticamente caros frente a un gráfico. La buena noticia: los sesgos son predecibles. Si sabes cuándo aparecen, puedes diseñar reglas que los neutralicen antes de que decidan por ti.</p>
<h4>FOMO (miedo a quedarse afuera)</h4>
<p>Ves una vela enorme, sientes que "se va sin ti" y entras tarde, sin setup, comprando el máximo del movimiento. La mecánica: el cerebro procesa la ganancia ajena o hipotética como una pérdida propia. Antídoto: regla escrita de "solo entradas con setup completo del sistema". Si el movimiento ya arrancó sin darte entrada, esa operación nunca fue tuya. El mercado abre todos los días; tu ventaja es esperar tu escenario, no perseguir todos.</p>
<h4>Aversión a la pérdida</h4>
<p>Kahneman y Tversky midieron que una pérdida duele psicológicamente entre 2 y 2,5 veces más que lo que agrada una ganancia equivalente. Consecuencias operativas: mover el stop "para darle aire" a una operación perdedora, cerrar ganadoras a los 30 segundos para "asegurar", y mantener posiciones hundidas esperando el empate. El resultado es el perfil del Trader A de la lección de esperanza matemática: ganancias chicas, pérdidas grandes, EM negativa con winrate alto. Antídoto: stop y take profit definidos antes de entrar, y la regla de hierro de que el stop solo se mueve a favor, jamás en contra.</p>
<h4>Exceso de confianza</h4>
<p>Aparece, paradójicamente, después de las buenas rachas: cinco ganadoras seguidas y "ya le agarraste la mano", subes el tamaño, aflojas los filtros. La estadística dice otra cosa: cinco ganadoras seguidas con winrate 50% ocurren por puro azar el 3% de las ventanas, y con cientos de trades al año las verás varias veces sin que signifiquen nada. Antídoto: el tamaño de posición lo fija la fórmula de position sizing, no tu estado de ánimo, y cualquier cambio de riesgo se decide en frío, fuera del horario de mercado, con datos de al menos 50 operaciones.</p>
<h4>Aplicación práctica</h4>
<p>Agrega a tu diario de trading una columna: "¿qué sentía al entrar?". Durante 20 operaciones, etiqueta cada entrada con el sesgo que detectes (FOMO, miedo, euforia, ninguno). El patrón que descubras vale más que cualquier indicador: te dice cuál es TU sesgo dominante, que es el único que necesitas atacar primero.</p>`,
    claves: [
      "Una pérdida duele ~2× más que lo que agrada una ganancia igual",
      "FOMO se corta con la regla: sin setup completo no hay entrada",
      "El stop solo se mueve a favor, nunca en contra",
      "Etiqueta la emoción de cada entrada en tu diario",
    ],
  };

  L["3-1-1"] = {
    resumen: "Toda operación dispara el mismo ciclo emocional: expectativa, ansiedad, euforia o dolor, y justificación. Romperlo exige protocolos en cada fase, no fuerza de voluntad.",
    duracionVideo: "8–10 min",
    lectura: `<p>Si registras lo que sientes durante una operación, descubrirás que el recorrido emocional es casi idéntico cada vez, gane o pierda. Ese ciclo es predecible, y lo predecible se puede interceptar con protocolo. La fuerza de voluntad no alcanza: bajo estrés, el cerebro ejecuta el hábito, no la intención.</p>
<h4>Las cuatro fases del ciclo</h4>
<ol>
<li><strong>Expectativa (antes de entrar):</strong> el análisis se mezcla con el deseo. Riesgo típico: ver setups donde no los hay porque "quieres operar hoy".</li>
<li><strong>Ansiedad (posición abierta):</strong> cada tick se siente personal. Riesgo típico: cerrar antes de tiempo, mover el stop, agregar tamaño para "promediar".</li>
<li><strong>Resolución (cierre):</strong> euforia si ganaste, dolor si perdiste. Ambas son peligrosas: la euforia pide otra operación ya; el dolor pide revancha.</li>
<li><strong>Justificación (después):</strong> el cerebro reescribe la historia. "Lo sabía", "fue mala suerte", "el mercado está manipulado". Sin registro objetivo, no aprendes nada real.</li>
</ol>
<h4>Cómo se rompe el ciclo</h4>
<p>Con una intervención concreta en cada fase:</p>
<ul>
<li><strong>Fase 1 → checklist de entrada.</strong> Cinco condiciones por escrito; si falta una, no hay operación. La decisión deja de ser emocional porque ya está tomada.</li>
<li><strong>Fase 2 → manos fuera.</strong> Orden con stop y objetivo definidos al entrar. Si tu plataforma lo permite, aléjate de la pantalla en marcos temporales altos. Mirar el tick a tick no mejora el resultado: solo alimenta la ansiedad.</li>
<li><strong>Fase 3 → pausa obligatoria.</strong> Después de cerrar cualquier operación, mínimo 15 minutos sin abrir otra. La euforia y el dolor tienen vida media corta: la pausa los deja pasar antes de la próxima decisión.</li>
<li><strong>Fase 4 → registro inmediato.</strong> Captura del gráfico, motivo de entrada, motivo de salida, emoción dominante, cumplimiento del plan (sí/no). Dos minutos que convierten la experiencia en datos.</li>
</ul>
<h4>El indicador que importa</h4>
<p>Mide tu tasa de cumplimiento: operaciones ejecutadas exactamente según el plan ÷ operaciones totales. Un profesional apunta a más del 90%. Si tu sistema tiene esperanza positiva pero tu cumplimiento es del 60%, no estás operando tu sistema: estás operando tus emociones con el logo de tu sistema. El error común es evaluar la semana por el resultado en dinero; evalúala primero por cumplimiento, porque es la única variable que controlas al 100%.</p>`,
    claves: [
      "El ciclo: expectativa → ansiedad → euforia/dolor → justificación",
      "Checklist de entrada: si falta una condición, no hay trade",
      "Pausa de 15 minutos después de cada cierre",
      "Evalúa la semana por cumplimiento del plan, no por dinero",
    ],
  };

  L["3-1-2"] = {
    resumen: "El revenge trading convierte una pérdida normal en una catástrofe. Protocolo de emergencia: límites diarios automáticos, cierre de plataforma y regla de las 24 horas.",
    duracionVideo: "8–10 min",
    lectura: `<p>Ningún trade individual destruye una cuenta gestionada al 1%. Lo que destruye cuentas es la secuencia: pierdes, duele, entras de nuevo sin setup para recuperar, pierdes más, duplicas el tamaño... En una tarde de revenge trading puedes ejecutar 15 operaciones fuera del sistema y quemar el drawdown de tres meses. Por eso el protocolo anti-revenge no es opcional: es el airbag de tu operativa.</p>
<h4>La mecánica del secuestro</h4>
<p>Tras una pérdida, la amígdala procesa el evento como una amenaza y el cerebro entra en modo recuperación inmediata: visión de túnel, urgencia, descuento del riesgo. En ese estado, literalmente no razonas igual: los estudios de toma de decisiones bajo estrés muestran caídas medibles en el control inhibitorio. Conclusión práctica: las reglas deben estar decididas y automatizadas ANTES, porque en el momento no vas a poder decidir bien.</p>
<h4>Protocolo de emergencia RIC</h4>
<ol>
<li><strong>Límite de pérdida diaria: 3% (tres pérdidas al 1%).</strong> Tocado el límite, terminó tu día de trading. No es negociable, y idealmente lo configura la propia plataforma o tu broker.</li>
<li><strong>Dos pérdidas consecutivas = pausa de 30 minutos</strong> lejos de la pantalla. Camina, respira, come algo. El objetivo es fisiológico: bajar el cortisol antes de la siguiente decisión.</li>
<li><strong>Señal de alarma verbal.</strong> Si te descubres pensando "recuperar", "me la debe", "esta va con todo", cierra la plataforma en ese instante. Esas frases son el síntoma inequívoco del secuestro emocional.</li>
<li><strong>Regla de las 24 horas para cambios.</strong> Cualquier impulso de cambiar el sistema, subir el riesgo o meter una operación fuera del plan debe esperar 24 horas y sobrevivir por escrito. El 95% no sobrevive la noche.</li>
<li><strong>Autopsia sin culpa.</strong> Al día siguiente, revisa la secuencia en el diario: cuál fue el disparador, en qué fase pudiste cortar, qué barrera falló. Ajusta el protocolo, no el sistema.</li>
</ol>
<h4>Sobreoperar: el primo silencioso</h4>
<p>No siempre hay furia: a veces solo aburrimiento. Operar por aburrimiento tiene la misma raíz (necesidad de estímulo) y el mismo antídoto: cupo máximo de operaciones diarias definido por tu sistema. Si tu sistema genera 1–3 setups válidos por día y llevas 6 operaciones, las últimas 3 no fueron trading: fueron entretenimiento caro.</p>
<h4>Error común</h4>
<p>Creer que esto le pasa a los demás. El revenge trading no distingue inteligencia ni experiencia: distingue quién tiene protocolo y quién tiene solo buenas intenciones.</p>`,
    claves: [
      "Límite diario de pérdida: 3%, automatizado si es posible",
      "Dos pérdidas seguidas = 30 minutos fuera de pantalla",
      "Pensaste 'recuperar' = cerrar plataforma ya",
      "Cambios de sistema o riesgo: regla de las 24 horas",
    ],
  };

  L["3-1-3"] = {
    resumen: "Los profesionales no 'se sientan a ver qué hay': ejecutan una rutina pre-mercado de preparación y una post-mercado de registro. La consistencia se fabrica fuera del horario de trading.",
    duracionVideo: "8–10 min",
    lectura: `<p>La diferencia entre un trader consistente y uno errático rara vez está en lo que hacen con la posición abierta: está en lo que hacen antes de abrir la plataforma y después de cerrarla. La rutina convierte el trading en un proceso repetible, y solo los procesos repetibles generan estadísticas confiables.</p>
<h4>Rutina pre-mercado (20–30 minutos)</h4>
<ol>
<li><strong>Chequeo personal (2 min):</strong> ¿dormiste bien? ¿estás enfermo, enojado, apurado? Califícate de 1 a 5. Con 2 o menos, hoy no operas o reduces el riesgo a la mitad. Un profesional se saca del partido cuando no está en condiciones.</li>
<li><strong>Contexto macro (5 min):</strong> calendario económico del día. ¿Hay noticias de alto impacto (tasas, NFP, CPI) en tus activos? Márcalas: alrededor de esos horarios no se abre posición nueva.</li>
<li><strong>Análisis de escenarios (10–15 min):</strong> por cada activo de tu plan, define niveles clave y escribe escenarios condicionales: "si el precio llega a X y forma mi setup, entro con stop en Y y objetivo en Z". Escenarios, no predicciones: no necesitas saber qué hará el mercado, solo qué harás tú en cada caso.</li>
<li><strong>Órdenes y alarmas (5 min):</strong> deja alarmas en tus niveles. Así no necesitas vigilar la pantalla: el mercado te avisa cuando tu escenario se activa.</li>
</ol>
<h4>Rutina post-mercado (10–15 minutos)</h4>
<ol>
<li><strong>Registro de operaciones:</strong> cada trade al diario con captura, motivos, emociones y cumplimiento (sí/no). Sin excepciones, incluso los días sin operaciones ("hoy no hubo setup" también es un dato de disciplina).</li>
<li><strong>Nota del día:</strong> tres líneas: qué hice bien, qué haría distinto, qué observé del mercado.</li>
<li><strong>Cierre físico:</strong> apagar la plataforma. El día de trading termina a una hora definida; revisar posiciones desde el teléfono a las 11 de la noche no es dedicación, es ansiedad.</li>
</ol>
<h4>Por qué funciona</h4>
<p>La rutina pre-mercado toma las decisiones cuando estás en frío, de modo que durante el mercado solo ejecutas. La rutina post-mercado convierte cada día en datos para tu estadística. Entre ambas, reducen el espacio donde viven la improvisación y los sesgos de la lección anterior.</p>
<h4>Error común</h4>
<p>Hacer la rutina una semana y abandonarla "porque ya la sé de memoria". La rutina no es información, es entrenamiento: su valor está en la repetición, exactamente como el gimnasio. Imprímela como checklist y márcala cada día durante 30 días antes de decidir si sobra algo.</p>`,
    claves: [
      "Chequeo personal 1–5: con 2 o menos, no operas",
      "Escenarios condicionales por escrito, no predicciones",
      "Todo trade va al diario el mismo día, sin excepciones",
      "El día de trading tiene hora de cierre definida",
    ],
  };

  L["3-1-4"] = {
    resumen: "El estado óptimo de ejecución es fisiológico, no místico: atención sostenida y baja reactividad. Se entrena con respiración, meditación de atención plena y diseño del entorno.",
    duracionVideo: "7–9 min",
    lectura: `<p>Ejecutar un sistema exige dos capacidades mentales concretas: sostener la atención (para no perderte tu setup ni ver setups fantasma) y regular la reacción emocional (para que una pérdida no dispare el ciclo de revancha). Ambas son entrenables, y la herramienta con más evidencia acumulada es la meditación de atención plena (mindfulness). Nada de humo: esto es entrenamiento de una función cognitiva, igual que el gimnasio entrena un músculo.</p>
<h4>Qué dice la evidencia</h4>
<p>Los programas de entrenamiento en atención plena de 8 semanas muestran de forma consistente mejoras medibles en control atencional y reducción de la reactividad al estrés. Para un trader, eso se traduce en algo muy concreto: más segundos entre el estímulo (vela en contra) y la respuesta (decisión), que es exactamente el espacio donde vive la disciplina.</p>
<h4>Protocolo mínimo viable (10 minutos al día)</h4>
<ol>
<li>Siéntate con la espalda recta, pon un temporizador de 10 minutos.</li>
<li>Lleva la atención a la respiración: el aire entrando y saliendo.</li>
<li>Cuando la mente se distraiga (lo hará decenas de veces), nota la distracción sin juzgarla y vuelve a la respiración.</li>
</ol>
<p>Ese momento de "notar y volver" ES el ejercicio: cada repetición es una flexión del músculo atencional. No busques dejar la mente en blanco; busca volver rápido.</p>
<h4>Herramientas de emergencia intradiarias</h4>
<ul>
<li><strong>Respiración fisiológica de descarga:</strong> doble inhalación por la nariz (una profunda, un pequeño sorbo extra) y exhalación larga por la boca. Dos o tres repeticiones bajan la activación en menos de un minuto. Úsala después de una pérdida, antes de decidir nada.</li>
<li><strong>Respiración 4-6 pre-sesión:</strong> inhala 4 segundos, exhala 6, durante 3 minutos antes de abrir la plataforma. Exhalaciones más largas que las inhalaciones activan el freno parasimpático.</li>
</ul>
<h4>Diseña el entorno, no solo la mente</h4>
<p>El estado óptimo también se construye por fuera: dormir 7–8 horas (la privación de sueño degrada el control inhibitorio tanto como el alcohol), operar en un espacio ordenado y sin notificaciones del teléfono, y no operar con hambre ni después de discusiones fuertes. Tu chequeo pre-mercado de 1 a 5 ya captura esto: la meditación no compensa una vida desordenada.</p>
<h4>Error común</h4>
<p>Esperar resultados en tres días o usarla solo cuando ya estás alterado. Es entrenamiento acumulativo: 10 minutos diarios durante 8 semanas, medidos en tu tasa de cumplimiento del plan, no en sensaciones.</p>`,
    claves: [
      "Meditación = entrenamiento del músculo atencional, no misticismo",
      "10 minutos diarios; el ejercicio es notar y volver",
      "Exhalación larga tras una pérdida: descarga en 1 minuto",
      "Sueño y entorno pesan tanto como la práctica formal",
    ],
  };

  /* ============ MÓDULO 2 · Economía personal del trader ============ */

  L["3-2-0"] = {
    resumen: "El ingreso del trading es variable por naturaleza. La solución es el sistema de dos cuentas: gastos fijos cubiertos por ingresos estables y un fondo regulador que suaviza los meses.",
    duracionVideo: "8–10 min",
    lectura: `<p>Los libros de finanzas personales asumen un sueldo fijo mensual. El trading rompe ese supuesto: puedes ganar 800 USD un mes, perder 200 el siguiente y ganar 1.500 el tercero. Presupuestar con ingreso variable es un problema real que casi nadie enseña, y resolverlo mal es una de las causas ocultas de fracaso: el trader que NECESITA ganar este mes opera con una presión que rompe cualquier sistema.</p>
<h4>La regla central: separa supervivencia de variabilidad</h4>
<p>Tu presupuesto se divide en dos bloques con fuentes distintas:</p>
<ul>
<li><strong>Gastos esenciales</strong> (vivienda, comida, salud, servicios, deudas): deben estar cubiertos por ingresos estables (empleo, freelance recurrente, negocio) o por tu colchón, NUNCA por las ganancias esperadas del trading.</li>
<li><strong>Gastos flexibles y ahorro:</strong> aquí sí pueden entrar los retiros del trading, porque si un mes no llegan, nada esencial se cae.</li>
</ul>
<h4>El fondo regulador: tu sueldo artificial</h4>
<p>Cuando el trading empiece a generar retiros consistentes, no los gastes directamente: deposítalos en una cuenta puente (el fondo regulador) y págate desde ahí un monto fijo mensual, calculado como un porcentaje conservador del promedio de los últimos 6–12 meses. Ejemplo: retiraste 500, 200, 0, 700, 400 y 300 USD en seis meses (promedio 350). Te pagas 250 USD fijos al mes; la diferencia queda en el fondo absorbiendo los meses flacos. Así conviertes un ingreso caótico en un sueldo estable, que es lo que tu presupuesto y tu cabeza necesitan.</p>
<h4>Los tres números que debes conocer hoy</h4>
<ol>
<li><strong>Costo de supervivencia mensual:</strong> lo mínimo para vivir sin lujos. Con números reales, no estimaciones optimistas.</li>
<li><strong>Costo de vida actual completo.</strong></li>
<li><strong>Brecha de cobertura:</strong> qué porcentaje de (1) cubren tus ingresos no-trading. Si es menos del 100%, tu prioridad financiera no es el trading: es cerrar esa brecha, porque operar para pagar el alquiler es operar para perder.</li>
</ol>
<h4>Error común</h4>
<p>El mes bueno infla el estilo de vida ("gané 1.200, me lo merezco") y el mes malo lo financia la tarjeta de crédito. La secuencia correcta es la inversa: el mes bueno alimenta el fondo regulador y el colchón; el estilo de vida solo sube cuando el promedio de 12 meses lo sostiene.</p>`,
    claves: [
      "Gastos esenciales jamás dependen de ganancias de trading",
      "Fondo regulador: te pagas un sueldo fijo desde el promedio",
      "Calcula tu costo de supervivencia con números reales",
      "El mes bueno alimenta el fondo, no el estilo de vida",
    ],
  };

  L["3-2-1"] = {
    resumen: "Vivir del trading es una ecuación: capital × retorno mensual sostenible ≥ costo de vida × margen de seguridad. Con retornos realistas, el capital necesario es mayor de lo que crees.",
    duracionVideo: "9–11 min",
    lectura: `<p>La pregunta "¿cuándo puedo renunciar y vivir del trading?" tiene respuesta matemática, y la mayoría no la quiere escuchar porque los números son más grandes que los que vende el marketing. Aquí está la cuenta honesta, para que tu decisión sea un cálculo y no una apuesta.</p>
<h4>La ecuación</h4>
<p><strong>Capital necesario = (costo de vida mensual × 12 × margen de seguridad) ÷ retorno anual sostenible</strong></p>
<p>¿Qué es un retorno sostenible? Los mejores gestores del mundo promedian 15–25% anual con décadas de historial. Un trader retail bueno y consistente puede aspirar a 20–40% anual en sus mejores años, con varianza enorme entre años. Cualquier proyección basada en "10% mensual todos los meses" (214% anual compuesto, sostenido) no tiene respaldo estadístico: es la matemática del humo.</p>
<h4>Ejemplo con números reales</h4>
<p>Costo de vida: 1.000 USD mensuales = 12.000 USD al año. Margen de seguridad de 1,5 (porque habrá años malos): necesitas generar 18.000 USD al año.</p>
<ul>
<li>Con retorno del 30% anual → capital necesario: 60.000 USD</li>
<li>Con retorno del 20% anual → capital necesario: 90.000 USD</li>
<li>Con una cuenta de 5.000 USD, un excelente 30% anual son 1.500 USD... al año. 125 USD al mes.</li>
</ul>
<p>La conclusión no es deprimente, es liberadora: con cuenta chica, tu objetivo NO es vivir del trading, es construir historial y capital sin presión. La presión de generar el alquiler con 5.000 USD te empuja matemáticamente al sobreapalancamiento y al riesgo de ruina.</p>
<h4>La ruta honesta (por etapas)</h4>
<ol>
<li><strong>Etapa 1:</strong> ingresos estables cubren tu vida; el trading acumula historial (12+ meses de track record real).</li>
<li><strong>Etapa 2:</strong> el trading genera retiros regulares que alimentan tu fondo regulador; tu capital crece por aportes + interés compuesto. Considera capital externo (fondeo) SOLO con historial probado.</li>
<li><strong>Etapa 3:</strong> transición parcial (reducir horas de empleo) cuando el fondo regulador cubra 12 meses de supervivencia y tu track record supere 24 meses.</li>
<li><strong>Etapa 4:</strong> dedicación completa, con colchón intacto y plan B escrito.</li>
</ol>
<h4>Error común</h4>
<p>Renunciar al empleo tras 4 meses buenos. Cuatro meses es una muestra chica (módulo de estadística): puede ser habilidad o puede ser una racha. El historial mínimo para decisiones de vida es de 12–24 meses, incluyendo al menos un periodo de mercado difícil.</p>`,
    claves: [
      "Capital = (gasto anual × margen 1,5) ÷ retorno sostenible",
      "Retornos realistas: 20–40% anual en años buenos, con varianza",
      "Cuenta chica = construir historial, no pagar el alquiler",
      "Transición por etapas con 12–24 meses de track record",
    ],
  };

  L["3-2-2"] = {
    resumen: "En LATAM, la inflación y las devaluaciones son un drawdown silencioso sobre tu patrimonio. Dolarizar el capital de trading y los ahorros es gestión de riesgo, no especulación.",
    duracionVideo: "8–10 min",
    lectura: `<p>Un trader de Estados Unidos o Europa gestiona un riesgo: el del mercado. Un trader latinoamericano gestiona dos: el del mercado y el de su propia moneda. Ignorar el segundo puede costarte más que todas tus pérdidas de trading juntas. Si tu peso, sol o bolívar se devalúa 30% en un año, tu "año ganador" del 25% en moneda local fue, en términos reales, un año perdedor.</p>
<h4>El drawdown monetario</h4>
<p>Trátalo con la misma matemática del módulo de riesgo. Una inflación anual del 25% (nada exótico en la región) significa que 1.000 unidades de moneda local pierden un cuarto de su poder de compra en un año: es un drawdown del 20% en términos reales sin haber operado nunca. Y como ya sabes, los drawdowns se recuperan con esfuerzo asimétrico. La conclusión profesional: tu unidad de cuenta —la moneda en la que mides si ganas o pierdes— debe ser una moneda dura, típicamente el dólar.</p>
<h4>Qué dolarizar y en qué orden</h4>
<ol>
<li><strong>El capital de trading:</strong> opera en cuentas denominadas en USD con brokers regulados. Así tu gestión de riesgo (el 1%, el drawdown) se mide en una vara estable.</li>
<li><strong>El colchón de emergencia:</strong> total o mayoritariamente en dólares o instrumentos dolarizados. Un colchón que se derrite por inflación no es un colchón.</li>
<li><strong>Los excedentes de largo plazo:</strong> instrumentos en moneda dura según tu país: cuentas en USD, dólar financiero/MEP donde exista, stablecoins auditadas con custodia seria como herramienta (entendiendo su riesgo de emisor y de plataforma), ETFs internacionales vía brokers regulados.</li>
</ol>
<h4>Reglas de prudencia regional</h4>
<ul>
<li>Conoce el marco legal y fiscal de TU país: restricciones cambiarias, impuestos a la tenencia y a la compra de divisas. Dolarizar es legal en la mayoría de los países de la región por vías formales; hazlo por esas vías.</li>
<li>Diversifica el riesgo de custodia: no todo en un solo broker, exchange o banco. El riesgo de plataforma es real (quiebras de exchanges lo han demostrado).</li>
<li>Mantén en moneda local solo lo que gastas en moneda local: uno o dos meses de gastos operativos.</li>
</ul>
<h4>Error común</h4>
<p>Dos extremos: el que nunca dolariza "porque el dólar está caro" (intentando hacer timing de su propia moneda, con peor información que el mercado) y el que convierte la dolarización en especulación apalancada. La dolarización del patrimonio es un seguro sistemático: se hace por regla, en cada ingreso, sin opinar sobre el precio.</p>`,
    claves: [
      "Inflación del 25% = drawdown real del 20% sin operar",
      "Tu unidad de cuenta debe ser moneda dura",
      "Orden: capital de trading, colchón, excedentes",
      "Dolariza por regla sistemática, no por timing",
    ],
  };

  L["3-2-3"] = {
    resumen: "Tu casa es una unidad económica con ingresos, gastos, reservas y riesgos. El trading solo es sostenible sobre una base sólida: colchón de 6 meses, seguros básicos y horizonte definido.",
    duracionVideo: "8–10 min",
    lectura: `<p>Puedes tener el mejor sistema del mundo y aun así quebrar como trader por algo que pasó fuera de la plataforma: una emergencia médica sin seguro, la pérdida del empleo, un gasto grande no previsto. Cuando la vida golpea y no hay reservas, el capital de trading se convierte en caja de emergencia en el peor momento posible. Por eso el nivel de CONSISTENCIA incluye esta lección: tu casa es una unidad económica, y se gestiona con la misma seriedad que una cuenta.</p>
<h4>El colchón: tu stop loss patrimonial</h4>
<p>Reserva líquida de 6 meses de gastos esenciales (12 si tus ingresos son mayormente variables), en moneda dura, en instrumentos aburridos y disponibles: cuentas remuneradas, fondos de money market, plazos cortos. Ejemplo: gastos esenciales de 800 USD al mes → colchón objetivo de 4.800 a 9.600 USD. Este dinero NO se invierte en nada volátil y NUNCA entra a la cuenta de trading. Su rendimiento es su disponibilidad: te compra la libertad de atravesar un drawdown o una crisis sin tomar decisiones desesperadas.</p>
<h4>Seguros: el riesgo de cola de tu hogar</h4>
<p>En el trading cortas el riesgo de cola con el stop; en la vida, con seguros. Prioridad según impacto:</p>
<ol>
<li><strong>Salud:</strong> el evento que más patrimonios destruye en la región. Es el primer seguro, no negociable si tu sistema público es débil.</li>
<li><strong>Vida:</strong> obligatorio si alguien depende de tus ingresos; innecesario si nadie depende de ti.</li>
<li><strong>Los del patrimonio existente</strong> (hogar, vehículo) según tu caso.</li>
</ol>
<p>Un seguro es una operación de esperanza matemática negativa que se compra igual, porque elimina la ruina: exactamente la misma lógica del position sizing.</p>
<h4>Horizonte: cada peso con su plazo</h4>
<p>Asigna el dinero por horizonte temporal: corto plazo (0–2 años: colchón y metas próximas, sin volatilidad), mediano (2–7 años: instrumentos moderados), largo (7+ años: donde vive el interés compuesto, aportes sistemáticos a instrumentos diversificados). El capital de trading es una categoría propia: dinero de riesgo, cuya pérdida total no puede tocar ninguna de las otras tres cajas.</p>
<h4>Aplicación práctica</h4>
<p>Esta semana: calcula tu colchón objetivo, mide cuánto tienes hoy y define el aporte mensual automático para cerrarlo. El error común es la secuencia invertida: fondear el trading antes que el colchón. Orden profesional: colchón primero, seguros después, trading tercero. Aburrido, y por eso funciona.</p>`,
    claves: [
      "Colchón: 6–12 meses de esenciales, líquido y en moneda dura",
      "Seguro de salud primero; vida solo si alguien depende de ti",
      "Capital de trading = dinero de riesgo, caja separada",
      "Orden: colchón, seguros, trading. En ese orden",
    ],
  };

  /* ============ MÓDULO 3 · Estadística aplicada al trading ============ */

  L["3-3-0"] = {
    resumen: "Con 10 trades, el azar domina: un sistema perdedor puede lucir brillante y uno ganador, desastroso. La ley de los grandes números exige muestras de 100–200 antes de concluir.",
    duracionVideo: "8–10 min",
    lectura: `<p>Lanza una moneda 10 veces. Obtener 7 caras no prueba que la moneda esté cargada: pasa el 17% de las veces con una moneda perfecta. Ahora reemplaza "moneda" por "sistema de trading" y entenderás el error estadístico más caro del trading retail: sacar conclusiones con muestras diminutas.</p>
<h4>Qué puede hacer el azar con 10 trades</h4>
<p>Supón un sistema con winrate real del 50%. En bloques de 10 operaciones:</p>
<ul>
<li>Ver 7 o más ganadoras: ~17% de probabilidad → el sistema parece excelente sin serlo.</li>
<li>Ver 3 o menos ganadoras: ~17% → el sistema parece basura sin serlo.</li>
<li>Es decir, 1 de cada 3 bloques de 10 te dará una impresión fuertemente equivocada.</li>
</ul>
<p>Con 100 operaciones, el winrate observado de ese mismo sistema caerá casi siempre entre 40% y 60%. Con 200, entre ~43% y 57%. La niebla del azar se disipa con el tamaño de la muestra: eso es la ley de los grandes números aplicada a tu cuenta.</p>
<h4>Las dos muertes por muestra chica</h4>
<ol>
<li><strong>Abandonar un sistema ganador:</strong> pruebas un sistema con esperanza positiva, la primera decena sale 3/10, concluyes "no funciona" y lo tiras. Acabas de descartar oro por una racha estadísticamente normal.</li>
<li><strong>Adoptar un sistema perdedor:</strong> ves en redes "10 operaciones, 9 ganadas" y copias el sistema. Con miles de personas publicando, siempre habrá decenas con rachas espectaculares por puro azar. Es sesgo de supervivencia: solo ves a los que les salió cara siete veces.</li>
</ol>
<h4>Reglas de decisión profesionales</h4>
<ul>
<li>Ninguna conclusión sobre un sistema con menos de 30 operaciones; conclusiones firmes, desde 100–200.</li>
<li>Evalúa por bloques grandes (mensual o cada 50 trades), nunca por el resultado del día.</li>
<li>Cuando una racha te tiente a cambiar algo, pregunta primero: ¿esto es señal o es exactamente lo que el azar produciría con mi winrate? La lección de rachas te dará la fórmula.</li>
</ul>
<h4>Aplicación práctica</h4>
<p>Este es el fundamento del requisito RIC de backtesting con mínimo 200 muestras que verás en el módulo de sistemas. También es tu vacuna emocional: cuando sepas que 4 pérdidas seguidas son estadísticamente rutinarias, dejarán de sentirse como una crisis. El error común es entender esto intelectualmente y seguir reaccionando al resultado de cada día: imprime la frase "una operación no es información" y pégala en tu monitor.</p>`,
    claves: [
      "7 caras en 10 tiros pasa el 17% de las veces con moneda justa",
      "Menos de 30 trades: cero conclusiones; firmes desde 100–200",
      "Evalúa por bloques de 50, no por días",
      "Una operación no es información",
    ],
  };

  L["3-3-1"] = {
    resumen: "Winrate y ratio R son vasos comunicantes: la matriz de rentabilidad muestra qué combinaciones ganan. Con ratio 2:1 alcanza 34% de aciertos; con ratio 0,5:1 necesitas 67%.",
    duracionVideo: "9–11 min",
    lectura: `<p>La lección de esperanza matemática te mostró la fórmula; esta te da el mapa completo. Winrate (porcentaje de aciertos) y ratio R (cuánto ganas cuando ganas versus cuánto pierdes cuando pierdes) son las dos coordenadas de todo sistema, y la relación entre ambas define la frontera exacta entre ganar y perder dinero.</p>
<h4>El winrate de equilibrio</h4>
<p>Para un ratio R dado, el winrate mínimo para no perder dinero es:</p>
<p><strong>Winrate de equilibrio = 1 ÷ (1 + R)</strong></p>
<ul>
<li>Ratio 0,5:1 (arriesgas 10 para ganar 5) → necesitas 66,7% de aciertos</li>
<li>Ratio 1:1 → necesitas 50%</li>
<li>Ratio 2:1 → necesitas 33,3%</li>
<li>Ratio 3:1 → necesitas 25%</li>
</ul>
<p>Todo lo que esté por encima de ese umbral es ganancia; por debajo, pérdida. Un sistema con ratio 2:1 y winrate 45% es sólidamente rentable (umbral: 33,3%). Un sistema con winrate 60% y ratio 0,5:1 pierde dinero (umbral: 66,7%) aunque "acierte más de la mitad de las veces".</p>
<h4>Leyendo la matriz</h4>
<p>Ejemplo numérico con riesgo de 10 USD por operación (1% de 1.000 USD), 100 operaciones:</p>
<ul>
<li>Winrate 40%, ratio 2:1 → 40 ganadoras × 20 − 60 perdedoras × 10 = 800 − 600 = <strong>+200 USD</strong></li>
<li>Winrate 55%, ratio 1:1 → 55 × 10 − 45 × 10 = <strong>+100 USD</strong></li>
<li>Winrate 65%, ratio 0,5:1 → 65 × 5 − 35 × 10 = 325 − 350 = <strong>−25 USD</strong></li>
</ul>
<h4>Los vasos comunicantes</h4>
<p>Aquí está la trampa práctica: winrate y ratio se compran uno al otro. Si alejas el take profit para mejorar el ratio, el precio llegará menos veces: baja el winrate. Si aprietas el stop para mejorar el ratio, te sacarán más veces por ruido: baja el winrate. No existe el sistema de ratio 5:1 y winrate 70%: existen combinaciones honestas sobre la frontera, y tu trabajo es encontrar la que tu sistema y tu psicología toleran. Los sistemas de winrate alto castigan poco y aburren; los de ratio alto pierden seguido y exigen estómago para encadenar 6 pérdidas antes de una ganadora grande.</p>
<h4>Aplicación práctica</h4>
<p>Calcula el winrate de equilibrio de TU sistema con la fórmula y compáralo con tu winrate real de las últimas 100 operaciones. La distancia entre ambos es tu margen de seguridad estadístico. El error común: evaluar solo el winrate porque es lo que se siente, e ignorar que el ratio decide dónde está tu umbral.</p>`,
    claves: [
      "Winrate de equilibrio = 1 ÷ (1 + R)",
      "Ratio 2:1 solo exige 33,3% de aciertos",
      "Winrate 65% con ratio 0,5:1 pierde dinero",
      "Mejorar ratio suele bajar winrate: son vasos comunicantes",
    ],
  };

  L["3-3-2"] = {
    resumen: "Las rachas perdedoras son matemáticamente inevitables: con winrate 50% y 300 trades al año, espera rachas de 7–8. Conocer el número te permite dimensionar riesgo y expectativas.",
    duracionVideo: "8–10 min",
    lectura: `<p>Ya usaste esta idea en riesgo de ruina; ahora la formalizamos, porque conocer la matemática de las rachas cambia tu relación emocional con ellas. Una racha de 6 pérdidas se siente como "el sistema se rompió". La estadística suele decir otra cosa: "esto era esperable y va a volver a pasar".</p>
<h4>La fórmula base</h4>
<p>Probabilidad de N pérdidas consecutivas en N trades dados = (1 − winrate) elevado a N. Con winrate del 50% (probabilidad de pérdida 0,5):</p>
<ul>
<li>4 seguidas: 0,5^4 = 6,25%</li>
<li>6 seguidas: 0,5^6 = 1,56%</li>
<li>8 seguidas: 0,5^8 = 0,39%</li>
</ul>
<h4>El salto conceptual: muchas ventanas</h4>
<p>El 0,39% parece tranquilizador hasta que recuerdas que no operas 8 veces en tu vida: operas cientos. En una serie de 300 operaciones hay casi 300 ventanas donde la racha puede empezar. Una aproximación útil para la racha máxima esperable en una serie de N trades:</p>
<p><strong>Racha esperada ≈ logaritmo de N en base (1/probabilidad de pérdida)</strong></p>
<p>Con winrate 50% y 300 trades: log2(300) ≈ 8,2 → espera ver una racha de unas 8 pérdidas seguidas en tu año. Con winrate 40% (probabilidad de pérdida 0,6) y 300 trades: ≈ 11 pérdidas seguidas. No es mala suerte: es la lectura correcta de tu propio sistema.</p>
<h4>Consecuencias operativas</h4>
<ol>
<li><strong>Dimensionar el riesgo:</strong> si tu sistema de winrate 40% va a producir rachas de ~11, con riesgo del 1% eso es un drawdown de ~10,4%. ¿Tu protocolo de DD lo contempla? Con 2% de riesgo serían ~20%: probablemente inaceptable. La racha esperable es un insumo directo del position sizing.</li>
<li><strong>Vacuna emocional:</strong> escribe en tu plan: "mi sistema producirá rachas de hasta X pérdidas; cuando ocurra, es funcionamiento normal". Leerlo DURANTE la racha es tu mejor defensa contra el abandono prematuro y el revenge trading.</li>
<li><strong>Criterio de revisión objetivo:</strong> la racha solo es una alarma real cuando excede con claridad lo esperable (por ejemplo, 16 pérdidas con un sistema que predice 8): ahí sí pausa y audita si el mercado o tu ejecución cambiaron.</li>
</ol>
<h4>Error común</h4>
<p>La falacia del jugador: creer que tras 6 pérdidas "ya toca" una ganadora y subir el tamaño. Si tus trades son independientes, la probabilidad de la próxima no cambia: el mercado no lleva la cuenta de tus rachas. El tamaño lo fija tu fórmula, no la sensación de que "ya toca".</p>`,
    claves: [
      "P(N pérdidas seguidas) = (1 − winrate) elevado a N",
      "Winrate 50% + 300 trades = espera rachas de ~8",
      "Racha esperable × riesgo por trade = drawdown a presupuestar",
      "Falacia del jugador: nunca 'ya toca' ganar",
    ],
  };

  L["3-3-3"] = {
    resumen: "Expectancy, profit factor, Sharpe y drawdown máximo: las cuatro métricas con las que se audita un sistema profesionalmente, con sus fórmulas y umbrales de referencia.",
    duracionVideo: "10–12 min",
    lectura: `<p>"¿Cuánto ganaste?" es la pregunta del aficionado. El profesional pregunta: ¿cuál es tu expectancy, tu profit factor, tu Sharpe y tu drawdown máximo? Estas cuatro métricas forman el tablero mínimo para auditar cualquier sistema —el tuyo o el de cualquiera que te quiera vender uno.</p>
<h4>1. Expectancy (esperanza por operación)</h4>
<p>Ya la conoces: (winrate × ganancia media) − (lossrate × pérdida media). Exprésala en R (múltiplos de tu riesgo) para que sea comparable entre cuentas: una expectancy de +0,3R significa que cada operación te paga, en promedio, el 30% de lo que arriesgas. Con riesgo de 10 USD y 20 trades al mes: +60 USD esperados. Umbral: por encima de +0,2R con muestra de 200 ya es un sistema serio.</p>
<h4>2. Profit factor (PF)</h4>
<p><strong>PF = suma de ganancias brutas ÷ suma de pérdidas brutas.</strong> Ejemplo: en 100 operaciones ganaste 1.500 USD en total en las ganadoras y perdiste 1.000 en las perdedoras: PF = 1,5. Lectura: por cada dólar perdido, recuperaste 1,50. Umbrales de referencia: menos de 1 = sistema perdedor; 1,2–1,5 = viable; 1,5–2 = sólido; más de 2,5–3 en backtest = sospecha de sobreajuste (lo verás en el módulo de sistemas).</p>
<h4>3. Ratio de Sharpe</h4>
<p>Mide el retorno ajustado por riesgo: retorno obtenido (por encima de la tasa libre de riesgo) dividido por la volatilidad de esos retornos. Intuición: dos sistemas que ganan 30% anual no son iguales si uno lo logra con oscilaciones suaves y el otro con montañas rusas de ±15% mensual. El primero tiene mejor Sharpe: mismo destino, viaje más predecible, más fácil de ejecutar sin romperse. Referencias anualizadas: menos de 1 = pobre; 1–2 = bueno; más de 2 = excelente (y raro de sostener).</p>
<h4>4. Drawdown máximo (MDD)</h4>
<p>La peor caída pico-a-valle del historial. Es la métrica de supervivencia: un sistema con retorno anual del 40% y MDD del 45% probablemente sea inoperable en la práctica, porque nadie lo ejecuta con disciplina mientras pierde casi la mitad. Regla profesional de bolsillo: el retorno anual debería ser al menos 2× el MDD.</p>
<h4>Leerlas en conjunto</h4>
<p>Ninguna métrica sola alcanza: expectancy alta con PF de 1,1 indica fragilidad; retorno alto con Sharpe bajo indica un viaje intolerable; todo brillante con 30 trades de muestra indica... que faltan datos. El error común es elegir la métrica que te favorece este mes. La auditoría honesta usa las cuatro, sobre la muestra completa, cada 50 operaciones o cada mes.</p>`,
    claves: [
      "Expectancy en R: +0,2R con 200 muestras ya es serio",
      "Profit factor = ganancias brutas ÷ pérdidas brutas; 1,5–2 sólido",
      "Sharpe premia el retorno estable, no solo el retorno",
      "Retorno anual ≥ 2× drawdown máximo como regla de bolsillo",
    ],
  };

  /* ============ MÓDULO 4 · Construcción de tu sistema propio ============ */

  L["3-4-0"] = {
    resumen: "Todo sistema operable se descompone en cuatro bloques: contexto (cuándo mirar), gatillo (cuándo entrar), gestión (cuánto y cómo) y salida (cuándo cerrar). Si uno falta, no hay sistema.",
    duracionVideo: "9–11 min",
    lectura: `<p>Pídele a un trader errático que te explique su sistema y escucharás vaguedades: "opero rupturas con tendencia". Pídeselo a uno consistente y te recitará reglas verificables. La diferencia es la anatomía: todo sistema operable, del más simple al más sofisticado, se descompone en cuatro bloques, y cada uno debe estar escrito con tal precisión que otra persona pueda ejecutarlo sin ti.</p>
<h4>1. Contexto: cuándo tiene sentido mirar</h4>
<p>Las condiciones que deben cumplirse ANTES de buscar una entrada: activo, marco temporal, estado del mercado (tendencia definida, rango, volatilidad mínima), horario de operación, filtros de noticias. Ejemplo: "EURUSD en H1, solo si H4 muestra tendencia (precio por encima/debajo de su media de 50), sesión de Londres y Nueva York, nunca 30 minutos antes o después de noticias de alto impacto". El contexto es tu primer filtro de calidad: la mayoría de los malos trades se evitan aquí, no en el gatillo.</p>
<h4>2. Gatillo: la condición exacta de entrada</h4>
<p>El evento verificable que dispara la orden. La prueba de fuego: ¿dos personas mirando el mismo gráfico llegarían a la misma conclusión? "Cuando se vea fuerte" no es gatillo. "Cierre de vela H1 por encima del máximo del retroceso, con el retroceso habiendo tocado la zona de la media de 20" sí lo es. Sin gatillo objetivo no hay backtesting posible, porque no puedes probar lo que no puedes definir.</p>
<h4>3. Gestión: cuánto y cómo mientras está abierta</h4>
<p>Position sizing (tu fórmula del 1%), ubicación inicial del stop (dónde queda invalidada la idea, no un número redondo de pips), y reglas de manejo: ¿se mueve el stop a break-even en algún punto?, ¿hay parciales?, ¿se agrega posición? Cada regla escrita, con su condición exacta. Recuerda: toda regla de gestión modifica tu winrate y tu ratio (los vasos comunicantes), así que cada una debe backtestearse, no improvisarse.</p>
<h4>4. Salida: cuándo y cómo se cierra</h4>
<p>La salida define tu ratio R y suele importar más que la entrada. Opciones: objetivo fijo en estructura, trailing stop, salida por tiempo, salida por señal contraria. Elige UNA regla principal y escríbela. La salida discrecional ("cuando me parezca que ya está") es el punto exacto donde la aversión a la pérdida entra a destruir tu esperanza matemática.</p>
<h4>Aplicación práctica</h4>
<p>Toma tu forma actual de operar y escríbela en los cuatro bloques. Donde no puedas escribir una regla verificable, encontraste un agujero: ahí es donde tus emociones están decidiendo. El error común es tener gatillo sofisticado y gestión/salida improvisadas: es el 25% del sistema puliendo y el 75% al azar.</p>`,
    claves: [
      "Contexto, gatillo, gestión, salida: los cuatro bloques",
      "Prueba de fuego: ¿otra persona ejecutaría igual con tus reglas?",
      "La salida define tu ratio y pesa más que la entrada",
      "Donde no hay regla escrita, deciden tus emociones",
    ],
  };

  L["3-4-1"] = {
    resumen: "Tu edge es una razón verificable por la que el mercado te paga: una asimetría repetible convertida en reglas escritas. Sin hipótesis de ventaja, un sistema es solo superstición ordenada.",
    duracionVideo: "9–11 min",
    lectura: `<p>El mercado es un juego de suma negativa después de costos: cada dólar que ganas lo entrega otro participante, y el broker cobra peaje. Para extraer dinero de forma sostenida necesitas una ventaja (edge): una asimetría real y repetible que haga que, en promedio, tus operaciones tengan esperanza positiva. Esta lección convierte "creo que esto funciona" en una hipótesis formal que se pueda probar.</p>
<h4>Qué es (y qué no es) un edge</h4>
<p>Un edge responde a la pregunta: ¿POR QUÉ el mercado me pagaría por hacer esto? Las fuentes clásicas del trader retail:</p>
<ul>
<li><strong>Comportamiento repetitivo:</strong> patrones de reacción en zonas de liquidez, continuaciones tras retrocesos ordenados en tendencia, comportamiento de aperturas de sesión.</li>
<li><strong>Paciencia estructural:</strong> puedes esperar días el escenario perfecto sin operar; los fondos con mandato y los market makers no siempre pueden. Tu tamaño chico y tu libertad de no operar son ventajas reales.</li>
<li><strong>Especialización:</strong> conocer UN activo y UNA situación mejor que la mayoría, a fuerza de cientos de observaciones registradas.</li>
</ul>
<p>NO son edges: un indicador con parámetros mágicos, una racha buena de 3 semanas, la sensación de "leer el mercado". Si no puedes escribir el porqué en dos frases, no tienes hipótesis: tienes esperanza (de la mala).</p>
<h4>De idea a hipótesis formal</h4>
<p>Formato RIC de hipótesis de edge:</p>
<ol>
<li><strong>Observación:</strong> "En EURUSD H1, cuando el precio retrocede a la zona de la media de 20 dentro de una tendencia H4, tiende a continuar la tendencia".</li>
<li><strong>Porqué plausible:</strong> "Los retrocesos ordenados atraen órdenes institucionales de continuación; los stops de los que compran tarde alimentan el movimiento".</li>
<li><strong>Predicción medible:</strong> "Comprar en esa condición con stop bajo el retroceso y objetivo 2R debería producir winrate mayor a 38% (umbral de equilibrio: 33,3%)".</li>
<li><strong>Criterio de refutación:</strong> "Si tras 200 muestras el winrate es menor a 34%, la hipótesis queda descartada".</li>
</ol>
<p>El punto 4 es el que separa ciencia de superstición: un edge de verdad se define junto con las condiciones que lo matarían.</p>
<h4>Aplicación práctica</h4>
<p>Escribe TU hipótesis en ese formato de cuatro puntos y conviértela en las reglas de los cuatro bloques de la lección anterior. Elige UNA sola hipótesis: el error común es acumular cinco ideas a medio probar en vez de llevar una hasta las 200 muestras. Un edge modesto y verificado vale infinitamente más que cinco brillantes sin evidencia.</p>`,
    claves: [
      "Edge = por qué el mercado te paga, escrito en dos frases",
      "Paciencia y especialización son ventajas retail reales",
      "Hipótesis: observación, porqué, predicción medible, refutación",
      "Una sola hipótesis hasta las 200 muestras",
    ],
  };

  L["3-4-2"] = {
    resumen: "El backtesting formal recorre datos históricos vela a vela aplicando tus reglas sin trampa: mínimo 200 muestras, costos incluidos, registro completo y métricas al final.",
    duracionVideo: "10–12 min",
    lectura: `<p>Ya tienes hipótesis y reglas escritas. Antes de arriesgar un dólar, el sistema debe demostrar esperanza positiva en datos históricos. El backtesting formal no es "mirar el gráfico y ver que funciona": es un procedimiento con reglas anti-autoengaño, porque el tester deshonesto siempre encuentra lo que quiere encontrar.</p>
<h4>Por qué 200 muestras</h4>
<p>Es la aplicación directa del módulo de estadística: con 30 trades, el azar aún domina; con 200, el winrate observado se acerca al real con un margen de pocos puntos. Además, 200 muestras suelen obligarte a atravesar distintas condiciones de mercado (tendencia, rango, alta y baja volatilidad), que es exactamente lo que quieres: saber cómo respira tu sistema en cada clima, no solo en el soleado.</p>
<h4>El procedimiento honesto</h4>
<ol>
<li><strong>Define el universo antes de empezar:</strong> activo, marco temporal, periodo histórico (mínimo 2–3 años o los que hagan falta para 200 señales). Decidido antes, no sobre la marcha.</li>
<li><strong>Avanza vela a vela</strong> (barra por barra, con la función de replay de tu plataforma o a mano). Ver el gráfico completo contamina: tu ojo "sabe" qué pasó después y encuentra señales que en vivo jamás habrías visto.</li>
<li><strong>Aplica las reglas literalmente.</strong> Si dudas de si una señal cumple las reglas, la respuesta es no, y además apunta la ambigüedad: es una regla mal escrita que debes precisar.</li>
<li><strong>Registra TODAS las señales,</strong> incluidas las que pierden. Cada una con: fecha, precio de entrada, stop, salida, resultado en R, y captura si es posible.</li>
<li><strong>Incluye los costos:</strong> spread y comisiones reales de tu broker. Un sistema de scalping con expectancy de +0,15R puede morir entero con el spread; ignorar costos es la trampa número uno de los backtests brillantes.</li>
</ol>
<h4>El veredicto</h4>
<p>Con las 200 muestras, calcula el tablero completo del módulo 3: expectancy en R, winrate, ratio medio, profit factor, racha máxima de pérdidas y drawdown máximo en R. Criterios RIC de aprobación: expectancy positiva después de costos, PF mayor a 1,3, y una racha máxima cuyo drawdown resultante tu protocolo tolere. Si no aprueba, se ajusta la hipótesis y se re-testea desde cero: nunca se "maquilla" el resultado quitando los peores trades ("esos no cuentan porque había noticia" es autoengaño con corbata).</p>
<h4>Error común</h4>
<p>Testear 40 operaciones, ver PF de 1,8 y salir corriendo a real. Ya sabes por qué: con 40 muestras, ese PF es perfectamente compatible con un sistema mediocre en su racha buena. Las 200 no son un capricho: son tu protección contra financiar una ilusión estadística.</p>`,
    claves: [
      "Vela a vela: ver el gráfico completo contamina el test",
      "Registra todas las señales, también las perdedoras",
      "Spread y comisiones incluidos o el test no vale",
      "Aprobación: expectancy positiva tras costos y PF > 1,3",
    ],
  };

  L["3-4-3"] = {
    resumen: "El forward testing valida el sistema en tiempo real (demo o riesgo mínimo) durante 50–100 operaciones: mide la degradación frente al backtest y tu capacidad real de ejecutarlo.",
    duracionVideo: "8–10 min",
    lectura: `<p>Tu sistema aprobó el backtest con 200 muestras. Todavía no está listo para dinero real, porque el backtest tiene un punto ciego: te incluye a ti. En el histórico no hay ansiedad, ni velas formándose en vivo, ni la tentación de saltarte una señal a las 3 de la tarde de un mal día. El forward testing cierra esa brecha: ejecutar el sistema en tiempo real, en demo o con riesgo simbólico, como ensayo general con vestuario completo.</p>
<h4>Qué mide el forward test (que el backtest no puede)</h4>
<ol>
<li><strong>Ejecutabilidad real:</strong> ¿las señales son detectables en vivo, con tu horario y tu vida? Un sistema que señala a las 4 a.m. de tu zona horaria era perfecto en el histórico e inoperable en tu realidad.</li>
<li><strong>Fricciones de mercado:</strong> slippage, spreads variables en noticias, recotizaciones. El histórico asume ejecuciones perfectas; el mercado real no las da.</li>
<li><strong>Tu tasa de cumplimiento:</strong> el dato estrella. ¿Ejecutaste todas las señales, con el tamaño correcto, sin adelantarte ni saltarte ninguna? Objetivo: 90%+.</li>
<li><strong>Vigencia del edge:</strong> confirma que el patrón sigue vivo en el mercado actual, no solo en el periodo testeado.</li>
</ol>
<h4>Protocolo RIC de forward testing</h4>
<ul>
<li><strong>Duración:</strong> mínimo 50 operaciones (idealmente 100), o 3 meses, lo que ocurra después. Menos de eso, ya lo sabes, es ruido.</li>
<li><strong>Condiciones idénticas a real:</strong> mismo capital simulado que tu cuenta futura, mismo 1% de riesgo, misma rutina pre y post mercado, mismo diario. Trátalo como real o no medirá nada.</li>
<li><strong>Cero cambios en caliente:</strong> las reglas quedan congeladas durante todo el periodo. Las ideas de mejora se anotan en una lista y se evalúan al final. Si cambias reglas a mitad de camino, reinicias el conteo.</li>
</ul>
<h4>El veredicto: comparar contra el backtest</h4>
<p>Al terminar, compara métricas. Una degradación moderada es normal y esperable (los costos reales y la ejecución humana pesan): si el backtest dio expectancy +0,35R y el forward da +0,2R, estás dentro de lo razonable. Señales de alarma: expectancy negativa, winrate 15+ puntos por debajo del backtest, o cumplimiento menor al 80% (el problema eres tú, no el sistema, y la solución está en el módulo de psicotrading, no en cambiar reglas).</p>
<h4>Error común</h4>
<p>Tratar la demo "como demo": tamaños irreales, señales salteadas sin registrar, cero rutina. El forward test solo predice tu futuro en real si lo ejecutas exactamente como será el real. Ensayo con vestuario completo o no es ensayo.</p>`,
    claves: [
      "Forward test = backtest + tú + fricciones reales",
      "Mínimo 50–100 operaciones con reglas congeladas",
      "Cumplimiento 90%+: la métrica estrella del periodo",
      "Degradación moderada vs backtest es normal; negativa, no",
    ],
  };

  L["3-4-4"] = {
    resumen: "Optimizar es ajustar parámetros con criterio; sobreajustar es memorizar el pasado. Pocas variables, mesetas en vez de picos y validación fuera de muestra separan lo uno de lo otro.",
    duracionVideo: "9–11 min",
    lectura: `<p>Toma cualquier sistema mediocre, dale suficientes parámetros ajustables y un historial fijo, y podrás "afinarlo" hasta mostrar resultados espectaculares... en ese historial. Se llama sobreajuste (overfitting): el sistema no aprendió el patrón del mercado, memorizó los accidentes del pasado. En cuanto llega dinero real, el pasado no se repite y la curva mágica se desploma. Esta lección te enseña a mejorar sin memorizar.</p>
<h4>Cómo se ve el sobreajuste</h4>
<ul>
<li>Parámetros hiper-específicos: "media de 23 periodos, stop de 17 pips, solo martes y jueves". ¿Por qué 23 y no 20 o 25? Porque 23 maximizaba ESTE histórico: eso es memorización.</li>
<li>Resultados demasiado buenos: PF de 4, winrate 85%, drawdown de 2%. En backtest, lo espectacular es sospechoso por defecto.</li>
<li>Fragilidad: cambias un parámetro un 10% y el sistema pasa de brillante a perdedor. Un edge real es robusto; un artefacto estadístico es frágil.</li>
</ul>
<h4>Reglas de optimización honesta</h4>
<ol>
<li><strong>Pocas variables:</strong> máximo 2–3 parámetros ajustables en todo el sistema. Cada parámetro extra multiplica las combinaciones y la probabilidad de encontrar una casualidad brillante.</li>
<li><strong>Busca mesetas, no picos:</strong> si el stop de 20 pips da PF 1,6, prueba 15, 25 y 30. Si todos rondan 1,4–1,7, estás sobre una meseta robusta: el edge no depende del número exacto. Si solo 20 funciona y los vecinos pierden, encontraste un pico frágil: descártalo.</li>
<li><strong>Validación fuera de muestra (out-of-sample):</strong> la regla de oro. Divide tu histórico: optimiza SOLO con el 70% más antiguo y valida con el 30% reciente que el sistema nunca "vio". Si las métricas se sostienen razonablemente en la parte virgen, hay edge; si se derrumban, había memorización. El forward test es, de hecho, tu validación fuera de muestra definitiva.</li>
<li><strong>Cada regla necesita un porqué:</strong> antes de agregar un filtro, exige la explicación económica ("evito noticias porque el spread se triplica") y no solo la estadística ("los miércoles rinden peor"). Las reglas sin porqué son las primeras que resultan ser casualidades.</li>
</ol>
<h4>Cuándo re-optimizar</h4>
<p>No cada mala semana (eso es ajuste emocional disfrazado de rigor). Solo con evidencia estadística de degradación: métricas fuera del rango esperado durante 50+ operaciones, o un cambio estructural identificable en el mercado. Y toda re-optimización repite el ciclo completo: ajustar en histórico, validar fuera de muestra, forward test.</p>
<h4>Error común</h4>
<p>Optimizar el sistema después de cada racha perdedora. Ya sabes que las rachas son estadísticamente normales: perseguirlas con re-optimizaciones garantiza un sistema perpetuamente sobreajustado al último mes. La disciplina de tocar poco es una ventaja competitiva.</p>`,
    claves: [
      "Sobreajuste = memorizar el pasado, no aprender el patrón",
      "Máximo 2–3 parámetros ajustables por sistema",
      "Mesetas robustas sí; picos frágiles no",
      "Optimiza con el 70% del histórico, valida con el 30% virgen",
    ],
  };

  /* ============ MÓDULO 5 · El plan de trading profesional ============ */

  L["3-5-0"] = {
    resumen: "El documento maestro reúne en una página tu operativa completa: activos, horarios, setups, riesgo y reglas de conducta. Si no está escrito, no existe.",
    duracionVideo: "8–10 min",
    lectura: `<p>Un piloto con 10.000 horas de vuelo sigue usando checklists, no porque no sepa volar, sino porque sabe que bajo presión la memoria y el criterio se degradan. Tu plan de trading es eso: el documento que decide por ti cuando tú no estás en condiciones de decidir bien. La regla RIC es simple: si no está escrito, no existe; y si no cabe en pocas páginas consultables en segundos, no sirve.</p>
<h4>Las seis secciones del documento maestro</h4>
<ol>
<li><strong>Activos y horarios:</strong> qué instrumentos operas (los que backtesteaste, no más) y en qué ventanas horarias. Ejemplo: "XAUUSD y EURUSD, H1, de 8:00 a 12:00 hora local, lunes a jueves. Fuera de eso, la plataforma está cerrada". Lo que queda fuera de la lista no se opera, sin importar lo tentador que parezca.</li>
<li><strong>Setups autorizados:</strong> tus sistemas validados, cada uno con sus cuatro bloques (contexto, gatillo, gestión, salida) resumidos en formato checklist. Uno o dos setups: los que atravesaron backtest y forward test. Coleccionar setups es coleccionar agujeros.</li>
<li><strong>Parámetros de riesgo:</strong> riesgo por operación (1%), pérdida máxima diaria (3%), pérdida máxima semanal (5%), protocolo de drawdown con sus umbrales (5/10/15%), y máximo de operaciones por día. Números exactos, sin rangos elásticos.</li>
<li><strong>Rutinas:</strong> tu checklist pre-mercado y post-mercado del módulo de psicotrading, referenciadas como parte obligatoria del día operativo.</li>
<li><strong>Reglas de conducta:</strong> los protocolos anti-revenge (pausa tras dos pérdidas, cierre por límite diario, regla de las 24 horas para cambios) y el compromiso de registro del 100% de las operaciones.</li>
<li><strong>Gobernanza del plan:</strong> cómo y cuándo se modifica el propio plan: solo en la revisión semanal o mensual, en frío, con datos de 50+ operaciones, y dejando registro fechado del cambio y su motivo. El plan que se edita a las 11 de la noche tras un mal día no es un plan: es un diario de impulsos.</li>
</ol>
<h4>El formato importa</h4>
<p>Dos niveles: el documento completo (3–5 páginas, se consulta en revisiones) y la hoja de batalla (1 página impresa junto al monitor: checklist de entrada, números de riesgo, protocolos de emergencia). Durante el mercado solo usas la hoja de batalla.</p>
<h4>Error común</h4>
<p>Confundir plan con biblioteca: 40 páginas de teoría que nunca se consultan. El plan no es para demostrar cuánto sabes: es para ejecutar bajo presión. Todo lo que no cambie una decisión concreta durante la semana operativa sobra. Esta semana: escribe la versión 1.0 con lo que ya validaste, fírmala con fecha, e imprime la hoja de batalla.</p>`,
    claves: [
      "Si no está escrito, no existe",
      "Seis secciones: activos, setups, riesgo, rutinas, conducta, gobernanza",
      "Hoja de batalla de 1 página junto al monitor",
      "El plan solo se edita en frío, con datos, con fecha",
    ],
  };

  L["3-5-1"] = {
    resumen: "Los escenarios adversos se planifican antes de que ocurran: caídas de plataforma, gaps contra tu posición, rachas extremas, crisis personales. Respuestas escritas, no improvisadas.",
    duracionVideo: "8–10 min",
    lectura: `<p>Los planes de la lección anterior cubren el 95% de los días: mercado normal, tú normal, todo funcionando. Esta lección cubre el otro 5%, que es donde se destruyen las cuentas. La lógica es la del simulacro de incendio: la respuesta a la emergencia se decide y se ensaya ANTES, porque durante la emergencia solo se ejecuta. Cada escenario se documenta igual: disparador exacto → acción inmediata → seguimiento.</p>
<h4>Escenarios técnicos</h4>
<ul>
<li><strong>Se cae la plataforma o internet con posición abierta.</strong> Prevención: toda posición lleva stop loss EN EL SERVIDOR del broker desde el momento de entrada (nunca stops mentales). Acción: número del broker a mano para cierre telefónico; datos móviles como respaldo del wifi; app del broker instalada y probada.</li>
<li><strong>Gap en contra</strong> (apertura de semana o noticia que salta tu stop). El stop se ejecuta al primer precio disponible: puedes perder más del 1% previsto. Prevención: no mantener posiciones sobre el fin de semana o noticias mayores salvo que tu sistema lo contemple con tamaño reducido. Acción si ocurre: aceptar la pérdida, registrarla, no intentar recuperarla ese día.</li>
<li><strong>Error de ejecución</strong> (lote equivocado, compra en vez de venta). Acción: cerrar la posición inmediatamente al descubrirlo, sin esperar "a ver si sale bien". Un error no se gestiona: se corta. Después, al diario: por qué ocurrió y qué barrera lo previene (por ejemplo, plantillas de orden preconfiguradas).</li>
</ul>
<h4>Escenarios estadísticos</h4>
<ul>
<li><strong>Racha peor que la esperada:</strong> tu sistema predice rachas de ~8; vas 12 pérdidas. Disparador: racha mayor a 1,5× la esperada o drawdown en el umbral del 15%. Acción: stop operativo, auditoría completa (¿cambió el mercado? ¿cambiaste tú? ¿cumplimiento por debajo del 90%?), y regreso escalonado: demo hasta recuperar ejecución, luego riesgo al 0,5%.</li>
<li><strong>Racha ganadora anómala:</strong> también es un escenario. Disparador: euforia detectable, impulso de subir el riesgo. Acción: releer la regla de que el tamaño lo fija la fórmula, y la regla de las 24 horas para cualquier cambio.</li>
</ul>
<h4>Escenarios personales</h4>
<p>Enfermedad, duelo, mudanza, crisis familiar, presión económica nueva. Regla general: cualquier evento que te ponga en 2 o menos en tu chequeo pre-mercado durante más de una semana activa el modo pausa: cero operaciones en real, sin culpa. El mercado estará ahí cuando vuelvas; tu capital, solo si lo protegiste. Volver a operar "para despejarme" en medio de una crisis personal es de las formas más caras de despejarse que existen.</p>
<h4>Aplicación práctica</h4>
<p>Agrega al documento maestro la sección "Escenarios": cada uno con disparador, acción y seguimiento, en media página total. El error común es leer esto y no escribirlo, porque "ya lo tengo claro". Claro en la cabeza no es claro bajo fuego: escríbelo.</p>`,
    claves: [
      "Stop en el servidor del broker siempre, jamás mental",
      "Cada escenario: disparador exacto → acción → seguimiento",
      "Racha peor a 1,5× la esperada = stop y auditoría",
      "Crisis personal sostenida = modo pausa sin culpa",
    ],
  };

  L["3-5-2"] = {
    resumen: "La mejora continua se sistematiza: revisión semanal de 30 minutos con métricas y diario, y auditoría mensual con muestra suficiente. Mejora el proceso; el resultado sigue solo.",
    duracionVideo: "7–9 min",
    lectura: `<p>Operar sin revisar es repetir errores con puntualidad. Revisar sin método es rumiar resultados. La revisión profesional es un procedimiento con agenda, frecuencia y salida concreta: uno o dos ajustes de proceso por semana, no una refundación del sistema cada domingo.</p>
<h4>La revisión semanal (30 minutos, mismo día y hora)</h4>
<p>Se hace con el mercado cerrado, idealmente el fin de semana. Agenda fija:</p>
<ol>
<li><strong>Números de la semana (10 min):</strong> operaciones totales, resultado en R (no en dinero: en R), winrate de la semana, y la métrica reina: tasa de cumplimiento del plan. Recuerda el módulo de estadística: una semana es una muestra chica, así que estos números se anotan para la acumulación mensual, no para juzgar el sistema.</li>
<li><strong>Repaso del diario (10 min):</strong> relee cada operación de la semana. Clasifícalas en cuatro casillas: (A) según plan y ganó, (B) según plan y perdió, (C) fuera de plan y ganó, (D) fuera de plan y perdió. Las B son costo normal del negocio. Las peligrosas son las C: ganancias fuera de plan que entrenan malos hábitos con premio incluido. Un profesional celebra las A y B, y trata las C con la misma seriedad que las D.</li>
<li><strong>Un ajuste de proceso (5 min):</strong> elige UNA mejora concreta y chica para la semana siguiente ("esta semana no muevo ningún stop", "esta semana hago el checklist en voz alta"). Una sola: los cambios múltiples no se pueden atribuir.</li>
<li><strong>Preparación de la semana (5 min):</strong> calendario económico, niveles clave en tus activos, y tu disponibilidad real (¿algún día complicado? redúcelo o sácalo del plan).</li>
</ol>
<h4>La auditoría mensual (1 hora)</h4>
<p>Con 20–60 operaciones acumuladas, ya hay algo parecido a una muestra. Calcula el tablero completo: expectancy en R, profit factor, drawdown del mes, racha máxima, cumplimiento promedio. Compara contra tu backtest y tu forward test: ¿estás dentro del rango esperado? Aquí —y solo aquí— se evalúan las ideas de cambio anotadas durante el mes, con la gobernanza del plan: en frío, con datos, con registro fechado.</p>
<h4>El principio detrás</h4>
<p>Mejora el proceso y el resultado llega solo; persigue el resultado y destruirás el proceso. Por eso la revisión semanal casi no mira el dinero: mira el cumplimiento, la calidad de ejecución y los hábitos. El error común es saltarse la revisión en las semanas malas, que es exactamente cuando más información contiene el diario. Misma hora, misma agenda, llueva o truene: la revisión es parte del trabajo, no un extra opcional.</p>`,
    claves: [
      "Revisión semanal: 30 min, agenda fija, en frío",
      "Cuatro casillas: las 'fuera de plan que ganaron' son veneno",
      "Un solo ajuste de proceso por semana",
      "Auditoría mensual: métricas completas contra el backtest",
    ],
  };

  /* ============ MÓDULO 6 · Transición a cuenta real ============ */

  L["3-6-0"] = {
    resumen: "El paso a real no es una corazonada: es un checklist verificable de sistema validado, métricas en regla, protocolos escritos y economía personal en orden. Si falta un punto, no es el momento.",
    duracionVideo: "8–10 min",
    lectura: `<p>La pregunta "¿estoy listo para operar en real?" no se responde con sensaciones ("me siento preparado") sino con evidencia. El protocolo RIC convierte la decisión en un checklist binario: cada punto se cumple o no se cumple, y con uno solo sin cumplir, la respuesta es todavía no. Esto te protege del peor error de timing del trading: llegar a real por ansiedad en lugar de por mérito.</p>
<h4>Bloque 1 · Sistema validado</h4>
<ul>
<li>Backtest completado: 200+ muestras, costos incluidos, expectancy positiva y profit factor mayor a 1,3.</li>
<li>Forward test completado: 50–100 operaciones en demo con reglas congeladas, expectancy positiva y degradación razonable frente al backtest.</li>
<li>Conoces de memoria los números de tu sistema: winrate, ratio medio, racha máxima esperable y el drawdown que produciría.</li>
</ul>
<h4>Bloque 2 · Ejecución demostrada</h4>
<ul>
<li>Tasa de cumplimiento del 90%+ sostenida durante el forward test.</li>
<li>Diario de trading al día: 100% de las operaciones registradas en los últimos 3 meses.</li>
<li>Rutinas pre y post mercado ejecutadas como hábito, no como excepción.</li>
<li>Al menos una racha perdedora atravesada en demo SIN romper reglas: si el mercado aún no te dio la prueba, espérala; es el examen más importante.</li>
</ul>
<h4>Bloque 3 · Plan y protocolos escritos</h4>
<ul>
<li>Documento maestro versión 1.0 firmado y fechado, con hoja de batalla impresa.</li>
<li>Protocolos de emergencia (límite diario 3%, pausa tras 2 pérdidas, umbrales de drawdown 5/10/15%) escritos y, donde sea posible, configurados en la plataforma.</li>
<li>Sección de escenarios completa: técnicos, estadísticos y personales.</li>
</ul>
<h4>Bloque 4 · Economía personal en orden</h4>
<ul>
<li>El capital destinado a real es 100% dinero de riesgo: perderlo completo no afecta tu vivienda, salud, deudas ni obligaciones familiares.</li>
<li>Colchón de emergencia constituido (mínimo 6 meses de esenciales) y separado del trading.</li>
<li>Cero necesidad de que el trading genere ingresos este año: sin esa presión, tu sistema puede respirar.</li>
</ul>
<h4>Aplicación práctica</h4>
<p>Imprime el checklist y márcalo con honestidad brutal. El error común es el autoengaño en el bloque 2: "cumplí el 90%... quitando esa semana mala". No hay asteriscos: la semana mala también cuenta, porque en real también contará. Si hoy te faltan puntos, ya sabes exactamente qué construir: eso es un regalo, no un rechazo.</p>`,
    claves: [
      "Decisión por checklist binario, no por sensaciones",
      "200 muestras de backtest + 50–100 de forward + 90% cumplimiento",
      "Una racha perdedora superada en demo es requisito, no anécdota",
      "Capital 100% de riesgo, colchón aparte, cero presión de ingreso",
    ],
  };

  L["3-6-1"] = {
    resumen: "Las primeras 30 operaciones en real se hacen con capital reducido y riesgo del 0,5%: su objetivo no es ganar dinero, es calibrar tu ejecución con dinero real en juego.",
    duracionVideo: "8–10 min",
    lectura: `<p>Aprobaste el checklist. La tentación ahora es fondear la cuenta completa y "empezar en serio". El protocolo RIC dice otra cosa: las primeras 30 operaciones en real son una fase de calibración con capital reducido, porque hay una variable que ninguna demo pudo medir del todo: tú, con dinero de verdad en la pantalla. Esta fase compra esa información al precio más barato posible.</p>
<h4>Las reglas de la fase 30</h4>
<ol>
<li><strong>Capital reducido:</strong> fondea entre el 25% y el 50% del capital que destinarás al trading. Si tu capital de riesgo total es 2.000 USD, empieza con 500–1.000.</li>
<li><strong>Riesgo al 0,5%:</strong> la mitad de tu riesgo estándar. Con 1.000 USD, son 5 USD por operación. Sí, las ganancias serán pequeñas: perfecto, porque el objetivo de esta fase no es la ganancia.</li>
<li><strong>El mismo sistema, exactamente:</strong> mismos setups, mismos horarios, mismas rutinas del forward test. La única variable nueva debe ser el dinero real; si cambias algo más, no sabrás qué estás midiendo.</li>
<li><strong>Registro reforzado:</strong> a tu diario habitual agrégale una medición explícita por operación: ¿sentí diferencia respecto a demo? ¿dudé donde antes no dudaba? ¿cerré antes de tiempo? Esta es la data que viniste a buscar.</li>
</ol>
<h4>Qué esperar (para que no te sorprenda)</h4>
<p>Es normal y está documentado en la experiencia de miles de traders: las primeras operaciones en real duelen más, las manos dudan, las ganadoras se cierran antes y el winrate baja unos puntos respecto a demo. No significa que el sistema falló: significa que tu sistema nervioso está recalibrando la relación con el riesgo. La fase 30 existe precisamente para atravesar esa recalibración con 5 USD en juego y no con 50.</p>
<h4>Los criterios de graduación</h4>
<p>Al completar las 30 operaciones, evalúa:</p>
<ul>
<li>Cumplimiento del plan: 90%+ (la métrica decisiva, igual que siempre).</li>
<li>Expectancy: puede ser algo menor que en forward test, pero no desplomada ni negativa por ejecución rota.</li>
<li>Protocolos respetados: si hubo límite diario o pausa, ¿se ejecutaron sin negociar?</li>
</ul>
<p>Si apruebas: sube el riesgo a 1% durante las siguientes 30, y después completa el fondeo. Si el cumplimiento cayó por debajo del 80%: vuelve a demo dos semanas sin drama, trabaja el módulo de psicotrading y reintenta. No es un fracaso: es el protocolo funcionando.</p>
<h4>Error común</h4>
<p>Considerar la fase 30 un trámite y saltarla "porque la demo ya lo probó todo". La demo probó tu sistema; la fase 30 te prueba a ti. Son exámenes distintos, y el segundo es el que quiebra cuentas cuando no se rinde.</p>`,
    claves: [
      "25–50% del capital, riesgo al 0,5%: calibración, no ganancia",
      "Única variable nueva: el dinero real; todo lo demás idéntico",
      "Winrate algo menor que en demo es normal al principio",
      "Graduación: 30 trades con 90%+ de cumplimiento",
    ],
  };

  L["3-6-2"] = {
    resumen: "Con dinero real, el cerebro procesa cada fluctuación como ganancia o pérdida real: por eso duele distinto. Herramientas: pensar en R, despersonalizar la pérdida y proteger la rutina.",
    duracionVideo: "8–10 min",
    lectura: `<p>Nadie te avisó que la diferencia entre demo y real no está en el mercado (los gráficos son idénticos) sino en tu cabeza. Con dinero real, la aversión a la pérdida que estudiaste en psicotrading deja de ser teoría: cada tick en contra es dinero tuyo, procesado por el mismo circuito cerebral que procesa las amenazas físicas. Entender qué cambia exactamente te permite gestionarlo en lugar de padecerlo.</p>
<h4>Qué cambia, concretamente</h4>
<ul>
<li><strong>La unidad mental:</strong> en demo pensabas en puntos; en real piensas "esos 10 USD eran una cena". Convertir cada fluctuación a bienes de consumo multiplica el dolor y sabotea la ejecución.</li>
<li><strong>El horizonte:</strong> en demo evaluabas por semanas; en real, la tentación es evaluar cada operación, cada minuto. La muestra chica vuelve a dominar tu percepción.</li>
<li><strong>La identidad:</strong> una pérdida real se siente como un juicio personal ("soy malo para esto"), no como un costo operativo. De ahí a la revancha hay un paso.</li>
</ul>
<h4>Las tres herramientas</h4>
<ol>
<li><strong>Piensa y habla en R.</strong> Desde hoy, tus resultados se expresan en múltiplos de riesgo: "perdí 1R", "gané 2,3R", nunca en cenas ni en dólares durante la operativa. La R es neutra, comparable y desactiva la conversión emocional. Tu diario, tu revisión semanal y tu lenguaje interno: todo en R. (El dinero se mira una vez al mes, en la auditoría.)</li>
<li><strong>Despersonaliza la pérdida: es el costo del inventario.</strong> Un comerciante que compra mercadería sabe que parte no se venderá: es costo del negocio, presupuestado. Tus pérdidas al 1% son exactamente eso: el costo de estar en el negocio de cobrar tu expectancy. Frase de anclaje para el diario: "pérdida planificada, dentro de presupuesto". Solo son errores las operaciones fuera de plan, ganen o pierdan.</li>
<li><strong>Protege la rutina como infraestructura crítica.</strong> Bajo estrés nuevo, lo primero que el cerebro quiere recortar es la estructura (checklist, pausas, diario) justo cuando más la necesitas. En tus primeros meses en real, la rutina no es negociable ni un solo día: es el andamio que sostiene la ejecución mientras tu sistema nervioso termina de recalibrar.</li>
</ol>
<h4>La señal de alarma que no debes ignorar</h4>
<p>Si notas que evitas mirar la cuenta, que ocultas resultados a tu entorno o que el trading te roba el sueño de forma sostenida, no es debilidad: es una señal de que el tamaño de riesgo supera tu tolerancia actual. La respuesta profesional es mecánica: baja el riesgo a la mitad hasta que puedas ejecutar con neutralidad, y sube de nuevo gradualmente. Se opera del tamaño que te deja dormir.</p>
<h4>Error común</h4>
<p>Fingir que no pasa nada. La transición emocional al dinero real es universal: los profesionales no la evitan, la gestionan con herramientas. Negarla solo garantiza vivirla sin ellas.</p>`,
    claves: [
      "Resultados siempre en R; el dinero se mira una vez al mes",
      "La pérdida planificada es costo de inventario, no error",
      "La rutina es innegociable justo cuando quieres recortarla",
      "Si te roba el sueño, el tamaño es demasiado: baja el riesgo",
    ],
  };

  L["3-6-3"] = {
    resumen: "La certificación del Nivel C tiene dos partes: el examen de conocimientos y la defensa oral de tu plan de trading con tus propios números. Se aprueba demostrando, no recitando.",
    duracionVideo: "6–8 min",
    lectura: `<p>Llegaste al cierre del nivel decisivo del programa F.O.C.U.S. La certificación del Nivel C no mide si memorizaste definiciones: mide si puedes sostener una operativa real con números propios y decisiones justificadas. Por eso tiene dos componentes, y el segundo es el que importa.</p>
<h4>Componente 1 · Examen de conocimientos</h4>
<p>Preguntas de opción múltiple sobre los siete módulos del nivel: gestión de riesgo matemática, psicotrading, economía personal, estadística aplicada, construcción de sistemas, plan de trading y transición a real. Incluye cálculos del tipo que ya dominas: position sizing con datos concretos, esperanza matemática de un historial, winrate de equilibrio para un ratio dado, probabilidad de una racha. Si trabajaste las lecciones con calculadora en mano, este componente es un trámite. Si las leíste sin calcular, se nota en la tercera pregunta.</p>
<h4>Componente 2 · Defensa de tu plan de trading</h4>
<p>Presentas tu documento maestro ante un mentor RIC (o ante tu grupo de cohorte) en una sesión de 20–30 minutos. La estructura de la defensa:</p>
<ol>
<li><strong>Tu sistema en 3 minutos:</strong> hipótesis de edge, los cuatro bloques, y por qué crees que el mercado te paga por esto.</li>
<li><strong>Tus números:</strong> resultados del backtest (muestras, expectancy, PF, racha máxima) y del forward test (cumplimiento, degradación observada). Números reales de TU trabajo: la defensa con datos inventados o ajenos es la única forma de reprobar sin apelación.</li>
<li><strong>Tu gestión de riesgo:</strong> del 1% al protocolo de drawdown, con la matemática que la respalda.</li>
<li><strong>Preguntas de estrés:</strong> el evaluador desafía tu plan con escenarios: "vas 9 pérdidas seguidas, ¿qué haces y por qué?", "¿por qué 1% y no 3%?", "¿qué mataría tu edge?". No se espera perfección: se espera que cada respuesta salga de tu plan escrito y no de la improvisación.</li>
</ol>
<h4>Qué se evalúa realmente</h4>
<p>Coherencia (tus números justifican tus reglas), honestidad estadística (muestras suficientes, sin métricas maquilladas), y protocolos operables (límites concretos, no intenciones). Un plan modesto, validado y coherente aprueba; un plan espectacular sin evidencia, no.</p>
<h4>Cómo prepararte esta semana</h4>
<ol>
<li>Repasa los cálculos clave de cada módulo con ejemplos numéricos propios.</li>
<li>Ensaya la defensa en voz alta, cronometrada, al menos dos veces.</li>
<li>Pide a un colega de cohorte que te haga las preguntas de estrés sin avisarte cuáles.</li>
</ol>
<p>Aprobar te certifica para el protocolo de paso a real con acompañamiento RIC. Y algo más valioso: te deja un plan que sobrevivió a su primer escrutinio externo. Ese documento, con tus números y tu firma, es la diferencia entre tener un sistema y ser un trader consistente.</p>`,
    claves: [
      "Dos partes: examen de módulos + defensa oral del plan",
      "Se defiende con números propios de backtest y forward test",
      "Las preguntas de estrés se responden desde el plan escrito",
      "Plan modesto y validado aprueba; espectacular sin evidencia, no",
    ],
  };

  /* ============ EXAMEN · Nivel 3 ============ */

  const EX = (window.RIC_EXAMENES = window.RIC_EXAMENES || {});
  EX[3] = [
    {
      q: "Tu cuenta es de 2.000 USD y arriesgas el 1% por operación. Tu stop en EURUSD está a 25 pips y el microlote (0,01) vale 0,10 USD por pip. ¿Qué tamaño de posición corresponde?",
      opciones: ["0,04 lotes", "0,20 lotes", "0,08 lotes", "0,10 lotes"],
      correcta: 2,
    },
    {
      q: "Un sistema gana el 40% de las veces con ganancia media de 30 USD y pierde el 60% con pérdida media de 15 USD. ¿Cuál es su esperanza matemática por operación?",
      opciones: ["+3 USD", "+12 USD", "−3 USD", "+9 USD"],
      correcta: 0,
    },
    {
      q: "Si tu cuenta cae un 25% desde su máximo, ¿qué porcentaje de ganancia necesitas para recuperar ese máximo?",
      opciones: ["25%", "33,3%", "20%", "50%"],
      correcta: 1,
    },
    {
      q: "Con un ratio R de 2:1 (ganas 2 por cada 1 que arriesgas), ¿cuál es el winrate mínimo para no perder dinero?",
      opciones: ["50%", "40%", "25%", "33,3%"],
      correcta: 3,
    },
    {
      q: "Después de 6 pérdidas consecutivas con un sistema de winrate 50%, ¿cuál es la probabilidad de que la próxima operación sea ganadora?",
      opciones: [
        "Mucho mayor al 50%, porque 'ya toca' una ganadora",
        "Menor al 50%, porque el sistema está en mala racha",
        "50%, porque cada operación es independiente",
        "Depende de cuántas operaciones falten para completar 10",
      ],
      correcta: 2,
    },
    {
      q: "Detectas que tras cada pérdida sientes urgencia de entrar de nuevo 'para recuperar'. Según el protocolo anti revenge-trading, ¿cuál es la respuesta correcta?",
      opciones: [
        "Subir el tamaño en la siguiente entrada válida para recuperar más rápido",
        "Cerrar la plataforma de inmediato y respetar el límite de pérdida diaria del 3%",
        "Cambiar de activo para cortar la mala racha",
        "Seguir operando pero con stops más amplios para no ser barrido",
      ],
      correcta: 1,
    },
    {
      q: "Tu costo de vida es de 1.000 USD mensuales y aplicas un margen de seguridad de 1,5. Con un retorno sostenible del 30% anual, ¿qué capital aproximado necesitas para vivir del trading?",
      opciones: ["20.000 USD", "36.000 USD", "90.000 USD", "60.000 USD"],
      correcta: 3,
    },
    {
      q: "En un backtest, tu sistema muestra profit factor de 4, winrate de 85% y solo funciona con parámetros muy específicos que, al variarlos un poco, arruinan el resultado. ¿Cuál es el diagnóstico más probable?",
      opciones: [
        "Sobreajuste (overfitting): el sistema memorizó el pasado",
        "Un edge excepcional que hay que llevar a real cuanto antes",
        "Falta de muestras: hay que testear otros activos",
        "Un problema del broker con los datos históricos",
      ],
      correcta: 0,
    },
    {
      q: "Según el protocolo RIC de paso a cuenta real, ¿cuáles son los requisitos mínimos de validación del sistema?",
      opciones: [
        "50 operaciones de backtest y un mes de demo con resultado positivo",
        "Un mes ganador en demo y el plan de trading escrito",
        "Backtest de 200+ muestras con costos y forward test de 50–100 operaciones con 90%+ de cumplimiento",
        "Backtest de 100 muestras sin costos y sensación de estar preparado",
      ],
      correcta: 2,
    },
    {
      q: "En tu revisión semanal encuentras una operación fuera del plan que terminó en ganancia. ¿Cómo debe tratarse según la metodología del Nivel 3?",
      opciones: [
        "Como un acierto: el resultado positivo valida la decisión",
        "Como un problema serio: refuerza malos hábitos con premio incluido",
        "Como neutra: no afecta la estadística del sistema",
        "Como señal de que el plan es demasiado restrictivo y debe ampliarse",
      ],
      correcta: 1,
    },
    /* ---- Preguntas por lección ---- */
    {
      q: "Un trader arriesga 5% por operación y encadena 10 pérdidas seguidas, quedando con un drawdown cercano al 40%. ¿Qué ilustra mejor esta situación?",
      opciones: [
        "Que necesita ganar 40% para recuperar, algo alcanzable en pocos meses",
        "Que tuvo mala suerte: con 5% de riesgo esa racha es casi imposible",
        "La asimetría de la pérdida: ahora necesita ganar cerca del 67% solo para empatar",
        "Que debe subir el riesgo al 10% para acelerar la recuperación",
      ],
      correcta: 2,
      leccion: "3-0-0",
    },
    {
      q: "Antes de operar, un trader decide que abrirá 0,50 lotes 'porque quiere ganancias que se sientan' y recién después busca dónde poner el stop. ¿Qué está haciendo mal?",
      opciones: [
        "Invierte la lógica profesional: primero se define cuánto perder y de ahí se deriva el tamaño",
        "Nada, siempre que el stop quede en un nivel técnico válido",
        "Debería elegir un lote aún mayor para compensar el spread",
        "Su error es usar lotes en vez de microlotes, no el orden de la decisión",
      ],
      correcta: 0,
      leccion: "3-0-0",
    },
    {
      q: "Un trader gana el 70% de sus operaciones pero su cuenta cae mes a mes. Según la lección de esperanza matemática, ¿cuál es la explicación más probable?",
      opciones: [
        "Su broker le cobra comisiones ocultas que anulan las ganancias",
        "Sus pérdidas medias son tan grandes que su esperanza matemática es negativa pese al winrate alto",
        "Está operando en horarios de baja liquidez",
        "Es imposible: con 70% de aciertos la cuenta siempre crece",
      ],
      correcta: 1,
      leccion: "3-0-1",
    },
    {
      q: "Tu esperanza matemática es de +5 USD por operación y ejecutas unas 20 operaciones al mes. ¿Qué puedes proyectar con esos datos?",
      opciones: [
        "Ganar exactamente 100 USD cada mes, sin variación",
        "Nada: la esperanza matemática no permite proyecciones",
        "Duplicar la cuenta en un año si mantienes el ritmo",
        "Una expectativa promedio de +100 USD mensuales, con variación entre meses",
      ],
      correcta: 3,
      leccion: "3-0-1",
    },
    {
      q: "Operas un sistema con winrate del 50% unas 300 veces al año. ¿Cómo debes tratar una racha de 7 u 8 pérdidas seguidas?",
      opciones: [
        "Como parte normal y esperable del juego, prevista en tu gestión de riesgo",
        "Como prueba de que el sistema dejó de funcionar y hay que cambiarlo",
        "Como señal de manipulación del mercado en tu contra",
        "Como un evento casi imposible que amerita cerrar la cuenta",
      ],
      correcta: 0,
      leccion: "3-0-2",
    },
    {
      q: "Un trader pierde el 57% de su cuenta y, aunque le queda dinero, abandona el trading rompiendo todas sus reglas. ¿Qué concepto de la lección describe esto?",
      opciones: [
        "Un drawdown recuperable con disciplina",
        "La falacia del jugador",
        "La ruina operativa: el punto de abandono, aunque la cuenta no llegue a cero",
        "Un evento de cola imposible de prever",
      ],
      correcta: 2,
      leccion: "3-0-2",
    },
    {
      q: "Tu análisis exige mover el stop de 20 a 40 pips para respetar la estructura, y quieres mantener tu riesgo del 1%. ¿Qué haces con el tamaño de la posición?",
      opciones: [
        "Lo mantienes igual: el riesgo lo define el stop, no el lote",
        "Lo duplicas para aprovechar el recorrido mayor",
        "Cancelas la operación: un stop de 40 pips siempre es demasiado riesgo",
        "Lo reduces a la mitad: el riesgo en dinero queda constante",
      ],
      correcta: 3,
      leccion: "3-0-3",
    },
    {
      q: "Quieres arriesgar 20 USD en una acción que compras a 50 USD con stop en 46 (4 USD de riesgo por acción). ¿Cuántas acciones operas?",
      opciones: ["10 acciones", "5 acciones", "20 acciones", "12 acciones"],
      correcta: 1,
      leccion: "3-0-3",
    },
    {
      q: "Tu cuenta pasó de 1.000 a 1.200 USD (nuevo máximo) y luego cayó a 1.080. ¿Cuál es tu drawdown actual?",
      opciones: [
        "8%, medido desde el depósito inicial",
        "No hay drawdown: sigues en ganancia respecto al depósito",
        "10%, medido desde el máximo de la cuenta",
        "12%, medido desde el máximo de la cuenta",
      ],
      correcta: 2,
      leccion: "3-0-4",
    },
    {
      q: "Tu cuenta entra en un drawdown del 10%. Según el protocolo profesional de gestión de DD, ¿cuál es la acción correcta?",
      opciones: [
        "Reducir el riesgo por operación a la mitad y seguir ejecutando el sistema",
        "Aumentar el tamaño para recuperar el máximo más rápido",
        "Pausar de inmediato una semana y auditar todo el sistema",
        "Cambiar de sistema: un drawdown del 10% invalida la estrategia",
      ],
      correcta: 0,
      leccion: "3-0-4",
    },
    {
      q: "Ves una vela enorme alcista en un activo que sigues y sientes que 'se va sin ti', pero tu sistema no dio señal. ¿Qué dicta el antídoto contra el FOMO?",
      opciones: [
        "Entrar con la mitad del tamaño para no quedarte totalmente afuera",
        "No entrar: si el movimiento arrancó sin darte entrada, esa operación nunca fue tuya",
        "Entrar con un stop muy ajustado por si el impulso se agota",
        "Esperar la siguiente vela y entrar si sigue subiendo",
      ],
      correcta: 1,
      leccion: "3-1-0",
    },
    {
      q: "Llevas cinco ganadoras seguidas, sientes que 'ya le agarraste la mano' y piensas duplicar el tamaño. ¿Qué dice la lección sobre esto?",
      opciones: [
        "Es correcto: las rachas ganadoras deben aprovecharse con más tamaño",
        "Es correcto solo si la sexta operación tiene un setup perfecto",
        "Es exceso de confianza, pero puedes subir el riesgo si lo decides durante la sesión",
        "Es exceso de confianza: el tamaño lo fija la fórmula y los cambios se deciden en frío con datos de 50+ operaciones",
      ],
      correcta: 3,
      leccion: "3-1-0",
    },
    {
      q: "Acabas de cerrar una operación, ganadora o perdedora. Según el protocolo del ciclo emocional, ¿qué corresponde hacer antes de abrir otra?",
      opciones: [
        "Una pausa mínima de 15 minutos para dejar pasar la euforia o el dolor",
        "Buscar de inmediato el siguiente setup mientras el análisis está fresco",
        "Revisar el resultado en dinero para decidir el tamaño siguiente",
        "Cambiar de activo para empezar con la mente limpia",
      ],
      correcta: 0,
      leccion: "3-1-1",
    },
    {
      q: "Tu sistema tiene esperanza positiva, pero tu tasa de cumplimiento del plan es del 60%. ¿Cuál es el diagnóstico correcto?",
      opciones: [
        "El sistema es el problema: hay que re-optimizarlo",
        "Es aceptable: lo que importa es que el mes cierre en positivo",
        "No estás operando tu sistema: estás operando tus emociones con el logo de tu sistema",
        "Necesitas más operaciones para que el cumplimiento suba solo",
      ],
      correcta: 2,
      leccion: "3-1-1",
    },
    {
      q: "En plena sesión te descubres pensando 'el mercado me la debe, esta va con todo'. Según el protocolo anti-revenge, ¿qué corresponde?",
      opciones: [
        "Reducir el tamaño a la mitad y seguir operando con cautela",
        "Anotar la frase en el diario y continuar con el plan",
        "Tomar una pausa de 5 minutos y volver si te sientes mejor",
        "Cerrar la plataforma en ese instante: esas frases son el síntoma del secuestro emocional",
      ],
      correcta: 3,
      leccion: "3-1-2",
    },
    {
      q: "Tu sistema genera 1–3 setups válidos por día y hoy llevas 6 operaciones, las últimas por puro aburrimiento. ¿Qué herramienta ataca este problema de raíz?",
      opciones: [
        "Operar solo por la tarde, cuando hay más volatilidad",
        "Un cupo máximo de operaciones diarias definido por tu sistema",
        "Subir el riesgo por trade para que cada operación importe más",
        "Agregar un segundo sistema para tener más señales legítimas",
      ],
      correcta: 1,
      leccion: "3-1-2",
    },
    {
      q: "En tu chequeo personal pre-mercado te calificas con 2 sobre 5: dormiste mal y estás enojado por una discusión. ¿Qué dicta la rutina?",
      opciones: [
        "Operar igual: la disciplina es ejecutar todos los días",
        "Operar solo la primera hora y evaluar cómo te sientes",
        "No operar hoy o reducir el riesgo a la mitad: te sacas del partido si no estás en condiciones",
        "Meditar 10 minutos y operar con el tamaño habitual",
      ],
      correcta: 2,
      leccion: "3-1-3",
    },
    {
      q: "La rutina pre-mercado pide escribir 'si el precio llega a X y forma mi setup, entro con stop en Y'. ¿Por qué escenarios condicionales y no predicciones?",
      opciones: [
        "Porque no necesitas saber qué hará el mercado, solo qué harás tú en cada caso",
        "Porque las predicciones correctas generan exceso de confianza",
        "Porque los escenarios garantizan más operaciones ganadoras",
        "Porque predecir el mercado está prohibido por los brokers regulados",
      ],
      correcta: 0,
      leccion: "3-1-3",
    },
    {
      q: "Durante tus 10 minutos de meditación, la mente se distrae decenas de veces. ¿Cómo interpreta esto la lección?",
      opciones: [
        "Es señal de que la meditación no es para ti",
        "Es el ejercicio funcionando: cada 'notar y volver' es una flexión del músculo atencional",
        "Debes alargar la sesión a 30 minutos hasta lograr la mente en blanco",
        "Debes cambiar a una técnica guiada con música",
      ],
      correcta: 1,
      leccion: "3-1-4",
    },
    {
      q: "Acabas de sufrir una pérdida y notas la activación subiendo. ¿Qué herramienta inmediata propone la lección antes de decidir nada?",
      opciones: [
        "Salir a correr 30 minutos para descargar la energía",
        "Revisar el gráfico en un marco menor para entender qué pasó",
        "Tomar café y volver cuando estés más alerta",
        "Doble inhalación por la nariz y exhalación larga por la boca, dos o tres veces",
      ],
      correcta: 3,
      leccion: "3-1-4",
    },
    {
      q: "Según el sistema de dos cuentas, ¿de dónde deben salir tus gastos esenciales (vivienda, comida, salud)?",
      opciones: [
        "De ingresos estables o del colchón, nunca de las ganancias esperadas del trading",
        "De los retiros del trading, siempre que el mes haya sido positivo",
        "Mitad de ingresos estables y mitad de retiros del trading",
        "De la tarjeta de crédito en los meses flacos, saldada en los buenos",
      ],
      correcta: 0,
      leccion: "3-2-0",
    },
    {
      q: "Retiraste del trading 500, 200, 0, 700, 400 y 300 USD en seis meses. Según la lección, ¿qué haces con esos retiros?",
      opciones: [
        "Gastarlos el mes en que llegan, ya que son ganancia realizada",
        "Reinvertirlos completos en la cuenta de trading para componer",
        "Depositarlos en el fondo regulador y pagarte desde ahí un sueldo fijo conservador (por ejemplo, 250 USD/mes)",
        "Guardarlos hasta fin de año y gastarlos como aguinaldo",
      ],
      correcta: 2,
      leccion: "3-2-0",
    },
    {
      q: "Tienes una cuenta de 5.000 USD y necesitas 1.000 USD al mes para vivir. Según la ecuación de la lección, ¿cuál es tu objetivo correcto hoy?",
      opciones: [
        "Apuntar a un 20% mensual para cubrir el costo de vida",
        "Renunciar al empleo y dedicarte por completo para acelerar la curva",
        "Apalancarte más para que el capital chico rinda como uno grande",
        "Construir historial y capital sin presión: esa cuenta no puede pagar tu vida todavía",
      ],
      correcta: 3,
      leccion: "3-2-1",
    },
    {
      q: "Costo de vida de 1.000 USD mensuales, margen de seguridad de 1,5 y retorno sostenible del 20% anual. ¿Qué capital aproximado necesitas para vivir del trading?",
      opciones: ["60.000 USD", "90.000 USD", "36.000 USD", "18.000 USD"],
      correcta: 1,
      leccion: "3-2-1",
    },
    {
      q: "Vives en un país con inflación anual del 25% y mantienes tus ahorros en moneda local sin operar. ¿Qué dice la lección sobre tu situación?",
      opciones: [
        "No pierdes nada mientras no conviertas el dinero",
        "Pierdes solo si además el tipo de cambio oficial se devalúa",
        "Sufres un drawdown real cercano al 20% sin haber operado nunca",
        "Ganas estabilidad porque evitas el riesgo del mercado",
      ],
      correcta: 2,
      leccion: "3-2-2",
    },
    {
      q: "Un trader espera 'a que baje el dólar' para dolarizar sus excedentes; otro convierte un porcentaje fijo de cada ingreso por vías formales. ¿Quién actúa según la lección?",
      opciones: [
        "El segundo: la dolarización es un seguro sistemático, por regla y sin opinar del precio",
        "El primero: comprar caro destruye el propósito de la cobertura",
        "Ninguno: dolarizar es especulación y debe evitarse",
        "Ambos: cualquier forma de dolarizar es equivalente",
      ],
      correcta: 0,
      leccion: "3-2-2",
    },
    {
      q: "Tus gastos esenciales son 800 USD al mes y tus ingresos son mayormente variables. ¿Cómo debe ser tu colchón de emergencia?",
      opciones: [
        "4.800 USD invertidos en acciones de dividendos para que rindan",
        "Cerca de 9.600 USD (12 meses), líquido, en moneda dura y en instrumentos aburridos",
        "2.400 USD dentro de la cuenta de trading, listos para usar",
        "No necesitas colchón si tu sistema tiene esperanza positiva",
      ],
      correcta: 1,
      leccion: "3-2-3",
    },
    {
      q: "La lección dice que un seguro es una operación de esperanza matemática negativa que igual se compra. ¿Por qué?",
      opciones: [
        "Porque la ley obliga a contratarlos en la mayoría de los países",
        "Porque a largo plazo los seguros terminan siendo rentables",
        "Porque su costo se recupera con los reclamos menores",
        "Porque elimina la ruina: la misma lógica del stop y el position sizing",
      ],
      correcta: 3,
      leccion: "3-2-3",
    },
    {
      q: "Pruebas un sistema con esperanza positiva y las primeras 10 operaciones dan 3 ganadas y 7 perdidas. ¿Qué corresponde concluir?",
      opciones: [
        "Nada todavía: con 10 trades el azar domina y ese resultado es estadísticamente normal",
        "El sistema no funciona: 30% de aciertos lo demuestra",
        "El sistema funciona pero tu ejecución falla",
        "Hay que invertir las señales: si perdió 7, invertido gana 7",
      ],
      correcta: 0,
      leccion: "3-3-0",
    },
    {
      q: "En redes ves una cuenta que publica '9 ganadas de 10' y decides copiar su sistema. ¿Qué error estadístico estás cometiendo?",
      opciones: [
        "La falacia del jugador: crees que su racha continuará",
        "Ninguno: 90% de aciertos es evidencia suficiente",
        "Sesgo de supervivencia: con miles publicando, siempre habrá rachas espectaculares por puro azar",
        "Error de correlación: su activo no es el tuyo",
      ],
      correcta: 2,
      leccion: "3-3-0",
    },
    {
      q: "Un sistema acierta el 60% de las veces con ratio 0,5:1 (arriesga 10 para ganar 5). ¿Es rentable?",
      opciones: [
        "Sí: cualquier winrate mayor al 50% es rentable",
        "Sí, pero solo si opera más de 100 veces al mes",
        "No se puede saber sin conocer el capital de la cuenta",
        "No: su umbral de equilibrio es 66,7% y está por debajo",
      ],
      correcta: 3,
      leccion: "3-3-1",
    },
    {
      q: "Decides alejar tu take profit para pasar de ratio 2:1 a 4:1. Según la lógica de los vasos comunicantes, ¿qué debes esperar?",
      opciones: [
        "El winrate se mantiene y la expectancy se duplica",
        "El precio llegará menos veces al objetivo: tu winrate bajará",
        "El winrate subirá porque el objetivo más lejano da más margen",
        "El ratio no afecta al winrate: son variables independientes",
      ],
      correcta: 1,
      leccion: "3-3-1",
    },
    {
      q: "Tu plan dice que tu sistema producirá rachas de hasta 8 pérdidas. Hoy llevas 6 seguidas y sientes pánico. ¿Cuál es la lectura correcta?",
      opciones: [
        "El sistema entró en degradación: pausa y auditoría inmediata",
        "Aumenta el tamaño: tras 6 pérdidas ya toca una ganadora",
        "Funcionamiento normal dentro de lo esperable: sigues ejecutando el plan",
        "Reduce el stop a la mitad para cortar la racha",
      ],
      correcta: 2,
      leccion: "3-3-2",
    },
    {
      q: "Tu sistema predice rachas máximas de ~8 pérdidas y acumulas 16 seguidas. Según la lección, ¿qué corresponde?",
      opciones: [
        "Pausar y auditar: la racha excede con claridad lo esperable para tu sistema",
        "Continuar igual: ninguna racha justifica revisar el sistema",
        "Duplicar el riesgo para recuperar cuando la racha revierta",
        "Cambiar de activo conservando las mismas reglas",
      ],
      correcta: 0,
      leccion: "3-3-2",
    },
    {
      q: "En 100 operaciones, tus ganadoras sumaron 1.800 USD y tus perdedoras 1.200 USD. ¿Cuál es tu profit factor y su lectura?",
      opciones: [
        "0,67: sistema perdedor",
        "1,5: por cada dólar perdido recuperaste 1,50; un sistema viable a sólido",
        "3,0: sospecha inmediata de sobreajuste",
        "600: la diferencia entre ganancias y pérdidas",
      ],
      correcta: 1,
      leccion: "3-3-3",
    },
    {
      q: "Dos sistemas rinden 30% anual: uno con oscilaciones suaves y otro con vaivenes de ±15% mensual. ¿Qué dice el ratio de Sharpe sobre ellos?",
      opciones: [
        "Son equivalentes: mismo retorno, mismo Sharpe",
        "El volátil tiene mejor Sharpe porque asume más riesgo",
        "El Sharpe no aplica a sistemas de trading, solo a fondos",
        "El estable tiene mejor Sharpe: mismo destino, viaje más predecible y ejecutable",
      ],
      correcta: 3,
      leccion: "3-3-3",
    },
    {
      q: "Un trader define su entrada como 'cuando el precio se vea fuerte'. Según la anatomía del sistema, ¿cuál es el problema?",
      opciones: [
        "No es un gatillo verificable: dos personas ante el mismo gráfico no llegarían a la misma conclusión",
        "Es un gatillo válido si el trader tiene experiencia",
        "Le falta un indicador que confirme la fuerza",
        "El problema está en el contexto, no en el gatillo",
      ],
      correcta: 0,
      leccion: "3-4-0",
    },
    {
      q: "Según la anatomía de un sistema, ¿qué bloque define tu ratio R y suele importar más que la entrada?",
      opciones: ["El contexto", "El gatillo", "La salida", "El position sizing"],
      correcta: 2,
      leccion: "3-4-0",
    },
    {
      q: "En el formato RIC de hipótesis de edge, ¿qué elemento separa la ciencia de la superstición?",
      opciones: [
        "La observación inicial del patrón",
        "El porqué plausible del movimiento",
        "La predicción de winrate esperado",
        "El criterio de refutación: definir de antemano qué resultado mataría la hipótesis",
      ],
      correcta: 3,
      leccion: "3-4-1",
    },
    {
      q: "¿Cuál de las siguientes es una ventaja (edge) retail real según la lección?",
      opciones: [
        "Un indicador con parámetros ajustados que dio 3 semanas buenas",
        "La paciencia estructural: poder esperar días sin operar, algo que los fondos con mandato no siempre pueden",
        "La sensación entrenada de 'leer el mercado'",
        "Operar muchos activos a la vez para diversificar señales",
      ],
      correcta: 1,
      leccion: "3-4-1",
    },
    {
      q: "¿Por qué el backtesting formal exige avanzar vela a vela en lugar de mirar el gráfico completo?",
      opciones: [
        "Porque las plataformas procesan mejor los datos en modo replay",
        "Porque así se acumulan más muestras por hora de trabajo",
        "Porque viendo el gráfico completo tu ojo 'sabe' qué pasó después y encuentra señales que en vivo jamás habrías visto",
        "Porque los datos históricos antiguos solo son confiables vela a vela",
      ],
      correcta: 2,
      leccion: "3-4-2",
    },
    {
      q: "Un backtest de scalping muestra expectancy de +0,15R sin incluir spread ni comisiones. ¿Cuál es el riesgo según la lección?",
      opciones: [
        "Que el sistema muera entero al incluir los costos: es la trampa número uno de los backtests brillantes",
        "Ninguno: los costos se compensan con el slippage positivo",
        "Que el broker no permita operar ese sistema en real",
        "Que la expectancy real sea el doble y estés subestimando el sistema",
      ],
      correcta: 0,
      leccion: "3-4-2",
    },
    {
      q: "Tu backtest aprobó con 200 muestras. ¿Qué mide el forward testing que el backtest no puede medir?",
      opciones: [
        "La esperanza matemática del sistema en el histórico",
        "A ti ejecutando en vivo: cumplimiento, fricciones reales y ejecutabilidad con tu horario",
        "El profit factor con mayor precisión estadística",
        "El comportamiento del sistema en crisis históricas",
      ],
      correcta: 1,
      leccion: "3-4-3",
    },
    {
      q: "A mitad del forward test se te ocurre una mejora clara para una regla. ¿Qué dicta el protocolo?",
      opciones: [
        "Aplicarla ya: retrasar mejoras es perder dinero",
        "Aplicarla solo si el sistema va perdiendo",
        "Consultarla con tu cohorte y aplicarla si están de acuerdo",
        "Anotarla y evaluarla al final: si cambias reglas a mitad de camino, reinicias el conteo",
      ],
      correcta: 3,
      leccion: "3-4-3",
    },
    {
      q: "El stop de 20 pips da profit factor 1,6, pero con 15, 25 o 30 pips el sistema pierde. ¿Qué diagnóstico corresponde?",
      opciones: [
        "Pico frágil: el resultado depende del número exacto; descártalo",
        "Meseta robusta: el 20 es el parámetro óptimo confirmado",
        "Falta de datos: repite el test con otro activo",
        "Edge confirmado: los vecinos pierden porque el mercado es preciso",
      ],
      correcta: 0,
      leccion: "3-4-4",
    },
    {
      q: "¿Cómo se aplica correctamente la validación fuera de muestra (out-of-sample)?",
      opciones: [
        "Se optimiza con todo el histórico y se valida con ese mismo histórico",
        "Se optimiza con los datos recientes y se valida con los más antiguos",
        "Se optimiza solo con el 70% más antiguo y se valida con el 30% reciente que el sistema nunca vio",
        "Se optimiza en demo y se valida pasando directo a real",
      ],
      correcta: 2,
      leccion: "3-4-4",
    },
    {
      q: "Tras un mal día, a las 11 de la noche quieres modificar tu plan de trading. ¿Qué dice la gobernanza del plan?",
      opciones: [
        "Puedes editarlo si documentas el cambio con una captura del gráfico",
        "Puedes editarlo siempre que el cambio reduzca el riesgo",
        "El plan nunca se modifica una vez firmado",
        "Los cambios solo se hacen en frío, en la revisión programada, con datos de 50+ operaciones y registro fechado",
      ],
      correcta: 3,
      leccion: "3-5-0",
    },
    {
      q: "Durante el horario de mercado, ¿qué documento del plan usas según la lección?",
      opciones: [
        "El documento maestro completo de 3–5 páginas",
        "La hoja de batalla: 1 página impresa con checklist de entrada, números de riesgo y protocolos de emergencia",
        "El diario de trading del mes anterior",
        "Ninguno: durante el mercado se opera de memoria",
      ],
      correcta: 1,
      leccion: "3-5-0",
    },
    {
      q: "¿Por qué el protocolo exige que toda posición lleve stop loss en el servidor del broker y nunca un stop 'mental'?",
      opciones: [
        "Porque los stops mentales generan más ansiedad durante la operación",
        "Porque el broker da mejor precio a los stops de servidor",
        "Porque si se cae la plataforma o internet con posición abierta, el stop del servidor te protege igual",
        "Porque los stops mentales están prohibidos por los reguladores",
      ],
      correcta: 2,
      leccion: "3-5-1",
    },
    {
      q: "Descubres que compraste cuando querías vender (error de ejecución). ¿Qué dicta el protocolo de escenarios?",
      opciones: [
        "Cerrar la posición inmediatamente al descubrirlo: un error no se gestiona, se corta",
        "Mantenerla si el análisis también valida la dirección contraria",
        "Ponerle stop y objetivo y tratarla como un trade normal",
        "Esperar a que vuelva al precio de entrada para salir sin pérdida",
      ],
      correcta: 0,
      leccion: "3-5-1",
    },
    {
      q: "En tu revisión semanal quieres implementar tres mejoras a la vez. ¿Por qué la metodología exige un solo ajuste de proceso por semana?",
      opciones: [
        "Porque más de un cambio requiere aprobación del mentor",
        "Porque con cambios múltiples no puedes atribuir a cuál se debe la mejora o el deterioro",
        "Porque los ajustes múltiples violan la regla de las 24 horas",
        "Porque tres cambios triplican el riesgo por operación",
      ],
      correcta: 1,
      leccion: "3-5-2",
    },
    {
      q: "Tuviste una semana muy mala y sientes ganas de saltarte la revisión semanal. ¿Qué dice la lección?",
      opciones: [
        "Es razonable: revisar en caliente contamina el análisis",
        "Puedes posponerla hasta que la cuenta se recupere",
        "Haz solo la parte de números y salta el repaso del diario",
        "Es justo cuando más información contiene el diario: la revisión se hace llueva o truene",
      ],
      correcta: 3,
      leccion: "3-5-2",
    },
    {
      q: "Al marcar el checklist de paso a real piensas: 'cumplí el 90%... quitando esa semana mala'. ¿Qué dice el protocolo?",
      opciones: [
        "No hay asteriscos: la semana mala también cuenta, porque en real también contará",
        "Es válido excluirla si hubo noticias de alto impacto",
        "Puedes excluirla si el resto del periodo fue excelente",
        "El cumplimiento se mide solo sobre semanas normales de mercado",
      ],
      correcta: 0,
      leccion: "3-6-0",
    },
    {
      q: "¿Por qué el checklist de paso a real exige haber atravesado al menos una racha perdedora en demo sin romper reglas?",
      opciones: [
        "Para acumular más operaciones en la estadística",
        "Porque las rachas en demo predicen las rachas en real",
        "Porque es el examen más importante: prueba tu ejecución bajo presión, no solo tu sistema",
        "Para verificar que el broker ejecuta bien los stops",
      ],
      correcta: 2,
      leccion: "3-6-0",
    },
    {
      q: "¿Cuál es el objetivo real de las primeras 30 operaciones en cuenta real con capital reducido y riesgo del 0,5%?",
      opciones: [
        "Generar las primeras ganancias para financiar el fondeo completo",
        "Probar si el broker ejecuta igual que la demo",
        "Demostrar al mentor que el sistema funciona en real",
        "Calibrar tu ejecución con dinero real en juego, al precio más barato posible",
      ],
      correcta: 3,
      leccion: "3-6-1",
    },
    {
      q: "Terminas la fase de 30 operaciones en real con cumplimiento del 75%. ¿Qué dicta el protocolo?",
      opciones: [
        "Subir igual al 1% de riesgo: la expectancy fue positiva",
        "Volver a demo dos semanas y trabajar el psicotrading: es el protocolo funcionando, no un fracaso",
        "Repetir la fase 30 con la mitad del capital",
        "Abandonar el sistema y construir uno nuevo",
      ],
      correcta: 1,
      leccion: "3-6-1",
    },
    {
      q: "En real te descubres pensando 'esos 10 USD que perdí eran una cena'. ¿Qué herramienta de la lección ataca ese hábito?",
      opciones: [
        "Evaluar el resultado en dinero solo al final de cada día",
        "Reducir el tamaño hasta que ninguna pérdida se sienta",
        "Pensar y hablar en R ('perdí 1R'), nunca en dinero ni en bienes de consumo durante la operativa",
        "Retirar las ganancias cada semana para verlas como sueldo",
      ],
      correcta: 2,
      leccion: "3-6-2",
    },
    {
      q: "Notas que evitas mirar la cuenta y que el trading te quita el sueño de forma sostenida. ¿Cuál es la respuesta profesional?",
      opciones: [
        "Bajar el riesgo a la mitad hasta ejecutar con neutralidad: el tamaño supera tu tolerancia actual",
        "Seguir igual: la incomodidad desaparece sola con el tiempo",
        "Tomarte un mes de vacaciones y volver con el mismo tamaño",
        "Delegar la ejecución en un sistema automático",
      ],
      correcta: 0,
      leccion: "3-6-2",
    },
    {
      q: "En la defensa del plan ante el mentor RIC, ¿cuál es la única forma de reprobar sin apelación?",
      opciones: [
        "Presentar un plan modesto con métricas poco espectaculares",
        "Defender con números inventados o ajenos en lugar de datos propios",
        "No responder perfectamente todas las preguntas de estrés",
        "Presentar un solo setup en vez de varios",
      ],
      correcta: 1,
      leccion: "3-6-3",
    },
    {
      q: "En la certificación, un plan modesto con 200 muestras y protocolos concretos compite contra uno espectacular sin evidencia. ¿Cuál aprueba y por qué?",
      opciones: [
        "El espectacular: los resultados son lo único que importa",
        "Ninguno: ambos necesitan al menos 500 muestras",
        "Ambos, si sus autores responden bien las preguntas",
        "El modesto: se evalúa coherencia, honestidad estadística y protocolos operables",
      ],
      correcta: 3,
      leccion: "3-6-3",
    },
  ];





  /* ===== Módulo CNV · temario examen de idoneidad CNV (se agregó en septiembre de 2026) ===== */
  /* ===== Módulo 7 · Análisis de inversiones en el mercado regulado argentino ===== */

  L["3-7-0"] = {
    resumen: "Análisis fundamental aplicado a acciones argentinas: cómo está armado el mercado y cómo se calculan e interpretan los ratios, con un ejemplo numérico completo.",
    duracionVideo: "15-20 min",
    lectura: `<p>A esta altura del programa lees un gráfico mejor que la mayoría. El análisis fundamental no viene a reemplazar eso: viene a responder una pregunta distinta. El técnico te dice <em>cuándo</em> y <em>a qué precio</em>; el fundamental te dice <em>qué</em> estás comprando y si el precio tiene sentido frente al negocio que hay detrás. En el mercado se usan los dos, y lo importante es que sepas diferenciarlos.</p>
<h4>Cómo está organizado el mercado de acciones argentino</h4>
<ul>
<li><strong>BYMA (Bolsas y Mercados Argentinos)</strong> es el mercado donde se negocian las acciones locales. Está autorizado y supervisado por la CNV.</li>
<li>Las acciones se agrupan en paneles: el <strong>panel líder</strong> reúne a las empresas de mayor liquidez y volumen; el <strong>panel general</strong> al resto de las emisoras autorizadas.</li>
<li>El <strong>índice S&amp;P Merval</strong> mide la evolución de una cartera de acciones seleccionadas por liquidez y participación en el volumen negociado. Es la referencia del mercado local.</li>
<li>Los <strong>CEDEAR</strong> son certificados de depósito argentinos: representan acciones de empresas del exterior y cotizan en pesos en el mercado local.</li>
<li><strong>Caja de Valores S.A.</strong> es el agente de depósito colectivo: custodia los valores en la subcuenta comitente de cada inversor.</li>
</ul>
<h4>Top-down y bottom-up</h4>
<p>El análisis fundamental se aborda de dos maneras. En el enfoque <strong>top-down</strong> se empieza por la macroeconomía (crecimiento, inflación, tasas, tipo de cambio), se baja al sector y recién al final se elige la empresa. En el <strong>bottom-up</strong> se hace el camino inverso: se busca una empresa con buenos números y se la analiza casi con independencia del ciclo. Ninguno es superior; en economías volátiles como la argentina, el top-down suele mandar, porque la macro define el resultado de sectores enteros.</p>
<h4>De dónde salen los números</h4>
<p>Los datos vienen de los estados financieros publicados por la emisora: el <strong>estado de situación patrimonial</strong> (activo, pasivo y patrimonio neto), el <strong>estado de resultados</strong> (ventas, costos, resultado operativo, intereses, resultado neto), el <strong>flujo de efectivo</strong> y las <strong>notas</strong>. Están disponibles gratis en la Autopista de la Información Financiera de la CNV.</p>
<h4>Ejemplo completo: Andes Materiales S.A.</h4>
<p>Empresa ficticia, cifras en millones de pesos, cierre de ejercicio. Activo corriente 480, de los cuales inventarios 180. Pasivo corriente 300. Activo total 1.200. Pasivo total 700. Patrimonio neto 500. Ventas 1.000. Resultado operativo (EBIT) 150. Intereses pagados 50. Resultado neto 70. Acciones en circulación: 100 millones. Precio de mercado por acción: 14 pesos. Dividendo pagado por acción: 0,42 pesos.</p>
<p><strong>Liquidez.</strong> La <strong>liquidez corriente</strong> es activo corriente sobre pasivo corriente: 480 / 300 = <strong>1,6</strong>. Por cada peso que debe en el corto plazo, tiene 1,6 de activos de corto plazo. La <strong>prueba ácida</strong> repite el cálculo quitando los inventarios, que son lo más difícil de convertir en efectivo: (480 - 180) / 300 = <strong>1,0</strong>. Justo en el límite: sin vender mercadería no le sobra nada.</p>
<p><strong>Endeudamiento.</strong> <strong>Pasivo total sobre patrimonio neto</strong>: 700 / 500 = <strong>1,4</strong>; los acreedores financian 1,4 pesos por cada peso de los accionistas. <strong>Pasivo sobre activo</strong>: 700 / 1.200 = <strong>0,58</strong>, es decir, el 58% del activo está financiado con deuda. <strong>Cobertura de intereses</strong>: EBIT sobre intereses, 150 / 50 = <strong>3 veces</strong>. Gana tres veces lo que paga de intereses; por debajo de 1,5 la situación se vuelve delicada.</p>
<p><strong>Rentabilidad.</strong> <strong>ROE</strong> = resultado neto / patrimonio neto = 70 / 500 = <strong>14%</strong>. <strong>ROA</strong> = resultado neto / activo total = 70 / 1.200 = <strong>5,8%</strong>. <strong>Margen neto</strong> = resultado neto / ventas = 70 / 1.000 = <strong>7%</strong>. Fíjate en la brecha entre ROE y ROA: se explica por el endeudamiento, que multiplica el retorno de los accionistas y también el riesgo.</p>
<p><strong>Ratios de mercado.</strong> La <strong>ganancia por acción</strong> es 70 / 100 = <strong>0,70 pesos</strong>. El <strong>P/E</strong> (precio sobre ganancia por acción) es 14 / 0,70 = <strong>20 veces</strong>: el mercado paga veinte años de la ganancia actual. El <strong>valor libro por acción</strong> es 500 / 100 = 5 pesos, así que el <strong>P/BV</strong> es 14 / 5 = <strong>2,8 veces</strong>. El <strong>dividend yield</strong> es 0,42 / 14 = <strong>3%</strong>.</p>
<h4>Valuación: cuánto vale la acción</h4>
<p>Con el <strong>modelo de dividendos descontados</strong>, el valor de una acción es el valor presente de los dividendos futuros. En su versión de crecimiento constante: precio = dividendo esperado del próximo período dividido por la diferencia entre la tasa de rendimiento exigida y la tasa de crecimiento. Si esperas un dividendo de 0,45, exiges un 13% anual y estimas un crecimiento del 10%, el valor teórico es 0,45 / (0,13 - 0,10) = <strong>15 pesos</strong>: apenas por encima del precio de mercado. El resultado es hipersensible a las hipótesis: con 11% de crecimiento en lugar de 10%, el valor salta a 22,5 pesos. Por eso el método exige rangos, no un número único.</p>
<p>Con <strong>múltiplos comparables</strong>, comparas el P/E, el P/BV o el dividend yield de la empresa contra los de compañías del mismo sector y tamaño. Si las comparables cotizan a un P/E de 12 y Andes a 20, el mercado o bien le reconoce un crecimiento superior, o bien la está pagando cara. Observa que los dos métodos dan señales opuestas en este caso: el de dividendos sugiere que está algo barata y el de múltiplos que está cara. Eso no es un error de cálculo, es la esencia del análisis fundamental: el número depende de la hipótesis, y por eso la conclusión siempre se escribe con supuestos a la vista.</p>
<h4>Fundamental y técnico: cuándo usar cada uno</h4>
<ul>
<li>El <strong>fundamental</strong> estudia el valor del negocio a partir de información económica y contable. Sirve para decidir <strong>qué</strong> comprar y para horizontes largos.</li>
<li>El <strong>técnico</strong> estudia el comportamiento del precio y el volumen. Sirve para decidir <strong>cuándo</strong> entrar y salir, y para gestionar el riesgo.</li>
<li>Se complementan: el fundamental sin timing puede dejarte años dentro de una caída; el técnico sin fundamento te deja operando papeles cuyo negocio ni siquiera existe.</li>
</ul>
<p><strong>Aplicación práctica:</strong> toma una acción argentina que ya sigas en el gráfico, descarga su último estado financiero de la AIF y calcula los nueve ratios del ejemplo en una planilla. Repítelo con una comparable del mismo sector y compara. Vas a descubrir que el ranking fundamental y el ranking técnico muchas veces no coinciden: ese desacuerdo es información, no un problema.</p>
<p><strong>Para recordar:</strong> las fórmulas exactas (liquidez corriente, prueba ácida, pasivo sobre patrimonio neto, cobertura de intereses, ROE, ROA, margen neto, ganancia por acción, P/E, P/BV y dividend yield), qué diferencia a la prueba ácida de la liquidez corriente (excluye los inventarios) y la definición precisa de análisis fundamental frente a técnico.</p>`,
    claves: [
      "BYMA, paneles, S&P Merval, CEDEAR y Caja de Valores",
      "Prueba ácida = liquidez corriente sin inventarios",
      "ROE sobre ROA: la brecha la explica el endeudamiento",
      "Fundamental dice qué comprar; técnico, cuándo",
    ],
  };

  L["3-7-1"] = {
    resumen: "Cómo se preparan y se controlan los estados contables de una emisora: NIIF, el rol de la CNV y los cuatro tipos de opinión del auditor externo.",
    duracionVideo: "13-17 min",
    lectura: `<p>Todos los ratios que aprendiste en la lección anterior dependen de una condición previa: que los números sean confiables. Ese es exactamente el problema que resuelven las normas contables, la auditoría externa y el control societario de la Comisión Nacional de Valores. Si el balance no es confiable, un ROE del 14% no vale nada.</p>
<h4>NIIF y normas contables argentinas</h4>
<p>Las <strong>NIIF (Normas Internacionales de Información Financiera)</strong>, conocidas en inglés como IFRS, son el conjunto de normas emitido por el organismo internacional de contabilidad y adoptado por más de cien países. Su objetivo es que un balance argentino sea comparable con uno chileno o alemán.</p>
<p>En Argentina conviven con las <strong>normas contables profesionales locales</strong>, las Resoluciones Técnicas de la FACPCE, que aplican la mayoría de las empresas que no hacen oferta pública.</p>
<p>La regla central: las <strong>emisoras bajo el régimen de oferta pública deben presentar sus estados financieros según NIIF</strong>, con adopción obligatoria a partir de los ejercicios iniciados en 2012. Hay excepciones:</p>
<ul>
<li><strong>PyMEs CNV:</strong> pueden continuar con normas contables argentinas, dentro del régimen simplificado.</li>
<li><strong>Entidades financieras:</strong> siguen las normas del Banco Central de la República Argentina.</li>
<li><strong>Compañías de seguros:</strong> siguen las normas de la Superintendencia de Seguros de la Nación.</li>
</ul>
<p>Diferencias típicas entre uno y otro marco: el peso del <strong>valor razonable</strong> frente al costo histórico en la medición de activos, la forma de <strong>presentar</strong> los estados y su clasificación, y el nivel de detalle exigido en las <strong>notas</strong>, mucho más extenso bajo NIIF. Para el inversor, el efecto práctico es que dos empresas pueden mostrar resultados distintos por criterios de medición, no porque a una le vaya mejor.</p>
<h4>El control societario de la CNV</h4>
<p>La <strong>Ley 26.831</strong>, en su artículo 19, le da a la CNV facultades de fiscalización sobre las sociedades que hacen oferta pública. En la práctica esto significa:</p>
<ul>
<li><strong>Control de legalidad</strong> sobre los actos societarios: puede asistir y fiscalizar <strong>asambleas</strong>, revisar aumentos de capital, emisiones y reformas de estatuto.</li>
<li><strong>Requerir información</strong> y documentación, realizar inspecciones y solicitar explicaciones a directores, síndicos y auditores.</li>
<li><strong>Exigir la información contable periódica</strong> prevista en las Normas CNV (Título IV): estados financieros de períodos intermedios y anuales, dentro de los plazos que fija el organismo, con firma del auditor externo y con el informe de la comisión fiscalizadora.</li>
<li><strong>Llevar el Registro de Auditores Externos:</strong> el contador que audita a una emisora debe estar inscripto en ese registro, cumplir requisitos de <strong>independencia</strong> respecto de la sociedad auditada y respetar las reglas de <strong>rotación</strong> del socio firmante, para que la relación no se vuelva demasiado cómoda con el paso de los años.</li>
</ul>
<h4>Qué es y qué no es una auditoría</h4>
<p>El auditor externo emite una <strong>opinión profesional e independiente</strong> sobre si los estados financieros presentan razonablemente, en todos sus aspectos significativos, la situación patrimonial y los resultados, de acuerdo con el marco contable aplicable. Tres aclaraciones importantes:</p>
<ul>
<li>El auditor <strong>no garantiza</strong> que la empresa sea una buena inversión ni que no vaya a quebrar.</li>
<li>La auditoría trabaja por <strong>muestreo</strong> y con el concepto de <strong>significatividad</strong>: no revisa cada comprobante.</li>
<li>Los estados financieros son <strong>responsabilidad de la dirección</strong> de la sociedad; el auditor opina sobre ellos.</li>
</ul>
<h4>Los cuatro tipos de opinión</h4>
<ol>
<li><strong>Opinión favorable sin salvedades</strong> (limpia): los estados presentan razonablemente la situación. Es lo esperable.</li>
<li><strong>Opinión con salvedades:</strong> hay una o más cuestiones significativas (un desacuerdo con un criterio contable, o una limitación al alcance del trabajo), pero no afectan al conjunto. Se expresa con la fórmula "excepto por".</li>
<li><strong>Opinión adversa</strong> (desfavorable): los desacuerdos son tan significativos y generalizados que los estados <strong>no</strong> presentan razonablemente la situación. Es una señal muy grave.</li>
<li><strong>Abstención de opinión:</strong> el auditor no pudo obtener evidencia suficiente por limitaciones importantes al alcance y por eso <strong>no emite opinión</strong>. Atención: abstención no es lo mismo que opinión adversa. La adversa dice "los números están mal"; la abstención dice "no pude verificarlo".</li>
</ol>
<p>Además existe el <strong>párrafo de énfasis</strong>: no modifica la opinión, pero llama la atención sobre algo ya revelado en las notas y que el auditor considera esencial, típicamente una incertidumbre significativa sobre la capacidad de la empresa de continuar operando, un juicio relevante o un hecho posterior al cierre.</p>
<p>Para los períodos intermedios, el trabajo no es una auditoría completa sino una <strong>revisión limitada</strong>: alcance menor, basado sobre todo en indagaciones y procedimientos analíticos, y una conclusión de seguridad negativa, del estilo "no tomamos conocimiento de modificaciones significativas que debieran hacerse".</p>
<h4>Cómo leer un informe de auditor como inversor</h4>
<ol>
<li>Empieza por el final: busca la palabra que califica la opinión antes de mirar los números.</li>
<li>Si dice "excepto por", lee exactamente qué se excluye y calcula cuánto pesa sobre el patrimonio o el resultado.</li>
<li>Revisa si hay párrafo de énfasis y sobre qué. Una incertidumbre sobre la continuidad de la empresa cambia toda la tesis de inversión.</li>
<li>Mira quién firma y desde cuándo: cambios frecuentes de auditor, o la presentación fuera de plazo, son señales de alerta independientes del contenido.</li>
<li>Recuerda que los trimestres traen revisión limitada, no auditoría: exige menos confianza a esos números.</li>
</ol>
<p><strong>Aplicación práctica:</strong> antes de aplicar cualquier ratio a una empresa, abre su informe de auditoría en la AIF y clasifica la opinión en una de las cuatro categorías. Si encuentras salvedades o un párrafo de énfasis sobre continuidad, trátalo como trataste siempre una señal de riesgo en el gráfico: reduce tamaño o directamente no operes. Un balance con opinión adversa invalida cualquier análisis fundamental construido sobre él.</p>
<p><strong>Para recordar:</strong> desde cuándo rigen las NIIF para emisoras y qué excepciones existen, que la CNV lleva el Registro de Auditores Externos con requisitos de independencia y rotación, y la diferencia entre opinión con salvedades, adversa y abstención. Ten presente que los estados financieros son responsabilidad de la dirección, no del auditor.</p>`,
    claves: [
      "Emisoras con oferta pública presentan bajo NIIF desde 2012",
      "Excepciones: PyMEs CNV, bancos (BCRA) y seguros (SSN)",
      "La CNV lleva el Registro de Auditores Externos",
      "Opinión: limpia, con salvedades, adversa o abstención",
    ],
  };

  L["3-7-2"] = {
    resumen: "Cómo se aplica en el día a día de un agente la prevención del lavado: legajo del cliente, enfoque de riesgo, señales de alerta y el reporte de operación sospechosa.",
    duracionVideo: "14-18 min",
    lectura: `<p>En el Nivel 1 viste el marco general del lavado de activos y la financiación del terrorismo: el GAFI y sus 40 Recomendaciones, la Ley 25.246 que creó la Unidad de Información Financiera (UIF), los sujetos obligados y las tres etapas del lavado (colocación, estratificación e integración). No lo repetimos. Esta lección es la bajada práctica: qué hace un agente registrado ante la CNV, todos los días, para cumplir con el <strong>Título XI de las Normas CNV</strong>.</p>
<h4>Abrir una cuenta: el legajo del cliente</h4>
<p>Cuando Ana abre cuenta en un agente, no está llenando burocracia inútil: está construyendo el legajo que la normativa exige. Se le pide:</p>
<ul>
<li><strong>Identificación:</strong> datos personales, documento, CUIT o CUIL, domicilio, actividad y, en personas jurídicas, estatuto, autoridades y el <strong>beneficiario final</strong>, la persona humana que en última instancia controla o se beneficia.</li>
<li><strong>Declaración jurada de origen y licitud de los fondos</strong>, con respaldo documental cuando los montos lo justifican: recibos de sueldo, declaraciones impositivas, escrituras, balances.</li>
<li><strong>Perfil transaccional:</strong> una estimación fundada del volumen y el tipo de operaciones esperadas, según los ingresos, el patrimonio y la actividad del cliente. Es la vara contra la que se mide todo después.</li>
<li><strong>Declaración sobre condición de PEP</strong> (Persona Expuesta Políticamente): si el cliente ejerce o ejerció funciones públicas relevantes, o es familiar o allegado de quien las ejerce. Un PEP requiere <strong>debida diligencia reforzada</strong>.</li>
<li><strong>Condición de inversor calificado</strong>, cuando corresponde, porque habilita el acceso a determinados productos.</li>
</ul>
<h4>Enfoque basado en riesgo</h4>
<p>La normativa no exige tratar a todos los clientes igual, sino <strong>segmentar por riesgo</strong>: bajo, medio o alto, según tipo de cliente, actividad, ubicación geográfica, productos y canal de contratación. A mayor riesgo, diligencia más profunda y revisión más frecuente del legajo. A menor riesgo, procedimientos simplificados. El criterio viene del GAFI y evita gastar el mismo esfuerzo en un empleado que invierte su aguinaldo que en una sociedad del exterior con estructura opaca.</p>
<h4>Señales de alerta</h4>
<p>Abierta la cuenta, el agente debe <strong>monitorear</strong> las operaciones y compararlas con el perfil declarado. Señales de alerta concretas del mercado de capitales:</p>
<ul>
<li><strong>Operaciones sin sentido económico:</strong> comprar y vender el mismo título asumiendo pérdidas y comisiones de manera sistemática.</li>
<li><strong>Fraccionamiento:</strong> muchos depósitos o transferencias apenas por debajo de un umbral, o repartidos entre varias cuentas del mismo grupo.</li>
<li><strong>Desvío del perfil:</strong> un cliente que declaró operar cincuenta mil pesos al mes y aparece moviendo millones sin explicación.</li>
<li><strong>Uso de terceros:</strong> fondos que entran o salen a nombre de personas sin vínculo declarado, o un cliente que opera por instrucciones de otro que no figura en el legajo.</li>
<li><strong>Urgencia por rescatar:</strong> se acredita el dinero, se hace una operación mínima y de inmediato se pide el retiro total, con desinterés por el costo.</li>
<li><strong>Jurisdicciones de riesgo:</strong> fondos o estructuras vinculados a <strong>países no cooperantes</strong> o de alto riesgo.</li>
<li><strong>Resistencia a informar:</strong> el cliente no entrega documentación o cambia la versión sobre el origen de los fondos.</li>
</ul>
<h4>El ROS: reporte de operación sospechosa</h4>
<p>Cuando una operación, intentada o realizada, no tiene justificación económica o jurídica razonable, o resulta inusual y no se aclara, el sujeto obligado debe presentar un <strong>Reporte de Operación Sospechosa (ROS)</strong> ante la UIF, en el plazo que fija la normativa. Cuatro puntos clave:</p>
<ol>
<li>El ROS es <strong>confidencial</strong>: está <strong>prohibido avisarle al cliente</strong>, ni siquiera de forma indirecta, que se lo reportó.</li>
<li>Reportar <strong>no implica acusar</strong> de un delito: es poner la información a disposición de la UIF, que analiza e informa al Ministerio Público Fiscal si corresponde.</li>
<li>Reportar de buena fe <strong>no genera responsabilidad</strong> para quien reporta.</li>
<li>La operación puede ser reportada aunque finalmente <strong>no se haya concretado</strong>.</li>
</ol>
<p>Existe además el <strong>reporte sistemático</strong>, periódico y automático: es información estadística, no implica sospecha y no debe confundirse con el ROS.</p>
<h4>Estructura interna exigida</h4>
<ul>
<li><strong>Oficial de cumplimiento:</strong> debe ser un integrante del órgano de administración, designado formalmente e informado a la UIF. Vela por el cumplimiento del sistema y es el interlocutor con el organismo.</li>
<li><strong>Manual de procedimientos</strong> y políticas escritas de aceptación de clientes.</li>
<li><strong>Capacitación</strong> periódica y documentada de todo el personal, incluido el que atiende clientes.</li>
<li><strong>Conservación de la documentación</strong> por el plazo que fija la normativa.</li>
<li><strong>Límites al uso de efectivo:</strong> los agentes reciben fondos por transferencia bancaria desde cuentas a nombre del cliente y no operan con efectivo fuera de los límites permitidos. Es una de las barreras más eficaces contra la etapa de colocación.</li>
</ul>
<h4>Normativa aplicable</h4>
<p>Además de la Ley 25.246, el sector se rige por las <strong>resoluciones de la UIF dirigidas al mercado de capitales</strong> (la Resolución 29/2013 fue luego actualizada por resoluciones posteriores que profundizaron el enfoque de riesgo), por el <strong>Decreto 918/2012</strong>, que establece el <strong>congelamiento administrativo</strong> de bienes vinculados al terrorismo a partir de los listados del Consejo de Seguridad de la ONU, y por el Título XI de las Normas CNV. La CNV supervisa a los sujetos obligados de su órbita y coopera con la UIF. El incumplimiento acarrea sanciones administrativas para el agente y para las personas responsables, sin perjuicio de la responsabilidad penal que corresponda.</p>
<h4>Qué hace el agente frente a un cliente sospechoso</h4>
<ol>
<li>No improvisar ni investigar por su cuenta: pedir la documentación y registrar lo observado.</li>
<li>Escalar el caso al <strong>oficial de cumplimiento</strong> por escrito.</li>
<li><strong>No comentarle nada al cliente</strong> sobre la existencia de un análisis o de un reporte.</li>
<li>No rechazar ni ejecutar la operación por decisión personal: todo se resuelve según el manual.</li>
</ol>
<p><strong>Aplicación práctica:</strong> cuando un agente te pida el origen de los fondos y una estimación de cuánto vas a operar, no te está molestando: cumple una obligación legal que también te protege. Ten tu documentación ordenada y declara un perfil realista; si después vas a operar bastante más, actualiza el legajo en lugar de esperar a que salte la alerta.</p>
<p><strong>Para recordar:</strong> el ROS se presenta ante la UIF, es confidencial y no se le avisa al cliente; el oficial de cumplimiento integra el órgano de administración; el reporte sistemático es periódico y no implica sospecha, a diferencia del ROS; el perfil transaccional es la estimación de lo que vas a operar y un PEP es una persona expuesta políticamente; y el Decreto 918/2012 regula el congelamiento administrativo de activos.</p>`,
    claves: [
      "Legajo: identidad, origen de fondos, perfil transaccional y PEP",
      "Enfoque de riesgo: más diligencia donde hay más riesgo",
      "Alertas: fraccionamiento, terceros, urgencia por rescatar",
      "El ROS va a la UIF y jamás se le avisa al cliente",
    ],
  };

  EX[3].push(
    {
      q: "Una empresa tiene activo corriente 480 (con inventarios por 180) y pasivo corriente 300. ¿Cuánto da su prueba ácida y qué significa?",
      opciones: [
        "1,6: incluye los inventarios porque son activos corrientes",
        "1,0: se excluyen los inventarios, así que apenas cubre su pasivo de corto plazo sin vender mercadería",
        "0,6: se calcula como inventarios sobre pasivo corriente",
        "2,6: se suman activo corriente e inventarios antes de dividir",
      ],
      correcta: 1,
      leccion: "3-7-0",
    },
    {
      q: "Dos empresas del mismo sector tienen el mismo ROA, pero una muestra un ROE muy superior. ¿Cuál es la explicación más probable?",
      opciones: [
        "Vende a mayor precio unitario que la otra",
        "Aplica NIIF mientras la otra usa normas contables argentinas",
        "Tiene más acciones en circulación",
        "Está más endeudada: el apalancamiento amplifica el retorno sobre el patrimonio neto y también el riesgo",
      ],
      correcta: 3,
      leccion: "3-7-0",
    },
    {
      q: "El auditor externo de una emisora informa que no pudo obtener evidencia suficiente por limitaciones importantes al alcance de su trabajo y por eso no emite opinión sobre los estados financieros. ¿De qué tipo de informe se trata?",
      opciones: [
        "Abstención de opinión",
        "Opinión adversa",
        "Opinión con salvedades",
        "Opinión favorable con párrafo de énfasis",
      ],
      correcta: 0,
      leccion: "3-7-1",
    },
    {
      q: "Un cliente transfiere un monto muy superior a su perfil declarado, hace una operación mínima y pide el rescate total el mismo día. La persona del agente que lo atiende detecta la inusualidad. ¿Cómo debe actuar?",
      opciones: [
        "Avisarle al cliente que su operación será reportada, para darle la oportunidad de justificarla",
        "Rechazar la operación por su cuenta y cerrar la cuenta de inmediato",
        "Registrar lo observado y escalarlo al oficial de cumplimiento, sin informar al cliente sobre un eventual reporte",
        "Presentar él mismo la denuncia ante la CNV antes de comunicarlo dentro del agente",
      ],
      correcta: 2,
      leccion: "3-7-2",
    },
  );

  /* ===== Módulos agregados en septiembre de 2026 (contenidos faltantes) ===== */
  /* ============ MÓDULO 8 · Contexto de mercado: intermercado y posicionamiento ============ */

  L["3-8-0"] = {
    resumen: "Dólar, tasas, bonos, oro y petróleo se mueven en relaciones reconocibles. Entenderlas te da un filtro de contexto para tus operaciones, no una señal de entrada.",
    duracionVideo: "12–15 min",
    lectura: `<p>Ningún activo se mueve solo. El oro que operas en tu plataforma no reacciona únicamente a su propio gráfico: responde al dólar, a las tasas de interés y al miedo del mercado. El <strong>análisis intermercado</strong> es el estudio de esas relaciones entre las cuatro grandes clases de activos (divisas, bonos, materias primas y acciones). No te dice cuándo entrar; te dice si el viento sopla a favor o en contra de la idea que ya tenías.</p>
<h4>Las relaciones clásicas</h4>
<p>Antes de las relaciones necesitas un nombre: el <strong>DXY</strong> o índice dólar mide el valor del dólar estadounidense contra una canasta de monedas, dominada por el euro. Cuando el DXY sube, el dólar se fortalece frente al mundo.</p>
<ul>
<li><strong>DXY contra EUR/USD:</strong> relación casi espejo. El euro pesa más de la mitad del índice, así que un DXY que sube suele ser un EUR/USD que baja. Si estás comprando EUR/USD mientras el DXY rompe máximos, estás nadando contra la corriente.</li>
<li><strong>DXY contra oro:</strong> el oro se cotiza en dólares. Si el dólar se encarece, la misma onza cuesta menos dólares. La relación histórica es inversa, aunque no perfecta.</li>
<li><strong>Tasas reales contra oro:</strong> esta es la relación más importante del metal. La tasa real es la tasa nominal menos la inflación esperada. El oro no paga interés; cuando un bono seguro rinde bien por encima de la inflación, mantener oro tiene un costo de oportunidad alto y el metal sufre. Cuando las tasas reales caen o se vuelven negativas, el oro tiende a brillar.</li>
<li><strong>Petróleo contra el dólar canadiense:</strong> Canadá es un gran exportador de crudo. Petróleo que sube suele significar USD/CAD que baja. Algo parecido pasa con el dólar australiano y los metales industriales, o con el peso mexicano y el crudo.</li>
<li><strong>Petróleo contra inflación:</strong> la energía se traslada a toda la cadena de precios. Un crudo disparado alimenta expectativas de inflación, que a su vez presionan a los bancos centrales, que a su vez mueven las tasas y el dólar. La cadena completa importa más que cada eslabón.</li>
<li><strong>Bonos contra acciones:</strong> en tiempos normales conviven; en momentos de pánico el dinero corre hacia los bonos del Tesoro (suben de precio, cae su rendimiento) y huye de las acciones. Es el clásico movimiento de "huida hacia la calidad".</li>
</ul>
<h4>Por qué se dan y cuándo se rompen</h4>
<p>Estas relaciones no son leyes físicas: son consecuencias de cómo fluye el capital. Por eso se rompen, y hay que saber cuándo. Dos casos típicos:</p>
<ol>
<li><strong>Estrés financiero severo:</strong> en una crisis de liquidez todo se vende al mismo tiempo, incluso el oro, porque los grandes participantes necesitan dólares para cubrir márgenes. La correlación inversa oro-dólar puede invertirse durante días.</li>
<li><strong>Cambio de régimen:</strong> hubo períodos largos en los que bonos y acciones cayeron juntos porque el problema era la inflación, no la recesión. El refugio dejó de refugiar.</li>
</ol>
<p>De ahí una regla incómoda: <strong>las correlaciones cambian</strong>. Una correlación es un número entre −1 y +1 que mide cuánto se mueven dos activos en la misma dirección, y ese número se recalcula sobre una ventana de tiempo. Revisarla cada tanto es parte del trabajo; asumir la de hace tres años es un error caro.</p>
<h4>Cómo se lee un día</h4>
<p>Ana abre su computadora un martes y, antes de mirar su gráfico de oro en H1, hace un recorrido de dos minutos: el DXY sube 0,4 %, el rendimiento del bono del Tesoro a 10 años sube de 4,10 % a 4,22 %, el petróleo cae 1,5 %, las acciones abren en rojo. Su lectura: hay demanda de dólar y presión al alza en tasas, dos vientos en contra para el oro. Ana tenía preparada una compra de oro por estructura técnica. No la cancela automáticamente, pero sí decide dos cosas: exigir una confirmación extra antes de entrar y usar la mitad del tamaño habitual. Esa es exactamente la función del intermercado.</p>
<h4>El error de convertirlo en señal</h4>
<p>Bruno hace lo contrario: ve el DXY caer y compra oro sin ningún criterio técnico, solo por la correlación. Es un error frecuente por tres motivos. Primero, la correlación describe una tendencia promedio, no el próximo movimiento. Segundo, los desfases existen: un activo puede reaccionar horas o días después. Tercero, el intermercado no te da niveles de invalidación, y sin invalidación no hay stop y sin stop no hay gestión de riesgo. El contexto filtra; el sistema decide.</p>
<p>Una forma sana de integrarlo es dentro del bloque de contexto de tu sistema: "solo tomo largos en oro si el DXY no está en tendencia alcista en el marco diario". Es una regla escrita, verificable, que puede ser probada sobre tu historial. Si al probarla tus resultados empeoran, la regla se descarta. Nada de intuiciones.</p>
<p><strong>Aplicación práctica:</strong> arma un tablero fijo de cinco activos que mires siempre antes de operar (índice dólar, rendimiento del bono a 10 años, oro, petróleo y el índice bursátil principal) y anota en tu registro, con una sola línea, el contexto intermercado de cada operación que abres. Después de 50 operaciones vas a poder comparar tu esperanza matemática con el viento a favor y con el viento en contra, y recién ahí convertir la observación en una regla de filtro.</p>
<p><strong>Para recordar:</strong> el intermercado explica de dónde viene la presión sobre tu activo, pero no reemplaza a tu gatillo ni a tu stop; úsalo para ajustar agresividad y tamaño, revisa las correlaciones periódicamente porque cambian, y desconfía cuando todo cae junto: ahí manda la liquidez, no la lógica.</p>`,
    claves: [
      "El intermercado es filtro de contexto, nunca señal de entrada",
      "Tasas reales al alza suelen ser viento en contra del oro",
      "Las correlaciones se recalculan: cambian con el régimen",
      "En pánico de liquidez se vende todo, hasta el refugio",
    ],
  };

  L["3-8-1"] = {
    resumen: "La curva de rendimientos y las decisiones de los bancos centrales son el motor de fondo del forex y del oro. Lo que mueve el precio no es el dato, es la sorpresa frente a lo esperado.",
    duracionVideo: "13–16 min",
    lectura: `<p>Detrás de casi todo movimiento grande en divisas y en oro hay una historia de tasas de interés. Si entiendes cómo se forma la expectativa de tasas y cómo se lee la curva de rendimientos, dejas de sorprenderte con velas de 200 puntos que "salen de la nada".</p>
<h4>Qué es la curva de rendimientos</h4>
<p>Un país emite deuda a distintos plazos: 3 meses, 2 años, 10 años, 30 años. Si dibujas en un eje el plazo y en el otro el rendimiento anual que paga cada uno, obtienes la <strong>curva de rendimientos</strong>. Su forma normal es ascendente: prestar a 10 años es más incierto que prestar a 3 meses, así que se exige más rendimiento.</p>
<p>La <strong>pendiente</strong> es la diferencia entre un plazo largo y uno corto (por ejemplo, 10 años menos 2 años). Cuando esa diferencia se achica, la curva se aplana. Cuando se vuelve negativa —el corto plazo paga más que el largo— la curva está <strong>invertida</strong>. La inversión tiene fama de anticipar recesiones, y en varias ocasiones históricas precedió a una. Conviene tomarlo con cuidado: el adelanto ha sido de muchos meses, con casos y excepciones, y no sirve como herramienta de timing para una operación. Es información de clima, no de pronóstico horario.</p>
<h4>Tasas reales y oro</h4>
<p>La tasa nominal es la que paga el bono. La <strong>tasa real</strong> es esa tasa menos la inflación esperada. Ejemplo: un bono a 10 años rinde 4,2 % y el mercado espera 2,3 % de inflación promedio; la tasa real ronda 1,9 %. Ese número es el costo de oportunidad de tener oro, que no paga nada. Regla mental: tasa real que sube, viento en contra para el oro; tasa real que cae, viento a favor. No es mecánico —el oro también responde a la demanda de refugio y a las compras de bancos centrales— pero es la relación de fondo más útil que vas a encontrar.</p>
<h4>Diferencial de tasas y carry en forex</h4>
<p>Un par de divisas es, en el fondo, un intercambio entre dos tasas. Si la moneda A rinde 5 % y la moneda B rinde 1 %, mantener comprada A contra B te paga la diferencia: eso es el <strong>carry</strong>, y en tu cuenta aparece como swap positivo o negativo según la dirección. Dos consecuencias prácticas:</p>
<ul>
<li>Lo que mueve al par no es el nivel de tasas, sino el <strong>cambio esperado</strong> en el diferencial. Si el mercado empieza a creer que el banco central de B va a subir tasas, B se aprecia antes de que la suba ocurra.</li>
<li>Las operaciones de carry funcionan durante meses y se deshacen en días. Cuando llega el nerviosismo, el capital cierra posiciones y la moneda con tasa alta cae con violencia. Cobrar swap nunca compensa un movimiento adverso apalancado.</li>
</ul>
<h4>La sorpresa, no el dato</h4>
<p>Este es el punto que más dinero cuesta a los principiantes. El mercado cotiza expectativas. Si todos esperan que la Reserva Federal suba la tasa un cuarto de punto y la sube exactamente eso, el precio puede no moverse o moverse en contra. Lo que genera el movimiento es la diferencia entre lo esperado y lo ocurrido, y sobre todo el mensaje sobre el futuro.</p>
<p>Carla lo aprendió así: un dato de inflación salió por encima de lo previsto y ella compró dólar de inmediato esperando una subida. El precio subió 40 puntos en segundos y luego cayó 120, porque el detalle del informe mostraba que el componente de servicios se desaceleraba. Su error no fue la dirección: fue operar un titular en un mercado donde el spread se ensancha, la ejecución se deteriora y el precio se define en los primeros minutos.</p>
<h4>Cómo se lee un comunicado</h4>
<p>Los bancos centrales tienen reuniones programadas con calendario público (la Reserva Federal, el Banco Central Europeo y el Banco de Inglaterra publican sus fechas con un año de anticipación; conviene verificarlas en el sitio oficial de cada institución). Lo que el mercado mira, en orden:</p>
<ol>
<li><strong>La decisión</strong> de tasa y si hubo votos en desacuerdo.</li>
<li><strong>El comunicado</strong>, palabra por palabra: los cambios de redacción frente a la reunión anterior son la señal más fina.</li>
<li><strong>Las proyecciones</strong>, cuando se publican: el camino de tasas que anticipan los propios miembros.</li>
<li><strong>La conferencia de prensa</strong>, donde suele producirse el segundo movimiento, a veces contrario al primero.</li>
</ol>
<h4>Errores de operar la noticia</h4>
<p>Los tres más caros: entrar segundos antes del anuncio (spread amplio, deslizamiento y posible ausencia de ejecución al precio deseado), dejar un stop ajustado dentro del rango de ruido del evento, y confundir la primera vela con la dirección del día. La alternativa profesional es simple: o no operas el evento y esperas a que el mercado elija un lado con estructura, o reduces el tamaño de forma deliberada asumiendo que el riesgo real es mayor al declarado.</p>
<p><strong>Aplicación práctica:</strong> marca en tu calendario semanal las reuniones de los bancos centrales de las monedas que operas y el dato de inflación de Estados Unidos; define por escrito una regla única para esos días (por ejemplo, no abrir posiciones nuevas en la hora previa y la media hora posterior) y revisa al mes siguiente cuántas de tus peores operaciones cayeron dentro de esas ventanas.</p>
<p><strong>Para recordar:</strong> las tasas reales explican al oro, el diferencial esperado de tasas explica al forex, y el precio se mueve por la sorpresa frente a lo que ya estaba descontado; la curva invertida es información de clima con adelanto de muchos meses, no una señal operativa.</p>`,
    claves: [
      "Tasa real = nominal menos inflación esperada: el termómetro del oro",
      "El forex sigue el cambio esperado del diferencial, no el nivel",
      "Mueve el precio la sorpresa, no el dato en sí",
      "Curva invertida: señal de clima con meses de adelanto",
    ],
  };

  L["3-8-2"] = {
    resumen: "El informe COT muestra semanalmente cómo están posicionados los grandes participantes en futuros. Leído en extremos y con sus límites, es un termómetro de sentimiento, no un disparador.",
    duracionVideo: "12–15 min",
    lectura: `<p>Mientras miras tu gráfico, hay un dato público que te dice quién está comprado y quién está vendido en los mercados de futuros de Estados Unidos. Se llama <strong>Commitments of Traders</strong> (COT) y lo publica la CFTC, el regulador estadounidense de futuros. Es gratis, es oficial y casi nadie lo usa bien.</p>
<h4>Qué es y cómo se publica</h4>
<p>Los participantes que superan ciertos umbrales de posición deben reportar sus tenencias. La CFTC agrega esa información y publica el informe los viernes, con los datos cerrados al martes anterior. Ese desfase de tres días hábiles es la primera limitación que debes internalizar: estás viendo una foto vieja.</p>
<p>El informe agrupa a los participantes en categorías. En la versión más usada para materias primas, las tres que importan son:</p>
<ul>
<li><strong>Comerciales:</strong> empresas que usan el activo en su negocio real. Una petrolera que vende futuros para asegurarse un precio, o una joyería que compra oro a futuro. Cubren riesgo, no especulan, y por eso suelen estar del lado contrario al movimiento reciente.</li>
<li><strong>Grandes especuladores</strong> (fondos de inversión y gestores): buscan rentabilidad y son fuertemente seguidores de tendencia. Se cargan de posición a medida que el movimiento avanza.</li>
<li><strong>Pequeños operadores</strong> (no reportables): posiciones chicas, el grupo con peor historial en los giros importantes.</li>
</ul>
<p>Para cada categoría el informe muestra contratos comprados, vendidos y el cambio respecto de la semana anterior. La <strong>posición neta</strong> de una categoría es simplemente comprados menos vendidos.</p>
<h4>Leer extremos, no niveles</h4>
<p>El valor absoluto de una posición neta no dice casi nada: depende del tamaño del mercado, que crece con los años. Lo que informa es el <strong>extremo relativo</strong>: qué tan alta o baja está esa posición neta comparada con su propio historial de los últimos dos o tres años. Para eso existe el <strong>índice COT normalizado</strong>, que convierte la posición neta a una escala de 0 a 100 dentro de la ventana elegida: 100 es la posición más comprada del período y 0 la más vendida.</p>
<p>La lectura habitual es contraria y se apoya en las categorías: cuando los grandes especuladores llegan a un extremo de posición comprada y los comerciales a un extremo vendido, el combustible alcista empieza a agotarse, porque quien iba a comprar ya compró. No significa que el precio vaya a caer mañana; significa que el mercado quedó cargado de un lado y es vulnerable a una liquidación.</p>
<h4>Un ejemplo</h4>
<p>Supón que en oro los grandes especuladores llevan ocho semanas seguidas aumentando su posición comprada y el índice normalizado marca 96 sobre 100, mientras los comerciales están en su mayor posición vendida de tres años. Bruno ve eso y vende oro el lunes. Pierde. El precio siguió subiendo cinco semanas más, porque los extremos pueden volverse más extremos. Ana, en cambio, escribe en su plan: "posicionamiento extremo comprado: no agrego a mis largos, adelanto toma de ganancias parcial y acepto señales cortas de mi sistema que antes descartaba". Ana usa el COT como lo que es, un ajuste de convicción y tamaño.</p>
<h4>Limitaciones honestas</h4>
<ol>
<li><strong>Retraso:</strong> tres días hábiles de desfase; en semanas volátiles la foto ya cambió.</li>
<li><strong>No es timing:</strong> un extremo puede durar meses. Sin un gatillo técnico, es una invitación a pelearse con la tendencia.</li>
<li><strong>Cobertura parcial:</strong> cubre futuros listados en Estados Unidos. No ve el mercado de contado, ni el interbancario de divisas, ni las operaciones fuera de esos mercados.</li>
<li><strong>Clasificación imperfecta:</strong> algunos participantes quedan en categorías que no reflejan exactamente su intención.</li>
</ol>
<p>Se consulta gratis en el sitio oficial de la CFTC y en varios portales que lo grafican. Si usas una fuente que lo normaliza por ti, verifica qué ventana de años emplea, porque cambia por completo la lectura.</p>
<h4>Otras fuentes de posicionamiento</h4>
<p>El COT no está solo. Muchos brokers minoristas publican el <strong>porcentaje de sus clientes comprados y vendidos</strong> en cada par; leído en contra, en extremos muy marcados, aporta algo, pero refleja solo a los clientes de ese broker. En cripto tienes dos datos valiosos y en tiempo real: el <strong>interés abierto</strong> (cantidad total de contratos vivos, que muestra si entra o sale dinero apalancado) y el <strong>funding</strong> de los contratos perpetuos (el pago periódico entre comprados y vendidos; cuando es muy positivo durante días, hay exceso de largos apalancados pagando por seguir ahí, condición típica previa a una cascada de liquidaciones).</p>
<p><strong>Aplicación práctica:</strong> elige un solo mercado que ya operes, descarga su serie COT y agrega a tu registro dos columnas: índice normalizado de grandes especuladores y de comerciales en la semana de cada operación; a las 40 o 50 operaciones vas a ver si tu esperanza matemática cambia cuando operas a favor o en contra de un posicionamiento extremo, y solo entonces conviene escribir una regla.</p>
<p><strong>Para recordar:</strong> el COT mide cuán cargado está el mercado de un lado, con tres días de retraso y sin capacidad de timing; sirve para bajar convicción y tamaño cuando estás del lado de la multitud, y nunca para abrir una posición contra la tendencia sin un gatillo propio.</p>`,
    claves: [
      "Publicación del viernes con datos cerrados al martes: foto vieja",
      "Comerciales cubren, grandes especuladores siguen tendencia",
      "Lee extremos normalizados, no el número absoluto",
      "Ajusta convicción y tamaño; el gatillo lo da tu sistema",
    ],
  };

  L["3-8-3"] = {
    resumen: "Estacionalidad, amplitud de mercado y VIX forman una lectura semanal de contexto que decide cuánta agresividad y qué tamaño usar, sin sustituir nunca a las reglas de entrada.",
    duracionVideo: "12–15 min",
    lectura: `<p>Esta lección cierra el módulo con tres termómetros que, combinados, te dan una respuesta a una sola pregunta operativa: <em>¿esta semana conviene pisar el acelerador o el freno?</em> No definen qué operar, sino con cuánta agresividad.</p>
<h4>1. Estacionalidad: patrones de calendario y sus límites</h4>
<p>La estacionalidad estudia si ciertos períodos del año tienen, en promedio histórico, rendimientos distintos. Existen patrones documentados: los meses de fin de año suelen ser más favorables para las acciones estadounidenses que el tramo de mitad de año, y el famoso "vender en mayo" resume la idea de que el semestre de mayo a octubre rindió históricamente menos que el de noviembre a abril.</p>
<p>Ahora la letra chica, que importa más que el patrón. Primero, son promedios: dentro de ese promedio hay años excelentes y años pésimos, y la dispersión suele ser enorme comparada con la diferencia entre ambos semestres. Segundo, con pocas décadas de datos, una diferencia estacional puede no ser distinguible del azar. Tercero, cuando un patrón se vuelve famoso, muchos lo anticipan y se diluye. Cuarto, hay explicaciones parciales razonables (menor volumen en vacaciones del hemisferio norte, flujos de fin de año, reportes trimestrales), pero explicar no es garantizar.</p>
<p>Conclusión honesta: la estacionalidad es un factor de peso muy bajo. Sirve para no sorprenderte con un agosto ilíquido o con la baja actividad de fin de diciembre. Nunca para abrir o cerrar una posición por sí sola.</p>
<h4>2. Amplitud de mercado: qué hay debajo del índice</h4>
<p>Un índice puede subir con casi todas sus acciones subiendo, o con cinco empresas enormes tirando del carro mientras el resto cae. Esa diferencia se llama <strong>amplitud</strong> y es información valiosa que el gráfico del índice esconde. Tres medidas usadas:</p>
<ul>
<li><strong>Porcentaje de acciones por encima de su media de 200 sesiones:</strong> es el indicador de participación más directo. Un índice en máximos con solo el 40 % de sus acciones sobre esa media muestra un avance sostenido por pocos nombres.</li>
<li><strong>Línea de avance-descenso:</strong> se acumula día a día la cantidad de acciones que suben menos las que bajan. Si el índice marca un máximo nuevo y esta línea no lo acompaña, hay divergencia.</li>
<li><strong>Nuevos máximos contra nuevos mínimos:</strong> cuántas acciones alcanzan máximos y mínimos de 52 semanas. Un aumento de nuevos mínimos en pleno rally es una advertencia de deterioro interno.</li>
</ul>
<p>La amplitud no anticipa fechas. Una divergencia puede durar meses. Lo que hace es decirte si el movimiento tiene base ancha o angosta, y por lo tanto cuán frágil puede ser.</p>
<h4>3. VIX: el precio del seguro</h4>
<p>El <strong>VIX</strong> es un índice que estima la volatilidad que el mercado espera para el índice bursátil estadounidense en los próximos 30 días, calculada a partir de los precios de las opciones. Traducido: es lo que cuesta el seguro. Cuando el miedo aumenta, la gente paga más por protegerse y el VIX sube.</p>
<p>Niveles orientativos, siempre a contrastar con el contexto de la época: valores bajos, en la zona de los 12 a 15, indican calma y complacencia; una zona intermedia de 15 a 20 es normalidad; por encima de 25 hay tensión; picos por encima de 30 o 40 corresponden a episodios de pánico, que históricamente coincidieron con zonas de piso en las acciones más que con zonas de techo. La lectura contraria es la conocida: cuando todos están asegurados, queda poco por vender.</p>
<p>Hay un segundo dato más fino: la <strong>curva de futuros del VIX</strong>. En calma, los vencimientos lejanos cotizan más caros que los cercanos (situación llamada <em>contango</em>), porque el futuro es más incierto. En pánico se invierte: los vencimientos cercanos valen más que los lejanos (<em>backwardation</em>), señal de que el mercado descuenta el problema como inmediato. El paso de contango a backwardation es uno de los cambios de régimen más claros que existen.</p>
<h4>La lectura semanal de contexto</h4>
<p>Ana dedica veinte minutos cada domingo a completar tres líneas y una conclusión. Un ejemplo real de su cuaderno: estacionalidad neutra, amplitud deteriorada (solo el 45 % de las acciones sobre su media de 200 con el índice cerca de máximos), VIX en 14 y curva en contango. Su conclusión: mercado calmo pero angosto, es decir, sin miedo y con base frágil. Decisión escrita: opera su sistema normalmente, pero con el 70 % de su tamaño habitual y sin agregar posiciones.</p>
<p>Un mes después, otra foto: VIX en 34 con la curva invertida, amplitud en lecturas mínimas, gran cantidad de nuevos mínimos. Conclusión: pánico activo. Su regla en ese régimen es distinta: solo opera marcos temporales mayores, reduce el tamaño a la mitad porque los rangos se duplicaron, y no deja posiciones abiertas de un día para el otro.</p>
<p>El valor del ejercicio está en que la decisión de agresividad se toma <strong>antes</strong> de ver un gráfico tentador, no durante. Así el contexto ajusta el riesgo y no la excusa.</p>
<p><strong>Aplicación práctica:</strong> crea una plantilla de cuatro líneas (estacionalidad, amplitud, VIX y curva de futuros, y conclusión con porcentaje de tamaño a usar), complétala cada fin de semana antes de mirar cualquier operación y anota ese porcentaje junto a cada trade; en tres meses vas a poder verificar si tu contexto semanal realmente distingue las semanas buenas de las malas.</p>
<p><strong>Para recordar:</strong> la estacionalidad es el factor más débil de los tres y solo previene sorpresas de liquidez; la amplitud dice si el movimiento es ancho o angosto; el VIX y su curva dicen cuánto miedo hay y si el régimen cambió; los tres juntos deciden tamaño y agresividad, nunca la entrada.</p>`,
    claves: [
      "Estacionalidad: promedio con dispersión enorme, peso muy bajo",
      "Amplitud revela si el índice sube con base ancha o angosta",
      "VIX alto ha coincidido más con pisos que con techos",
      "Contango a backwardation: cambio de régimen claro",
    ],
  };

  EX[3].push(
    {
      q: "Ana quiere comprar oro por una señal técnica válida. Antes de entrar revisa el contexto: el índice dólar sube con fuerza y el rendimiento del bono a 10 años pasó de 4,10 % a 4,25 %. ¿Cuál es el uso correcto del análisis intermercado en esta situación?",
      opciones: [
        "Cancelar la señal técnica: el intermercado tiene prioridad sobre el sistema",
        "Invertir la operación y vender oro, porque la correlación con el dólar es inversa",
        "Tomar la señal solo con confirmación adicional y menor tamaño, porque el contexto está en contra",
        "Ignorar el contexto: las correlaciones cambian y por lo tanto no aportan información",
      ],
      correcta: 2,
      leccion: "3-8-0",
    },
    {
      q: "El mercado espera que un banco central suba su tasa un cuarto de punto. El banco sube exactamente ese cuarto de punto, pero en la conferencia insinúa que sería la última suba del ciclo. La moneda cae con fuerza. ¿Cuál es la mejor explicación?",
      opciones: [
        "La suba ya estaba descontada y lo que movió el precio fue la sorpresa sobre el camino futuro de las tasas",
        "Las subas de tasa siempre debilitan a la moneda del país que las aplica",
        "La conferencia de prensa no influye en el precio, fue una reacción técnica al nivel previo",
        "La caída se debe a que la tasa real subió y eso presiona a la baja a todas las monedas",
      ],
      correcta: 0,
      leccion: "3-8-1",
    },
    {
      q: "En el informe COT de oro, los grandes especuladores están en su mayor posición comprada de los últimos tres años y los comerciales en su mayor posición vendida. ¿Cuál es la lectura profesional de ese dato?",
      opciones: [
        "Es una señal de venta inmediata: hay que abrir cortos el lunes siguiente",
        "Confirma la tendencia alcista y justifica agregar posición comprada",
        "No aporta nada porque el informe se publica los viernes",
        "El mercado está cargado de un lado y es vulnerable, así que conviene bajar convicción y tamaño, sin abrir cortos sin gatillo propio",
      ],
      correcta: 3,
      leccion: "3-8-2",
    },
    {
      q: "En su revisión del domingo, Carla ve el índice bursátil cerca de máximos con solo el 43 % de las acciones por encima de su media de 200 sesiones, el VIX en 13 y la curva de futuros del VIX en contango. ¿Qué lectura de contexto corresponde?",
      opciones: [
        "Régimen de pánico activo: conviene cerrar todo y no operar la semana",
        "Calma con avance de base angosta: operar el sistema con tamaño reducido y sin agregar posiciones",
        "Amplitud saludable y miedo elevado: es momento de aumentar el tamaño",
        "La curva en contango indica cambio de régimen y obliga a invertir la dirección de las operaciones",
      ],
      correcta: 1,
      leccion: "3-8-3",
    },
  );
})();
