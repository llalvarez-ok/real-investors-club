---
name: ric-retencion
description: >-
  Dónde se va la gente de un video de RIC y qué decía la voz en ese segundo, con la curva de retención de YouTube
  Analytics. Usar para "por qué no lo miran", "retención", "dónde se van", "qué mejorar del video", o unos días
  después de publicar.
---

# ric-retencion

```bash
python herramientas/retencion.py <id del video> --tiempos produccion/<id>/tiempos.js
```

Los datos llegan a Analytics 2 o 3 días después de publicar. Con menos de 100 vistas la curva es ruido.

## Tres problemas distintos

- **FUGA DEL GANCHO:** lo perdido antes de los 30 s. Menos de 25 % está bien. Se arregla en los primeros 15
  segundos del guion (ver `ric-guion`), nunca en la edición.
- **CAÍDAS:** bajadas bruscas en un punto. Con `--tiempos` dice qué palabras sonaban: un cambio de tema sin aviso,
  una explicación larga, un tramo sin dibujos nuevos en la pizarra.
- **GOTEO:** la pérdida pareja del medio. Es ritmo: cortar, no reescribir.

## Qué devolver

La UNA fuga más grande y el UN cambio para la próxima (no una lista de cinco). Si la fuga del gancho está bien y el
goteo es bajo, el video está bien y el problema es el empaque: ir a `ric-empaque`. Anotar lo aprendido en
`diseno/ESTILO-PILAR.md` para que valga para los próximos.
