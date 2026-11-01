# Instagram

Todo lo de Instagram en un solo lugar. Desde la nube **no hay acceso a Instagram** (está bloqueado y no hay API conectada):
lo que sigue sale de lo que Lean contó en los chats. Actualizar a mano cuando se publique algo.

## Cuenta
Es la cuenta **personal** de Lean: publica cosas suyas y de Real Investors Club. Las cuentas nuevas de RIC se las eliminaron, así que el proyecto se muestra desde la suya. Por eso acá vale el voseo y el tono personal.

| Campo | Valor |
|---|---|
| Usuario | **@leanalvarez.ok** (verificada) |
| Nombre | Lean Alvarez \| Trading & Finanzas |
| Seguidores | 3.734 al 31/10/2026 (actualizar en la tarjeta de cierre de cada Reel) |
| Bio | Trader en XAUUSD y Cripto · Opera de la forma correcta · ⚠️ Los CFDs son instrumentos complejos y conllevan alto riesgo de pérdida de dinero. |
| Link | realinvestors.club |

## Reels hechos
| Reel | Estado | Video y textos |
|---|---|---|
| P09 «Por qué vendes justo cuando baja» | Publicado (28/10) | `produccion/p09-aversion-perdida/subir.md`, sección R1-instagram |
| P10 «FOMO» | Entregado; Lean no confirmó si lo publicó | `produccion/p10-fomo/subir.md`, sección R1-instagram |
| Clase 14 «Order blocks» (curso anterior) | Publicado (29/10), con la automatización «CURSO» | Abajo, en «Copy del Reel de la clase 14»; armado en `herramientas/curso/reel/` |
| «El robo a Binance» (partículas) | Publicado (31/10) | `analisis/2026-11-01-reporte-reels-particulas.md`, sección 6 |
| «¿Por qué Corea del Norte robó Binance?» (expediente) | Borrador con fotos pendientes (01/11) | `produccion/reel-corea/subir.md` |
| «Perfil de volumen» (partículas) | Publicado (31/10). Retención: 45 % a los 3 s | Mismo reporte, secciones 7 y 8 |
| Reel de Binance con gráficos HTML (30/10) | **Descartado** | — |

Los MP4 no van a git: se entregaron por el chat.

## Desempeño y cambios propuestos
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
- Confirmar si el Reel de P10 está publicado.
- Cargar el link del grupo del curso y los números de cada Reel (vistas, retención a los 3 s, seguidores ganados).
