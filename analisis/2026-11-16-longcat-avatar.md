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
- La política de YouTube contra el «contenido no auténtico» con IA en masa sigue valiendo.

Fuentes:
- Página de Hugging Face de la versión 1.6
- PR del repo sobre la variante de bajo consumo
- Tutorial de DigitalOcean

## Prueba gratis (16/11/2026)
- Se habilitó en el entorno RIC el dominio de la demo oficial de Meituan en Hugging Face, con el OK de Lean.
  - Demo: `meituan-longcat/LongCat-Video-Avatar-1.5-Demo`.
  - Dominio: `meituan-longcat-longcat-video-avatar-1-5-demo.hf.space`.
  - Su API (`/generate_avatar`) recibe una imagen, un audio, un prompt, la resolución (480p), la semilla, el modo de voz y la aceleración.
  - Hace solo 5 s de video por llamada (125 cuadros a 25 fps).
- Resultado: «You have exceeded your ZeroGPU quota (480s requested)».
  - Cada llamada reserva 240 s en una GPU «xlarge», que cuentan doble: 480 s.
  - Sin cuenta, el cupo diario no alcanza ni para una llamada. Con una cuenta gratis de Hugging Face tampoco (son unos pocos minutos por día).
  - Hace falta una cuenta PRO de Hugging Face (de pago, ~US$ 9 por mes, con ~25 min de GPU por día) o alquilar una GPU.
- Prueba preparada en el scratchpad: `longcat/probar.py <foto> <audio> <salida.mp4>`, con la foto de perfil de Lean y 5 s de su voz clonada.
