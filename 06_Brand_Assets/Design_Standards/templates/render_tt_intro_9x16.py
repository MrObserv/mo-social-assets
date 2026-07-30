import os, numpy as np
from PIL import Image, ImageDraw, ImageFont
F=os.environ["MO_FONTS"]; OUT=os.path.dirname(os.path.abspath(__file__))
W,H=1080,1920; FPS,DUR=30,7.0; N=int(FPS*DUR)
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
def cx(t,f,s): return (W-twd(t,f,s))/2
def base():
    t=np.linspace(0,1,H)[:,None]; col=(NAVYTOP[None,:]*(1-t)+NAVY3[None,:]*t)
    arr=np.repeat(col[:,None,:],W,axis=1); yy,xx=np.mgrid[0:H,0:W]
    r=np.sqrt(((xx-W/2)/(W*0.85))**2+((yy-H*0.46)/(H*0.7))**2)
    arr=arr*np.clip(1-0.32*np.clip(r-0.35,0,1),0.64,1)[:,:,None]
    rr=np.sqrt(((xx-W/2)/700)**2+((yy-980)/700)**2)
    arr=arr+np.array(MINT)[None,None,:]*(np.clip(1-rr,0,1)**2*0.15)[:,:,None]
    img=Image.fromarray(np.clip(arr,0,255).astype('uint8'),"RGB"); d=ImageDraw.Draw(img)
    for x in range(0,W,90): d.line([(x,0),(x,H)],fill=GRID,width=1)
    for y in range(0,H,90): d.line([(0,y),(W,y)],fill=GRID,width=1)
    return img
BASE=base()
DF=disp(150)
# centered hero layer
w1=twd("TECH",DF,4); w2=twd("TUESDAY",DF,4)
x1=(W-w1)/2; x2=(W-w2)/2; Y1,Y2=930,1108
HERO=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(HERO)
tr(hd,x1,Y1,"TECH",DF,INK+(255,),4); tr(hd,x2,Y2,"TUESDAY",DF,MINT+(255,),4)
HEROA=np.array(HERO.split()[3]).astype(float)/255
hero_l=min(x1,x2); hero_r=max(x1+w1,x2+w2)
UWID=int(w2*0.5); UX0=int(W/2-UWID/2)
xs=np.arange(W)
WW=820; WX=(W-WW)//2; WY=560; WH=170
CMD="start --learn"; SW0,SW1=2.65,4.30
def frame(i):
    t=i/FPS; img=BASE.copy(); d=ImageDraw.Draw(img,"RGBA")
    a=int(255*smooth(t/0.4))
    wmx=cx("METRICS & MAYHEM",mono(34),3); tr(d,wmx,300,"METRICS & MAYHEM",mono(34),(214,228,231,a),3)
    d.rectangle([W/2-52,352,W/2+52,357],fill=TEAL+(a,))
    wa=int(255*smooth((t-0.1)/0.45))
    if wa>4:
        d.rounded_rectangle([WX,WY,WX+WW,WY+WH],radius=14,outline=(50,84,94,wa),width=2)
        for k,c in enumerate([(150,66,66),(150,128,66),(92,152,114)]):
            d.ellipse([WX+30+k*36,WY+26,WX+30+k*36+18,WY+44],fill=c+(wa,))
        tr(d,WX+170,WY+18,"~/mo/tech_tuesday",monoR(30),MUTE+(wa,),2)
        d.line([(WX,WY+64),(WX+WW,WY+64)],fill=(34,62,70,wa),width=2)
    tstart,per=0.6,0.105
    nch=max(0,min(len(CMD),int((t-tstart)/per))) if t>=tstart else 0
    if wa>60:
        px=tr(d,WX+34,WY+100,"> ",mono(40),MINT+(255,),2)
        if nch>0: px=tr(d,px,WY+100,CMD[:nch],mono(40),(210,222,228,255),2)
        typed_done=t>=(tstart+len(CMD)*per); entered=t>=2.5
        if not entered:
            if (int(t*2)%2==0) or (t>=tstart and not typed_done): d.rectangle([px+10,WY+96,px+30,WY+146],fill=MINT+(255,))
        else:
            fa=int(170*max(0,1-(t-2.5)/0.35))
            if fa>4: d.rectangle([WX+2,WY+90,WX+WW-2,WY+150],fill=MINT+(fa,))
    if t>=SW0:
        p=smooth((t-SW0)/(SW1-SW0)); scanX=hero_l-40+p*((hero_r+50)-(hero_l-40))
        if p<1.0:
            feather=56; colm=np.clip((scanX-xs)/feather,0,1)
            comb=(HEROA*np.repeat(colm[None,:],H,axis=0)*255).astype('uint8')
            img.paste(HERO,(0,0),Image.fromarray(comb,"L")); d=ImageDraw.Draw(img,"RGBA")
            d.rectangle([scanX-24,Y1-30,scanX-2,Y2+180],fill=MINT+(38,)); d.rectangle([scanX-2,Y1-30,scanX+4,Y2+180],fill=MINT+(235,))
            uw=max(0,min(UWID,(scanX-UX0)))
            if uw>0: d.rectangle([UX0,Y2+186,UX0+uw,Y2+194],fill=MINT+(255,))
        else:
            img.paste(HERO,(0,0),HERO); d=ImageDraw.Draw(img,"RGBA")
            d.rectangle([UX0,Y2+186,UX0+UWID,Y2+194],fill=MINT+(255,))
    cp=eout((t-SW1)/0.5); ca=int(255*cp)
    if ca>3:
        yo=int((1-cp)*22); tag="ONE THING, EXPLAINED WELL."
        tr(d,cx(tag,monoR(34),2),1360+yo,tag,monoR(34),GREYB+(ca,),2)
    img.save(f"/tmp/vf_{i:04d}.png")
for i in range(N): frame(i)
os.system(f"ffmpeg -y -framerate {FPS} -i /tmp/vf_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 '{OUT}/tt_intro_9x16_silent.mp4' -loglevel error")
os.system("rm -f /tmp/vf_*.png"); print("frames done")
