# Resultados del calendario del oro (noviembre 2026)

Pedido de Lean (05/11/2026): después de cada fecha del carrusel «7 fechas que pueden mover el oro en noviembre»,
un carrusel de resultado que explique qué salió, cómo reaccionó el oro y por qué, para aprender para las próximas.

- Plantilla: `resultado.py` + un JSON por fecha (modelo: `prueba-cpi-sept.json`, el CPI del 14/10, que se usó de prueba:
  salió más alto de lo esperado y el oro bajó 1,2 % en la primera hora). 4 láminas de 1080x1350: qué salió, qué hizo
  el oro (velas reales de 5 min de GC=F con la hora del dato marcada, en hora de Argentina), por qué, y qué viene.
- Lenguaje para principiantes y voseo. Si el oro hizo lo contrario de lo que «suele», se explica con la noticia.
- Los PNG no van a git: se entregan por el chat. El texto para publicar va en `<id>.md`. Lean publica a mano.
- El cierre (lámina 4) lleva la tarjeta de perfil de Instagram (regla de Lean del 05/11/2026); los números se pasan en el JSON como `perfil` o quedan los últimos conocidos.
- Texto para publicar: **5 hashtags como máximo**, con el esquema de `instagram/README.md` (el quinto, el tema del día: `#NFP`, `#inflacion`, `#Fed`, `#OPEP`…).
- Yahoo Finance solo da velas de 5 min de los últimos 60 días: cada resultado se arma el mismo día.

## Cambios del 07/11/2026 (los carruseles no llegaban a no seguidores)
Ver `analisis/2026-11-07-carruseles-sin-alcance.md`. En el JSON: `gancho` (frase de portada sobre lo que hizo el oro, primera persona o pregunta, sin siglas). Portada con la foto de Lean y un solo número; publicar de 19 a 21 h; primera línea del texto = gancho + palabra para comentar con algo a cambio; nunca «Comentá SÍ o NO». Carrusel solo para inflación (CPI, PCE) y Fed; para PPI, Warsh y OPEP+ alcanza con 1–2 láminas para historia (1080x1920) con encuesta.

## Tareas programadas (one-shot, vuelven al chat de INSTAGRAM RIC; creadas el 05/11/2026 con el pedido de Lean)
| Fecha | Dato | Se arma (hora ARG) | Tarea |
|---|---|---|---|
| Vie 06/11 | Empleo (NFP), referencia ~60 mil | 06/11 12:00 | `trig_013XhSQLmKMRNMGDwASqkaHs` |
| Mar 10/11 | Inflación CPI, referencia 3,7 % | 10/11 12:00 | `trig_015MKYM2rEkHLBkzsEzJKR3o` |
| Vie 13/11 | Precios de empresas (PPI), referencia 6,3 % | 13/11 12:00 | `trig_016YEmkWpnzv5ZaZ8U9cpC1h` |
| Lun 16/11 | Habla Warsh (tono) | 17/11 12:00 | `trig_01DfnGDGwjpqnwMwBjMHmcRA` |
| Mié 18/11 | Minutas de la Fed (tono) | 18/11 18:00 | `trig_01GvVjQHvqQiXFCBqNez5Zqs` |
| Mié 25/11 | Inflación PCE, referencia 3,6 % | 25/11 12:00 | `trig_0151CATeh8sZoKPfxJYopenC` |
| Dom 29/11 | OPEP+ (producir más o menos) | 30/11 12:00 | `trig_01Ny5ksqFEHMudiDrgvHtZav` |


## Hechos
- 06/11 · Empleo: 165 mil (esperado ~60 mil), desempleo 4,1 %. Oro −0,53 % en la primera hora (ya venía bajando). Hizo lo que «suele». `nfp-2026-11.json` / `.md`.
- 10/11 · Inflación (CPI): +0,4 % mensual (esperado 0,3 %), subyacente 0,3 %; sin dato anual (falta octubre de 2025). Oro −0,62 % en la primera hora. Hizo lo que «suele». `cpi-2026-11.json` / `.md`. Para el PPI del 13/11 puede pasar lo mismo con el anual: comparar con lo esperado del mes.
