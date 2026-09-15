# Web Design Best Practices — Mastering Observability

Working reference for every page we build. Distilled from current authoritative sources (NN/g, WCAG 2.2, 8-point grid systems, conversion research). Apply these as defaults; deviate only with a reason.

Last updated: 2026-06-02.

---

## 0. The focal point rule

**The book is the focal point of the brand. The podcast and newsletter support it.** Every page should make the single most important action obvious within the first 50 milliseconds (that is how long a visitor takes to form an impression). On the Metrics & Mayhem pages, that action is *get the book*. Design the visual weight, contrast, and the one dominant CTA around it. Everything else is secondary by design, not by accident.

---

## 1. Call-to-action hierarchy

- **One dominant primary CTA per view.** A layout should contain a single high-emphasis button so it is unambiguous which action matters most. Presenting multiple competing CTAs of equal weight can drop conversion sharply (studies cite decreases of up to ~266%).
- **Max three CTAs in any one group.** Ideally one primary plus one secondary. More than three causes choice paralysis.
- **Primary = solid, filled, high-contrast. Secondary = outline / ghost.** Tertiary actions are quieter still (text links).
- **Repeat the single key action, do not multiply actions.** It is good practice to repeat *Get the book* down the page (hero, book section, close). It is bad practice to offer four different equally-weighted destinations in one spot.
- Use action-first labels ("Get the book", "Read the free chapter"), not vague ones ("Submit", "Click here").

## 2. Button specification (our standard)

- **Height / tap target:** minimum 44px tall (Apple HIG; WCAG 2.5.5 AAA). Never below the WCAG 2.2 AA floor of 24×24px. We default to ~48px.
- **Horizontal gap between buttons in a row: 16px.** Vertical gap when stacked: 8px. Minimum 8px of inactive space between any two adjacent targets so users do not mis-tap (WCAG 2.2 prefers 24px of spacing if relying on spacing for target size).
- **Equal heights across a button group.** Primary and secondary buttons in the same row must be the same height and vertically aligned. A box-shadow or border must not change the box size — use `box-sizing: border-box`.
- **Consistent padding.** Same internal padding on every button of the same tier. Snap padding to the 8pt grid.
- Always provide visible **hover and focus states** (focus is an accessibility requirement, not optional).

## 3. Spacing — the 8-point grid

- All margins, padding, and gaps are multiples of 8: **4 (half-step), 8, 16, 24, 32, 48, 64, 96.** No stray 13s, 18s, 26s.
- Most common screen widths are divisible by 8, so elements line up cleanly across devices and hand-off to developers is predictable.
- Section padding: 64–96px vertical on desktop, 40–48px on mobile. Inner element gaps: 16–24px.
- Consistent spacing *is* what makes a layout feel polished; inconsistency reads as amateur even when nothing else is wrong.

## 4. Typography

- **Headline is clearly the largest element**: ~40–68px desktop. Subhead noticeably smaller. Body 16–18px.
- Sequence the eye: **headline → subhead → CTA**, in that visual order and size order.
- **Line length 50–75 characters** for body copy. At 17px that is roughly a 640–680px text column, not the full content width. Wide measure tires the reader.
- Generous line-height for body (~1.5–1.6). Tight line-height for large headings (~1.0–1.1).

## 5. Hero section

- Answer "what's in it for me?" instantly in the headline. Benefit, not slogan.
- Keep it focused: headline, subhead, and the **primary CTA visible without scrolling**. Do not bury the CTA under three paragraphs.
- One primary CTA, at most a non-competing secondary.
- **Add a proof signal.** Most heroes skip social proof (≈59% do) — a credibility cue (a hard number, a named outcome, formats/credentials) is an easy edge. Use real proof only; never invent review counts or ranks.

## 6. Accessibility (WCAG 2.2)

- **Text contrast ≥ 4.5:1** (normal), 3:1 for large text and for UI component borders/icons. Check ghost-button borders — faint borders often fail the 3:1 UI-component minimum.
- **Tap targets ≥ 44px** comfortable; 24px absolute floor.
- Every interactive element needs a **visible focus indicator** and a sensible label.
- Maintain hierarchy and order across breakpoints — the mobile layout should read in the same logical sequence as desktop.

## 7. Brand tokens (Metrics & Mayhem)

| Token | Value | Use |
|---|---|---|
| Navy | `#0d2127` | Dark section backgrounds, focal anchors |
| Navy-2 | `#13313a` | Raised panels, the proof/stat callout |
| Teal | `#5fd0c0` | Primary buttons, accents, kickers |
| Teal-deep | `#2f9e8d` | Links on light backgrounds, hover |
| Cream | `#f5f3ec` | Text on dark |
| Ink | `#16282d` | Text on light |

- Headings: Space Grotesk. Body: Inter. Both with system fallbacks.
- Alternate dark / light sections for rhythm; do not stack two heavy dark sections back to back unless one is deliberately the focal anchor.

## 8. Sources

- NN/g — Button States & button guidance: https://www.nngroup.com/articles/button-states-communicate-interaction/
- Material / PatternFly / Carbon button hierarchy & spacing (16px row / 8px stack): https://www.patternfly.org/components/button/design-guidelines/
- Hero section best practices 2026: https://www.perfectafternoon.com/2025/hero-section-design/
- Landing page best practices (single-CTA focus): https://landingi.com/landing-page/41-best-practices/
- 8-point grid system: https://www.rejuvenate.digital/news/designing-rhythm-power-8pt-grid-ui-design
- WCAG 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Touch target sizes (24/44/48): https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/
