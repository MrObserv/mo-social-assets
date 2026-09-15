# Google Search Console — Baseline

**Property:** https://www.masteringobservability.com/ (URL-prefix, already verified, owner allan@masteringobservability.com)
**Period:** 2026-03-20 to 2026-06-19 (last 3 months) · **Captured:** 2026-06-12 (read live via Chrome)

## Site totals
| Metric | Value |
|---|---|
| Total clicks | 49 |
| Total impressions | 9,880 |
| Average CTR | 0.5% |
| Average position | 19.5 |
| Distinct queries | 261 |
| Distinct pages | 108 |

**Headline read:** plenty of impressions, almost no clicks. The bottleneck is click-through (titles/descriptions), not visibility. This is the before-number for the Step 1 meta work.

## Top queries by position
| Query | Avg position |
|---|---|
| signal drop | 6.6 |
| sunny mattu | 7.4 |
| what is grafana alloy? | 8.9 |
| what is grafana alloy | 9.6 |
| grafana alloy | 19.5 |
| shift left observability | 26.5 |
| mainframe observability | 32.8 |
| observability strategy | 45.4 |
| hybrid cloud operations | 49.8 |
| opentelemetry collector | 72.7 |

Near-page-one wins to push first: "what is grafana alloy" (~9), already meta-improved. Head terms ("observability strategy" p5, "opentelemetry collector" p7+, bare "observability" not charting) confirm the long-tail-and-name strategy, not head terms.

## Top pages by impressions (the CTR opportunity)
| Page | Clicks | Impressions | CTR |
|---|---|---|---|
| /p/what-is-grafana-alloy | 4 | 1,418 | 0.28% |
| /p/the-observability-cost-conundrum | 2 | 627 | 0.32% |
| /t/newsletter | 3 | 204 | 1.5% |
| / (home) | 16 | 152 | 10.5% |
| /t/observability | 3 | 81 | 3.7% |
| /metrics-and-mayhem/podcast | 4 | 71 | 5.6% |
| /p/sunny-mattu-capgemini | 2 | 70 | 2.9% |
| /authors/{uuid} | 4 | 46 | 8.7% |
| /authors/allan-mann | 2 | 8 | — |

**Biggest single lever:** the Grafana Alloy and Cost Conundrum posts together draw ~2,045 impressions/quarter at <0.35% CTR. Converting even to 2% CTR is ~40 clicks vs the current 6.

**Flag:** two author URLs exist (`/authors/{uuid}` and `/authors/allan-mann`) — duplicate author pages dilute authority. Consolidate to one (ties to the tracker's Authors-page note).

## How this feeds the agent
- Live read: via Chrome (as done here), no paid tool, no connector.
- Robust pipe: set a scheduled Search Console export to a Google Sheet in Drive; the weekly agent reads it through the connected Google Drive connector.
- Weekly job: compare clicks/impressions/avg-position and near-page-one queries vs the prior week; flag movers and one-edit-from-page-one posts.
