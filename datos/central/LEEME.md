# Central RIC (dashboard de los agentes)

Página: https://claude.ai/artifact/Q21K4SwkZ9arx72G6cqrjv (Artifact del tipo Dashboard, privado: Lean lo comparte desde «Share» si quiere).
Muestra: camino a la monetización (suscriptores y horas de videos largos), un personaje por agente con su estado
(trabajando, esperando, bloqueado, listo) y qué espera de Lean, el calendario (programado y publicado), las decisiones
pendientes y los videos más vistos.

## Archivos (todo en esta carpeta)
| Archivo | Qué es | Quién lo escribe |
|---|---|---|
| `kpis.json`, `videos.json`, `calendario.json` | números y calendario de YouTube (+ Instagram) | `python herramientas/central_ric.py` |
| `eventos.json` | vivos, Reels y lo que no sale de la API de YouTube | a mano |
| `instagram.json` | último dato bueno de seguidores (si la API de Instagram no responde) | el script, o a mano |
| `agentes.json` | estado de cada agente: `id` (youtube, instagram, analista, pizarra), `estado`, `haciendo`, `ultimo`, `espera`, `actualizado` | cada chat, al terminar algo |
| `pendientes.json` | decisiones de Lean: `id`, `decision`, `agente`, `desde`, `prioridad` (alta, media, baja) | cada chat |
| `pagina.html` | copia de la página (`files/index.html` en la Central) | a mano |

Personajes: Open Peeps (CC0) de `herramientas/animaciones/recursos/` (YouTube = julian, Instagram = camila, analista = ana,
pizarra = diego), cara feliz o preocupada según el estado, en `files/avatares.js` de la Central.

## Cómo actualizar (desde cualquier chat)
1. `python herramientas/central_ric.py` y editar `agentes.json` / `pendientes.json`.
2. Subir cada archivo cambiado a la Central como asset (Artifact, `asset: true`, `url` de arriba, un JSON por llamada).
3. Con ArtifactData, `update` del documento `datasets/<id>` con la `url` nueva (`/_blob/...`), `name` y `updated: {at, by}`
   (leer antes el documento para pasar `if_version`).
4. Subir los cambios del repo a `main`.
