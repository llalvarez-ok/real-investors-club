import sys, numpy as np, soundfile as sf
var=sys.argv[1]
sr=44100; durs=[10.2,6.9,11.4,16.1,12.6,10.1,7.0,9.8,10.8,8.0]; T=sum(durs); n=int(T*sr); t=np.arange(n)/sr
rng=np.random.default_rng(3)
lfo=0.5+0.5*np.sin(2*np.pi*0.07*t)
out=(0.18*np.sin(2*np.pi*55*t)+0.10*np.sin(2*np.pi*82.4*t+1)+0.06*np.sin(2*np.pi*110.3*t)*lfo+0.04*np.sin(2*np.pi*164.8*t)*(1-lfo))
out+=np.convolve(rng.normal(0,1,n),np.ones(400)/400,'same')*0.3
for b in np.arange(0.0,T-0.3,60/96):
    i=int(b*sr); L=int(0.25*sr); tt=np.arange(L)/sr
    out[i:i+L]+=(np.sin(2*np.cumsum(np.pi*(50+60*np.exp(-tt*30))/sr))*np.exp(-tt*14)*0.32)[:n-i]
st=np.cumsum([0]+durs)
for s in st[:-1]:
    i=int(s*sr); L=int(1.2*sr); tt=np.arange(L)/sr
    seg=(np.convolve(rng.normal(0,1,L),np.ones(30)/30,'same')*np.exp(-tt*4)*0.5+np.sin(2*np.pi*42*tt)*np.exp(-tt*3)*0.5)[:n-i]; out[i:i+len(seg)]+=seg
for x in np.arange(0.8,3.4,0.06):
    i=int(x*sr); L=int(0.02*sr); tt=np.arange(L)/sr; out[i:i+L]+=np.sin(2*np.pi*2400*tt)*np.exp(-tt*300)*0.10
i=int((st[7]+0.6)*sr); L=int(1.6*sr); tt=np.arange(L)/sr
out[i:i+L]+=np.sin(2*np.cumsum(np.pi*600*np.exp(-tt*1.8)/sr))*np.exp(-tt*1.5)*0.15
out=np.tanh(out*1.4)*0.8
sfx=np.zeros(n)
def click(at):
    i=int(at*sr); L=int(0.5*sr); tt=np.arange(L)/sr
    c=np.sin(2*np.pi*1800*tt)*np.exp(-tt*120)*0.5 + np.sin(2*np.pi*(880+440*(tt<0.08))*tt)*np.exp(-tt*9)*0.35
    sfx[i:i+L]+=c[:n-i]
click(st[4]+7.1+1.7)
if var=='ig': click(st[9]+1.9)
else: click(st[9]+1.7); click(st[9]+3.25)
voice=np.zeros(n)
def put(f,at):
    v,vsr=sf.read(f); x=np.linspace(0,len(v)-1,int(len(v)*sr/vsr)); v=np.interp(x,np.arange(len(v)),v)
    i=int(at*sr); voice[i:i+len(v)]+=v[:n-i]
for k in range(9): put(f'tts/v2_{k}.wav', st[k]+0.35)
put(f'tts/mid_{var}.wav', st[4]+7.15)
put(f'tts/end_{var}.wav', st[9]+0.4)
voice=voice/np.abs(voice).max()*0.92
env=np.convolve(np.abs(voice),np.ones(int(0.3*sr))/(0.3*sr),'same')
mix=out*0.5*(1-0.7*np.clip(env/0.05,0,1))+voice+sfx*0.6
fade=np.ones(n); fo=int(1.0*sr); fade[:int(0.2*sr)]=np.linspace(0,1,int(0.2*sr)); fade[-fo:]=np.linspace(1,0,fo)
sf.write(f'mix_{var}.wav',np.stack([np.clip(mix*fade,-1,1)]*2,1),sr,subtype='PCM_16')
