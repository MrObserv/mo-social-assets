import os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageChops
F=os.environ["MO_FONTS"]; OUT=os.path.dirname(os.path.abspath(__file__))
NAVY3=np.array([15,33,55]); NAVYTOP=np.array([9,13,21])
MINT=(100,255,218); TEAL=(20,163,168); GREY=(159,176,189); GREYB=(191,206,214)
INK=(255,255,255); GRID=(19,50,58); NAVYINK=(9,16,24); MUTE=(78,100,110)
disp=lambda s: ImageFont.truetype(f"{F}/Montserrat-ExtraBold.ttf",s)
mono=lambda s: ImageFont.truetype(f"{F}/SpaceMono-Bold.ttf",s)
monoR=lambda s: ImageFont.truetype(f"{F}/SpaceMono-Regular.ttf",s)
def canvas(W,H,glow=None):
    t=np.linspace(0,1,H)[:,None]; col=(NAVYTOP[None,:]*(1-t)+NAVY3[None,:]*t)
    arr=np.repeat(col[:,None,:],W,axis=1)
    yy,xx=np.mgrid[0:H,0:W]; cx,cy=W/2,H*0.42
    r=np.sqrt(((xx-cx)/(W*0.72))**2+((yy-cy)/(H*0.72))**2)
    arr=arr*np.clip(1-0.35*np.clip(r-0.35,0,1),0.62,1)[:,:,None]
    if glow:
        gx,gy,gr,gi=glow; rr=np.sqrt(((xx-gx)/gr)**2+((yy-gy)/gr)**2)
        arr=arr+np.array(MINT)[None,None,:]*(np.clip(1-rr,0,1)**2*gi)[:,:,None]
    img=Image.fromarray(np.clip(arr,0,255).astype('uint8'),"RGB")
    return img,ImageDraw.Draw(img,"RGBA")
def grid(d,W,H,cell):
    for x in range(0,W,cell): d.line([(x,0),(x,H)],fill=GRID,width=1)
    for y in range(0,H,cell): d.line([(0,y),(W,y)],fill=GRID,width=1)
def tr(d,x,y,t,f,fill,s):
    for c in t: d.text((x,y),c,font=f,fill=fill); x+=f.getbbox(c)[2]+s
    return x
def twd(t,f,s): return sum(f.getbbox(c)[2]+s for c in t)-s
def crosshair(d,cx,cy,R,col=TEAL,a=115):
    d.ellipse([cx-R,cy-R,cx+R,cy+R],outline=col+(a,),width=2)
    d.ellipse([cx-R*0.34,cy-R*0.34,cx+R*0.34,cy+R*0.34],outline=col+(a,),width=2)
    for dx,dy in [(-1,0),(1,0),(0,-1),(0,1)]:
        d.line([(cx+dx*R*0.5,cy+dy*R*0.5),(cx+dx*R*1.2,cy+dy*R*1.2)],fill=col+(a,),width=2)
def chip(d,x,y,fs=28,trk=4):
    f=mono(fs); bb=f.getbbox("TUE"); th=bb[3]-bb[1]
    w=twd("TUE",f,trk); padx=18; pady=13; H=th+2*pady
    d.rounded_rectangle([x,y,x+w+2*padx,y+H],radius=9,fill=MINT)
    tr(d,x+padx,y+(H-th)/2-bb[1],"TUE",f,NAVYINK,trk)
    return x+w+2*padx
def wordmark(d,x,y,fs=24):
    tr(d,x,y,"METRICS & MAYHEM",mono(fs),(214,228,231),3); d.rectangle([x,y+fs+14,x+96,y+fs+18],fill=TEAL)
def promptline(d,x,y,fs,ch_h=None):
    x=tr(d,x,y,"> ",mono(fs),MINT,2); x=tr(d,x,y,"tech_tuesday",mono(fs),(205,218,224),2)
    h=ch_h or int(fs*1.05); d.rectangle([x+8,y+2,x+8+int(fs*0.5),y+2+h],fill=MINT); return x
def bar_footer(d,x,y): tr(d,x,y,"MASTERINGOBSERVABILITY.COM",mono(26),TEAL,3)

# 1. TITLE CARD 1920x1080
def titlecard():
    W,H=1920,1080; img,d=canvas(W,H,glow=(420,700,780,0.17)); grid(d,W,H,96)
    crosshair(d,1740,180,60)
    wordmark(d,140,120,30)
    wx,wy,ww,wh=140,326,610,152
    d.rounded_rectangle([wx,wy,wx+ww,wy+wh],radius=12,outline=(50,84,94,255),width=2)
    for i,c in enumerate([(150,66,66),(150,128,66),(92,152,114)]):
        d.ellipse([wx+26+i*34,wy+22,wx+26+i*34+16,wy+38],fill=c+(255,))
    tr(d,wx+150,wy+16,"~/mo/tech_tuesday",monoR(26),MUTE,2)
    d.line([(wx,wy+56),(wx+ww,wy+56)],fill=(34,62,70,255),width=2)
    px=tr(d,wx+30,wy+90,"> ",mono(34),MINT,2); px=tr(d,px,wy+90,"start --learn",mono(34),(210,222,228),2)
    d.rectangle([px+10,wy+86,px+27,wy+126],fill=MINT)
    tr(d,140,500,"TECH",disp(188),INK,4); tr(d,140,698,"TUESDAY",disp(188),MINT,4)
    d.rectangle([148,928,148+540,934],fill=MINT)
    x=chip(d,140,972,fs=30); tr(d,x+28,979,"ONE THING, EXPLAINED WELL.",monoR(30),GREYB,2)
    img.save(f"{OUT}/tt_titlecard_1920x1080.png")

# 2. SPOTIFY 1500
def spotify(num,title_lines):
    W,H=1500,1500; img,d=canvas(W,H,glow=(720,660,880,0.14)); grid(d,W,H,75)
    gf=disp(640); s=f"{num:02d}"; gw=twd(s,gf,0)
    g=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
    gd.text((W-gw-70,H-700),s,font=gf,fill=(100,255,218,15))
    img=Image.alpha_composite(img.convert("RGBA"),g).convert("RGB"); d=ImageDraw.Draw(img,"RGBA")
    crosshair(d,1330,205,58)
    wordmark(d,110,120,30)
    wx,wy,ww,wh=110,250,700,150
    d.rounded_rectangle([wx,wy,wx+ww,wy+wh],radius=12,outline=(50,84,94,255),width=2)
    for i,c in enumerate([(150,66,66),(150,128,66),(92,152,114)]):
        d.ellipse([wx+24+i*32,wy+22,wx+24+i*32+15,wy+37],fill=c+(255,))
    tr(d,wx+140,wy+16,"~/mo/tech_tuesday",monoR(24),MUTE,2)
    d.line([(wx,wy+54),(wx+ww,wy+54)],fill=(34,62,70,255),width=2)
    tr(d,wx+28,wy+86,"> episode --open",mono(30),(205,218,224),2)
    x=chip(d,860,262,fs=28)
    tr(d,110,470,f"EPISODE {num:02d}",mono(36),MINT,5)
    yy=560
    for ln in title_lines: tr(d,110,yy,ln,disp(150),INK,3); yy+=170
    d.rectangle([118,yy+18,118+320,yy+26],fill=MINT)
    bar_footer(d,110,H-150)
    img.save(f"{OUT}/tt_spotify_ep01_1500.png")

# 3. YOUTUBE 1280x720 (expects a graded-source headshot as hs.png alongside)
def graded_panel(pw,ph,feather=380):
    hs=Image.open(f"{OUT}/hs.png").convert("RGB")
    hs=ImageEnhance.Color(hs).enhance(0.62); hs=ImageEnhance.Brightness(hs).enhance(0.95); hs=ImageEnhance.Contrast(hs).enhance(1.06)
    hs=Image.blend(hs,ImageChops.multiply(hs,Image.new("RGB",hs.size,(198,210,230))),0.30)
    sw,shh=hs.size; sc=max(pw/sw,ph/shh); nw,nh=int(sw*sc),int(shh*sc); hs=hs.resize((nw,nh))
    hs=hs.crop(((nw-pw)//2, int((nh-ph)*0.03), (nw-pw)//2+pw, int((nh-ph)*0.03)+ph))
    arr=np.array(hs).astype(float); yy,xx=np.mgrid[0:ph,0:pw]
    vgrad=np.clip(1.04-np.clip(yy/ph-0.42,0,1)*1.4,0.30,1.04)          # darken shirt/bottom
    r=np.sqrt(((xx/pw-0.5))**2*1.3+((yy/ph-0.30))**2); spot=np.clip(1.08-0.55*np.clip(r-0.14,0,1),0.62,1.1)
    redge=np.clip(1-0.28*np.clip((xx/pw-0.72)/0.28,0,1),0.72,1)
    arr=arr*(vgrad*spot*redge)[:,:,None]; hs=Image.fromarray(np.clip(arr,0,255).astype('uint8'))
    m=np.full((ph,pw),255,'uint8'); m[:, :feather]=np.clip(np.linspace(0,1,feather)*255,0,255).astype('uint8')[None,:]
    bf=200; br=np.clip(np.linspace(0,1,bf)*255,0,255).astype('uint8')[::-1]; m[ph-bf:,:]=np.minimum(m[ph-bf:,:],br[:,None])
    return hs,Image.fromarray(m,"L")
def youtube(title_lines):
    W,H=1280,720; img,d=canvas(W,H,glow=(340,360,540,0.12)); grid(d,W,H,64)
    pw=560; hs,mask=graded_panel(pw,H); img.paste(hs,(W-pw,0),mask); d=ImageDraw.Draw(img,"RGBA")
    wordmark(d,64,58,24)
    promptline(d,64,150,30); x=chip(d,64,210,fs=22)
    yy=326
    for ln in title_lines: tr(d,64,yy,ln,disp(118),INK,2); yy+=128
    d.rectangle([70,yy+10,70+240,yy+18],fill=MINT)
    tr(d,64,H-62,"TECH TUESDAY",mono(28),MINT,4)
    img.save(f"{OUT}/tt_youtube_1280x720.png")

# 4. BADGE 1000x360
def badge():
    W,H=1000,360; img,d=canvas(W,H,glow=(470,180,520,0.12)); grid(d,W,H,60)
    crosshair(d,884,116,36)
    x=64; y=118
    x=tr(d,x,y,"> ",mono(60),MINT,2); x=tr(d,x,y,"tech",mono(60),INK,2)
    x=tr(d,x,y,"_",mono(60),MINT,2); x=tr(d,x,y,"tuesday",mono(60),INK,2)
    d.rectangle([x+12,y+12,x+12+26,y+12+54],fill=MINT)
    xx=chip(d,64,232,fs=30); tr(d,xx+26,238,"THE MO TEACHING SERIES",monoR(28),GREYB,2)
    img.save(f"{OUT}/tt_badge_1000x360.png")

if __name__=="__main__":
    titlecard(); spotify(1,["WHAT IS","MCP?"]); youtube(["WHAT IS","MCP?"]); badge()
    print("done")
