# The Signal — Masthead Card Standard

**Owner:** Growth (brand/design) · **Producer:** `00_Command_Center/thumbnail_builder.py` `compose_signal()` (builder v1.4.0+, `--signal-only`) · **Surface:** dark-asset (navy `#0a0e17` + mint `#64ffda`, Montserrat ExtraBold / Space Mono / DM Sans) · **Registered:** 2026-08-21 (Al-approved, this session).

The 1200x630 masthead card for **The Signal** weekly newsletter. It is the web-archive image and the social-share preview when an issue's link is posted. Sibling to `OG_Card_Standard.md` (blog/episode OG), same surface and fonts, but a distinct **newsletter** identity, not an episode card.

## Brand architecture on this card (the point of the standard)
- **House lockup = MASTERING OBSERVABILITY** (top-left, MO lens + wordmark). Mastering Observability is the master brand. **"Metrics & Mayhem" must NOT appear here** — that name is reserved for the book and the podcast. The Signal is a newsletter under the house brand.
- **Masthead = THE SIGNAL** with the descriptor **"The weekly observability newsletter"** directly beneath, so it can never be mistaken for the *Signal Drop* podcast or the *Signal Check* segment (the three-name "Signal" family is intentional, but each must always carry its format label).

## Issue numbering (load-bearing)
The Signal is a **continuing publication** (started 21 Feb 2024, 100+ issues). The 2026-08-21 rebrand is **Issue 101**; the counter increments each week. **Never render "01".** `--episode` is the issue number.

## Layout (top to bottom, 60px margins)
1. **House lockup** — MO lens + `MASTERING OBSERVABILITY` (Space Mono, mint), top-left.
2. **Masthead nameplate** — `THE SIGNAL` (Montserrat ExtraBold ~58px, mint) left; `ISSUE NNN · <DD MON YYYY>` (Space Mono, teal) right, aligned to the nameplate's optical centre.
3. **Descriptor** — `The weekly observability newsletter` (DM Sans, grey) under the masthead.
4. **Full-width mint rule** (2px, 35% opacity) — separates the nameplate from the content.
5. **Kicker** — `THIS WEEK'S LEAD` (Space Mono, teal, tracked).
6. **Hero headline** — the week's lead headline (Montserrat ExtraBold, white, uppercased, `/`-broken or wrapped ~20 chars, sized by line count 100/90/76/58, stepped down to fit 1080px), with a mint accent tick beneath.
7. **Footer bar** — `THE SIGNAL • ALLAN MANN` left, `MASTERINGOBSERVABILITY.COM` right; watermark lens bottom-right.

All values live in `CONFIG["signal"]` in `thumbnail_builder.py` (single source of layout truth; no magic numbers in the drawing code).

## How to build it
```
python3 00_Command_Center/thumbnail_builder.py --signal-only \
  --episode <ISSUE_NUMBER> \
  --title "<the week's lead headline>"   # use "/" to force a line break \
  --date "<DD Mon YYYY>" \
  --outdir <issue folder> [--ship]
```
Output: `the-signal_issue-<NNN>_1200x630.png`. Host it in the assets repo at `mo-social-assets/The_Signal/<NNN>_<YYYY-MM-DD>_<slug>/`, let `sync_now.bat` / auto_sync push, then set it as the Beehiiv post thumbnail via the raw.githubusercontent URL.

## QA gate (mandatory, codex §19.6 — two passes)
1. Render at full size and eyeball: house lockup reads MASTERING OBSERVABILITY (not Metrics & Mayhem); masthead + descriptor present; issue number correct and never "01"; headline fits with no overflow; issue/date clears the masthead; nothing collides with the watermark; §5 clean (middot/bullet separators, no em dash).
2. Fresh-eyes second pass (a real second look). Only a pass that finds nothing ships.

First clean render: Issue 101 "Own the Signal, Rent the Platform", 2026-08-21 (two passes + fresh-eyes subagent).

## Where this sits in the MO brand
The dark visual-asset surface (navy + mint + Montserrat/Space Mono), same family as `OG_Card_Standard`, the YouTube thumbnail, and the square episode art. See `Brand_Design_System_v2.md` "three surfaces, one identity".
