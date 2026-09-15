# GR-07 Action: convert impression-starved pages to clicks (SEO sprint)

**Source:** GR-2026-08-23-07 (GSC pull, 90 days: 53 clicks, 5.91k impressions, CTR 0.9%, avg position 27.6). **Owner:** Growth. **Status:** actioning, 2026-08-23.

## The honest read (why the order matters)
Every target below earns impressions but ~0 clicks at **position ~27 (page 3)**. At that position a meta rewrite changes almost nothing, page-3 CTR is near zero regardless of the title. So the primary lever is **POSITION** (internal-link equity + content depth + freshness); **meta/CTR** is the payoff lever once a page reaches page 1–2. Do position first, meta second.

## Targets (ranked by impressions, all ~0 clicks)
| Query (impr) | Target page | Post id | Position lever | CTR lever (later) |
|---|---|---|---|---|
| opentelemetry collector (221) | OpenTelemetry Collector Implementation Guide `/p/opentelemetry-collector-implementation-guide` | (page 7-8, fetch at exec) | Link in from Wide Events, the AI-SRE blog, the 30 Aug blog (DONE), the OTel profiling byte-size; refresh with a 2026 update + a diagram | Meta title already keyword-led; tighten description to a benefit hook |
| observability cost (151) | cost cluster: `/p/the-observability-cost-conundrum` (pillar) + `/p/observability-cost-is-a-design-problem` + `/p/building-a-comprehensive-cost-effective-observability-strategy` | (fetch) | Consolidate internal links to ONE canonical cost pillar so equity is not split three ways; link in from the AI-SRE blog (already links the design-problem post) | Meta rewrite on the chosen pillar |
| hybrid cloud operations (127) | confirm we have a matching page; if not, this is a content gap (candidate byte-size) | n/a | Create/assign a page | n/a until a page exists |
| what is grafana alloy (122) + grafana alloy (65) | byte-size: What is Grafana Alloy `/p/...` | `post_17daede6-5448-49cc-9fbb-7b5cdb584262` | Link in from OTel collector guide + any Grafana/agent posts; refresh (2024 piece) | Meta: lead with "What Is Grafana Alloy" + a one-line definition hook |
| observability vs monitoring (95) | likely NO direct page (we have observability vs data observability) | n/a | Content gap: a "What Is the Difference: Observability vs Monitoring" byte-size would capture existing demand | n/a until built |

## Sequence (first sprint)
1. **Collector guide (biggest gap):** add 2-3 contextual internal links into it from high-relevance live posts (Wide Events, AI-SRE, OTel profiling byte-size); light 2026 refresh + one diagram; then tighten meta description. Banked so far: the 30 Aug blog links it.
2. **Cost cluster:** pick the canonical cost pillar, point the other two + the AI-SRE blog at it, then meta on the pillar.
3. **Grafana Alloy:** internal links in + refresh + meta.
4. **Content gaps:** commission byte-sizes for "observability vs monitoring" and "hybrid cloud operations" (real demand, no page) via the normal blog pipeline, with the GR-06 title-validation gate applied.

## Guardrails
- All edits to LIVE evergreen posts stage as drafts, Al publishes (web-only, no resend).
- Apply the GR-06 title-validation gate to any new byte-size.
- Re-pull GSC after ~4 weeks to confirm position movement before judging.
