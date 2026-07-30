"""
Signal Drop / Metrics & Mayhem — Riverside virtual background generator.

Builds three 1920x1080 PNG backgrounds for the Riverside studio:
  v1_broadcast_set.png  — polished broadcast set, recommended default
  v2_on_air_studio.png  — two-tone studio with depth and signage
  v3_signal_architecture.png — observability-themed, dotted-grid + waveform

Brand palette (from logo-master.svg + thumbnail system):
  Base:           #0a0e17
  Deep teal:      #0d7377
  Mid teal:       #14a3a8
  Iris green:     #0a5c5e
  Mint accent:    #64ffda
  Pupil mint:     #2dd4bf
  Ink (text):     #ffffff
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os

W, H = 1920, 1080
OUT_DIR = "/sessions/dazzling-sharp-thompson/mnt/outputs/bg_v2"

# --- Brand palette ---
BASE       = (13, 33, 39)        # #0D2127 v2.0 navy
NAVY       = (19, 49, 58)        # #13313A v2.0 navy2
TEAL_DEEP  = (47, 158, 141)      # #2F9E8D v2.0 teal
TEAL_MID   = (116, 221, 205)     # #74DDCD v2.0 bright teal
IRIS       = (10, 92, 94)        # #0a5c5e
MINT       = (116, 221, 205)     # #74DDCD v2.0 bright teal
PUPIL      = (47, 158, 141)      # #2F9E8D v2.0 teal
INK        = (255, 255, 255)
TEAL_DARK  = (28, 60, 69)        # #1C3C45 v2.0 card dark

# --- Fonts ---
FONT_DISPLAY = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/Montserrat-ExtraBold.ttf"
FONT_HEAVY   = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/Montserrat-Bold.ttf"
FONT_BOLD    = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/DMSans-Bold.ttf"
FONT_REG     = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/DMSans-Regular.ttf"
FONT_MONO    = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/SpaceMono-Bold.ttf"
FONT_MONO_R  = "/sessions/dazzling-sharp-thompson/mnt/Projects/Metrics And Mayhem/06_Brand_Assets/fonts/SpaceMono-Regular.ttf"

def f(path, size):
    return ImageFont.truetype(path, size)

# ===== Helpers =====

def rgb(c, a=255):
    return (*c, a) if len(c) == 3 else c

def radial_glow(size, color, max_alpha=80, falloff=1.8):
    """Returns an RGBA image with a radial glow centered."""
    w, h = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    px = img.load()
    cx, cy = w/2, h/2
    maxr = math.hypot(cx, cy)
    for y in range(h):
        for x in range(w):
            d = math.hypot(x-cx, y-cy) / maxr
            a = int(max_alpha * max(0, 1 - d) ** falloff)
            if a:
                px[x, y] = (*color, a)
    return img

def draw_lens_logo(draw_img, cx, cy, scale=1.0, opacity=255, mint_ticks=True):
    """Draws the Metrics & Mayhem lens mark on an RGBA image."""
    s = scale
    img = draw_img  # RGBA Image
    d = ImageDraw.Draw(img, "RGBA")
    R_outer = int(90 * s)
    R_mid   = int(75 * s)
    R_disc  = int(62 * s)
    R_iris  = int(26 * s)
    R_pupil = int(16 * s)
    # outer ring
    d.ellipse([cx-R_outer, cy-R_outer, cx+R_outer, cy+R_outer],
              outline=(*TEAL_DEEP, opacity), width=max(2, int(3*s)))
    d.ellipse([cx-R_mid, cy-R_mid, cx+R_mid, cy+R_mid],
              outline=(*TEAL_MID, int(opacity*0.6)), width=max(1, int(2*s)))
    d.ellipse([cx-R_disc, cy-R_disc, cx+R_disc, cy+R_disc],
              fill=(*TEAL_DARK, opacity))
    # eye shape
    eye_w = int(64 * s)
    eye_h = int(50 * s)
    # approximate eye with two arcs by drawing two ellipses clipped
    # Easier: use polygon with bezier curve approximation
    pts_top = []
    pts_bot = []
    for t in [i/40 for i in range(41)]:
        # Top arc of eye
        x = cx - eye_w + 2*eye_w*t
        y = cy - eye_h * math.sin(math.pi * t) * 0.78
        pts_top.append((x, y))
    for t in [i/40 for i in range(41)]:
        x = cx + eye_w - 2*eye_w*t
        y = cy + eye_h * math.sin(math.pi * t) * 0.78
        pts_bot.append((x, y))
    eye_poly = pts_top + pts_bot
    d.polygon(eye_poly, fill=(*INK, opacity))
    # iris + pupil
    d.ellipse([cx-R_iris, cy-R_iris, cx+R_iris, cy+R_iris], fill=(*IRIS, opacity))
    d.ellipse([cx-R_pupil, cy-R_pupil, cx+R_pupil, cy+R_pupil], fill=(*PUPIL, opacity))
    # highlight
    hx, hy = cx + int(9*s), cy - int(8*s)
    hr = max(2, int(5.5*s))
    d.ellipse([hx-hr, hy-hr, hx+hr, hy+hr], fill=(*INK, int(opacity*0.45)))
    # crosshair ticks
    if mint_ticks:
        tick_len = int(20*s)
        tick_w = max(2, int(3*s))
        for (x1,y1,x2,y2) in [
            (cx, cy-R_outer-tick_len, cx, cy-R_outer-2),
            (cx, cy+R_outer+2,        cx, cy+R_outer+tick_len),
            (cx-R_outer-tick_len, cy, cx-R_outer-2, cy),
            (cx+R_outer+2, cy,        cx+R_outer+tick_len, cy),
        ]:
            d.line([(x1,y1),(x2,y2)], fill=(*MINT, opacity), width=tick_w)

def dot_grid(img, color=(100,255,218), alpha=14, step=48, dot_r=1):
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(step//2, H, step):
        for x in range(step//2, W, step):
            d.ellipse([x-dot_r, y-dot_r, x+dot_r, y+dot_r], fill=(*color, alpha))

def line_grid(img, color=(100,255,218), alpha=8, step=60):
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, step):
        d.line([(x,0),(x,H)], fill=(*color, alpha), width=1)
    for y in range(0, H, step):
        d.line([(0,y),(W,y)], fill=(*color, alpha), width=1)

def text_kerned(img, xy, text, font, fill, tracking=0):
    """Draws text with extra letter spacing (tracking in px)."""
    d = ImageDraw.Draw(img, "RGBA")
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        bbox = font.getbbox(ch)
        x += (bbox[2] - bbox[0]) + tracking

def measure_kerned(text, font, tracking=0):
    w = 0
    for ch in text:
        bbox = font.getbbox(ch)
        w += (bbox[2] - bbox[0]) + tracking
    return w - tracking

# Subject safe zone (the area Riverside's matting tends to occupy).
# Observed from Al's actual Riverside render: shoulders are WIDER than expected.
SAFE_X1, SAFE_X2 = 540, 1380   # subject silhouette
SAFE_Y1, SAFE_Y2 = 200, 1080   # crown of head ~y=200, extends to bottom
# 9:16 Shorts crop centre column (centre 608 of 1920):
SHORTS_X1, SHORTS_X2 = 656, 1264
# Brand-shelf at TOP of Shorts column: above subject head, survives the crop.
SHORTS_TOP_Y1, SHORTS_TOP_Y2 = 30, 190

# ============================================================
# VARIANT 1 — BROADCAST SET (recommended default)
# ============================================================

def variant_1():
    img = Image.new("RGBA", (W, H), BASE + (255,))
    # Vertical gradient: faint teal lift toward top
    grad = Image.new("RGBA", (1, H))
    gpx = grad.load()
    for y in range(H):
        t = y / H
        r = int(BASE[0] + (TEAL_DARK[0] - BASE[0]) * (1 - t) * 0.5)
        g = int(BASE[1] + (TEAL_DARK[1] - BASE[1]) * (1 - t) * 0.5)
        b = int(BASE[2] + (TEAL_DARK[2] - BASE[2]) * (1 - t) * 0.5)
        gpx[0, y] = (r, g, b, 255)
    grad = grad.resize((W, H))
    img = Image.alpha_composite(img, grad)

    # Two soft pools — upper-left teal, lower-right iris
    glow1 = radial_glow((1300, 1300), TEAL_DEEP, max_alpha=70, falloff=2.0)
    img.alpha_composite(glow1, (-400, -300))
    glow2 = radial_glow((1000, 1000), IRIS, max_alpha=55, falloff=2.2)
    img.alpha_composite(glow2, (W-500, H-450))

    # Very subtle grid — way fainter than the first pass
    dot_grid(img, color=MINT, alpha=8, step=60, dot_r=1)

    d = ImageDraw.Draw(img, "RGBA")

    # === Top-centre Shorts-safe brand mark ===
    # Small lens icon + subtle "SIGNAL DROP" wordmark.
    # Lives inside the centre column (x=656-1264) so it survives the 9:16 crop.
    draw_lens_logo(img, W//2, 80, scale=0.22, opacity=200, mint_ticks=False)
    sm = f(FONT_DISPLAY, 44)
    label = "SIGNAL DROP"
    tw = measure_kerned(label, sm, tracking=6)
    x0 = (W - tw) // 2
    text_kerned(img, (x0, 120), label, sm, fill=(*INK, 175), tracking=6)
    # short mint accent under the wordmark
    d.line([(W//2 - 40, 180),(W//2 + 40, 180)], fill=(*MINT, 200), width=2)

    # === Top-left: minimal cue (wide-shot only, lost in Shorts) ===
    chip = f(FONT_MONO, 16)
    d.ellipse([60, 66, 70, 76], fill=(*MINT, 220))
    text_kerned(img, (80, 64), "REC", chip, fill=(*MINT, 200), tracking=2)

    # === Bottom-right corner: lens logo + wordmark lockup ===
    # Pushed tighter into corner so torso doesn't eat it.
    logo_cx, logo_cy = W - 130, H - 150
    draw_lens_logo(img, logo_cx, logo_cy, scale=0.38, opacity=210, mint_ticks=False)
    wm = f(FONT_HEAVY, 22)
    line1 = "METRICS & MAYHEM"
    l1w = wm.getlength(line1)
    d.text((logo_cx - l1w/2, logo_cy + 56), line1, font=wm, fill=(*INK, 200))

    # === Bottom-left: episode marker (small, tight to corner) ===
    cap = f(FONT_MONO, 14)
    text_kerned(img, (60, H-50), "S. DROP  //  EP. —", cap,
                fill=(*MINT, 180), tracking=3)

    # subtle vignette
    vignette = Image.new("RGBA", (W, H), (0,0,0,0))
    vd = ImageDraw.Draw(vignette, "RGBA")
    for i in range(60):
        a = int(70 * (i/60)**2)
        vd.rectangle([i, i, W-i, H-i], outline=(0,0,0,a), width=1)
    img = Image.alpha_composite(img, vignette)

    return img.convert("RGB")

# ============================================================
# VARIANT 2 — ON-AIR STUDIO (two-tone, set-piece feel)
# ============================================================

def variant_2():
    img = Image.new("RGBA", (W, H), BASE + (255,))

    # Horizontal two-tone gradient: lighter on the left (teal wash), darker right
    grad = Image.new("RGBA", (W, 1))
    gpx = grad.load()
    for x in range(W):
        t = x / W
        # interpolate between a darker teal-tint and pure base
        r = int(BASE[0] * (1 - 0.0) + (TEAL_DARK[0]) * (1 - t) * 0.35)
        g = int(BASE[1] * (1 - 0.0) + (TEAL_DARK[1]) * (1 - t) * 0.35)
        b = int(BASE[2] * (1 - 0.0) + (TEAL_DARK[2]) * (1 - t) * 0.35)
        gpx[x, 0] = (r, g, b, 255)
    grad = grad.resize((W, H))
    img = Image.alpha_composite(img, grad)

    # Soft floor gradient at the bottom (suggests studio floor)
    floor = Image.new("RGBA", (1, 280))
    fpx = floor.load()
    for y in range(280):
        t = y / 280
        a = int(120 * t)
        fpx[0, y] = (*TEAL_DEEP, a)
    floor = floor.resize((W, 280))
    img.alpha_composite(floor, (0, H-280))

    # Vertical "wall panel" lines — suggest acoustic panels behind subject
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(120, 580, 80):
        d.line([(x, 140),(x, H-220)], fill=(*TEAL_MID, 25), width=1)
    for x in range(W-560, W-100, 80):
        d.line([(x, 140),(x, H-220)], fill=(*TEAL_MID, 25), width=1)

    # Glow halo behind subject
    glow = radial_glow((900, 900), TEAL_DEEP, max_alpha=75, falloff=2.0)
    img.alpha_composite(glow, (W//2 - 450, H//2 - 380))

    # === SIGNAL DROP set wall signage — sized to fit Shorts column ===
    # Sits inside the centre column so it survives the 9:16 crop.
    # Still bold for V2's signage feel, but ghosted (low opacity) like wall art.
    big = f(FONT_DISPLAY, 68)
    label = "SIGNAL DROP"
    tw = measure_kerned(label, big, tracking=6)
    x0 = (W - tw) // 2
    text_kerned(img, (x0+2, 92), label, big, fill=(0,0,0,140), tracking=6)
    text_kerned(img, (x0,   90), label, big, fill=(*INK, 130), tracking=6)
    # tiny lens icon above the wordmark
    draw_lens_logo(img, W//2, 50, scale=0.16, opacity=190, mint_ticks=False)
    # mint accent under
    d.line([(W//2 - 40, 168),(W//2 + 40, 168)], fill=(*MINT, 200), width=2)

    # === Top-left "ON AIR" chip (subtle) ===
    chip = f(FONT_MONO, 14)
    d.ellipse([60, 64, 72, 76], fill=(*MINT, 220))
    text_kerned(img, (82, 64), "ON AIR", chip, fill=(*MINT, 200), tracking=2)

    # === Bottom-right corner: compact lockup (no plaque, no clutter) ===
    logo_cx, logo_cy = W - 130, H - 150
    draw_lens_logo(img, logo_cx, logo_cy, scale=0.38, opacity=220, mint_ticks=False)
    wm = f(FONT_HEAVY, 22)
    line1 = "METRICS & MAYHEM"
    l1w = wm.getlength(line1)
    d.text((logo_cx - l1w/2, logo_cy + 56), line1, font=wm, fill=(*INK, 210))

    # === Bottom-left: episode marker (tight to corner) ===
    cap = f(FONT_MONO, 14)
    text_kerned(img, (60, H-50), "S. DROP  //  EP. —", cap,
                fill=(*MINT, 180), tracking=3)

    return img.convert("RGB")

# ============================================================
# VARIANT 3 — SIGNAL ARCHITECTURE (observability-themed)
# ============================================================

def variant_3():
    img = Image.new("RGBA", (W, H), BASE + (255,))

    # Diagonal radial glow toward upper-left
    grad = Image.new("RGBA", (W, H), (0,0,0,0))
    gd = ImageDraw.Draw(grad, "RGBA")
    # Two soft pools
    glow1 = radial_glow((1200, 1200), TEAL_DEEP, max_alpha=90, falloff=2.0)
    img.alpha_composite(glow1, (-300, -300))
    glow2 = radial_glow((900, 900), IRIS, max_alpha=70, falloff=2.4)
    img.alpha_composite(glow2, (W-600, H-500))

    # Dense fine dot grid (the observability lattice)
    dot_grid(img, color=MINT, alpha=20, step=36, dot_r=1)

    # Crosshair tick decorations in the corners (echoes logo)
    d = ImageDraw.Draw(img, "RGBA")
    def corner_ticks(x, y, sx, sy):
        L = 30
        d.line([(x, y),(x + L*sx, y)], fill=(*MINT, 220), width=3)
        d.line([(x, y),(x, y + L*sy)], fill=(*MINT, 220), width=3)
    corner_ticks(60, 60, 1, 1)
    corner_ticks(W-60, 60, -1, 1)
    corner_ticks(60, H-60, 1, -1)
    corner_ticks(W-60, H-60, -1, -1)

    # === Centerline waveform — runs across, low opacity ===
    # We avoid running it through the SAFE zone densely
    import random
    random.seed(7)
    wave_y = 540
    pts = []
    for x in range(0, W+1, 4):
        # composite of small sine waves
        amp = 0
        amp += 22 * math.sin(x * 0.011 + 0.7)
        amp += 10 * math.sin(x * 0.027 + 2.1)
        amp += 5  * math.sin(x * 0.05  + 1.3)
        # ramp it down inside the safe zone so it doesn't fight the subject
        if SAFE_X1 - 80 < x < SAFE_X2 + 80:
            damp = 1.0 - min(1.0, max(0.0,
                (min(x - (SAFE_X1-80), (SAFE_X2+80) - x)) / 200))
            amp *= damp
        pts.append((x, wave_y + amp))
    # draw
    for i in range(len(pts)-1):
        d.line([pts[i], pts[i+1]], fill=(*MINT, 90), width=2)
    # baseline (very faint)
    d.line([(0, wave_y),(W, wave_y)], fill=(*TEAL_MID, 30), width=1)

    # === Top-centre: subtle wall signage (Shorts-safe) ===
    sm = f(FONT_DISPLAY, 50)
    label = "SIGNAL DROP"
    tw = measure_kerned(label, sm, tracking=8)
    x0 = (W - tw) // 2
    # small bracket frame above + below — observability hint
    d.line([(x0-24, 96),(x0-4, 96)], fill=(*MINT, 200), width=2)
    d.line([(x0-24, 96),(x0-24, 168)], fill=(*MINT, 200), width=2)
    d.line([(x0+tw+4, 96),(x0+tw+24, 96)], fill=(*MINT, 200), width=2)
    d.line([(x0+tw+24, 96),(x0+tw+24, 168)], fill=(*MINT, 200), width=2)
    # ghost wordmark
    text_kerned(img, (x0+2, 112), label, sm, fill=(0,0,0,140), tracking=8)
    text_kerned(img, (x0,   110), label, sm, fill=(*INK, 180), tracking=8)
    # tiny lens above
    draw_lens_logo(img, W//2, 60, scale=0.16, opacity=190, mint_ticks=False)

    # === Bottom-left: compact lockup ===
    draw_lens_logo(img, 115, H-130, scale=0.32, opacity=215, mint_ticks=False)
    wm = f(FONT_HEAVY, 20)
    d.text((60, H-70), "METRICS & MAYHEM", font=wm, fill=(*INK, 200))

    # === Bottom-right: minimal episode marker (no chips) ===
    chip_font = f(FONT_MONO, 14)
    text_kerned(img, (W-260, H-50), "S2  //  WEEKLY  //  EP. —",
                chip_font, fill=(*MINT, 180), tracking=2)

    # subtle vignette
    vignette = Image.new("RGBA", (W, H), (0,0,0,0))
    vd = ImageDraw.Draw(vignette, "RGBA")
    for i in range(70):
        a = int(80 * (i/70)**2)
        vd.rectangle([i, i, W-i, H-i], outline=(0,0,0,a), width=1)
    img = Image.alpha_composite(img, vignette)

    return img.convert("RGB")

# ===== Build =====

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print("Building v1 broadcast set...")
    v1 = variant_1(); v1.save(f"{OUT_DIR}/v1_broadcast_set.png", optimize=True)
    print("Building v2 on-air studio...")
    v2 = variant_2(); v2.save(f"{OUT_DIR}/v2_on_air_studio.png", optimize=True)
    print("Building v3 signal architecture...")
    v3 = variant_3(); v3.save(f"{OUT_DIR}/v3_signal_architecture.png", optimize=True)
    for n in ["v1_broadcast_set", "v2_on_air_studio", "v3_signal_architecture"]:
        p = f"{OUT_DIR}/{n}.png"
        print(f"  {n}.png  {os.path.getsize(p)/1024:.0f} KB  {Image.open(p).size}")

if __name__ == "__main__":
    main()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        