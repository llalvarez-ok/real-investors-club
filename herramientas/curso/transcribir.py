# Transcribe con faster-whisper (small, CPU) y guarda las palabras con tiempos: OFF=<segundos> python transcribir.py <audio 16k mono .wav> <salida.json>
import json, sys, os
OFF = float(os.environ.get("OFF", "0"))
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=4)
import numpy as np, wave
w = wave.open(sys.argv[1]); audio = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
segs, info = m.transcribe(audio, language="es", word_timestamps=True, vad_filter=True, initial_prompt="Clase de trading: order block, order blocks, imbalances, liquidez, Ethereum.")
out = []
for s in segs:
    out.append({"ini": s.start, "fin": s.end, "texto": s.text, "palabras": [[w.start, w.end, w.word] for w in s.words]})
    print(f"{s.start+OFF:7.1f} {s.text}", flush=True)
json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False)
