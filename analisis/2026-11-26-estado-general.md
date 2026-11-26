# Estado general de RIC · 26/11/2026

Pedido de Lean: «Hacé un análisis de todo lo que tenemos hasta ahora. Tuve que pausar la actividad hace unos días, así que
necesito saber cómo estamos».

**Fuentes:**
- API de YouTube y de Instagram, con `herramientas/estadisticas_ric.py` corrido el 26/11.
- Período: 29/10 al 25/11 contra los 28 días anteriores.
- Datos en `datos/central/estadisticas/`.
- El historial del repo.

## 1. En una línea

**El mes fue el mejor de la historia de las dos cuentas, pero desde el 18/11 está todo frenado.** Lo que crecía vino de
3 Reels de Bitcoin y Corea con la opinión de Lean. Lo último que se publicó no anduvo, y hay mucho material
terminado sin publicar.

## 2. Los números del mes

| | Ahora | Mes anterior | Meta |
|---|---|---|---|
| YouTube · suscriptores | **78** (+36 netos) | +20 | 1.000 |
| YouTube · horas de largos y vivos en 12 meses | **33 h** | — | 4.000 h |
| YouTube · vistas del mes | 7.697 | 964 (×8) | |
| Instagram · seguidores | **3.892** (+158 netos: 203 nuevos y 45 bajas) | −16 | |
| Instagram · cuentas alcanzadas | 30.229 | 1.612 (×19) | |
| Instagram · interacciones | 1.557 | 271 | |
| Instagram · visitas al perfil | 468 | 157 | |
| Instagram · toques en el link de la bio | **0** | 0 | |

## 3. Qué funcionó (y por qué)

| Pieza | Resultado | Qué tenía |
|---|---|---|
| Reel «Bitcoin llegó a 62.000» (15/11) | **15.379 cuentas**, 55 comentarios, 187 guardados, 61 compartidos, 44 % se va en 3 s | Lean dijo algo el viernes y se cumplió: «El viernes dije que Bitcoin iba a buscar los 62.000. Ya llegó». Opinión propia, plata en juego, seguimiento |
| Reel «Bitcoin cayó donde se juntan dos zonas» (13/11) | 7.300 cuentas, **37 %** se va en 3 s (el mejor gancho) | «Si tenés Bitcoin, esto te importa» + −8,6 % en el cuadro 0, más la opinión de Lean |
| Reel «Corea del Norte robó Binance» (02/11) | 5.818 cuentas | Cifra enorme y un villano, con la voz grabada de Lean |
| Shorts de Corea y Binance (YouTube) | 1.444 y 1.232 vistas (los dos mejores del canal); Binance trajo 17 suscriptores | Los mismos temas |

**Los días 13 y 14/11 Instagram ganó 160 seguidores, el 80 % de todo el mes.** El canal crece cuando Lean opina sobre
Bitcoin y después muestra lo que pasó.

## 4. Qué no funcionó

| Pieza | Resultado |
|---|---|
| Reel «La serpiente y el serrucho» (23/11) | 314 cuentas, **62 %** se va en 3 s, 0 comentarios |
| Reel «¿Fue culpa del CEO?» (Nvidia, 12/11) | 362 cuentas, 62 % |
| Reel «Elecciones» (04/11) | 257 cuentas, 66 % |
| Carruseles del oro (05, 06 y 10/11) | 129 a 190 cuentas, 0 comentarios. Ya se pausaron |
| Largos de YouTube | P26 «Cómo leer un gráfico» tiene 13 vistas; P22 «8 pérdidas» tiene 137. Solo el 15 % de las vistas de largos viene de búsqueda, sugeridos o inicio |

Patrón: **fábula, noticia de otro país o lámina de datos sin opinión de Lean = menos de 400 cuentas**.

## 5. Desde la pausa

- **YouTube:** de 500 vistas por día (14-16/11) a **2-5 vistas por día** desde el 19/11. El último Short salió el 17/11 y
  no hubo vivos después del 13/11.
- **Instagram:** de ~9.000 cuentas por día (13-14/11) a **~150 por día**. Desde el 16/11 se publicó un solo Reel (el
  serrucho, el 23/11).
- El vivo del curso del 16/11 desde el canal de RIC **no aparece en el canal**. Puede que se haya hecho en otro lado.

## 6. Material terminado y sin publicar

| Pieza | Dónde | Qué falta |
|---|---|---|
| P27 «CoinGlass paso a paso» (4:46, YouTube) y su Reel/Short v4 | `produccion/p27-coinglass/` (`subir-v2.md`, `reel/subir-v4.md`) | Que Lean los suba. Es lo más lógico para publicar ya: cumple el «Comentá MAPA» del Reel que más anduvo |
| P23 «El mercado es una subasta» (10:35) y sus 5 Shorts | `produccion/p23-subasta/subir.md` | Que Lean lo suba |
| Shorts de P22 (voseo, voz de Lean) | `produccion/p22-rachas/` | Subir y programar |
| Reel «Lección 1 de flujo de órdenes» v3 | `produccion/reel-orderflow-1/v3/subir.md` | Que Lean lo apruebe y lo publique |
| Short del serrucho en YouTube | `produccion/reel-serrucho/subir.md` | En Instagram no anduvo: no conviene subirlo |
| Reel «Bitcoin y el oro cayeron juntos» | — | Lo rechazaron Lean y Valeria: no se publica |
| Historia del resultado del PCE (25/11) | `produccion/oro-resultados/pce-2026-11.md` | Venció: el dato ya es viejo |

## 7. Lo que cambió en el equipo y las herramientas (20-25/11)

- **Equipo nuevo:**
  - Valeria es la reclutadora y directora de excelencia. Nada llega a Lean sin su APROBADO.
  - Inés es la estratega, Gonzalo el guionista, Renata la directora de arte, Matías el editor, Paula la analista y Laura
    la de cumplimiento.
  - Vara: `diseno/estandar-excelencia.md`. Diagnóstico: `analisis/2026-11-23-diagnostico-calidad.md`.
  - **Pendiente:** la Central todavía muestra el equipo viejo.
- **Medidor de Reels** (`herramientas/medidor/medir_video.py`): el mejor Reel corta cada 3,5 s y nunca queda quieto. Los
  rechazados eran una sola toma.
- **Referencias de afuera:** el análisis de @nolosabia.ia mostró dos cosas: volumen (50 Reels en 35 días) y temas
  universales con encuesta de emojis.
- **Tareas programadas que siguen:** la de OPEP+ (domingo 29/11, la historia sale el lunes 30) y las del equipo: números,
  comentarios, auditoría, parte del día, nicho y revisión de Instagram. Las tareas programadas todavía no pueden subir
  notas a `main`.

## 8. Recomendación para volver

1. **Volver con lo que anduvo, esta semana.** Lean opinó que Bitcoin iba a 62.000 y después a 75.000, y Bitcoin bajó
   hasta 55.150 (21/11) y hoy está en ~61.000. Un Reel de seguimiento honesto: «Dije 62.000 y siguió hasta 55.000: qué
   hago ahora».
   - Es el mismo formato que hizo 15.000 cuentas: opinión, lo que pasó y la próxima idea.
   - Rotulado como opinión, no como recomendación.
   - Con la voz de Lean, o mejor, a cámara.
2. **Publicar el P27 de CoinGlass y su Reel.** Cumple lo que pidió la gente y manda tráfico a un largo, que es lo que
   suma horas.
3. **Retomar los vivos de Nueva York**, aunque sea uno o dos por semana. Es lo que más horas suma para monetizar: 33 de
   4.000, y casi todo vino de vivos y largos.
4. **Frecuencia mínima:** un Reel por día de lunes a viernes, sin esperar la pieza perfecta.
   - Dos días: seguimiento de Bitcoin u oro con la opinión de Lean.
   - Dos días: la prueba «¿Sabías que tu plata…?» con encuesta (propuesta del 23/11).
   - Un día: Lean a cámara.
5. **Dejar de producir** fábulas, noticias sin opinión y láminas de datos: los números del mes dicen que no circulan.
6. **El link de la bio no convierte** (468 visitas y 0 toques): cambiarlo por un solo destino, el video de CoinGlass o el
   grupo del curso, con una frase que diga qué hay del otro lado.

## 9. Lo que necesito de Lean

- Si arrancamos el lunes con el Reel de seguimiento de Bitcoin, y si lo graba él o va con el clon.
- Que suba el P27 y su Reel, y el P23, cuando pueda: se cargan los datos por la API.
- Si retoma los vivos de Nueva York, y qué días.
- El OK para la prueba de 14 días «¿Sabías que tu plata…?».
- Las referencias del millón en Drive (RIC/referencias) para el medidor, y si se pueden, 30–40 s a cámara dos veces por
  semana.
- Qué pasó con el curso del 16/11: si se transmitió y dónde.
