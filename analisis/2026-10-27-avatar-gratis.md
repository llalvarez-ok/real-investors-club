# ¿Se puede reemplazar HeyGen con herramientas gratis? 27/10/2026

La evaluación la hizo un agente investigador. Las pruebas de voz se corrieron en el contenedor de la nube: 4 CPU, 15 GB de RAM y sin GPU.

## Conclusión

| Pieza | ¿Gratis y con uso comercial? | ¿Se puede hacer en el contenedor? | Calidad frente a HeyGen |
|---|---|---|---|
| Voz clonada de Lean | Sí: Chatterbox Multilingual (MIT); alternativa, Qwen3-TTS (Apache 2.0) | Sí, pero lento: RTF de 5,7 a 6,3 (~35 min de cómputo por lección) | A juzgar por Lean (muestras del 27/10). Hay errores sueltos ("supongo" por "supón", "pedaba" por "operaba") que whisper detecta y se pueden regenerar |
| Labios y cara (lip-sync sobre los clips de HeyGen ya hechos) | Sí: MuseTalk 1.5 (MIT) o LatentSync 1.5 (Apache 2.0) | **No**: necesitan GPU. En CPU serían horas por minuto | Cercana, con riesgo de boca borrosa (la cara se procesa a 256 px), dientes raros y parpadeo. Se disimula con el avatar chico en la esquina |
| Avatar desde una foto (imagen a video) | Hay modelos con licencia comercial (EchoMimic v3, InfiniteTalk) | No (GPU de 12 GB o más) | Inferior para un plano medio de 5 minutos: 480p o 720p y deriva de color |
| Planes gratis web (HeyGen Free, Hedra, D-ID, Vidnoz, Synthesia, Google Vids) | No: marca de agua o uso no comercial | — | No sirven para publicar |

**Descartados por licencia no comercial:** XTTS-v2, F5-TTS (pesos CC-BY-NC), Higgs Audio, Sonic, Wav2Lip y CodeFormer.

## Veredicto de Lean (27/10/2026)

La voz de Chatterbox tiene su timbre, pero habla con acento latino neutro o mexicano y Lean es argentino. Queda descartada. Chatterbox solo tiene "es" genérico (y un pack latinoamericano), sin variante rioplatense. Se sigue con la voz de HeyGen.

## Ruta gratuita posible

1. **Voz:** Chatterbox en el contenedor, con 10 a 20 s limpios de Lean como referencia. Después de generar:
   - Whisper para detectar palabras mal dichas y regenerar esas frases.
   - Recortar pausas a ~0,35 s.
   - Normalizar el volumen.
2. **Video:** MuseTalk 1.5 en **Kaggle** (GPU T4 gratis, ~30 h por semana) o Colab.
   - Se pone la voz nueva sobre los clips de HeyGen de la 0-1-1 en bucle.
   - Necesita la cuenta de Lean y un notebook que él ejecute; el agente no puede manejar Kaggle sin credenciales.
3. **Montaje:** `montar_avatar.py` sin cambios.

## Riesgos

- **YouTube:** siempre "contenido alterado o sintético: Sí". Una voz o una cara clonadas que dicen algo nuevo entran en la definición, aunque sea el propio Lean.
- **Consentimiento:** dejar por escrito el de Lean. No borrar la marca de agua Perth de Chatterbox.
- **Licencias:** revisar la ficha de cada peso antes de usarlo, en especial el pack latinoamericano de Chatterbox y las dependencias de MuseTalk.

## Fuentes

- https://github.com/resemble-ai/chatterbox
- https://github.com/TMElyralab/MuseTalk
- https://github.com/bytedance/LatentSync
- https://github.com/MeiGen-AI/InfiniteTalk
- https://huggingface.co/coqui/XTTS-v2
- https://github.com/SWivid/F5-TTS
- https://blog.youtube/news-and-events/disclosing-ai-generated-content
