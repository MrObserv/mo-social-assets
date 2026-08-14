# TT04 Thumbnail Design Brief — "Wide Events: What Observability 2.0 Actually Means"

**For:** external image agent (Gemini / Nano Banana). **From:** Podcast Ideas (trio-lock owner).
**Episode:** Tech Tuesday #4, *Wide Events: What Observability 2.0 Actually Means*.
**Primary deliverable:** YouTube thumbnail **1280 x 720 px (16:9)**. Keep key elements centred so it also crops to a 1:1 square and 1200 x 630 OG.
**Style family:** the **Tech Tuesday terminal motif** (NOT the Signal Drop illustrative style). Dark terminal-window aesthetic that reads as the TT franchise.

---

## 1. The idea in one line

Three separate pillars (metrics, logs, traces) collapse and merge into **one wide horizontal record**. The message: stop collecting three fragmented things, store one wide event you can question afterwards.

Congruent with the title and the first two minutes: title says *Wide Events / Observability 2.0*, the analogy is "three witnesses vs one witness who saw the whole thing."

---

## 2. The text (this is the headline)

**Recommended:**
- Big line: **ONE WIDE EVENT** — "ONE" and "EVENT" white, **WIDE** (or the pair **WIDE EVENTS**) in mint (#64FFDA)
- Small kicker (mono): **what observability 2.0 actually means**

**A/B alternate (build as a second version):**
- **ARE THE THREE / PILLARS DEAD?** — "PILLARS" in mint. Same kicker. (Question hook.)

Rules:
- Keep the mint payoff word tied to the keyword: **WIDE EVENTS** is the one mint element on the recommended version.
- Three or four words per line max, huge, legible as a small phone thumbnail. UK English, no em dashes, no episode number, no vendor logos or names.

---

## 3. Brand palette (exact)

| Role | Hex |
|---|---|
| Background navy (base) | `#0A0E17` |
| Navy gradient deep / lower | `#090D15` / `#0F2137` |
| Mint (payoff word, cursor, glow) | `#64FFDA` |
| Teal (secondary accent) | `#14A3A8` |
| White (main text) | `#FFFFFF` |
| Muted grey (kicker, terminal chrome) | `#BFCED6` |

Navy + mint + white only. Do not use amber `#FFD166` or green `#7BD88F` (reserved elsewhere).

**Fonts:** headline **Montserrat ExtraBold** (all caps, tight tracking); kicker + any terminal text **Space Mono**.

---

## 4. Layout and composition (terminal motif)

- **Frame the shot as a terminal window:** subtle window chrome (a top bar with three dots), a faint `>` prompt and a mint block cursor somewhere, a faint mint grid, and the small crosshair-eye lens mark that identifies the TT franchise. Keep it understated, it is texture not clutter.
- **Central visual:** on the left, **three tall thin vertical bars/pillars** clearly separate, faintly labelled or tinted as metrics / logs / traces. They **lean, break and flow to the right into a single long horizontal bar** (one wide row) that spans the frame, glowing mint at its leading edge. The eye should read left-to-right: three fragments becoming one wide record.
- **Text placement:** upper area or upper-left over the darkest navy, high contrast, clear of the pillars-to-row graphic. The mint WIDE EVENTS near the single wide bar so text and image tie together.
- **Focal path:** big white headline, then mint WIDE EVENTS, then the eye follows the three pillars merging into the one wide row.
- **Safe area:** keep text and the core graphic within the centre ~90 percent; leave the bottom-right corner clear (YouTube duration stamp).
- **No headshot** on this one (terminal-motif default). If brand-face consistency is wanted, a small feathered corner cut-out only, full head never cropped, not over the graphic or text.

---

## 5. Image-generation prompt (paste to the image model for the scene)

> A dramatic 16:9 tech thumbnail on a deep navy background (#0A0E17), styled as a dark terminal window with subtle window chrome and a faint mint grid. On the left, three tall thin separate vertical bars in muted tones, clearly fragmented and slightly leaning. They break apart and flow to the right, merging into one single long glowing horizontal bar that stretches across the frame, lit with mint (#64FFDA) light at its leading edge. Clean, minimal, high contrast, cinematic, lots of dark negative space in the upper-left for a headline. Colour palette limited to navy, mint and white. A faint crosshair-eye icon mark, small. No text in the image.

Generate the **scene only, with no text baked in.**

---

## 6. How to add the text (important)

Image models garble letters. Generate the scene from the prompt above with **no baked text**, then overlay the headline as a crisp separate layer in Montserrat ExtraBold (white, with WIDE EVENTS in mint #64FFDA) and Space Mono for the kicker. If the agent must bake text, give it the exact strings in section 2 and check every letter before accepting.

---

## 7. Ship checklist

- [ ] Squint / phone test: headline readable small, WIDE EVENTS pops in mint.
- [ ] Reads as the Tech Tuesday terminal family (distinct from Signal Drop), not a generic tech thumbnail.
- [ ] Congruent with title + the three-witnesses analogy (three pillars merging into one wide row).
- [ ] Only one mint word/pair. Palette navy + mint + white only.
- [ ] Text clear of the graphic and the bottom-right corner; nothing cut off.
- [ ] Spelling correct, UK English, no em dashes, no episode number, no vendor logos or names.
- [ ] Two versions delivered: ONE WIDE EVENT and the A/B alt "Are the Three Pillars Dead?".

---

*External-tool path at Al's direction. The workspace's own producer (`tt_thumbnail_builder.py`, terminal motif) remains the canonical route; if the Gemini output is used, host it in `mo-social-assets/Tech_Tuesday/TT04/` and eyeball it before it ships.*
