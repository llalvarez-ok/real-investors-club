# Plan de contenido público: 27/10/2026

Pedido de Lean: contenido nuevo, independiente de la academia, para sumar suscriptores y llegar más rápido a la monetización. Las lecciones pasan a ser en su mayoría para los alumnos.

Se apoya en la auditoría (`2026-10-27-auditoria-canal.md`) y en el estudio de crecimiento (`2026-10-27-estudio-crecimiento.md`). **[F]** marca lo que tiene fuente en el estudio y **[J]** lo que es criterio propio.

## 1. La cuenta de la monetización

- **[F]** Nivel inicial del YPP: 500 suscriptores y 3.000 h públicas en 12 meses (o 3 M de vistas de Shorts en 90 días). Anuncios: 1.000 suscriptores y 4.000 h; según el estudio, desde el 01/02/2027 pasan a ser 8.000 h para quien se postule por primera vez. Hay que confirmarlo en la página oficial antes de decidir nada.
- Hoy: 22 suscriptores y 15,8 h. **Las horas de los Shorts no cuentan**: las horas salen solo de los videos largos.
- **[J]** 3.000 h en 12 meses son 250 h por mes. Con videos de 8 minutos vistos al 40 % (~3,2 min por vista), hacen falta ~4.700 vistas por mes de videos largos. Hoy el canal hace ~120. **No se llega empujando por WhatsApp: hace falta que YouTube recomiende (página principal y sugeridos) o que los videos posicionen en la búsqueda.**
- **[J]** Por eso los videos públicos nuevos tienen que ser:
  1. **Para quien no conoce RIC.** El tema es el problema del espectador, no el programa.
  2. **Buscables o compartibles.** Responden algo que la gente busca ("cómo saber si una inversión es una estafa") o que dan ganas de mandar ("mira esto antes de poner plata").
  3. **De 8 a 12 minutos.** Más horas por vista, y desde los 8 minutos se pueden poner anuncios en el medio cuando el canal esté monetizado.
- Los Shorts quedan como embudo: traen suscriptores y mandan al video largo.

## 2. Qué pasa con las lecciones

- **Recomendación:**
  - Las 6 lecciones públicas del Nivel 0 quedan públicas. Son 15,8 h que ya cuentan para el YPP, y si se ponen privadas dejan de contar.
  - Los niveles 1 a 5 van **no listados**, no privados. Un video privado solo lo ven hasta 50 cuentas invitadas una por una; uno no listado lo ve cualquiera con el enlace, que es lo práctico para los alumnos.
- **Falta que decida Lean:** si el resto del Nivel 0 (lecciones 7 a 21) sale público o no listado.
  - **[J]** Si sale público, funciona como "curso gratis" y suma horas.
  - Si sale no listado, el canal público queda solo con contenido pilar.

## 3. Los cuatro pilares (del estudio de crecimiento)

1. **Anti-humo y estafas:** Ponzi, señales pagas, copy trading, promesas imposibles y deepfakes.
2. **Psicología del inversor:** aversión a la pérdida, FOMO, creencias y abandono.
3. **Conceptos esenciales:** interés compuesto, inflación, diversificación y riesgo.
4. **Expectativas reales:** cuánto rinde de verdad, vivir del trading y la cuenta detrás de las promesas.

**[J]** El pilar 1 va primero: es el hueco del nicho ("el canal que te dice la verdad antes de que pierdas dinero"), tiene búsqueda en Argentina y México, y es donde RIC ya tiene material propio (módulo "Protégete" y módulo de la CNV). Los datos propios coinciden: el Short de "10 % semanal" sumó 44 vistas en horas, más que cualquier otro.

**Formato recurrente [J]:** "Le hago la cuenta". En cada video se toma una promesa típica de redes y se le hace la cuenta en pantalla. Nunca se nombran empresas o personas sin una alerta oficial (CNV, CNMV, etc.) que lo respalde. Un formato fijo baja el costo de producción y le da identidad al canal.

## 4. Primeros 8 videos largos

| # | Título tentativo | Pilar | Por qué | Material |
|---|---|---|---|---|
| P01 | Cómo saber si una inversión es una estafa: 7 señales | 1 | Búsqueda alta y para compartir | 0-3-0, 0-5-1. **Guion hecho** |
| P02 | Qué es un esquema Ponzi y por qué siempre termina igual | 1 | Búsqueda; la animación muestra el colapso | 0-3-0 + animación nueva |
| P03 | ¿Se puede vivir del trading? La cuenta con 1.000, 10.000 y 100.000 dólares | 4 | Búsqueda y debate en comentarios | 0-1-1 |
| P04 | Cómo verificar si una empresa está autorizada por la CNV (en 2 minutos) | 1 | Búsqueda muy específica de Argentina, poca competencia | 0-5-1 |
| P05 | Señales de trading por Telegram: por qué casi nunca funcionan | 1 | Búsqueda | 0-3-0 |
| P06 | Interés compuesto sin humo: 100 dólares por mes durante 20 años | 3 | Búsqueda permanente; datos reales del S&P 500 | animación existente + yfinance |
| P07 | Por qué vendes justo cuando baja: la aversión a la pérdida con números | 2 | Descubrimiento | 0-1-x |
| P08 | Le hago la cuenta a 5 promesas de redes | 4 | Descubrimiento; arranca el formato recurrente | 0-1-1 |

Cada uno lleva entre 3 y 5 Shorts, sacados con `herramientas/crear_shorts.py` y con enlace al video largo.

## 5. Cadencia [J]

- **Meta:** 1 video largo pilar y 4 o 5 Shorts por semana, con el mismo día y la misma hora fijos. Si se sigue con el Nivel 0 público, una lección cada dos semanas.
- **El límite real son los créditos de HeyGen.** Un video de 8 minutos son unos 8 minutos de avatar. Falta saber cuántos minutos por mes tiene Lean.
- **Si no alcanzan, alternativas:**
  - Avatar solo en el gancho, en la mitad y en el cierre, y el resto con láminas y voz.
  - Lean graba su voz real con el celular (con "tú") y el video va con láminas y animaciones. Es lo más barato, suena humano y no es contenido sintético.

## 6. Cómo es un video pilar (distinto de una lección)

- **Gancho de 5 segundos** con una promesa concreta y un bucle abierto ("quédate hasta la séptima").
- **Sin "Hoy vas a aprender"**, sin actividad en demo y sin "Así lo hacemos en RIC" como bloque de clase. Al final, una mención breve del Nivel 0 gratis como paso siguiente.
- **Cambio de escena cada 30 a 60 segundos** (lámina, animación, ejemplo, tabla) para sostener la retención.
- **Pedido de suscripción a la mitad**, después de haber dado valor; nunca al principio.
- **Pedido de comentario concreto** ("cuál es la promesa más exagerada que viste"), que además da ideas para el formato "Le hago la cuenta".
- **Cierre:** el próximo video (pantalla final), la web y el aviso legal.
- **Lo que no cambia:**
  - Las reglas editoriales: "tú", nada de recomendaciones ni promesas, datos de la lectura o marcados como ejemplo ("Supón que…").
  - El contenido sintético declarado.
- **Título y miniatura:** el criterio de `docs/prompt-maestro.md`, sección 6, sin " · Lección N". Miniatura con 2 a 4 palabras grandes y un elemento visual que se entienda en un celular.

## 7. Cómo se mide

- Se repite `herramientas/auditar_canal.py` cada semana y se revisa en YouTube Studio:
  - **CTR:** si a las 48 h está debajo del 3 %, se cambia la miniatura o el título.
  - **Retención a 30 s:** más de 60 %.
  - **Porcentaje visto:** más de 40 %.
  - **Suscriptores por cada 1.000 vistas.**
- **Fuentes de tráfico:** el objetivo de los primeros 2 meses es que búsqueda, sugeridos y página principal pasen del 6 % actual a más del 30 %.
- En la semana 4 y en la 8, el pilar con más suscriptores por cada 1.000 vistas gana el doble de espacio.

## 8. Qué tiene que decidir Lean

1. Si el resto del Nivel 0 sale público o no listado.
2. Cuántos minutos de HeyGen hay por mes, y si quiere probar con su voz real en algunos videos.
3. Aprobar el guion de P01 (`produccion/p01-estafas/spec.json`).
