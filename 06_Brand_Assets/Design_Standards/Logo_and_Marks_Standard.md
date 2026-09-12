# Logo and Marks Standard v1.0

**Registered:** 2026-09-11 (Growth). **Status:** draft for ratification. **Ruled by Al 2026-09-11:** the ring mark is the identifier.

This standard did not exist. Twenty-five design standards were written and none defined the mark, which is why three motifs ended up in service and were treated as interchangeable. They are not. One identifies, one is furniture, one is texture.

---

## 1. The ring mark — the identifier

Two hairline concentric rings and a solid centre. The lens resolving on a signal. This is the mark of Mastering Observability and the only element that identifies the brand on its own.

**Geometry.** 24 unit square viewBox. Outer ring r10.5, inner ring r6, centre dot r2.4, strokes 1 unit.

**Colour, three versions and no others**

| Version | Rings | Centre | Use |
|---|---|---|---|
| Light | rgba(47,158,141,0.38) | **#17695C** | Any light ground |
| Dark | rgba(116,221,205,0.45) | **#74DDCD** | Any dark ground |
| Mono | **#5A6E72** | **#16282D** | Print without colour, fax-grade reproduction, embroidery |

**Minimum size 24px.** Below that the outer ring closes up and it reads as a blob. Between 24 and 32px the strokes go to 1.2 units so they survive rasterisation.

**Clear space** equals the radius of the inner ring on all four sides. Nothing enters it, including the wordmark it is locked up with.

**Lockup.** Mark left, wordmark right, gap equal to the clear space. The wordmark is MASTERING OBSERVABILITY in Space Mono 700, uppercase, tracking 3px at 12px. On the podcast lane the wordmark is METRICS & MAYHEM at the same treatment.

## 2. The crosshair — furniture

Two rules crossing. It marks a page as ours from the inside. It is never an identifier and never appears alone as a brand signal.

- Top right of document and diagram surfaces only. One per page.
- Drawn as two rectangles, never a typed plus, multiply or dagger glyph. Same no-symbol-glyph rule as the diagram standards.
- Teal **#2F9E8D** on light, **#74DDCD** on dark.
- Does not appear on covers, social cards, slides or video. Those already carry the ring mark or a wordmark.

## 3. The lens wash — texture

A single radial teal wash, and at larger scale the concentric rings bleeding off an edge.

- Dark surfaces only. One per canvas, 10 to 22 per cent opacity.
- Decoration. It carries no meaning, so nothing important sits on it and nothing is read through it.
- **The faint mint grid is retired** (Al, 2026-09-11). It came from the pre-v2.0 dark surface and does nothing the wash does not do better. Producers still drawing it need updating.

## 4. Never

- Recolour the mark outside the three versions.
- Stretch, rotate, outline, emboss or add a shadow.
- Place it on a photograph or any busy ground.
- Crop the outer ring, including by putting it in a container that clips.
- Pair it with a second mark.
- Use the crosshair where the ring mark belongs.
- Rebuild it by hand. Use the SVG.

## 5. Which lockup, which lane

Ruled 2026-09-11 to resolve a live contradiction between this and `The_Signal_Card_Standard.md`.

- **Podcast lane carries METRICS & MAYHEM:** Signal Drop, Tech Tuesday, episode squares, YouTube thumbnails, title cards, series badges, bookends, video cards.
- **Everything else carries MASTERING OBSERVABILITY:** website, email, The Signal, blog and OG cards, carousels, quote cards, diagrams, decks, ebooks.

Tech Tuesday sits inside the podcast brand, not beside it, so it carries Metrics & Mayhem. Its series name lives in the footer, not the lockup.

## 6. Files

SVG is the source. `mo_ring_mark.svg` in `07_Website/Pages/home/` is the current reference; it should move to `06_Brand_Assets/marks/` with the dark and mono variants beside it, which do not yet exist as files.

**Owed:** dark and mono SVG variants, a favicon set, and the locked-up wordmark as an asset rather than live text.

---

**Tokens:** `design-tokens.json`, marks block. **Parent:** `Brand_Design_System_v3.md`.
