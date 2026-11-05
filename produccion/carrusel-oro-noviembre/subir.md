# Carrusel «7 fechas que pueden mover el oro en noviembre» (05/11/2026)

Para @leanalvarez.ok. 11 láminas de 1080x1350, identidad RIC. Se generan con
`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt NODE_PATH=$(npm root -g) python produccion/carrusel-oro-noviembre/generar.py <dir>`
(toma el precio real del oro, GC=F, el día que se genera). Los PNG no van a git: se entregan por el chat.

Idea tomada de un carrusel de Carlos Valencia FX (calendario del mes y cómo puede mover al oro): textos propios,
datos verificados en fuentes y medios, horarios en hora de Argentina, lámina de «cómo leerlo» y resumen para guardar.
Sin logos de organismos ni fotos de personas (íconos propios).

## Texto (versión para principiantes, 05/11/2026)
```
7 fechas que pueden mover el oro en noviembre 📅🟡

Si recién empezás, esto es lo único que necesitás saber:
👉 Si el dato sale MÁS ALTO de lo esperado, el oro suele BAJAR 🔻
👉 Si sale MÁS BAJO, el oro suele SUBIR 🔺

En cada lámina te dejo qué es el dato, a qué hora sale (hora de Argentina) y el número que hay que mirar:

💼 Vie 6 · Empleo: ¿más o menos de 60 mil?
🛒 Mar 10 · Inflación: ¿más o menos de 3,7 %?
🏭 Vie 13 · Precios de empresas: ¿más o menos de 6,3 %?
🎙️ Lun 16 · Habla el jefe de la Fed
🏛️ Mié 18 · Lo que se habló en la Fed
📈 Mié 25 · La inflación de la Fed: ¿más o menos de 3,6 %?
🛢️ Dom 29 · Reunión del petróleo (OPEP+)

«Suele» no es «siempre»: a veces el mercado ya lo esperaba. Por eso nunca se opera sin stop.

📌 Guardalo para tenerlo a mano.
💬 ¿Cuál de las 7 te preocupa más? Comentá la fecha 👇

—
Datos al 05/11/2026. Fuentes: BLS, BEA, Reserva Federal, OPEP, CNBC y CNN. Las fechas pueden cambiar.
Contenido educativo. No constituye recomendación de inversión. Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero.

#oro #XAUUSD #trading #tradingargentina #tradingparaprincipiantes #Fed #inflacion #forex #calendarioeconomico #realinvestorsclub
```

Pedido de Lean (05/11/2026): muchos seguidores recién empiezan, así que cada fecha dice qué es en una frase, el número
de referencia y los dos resultados («si sale más de X, el oro suele bajar»). El HTML se arma con `armar.py` (datos de cada
fecha arriba de todo) y los PNG con `generar.py`. Referencias: empleo, el consenso (~60 mil); CPI, PPI y PCE, el último dato
(no hay consenso verificado); Warsh y minutas, el tono; OPEP+, producir más o menos.

## Datos y fuentes (verificados el 05/11/2026)
| Lámina | Dato | Fuente |
|---|---|---|
| Portada | Oro (GC=F) 4.134 el 05/11; máximo de 6 meses 4.731 el 08/05 (−13 %) | Yahoo Finance |
| 6/11 NFP, 8:30 NY | Septiembre +29 mil, desempleo 4,2 %; consenso octubre 55–65 mil | BLS, CNBC, Trading Economics |
| 10/11 CPI, 8:30 NY | Septiembre 3,7 % anual, subyacente 2,6 % | BLS, CNBC |
| 13/11 PPI, 8:30 NY | Septiembre +1,3 % mensual, 6,3 % anual (mayores desde 2022) | BLS, CNBC, CNN |
| 16/11 Warsh | Audiencia del grupo de trabajo de productividad y empleo en la bahía de San Francisco; tasa 3,75–4 %; próxima decisión 9/12 | Bloomberg, CNBC, TD |
| 18/11 Minutas, 14:00 NY | Reunión del 27-28/10: pausa 10 a 2; Cook y Hammack querían subir | Reserva Federal, CNN, CNBC |
| 25/11 PCE, 8:30 NY | Septiembre 3,6 %, subyacente 3,1 %; PIB 3.er trimestre 3,4 % (primera lectura); 26/11 Acción de Gracias | BEA, CNBC |
| 29/11 OPEP+ | Reunión de los 21 países, cuotas 2027; diciembre sin cambios; ~2 M bpd de recortes | OPEP, CNBC |

Horario: Nueva York está en UTC−5 desde el 01/11, así que 8:30 NY = 10:30 ARG y 14:00 NY = 16:00 ARG.
Se sacaron del original los datos que no se pudieron confirmar: la fecha de las ventas minoristas (el +0,8 % de septiembre
sí está confirmado), el «estimado 3,7 %» del CPI, la fecha de la segunda lectura del PIB y los datos de China del 9 y 10.
