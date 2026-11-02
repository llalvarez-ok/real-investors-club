# Mesa de Lean

Página: https://claude.ai/artifact/Ts3PS5vhvbBF7rjuqmethD (privada, fijada en la barra lateral de Lean; copia en `pagina.html`).
Cada agente le pregunta a Lean lo que necesita; él toca una opción o escribe, y con «Mandar al equipo» dispara la tarea
programada **«RIC · Equipo · respuestas de Lean»** (`trig_0199bPxd6fZV6UEENy41B91f`, sin horario: solo se dispara desde la
Mesa) por el conector «Claude Code Remote». Si el disparo falla, las respuestas quedan guardadas y Elena las toma a las 08:40.

## Base de datos (ArtifactData sobre la URL de arriba)
- `config/lean`: `{id}` = el id de Lean en esta página. Solo valen las respuestas con `por` igual a ese id.
- `pedidos/<id>`: `{agente, prioridad (alta|media|baja), estado, creado, pregunta, contexto, opciones: [..], respuesta, por,
  respondido_en, enviado, enviado_en, resultado, hecho_en}`.
  Estados: `abierto` (espera a Lean) → `respondido` (Lean contestó) → `en curso` o `hecho` (el equipo lo hizo; `resultado`
  dice qué). `agente` es uno de: coordinadora, youtube, instagram, pizarra, editor, disenadora, analista, investigador,
  comunidad, auditora.
- Reglas: lee cualquiera que pueda abrir la página; escriben solo los editores (Lean y los agentes, que escriben como él).

## Cómo pide algo un agente
Con ArtifactData `set` en `pedidos/<id corto>`: pregunta concreta en una frase, `contexto` de una o dos frases (qué pasa si
elige cada cosa), y de 2 a 4 `opciones` cortas que se puedan ejecutar tal cual (o `[]` si la respuesta tiene que ser escrita).
Sumar también la fila en `datos/central/pendientes.json` para la Central. Nunca pedir claves ni tokens por la Mesa.
