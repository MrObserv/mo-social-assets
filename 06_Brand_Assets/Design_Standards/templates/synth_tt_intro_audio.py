import numpy as np, wave, os
OUT=os.path.dirname(os.path.abspath(__file__))
SR=44100; DUR=7.0; n=int(SR*DUR); t=np.arange(n)/SR
out=np.zeros(n)
def add(sig,start):
    i=int(start*SR); j=min(n,i+len(sig)); out[i:j]+=sig[:j-i]
def key(dur=0.05,f=2500,amp=0.22,seed=0):
    L=int(dur*SR); tt=np.arange(L)/SR; rng=np.random.default_rng(seed)
    noise=rng.standard_normal(L)*np.exp(-tt*95)
    tone=np.sin(2*np.pi*f*tt)*np.exp(-tt*65)*0.5
    return (noise*0.6+tone)*amp
# typing keystrokes: t=0.6 + k*0.105, 13 chars
for k in range(13): add(key(f=2350+(k%3)*190,amp=0.20,seed=k), 0.6+k*0.105)
# enter / compile thump @2.5
L=int(0.4*SR); tt=np.arange(L)/SR
thump=np.sin(2*np.pi*95*tt)*np.exp(-tt*9)+np.sin(2*np.pi*145*tt)*np.exp(-tt*13)*0.5
click=np.random.default_rng(99).standard_normal(L)*np.exp(-tt*110)*0.4
add((thump*0.55+click)*0.62, 2.5)
# scan sweep 2.65 -> 4.30
sw,swd=2.65,4.30-2.65; L=int(swd*SR); tt=np.arange(L)/SR
ph=2*np.pi*(220*tt+(880-220)/(2*swd)*tt**2); sweep=np.sin(ph)
e=np.ones(L); ai=int(0.15*SR); di=int(0.45*SR); e[:ai]=np.linspace(0,1,ai); e[-di:]=np.linspace(1,0,di)
dn=np.random.default_rng(7).standard_normal(L)*0.035
add((sweep*0.10+dn)*e, sw)
# resolve chime @4.35 (fifth + octave)
L=int(1.1*SR); tt=np.arange(L)/SR
chime=np.sin(2*np.pi*660*tt)+0.6*np.sin(2*np.pi*990*tt)+0.3*np.sin(2*np.pi*1320*tt)
add(chime*np.exp(-tt*3.0)*np.minimum(1,tt/0.02)*0.14, 4.35)
# low hum bed
bed=0.5*np.sin(2*np.pi*55*t)+0.25*np.sin(2*np.pi*110*t)
be=np.ones(n); ai=int(0.3*SR); di=int(0.8*SR); be[:ai]=np.linspace(0,1,ai); be[-di:]=np.linspace(1,0,di)
out+=bed*be*0.06
out=out/np.max(np.abs(out))*0.9
w=wave.open(f"{OUT}/tt_intro_sting.wav","wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype('<i2').tobytes()); w.close()
print("wav written")
