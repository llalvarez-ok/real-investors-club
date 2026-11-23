# Repos de GitHub para medir la calidad de un Reel (23/11/2026)

Pedido de Lean: «Hacé tu propia investigación, buscá repos en GitHub que sirvan para detectar lo que necesitás».
Lo que necesitamos detectar: por qué un Reel se saltea en los primeros 3 s y qué hacen distinto los que llegan al millón.

## Qué hay en GitHub (búsqueda del 23/11 en 23 consultas; se leyeron los repos con mejor pinta, sin ejecutar su código)

| Repo | Qué hace | Licencia | ¿Sirve? |
|---|---|---|---|
| Breakthrough/PySceneDetect (5,6 k ★) | Detecta cortes y transiciones | BSD-3 | **Sí, en uso** (cortes por minuto, toma media, primer corte) |
| OpenCV YuNet (opencv_zoo) | Detector de caras liviano | MIT | **Sí, en uso** (% del video con cara, cara en el cuadro 0) |
| riccivr/retention-analyzer | Cruza la caída de retención segundo a segundo con los cortes, las tomas y el guion (FFmpeg + whisper + modelo local) | MIT | **La idea, sí:** cortes por minuto, largo de toma y primer corte. El código no: pide GPU de 16 GB y Ollama |
| thec0urier/reelscan | Analiza una cuenta entera: tipo de gancho, estilo visual, cara, ritmo, sonido de tendencia | MIT | **La taxonomía, sí** (pregunta, impacto, demostración, transformación, polémica, historia, lista, tendencia). Baja los videos con yt-dlp, que acá no anda |
| udaysrinu/viral-video-analyzer | Baja un video, lo transcribe y saca un cuadro por segundo para que una IA lo analice | MIT | Lo mismo que ya hacemos con whisper y hojas de contacto; también depende de yt-dlp |
| aaronclashofclan1-lgtm/Outly | Detecta videos que superan la mediana de su canal (competencia en YouTube) | MIT | Es lo que ya hace `herramientas/nicho.py` |
| Anil-matcha/AI-Youtube-Shorts-Generator (6,5 k ★) y clones de Opus Clip | Cortan un video largo en Shorts y les ponen un puntaje de «viralidad» con un modelo de lenguaje | MIT | Útil para los **vivos de Lean** (elegir tramos), no para juzgar calidad. El puntaje es la opinión de un modelo, no un dato |
| VQAssessment/DOVER | Nota de calidad «estética» y «técnica» de un video | S-Lab, **no comercial** | **No**: el canal se monetiza |
| Predictores de viralidad (harbarex/tiktok-virality-prediction y otros) | Modelos entrenados con datos de TikTok de otros nichos | sin licencia la mayoría | **No**: pocas estrellas, sin licencia, sin datos del nicho financiero |

Conclusión: **no existe un repo que «detecte la viralidad»**. Lo que sí existe son piezas confiables para **medir**
(cortes, caras, voz, ritmo, cambio visual) y comparar contra referencias. Eso armamos.

## La herramienta: `herramientas/medidor/medir_video.py`

- **Qué mide, por video:** cortes por minuto, toma media, primer corte, % con cara, cara en el cuadro 0, arranque de la voz,
  palabras en 0–3 s, palabras por minuto, silencio más largo, % de segundos quietos, contraste y colorido del cuadro 0
  y LUFS.
- **Hoja de cuadros:** deja una hoja con los segundos 0; 0,5; 1; 2; 3; 5 y 8.
- **Comparación:** con `--refs` compara contra la mediana de las referencias.

### Calibración con nuestros Reels (resultado conocido en Instagram)

| Medida | Bitcoin zonas (35,8 % se va en 3 s, el mejor) | Nvidia (66 %) | Serrucho v2 | BTC y oro |
|---|---|---|---|---|
| Cortes por minuto | **15,7** | 0 | 0 | 0 |
| Toma media (s) | **3,5** | 61 | 54 | 47 |
| % de segundos quietos | **0** | 16,5 | 11,1 | 11,8 |
| Contraste del cuadro 0 | **50,8** | 24,8 | 41,7 | 25,1 |
| Cara en el cuadro 0 | no | no | no | no |

Lectura (son 4 videos: es una pista, no una prueba):
- El que mejor anduvo es el único con **cortes de verdad** (una toma nueva cada 3,5 s), sin segundos quietos y con el
  cuadro 0 más contrastado.
- Los últimos dos, que Lean rechazó, son **una sola toma continua** con transiciones suaves. Esa fue la idea de Lemo-Opuscar
  de «transiciones hechas con el propio medio»: para videos cortos de finanzas fue un error, y queda descartada.
- Ninguno de los nuestros tiene cara. Según la vara de Valeria (`diseno/estandar-excelencia.md`), casi todas las
  referencias del millón tienen una persona.

## Lo que falta, y por qué

**No podemos ver las referencias.** Desde la nube están bloqueados youtube.com, instagram.com y tiktok.com (probado el
23/11), así que ni yt-dlp ni ninguna de estas herramientas puede bajar un Reel ajeno. Dos salidas:
1. **Recomendada:** Lean descarga 5 a 10 Reels del millón que quiera igualar y los sube a Drive, en RIC/referencias.
   Drive sí funciona. Después se corre `medir_video.py nuestro.mp4 --refs ref1.mp4 …` y Valeria juzga con números y hojas.
2. Habilitar esos dominios en el entorno. No se propone: bajar videos de esas plataformas va contra sus términos.

Regla nueva para la puerta de Valeria: antes de aprobar un Reel, correr el medidor y comparar con las referencias.
Si los cortes por minuto, el % de segundos quietos o el cuadro 0 quedan lejos de la mediana de las referencias,
se rechaza.
