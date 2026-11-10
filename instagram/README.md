# Instagram

Todo lo de Instagram en un solo lugar. **Hay acceso por la API de Meta desde el 01/11/2026** (ver CLAUDE.md: `RIC_IG_TOKEN`,
`RIC_IG_USER_ID`, `graph.facebook.com`): las publicaciones y los números se leen de ahí. Instagram.com sigue bloqueado.

## Cuenta
Es la cuenta **personal** de Lean: publica cosas suyas y de Real Investors Club. Las cuentas nuevas de RIC se las eliminaron, así que el proyecto se muestra desde la suya. Por eso acá vale el voseo y el tono personal.

| Campo | Valor |
|---|---|
| Usuario | **@leanalvarez.ok** (verificada) |
| Nombre | Lean Alvarez \| Trading & Finanzas |
| Seguidores | 3.726 al 07/11/2026 (3.736 al 01/11), leído por la API (actualizar en la tarjeta de cierre de cada Reel) |
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
| «¿Por qué Corea del Norte robó Binance?» (expediente cine, voz de Lean, con música) | **Publicado a mano por Lean el 01/11/2026 a las 21:18 de Argentina** (la API da hoy https://www.instagram.com/reel/DfOBCthORKY/, ID 18111900926190761; antes figuraba DfOABv1NrZD): texto igual a `caption-ig.txt`, compartido en el feed. Al 07/11: 5.658 cuentas, 6.929 vistas, 17 compartidos, 37 % se va antes de 3 s, 27,4 s vistos (el mejor de la cuenta) | `produccion/reel-corea/caption-ig.txt` y `subir.md` |
| «Elecciones en EE. UU.: ¿vender todo? Lo que dicen 19 elecciones desde 1950» (expediente cine, voz de Lean grabada en WhatsApp, con música, 77 s) | **Publicado a mano por Lean el 04/11/2026** con el primer audio entregado (el de la sala chica; las versiones sin eco no le gustaron) y el copy de `subir.md`. Al 07/11: 195 cuentas, 66 % se va antes de 3 s, 17 s vistos | `produccion/reel-elecciones/subir.md` |
| Carrusel «7 fechas que pueden mover el oro en noviembre» (11 láminas, identidad RIC, datos verificados, hora de Argentina; rehecho el mismo día para principiantes: «si sale más de X, el oro suele bajar») | Publicado el 05/11/2026 a las 08:02 (https://www.instagram.com/p/DfW4LaloSkO/). Al 07/11: 100 cuentas, 2 guardados, 0 comentarios | `produccion/carrusel-oro-noviembre/subir.md` |
| Carruseles de resultado de cada fecha del oro (4 láminas: qué salió, qué hizo el oro con el gráfico real, por qué y qué viene) | Programados del 06/11 al 30/11 (tareas one-shot que vuelven al chat de Instagram) | `produccion/oro-resultados/LEEME.md` |
| Resultado 1/7 · Empleo (NFP) del 06/11: 165 mil contra 60 mil esperados, el oro bajó 0,5 % en la primera hora | Publicado el 06/11/2026 a las 16:41 (https://www.instagram.com/p/DfaYXKTIWXP/). Al 07/11: 56 cuentas, 0 comentarios | `produccion/oro-resultados/nfp-2026-11.md` |
| Historia «En YouTube voy más a fondo» (promoción del canal, con P22 como video nuevo y lugar para el sticker de link) | Entregada el 07/11/2026; Lean puso el canal de YouTube como primer link del perfil | `produccion/historia-youtube/LEEME.md` |
| Programación semanal de clases en vivo, 8 al 14/11 (historia y feed) | Entregada el 09/11/2026 | `produccion/programacion-semanal/LEEME.md` |
| Resultado 2/7 · Inflación (CPI) del 10/11: +0,4 % mensual contra 0,3 % esperado, el oro bajó 0,6 % en la primera hora (portada nueva con Lean) | Entregado el 10/11/2026 a las 12:00; para publicar de 19 a 21 h | `produccion/oro-resultados/cpi-2026-11.md` |
| «Perfil de volumen» (partículas) | Publicado (31/10). Retención: 45 % a los 3 s | Mismo reporte, secciones 7 y 8 |
| Reel de Binance con gráficos HTML (30/10) | **Descartado** | — |

Los MP4 no van a git: se entregaron por el chat.

## Desempeño y cambios propuestos
Revisión completa del 01/11/2026 con los datos de la API: `analisis/2026-11-01-revision-instagram.md` (se repite con `python herramientas/revisar_instagram.py`). Resumen: en 30 días interactuaron 132 cuentas (86 % de Argentina); el contenido llegó a 4.203 no seguidores y solo a 632 seguidores; ~24 % de los seguidores son de países sin habla hispana y no interactúan; lo que más comentarios trae es Lean analizando el oro, operando en vivo o personal (11 a 21 % de interacción), contra 4–5 % de los Reels de lecciones y noticias de octubre; entraron 15 seguidores y se fueron 35. Plan: 2 de cada 3 publicaciones con Lean, un solo estilo de noticias por semana, palabra clave en todo, historias diarias con stickers y bio nueva.

**Revisión del 07/11/2026:** `analisis/2026-11-07-revision-instagram.md`. Corea (voz de Lean, expediente cine) llegó a 5.658 cuentas con 37 % de salida a los 3 s, el mejor de la cuenta, pero en esa semana entraron 4 seguidores y se fueron 15 (3.726); Elecciones (195) y los carruseles del oro (100 y 56) casi no circularon; 0 toques al link del perfil en 30 días. El plan sigue con cambios: expediente cine con la voz de Lean como único estilo de noticias (fin de semana, 20–22 h), bio y fijadas para convertir, carruseles solo para datos grandes (el resto en historias) y el curso del 16/11 con «Comentá CURSO» + ManyChat (calendario de la semana en la sección 6).

El análisis del Reel «Perfil de volumen» (curva de retención, origen de las vistas y diagnóstico) está en
`analisis/2026-11-01-reporte-reels-particulas.md`, sección 8. Los cambios que salieron de ahí son las reglas de abajo.

## Reglas para los próximos Reels
- **Audio de Lean** (04/11/2026): las notas de voz de WhatsApp vienen a ~15 kbps y con la sala del lugar; ningún filtro las deja «profesionales» (se probaron WPE, supresión de cola y DeepFilterNet3, y no le gustaron). Para los próximos: grabar con Notas de voz del iPhone a un palmo de la boca, en un lugar con cosas blandas, y subir el archivo a Drive (RIC/audios); o pasar la grabación por Adobe Podcast «Enhance Speech» antes de mandarla.
Las de la sección 9 del reporte de partículas, que valen para todos los estilos:
- El gancho se ve desde el cuadro 0 y la voz arranca en el segundo 0.
- Subtítulos palabra por palabra, con la palabra clave en dorado (el 55 % mira desde el Feed, sin sonido).
- De 35 a 50 s y una sola idea.
- Un cambio visual cada 2 o 3 s.
- Sin CTA en el medio. Cierre corto con «SEGUÍ ESTA CUENTA» y una palabra clave para comentar.
- En Instagram vale el voseo, porque es la cuenta personal de Lean.
- **Hashtags: máximo 5** (límite de Instagram desde diciembre de 2025, pedido de Lean del 06/11/2026). En cada publicación se eligen según la tendencia del nicho: 2 del tema de la cuenta (`#oro`, `#XAUUSD`), 1 amplio (`#trading`), 1 local (`#tradingargentina`) y 1 del tema puntual de la publicación (`#NFP`, `#Fed`, `#inflacion`, `#bitcoin`…). Cómo medir la tendencia: (1) con la API de Instagram, cuando se destrabe, `ig_hashtag_search` + `top_media` / `recent_media` de cada candidato (cupo de 30 hashtags distintos por semana) para ver cuánto publican y cuánta interacción tienen; (2) con vidIQ, `vidiq_instagram_tiktok_outlier_search` en español, mirando los hashtags de los Reels que más superan a su cuenta (sin créditos el 06/11/2026). Hasta tener una de las dos, se usa el esquema de arriba.
- **Carruseles (07/11/2026):** no llegan a no seguidores si no dan motivo para mandarlos. Portada con Lean y un gancho sobre lo que le pasa al que mira, lámina 2 que refuerce el gancho, 19–21 h, pregunta con algo a cambio en la primera línea. Análisis en `analisis/2026-11-07-carruseles-sin-alcance.md`.
- **Cierre de carruseles y Reels:** la tarjeta de perfil de Instagram completa (foto, @leanalvarez.ok con tilde azul, publicaciones, seguidores y seguidos, nombre, bio, link y botón «Seguir»), no solo foto y nombre (Lean, 05/11/2026). Modelo: lámina 11 de `produccion/carrusel-oro-noviembre/carrusel.html`. Actualizar los números el día que se publica.
- **Muchos seguidores recién empiezan** (Lean, 05/11/2026): explicar cada dato en una frase y dar el resultado concreto («si sale más de X, el oro suele bajar»), sin jerga ni siglas sueltas.
- Objetivos: más del 60 % de retención a los 3 s y más del 30 % a la mitad del video.

## Perfil (propuesta del 07/11/2026)
Nombre, bio, links, categoría, destacadas, fijadas y ajustes de alcance en `analisis/2026-11-07-perfil-instagram.md`. Pendiente de que Lean lo aplique. Decisión del 07/11/2026: por ahora no se promociona el curso del 16/11; el primer link del perfil es el canal de YouTube.

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
- Alternativa abierta evaluada el 02/11/2026: OpenReply (`analisis/2026-11-02-openreply.md`). No migrar antes del lanzamiento del 16/11; reconsiderar si ManyChat cobra o si hace falta pedir que sigan antes del link o medir clics.
- En YouTube no existen los mensajes privados: el link va en el comentario fijado y en la descripción.

## Seguidores: quién llega y quién se va (con nombres)
- **La API de Meta no da la lista de seguidores**, solo cantidades (probado el 01/11/2026). Los nombres salen de la **descarga de datos** de Instagram.
- **Cada semana (domingo):** Instagram → Configuración → Centro de cuentas → Tu información y permisos → Descargar tu información → Descargar o transferir información → @leanalvarez.ok → **Algunos de tus datos → «Seguidores y seguidos»** → Descargar en el dispositivo → Período: **Desde el principio**, Formato: **JSON**, Calidad: baja. Instagram manda un mail con el link (tarda de minutos a horas). Subir el .zip a Drive, carpeta RIC/instagram, con el nombre `seguidores-AAAA-MM-DD.zip` y link público. Pesa poco: lo baja el conector de Drive.
- **Informe:** `python herramientas/seguidores_instagram.py <zip anterior> <zip nuevo> <informe.md>` → quién llegó, quién se fue (con la fecha en que te había seguido) y si lo seguís de vuelta. Con un solo zip (`--dias 7`) da los que llegaron, pero no los que se fueron.
- «Se fueron» incluye cuentas borradas o desactivadas: Instagram no deja distinguirlas.
- **Las listas no van a git** (el repo es público; `instagram/seguidores/` está en `.gitignore`). El informe se entrega por el chat o en Drive.
- Las cantidades de la semana salen de `python herramientas/revisar_instagram.py`.

## Qué se ve por la API y qué no (probado el 01/11/2026)
- **Sí, sin que Lean haga nada:** por Reel: vistas, alcance, me gusta, comentarios, compartidos, guardados, reposts, segundos vistos en promedio, tiempo total y **% que se va antes de los 3 s** (`reels_skip_rate`). Por cuenta: alcance de seguidores y no seguidores, cuentas que interactuaron, altas y bajas (cantidades), países, ciudades, edades y género. Historias: alcance y respuestas, pero **solo durante las 24 h en que están activas**.
- **No:** la curva de retención segundo a segundo, las visitas al perfil y los seguidores ganados por Reel, y los nombres de los seguidores. Los videos tampoco se pueden bajar (`cdninstagram.com` está bloqueado en la red de la nube y en los Reels con música con licencia la API no da el link); para analizar un video se usan los archivos de producción y los tiempos de la voz.
- No usar apps de terceros que muestran «quién te dejó de seguir»: piden la contraseña y Instagram puede restringir la cuenta.

## Pendiente
- Primera descarga de «Seguidores y seguidos» (punto de partida del informe semanal).
- Revisión del 01/11 (sección 7): ver en la app cuántos de los que vieron las 2 historias del 31/10 (aviso del Reel nuevo) eran seguidores; si hay un video de Lean con el oro para el primer Reel, y aprobar la bio y la palabra clave ORO. Elegir un solo estilo para las noticias (partículas o expediente).
- Confirmar si el Reel de P10 está publicado.
- Cargar el link del grupo del curso y los números de cada Reel (vistas, retención a los 3 s, seguidores ganados).

## Configurar la API paso a paso (05/11/2026)

> **07/11/2026 (último estado, según Lean):** con el token nuevo cargado en `RIC_IG_TOKEN_IG` funcionan estadísticas,
> comentarios y mensajes; **publicar sigue sin andar**. Lean decidió dejarlo así por ahora: las publicaciones las hace él
> a mano. No volver a pedirle pasos para el token salvo que él lo pida. (Las sesiones abiertas antes de cargarlo tienen
> una copia vieja y vencida de la variable: probar siempre desde un chat nuevo.)

> **07/11/2026 (tarde): el usuario del sistema ya no existe.** En el portfolio, «Usuarios del sistema» está vacío y
> «Agregar» aparece desactivado (captura de Lean). El token cargado era de ese usuario (122094458865549809) y ahora falla
> también para leer («Cannot call API for app 1458970836298742 on behalf of user…»). No volver a pedir pasos con
> usuarios del sistema. Camino nuevo: página de Facebook nueva (61596410367956) ya conectada a @leanalvarez.ok por Lean;
> token de usuario de Lean desde el Explorador de la API Graph (app RIC) con permisos de páginas e Instagram, ampliado
> a 60 días en el Depurador de tokens y cargado en `RIC_IG_TOKEN_IG`; de ahí se saca el token de la página (no vence).

> **07/11/2026: el camino del token «IGAA…» NO funciona.** Lean siguió los pasos de abajo varias veces y el token nunca
> se pudo crear. No volver a pedírselo. Camino propuesto: publicar Reels con el conector de **vidIQ**
> (`vidiq_connect_instagram_account` en modo oauth, que es iniciar sesión con Instagram en un botón, y después
> `vidiq_instagram_publish_reel`), que se encarga del token por su cuenta. Falta que Lean dé el OK para conectarlo:
> conectarlo no publica nada, y cada Reel se publica solo con su OK. Lo de abajo queda como historial.
**Cómo está:** desde el 02/11 Meta bloqueó la app «RIC»: todo responde «API access blocked» (código 200), incluso las
estadísticas. Además el token «EAA…» nunca pudo publicar (2207085, falta página de Facebook). Probar cualquier token con
`python herramientas/probar_token_ig.py` (solo lee y no muestra el token).

**Parte A: por qué la bloquearon (5 min, Lean).**
1. developers.facebook.com/apps → «RIC». Leer el cartel rojo o amarillo de arriba («App restringida», «Verificación»,
   «Revisión del uso de datos», «Acción requerida»).
2. En la misma app → Configuración de la app → Básica: tienen que estar la **URL de la política de privacidad**
   (por ejemplo realinvestors.club/privacidad), el correo de contacto, la categoría y el ícono. Que falte la política
   de privacidad es una causa habitual de restricción.
3. business.facebook.com → **Calidad de la cuenta**: ver si el portfolio Real Investors Club o el perfil de Lean tienen
   alguna restricción, y si la hay, pedir revisión desde ahí.

**Parte B: el token que destraba todo («IGAA…», inicio de sesión con Instagram).** No necesita página de Facebook ni
revisión de Meta, porque la app solo se usa con la cuenta de Lean (puede quedar en modo desarrollo).
1. Si «RIC» sigue bloqueada, crear una app nueva: developers.facebook.com/apps → Crear app → caso de uso
   «Administrar mensajes y contenido en Instagram» → portfolio Real Investors Club → nombre «RIC Instagram».
2. En la app → Casos de uso → Personalizar → **«Configuración de la API con inicio de sesión de Instagram»**.
3. Si lo pide: Roles de la app → Roles → **Evaluadores de Instagram** → agregar `leanalvarez.ok`; en Instagram (celular):
   Configuración → Apps y sitios web → Invitaciones de evaluador → Aceptar.
4. Volver a la configuración del paso 2 → «Generar tokens de acceso» → **Agregar cuenta** → iniciar sesión con
   @leanalvarez.ok → permitir todo (básico, publicar contenido, comentarios, mensajes, estadísticas) → **Generar token**
   → copiarlo (empieza con «IGAA»).
5. **No pegarlo en el chat.** Cargarlo en el entorno: menú del entorno en la barra de título de la sesión → Editar →
   variable `RIC_IG_TOKEN_IG` = el token nuevo (reemplaza al «EAA…»). Guardar.
6. Abrir un chat nuevo (las variables llegan solo a sesiones nuevas) y pedir «probá el token de Instagram».
7. El token vence a los **60 días**: unos días antes se genera otro igual (paso 4) y se reemplaza.

**Con el token IGAA se puede:** estadísticas (como hoy), publicar Reels, carruseles, fotos e historias, responder y
ocultar comentarios, y leer y responder mensajes directos (dentro de las 24 h del último mensaje de la persona).
Cada publicación o respuesta sigue necesitando el OK de Lean. La red de la nube ya deja pasar `graph.instagram.com` y
`rupload.facebook.com`.

**Alternativa (no recomendada ahora):** crear una página de Facebook, vincularle @leanalvarez.ok y asignarla al usuario
del sistema con `pages_show_list` y `pages_read_engagement`. Sirve para la publicidad más adelante, pero no arregla el bloqueo
de la app.

## Publicar por la API
- **Token para publicar: `RIC_IG_TOKEN_IG`** (recargado por Lean el 01/11/2026). Lo cargado es un token de **usuario del sistema** («EAA…», inicio de sesión con Facebook), no uno «IGAA…» de inicio de sesión con Instagram: no sirve con `graph.instagram.com` («Cannot parse access token») y se usa con `graph.facebook.com` y `RIC_IG_USER_ID`. Ya trae `instagram_content_publish` (más `instagram_basic`, `instagram_manage_insights`, `instagram_manage_comments`, `instagram_manage_messages`). `herramientas/publicar_reel_ig.py` y `herramientas/revisar_instagram.py` eligen el dominio según el prefijo del token. `RIC_IG_TOKEN` ya no está en el entorno. Si en algún momento se carga un token «IGAA…», vence a los 60 días y se renueva con `GET graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…`. Las variables del entorno solo llegan a las sesiones que arrancan después de cargarlas.
- Por qué: el token viejo (`RIC_IG_TOKEN`, inicio de sesión con Facebook) no tiene página de Facebook vinculada ni permisos de páginas, y `media_publish` da «Fatal» 2207085. Sirve para estadísticas y comentarios.
- `python herramientas/publicar_reel_ig.py <video.mp4 | URL> <caption.txt> --portada <seg> --audio "<nombre>"` (permiso `instagram_content_publish`, cupo de 100 publicaciones por día). Cada publicación necesita el OK de Lean.
- Desde la nube, la subida directa usa `rupload.facebook.com`, que está **bloqueado** en la red del entorno (01/11/2026): hay que agregarlo en la configuración del entorno (Network access → Allowed domains).
- **01/11/2026:** con `rupload.facebook.com` habilitado, la subida y el procesado funcionan (estado FINISHED), pero `media_publish` devuelve siempre «Fatal», subcódigo 2207085 («Error interno genérico»), probado con 4 contenedores, con y sin portada y nombre de audio. Según la documentación de Ayrshare (un servicio que usa la misma API), ese subcódigo se arregla volviendo a autorizar la cuenta con todos los permisos: en el portfolio comercial, Configuración → Usuarios del sistema → asignar la cuenta de Instagram con **control total** (incluido «Contenido») y generar un token nuevo con `instagram_content_publish`; después cargarlo en `RIC_IG_TOKEN`.
- **01/11/2026 (noche), con el token nuevo:** se intentó publicar el Reel de Corea (`RIC_Corea_IG_final.mp4`, sha256 verificado, 70 s) con el OK de Lean. Subida y procesado bien (FINISHED), pero `media_publish` volvió a dar «Fatal» 2207085 en los 4 intentos; no se publicó nada (cupo usado: 0 de 100). Así que **`instagram_content_publish` no alcanzaba**: el token de usuario del sistema no tiene ninguna página de Facebook (`me/accounts` vacío, sin `pages_show_list` ni `pages_read_engagement`), y por `graph.facebook.com` Instagram exige que la cuenta esté vinculada a una página. El Reel lo terminó publicando Lean a mano. Arreglos posibles para los próximos: (a) **recomendado:** generar un token de inicio de sesión con Instagram («IGAA…») en la app «RIC» → Instagram → «API setup with Instagram login», con `instagram_business_content_publish`, y cargarlo en `RIC_IG_TOKEN_IG` (el script ya lo manda a `graph.instagram.com`); o (b) vincular @leanalvarez.ok a una página de Facebook del portfolio, asignar esa página al usuario del sistema y generar el token con `pages_show_list` y `pages_read_engagement`.
- Detalles de la subida: el primer intento a `rupload` puede devolver 400 aunque haya subido (el script lo detecta); el MP4 tiene que ir en bt709 (con bt470bg, que es lo que sale de cuadros JPEG, Instagram no lo transcodificaba).
- Alternativa: un MP4 de menos de 100 MB en Drive con «Cualquier persona con el enlace» y pasar la URL `https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t` (sin probar todavía).
