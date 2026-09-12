# MO Architecture Diagram Kit — style modes and uses

**Canonical producer:** `render_arch_kit.py` (this folder).
**What it is:** the four MO architecture "style modes" in one line-icon language on a clean white engineering surface. Ported from the refined MO producers we built and hardened over many iterations, then **genericised for public use** — no client names, sites, or client-branded systems appear anywhere. Safe for the blog, LinkedIn, the newsletter, and the book.

## The four modes — and when to reach for each

| Mode | File output | Kicker | Use it when you need to show… |
|---|---|---|---|
| **Estate** | `arch_estate` | ARCHITECTURE (C4 L1 · system context) | The whole estate at a glance — grouped zones, an ownership / data-centre boundary, and a left-to-right actor spine. "Here is everything, and who owns which bit." |
| **Data flow** | `arch_dataflow` | ARCHITECTURE · DATA FLOW | How telemetry moves — apps → collector → open-source stores → one pane of glass. Left-to-right pipeline. "How the signals travel." |
| **Mesh** | `arch_mesh` | ARCHITECTURE · TOPOLOGY | Service topology — an application plane of service-to-service calls sitting above an observability plane of telemetry export. "Which service calls which, and how it is observed." |
| **Stack** | `arch_stack` | ARCHITECTURE · PLATFORM STACK | The platform in tiers — sources at the bottom up to consumers, the layer "we run" picked out in teal. "The observability stack, in layers." |

## The house style (shared across all four)

- **Surface:** near-white engineering ground `#FBFCFC`; navy ink `#16282D`; MO teal `#2F9E8D` accent; tint discs `#EAF6F3`.
- **Icons:** teal line-icons in a tint circle. One shared icon library — service, db, dashboard, funnel, person, alert, infra, gateway, portal, link, desktop, server, cluster, layers, storage, switch.
- **Type:** Montserrat (ExtraBold titles), DM Sans (body + kickers). Kickers are letter-spaced caps.
- **Arrows are DRAWN (vector), never glyphs.** The brand TTFs carry no arrow/dagger characters, so arrowheads are polygons in code — this enforces the Diagram Standard's no-symbol-glyph rule automatically.
- **"We run" convention:** the component/layer MO operates is picked out (teal border, tint fill, a "we run" tag). Everything else is white with a hairline border. Planned/not-yet-live uses a dashed grey card.
- **Every frame carries** the MO footer (masteringobservability.com) and a right-hand descriptor.

## Rendering

Fonts must be present as TTFs the renderer can read. In the Linux render sandbox:

```
cp mo-social-assets/fonts/*.ttf ~/.fonts/ && fc-cache -f
python3 render_arch_kit.py            # writes .svg + .png (2560×1440) to ./arch_out
```

Set `MO_ARCH_OUT` to redirect output. (G: fonts are a Drive stream the sandbox cannot read as binaries — always render from the `mo-social-assets/fonts/` copies, same as the OG/thumbnail producer.)

## To make a real diagram for a piece

Copy the relevant `build_*` function, swap the labels/zones/edges for your subject, keep the geometry and the house style. **Client work never goes here** — worked client architecture diagrams stay in the client folder only (project rule §8). This kit is the public, genericised reference; the confidential producers stay where they are.

*Lineage: ported from the refined `render_arch_examples.py` (data flow / mesh / stack) + `render_estate_arch.py` (estate) with all client identifiers removed. GR-2026-07-31-01.*
