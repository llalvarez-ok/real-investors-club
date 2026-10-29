---
name: ric-guion
description: >-
  Escribir o revisar el guion de un video de RIC (lección o video pilar de pizarra): el gancho con las fórmulas de
  diseno/ganchos.json y su puntaje, y las reglas editoriales (tú, nada de voseo, palabras prohibidas, frases que la
  voz Brian lee en inglés). Usar al escribir un guion nuevo, antes de generar la voz, o para "mejorar el gancho".
---

# ric-guion

Las reglas mandan: `CLAUDE.md` y `docs/prompt-maestro.md` (lecciones), `diseno/ESTILO-PILAR.md` (pilar).

## El gancho (primeros 5 a 15 segundos)

1. Escribir **cinco ganchos** con fórmulas distintas de `diseno/ganchos.json` (la estadística, hagamos la cuenta,
   el error, la pregunta incómoda, la historia de alguien…). Nunca «hola, bienvenidos».
2. Puntuarlos y quedarse con el mejor, o mejorar el más flojo según lo que diga la herramienta:
   ```bash
   python herramientas/gancho.py --archivo ganchos.txt     # uno por línea, ordenados de mejor a peor
   ```
   CONCRETO, TÚ, RIESGO, CURIOSIDAD y LARGO, de 0 a 100. Es una heurística para comparar versiones, no un
   predictor: un puntaje bajo es motivo para mirar de nuevo; uno alto no promete vistas.
3. En finanzas el gancho nunca promete ganancias: promete entender, evitar o hacer la cuenta.

## Antes de generar la voz

```bash
python herramientas/revisar_guion.py produccion/<id>/guion.json   # o spec.json para lecciones
```

Tiene que salir **sin errores (✗)**. Corrige: voseo, «temario», «la IA», exámenes, promesas o recomendaciones,
«plata», y lo que Brian lee en inglés («Resumiendo» → «Repasemos»; nunca frases en inglés como «fear of missing
out»). Los avisos (·) se revisan a criterio. También da palabras, duración estimada y el puntaje del gancho.

## Al escribir

- Una metáfora central (pilar) o la estructura de clase (lección).
- Personas con nombre y números; si no son datos de la lectura o reales, «Supón que…».
- Datos de mercado: reales (yfinance) y contados enteros (si se recuperó después, decirlo).
- Cuando la voz enumera («uno, dos, tres»), cuidar que el número no aparezca antes: si la frase dice «tres
  preguntas» antes de «uno», el dibujo del 3 va atado a la segunda vez que se dice «tres».

Termina con el guion para que Lean lo apruebe.
