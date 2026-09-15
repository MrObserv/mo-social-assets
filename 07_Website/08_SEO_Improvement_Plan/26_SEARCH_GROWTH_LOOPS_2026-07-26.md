# Search Growth Loops

**Built:** 2026-07-26  
**Owner:** Growth  
**Purpose:** turn the existing SEO production system into a measured improvement cycle.  
**Source:** Growth Console review plus the 2026-07-26 Startup Idea Pod transcript on long-running AI loops.

## Decision

Do not build a second SEO system. Keep the existing Growth Console as the production engine and add the missing measurement and experiment layer.

The Growth Console already handles topic and keyword research, six-cluster content planning, brief-to-publish production, keyword-led metadata, internal linking, CTA routing, buyer-intent research, trend monitoring and publication QA.

The missing loop is:

`measure -> choose one opportunity -> make one bounded change -> wait -> compare -> keep or revert -> choose the next opportunity`

## Current position

### Data-confidence note

The latest verified Search Console snapshot in the Growth Console is **2026-07-06**, covering 2026-04-05 to 2026-07-04. No later GSC report or Growth Health Check is filed. These figures are therefore the latest verified baseline, not a claim about live rankings on 2026-07-26.

This reporting break is the first problem the loop must fix.

### Latest verified site totals

| Metric | 2026-07-06 | 2026-06-30 | Original baseline |
|---|---:|---:|---:|
| Clicks, rolling 90 days | 51 | 45 | 49 |
| Impressions, rolling 90 days | 8,930 | 9,380 | 9,880 |
| CTR | 0.6% | 0.5% | 0.5% |
| Average position | 20.6 | 19.9 | 19.5 |
| Queries | 257 | 261 | 261 |
| Pages with impressions | 117 | 114 | 108 |

Read: clicks and CTR improved slightly, but impressions and average position weakened. The site has visibility, but very little of it becomes a click.

### Key queries, latest verified

| Portfolio | Query | Position | Decision |
|---|---|---:|---|
| Defend | signal drop | 6.2 | Protect the ranking and keep the podcast hub internally linked. |
| Defend | sunny mattu | 7.3 | Protect. This is a name query, not a strategic topic target. |
| Push | what is grafana alloy? | 8.9 | Page-one foothold. Improve CTR and links without changing the core answer. |
| Push | what is grafana alloy | 9.5 | Same URL and intent. Treat the variants as one query family. |
| Push | grafana alloy | 21.1 | Strengthen the same anchor rather than create another competing URL. |
| Build | observability strategy | 44.1 | Strategic cluster term. Use C1 and the maturity-assessment route. |
| Build | observability vs monitoring | 46.8 | Confirm the best existing anchor before commissioning content. |
| Build | hybrid cloud operations | 50.5 | Secondary opportunity. Do not displace commercial and near-page-one work. |
| Build | opentelemetry collector | 72.3 | Existing deep guide needs query-level diagnosis and cluster support. |
| Build | observability open source | 75.1 | Route through the open-source learning-path hub, not a loose article. |

### Pages with the clearest immediate opportunity

| URL | Clicks | Impressions | CTR | Position | Read |
|---|---:|---:|---:|---:|---|
| `/p/building-a-comprehensive-cost-effective-observability-strategy` | 1 | 2,058 | approximately 0% | 12.5 | Biggest impression sink. Needs page-query export before changing the title. |
| `/p/what-is-grafana-alloy` | 5 | 1,133 | 0.4% | 11.0 | Closest scalable win. Protect the useful content and test snippet alignment. |
| `/p/the-observability-cost-conundrum` | 1 | 675 | 0.1% | 11.9 | Near page one with weak CTR. Good controlled-test candidate. |

### Revenue position

- `/advisory`: 0 clicks and 0 impressions in the latest verified snapshot.
- `/metrics-and-mayhem/free-chapter`: 0 clicks and 0 impressions.
- This does not mean the two offer pages should be forced to rank. Their main job is conversion. Buyer-intent articles should rank, then route qualified readers to them.
- The maturity-assessment article is the first organic on-ramp. The commercial backlog adds fractional observability leadership, consultancy, cost review, health check and strategy targets.

## Keyword portfolio

### Defend

- signal drop;
- sunny mattu;
- what is Grafana Alloy query family.

### Push

- cost-effective observability strategy;
- observability cost;
- Grafana Alloy;
- page-specific query families in positions 4 to 20 from the fresh export.

### Build for buyers

- observability maturity assessment;
- fractional observability leader;
- observability consultant;
- observability cost review;
- observability health check;
- observability strategy consulting.

### Build the technical cluster

- OpenTelemetry profiling and continuous profiling;
- wide events and observability 2.0;
- what is AIOps;
- OpenTelemetry Collector;
- Kubernetes observability;
- SLO and SLI;
- cardinality;
- sampling;
- Grafana Tempo;
- Alertmanager;
- ELK stack.

These are a backlog, not an instruction to publish all of them. The monthly loop chooses only terms with demand, cluster fit and a single canonical anchor.

## Loop 0: measurement integrity

**Cadence:** Monday and Thursday at 07:05.  
**Extend:** `GR-2026-07-08-02`; do not create a duplicate health-check task.

### Inputs

- Search Console query and page exports for rolling 28 days and rolling 90 days;
- prior run snapshot;
- Beehiiv website and subscriber analytics;
- conversion events for advisory visits, Chapter 4 clicks, newsletter signups and enquiries;
- experiment ledger.

### Run

1. Confirm the GSC export is fresh and covers the correct property.
2. Store query, page and query-by-page results.
3. Compare with the previous equal-length period and the last run.
4. File the dated report even when there is no movement.
5. If GSC cannot be read, file a FAILED report and surface the break. Never silently skip it.

### Stop condition

A dated report exists and contains a source timestamp, windows, totals, movers, losers and data-confidence status.

### Recommended access

Replace the browser-only dependency with a Search Console scheduled export to Google Sheets or an API-backed export. Keep browser access as the supervised fallback. The current browser dependency is why the snapshots stopped.

## Loop 1: weekly opportunity selection

**Cadence:** Monday, after Loop 0.  
**Output:** one primary experiment and, at most, one secondary diagnostic.

Prioritise a URL and query family when it has at least 100 impressions, average position 4 to 20, CTR below the expected curve, one clear canonical page, and a route to audience growth or advisory demand.

Use this relative score:

`opportunity = impressions x position_weight x ctr_gap x business_weight x confidence`

### Guardrails

- One material SEO change per URL per 28 days.
- Record the before window before editing.
- Do not change title, structure, CTA and internal links at the same time.
- Protect queries already in positions 1 to 10.
- Never create a second URL for the same intent.
- Every action has a rollback value in the experiment ledger.

### Stop condition

One experiment is logged with a hypothesis, owner, action, baseline and review dates. If no candidate clears the confidence bar, the correct outcome is `NO CHANGE`.

## Loop 2: controlled improvement

**Cadence:** weekly execution, 28-day minimum evaluation.

Experiment types, in order:

1. Search-snippet alignment.
2. Internal-link reinforcement.
3. Answer improvement for the dominant query.
4. Consolidation of competing intent.
5. One human backlink or citation action each week.

Review at Day 7 for indexation, Day 28 for first performance, Day 56 for keep/refine/revert, and Day 90 for final learning. Do not declare an SEO experiment successful after a few days.

## Loop 3: new-content compounding

Every new article, byte-size, Tech Tuesday anchor or Signal Drop companion must declare one target query family, intent, cluster, canonical anchor, reader action, and its Day 28 and Day 90 reviews.

Before publish, confirm keyword-led metadata, one pillar link, two sibling links where supported, reciprocal-link work queued, intent-routed CTA, indexable body, popup capture for editorial content, and a canonical source `.md` upstream of Beehiiv.

After publish, check indexation at Day 7, queries at Day 28, evidence-backed improvement at Day 56, and keep/refresh/consolidate at Day 90.

## Loop 4: monthly revenue review

**Cadence:** first working day of each month.

### Advisory job

- organic sessions on buyer-intent content;
- clicks from those pages to advisory and Chapter 4;
- advisory sessions from organic-assisted journeys;
- booked calls and enquiries where source is known.

### Newsletter job

- organic visitors to informational content;
- newsletter signups attributed to organic;
- organic visitor-to-signup rate;
- subscriber quality by occupation or segment where known.

Traffic without either outcome is diagnostic, not the end goal.

## Month-on-month plan

### August 2026: restore the instrument panel

- Re-establish twice-weekly GSC snapshots with a durable export.
- Capture a fresh 28-day and 90-day baseline.
- Consolidate query variants into families and map each to one URL.
- Start the ledger with the three high-impression pages already identified.
- Run no more than two controlled CTR experiments.
- Publish or confirm indexation of the maturity-assessment on-ramp.
- Gate: no missed reports, all experiments have baselines, and no protected page-one query regresses because of a broad rewrite.

### September 2026: turn visibility into buyer intent

- Review August experiments at Day 28.
- Build one validated commercial-intent anchor from the backlog.
- Add reciprocal links from the C1 cost and strategy cluster.
- Run one human authority action per week.
- Gate: at least two buyer-query families register impressions and organic-assisted advisory clicks move off zero.

### October 2026: compound the technical cluster

- Ship one or two validated C4 anchors using the Tech Tuesday plus byte-size model where it saves effort.
- Prioritise OpenTelemetry profiling, wide events or AIOps only after demand validation.
- Upgrade the open-source learning-path hub and close reciprocal link debt.
- Gate: new anchors are indexed and gain non-branded impressions without cannibalising existing C4 pages.

### November 2026: prune and consolidate

- Identify pages declining across two consecutive equal-length periods.
- Refresh useful pages, merge competing intent, and stop feeding weak orphan content.
- Review author-URL duplication and other canonical splits.
- Gate: every reviewed page has a documented keep, merge, refresh or retire decision.

### December 2026: conversion and seasonal review

- Compare five months of organic traffic, signups, Chapter 4 clicks and advisory journeys.
- Re-rank the buyer and technical backlogs using evidence.
- Keep successful experiments as reusable playbooks.
- Gate: distinguish query families that create audience growth, commercial intent or noise.

### January 2027: set the next 90-day portfolio

- Allocate effort across Defend, Push, Build for Buyers and Build Technical.
- Limit the quarter to three strategic query families plus maintenance of existing winners.
- Set 28-day and 90-day targets from the reliable baseline.

## First experiment queue

| Priority | URL or issue | Hypothesis | First action |
|---|---|---|---|
| 1 | Cost-effective observability strategy page | Dominant queries and snippet do not match, causing 2,058 impressions and almost no clicks. | Pull page-query data. Change nothing until dominant intent is known. |
| 2 | Grafana Alloy page | The page-one foothold can gain clicks through snippet alignment and internal-link support. | Protect the body. Test only title or meta after the fresh baseline. |
| 3 | Observability Cost Conundrum | Position is close to page one but CTR is exceptionally weak. | Pull page-query data and test one snippet variable. |
| 4 | Duplicate author URLs | Split author URLs may dilute authority and reporting. | Confirm canonical behaviour and consolidate through Control if required. |
| 5 | Maturity-assessment on-ramp | A focused buyer-intent article can create the first organic route to advisory. | Publish, confirm indexation, then measure at Day 28, 56 and 90. |

The machine-readable starter ledger is `27_SEO_EXPERIMENT_LEDGER.csv`.

## Control wiring

This pack extends the already-filed Growth Health Check request. Control should repair the GSC data source, retain Monday and Thursday health checks, add the weekly opportunity selector and experiment-ledger read/write, and add the first-working-day monthly revenue review.

Publish, send, enrol, redirect and destructive changes stay behind the existing human gates. No SEO changes were applied to the live site in this design pass.
