# Design ask: the video and podcast restart. 2026-09-15.

**Context.** The podcast restarts as the Tech Tuesday spine. **First recording 1-3 October, publish
6 October.** Al presents from a live deck on camera. Three producers are on that critical path and
one of them is not the one the brand system thinks it is.

Full plan: §5b of `04_Newsletter_and_Blog/_Briefs/Content_Cadence_and_Slate.md`.

---

## 1. The consumer list names the wrong slide producer. Fix this before anything else.

`Brand_Design_System_v3.md` §11 lists **`Slide_System/mo_slide_template.js`, 8 retired-token hits**.

**That file was superseded on 2026-06-15.** `Slide_Design_System.md` v2.0 says so in terms:

> *"v1.0 (dark master, Archivo Black, `mo_slide_template.js`) is retained only for the existing FAB
> teaser deck. New decks use v2.0."*

**The live v2.0 producer is `08_Revenue/Vendor_Engagement_Toolkit/_deck_source/build_deck.js`, and it
is not on the v3 consumer list at all.** Repointing the listed file would fix a dead artefact kept
for one legacy deck and leave the producer that actually builds decks drifting.

**The video card producer is also absent from the list.**

**ASK: correct §11. Name `build_deck.js`. Add the video card producer. Mark
`Slide_System/mo_slide_template.js` as superseded rather than pending.**

## 2. Repoint `build_deck.js`. It is much closer than the list implies.

Audited against v3 on 2026-09-15:

| | |
|---|---|
| **Retired** | **1 occurrence.** `CREAM = "F5F3EC"`, the cream slide ground. v3 already replaced it with `#F6F8F7`. |
| Already correct | **14 occurrences** on real v3 tokens: `0D2127`, `13313A`, `1C3C45`, `16282D`, `2F9E8D`, `74DDCD`, `EAF6F3`, `D5E0E1`, `FFFFFF` |
| Undeclared near-misses | **9.** `#c9d6d8` against `light.border #C9DCDC`; `#5d6f73` against `light.soft #5A6E72`; `#9fb3b5` against `dark.on-dark-soft #9FB0BD`; `#5fd0c0` sits between `teal` and `teal-bright` |

No Archivo Black. **It hardcodes its palette as constants and does not read the token file.**

**ASK: fold the near-misses into tokens, replace the one retired hex, and make it consume
`design-tokens.json` rather than declaring its own constants.** It emits real `.pptx` via `pptxgenjs`,
which is what makes live presenting possible, so the output format must not change.

## 3. `build_deck.js` has a dead hardcoded path

```js
const ICON_DIR = "/sessions/wizardly-nice-hopper/mnt/outputs/icons";
```

A sandbox path from a past session. **It will break on the first re-run.** Needs to resolve relative
to the brand folder like every other producer.

## 4. `mo_diagram.js` is now on the critical path, not adjacent to it

Already open. Under the live-deck format, **diagrams become deck slides**, so this blocks 6 October
rather than merely being owed. Full colour map was sent on 2026-09-14: 6 distinct retired hexes
across 13 occurrences, plus **14 undeclared colours with no v3 equivalent**, which are mapping
decisions rather than substitutions.

## 5. Still owed from 14 September

`Brand_Design_System_v3.md` §3 and `Logo_and_Marks_Standard.md` §3 still say "never on light" and
"dark surfaces only", against the token file's amended `structure.wash`. Design flagged this as owed
in the token file's own `owed` field. **Three documents currently disagree.**

---

## 6. The deck master spec is COMING SEPARATELY. Do not start it yet.

Al is locking a staging grammar for the Tech Tuesday script this week. It defines the frame states
the deck has to survive, and **the master cannot be specced correctly until those are fixed.**

What is already certain, so you can think about it but not build:

- **16:9 throughout.** The existing v2.0 canvas, 13.3 x 7.5in `LAYOUT_WIDE`, is already correct.
- **The light ground is `#F6F8F7`, not cream.**
- The deck is presented live from PowerPoint and captured in the recording, so **it is a presentation
  artefact rather than a render target.** Output stays `.pptx`.
- It will need to survive **more than one on-screen arrangement from one set of slides**, because Al
  ruled that how he appears against the deck varies by content.

**The precise frame states, safe zones and type floors arrive as a follow-up within the week.**
Everything in sections 1 to 5 and 7 is independent of it and can proceed now.

## 7. NEW: the video card system shrinks to one card type

**Al's ruling, 2026-09-15, and the reason matters.** The four-type card system was ratified on
20 August and **he never used it, because it was too slow. He added cards by hand in the editor
instead.** A standard that exists and is never followed is worse than none, because the process looks
covered when it is not.

Under the live deck, **the deck absorbs FULL CARD and FULL DIAGRAM HOLD** — they become slides,
captured in the recording, zero post-production.

**ASK: amend `Video_Card_System_Standard.md` to a single automated type, LOWER THIRD.** Retire FULL
CARD, FULL DIAGRAM HOLD and CORNER INSERT. The lower third stays automated because name and term
labels are repetitive and mechanical, which is exactly what automation is for.

**And repoint what remains.** The standard is specified on `#0a0e17`, `#64ffda` and `#14a3a8`, all
retired.

---

## Sequence, against a 1-3 October recording

| By | What |
|---|---|
| **19 Sep** | §11 corrected; `build_deck.js` repointed; `ICON_DIR` fixed |
| **26 Sep** | `mo_diagram.js` repointed; video card standard amended to lower-third-only and repointed |
| **26 Sep** | Video deck master specced and one sample deck rendered and reviewed at full size **(spec arrives from Content this week; do not start before it lands)** |
| **30 Sep** | §3 wash amendments applied so the three documents agree |

**If the deck master slips, the 6 October recording still happens** — Al can present from a v2.0 deck
and the cream ground is one hex. **If `mo_diagram.js` slips, the diagram slides ship on the retired
palette**, which on a fifteen-minute video is the most visible drift we have.
