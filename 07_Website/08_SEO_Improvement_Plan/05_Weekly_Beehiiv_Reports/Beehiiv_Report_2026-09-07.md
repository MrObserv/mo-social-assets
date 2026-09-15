# Beehiiv Report - 2026-09-07

**Publication:** Mastering Observability (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`).
**Window:** last 4 weeks (rolling), read live via the beehiiv MCP connector.
**Previous run:** 2026-08-31 (7 days).

---

## Subscribers and engagement

| Metric | 2026-09-07 | 2026-08-31 | Movement |
|---|---|---|---|
| Active subscribers | **561** | 562 | **-1** |
| Net subscribers (4wk) | **+5** | +7 | down |
| New subscribers (4wk) | 7 | 9 | down |
| Churned (4wk) | 2 | 2 | flat |
| Open rate (4wk) | **38.98%** | 36.97% | **+2.01pt, third consecutive rise, highest in this log** |
| Click rate (4wk) | 3.83% | 3.93% | -0.10pt, second consecutive fall |
| Earnings | $6.37 | $6.37 | flat, third consecutive read |

The headline count fell by 1 while the 4-week net reads +5. The two are measured differently; the honest reading is that **growth slowed, it did not reverse.**

Open rate is the clear positive: three consecutive rises, 34.27% to 36.97% to **38.98%**. Click rate has drifted down over the same period, so the list is opening more and acting less.

---

## New subscribers by acquisition source (4 weeks)

| Source | Count | Last run |
|---|---|---|
| website: direct / (none) | **4** | 4 |
| website: linkedin.com / referral | **2** | 2 |
| recommendation: www.project-overwatch.com / referral | **1** | 1 |
| recommendation: 7wdata | **0** | 3 |
| **Total** | **7** | 10 |

**The recommendation network collapsed from 4 to 1 and 7wdata disappeared from the breakdown entirely.** Last run recommendations were the strongest converter at 4 of 10; this run they are the weakest at 1 of 7.

**This does not yet reverse the 08-30 finding that recommendations out-convert LinkedIn.** The total sample is 7 subscribers, which is noise-dominated. It is recorded as movement to watch and needs two more reads before the channel ranking is restated in either direction.

Website direct is the only source steady across both runs, at 4 each time.

---

## Content

- **Published posts: 148** (145 on 08-31). Three new in seven days.
- **Signal Drop pages: 23 tagged, 22 unique.** The duplicate "Your Role Changes Every Hour" remains live on two IDs, **7th run flagged.** Plan target of 17 is met and has been since 08-01.

---

## Website analytics (4 weeks vs prior 4 weeks)

| Metric | This period | Prior period | Change | vs last run |
|---|---|---|---|---|
| Unique visitors | **346** | 153 | **+126.1%** | was 282 |
| Sessions | **476** | 231 | **+106.1%** | was 389 |
| Page views | 699 | 596 | +17.3% | was 680 |
| Bounce rate | **48.32%** | 44.59% | +8.4% | **was 50.39%, now back under 50%** |
| Session duration | **168.86s** | 112.88s | +49.6% | **was 76.24s, more than doubled** |

Traffic doubled and attention improved sharply on both quality measures. **The 08-24 flag "site conversion quality degrading, bounce crossed 50%" is eased on a second consecutive read.**

### Top referrers (sessions)

Direct 251 · **linkedin.com 107 + android-app LinkedIn 39 = 146 combined** (up from 134) · google.com 29 · masteringobservability.com self 16 · atlassian.net 7 (new) · beehiiv.com 6 · gmail app 3 · static.microsoft 3 · substack.com 3 · cto.academy 3 · facebook.com 3 · reddit.com 2 · t.co 1 · slack app 1.

LinkedIn reach continues to climb and continues to convert at roughly 2 signups.

### Top pages (page views)

/ 140 · **/p/autonomous-sre-agents-where-the-gate-lives 114** (was 32, up 3.5x, the engine of this period's traffic) · /p/the-signal-2026-08-21 68 · /p/what-is-a-wide-event 35 · poll results 31 · /p/observability-maturity-assessment 29 · /p/lead-with-the-promise 25 · book 24 · podcast 23 · quiet-isnt-good 18 · own-the-signal 14 · /p/the-signal-2026-08-28 13 · /p/ai-sre-inefficient-queries 13 · authors/allan-mann 11 · digest-july 11 · **/products/metrics-mayhem-chapter-4 10** · **/advisory 8** · /p/observability-rollout-blockers 10 · /p/what-is-bmc-helix 9 · /subscribe 9 · **/metrics-and-mayhem/free-chapter 7**.

**The money pages moved against the site.** Sessions doubled while `/advisory` halved (16 to 8) and `/free-chapter` more than halved (16 to 7). See `GSC_Report_2026-09-07.md` for the search-side reading of the same gap.

---

## Automations

**18 total: 14 live / 4 draft. Every counter is identical to the 08-31 read.** No enrolment, completion, open or click moved anywhere in the automation estate in seven days.

| Automation | State | Enrolled | Completed | Open | Click |
|---|---|---|---|---|---|
| Survey Follow up (signup welcome) `aut_fdd8e3d1` | live | 313 (1 in progress) | 312 | 53.42% | 16.46% |
| Stream router: Both | live | 5 | 5 | 60.0% | 0% |
| Stream router: Technical | live | 4 | 4 | 50.0% | 0% |
| Stream router: Leadership | live | 3 | 3 | 66.67% | 100% |
| Warm Contributors nurture | live | 7 | 7 | 33.33% | **0%** |
| Lead magnet automation `aut_84fd88d8` | live | 9 | 9 | 11.11% | **0%** |
| Role router: Architect / Specialist | live | 1 | 1 | 0% | 0% |
| Role routers (other 6) | live | **0** | 0 | 0% | 0% |
| Send Sub Form | live | 0 | 0 | 0% | 0% |
| Drafts (New 2025 Survey, Test, Follow up on Data, Test) | draft | 0 | 0 | 0% | 0% |

**No DRAFT automation sits behind a live capture page.** The four drafts are legacy 2024/2025 test flows. The real leak in this estate is the **absence** of a `/free-chapter` nurture flow, plus the Chapter 4 form below.

## Subscribe forms

| Form | Created | Draft theme pending | Note |
|---|---|---|---|
| `310e7847-1bcc-43eb-9d0d-33af4a209645` "Free Chapter 4 (lead magnet, LinkedIn + gated)" | 2026-09-01 | **true** | `updated_at` identical to `created_at`. **An unpublished theme edit has sat on the live gated lead-magnet form for six days, untouched.** Captures email only. |
| `ad0cdd4a-bf3c-493a-90e1-9b7209f2cf9a` "New subscribe form" | 2026-05-27 | false | Carries First Name (required), Role (dropdown) and sub_stream (dropdown). Healthy. |

---

## Surveys

3 surveys, all live, **zero new responses since the last run.**

| Survey | Responses | Most recent |
|---|---|---|
| Welcome / subscribe (`832c3443`) | 73 | **2026-04-16 (4.7 months dry, 7th flag)** |
| Shape Our Future (`8e556859`) | 3 | 2025-02-03 |
| Unsubscribe (`3d21b2b4`) | 5 | 2026-07-20 |

**Contributor / collaboration pool:** `Warm Contributors` segment reads **59 active members** live (all-time 63: 27 Yes + 36 Maybe; 4 ever contacted). `Want help (declared a need)` 57. `High-intent (raised their hand)` 26. The nurture flow has reached 7 of them at **0% click**.

## Segments worth noting

| Segment | Members | Note |
|---|---|---|
| Stream: preference not set | **549** | Unmoved across six reads |
| Buyers, senior (Role: Head of / C-level) | **2** | Unmoved since 08-23 |
| Advisory clickers | 2 | Unmoved |
| Stream: Technical & Practitioner | 11 | The cohort the Tech Tuesday piece emails |
| Stream: Leadership & Strategy | 9 | Best open rate on the list at 87.79% |
| Sunset candidates 90d (review only) | 150 | Never actioned |

Both the 549 pool and the buyer segment are already carried by open `Ops_Log.md` rows (lead-generation chat, 2026-09-04). Not re-escalated here.
