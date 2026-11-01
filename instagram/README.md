# Instagram

Todo lo de Instagram en un solo lugar. **Hay acceso por la API de Meta desde el 01/11/2026** (ver CLAUDE.md: `RIC_IG_TOKEN`,
`RIC_IG_USER_ID`, `graph.facebook.com`): las publicaciones y los números se leen de ahí. Instagram.com sigue bloqueado.

## Cuenta
Es la cuenta **personal** de Lean: publica cosas suyas y de Real Investors Club. Las cuentas nuevas de RIC se las eliminaron, así que el proyecto se muestra desde la suya. Por eso acá vale el voseo y el tono personal.

| Campo | Valor |
|---|---|
| Usuario | **@leanalvarez.ok** (verificada) |
| Nombre | Lean Alvarez \| Trading & Finanzas |
| Seguidores | 3.736 al 01/11/2026, leído por la API (actualizar en la tarjeta de cierre de cada Reel) |
| ID en la API | 17841458469793556 |
| Bio | Trader en XAUUSD y Cripto · Opera de la forma correcta · ⚠️ Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero. |
| Link | realinvestors.club |

## Reels hechos
| Reel | Estado | Video y textos |
|---|---|---|
| P09 «Por qué vendes justo cuando baja» | **No figura en Instagram** según la API (01/11) | `produccion/p09-aversion-perdida/subir.md`, sección R1-instagram |
| P10 «FOMO» | **No figura en Instagram** según la API (01/11) | `produccion/p10-fomo/subir.md`, sección R1-instagram |
| Clase 14 «Order blocks» (curso anterior) | Publicado (29/10), con la automatización «CURSO» | Abajo, en «Copy del Reel de la clase 14»; armado en `herramientas/curso/reel/` |
| «El robo a Binance» (partículas) | Publicado (31/10) | `analisis/2026-11-01-reporte-reels-particulas.md`, sección 6 |
| «¿Por qué Corea del Norte robó Binance?» (expediente) | Borrador con fotos pendientes (01/11) | `produccion/reel-corea/subir.md` |
| «Perfil de volumen» (partículas) | Publicado (31/10). Retención: 45 % a los 3 s | Mismo reporte, secciones 7 y 8 |
| Reel de Binance con gráficos HTML (30/10) | **Descartado** | — |

Los MP4 no van a git: se entregaron por el chat.

## Desempeño y cambios propuestos
Revisión completa del 01/11/2026 con los datos de la API: `analisis/2026-11-01-revision-instagram.md` (se repite con `python herramientas/revisar_instagram.py`). Resumen: en 30 días interactuaron 132 cuentas (86 % de Argentina); el contenido llegó a 4.203 no seguidores y solo a 632 seguidores; ~24 % de los seguidores son de países sin habla hispana y no interactúan; lo que más comentarios trae es Lean analizando el oro, operando en vivo o personal (11 a 21 % de interacción), contra 4–5 % de los Reels de lecciones y noticias de octubre; entraron 15 seguidores y se fueron 35. Plan: 2 de cada 3 publicaciones con Lean, un solo estilo de noticias por semana, palabra clave en todo, historias diarias con stickers y bio nueva.

El análisis del Reel «Perfil de volumen» (curva de retención, origen de las vistas y diagnóstico) está en
`analisis/2026-11-01-reporte-reels-particulas.md`, sección 8. Los cambios que salieron de ahí son las reglas de abajo.

## Reglas para los próximos Reels
Las de la sección 9 del reporte de partículas, que valen para todos los estilos:
- El gancho se ve desde el cuadro 0 y la voz arranca en el segundo 0.
- Subtítulos palabra por palabra, con la palabra clave en dorado (el 55 % mira desde el Feed, sin sonido).
- De 35 a 50 s y una sola idea.
- Un cambio visual cada 2 o 3 s.
- Sin CTA en el medio. Cierre corto con «SEGUÍ ESTA CUENTA» y una palabra clave para comentar.
- En Instagram vale el voseo, porque es la cuenta personal de Lean.
- Objetivos: más del 60 % de retención a los 3 s y más del 30 % a la mitad del video.

## Copy del Reel de la clase 14
```
¿Fuiste parte del curso de Básicos de trading? 📈

Así explicamos los order blocks: la última vela antes de un movimiento con direccionalidad. Es la zona donde el precio encontró un rechazo, y donde puede volver a reaccionar.

Esto fue solo una parte de la clase 14. En noviembre de 2026 llega el curso de Intermedios y avanzados 🚀

💬 Comenta la palabra CURSO y te mando el acceso al grupo del curso GRATIS.

⚠️ Contenido educativo. No constituye recomendación de inversión.

#trading #orderblocks #tradingespañol #analisistecnico #educacionfinanciera #inversiones #criptomonedas #ethereum #forex #realinvestorsclub
```
Portada: «ORDER BLOCKS en 1 minuto».

## Automatización de mensajes (ManyChat)
- Configurada por Lean el 29/10/2026 para la palabra **CURSO** (envía el acceso al grupo del curso). El link del grupo no está registrado acá.
- Requisito: cuenta profesional y **«Permitir acceso a los mensajes»** activado (Configuración → Solicitudes de mensajes). Está activado.
- Problema abierto: un comentario de CURSO no recibió el mensaje. Pasos de diagnóstico:
  1. Mirar el contador de la automatización (*Runs/Sends*).
  2. No probar desde la propia cuenta: solo se dispara una vez por persona y por publicación.
  3. Revisar que el reel no esté restringido por Meta.
  4. Refrescar permisos (*Help → Refresh Permissions*).
  5. Plan B: disparador por mensaje directo con la palabra CURSO.
- A las cuentas que no siguen a @leanalvarez.ok el mensaje les llega a «Solicitudes de mensajes».
- En YouTube no existen los mensajes privados: el link va en el comentario fijado y en la descripción.

## Pendiente
- Revisión del 01/11 (sección 7): qué eran las 2 historias del 31/10 (alcance de ~1.600, no cierra con el resto), si hay un video de Lean con el oro para el primer Reel, y aprobar la bio y la palabra clave ORO. Elegir un solo estilo para las noticias (partículas o expediente).
- Confirmar si el Reel de P10 está publicado.
- Cargar el link del grupo del curso y los números de cada Reel (vistas, retención a los 3 s, seguidores ganados).
