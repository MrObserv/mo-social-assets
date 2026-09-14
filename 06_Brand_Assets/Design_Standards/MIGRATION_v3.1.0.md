# v3.1.0 Migration — what has to happen for this to be real

**Written 2026-09-11.** Response to the five-gap review. The review's closing line is the correct diagnosis: *stating a single-source rule does not create one.* This file is the list of copies to delete.

Nothing here is optional. Until item 1 is done, v3 is a document.

---

## 1a. mo_visual_kit.js token map — FILLED, measured 2026-09-12

**Reordered to first.** It ships blog and OG thumbnails weekly; `mo_diagram.js` blocks nothing. Every ratio below is measured, not estimated.

### The seven

| Producer token | Current | Maps to | Basis |
|---|---|---|---|
| `navy` | `#0a0e17` | **dark-ground** `#0D2127` | Confirmed. Only ever used as gradient stop 0. |
| `navy2` | `#0c1929` | **dark-ground** `#0D2127` | Gradient stop 0.6. **Not a surface token.** |
| `navy3` | `#0e1f35` | **dark-ground** `#0D2127` | Gradient stop 1.0. **Not a surface token.** |
| `teal` | `#0d7377` | **teal-deep** `#17695C` | Confirmed. Badge fill; white-on-it improves 5.62 → 6.54. |
| `mid` | `#14a3a8` | **on-dark-soft** `#9FB0BD` | Footer label only in this file. 5.41 → 7.45. |
| — | — | — | *Light-mode equivalents for the companion variant come from the same map, light column.* |
| `mint` | `#2dd4bf` | **teal** `#2F9E8D` | Secondary accent. Does **not** collide. |
| `bright` | `#64ffda` | **teal-bright** `#74DDCD` | Primary accent. |

### The three navies are one gradient, not three surfaces

All three appear **only** inside `bgDefs()`, as the stops of a single diagonal `linearGradient`. Nothing else in the file references them. Measured as a ramp they are 1.00 → 1.09 → 1.16 against each other — below the threshold of visible difference on a screen, let alone a feed thumbnail. They were never a three-step surface system; they were one subtly tinted background.

v3 mode B is a flat `dark-ground` plus one radial teal wash. **All three collapse to `dark-ground` and the gradient retires.** Nothing perceptible is lost, because there was nothing perceptible there.

### mint and bright do not collide — the review's assumption was wrong, and the truth is better

The review assumed both retire into `teal-bright` and that a working distinction would be lost. Reading the use sites, they carry a **real two-step accent hierarchy**:

- `bright` = primary accent — eyebrow, YT subtitle, dark-figure accent bar, bookend wordmark.
- `mint` = secondary accent — rules, CTA labels, the crosshair, the YT underline bar.

That hierarchy survives, mapped onto v3's own two accent steps:

| | old pair | v3 pair |
|---|---|---|
| primary | `#64ffda` 15.49:1 | `#74DDCD` 10.26:1 |
| secondary | `#2dd4bf` 10.37:1 | `#2F9E8D` 5.06:1 |
| **separation** | **1.49×** | **2.03×** |

**The hierarchy gets stronger, not weaker.** 1.49× was a weak distinction doing hierarchy work it could barely carry; 2.03× is legible at thumbnail size. Both v3 values clear AA on `dark-ground`. Nothing is lost and the thing the review was right to protect is the thing that improves.

`mid` is the one genuine judgement call. Other standards call it a *structural accent*; in this file its only job is the footer label. Mapped on **observed use, not on the label in another document** — so `on-dark-soft` here. Where `mid` is a structural rule in `mo_diagram.js` or `render_carousel.py`, it maps to **teal** `#2F9E8D`. One producer token, two v3 tokens, because it was doing two jobs.

### Also retiring in this file, not in the review's list

| Token | Current | Maps to | Note |
|---|---|---|---|
| `grid` | `#64ffda` @ 0.022 | **deleted** | Faint mint grid, already retired by ratified reversal. |
| `glow` | `#64ffda` @ 0.05 | **teal** `#2F9E8D` @ 0.16 | v3: one radial teal wash, 10–22%. |
| `grey` | `#9fb0bd` | **on-dark-soft** `#9FB0BD` | Same value, now named. |
| `FONT.display` | Archivo Black | **Montserrat 900** | Retired face. |

### ⚠ A new AA failure, found while measuring

The light-figure set in this file was never audited. Six values, none in the token file:

| Token | Hex | On white | Verdict |
|---|---|---|---|
| `ink` | `#1a1a1a` | 17.40 | Pass → **ink** `#16282D` (15.27) |
| `greyDark` | `#666666` | 5.74 | Pass → **soft** `#5A6E72` (5.37) |
| `label` | `#6c7a82` | **4.43** | **FAILS AA** → **soft** `#5A6E72` (5.37) |
| `axis` | `#c2c9cc` | 1.68 | Non-text → **border** `#C9DCDC` |
| `gridLine` | `#e9ecec` | 1.19 | Non-text → **hairline** `#DCE7E5` |
| `greyLight` | `#cccccc` | 1.61 | Bar fill → **border** `#C9DCDC` |

**`label #6c7a82` is below 4.5:1 and is the axis-and-data-label colour on every light figure shipped to date** — book figures, print PDFs, lead magnets. Unlike `#5f6d75`, which passed and was left alone, this one does not.

**Owed decision (Al):** re-render the affected light figures, or accept and fix forward. My read: fix forward for anything already in the book, re-render everything else, because the fix is a palette swap and the figures rebuild from data.

### The repoint changed a behaviour, and it should have

`og_card` is **not** in `mode.dark_surfaces`. Under v3's rule — *light unless the asset renders inside someone else's dark chrome* — **the blog and OG card is a light asset.** The pre-v3 producer drew everything dark, including this.

`mo_visual_kit.v3.js` no longer decides. Both commands call `T.modeFor()`, so blog/OG renders light and YouTube renders dark **because the token file says so**. Change the rule there and the producer follows without an edit. That is the difference between a producer that reads tokens and a producer that had its palette swapped.

**Check this one before you commit.** It is a visible change to weekly output: your blog cards go from navy to the website's ground. It follows your own answer — light is the website palette, dark is for someone else's dark chrome — but it is the first asset where that ruling bites, so look at one before it ships.

### Two things the repoint exposed

**`teal-deep` is light-only, and the dark surface needs it.** The YT badge is a filled chip with white text. White clears AA on `teal-deep` (6.54:1) but fails on `teal` (3.28:1), and the dark set has no `teal-deep`. It is one teal ramp, arbitrarily split across two mode blocks. The producer references `T.light["teal-deep"]` with the reason in a comment. **Owed CR: promote `teal-deep` to a shared token.**

**`lockupFor()` now throws on an unknown surface** instead of defaulting to the house wordmark. A silent default is how a podcast asset ends up carrying the wrong brand. Which wordmark an asset carries is a decision, so an unlisted surface is an error.


## 1. Make one producer consume the token file

**Do `templates/mo_visual_kit.js` first** — it emits the retired palette onto live weekly output. `mo_visual_kit.v3.js` in `producers/` is the repointed file: same CLI, same output sizes, zero hexes. Diff it, commit it over the original **in the repo**, run `node mo_visual_kit.js blogthumb --title "..."` and compare against last week's card.

Drop `producers/mo-tokens.js` beside it, then:

```js
const T = require('./mo-tokens.js');

// Delete the DARK and LIGHT palette objects entirely. Replace with:
const PAL = { dark: T.dark, light: T.light };

// At the top of the build, before anything renders:
T.assertNoRetired(require('fs').readFileSync(__filename, 'utf8'), 'mo_diagram.js');
```

That last line is the point. The build fails if a retired hex is still in the file, so the sweep cannot be half-done and forgotten. Add the same two lines to every producer as it is repointed.

**Python producers:** `from mo_tokens import T`, then `T.light["teal-deep"]`, `T.size("episode_square")`, `T.lockup_for("tech_tuesday")`, `T.duration("cold-open")`. Same assert: `T.assert_no_retired(open(__file__).read(), "thumbnail_builder.py")`.

| Producer | Hits | Order |
|---|---|---|
| `templates/mo_visual_kit.js` | 2 named + 10 undocumented | **1st — ships weekly blog and OG output** |
| `templates/mo_diagram.js` | 10 | 2nd |
| `templates/long_form_pdf/reference_strategy_template.html` | 13 | 3rd — blocks the first ebook |
| `Slide_System/mo_slide_template.js` | 8 | 3rd |
| `templates/mo_visual_kit.js` | 2 | 4th |
| `tools/thumbnail_builder.py` | 2 | 5th |
| `templates/mo_quote_card.js` | 1 | 6th |
| `templates/render_arch_kit.py` | 1 | 7th |

## 2. Resolve the two trees — Al's decision, and the biggest one here

`mo-social-assets` mirrors `06_Brand_Assets` in full and has none of v3. **It is the tree Buffer pulls from, so every published asset currently renders from the retired palette.** Updating one copy of a mirrored system is the exact failure v3 was written to stop, and I did it.

**Recommendation:** `06_Brand_Assets` is canonical. `mo-social-assets` becomes a publish target written by a sync step and never hand-edited. Until that sync exists, every v3 file has to be copied to both, which is the hand-synced twin problem at repo scale.

This needs a CR and a decision before any producer work, because otherwise item 1 gets done twice or, worse, once.

## 3. Strip palettes from the twelve per-asset standards

v3 line 7 says they stop carrying palettes. Twelve still do, `Diagram_Standard.md` heaviest at 10 hexes. Replace each palette block with:

> **Tokens.** This standard holds no colour values. See `Brand_Design_System_v3.md` and `design-tokens.json`. Producers read the token file; if a value you need is not in it, that is a CR, not a local definition.

Keep every production rule, QA gate and output path. Only the hexes go.

## 4. Long_Form_PDF_Standard_v2.md

Written. It exists now. v3's "supersedes in full" has been corrected to "supersedes on palette and display face", which is what was meant and what line 7 requires.

## 5. #5f6d75

Measured 5.01:1 on ground against soft's 5.04:1 — indistinguishable, same job, same grounds. **Folded into soft and added to the retired block.** It passed AA, so **the twelve shipped light diagrams are not re-rendered and the 2026-09-01 acceptance holds.** Remove it from `Diagram_Standard.md` and `mo_diagram.js` as part of item 1.

Same treatment for **#16333B**, an undocumented ghost-numeral navy, folded into dark-motif.

## 6. The two small ones

- `Slide_Design_System.md` is indexed at `../Slide_System/` now, not as a bare filename.
- `07_Website/Web_Design_Best_Practices.md` is named as superseded on tokens and has not been stamped. Add the supersession line and strip lines 65 to 70.

---

## The rule this review produced

**A single-source rule is not created by stating it. It is created by deleting the copies and making the build fail when one comes back.**

That is why `assertNoRetired` exists and why it belongs in every producer's build, not in a checklist. A QA point a human has to remember is the same class of thing as a hand-synced Canva kit.
