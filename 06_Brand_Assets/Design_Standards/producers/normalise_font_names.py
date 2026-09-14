#!/usr/bin/env python3
"""normalise_font_names.py — fix the name tables on the MO brand static TTFs.

WHY THIS EXISTS
---------------
The static TTFs Google Fonts generates from the Montserrat and DM Sans variable
fonts declare the wrong family in their `name` table. Measured:

    Montserrat-ExtraBold.ttf   family "Montserrat Thin ExtraBold"   usWeightClass 800
    Montserrat-Bold.ttf        family "Montserrat Thin"
    DMSans-Bold.ttf            family "DM Sans 9pt"
    DMSans-Regular.ttf         family "DM Sans 9pt"
    SpaceMono-*.ttf            family "Space Mono"                  already correct

This is an UPSTREAM defect, verified against the binaries published as
@fontsource/montserrat@5 and @fontsource/dm-sans@5. Re-downloading does not fix
it — there is no clean copy to fetch.

The consequence is the dangerous kind of failure. `font-family:'Montserrat'`
matches nothing, so on Linux the renderer substitutes a fallback and on Windows
there is nothing to substitute: the text is DROPPED and the card renders
flawless and completely wordless, at exit code 0.

WHAT IT CHANGES
---------------
Name IDs 1, 2, 4, 6, 16 and 17 only. Nothing else. The outlines are genuine and
are not touched: of the nineteen tables in Montserrat-ExtraBold.ttf, only `name`
and `head` differ after a run, and `head` only because fontTools recomputes
checkSumAdjustment and the modified timestamp on save. glyf, loca, hmtx, cmap
and OS/2 come out byte-identical.

WHY IDs 16 AND 17 MATTER, which is the whole trick
--------------------------------------------------
IDs 1 and 2 can only express the four RIBBI styles — Regular, Bold, Italic,
Bold Italic. A weight like ExtraBold has no legal home there, which is why
generators put something odd in ID 1 in the first place. The typographic pair,
IDs 16 and 17, exists for exactly this case. fontconfig and Pango prefer it, so
setting 16="Montserrat" / 17="ExtraBold" is what makes `fc-list` report
`Montserrat:style=ExtraBold` and makes a bare family request resolve.

USAGE
-----
    py normalise_font_names.py <dir> [<dir> ...]     rewrite in place
    py normalise_font_names.py --check <dir> ...     report only, exit 1 on drift

--check is the standing gate. THIS REGRESSES EVERY TIME ANYONE REFRESHES THE
FONTS, because the upstream files are wrong at source. Run it before any render
sweep.

Requires: py -m pip install fonttools
"""

import sys
import os

try:
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("fontTools not installed. Run:  py -m pip install fonttools")

# The intended identity of each file, stated explicitly rather than parsed out
# of a filename. A table you can read against the standard is worth more than
# clever inference, and this is the same table as the work order's.
#
#   (typographic family, typographic style, RIBBI family, RIBBI style, weight)
#
# RIBBI style must be one of Regular/Bold/Italic/Bold Italic. For a weight that
# is not one of those, the convention is to fold it into the RIBBI family name
# and leave the RIBBI style as Regular, then carry the true weight in 16/17.
TARGETS = {
    "Montserrat-Black.ttf":      ("Montserrat", "Black",     "Montserrat Black",     "Regular", 900),
    "Montserrat-ExtraBold.ttf":  ("Montserrat", "ExtraBold", "Montserrat ExtraBold", "Regular", 800),
    "Montserrat-Bold.ttf":       ("Montserrat", "Bold",      "Montserrat",           "Bold",    700),
    "Montserrat-SemiBold.ttf":   ("Montserrat", "SemiBold",  "Montserrat SemiBold",  "Regular", 600),
    "Montserrat-Regular.ttf":    ("Montserrat", "Regular",   "Montserrat",           "Regular", 400),
    "DMSans-Bold.ttf":           ("DM Sans",    "Bold",      "DM Sans",              "Bold",    700),
    "DMSans-Medium.ttf":         ("DM Sans",    "Medium",    "DM Sans Medium",       "Regular", 500),
    "DMSans-Regular.ttf":        ("DM Sans",    "Regular",   "DM Sans",              "Regular", 400),
    "SpaceMono-Bold.ttf":        ("Space Mono", "Bold",      "Space Mono",           "Bold",    700),
    "SpaceMono-Regular.ttf":     ("Space Mono", "Regular",   "Space Mono",           "Regular", 400),
}

# Write every record on both platforms a TTF is expected to carry them for.
# (platformID, platEncID, langID)
PLATFORMS = [(3, 1, 0x409), (1, 0, 0)]


def ps_name(family, style):
    """PostScript name: ASCII, no spaces, family-style."""
    fam = family.replace(" ", "")
    sty = style.replace(" ", "")
    return "{}-{}".format(fam, sty)


def intended(filename):
    t = TARGETS.get(filename)
    if not t:
        return None
    typo_fam, typo_sty, ribbi_fam, ribbi_sty, weight = t
    # ID 4 (full name) always carries the style, including "Regular". That is
    # the Google/Adobe convention, and the first version of this script got it
    # wrong: it dropped "Regular", which would have rewritten
    # SpaceMono-Regular's already-correct full name for no benefit. Touching a
    # font that resolves correctly is risk bought with nothing.
    full = "{} {}".format(typo_fam, typo_sty)
    return {
        1: ribbi_fam,
        2: ribbi_sty,
        4: full,
        6: ps_name(typo_fam, typo_sty),
        16: typo_fam,
        17: typo_sty,
    }, weight


def current(font, nid):
    for plat, enc, lang in PLATFORMS:
        rec = font["name"].getName(nid, plat, enc, lang)
        if rec:
            return str(rec)
    rec = font["name"].getDebugName(nid)
    return str(rec) if rec else None


def process(path, check_only):
    filename = os.path.basename(path)
    spec = intended(filename)
    if spec is None:
        return None  # not a brand face; ignore silently

    want, want_weight = spec
    font = TTFont(path)
    drift = []

    for nid in sorted(want):
        have = current(font, nid)
        if have != want[nid]:
            drift.append((nid, have, want[nid]))

    # usWeightClass is reported, never rewritten. It is a real typographic
    # property and a wrong one is a different defect from a wrong label — if
    # this disagrees, the file is not the face its name claims and replacing
    # the name would hide that.
    have_weight = font["OS/2"].usWeightClass
    weight_note = None
    if have_weight != want_weight:
        weight_note = (have_weight, want_weight)

    if not drift and not weight_note:
        print("  OK       {}".format(filename))
        font.close()
        return False

    for nid, have, wanted in drift:
        print("  DRIFT    {} name[{}]  {!r} -> {!r}".format(filename, nid, have, wanted))
    if weight_note:
        print("  WEIGHT   {} usWeightClass {} but the name says {} "
              "(NOT rewritten — see comment)".format(filename, have_weight, want_weight))

    if check_only:
        font.close()
        return True

    if drift:
        for nid, _have, wanted in drift:
            for plat, enc, lang in PLATFORMS:
                font["name"].setName(wanted, nid, plat, enc, lang)
        font.save(path)
        print("  WRITTEN  {} ({} records)".format(filename, len(drift)))
    font.close()
    return True


def main(argv):
    check_only = "--check" in argv
    dirs = [a for a in argv if not a.startswith("--")]
    if not dirs:
        sys.exit(__doc__)

    any_drift = False
    seen = 0
    for d in dirs:
        if not os.path.isdir(d):
            sys.exit("not a directory: {}".format(d))
        print("{}:".format(d))
        names = sorted(f for f in os.listdir(d) if f.lower().endswith(".ttf"))
        if not names:
            print("  (no .ttf files)")
        for f in names:
            r = process(os.path.join(d, f), check_only)
            if r is None:
                print("  skip     {} (not a brand face)".format(f))
                continue
            seen += 1
            any_drift = any_drift or r
        print("")

    if seen == 0:
        sys.exit("no recognised brand faces found. Expected files named like: " +
                 ", ".join(sorted(TARGETS)[:3]) + ", ...")

    if check_only and any_drift:
        print("CHECK FAILED: name tables drifted. This regresses on every font refresh.")
        return 1
    print("check clean: every brand face declares its correct family."
          if check_only else "done.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
