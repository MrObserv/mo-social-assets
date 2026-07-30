#!/usr/bin/env python3
# Signal Check mid-episode bumper. Sibling of the Signal Drop intro (render_podcast_intro.py):
# a waveform level-check pulses up, SETTLES to a steady teal seam, and resolves into the
# "Signal Check" wordmark with a green #7bd88f confirm dot and the segment descriptor
# "YOUR QUESTIONS, ANSWERED" under the seam. ~2.4s.
#
# Runs in the Cowork sandbox against the mounted workspace (same convention as render_podcast_intro.py).
# Usage: render_signal_check.py <16x9|9x16> <out.mp4>            -> animated, audio baked
#        render_signal_check.py <16x9|9x16> <out.png> still      -> single held end-frame (the 19.6 static fallback)
import sys, os
from PIL import Image, ImageDraw, ImageFont

ASPECT = sys.argv[1] if len(sys.argv) > 1 else "16x9"
OUT    = sys.argv[2]
STILL  = len(sys.argv) > 3 and sys.argv[3] == "still"
BASE_DIR = "/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets"
FONTS  = f"{BASE_DIR}/fonts"
STING  = f"{BASE_DIR}/Design_Standards/signal_check_sting.wav"
SUBTITLE = "YOUR QUESTIONS, ANSWERED"   # segment descriptor under the seam; edit here to change

W, H = (1920, 1080) if ASPECT == "16x9" else (1080, 1920)
FPS, DUR = 30, 2.4
N = int(FPS * DUR)
vw = W / 100.0

NAVY=(13,33,39); TEAL=(47,158,141); MINT=(116,221,205); GREEN=(123,216,143)
GRIDLINE=(16,44,48); WHITE=(255,255,255); GREY=(159,183,179)

if ASPECT == "16x9":
    NBARS=11; band=min(18*vw, 0.32*H); bw=0.85*vw; gap=0.75*vw
    title_px=int(7.0*vw); eye_px=int(1.35*vw); dot=1.05*vw; gap_e=1.5*vw; gap_d=1.7*vw
    ls_title=0.15*vw; ls_eye=0.5*vw; cell=4.2*vw; seam_h=max(2,int(0.18*vw)); seam_w=30*vw
    sub_px=int(1.15*vw); ls_sub=0.35*vw; sub_gap=1.5*vw
else:
    NBARS=9; band=560; bw=34; gap=30
    title_px=132; eye_px=30; dot=36; gap_e=48; gap_d=54
    ls_title=5; ls_eye=15; cell=90; seam_h=4; seam_w=620
    sub_px=26; ls_sub=10; sub_gap=46

f_title = ImageFont.truetype(f"{FONTS}/Montserrat-ExtraBold.ttf", title_px)
f_eye   = ImageFont.truetype(f"{FONTS}/SpaceMono-Regular.ttf", eye_px)
f_sub   = ImageFont.truetype(f"{FONTS}/SpaceMono-Regular.ttf", sub_px)

def clamp(x): return max(0.0, min(1.0, x))
def smooth(x): x=clamp(x); return x*x*(3-2*x)
def ease_out(x): x=clamp(x); return 1-(1-x)**3
def ramp_in(t,a,b): return smooth((t-a)/(b-a)) if b>a else (1.0 if t>=b else 0.0)
def ramp_out(t,a,b): return 1-smooth((t-a)/(b-a)) if b>a else (0.0 if t>=b else 1.0)

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

cx=W/2; baseline=H/2+band/2
total_w=NBARS*bw+(NBARS-1)*gap
delays=[0.0,.10,.25,.05,.30,.15,.35,.08,.22,.32,.12][:NBARS]

def bar_scaleY(t,delay):
    u=(t-delay)/0.55
    if u<0: return 0.15
    fr=u%2.0; tri=fr if fr<=1 else 2-fr
    return 0.15+0.85*smooth(tri)

def frame(t):
    img=BASE.copy(); d=ImageDraw.Draw(img,"RGBA")
    bar_op = ramp_in(t,0.0,0.12) * ramp_out(t,1.15,1.60)
    if bar_op>0.01:
        a=int(255*bar_op); s=smooth((t-0.95)/0.30)
        for k in range(NBARS):
            hk=bar_scaleY(t,delays[k]) if t<0.95 else (bar_scaleY(0.95,delays[k])*(1-s)+0.20*s)
            h=band*hk
            bx=cx-total_w/2+k*(bw+gap)+bw/2
            d.rounded_rectangle([bx-bw/2,baseline-h,bx+bw/2,baseline],radius=6,fill=(TEAL[0],TEAL[1],TEAL[2],a))
    seam_op=ramp_in(t,1.02,1.34); sw=seam_w*smooth((t-1.02)/0.34)
    if seam_op>0.01:
        a=int(255*seam_op)
        d.rounded_rectangle([cx-sw/2,baseline-seam_h/2,cx+sw/2,baseline+seam_h/2],radius=seam_h,fill=(TEAL[0],TEAL[1],TEAL[2],a))
    if t>=1.20:
        p=ease_out((t-1.20)/0.60); al=int(255*p); ty=(1-p)*1.8*vw
        eye_h=f_eye.getbbox("Ay")[3]; title_h=f_title.getbbox("Ay")[3]
        group_h=eye_h+gap_e+title_h
        top=H/2-group_h/2-0.06*H+ty
        draw_tracked(d,cx,top,"MASTERING OBSERVABILITY",f_eye,(MINT[0],MINT[1],MINT[2],al),ls_eye)
        draw_tracked(d,cx,top+eye_h+gap_e,"Signal Check",f_title,(255,255,255,al),ls_title)
    if t>=1.18:
        bp=smooth((t-1.18)/0.34); al=int(255*bp); ds=dot*(0.4+0.6*bp)
        dy=baseline-seam_h-gap_d
        d.ellipse([cx-ds/2,dy-ds/2,cx+ds/2,dy+ds/2],fill=(GREEN[0],GREEN[1],GREEN[2],al))
    if t>=1.30:
        p=ease_out((t-1.30)/0.55); al=int(255*p)
        sy=baseline+seam_h/2+sub_gap
        draw_tracked(d,cx,sy,SUBTITLE,f_sub,(GREY[0],GREY[1],GREY[2],al),ls_sub)
    if t>2.12:
        fo=int(255*smooth((t-2.12)/0.28))
        d.rectangle([0,0,W,H],fill=(NAVY[0],NAVY[1],NAVY[2],fo))
    return img

if STILL:
    frame(1.95).save(OUT); print("written still:",OUT); sys.exit(0)

os.system("rm -f /tmp/sc_*.png")
for i in range(N):
    frame(i/FPS).save(f"/tmp/sc_{i:04d}.png")
os.system("rm -f /tmp/sc_silent.mp4")
os.system(f"ffmpeg -y -framerate {FPS} -i /tmp/sc_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 /tmp/sc_silent.mp4 -loglevel error")
os.system(f'ffmpeg -y -i /tmp/sc_silent.mp4 -i "{STING}" -c:v copy -c:a aac -shortest "{OUT}" -loglevel error')
os.system("rm -f /tmp/sc_*.png")
print("written:",OUT)
