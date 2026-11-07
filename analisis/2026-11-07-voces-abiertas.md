# Voces más naturales con modelos abiertos (07/11/2026)

Pedido de Lean: «la calidad de las voces no es buena; la gente llega, escucha ese tipo de voz y se va». Los datos del canal
le dan la razón (desde el 01/10, por % visto en promedio): con su voz, Elecciones 98 %, Short del oro 74 %, Corea 68 %;
con voz sintética, Binance 51 %, P09 Short 43 %, perfil de volumen 36 %, Dos traders 34 %.

## Candidatos con licencia comercial (verificada en la ficha de Hugging Face)
| Modelo | Licencia | Español | Clona voz | Probado |
|---|---|---|---|---|
| Qwen3-TTS 1.7B Base / VoiceDesign (Qwen) | Apache 2.0 | sí | sí (3 s o más) y voz diseñada por descripción | sí |
| VoxCPM2 (OpenBMB) | Apache 2.0 | sí | sí | sí |
| Fun-CosyVoice3 0.5B (FunAudioLLM) | Apache 2.0 | sí | sí | no |
| Chatterbox multilingüe (Resemble AI) | MIT | sí | sí | antes (acento neutro, descartado) |
| Zonos v0.1 (Zyphra) | Apache 2.0 | sí | sí | no |
| Kokoro 82M | Apache 2.0 | voces fijas | no | no |
Descartados por licencia: F5-TTS (pesos CC-BY-NC), OmniVoice (pesos CC-BY-NC), XTTS-v2 (CPML), Fish Speech/OpenAudio
(CC-BY-NC-SA), Higgs Audio v3 (no comercial).

## Prueba (CPU de la nube, mismo texto de 19 a 25 s, referencia: 13 s de Lean de la toma de Elecciones limpiada con DeepFilterNet3)
- Qwen3-TTS 1.7B, clon de Lean: 112 s de cálculo; whisper lo entiende entero.
- VoxCPM2, clon de Lean: 70 s; whisper lo entiende entero.
- Qwen3-TTS 1.7B VoiceDesign, «hombre argentino de 35, rioplatense, tono de streamer»: 127 s; whisper lo entiende entero.
Un video largo de 17 min tardaría entre 1 y 2 h de cálculo: viable en segundo plano. Scripts en `herramientas/voces/`.
Las muestras (MP3) se entregaron por el chat; falta que Lean elija. Con voz clonada o diseñada, el video igual va marcado
como contenido sintético. La referencia de 13 s sale de una nota de WhatsApp: con una grabación limpia de 1 a 2 min el clon
mejora.
