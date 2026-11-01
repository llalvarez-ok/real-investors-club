import sys, numpy as np, soundfile as sf
var=sys.argv[1]
sr=44100; durs=[10.0,5.6,10.7,10.6,7.7,8.4,7.8,7.0,9.2,10.6,9.5,8.0]; T=sum(durs); n=int(T*sr); t=np.arange(n)/sr
rng=np.random.default_rng(5)
lfo=0.5+0.5*np.sin(2*np.pi*0.06*t)
out=(0.17*np.sin(2*np.pi*49*t)+0.10*np.sin(2*np.pi*73.4*t+1)+0.06*np.sin(2*np.pi*98*t)*lfo+0.04*np.sin(2*np.pi*146.8*t)*(1-lfo))
out+=np.convolve(rng.normal(0,1,n),np.ones(400)/400,'same')*0.3
for b in np.arange(0.0,T-0.3,60/92):
    i=int(b*sr); L=int(0.25*sr); tt=np.arange(L)/sr
    out[i:i+L]+=(np.sin(2*np.cumsum(np.pi*(50+60*np.exp(-tt*30))/sr))*np.exp(-tt*14)*0.3)[:n-i]
    j=int((b+30/92)*sr); hh=rng.normal(0,1,int(0.04*sr))*np.exp(-np.arange(int(0.04*sr))/sr*120)*0.05
    out[j:j+len(hh)]+=hh[:max(0,n-j)]
st=np.cumsum([0]+durs)
for s in st[:-1]:
    i=int(s*sr); L=int(1.2*sr); tt=np.arange(L)/sr
    seg=(np.convolve(rng.normal(0,1,L),np.ones(30)/30,'same')*np.exp(-tt*4)*0.45+np.sin(2*np.pi*42*tt)*np.exp(-tt*3)*0.45)[:n-i]; out[i:i+len(seg)]+=seg
out=np.tanh(out*1.4)*0.8
sfx=np.zeros(n)
def click(at):
    i=int(at*sr); L=int(0.5*sr); tt=np.arange(L)/sr
    c=np.sin(2*np.pi*1800*tt)*np.exp(-tt*120)*0.5+np.sin(2*np.pi*(880+440*(tt<0.08))*tt)*np.exp(-tt*9)*0.35
    sfx[i:i+L]+=c[:n-i]
click(st[6]+2.9+1.7)
if var=='ig': click(st[11]+1.9)
else: click(st[11]+1.7); click(st[11]+3.25)
voice=np.zeros(n)
def put(f,at):
    v,vsr=sf.read(f); x=np.linspace(0,len(v)-1,int(len(v)*sr/vsr)); v=np.interp(x,np.arange(len(v)),v)
    i=int(at*sr); voice[i:i+len(v)]+=v[:n-i]
for k in range(11): put(f'tts/v_{k}.wav', st[k]+0.35)
put(f'tts/mid_{var}.wav', st[6]+2.95)
put(f'tts/end_{var}.wav', st[11]+0.4)
voice=voice/np.abs(voice).max()*0.92
env=np.convolve(np.abs(voice),np.ones(int(0.3*sr))/(0.3*sr),'same')
mix=out*0.5*(1-0.7*np.clip(env/0.05,0,1))+voice+sfx*0.6
fade=np.ones(n); fo=int(1.0*sr); fade[:int(0.2*sr)]=np.linspace(0,1,int(0.2*sr)); fade[-fo:]=np.linspace(1,0,fo)
sf.write(f'mix_{var}.wav',np.stack([np.clip(mix*fade,-1,1)]*2,1),sr,subtype='PCM_16')
