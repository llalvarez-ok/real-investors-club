# Diagnóstico de calidad · por qué nuestras piezas no llegan · 23/11/2026

Valeria (reclutadora y directora de excelencia). Pedido de Lean del 23/11: «Horrible, no me gustó… El trabajo siempre es
mediocre… Veo otros usuarios consiguiendo millones de visitas y nosotros nada».

Evidencia usada: la vara nueva (`diseno/estandar-excelencia.md`, 14 referencias reales, 7 con transcripción con tiempos),
las hojas de contacto finales de Instagram del Reel «Bitcoin y el oro cayeron juntos» y de «La serpiente y el serrucho» v2,
sus guiones (`produccion/reel-btc-oro-juntos/guion.md`, `produccion/reel-serrucho/guion.md`), los datos de Instagram del
14/11 (`analisis/2026-11-14-revision-instagram.md`) y los rechazos de Lean anotados en `CLAUDE.md` (Estado).

## En una línea

Hacemos **informes animados sin nadie adentro**, y los aprobamos nosotros mismos. Las referencias que llegan al millón son
**personas en conflicto con plata en juego desde el segundo 0**. Ninguna mejora de técnica cierra esa distancia.

## 1. Lo que se ve en las dos hojas, contra la vara

### «Bitcoin y el oro cayeron juntos» (16 cuadros, ~3 s cada uno)

| Criterio | Nota | Evidencia en la hoja |
|---|---|---|
| C1 Cuadro 0 sin sonido | 3 | Un gráfico de dos líneas que ocupa ~15 % de la altura, «¿TU PLATA ESTÁ ACÁ?» chico arriba y «BTC −27 % ORO −12 %» chico abajo. A tamaño de celular no se entiende en 0,5 s qué está en juego. |
| C4 Persona | 0 | No hay nadie en ningún cuadro. La única cara es la foto de la tarjeta de Instagram, en el cierre. |
| C5 Ocupación | 2 | En 14 de 16 cuadros la mitad de abajo de la zona útil está vacía (azul liso). |
| C6 Cambio visual | 3 | Títulos repetidos en cuadros seguidos: «ESTÁ ABAJO JUNTOS» ×3, «3 MESES DESPUÉS» ×4, «2 DE 3 SUBIERON» ×3, «¿Y SI ES 2022?» ×2. Mismo fondo en los 16. |
| C7 Progresión | 3 | Es una tabla de 3 filas contada en voz alta: 2020 +81 %, 2022 −20 %, 2026 +32 %. No le pasa nada a nadie. |
| C9 Subtítulos | 4 | Frases cortadas en pantalla: «JUNTOS. SI TU PLATA ESTÁ EN», «20 DÍAS DE MERCADO, BITCOIN», «PERDIÓ EL 27 % Y EL ORO,», «AGUANTARÍAS SI SE REPITE 2022.». |
| C11 Cierre | 3 | «Comentá REBOTA o SIGUE» pide una predicción en público, lo que la revisión del 14/11 dijo que no hay que hacer. Y el guion se contradice: el 08 dice «la pregunta no es si rebota» y el 09 pide apostar si rebota. |
| C12 Reglas | 9 | Datos verificados, aviso, contenido sintético. Bien. |

El propio video se desarma: el sello «3 CASOS ≠ ESTADÍSTICA» le dice al que mira que lo que acaba de ver no sirve.

### «La serpiente y el serrucho» v2

| Criterio | Nota | Evidencia en la hoja |
|---|---|---|
| C1 Cuadro 0 | 5 | Un serrucho con una serpiente enroscada y «UNA SERPIENTE SE MATÓ SOLA». Se entiende, pero el objeto ocupa ~20 % de la pantalla y es un dibujo, no algo real. |
| C2 Primera frase | 5 | Una fábula. El trader recién aparece en la segunda frase; la plata, en el cuadro 7 (~21 s). |
| C4 Persona | 1 | «Martín» es una tarjeta con una «M» y una barra. Nadie siente nada. |
| C5 Ocupación | 2 | En 12 de 16 cuadros más de la mitad de la zona útil está vacía; los cuadros de «3 REGLAS» son casi todos fondo. |
| C6 Cambio visual | 3 | «SE ENOJA» ×3, «3 REGLAS» ×3, «PARA EL PRÓXIMO STOP» ×2, «LA SERPIENTE Y EL SERRUCHO» ×2. |
| C7 Progresión | 6 | La fábula sí progresa (roce, mordida, se enrosca, muere), pero la parte de trading es un contador que baja. |

## 2. Por qué no llegamos (separado por culpa)

### Culpa del proceso (lo resuelve el equipo)

1. **Nos aprobamos solos.** El guion de BTC-oro tiene la rúbrica de Rocío con todo en 8 y 9 y el «producir» de Nacho.
   Lean dijo «horrible». El serrucho pasó tres versiones con críticos internos y Lean lo rechazó tres veces (siluetas,
   gancho, todo). La rúbrica mide reglas de guion, no si la pieza le gana a un video del millón en el feed. **Nunca se
   comparó una pieza con una referencia real antes de entregarla.**
2. **Se produce para probar técnica, no para ganar.** «Probar lo nuevo» (BTC-oro) llevó a medir lectura y movimiento
   (`lectura.js`, `movimiento.py`), que son condiciones necesarias, no la razón por la que alguien se queda.
3. **No se respetan las conclusiones propias.** La revisión del 14/11 dijo: no pedir predicciones, Lean a cámara dos veces
   por semana, 40–50 s. BTC-oro pide predicción, no tiene a Lean y nadie lo frenó.
4. **Cada rechazo de Lean se arregla en lo que señaló y no en la causa.** Siluetas → vectores; gancho → otro gancho; audio
   → `clon_continuo.py`. La causa común (no hay nadie en el video y no hay nada en juego) no se tocó nunca.
5. **El audio se rehace pieza por pieza.** Hubo audios mal cortados (orderflow v1, Nvidia, P27 «licuidaciones»). Las
   herramientas existen (`clon_tiempos.py`, `clon_continuo.py`), pero no hay una persona responsable de escuchar la mezcla
   final con whisper antes de entregar.

### Culpa del estilo (lo resuelve el equipo, con otra dirección de arte)

1. **Todo es una lámina:** el mismo azul noche en todos los cuadros, un objeto chico en el centro y un título arriba. Se
   ve como un panel de datos, no como un video. Las referencias del millón son personas, escenas o un gráfico que llena la
   pantalla con una pregunta para jugar.
2. **Ocupamos un cuarto de la pantalla.** El resto queda vacío por respetar zonas seguras con elementos chicos. La zona
   segura dice dónde va el texto, no que el protagonista tenga que ser chico.
3. **Repetimos la composición** 3 o 4 cuadros seguidos y lo único que cambia es un número.
4. **Metáforas que hay que descifrar** (serpiente, góndola, mandarinas, pizarra con dibujos): Lean las rechazó todas
   («absurdo», «no me gustan los dibujos», «no se nota que es una serpiente»). Lo que aprobó (Corea, Bitcoin dos zonas,
   orderflow v3) es **real**: fotos reales, gráficos reales, el libro de órdenes como lo ve un trader.

### Lo que el equipo no puede resolver solo

1. **La cara de Lean.** Las 7 referencias transcriptas tienen una persona (o un desafío). Nuestros picos de comentarios
   (27 y 29) fueron con Lean a cámara. Sin Lean grabando 30–40 s con el celular dos veces por semana, el techo es el de
   Corea: ~5.700 cuentas.
2. **El tamaño y la marca de la cuenta.** El mismo tema (robo a Binance) hizo 1,5 M en Latinus y 664 vistas en nuestro
   Short. Una parte de la distancia es distribución y no calidad: no hay que prometerle a Lean el millón con estas cuentas.
3. **El tema.** «Bitcoin y el oro cayeron juntos» es una correlación abstracta, no una historia. Los temas que llegan
   tienen villano, cifra enorme o algo que le pasa al que mira. Elegir mejor sí es del equipo; que haya noticia grande
   esa semana, no.
4. **La frecuencia.** Los canales de las referencias publican Shorts casi todos los días; nosotros, un Reel por semana en
   Instagram. Con una pieza por semana cada error pesa el doble. Subir la frecuencia depende de cuánto graba Lean.

## 3. Qué cambia desde hoy

- **Equipo nuevo** (ver `.claude/agents/`): estratega, guionista corto, directora de arte, editor de ritmo y sonido,
  analista de datos y cumplimiento. Los rechazos de Lean están escritos como requisitos en cada perfil.
- **Nada llega a Lean sin el APROBADO de Valeria** en `analisis/calidad/AAAA-MM-DD-<pieza>.md`, con la comparación a
  ciegas contra 3 referencias de `diseno/estandar-excelencia.md`.
- **Formato por defecto para noticias:** Lean a cámara en la primera frase + expediente cine con pruebas reales que llenen
  la pantalla. Sin Lean, la pieza se marca de entrada como «techo bajo» y no se promete otra cosa.
- **Pruebas nuevas con evidencia:** sketch de «dos vidas» con personas y el desafío «¿compra o venta? 3 segundos» sobre
  un gráfico real.
