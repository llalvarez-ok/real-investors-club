# Estilo de los videos pilar (fuera del programa)

Pedido de Lean del 28/10/2026: los videos por fuera del programa llevan un estilo distinto al de las lecciones.

**Referencia (segunda versión, la que vale):** animación de pizarra como la de Aprendiz Financiero. Lean pasó "Como hacer Videos Animados de pizarra [Videoscribe]" (https://www.youtube.com/watch?v=YQd1jrYjnzo): ese video cuenta cómo hacen los suyos con VideoScribe y dice que les lleva de 15 a 20 h un video de 10 minutos. La primera referencia fue "Educación Financiera para Principiantes" (https://www.youtube.com/watch?v=X38MGyuc0ds). No pude ver ninguno de los dos: YouTube está bloqueado en la nube. Lo de abajo sale de los datos de la API y de lo que se sabe del formato.

Pedidos de Lean sobre la primera prueba:
- Dibujos de más calidad, más realistas y más "interactivos".
- Más presencia de la marca, con una marca de agua de Real Investors Club.

Las lecciones siguen con el estilo de siempre (láminas, avatar y esquema de clase). Esto aplica solo a los videos pilar (`produccion/pNN-*`).

## Pizarra: cómo se ve

- **Fondo:** pizarra blanca (#fdfdfb) con grano muy tenue y una viñeta suave en los bordes.
- **La mano dibuja:** una mano con lápiz (Fluent Emoji) traza primero el contorno de cada ilustración y después aparece el color. El texto se escribe a mano (Caveat) con la mano siguiendo la escritura. Las flechas, los subrayados, las tachaduras y los círculos también se trazan.
- **Ilustraciones de calidad, no dibujadas por mí:**
  - Personajes de Open Peeps (dibujados a mano, CC0) con la ropa en colores de RIC y dos caras cada uno (feliz y preocupada).
  - Objetos de Fluent Emoji de Microsoft (MIT), con volumen y degradés.
  - Están en `herramientas/animaciones/recursos/` (licencias en `LICENCIAS.md`) y se generan con `herramientas/recursos_pizarra.jsx`.
- **Interacción:**
  - Los personajes respiran y cambian de cara cuando la historia cambia.
  - El dinero viaja de un personaje a otro en arco.
  - Al final las cosas tiemblan, se caen con gravedad y se desvanecen.
- **Cámara:** un lienzo más grande que la pantalla. La cámara se desplaza y se aleja a medida que la historia crece, como en VideoScribe.
- **Marca, siempre en pantalla:**
  - El logo oficial en una cápsula azul noche, arriba a la izquierda.
  - La **marca de agua con el logo oficial** abajo a la derecha (20 % de opacidad) y "realinvestors.club" debajo.
  - Los acentos en oro de RIC (subrayados, dinero). Verde (#1f9d63) para lo que parece bien y rojo (#d93a3f) para lo que sale mal.

## Cómo se produce

- **Motor:** `herramientas/animaciones/pizarra.js`. Cada escena es un HTML corto que lista los elementos (`img`, `texto`, `trazo`, `viaje`, `fantasma`), los movimientos de cámara y los temblores, con el segundo en que aparece cada uno, tomado de los tiempos de cada palabra de la voz. Ejemplo: `herramientas/animaciones/ponzi-pizarra.html`.
- **Render:** lo hace `herramientas/animar.js`. Los dibujos complejos lo hacen lento: más de 10 minutos para 28 segundos en un solo proceso. Para un video de 8 minutos hay que repartir el render en varios procesos, como ya se hace con las animaciones de las lecciones.

---

## Primera versión (papel crema), reemplazada

Lo que sigue era la primera propuesta. Vale todavía para el guion, la voz, el título y la miniatura. Lo visual queda reemplazado por la pizarra.

## Qué cambia

| | Lecciones | Videos pilar |
|---|---|---|
| Pantalla | Láminas con viñetas y avatar | Ilustración animada: personajes, objetos y flechas que cuentan la historia |
| Hilo | Estructura de clase | **Una metáfora central** que sostiene todo el video (huevos y gallinas, una pirámide de personas, una gallina de los huevos de oro) |
| Presentador | Avatar en cuadro | **Narración en off**, sin cara en pantalla |
| Fondo | Azul noche con grilla | Papel crema (#f4efe3) con trazo de tinta azul noche (#0d2142) |
| Texto en pantalla | Títulos y viñetas | Solo palabras clave y notas manuscritas cortas; nunca párrafos |
| Ritmo | Una lámina por idea | Algo nuevo aparece cada 3 a 6 segundos, justo cuando la voz lo nombra |
| Duración | 5 a 7 minutos | 6 a 9 minutos (la referencia dura 4; la retención importa más que el largo) |

## Lenguaje visual

- **Trazo hecho a mano:** filtro de desplazamiento sobre toda la tinta y un "hervor" que cambia 8 veces por segundo, como en la animación tradicional.
- **Personajes:** cabeza redonda, cuerpo de campana, ojos de punto y una boca que cambia de sonrisa a preocupación. Cada uno lleva su color y su nombre manuscrito (Ana, Bruno, Carla…).
- **Colores:**
  - Los de RIC sobre papel: oro (#c7a35e, #e2c68c) para el dinero y lo prometido.
  - Verde (#2fb978) para lo que parece bien y rojo (#e5484d) para lo que sale mal.
  - Pasteles solo para la ropa de los personajes.
- **Tipografías:** Archivo 900 para el título de la escena y Caveat para las notas manuscritas.
- **Movimiento:** todo entra con un pequeño rebote, el dinero viaja como monedas en arco y los finales se cuentan con física (lo que se cae, se cae).
- **Marca:** el logo chico arriba a la izquierda, en una cápsula azul noche. Al cierre, el logo, la web y el aviso legal, como siempre.

## Guion

- **El gancho de 5 segundos** sigue igual.
- **La metáfora central se presenta en el primer minuto** y se retoma en el cierre.
  - Para P01 (estafas), la propuesta es "la gallina de los huevos de oro": si alguien tuviera una gallina que pone huevos de oro, ¿te la vendería? Cada señal de estafa es una forma de revisar la gallina.
- **Personas con nombre y números concretos**, marcados como ejemplo cuando no son datos de la lectura ("Supón que…").
- **Frases cortas que se puedan dibujar.** Si una frase no se puede mostrar, se reescribe o se corta.
- **Las reglas de siempre:** "tú", nada de recomendaciones ni promesas, no nombrar empresas sin una alerta oficial y el aviso legal al cierre.

## Voz

- La narración en off resuelve el límite de créditos de HeyGen: no hace falta avatar.
- **Opciones, de mejor a peor:**
  1. **La voz real de Lean**, grabada con el celular en un lugar silencioso y con "tú". Suena humana y, con ilustraciones, no es contenido sintético realista: no hace falta declararlo.
  2. **La voz de HeyGen** sin video. Si es la voz clonada de Lean, se declara como contenido sintético.
  3. **edge-tts:** solo para maquetas, porque se descartó por robótica.
- La animación se sincroniza con los tiempos de cada palabra. Con edge-tts salen de WordBoundary. Con una voz grabada, de whisper con `word_timestamps`, que ya usa `montar_avatar.py`.

## Cómo se produce

- **Cada escena es un HTML** de 1920x1080 en `herramientas/animaciones/` que expone `window.cuadro(t)`, y lo renderiza `herramientas/animar.js` cuadro a cuadro a 30 fps.
- Los momentos clave entran por query string en segundos (`m=`), tomados de los tiempos de las palabras.
- **Prueba hecha:** `herramientas/animaciones/ponzi.html`, la señal 2 de P01 (28,6 s, 858 cuadros, ~2,3 min de render).
- **Pendiente:** separar en un `kit.js` común los personajes, las monedas, los globos, las tachaduras y los sellos, para que cada escena nueva sea solo la coreografía. Los primeros videos van a llevar más trabajo; después baja.

## Título y miniatura

- **Título:** simple y con curiosidad, en el estilo de la referencia ("4 hábitos que te mantienen pobre"). El problema va primero, con "tú", en menos de 60 caracteres, sin número de lección.
- **Miniatura:** un personaje o un objeto de la metáfora, grande, y 2 a 4 palabras. Mismo papel crema, para que se distinga de las lecciones en la página del canal.
