# Beehiiv Report - 2026-09-14

**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`)
**Window:** last 4 weeks, read live via the beehiiv MCP. Previous run 2026-09-07, so deltas are a clean 7-day trend rather than noise.

---

## Headline numbers

| Metric | 2026-09-14 | 2026-09-07 | 2026-08-31 | Direction |
|---|---|---|---|---|
| Active subscribers | **562** | 561 | 562 | recovered the 1 lost |
| Open rate (4wk) | **40.25%** | 38.98% | 36.97% | **4th consecutive rise, first above 40%** |
| Click rate (4wk) | **2.77%** | 3.83% | 3.93% | **3rd consecutive fall, log low** |
| New subscribers | 5 | 7 | 9 | falling |
| Churned | 2 | 2 | 2 | steady |
| Net | **+3** | +5 | +7 | **3rd consecutive fall** |
| Earnings | $6.37 | $6.37 | $6.37 | flat, 4th read |
| Published posts | **150** | 148 | 145 | +2 |

### The open/click divergence is the story

Open rate has risen three runs running: 36.97, 38.98, 40.25. Click rate has fallen three runs running: 3.93, 3.83, 2.77, and the last step is by far the largest. **More people are opening than at any point in this log and fewer of them are clicking than at any point in this log.**

The same shape appears on the search side the same day: GSC impressions rose 12.7% while clicks fell by one and CTR fell from 0.9% to 0.8%. **Two independent surfaces are saying the same thing about what happens after the headline.** Three data points is a pattern worth watching, not a diagnosis, and it is offered as a question for Allan rather than an answer.

### Churn is not the problem, acquisition is

Churn has been flat at 2 for three consecutive runs. Net growth fell from +7 to +5 to +3 entirely because new subscribers fell from 9 to 7 to 5.

## Acquisition sources (last 4 weeks)

| Source | Count |
|---|---|
| website: direct / (none) | 3 |
| website: linkedin.com / referral | 2 |
| website: reddit.com / referral | **1 (first ever in this log)** |
| recommendations | **0** |

- **The recommendation network contributed ZERO this run.** It was 4 of 10 on 08-31, 1 of 7 on 09-07, and 0 of 5 now. **The 08-30 finding that recommendations out-convert LinkedIn is contradicted on two consecutive reads and should no longer be quoted as current.** `crm-pipeline-harvest` recorded the same reversal from the same numbers this morning, so it is not escalated twice.
- **`reddit.com` produced a subscriber for the first time.** Reddit referral sessions also rose 2 to 3. One subscriber is not a channel; recorded so a second reading has something to compare against.
- **DATA CAVEAT: the source counts sum to 6 while `new_subscribers` reads 5.** Both figures come from the same `get_publication_stats` call and they reconciled exactly last run. The gap is one subscriber and changes no conclusion, but the breakdown should not be treated as exact.

## Content state

- **150 published posts**, up 2 from 09-07.
- **ZERO scheduled posts.** Proved against the working 150-post `published` call on the same publication, so this is a checked zero and not a failed call.
- **Exactly ONE draft:** "Somebody Turned It On" (`post_3d02feb7`, created 2026-09-11, updated 2026-09-12), the 13 September blog. `social-daily-drive` raised the empty publishing pipeline as a Needs-Allan item this morning; not re-escalated here.
- **Signal Drop: 23 tagged (`signal_drop`), 22 unique.** Duplicate "Your Role Changes Every Hour" still live on two IDs, **8th run flagged**. Plan target 17, met.
- **CHG-014's "10 unpublished Signal Drop drafts" is FALSE and this run measured it.** There is one draft on the account and it is not a Signal Drop. All eleven CHG-014 titles resolve to published posts. See the health check Section 7.

## Website analytics (4wk vs prior 4wk)

| Metric | Total | Prior period | Change | vs last run's absolute |
|---|---|---|---|---|
| Unique visitors | 337 | 188 | +79.3% | 346 to 337 |
| Sessions | 471 | 285 | +65.3% | 476 to 471 |
| Page views | 753 | 592 | +27.2% | 699 to 753 |
| Bounce rate | 49.04% | 48.42% | +1.3% | 48.32% to 49.04% |
| Session duration | **207.77s** | 73.74s | **+181.8%** | 168.86s to 207.77s |

**The traffic surge has plateaued while attention deepened again.** Session duration is the highest in this log and has more than doubled on two consecutive reads. Bounce crept up 0.7pt but held under 50% for a second run, so the 08-24 "conversion quality degrading" flag stays eased.

### Top referrers (sessions)

Direct 259 · **LinkedIn 135 combined** (linkedin.com 104 + android app 31, down from 146) · google.com 25 (was 29) · masteringobservability.com self 17 · atlassian.net 7 · beehiiv.com 6 · cto.academy 4 · static.microsoft 3 (new) · reddit.com 3 · facebook.com 3 · gmail app 3 · t.co 2 · slack app 1 (new).

### Top pages (page views)

`/` 158 · **`/p/autonomous-sre-agents-where-the-gate-lives` 123** (was 114, still the engine) · `/p/the-signal-2026-08-21` 69 · podcast 33 · `/p/what-is-a-wide-event` 33 · **book 32** · `/p/ai-sre-inefficient-queries` 22 · `/subscribe` 20 · maturity assessment 19 · the-signal-2026-08-28 19 · **`/p/what-is-bmc-helix` 18** · **`/advisory` 17** · `/archive` 16 · own-the-signal 13 · **`/metrics-and-mayhem/free-chapter` 13** · lead-with-the-promise 10 · **`/authors/allan-mann` 10** · rollout-blockers 10 · **`/products/metrics-mayhem-chapter-4` 9**.

**All four money pages recovered on-site this run**, reversing last run's collapse: advisory 8 to 17, free-chapter 7 to 13, book 24 to 32. Chapter 4 slipped 10 to 9. This happened while sessions were roughly flat, so it is a routing change rather than a volume effect.

## Automations

**18 total: 14 live / 4 draft. One counter moved, after a fortnight in which none did.**

| Automation | State | Enrolled | Completed | Open | Click | vs last run |
|---|---|---|---|---|---|---|
| Survey Follow up (signup welcome) | live | **314** | **313** | 53.25% | 16.46% | **+1 enrolled, first movement since 08-31** |
| Role router: Architect / Specialist | live | 1 | 1 | 0% | 0% | unchanged |
| Role routers (other 6) | live | 0 | 0 | 0% | 0% | unchanged, 4th run |
| Stream router: Both | live | 5 | 5 | 60% | 0% | unchanged |
| Stream router: Leadership | live | 3 | 3 | 66.67% | 100% | unchanged |
| Stream router: Technical | live | 4 | 4 | 50% | 0% | unchanged |
| Warm Contributors nurture | live | 7 | 7 | 33.33% | **0%** | unchanged |
| Lead magnet automation | live | 9 | 9 | 11.11% | **0%** | unchanged |
| Send Sub Form | live | 0 | 0 | 0% | 0% | dormant |
| 4 legacy drafts | draft | 0 | 0 | 0% | 0% | unchanged, 9th run |

**The welcome flow enrolling its 314th subscriber confirms it is firing on new signups.** Everything else in the estate is frozen.

**DRAFT-automation leak check: no automation is in DRAFT behind a live capture page.** The four drafts are legacy 2024/2025 test flows tied to nothing. The real leaks are the **absent** `/free-chapter` nurture flow (GR-13-02) and the email-only Chapter 4 capture form.

## Lead-magnet capture

**The 09-07 flag is CLEARED, and only half of it.** Subscribe form `310e7847` "Free Chapter 4 (lead magnet, LinkedIn + gated)" now reads **`has_draft_theme_changes: false`**, so the unpublished theme draft that sat on the live form from 01 to 07 September is gone.

**But `updated_at` remains identical to `created_at` (2026-09-01T08:03:08Z), so the form has never actually been edited.** The theme draft was discarded, not published. **The form still captures email only, so the LinkedIn gated-asset surface still feeds none of the seven idle role routers.** P1 of `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md` remains the outstanding fix.

## Surveys and segments

**3 surveys, all live, no new responses since the last run.**

- Welcome / subscribe survey (`832c3443`): 73 responses, last **2026-04-16**, now **4.9 months dry, 8th run flagged**.
- Shape Our Future (`8e556859`): 3 responses, last 2025-02-03.
- Unsubscribe survey (`3d21b2b4`): 5 responses, last 2026-07-20.

**Segments (live, all unchanged):** Warm Contributors 59 · Want help 57 · High-intent 26 · Buyers senior `seg_05110b93` **2** (unmoved since 08-23) · Stream preference not set **549** (unmoved across seven reads) · Practitioners 26 · Leaders and Buyers 9 · Vendor and Sales 9 · Sunset candidates 148.

The contributor pool and the two unmoved segments are already carried by open Needs-Allan rows and by this morning's `crm-pipeline-harvest` run, which re-derived all six intent segments unchanged. **Not re-escalated here.**

## Method notes

- **The bash sandbox did not start** (virtiofs mount failure, Windows update of 8 September named by the tool), fifth consecutive run across the estate. All figures read through connectors and file tools; no arithmetic was scripted.
- **Per-automation `get_automation_stats` was not called individually.** `list_automations` returned state, enrolled, in-progress, completed, open and click for all 18 on one page, which covers the spec's data need. Matches 08-24, 08-31 and 09-07 precedent.
- Signal Drop counted by `content_tags` filter on `signal_drop`, per the 08-03 methodology correction. The raw title-match count is 20 published titles containing "Signal Drop", one of which is the generic landing page.
