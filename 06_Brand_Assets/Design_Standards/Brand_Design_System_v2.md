# Brand Design System — v2.0

**Canonical brand visual identity for Mastering Observability / Metrics & Mayhem.** Established 2026-06-23 (brand-strategy work), adopted into the system 2026-06-24. Maintained by the **Growth** console. This is the single source for fonts and colour tokens across slides, site, email/beehiiv, signature, and backgrounds. The detailed email/beehiiv application + template IDs live in `07_Website/08_SEO_Improvement_Plan/09_BEEHIIV_TEMPLATES.md`; this file is the identity itself.

## Type
- **Body / paragraph:** DM Sans
- **Headings (H1–H4) + post/page title:** Montserrat
- **Labels / eyebrows:** Space Mono
- (Replaces the old Space Grotesk / Helvetica pairing.)

## Colour tokens
| Token | Hex | Use |
|---|---|---|
| Ink / body text | `#16282D` | body copy |
| Navy | `#0D2127` | dark bands, button text |
| Teal (accent) | `#2F9E8D` | accents, dividers, button background, link underline |
| Teal (link, AA-safe) | `#17695C` | inline link text (darkened for contrast) |
| Bright teal | `#74DDCD` | eyebrow text on navy bands |
| Tint | `#EAF6F3` | table / quote backgrounds |
| Table border | `#C9DCDC` | table borders |
| Cell background | `#FFFFFF` | table cells |

Buttons: teal `#2F9E8D` background, navy `#0D2127` text, border width 0, radius 4.

**In-body buttons (rule, Al 2026-06-24):** every button inside a post body (mid-article subscribe buttons, "contact" buttons, etc.) uses the v2.0 button tokens above. When updating legacy posts, **restyle in place** — keep the button's position and purpose, just repaint to v2.0 and sentence-case the label; do not add or remove buttons as part of a restyle. Button links must be canonical (newsletter → `https://www.masteringobservability.com/subscribe`, not old beehiiv subdomains). First applied across the 6 evergreen winners (CHG-013).

## Where it applies
Slides, website, beehiiv (the three v2.0 templates + posts), email signature (`Email_Signature_Standard.md`), studio/meeting backgrounds. Keep all surfaces on these tokens.

## Known manual gaps (no API)
- **beehiiv publication default theme** must be set once in Settings → Design (the three templates already carry v2.0; only template-less posts inherit the default). Exact values mirror the table above; full list in `09_BEEHIIV_TEMPLATES.md`.
- **Old beehiiv templates** must be deleted in the UI (no delete API) — cull list in `09_BEEHIIV_TEMPLATES.md`.
- **Subscribe form** can be repainted to v2.0 via API (writes a draft to publish).

## Change control
Token or identity changes are proposed by the Growth console via its inbox (`[BRAND]`) and recorded here + in the System Changelog when applied. Do not let a brand change live only in a chat.

## Two surfaces, one identity (ratified 2026-07-03, GR-2026-07-01-03)
The MO brand runs on TWO palettes that share type so they read as one identity:
- **Web / email surface (this document):** Montserrat + teal `#2F9E8D`, light backgrounds. Used for the site, beehiiv, email, in-body buttons.
- **Dark visual-asset surface (§24.11 / Diagram Standard / Blog thumbnails / OG cards / social visuals):** navy `#0a0e17` + mint `#64ffda` + Archivo Black.
Both share **DM Sans** (body) + **Space Mono** (labels). Pick the surface by output: web/email vs image asset.

**Ratified brand tokens (semantic, dark-asset surface):** amber `#ffd166` = "high / caution"; **green `#7bd88f` = "low / safe"** (new, ratified by Al 2026-07-03). Load-bearing in diagrams (green=low/safe, amber=high/caution).
