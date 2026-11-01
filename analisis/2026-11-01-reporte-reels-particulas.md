# Reporte completo: producción de Reels y Shorts para Real Investors Club

**Período:** 31/10/2026 – 01/11/2026
**Responsable:** Lean Alvarez (Real Investors Club)
**Propósito:** traspasar todo lo hecho en el chat original al chat correcto para seguir el trabajo desde ahí.

---

## 1. Objetivo del proyecto

- Seguir la cuenta de Instagram **@sniper600news**. Cada vez que publique un video, hacer uno nuevo **con la misma información pero con el estilo propio de Real Investors Club (RIC)**.
- De cada tema salen **dos versiones**:
  - **Reel de Instagram**, para la cuenta personal **@leanalvarez.ok**.
  - **Short de YouTube**, para el canal **Real Investors Club (@REALinvestorsc)**.
- **Criterio:** se toma la **idea y la información**. El guion, los visuales y el audio son propios, sin reutilizar video, voz ni texto del original, para evitar reclamos de copyright y la penalización de alcance de Instagram por contenido duplicado. Los datos se contrastan con fuentes periodísticas.

### Seguimiento de la cuenta fuente
- Instagram bloquea el acceso automático desde la nube, así que no se puede vigilar la cuenta desde ahí.
- **Flujo acordado:** Lean descarga o graba el reel nuevo de @sniper600news, lo manda al chat y se producen las dos versiones.
- **Alternativa posible, no configurada:** una tarea programada que revise la cuenta con el navegador de la app de escritorio de Claude, con la computadora encendida y la app abierta.

---

## 2. Datos de las cuentas (para CTA y tarjetas)

### Instagram (personal)
| Campo | Valor |
|---|---|
| Usuario | **leanalvarez.ok** (verificada, tilde azul) |
| Nombre | **Lean Alvarez \| Trading & Finanzas** |
| Datos al 31/10/2026 | 27 publicaciones · **3.734 seguidores** · 19 seguidos |
| Bio | Trader en XAUUSD y Cripto · Opera de la forma correcta · ⚠️ Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero. |
| Link | realinvestors.club |
| Foto | Foto real de Lean (recortada de la captura del perfil, archivo `avatar.png`) |

### YouTube
| Campo | Valor |
|---|---|
| Canal | **Real Investors Club** |
| Handle | @REALinvestorsc |
| Logo | Logo "REAL / INVESTORS CLUB" azul marino (recortado de la captura, archivo `avatar_ric.png`; **pedir el PNG original en alta resolución**) |
| Regla | En los CTA de YouTube va **solo el nombre del canal** ("Real Investors Club"). La línea "Trading y finanzas · XAUUSD y Cripto" es **solo para Instagram**. |
| Suscriptores | No informados (no se muestran en la tarjeta) |

---

## 3. Estilo visual RIC (definido)

- **Formato:** vertical 1080×1920, 30 fps, H.264 y audio AAC.
- **Fondo:** negro azulado con viñeta suave y **grilla tenue tipo terminal de trading** (cada 90 px).
- **Paleta:**
  - Dorado `#E2B74A`, para acentos y partículas.
  - Dorado claro `#FFDE8C`, para cifras destacadas.
  - Blanco `#F5F5F2`, para textos.
  - Gris `#8C9098`, para textos secundarios.
  - Rojo `#EB4D4B`, para caídas y alertas.
  - Verde `#3CC882`, para lo positivo.
  - Celeste `#78BEFF`, para "congelado".
- **Tipografías:** Inter Display Black para títulos, Inter SemiBold/Medium para textos y DejaVu Sans Mono para datos y cifras.
- **Recurso principal:** **partículas doradas (~3.200)** que cambian de forma entre escenas: el botín, barras, una laptop, una línea de tiempo, un "?", un gráfico, un candado, un perfil de volumen. Llevan un brillo (glow) suave.
- **Encabezado fijo:**
  - "REAL INVESTORS CLUB" en dorado con letras espaciadas, a la izquierda.
  - Etiqueta del tema a la derecha (p. ej. "MERCADOS · 31.10.26" o "CLASE · PERFIL DE VOLUMEN").
  - **Barra de progreso dorada** arriba.
- **Pie:** fuentes, o "Gráficos ilustrativos · No es recomendación de inversión".
- **Animaciones de texto:** fade + slide-up escalonado; contadores numéricos que suben.
- **Zonas seguras:** contenido clave entre y=250 y y=1650 (abajo queda libre para la interfaz de Instagram/YouTube).
- **Audio:**
  - Música ambiental generada por código: drone grave, kick suave a ~92–96 bpm, whoosh + boom en cada cambio de escena y efectos puntuales (ticks del contador, caída de precio, click en botones).
  - La música baja automáticamente cuando habla la voz.

---

## 4. Voz en off

- **Motor:** Piper TTS (rhasspy/piper).
- **Voz:** **es_AR "Daniela" (high), femenina argentina.** El modelo se descargó desde el mirror de GitHub de sherpa-onnx, porque HuggingFace está bloqueado en el entorno:
  `https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-es_AR-daniela-high.tar.bz2`
- **Parámetros usados en los videos entregados:** `--length-scale 1.12 --sentence-silence 0.35` (pausado y claro).
  - Para los próximos videos (ver sección 9), usar un ritmo **normal pero claro**: un punto medio entre 0.92 (demasiado rápido) y 1.12 (lento). Sugerido: ~1.0.
- **Voz masculina:** Piper no tiene ninguna voz masculina argentina. Se probó convertir la de Daniela a voz de hombre (con pyworld) y **Lean la descartó: no funcionó**. Se usa la voz original de Daniela.
- **Pronunciaciones (se escriben así en el texto que lee la voz):**

| Palabra | Escribir en el guion |
|---|---|
| Binance | **Báinans** |
| Bybit | **Báibit** |
| Ethereum | **Eterium** |
| TraderTraitor | Tréider Tréitor |
| POC | pok |
| Bollinger | Bólinger |
| Wyckoff | Uáicof |
| Spring | esprín |
| Horas tipo 17:04 | "cinco y cuatro de la tarde" |
| Siglas difíciles (XRP, USDT, BNB, TRM, DevOps) | evitarlas en la voz y mostrarlas solo en pantalla |

- **Números:** siempre escritos en palabras ("seis mil trescientos millones").

---

## 5. CTA (llamados a la acción)

### CTA en el medio del video
- Barra tipo píldora oscura con borde dorado: foto + nombre + botón. Un cursor toca el botón y el estado cambia, con sonido de click.
  - **Instagram:** foto de Lean · "leanalvarez.ok" ✓ · "Trading & Finanzas" · botón azul **Seguir → Siguiendo ✓**.
  - **YouTube:** logo RIC · **"Real Investors Club"** (solo el nombre) · botón rojo **Suscribirme → Suscripto ✓**.
- **Voz del CTA del medio:** "Si te está sirviendo, seguí la cuenta / suscribite al canal. Así no te perdés el próximo (análisis)."
- ⚠️ **Nueva regla para los próximos videos:** **sin CTA en el medio en Instagram** (ver sección 9).

### Cierre (inspirado en el video de referencia que mandó Lean)
- **Instagram:**
  1. Título que entra de golpe: **"SEGUÍ ESTA CUENTA"**, con subrayado dorado.
  2. Aparece la **tarjeta de perfil de Instagram** con los datos reales: foto, 27 / 3.734 / 19, nombre, bio y link.
  3. El cursor toca **Seguir → Siguiendo**, los seguidores pasan a **3.735**, sale un "+1" dorado y las partículas explotan.
  4. Texto final: "y entendé el mercado / antes que el resto" y el chip "Compartilo con quien tenga cripto en un exchange".
  - **Voz:** "Seguí esta cuenta, y entendé el mercado antes que el resto."
  - ⚠️ El contador de seguidores es fijo. **Actualizarlo con el número real en cada video nuevo.**
- **YouTube:**
  1. Título **"SUSCRIBITE AL CANAL"**.
  2. Tarjeta con el logo RIC y **"Real Investors Club"** (solo el nombre).
  3. El cursor toca **Suscribirme → Suscripto** y después la **campanita**, que se activa en dorado.
  4. Chip final: "Activá la campanita y no te perdés nada".
  - **Voz:** "Suscribite al canal, activá la campanita, y entendé el mercado antes que el resto."

---

## 6. Video 1: "El robo a Binance" (entregado)

**Fuente:** reel de @sniper600news "¿Quién robó Binance? Ya se sabe más del mayor robo cripto de la historia: más de 6.300 M$…" (visualización de partículas sobre el hackeo del 29/10/2026).

**Entregables finales:**
- `RIC_robo_Binance_Reel_Instagram.mp4`
- `RIC_robo_Binance_Short_YouTube.mp4` (ya subido a YouTube por Lean)
- Duración: 1:43 cada uno.

**Versiones intermedias (descartadas):**
- La primera iba sin voz.
- La segunda tenía la voz demasiado rápida y pronunciaba mal Binance y Bybit.
- La tercera tenía voz masculina convertida, que no funcionó.
- La cuarta tenía Daniela + pronunciaciones corregidas, que es la base del final.

### Escenas y guion final (voz)
| # | Escena (pantalla) | Locución |
|---|---|---|
| 1 | "EL MAYOR ROBO CRIPTO DE LA HISTORIA" + contador **US$ 6.300 M** | El veintinueve de octubre, le robaron a Báinans más de seis mil trescientos millones de dólares. Es el mayor robo cripto de la historia. Y lo hicieron en menos de cuatro horas. |
| 2 | "4 VECES EL RÉCORD ANTERIOR": Bybit 2025 US$ 1.500 M vs Binance 2026 US$ 6.300 M | El récord anterior era el de Báibit, en dos mil veinticinco: mil quinientos millones. Esto es cuatro veces más. |
| 3 | "TODO EMPEZÓ CON UNA LAPTOP": 01 Hackean la laptop de un ingeniero DevOps / 02 Entran al sistema que firma los retiros / 03 Cada retiro sale con firma VÁLIDA de Binance. Nota: Binance después admitió "puntos de intrusión adicionales" | ¿Cómo entraron? Hackearon la laptop de un ingeniero de sistemas. Llegaron al sistema que firma los retiros. Y cada salida de plata, se hizo con una firma válida de la propia Báinans. |
| 4 | "LAS 4 HORAS DEL GOLPE" (hora argentina): 17:04 primer retiro 233,5 M XRP · 17:20 18.270 BTC en un solo bloque · 17:24 golpe principal US$ 2.530 M en ETH · 19:15 Binance frena retiros | A las cinco y cuatro de la tarde, sale el primer retiro. A las cinco y veinte, dieciocho mil bitcoins se van en un solo bloque. A las cinco y veinticuatro, llega el golpe principal: dos mil quinientos millones en Eterium. Recién a las siete y cuarto, Báinans frena los retiros. |
| 5 | "¿QUÉ SE LLEVARON?" por red: Ethereum 3.770 · Bitcoin 1.480 · Tron/USDT 628 · XRP 300 · otras 5 redes 145 (US$ M). **CTA del medio** | Casi todo salió de Eterium: tres mil setecientos millones. Después viene Bitcoin, con mil cuatrocientos ochenta millones. + CTA del medio |
| 6 | "¿QUIÉN FUE? COREA DEL NORTE": Grupo TraderTraitor (Lazarus) · TRM Labs "alta confianza" · Chainalysis "probable" · sin confirmación de Binance ni del FBI | ¿Quién fue? Todo apunta a Corea del Norte, al grupo Tréider Tréitor. Los analistas lo ven muy probable. Pero todavía, no hay confirmación oficial. |
| 7 | "¿DÓNDE ESTÁ LA PLATA?": ~US$ 3.000 M congelados (Tether, Circle, Ripple, Paxos) vs US$ 2.400–3.200 M libres · BTC repartido en 19 billeteras | ¿Y la plata? Unos tres mil millones quedaron congelados. El resto sigue libre, y ya lo están lavando. |
| 8 | "IMPACTO EN EL MERCADO · BITCOIN SE HUNDIÓ": BTC a US$ 76.400 (mínimo desde el 18/9) · US$ 1.570 M liquidados · BNB −8% (~US$ 693) | El mercado lo sintió. Bitcoin bajó a setenta y seis mil cuatrocientos dólares, su mínimo en seis semanas. Hubo mil quinientos setenta millones en liquidaciones. |
| 9 | "LO QUE TENÉS QUE SABER · NO SON TUS CLAVES, NO SON TUS MONEDAS": Binance cubre pérdidas con fondo propio de US$ 6.340 M · retiros pausados ~45 h, depósitos funcionan · lo que no usás para operar → wallet propia | Lo que tenés que saber: Báinans dice que cubre las pérdidas con fondos propios. Los retiros están pausados. Y la regla de siempre: si no tenés tus claves, no son tus monedas. |
| 10 | Cierre IG / YT (sección 5) | Ver sección 5 |

**Fuentes (datos al 30/10/2026):**
- [Criptoinforme: cronología, culpables y cuánto se robó](https://criptoinforme.com/intercambios/hackeo-binance-billetera-caliente-tether-circle/)
- [Infobae: cómo operó el ataque y quiénes están bajo sospecha](https://www.infobae.com/economia/2026/10/30/el-hackeo-a-binance-como-opero-el-ataque-millonario-y-quienes-estan-bajo-sospecha/)
- [Infobae: retiros suspendidos y caída del bitcoin](https://www.infobae.com/economia/2026/10/30/binance-investiga-posible-hackeo-de-mas-de-usd-5000-millones-bloqueos-retiros-suspendidos-y-fuerte-caida-del-precio-de-bitcoin/)
- [El Español: Binance sufre un ciberrobo histórico](https://www.elespanol.com/omicrono/tecnologia/20261030/golpe-criptomonedas-binance-sufre-mayor-hackeo-historia-robo-millones-dolares/1003744440636_0.html)
- Datos de Binance, Chainalysis, TRM Labs, Arkham, Bitquery y CoinDesk citados en esas notas.

**Notas sobre los datos:**
- Las cifras varían según la fuente: Chainalysis da 5.912–6.400 M y Arkham 6.360 M. Por eso hay rangos.
- La atribución a Corea del Norte **no es oficial**.
- Las horas originales están en hora de Bogotá (UTC−5) y se convirtieron a hora argentina (+2 h).

### Copy de Instagram (video 1)
```
🚨 Le robaron más de US$ 6.300 millones a Binance en menos de 4 horas.

Es el mayor robo cripto de la historia: 4 veces más que el récord anterior. Y todo empezó con UNA laptop 💻

En este video te cuento:
🔓 Cómo entraron, con firmas válidas de la propia Binance
⏱️ Las 4 horas del golpe, minuto a minuto
🇰🇵 Quién estaría detrás
💰 Dónde está la plata: cuánto se congeló y cuánto sigue libre
📉 Cómo le pegó al mercado: BTC a US$ 76.400 y US$ 1.570 M en liquidaciones

Si tenés cripto en un exchange, esto te interesa. Y no te olvides: si no tenés tus claves, no son tus monedas 🔑

👉 Seguí esta cuenta y entendé el mercado antes que el resto.
📲 Compartilo con alguien que tenga cripto en un exchange.

💬 ¿Vos tenés tus cripto en un exchange o en una wallet propia? Contame abajo 👇

—
Datos al 30/10/2026. Fuentes: Binance, Chainalysis, TRM Labs, Arkham, Bitquery y CoinDesk. Las cifras pueden cambiar a medida que avanza la investigación. Contenido educativo, no es recomendación de inversión.

#Binance #Bitcoin #Cripto #Criptomonedas #Hackeo #Trading #BTC #Ethereum #Inversiones #FinanzasPersonales #TradingArgentina #Argentina
```

### Datos de YouTube (video 1, ya subido)
**Título:**
```
Le robaron US$ 6.300 M a Binance en 4 horas 🚨 El mayor hackeo cripto de la historia #shorts
```
**Descripción:**
```
🚨 Le robaron más de US$ 6.300 millones a Binance en menos de 4 horas. Es el mayor robo cripto de la historia: 4 veces más que el récord anterior (Bybit, 2025).

En este short:
🔓 Cómo entraron: la laptop hackeada de un ingeniero y retiros con firmas válidas de la propia Binance
⏱️ Las 4 horas del golpe, minuto a minuto
🇰🇵 Quién estaría detrás: el grupo TraderTraitor (Corea del Norte), según TRM Labs y Chainalysis
💰 Dónde está la plata: ~US$ 3.000 M congelados y entre US$ 2.400 y 3.200 M todavía libres
📉 Impacto en el mercado: BTC a US$ 76.400 y US$ 1.570 M en liquidaciones

🔑 Si no tenés tus claves, no son tus monedas.

🔔 Suscribite y activá la campanita para entender el mercado antes que el resto.
🌐 realinvestors.club
📲 Instagram: @leanalvarez.ok

—
Datos al 30/10/2026. Fuentes: Binance, Chainalysis, TRM Labs, Arkham, Bitquery, CoinDesk e Infobae. Las cifras pueden cambiar a medida que avanza la investigación.
⚠️ Contenido educativo. No es recomendación de inversión. Los CFDs y las criptomonedas son instrumentos de alto riesgo.

#Binance #Bitcoin #Cripto #Hackeo #Trading #Shorts
```
**Etiquetas:**
```
binance, hackeo binance, robo binance, binance hack, mayor robo cripto, bitcoin, btc, ethereum, criptomonedas, cripto, noticias cripto, corea del norte hackers, lazarus, tradertraitor, bybit hack, exchange cripto, seguridad cripto, wallet propia, trading, trading argentina, inversiones, finanzas, real investors club
```

**Configuración:**
- Categoría: Noticias y política (o Educación).
- Idioma: Español (Latinoamérica).
- No es para niños.
- **Contenido alterado/sintético: Sí** (por la voz).
- Fotograma de portada: el contador "US$ 6.300 M", alrededor del segundo 3.

**Comentario fijado:**
```
¿Vos tenés tus cripto en un exchange o en una wallet propia? 👇 Te leo en los comentarios.
```

---

## 7. Video 2: "Perfil de volumen" (entregado)

**Fuente:** video de @sniper600news sobre perfil de volumen (POC, área de valor del 70%, lectura adentro/afuera, señal en el borde, combinación con Bollinger, Wyckoff y "el rombo"). Ese video cerraba con "Dentro, se espera. En el borde, se decide." y una pregunta.

**Adaptación RIC:**
- "El rombo" es un indicador propio de esa cuenta, así que se reemplazó por **oro (XAUUSD) en la apertura de Nueva York**, que es el foco de Lean.
- Se usa voseo argentino.
- Los gráficos son sintéticos y se aclara "ilustrativos".

**Entregables:**
- `RIC_Perfil_de_Volumen_Reel_Instagram.mp4`
- `RIC_Perfil_de_Volumen_Short_YouTube.mp4`
- Duración: 1:45 cada uno. En YouTube, solo el nombre del canal.

### Escenas y guion
| # | Pantalla | Locución |
|---|---|---|
| 1 | "LO QUE LAS VELAS NO TE MUESTRAN": velas hechas de partículas doradas | Cada vez que alguien compra o vende, deja una huella en el precio. Si juntás todas esas huellas, ves algo que las velas no te muestran: dónde se puso de acuerdo el mercado. |
| 2 | "PERFIL DE VOLUMEN": las partículas de las velas se deslizan y forman el perfil | Se llama perfil de volumen. Son barras que miden cuánto se negoció en cada precio. |
| 3 | "POC Y ÁREA DE VALOR": POC resaltado + 70% del volumen | La barra más larga es el pok: el precio más negociado. A su alrededor está el setenta por ciento del volumen. Eso es el área de valor: el precio que el mercado aceptó como justo. |
| 4 | "IDEA 1 · ADENTRO: EQUILIBRIO": velas oscilando dentro de la zona | ¿Cómo se lee? Con dos ideas. Primera: adentro del área de valor, compradores y vendedores están de acuerdo. El precio va de un borde al otro, sin ir a ninguna parte. |
| 5 | "IDEA 2 · AFUERA: EL PRECIO CORRE": ruptura por el "HUECO" hasta un "NUEVO ACUERDO" | Segunda: afuera, el volumen se seca. Donde casi no hay barras, el precio cruza rápido, hasta encontrar otro acuerdo. |
| 6 | "LA SEÑAL ESTÁ EN EL BORDE": ✓ se queda afuera = movimiento / ✗ vuelve a entrar = trampa | Por eso, la señal está en el borde. Si el precio sale y se queda afuera, hay movimiento. Si vuelve a entrar, era una trampa. |
| 7 | "Y SIRVE CON CUALQUIER ESTRATEGIA": chips Bollinger / Wyckoff / Oro en NY + **CTA del medio** | Y esto sirve con cualquier estrategia. + CTA del medio |
| 8 | "CON BOLLINGER": ✗ rompe la banda pero sigue adentro / ✓ sale de la zona | Con Bólinger: las bandas se aprietan adentro del valor. Y la ruptura que vale, es la que además sale de la zona. |
| 9 | "CON WYCKOFF": rango = área de valor · SPRING · RUPTURA · TEST → ENTRADA | Con Uáicof: el rango es el área de valor. El esprín la perfora y vuelve. Y la entrada llega cuando rompe por arriba, y prueba el borde desde afuera. |
| 10 | "EN EL ORO · APERTURA DE NY": área de valor de ayer · abre afuera · vuelve a entrar → cruza al otro borde | Y en el oro: marcá el área de valor del día anterior. Si Nueva York abre afuera y se sostiene, buscá continuidad. Si vuelve a entrar, muchas veces cruza hasta el otro borde. |
| 11 | "ADENTRO, SE ESPERA. EN EL BORDE, SE DECIDE." + "¿Entrás adentro o esperás que salga?" | Adentro, se espera. En el borde, se decide. ¿Y vos? ¿Entrás adentro de la zona, o esperás a que salga? Te leo en los comentarios. |
| 12 | Cierre IG / YT (sección 5) | Ver sección 5 |

### Copy de Instagram (video 2)
```
Las velas no te muestran lo más importante: dónde se puso de acuerdo el mercado 📊

Se llama PERFIL DE VOLUMEN y te cambia la forma de leer un gráfico:

🟡 POC: el precio más negociado
🟡 Área de valor: donde se concentra el 70% del volumen
⚖️ Adentro, el precio va de borde a borde sin ir a ningún lado
🚀 Afuera, donde casi no hay volumen, el precio corre rápido

La clave está en el BORDE: si sale y se queda afuera, hay movimiento. Si vuelve a entrar, era una trampa.

Y lo podés sumar a Bollinger, Wyckoff o a tu operativa en oro en la apertura de Nueva York.

Adentro, se espera. En el borde, se decide.

💬 ¿Vos entrás adentro de la zona o esperás a que salga? Te leo 👇
👉 Seguí esta cuenta y entendé el mercado antes que el resto.
📌 Guardalo para tu próxima sesión.

Contenido educativo. No es recomendación de inversión. Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero.

#PerfilDeVolumen #VolumeProfile #Trading #TradingArgentina #XAUUSD #Oro #AnalisisTecnico #Wyckoff #Bollinger #Forex #Cripto #DayTrading
```

### Datos de YouTube (video 2)
**Título:**
```
Perfil de volumen: lo que las velas NO te muestran 📊 POC y área de valor #shorts
```
**Descripción:**
```
Las velas no te muestran dónde se puso de acuerdo el mercado. El perfil de volumen sí.

En este short:
🟡 Qué es el POC y el área de valor (70% del volumen)
⚖️ Adentro del valor: equilibrio. Afuera: el precio corre
🎯 Por qué la señal está en el borde y cómo detectar la trampa
📈 Cómo combinarlo con Bollinger, Wyckoff y con el oro en la apertura de Nueva York

Adentro, se espera. En el borde, se decide.

🔔 Suscribite y activá la campanita para entender el mercado antes que el resto.
🌐 realinvestors.club
📲 Instagram: @leanalvarez.ok

⚠️ Contenido educativo. Gráficos ilustrativos. No es recomendación de inversión. Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero.

#PerfilDeVolumen #Trading #Shorts
```
**Etiquetas:**
```
perfil de volumen, volume profile, poc trading, área de valor, value area, análisis técnico, trading, trading argentina, xauusd, oro trading, wyckoff, bandas de bollinger, day trading, scalping, forex, cripto, cómo leer el volumen, real investors club
```

**Configuración:**
- Categoría: Educación.
- **Contenido sintético: Sí**.
- Portada: el perfil dorado con "POC" y "70%", alrededor del segundo 20.

**Comentario fijado:**
```
¿Vos entrás adentro de la zona o esperás a que salga? 👇
```

---

## 8. Análisis de retención (Reel "Perfil de volumen" en Instagram)

**Captura de las estadísticas del reel (31/10/2026):**
- Curva de retención:
  - Cae de **100% a ~45% en los primeros ~3 s**.
  - Baja a ~15–20% hacia los 8 s y después queda **casi plana**.
  - Tiene escalones chicos cerca del minuto y termina en ~5% a los 1:45.
- Orígenes de las visualizaciones: **Feed 55,4%** · pestaña Reels 36,5% · Explorar 8,1%.
- Reposts y comentarios: 0,0%.

**Diagnóstico:**
1. **El problema es el gancho (0–3 s):** el primer fotograma es casi negro porque las partículas aparecen de a poco y el título es chico. En el Feed parece un video que no cargó.
2. Frase de apertura lenta y abstracta, sin un problema ni una promesa.
3. **El 55% viene del Feed, donde el video arranca sin sonido**, y no había subtítulos sincronizados.
4. Duración excesiva (1:45) para una cuenta de ~3.700 seguidores, con la voz lenta.
5. Varias ideas en un solo reel (concepto + 3 aplicaciones).
6. La meseta indica que **quienes pasan el gancho se quedan**: el contenido funciona.

**Objetivos de referencia:** más del 60% de retención a los 3 s y más del 30% a la mitad del video.

---

## 9. Reglas obligatorias para los PRÓXIMOS videos (pedido de Lean: no rehacer los publicados)

1. **Gancho fuerte visible desde el primer fotograma (cuadro 0):** frase grande en dos líneas con movimiento inmediato. Nada de arranques en negro ni de fade-in largo.
   Ej.: "SI OPERÁS SOLO CON VELAS, TE FALTA LA MITAD DEL GRÁFICO".
2. **La voz arranca en el segundo 0**, con la misma frase del gancho y sin intro musical.
3. **Subtítulos sincronizados palabra por palabra**, grandes y centrados, con la palabra clave en dorado (clave para el Feed sin sonido).
4. **Duración de 35 a 50 s y una sola idea por video.** Los temas largos se dividen en serie (parte 1 / parte 2).
5. **Voz a ritmo normal pero claro** (length-scale ~1.0), manteniendo las pronunciaciones de la sección 4.
6. **Un cambio visual cada 2–3 s:** corte, zoom o número que salta.
7. **Bucle abierto al inicio:** "Quedate hasta el final, que te muestro…".
8. **Instagram: sin CTA en el medio.** Cierre corto (~3 s) con "SEGUÍ ESTA CUENTA" y pedido de comentario con palabra clave (ej. "Comentá BORDE y te mando…").
9. **YouTube:** se mantiene el cierre de suscripción + campanita, con **solo el nombre del canal**.
10. Actualizar el **número real de seguidores** de Instagram en la tarjeta de cierre.

---

## 10. Proceso técnico (para reproducir)

**Entorno:** contenedor Linux en la nube, con Python 3.13 (PIL, numpy, soundfile, pyworld), ffmpeg, piper-tts y sherpa-onnx.

**Restricciones de red:**
- **HuggingFace e Instagram están bloqueados.**
- **GitHub releases sí funciona.** Los modelos se bajan desde el mirror de sherpa-onnx:
  - Voz TTS: `vits-piper-es_AR-daniela-high.tar.bz2` (en `tts-models`).
  - Transcripción del audio de los videos fuente: `sherpa-onnx-whisper-small.tar.bz2` (en `asr-models`), con idioma `es`, en bloques de 25 s.

**Pipeline:**
1. **Análisis del original:** hoja de fotogramas (ffmpeg `fps` + `tile`) + transcripción con Whisper (sherpa-onnx).
2. **Verificación de datos** con búsqueda web (para noticias).
3. **Guion** en voseo, con las pronunciaciones de la sección 4 y los números en palabras.
4. **Voz:** `echo "<texto>" | python3 -m piper -m es_AR-daniela-high.onnx --length-scale X --sentence-silence 0.35 -f seg_N.wav`, un archivo por escena. Se mide la duración de cada uno con ffprobe.
5. **Duración de cada escena** = voz + ~0,8 s (la voz arranca a +0,35 s del inicio de la escena).
6. **Render:** script Python que dibuja cada cuadro con PIL/numpy (partículas + textos + gráficos) y lo pasa a ffmpeg (libx264, preset veryfast, crf 18, yuv420p), **un archivo por escena**. Las escenas compartidas se renderizan una sola vez; las de CTA, una por versión (`scenes_ig/`, `scenes_yt/`).
7. **Unión** con el demuxer concat y `-c copy`.
8. **Audio:** script que genera la música + efectos, ubica las voces en sus tiempos, baja la música bajo la voz, agrega fades y mezcla. Después se muxea con `-c:v copy -c:a aac 192k -movflags +faststart`.

**Archivos del pipeline (incluidos en el .zip adjunto):**
- `render.py`: renderer del video 1 (Binance).
- `render2.py`: renderer del video 2 (perfil de volumen).
- `cta.py`: módulo de CTA reutilizable.
  - Tarjeta de perfil de Instagram (`ig_card`) y tarjeta de canal de YouTube (`yt_card`).
  - Píldora del CTA del medio (`pill`), cursor y animaciones.
  - Clase `CTA(variant)` con `.mid()` y `.end()`.
- `mix.py` / `mix2.py`: mezcla de audio por versión (`ig` / `yt`).
- `avatar.png` (foto de Lean) y `avatar_ric.png` (logo de RIC en círculo).
- `segs*.txt`: guiones de la voz.

**Uso:**
```
VAR=ig python3 render2.py r <índices de escena>
VAR=yt python3 render2.py r <índices>
VAR=ig python3 render2.py still <escena> <segundo>    # cuadro de prueba
```

---

## 11. Pendientes y datos a pedir

- [ ] **PNG original del logo de RIC** en alta resolución (el actual sale de una captura).
- [ ] **Cantidad de suscriptores** del canal de YouTube, si se quiere mostrar en la tarjeta.
- [ ] **Número de seguidores de Instagram actualizado** en cada video nuevo.
- [ ] Definir la **palabra clave** del CTA de comentarios y qué se envía (PDF, ejemplo, etc.).
- [ ] Opcional: tarea programada para revisar @sniper600news con el navegador de la app de escritorio.
- [ ] Opcional: mejorar la voz (grabación propia de Lean o ElevenLabs con voz masculina argentina). Piper no tiene una voz masculina argentina.
- [ ] Aplicar las **reglas de la sección 9** desde el próximo video de @sniper600news.
