"""Prepara un video de Lean hablando a cámara para los efectos «a cámara» (herramientas/efectos/LEEME.md).

    python herramientas/efectos/preparar.py <video.mp4> <dir_trabajo> <rvm_mobilenetv3_fp32.onnx> [--sin-voz]

Deja en <dir_trabajo>:
  cuadros/00000.jpg …   el video en 1080x1920 (recortado al centro si no es vertical), 30 fps
  alfa/00000.png …      la silueta de la persona (RobustVideoMatting a 540x960, gris: blanco = persona)
  audio.wav             el audio original (48 kHz)
  clip.js               window.CLIP = {n, fps, cabeza: [[x, y, ancho] por cuadro, en 1080x1920], palabras: [[ini, fin, texto]]}
Las palabras salen de faster-whisper (modelo medium, español); con --sin-voz no se transcribe.
Modelo de matting: https://github.com/PeterL1n/RobustVideoMatting/releases (GPL-3.0; se usa como herramienta, no se distribuye).
"""
import json, os, subprocess, sys
import numpy as np
import onnxruntime as ort
from PIL import Image

W, H, MW, MH, FPS = 1080, 1920, 540, 960, 30


def main():
    src, out, modelo = sys.argv[1:4]
    os.makedirs(f"{out}/cuadros", exist_ok=True); os.makedirs(f"{out}/alfa", exist_ok=True)
    vf = f"fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-q:v", "2", f"{out}/cuadros/%05d.jpg"], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vn", "-ac", "1", "-ar", "48000", f"{out}/audio.wav"], check=True)
    # ffmpeg numera desde 1: pasamos a 0
    fs = sorted(os.listdir(f"{out}/cuadros"))
    for i, f in enumerate(fs):
        os.rename(f"{out}/cuadros/{f}", f"{out}/cuadros/tmp{i:05d}.jpg")
    for i in range(len(fs)):
        os.rename(f"{out}/cuadros/tmp{i:05d}.jpg", f"{out}/cuadros/{i:05d}.jpg")
    s = ort.InferenceSession(modelo, providers=["CPUExecutionProvider"])
    rec = [np.zeros([1, 1, 1, 1], np.float32)] * 4
    d = np.array([0.5], np.float32)
    cabeza = []
    for i in range(len(fs)):
        a = np.asarray(Image.open(f"{out}/cuadros/{i:05d}.jpg").convert("RGB").resize((MW, MH)), np.float32) / 255
        _, pha, *rec = s.run(None, {"src": a.transpose(2, 0, 1)[None], "r1i": rec[0], "r2i": rec[1], "r3i": rec[2], "r4i": rec[3], "downsample_ratio": d})
        p = pha[0, 0]
        Image.fromarray((p * 255).astype(np.uint8)).save(f"{out}/alfa/{i:05d}.png")
        # cabeza: la primera fila con persona y el centro de la silueta en las 120 filas de abajo (en 1080x1920)
        filas = np.where(p.max(1) > .5)[0]
        if len(filas):
            y0 = filas[0]; zona = p[y0:y0 + 60] > .5
            xs = np.where(zona.any(0))[0]
            cabeza.append([float(xs.mean() * 2), float(y0 * 2 + 120), float((xs.max() - xs.min()) * 2)])
        else:
            cabeza.append(cabeza[-1] if cabeza else [W / 2, 600, 300])
    # suavizado de la cabeza (media móvil de 9 cuadros)
    c = np.array(cabeza); k = np.ones(9) / 9
    c = np.stack([np.convolve(np.pad(c[:, j], 4, mode="edge"), k, "valid") for j in range(3)], 1)
    palabras = []
    if "--sin-voz" not in sys.argv:
        from faster_whisper import WhisperModel
        a = subprocess.run(["ffmpeg", "-v", "error", "-i", f"{out}/audio.wav", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
        seg, _ = WhisperModel("medium", device="cpu", compute_type="int8").transcribe(np.frombuffer(a, np.float32), language="es", word_timestamps=True)
        palabras = [[round(w.start, 2), round(w.end, 2), w.word.strip()] for sg in seg for w in sg.words]
    clip = dict(n=len(fs), fps=FPS, cabeza=[[round(v, 1) for v in r] for r in c.tolist()], palabras=palabras)
    open(f"{out}/clip.js", "w").write("window.CLIP=" + json.dumps(clip, ensure_ascii=False) + ";\n")
    print(len(fs), "cuadros ·", len(palabras), "palabras ·", out)


if __name__ == "__main__":
    main()
