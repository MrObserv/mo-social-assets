#!/usr/bin/env python3
# Signal Check sting: rising level-check ticks -> soft "confirm" (green = good) -> short warm tail. ~2.4s.
# Sibling of podcast_intro_sting.wav / podcast_qa_transition_sting.wav. Runs in the Cowork sandbox.
import numpy as np, wave
SR=44100; DUR=2.4; N=int(SR*DUR)
OUT="/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets/Design_Standards/signal_check_sting.wav"
buf=np.zeros(N)

def tone(f,t0,dur,amp,attack=0.005,release=0.06,partials=(1.0,)):
    i0=int(t0*SR); i1=min(N,int((t0+dur)*SR))
    if i1<=i0: return
    n=i1-i0; tt=np.linspace(0,dur,n,endpoint=False)
    env=np.ones(n); a=int(attack*SR); r=int(release*SR)
    if a>0: env[:a]=np.linspace(0,1,a)
    if r>0: env[-r:]=np.linspace(1,0,r)
    w=np.zeros(n)
    for k,wt in enumerate(partials,start=1): w+=wt*np.sin(2*np.pi*f*k*tt)
    buf[i0:i1]+=amp*env*w

# Phase 1: four rising level-check ticks
for t0,f in [(0.05,392),(0.27,494),(0.49,587),(0.71,698)]:
    tone(f,t0,0.10,0.22,attack=0.004,release=0.07)
# Phase 2: soft two-note confirm on the settle (the "green = good")
tone(659,1.02,0.16,0.20,attack=0.010,release=0.10,partials=(1.0,0.3))
tone(880,1.16,0.34,0.22,attack=0.012,release=0.22,partials=(1.0,0.25))
# Phase 3: warm low pad, fading to silence by ~2.4s
tone(146.83,1.02,1.30,0.10,attack=0.08,release=0.7,partials=(1.0,0.5,0.25))
tone(220.00,1.05,1.25,0.06,attack=0.10,release=0.7,partials=(1.0,0.4))

fade=np.ones(N); ftail=int(0.35*SR); fade[-ftail:]=np.linspace(1,0,ftail); buf*=fade
buf=buf/(np.max(np.abs(buf)) or 1.0)*0.84
pcm=(buf*32767).astype(np.int16)
stereo=np.column_stack([pcm,pcm]).flatten()
with wave.open(OUT,'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(stereo.tobytes())
print("written",OUT)
