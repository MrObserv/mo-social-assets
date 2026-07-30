# Quote Card Standard (v1.0 — LOCKED 2026-06-17)

**Locked.** This is the official quote-card spec for Metrics & Mayhem. The look, sizes, and the generator (`templates/mo_quote_card.js`) are frozen at v1.0. Change them only with a deliberate version bump (v1.1, etc.), the same way the Voice Codex is versioned.

Branded quote cards for social. One generator, one look, every channel. Born from the 2026-06-17 Instagram card for the "panicking room" 4:30am post, which Allan asked to make the standard.

**Locked layout rule:** brand + counter are fixed at the top, the footer is fixed at the bottom, and the eyebrow + quote + accent bar stack as one group centred in the band between them. The quote auto-sizes to fit both width and band height. This guarantees even spacing at any text length and the accent bar never collides with the footer (the bug fixed on 2026-06-17).

Brand source of truth: `06_Brand_Assets` palette and fonts (see `templates/mo_visual_kit.js`). Voice Codex §8.2 (4:30am Thoughts), §8.1.3 (Closing Declarative is the natural card line). House rules still apply: UK English, no em dashes.

---

## The look (locked)

- Background: navy gradient (#0a0e17 to #0e1f35), faint grid, soft mint glow. Same as bookends and thumbnails.
- Type: Archivo Black display for the quote, Space Mono for the labels.
- Top label: `METRICS & MAYHEM` (mint, letter-spaced).
- Eyebrow (optional): the format name, e.g. `4.30AM THOUGHTS` (mint).
- Quote: white, centred, auto-sized to fill the card. The final wrapped line renders in mint (the punch).
- Accent: short mint bar under the quote.
- Footer: `MASTERINGOBSERVABILITY.COM` (grey mono).

## Sizes

| Format | Pixels | Use |
|---|---|---|
| square | 1080 x 1080 | LinkedIn single image, X, fallback everywhere |
| portrait | 1080 x 1350 | Instagram feed, LinkedIn (taller = more feed space), carousel cards |
| pinterest | 1000 x 1500 (2:3) | Pinterest pins |

---

## Generator

Canonical script: `06_Brand_Assets/Design_Standards/templates/mo_quote_card.js`
Runtime: Node + `sharp` (and `pdfkit` for carousel PDFs). The auto-sizer fits the quote to both width and height so text never overflows.

Single card (auto: last wrapped line goes mint):
```
node mo_quote_card.js \
  --line "You cannot debug a system through a panicking room." \
  --eyebrow "4.30AM THOUGHTS" --format all --slug panicking_room --outdir ./out
```
`--format` = `square` | `portrait` | `pinterest` | `all`.

Carousel (pipe-separated cards; last card all-mint; adds an "n / N" counter). Add `--pdf` for the swipeable LinkedIn document post:
```
node mo_quote_card.js \
  --carousel "Setup line|The turn line|The closing punch" \
  --eyebrow "4.30AM THOUGHTS" --slug panicking_room --outdir ./out --pdf
```

Samples live in `06_Brand_Assets/Design_Standards/samples/`.

---

## Standing rule: every 4:30am post ships with a card

From 2026-06-17, the default 4:30am Thoughts deliverable is text plus a portrait card built from the Closing Declarative (the line that already does the work). Pull-quotes from Substantive Nuclears get the same treatment when the close is strong enough to stand alone.

Channels per 4:30am:
- LinkedIn: text post (the full 4:30am) with the portrait card attached, or the square card. Via Buffer.
- Instagram: portrait card + caption (caption = the 4:30am text + IG hashtags). Manual via Chrome extension. Posted at 4:5 crop to keep the whole card.
- X: text post, card optional. Via Buffer.

### Hub-ready step (paste into the daily-ops-hub skill, MODE B)

When Allan approves a 4:30am line (or asks for a card), before posting:
1. Run `mo_quote_card.js --line "<the closing line>" --eyebrow "4.30AM THOUGHTS" --format all --slug <slug> --outdir 05_Social_Media`.
2. Save the cards next to the post draft in `05_Social_Media` (and the episode folder if tied to a Signal Drop).
3. Instagram: upload the portrait card via the extension, caption = 4:30am text + IG hashtags, 4:5 crop.
4. Log the card filenames in the post draft file and the day file.

(The skill file itself is edited in Settings, not from a Cowork session. This block is ready to drop in.)

---

## LinkedIn carousels

Two routes, both supported by the generator:

- Multi-image carousel: post `carousel_<slug>_1..N.png` as a multi-image LinkedIn post (Buffer supports multi-image on LinkedIn). Swipeable, native.
- Document (PDF) post: post `carousel_<slug>.pdf` as a LinkedIn document. LinkedIn gives document posts strong dwell-time reach. Usually a manual upload via the Chrome extension, like Instagram.

Shape: 3 cards as setup / turn / closing punch. Card 1 carries the eyebrow; the last card is all-mint as the payoff. Keep each card to one short sentence so the font stays large. A Substantive Nuclear can run as a 4 to 5 card carousel (hook / reality / lesson / micro-proof / close).

---

## Pinterest

Strong fit: quote cards are native Pinterest content, and unlike LinkedIn it is a search and evergreen engine, so a pin keeps surfacing for months. Each pin should carry a destination link (the podcast hub `[PODCAST_URL]` or newsletter `[NEWSLETTER_URL]` per Codex §26) and sit on a themed board (e.g. "Observability Truths", "On-Call & Incidents", "4.30am Thoughts").

Format: use `--format pinterest` (1000 x 1500).

Channel decision (open, needs Allan): the Buffer Free plan is capped at 3 channels and all three are used (LinkedIn personal, LinkedIn company page, X). To add Pinterest:
- Option A: post Pinterest manually via the Chrome extension (no Buffer change, zero cost, more manual). Recommended to start.
- Option B: upgrade Buffer to a paid tier and connect Pinterest as a 4th channel (scheduled, hands-off).
- Option C: swap a Buffer channel (e.g. drop the company page from Buffer and post it manually) to free a slot for Pinterest. Not recommended; the company page is low effort to keep.

Recommendation: start with Option A (manual pins via extension) to prove the channel, then move to Option B if Pinterest earns its place.

---

## File naming

- Single: `card_<slug>_<format>.png`
- Carousel: `carousel_<slug>_<n>.png` and `carousel_<slug>.pdf`
- Date-prefix when tied to a dated post: `YYYY-MM-DD_<slug>_...`
