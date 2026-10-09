# Long-Form PDF Standard v2.0

**Version:** 2.2. **Status:** ratified 2026-09-11; 2.1 amended 2026-09-23 (template repointed, see section 6); 2.2 amended 2026-09-27 (four archetypes and chart rules, from the vendor ebook review agreed by Design and Long-Form); 2.3 amended 2026-10-05 (six findings from the first two builds on 2.2.0, ruled by Design); 2.3.1 the same day (two section-split regressions and the worksheet, from Long-Form's 2.3.0 re-render); 2.3.2 on 2026-10-06 (compact worksheet, tables whole everywhere, from Long-Form's 2.3.1 re-render). **Supersedes:** v1.0 (2026-06-10) on palette and display face only. **Owner:** Growth.

Covers ebooks, lead magnets, strategy papers and client deliverables. v1.0 was written fourteen days before Brand Design System v2.0 and never repointed, so every token in it was retired. This version changes the colours and the display face. **The layout grammar, pagination discipline, chrome and QA gates of v1.0 all survive intact**: they were the best rules in the file.

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
| Cover title | Montserrat 800 (`type.display.weight`) | 42pt |
| Section heading | Montserrat 800 (`type.heading.weight`) | 18pt |
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

**Cover.** Ring mark and wordmark top left, crosshair suppressed, mono kicker with a teal rule prefix naming the document type, Montserrat 800 title of three to five words with the payoff line in bright teal, lead paragraph, author line, vertical teal band.

**Section opener.** Large ghost numeral, kicker, Montserrat 800 heading, one intro paragraph. No body content.

**Prose page.** Kicker, numbered heading, prose, an optional pull quote with a teal left rule, an optional figure. A body page that is less than three-quarters full is under-set: add content or merge it.

**Figure page.** Figures use the in-body light diagram theme and the arrow grammar, so a figure in the ebook is the same object as a figure in the blog. Caption below in Space Mono, naming what the reader should take from it.

**Closing page.** Numbered actions, then one dark card carrying the single ask. Never two asks.

**At a glance (v2.2).** Side 2 of every ebook, always. The question, at most five findings (each a claim plus one sentence), a contents strip of at most five items, and a "How this was sourced" box at the foot. It replaces a separate contents side, so it adds no side to a signed count. Class `.glance`.

**Evidence (v2.2).** A hero number (Montserrat at the display weight, Space Mono caption) or one or two chart modules, each in a `.fig` card: claim, measure, bars, then a `.source` line. Classes `.hero`, `.fig`, `.bars`, `.source`.

**Framework (v2.2).** A numbered list of at most five cards, each with a mono tag and a one-line bold claim. Closes a section, never opens one. Class `.framework`.

**Field sidebar (v2.2).** The author's first-hand story, labelled FROM THE FIELD, fixed text. Tinted panel with a teal left rule. No client or employer names, because the repo is public. Class `.field`.

**Section openers are light.** The cover is the only dark side; inside, the ask card is the only dark element. At most three openers per ebook.

**When an opener earns its side (v2.3).** Only when the part it opens runs to four sides or more, and only when the side before it can be set at least three-quarters full. If either fails, the part starts in flow with its kicker ("Part two") over the section heading, and no side is spent. A piece under 16 sides takes at most one opener.

**Section split (v2.3).** A section that would leave a side under three-quarters full is marked `.section.split`: kicker, heading and first paragraph in `.head`, which never breaks inside; the rest in `.cont`. A side may end between `.head` and `.cont`: that is the split. Inside `.cont`, panels and figures never split; lists break between items, each item whole. Tables never split anywhere, in any section (2.3.2). This replaces piece-local splitting.

**Worksheet (v2.3, revised 2.3.1 and 2.3.2).** For workbooks and any page the reader writes on. Compact by default (2.3.2): a workbook step is a sentence, so the prompt is bold body type (DM Sans 700, 10pt) with the STEP label inline before it, answer lines 7mm (the floor for handwriting; do not go below it), write-in rows 11mm (`.tall` 16mm). `.worksheet.display` is the large size (Montserrat 12pt prompt, STEP label on its own line, 9mm lines, write-in rows 14mm and 20mm) for a single-prompt tear-out. Inline by default: a panel inside its section, held whole, so the intro, the steps and the read-out after it stay one unit, and it never forces a side. Each `.prompt` is a numbered step (STEP 1, STEP 2, restarting per worksheet), numbered by the template so copy can cite steps by number; never type the number into the prompt. Answers: `.lines` (full width), `.lines.short` (55 per cent, for one-word answers), `.check` (checklist), `table.writein` (sizes above), closing with an optional `.score`. Lines are drawn borders, never typed underscores. `.worksheet.own` starts its own side; use it only for a tear-out that fills three-quarters of a side by itself, so the three-quarters rule always wins. Class `.worksheet`.

### Headings state the claim (v2.2)

A heading is the finding as a sentence, never the name of the topic ("Most of an outage passes before anyone knows", not "Detection"). Two lines at most: about 60 characters at h2, about 40 on an opener. A longer claim is a copy fix, not a smaller size.

### Chart and placement rules (v2.2)

1. Claim, read, chart, source, in that order.
2. Two modules a side, at most.
3. Full text-column width, never floated; no text wraps a chart.
4. A module never splits and never starts in the bottom third of a side; it moves to the next side and the prose closes the gap.
5. On the side where it is first cited, labelled the same in prose and kicker ("Evidence 1.1").
6. No more than three prose sides without a figure; no two hero-number sides in a row.
7. Horizontal bars, sorted, labelled directly, value at the bar end. One highlight bar (`light.teal-deep`): the one the claim names. The rest `light.border`. No axis, gridlines or legend.
8. Banned: pie, donut, 3D, dual axes, stacked bars of more than two parts, legends, and any number without a source line, including the author's own. A derived number says it is derived. A vendor figure is cited, never restyled as our finding; whether a piece uses vendor figures at all is Content's call.

### Series rule (v2.2)

Every framework ebook and the Signal Audit workbook build on these archetypes from the template, not piece-local CSS, so the set reads as one family.

## 6. Production

**Example body (v2.3).** The template's example content is neutral by rule: bracketed placeholders for the field story and the receipts, illustrative figures labelled as such. The repo is public, so the template never carries the author's career facts or a field story; those live with each piece and come from the recorded sources.

**PDF metadata (v2.3).** The template head carries `author`, `description`, `keywords` and `generator` meta tags. Each piece fills description and keywords; WeasyPrint writes all four into the PDF.


WeasyPrint 69 or later, A4 portrait. CSS uses `@page` for chrome and `@page :first` to suppress it on the cover. Colours come from `design-tokens.json` via `mo_tokens.py`; the template holds no hexes.

Output: `[Topic] - [Subject] (MO Branded).pdf`, filed in the relevant project folder. HTML source lives in `templates/long_form_pdf/`.

**Build:** `python render_long_form.py <template>.html --pdf "<out>.pdf"`, from `templates/long_form_pdf/`. Opening a template directly renders colourless by design: colour exists only after resolution. The renderer refuses a template carrying any colour literal (hex, `rgb()`, named; comments are not exempt), any unknown token, any unresolved placeholder, any retired hex, and any output hex that is not a declared token value.

**Cleared 2026-09-23:** `reference_strategy_template.html` repointed (v2.1.0). The Owed line here said 13 retired-token hits; the file measured 51 hex literals across 12 distinct values, plus three `rgba()` literals no count had included. All now resolve by token name; the template greps to zero. Brought to v2.0 in the same pass, because a repoint that kept a dark interior would have been token-clean and still off-standard: interior light, Archivo Black replaced by Montserrat at the token weights, cover crosshair glyph replaced by the ring mark resolved by name, body crosshair drawn rather than typed, 6px card radius on panels. Section opener and closing archetypes added (section 5), since the template had neither and both were needed to prove it.

**Weight note:** section 2 said 900 for the cover title. `design-tokens.json` ruled 800 on 2026-09-14 (no Black face in the estate). Tokens win; the table now names the token rather than a number.

## 7. QA gate

**v2.3 additions:** the PDF carries author, description and keywords metadata, with no template placeholder left; the footer prints one space after every middle dot; no side is under three-quarters full unless it ends a part; no opener stands before a part shorter than four sides.

**v2.2 additions:** every number has a source line; no chart module starts in the bottom third of a side (checked by eye at full size, since CSS cannot enforce it); every heading is a claim of two lines or fewer; side 2 is At a glance.


1. Render the full document and look at every page, thumbnail and full size.
2. No orphaned headings. Every heading travels with at least its first paragraph.
3. Chrome holds. Crosshair on every body page, footer correct, page numbers continuous, ring mark on the cover only.
4. Codex §5. No em dashes, UK English, no AI tells, banlist clean.
5. Figures. Confirmed figures verifiable, illustrative ones labelled, client-confidential redacted with a visible disclaimer.
6. Contrast. Body text clears 4.5:1 against its actual background, per the contrast audit.

Two passes minimum, fresh eyes on the second. Rendering is not shipping.

---

**Parent:** `Brand_Design_System_v3.md`. **Tokens:** `design-tokens.json`. **Figures:** `Diagram_Standard.md`.
