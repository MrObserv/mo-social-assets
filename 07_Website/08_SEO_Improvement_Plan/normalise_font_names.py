#!/usr/bin/env python3
"""
normalise_font_names.py  -  Mastering Observability brand font name normalisation.

WHY THIS EXISTS
Google Fonts ships the Montserrat and DM Sans static instances with the wrong
family name baked into the name table. Upstream, verified 2026-09-14:

    Montserrat-ExtraBold.ttf  family = "Montserrat Thin ExtraBold"   (typo family "Montserrat Thin")
    Montserrat-Bold.ttf       family = "Montserrat Thin"
    DMSans-Bold.ttf           family = "DM Sans 9pt"
    DMSans-Regular.ttf        family = "DM Sans 9pt"

The OUTLINES are correct (usWeightClass 800 for ExtraBold). Only the labels are wrong.
Re-downloading does NOT fix this. The upstream artefact has the same names.

Consequence: font-family:'Montserrat' matches nothing. On Linux the renderer
substitutes DejaVu; on Windows nothing resolves and the text is DROPPED SILENTLY,
producing a perfectly rendered, completely blank card at exit code 0.

This script rewrites ONLY the name table. No glyph, metric or table data is touched.
It is deterministic and repeatable, so it is a build step, not a hand edit.

USAGE
    python3 normalise_font_names.py <font-dir>          # in place
    python3 normalise_font_names.py <font-dir> --check  # verify only, non-zero exit on failure
"""
import sys, os
from fontTools.ttLib import TTFont

TARGET = {
    "Montserrat-ExtraBold.ttf": ("Montserrat", "ExtraBold"),
    "Montserrat-Bold.ttf":      ("Montserrat", "Bold"),
    "DMSans-Bold.ttf":          ("DM Sans",    "Bold"),
    "DMSans-Regular.ttf":       ("DM Sans",    "Regular"),
    "SpaceMono-Bold.ttf":       ("Space Mono", "Bold"),
    "SpaceMono-Regular.ttf":    ("Space Mono", "Regular"),
}

def apply(path, family, subfamily, check):
    f = TTFont(path)
    cur = {r.nameID: str(r) for r in f["name"].names if r.platformID == 3}
    ok = cur.get(1) == family
    if check:
        print(f"  {'PASS' if ok else 'FAIL'}  {os.path.basename(path):28} family={cur.get(1)}")
        return ok
    if ok:
        print(f"  skip  {os.path.basename(path):28} already {family}")
        return True
    ps = f"{family.replace(' ', '')}-{subfamily}"
    for r in f["name"].names:
        if   r.nameID == 1:  r.string = family
        elif r.nameID == 2:  r.string = subfamily
        elif r.nameID == 4:  r.string = f"{family} {subfamily}"
        elif r.nameID == 6:  r.string = ps
        elif r.nameID == 16: r.string = family
        elif r.nameID == 17: r.string = subfamily
    f.save(path)
    print(f"  fixed {os.path.basename(path):28} {cur.get(1)}  ->  {family} / {subfamily}")
    return True

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    check = "--check" in sys.argv
    d = args[0] if args else "."
    print(("CHECK " if check else "NORMALISE ") + d)
    allok = True
    for fn, (fam, sub) in TARGET.items():
        p = os.path.join(d, fn)
        if not os.path.exists(p):
            print(f"  MISS  {fn} not found"); allok = False; continue
        allok &= apply(p, fam, sub, check)
    if check and not allok:
        print("\nFAIL: brand fonts are not normalised. Renders will drop text on Windows.")
        sys.exit(1)
    print("\nOK" if allok else "\nIncomplete")

if __name__ == "__main__":
    main()
