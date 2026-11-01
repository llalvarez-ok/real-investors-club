# Reels y Shorts con partículas doradas (estilo «noticias y conceptos»)

Traído del otro chat el 01/11/2026. Reporte completo: `analisis/2026-11-01-reporte-reels-particulas.md`.

- `render.py` (Binance) y `render2.py` (perfil de volumen): dibujan cada cuadro con PIL/numpy y lo pasan a ffmpeg, una escena por archivo.
  Uso: `VAR=ig python3 render2.py r <escenas>` · `VAR=yt …` · `VAR=ig python3 render2.py still <escena> <segundo>`.
- `cta.py`: tarjetas de cierre (perfil de Instagram y canal de YouTube), píldora del CTA del medio y cursor.
- `mix.py` / `mix2.py`: música y efectos generados por código, voz por escena y ducking. Los tiempos de escena están fijos en `durs`.
- Voz: Piper es_AR «Daniela» (high), bajada de las releases de sherpa-onnx en GitHub.
- `guion_voz_*.txt`: lo que lee la voz, con las pronunciaciones escritas («Báinans», «Eterium», «pok»).

Para usarlo en este repo hay que ajustar: `sys.path` (apunta a `/home/claude/ric_video`), las fuentes Inter (en `/usr/share/fonts/opentype/inter/`,
que acá no están instaladas) y el logo: `avatar_ric.png` es un recorte de una captura; usar `marca/logo-navy.png` (oficial, 1600x874).
