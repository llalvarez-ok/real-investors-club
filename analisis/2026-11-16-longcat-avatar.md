# LongCat-Video-Avatar: avatar con lip-sync (16/11/2026)

Pedido de Lean: revisar el repo del Reel https://www.instagram.com/reel/DfxRwSRnI3L/ («clonarte con IA gratis»).
Transcripción con Supadata `--ia`: es **LongCat-Video-Avatar**, de Meituan.

- Repo: https://github.com/meituan-longcat/LongCat-Video. Pesos en Hugging Face: `meituan-longcat/LongCat-Video-Avatar`, `-1.5` y `-1.6`.
- **Licencia MIT, código y pesos**: permite uso comercial. No da derechos sobre marcas ni patentes de Meituan.
- Qué hace: una foto y un audio dan un video de la persona hablando, con boca, gestos, cabeza y cuerpo. Puede hacer varias personas en la misma escena, con dos audios. La versión 1.6 hace videos de más de 10 minutos por continuación. Usa Whisper-Large como codificador de audio, así que no depende del idioma.
- **No tiene voz**: la voz la ponemos nosotros, con el clon de Qwen3-TTS que ya usamos.
- Hardware: el código oficial pide 2 GPU A100 de 80 GB. Según un PR, una variante de bajo consumo con INT8/FP8 corre en una RTX 4090 (24 GB). **No corre en el CPU de la nube.**
- Demo: hay Spaces de terceros en Hugging Face (ZeroGPU, con cupo diario). El Reel dice que hay una oficial «en el navegador», pero no se encontró.

## Para RIC
Cubre lo que faltaba en `analisis/2026-10-27-avatar-gratis.md`: la voz clonada ya funciona en CPU, y el lip-sync necesitaba GPU.
Con esto queda una cadena 100 % abierta: guion → clon de voz (Qwen3-TTS) → LongCat con una foto de Lean → video a cámara.
Serviría para reemplazar el avatar de HeyGen (pago por créditos).

Opciones para correrlo:
1. Probar en un Space de Hugging Face. Gratis, con cupo; desde la nube hay que ver si `*.hf.space` está habilitado.
2. Alquilar GPU por hora (RunPod, Vast u otra) con una 4090 o una A100. Es pago: necesita el OK de Lean.
3. En una PC de Lean con una NVIDIA de 24 GB.

Cuidados:
- Marcar siempre como contenido sintético.
- Solo con la cara de Lean y su permiso, nunca de otras personas.
- La política de YouTube contra el «contenido no auditado» con IA en masa sigue valiendo.

Fuentes:
- Página de Hugging Face de la versión 1.6
- PR del repo sobre la variante de bajo consumo
- Tutorial de DigitalOcean
