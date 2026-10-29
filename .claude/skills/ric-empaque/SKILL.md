---
name: ric-empaque
description: >-
  Título y miniatura de un video o Short de RIC revisados como una sola pieza: largo, dato concreto, palabras
  vacías, voseo, y que la miniatura diga lo que el título no dice. Usar para "título", "miniatura", "thumbnail",
  "empaque", o antes de subir un video.
---

# ric-empaque

El título y la miniatura se leen juntos en el feed. Si dicen lo mismo, se desperdicia la mitad del espacio.

```bash
python herramientas/titulos.py --titulo "…" --html produccion/<id>/miniatura.html
python herramientas/titulos.py --archivo titulos.txt --miniatura "×2 de dolor"
```

## Reglas

- **Título:** el problema primero, con «tú», menos de 60 caracteres (en el celular se ven ~40). Un número, un nombre
  o una fecha. Lecciones: « · Lección N» al final. Shorts: «#Shorts» al final.
- **Miniatura:** 2 a 4 palabras grandes que el título NO tenga, más una imagen de la metáfora. Mismo estilo que el
  video (pizarra blanca para los pilar). El logo oficial, nunca redibujado.
- Cifras llamativas («14.000 %», «10 % semanal») solo como crítica: entre comillas, con signo de pregunta o tachadas.

## Qué devolver

Tres pares título + miniatura ordenados por puntaje, con el que se elige y por qué. Después, el `miniatura.html`
de `produccion/<id>/` actualizado y su render (`node herramientas/miniatura.js`).
