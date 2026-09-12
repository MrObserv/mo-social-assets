# Long-Form PDF Standard v2.0

**Version:** 2.0. **Status:** ratified 2026-09-11. **Supersedes:** v1.0 (2026-06-10) on palette and display face only. **Owner:** Growth.

Covers ebooks, lead magnets, strategy papers and client deliverables. v1.0 was written fourteen days before Brand Design System v2.0 and never repointed, so every token in it was retired. This version changes the colours and the display face. **The layout grammar, pagination discipline, chrome and QA gates of v1.0 all survive intact** — they were the best rules in the file.

Tokens: `design-tokens.json`. This file holds no hexes.

---

## 1. Themes

**Light interior, dark cover.** This reverses v1.0's "when in doubt, dark". A twenty-four page dark PDF is unreadable on paper and hostile to a client's printer, which v1.0 half-admitted and then overruled.

- **Cover:** dark mode. The one dark page. Same logic as the deck opener.
- **Interior:** light mode throughout. Body, figures, tables, callouts.
- **No exceptions.** A dark interior page mid-document reads as a printing error.

## 2. Typography

| Role | Face | A4 size |
|---|---|---|
| Cover title | Montserrat 900 | 42pt |
| Section heading | Montserrat 800 | 18pt |
| Body | DM Sans 400/700 | 10pt body, 10.5pt h3 |
| Kicker, footer, table label | Space Mono 700 | 7.5pt kicker, 7pt footer, 8.5pt table label |

Archivo Black is retired. Space Mono carries kickers, matching every other surface.

## 3. Layout grammar (unchanged from v1.0)

- A4 portrait. Margin 14mm top and sides, 16mm bottom; footer chrome lives in the lower margin.
- Single-column body. Three-column grids reserved for the card-row archetype.
- Every body page carries the chrome: crosshair top right (drawn, never a typed glyph), footer left `ALLAN MANN · MASTERINGOBSERVABILITY.COM`, section and page right.
- Cover suppresses the chrome and carries the ring mark, the concentric rings bleeding off the right edge, and a vertical teal accent band on the bottom-left edge.
- Kicker above every section heading. Section numerals in Space Mono paired with the Montserrat heading.

**Changed from v1.0:** panels carry a 6px radius, matching web and deck cards. Sharp corners were a v1.0 idea no other surface kept.

## 4. Pagination discipline (unchanged, and the best rule in v1.0)

**Sections must not split across pages.** A heading orphaned at the foot of a page with its body on the next is the most common and most distracting failure in long-form PDFs. The brand never ships with it.

- `.section { break-inside: avoid; }`
- `h2, h3, .kicker { break-after: avoid; }`
- `html, body { widows: 3; orphans: 3; }`

A section too long for one page gets a forced break before it. Aim for three or four sections per page where density allows; never more than two if any section exceeds half a page.

## 5. Archetypes

**Cover.** Ring mark and wordmark top left, crosshair suppressed, mono kicker with a teal rule prefix naming the document type, Montserrat 900 title of three to five words with the payoff line in bright teal, lead paragraph, author line, vertical teal band.

**Section opener.** Large ghost numeral, kicker, Montserrat 800 heading, one intro paragraph. No body content.

**Prose page.** Kicker, numbered heading, prose, an optional pull quote with a teal left rule, an optional figure. A body page that is less than three-quarters full is under-set: add content or merge it.

**Figure page.** Figures use the in-body light diagram theme and the arrow grammar, so a figure in the ebook is the same object as a figure in the blog. Caption below in Space Mono, naming what the reader should take from it.

**Closing page.** Numbered actions, then one dark card carrying the single ask. Never two asks.

## 6. Production

WeasyPrint 69 or later, A4 portrait. CSS uses `@page` for chrome and `@page :first` to suppress it on the cover. Colours come from `design-tokens.json` via `mo_tokens.py`; the template holds no hexes.

Output: `[Topic] - [Subject] (MO Branded).pdf`, filed in the relevant project folder. HTML source lives in `templates/long_form_pdf/`.

**Owed:** `reference_strategy_template.html` still carries 13 retired-token hits and must be repointed before the next build.

## 7. QA gate

1. Render the full document and look at every page, thumbnail and full size.
2. No orphaned headings. Every heading travels with at least its first paragraph.
3. Chrome holds. Crosshair on every body page, footer correct, page numbers continuous, ring mark on the cover only.
4. Codex §5. No em dashes, UK English, no AI tells, banlist clean.
5. Figures. Confirmed figures verifiable, illustrative ones labelled, client-confidential redacted with a visible disclaimer.
6. Contrast. Body text clears 4.5:1 against its actual background, per the contrast audit.

Two passes minimum, fresh eyes on the second. Rendering is not shipping.

---

**Parent:** `Brand_Design_System_v3.md`. **Tokens:** `design-tokens.json`. **Figures:** `Diagram_Standard.md`.
