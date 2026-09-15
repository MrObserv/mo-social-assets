# SEO-to-Revenue Operating Model

> SEO-local working note (SEO console). Structural pieces (scheduled tasks, planner events, plan edits) go through the Control chat via a **[SEO]** Change Request. Subordinate to governance §3. Drafted 2026-06-22.

**Decision (Al, 2026-06-22):** optimise **balanced / sequenced** — commercial-intent pages route to the advisory offer; everything else routes to newsletter signup.

## The throughline (why every SEO action exists)
Search demand → ranked page → click (meta/CTR) → real on-page value → CTA → funnel step → revenue.
Per `08_Revenue/00_Revenue_Map`: the assets are the funnel, not the product. The cash is **advisory** (£1k-2k/day, £5k-15k assessments); newsletter growth (toward ~1,500-3,000 active, from ~545 now) is the enabler. So SEO has exactly two revenue jobs:
1. **Feed advisory** — high-intent cost/strategy readers reach the advisory page + free chapter.
2. **Grow the newsletter** — everyone else converts to a subscriber.
Traffic that does neither is vanity. If an SEO action cannot be tied to job 1 or job 2, we do not do it.

## Routing rule (balanced / sequenced)
| Page type / intent | Primary CTA | Example pages |
|---|---|---|
| Commercial intent (cost, strategy, assessment, "fractional/consultant" queries) | Advisory page + free chapter | Cost Conundrum, Putting It All Together, future assessment page |
| Informational / top-of-funnel ("what is X", how-to, Signal Drops) | Newsletter signup (free chapter as bridge) | What Is Grafana Alloy, OTel Collector guide, episode pages |

## The five workstreams to make it sing
1. **Trend / keyword radar (input).** Weekly scan of the observability field + rising queries + competitor gaps, dropping prioritised topics into the brief pipeline. Folds onto the Sunday `transcript-to-pipeline` so it adds no manual load. *Structural: Control.*
2. **Conversion instrumentation (measurement).** Extend the weekly GSC + beehiiv check to also surface funnel signals: free-chapter clicks, newsletter signups by acquisition source, advisory-page visits. Moves us from measuring traffic to measuring revenue. *Structural: Control.*
3. **On-page CTA routing (fastest lever).** Every high-traffic evergreen page gets a CTA per the routing rule. Apply to the 6 evergreen winners first. Manual beehiiv paste by Al; logged in the SEO change log with rollback.
4. **Commercial-intent content.** Buyer-query targets mapped to the advisory page now live as a prioritised, offer-mapped queue in `21_COMMERCIAL_INTENT_BRIEF_BACKLOG_2026-07-16.md` (B0 maturity assessment SHIPPED; B1 fractional lead next, then consultant / cost review / health check / strategy / OTel migration). The pipeline pulls the next QUEUED brief in priority order alongside the informational queue.
5. **Backlinks / authority (durable lever, human).** One outreach action a week (podcast guesting, guest post, citation) on the existing Thursday BD block. No automation can do this; it is the biggest long-term ranking move.

## Cadence in the weekly planner (one-person realistic)
- **Mon (existing SEO block, 60 min):** apply 2-3 meta/CTA changes, action the week's new-post SEO front-matter block, scan GSC movers.
- **Sunday (automated):** trend radar feeds briefs; weekly check writes the combined readout.
- **Thu (existing BD block):** one backlink/authority action.
- **Monthly:** conversion review — what traffic became signups / advisory enquiries, recompute cluster priorities.

## What we measure (per goal)
- **Advisory job:** advisory-page sessions from organic, free-chapter downloads, enquiries.
- **Newsletter job:** new subs by source (beehiiv acquisition), organic-to-signup rate.
- **SEO health:** GSC clicks, impressions, average position, near-page-one movers (baseline: 49 clicks / 9,880 impressions / pos 19.5).

## Status
Proposed. The structural pieces (radar task, conversion view in `beehiiv-seo-weekly-check`, planner events, plan Step 6 + cluster map) are filed as one [SEO] Change Request for Control. The SEO console runs the manual pieces (CTA drafts, change-log) in the meantime.
