#!/usr/bin/env python3
# Signal Drop outro (long-form 16:9 end-card) re-render with brand fonts. Per Podcast_Outro_Standard.md.
import os, sys
from PIL import Image, ImageDraw, ImageFont
OUT = sys.argv[1]
F = "/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets/fonts"
W, H, FPS, DUR = 1920, 1080, 30, 20.0
N = int(FPS * DUR)
N_ANIM = int(FPS*6.0)  # only render the 6s animated head; freeze-hold the rest
NAVY=(13,33,39); TEAL=(47,158,141); MINT=(116,221,205); WHITE=(255,255,255)
GREY=(150,172,168); GRID=(16,44,48)

f_eye   = ImageFont.truetype(f"{F}/SpaceMono-Regular.ttf", 26)
f_head  = ImageFont.truetype(f"{F}/Montserrat-ExtraBold.ttf", 96)
f_label = ImageFont.truetype(f"{F}/SpaceMono-Bold.ttf", 20)
f_ctat  = ImageFont.truetype(f"{F}/Montserrat-Bold.ttf", 34)
f_det   = ImageFont.truetype(f"{F}/DMSans-Regular.ttf", 22)

def smooth(x):
    x=max(0.0,min(1.0,x)); return x*x*(3-2*x)
def eout(x):
    x=max(0.0,min(1.0,x)); return 1-(1-x)**3

def base():
    img=Image.new("RGB",(W,H),NAVY); d=ImageDraw.Draw(img)
    x=0
    while x<W: d.line([(int(x),0),(int(x),H)],fill=GRID,width=1); x+=80.64
    y=0
    while y<H: d.line([(0,int(y)),(W,int(y))],fill=GRID,width=1); y+=80.64
    return img
BASE=base()

def tracked(d,x,y,text,font,fill,tr,anchor_center=False,cx=None):
    total=sum(font.getbbox(c)[2]+tr for c in text)-(tr if text else 0)
    sx = (cx-total/2) if anchor_center else x
    for c in text:
        d.text((sx,y),c,font=font,fill=fill); sx+=font.getbbox(c)[2]+tr
    return total

# waveform geometry (centred)
NB=11; bw=16.3; gap=14.4; band=340
tot=NB*bw+(NB-1)*gap; cx=960; cyc=540; baseline=cyc+band/2
delays=[0.0,.10,.25,.05,.30,.15,.35,.08,.22,.32,.12]
def barsy(t,dl):
    u=(t-dl)/0.8
    if u<0: return 0.15
    fr=u%2.0; tri=fr if fr<=1 else 2-fr
    return 0.15+0.85*smooth(tri)

# layout for end-card
LX=140; div_y=345; div_x1=1040
def eyebrow_headline(d,al):
    tracked(d,LX,150,"SIGNAL DROP",f_eye,(MINT[0],MINT[1],MINT[2],al),6)
    # headline: "More signals " white + "soon." mint
    d.text((LX,195),"More signals ",font=f_head,fill=(255,255,255,al))
    wsp=f_head.getbbox("More signals ")[2]
    d.text((LX+wsp,195),"soon.",font=f_head,fill=(MINT[0],MINT[1],MINT[2],al))

CTAS=[("THE BOOK","Metrics & Mayhem","Free chapter at masteringobservability.com"),
      ("FOLLOW THE SHOW","Signal Drop","Spotify  Apple  YouTube"),
      ("NEXT EPISODE","Watch it here","Tap the card to keep going"),
      ("NEWSLETTER","The Observability Digest","Weekly at masteringobservability.com")]
def cta_block(d,y,item,al):
    lab,ti,de=item
    tracked(d,LX,y,lab,f_label,(MINT[0],MINT[1],MINT[2],al),3)
    d.text((LX,y+26),ti,font=f_ctat,fill=(255,255,255,al))
    d.text((LX,y+70),de,font=f_det,fill=(GREY[0],GREY[1],GREY[2],al))
CTA_Y=[402,532,662,792]

for i in range(N_ANIM):
    t=i/FPS
    img=BASE.copy(); d=ImageDraw.Draw(img,"RGBA")
    # ----- signal line phases -----
    if t<3.0:
        # equaliser (fade in 0.3-0.6, play to 2.0, settle to flat 2.0-3.0)
        op = smooth((t-0.3)/0.3) if t<0.6 else 1.0
        settle = 0.0 if t<2.0 else smooth((t-2.0)/1.0)  # 0..1
        a=int(255*op)
        for k in range(NB):
            sy=barsy(min(t,2.0),delays[k])
            sy=sy*(1-settle)+0.012*settle
            h=band*sy
            bx=cx-tot/2+k*(bw+gap)
            d.rounded_rectangle([bx,baseline-h,bx+bw,baseline],radius=6,fill=(TEAL[0],TEAL[1],TEAL[2],a))
    else:
        # flat line rises (3.0-3.8) from (cx-tot/2..cx+tot/2, cyc) to (LX..div_x1, div_y), then static
        p=eout((t-3.0)/0.8) if t<3.8 else 1.0
        x0=(cx-tot/2)*(1-p)+LX*p
        x1=(cx+tot/2)*(1-p)+div_x1*p
        ly=cyc*(1-p)+div_y*p
        d.rounded_rectangle([x0,ly-2,x1,ly+2],radius=2,fill=TEAL)
    # ----- end-card content (from 3.6) -----
    if t>=3.6:
        head_al=int(255*eout((t-3.6)/0.7))
        eyebrow_headline(d,head_al)
        for bi,by in enumerate(CTA_Y):
            st=4.2+bi*0.28
            if t>=st:
                cta_block(d,by,CTAS[bi],int(255*eout((t-st)/0.6)))
    img.save(f"/tmp/of_{i:04d}.png")

os.system("rm -f /tmp/outro_silent.mp4")
os.system(f"ffmpeg -y -framerate {FPS} -i /tmp/of_%04d.png -vf tpad=stop_mode=clone:stop_duration=14 -c:v libx264 -pix_fmt yuv420p -crf 18 -r {FPS} /tmp/outro_silent.mp4 -loglevel error")
BED="/sessions/pensive-friendly-edison/mnt/Metrics And Mayhem/06_Brand_Assets/Design_Standards/podcast_outro_bed.wav"
os.system(f'ffmpeg -y -i /tmp/outro_silent.mp4 -i "{BED}" -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" -t 20 -c:v copy -c:a aac "{OUT}" -loglevel error')
os.system("rm -f /tmp/of_*.png")
print("written:",OUT)
