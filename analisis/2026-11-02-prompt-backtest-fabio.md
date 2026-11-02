# Prompt para el chat de pruebas de estrategias (modelos de Fabio Valentini)

Copiar desde «Contexto» hasta el final y pegarlo en el chat de pruebas.

---

## Contexto
Quiero que pruebes (backtest) dos modelos de scalping intradía con flujo de órdenes que explica Fabio Valentini (Chart Fanatics,
«Trading LIVE with a World TOP Ranked Scalper», https://www.youtube.com/watch?v=tvERE-Beu2U). Él los usa en futuros del Nasdaq
(NQ/MNQ) y del S&P (ES/MES) y dice que no son estrategias rígidas sino «modelos» con lectura discrecional. Abajo están **traducidos a
reglas programables**. Lo que es interpretación nuestra está marcado como **[interpretación]**: probá variantes de esos puntos.
Si algo no se puede programar con los datos que tengas, decímelo y proponé la mejor aproximación, marcándola como aproximación.

## Datos
- **Ideal:** datos de ticks (trades) de NQ con precio, tamaño y lado agresor (compra/venta), más el libro no hace falta.
  Con eso se calculan: perfil de volumen, delta por nivel, CVD y «órdenes grandes» (trades ≥ N contratos).
- **Mínimo:** velas de 1 minuto con volumen. Entonces: perfil de volumen aproximado (repartir el volumen de cada vela entre su rango),
  delta y CVD aproximados (regla del tick o velas con volumen comprador/vendedor si existen) y «órdenes grandes» = velas con volumen
  muy superior a la media [aproximación]. Avisame cuánto se degrada el resultado con esta aproximación.
- Período: al menos 12 meses, idealmente 2 o 3 años, separando un tramo fuera de muestra (por ejemplo, el último 30 %).
- Horario en hora de Nueva York (ET). Sesión de Nueva York: 09:30–16:00. Londres: 03:00–09:30 [interpretación del horario].
- Costos: comisión ida y vuelta por contrato realista (NQ ~4–5 USD; MNQ ~1–1,5 USD) y deslizamiento de 1 tick en stops y entradas a mercado.

## Definiciones comunes
- **Perfil de volumen** de un rango de tiempo: volumen por precio (tick de NQ = 0,25 puntos; podés agrupar en 1–2 puntos).
- **POC:** precio con más volumen. **Área de valor (VA):** el bloque de precios alrededor del POC que suma el 70 % del volumen; VAH y VAL sus bordes.
- **Equilibrio de referencia [interpretación]:** variante A = perfil del día anterior (sesión completa o solo la de Nueva York; probá las dos);
  variante B = última zona de compresión intradía (por ejemplo, ≥ 60 min con rango ≤ X veces el ATR de 5 min; probá X).
- **Fuera de equilibrio:** cierre de una vela de 5 min fuera del VA de referencia.
- **Impulso:** tramo desde el último mínimo (o máximo) de swing antes de salir del valor hasta el extremo del movimiento [interpretación: swings con
  fractales de 1 minuto de N velas; probá N = 3 y 5].
- **LVN del impulso:** dentro del perfil del impulso, el nivel (o bloque de niveles) con volumen mínimo relativo (por ejemplo, < 30 % del volumen
  medio por nivel del impulso) [interpretación].
- **Orden agresiva grande:** trade (o suma de trades del mismo lado en el mismo segundo) ≥ 30 contratos de NQ en Nueva York y ≥ 20 en Londres.
  Para ES o micros, escalar el umbral (probá el percentil 99 de tamaño por sesión).
- **CVD:** suma acumulada del delta (compras agresivas − ventas agresivas) desde el inicio de la sesión.

## Modelo 1 · Tendencia (desequilibrio) · solo sesión de Nueva York
1. **Horario:** operar entre 09:30 y 15:45; no entrar en los primeros N minutos (probá 0, 5 y 15); cerrar todo a las 15:55. Nada de posiciones de un día para otro.
2. **Estado:** el precio cierra fuera del VA de referencia (vela de 5 min). Largo si sale por arriba, corto si sale por abajo.
3. **No tomar el primer impulso:** esperar que el impulso termine (aparece el swing extremo) y que el precio retroceda.
4. **Ubicación:** el retroceso llega al LVN del impulso (opcional: confluencia con VAH/VAL del equilibrio que se rompió; probar con y sin).
5. **Disparador:** dentro de la zona del LVN (± K ticks; probá K = 4 y 8) aparece una orden agresiva grande a favor (compra para largos, venta para
   cortos) dentro de la vela de 1 minuto. Entrada a mercado al cierre de esa vela [o en el siguiente tick: probar ambas].
6. **Stop:** del otro lado de la orden grande que disparó la entrada + 1–2 ticks; si eso deja el stop más allá del extremo del retroceso, usar
   1–2 ticks **antes** de ese extremo (regla de Fabio para evitar el deslizamiento de los stops amontonados).
7. **Objetivo:** el POC del equilibrio de referencia **si está adelante**; salida total ahí. Si no hay POC adelante (el precio está creando valor nuevo),
   salida por trailing (stop detrás del último swing de 1 minuto) o al cierre de la sesión.
8. **Break even [interpretación de «lo antes posible»]:** mover el stop a la entrada cuando (a) el precio hace un nuevo extremo a favor después de la
   entrada, o (b) el CVD sube (largos) o baja (cortos) X contratos desde la entrada. Probar a, b y ninguno.
9. **Salida anticipada (opcional):** aparece una orden agresiva grande en contra con continuidad (la vela siguiente cierra en contra) → salir.
10. **Filtro de calidad:** descartar operaciones con riesgo/beneficio planeado < 1:2,5 (distancia al POC / distancia al stop).

## Modelo 2 · Reversión (vuelta al valor) · Londres (y probarlo también en Nueva York en períodos comprimidos)
1. **Estado:** el mercado está en equilibrio (VA de referencia).
2. **Salida y falla:** el precio cierra fuera del VA (vela de 5 min) y después vuelve a cerrar adentro.
3. **No tomar el primer movimiento:** esperar la primera vuelta adentro y luego un retroceso hacia el borde del valor.
4. **Ubicación:** LVN del tramo de vuelta (desde el extremo de afuera hasta el máximo/mínimo de la vuelta).
5. **Disparador:** orden agresiva grande a favor de la vuelta en la zona del LVN (umbral 20 contratos en Londres).
6. **Stop:** detrás de esa orden + 1–2 ticks, o 1–2 ticks antes del extremo de afuera.
7. **Objetivo:** el POC del equilibrio. Salida total.
8. **Filtro de delta (probar con y sin):** en la zona donde el precio salió del valor, el delta de esos niveles es fuerte en contra de la ruptura
   (ruptura alcista con mucha venta agresiva) → la operación es válida; si el delta acompañó la ruptura, descartarla.
9. **Filtro de régimen (probar):** comparar el resultado en meses de baja volatilidad (por ejemplo, ATR diario debajo de su mediana de 6 meses) contra el resto.

## Gestión del riesgo (las dos)
- Riesgo por operación: 0,25 % de la cuenta (probar también 0,5 %). Tamaño = riesgo / (distancia al stop × valor del tick), redondeado hacia abajo.
- Pérdida máxima diaria: 2 % → no se opera más ese día.
- Variante: después de cada ganancia, la siguiente operación del día puede arriesgar una parte de la ganancia acumulada del día, nunca capital de la cuenta.

## Qué quiero que me devuelvas
1. Para cada modelo y cada variante: número de operaciones, tasa de acierto, riesgo/beneficio medio, profit factor, expectativa por operación
   (en R y en dinero, neto de comisiones y deslizamiento), drawdown máximo, racha máxima de pérdidas, Sharpe diario, y resultados por año y por mes.
2. **Dentro y fuera de muestra por separado.** Si el resultado se cae fuera de muestra, decilo claramente.
3. Qué parámetro mueve más el resultado (sensibilidad) y qué variante es más robusta, no la de mejor resultado.
4. Un gráfico de la curva de capital y una tabla de las 20 peores operaciones con fecha y hora, para poder revisarlas.
5. Cualquier sesgo que detectes: mirar el futuro (por ejemplo, usar el POC del día en curso antes de que exista), sobreajuste o datos faltantes.

Las reglas de Fabio dicen que el modelo de tendencia rinde cuando el Nasdaq se mueve fuerte y que en días comprimidos se acumulan stops chicos
(su récord: 11 seguidos). No busques forzar un resultado lindo: quiero saber si la ventaja existe con datos y costos reales.
