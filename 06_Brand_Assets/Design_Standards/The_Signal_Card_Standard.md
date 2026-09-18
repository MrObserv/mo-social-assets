# The Signal — Masthead Card Standard

**Owner:** Growth (brand/design) · **Producer:** `00_Command_Center/thumbnail_builder.py` `compose_signal()` (builder v1.5.0+, `--signal-only`) · **Surface:** `the_signal`, house lane, **light only** · **Canvas:** `signal_masthead`, 1200x630 · **Registered:** 2026-08-21 · **Rewritten against v3:** 2026-09-18

The masthead card for **The Signal** weekly newsletter. It is the web-archive image and the social-share preview when an issue's link is posted. Sibling to `OG_Card_Standard.md`, same canvas and fonts, but a distinct **newsletter** identity, not an episode card.

**This document names tokens, never hexes.** For a value, run `node producers/mo_visual_kit.js tokens` or read `design-tokens.json`. A hex written here is a hex that drifts.

## 1. Brand architecture on this card

- **House lockup = MASTERING OBSERVABILITY.** Mastering Observability is the master brand. **"Metrics & Mayhem" must NOT appear here** — that name is reserved for the book and the podcast. The Signal is a newsletter under the house brand.
- The producer resolves the wordmark through `lockup_for("the_signal")` rather than reading a config string, and that call **raises** for a surface in neither lane. A literal wordmark in a config block is a literal somebody edits.
- **Masthead = THE SIGNAL** with the descriptor **"The weekly observability newsletter"** directly beneath, so it can never be mistaken for the *Signal Drop* podcast or the *Signal Check* segment. The three-name Signal family is intentional, but each must always carry its format label.

**The name trap, stated because it has caught people.** `the_signal` is the NEWSLETTER and is house lane. `signal_drop` is the PODCAST and is podcast lane. One word apart, opposite wordmarks.

## 2. Light, and light only

Ruled by Al 2026-09-18.

The Signal is **writing**, and writing renders light: it takes the website palette, so the card and the page it opens are one surface. Ground, ink, teal-deep, soft, tint and border are the light tokens; the single radial teal wash sits at `structure.wash.light`.

**The dark masthead is RETIRED, not a variant.** Issues 101 to 105 shipped dark and are not re-rendered. `the_signal` is deliberately absent from `mode.dual_mode`, so `variant_for("the_signal", "dark")` raises — the surface cannot drift back by passing a flag.

Two role changes fall out of the mode, and they are the only places where the dark card's colour logic does not simply carry over:

- **The nameplate takes ink, not the accent.** On dark it was the bright accent because that was the only bright value available. On light the nameplate is the loudest thing on the card, so it takes ink, and teal is kept for the rule and the accent tick.
- **The wordmark takes soft.** On light it is furniture; teal there would compete with the nameplate for the eye.

Measured on the light ground: ink 14.31:1, teal-deep 6.13:1, soft 5.04:1. All over their floors.

## 3. Issue numbering (load-bearing)

The Signal is a **continuing publication** — first issue 21 Feb 2024, over 100 before the rebrand. The 2026-08-21 rebrand is **ISSUE 101** and the counter increments weekly, every Friday. **It never restarts, and "01" is always wrong.**

**The number is arithmetic, not memory.** Anchor plus cadence gives it: 101 on 2026-08-21, so 2026-09-18 is 105. Corroborated independently at 102 on 2026-08-28 by a live LinkedIn first comment. Two fixed points and a weekly cadence, so a wrong number is a calculation error, not an opinion.

**One vocabulary: `ISSUE NNN`.** Nameplate and eyebrow alike (Al, 2026-09-18). The OG-card eyebrow template is `THE SIGNAL · ISSUE {issue}` in `copy.eyebrow_vocabulary`; `NO. NNN` was drafted the same day and is now a banned render for this surface.

**The gate.** `--episode` is the issue number and is **required**. `eyebrow_for("the_signal", n)` raises below the 101 anchor, on a non-integer, and on a missing value, and the composer asserts the token template still says ISSUE — so the masthead and the eyebrow cannot diverge silently. Before 2026-09-18 none of this was enforced anywhere: the rule was written in this document and no producer read it.

## 4. Layout (top to bottom, 60px margins)

1. **House lockup** — ring mark plus `MASTERING OBSERVABILITY` in Space Mono, soft, top left. The mark is resolved by NAME from the marks manifest with the 40px crossover applied; **never by filename**, because a search of the brand folder returns marks that predate the ring mark.
2. **Masthead nameplate** — `THE SIGNAL` in Montserrat ExtraBold, ink, left; `ISSUE NNN  ·  <DD MON YYYY>` in Space Mono, teal-deep, right, aligned to the nameplate's optical centre.
3. **Descriptor** — `The weekly observability newsletter` in DM Sans, soft.
4. **Full-width rule** in teal — separates nameplate from content.
5. **Kicker** — `THIS WEEK'S LEAD` in Space Mono, teal-deep, tracked.
6. **Hero headline** — the week's lead, Montserrat ExtraBold, ink, uppercased, `/`-broken or wrapped, sized by line count and stepped down to fit, with a teal accent tick beneath.
7. **Footer bar** — `THE SIGNAL • ALLAN MANN` left, `MASTERINGOBSERVABILITY.COM` right, watermark ring mark bottom right.

The canvas is a flat ground plus **one** radial teal wash. Not a gradient, not a grid, not a glow — all three were retired by v3 as concepts, not merely as values.

All layout values live in `CONFIG["signal"]` in the producer: single source of layout truth, no magic numbers in the drawing code. All colour values come from `design-tokens.json`; the producer declares none.

**Known divergence.** This standard and the design-system page draw the footer as a hairline rule; the producer keeps its existing filled band, now in `tint`. Changing the band is layout work, not a repoint, and is unresolved.

## 5. How to build it

```
python 00_Command_Center/thumbnail_builder.py --signal-only \
  --episode <ISSUE_NUMBER> \
  --title "<the week's lead headline>"   # use "/" to force a line break \
  --date "<DD Mon YYYY>" \
  --outdir <issue folder> [--ship]
```

Output: `the-signal_issue-<NNN>_1200x630.png`. Host it in the assets repo at `mo-social-assets/The_Signal/<NNN>_<YYYY-MM-DD>_<slug>/`, let `auto_sync.bat` push, then set it as the Beehiiv post thumbnail via the raw.githubusercontent URL.

The builder runs `assert_no_retired` against its own source on every invocation, so a retired value cannot come back — including as a comment documenting its own removal.

## 6. QA gate (mandatory, codex §19.6 — two passes)

1. Render at full size and eyeball: the card is **light**; house lockup reads MASTERING OBSERVABILITY, not Metrics & Mayhem; the mark is the ring mark, not the eye; masthead plus descriptor present; issue number correct, never "01"; headline fits with no overflow; issue and date clear the nameplate; nothing collides with the watermark; §5 clean (middot separators, no em dash).
2. **Fresh-eyes second pass** — a real second look. Only a pass that finds nothing ships.

**Prove the gates fire, once, after any change to the producer.** A gate that cannot fail is theatre:

```
python 00_Command_Center/thumbnail_builder.py --signal-only --episode 1 --title X --date "25 Sep 2026" --outdir .
python 00_Command_Center/thumbnail_builder.py --signal-only --title X --date "25 Sep 2026" --outdir .
```

The first must refuse issue 1 as below the anchor. The second must refuse the missing `--episode`. If either writes a PNG, the gate is not wired.

**Acceptance for the PNG is colour type, not file size.** Byte 25 of the file must be `2` or `6`; `3` means indexed, which means a quantising producer is still in use.

## 7. Changelog

### 2026-09-18 — rewritten against v3
Surface moved to **light only** and the dark masthead retired. Issue numbering became enforceable rather than merely written down: `--episode` is required and gated against the 101 anchor, and `ISSUE NNN` is the single vocabulary. Producer repointed onto `design-tokens.json` via `mo_tokens.py`, so this document stops describing a palette and starts naming tokens.

Three defects are recorded here because this document asserted correct behaviour that nothing implemented:

- It described the dark-asset surface and named two retired hexes in its own header, so following it produced an off-palette card.
- It named `--episode` as the issue number and the never-01 rule, and no producer validated either.
- It pointed at a producer that resolved its logo by filename and therefore embedded the retired eye mark on every render.

This document was also **not in the repo tree** while all of the above was true, so none of it surfaced in the standards audits that swept the rest of `Design_Standards`.

### 2026-08-21 — registered
First clean render: Issue 101 "Own the Signal, Rent the Platform", two passes plus a fresh-eyes subagent.
