import soundfile as sf, time
from voxcpm import VoxCPM
m=VoxCPM.from_pretrained("openbmb/VoxCPM2", load_denoiser=False)
txt=open("texto.txt").read().strip()
ref_txt="Si viste que los demócratas le sacaron el Congreso a Trump y pensaste en vender todo, este video es para vos. Ganaron las dos cámaras y dieron vuelta siete bancas en el Senado."
t=time.time()
w=m.generate(text=txt,prompt_wav_path="ref-lean.wav",prompt_text=ref_txt,reference_wav_path="ref-lean.wav")
sf.write("voxcpm2-clon-lean.wav",w,m.tts_model.sample_rate); print("listo",round(time.time()-t),len(w)/m.tts_model.sample_rate)
