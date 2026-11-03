import json,re
d=json.load(open('palabras.json'))
words=[(a,b,p) for s in d for (a,b,p) in s['w']]
FPS=30; FIN=5706.8
# tramos fuera de tema (segundos del vivo)
QUITAR=[(0,634),(1406,1426),(1861,1920),(2100,2210),(2298,2306),(2518,2561),(2611,2660),(2758,2766),
 (3083,3099),(3111,3116),(3856,3935),(4357,4428),(4683,4778),(4880,4900),(5113,5135),(5698,FIN)]
# saludos sueltos: "hola" + lo que sigue hasta el fin de la frase (máx 2,5 s)
for i,(a,b,p) in enumerate(words):
    if re.match(r'^(hola|bienvenido)',p.lower()):
        j=i; fin=b
        while j+1<len(words) and words[j+1][0]-a<2.5:
            j+=1; fin=words[j][1]
            if re.search(r'[.?!]$',words[j][2]): break
        QUITAR.append((a-0.1,fin+0.1))
def quitado(a,b): return any(x<=a and b<=y or (a<y and b>x and (min(b,y)-max(a,x))>0.5*(b-a)) for x,y in QUITAR)
srt=[(a,b) for a,b,_ in json.load(open("srt_habla.json"))]
habla=[(a,b) for a,b,p in words if not quitado(a,b)]+[(a,b) for a,b in srt if not quitado(a,b)]
# unir palabras con huecos menores a 1,2 s y dejar 0,2 s de aire a cada lado
tr=[]
for a,b in sorted(habla):
    a,b=a-0.2,b+0.2
    if tr and a-tr[-1][1]<1.2: tr[-1][1]=max(tr[-1][1],b)
    else: tr.append([a,b])
# recortar contra QUITAR y redondear a cuadros
def resta(t,q):
    out=[t]
    for x,y in q:
        nuevo=[]
        for a,b in out:
            if b<=x or a>=y: nuevo.append([a,b])
            else:
                if a<x: nuevo.append([a,x])
                if b>y: nuevo.append([y,b])
        out=nuevo
    return out
fin=[]
for t in tr:
    for a,b in resta(t,QUITAR):
        a=round(max(0,a)*FPS)/FPS; b=round(min(FIN,b)*FPS)/FPS
        if b-a>=0.4: fin.append([a,b])
dur=sum(b-a for a,b in fin)
json.dump(fin,open('tramos.json','w'))
print(len(fin),'tramos',round(dur/60,1),'min de',round(FIN/60,1))
