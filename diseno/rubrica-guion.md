# Rúbrica del crítico de guiones (antes de entregarle un guion a Lean)

Desde el 04/11/2026 (pedido de Lean: «¿quién controla al guionista y analiza el impacto?»), todo guion pasa por un crítico
que no lo escribió (un subagente con los ojos limpios) antes de llegar a Lean. Puntúa de 1 a 10 cada criterio (son 12) y pide cambios
concretos hasta que todos lleguen a 8. Si el guion corrige uno anterior, el crítico revisa también que no se haya perdido lo
que funcionaba.

1. **Cumple el pedido:** responde todo lo que Lean pidió, con su enfoque (tema, datos, tono, formato), y no perdió lo que Lean
   valoró de versiones anteriores.
2. **Gancho:** en los primeros 3 segundos nombra al espectador o su situación y el tema; nada de «hola».
3. **Valor para el espectador:** deja algo para hacer o pensar distinto (no solo información), sin recomendaciones de compra o
   venta ni promesas.
4. **Prueba:** cada afirmación importante tiene un dato verificable (fuente o cálculo propio con datos reales).
5. **Una idea central:** todo el guion la sirve; lo que no la sirve se va.
6. **Ritmo y largo:** frases cortas para decir en voz alta; 35 a 60 s en Shorts y Reels.
7. **Cierre:** pregunta o pedido de comentario concreto; en YouTube, suscripción a Real Investors Club.
8. **Reglas de RIC:** voseo en Shorts y Reels (tú en lecciones y pilares), números en palabras para la voz, sin brókers,
   aviso cuando un dato es estadística y no promesa.
9. **Potencial de impacto:** ¿alguien lo guardaría o se lo mandaría a un amigo? ¿Por qué?
10. **Contexto del dato** (sumado el 04/11/2026): cada estadística se compara con algo (¿qué pasa en un período
    cualquiera?) y, si existe, con los casos parecidos al de hoy. Un «19 de 19» sin base de comparación exagera.
11. **Vigencia** (sumado el 04/11/2026): nada de «anoche» u «hoy» si el video se publica uno o más días después de
    grabarse; el texto tiene que entenderse el día que sale.
12. **Puntuación para la voz** (sumado el 07/11/2026, Lean: «la puntuación mal puesta le cambia el sentido a las frases»).
    Las voces sintéticas y clonadas entonan según la puntuación, y los subtítulos la copian. Ejemplo real: «¿La diferencia?
    No fue la estrategia. Fue cuánto se animó a perder.» salió como «La diferencia no fue la estrategia. ¿Cuánto se animó
    a perder?». Reglas:
    - Nada de preguntas de una o dos palabras («¿La diferencia?»): o una pregunta completa entre sus dos signos, o una
      afirmación con dos puntos («La diferencia: no fue la estrategia»).
    - En las cuentas dichas, dos puntos como «igual a» («Siete por cien: setecientos»), nunca coma.
    - Dos puntos antes de una enumeración larga, para que se entone como lista.
    - Coma después de una frase de tiempo o condición al principio («Después de ocho pérdidas, piensa:»); entre sujeto y
      verbo, nunca (salvo la coma de palabra omitida, igual en toda la serie: «El tercero, perdió…»).
    - «Ojo:» y «Y lo más importante:» con dos puntos, no con coma.
    - Después de generar la voz, `herramientas/voces/verificar_voz.py` compara la transcripción con el guion (palabras y
      signos de pregunta) y marca las escenas que hay que regenerar. Los subtítulos usan la puntuación del guion, no la de
      whisper.
