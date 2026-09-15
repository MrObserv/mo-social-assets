# 42 follow-up — what is still open with Design

Verified against `mo-social-assets` @ `424839f`, by render, and against `7cbb7d3` from
local git objects. Full detail: `07_Website/08_SEO_Improvement_Plan/42_MARK_AND_FONT_DEFECT_WORK_ORDER_2026-09-14.md`
and `Change_Requests_Inbox/Growth.md` rows GR-2026-09-14-01 through -06.

**Context that raises the stakes since your response:** the weekend leadership blog is now
**published to web**. https://www.masteringobservability.com/p/autonomous-ai-agent-governance-run-mode
Its card is correct and live. Two of the items below are now defects on a published page
rather than on a draft.

Thank you for D1 to D4. The two steps my work order missed — the Windows font store being
what the renderer actually reads, and installed faces being held open so they need new
filenames plus a registry repoint plus a shell restart — were the real fix, and I had
neither. Your normalisation is also correct where mine was not: `ExtraBold` does not belong
in name ID 2, and folding it into the RIBBI family is the right call.

---

## P1 — BLOCKING. Two items, one of them introduced by the fix.

### 1. `assertFonts` now rejects the repo's own correctly-normalised fonts

`mo-tokens.js` greps raw `fc-list` output:

```js
var re = new RegExp(family.replace(/ /g, '\\s*') + ':style=' + style, 'i');
```

For `Montserrat` / `ExtraBold` that is `/Montserrat:style=ExtraBold/`. Under the correct
RIBBI naming fontconfig prints:

```
Montserrat-ExtraBold.ttf: Montserrat,Montserrat ExtraBold:style=ExtraBold,Regular
```

Parallel comma lists. That literal substring never occurs. **The regex encodes the old
non-compliant naming, so the gate now fails precisely because the fonts were fixed properly.**

`assertFonts` runs at module load (`mo_visual_kit.js:58`), so `node mo_visual_kit.js blogthumb`
throws before rendering anything. On Windows there is no `fc-list`, the guard returns
`{skipped}`, and everything works.

**Net effect: the pipeline works on Windows and is hard-broken on Linux and CI — the mirror
image of the bug we started with. The `--check` step meant to run before the sweep cannot run.**

**This is now the only P1 blocker, since D5 turned out to be a standards change rather than a fix.**

**Fix, proven in a sandbox copy and reverted:** query fontconfig instead of grepping it.

```js
var hit;
try { hit = req('child_process').execSync('fc-list ' + JSON.stringify(family + ':style=' + style),
      { encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }); } catch (e) { hit = ''; }
if (!hit.trim()) missing.push(family + ' ' + style);
```

Verified: `fc-list "Montserrat:style=ExtraBold"` returns 1 match, `"NoSuchFamily:style=Bold"`
returns 0. With that one substitution the render completes and is correct.

Also update `fonts.acceptance` in `design-tokens.json` — it still states the old expectation,
`fc-list | grep -i montserrat prints Montserrat:style=ExtraBold`, which is no longer true of a
correctly named file.

### 2. D5 — **REVERSED BY AL. The producer is right and the STANDARD is wrong.**

Al, 2026-09-14: **he wants the teal glow on light cards. Without it the card reads flat.** So the
wash stays, and **`bgDefs()` needs no change at all.** Do not "fix" it.

What this actually is: **a ratified rule now contradicts a ratified design decision, in three
places at once.** All three must change together or this becomes exactly the drift that produced
the two-tree problem.

- `Brand_Design_System_v3.md` §3 — "One radial teal wash per dark canvas. **Never two, never on light.**"
- `Logo_and_Marks_Standard.md` §3 — the lens wash is "**Dark surfaces only.**"
- `design-tokens.json` `usage_rules[3]` — the same sentence, and this is the one producers load.

**Under §1 governance this is a MINOR with a changelog row and a version bump, not a silent edit.**
Record the old value before applying, per the five steps.

**Proposed wording, for you to sharpen:** one radial teal wash per canvas, in either mode. Dark 10
to 22 per cent, light 10 to 14 per cent. Never two. Nothing important sits on it and nothing is read
through it.

#### The contrast constraint that has to go in with it — **measured, not asserted**

v3 §9 requires contrast to be measured on any colour change, and a wash over the ground is a colour
change for anything sitting on it. Measured off the shipped 1200x630 card: unwashed ground is
`rgb(246,248,247)`, and the **most-washed true ground is `rgb(224,236,234)`**, a shift of 22/12/13.

| token | on clean ground | on washed ground | |
|---|---|---|---|
| ink | 14.31 | **12.62** | passes AA body |
| muted | 7.78 | **6.86** | passes AA body |
| teal-deep | 6.13 | **5.40** | passes AA body |
| soft | 5.04 | **4.44** | **drops below 4.5** |
| semantic-high | 5.07 | **4.47** | **drops below 4.5** |
| semantic-low | 5.00 | **4.40** | **drops below 4.5** |
| teal | 3.08 | 2.71 | fails, but teal is already graphic-only on light |

**The three that drop below AA are exactly the three that 3.1.0 fixed.** The 3.1.0 changelog
records soft `#63797D`, caution `#A8720B` and safe `#2F9E57` being replaced with `#5A6E72`,
`#8F6109` and `#237A45` precisely to clear 4.5:1. **They clear it on clean ground by 0.5 and the
wash puts all three back under.** So the wash silently undoes that fix wherever those tokens meet it.

**On the current card nothing is harmed** — ink, muted and teal-deep carry the title, subtitle and
eyebrow, and the footer's soft text sits below the wash. But that is the layout being lucky, not a
rule protecting it.

**So the rule to add: no `soft`, `semantic-high` or `semantic-low` text on the wash.** Either state
it as a constraint, or cap the light wash low enough that all three still clear 4.5. Then re-run
`Contrast_Audit_2026-09-11.md` and add the washed-ground column, because the audit currently only
measures against flat grounds and therefore cannot see this at all.

---

## P2 — now live on a published page

### 3. `mo_diagram.js` is still unrepointed, and a diagram off it is published

It is item 1 on the v3 consumer list with 10 retired-token hits and it has never been repointed.
The four-rungs diagram in the published post was rendered off it, so **it carries the retired
pre-v3 palette on a live page.**

Two separate problems in that one figure:

- **Palette.** Needs the repoint, then a re-render of that diagram.
- **Hosting.** The figure is `data-is-uploaded="false"` and hotlinks
  `https://raw.githubusercontent.com/MrObserv/mo-social-assets/main/MO%20Diagrams/somebody-turned-it-on_four-rungs_1200x680.png`.
  It is serving, but `raw.githubusercontent.com` is not a CDN, it is rate-limited, and the live
  post breaks if the repo goes private or the file moves. The thumbnail was uploaded to Beehiiv's
  own CDN; the diagram was not. Worth a standing rule that in-body images are uploaded, not hotlinked.

---

## P3 — two items you returned to yourselves

### 4. Mark size floor on an OG card

Needs a number chosen. The producer draws the mark at 44px on a 1200 canvas; LinkedIn renders an
OG at roughly 552px wide, putting it near 20px, under the 24px floor in
`Logo_and_Marks_Standard.md` §1. The manifest now carries a `crossover_px` of 40 and a small
variant, so the mechanism exists — it is the number and the trigger that are owed.

### 5. Re-render sweep — **Al has now scoped it**

**Six evergreen winners only.** Ruled 2026-09-14. This is a deliberate narrow exception to
`Brand_Design_System_v3.md` §3 "Shipped assets are not retrofitted", on the grounds that the rule
was written for hex changes and blog cards underwent a full mode flip from navy to light. The rest
of the archive is left alone and self-corrects. **Please note the exception in §3** so the next
person does not read the sweep as a breach of the rule.

Sweep is blocked on items 1 and 2 above.

---

## P4 — Al's rulings from 14 September that need landing in the files

### 6. Lockup lanes: two surfaces are in neither lane

Ruled: **the Observability Digest, The Signal and byte-size all carry MASTERING OBSERVABILITY.**

`the_signal` is already in `lockup.house_lane`. **`byte_size` and the Digest are in NO lane**, and
`lockupFor()` throws on an unlisted surface. Please add `byte_size` and `monthly_digest` to
`lockup.house_lane`.

Careful with the names: **`the_signal` is the newsletter, house lane. `signal_drop` is the podcast,
podcast lane.** One word apart, opposite wordmarks. The ruling covers the newsletter only.

### 7. The architecture is a hierarchy and the canonical file says it is two lanes

Al, 14 September: Tech Tuesday and Signal Drop sit under **Metrics & Mayhem**; The Signal, byte-size
and blogs sit under **Mastering Observability**; and **Metrics & Mayhem sits underneath Mastering
Observability.** Parent and child, not siblings.

This is already written down in `The_Signal_Card_Standard.md` — *"Mastering Observability is the
master brand. 'Metrics & Mayhem' must NOT appear here, that name is reserved for the book and the
podcast."* But v3.1.0 flattened it: `Brand_Design_System_v3.md` §6, `Logo_and_Marks_Standard.md` §5
and `design-tokens.json` `lockup.rule` all describe two parallel equal lanes with no parent.
**The file that declares itself canonical is the one that lost the hierarchy.**

Please restate all three as a hierarchy, and keep the prohibition explicit: Metrics & Mayhem does
not appear on a house asset.

**One open question for Al, worth settling before the sweep:** the two wordmarks are currently
mutually exclusive and there is **no endorsement anywhere** — podcast assets carry METRICS & MAYHEM,
a format badge, and no reference to the parent at all. Should the hierarchy stay organisational, or
should podcast assets carry a small endorsement? It changes every YouTube thumbnail, episode square,
title card, bookend and video card.

### 8. `blogthumb` hardcodes its own lockup and routes around the guard

`blogthumb()` calls `T.lockupFor("blog_og")` literally, so every card through it returns MASTERING
OBSERVABILITY whatever the card actually is. A byte-size or Digest card gets the right answer for
the wrong reason and **never reaches the throw that exists to stop a surface defaulting into a
wordmark.** Please pass the real surface key.

### 9. Eyebrow vocabulary, and a default that should not exist

Proposed, for Al to confirm: technical blog **TECHNICAL**, leadership blog **LEADERSHIP**, newsletter
**THE SIGNAL**, byte-size **BYTE-SIZE**, digest **THE OBSERVABILITY DIGEST**.

**More important than the words: make `--eyebrow` required rather than defaulted.** It currently
defaults to `THE OBSERVABILITY DIGEST`, which is correct for one surface and wrong for the other
four. A silent default that is right once and wrong four times is the same failure class as the font
fallback that produced the blank card. A missing eyebrow should fail the render, not guess.

### 10. Card title rule

Al ruled **"insight where it earns it"**: headline verbatim by default, a distilled line when the
headline is long or buries the point.

`Blog_Thumbnail_Standard.md` currently mandates "one insight, 12 words max" and the live WebMCP card
obeys it — it reads *"Synthetic monitoring assumes a user with eyes"*, not the blog's title. The v3
producer takes `--title` verbatim and cannot tell the difference, so the rule now depends entirely on
whoever types the command.

Please amend the standard to the discretionary wording, and add the choice as a visible line in
`BLOG_PUBLISH_QA_GATE.md` §4 — a prompt, not a pass/fail gate, since Al ruled it a judgement call.

---

## One correction to the record, not to the fix

Two of the corrections in your response describe work done **after** the commit the work order was
written on. Verified at `7cbb7d3` from local git objects:

- **`Design_Standards/marks/` did not exist.** Only `06_Brand_Assets/marks/` with three files — which
  is where Al said he had copied them, and where `Logo_and_Marks_Standard.md` §6 said they should go.
- **The `marks` block had keys `[identifier, ring-mark, crosshair, lens-wash, retired]` and no
  `canonical_dir` or manifest of any kind.** There was no manifest to resolve by.
- **`assertRenderClean` appeared zero times in `mo-tokens.js`.**

All three exist at `424839f` and are good work. Raised only so the method lesson attaches to the
right thing. **The forward rule — resolve a mark by name from the manifest, never by walking the
tree — is correct and adopted.**

---

## Confirmed fixed, verified by render

Canvas now **1200x630 natively** (density 72). Ring mark resolved by manifest name with the 40px
crossover. `assertRenderClean` present and called from inside `renderPng` so it cannot be skipped.
Single producer home at `producers/mo_visual_kit.js`. Fonts normalised in `06_Brand_Assets/fonts`.
Tokens at **3.1.1**, `type.display.weight` 800 with the rationale recorded.

---

## ADDENDUM — two rulings from Al, 2026-09-14. **One of them is a DEFERRAL, please read it first.**

### Retrofit scope is final and narrow: the six evergreen winners. Nothing else.

**That is the whole sweep.** No podcast retrofit, no wider blog archive, no "while we are in there".
The rest of the archive is left alone and self-corrects as new content accumulates. Please note the
exception in `Brand_Design_System_v3.md` §3 so the next person does not read the sweep as a breach of
the no-retrofit rule.

### Podcast endorsement: ruled IN, but **deferred. Do not spec it now.**

Al has ruled that podcast assets will carry a small endorsement of the parent brand — METRICS &
MAYHEM stays primary, a small MASTERING OBSERVABILITY endorsement joins it. **But the podcast and
YouTube lanes are paused, and he wants the endorsement designed and trialled as and when that work
restarts, on new assets, not now and not retroactively.**

**Recording it here so the ruling is not lost, and so nobody spends a day on it this week.**
When the lane restarts, these are the four things the ruling does not settle:

1. **Form** — wordmark, domain, or both.
2. **Placement** — podcast furniture is already dense (wordmark, format badge, headshot, divider,
   `> tech_tuesday` prompt, `TUE` chip, series wordmark). There is no obviously empty corner.
3. **Size floor** — YouTube thumbnails are the highest-stakes surface and are viewed smallest, near
   168px wide in a browse grid, where "small" becomes noise. **Same class as the open ring-mark floor.**
4. **`Logo_and_Marks_Standard.md` §4 forbids pairing the ring mark with a second mark.** A podcast
   asset would carry ring mark plus METRICS & MAYHEM plus endorsement. That clause needs amending, or
   the endorsement needs defining as type rather than as a mark. **This one is worth noting in the
   standard now**, as a flagged contradiction, even though the spec waits.

---

## PRIORITY ORDER, per Al: **blogs are the main priority right now.**

Read the numbered items above in this order. Everything here is blog-facing except where noted.

| | Item | Why it is where it is |
|---|---|---|
| **1** | `assertFonts` regex (P1.1) | Blocks every render outside Windows, so it blocks the sweep and all blog cards. |
| **2** | D5 wash, now a STANDARD change (P1.2) | Al reversed it: the wash stays, three ratified files must change to permit it, plus a contrast constraint. Producer needs no edit. |
| **3** | `mo_diagram.js` repoint + in-body image hosting (P2.3) | The QA gate requires a light in-body diagram on every conviction blog, so the blog cadence depends on this producer. Currently unrepointed and shipping the retired palette on a live page. |
| **4** | Blog title rule + `BLOG_PUBLISH_QA_GATE.md` §4 prompt (P4.10) | Directly governs every blog card from the next one onward. |
| **5** | Eyebrow required, not defaulted (P4.9) | Same. A default that is right once and wrong four times. |
| **6** | Lockup lanes: add `byte_size`, `monthly_digest` (P4.6) | Both currently throw. Blocks byte-size and Digest cards. |
| **7** | `blogthumb` surface key (P4.8) | Routes around the lockup guard. |
| **8** | Ring-mark size floor on OG (P3.4) | Blog OG cards on LinkedIn render the mark near 20px against a 24px floor. |
| **9** | Six evergreen winners sweep (P3.5) | Blocked on 1 and 2. |
| **10** | Brand hierarchy restatement (P4.7) | Record correction, no render impact. |
| — | Podcast endorsement | **Deferred. See addendum.** |
