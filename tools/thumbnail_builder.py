#!/usr/bin/env python3
"""Metrics & Mayhem canonical thumbnail builder.

Codified per Voice Codex v1.9.16 (section 19.6) and v1.9.20 (section 19.7).
Builder v1.3.0 (2026-07-06, ID-2026-07-03-03): guaranteed square-art title/numeral
clearance (holds at 64px) + the coordinated YouTube tight-face crop. See the dated
changelog line at the bottom of this file for the full note.
One command produces every episode surface from a single source headshot:

  NN_thumbnail_youtube.png  1280x720, headshot variant
  NN_thumbnail_og.png       1200x630, no-headshot Signal Drop template
  NN_episode_art.jpg        3000x3000 square Spotify episode art, giant-numeral
                            concept (duotone portrait, mint episode number)
  bookend_intro_<slug>.png  1080x1920 vertical clip intro (1.0s pre-roll),
                            no CTA (section 19.7)
  bookend_outro_<slug>.png  1080x1920 vertical clip outro (1.5s post-roll),
                            four locked CTA blocks (section 19.7)
  NN_thumbnail_qa.png       QA comparison sheet (candidate vs Ep 17 reference,
                            full size and 160x90, plus the square art at
                            240/160/64; the section 19.6 eyeball gate)
  bookend_qa_<slug>.png     QA sheet for the vertical bookend pair at preview
                            and one-second-test size (section 19.7 eyeball gate)

The vertical bookends replace the retired Node kit (mo_visual_kit.js bookends):
one canonical builder, one config block, no drift. Bookends use the same brand
family (fonts, palette, lens mark) as the thumbnails.

Layout family is locked to the Ep 17 canonical exemplar
(03_Podcast/Episodes/17_Position_Before_the_Page/17_thumbnail_youtube.png).
Every layout parameter lives in CONFIG below; there are no magic numbers in
the drawing code. Any change to typography, palette, or layout requires a
BUILDER_VERSION bump and a codex bump in the same patch.

Usage:
  python3 thumbnail_builder.py --episode 19 \
      --title "THE CAVE / YOU WON'T / INSTRUMENT." \
      --subtitle "The dashboard you won't build." \
      --quote "Avoidance is the signal." \
      --headshot "/path/to/19_headshot.png" \
      --outdir "/path/to/03_Podcast/Episodes/19_The_Cave_You_Wont_Instrument" \
      [--ship]

Default run writes to <outdir>/_staging/ plus the QA sheet. --ship writes the
finals into <outdir> directly. "/" in --title forces explicit line breaks.
--src-crop l,t,r,b (fractions 0..1) isolates the portrait region of a concept
frame; clean NN_headshot.png sources need no crop. --gaze left|right|camera
drives the section 24.15 placement table; the portrait is never mirrored.

Fonts are cached in 06_Brand_Assets/fonts/ (OFL licensed); the builder never
falls back to system fonts. Logo is rendered from 06_Brand_Assets SVGs via
cairosvg. Determinism: identical inputs produce identical pixels; the config
hash and builder version are embedded in the PNG metadata.
"""

import argparse
import hashlib
import io
import json
import os
import re
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFont
from PIL.PngImagePlugin import PngInfo

BUILDER_VERSION = "1.3.2"

# GAZE / EXPRESSION CAPTURE IS A HUMAN PROCESS HABIT, NOT CODE (ID-2026-07-03-03,
# codex 24.15): capture a look-left / look-right gaze-still and a calm-direct
# expression frame at each Riverside sit-down. The builder only places what it is
# given (--gaze flips layout; the portrait is never mirrored); it cannot generate a
# gaze, so this stays a per-episode capture habit at the shoot, not a code change.

# Project-relative paths only. Never hardcode session mounts (see the
# 2026-06-08 watcher incident). MM_PROJECT_ROOT overrides for runs from a
# scratch copy when the OneDrive mount serves a stale file (recurring hazard,
# see workspace-consolidation memory 2026-06-11).
_CC_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.environ.get("MM_PROJECT_ROOT") or os.path.dirname(_CC_DIR)
BRAND_DIR = os.path.join(_PROJECT_ROOT, "06_Brand_Assets")
FONT_DIR = os.path.join(BRAND_DIR, "fonts")
REFERENCE_YT = os.path.join(
    _PROJECT_ROOT, "03_Podcast", "Episodes",
    "17_Position_Before_the_Page", "17_thumbnail_youtube.png")

# Canonical short on-card strings derived from Codex 26.1 / 26.2. Cards are
# video frames, not clickable, so the short display form is used (the resolved
# URLs themselves live in the show notes and 26.1). Any change is a codex bump.
BOOK_TITLE = "Metrics & Mayhem"
BOOK_FREE_CHAPTER = "Free chapter at masteringobservability.com"

# =====================================================================
# CONFIG: the single source of layout truth (Codex section 19.6).
# All sizes in px on the target canvas. Colours are hex sRGB.
# =====================================================================
CONFIG = {
    "palette": {
        "navy_0": "#0a0e17",        # gradient stop 0.0 (135 degree linear)
        "navy_1": "#0c1929",        # gradient stop 0.6
        "navy_2": "#0e1f35",        # gradient stop 1.0
        "bar":    "#0c1b2d",        # bottom bar fill
        "mint":   "#64ffda",        # brand accent (section 24.11)
        "teal_mid": "#14a3a8",      # footer text
        "grey":   "#9fb0bd",        # bookend subtitle / CTA detail line (section 19.7)
        "ink":    "#ffffff",
        "grid_step": 60,            # px between grid lines
        "grid_opacity": 0.022,      # mint grid line alpha
        "glow_opacity": 0.05,       # radial glow peak alpha
        "glow_radius_frac": 0.95,   # glow radius as fraction of canvas height
    },
    "fonts": {
        "title":    "Montserrat-ExtraBold.ttf",  # Proxima Nova Bold substitute
        "subtitle": "DMSans-Regular.ttf",
        "pill":     "DMSans-Bold.ttf",
        "mono":     "SpaceMono-Bold.ttf",
    },
    "margin": 60,                   # global left/right content margin
    "lockup": {                     # lens mark + wordmark, top corner
        "y": 30,                    # top of the lens mark
        "mark_px": 38,
        "gap_mark_to_text": 18,
        "wordmark": "METRICS & MAYHEM",
        "size": 17, "tracking": 5, "colour": "mint",
    },
    "badge": {                      # format badge beside the wordmark
        "gap_from_wordmark": 30,
        "size": 14, "tracking": 3,
        "pad_x": 14, "pad_y": 9, "radius": 3,
        "fill": "mint", "text_colour": "navy_0",   # filled style (Signal Drop)
        "outline_px": 2,                            # outlined style (Deep Dive)
    },
    "title": {
        "top": 138,                 # cap top of first line
        "max_width": 640,
        "size_by_lines": {1: 96, 2: 88, 3: 78, 4: 66},
        "line_height": 0.98,        # of font size
        "tracking": -1,
        "wrap_chars": 13,           # soft wrap when no explicit "/" breaks
        "colour": "ink",
    },
    "subtitle": {
        "gap_below_title": 28, "size": 24, "colour": "mint",
    },
    "pill": {                       # Hard Stop pull-quote, lower third
        "bottom_gap": 70,           # gap from pill bottom to bar top
        "height": 80, "border_px": 2,
        "border": "mint", "fill_rgba": (10, 20, 32, 184),
        "size": 28, "min_size": 20, "max_width": 760,   # font steps down to fit
        "pad_x": 38, "colour": "ink",
    },
    "footer": {
        "bar_height": 62, "rule_opacity": 0.08,
        "size": 13, "tracking": 4,
        "colour": "teal_mid", "bullet_colour": "mint",
        "text": "EPISODE {n} • ALLAN MANN • MASTERINGOBSERVABILITY.COM",
    },
    "headshot": {                   # section 19.6 integration rules
        "slab_from_x": 620,         # inner edge of the portrait slab (1280 canvas)
        "feather_width": 300,       # alpha ramp 0 to 1, inner edge only
        "saturation": 0.78,         # graded toward the navy slate
        "brightness": 0.95,
        "navy_tint": 0.14,          # blend toward navy_1 (Ep 17 slate grade)
        "v_anchor": 0.30,           # vertical overflow bias toward the crown
    },
    "yt": {"w": 1280, "h": 720,
        # ID-2026-07-03-03: coordinated "tight face" mode (opt-in via --tight-face
        # or the _thumbnail_tight_face sidecar / _clip_overrides "_THUMBNAIL_TIGHT_FACE").
        # A tighter face crop (~+15-18%) reads better at feed scale, but the enlarged
        # head reaches further into the text column, so it is NOT a standalone crop:
        # the quote pill is shrunk + its max width pulled in, and the title column is
        # narrowed, so neither collides with the face. All three move together.
        "tight_face": {
            "zoom": 1.16,               # +16% portrait zoom (within the 15-18% ask)
            "v_anchor": 0.24,           # bias the extra height toward the crown a touch more
            "pill_max_width": 560,      # was 760; pull the quote box in so it clears the face
            "pill_size": 26,            # slightly smaller quote text to match the narrower box
            "title_max_width": 560,     # was 640; narrow the title column to match
        },
    },
    "og": {                         # 1200x630, no headshot (section 19.6)
        # OG Composition Standard (GR-2026-07-11, "layout B — centred", Al-approved):
        # two columns share ONE optical axis. Left column = the episode title
        # (white hero), vertically centred in the content band. A mint vertical
        # DIVIDER at 58% anchors the two columns. Right column = "Allan's Hard Stop"
        # (mint payoff), centred in its own column AND vertically centred to the same
        # band centre, so neither column floats. Top band = lockup + badge; bottom
        # band = full-width footer + watermark.
        "w": 1200, "h": 630,
        "title_max_width": 600,     # left column runs margin(60)..660
        "size_by_lines": {1: 92, 2: 84, 3: 76, 4: 64},
        "band": {"top": 140, "bottom": 500},   # both columns centre on this band's midpoint
        "divider": {"x": 700, "top": 150, "bottom": 500,
                    "colour": "mint", "opacity": 0.32, "width": 1},
        "quote_block": {            # right column, centred (layout B)
            "cx": 933,              # optical centre of the divider..right-margin column
            "label": "ALLAN'S HARD STOP", "label_size": 14, "label_tracking": 3,
            "label_colour": "teal_mid",
            "gap_label_to_rule": 17, "rule_w": 34, "rule_h": 3, "gap_rule_to_quote": 28,
            # Short Hard Stops used to let the label sag because the whole compact
            # block was mathematically centred. Keep their internal rhythm tighter
            # and cap the label near the left title's visual start instead.
            "short_max_lines": 3,
            "short_gap_label_to_rule": 12,
            "short_gap_rule_to_quote": 22,
            "max_top_below_title": 17,
            "size": 32, "line_height": 1.3, "colour": "mint", "wrap_chars": 17,
        },
        "accent_line": {"width": 64, "height": 4, "gap": 22},
        "watermark": {"px": 88, "opacity": 0.45, "inset": 60},  # 40 to 60 percent per 24.11
        "footer_left": "EPISODE {n} • ALLAN MANN",
        "footer_right": "MASTERINGOBSERVABILITY.COM",
    },
    "art": {                        # square Spotify episode art ("giant numeral", v1.9.17)
        "size": 3000,               # 1:1, JPEG sRGB; Spotify min 640, Apple min 1400
        "jpeg_quality": 90,
        "duotone": {"black": (8, 11, 18), "mid": (70, 95, 110), "white": (235, 245, 245)},
        "portrait_min_h_frac": 0.92,    # portrait covers full width, at least this height
        "fade_from": 0.50, "fade_span": 0.32,   # bottom gradient into navy
        "strip_h": 140, "strip_fill": (13, 20, 32),     # top wordmark strip
        "strip_font": 56, "strip_tracking": 20,
        "numeral_size": 1050, "numeral_tracking": -20,  # mint episode number, bottom-right
        "numeral_opacity": 224, "numeral_margin_x": 120, "numeral_margin_y": 80,
        "title_x": 210, "title_max_width_frac": 0.60,
        "title_size": 330, "title_min_size": 160, "title_line_height": 1.05,
        "title_last_baseline": 2700,
        "art_title_max_chars": 16,  # default art title derivation cutoff
        # ID-2026-07-03-03: real clearance between the title block and the giant
        # numeral. The title's longest line is capped so its right edge stays at
        # least this many px clear of the numeral's left edge, and the title font
        # steps down until it fits. 120px on the 3000 canvas = ~2.6px at the 64px
        # QA size, so the two never touch even at list-scan scale (the numeral
        # collision that shipped on 2-digit episodes like Ep 22 "SIX-WEEK").
        "numeral_title_clearance": 120,
    },
    "bookend": {                    # vertical clip bookends, 1080x1920 (section 19.7)
        "w": 1080, "h": 1920,
        "safe_top": 200,            # keep all text within the central band;
        "safe_bottom": 1720,        # platform UI covers the extremes (19.7)
        "wordmark_y": 150, "wordmark_size": 24, "wordmark_tracking": 6,
        "mark_px": 110, "mark_y": 250,          # lens mark, centred under wordmark
        "mark_opacity_intro": 0.30, "mark_opacity_outro": 0.18,
        "footer_y": 1772, "footer_size": 18, "footer_tracking": 4,
        "footer_text": "MASTERINGOBSERVABILITY.COM",
        "intro": {
            "badge_y": 620, "badge_size": 24, "badge_tracking": 4,
            "badge_pad_x": 24, "badge_pad_y": 13, "badge_radius": 4,
            "title_top": 760, "title_max_width": 940,
            "size_by_lines": {1: 150, 2: 132, 3: 104, 4: 84},
            "wrap_chars": 14, "line_height": 1.04, "tracking": -1,
            "subtitle_gap": 56, "subtitle_size": 38,
            "marker_gap": 54, "marker_size": 26, "marker_tracking": 6,
        },
        "outro": {
            "head_top": 372, "head_size": 112, "head_line_gap": 120,
            "cta_top": 720, "cta_step": 236, "cta_max_width": 960,
            "rule_w": 64, "rule_h": 5,
            "label_gap": 38, "label_size": 24, "label_tracking": 5,
            "line1_gap": 92, "line1_size": 42,
            "line2_gap": 142, "line2_size": 26,
        },
    },
}


# ---------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------
def hx(name):
    h = CONFIG["palette"][name].lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def font(role, size):
    path = os.path.join(FONT_DIR, CONFIG["fonts"][role])
    if not os.path.isfile(path):
        sys.exit("FATAL: brand font missing: %s (cache fonts in 06_Brand_Assets/fonts/)" % path)
    return ImageFont.truetype(path, size)


def tracked_width(fnt, text, tracking):
    w = 0
    for ch in text:
        w += fnt.getbbox(ch)[2] + tracking
    return max(0, w - tracking)


def draw_tracked(draw, xy, text, fnt, fill, tracking):
    """Draw text with manual letterspacing. Returns the end x."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += fnt.getbbox(ch)[2] + tracking
    return x - tracking


def draw_centered(draw, cx, y, text, fnt, fill):
    """Draw plain text horizontally centred on cx. Returns the bottom y."""
    w = draw.textlength(text, font=fnt)
    draw.text((cx - w / 2, y), text, font=fnt, fill=fill)
    return y + fnt.size


def draw_centered_tracked(draw, cx, y, text, fnt, fill, tracking):
    """Draw letterspaced text horizontally centred on cx."""
    w = tracked_width(fnt, text, tracking)
    draw_tracked(draw, (cx - w / 2, y), text, fnt, fill, tracking)
    return y + fnt.size


def config_hash():
    return hashlib.sha1(json.dumps(CONFIG, sort_keys=True).encode()).hexdigest()[:12]


def make_canvas(w, h, glow_cx_frac):
    """Navy 135 degree gradient + faint mint grid + radial glow."""
    p = CONFIG["palette"]
    c0, c1, c2 = (np.array(hx(n), dtype=float) for n in ("navy_0", "navy_1", "navy_2"))
    yy, xx = np.mgrid[0:h, 0:w]
    t = (xx + yy) / float(w + h)            # 135 degree diagonal
    img = np.zeros((h, w, 3), dtype=float)
    m = t < 0.6
    f = (t / 0.6)[..., None]
    img[m] = (c0 + (c1 - c0) * f)[m]
    f2 = ((t - 0.6) / 0.4)[..., None]
    img[~m] = (c1 + (c2 - c1) * f2)[~m]
    # grid
    mint = np.array(hx("mint"), dtype=float)
    ga = p["grid_opacity"]
    step = p["grid_step"]
    img[::, ::step] = img[::, ::step] * (1 - ga) + mint * ga
    img[::step, ::] = img[::step, ::] * (1 - ga) + mint * ga
    # radial glow behind the title side
    cx, cy = w * glow_cx_frac, h * 0.5
    r = h * p["glow_radius_frac"]
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    fall = np.clip(1 - d / r, 0, 1) ** 2 * p["glow_opacity"]
    img = img * (1 - fall[..., None]) + mint * fall[..., None]
    return Image.fromarray(img.clip(0, 255).astype(np.uint8), "RGB")


def render_logo(px, opacity=1.0, on_dark=True):
    stem = "logo-on-dark" if on_dark else "logo-on-light"
    svg = os.path.join(BRAND_DIR, stem + ".svg")
    try:
        import cairosvg
        png = cairosvg.svg2png(url=svg, output_width=px, output_height=px)
        im = Image.open(io.BytesIO(png)).convert("RGBA")
    except (ImportError, OSError):
        # Windows production fallback: CairoSVG may be installed without its
        # native Cairo DLL. Use the brand-cached transparent raster generated
        # from the same canonical SVG, preserving layout and config geometry.
        raster = os.path.join(BRAND_DIR, stem + ".png")
        if not os.path.isfile(raster):
            raise RuntimeError("logo renderer unavailable and raster fallback missing: %s" % raster)
        im = Image.open(raster).convert("RGBA").resize((px, px), Image.LANCZOS)
    if opacity < 1.0:
        a = im.getchannel("A").point(lambda v: int(v * opacity))
        im.putalpha(a)
    return im


def wrap_words(text, wrap_chars):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        if cur and len(cur + " " + wd) > wrap_chars:
            lines.append(cur)
            cur = wd
        else:
            cur = (cur + " " + wd).strip()
    if cur:
        lines.append(cur)
    return lines


def title_lines(title, wrap_chars):
    title = title.strip().upper()
    if "/" in title:
        return [seg.strip() for seg in title.split("/") if seg.strip()]
    return wrap_words(title, wrap_chars)


def headshot_slab(path, canvas_w, canvas_h, side, src_crop=None, tight=False):
    """Portrait slab per Codex 19.6: full bleed top/bottom/outer, graded,
    feathered on the inner edge only. Never crops the head: the source is
    scaled to cover and vertical overflow is biased toward the crown.

    ID-2026-07-03-03: when `tight` is set, an extra zoom (yt.tight_face.zoom,
    ~+16%) is applied on top of the cover scale for a tighter face crop, with a
    slightly higher crown bias (yt.tight_face.v_anchor). The text-side layout is
    pulled in to match by compose_youtube — this is a coordinated pass, never a
    standalone crop."""
    hcfg = CONFIG["headshot"]
    tcfg = CONFIG["yt"].get("tight_face", {}) if tight else {}
    im = Image.open(path).convert("RGB")
    if src_crop:
        l, t, r, b = src_crop
        W0, H0 = im.size
        im = im.crop((int(l * W0), int(t * H0), int(r * W0), int(b * H0)))
    slab_x = hcfg["slab_from_x"]
    slab_w = canvas_w - slab_x
    cw, ch = im.size
    scale = max(canvas_h / ch, slab_w / cw)
    if tight:
        scale *= tcfg.get("zoom", 1.16)           # tighter face crop (+~16%)
    im = im.resize((int(round(cw * scale)), int(round(ch * scale))), Image.LANCZOS)
    sw, sh = im.size
    ox = (sw - slab_w) // 2
    v_anchor = tcfg.get("v_anchor", hcfg["v_anchor"]) if tight else hcfg["v_anchor"]
    oy = int((sh - canvas_h) * v_anchor)
    im = im.crop((ox, oy, ox + slab_w, oy + canvas_h))
    # grade toward the navy slate
    im = ImageEnhance.Color(im).enhance(hcfg["saturation"])
    im = ImageEnhance.Brightness(im).enhance(hcfg["brightness"])
    tint = hcfg["navy_tint"]
    navy = Image.new("RGB", im.size, hx("navy_1"))
    im = Image.blend(im, navy, tint)
    # inner-edge feather
    fw = hcfg["feather_width"]
    alpha = np.ones((canvas_h, slab_w), dtype=float) * 255
    ramp = np.linspace(0, 255, fw)
    alpha[:, :fw] = ramp[None, :]
    layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    im = im.convert("RGBA")
    im.putalpha(Image.fromarray(alpha.astype(np.uint8), "L"))
    if side == "right":
        layer.paste(im, (slab_x, 0), im)
    else:
        im = Image.merge("RGBA", [c.transpose(Image.FLIP_LEFT_RIGHT) for c in im.split()])
        layer.paste(im, (0, 0), im)
    return layer


def draw_lockup_and_badge(draw, canvas, badge_text, badge_style, x_anchor, right_align, w):
    lk, bd, m = CONFIG["lockup"], CONFIG["badge"], CONFIG["margin"]
    mono_lk = font("mono", lk["size"])
    mono_bd = font("mono", bd["size"])
    mark = render_logo(lk["mark_px"])
    wordmark_w = tracked_width(mono_lk, lk["wordmark"], lk["tracking"])
    badge_w = tracked_width(mono_bd, badge_text, bd["tracking"]) + 2 * bd["pad_x"]
    badge_h = bd["size"] + 2 * bd["pad_y"]
    total = lk["mark_px"] + lk["gap_mark_to_text"] + wordmark_w + bd["gap_from_wordmark"] + badge_w
    x = (w - m - total) if right_align else m
    y_mark = lk["y"]
    canvas.paste(mark, (int(x), y_mark), mark)
    x += lk["mark_px"] + lk["gap_mark_to_text"]
    # Centre the visible glyphs on the lens mark, not the nominal font size.
    # Space Mono's top bearing otherwise leaves the wordmark five pixels low.
    mark_box = mark.getchannel("A").getbbox() or (0, 0, lk["mark_px"], lk["mark_px"])
    text_box = mono_lk.getbbox(lk["wordmark"])
    mark_cy = y_mark + (mark_box[1] + mark_box[3] - 1) / 2
    text_cy = (text_box[1] + text_box[3] - 1) / 2
    text_y = round(mark_cy - text_cy)
    draw_tracked(draw, (x, text_y), lk["wordmark"], mono_lk, hx(lk["colour"]), lk["tracking"])
    x += wordmark_w + bd["gap_from_wordmark"]
    by = y_mark + (lk["mark_px"] - badge_h) // 2
    if badge_style == "filled":
        draw.rounded_rectangle([x, by, x + badge_w, by + badge_h],
                               radius=bd["radius"], fill=hx(bd["fill"]))
        tcol = hx(bd["text_colour"])
    else:
        draw.rounded_rectangle([x, by, x + badge_w, by + badge_h],
                               radius=bd["radius"], outline=hx(bd["fill"]),
                               width=bd["outline_px"])
        tcol = hx(bd["fill"])
    draw_tracked(draw, (x + bd["pad_x"], by + bd["pad_y"] - 1), badge_text, mono_bd, tcol, bd["tracking"])


def draw_title_block(draw, title, subtitle, size_by_lines, max_width, x, w, right_align):
    tcfg, scfg = CONFIG["title"], CONFIG["subtitle"]
    lines = title_lines(title, tcfg["wrap_chars"])
    size = size_by_lines.get(len(lines), min(size_by_lines.values()))
    fnt = font("title", size)
    while size > 40 and any(tracked_width(fnt, ln, tcfg["tracking"]) > max_width for ln in lines):
        size -= 2
        fnt = font("title", size)
    asc, _ = fnt.getmetrics()
    pitch = int(size * tcfg["line_height"])
    y = tcfg["top"]
    for ln in lines:
        lx = x if not right_align else (w - CONFIG["margin"] - tracked_width(fnt, ln, tcfg["tracking"]))
        draw_tracked(draw, (lx, y - int(asc * 0.22)), ln, fnt, hx(tcfg["colour"]), tcfg["tracking"])
        y += pitch
    y_after = y - pitch + size  # bottom of last line, approx
    sub_f = font("subtitle", scfg["size"])
    sy = y_after + scfg["gap_below_title"]
    sx = x if not right_align else (w - CONFIG["margin"] - draw.textlength(subtitle, font=sub_f))
    draw.text((sx, sy), subtitle, font=sub_f, fill=hx(scfg["colour"]))
    return sy + scfg["size"]


def draw_pill(im, draw, quote, h, x, w, right_align, max_width=None, start_size=None):
    # ID-2026-07-03-03: max_width / start_size overrides let compose_youtube pull the
    # quote pill in for the coordinated tight-face crop, so the shrunk box clears the
    # enlarged portrait. Both default to the standard CONFIG["pill"] values.
    pcfg, fcfg = CONFIG["pill"], CONFIG["footer"]
    pill_max = max_width if max_width is not None else pcfg["max_width"]
    size = start_size if start_size is not None else pcfg["size"]
    fnt = font("pill", size)
    while (draw.textlength(quote, font=fnt) + 2 * pcfg["pad_x"] > pill_max
           and size > pcfg["min_size"]):
        size -= 1
        fnt = font("pill", size)
    tw = int(draw.textlength(quote, font=fnt))
    pw = tw + 2 * pcfg["pad_x"]
    bar_top = h - fcfg["bar_height"]
    y1 = bar_top - pcfg["bottom_gap"]
    y0 = y1 - pcfg["height"]
    px = x if not right_align else (w - CONFIG["margin"] - pw)
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([px, y0, px + pw, y1], fill=pcfg["fill_rgba"])
    im.alpha_composite(overlay)
    draw.rectangle([px, y0, px + pw, y1], outline=hx(pcfg["border"]), width=pcfg["border_px"])
    ty = y0 + (pcfg["height"] - size) // 2 - 2
    draw.text((px + pcfg["pad_x"], ty), quote, font=fnt, fill=hx(pcfg["colour"]))


def draw_footer(im, draw, ep_num, w, h, right_text=None, left_text=None):
    fcfg, m = CONFIG["footer"], CONFIG["margin"]
    bar_top = h - fcfg["bar_height"]
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([0, bar_top, w, h], fill=hx("bar") + (255,))
    ra = int(255 * fcfg["rule_opacity"])
    od.line([0, bar_top, w, bar_top], fill=hx("mint") + (ra,), width=1)
    im.alpha_composite(overlay)
    fnt = font("mono", fcfg["size"])
    text = (fcfg["text"] if left_text is None else left_text).format(n=ep_num)
    ty = bar_top + (fcfg["bar_height"] - fcfg["size"]) // 2 - 2
    x = m
    for seg in text.split("•"):
        x = draw_tracked(draw, (x, ty), seg, fnt, hx(fcfg["colour"]), fcfg["tracking"])
        if seg != text.split("•")[-1]:
            x = draw_tracked(draw, (x, ty), "•", fnt, hx(fcfg["bullet_colour"]), fcfg["tracking"])
    if right_text:
        rw = tracked_width(fnt, right_text, fcfg["tracking"])
        draw_tracked(draw, (w - m - rw, ty), right_text, fnt, hx(fcfg["colour"]), fcfg["tracking"])


# ---------------------------------------------------------------------
# Composers
# ---------------------------------------------------------------------
def compose_youtube(args, portrait_side):
    cfg = CONFIG["yt"]
    w, h = cfg["w"], cfg["h"]
    right_align = (portrait_side == "left")           # text block flips sides
    glow_cx = 0.74 if right_align else 0.26           # highlight behind the title (24.15)
    im = make_canvas(w, h, glow_cx).convert("RGBA")
    # ID-2026-07-03-03: coordinated tight-face crop. When enabled, the portrait
    # zooms in (~+16%) AND the title column + quote pill are pulled in together so
    # the enlarged face never collides with the text.
    tight = bool(getattr(args, "tight_face", False))
    tf = cfg.get("tight_face", {}) if tight else {}
    slab = headshot_slab(args.headshot, w, h, portrait_side,
                         src_crop=args.src_crop, tight=tight)
    im.alpha_composite(slab)
    draw = ImageDraw.Draw(im)
    draw_lockup_and_badge(draw, im, args.badge, args.badge_style,
                          CONFIG["margin"], right_align, w)
    title_max = tf.get("title_max_width", CONFIG["title"]["max_width"])
    draw_title_block(draw, args.title, args.subtitle,
                     CONFIG["title"]["size_by_lines"], title_max,
                     CONFIG["margin"], w, right_align)
    draw_pill(im, draw, args.quote, h, CONFIG["margin"], w, right_align,
              max_width=tf.get("pill_max_width"), start_size=tf.get("pill_size"))
    draw_footer(im, draw, args.episode, w, h)         # left only: bottom-right belongs to the duration stamp
    return im.convert("RGB")


def compose_og(args):
    """1200x630 OG / newsletter card, no portrait. OG Composition Standard
    (GR-2026-07-11, layout B). Two columns share one optical axis: the title
    (left, white hero) and the Hard Stop (right, mint, centred) are BOTH
    vertically centred on the content band's midpoint; a mint divider anchors
    them. See CONFIG["og"] + Design_Standards/OG_Card_Standard.md."""
    ocfg = CONFIG["og"]
    w, h = ocfg["w"], ocfg["h"]
    m = CONFIG["margin"]
    im = make_canvas(w, h, 0.85).convert("RGBA")
    draw = ImageDraw.Draw(im)
    draw_lockup_and_badge(draw, im, args.badge, args.badge_style, m, False, w)

    band = ocfg["band"]
    band_center = (band["top"] + band["bottom"]) // 2

    # -- LEFT column: episode title, vertically centred in the band --
    tcfg, scfg, al = CONFIG["title"], CONFIG["subtitle"], ocfg["accent_line"]
    lines = title_lines(args.title, tcfg["wrap_chars"])
    nominal_size = ocfg["size_by_lines"].get(
        len(lines), min(ocfg["size_by_lines"].values()))
    size = nominal_size
    fnt = font("title", size)
    while size > 40 and any(tracked_width(fnt, ln, tcfg["tracking"]) > ocfg["title_max_width"]
                            for ln in lines):
        size -= 2
        fnt = font("title", size)
    asc, _ = fnt.getmetrics()
    pitch = int(size * tcfg["line_height"])
    accent_gap = al["gap"]
    # Preserve the approved vertical register when a wide title has to step down
    # to clear the divider. Without this compensation, a two-line width fit gains
    # blank air above and below even though its horizontal fit is correct. Split
    # the lost title height between line rhythm and the accent gap so the block
    # keeps the nominal Episode 24 height without stretching any glyphs.
    nominal_pitch = int(nominal_size * tcfg["line_height"])
    nominal_title_h = nominal_pitch * (len(lines) - 1) + nominal_size
    fitted_title_h = pitch * (len(lines) - 1) + size
    height_deficit = max(0, nominal_title_h - fitted_title_h)
    if height_deficit and len(lines) > 1:
        pitch_slots = len(lines) - 1
        pitch_boost = round((height_deficit / 2) / pitch_slots)
        pitch += pitch_boost
        accent_gap += height_deficit - pitch_boost * pitch_slots
    elif height_deficit:
        accent_gap += height_deficit
    has_sub = bool(getattr(args, "subtitle", "") or "")
    block_h = pitch * (len(lines) - 1) + size + accent_gap + al["height"]
    if has_sub:
        block_h += scfg["gap_below_title"] + scfg["size"]
    y = band_center - block_h // 2
    left_top_y = y
    for ln in lines:
        draw_tracked(draw, (m, y - int(asc * 0.22)), ln, fnt, hx(tcfg["colour"]), tcfg["tracking"])
        y += pitch
    y = y - pitch + size                         # bottom of last title line
    y += accent_gap
    draw.rectangle([m, y, m + al["width"], y + al["height"]], fill=hx("mint"))
    y += al["height"]
    if has_sub:
        draw.text((m, y + scfg["gap_below_title"]), args.subtitle,
                  font=font("subtitle", scfg["size"]), fill=hx(scfg["colour"]))

    # -- DIVIDER: the anchor between the two columns --
    dv = ocfg["divider"]
    dov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(dov).line([dv["x"], dv["top"], dv["x"], dv["bottom"]],
                             fill=hx(dv["colour"]) + (int(255 * dv["opacity"]),),
                             width=dv["width"])
    im.alpha_composite(dov)
    draw = ImageDraw.Draw(im)

    # -- RIGHT column: Hard Stop, centred in its column + on the band axis --
    q = ocfg["quote_block"]
    cx = q["cx"]
    mono, qf = font("mono", q["label_size"]), font("pill", q["size"])
    qlines = wrap_words(args.quote, q["wrap_chars"])   # sentence case, as written
    short_quote = len(qlines) <= q["short_max_lines"]
    gap_label_to_rule = (q["short_gap_label_to_rule"] if short_quote
                         else q["gap_label_to_rule"])
    gap_rule_to_quote = (q["short_gap_rule_to_quote"] if short_quote
                         else q["gap_rule_to_quote"])
    lh = int(q["size"] * q["line_height"])
    total_h = (q["label_size"] + gap_label_to_rule + q["rule_h"]
               + gap_rule_to_quote + lh * (len(qlines) - 1) + q["size"])
    centred_qy = band_center - total_h // 2
    qy = min(centred_qy, left_top_y + q["max_top_below_title"])
    draw_centered_tracked(draw, cx, qy, q["label"], mono,
                          hx(q["label_colour"]), q["label_tracking"])
    qy += q["label_size"] + gap_label_to_rule
    draw.rectangle([cx - q["rule_w"] // 2, qy, cx + q["rule_w"] // 2, qy + q["rule_h"]],
                   fill=hx(q["label_colour"]))
    qy += q["rule_h"] + gap_rule_to_quote
    for ln in qlines:
        lw = draw.textlength(ln, font=qf)
        draw.text((cx - lw / 2, qy), ln, font=qf, fill=hx(q["colour"]))
        qy += lh

    wm = ocfg["watermark"]
    logo = render_logo(wm["px"], opacity=wm["opacity"])
    im.paste(logo, (w - wm["inset"] - wm["px"],
                    h - CONFIG["footer"]["bar_height"] - wm["inset"] // 2 - wm["px"]), logo)
    draw_footer(im, draw, args.episode, w, h,
                right_text=ocfg["footer_right"], left_text=ocfg["footer_left"])
    return im.convert("RGB")


def default_art_title(title, max_chars):
    """Derive the short art title when --art-title is not given: the full
    title (slashes and trailing stop removed) if it fits, else the first
    explicit line segment."""
    flat = " ".join(seg.strip() for seg in title.split("/")).rstrip(".").strip()
    if len(flat) <= max_chars:
        return flat
    return title.split("/")[0].rstrip(".").strip()


def compose_art(args):
    """Square Spotify episode art, "giant numeral" concept (codex v1.9.17):
    full-bleed duotone portrait, top wordmark strip, title lower-left, the
    episode number as a large mint numeral bottom-right. The numeral is the
    list-scan differentiator; there is no badge pill on this surface."""
    from PIL import ImageOps
    acfg = CONFIG["art"]
    S = acfg["size"]
    im = make_canvas(S, S, 0.5).convert("RGB")
    # duotone portrait, cover full width, top anchored
    p = Image.open(args.headshot).convert("RGB")
    if args.src_crop:
        l, t, r, b = args.src_crop
        W0, H0 = p.size
        p = p.crop((int(l * W0), int(t * H0), int(r * W0), int(b * H0)))
    duo = acfg["duotone"]
    p = ImageOps.colorize(ImageOps.grayscale(p), black=duo["black"], mid=duo["mid"], white=duo["white"])
    cw, ch = p.size
    sc = max(S / cw, S * acfg["portrait_min_h_frac"] / ch)
    p = p.resize((int(cw * sc), int(ch * sc)), Image.LANCZOS)
    sw, sh = p.size
    p = p.crop(((sw - S) // 2, 0, (sw - S) // 2 + S, min(sh, S)))
    im.paste(p, (0, 0))
    # bottom gradient into navy
    grad = Image.new("L", (1, S))
    f0, span = acfg["fade_from"], acfg["fade_span"]
    for yy in range(S):
        v = 0 if yy < S * f0 else int(255 * min(1.0, (yy - S * f0) / (S * span)))
        grad.putpixel((0, yy), v)
    im = Image.composite(Image.new("RGB", (S, S), hx("navy_0")), im, grad.resize((S, S)))
    d = ImageDraw.Draw(im)
    # top wordmark strip
    d.rectangle([0, 0, S, acfg["strip_h"]], fill=acfg["strip_fill"])
    mono = font("mono", acfg["strip_font"])
    wm = CONFIG["lockup"]["wordmark"]
    ww = tracked_width(mono, wm, acfg["strip_tracking"])
    tb_y = (acfg["strip_h"] - acfg["strip_font"]) // 2
    draw_tracked(d, ((S - ww) // 2, tb_y), wm, mono, hx("mint"), acfg["strip_tracking"])
    # giant numeral, bottom-right, behind the title
    im = im.convert("RGBA")
    nf = font("title", acfg["numeral_size"])
    num = str(args.episode)
    nw = tracked_width(nf, num, acfg["numeral_tracking"])
    nasc, _ = nf.getmetrics()
    numeral_left = S - acfg["numeral_margin_x"] - nw   # ID-2026-07-03-03: left edge of the numeral glyph box
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    nd = ImageDraw.Draw(layer)
    draw_tracked(nd, (numeral_left, S - acfg["numeral_margin_y"] - nasc),
                 num, nf, hx("mint") + (acfg["numeral_opacity"],), acfg["numeral_tracking"])
    im.alpha_composite(layer)
    d = ImageDraw.Draw(im)
    # title lower-left, above the numeral layer
    lines = wrap_words(args.art_title.upper(), 8) if len(args.art_title) > 9 else [args.art_title.upper()]
    size = acfg["title_size"]
    fnt = font("title", size)
    # ID-2026-07-03-03: cap the title's longest line so its right edge stays clear
    # of the numeral by numeral_title_clearance px, then step the font down until it
    # fits that reserved column. This is a real clearance (holds at the 64px QA size),
    # not a nudge — it fixes the 2-digit-numeral collision (Ep 22 "SIX-WEEK" overran
    # the "22"). Falls back to the frac cap when the numeral is narrow (1-digit eps).
    clearance = acfg.get("numeral_title_clearance", 0)
    frac_max = int(S * acfg["title_max_width_frac"])
    max_w = min(frac_max, numeral_left - clearance - acfg["title_x"])
    if max_w < acfg["title_x"]:      # pathological guard: never go below a sane floor
        max_w = frac_max
    while size > acfg["title_min_size"] and any(tracked_width(fnt, ln, -2) > max_w for ln in lines):
        size -= 10
        fnt = font("title", size)
    pitch = int(size * acfg["title_line_height"])
    asc, _ = fnt.getmetrics()
    y = acfg["title_last_baseline"] - asc - pitch * (len(lines) - 1)
    for ln in lines:
        draw_tracked(d, (acfg["title_x"], y), ln, fnt, hx("ink"), -2)
        y += pitch
    return im.convert("RGB")


def bookend_base(mark_opacity):
    """Shared vertical canvas (section 19.7): navy gradient + grid + glow,
    centred wordmark top, lens mark beneath it, brand footer bottom. Returns
    the RGBA image, its draw, dimensions, and the horizontal centre."""
    bc = CONFIG["bookend"]
    W, H = bc["w"], bc["h"]
    im = make_canvas(W, H, 0.5).convert("RGBA")
    mark = render_logo(bc["mark_px"], opacity=mark_opacity)
    im.paste(mark, ((W - bc["mark_px"]) // 2, bc["mark_y"]), mark)
    draw = ImageDraw.Draw(im)
    cx = W / 2.0
    wf = font("mono", bc["wordmark_size"])
    draw_centered_tracked(draw, cx, bc["wordmark_y"], CONFIG["lockup"]["wordmark"],
                          wf, hx("mint"), bc["wordmark_tracking"])
    ff = font("mono", bc["footer_size"])
    draw_centered_tracked(draw, cx, bc["footer_y"], bc["footer_text"],
                          ff, hx("teal_mid"), bc["footer_tracking"])
    return im, draw, W, H, cx


def compose_clip_intro(args):
    """Vertical intro bookend (1.0s pre-roll, section 19.7): wordmark, format
    badge, episode title, subtitle, episode marker. No CTA: the viewer has not
    earned the right to be sold to yet."""
    bc, ic = CONFIG["bookend"], CONFIG["bookend"]["intro"]
    im, draw, W, H, cx = bookend_base(bc["mark_opacity_intro"])
    # format badge, centred (filled for Signal Drop, outlined for Deep Dive)
    bf = font("mono", ic["badge_size"])
    bw = tracked_width(bf, args.badge, ic["badge_tracking"]) + 2 * ic["badge_pad_x"]
    bh = ic["badge_size"] + 2 * ic["badge_pad_y"]
    bx0, by0 = cx - bw / 2, ic["badge_y"]
    if args.badge_style == "filled":
        draw.rounded_rectangle([bx0, by0, bx0 + bw, by0 + bh],
                               radius=ic["badge_radius"], fill=hx("mint"))
        tcol = hx("navy_0")
    else:
        draw.rounded_rectangle([bx0, by0, bx0 + bw, by0 + bh],
                               radius=ic["badge_radius"], outline=hx("mint"),
                               width=CONFIG["badge"]["outline_px"])
        tcol = hx("mint")
    draw_centered_tracked(draw, cx, by0 + ic["badge_pad_y"] - 1, args.badge,
                          bf, tcol, ic["badge_tracking"])
    # episode title, centred display, multi-line ("/" forces breaks)
    lines = title_lines(args.title, ic["wrap_chars"])
    size = ic["size_by_lines"].get(len(lines), min(ic["size_by_lines"].values()))
    fnt = font("title", size)
    while size > 56 and any(tracked_width(fnt, ln, ic["tracking"]) > ic["title_max_width"] for ln in lines):
        size -= 4
        fnt = font("title", size)
    pitch = int(size * ic["line_height"])
    y = ic["title_top"]
    for ln in lines:
        draw_centered_tracked(draw, cx, y, ln, fnt, hx("ink"), ic["tracking"])
        y += pitch
    # subtitle (grey) then episode marker (mono, mid teal)
    sy = y - pitch + size + ic["subtitle_gap"]
    draw_centered(draw, cx, sy, args.subtitle, font("subtitle", ic["subtitle_size"]), hx("grey"))
    my = sy + ic["subtitle_size"] + ic["marker_gap"]
    draw_centered_tracked(draw, cx, my, args.marker, font("mono", ic["marker_size"]),
                          hx("teal_mid"), ic["marker_tracking"])
    return im.convert("RGB")


def outro_cta_blocks(args):
    """The four locked outro CTA blocks (section 19.7, v1.9.20 order):
    THE BOOK / free chapter, FULL EPISODE, NEXT EPISODE teaser, FOLLOW THE
    SHOW. Each is (label, line1, line2). The book block is mandatory."""
    n = args.episode
    if args.next_title:
        nxt = (args.next_title, "Signal Drop %d, this Friday" % (n + 1))
    else:
        nxt = ("New Signal Drop every Friday", "")
    return [
        ("THE BOOK", BOOK_TITLE, BOOK_FREE_CHAPTER),
        ("FULL EPISODE", "Signal Drop %d" % n, "on Spotify & Apple"),
        ("NEXT EPISODE", nxt[0], nxt[1]),
        ("FOLLOW THE SHOW", "Metrics & Mayhem", "Wherever you get your podcasts"),
    ]


def compose_clip_outro(args):
    """Vertical outro bookend (1.5s post-roll, section 19.7): "More signals
    soon." echoing the locked audio outro, then the four locked CTA blocks."""
    bc, oc = CONFIG["bookend"], CONFIG["bookend"]["outro"]
    im, draw, W, H, cx = bookend_base(bc["mark_opacity_outro"])
    hf = font("title", oc["head_size"])
    draw_centered(draw, cx, oc["head_top"], "More signals", hf, hx("ink"))
    draw_centered(draw, cx, oc["head_top"] + oc["head_line_gap"], "soon.", hf, hx("mint"))
    y = oc["cta_top"]
    for label, line1, line2 in outro_cta_blocks(args):
        draw.rectangle([cx - oc["rule_w"] / 2, y, cx + oc["rule_w"] / 2, y + oc["rule_h"]],
                       fill=hx("mint"))
        draw_centered_tracked(draw, cx, y + oc["label_gap"], label,
                              font("mono", oc["label_size"]), hx("mint"), oc["label_tracking"])
        s1 = oc["line1_size"]
        l1f = font("pill", s1)
        while s1 > 26 and draw.textlength(line1, font=l1f) > oc["cta_max_width"]:
            s1 -= 2
            l1f = font("pill", s1)
        draw_centered(draw, cx, y + oc["line1_gap"], line1, l1f, hx("ink"))
        if line2:
            draw_centered(draw, cx, y + oc["line2_gap"], line2,
                          font("subtitle", oc["line2_size"]), hx("grey"))
        y += oc["cta_step"]
    return im.convert("RGB")


def bookend_qa_sheet(intro, outro, out_path):
    """Side-by-side intro and outro at preview width plus a feed-scroll size,
    the section 19.7 eyeball gate for the vertical pair."""
    pad, label_h, cw, sm = 16, 26, 300, 120
    fnt = font("mono", 14)

    def scaled(img, width):
        return img.resize((width, int(width * img.size[1] / img.size[0])), Image.LANCZOS)

    big_i, big_o = scaled(intro, cw), scaled(outro, cw)
    sm_i, sm_o = scaled(intro, sm), scaled(outro, sm)
    W = cw * 2 + pad * 3
    H = label_h + big_i.size[1] + pad * 2 + label_h + sm_i.size[1] + pad * 2
    sheet = Image.new("RGB", (W, H), hx("navy_0"))
    d = ImageDraw.Draw(sheet)
    y = pad
    d.text((pad, y), "INTRO 1080x1920", font=fnt, fill=hx("mint"))
    d.text((pad + cw + pad, y), "OUTRO 1080x1920", font=fnt, fill=hx("mint"))
    sheet.paste(big_i, (pad, y + label_h))
    sheet.paste(big_o, (pad + cw + pad, y + label_h))
    y += label_h + big_i.size[1] + pad * 2
    d.text((pad, y), "INTRO feed-scroll", font=fnt, fill=hx("mint"))
    d.text((pad + cw + pad, y), "OUTRO feed-scroll", font=fnt, fill=hx("mint"))
    sheet.paste(sm_i, (pad, y + label_h))
    sheet.paste(sm_o, (pad + cw + pad, y + label_h))
    sheet.save(out_path, "PNG")
    return out_path


def save_jpg(im, path):
    im.save(path, "JPEG", quality=CONFIG["art"]["jpeg_quality"], optimize=True)
    return os.path.getsize(path)


def save_png(im, path):
    meta = PngInfo()
    meta.add_text("mm_builder_version", BUILDER_VERSION)
    meta.add_text("mm_config_hash", config_hash())
    im.save(path, "PNG", pnginfo=meta, optimize=True)
    size = os.path.getsize(path)
    if size > 2 * 1024 * 1024:
        print("  WARN: %s is %.1fMB (codex limit 2MB)" % (os.path.basename(path), size / 1048576))
    return size


def qa_sheet(yt, og, art, out_path):
    """Candidate vs the Ep 17 canonical reference, full-size pair plus the
    160x90 one-second-test pair, the OG render, and the square episode art
    at 240 / 160 / 64. Codex 19.6 gate: a human (or the operating agent)
    must eyeball this sheet before shipping."""
    ref = Image.open(REFERENCE_YT).convert("RGB") if os.path.isfile(REFERENCE_YT) else None
    pad, label_h = 16, 26
    cw = 480
    fnt = font("mono", 14)

    def scaled(img, width):
        return img.resize((width, int(width * img.size[1] / img.size[0])), Image.LANCZOS)

    pairs = [("CANDIDATE 1280x720", scaled(yt, cw)),
             ("EP 17 REFERENCE", scaled(ref, cw) if ref else None),
             ("CANDIDATE 160x90", yt.resize((160, 90), Image.LANCZOS)),
             ("REFERENCE 160x90", ref.resize((160, 90), Image.LANCZOS) if ref else None),
             ("CANDIDATE OG 1200x630", scaled(og, cw))]
    art_cell = None
    if art is not None:
        art_cell = Image.new("RGB", (cw, 256), hx("navy_0"))
        art_cell.paste(art.resize((240, 240), Image.LANCZOS), (0, 0))
        art_cell.paste(art.resize((160, 160), Image.LANCZOS), (256, 0))
        art_cell.paste(art.resize((64, 64), Image.LANCZOS), (256, 176))
    W = cw * 2 + pad * 3
    row_h = [max(p[1].size[1] for p in pairs[:2] if p[1]) + label_h,
             90 + label_h, pairs[4][1].size[1] + label_h]
    if art_cell is not None:
        row_h[2] = max(row_h[2], 256 + label_h)
    H = sum(row_h) + pad * 4
    sheet = Image.new("RGB", (W, H), hx("navy_0"))
    d = ImageDraw.Draw(sheet)
    y = pad
    cells = [(pairs[0], pairs[1]), (pairs[2], pairs[3]),
             (pairs[4], ("EPISODE ART 240 / 160 / 64", art_cell) if art_cell is not None else None)]
    for ri, (a, b) in enumerate(cells):
        x = pad
        for cell in (a, b):
            if cell and cell[1]:
                d.text((x, y), cell[0], font=fnt, fill=hx("mint"))
                sheet.paste(cell[1], (x, y + label_h))
            x += cw + pad
        y += row_h[ri] + pad
    sheet.save(out_path, "PNG")
    return out_path


# ---------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------
def parse_crop(s):
    parts = [float(v) for v in s.split(",")]
    if len(parts) != 4:
        raise argparse.ArgumentTypeError("expected l,t,r,b fractions")
    return parts


def main():
    ap = argparse.ArgumentParser(description="Metrics & Mayhem canonical thumbnail builder")
    ap.add_argument("--episode", type=int, required=True)
    ap.add_argument("--title", required=True, help='use "/" for explicit line breaks')
    ap.add_argument("--subtitle", required=True)
    ap.add_argument("--quote", default=None,
                    help="Hard Stop pull-quote (pill text); required unless --bookends-only")
    ap.add_argument("--art-title", default=None,
                    help="short title for the square episode art (default: derived from --title)")
    ap.add_argument("--headshot", default=None,
                    help="clean portrait source (required unless --bookends-only)")
    ap.add_argument("--marker", default=None,
                    help="intro bookend episode marker (default: '<badge> <n>')")
    ap.add_argument("--next-title", default=None,
                    help="next episode title for the outro NEXT EPISODE teaser; omit for a generic teaser")
    ap.add_argument("--slug", default=None,
                    help="episode slug for bookend filenames (default: derived from --outdir)")
    ap.add_argument("--bookends-only", action="store_true",
                    help="emit only the vertical bookends (skip yt/og/art); use to re-render bookends for already-published episodes without touching their thumbnails")
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--badge", default="SIGNAL DROP")
    ap.add_argument("--badge-style", choices=["filled", "outlined"], default=None,
                    help="default: filled for SIGNAL DROP, outlined for DEEP DIVE")
    ap.add_argument("--gaze", choices=["left", "right", "camera"], default="camera",
                    help="portrait gaze per codex 24.15; layout flips, portrait never mirrors")
    ap.add_argument("--src-crop", type=parse_crop, default=None,
                    help="l,t,r,b fractions isolating the portrait region of a concept frame")
    ap.add_argument("--tight-face", dest="tight_face", action="store_true",
                    help="ID-2026-07-03-03: coordinated tight-face YouTube crop (~+16%% portrait "
                         "zoom) with the quote pill + title column pulled in to match, so the "
                         "enlarged face never collides with the text. Standalone crop is NOT enough.")
    ap.add_argument("--ship", action="store_true",
                    help="write finals into outdir (default: stage to outdir/_staging)")
    ap.add_argument("--og-only", action="store_true",
                    help="emit only the no-headshot OG (+ bookends); needs --quote, not --headshot")
    args = ap.parse_args()

    if args.badge_style is None:
        args.badge_style = "outlined" if "DEEP DIVE" in args.badge.upper() else "filled"
    # 24.15 placement: gaze left -> portrait LEFT; gaze right -> portrait RIGHT;
    # camera -> right (the Ep 17 exemplar side).
    portrait_side = "left" if args.gaze == "left" else "right"

    n = args.episode
    if args.og_only:
        if not args.quote:
            sys.exit("FATAL: --quote is required for --og-only (the OG carries the Hard Stop quote block)")
    elif not args.bookends_only:
        if not args.headshot or not args.quote:
            sys.exit("FATAL: --headshot and --quote are required (omit only with --bookends-only or --og-only)")
        if not os.path.isfile(args.headshot):
            sys.exit("FATAL: headshot not found: %s" % args.headshot)
    os.makedirs(args.outdir, exist_ok=True)
    dest = args.outdir if args.ship else os.path.join(args.outdir, "_staging")
    os.makedirs(dest, exist_ok=True)

    # Bookend identity: slug for filenames (section 19.7) and the intro marker.
    if args.slug is None:
        base = os.path.basename(os.path.normpath(args.outdir))
        args.slug = re.sub(r"^(?:\d+|[Ss]\d+[Ee]\d+)_", "", base).lower()
    if args.marker is None:
        args.marker = "%s %d" % (args.badge.upper(), n)

    print("thumbnail_builder v%s (config %s)" % (BUILDER_VERSION, config_hash()))

    if args.og_only:
        og = compose_og(args)
        og_path = os.path.join(dest, "%d_thumbnail_og.png" % n)
        s2 = save_png(og, og_path)
        print("  og:  %s (%.0fKB)  [og-only, no headshot]" % (og_path, s2 / 1024))
    elif not args.bookends_only:
        if args.art_title is None:
            args.art_title = default_art_title(args.title, CONFIG["art"]["art_title_max_chars"])
        yt = compose_youtube(args, portrait_side)
        og = compose_og(args)
        art = compose_art(args)
        yt_path = os.path.join(dest, "%d_thumbnail_youtube.png" % n)
        og_path = os.path.join(dest, "%d_thumbnail_og.png" % n)
        art_path = os.path.join(dest, "%d_episode_art.jpg" % n)
        qa_path = os.path.join(dest, "%d_thumbnail_qa.png" % n)
        s1 = save_png(yt, yt_path)
        s2 = save_png(og, og_path)
        s3 = save_jpg(art, art_path)
        qa_sheet(yt, og, art, qa_path)
        print("  yt:  %s (%.0fKB)" % (yt_path, s1 / 1024))
        print("  og:  %s (%.0fKB)" % (og_path, s2 / 1024))
        print("  art: %s (%.0fKB, title %r)" % (art_path, s3 / 1024, args.art_title))
        print("  qa:  %s" % qa_path)

    # Vertical clip bookends (section 19.7). Always emitted: one command keeps
    # every surface in sync. --bookends-only skips the thumbnails above.
    intro = compose_clip_intro(args)
    outro = compose_clip_outro(args)
    intro_path = os.path.join(dest, "bookend_intro_%s.png" % args.slug)
    outro_path = os.path.join(dest, "bookend_outro_%s.png" % args.slug)
    bqa_path = os.path.join(dest, "bookend_qa_%s.png" % args.slug)
    bi = save_png(intro, intro_path)
    bo = save_png(outro, outro_path)
    bookend_qa_sheet(intro, outro, bqa_path)
    print("  bookend intro: %s (%.0fKB)" % (intro_path, bi / 1024))
    print("  bookend outro: %s (%.0fKB)" % (outro_path, bo / 1024))
    print("  bookend qa:    %s" % bqa_path)

    if not args.ship:
        print("  STAGED. Eyeball the QA sheets (codex 19.6 / 19.7 gates), then re-run with --ship.")
    else:
        print("  SHIPPED to %s. QA sheets rendered; eyeball before upload per codex 19.6 / 19.7." % args.outdir)


if __name__ == "__main__":
    main()
# v1.2.0: vertical clip bookends (intro + outro) per Codex 19.7, replacing the
# retired Node kit. One builder, one config block, no drift.
# v1.3.0 (2026-07-06, ID-2026-07-03-03): fix the two real episode-art / thumbnail
#   collisions, validated by render + eyeball (codex 19.6 gate, incl. 64px square).
#   (1) Square 3000x3000 art: the title's longest line is now measured and capped so
#       its right edge stays >= art.numeral_title_clearance (120px) clear of the giant
#       numeral's left edge, stepping the title font down to fit that reserved column.
#       This is a real, guaranteed clearance that holds down to the 64px list-scan size
#       for 1- and 2-digit numerals and multi-line titles (fixes the Ep 22 "SIX-WEEK"
#       overrunning the "22"). (2) YouTube 1280x720 "tight face": a coordinated pass,
#       not a standalone crop -- --tight-face zooms the portrait ~+16% (yt.tight_face)
#       AND pulls the quote pill (narrower max width, smaller size) and title column in
#       together, so the enlarged face never collides with or clips the text. Gaze /
#       expression capture stays a human shoot habit (see the note by BUILDER_VERSION),
#       not code. config_hash() ignores BUILDER_VERSION, so identical CONFIG still
#       yields identical pixels; determinism preserved.
# v1.3.1 (2026-07-26): preserve the nominal OG title-block height when a wide
#   title steps down to clear the divider, and tighten/top-cap three-line Hard
#   Stops so short quote blocks cannot sag below the left title. Episode 24
#   remains pixel-identical; Episode 25 is the regression case for both rules.
# v1.3.2 (2026-07-26): optically centre the top wordmark on the lens mark's
#   visible centreline and remove the duplicated site name from the OG footer's
#   left side. The site remains once, right-aligned; other surfaces are unchanged.
