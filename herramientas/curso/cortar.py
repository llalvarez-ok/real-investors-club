"""Corta la clase según plan.json: video por segmentos (cuadros exactos a 30 fps) y audio pegado con fundidos de 10 ms."""
import json, sys, subprocess, os, wave, numpy as np
fuente, plan, d = sys.argv[1], sys.argv[2], sys.argv[3]
p = json.load(open(plan)); os.makedirs(d + "/seg", exist_ok=True)
segs = [[round(s * 30) / 30, round(e * 30) / 30] for s, e in p["segmentos"]]
lista = open(d + "/seg/lista.txt", "w")
for i, (s, e) in enumerate(segs):
    o = f"{d}/seg/{i:03d}.mp4"
    n = round((e - s) * 30)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{s - 2:.3f}", "-i", fuente, "-ss", "2", "-frames:v", str(n), "-an",
                    "-c:v", "libx264", "-preset", "veryfast", "-crf", "12", "-r", "30", "-pix_fmt", "yuv420p", o], check=True)
    lista.write(f"file '{i:03d}.mp4'\n")
lista.close()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", d + "/seg/lista.txt", "-c", "copy", d + "/cortado_v.mp4"], check=True)
# audio
t0 = segs[0][0] - 1; t1 = segs[-1][1] + 1
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t0}", "-t", f"{t1 - t0}", "-i", fuente, "-vn", "-ac", "1", "-ar", "48000", d + "/a48.wav"], check=True)
w = wave.open(d + "/a48.wav"); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
F = 480; ram = np.linspace(0, 1, F); partes = []
for s, e in segs:
    x = a[round((s - t0) * 48000):round((s - t0) * 48000) + round((e - s) * 30) * 1600].copy()
    x[:F] *= ram; x[-F:] *= ram[::-1]; partes.append(x)
y = np.concatenate(partes).astype(np.int16)
o = wave.open(d + "/cortado_a.wav", "w"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(48000); o.writeframes(y.tobytes()); o.close()
# palabras a la línea de tiempo con cuadros exactos
p["segmentos"] = segs; p["duracion"] = sum(round((e - s) * 30) for s, e in segs) / 30
json.dump(p, open(plan, "w"), ensure_ascii=False)
print("listo", p["duracion"], "s")
