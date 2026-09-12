# Contrast Audit

**Run:** 2026-09-11. **Standard:** WCAG 2.1 AA. **Result:** all pairings pass.

Both diagram QA gates and the slide system require 4.5:1 and nothing had ever computed it. This is that computation. Three tokens changed as a result; they are listed at the foot.

Thresholds: 4.5:1 for body text, 3:1 for large or display text (roughly 24px bold and above).

| Pairing | Values | Where it is used | Measured | Needs | Result |
|---|---|---|---|---|---|
| ink on ground | #16282D on #F6F8F7 | Body text on the page | 14.31:1 | 4.5 | PASS |
| ink on panel | #16282D on #FFFFFF | Body text on cards | 15.27:1 | 4.5 | PASS |
| ink on tint | #16282D on #EAF6F3 | Body text on tinted panels | 13.79:1 | 4.5 | PASS |
| muted on ground | #3B5257 on #F6F8F7 | Secondary prose | 7.78:1 | 4.5 | PASS |
| muted on panel | #3B5257 on #FFFFFF | Secondary prose on cards | 8.30:1 | 4.5 | PASS |
| soft on ground | #5A6E72 on #F6F8F7 | Captions and meta | 5.04:1 | 4.5 | PASS |
| soft on panel | #5A6E72 on #FFFFFF | Captions on cards | 5.37:1 | 4.5 | PASS |
| teal-deep on ground | #17695C on #F6F8F7 | Links and kickers | 6.13:1 | 4.5 | PASS |
| teal-deep on tint | #17695C on #EAF6F3 | Kickers on tinted panels | 5.91:1 | 4.5 | PASS |
| teal-deep on panel | #17695C on #FFFFFF | Links on cards | 6.54:1 | 4.5 | PASS |
| semantic-high on ground | #8F6109 on #F6F8F7 | Caution label | 5.07:1 | 4.5 | PASS |
| semantic-high on panel | #8F6109 on #FFFFFF | Caution label on cards | 5.41:1 | 4.5 | PASS |
| semantic-low on ground | #237A45 on #F6F8F7 | Safe label | 5.00:1 | 4.5 | PASS |
| semantic-low on panel | #237A45 on #FFFFFF | Safe label on cards | 5.33:1 | 4.5 | PASS |
| navy on ground | #0D2127 on #F6F8F7 | Headings | 15.58:1 | 3 | PASS |
| panel on teal-deep | #FFFFFF on #17695C | White button text | 6.54:1 | 4.5 | PASS |
| navy on teal | #0D2127 on #2F9E8D | Navy button text, dark mode | 5.06:1 | 4.5 | PASS |
| on-dark-body on dark-ground | #D5E0E1 on #0D2127 | Body text on dark | 12.33:1 | 4.5 | PASS |
| on-dark-soft on dark-ground | #9FB0BD on #0D2127 | Secondary text on dark | 7.45:1 | 4.5 | PASS |
| on-dark-soft on dark-panel | #9FB0BD on #1C3C45 | Secondary on dark panels | 5.29:1 | 4.5 | PASS |
| teal-bright on dark-ground | #74DDCD on #0D2127 | Kickers on dark | 10.26:1 | 4.5 | PASS |
| teal on dark-ground | #2F9E8D on #0D2127 | Mid teal text on dark | 5.06:1 | 4.5 | PASS |
| panel on dark-ground | #FFFFFF on #0D2127 | Display type on dark | 16.61:1 | 3 | PASS |
| semantic-high on dark-ground | #FFD166 on #0D2127 | Caution on dark | 11.52:1 | 4.5 | PASS |
| semantic-low on dark-ground | #7BD88F on #0D2127 | Safe on dark | 9.54:1 | 4.5 | PASS |
| dark-ground on teal-bright | #0D2127 on #74DDCD | Chip text | 10.26:1 | 4.5 | PASS |

## Tokens changed by this audit

| Token | Was | Now | Why |
|---|---|---|---|
| soft | #63797D | **#5A6E72** | 4.32:1 on ground. Used for captions and meta across the site, this page and every footer. Now 5.04:1. |
| semantic-high, light mode | #A8720B | **#8F6109** | 3.88:1 on ground, 4.14:1 on panel. Now 5.07:1 and 5.41:1. |
| semantic-low, light mode | #2F9E57 | **#237A45** | 3.42:1 on panel. Now 5.00:1 and 5.33:1. |

## Rules this audit produced, rather than token changes

- **teal #2F9E8D is not a text colour on light.** It measures 3.08:1 on ground. It is a graphic colour: rules, borders, fills, icons. Text and links use teal-deep #17695C.
- **soft is a light-mode token only.** On dark it measures 3.61:1. The dark equivalent is on-dark-soft #9FB0BD at 7.45:1.
- **The semantic pair is mode-dependent and always has been.** The light set is the darkened one. Using #FFD166 on a light ground is a fail, not a style choice.

## Re-running this

The audit is a function of the token file. Re-run it on any colour change, before the change ships, and paste the result here with the date. A QA point nobody can fail is decoration.
