# Ganchos de los videos que más superan a su canal (02/11/2026)

Lista: `python herramientas/nicho.py --top 30` (API de YouTube, últimos 12 meses), guardada en `analisis/2026-11-02-nicho.json`.
De los 30 primeros se eligieron 10 útiles para RIC: se descartaron publicidades de bancos, temas fuera del nicho y canales
repetidos, y se mezclaron largos, Shorts y audiolibros. Transcripciones: Supadata (10 consultas; van 11 de 100 en noviembre),
subtítulos de YouTube. Acá solo se citan frases cortas; las transcripciones no se guardan en el repo (contenido de terceros).

| # | Video | Canal | Múltiplo | Vistas | Tipo | Cómo abre |
|---|---|---|---|---|---|---|
| 1 | 10 reglas que los ricos siguen sin decirte que existen | La Ciencia del Dinero | ×117 | 95 mil | largo, 43 min | **Dos vidas**: «Piensa en alguien que… siempre ha tenido dinero… Ahora piensa en otra persona… que siempre está ajustado» |
| 2 | ¡No conocían los números de su negocio! | José Olivera | ×101 | 99 mil | Short | **Arranque en frío**: un tramo de un programa, empieza en mitad de la frase |
| 3 | Cómo piensan los ricos en la psicología del dinero | Finanzas inteligentes | ×85 | 105 mil | largo, 2 h 48 min | **Dos vidas con un caso real**: un conserje que murió con una fortuna y un ejecutivo de Harvard en bancarrota; después, un estudio con fecha |
| 4 | 10 hábitos gratis que hacen tu vida más «lujosa» | NicoFinanzas | ×44 | 368 mil | largo, 21 min | **El espejo**: «gente que hoy gana más que hace 3 años y aún así siente que vive peor», con detalles de un día común |
| 5 | Este hábito te hará rico | Pablo Chalakani | ×32 | 238 mil | Short | **Arranque en frío** de un video de él explicando con un gráfico |
| 6 | Si no entiendes la deuda, nunca serás rico | Jordi Llàtzer | ×30 | 737 mil | largo, 21 min | **El consejo de siempre**: «No te endeudes… este consejo… es demasiado simple» |
| 7 | Padre rico, padre pobre (resumen) | Construyendo Tu Fortuna | ×30 | 490 mil | audiolibro, 1 h 49 min | **La pregunta incómoda**: «¿Por qué algunas personas parecen avanzar con facilidad… mientras otras se quedan atrapadas?» |
| 8 | ¿No tienes trabajo? 3 formas de generar ingresos | Historias de Finanzas con Jorge | ×25 | 144 mil | largo, 45 min | **La pregunta incómoda** que nombra lo que cree el espectador, después una historia con nombre (Camila) |
| 9 | Cómo invertir en la bolsa con acciones | David Scheuer | ×24 | 38 mil | largo, 31 min | **Resultados de otros** («superaron los 6,2 millones de dólares»): no sirve para RIC |
| 10 | Por qué los jóvenes están atrapados en deudas | DW Cómo te afecta | ×7,5 | 53 mil | Short | **La escena + la cuenta**: «te dicen 4 % mensual… ¿eso a cuánto equivale de manera anual?» |

## Lo que comparten
**Los primeros 10 segundos hablan del espectador, no del tema.** Ninguno abre con «hoy vamos a ver» ni con el nombre del
canal. Abren con una persona parecida a quien mira (otra que gana lo mismo, alguien que gana más y vive peor, alguien que
espera un trabajo) o con algo que el espectador ya cree («no te endeudes», «me falta un empleo»), y en la segunda o tercera
frase dan vuelta esa idea.

Patrones concretos:
1. **Dos vidas.** Los dos de múltiplo más alto (×117 y ×85) abren comparando dos personas con el mismo punto de partida y
   un final opuesto. Es la forma más fuerte de la muestra.
2. **El consejo de siempre.** El de más vistas (737 mil) cita un consejo que todos escucharon y dice que es «demasiado
   simple». No lo contradice: lo matiza.
3. **Detalle cotidiano.** NicoFinanzas no dice «estrés financiero»: dice mensajes al despertar, comer con una pantalla,
   cargos automáticos que no notás. El detalle hace que el espectador se reconozca.
4. **Bucle abierto.** «Quédate conmigo porque lo que vas a descubrir…», «No te vayas todavía, esta historia guarda algo al
   final». Prometen algo que llega más tarde.
5. **Dato con fuente y año** después del gancho, no antes: «un estudio de la Universidad de Cambridge, publicado en 2013…».
6. **Piden comentar, no suscribirse.** Ninguno pide la suscripción al principio; tres piden comentar una palabra
   («claridad», «activo financiero») entre la palabra 120 y la 340, es decir, en el primer o segundo minuto. Dos piden
   suscribirse cerca del final y el resto nunca.
7. **Los Shorts que más rinden son tramos de una persona hablando** (programa de TV, explicación con gráfico), cortados en
   mitad de la frase. Coincide con lo que vimos en Instagram: rinde Lean en persona.

## Qué puede hacer RIC (con sus reglas: nada de «hazte rico», nada de resultados ajenos como promesa)
- **Abrir los videos pilar con «Dos vidas»**, con nombres y números (ya es regla de RIC). Por ejemplo, para un pilar de
  deudas: «Sofía y Martín ganan lo mismo desde hace 10 años. Ella tiene 6 meses de gastos guardados; él vive con la
  tarjeta al límite. La diferencia no es el sueldo.» Agregada como fórmula en `diseno/ganchos.json`.
- **«El consejo de siempre»** para temas de deuda, ahorro o inversión: citar el consejo, decir por qué es simple y matizarlo
  sin invertir el mensaje (nunca empujar a endeudarse). También agregada.
- **Detalles cotidianos** en el primer párrafo, en lugar de conceptos («cargos automáticos que no ves», «el resumen de la
  tarjeta que no abrís»).
- **Una palabra para comentar en el minuto 1** y la suscripción solo al final (regla agregada en `ganchos.json`). En
  Instagram ya se usa la palabra clave con ManyChat; en YouTube sirve igual para el algoritmo.
- **Una frase de bucle abierto** después del gancho, que el video cumpla al final.
- **Shorts con Lean en persona:** tramos de sus vivos o de la reedición del curso, cortados en el momento más fuerte. Es lo
  que más supera a su canal en los Shorts del nicho.
- No copiar el gancho de resultados (video 9): choca con las reglas de RIC.

## Encaje en el plan
Los temas de deuda y de hábitos (videos 1, 4, 6 y 10) entran en el índice de `analisis/2026-10-27-plan-contenido-publico.md`
como pilares de psicología del dinero. Los libros resumidos (video 7) ya estaban marcados en el informe del 29/10 como algo
que funciona («El libro en pocos minutos»).
