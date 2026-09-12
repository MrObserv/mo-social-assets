# -*- coding: utf-8 -*-
"""MO Architecture Diagram Kit - PUBLIC brand-kit exemplars (canonical).

Four architecture "style modes" in the one MO line-icon language on a clean white
engineering surface. Ported from the refined MO producers and genericised for public
use - NO client names, sites, or client-branded systems appear anywhere.

  1. estate    - C4 L1 system context / site map. Nested zone containers, an
                 ownership/data-centre boundary, a left-to-right actor spine.
                 Use for: "here is the whole estate and who owns which bit".
  2. dataflow  - telemetry left-to-right: apps -> collector -> stores -> view.
                 Use for: showing how signals move through the pipeline.
  3. mesh       - service topology (spider). An application plane of service-to-
                 service calls above an observability plane of telemetry export.
                 Use for: "which service calls which, and how it is observed".
  4. stack      - layered platform stack, sources at the bottom up to consumers.
                 Use for: the tiers of the observability platform at a glance.

RENDER ENVIRONMENT (matches the OG/thumbnail producer discipline):
  - Fonts: Montserrat (ExtraBold/Bold) + DM Sans (Bold/Regular). In the Linux render
    sandbox, install the TTFs from `mo-social-assets/fonts/` into ~/.fonts and run
    `fc-cache -f` first (G: fonts are a stream the sandbox cannot read as binaries).
  - Drawn (vector) arrowheads ONLY. The brand TTFs carry no arrow/dagger glyphs, so
    the Diagram Standard's no-symbol-glyph rule is enforced in code here.
  - Output: set MO_ARCH_OUT, else ./arch_out beside this script. PNG at 2560x1440.

  python3 render_arch_kit.py     # writes arch_estate / arch_dataflow / arch_mesh / arch_stack (.svg + .png)
"""
import cairosvg, os, math

OUT = os.environ.get("MO_ARCH_OUT", os.path.join(os.path.dirname(os.path.abspath(__file__)), "arch_out"))
os.makedirs(OUT, exist_ok=True)

BG="#FBFCFC"; INK="#16282D"; TEAL="#2F9E8D"; TEAL_D="#1E7C6E"; TEAL_L="#57C4B4"; TINT="#EAF6F3"
MUTED="#5D6F73"; WHITE="#FFFFFF"; BORDER="#DCE6E3"; GREY="#9AA5A1"
T="'Montserrat','DM Sans',sans-serif"; B="'DM Sans','Montserrat',sans-serif"

def esc(s): return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
def tx(x,y,s,f=B,sz=14,fill=INK,w="400",a="start",sp=0):
    al=f' text-anchor="{a}"' if a!="start" else ""; ls=f' letter-spacing="{sp}"' if sp else ""
    return f'<text x="{x}" y="{y}" font-family="{f}" font-size="{sz}" font-weight="{w}" fill="{fill}"{al}{ls}>{esc(s)}</text>'
def arrow(x1,y1,x2,y2,col=INK,wd=2,dash=None):
    ang=math.atan2(y2-y1,x2-x1); L=9; sp=math.pi/7
    p1=(x2-L*math.cos(ang-sp),y2-L*math.sin(ang-sp)); p2=(x2-L*math.cos(ang+sp),y2-L*math.sin(ang+sp))
    d=f' stroke-dasharray="{dash}"' if dash else ""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2-3*math.cos(ang):.1f}" y2="{y2-3*math.sin(ang):.1f}" stroke="{col}" stroke-width="{wd}"{d}/>'
            f'<polygon points="{x2:.1f},{y2:.1f} {p1[0]:.1f},{p1[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}" fill="{col}"/>')
def edge_arrow(x1,y1,x2,y2,r1,r2,col=INK,wd=2,dash=None):
    ang=math.atan2(y2-y1,x2-x1)
    return arrow(x1+r1*math.cos(ang),y1+r1*math.sin(ang),x2-r2*math.cos(ang),y2-r2*math.sin(ang),col,wd,dash)

def _g(cx,cy,body,col=TEAL,sw=2.2):
    return f'<g transform="translate({cx},{cy})" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{body}</g>'
# shared line-icon library
def ic_service(cx,cy,col=TEAL): return _g(cx,cy,'<path d="M 0 -13 L 11 -6 V 7 L 0 14 L -11 7 V -6 Z"/><rect x="-4.5" y="-4.5" width="9" height="9" rx="1.5"/>',col)
def ic_funnel(cx,cy,col=TEAL):  return _g(cx,cy,'<path d="M -13 -10 H 13 L 4 2 V 12 L -4 8 V 2 Z"/>',col)
def ic_db(cx,cy,col=TEAL):      return _g(cx,cy,'<ellipse cx="0" cy="-8" rx="12" ry="4"/><path d="M -12 -8 V 8 A 12 4 0 0 0 12 8 V -8"/><path d="M -12 0 A 12 4 0 0 0 12 0"/>',col)
def ic_dash(cx,cy,col=TEAL):    return _g(cx,cy,'<rect x="-13" y="-11" width="26" height="22" rx="2"/><path d="M -8 4 L -3 -3 L 2 2 L 8 -6"/><path d="M -8 8 H 8"/>',col)
def ic_person(cx,cy,col=TEAL):  return _g(cx,cy,'<circle cx="0" cy="-7" r="6"/><path d="M -11 12 C -11 0 11 0 11 12"/>',col)
def ic_alert(cx,cy,col=TEAL):   return _g(cx,cy,'<path d="M -8 6 V -1 A 8 8 0 0 1 8 -1 V 6 L 11 10 H -11 Z"/><path d="M -3 10 A 3 3 0 0 0 3 10"/>',col)
def ic_infra(cx,cy,col=TEAL):   return _g(cx,cy,'<rect x="-12" y="-13" width="24" height="26" rx="2"/><path d="M -12 -4 H 12 M -12 4 H 12"/><circle cx="-7" cy="-8.5" r="1.2"/><circle cx="-7" cy="0" r="1.2"/>',col)
def ic_gateway(cx,cy,col=TEAL): return _g(cx,cy,'<circle cx="-11" cy="0" r="3"/><circle cx="11" cy="-9" r="3"/><circle cx="11" cy="0" r="3"/><circle cx="11" cy="9" r="3"/><path d="M -8 0 H 2 M 2 0 L 8 -9 M 2 0 H 8 M 2 0 L 8 9"/>',col)
def ic_portal(cx,cy,col=TEAL):  return _g(cx,cy,'<rect x="-13" y="-11" width="26" height="22" rx="2"/><path d="M -13 -4 H 13"/><circle cx="-9" cy="-8" r="1.1"/><circle cx="-5.5" cy="-8" r="1.1"/>',col)
def ic_link(cx,cy,col=TEAL):    return _g(cx,cy,'<rect x="-13" y="-6" width="15" height="12" rx="6"/><rect x="-2" y="-6" width="15" height="12" rx="6"/>',col)
def ic_desktop(cx,cy,col=TEAL): return _g(cx,cy,'<rect x="-13" y="-11" width="26" height="18" rx="2"/><path d="M -5 7 V 11 M 5 7 V 11 M -9 11 H 9"/>',col)
def ic_server(cx,cy,col=TEAL):  return _g(cx,cy,'<rect x="-12" y="-13" width="24" height="26" rx="2"/><path d="M -12 -4 H 12 M -12 4 H 12"/><circle cx="-7" cy="-8.5" r="1.2"/><circle cx="-7" cy="0" r="1.2"/><circle cx="-7" cy="8.5" r="1.2"/>',col)
def ic_cluster(cx,cy,col=TEAL): return _g(cx,cy,'<rect x="-12" y="-12" width="10" height="10" rx="1.5"/><rect x="2" y="-12" width="10" height="10" rx="1.5"/><rect x="-12" y="2" width="10" height="10" rx="1.5"/><rect x="2" y="2" width="10" height="10" rx="1.5"/>',col)
def ic_layers(cx,cy,col=TEAL):  return _g(cx,cy,'<path d="M 0 -12 L 13 -5 L 0 2 L -13 -5 Z"/><path d="M -13 1 L 0 8 L 13 1"/><path d="M -13 7 L 0 14 L 13 7"/>',col)
def ic_storage(cx,cy,col=TEAL): return _g(cx,cy,'<ellipse cx="0" cy="-8" rx="12" ry="4"/><path d="M -12 -8 V 8 A 12 4 0 0 0 12 8 V -8"/><path d="M -12 0 A 12 4 0 0 0 12 0"/>',col)
def ic_switch(cx,cy,col=TEAL):  return _g(cx,cy,'<rect x="-13" y="-6" width="26" height="12" rx="2"/><path d="M -8 6 V 11 M 0 6 V 11 M 8 6 V 11 M -8 -6 V -11 M 0 -6 V -11 M 8 -6 V -11"/>',col)

def header(s,kicker,title,x=64):
    s.append(tx(x,60,kicker,B,12,TEAL,"700","start",3))
    s.append(tx(x-2,98,title,T,29,INK,"800"))
    s.append(f'<line x1="{x}" y1="120" x2="1216" y2="120" stroke="{BORDER}" stroke-width="1.4"/>')
def footer(s,right):
    s.append(f'<line x1="64" y1="672" x2="1216" y2="672" stroke="{BORDER}" stroke-width="1.2"/>')
    s.append(tx(64,694,"Mastering Observability   ·   masteringobservability.com",B,10.5,MUTED,"400","start",0.5))
    s.append(tx(1216,694,right,B,10.5,MUTED,"400","end",0.5))
def chip(cx,cy,icon,name,tag=None,r=22,col=TEAL,tint=TINT,txtcol=INK):
    o=[f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{tint}"/>',icon(cx,cy,col),
       tx(cx,cy+r+18,name,B,13.5,txtcol,"700","middle")]
    if tag: o.append(tx(cx,cy+r+34,tag,B,11,MUTED,"400","middle"))
    return "".join(o)
def node(x,y,w,h,title,sub=None,kind="build"):
    fill=TINT if kind=="build" else WHITE; line=TEAL if kind=="build" else BORDER; lw=2 if kind=="build" else 1.3
    o=[f'<rect x="{x+2}" y="{y+3}" width="{w}" height="{h}" rx="8" fill="#000" opacity="0.04"/>',
       f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{line}" stroke-width="{lw}"/>']
    cy=y+h/2-(6 if sub else -4)
    o.append(tx(x+w/2,cy,title,T,15,INK,"800","middle"))
    if sub: o.append(tx(x+w/2,cy+18,sub,B,11.5,MUTED,"400","middle"))
    return "".join(o)

def render(name,body,w=2560):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="{BG}"/>'+body+'</svg>'
    open(os.path.join(OUT,name+".svg"),"w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(),write_to=os.path.join(OUT,name+".png"),output_width=w,output_height=int(w*720/1280))
    print("wrote",name)

# ================= MODE 1: ESTATE (C4 L1 system context / site map) =================
def comp_card(x,y,w,icon,name,tag,planned=False):
    col=GREY if planned else TEAL; txtcol=MUTED if planned else INK
    dash=' stroke-dasharray="5 4"' if planned else ""
    return "".join([f'<rect x="{x+2}" y="{y+3}" width="{w}" height="52" rx="6" fill="#000000" opacity="0.04"/>',
       f'<rect x="{x}" y="{y}" width="{w}" height="52" rx="6" fill="{WHITE}" stroke="{BORDER if not planned else GREY}" stroke-width="1.3"{dash}/>',
       f'<circle cx="{x+32}" cy="{y+26}" r="19" fill="{TINT if not planned else "#F0F1EF"}"/>',
       ICON_E[icon](x+32,y+26,col),
       tx(x+62,y+24,name,B,14,txtcol,"700"), tx(x+62,y+41,tag,B,11,MUTED,"400")])
ICON_E={"person":ic_person,"gateway":ic_gateway,"portal":ic_portal,"link":ic_link,
      "desktop":ic_desktop,"server":ic_server,"cluster":ic_cluster,"layers":ic_layers,
      "storage":ic_storage,"switch":ic_switch}
def zh_for(n): return 36+12+n*54+(n-1)*12+12
def zone(x,y,w,h,label,cards):
    n=len(cards); ch=54; gap=12; head=36
    s=[f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{WHITE}" stroke="{BORDER}" stroke-width="1.4"/>',
       f'<path d="M {x} {y+head} V {y+8} A 8 8 0 0 1 {x+8} {y} H {x+w-8} A 8 8 0 0 1 {x+w} {y+8} V {y+head} Z" fill="{TINT}"/>',
       tx(x+16,y+23,label,B,12,TEAL_D,"700","start",1.5)]
    body=h-head; total=n*ch+(n-1)*gap; cy=y+head+(body-total)/2
    for icon,name,tag,pl in cards:
        s.append(comp_card(x+14,cy,w-28,icon,name,tag,pl)); cy+=ch+gap
    return "".join(s)

def build_estate():
    W,H=1280,720
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">', f'<rect width="{W}" height="{H}" fill="{BG}"/>']
    s.append(tx(64,60,"MASTERING OBSERVABILITY   ·   ARCHITECTURE",B,12,TEAL,"700","start",3))
    s.append(tx(62,98,"Engineering desktop estate",T,30,INK,"800"))
    s.append(f'<line x1="64" y1="120" x2="1216" y2="120" stroke="{BORDER}" stroke-width="1.4"/>')
    zy=190; zw=232; spine=zy+96
    zones=[
     (196,"ACCESS EDGE",[("gateway","Load balancer","ADC gateway",False),("portal","Broker portal","web front end",False),("link","VPN access","secure tunnel",False)]),
     (452,"VIRTUAL DESKTOP",[("desktop","VDI agent","delivery agent",False),("desktop","Session hosts","pooled",False)]),
     (708,"HOSTING",[("server","Blade servers","cartridge chassis",False),("cluster","Hyperconverged","HCI nodes",False),("layers","Hypervisor","virtualisation",False)]),
     (964,"FOUNDATION",[("storage","Storage array","block + file",False),("switch","Network fabric","core switching",False)]),
    ]
    maxh=max(zh_for(len(c)) for _,_,c in zones)
    zbody=[zone(zx,zy,zw,maxh,label,cards) for zx,label,cards in zones]
    maxbot=zy+maxh
    dcx1=680; dcx2=1216
    s.append(f'<rect x="{dcx1}" y="{zy-30}" width="{dcx2-dcx1}" height="{maxbot-zy+48}" rx="12" fill="none" stroke="{TEAL}" stroke-width="1.6" stroke-dasharray="2 6"/>')
    s.append(f'<rect x="{dcx1+18}" y="{zy-41}" width="430" height="22" rx="11" fill="{BG}"/>')
    s.append(tx(dcx1+28,zy-25,"TWO DATA CENTRES · SITE A + SITE B · ACTIVE / ACTIVE",B,11,TEAL_D,"700","start",0.5))
    s.append(f'<circle cx="112" cy="{spine}" r="30" fill="{TINT}"/>'+ic_person(112,spine,TEAL))
    s.append(tx(112,spine+52,"Engineer",T,15,INK,"800","middle"))
    s.append(tx(112,spine+72,"device / VDI client",B,11.5,MUTED,"400","middle"))
    s.extend(zbody)
    s.append(arrow(150,spine,196,spine)); s.append(arrow(428,spine,452,spine))
    s.append(arrow(684,spine,708,spine)); s.append(arrow(940,spine,964,spine))
    ky=628
    s.append(f'<line x1="64" y1="{ky-16}" x2="1216" y2="{ky-16}" stroke="{BORDER}" stroke-width="1.2"/>')
    s.append(tx(64,ky+2,"KEY",B,10,GREY,"700","start",2))
    s.append(f'<circle cx="130" cy="{ky-2}" r="12" fill="{TINT}"/>'+ic_server(130,ky-2,TEAL)+tx(150,ky+3,"component we run (teal line-icon in tint)",B,11.5,MUTED))
    s.append(f'<rect x="470" y="{ky-12}" width="22" height="18" rx="4" fill="none" stroke="{GREY}" stroke-width="1.4" stroke-dasharray="4 3"/>'+tx(500,ky+3,"planned / not yet live",B,11.5,MUTED))
    s.append(f'<line x1="700" y1="{ky-3}" x2="726" y2="{ky-3}" stroke="{TEAL}" stroke-width="1.6" stroke-dasharray="2 5"/>'+tx(734,ky+3,"data-centre / ownership boundary",B,11.5,MUTED))
    s.append(f'<line x1="64" y1="678" x2="1216" y2="678" stroke="{BORDER}" stroke-width="1.2"/>')
    s.append(tx(64,700,"Mastering Observability   ·   masteringobservability.com",B,10.5,MUTED,"400","start",0.5))
    s.append(tx(1216,700,"C4 Level 1  ·  system context",B,10.5,MUTED,"400","end",0.5))
    s.append('</svg>')
    svg="".join(s)
    open(os.path.join(OUT,"arch_estate.svg"),"w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(),write_to=os.path.join(OUT,"arch_estate.png"),output_width=2560,output_height=1440)
    print("wrote arch_estate")

# ================= MODE 2: DATAFLOW =================
def build_dataflow():
    s=[]; header(s,"ARCHITECTURE  ·  DATA FLOW","OpenTelemetry through an open-source stack")
    apps=[("Checkout",250),("Payments",360),("Search",470)]
    s.append(tx(70,175,"INSTRUMENTED APPS",B,11.5,TEAL_D,"700","start",1.5))
    for nm,cy in apps:
        s.append(f'<rect x="64" y="{cy-30}" width="150" height="60" rx="8" fill="{WHITE}" stroke="{BORDER}" stroke-width="1.3"/>')
        s.append(f'<circle cx="98" cy="{cy}" r="19" fill="{TINT}"/>'+ic_service(98,cy,TEAL))
        s.append(tx(126,cy-2,nm,B,13.5,INK,"700")); s.append(tx(126,cy+15,"OTel SDK",B,10.5,MUTED,"400"))
        s.append(arrow(214,cy,300,360,TEAL,1.8))
    s.append(f'<rect x="302" y="303" width="180" height="150" rx="8" fill="#000" opacity="0.04"/>')
    s.append(f'<rect x="300" y="300" width="180" height="150" rx="8" fill="{TINT}" stroke="{TEAL}" stroke-width="2"/>')
    s.append(tx(390,329,"OpenTelemetry",T,14,INK,"800","middle")); s.append(tx(390,346,"Collector",T,13,INK,"800","middle"))
    for i,lbl in enumerate(["Receivers","Processors","Exporters"]):
        yy=360+i*26
        s.append(f'<rect x="320" y="{yy}" width="140" height="20" rx="4" fill="{WHITE}" stroke="{TEAL}" stroke-width="1.2"/>')
        s.append(tx(390,yy+14,lbl,B,11,TEAL_D,"600","middle"))
    s.append(tx(390,472,"OTLP in  ·  we run",B,10.5,TEAL,"400","middle",0.5))
    stores=[("Prometheus","metrics",250,TEAL),("Loki","logs",360,TEAL),("Tempo","traces",470,TEAL)]
    s.append(tx(600,175,"OPEN-SOURCE STORES",B,11.5,TEAL_D,"700","start",1.5))
    for nm,sig,cy,col in stores:
        s.append(chip(660,cy,ic_db,nm,sig,20,col)); s.append(arrow(480,375,624,cy,col,1.8)); s.append(arrow(700,cy,980,360,col,1.8))
    s.append(f'<rect x="982" y="303" width="180" height="120" rx="8" fill="#000" opacity="0.04"/>')
    s.append(f'<rect x="980" y="300" width="180" height="120" rx="8" fill="{WHITE}" stroke="{BORDER}" stroke-width="1.3"/>')
    s.append(f'<circle cx="1070" cy="340" r="20" fill="{TINT}"/>'+ic_dash(1070,340,TEAL))
    s.append(tx(1070,384,"Grafana",T,15,INK,"800","middle")); s.append(tx(1070,402,"one pane of glass",B,11.5,MUTED,"400","middle"))
    s.append(tx(1070,442,"query + dashboards",B,10.5,MUTED,"400","middle"))
    s.append(tx(64,632,"FLOW",B,10,GREY,"700","start",2))
    s.append(f'<line x1="120" y1="628" x2="150" y2="628" stroke="{TEAL}" stroke-width="2"/>'+tx(158,632,"telemetry (metrics / logs / traces) flows left to right, app to store to view",B,11.5,MUTED))
    footer(s,"OpenTelemetry reference architecture  ·  receivers to exporters to backends")
    render("arch_dataflow","".join(s))

# ================= MODE 3: MESH (topology / spider) =================
def build_mesh():
    s=[]; header(s,"ARCHITECTURE  ·  TOPOLOGY","Service mesh: apps talking to apps")
    s.append(f'<rect x="64" y="150" width="1152" height="300" rx="10" fill="{WHITE}" stroke="{BORDER}" stroke-width="1.3"/>')
    s.append(tx(80,178,"APPLICATION PLANE  ·  SERVICE-TO-SERVICE CALLS",B,11.5,TEAL_D,"700","start",1.2))
    R=34
    svc={"Gateway":(200,300),"Auth":(410,225),"Orders":(570,335),"Payments":(760,225),"Inventory":(760,410),"Notify":(970,300)}
    calls=[("Gateway","Auth"),("Gateway","Orders"),("Auth","Orders"),("Orders","Payments"),("Orders","Inventory"),("Payments","Notify"),("Inventory","Notify")]
    for a,b in calls:
        x1,y1=svc[a]; x2,y2=svc[b]; s.append(edge_arrow(x1,y1,x2,y2,R,R,TEAL,1.8))
    for nm,(cx,cy) in svc.items():
        s.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{TINT}" stroke="{TEAL}" stroke-width="1.6"/>')
        s.append(ic_service(cx,cy-4,TEAL)); s.append(tx(cx,cy+22,nm,B,11,INK,"700","middle"))
    s.append(f'<rect x="64" y="474" width="1152" height="150" rx="10" fill="{TINT}" stroke="{TEAL}" stroke-width="1.3"/>')
    s.append(tx(80,502,"OBSERVABILITY PLANE  ·  TELEMETRY",B,11.5,TEAL_D,"700","start",1.2))
    s.append(node(500,506,180,86,"OpenTelemetry","Collector","plain"))
    s.append(chip(900,549,ic_dash,"Grafana",None,22,TEAL))
    for nm,(cx,cy) in svc.items():
        s.append(arrow(cx,cy+R,590,504,GREY,1.3,"3 4"))
    s.append(arrow(680,549,878,549,TEAL,1.8))
    s.append(f'<line x1="150" y1="648" x2="182" y2="648" stroke="{TEAL}" stroke-width="1.8"/>'+tx(190,652,"service call",B,11.5,MUTED))
    s.append(f'<line x1="330" y1="648" x2="362" y2="648" stroke="{GREY}" stroke-width="1.4" stroke-dasharray="3 4"/>'+tx(370,652,"telemetry export",B,11.5,MUTED))
    s.append(tx(64,652,"KEY",B,10,GREY,"700","start",2))
    footer(s,"topology view  ·  two planes: application + observability")
    render("arch_mesh","".join(s))

# ================= MODE 4: STACK (layered platform) =================
def build_stack():
    s=[]; header(s,"ARCHITECTURE  ·  PLATFORM STACK","The observability stack, in layers")
    bands=[
     ("CONSUMERS","engineers · dashboards · alerts · AIOps",[("person","Engineers"),("dash","Dashboards"),("alert","Alerts")]),
     ("VISUALISATION & QUERY","one pane of glass",[("dash","Grafana")]),
     ("STORAGE","open-source backends",[("db","Prometheus"),("db","Loki"),("db","Tempo")]),
     ("COLLECTION","OpenTelemetry",[("funnel","Agents"),("funnel","Gateway collector")]),
     ("SOURCES","apps + infrastructure",[("service","Apps"),("infra","Infra / k8s")]),
    ]
    ICN={"person":ic_person,"dash":ic_dash,"alert":ic_alert,"db":ic_db,"funnel":ic_funnel,"service":ic_service,"infra":ic_infra}
    by=158; bh=88; gap=12
    for i,(lbl,sub,items) in enumerate(bands):
        y=by+i*(bh+gap); build = lbl in ("COLLECTION",)
        s.append(f'<rect x="64" y="{y}" width="1152" height="{bh}" rx="8" fill="{WHITE}" stroke="{TEAL if build else BORDER}" stroke-width="{2 if build else 1.3}"/>')
        if build: s.append(f'<rect x="64" y="{y}" width="6" height="{bh}" rx="3" fill="{TEAL}"/>')
        s.append(tx(88,y+38,lbl,B,13,TEAL_D,"700","start",1.2))
        s.append(tx(88,y+58,sub+("  ·  we run" if build else ""),B,11,MUTED,"400"))
        ix=430
        for icon,nm in items:
            s.append(f'<circle cx="{ix}" cy="{y+bh/2}" r="20" fill="{TINT}"/>'+ICN[icon](ix,y+bh/2,TEAL))
            s.append(tx(ix+30,y+bh/2+5,nm,B,13,INK,"600")); ix+=90+len(nm)*8.5
        if i>0:
            s.append(arrow(1128,y-1,1128,y-gap+1,TEAL,2))
    footer(s,"layered stack  ·  sources to consumers")
    render("arch_stack","".join(s))

if __name__ == "__main__":
    build_estate(); build_dataflow(); build_mesh(); build_stack()
    print("done - 4 modes ->", OUT)
