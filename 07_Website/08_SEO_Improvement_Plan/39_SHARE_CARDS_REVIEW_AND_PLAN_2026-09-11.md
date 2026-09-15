# Share cards: the Claude Design card reviewed, what we need, and the first card (Home), 2026-09-11

**Written by:** the website build satellite, a Claude Code session on Al's PC.

**Asked by Al in session:** "review the card design and what we need based on the new designs and do the first one".

**Status:** all eight cards are live, approved by Al and set on 2026-09-11 (`40_` §1 and §2).

## 1. What the Claude Design system specifies

**Source.** The Claude Design project "Metrics & Mayhem brand overview", file `MO Design System.dc.html`, read on 2026-09-11 through the DesignSync connector. It is not yet ratified.

**Mode rule** (Al chose C):
- Light is the brand.
- Dark (mode B) is used only where the asset sits inside someone else's dark app: YouTube, podcast art, video, deck dividers.
- Blog and OG share cards are C.
- LinkedIn carousels and quote cards are C, with "a teal-tinted panel behind the card so it does not dissolve into the feed".

**The "Blog and OG card" component, 1200 × 630:**
- **Kicker:** a 70px teal rule, then Space Mono 700 at 22px with 6px tracking.
- **Title:** Montserrat 900 at 78px; two lines preferred, three at most; 12 words or fewer.
- **Sub:** optional; DM Sans at 28px; one line.
- **Footer:** the house lockup on the left, the domain and ring mark on the right, above a hairline.
- **Never:** icons, emoji, stock humans, gradient text, two messages.
- **QA:** shrink it to 300px wide; the title must stay legible, with one message and a recognisable brand.

**Where the file stands.** It draws the component in mode B (navy #0D2127, teal-bright #74DDCD, grey #9FB0BD), and says the components are rebuilt once the mode is ruled. That rebuild had not happened when it was read.

## 2. How the first card turns that into mode C

Every size and spacing value from the component is unchanged. The only structural addition is a 28px tinted surround.

| Element | Mode B, as drawn | Mode C, this card | Where the value comes from |
|---|---|---|---|
| Background | navy #0D2127, teal wash at 22% | tint #EAF6F3 surround; ground #F6F8F7 card with a 1px #C9DCDC border and 6px corners; teal wash at 16% | token table; the LinkedIn rule; the radius rule; glow allowed at 10 to 22% |
| Kicker | #74DDCD | teal-deep #17695C, with the rule in teal #2F9E8D | token table |
| Title | white | navy #0D2127, second line in teal-deep, as in the Home H1 | token table; Home hero |
| Sub | #9FB0BD | muted #3B5257 | token table |
| Footer | hairline at 22% on dark; lockup #9FB0BD; domain #74DDCD | 1px #C9DCDC hairline; lockup in soft #63797D; domain in teal-deep | token table |
| Ring mark | dark variant | light variant, as in the site nav | nav mark |
| Graphic | none | the signal line from the Home hero, lower right, with the breach in caution #A8720B | the motif rule: "Use it as the graphic on cards that need one" |

**Files:**
- `07_Website/Pages/brand/og_cards/og_home.html`, the source;
- `07_Website/Pages/brand/og_cards/og_home_1200x630.png`, rendered by headless Chrome at 1x, 193 KB.

## 3. QA

- **Size:** 1200 × 630, exactly.
- **Small-size test:** shrunk to 300px wide, the title reads, there is one message, and the brand is recognisable. Pass.
- **Copy:** all taken from approved site wording (the Home hero and the Home share text). No em dashes.

## 4. What we need

**Page share cards.** Mode C, from this template, one per page. Each is set as the page's `facebook_image_url` and `x_image_url`. Kickers and titles take the share text Al approved in `38_`.

| # | Page | Kicker | Title | State |
|---|---|---|---|---|
| 1 | Home | Vendor-neutral · Weekly since 2024 | Own the signal. Rent the platform. | live, set 2026-09-11 |
| 2 | Subscribe | The Signal · every Friday | One email a week. No vendor pitch. | live, set 2026-09-11 |
| 3 | Archive | The archive | Everything, in public. | live, set 2026-09-11 |
| 4 | Advisory | Observability advisory | An outside read, at a fixed fee. | live, set 2026-09-11; replaced the old card |
| 5 | Podcast page | Metrics & Mayhem · the podcast | One lesson, one habit, no theatre. | live, set 2026-09-11 |
| 6 | Book | Metrics & Mayhem · the book | A CTO's guide to observability that actually works. | live, set 2026-09-11 |
| 7 | Free chapter | Chapter 4 · free | Who owns what when it breaks. | live, set 2026-09-11 |
| 8 | Metrics & Mayhem | Metrics & Mayhem | The book and podcast for IT leaders. | live, set 2026-09-11 |

Also: use the Home card as the site-wide fallback, so no page shares with the Advisory card again.

**Post-level assets.** These belong to the producers, through a change request to Growth, not to this satellite:
- the blog and OG card per post, in the mode C version of this component (`thumbnail_builder.py` v1.4.0 is canonical, plus `tt_thumbnail_builder.py` for Tech Tuesday and the `blogthumb` template in `mo_visual_kit.js`);
- the Signal masthead per issue, under its own rules: house lockup only, a descriptor, and the issue number;
- LinkedIn carousels and quote cards, mode C with the tinted panel;
- mode B stays for YouTube thumbnails, podcast episode art and video cards.

## 5. Next steps

1. **Review.** Al approves the Home card or asks for changes.
2. **Home.** Upload the card to beehiiv's media library and set it as Home's `facebook_image_url` and `x_image_url`. This is live the moment it is saved, and needs Al's yes.
3. **The other pages.** Build the remaining seven cards from the same source in one pass, for Al to review as a set, then set them.
4. **Back into the design file.** Put the mode C card into the Claude Design file so the producers take it from one source. That is a MINOR change under the file's own governance: a CR id into the Growth inbox, the old value recorded, applied there first, then the producers. It needs Al's OK, because it writes to his Claude Design project.
