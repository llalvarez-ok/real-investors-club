import torch, soundfile as sf, sys, time
from qwen_tts import Qwen3TTSModel
modelo=sys.argv[1]; salida=sys.argv[2]
m=Qwen3TTSModel.from_pretrained(modelo, device_map="cpu", dtype=torch.float32)
txt=open("texto.txt").read().strip()
ref_txt="Si viste que los demócratas le sacaron el Congreso a Trump y pensaste en vender todo, este video es para vos. Ganaron las dos cámaras y dieron vuelta siete bancas en el Senado."
t=time.time()
w,sr=m.generate_voice_clone(text=txt,language="Spanish",ref_audio="ref-lean.wav",ref_text=ref_txt)
sf.write(salida,w[0],sr); print("listo",salida,round(time.time()-t),"s", len(w[0])/sr)
