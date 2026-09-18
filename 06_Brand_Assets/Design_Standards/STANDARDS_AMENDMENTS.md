# Standards amendments — drafted 2026-09-14

Three documents now contradict `design-tokens.json`. Drafted from the verbatim
blocks Content Management supplied. **Not applied — I do not have these files.**

Order matters only for the third: it depends on the first two being true.

---

## 1. `Brand_Design_System_v3.md` §3, bullet 4 (line 83)

**Current:**

```markdown
- **One radial teal wash per dark canvas**, 10 to 22 per cent. Never two, never on light.
```

**Replace with:**

```markdown
- **One radial teal wash per canvas**, 10 to 22 per cent. Never two. **20 per cent on dark, 12 per cent on light** — values in `design-tokens.json` `structure.wash`, never hardcoded in a producer. Amended 2026-09-14 by Al, reversing "never on light": the original rule was written before anyone had rendered a light card, and a light card with no wash reads flat. Three alternatives were built and rejected — a flat `tint` field, the `signal_line` motif as the card graphic, and a white panel on `tint`.
```

The other three bullets in §3 are unaffected and stay as they are.

### AND a second place in the same file, which Content's answer missed

Found 2026-09-15 by reading the file directly. **`Brand_Design_System_v3.md`
line 126** carries the dark-only rule a second time, in a different section:

```markdown
- **Lens wash** is texture. Dark surfaces only, one per canvas.
```

**Replace with:**

```markdown
- **Lens wash** is texture. One per canvas, both modes — 20 per cent on dark, 12 per cent on light.
```

Amending line 83 alone leaves the file contradicting itself. Content's answer
quoted §3 accurately but did not sweep the whole document for the rule, and
neither did I — I asked for one paragraph and got exactly one paragraph.

---

## 2. `Logo_and_Marks_Standard.md` §3, bullet 1

**Current:**

```markdown
- Dark surfaces only. One per canvas, 10 to 22 per cent opacity.
```

**Replace with:**

```markdown
- Both modes. One per canvas, 10 to 22 per cent opacity: 20 per cent on dark, 12 per cent on light. Amended 2026-09-14 by Al — see `Brand_Design_System_v3.md` §3.
```

**Bullet 2 stays exactly as written and is now load-bearing.** Content is right
about this: *"Decoration. It carries no meaning, so nothing important sits on it
and nothing is read through it"* is the ratified constraint the light-mode case
rests on. A 12 per cent wash is legitimate precisely because nothing is read
through it. Do not reword it while editing bullet 1.

Bullet 3, the retired mint grid, is unaffected.

---

## 3. `Blog_Thumbnail_Standard.md` — Spec block, rewritten wholesale

Per Content's recommendation, not a one-bullet patch. The current block is stale
in six places: the navy gradient, the retired mint grid, `#64ffda`, `#9fb0bd`,
the lens mark at 40–60 per cent, and a Production line pointing at
`templates/mo_visual_kit.js`, which no longer exists.

**Replace the whole `## Spec` block with:**

```markdown
## Spec

- **Size:** 1200x630. Doubles as the OG image; always set OG title, description and image in Beehiiv. `byte_size` and `monthly_digest` share this canvas via `surface_aliases`.
- **Mode:** light. Writing renders light, because the card and the page it opens are one reading surface. `blog_og` is dual-mode — the dark variant is only for an OG card fronting a non-writing asset. `byte_size` and `monthly_digest` are light only.
- **Canvas:** flat `ground` #F6F8F7 with one radial teal wash in `teal` #2F9E8D at 12 per cent. Dark variant: `dark-ground` #0D2127, wash at 20 per cent. Never two washes. The navy gradient and the mint grid are retired.
- **Eyebrow:** mono caps, `teal-deep` #17695C, letterspaced, top left, preceded by a 70px `teal` rule. **Required. It has no default** — a default that is right for one surface and wrong for four is how the wrong eyebrow ships. TECHNICAL, LEADERSHIP, THE SIGNAL, BYTE-SIZE, THE OBSERVABILITY DIGEST.
- **Title:** display face, `ink` #16282D, left-aligned, 2 lines preferred, 3 maximum. **Use the post's og:title.** Where the headline is long or buries the point, write a distilled line instead: one insight, 12 words or fewer. Card and share preview should say the same thing wherever the headline already is the insight. (Al, 2026-09-14.)
- **Subtitle:** optional, one line, `muted` #3B5257, body face.
- **Footer:** mono caps. Wordmark left in `soft` #5A6E72, domain right in `teal-deep` #17695C. The wordmark is resolved by `lockupFor(surface)`, never typed — blog, byte-size, Digest and newsletter are all house lane and carry MASTERING OBSERVABILITY. Podcast surfaces carry METRICS & MAYHEM.
- **Mark:** ring mark bottom right, resolved by name from the marks manifest with the 40px crossover applied. **Full opacity** — the mark carries its own ring opacity in the file, so a producer opacity double-applies it. The 40–60 per cent rule described the retired lens mark.
- **No:** icons, emoji, stock humans, gradients on text, more than one message.

## Production

`06_Brand_Assets/Design_Standards/producers/mo_visual_kit.js` — the only kit.
`templates/mo_visual_kit.js` and `producers/mo_visual_kit.v3.js` are deleted.

    node mo_visual_kit.js blogthumb --surface <blog_og|byte_size|monthly_digest> \
      --eyebrow "LEADERSHIP" --title "..." [--sub "..."] --out <path>

`--surface` and `--eyebrow` are required and have no defaults. Run
`node mo_visual_kit.js preflight` first; it resolves every font and every mark
and writes nothing.

**Output:** PNG, truecolour, lossless. No `quality` option — in sharp, quality
on a PNG implies `palette: true`, which quantised every card this kit ever
produced to 25–28 colours and banded the wash. Expect 290KB–575KB. 1MB is a
smoke alarm, not a target.
```

---

## Still open, and deliberately not drafted

**The mark size on an OG card.** The producer draws it at 44px on 1200, which
lands near 20px at LinkedIn's render width — under the 24px floor in
`Logo_and_Marks_Standard.md` §1. The mechanism exists (`crossover_px` 40 and a
small variant); the number and the trigger are owed. I am not inventing a
number for a floor someone else ratified.

**The eyebrow vocabulary** is Al's ruling, not Content's to confirm. Winner #6
forces it: `what-is-grafana-alloy` is both technical and a byte-size, so it
wants `TECHNICAL` for the stream or `BYTE-SIZE` for the series and cannot have
both. Same shape as the Tech Tuesday question, where Al chose the stream.

**`mo_diagram.js`** is fourteen mapping decisions, not ten replacements. Each
undeclared colour either folds into an existing token or needs adding via CR.
That is a separate piece of work and should not be attempted as a sweep task.

**`what-is-grafana-alloy` is serving the wrong OG image** — a 2024 asset, while
its evergreen card sits unattached in two folders. Content is attaching it with
the sweep. Worth noting that re-rendering a card nobody is serving would have
looked like success.

---
---

# Addendum, drafted 2026-09-18

Two more documents contradict `design-tokens.json`, found while verifying which
design system The Signal Issue 105 assets were built against. **Not applied.**

**The unusual part, and the reason to trust the direction of the fix: the
artefact is current and the document is stale.** The shipped Issue 105 masthead
card was sampled pixel by pixel before anything below was written. Its painted
palette is `ground` #F6F8F7 (77 per cent), `ink` #16282D, `teal-deep` #17695C
and `soft` #5A6E72, over a radial teal wash whose blend ramp is the long tail of
near-ground values. That is four current v3 light tokens and a light-mode wash,
which is to say **the card has already been migrated to the same v3 light spec
as the blog cards, and only the prose describing it was left behind.** No
retired hex is painted anywhere in it. (One `#E9ECEC` pair of pixels appears on
a glyph edge. Non-contiguous, both neighbours on an antialiasing ramp between
ground and ink, so a blend coincidence rather than a painted element. Checked
rather than assumed, because a retired hex in a shipped card would otherwise be
the headline here.)

So these amendments do not change the card. They make the standard describe the
card that is already shipping.

---

## 4. `The_Signal_Card_Standard.md` — header line, layout block and closing section

Three separate places, all stale in the same direction.

### 4a. The header line (line 3)

**Current:**

```markdown
**Owner:** Growth (brand/design) · **Producer:** `00_Command_Center/thumbnail_builder.py` `compose_signal()` (builder v1.4.0+, `--signal-only`) · **Surface:** dark-asset (navy `#0a0e17` + mint `#64ffda`, Montserrat ExtraBold / Space Mono / DM Sans) · **Registered:** 2026-08-21 (Al-approved, this session).
```

**Replace with:**

```markdown
**Owner:** Growth (brand/design) · **Producer:** `thumbnail_builder.py` `compose_signal()` (builder v1.4.0+, `--signal-only`); see the producer note below, the copy in this repo at `tools/` is NOT it · **Surface:** light. `ground` #F6F8F7 with a 12 per cent radial `teal` wash, `ink` #16282D, `teal-deep` #17695C, `soft` #5A6E72 (Montserrat ExtraBold / Space Mono / DM Sans) · **Registered:** 2026-08-21 (Al-approved) · **Migrated to v3 light:** palette amended 2026-09-18 to match the artefact; `#0a0e17` and `#64ffda` are retired hexes and were removed from this line.
```

**Why:** `#0a0e17` and `#64ffda` are both in `design-tokens.json` `colour.retired`.
A standard is a thing people copy values out of, so a retired hex sitting in a
header line is a retired hex waiting to be pasted into a producer. The mode
change is not cosmetic either: `mode.rule` in the tokens is "writing renders
light... a blog, article, newsletter or any card fronting written material uses
the website palette", and `surface_aliases` now carries `the_signal` to
`og_card` (committed 2026-09-18, auto-sync `94186bd`), whose `dual_mode` default
is light. Three sources agree with the artefact and only this line disagreed.

### 4b. The Layout block, items 1 to 7

**Current** (colour words only; the geometry is unaffected and stays):

```markdown
1. **House lockup** — MO lens + `MASTERING OBSERVABILITY` (Space Mono, mint), top-left.
2. **Masthead nameplate** — `THE SIGNAL` (Montserrat ExtraBold ~58px, mint) left; `ISSUE NNN · <DD MON YYYY>` (Space Mono, teal) right, aligned to the nameplate's optical centre.
3. **Descriptor** — `The weekly observability newsletter` (DM Sans, grey) under the masthead.
4. **Full-width mint rule** (2px, 35% opacity) — separates the nameplate from the content.
5. **Kicker** — `THIS WEEK'S LEAD` (Space Mono, teal, tracked).
6. **Hero headline** — the week's lead headline (Montserrat ExtraBold, white, uppercased, `/`-broken or wrapped ~20 chars, sized by line count 100/90/76/58, stepped down to fit 1080px), with a mint accent tick beneath.
7. **Footer bar** — `THE SIGNAL • ALLAN MANN` left, `MASTERINGOBSERVABILITY.COM` right; watermark lens bottom-right.
```

**Replace with:**

```markdown
1. **House lockup** — ring mark + `MASTERING OBSERVABILITY` (Space Mono, `teal-deep` #17695C), top-left. Resolved by `lockupFor(surface)`, never typed: The Signal is house lane.
2. **Masthead nameplate** — `THE SIGNAL` (Montserrat ExtraBold ~58px, `ink` #16282D) left; `ISSUE NNN · <DD MON YYYY>` (Space Mono, `teal-deep` #17695C) right, aligned to the nameplate's optical centre.
3. **Descriptor** — `The weekly observability newsletter` (DM Sans, `soft` #5A6E72) under the masthead.
4. **Full-width rule** (2px, `teal` #2F9E8D at 35% opacity) — separates the nameplate from the content.
5. **Kicker** — `THIS WEEK'S LEAD` (Space Mono, `teal-deep` #17695C, tracked). Preceded by a 70px `teal` rule, matching the blog-card eyebrow.
6. **Hero headline** — the week's lead headline (Montserrat ExtraBold, `ink` #16282D, uppercased, `/`-broken or wrapped ~20 chars, sized by line count 100/90/76/58, stepped down to fit 1080px), with a `teal` accent tick beneath.
7. **Footer bar** — `THE SIGNAL • ALLAN MANN` left in `soft` #5A6E72, `MASTERINGOBSERVABILITY.COM` right in `teal-deep` #17695C; ring mark bottom-right at full opacity (the mark carries its own ring opacity in the file, so a producer opacity double-applies it).
```

**Two notes on this block.** The lens is gone, not recoloured: v3 replaced the
crosshair and lens treatment with the ring mark as the identifier, and the
sampled card's bottom-right corner carries teal-deep and light-teal blends
consistent with `mo_ring_mark_on_light.svg`, not a lens. And "white" in item 6
was never right on a light canvas; the artefact draws the headline in `ink`.

### 4c. The closing section

**Current:**

```markdown
## Where this sits in the MO brand

The dark visual-asset surface (navy + mint + Montserrat/Space Mono), same family as `OG_Card_Standard`, the YouTube thumbnail, and the square episode art. See `Brand_Design_System_v2.md` "three surfaces, one identity".
```

**Replace with:**

```markdown
## Where this sits in the MO brand

The **light** reading surface, same family as the blog and byte-size OG cards, because the card and the issue it opens are one reading surface. It is NOT in the dark visual-asset family with the YouTube thumbnail and the square episode art; those front non-writing assets. See `Brand_Design_System_v3.md` and the `mode` block in `design-tokens.json`. Token source is `design-tokens.json`, never this file.
```

**Why:** the current text cites `Brand_Design_System_v2.md`, which is a
superseded tombstone whose own first line is "Do not read, cite or edit this
file." A live standard pointing at it is how the retired set keeps finding its
way back in.

---

## 5. `The_Signal/README.md` line 14

**Current:**

```markdown
Cards are built by the canonical thumbnail builder (`00_Command_Center/thumbnail_builder.py`, `compose_signal`), per `06_Brand_Assets/Design_Standards/The_Signal_Card_Standard.md`. Dark navy + mint surface, Mastering Observability house lockup, THE SIGNAL masthead, "The weekly observability newsletter" descriptor, issue number + date, and that week's lead headline.
```

**Replace with:**

```markdown
Cards are built by the canonical thumbnail builder (`thumbnail_builder.py`, `compose_signal`), per `06_Brand_Assets/Design_Standards/The_Signal_Card_Standard.md`. Light `ground` surface with a 12 per cent teal wash, Mastering Observability house lockup, THE SIGNAL masthead, "The weekly observability newsletter" descriptor, issue number + date, and that week's lead headline.
```

Depends on 4 being true. Amend in the same patch or not at all, because a README
and a standard disagreeing is worse than both being stale.

---

## Still open, and deliberately not drafted

**The producer is not where two standards say it is, and the copy that is
reachable cannot build the card.** Stated plainly because it is now a blocker
rather than an irritation:

- `The_Signal_Card_Standard.md` and `Thumbnail_Producer_Routing.md` both name the
  producer as `00_Command_Center/thumbnail_builder.py`, which is a path on the
  `G:` workspace, not in this repo.
- The copy in this repo, `tools/thumbnail_builder.py`, is **`BUILDER_VERSION = "1.3.2"`,
  dated 26 July**. It has **no `compose_signal` and no `--signal-only`**, so it
  cannot render this card at all, and it carries **five retired hexes**:
  `#0a0e17`, `#64ffda`, `#0c1929`, `#0e1f35`, `#14a3a8`.
- Confirmed two ways, through the shell and through the OneDrive-aware file
  reader, because a stale read was the likelier explanation and had to be ruled
  out first. `compose_signal` has never existed anywhere in this repo's history.

So as things stand, anyone rebuilding a Signal card from what is reachable, using
the standard as written, would produce a retired-palette dark card. **The fix is
to bring canonical v1.4.0 into this repo and make it the single copy, not to
maintain two.** A producer that exists twice is a producer that will diverge,
and this one already has, for five consecutive weekly runs.

**Not drafted here** because it is code movement rather than a standards edit,
and because the canonical file was on `G:`, which is not attached to the session
that found this.

**One repo-integrity note, unrelated to brand but found in the same pass.**
`git fsck --connectivity-only` reports a broken link, tree `e71d3687` to missing
tree `2bceabdf`. HEAD is sound, `origin/main` is in sync at 0 ahead and 0 behind,
all 107 commits on `main` walk, and the missing object is not in the 40 most
recent commits, so nothing in normal use is affected. It does make
`git log -S <string> --all` fail partway. This is the exact failure `SYNC.md`
predicts from hosting a git working tree inside OneDrive, and the repair it
names is a fresh clone. Flagging rather than acting.
