"""Mastering Observability — meeting virtual background (Teams/Zoom/Meet).
Subtle, professional. v2.0 brand. Lens + METRICS & MAYHEM bottom-left,
masteringobservability.com bottom-right. No top wordmark (that's podcast-only).
Branding kept to lower corners, clear of the centre (face) and bottom-centre
(where Teams/Zoom paint the name bar)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1920, 1080
FB = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts"
# v2.0 palette
BASE=(13,33,39); NAVY2=(19,49,58); CARD=(28,60,69)
TEAL=(47,158,141); BRIGHT=(116,221,205); INK=(255,255,255)
FONT_DISP=f"{FB}/Montserrat-Bold.ttf"
FONT_MONO=f"{FB}/SpaceMono-Bold.ttf"
def f(p,s): return ImageFont.truetype(p,s)

def radial_glow(size, colour, max_alpha=70, falloff=2.0):
    d=size; g=Image.new("RGBA",(d,d),(0,0,0,0)); px=g.load()
    c=d/2
    for y in range(d):
        for x in range(0,d,1):
            dist=math.hypot(x-c,y-c)/c
            if dist<1:
                a=int(max_alpha*((1-dist)**falloff)); px[x,y]=(*colour,a)
    return g

def lens(size, opacity=255):
    SS=4; s=size*SS; img=Image.new("RGBA",(s,s),(0,0,0,0)); d=ImageDraw.Draw(img)
    cx=cy=s/2; sc=s/200.0
    d.ellipse([cx-90*sc,cy-90*sc,cx+90*sc,cy+90*sc],outline=(*TEAL,opacity),width=max(2,int(3*sc)))
    d.ellipse([cx-75*sc,cy-75*sc,cx+75*sc,cy+75*sc],outline=(*BRIGHT,int(opacity*0.6)),width=max(1,int(2*sc)))
    d.ellipse([cx-62*sc,cy-62*sc,cx+62*sc,cy+62*sc],fill=(*CARD,opacity))
    # crosshair ticks
    for (x1,y1,x2,y2) in [(100,2,100,22),(100,178,100,198),(2,100,22,100),(178,100,198,100)]:
        d.line([cx+(x1-100)*sc,cy+(y1-100)*sc,cx+(x2-100)*sc,cy+(y2-100)*sc],fill=(*BRIGHT,opacity),width=max(2,int(3*sc)))
    # eye almond
    d.polygon([ (cx-64*sc,cy),(cx,cy-30*sc),(cx+64*sc,cy),(cx,cy+30*sc) ],fill=(*INK,opacity))
    d.ellipse([cx-26*sc,cy-26*sc,cx+26*sc,cy+26*sc],fill=(*TEAL,opacity))
    d.ellipse([cx-16*sc,cy-16*sc,cx+16*sc,cy+16*sc],fill=(*BRIGHT,opacity))
    d.ellipse([cx+2*sc,cy-12*sc,cx+13*sc,cy-1*sc],fill=(*INK,int(opacity*0.5)))
    img=img.resize((size,size), Image.LANCZOS)
    return img

def gradient_bg():
    img=Image.new("RGB",(W,H),BASE); px=img.load()
    for y in range(H):
        for x in range(0,W,2):
            t=(x/W)*0.6+(y/H)*0.4
            r=int(BASE[0]+(NAVY2[0]-BASE[0])*(1-t)*0.6)
            g=int(BASE[1]+(NAVY2[1]-BASE[1])*(1-t)*0.6)
            b=int(BASE[2]+(NAVY2[2]-BASE[2])*(1-t)*0.6)
            px[x,y]=(r,g,b); 
            if x+1<W: px[x+1,y]=(r,g,b)
    return img

def dot_lattice(img, alpha=22, step=44):
    layer=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(layer)
    for y in range(40,H,step):
        for x in range(40,W,step):
            d.ellipse([x-1,y-1,x+1,y+1],fill=(*BRIGHT,alpha))
    img.paste(layer,(0,0),layer); return img

def corner_lockup(img, with_lattice=True):
    base=img.convert("RGBA")
    # soft glow upper-left for depth
    g=radial_glow(1200, TEAL, max_alpha=55, falloff=2.2)
    base.alpha_composite(g,(-300,-300))
    d=ImageDraw.Draw(base)
    # top-left: lens + wordmark (clear of a seated head-and-shoulders shot)
    L=lens(110, 255)
    base.alpha_composite(L,(70, 64))
    wm=f(FONT_DISP, 32)
    d.text((70+110+22, 64+18), "METRICS", font=wm, fill=(*INK,235))
    d.text((70+110+22, 64+58), "& MAYHEM", font=wm, fill=(*INK,235))
    # bottom-right: URL, mono, bright teal
    url="masteringobservability.com"
    um=f(FONT_MONO, 26)
    ubb=d.textbbox((0,0),url,font=um); uw=ubb[2]-ubb[0]
    d.text((W-70-uw, H-70-30), url, font=um, fill=(*BRIGHT,220))
    # thin teal rule above URL
    d.line([(W-70-uw, H-70-44),(W-70, H-70-44)], fill=(*TEAL,180), width=2)
    return base.convert("RGB")

# v1 default: gradient + faint lattice + corner lockup
v1=gradient_bg(); v1=dot_lattice(v1, alpha=20); v1=corner_lockup(v1)
v1.save("meeting_bg_v1_default.png", optimize=True)
v1.save("meeting_bg_v1_default.jpg","JPEG",quality=92,optimize=True)
# v2 minimal: gradient + corner lockup only (no lattice)
v2=gradient_bg(); v2=corner_lockup(v2)
v2.save("meeting_bg_v2_minimal.png", optimize=True)
v2.save("meeting_bg_v2_minimal.jpg","JPEG",quality=92,optimize=True)
print("done")
