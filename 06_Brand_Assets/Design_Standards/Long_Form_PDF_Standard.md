# Mastering Observability: Long-Form PDF Standard v1.0

**Created:** 2026-06-10. The brand's PDF document language for client engagement deliverables, strategy papers, lead magnets and any multi-page printed or distributed document. Sits alongside the slide system (`../Slide_System/Slide_Design_System.md`): same tokens, different layout grammar. First implementation: the [REDACTED CLIENT] enterprise observability strategy sent to FAB on 2026-06-10.

## Principles

Same as the slide system. Calm authority. Evidence over slogans. No AI tells. No em dashes. UK English. Confirmed figures only, paired with window and scope where relevant. Long-form PDFs are designed for the seat across from the desk, the print tray and the boardroom, not the back row of an auditorium. Density rises, motif quietens, hierarchy carries.

## Themes

**Dark (master).** Background navy `#0A0E17`. Panels deep teal `#0F2B2D`, secondary panels `#0C1929`, borders `#0F3D3F`. Ink `#E8E8E8`, muted text `#A8D8EA`, faint chrome `#7F94A8`. Accents: teal `#0D7377`, mid `#14A3A8`, mint `#2DD4BF`, bright mint `#64FFDA`. Amber `#FFD166` reserved for gates, warnings and single-point emphasis.

**Light (variant).** Same tokens, light substitutions per the slide system. Use light for bank boardroom prints where projector contrast is not the controlling variable and toner economy matters.

**Default to dark for the brand-forward consultancy posture, light for bank-printer hostility. When in doubt, dark.**

## Typography

Same family as the slide system. PDF generation does embed fonts properly, so the brand fonts ship in the file rather than mapping to portable substitutes.

| Role | Brand font | Sizes (A4) |
|---|---|---|
| Display / cover title | Archivo Black | 42pt cover, 18pt section heading |
| Body | DM Sans | 10pt body, 10.5pt h3 |
| Labels / mono | Space Mono | 7.5pt kicker, 7pt footer, 8.5pt table label |

## Layout grammar

- Canvas A4 portrait. Margin 14mm top and sides, 16mm bottom (footer chrome lives in the lower margin).
- Single-column body. Three-column grids reserved for the year-card archetype.
- Every body page carries the chrome: crosshair `+` mark top right in mint `#2DD4BF`, footer `ALLAN MANN · MASTERINGOBSERVABILITY.COM · PREPARED FOR [CLIENT]` left in Space Mono muted chrome, `STRATEGY · [page]` right in Space Mono muted chrome.
- Cover suppresses the chrome and carries the brand mark, concentric ring motif bleeding off the right edge, and a 8mm vertical teal accent band on the bottom-left edge.
- Kicker (mono caps, mid teal) above every section heading. Section numerals (`01`, `02`) in Space Mono bright mint, paired with the Archivo Black heading.
- Panels are sharp-cornered rectangles with 1px borders. Feature cards carry a 2.5pt mint top accent bar. Pull quotes carry a 2.5pt mint left border. Amber callouts carry a 3pt amber left border.
- Tables use the deep teal panel background, mono caps headers in bright mint, body rows in white-ink. Gate-style labels in mono amber, day-phase labels in mono mint.

## Pagination discipline (the rule the FAB strategy needed)

**Sections must not split across pages.** A heading orphaned at the foot of a page with its body on the next page is the most common, most distracting visual failure in long-form PDFs. The brand never ships with this failure.

In WeasyPrint and any CSS-driven renderer apply:

- `.section { page-break-inside: avoid; break-inside: avoid; }`
- `h2, h3, .kicker { page-break-after: avoid; break-after: avoid; }`
- `html, body { widows: 3; orphans: 3; }`

In InDesign or Word, equivalent settings are **Keep with next paragraph** on headings and **Keep all lines together** on the section block.

If a section is too long to fit one page, it gets its own forced page break before it (`.pagebreak { page-break-before: always; }` or an explicit page break), and pagination inside the section uses widows / orphans rules to keep the last lines tidy.

**Aim for** three or four sections per page where density allows, never more than two if any section exceeds half a page.

## Cover archetype

1. **Brand mark top-left.** "Mastering Observability" in DM Sans 700, with the mono sub `ADVISORY · STRATEGY · PRACTICE` below in 7pt Space Mono muted chrome.
2. **Crosshair `+` top-right** in mint `#2DD4BF`.
3. **Concentric ring motif** bleeding off the right edge, 1px borders in low-opacity mint, decorative only.
4. **Mono kicker** with a short teal horizontal rule prefix, naming the client and the document type: `[CLIENT] · OBSERVABILITY & AIOPS STRATEGY`.
5. **Archivo Black display title**, three to five words, with the final two or three words in mint accent.
6. **Lead paragraph** in DM Sans 12.5pt, muted blue `#A8D8EA`, max 150mm wide.
7. **Author line** at the foot: `Allan Mann · Author, Metrics & Mayhem · Prepared for [CLIENT]`, with the `Prepared for` clause in bright mint `#64FFDA`.
8. **Disclaimer line** below in mono caps, faint chrome, 7pt.
9. **Vertical teal accent band** on the bottom-left edge, 8mm wide, 40mm tall.

## Body archetypes

- **Prose section.** Kicker, numbered heading, intro paragraph, bulleted body (mint tick-mark bullets, not dots). Pull quote where appropriate.
- **Year-grid section.** Three columns of feature cards: mono eyebrow, body text, mint top accent bar.
- **Gates table.** Mono labels in amber, two-column body, panel background.
- **Phased timeline table.** Mono labels in mint, three columns: phase, focus, output.
- **Receipts table.** Mono labels in mint, two columns: engagement, what it proves.

## Production

WeasyPrint 69 or later, A4 portrait, presentational hints enabled. CSS uses `@page` for chrome and `@page :first` to suppress chrome on the cover. The HTML source for the FAB strategy is the reference implementation; future strategy decks fork from it.

Output naming convention: `[Topic] - [Client or Subject] (MO Branded).pdf`, stored in the relevant project folder. The HTML source stays in `templates/long_form_pdf/` when promoted to a reusable template.

## QA gates (apply to every long-form PDF)

Before shipping any long-form PDF:

1. **Render the full document.** Look at every page at thumbnail and full size.
2. **Confirm no orphaned headings.** Every section heading travels with at least its first paragraph.
3. **Confirm the chrome holds.** Crosshair top right on every body page, footer left and right correct, page numbers continuous, brand mark on the cover only.
4. **Confirm the Codex.** No em dashes anywhere. UK English throughout. No AI tells. Banlist clean.
5. **Confirm the figures.** Career figures verifiable. Illustrative figures labelled illustrative. Client-confidential figures redacted or withheld with a visible disclaimer.

Rendering is not shipping. The visual QA gate from the index applies to PDFs in full.

## Related

- `../Slide_System/Slide_Design_System.md` for the visual language source.
- `00_Design_Standards_Index.md` for the brand-wide index and shared tokens.
- The Voice Codex remains canonical for tone and language rules.
