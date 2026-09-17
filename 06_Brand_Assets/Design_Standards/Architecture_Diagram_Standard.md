# Mastering Observability: Architecture Diagram Standard

**Registered:** 2026-07-30 (Growth / Brand). **Revised:** 2026-07-31 after Allan's direction: no plain boxes, real architectural layout, consultant standard. **Hardened:** 2026-08-03 with the build-level lessons from a client baseline deck (see §2a and the expanded §6 checklist). **Scope:** every architecture, estate, pipeline, topology and platform diagram Mastering Observability produces, for client-facing engineering audiences, the blog, and the book. This is the sibling to `Diagram_Standard.md` (concept / flow); the two share one visual language and one QA gate, so from this revision they operate as a single system. UK English, Voice Codex §5 (no em dashes, banlist, confirmed figures only).

The proving ground is a client engineering-desktop observability baseline (a tier-1 UK bank) shown to architects (Deputy CTO, Lead Architect, service owners). The bar: read as a recognised notation an architect trusts, and hold together as one brand.

---

## 1. Philosophy

- **Clarity over completeness.** One idea per diagram. One direction of flow (left to right, or bottom to top for a stack). Colour carries meaning, never decoration.
- **Architectural layout, not boxes.** Components are recognisable icons inside grouped zone containers, connected by topology lines. Uniform labelled rectangles are a flowchart and are not acceptable.
- **Adopt standards, skin in brand.** C4 and the OpenTelemetry reference architecture are the notations; they are rendered in the Mastering Observability line-icon language.
- **Discipline of scale.** About seven components on a story diagram; push detail to an appendix. Boxes are nouns, arrows are verbs, arrows point one way with a single head.

## 2. The visual language (locked 2026-07-31)

- **Surface: clean white engineering ground** (`#FBFCFC`). The brand lives in the furniture (kicker, title, footer, teal accent), not a coloured canvas. This keeps the diagram reading as engineering, not marketing, and matches how architects expect reference diagrams to look.
- **Components are teal line-icons in a tint circle.** Single-colour (`#2F9E8D`) line icons in a `#EAF6F3` tint disc, sized consistently (about a 40px icon in a 40-44px disc), one recognisable glyph per component type (gateway, portal, monitor, server rack, hyperconverged nodes, hypervisor layers, storage array, switch, service hexagon, collector funnel, database cylinder, dashboard).
- **Zones are containers.** A white card with a `#EAF6F3` header band carrying a DM Sans caps kicker; components stack inside. Zones group a tier, a plane, or a layer.
- **Ownership / boundary is a dashed line or dashed container**, always labelled (for example a data-centre boundary, or a service provider | client split).
- **Two edge types where needed:** solid = a call or the main flow; dashed = telemetry / secondary. Keyed on every diagram that uses both.

## 2a. Construction rules (hardening, added 2026-08-03)

Craft rules at the build level. Each is here because it was got wrong once and caught in QA; none should recur.

- **Overlays match the parent radius.** A header band, or any fill or overlay drawn over a rounded container, uses the *same* corner radius as the container. A mismatched radius (for example a band at r10 on an r14 card) leaves a notch or a "missing line" at the corner. Match the radius, or clip to the parent.
- **Masks never erase structure.** A background rectangle used to break a line behind a label must cover only the line, never a zone border or neighbouring content. Better: place the label in clear space (below or beside the boundary) so no mask is needed at all.
- **Symbols are drawn, not typed.** Ticks, crosses, arrows inside discs, recycle or loop marks and any decorative glyph are vector shapes, not font characters. The brand fonts do not contain `✓ ✕ ↻` and most symbols; a small set such as `→  ·  †` is present (see §4). A renderer that shows a missing glyph anyway is substituting a fallback font, which will not hold on the target machine.
- **Containers hug their content.** A zone's height is set by what it holds plus even padding. Never leave a large empty band inside a container below its content, and never a dead band between a title and its body. Spare space goes to the canvas margins, never the interior.
- **Boundaries span their zones.** A dashed ownership boundary runs the height of the zones it divides (or a small, deliberate overhang), with its label clear below or beside it, not poking arbitrarily above or below.
- **Dense grids carry a left gutter.** A coverage matrix or table gives its row-label column a real left margin and insets the label text; labels never butt against the canvas edge or the first data column.
- **Reference and non-estate items are marked as such.** Anything not from the client estate (a market option, a reference tool) is visibly parked: a labelled band, a muted or italic row, a lighter verdict. It is never shown level with in-play items. This is provenance made visible, the sibling of "confirmed figures only".

## 3. Colour semantics (meaning only; fixed key on every diagram)

| Token | Hex | Meaning |
|---|---|---|
| Ink | `#16282D` | Titles and primary text |
| Teal | `#2F9E8D` | Ours / what we run / the accent, and component icons |
| Tint | `#EAF6F3` | Icon discs, zone header bands |
| Muted | `#5D6F73` | Captions, tags, footer |
| Grey | `#9AA5A1` | Legacy / planned / not yet (with a dashed outline) |
| White | `#FBFCFC` / `#FFFFFF` | Canvas / cards |

Flow lines are one weight and one teal. A lighter or heavier line must mean something or it is a defect (it implies a distinction that does not exist). No second hue is introduced; signal types (metrics / logs / traces) are labelled in text, not colour-coded.

## 4. Typography

- **Montserrat** (ExtraBold) = titles.
- **DM Sans** = body, captions, and the letterspaced caps **kicker** (Space Mono is reserved for code contexts only, not kickers or meta).
- **No symbol glyphs from the brand fonts.** Montserrat and DM Sans carry the Latin set plus `→  ·  †`, but not `✓ ✕ ↻` and most symbols. Draw those as vector shapes (see §2a). Never trust the preview: LibreOffice and browsers substitute a fallback font for a missing glyph, so a symbol can look right in QA and break on the client's machine.
- Footer: "Mastering Observability  ·  masteringobservability.com" left, the standard used right (for example "C4 Level 1 · system context").

## 5. Pattern library: what each diagram is for, and when to use it

| Pattern | Notation | Shows | Use it when | Reference render |
|---|---|---|---|---|
| **Layered estate** | C4 Level 1 / 2 | What the estate *is*: tiers, components, data-centre and ownership boundaries | Baselines, "here is the landscape", estate reviews | `01_estate_site_map_v2` |
| **Data flow** | OpenTelemetry reference architecture | How telemetry *moves*: sources → collector (receivers / processors / exporters) → stores → view | Pipelines, the OTel-through-open-source story, target-state proposals | `EX1_otel_open_source_dataflow` |
| **Service mesh / topology** | topology (two planes) | How apps *talk to each other* and where telemetry is tapped | App-to-app dependencies, blast-radius, service coverage | `EX2_service_mesh_spider` |
| **Layered stack** | platform stack | The platform *at a glance*, sources to consumers | Orientation, roadmap framing, teaching | `EX3_layered_stack` |

**Supporting artefacts (built to the same palette and type, but not architecture):** a **coverage matrix** (a governed grid of journey layers x tools, four-state evidence legend) and a **horizon band** (roadmap). Use these alongside the architecture diagrams; do not call them architecture.

Cloud components use official **AWS / Azure icons** only where a component genuinely is that cloud service; on-prem and vendor components use the MO line-icon set so the diagram stays brand-coherent. ArchiMate is held in reserve for a house standard that demands it; otherwise not used.

## 6. QA gate: the challenge guardrail (MANDATORY, every diagram)

A diagram is not shipped because it rendered. Every diagram passes **two self-passes and one independent fresh-eyes challenge** before it ships. Held to consultant standard, in Allan's voice.

**Pass 1 (build + self-check), Pass 2 (fresh render + re-check), Pass 3 (independent fresh-eyes challenge, for anything client-facing or high-stakes; a subagent or a second reviewer).** Only a pass that finds nothing ships.

Challenge checklist:

1. **One idea, one direction.** Left to right (or bottom to top for a stack); single arrowheads; about seven components or fewer on the story.
2. **Notation is honest.** C4 / OTel grammar correct; a reader who knows the standard is not misled.
3. **Alignment.** Elements on a grid; zone bottoms and tops aligned; icons and text a consistent size across the set.
4. **Spacing.** Even margins; no cramped or lopsided whitespace; labels clear of lines and icons.
5. **Connections.** Every arrowhead meets its target; boundaries drawn with margin, not spearing content; dashed vs solid used consistently and keyed.
6. **Colour and shape semantics** hold against the fixed key; flow lines one weight; no accidental emphasis.
7. **Legibility.** Readable at slide-thumbnail size; WCAG contrast at least 4.5:1 on any coloured fill; nothing cropped.
8. **§5 scan.** No em dashes (and no spaced-hyphen dash substitutes in titles), UK English, confirmed figures only, no vendor claim as fact.
9. **Glyph safety.** Every character used exists in the brand font; ticks, crosses and symbols are drawn shapes, not typed glyphs (§2a, §4). Do not trust the preview: renderers substitute a fallback font for a missing glyph.
10. **Corner and overlay integrity.** Header bands and overlays match the container radius; no notched or open corners; no mask erasing a border (§2a).
11. **Containers hug content; no dead bands.** No large empty band between a title and its body, or inside a container below its content; spare whitespace sits at the margins, not the interior (§2a).
12. **Grid gutters.** Dense grids and tables carry a comfortable left margin with the label text inset (§2a).
13. **Provenance shows.** Reference or non-estate items are visibly marked, never level with in-play items (§2a).

**Renderer caveat.** LibreOffice and browsers substitute a fallback font for any missing glyph and silently swap unavailable fonts, so a clean preview does not prove font-safety or glyph availability on the target machine. Check the font's actual character set, not just the render. This is why passes 9 to 13 are verified in the build, not only by eye.

This guardrail is the same one the blog-diagram QA gate uses; the two are now one gate.

## 7. Producers

- `render_estate_arch.py` — the layered-estate producer (icons, zones, boundary, topology).
- `render_arch_examples.py` — the data-flow, service-mesh and layered-stack producers.
- `mo_style.py` (client workspace) — the shared style engine: tokens, `tx` / `arrow` helpers, the line-icon set, and the drawn tick / cross / dot glyphs that replace font symbols per §2a. Reuse it so every producer inherits the hardening rules rather than re-implementing them.

All build brand-accurate SVG rendered to PNG through the brand fonts (installed from `06_Brand_Assets/fonts`). A follow-up parametrises them into client-agnostic blank templates for the public brand kit.

## 8. Reuse and confidentiality

The **standard and the blank templates** are Mastering Observability brand IP. **Worked client diagrams** (for example a client's desktop estate) are client-confidential: built to this standard, stored only in the private client workspace, never in the public asset repository. The generic reference examples (open-source stack, sample services) are brand examples and may be reused.

---

**Companion:** `Diagram_Standard.md` (concept / flow) shares this language and this gate; the 2026-08-03 hardening (§2a, §4 glyph rule, §6 items 9 to 13, and the renderer caveat) still needs carrying into it so the two stay level. **Slide system:** `../Slide_System/Slide_Design_System.md`. **Tokens:** `Brand_Design_System_v2.md`. This standard supersedes the 2026-07-30 boxes-and-arrows draft (retired to `_superseded_boxes` in the client folder).

**Sync note (2026-08-06, Growth):** the 2026-08-03 hardening originated in the client copy and was folded back into this canonical master, so the two are level again. This file is canonical; the client-project copy reconciles to it.
