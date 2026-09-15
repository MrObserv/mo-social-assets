# 42 — Mark and Font Defect Work Order

**Raised:** 2026-09-14 · **By:** Content Management · **For:** Design (owner), Control (cc)
**Verified against:** `mo-social-assets` @ `7cbb7d3` "Auto sync Mon 09/14/2026 8:36:22"
**Parent:** `Brand_Design_System_v3.md` · `Logo_and_Marks_Standard.md` · `Blog_Thumbnail_Standard.md`

Verified in the cloud container against the public repo, not against `G:`. The device shell
has been down since the 8 September Windows update, the same Plan9 mount failure Control has.

---

## 1. What the sync landed

`06_Brand_Assets/marks/` is present and correct.

| File | Status |
|---|---|
| `marks/mo_ring_mark.svg` | 380 b, byte-identical to `07_Website/Pages/home/mo_ring_mark.svg` |
| `marks/mo_ring_mark_104.png` | 3,019 b, RGBA 104x104 |
| `marks/mo_ring_mark_52.png` | 1,570 b, RGBA 52x52 |

The SVG matches `Logo_and_Marks_Standard.md` §1 exactly: 24 viewBox, rings r10.5 and r6 at
`rgba(47,158,141,0.38)`, centre r2.4 at `#17695C`. No retired hexes.

## 2. What still does not render differently

**Copying the mark in changed nothing about what ships.** Three things are unchanged at `7cbb7d3`:

- `templates/mo_visual_kit.js` line 62 still reads `logo: dark ? "logo-on-dark.svg" : "logo-on-light.svg"`.
  It does not reference `marks/`.
- `06_Brand_Assets/logo-on-light.svg` is still the old eye mark, carrying `#0d7377` and `#2dd4bf`
  (both retired) plus `#0a5c5e` and `#0f3d3f` (not v3 tokens). `logo-on-dark.svg` adds `#64ffda`.
- The six font files still carry the wrong family names.

A card rendered off `7cbb7d3` today is identical to one rendered yesterday.

---

## 3. Design work order, in this order

### D1 — Fonts. This is the blocker.

The font files are not corrupt. Their internal name tables are wrong.

| File | Declared family | Should be |
|---|---|---|
| `Montserrat-ExtraBold.ttf` | `Montserrat Thin ExtraBold` | `Montserrat` |
| `Montserrat-Bold.ttf` | `Montserrat Thin` | `Montserrat` |
| `DMSans-Bold.ttf` | `DM Sans 9pt` | `DM Sans` |
| `DMSans-Regular.ttf` | `DM Sans 9pt` | `DM Sans` |
| `SpaceMono-Bold.ttf` | `Space Mono` | correct already |
| `SpaceMono-Regular.ttf` | `Space Mono` | correct already |

The outlines are genuine ExtraBold. The wrong named instance was exported from the variable font,
so the glyphs say ExtraBold and the label says Thin.

Consequence: `font-family:'Montserrat'` matches nothing. On Linux the renderer substitutes DejaVu,
which is why the sandbox produces a card with words on it. On Windows there is nothing to
substitute, the text is dropped, and the card renders blank at exit code 0. **This is why
installing all six into Windows changed nothing. Windows registered them as "Montserrat Thin".**

**CORRECTED 2026-09-14, after testing the upstream artefact.** An earlier version of this
work order said to re-download from Google Fonts. **That does not fix it.** The upstream files
carry the identical wrong names. Verified by pulling `@fontsource/montserrat@5` and
`@fontsource/dm-sans@5` from npm, which are the Google Fonts binaries: `Montserrat-ExtraBold`
arrives declaring `family = "Montserrat Thin ExtraBold"`, `typographic family = "Montserrat Thin"`,
`postscript = "MontserratThin-ExtraBold"`, with `usWeightClass 800`. This is an upstream Google
Fonts naming defect in the statics generated from the variable font, not a bad export by Design.

**Fix, recommended: normalise the name tables as a scripted build step.**
`normalise_font_names.py` is supplied with this work order. It rewrites name IDs 1, 2, 4, 6, 16
and 17 only. Verified on the repo's own files: of 19 tables in `Montserrat-ExtraBold.ttf`, only
`name` and `head` change; `glyf`, `loca`, `hmtx`, `cmap` and `OS/2` are byte-identical. Because it
is deterministic and checked in, it is a build step rather than a hand edit, which is the same
distinction the no-hand-edited-hex rule draws.

Run `normalise_font_names.py <font-dir> --check` in CI. It exits non-zero if the fonts regress,
which they will every time someone refreshes from Google Fonts.

**Fix, long term: outline the text.** Have the producer convert text to SVG paths before
rasterising. It removes font resolution from the problem entirely, renders identically on every
machine and in CI, and is the only option that cannot silently regress. Bigger change, so it is a
separate CR rather than part of this one.

**Acceptance test.** `fc-list | grep -i montserrat` must print `Montserrat:style=ExtraBold`.
Proven in sandbox: with the name tables normalised, a render of `font-family="Montserrat"` at
weight 900 comes out byte-identical to the real ExtraBold face.

**Two things that are not the fix.**

1. The `@font-face` data-URI embedding added on 14 September **does nothing in this renderer**.
   sharp rasterises through librsvg 2.61.2, which ignores `@font-face` entirely. Proven: the same
   SVG rendered with the faces embedded, without them, and with a deliberately nonexistent family
   produced three byte-identical PNGs. Keep the `throw` (it catches a missing *file*), but it
   cannot catch an unresolved *family*, which is the case that actually produces the blank card.
2. The producer's family string is a quoted CSS list, `'Montserrat','Liberation Sans',sans-serif`.
   Under librsvg a bare family name resolves more reliably than a quoted list. Worth simplifying
   once D1 lands, but it is not the root cause.

### D2 — Dark and mono ring mark variants

Only the light version exists. Per `Logo_and_Marks_Standard.md` §1:

- **Dark:** rings `rgba(116,221,205,0.45)`, centre `#74DDCD`
- **Mono:** rings `#5A6E72`, centre `#16282D`

Until the dark variant exists as a file, `ytthumb` and every dark surface stays on the retired
eye mark even after the light side is fixed.

### D3 — Repoint the producer at `marks/`

`templates/mo_visual_kit.js` line 62. Two routes:

- **(a) Fast.** Replace the contents of `logo-on-light.svg` and `logo-on-dark.svg` with the mark.
  Zero code change, fixes every producer at once. Cost: the filename then lies, and the old eye
  is gone rather than archived.
- **(b) Correct.** Point line 62 at `marks/mo_ring_mark.svg` and its dark equivalent. Needs D2
  done first, or `ytthumb` breaks on a missing file.

**Recommended: (b), sequenced after D2.** Archive the eye files rather than delete them.

### D4 — Extend `assertNoRetired` to cover embedded assets

Today it scans the producer's own source text. The mark arrives base64-embedded at render time,
so the guard passes green while the card ships four retired hexes. That is the same silent-failure
class the font defect is, one file along. The guard should scan any SVG it embeds.

### D5 — The teal wash is being drawn on light canvases

Found on the 14 September QA second pass, while rendering the weekend blog card.

`bgDefs()` in `templates/mo_visual_kit.js` reads:

```js
const op = S.dark ? 0.20 : 0.12;
```

It then draws the radial teal ellipse on **both** modes. Three ratified sources forbid this:

- `Brand_Design_System_v3.md` §3: "One radial teal wash per dark canvas, 10 to 22 per cent.
  **Never two, never on light.**"
- `Logo_and_Marks_Standard.md` §3: "**Dark surfaces only.** One per canvas."
- `design-tokens.json` `usage_rules[3]`: the same sentence, machine-readable.

Every light card off this producer, which under the v3 mode rule is every blog and OG card,
carries a wash that the standard prohibits. It is clearly visible on the render, not a hairline.

**Fix:** suppress the ellipse entirely when the surface is light, rather than lowering its
opacity. A 12 per cent wash and a 0 per cent wash are different renders, but only one of them
is what the standard asks for.

This is Design's line to change, not Content's. It is called out here because it blocks the
weekend card and it will block every light card until it is fixed.

---

## 4. Two lower-priority defects found in passing

- **Canvas size.** `renderPng` passes `density: 96` to sharp, which scales unitless SVG dimensions
  by 96/72. Every card comes out **1600x840** against the 1200x630 mandated by
  `Blog_Thumbnail_Standard.md`. The aspect ratio is exact, so it degrades gracefully, but it is
  off-spec.
- **Mark size on an OG card.** The producer draws the mark at 44px on a 1200 canvas. LinkedIn
  renders an OG at roughly 552px wide, putting the mark at about 20px on screen, below the 24px
  floor in `Logo_and_Marks_Standard.md` §1.

---

## 5. What Control needs to know

1. **The producer cannot run correctly on any Windows workstation until D1 lands.** Control's
   shell has been down since 8 September, so Control could not have caught this. When the shell
   comes back, the font defect would still have produced blank cards. Do not read a restored
   shell as a restored producer.
2. **Two visual kits are live in the tree.** `templates/mo_visual_kit.js` (14 Sep, repointed,
   carries the font work) and `producers/mo_visual_kit.v3.js` (12 Sep, older, no font work).
   Anything invoking the `producers/` path renders without the newer guard. One should be retired
   before someone runs the wrong one.
3. **No card rendered in the last week is brand compliant.** Every thumbnail produced since the
   v3 repoint carries either fallback-face or blank text, or the old eye mark, or both. A re-render
   sweep is owed once D1 and D3 land, scoped by Design.
4. **The weekend blog is unattached and stays that way.** `post_3d02feb7-2641-4b5f-9d2a-ff501526ad44`
   has `thumbnail_url: null`. Nothing will be attached until the card passes on its own merits.

---

## 6. Sequence

```
D1 fonts ---+
D5 wash  ---+--> D2 dark + mono variants  ->  D3 repoint line 62  ->  D4 guard  ->  re-render sweep
```

D1 and D5 are independent of each other and both can start now. Together they unblock the weekend card.
D3 is blocked on D2. The re-render sweep is blocked on D1, D5 and D3.

## 7. Evidence held

Rendered in the cloud container, no file in `G:` or the repo modified:

- Font resolution matrix, nine family-string variants, showing `Montserrat` resolving to DejaVu
- Four-way `@font-face` test, three byte-identical outputs
- Before/after OG card, correct face and correct mark, via `MO_BRAND_DIR` and `FONTCONFIG_FILE` override
- Mark comparison at 300 per cent, old eye against Design's ring mark
- `normalise_font_names.py`, supplied alongside this work order
- Upstream name-table dump from the npm-published Google Fonts binaries
- Card rendered at the mandated 1200x630, showing the prohibited light wash
