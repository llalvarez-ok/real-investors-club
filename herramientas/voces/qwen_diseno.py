import torch, soundfile as sf, time
from qwen_tts import Qwen3TTSModel
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign", device_map="cpu", dtype=torch.float32)
txt=open("texto.txt").read().strip()
ins="Hombre argentino de unos 35 años, acento rioplatense de Buenos Aires, voz grave y cálida, habla como un streamer de finanzas: cercano, con energía, ritmo de conversación natural, sin sonar a locutor."
t=time.time()
w,sr=m.generate_voice_design(text=txt,language="Spanish",instruct=ins)
sf.write("qwen17-diseno-argentino.wav",w[0],sr); print("listo",round(time.time()-t),len(w[0])/sr)
