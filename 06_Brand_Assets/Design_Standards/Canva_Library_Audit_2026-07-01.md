# Canva Library Audit: 2026-07-01

**Scope:** all 42 designs in Al's connected Canva, triaged against the current two-surface identity (`Canva_Brand_Kit_Setup.md`).

**Governing finding:** every design predates the v2.0 identity (established 2026-06-23). The most recently touched were February 2026, still pre-identity. So **none are currently on-brand.** The decision for each is not "is it on-brand" (none are) but:

- **REPAINT** if the format is one Canva should own going forward (editorial / human-layout: banners, headers, carousels, decks, covers, backgrounds, animated social) **and** it is still in use.
- **RETIRE** if it is superseded by the code pipeline (blog thumbnails, OG cards, topic cards now come from `mo_visual_kit.js` / `mo_diagram.js`), by a newer canonical asset (the logo SVGs, the v2.0 beehiiv Digest template, the real book cover), or if it is a duplicate or an abandoned experiment.
- **REVIEW** if I cannot classify it confidently from title + size + date; open it and decide (titles are trusted; untitled ones are inferred from dimensions and need your eye).

Basis: title, canvas ratio, page count and last-modified date from the Canva API. Untitled items are classified by dimensions and flagged. Repaint priorities are ordered by how often the asset is seen.

---

## REPAINT (keep the format, restyle to v2.0 / §24.11)

Priority order. For each: apply the Brand Kit, swap fonts to the four brand fonts, repaint to the correct surface palette, and re-check §5 on any text.

1. **LinkedIn profile banner** - `ALLAN MANN` (`DAGKAy7CfFw`) and `Allan Mann` 6-page set (`DAF-KBZk2is`). Your most-seen asset. Repaint to v2.0, keep ONE, retire the rest. Edit: canva.com/d/Xkkmnsk2WvpVhPQ
2. **MO Headers** (`DAGImMRoDwQ`, 4 pages) - reusable header graphics. Repaint to the dark-asset surface. Edit: canva.com/d/8qYPErpuESs8kuk
3. **Animated OD Instagram** (`DAGJNuAvrDA`, 2 pages) - animated social. Repaint if you still post the Digest to Instagram; the animation format is genuinely Canva territory. Edit: canva.com/d/F5jxbbPXaZVPBMz
4. **The AI-drafted deck** - `DAG2xtnW244` ("Slide 1: Hook...", Oct 2025). If this deck is still live, repaint to the Slide System; decks are Canva-appropriate. Otherwise retire. Edit: canva.com/d/DAITI1hGUAY-Plc
5. **Profile / avatar** - `Profile LinkedIn` (`DAF-J6bMBpE`, 2 pages). Repaint the current profile image; note the canonical avatars already exist as `mo_avatar_navy.png` / `mo_avatar_white.png`, so consider replacing rather than repainting.

---

## RETIRE (superseded, duplicate, or dead)

**Superseded by the code pipeline** (thumbnails / OG / topic cards now come from scripts):

- `MO Web Thumbnail` (`DAGLJMFuUio`, 4 pages, OG ratio) - blog/web thumbnails are now `mo_visual_kit.js blogthumb`. Retire.
- `Data Federation` (`DAGfh_qp0lA`) and `OpenTelemetry` (`DAGZaScsme0`) - old topic cards; byte-size posts now carry code-built OG cards. Retire.
- The two untitled Feb-2026 landscape cards (`DAHBeOXhG58` OG ratio, `DAHBNu0kyRM` 16:9) - recent thumbnail/social experiments in a format the scripts own. Retire unless one is a bespoke social card (then Review).

**Superseded by a newer canonical asset:**

- `MO Logo` (`DAF-KHAgm-s`), `Mastering Observability` (`DAGGr1vIB_o`), and the other logo experiments - the logo is now canonical as `logo-master.svg` / `logo-on-dark.svg` / `logo-on-light.svg`. Retire the Canva logo designs; use the SVGs.
- `The Observability Digest` Canva variants (`DAGJZ3VV--Y`, `DAGJCGHLV7k` 3pg, `DAGG4DpNttI` 3pg, `DAGG4IrWZjQ` 3pg, `DAGJCDquris`) - the Digest is now a v2.0 beehiiv template. Retire the Canva email graphics.
- `White and Blue Business Strategy Ebook Cover` (`DAGKA7YMWQg`) - generic template, superseded by the real Metrics & Mayhem cover. Retire.
- Generic stock Zoom/Teams backgrounds (`DAGTJh9WMjM` white minimalist, `DAGTJksvE80` grey corporate, `DAGTJszK4cc` blue/white) - not MO-branded; the workspace already has `Meeting_Backgrounds` / `Studio_Backgrounds`. Retire (or repaint one to an MO background if you want a branded call background).

**Duplicates / abandoned experiments:**

- `Your paragraph text` x2 (`DAGZyaToVss`, `DAGGmJaEde8`) - default-named drafts. Retire.
- `LinkedIn Canva Prfofeil` (`DAF-PxViJME`) - misspelled duplicate of the profile work. Retire.
- The untitled 447x447 square experiments (`DAGG4fYG4Ek`, `DAGG4BJa0z0`, `DAF-KtvMxLM`, `DAF-KkqSWZQ`) and assorted untitled one-pagers from early 2024 (`DAF_wZy5uRo`, `DAF-QnlSlO4`, `DAF-KgoVX-w`, `DAF-KMQX_co`, `DAF-KFfq0GU`, `DAGJiGtJW2I`, `DAGJbFcS4FQ`, `DAGJHjS1MuQ`, `DAGMWyWKUuA`, `DAGMWxiWjG0`, `DAGZHafGwgs`, `DAGKAy7...`) - early experiments. Retire in bulk.

---

## REVIEW (open and decide, ~5 designs)

Open these yourself; you will recognise them instantly. Untitled or ambiguous, but possibly still useful:

- `DAF7RGH9zIw` - an **11-page deck** from Jan 2024. Big enough to be a real presentation. Repaint or retire. View: canva.com/d/T_Nkwiu3QHNzIHW
- `DAHBNu0kyRM` - untitled 16:9, touched Feb 2026 (recent). Could be a live social/YouTube card. View: canva.com/d/_H-_GAw_27zgP75
- `DAGZHafGwgs` (2 pages) and `DAGJHjS1MuQ` (3 pages, "custom") - multi-page, so probably intentional, not scratch. View before retiring.

---

## Recommendation

The library is a 2024 archive with a handful of 2025 to early-2026 touches, none on the current identity. Rather than repaint 42 designs, **repaint the five that earn it** (profile banner, MO Headers, animated OD social, the live deck, the avatar) and **retire the rest**, because the formats they cover are now owned either by the code pipeline (thumbnails, OG, topic cards) or by newer canonical assets (logo SVGs, v2.0 Digest template, the real book cover). That leaves a small, current, on-brand Canva set going forward, governed by the Brand Kit.

Suggested order: build the Brand Kit first (so repaints have something to pull from), repaint the profile banner (most-seen), then work down the Repaint list. I can draft the repaint brief for any one of them, or repaint via the connector where the edit tools allow.

---

**Last updated:** 2026-07-01. Metadata-based audit (title + ratio + page count + date). Untitled items are inferred from dimensions and marked Review where uncertain. Filed to Control alongside the Brand Kit sheet.
