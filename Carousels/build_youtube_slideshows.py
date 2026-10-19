#!/usr/bin/env python3
"""Build 9:16 YouTube Shorts slideshows from the 2026-10-12 High Performance carousels.

Source: the TikTok cut (1080x1920) in Carousels/, built by producers/mo_carousel.js.
Rules applied (Content Management, 2026-10-19, on Al's ruling "slideshows from built cards"):
- The cover's "SWIPE" label is removed, because on YouTube Shorts a swipe leaves the video.
  It is replaced with the identical background pixels from slide 2 (every non-cover slide
  is byte-identical in that box), so nothing is redrawn by hand.
- The TikTok CTA slide ("LINK IN BIO") is dropped; the link goes in the YouTube description.
- Cover 3.5s; other slides 1.0s + words/4 (alt-text words), clamped to 3.5-7.0s; 0.4s crossfades;
  silent AAC track.
Usage: python3 build_youtube_slideshows.py <Carousels dir> <out dir>
"""
import json, subprocess, sys, os
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
BOX = (110, 1468, 312, 1514)
FADE = 0.4
SLUGS = ['just-flaky', 'confidence-evidence', 'runbook-if-then']

def secs(alt, cover=False):
    if cover:
        return 3.5
    w = len(alt.split())
    return max(3.5, min(7.0, 1.0 + w / 4.0))

for slug in SLUGS:
    man = json.load(open(os.path.join(SRC, f'2026-10-12_carousel_{slug}_manifest.json')))
    slides = [s for s in man['variants']['tiktok']['slides'] if 'cta' not in s['file']]
    work = os.path.join(OUT, f'_work_{slug}')
    os.makedirs(work, exist_ok=True)
    files, durs = [], []
    for i, s in enumerate(slides):
        im = Image.open(os.path.join(SRC, s['file'])).convert('RGB')
        if i == 0:
            donor = Image.open(os.path.join(SRC, slides[1]['file'])).convert('RGB')
            im.paste(donor.crop(BOX), BOX[:2])
        p = os.path.join(work, f'{i:02d}.png')
        im.save(p)
        files.append(p)
        durs.append(round(secs(s['alt'], cover=(i == 0)), 2))
    cmd = ['ffmpeg', '-v', 'error', '-y']
    for p, d in zip(files, durs):
        cmd += ['-loop', '1', '-t', str(d + FADE), '-framerate', '30', '-i', p]
    total = sum(durs) + FADE
    cmd += ['-f', 'lavfi', '-t', str(total), '-i', 'anullsrc=r=48000:cl=stereo']
    chain, last, off = [], '[0:v]', 0.0
    for i in range(1, len(files)):
        off += durs[i - 1]
        lab = f'[v{i}]'
        chain.append(f'{last}[{i}:v]xfade=transition=fade:duration={FADE}:offset={off:.2f}{lab}')
        last = lab
    chain.append(f'{last}format=yuv420p[vout]')
    out = os.path.join(OUT, f'2026-10-12_carousel_{slug}_youtube_1080x1920.mp4')
    cmd += ['-filter_complex', ';'.join(chain), '-map', '[vout]', '-map', f'{len(files)}:a',
            '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', '30',
            '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out]
    subprocess.run(cmd, check=True)
    print(slug, durs, 'total', round(total, 2), out)
