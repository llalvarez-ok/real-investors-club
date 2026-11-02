# OpenReply (alternativa abierta a ManyChat): ¿nos sirve? (02/11/2026)

Fuente: PDF «Tu ManyChat gratis instalado por Claude» (Marco Chávez, Drive de Lean) y el repositorio
github.com/diwenne/openreply (clonado y leído el 02/11/2026: MIT, último cambio 28/10/2026, Next.js + Postgres + Redis).

## Qué es
Responde por DM cuando alguien comenta una palabra (lo mismo que hace hoy ManyChat con CURSO). Usa la API oficial de Meta,
no pide la contraseña. Extras: varias palabras por post, respuesta pública, links con clics medidos, pedir que te sigan
antes de mandar el link, disparar desde respuestas a historias, registro de cada envío con el motivo si falla, y una API
de solo lectura para sacar estadísticas.

## Lo que cuesta de verdad
- El programa es gratis; el hosting no siempre: Vercel gratis es **solo para uso no comercial** (RIC es comercial), así que
  lo realista es Railway (~USD 5/mes) o un VPS.
- Hay que mantener 5 piezas: panel web, Postgres, Redis, un worker encendido 24/7 (si se cae, los DMs no salen) y correo
  (Resend con dominio verificado).
- Necesita **una app de Meta propia publicada** e inicio de sesión con Instagram. Hoy nuestra app «RIC» responde
  «API access blocked»: sin arreglar eso, OpenReply tampoco anda.
- Interfaz en inglés (no hay español).

## Veredicto
**Hoy no conviene cambiar.** ManyChat ya funciona con CURSO y el lanzamiento del 16/11 no es momento de migrar.
Sirve más adelante si: (1) ManyChat empieza a cobrar (pasamos el límite de contactos del plan gratis), (2) queremos
«seguime para recibir el link» o medir clics, o (3) queremos los números de los DMs en la Central RIC.
Paso previo útil igual: arreglar la app de Meta y sacar el token de Instagram (IGAA), que además destraba publicar Reels
por la API.
