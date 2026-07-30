# Canva Brand Kit: MO Setup Sheet

**Purpose:** the exact paste-in values to build the Mastering Observability / Metrics & Mayhem Brand Kit in Canva, so anything made by hand in Canva stays on the same identity the code pipeline produces. Canva has no brand kit today (empty), which is why the older Canva library drifted off-brand. Enter this once.

**Owner:** Growth. **Source of truth:** `Brand_Design_System_v2.md` (web/email tokens) + `Diagram_Standard.md` / `Blog_Thumbnail_Standard.md` (§24.11 dark-asset palette). If those change, update this sheet in the same patch.

**Plan note:** a Brand Kit with named colour groups + multiple palettes + "apply brand kit" needs **Canva Pro / Teams**. On the free plan you get one kit with limited slots; enter the two palettes as one combined colour list and skip the group names. Fonts below are all in Canva's built-in library (Google Fonts), so nothing needs uploading either way.

---

## The two surfaces (why there are two palettes)

MO runs two visual surfaces, one identity. Set both in the kit so the right one is one click away:

- **Web & Email surface (v2.0):** light backgrounds, Montserrat headings, teal `#2F9E8D`. Used for the site, beehiiv post bodies, email signature, in-body buttons, light-page documents.
- **Dark Visual-Asset surface (§24.11):** navy `#0a0e17` canvas, mint `#64ffda`, Archivo Black display. Used for anything that ships as an embedded image: blog thumbnails, OG cards, social visuals, diagrams, slide hero frames, Zoom/studio backgrounds.

Both share **DM Sans** (body) and **Space Mono** (labels/eyebrows), which is what keeps them one brand.

---

## 1. Fonts

Add these as Brand Fonts (all in Canva's font search, no upload needed; local copies also in `06_Brand_Assets/fonts/` if ever required):

| Role | Font | Use |
|---|---|---|
| Display / hero titles | **Archivo Black** | dark-asset titles (thumbnails, OG cards, diagram headings) |
| Headings / page + post titles | **Montserrat** (Bold / SemiBold) | web + email + light-page headings |
| Body / paragraph | **DM Sans** | body copy on both surfaces |
| Labels / eyebrows / mono | **Space Mono** (Bold) | eyebrows, footers, code/axis labels, letterspaced caps |

**Text styles to set (if your plan allows brand text styles):**

- Heading (web/email): Montserrat Bold, ink `#16282D`.
- Eyebrow: Space Mono Bold, letterspaced, teal `#2F9E8D` (light) or mint `#64ffda` (dark).
- Body: DM Sans Regular, ink `#16282D` (light) / grey `#9fb0bd` (dark).
- Hero title (dark asset): Archivo Black, white `#FFFFFF`.

---

## 2. Colours

### Palette A: Web & Email (v2.0)

| Name | Hex | Use |
|---|---|---|
| Ink / body | `#16282D` | body copy |
| Navy | `#0D2127` | dark bands, button text |
| Teal (accent) | `#2F9E8D` | accents, dividers, button background, link underline |
| Teal (link, AA-safe) | `#17695C` | inline link text |
| Bright teal | `#74DDCD` | eyebrow text on navy bands |
| Tint | `#EAF6F3` | table / quote backgrounds |
| Table border | `#C9DCDC` | table borders |
| White | `#FFFFFF` | cells, page background |

Button spec: teal `#2F9E8D` background, navy `#0D2127` text, border 0, corner radius 4, sentence-case label.

### Palette B: Dark Visual-Asset (§24.11)

| Name | Hex | Use |
|---|---|---|
| Navy (canvas) | `#0A0E17` | primary canvas |
| Navy 2 / Navy 3 | `#0C1929` / `#0E1F35` | canvas gradient stops |
| Card bg | `#0E2038` | node / card fill |
| Band bg | `#10233A` | headline-rule fill |
| Bright mint | `#64FFDA` | eyebrow, primary accent, headline-band border |
| Mint | `#2DD4BF` | secondary accent |
| Teal (structural) | `#14A3A8` | structural accent, footer |
| Deep teal | `#0D7377` | alt structural / light-figure accent |
| Green (low / safe) | `#7BD88F` | semantic: low blast radius / safe / go *(pending ratification)* |
| Amber (high / caution) | `#FFD166` | semantic: high blast radius / caution; emphasis only |
| White | `#FFFFFF` | primary ink |
| Grey | `#9FB0BD` | body / label ink on dark |
| Muted / arrow | `#4A6272` | connectors, hairline borders |

Light-figure variant (a diagram placed on a white page): bg `#FFFFFF`, ink `#1A1A1A`, axis `#C2C9CC`, gridlines `#E9ECEC`, labels `#6C7A82`, neutral bars `#CCCCCC`, accent `#0D7377` or `#64FFDA`.

---

## 3. Logos

Upload these from `06_Brand_Assets/` (SVG preferred so they stay crisp at any size):

| File | Use in Canva |
|---|---|
| `logo-on-dark.svg` | the logo on the dark-asset surface (navy backgrounds) |
| `logo-on-light.svg` | the logo on the web/email / light surface |
| `logo-master.svg` | source / full-lockup reference |
| `mo_avatar_navy.png` / `mo_avatar_white.png` | profile / avatar, square social marks |
| `favicon.svg` | small-mark / favicon use |

Motif rule (both surfaces): the lens + crosshair from the logo. On dark canvases the lens mark sits bottom-right at 40–60% opacity. No other icons or clip-art.

---

## 4. Usage rules (put these in the kit's notes if your plan supports it)

- **Pick the surface by output.** Ships as an embedded image (thumbnail, OG, social, diagram, background) → Palette B + Archivo Black. Lives as web/email body or a light-page doc → Palette A + Montserrat.
- **Do not hand-build the code-pipeline assets in Canva.** Blog thumbnails, OG cards and diagrams stay in the scripts (`mo_visual_kit.js`, `mo_diagram.js`): they are deterministic, version-controlled and pass the two-pass QA gate. Canva is for editorial/human-layout formats the scripts do not cover: carousels, quote cards, decks, covers, backgrounds, animated posts.
- **§5 still applies to any text you set in Canva.** UK English, no em dashes, no alerting vocabulary (the human "gets the call", never "paged"). Canva will not catch these; check by eye before export.
- **Green `#7BD88F` is pending ratification** (filed under GR-2026-07-01-03). Use it only as the safe/low end of a risk pairing until Control confirms it into the token set.
- **Export on-brand sizes:** 1200x630 (OG / blog thumb), 1200x680 (diagram/embed), 1080x1080 (square social), 1080x1920 (story/short). Export PNG for web, keep the Canva design as the editable source.

---

## 5. How to enter it (5 minutes)

1. Canva → **Brand** (left sidebar) → **Brand Kit** (Brand Hub).
2. **Logos:** upload the five files in section 3.
3. **Brand Colours:** add Palette A and Palette B. On Pro, make them two named groups; on free, add them as one list. Name each swatch from the tables if you can.
4. **Brand Fonts:** add the four fonts in section 1; set the text styles if available.
5. Save. When starting a design, use **Apply Brand Kit** (Pro) or pick from Brand Colours / Brand Fonts (free) so every new piece starts on-brand.

---

**Last updated:** 2026-07-01. Created on Al's instruction to build the MO Canva Brand Kit, after the connector showed no brand kit configured and the brand-template automation gated behind Canva Pro. Encodes the two-surface identity from `Brand_Design_System_v2.md` + `Diagram_Standard.md`. Registration filed to Control.
