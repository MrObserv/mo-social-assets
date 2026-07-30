#!/usr/bin/env python3
# MO Carousel generator (dark-asset brand). Data-driven: one JSON in, N slides out.
# 1080x1350 (4:5) - LinkedIn document + IG carousel from the same build.
# Usage: python3 render_carousel.py <data.json> <out_dir>
# See Carousel_Standard.md for the format rules + the mandatory brand QA gate.
import os, sys, json
from PIL import Image, ImageDraw, ImageFont

DATA = json.load(open(sys.argv[1], encoding="utf-8"))
OUT = sys.argv[2]; os.makedirs(OUT, exist_ok=True)
FONTDIR = os.environ.get("MO_FONTS", os.path.join(os.path.dirname(__file__), "..", "..", "fonts"))

W, H = 1080, 1350
NAVY=(10,14,23); NAVY3=(14,31,53)
MINT=(100,255,218); TEAL=(20,163,168); GREEN=(123,216,143); AMBER=(255,209,102)
INK=(255,255,255); GREY=(159,176,189); GRID=(16,44,48)
ACCENTS={"green":GREEN,"mint":MINT,"amber":AMBER,"teal":TEAL}
CYCLE=[GREEN,MINT,AMBER,TEAL]  # default per-point colour if not specified

disp=lambda s: ImageFont.truetype(os.path.join(FONTDIR,"Montserrat-ExtraBold.ttf"),s)
mbold=lambda s: ImageFont.truetype(os.path.join(FONTDIR,"Montserrat-Bold.ttf"),s)
mono=lambda s: ImageFont.truetype(os.path.join(FONTDIR,"SpaceMono-Bold.ttf"),s)
body=lambda s: ImageFont.truetype(os.path.join(FONTDIR,"DMSans-Regular.ttf"),s)

def wpx(t,f): return f.getbbox(t)[2]
def wrap(t,f,mw):
    out=[]; cur=""
    for w in t.split():
        cand=(cur+" "+w).strip()
        if wpx(cand,f)>mw and cur: out.append(cur); cur=w
        else: cur=cand
    if cur: out.append(cur)
    return out
def para(d,x,y,t,f,fill,mw,lh):
    ls=wrap(t,f,mw)
    for i,ln in enumerate(ls): d.text((x,y+i*lh),ln,font=f,fill=fill)
    return y+len(ls)*lh
def tracked(d,x,y,t,f,fill,tr):
    for c in t: d.text((x,y),c,font=f,fill=fill); x+=f.getbbox(c)[2]+tr

M=72; MAXW=W-2*M
def base():
    img=Image.new("RGB",(W,H),NAVY); px=img.load()
    for yy in range(H):
        t=yy/H
        px_row=(int(NAVY[0]*(1-t)+NAVY3[0]*t),int(NAVY[1]*(1-t)+NAVY3[1]*t),int(NAVY[2]*(1-t)+NAVY3[2]*t))
        for xx in range(W): px[xx,yy]=px_row
    d=ImageDraw.Draw(img); s=72
    x=0
    while x<W: d.line([(x,0),(x,H)],fill=GRID,width=1); x+=s
    y=0
    while y<H: d.line([(0,y),(W,y)],fill=GRID,width=1); y+=s
    return img
def footer(d):
    tracked(d,M,H-70,"METRICS & MAYHEM",mono(20),TEAL,3)
    tracked(d,M,H-42,"MASTERINGOBSERVABILITY.COM",mono(15),TEAL,3)

def cover(s):
    img=base(); d=ImageDraw.Draw(img,"RGBA")
    tracked(d,M,140,s["eyebrow"].upper(),mono(24),MINT,3)
    d.rectangle([M,182,M+70,186],fill=MINT)
    y=para(d,M,300,s["title"],disp(84),INK,MAXW,96)
    if s.get("sub"): para(d,M,y+30,s["sub"],body(34),GREY,MAXW,44)
    tracked(d,M,H-150,"SWIPE",mono(26),MINT,4)
    d.polygon([(M+140,H-142),(M+170,H-130),(M+140,H-118)],fill=MINT)
    footer(d); img.save(f"{OUT}/slide_1_cover.png")

def point(i,p):
    accent=ACCENTS.get(p.get("accent"), CYCLE[(i-1)%len(CYCLE)])
    img=base(); d=ImageDraw.Draw(img,"RGBA")
    d.text((M,120),f"{i:02d}",font=disp(150),fill=accent)
    tracked(d,M,330,p["label"].upper(),mono(24),accent,3)
    y=para(d,M,380,p["head"],disp(60),INK,MAXW,70)
    para(d,M,y+34,p["body"],body(34),GREY,MAXW,50)
    footer(d); img.save(f"{OUT}/slide_{i+1}_{p.get('slug','point')}.png")

def cta(c,n):
    img=base(); d=ImageDraw.Draw(img,"RGBA")
    tracked(d,M,160,c["eyebrow"].upper(),mono(24),MINT,3)
    y=para(d,M,300,c["head"],disp(72),INK,MAXW,84)
    d.rounded_rectangle([M,y+60,M+620,y+150],radius=12,fill=MINT)
    d.text((M+34,y+86),c["button"],font=mbold(34),fill=(13,33,39))
    para(d,M,y+190,c.get("sub","masteringobservability.com  ·  link in bio"),body(30),GREY,MAXW,42)
    footer(d); img.save(f"{OUT}/slide_{n}_cta.png")

cover(DATA["cover"])
pts=DATA["points"]
for idx,p in enumerate(pts, start=1): point(idx, p)
cta(DATA["cta"], len(pts)+2)
print(f"written {len(pts)+2} slides to {OUT}")
