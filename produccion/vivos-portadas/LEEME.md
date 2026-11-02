# Portadas de las clases en vivo (YouTube)

Pedido de Lean del 02/11/2026: va a dar clases en vivo por YouTube. Cinco portadas de 1280x720 con el estilo de RIC
(azul noche, grilla, oro en la palabra clave, Archivo + IBM Plex, logo oficial):

1. Pre apertura · Nueva York (plan del día, niveles punteados sobre velas reales del Nasdaq)
2. Operando en vivo · Nueva York (velas del Nasdaq, último precio, «EN VIVO»)
3. Pre apertura · Asia (plan del día sobre velas reales del Nikkei 225)
4. Operando en vivo · Asia (velas del Nikkei, «EN VIVO»)
5. Psicología del trading (rey de ajedrez; miedo, codicia y revancha tachados → disciplina)

Uso:
```bash
python produccion/vivos-portadas/generar.py
node herramientas/miniatura.js produccion/vivos-portadas/portada-1.html portada-1.png
```
Para cambiar textos, editar `PORTADAS` en `generar.py`. Las horas son de apertura local (9:30 NY, 9:00 Tokio), así no cambian
con el horario de verano; en noviembre de 2026 son las 11:30 y las 21:00 de Argentina.

Velas: `velas.json`, Yahoo Finance, 15 minutos, últimas 48 velas al 02/11/2026 (NQ=F y ^N225), bajadas con yfinance.

## Créditos de las fotos (Wikimedia Commons; ponerlos en la descripción de los vivos)
- `ny.jpg`: «Lower Manhattan by night», Hu Totya, CC BY-SA 1.0 — https://commons.wikimedia.org/wiki/File:Lower_Manhattan_by_night.jpg
- `ny2.jpg`: «Manhattan skyline at night», Aromero085, CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Manhattan_skyline_at_night.jpg
- `tokio.jpg`: «Shinjuku night skyline», CC BY-SA 2.0 (autor: ver la página) — https://commons.wikimedia.org/wiki/File:Shinjuku_night_skyline.jpg
- `rey2.jpg`: «Chess king and pawns», CC BY 2.0 (autor: ver la página) — https://commons.wikimedia.org/wiki/File:Chess_king_and_pawns.jpg

Texto corto para la descripción: «Fotos de portada: Hu Totya (CC BY-SA 1.0), Aromero085 (CC BY-SA 4.0) y Wikimedia Commons (CC BY-SA 2.0 / CC BY 2.0).»
Falta confirmar el autor de `tokio.jpg` y `rey2.jpg` (commons.wikimedia.org está bloqueado en la nube).
