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
| `charlas.json` | lo que se dicen los personajes en la oficina: `id`, `de`, `a` (ids de agentes), `texto` (≤ 60 caracteres) | cada chat |
| `pagina.html`, `oficina.js` | copias de `files/index.html` y `files/oficina.js` de la Central | a mano |

Equipo (10, análisis en `analisis/2026-11-02-equipo-agentes.md`), con su personaje de Open Peeps (CC0, `herramientas/animaciones/recursos/`):
coordinadora = Elena, youtube = Julián, instagram = Camila, pizarra = Diego, editor = Bruno, disenadora = Carla, analista = Ana,
investigador = Pablo, comunidad = Lucía, auditora = Marta. Estados: trabajando, esperando, bloqueado (cara preocupada), listo, nuevo.
Los SVG van en `files/avatares-1.js` a `avatares-4.js` de la Central (cada archivo del store tiene que pesar menos de 256 KB).
La oficina (`oficina.js`): cada escritorio con su personaje; cada pocos segundos uno camina hasta otro y le dice una frase de `charlas`;
tocar a un personaje muestra su estado; botón «Pausar»; con «reducir movimiento» no caminan.

## Cómo actualizar (desde cualquier chat)
1. `python herramientas/central_ric.py` y editar `agentes.json` / `pendientes.json`.
2. Subir cada archivo cambiado a la Central como asset (Artifact, `asset: true`, `url` de arriba, un JSON por llamada).
3. Con ArtifactData, `update` del documento `datasets/<id>` con la `url` nueva (`/_blob/...`), `name` y `updated: {at, by}`
   (leer antes el documento para pasar `if_version`).
4. Subir los cambios del repo a `main`.

## Cuando un agente necesita algo de Lean
Además de sumarlo a `pendientes.json`, crear un pedido en la **Mesa de Lean** (ver `datos/mesa/LEEME.md`): pregunta corta,
contexto y de 2 a 4 opciones. Lean responde ahí con un clic, y su respuesta dispara al equipo.
