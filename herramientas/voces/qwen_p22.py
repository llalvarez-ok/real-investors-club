import torch, soundfile as sf, time, json
from qwen_tts import Qwen3TTSModel
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-Base", device_map="cpu", dtype=torch.float32)
ref_txt="Si viste que los demócratas le sacaron el Congreso a Trump y pensaste en vender todo, este video es para vos. Ganaron las dos cámaras y dieron vuelta siete bancas en el Senado."
prompt=m.create_voice_clone_prompt(ref_audio="ref-lean.wav",ref_text=ref_txt)
T={"13":"Ahora viene la parte que casi nadie te cuenta. Si acertás tres de cada diez, ¿cada cuánto te tocan ocho pérdidas seguidas? En un momento dado, la probabilidad de perder ocho veces seguidas es de cerca del seis por ciento. Parece poco. Pero no operás una vez. Operás cientos de veces.",
   "14":"Si hacés cien operaciones con ese porcentaje de aciertos, la probabilidad de vivir al menos una racha de ocho pérdidas seguidas es de más del ochenta por ciento. No es mala suerte. Es lo esperable. Lo raro sería que no te pase."}
json.dump(T,open("p22-textos.json","w"),ensure_ascii=False)
for k,t in T.items():
    t0=time.time(); w,sr=m.generate_voice_clone(text=t,language="Spanish",voice_clone_prompt=prompt)
    sf.write(f"p22-{k}.wav",w[0],sr); print(k,round(time.time()-t0),len(w[0])/sr,flush=True)
