"""Voz Daniela (Piper es_AR) por bloque: guion.json → voz/<id>.wav. Uso: voz.py guion.json <dir modelo> <salida> [length_scale]"""
import json, sys, os, subprocess
g, M, out = sys.argv[1:4]; ls = sys.argv[4] if len(sys.argv) > 4 else "1.0"
os.makedirs(out, exist_ok=True)
for b in json.load(open(g))["bloques"]:
    f = f"{out}/{b['id']}.wav"
    subprocess.run([sys.executable, "-m", "piper", "-m", f"{M}/es_AR-daniela-high.onnx", "-c", f"{M}/es_AR-daniela-high.onnx.json",
                    "--length-scale", ls, "--sentence-silence", "0.25", "-f", f], input=b["voz"].encode(), check=True, capture_output=True)
    d = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout.strip()
    print(b["id"], d)
