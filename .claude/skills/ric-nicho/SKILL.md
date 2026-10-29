---
name: ric-nicho
description: >-
  Qué está funcionando en el nicho de RIC (finanzas personales, inversión, psicología del dinero, estafas) en
  YouTube en español, ordenado por cuántas veces cada video superó la mediana de su propio canal. Usar para
  "qué temas hacemos", "qué funciona", "ideas de videos", "investigar la competencia", "títulos que funcionan".
---

# ric-nicho

Las vistas solas miden el tamaño del canal, no la idea. Esto mide **cuántas veces un video superó la mediana de su
propio canal**: 50.000 vistas en un canal que suele hacer 5.000 (×10) dicen más que 500.000 en uno que hace 400.000.

```bash
python herramientas/nicho.py --salida analisis/AAAA-MM-DD-nicho.json
python herramientas/nicho.py --consultas "interés compuesto" "inflación" --dias 180 --min 3
```

Usa la API de YouTube con las credenciales de RIC (`RIC_YT_*`). Gasta ~100 unidades por consulta y ~3 por canal
(límite diario 10.000): no correrlo en bucle.

## Cómo leerlo

- **Más de ×100 con muchas vistas suele ser publicidad paga** (bancos, «abre tu cuenta»): descartarlo.
- La fórmula al lado del título (`diseno/ganchos.json`) describe el título, no explica por qué funcionó. Decirlo así.
- Mirar el **patrón**, no el video suelto: qué formatos y fórmulas se repiten entre los que superan a su canal.

## Qué devolver

1. Los 5 videos más útiles para RIC (no necesariamente los de múltiplo más alto: descartar anuncios y temas fuera
   del nicho), con múltiplo, vistas, canal y fórmula.
2. La UNA cosa que comparten.
3. Qué de eso puede hacer RIC en pizarra, con su voz y sus reglas (nada de «hazte rico», nada de promesas), y
   cómo encaja en el índice de `analisis/2026-10-27-plan-contenido-publico.md`.
4. Guardar el informe con fecha en `analisis/`.

Nada se publica desde acá: es investigación.
