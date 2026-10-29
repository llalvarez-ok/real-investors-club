"""Cambia el fondo de la cámara con RobustVideoMatting (ONNX, CPU, ~30 ms por cuadro a 520x292).

    python fondo_cam.py <cam.mp4> <salida.mp4> <ancho> <alto> <downsample_ratio> <rvm_mobilenetv3_fp32.onnx> <fondo.png>

Modelo: https://github.com/PeterL1n/RobustVideoMatting/releases (GPL-3.0; se usa como herramienta, no se distribuye).
"""
import sys, numpy as np, onnxruntime as ort, subprocess, time
src, out, W, H, dr = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), float(sys.argv[5])
s = ort.InferenceSession(sys.argv[6], providers=["CPUExecutionProvider"])
print([ (i.name, i.shape) for i in s.get_inputs()])
dec = subprocess.Popen(["ffmpeg","-v","error","-i",src,"-f","rawvideo","-pix_fmt","rgb24","-"], stdout=subprocess.PIPE)
enc = subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r","30","-i","-","-c:v","libx264","-crf","18","-pix_fmt","yuv420p",out], stdin=subprocess.PIPE)
rec = [np.zeros([1,1,1,1], np.float32)]*4
d = np.array([dr], np.float32)
from PIL import Image
bg = np.asarray(Image.open(sys.argv[7]).convert("RGB").resize((W, H))).astype(np.float32)
n=0; t0=time.time()
while True:
    b = dec.stdout.read(W*H*3)
    if len(b) < W*H*3: break
    a = np.frombuffer(b, np.uint8).reshape(H,W,3)
    x = (a.astype(np.float32)/255).transpose(2,0,1)[None]
    fgr, pha, *rec = s.run(None, {"src": x, "r1i": rec[0], "r2i": rec[1], "r3i": rec[2], "r4i": rec[3], "downsample_ratio": d})
    p = pha[0,0][...,None]
    enc.stdin.write((a*p + bg*(1-p)).astype(np.uint8).tobytes()); n+=1
enc.stdin.close(); enc.wait()
print(n, "frames", round((time.time()-t0)/max(n,1)*1000), "ms/frame")
