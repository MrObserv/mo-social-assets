#!/usr/bin/env python3
"""Trim vidIQ clips cut from Tech Tuesday TT03 (Continuous Profiling, https://youtu.be/q4Byz7OLgVY).

Source: vidIQ generate_clips job job_b3307691-858e-48c5-87ae-386562cc912d (2026-10-19), "Loud & Clear"
captions burned in by vidIQ. Cut points were set from word timings (faster-whisper small.en),
a 20ms energy/high-frequency scan and contact sheets of the caption band, so every cut lands in
a pause and on a caption-line boundary where one exists.
Fades: 0.25s video fade-in, 0.3s video fade-out; 30ms audio fades at both ends (no clicks).
Optional freeze: where the next caption line appears before the last word has finished sounding,
the picture holds its last frame from that point (tpad clone) while the audio runs out the word.
Reviewer fixes 2026-10-19: always-on ends after the FIRST "scope first, then spread" (the second
read as a retake); map-not-verdict starts at "A function" and ends on "expensive and wasteful", so
it no longer repeats "Profiling makes the invisible visible", already in two published Shorts.
Usage: python3 trim_tt03_vidiq_clips.py <dir with vidIQ clip mp4s> <out dir> [slug ...]
"""
import subprocess, sys, os, glob
SRC, OUT = sys.argv[1], sys.argv[2]
CLIPS = [
    # (vidIQ clip id prefix, out slug, start s, end s or None for source end, freeze picture from s or None)
    ('123741a9', 'pick-one-service', 5.95, None, None),       # drops "if you're at the coal face, sorry, etc"
    ('3b83f8ff', 'always-on-not-free', 0.56, 53.00, None),    # drops leading "is"; ends after the first "scope first, then spread"
    ('193cc555', 'map-not-verdict', 7.88, 26.95, 26.78),      # "A function still sitting at 40%..." to "...expensive and wasteful"
    ('c6343825', 'flame-graph-basics', 4.94, 37.585, None),   # drops "Name parts...one, the profile itself"; ends before a dangling "So"
]
ONLY = set(sys.argv[3:])
for cid, slug, ss, to, freeze in CLIPS:
    if ONLY and slug not in ONLY:
        continue
    src = glob.glob(os.path.join(SRC, cid + '*.mp4'))[0]
    dur_src = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src],
                                   capture_output=True, text=True).stdout)
    end = to if to else dur_src
    d = round(end - ss, 3)
    vf = f'fade=t=in:st=0:d=0.25,fade=t=out:st={d-0.3:.3f}:d=0.3'
    if freeze:
        hold = round(end - freeze, 3)
        vf = f'trim=end={freeze-ss:.3f},setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration={hold},' + vf
    af = f'afade=t=in:st=0:d=0.03,afade=t=out:st={d-0.03:.3f}:d=0.03'
    out = os.path.join(OUT, f'vidiq_tt03_{slug}_1080x1920.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{ss}', '-i', src, '-t', f'{d}', '-vf', vf, '-af', af,
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', '30', '-pix_fmt', 'yuv420p',
                    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], check=True)
    print(slug, cid, f'{ss}-{end:.3f}', f'{d}s', out)
