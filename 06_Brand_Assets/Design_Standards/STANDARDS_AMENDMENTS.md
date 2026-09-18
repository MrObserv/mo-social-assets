# Standards amendments — APPLIED 2026-09-16

> **STATUS: APPLIED. This is an audit record, not a to-do.**
>
> All four amendments below are live in `main` — verified by reading the repo
> at `709a07d`: `Brand_Design_System_v3.md` lines 83 and 126,
> `Logo_and_Marks_Standard.md` line 42, and the rewritten
> `Blog_Thumbnail_Standard.md` Spec block.
>
> **The "Current" blocks below quote the OLD, RETIRED wording.** They are here
> so the change is auditable. Do not read them as current standards, and do not
> copy text out of them. The live standards are the three `.md` files beside
> this one.

Drafted from the verbatim blocks Content Management supplied, applied 2026-09-16.

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
