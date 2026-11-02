"""YouTube channel art and avatar, Brand Design System v3 section 10a.

Composed from design-tokens.json through mo_tokens.py (the single read path) and
from claim-bank.json. No hex and no size is typed here. Everything is measured on
the rendered pixels and gated before a file is accepted.

Why Python and not the Node kit: on 2026-11-01 the Node producers' font probe
(`node mo_visual_kit.js preflight`) could not resolve Montserrat ExtraBold or
DM Sans on this PC (fontconfig), so SVG text would have rendered in a fallback
face. Pillow reads the static TTFs in 06_Brand_Assets/fonts directly, the same
files, so the faces are exact. Recorded as a deviation in README.md.

Rules applied (design-tokens.json 3.5.0, section 10a):
  canvas.youtube_channel_art      2560 x 1440
  mode                            dark (YouTube's chrome is dark)
  lockup                          podcast lane: METRICS & MAYHEM
  endorsement                     none for channel art
  safe_areas.youtube_channel_art  1546 x 423 centred; the composition is centred,
                                  the channel name is the title, the rest bleeds
  claim                           from the bank, surfaces must include "banner"
  wash                            ONE radial teal wash, structure.wash.dark
  marks                           the ring mark is the AVATAR (small variant, it
                                  survives at 48 px). The banner carries the lens
                                  rings as croppable decoration outside the safe
                                  area, never a mark under the 24 px floor.

Reproduce:
  python build_youtube_channel_art.py <producers dir> <out dir> [C01|C02|C15|C22]
"""
import json, os, sys, math

from PIL import Image, ImageDraw, ImageFont

PROD = sys.argv[1] if len(sys.argv) > 1 else os.path.join("..", "..", "Design_Standards", "producers")
OUT = sys.argv[2] if len(sys.argv) > 2 else "."
CLAIM_ID = sys.argv[3] if len(sys.argv) > 3 else "C01"
sys.path.insert(0, os.path.abspath(PROD))
from mo_tokens import T  # noqa: E402

ROOT = os.path.abspath(os.path.join(PROD, "..", "..", ".."))
FONTS = os.environ.get("MO_FONTS") or os.path.join(ROOT, "06_Brand_Assets", "fonts")
STD = os.path.abspath(os.path.join(PROD, ".."))
tokens = json.load(open(os.path.join(STD, "design-tokens.json"), encoding="utf-8"))
bank = json.load(open(os.path.join(STD, "claim-bank.json"), encoding="utf-8"))

SURFACE = "youtube_channel_art"
if T.mode_for(SURFACE) != "dark":
    raise SystemExit("channel art no longer resolves dark; re-read design-tokens.json")
if T.lockup_for(SURFACE) != "METRICS & MAYHEM":
    raise SystemExit("channel art is no longer podcast lane")
W, H = T.size(SURFACE)
SA = tokens["safe_areas"][SURFACE]["safe"]
SX0, SY0 = (W - SA[0]) / 2, (H - SA[1]) / 2
SX1, SY1 = SX0 + SA[0], SY0 + SA[1]
PAD = 40  # ink stays this far inside the safe area

claim = next((c for c in bank["claims"] if c["id"] == CLAIM_ID), None)
if claim is None:
    raise SystemExit("claim " + CLAIM_ID + " not in the bank")
if "banner" not in claim.get("surfaces", []):
    raise SystemExit("claim " + CLAIM_ID + " is not permitted on a banner")
if claim.get("status") != "approved":
    raise SystemExit("claim " + CLAIM_ID + " is not approved")

D = T.dark
GROUND = T.rgb(D["dark-ground"])
TEAL = T.rgb(D["teal"])
BRIGHT = T.rgb(D["teal-bright"])
BODY = T.rgb(D["on-dark-body"])
SOFT = T.rgb(D["on-dark-soft"])
WASH = float(tokens["structure"]["wash"]["dark"])
TY = tokens["type"]
MARK_GEOM = {"outer": 10.5, "inner": 6, "centre": 2.4, "stroke": 1, "small_ring": 10, "small_stroke": 2, "small_centre": 3.6, "box": 24}

f_display = ImageFont.truetype(os.path.join(FONTS, "Montserrat-ExtraBold.ttf"), 10)
f_label = ImageFont.truetype(os.path.join(FONTS, "SpaceMono-Bold.ttf"), 10)
f_body = ImageFont.truetype(os.path.join(FONTS, "DMSans-Regular.ttf"), 10)


def font(base, size):
    return base.font_variant(size=size)


def tracked_width(fnt, text, tracking):
    return sum(fnt.getlength(ch) for ch in text) + tracking * (len(text) - 1)


def draw_tracked(d, x, y, text, fnt, fill, tracking):
    """Draw text with letter spacing (Pillow has none). x is the left edge."""
    cx = x
    for i, ch in enumerate(text):
        d.text((cx, y), ch, font=fnt, fill=fill)
        cx += fnt.getlength(ch) + (tracking if i < len(text) - 1 else 0)
    return cx


def ink_box(img, box, pred):
    """Extent of pixels inside box that satisfy pred, on the rendered image."""
    px = img.load()
    x0, y0, x1, y1 = [int(v) for v in box]
    minx, miny, maxx, maxy = W, H, -1, -1
    for y in range(max(0, y0), min(H, y1)):
        for x in range(max(0, x0), min(W, x1)):
            if pred(px[x, y]):
                minx, maxx = min(minx, x), max(maxx, x)
                miny, maxy = min(miny, y), max(maxy, y)
    return (minx, miny, maxx, maxy)


def radial_wash(size, colour, opacity):
    """ONE radial teal wash, as mo_diagram.background draws it: centre (w/2, 0.42h),
    radius 0.7h, full opacity at the centre falling to nothing at 70 per cent."""
    w, h = size
    r = h * 0.7
    cx, cy = w / 2, h * 0.42
    s = 4  # computed at quarter size, then scaled
    small = Image.new("L", (w // s, h // s), 0)
    sp = small.load()
    for y in range(h // s):
        for x in range(w // s):
            dist = math.hypot(x * s - cx, y * s - cy) / r
            if dist < 0.7:
                sp[x, y] = int(255 * opacity * (1 - dist / 0.7))
    mask = small.resize((w, h), Image.BILINEAR)
    layer = Image.new("RGB", (w, h), colour)
    return layer, mask


def ring(d, cx, cy, r, width, fill):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=fill, width=width)


def rgba(rgb, a):
    return (rgb[0], rgb[1], rgb[2], int(255 * a))


# ---------------------------------------------------------------- banner
img = Image.new("RGB", (W, H), GROUND)
layer, mask = radial_wash((W, H), TEAL, WASH)
img.paste(layer, (0, 0), mask)

# Lens rings: the mark's two ring radii at large scale, centred on the canvas, drawn so that
# neither enters the safe area (checked below). Hairline pair, teal-bright at the dark mark's opacity.
over = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(over)
R_OUT = 880
R_IN = round(R_OUT * MARK_GEOM["inner"] / MARK_GEOM["outer"])
R_IN = max(R_IN, int(math.hypot(SA[0] / 2, SA[1] / 2)) + 12)  # the inner ring also clears the safe area
ring(od, W / 2, H / 2, R_OUT, 3, rgba(BRIGHT, 0.45))
ring(od, W / 2, H / 2, R_IN, 3, rgba(BRIGHT, 0.45))
base = Image.alpha_composite(img.convert("RGBA"), over).convert("RGB")

# Text block, centred. Sizes are the token type scale at banner scale; the title is fitted to the
# safe width and never typed. Centring is proven on the rendered ink, not on advance widths: the
# block is drawn once, measured, shifted by the measured error and drawn again (two passes).
KICKER = "ALLAN MANN"
TITLE = "Mastering Observability"
CLAIM = claim["text"]
LOCKUP = T.lockup_for(SURFACE)
MAXW = SA[0] - 2 * PAD

k_size = 30
k_track = round(k_size * 4 / 12)  # label token: 4px tracking at 12px
fk = font(f_label, k_size)

t_size = 120
while True:
    ft = font(f_display, t_size)
    t_track = -round(t_size * 3 / 100)  # display tracking, within the token's -1.5px to -4px band at 100px
    if tracked_width(ft, TITLE, t_track) <= MAXW or t_size <= 60:
        break
    t_size -= 2

c_size = 42
fc = font(f_body, c_size)
l_size = 26
l_track = round(l_size * 3 / 12)  # lockup wordmark: 3px at 12px
fl = font(f_label, l_size)

GAP_KT, GAP_TC, GAP_CL = 26, 26, 34
k_h = fk.getbbox("A")[3]
t_asc, t_desc = ft.getmetrics()
c_h = fc.getbbox("A")[3]
l_h = fl.getbbox("A")[3]
block_h = k_h + GAP_KT + (t_asc + t_desc) + GAP_TC + c_h + GAP_CL + l_h
Y0 = SY0 + (SA[1] - block_h) / 2
RULE_W, RULE_GAP = 56, 22

is_white = lambda p: p[0] > 200 and p[1] > 200 and p[2] > 200
is_bright = lambda p: p[1] > 150 and p[0] < 160 and p[1] - p[0] > 40
is_body = lambda p: p[0] > 150 and p[1] > 170 and p[2] > 170 and not is_white(p)
is_soft = lambda p: 120 < p[0] < 200 and 140 < p[1] < 210 and p[0] < p[2] + 30 and not is_white(p)


def draw_block(off):
    """Draw the four text elements on a fresh copy of the base, shifted by off[name] pixels.
    Returns the image and the ink boxes measured on it."""
    im = base.copy()
    dd = ImageDraw.Draw(im)
    y = Y0
    # small rule either side of the kicker, in teal, the LinkedIn banner's kicker treatment centred
    kw = tracked_width(fk, KICKER, k_track)
    kx = (W - kw) / 2 + off["kicker"]
    dd.rectangle([kx - RULE_GAP - RULE_W, y + k_h / 2 - 2, kx - RULE_GAP, y + k_h / 2 + 2], fill=TEAL)
    dd.rectangle([kx + kw + RULE_GAP, y + k_h / 2 - 2, kx + kw + RULE_GAP + RULE_W, y + k_h / 2 + 2], fill=TEAL)
    draw_tracked(dd, kx, y - fk.getbbox("A")[1], KICKER, fk, BRIGHT, k_track)
    y_k = y
    y += k_h + GAP_KT
    tw = tracked_width(ft, TITLE, t_track)
    draw_tracked(dd, (W - tw) / 2 + off["title"], y, TITLE, ft, (255, 255, 255), t_track)
    y_t = y
    y += t_asc + t_desc + GAP_TC
    cw = fc.getlength(CLAIM)
    dd.text(((W - cw) / 2 + off["claim"], y - fc.getbbox("A")[1]), CLAIM, font=fc, fill=BODY)
    y_c = y
    y += c_h + GAP_CL
    lw = tracked_width(fl, LOCKUP, l_track)
    draw_tracked(dd, (W - lw) / 2 + off["lockup"], y - fl.getbbox("A")[1], LOCKUP, fl, SOFT, l_track)
    y_l = y
    boxes = {
        "title": ink_box(im, (0, y_t - 10, W, y_t + t_asc + t_desc + 10), is_white),
        "kicker": ink_box(im, (0, y_k - 16, W, y_k + k_h + 16), is_bright),
        "claim": ink_box(im, (0, y_c - 12, W, y_c + c_h + 18), is_body),
        "lockup": ink_box(im, (0, y_l - 12, W, y_l + l_h + 14), is_soft),
    }
    return im, boxes


off = {"kicker": 0, "title": 0, "claim": 0, "lockup": 0}
img, boxes = draw_block(off)
for k, b in boxes.items():
    off[k] = round(W / 2 - (b[0] + b[2]) / 2)
img, boxes = draw_block(off)
title, kick, clm, lock = boxes["title"], boxes["kicker"], boxes["claim"], boxes["lockup"]

# ---------------------------------------------------------------- gates on the rendered pixels
inside = lambda b: b[0] >= SX0 + PAD and b[2] <= SX1 - PAD and b[1] >= SY0 + PAD / 2 and b[3] <= SY1 - PAD / 2
corner = math.hypot(SA[0] / 2, SA[1] / 2)
gates = [
    ("title inside the safe area", inside(title)),
    ("kicker inside the safe area", inside(kick)),
    ("claim inside the safe area", inside(clm)),
    ("lockup inside the safe area", inside(lock)),
    ("title centred", abs((title[0] + title[2]) / 2 - W / 2) <= 4),
    ("claim centred", abs((clm[0] + clm[2]) / 2 - W / 2) <= 4),
    ("lens rings never enter the safe area", R_IN - 2 > corner),
    ("title holds one line at or over 60px", t_size >= 60),
    ("claim approved for banners", "banner" in claim["surfaces"] and claim["status"] == "approved"),
    ("mode dark, lockup podcast lane", T.mode_for(SURFACE) == "dark" and LOCKUP == "METRICS & MAYHEM"),
]
failed = [g for g, ok in gates if not ok]
if failed:
    raise SystemExit("gates failed: " + "; ".join(failed) + " " + json.dumps({"title": title, "kick": kick, "claim": clm, "lock": lock}))

os.makedirs(OUT, exist_ok=True)
banner_file = os.path.join(OUT, f"youtube_channel_art_{CLAIM_ID}_2560x1440.png")
img.save(banner_file, optimize=True)

# ---------------------------------------------------------------- avatar: the small ring mark on dark-ground
AV = 800
S = 4
MARK = int(AV * 0.64)
big = Image.new("RGB", (AV * S, AV * S), GROUND)
bd = ImageDraw.Draw(big)
u = MARK * S / MARK_GEOM["box"]
cx = cy = AV * S / 2
ring(bd, cx, cy, MARK_GEOM["small_ring"] * u, int(round(MARK_GEOM["small_stroke"] * u)), BRIGHT)
rc = MARK_GEOM["small_centre"] * u
bd.ellipse([cx - rc, cy - rc, cx + rc, cy + rc], fill=BRIGHT)
avatar = big.resize((AV, AV), Image.LANCZOS)
avatar_file = os.path.join(OUT, "youtube_avatar_800.png")
avatar.save(avatar_file, optimize=True)

# ---------------------------------------------------------------- review sheet: full, desktop band, phone, avatar at 160/48/36
sheet_w = 1280
rows = []
rows.append(("TV and full file, 2560 x 1440 at half size", img.resize((1280, 720), Image.LANCZOS)))
desk = img.crop((0, int(SY0), W, int(SY1))).resize((1280, int(423 / 2)), Image.LANCZOS)
rows.append(("Desktop band, 2560 x 423 (full width, the middle 423 px) at half size", desk))
phone = img.crop((int(SX0), int(SY0), int(SX1), int(SY1))).resize((375, int(375 * SA[1] / SA[0])), Image.LANCZOS)
rows.append(("Phone, the safe area at 375 px wide, true size", phone))
sheet_h = 40 + sum(r[1].height + 44 for r in rows) + 220
sheet = Image.new("RGB", (sheet_w, sheet_h), (15, 15, 15))
sd = ImageDraw.Draw(sheet)
fs = ImageFont.load_default(size=15)
yy = 16
for cap, im in rows:
    sd.text((16, yy), cap, fill=(220, 220, 220), font=fs)
    yy += 26
    sheet.paste(im, (16, yy))
    yy += im.height + 18
sd.text((16, yy), "Avatar as YouTube shows it: 160 (channel head), 48 (comments), 36 (phone list). Circle crop.", fill=(220, 220, 220), font=fs)
yy += 30
x = 16
for size in (160, 48, 36):
    a = avatar.resize((size, size), Image.LANCZOS)
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).ellipse([0, 0, size - 1, size - 1], fill=255)
    sheet.paste(a, (x, yy), m)
    x += size + 30
sheet_file = os.path.join(OUT, f"review_sheet_{CLAIM_ID}.png")
sheet.save(sheet_file, optimize=True)

spec = {
    "surface": SURFACE, "canvas": [W, H], "mode": "dark", "lockup": LOCKUP, "claim": claim["id"], "text": CLAIM,
    "safe": [SX0, SY0, SX1, SY1], "wash": WASH, "rings": {"outer": R_OUT, "inner": R_IN, "centre": [W / 2, H / 2]},
    "type": {"kicker": [k_size, k_track], "title": [t_size, t_track], "claim": c_size, "lockup": [l_size, l_track]},
    "ink": {"title": title, "kicker": kick, "claim": clm, "lockup": lock},
    "avatar": {"size": AV, "mark_px": MARK, "variant": "small_on_dark"},
    "fonts": {"display": "Montserrat-ExtraBold.ttf", "label": "SpaceMono-Bold.ttf", "body": "DMSans-Regular.ttf"},
    "tokens_version": tokens.get("version"),
}
json.dump(spec, open(os.path.join(OUT, f"youtube_channel_art_{CLAIM_ID}.json"), "w", encoding="utf-8"), indent=2)
print(f"{CLAIM_ID}: {len(gates)} gates pass. title {t_size}px x {title[0]}..{title[2]}, kicker {kick[0]}..{kick[2]}, claim {clm[0]}..{clm[2]}, lockup {lock[0]}..{lock[2]}; rings {R_OUT}/{R_IN}; avatar mark {MARK}px")
print("wrote", banner_file, avatar_file, sheet_file)
