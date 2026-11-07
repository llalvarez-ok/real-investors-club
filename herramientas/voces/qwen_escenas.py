#!/usr/bin/env python3
"""Genera cada escena con el clon de la voz de Lean (Qwen3-TTS 1.7B Base, Apache 2.0).

    venv-qwen/bin/python herramientas/voces/qwen_escenas.py <textos.json> <dir salida> <ref.wav> <ref.txt> [semilla]

<textos.json>: {"01": "texto…", "02": …}. Escribe <dir>/NN.wav (24 kHz) y salta las que ya existen.
"""
import json, os, sys, time
import soundfile as sf, torch
from qwen_tts import Qwen3TTSModel
textos, salida, ref, reftxt = sys.argv[1:5]
semilla = int(sys.argv[5]) if len(sys.argv) > 5 else 7
os.makedirs(salida, exist_ok=True)
m = Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-Base", device_map="cpu", dtype=torch.float32)
prompt = m.create_voice_clone_prompt(ref_audio=ref, ref_text=open(reftxt).read().strip())
for k, t in json.load(open(textos)).items():
    f = os.path.join(salida, f"{k}.wav")
    if os.path.exists(f): continue
    torch.manual_seed(semilla)
    t0 = time.time(); w, sr = m.generate_voice_clone(text=t, language="Spanish", voice_clone_prompt=prompt)
    sf.write(f, w[0], sr); print(k, round(time.time() - t0), "s", round(len(w[0]) / sr, 1), "s", flush=True)
