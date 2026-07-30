import os, numpy as np
from PIL import Image, ImageDraw, ImageFont
F=os.environ["MO_FONTS"]; OUT=os.path.dirname(os.path.abspath(__file__))
W,H=1920,1080; FPS,DUR=30,7.0; N=int(FPS*DUR)
NAVY3=np.array([15,33,55]); NAVYTOP=np.array([9,13,21])
MINT=(100,255,218); TEAL=(20,163,168); INK=(255,255,255); GREYB=(191,206,214)
GRID=(19,50,58); NAVYINK=(9,16,24); MUTE=(78,100,110)
disp=lambda s: ImageFont.truetype(f"{F}/Montserrat-ExtraBold.ttf",s)
mono=lambda s: ImageFont.truetype(f"{F}/SpaceMono-Bold.ttf",s)
monoR=lambda s: ImageFont.truetype(f"{F}/SpaceMono-Regular.ttf",s)
def smooth(x): x=max(0.,min(1.,x)); return x*x*(3-2*x)
def eout(x): x=max(0.,min(1.,x)); return 1-(1-x)**3
def tr(d,x,y,t,f,fill,s):
    for c in t: d.text((x,y),c,font=f,fill=fill); x+=f.getbbox(c)[2]+s
    return x
def twd(t,f,s): return sum(f.getbbox(c)[2]+s for c in t)-s if t else 0

def base():
    t=np.linspace(0,1,H)[:,None]; col=(NAVYTOP[None,:]*(1-t)+NAVY3[None,:]*t)
    arr=np.repeat(col[:,None,:],W,axis=1); yy,xx=np.mgrid[0:H,0:W]
    r=np.sqrt(((xx-W/2)/(W*0.72))**2+((yy-H*0.42)/(H*0.72))**2)
    arr=arr*np.clip(1-0.35*np.clip(r-0.35,0,1),0.62,1)[:,:,None]
    rr=np.sqrt(((xx-420)/780)**2+((yy-700)/780)**2)
    arr=arr+np.array(MINT)[None,None,:]*(np.clip(1-rr,0,1)**2*0.17)[:,:,None]
    img=Image.fromarray(np.clip(arr,0,255).astype('uint8'),"RGB"); d=ImageDraw.Draw(img)
    for x in range(0,W,96): d.line([(x,0),(x,H)],fill=GRID,width=1)
    for y in range(0,H,96): d.line([(0,y),(W,y)],fill=GRID,width=1)
    return img
BASE=base()
DF=disp(188)
HERO=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(HERO)
tr(hd,140,500,"TECH",DF,INK+(255,),4)
tr(hd,140,698,"TUESDAY",DF,MINT+(255,),4)
HERO_R=140+max(twd("TECH",DF,4),twd("TUESDAY",DF,4))
HEROA=np.array(HERO.split()[3]).astype(float)/255
xs=np.arange(W)

WX,WY,WW,WH=140,326,610,152
CMD="start --learn"
SW0,SW1=2.65,4.30      # reveal sweep window
def frame(i):
    t=i/FPS; img=BASE.copy(); d=ImageDraw.Draw(img,"RGBA")
    a=int(255*smooth(t/0.4)); tr(d,140,120,"METRICS & MAYHEM",mono(30),(214,228,231,a),3)
    d.rectangle([140,164,236,168],fill=TEAL+(a,))
    wa=int(255*smooth((t-0.1)/0.45))
    if wa>4:
        d.rounded_rectangle([WX,WY,WX+WW,WY+WH],radius=12,outline=(50,84,94,wa),width=2)
        for k,c in enumerate([(150,66,66),(150,128,66),(92,152,114)]):
            d.ellipse([WX+26+k*34,WY+22,WX+26+k*34+16,WY+38],fill=c+(wa,))
        tr(d,WX+150,WY+16,"~/mo/tech_tuesday",monoR(26),MUTE+(wa,),2)
        d.line([(WX,WY+56),(WX+WW,WY+56)],fill=(34,62,70,wa),width=2)
    tstart,per=0.6,0.105
    nch=max(0,min(len(CMD),int((t-tstart)/per))) if t>=tstart else 0
    if wa>60:
        px=tr(d,WX+30,WY+90,"> ",mono(34),MINT+(255,),2)
        if nch>0: px=tr(d,px,WY+90,CMD[:nch],mono(34),(210,222,228,255),2)
        typed_done=t>=(tstart+len(CMD)*per); entered=t>=2.5
        if not entered:
            if (int(t*2)%2==0) or (t>=tstart and not typed_done):
                d.rectangle([px+10,WY+86,px+27,WY+126],fill=MINT+(255,))
        else:
            fa=int(170*max(0,1-(t-2.5)/0.35))
            if fa>4: d.rectangle([WX+2,WY+80,WX+WW-2,WY+132],fill=MINT+(fa,))
    # HERO left-to-right print reveal
    if t>=SW0:
        p=smooth((t-SW0)/(SW1-SW0)); scanX=120+p*(HERO_R+70-120)
        if p<1.0:
            feather=52
            colm=np.clip((scanX-xs)/feather,0,1)
            comb=(HEROA*np.repeat(colm[None,:],H,axis=0)*255).astype('uint8')
            img.paste(HERO,(0,0),Image.fromarray(comb,"L")); d=ImageDraw.Draw(img,"RGBA")
            d.rectangle([scanX-22,466,scanX-2,900],fill=MINT+(38,))
            d.rectangle([scanX-2,466,scanX+3,900],fill=MINT+(235,))
            uw=int(max(0,min(540,(scanX-148))))
            if uw>0: d.rectangle([148,928,148+min(540,uw),934],fill=MINT+(255,))
        else:
            img.paste(HERO,(0,0),HERO); d=ImageDraw.Draw(img,"RGBA")
            d.rectangle([148,928,148+540,934],fill=MINT+(255,))
    # chip + tagline
    cp=eout((t-SW1)/0.5); ca=int(255*cp)
    if ca>3:
        yo=int((1-cp)*22); cf=mono(30); trk=4; bb=cf.getbbox("TUE"); th=bb[3]-bb[1]
        w=twd("TUE",cf,trk); padx=18; pady=13; ch=th+2*pady
        d.rounded_rectangle([140,972+yo,140+w+2*padx,972+yo+ch],radius=9,fill=MINT+(ca,))
        tr(d,140+padx,972+yo+(ch-th)/2-bb[1],"TUE",cf,NAVYINK+(255,),trk)
        tycap=972+yo+(ch-th)/2-bb[1]
        tr(d,140+w+2*padx+28,tycap+2,"ONE THING, EXPLAINED WELL.",monoR(30),GREYB+(ca,),2)
    img.save(f"/tmp/ttf_{i:04d}.png")

for i in range(N): frame(i)
os.system("rm -f /tmp/tt_intro.mp4")
os.system(f"ffmpeg -y -framerate {FPS} -i /tmp/ttf_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 '{OUT}/tt_intro_16x9.mp4' -loglevel error")
os.system("rm -f /tmp/ttf_*.png")
print("done")
