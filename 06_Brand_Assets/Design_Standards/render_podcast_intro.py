#!/usr/bin/env python3
# Signal Drop intro re-render with brand fonts. 16x9 matches the HTML; 9x16 is scaled up to fill the vertical frame.
import sys, os
from PIL import Image, ImageDraw, ImageFont

ASPECT = sys.argv[1] if len(sys.argv) > 1 else "16x9"
OUT = sys.argv[2]
FONTS = "/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets/fonts"

if ASPECT == "16x9":
    W, H = 1920, 1080
else:
    W, H = 1080, 1920
FPS, DUR = 30, 7.0
N = int(FPS * DUR)
vw = W / 100.0

NAVY=(13,33,39); TEAL=(47,158,141); MINT=(116,221,205); GRIDLINE=(16,44,48)

# --- per-aspect sizing ---
if ASPECT == "16x9":
    NBARS=11; band=min(26*vw,0.46*H); bw=0.85*vw; gap=0.75*vw
    title_px=int(7.4*vw); eye_px=int(1.5*vw); dot=0.95*vw; gap1=1.6*vw
    ls_title=0.15*vw; ls_eye=0.5*vw; cell=4.2*vw
else:
    # fill the 9:16 footprint: large lockup, bold tall waveform
    NBARS=9; band=620; bw=34; gap=30
    title_px=150; eye_px=34; dot=34; gap1=54
    ls_title=5; ls_eye=16; cell=90

f_title = ImageFont.truetype(f"{FONTS}/Montserrat-ExtraBold.ttf", title_px)
f_eye   = ImageFont.truetype(f"{FONTS}/SpaceMono-Regular.ttf", eye_px)

def smooth(x):
    x=max(0.0,min(1.0,x)); return x*x*(3-2*x)
def ease_out(x):
    x=max(0.0,min(1.0,x)); return 1-(1-x)**3

def draw_tracked(d,cx,y,text,font,fill,tracking):
    total=sum(font.getbbox(c)[2]+tracking for c in text)-(tracking if text else 0)
    x=cx-total/2
    for c in text:
        d.text((x,y),c,font=font,fill=fill); x+=font.getbbox(c)[2]+tracking

def make_base():
    img=Image.new("RGB",(W,H),NAVY); d=ImageDraw.Draw(img)
    x=0
    while x<W: d.line([(int(x),0),(int(x),H)],fill=GRIDLINE,width=1); x+=cell
    y=0
    while y<H: d.line([(0,int(y)),(W,int(y))],fill=GRIDLINE,width=1); y+=cell
    return img
BASE=make_base()

total_w=NBARS*bw+(NBARS-1)*gap
cx=W/2; baseline=H/2+band/2
delays=[0.0,.10,.25,.05,.30,.15,.35,.08,.22,.32,.12][:NBARS]

def bar_scaleY(t,delay):
    u=(t-delay)/0.8
    if u<0: return 0.15
    fr=u%2.0; tri=fr if fr<=1 else 2-fr
    return 0.15+0.85*smooth(tri)

def wave_state(t):
    T=3.05; p=t/T
    if p>=1: return 0.0,0.04
    op = smooth(p/0.08) if p<0.08 else (1.0 if p<0.86 else 1-(p-0.86)/0.14)
    if p<0.72: sx=1.0
    elif p<0.86: sx=1.0-(1.0-0.04)*((p-0.72)/0.14)
    else: sx=0.04
    return max(0.0,min(1.0,op)),sx

for i in range(N):
    t=i/FPS
    img=BASE.copy(); d=ImageDraw.Draw(img,"RGBA")
    op,sx=wave_state(t)
    if op>0.01:
        a=int(255*op)
        for k in range(NBARS):
            sy=bar_scaleY(t,delays[k]); h=band*sy
            bx=cx-total_w/2+k*(bw+gap)+bw/2
            bx=cx+(bx-cx)*sx
            d.rounded_rectangle([bx-bw/2,baseline-h,bx+bw/2,baseline],radius=6,fill=(TEAL[0],TEAL[1],TEAL[2],a))
    if t>=2.7:
        p=ease_out((t-2.7)/1.1); al=int(255*p); ty=(1-p)*2.2*vw
        eye_h=f_eye.getbbox("Ay")[3]; title_h=f_title.getbbox("Ay")[3]
        group_h=eye_h+gap1+title_h+gap1+dot
        top=H/2-group_h/2+ty
        draw_tracked(d,cx,top,"MASTERING OBSERVABILITY",f_eye,(MINT[0],MINT[1],MINT[2],al),ls_eye)
        ty2=top+eye_h+gap1
        draw_tracked(d,cx,ty2,"Signal Drop",f_title,(255,255,255,al),ls_title)
        dy=ty2+title_h+gap1
        d.ellipse([cx-dot/2,dy,cx+dot/2,dy+dot],fill=(TEAL[0],TEAL[1],TEAL[2],al))
    img.save(f"/tmp/fr_{i:04d}.png")

os.system("rm -f /tmp/intro_silent.mp4")
os.system(f"ffmpeg -y -framerate {FPS} -i /tmp/fr_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 /tmp/intro_silent.mp4 -loglevel error")
STING="/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets/Design_Standards/podcast_intro_sting.wav"
os.system(f'ffmpeg -y -i /tmp/intro_silent.mp4 -i "{STING}" -c:v copy -c:a aac -shortest "{OUT}" -loglevel error')
os.system("rm -f /tmp/fr_*.png")
print("written:",OUT)
