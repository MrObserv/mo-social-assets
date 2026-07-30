# Carousel Standard (LinkedIn + Instagram)

**Canonical:** the MO carousel format. Decisions locked by Al 2026-07-04. Same dark-asset brand surface as `Blog_Thumbnail_Standard.md` and `Diagram_Standard.md` (navy `#0a0e17`, mint `#64ffda`, semantic green/amber, Space Mono labels). Producer: `templates/render_carousel.py` (data-driven, one JSON in, N slides out). Samples: the Innovate "three patterns" and Ep 22 "six-week decay" prototypes.

**What it is:** a swipeable multi-slide post, built at 1080x1350 (4:5). One build serves both surfaces: a LinkedIn document (PDF) and an Instagram carousel (images). LinkedIn is primary (that is where the audience is); Instagram is secondary.

---

## Scope: what we carousel (5 buckets)

Carousel only content that is genuinely list, step, or framework shaped and reshapes something already published. Do NOT invent a carousel out of thin narrative.

1. **Episode Hard Stops** - a Signal Drop's Hard Stop + habit as a how-to (problem, why, the drill, CTA).
2. **byte-size explainers** - "What is X" in 5 slides; routes to the byte-size blog. Strong SEO cluster fit.
3. **Event / field takeaways** - conference and customer-event reads (the Innovate "three patterns"). Occasional, high engagement.
4. **Book / framework concepts** - a chapter idea or a named framework; routes hard to the free chapter. Most funnel-forward.
5. **Leadership / motivation picks** - the leadership and high-performance material Allan gathers (the pulled "leadership sentences", No Bullshit Leadership / High Performance notes, the communication-keynote lines). Reshaped into a principle-per-slide carousel. On-turf for the brand's people-leadership lane.

**Do NOT carousel:** single quotes (that is a card), pure narrative or a reactive one-liner (that is a text post or a clip), or anything without a clean multi-part spine. Forcing a story into slides reads padded.

## Cadence

**Two carousels a week (raised from one, Al-approved 2026-07-06), LinkedIn-first, cross-posted to Instagram.** Carousel A = an [OET] bucket (episode Hard Stop / byte-size / event takeaway); Carousel B = an [L&M] bucket (leadership/motivation, principle-per-slide). Built from whichever pieces are best shaped that week. Not one per episode and per blog (that pads weak content); not purely ad hoc (loses the habit). The producer + the mandatory two-pass QA gate are unchanged; only the frequency moved.

---

## Format grammar (fixed)

Every carousel is: **cover → numbered point slides → CTA slide.** 5 to 7 slides total (cover + 3 to 5 points + CTA).

- **Cover:** mono mint eyebrow (source or series) + underline, big white display hook (one line, under ~8 words), grey one-line subtitle, "SWIPE" cue bottom-left, teal brand footer.
- **Point slides:** giant semantic-coloured numeral (`01`..), mono label in the accent colour, bold white headline (under ~8 words), grey body (2 to 3 lines). One idea per slide. If it needs more, it is a blog.
- **CTA slide (the funnel exit, mandatory):** mono mint eyebrow, white headline, a mint pill button, and the URL + "link in bio" line. Routed per the CTA library (Block B / free chapter for informational; the free chapter for book/framework).

## Palette + type

- Dark-asset surface: navy gradient canvas, faint mint grid, mint `#64ffda` eyebrows, teal `#14a3a8` footer, white ink, grey `#9fb0bd` body.
- **Semantic numerals:** green `#7bd88f` = the safe/foundation/fix point, amber `#ffd166` = the problem/caution point, mint = neutral. Use the colour to carry meaning, not decoration.
- **Display font: Montserrat ExtraBold** (locked by Al 2026-07-04; ships today, matches the podcast animations). Labels/eyebrows/footer: Space Mono. Body: DM Sans. (Archivo Black parity with the thumbnails is an optional future upgrade, needs the TTF sourced.)

## SEO (on-platform, not Google)

A carousel is not crawled by search; it is discovered on-platform and it points at the indexed asset. So:

- The **target keyword leads the caption first line**, appears on the cover, and sits in the hashtags. LinkedIn and Instagram both index caption + hashtags.
- The carousel links to the blog or episode, which is what Google indexes. The search equity lives there, not in the slides.

## Funnel

- The **last slide is always the routed CTA**, and the **caption carries a CTA + link** ("link in bio" / the comment link). No carousel ships without the exit. It is a Capture-stage asset.

## Voice, claims, confidentiality

- §5: UK English, no em dashes, no banlist, no alerting vocab. Run `s5_lint.py` on the slide text and the caption.
- §11: **a carousel only reshapes already-published, defensible content** (a blog, an episode, an event Allan attended). No invented facts or numbers. Vendor/stage figures stay framed as claims.
- Confidentiality: public asset. No unconsented customers, no private material, same rules as every public surface.
- Accessibility: alt text on every slide.

---

## Production

```
node/python: python3 templates/render_carousel.py <data.json> <out_dir>
```

The JSON schema: `{cover:{eyebrow,title,sub}, points:[{accent,label,head,body,slug}], cta:{eyebrow,head,button,sub}}`. `accent` is green|amber|mint|teal (semantic). Add 3 to 5 points. Fonts load from `06_Brand_Assets/fonts/` (or `MO_FONTS`).

- **Output location:** the piece's per-post / episode folder (e.g. `03_Podcast/Episodes/NN_*/carousel/` or `04_Newsletter_and_Blog/<date>_<slug>/carousel/`). Never a shared dump.
- **Hosting + posting:** export the slides (and a combined PDF for the LinkedIn document); Al hosts them in the repo; Daily Ops schedules to LinkedIn (document) + Instagram (carousel) via Buffer.

### Upload route (proven end-to-end, Ep 22 dry run 2026-07-04)

- **Host path:** the slides + combined PDF go in `mo-social-assets/Carousels/`. Raw URL pattern: `https://raw.githubusercontent.com/MrObserv/mo-social-assets/main/Carousels/<file>`.
- **Who does what: Claude stages, Al pushes.** Claude writes the files into `Carousels/` but does NOT run git there. The sandbox has no git credential (cannot push) and running git against the OneDrive-synced clone leaves `.git` lock files (`HEAD.lock`, `refs/heads/main.lock`, `objects/maintenance.lock`) that block Al until deleted. So Claude hands Al the `git add` / `commit` / `push` (delete any stale `*.lock` first). After the push, Claude web_fetch-tests each raw URL before staging Buffer.

### Buffer call shape (proven)

- **LinkedIn (document/carousel):** `schedulingType: automatic` — LinkedIn REJECTS `notification`. One `document` asset: `url` = the PDF, `title`, `thumbnailUrl` = slide 1 PNG. Al pastes the first comment (the routed links) on approval.
- **Instagram (carousel):** `schedulingType: notification` or `automatic`. The N image assets in slide order, each with `altText`; `metadata.instagram = {type:"post", shouldShareToFeed:true}`. Caption uses "link in bio".
- Both stage `saveToDraft: true` — nothing publishes without Al approving/scheduling in Buffer.

## MANDATORY brand QA gate (Al, 2026-07-04: "ALWAYS do a quality check and pass for branding")

No carousel ships without this, and it runs twice (two passes, fresh eyes on the second):

1. **Render and OPEN every slide at full size.** Not a sample. Every slide, viewed.
2. **Nothing exits any box or the frame;** even margins, gutters, padding; no ragged or colliding text.
3. **On-brand:** correct palette, fonts, semantic numerals, grid, footer; reads as the same brand as the thumbnails and diagrams.
4. **Structure:** cover + numbered points + a CTA slide present; 5 to 7 slides.
5. **Squint / small test:** the cover hook and each headline read at feed size.
6. **§5 + funnel + SEO on the caption:** `s5_lint` clean; caption leads with the keyword; CTA + link present.

Only a pass that finds nothing ships. Same two-pass discipline as `Diagram_Standard.md`.

---

**Last updated:** 2026-07-04. Created on Al's sign-off of the format after prototypes (Innovate three-patterns + Ep 22 six-week-decay). Scope, cadence, length, font and the brand-QA gate locked. Registration in `00_Design_Standards_Index.md` + the pipeline wiring filed to Control.
