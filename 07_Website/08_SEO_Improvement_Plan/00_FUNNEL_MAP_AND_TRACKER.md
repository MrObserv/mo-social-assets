# Funnel Map & Tracker — the single source of truth

**Purpose.** ONE place that maps the whole funnel, Acquire → Engage → Segment → Convert → Measure, to the **live Beehiiv object IDs**, with each component's status and where it is tracked. Built 2026-08-24 after a full audit found the funnel was fully built but only partially wired, and tracking was fragmented across six documents with no end-to-end map. This doc collapses those fragments. The **Growth Health Check** (`13_GROWTH_HEALTH_CHECK.md`, Mon 07:05) refreshes the status column each week.

**The model (why every piece exists).** Two revenue jobs: **feed ADVISORY** (£1k-2k/day, £5k-15k assessments) and **grow the NEWSLETTER** (~561 active now, target 1,500-3,000). Everything routes to one or the other; anything that does neither is vanity. Full model: `05_SEO_TO_REVENUE_MODEL.md`.

**Live baseline (2026-08-24):** 561 active, 34.3% open, 4.2% click, +4 net / 4 weeks, $6.37 earnings.

---

## ACQUIRE
| Component | ID | Live? | Tracked | Note |
|---|---|---|---|---|
| Inline subscribe form (Role + stream + first name) | `ad0cdd4a` | LIVE | Health Check §3 | Captures Role, but is not the main surface |
| Post popup (captures MOST signups) | Beehiiv Settings | LIVE, **email-only** | here | The Role-capture gap: popup does not ask Role |
| Free chapter / lead magnet (Chapter 4) | `/metrics-and-mayhem/free-chapter` | LIVE | CTA Library | The acquisition pivot |
| Referral program | `mile_48d50b8e` | LIVE but **thin & inert** | here | 1 milestone (shout-out at 3 refs); drives ~0. The "recommendation" acquisitions are beehiiv Boosts, not this |
| Acquisition sources | — | organic search + LinkedIn + Boosts | Health Check §1 | Newest via ChatGPT search (new channel) |

### ACQUIRE, channel layer (added 2026-08-29)

**Provenance, stated because it matters.** Live pull from Buffer and Beehiiv covering **29 May to 28 Aug 2026**, produced by a Cowork session and handed to Control by Al. **Control has NOT independently re-derived the reach, engagement or attribution figures**, so treat the table as sourced rather than verified. The 08-24 funnel audit was Beehiiv-side only; this is the missing acquisition-channel layer in front of it.

**What Control DID verify live (2026-08-29):** Buffer `list_channels` returns **six channels**, `masteringobserv` (X) carries `isLocked: true`, every other channel `isLocked: false`, and `get_account` shows `limits.channels: 5`. **So the "six channels on a five-channel plan, X locked out" claim is confirmed**, and the slot-freeing option in the open decision below is real rather than assumed.

| Channel | Posts | Reach | React | Comm | Eng | Subs |
|---|---|---|---|---|---|---|
| LinkedIn profile (Allan Mann) | 91 | 40,144 | 748 | 136 | 1.47% | 7 |
| LinkedIn MO page | 57 | 7,281 | 61 | 49 | 4.29% | 0 |
| TikTok `metrics_and_mayhem` | 52 | 20,567 | 120 | 3 | 0.56% | 0 |
| Instagram `the_observability_digest` | 89 | 5,561 | 64 | 21 | 1.98% | 0 |
| YouTube Mastering Observability | 80 | n/a | 79 | 17 | 3.45% | 1 |
| X `masteringobserv` | LOCKED | | | | | |

Totals: **369 posts, ~73,500 reach, 33,546 video views, 31 new subscribers, net +15.**

**Reach is NOT additive across networks. Treat it as scale, not audience.**

**Subscriber attribution (31):** direct 8, recommendation network 9 (project-overwatch 5, 7wdata 4), LinkedIn 7, Google organic 4, YouTube 1, embed 1, claude.ai 1.

**Findings:**

1. **The personal profile carries 55% of reach and 70% of all reactions off 91 posts.** Effort allocation does not reflect that.
2. **TikTok and Instagram are 141 posts, 38% of total output, 26k views, 3 TikTok comments and ZERO attributable subscribers.**
3. **0.042% of reach becomes a subscriber.** Read that as a measure of the CAPTURE layer, not of the content.
4. **The capture join is ONE generic inline form** (`ad0cdd4a-bf3c-493a-90e1-9b7209f2cf9a`, created 2026-05-27, never edited) serving every channel and every asset. There is no per-asset form.
5. **`aut_84fd88d8` (lead magnet) shows 8 enrolled at 12.5% open**, which corroborates the P1 dead-welcome-path leak already recorded under `GR-2026-08-24-02`.

**Cross-reference, do NOT double-action.** This layer sits IN FRONT of ground already owned: `GR-2026-07-23-01` (Chapter 4 as the canonical gated asset), `GR-2026-08-24-02` (funnel map, P1 dead welcome path, `aut_84fd88d8`), `GR-2026-08-23-03` and `-04` (segment and poll work, 549 of 560 with no stream set). Also related: `2026-07-17_GROWTH_linkedin-gated-document-ad-lead-magnet.md`, the same mechanic observed on a Workday ad.

**Open decisions, for Al (not yet filed as CR rows, see the note at the foot of this section):**

- **(b) Rule on TikTok and Instagram.** Either awareness-only with NO conversion expectation recorded against them, or stop one and free the Buffer slot so X unlocks. On the evidence, 38% of output is producing no measurable subscriber outcome, but "awareness-only" is a legitimate answer if that is the intent.
- **(c) Confirm an owner for the PER-ASSET subscribe form for Chapter 4.** This is the only missing object between a decided offer and a captured name, and it is the layer-5 gap in the "Download Button" teardown (artifact `fdbab097-bfa8-4fa2-87b2-4bbef9ffeba1`, layers 1, 2, 3, 4 and 6 all held).

**RIGHTS POSITION, recorded 2026-08-29 because it was nowhere in this workspace.** *Metrics & Mayhem* is **self-published under Cleartext Press, Al's own imprint.** It is NOT an O'Reilly title. **Al holds all rights, so there is NO permission step in front of any chapter use, excerpt, gating or co-branding decision.** (The O'Reilly references in `01_Book/` are correct citations of other authors' titles and must not be "corrected".) This removes an assumed blocker from the Chapter 4 gating work.

## ENGAGE
| Component | ID | Live? | Tracked | Note |
|---|---|---|---|---|
| Published content | 140 posts | LIVE | Content Calendar | The Signal (weekly) is the recurring touch |
| Stream poll "Which do you want more of?" | `poll_9f31d69f` | PUBLISHED, **stalled** | Health Check §5 | Shown once (11 votes), now standing in The Signal |
| Issue-rating poll | `poll_d99ab91d` | PUBLISHED, **1 appearance / 0 completions** | Health Check §5 | §5 FIX PENDING: name has an em dash (locked, rename in UI) |
| Role poll "What is your role" | `poll_cbff7a52` | DRAFT until the nudge sends | here | Feeds the 7 role routers; activates on send of `post_cb1997b5` |
| CTA Blocks A (advisory) / B (newsletter) / D (links hub) / Q (pull-quote) | `06_CTA_LIBRARY.md` / `08_CTA_HTML_SNIPPETS.md` | LIVE, applied per-post | CTA Library | Block C retired; advisory routing = commercial intent |
| 8 legacy 2024 polls | (various) | stale one-shots | nowhere | Cleanup candidates |

## SEGMENT
Router automations (poll → set a custom field):
| Component | ID | Live? | Note |
|---|---|---|---|
| Stream routers: Technical / Leadership / Both | `aut_782f7d9b` / `aut_48c6e2da` / `aut_c284da01` | LIVE | Leadership shows 2 votes / 1 enrol — reconcile |
| Role routers (7, one per role) | `aut_6e82b835` `aut_7cfcf71b` `aut_247ba48f` `aut_1b1207d8` `aut_861b811d` `aut_37532acb` `aut_17750813` | LIVE (published 2026-08-24) | 0 enrolments until the Role poll is sent in the nudge |

Segments (11 live):
| Segment | ID | Size | Purpose |
|---|---|---|---|
| Stream: Technical | `seg_eca55c0b` | 10 | Tech content audience |
| Stream: Leadership | `seg_566d2362` | 8 | Leadership content audience |
| Stream: preference not set (nudge) | `seg_b67292f1` | 550 | **The nudge target; has never been drained** |
| Leaders & Buyers (occupation) | `seg_d9aa9179` | 15 | Messy (catches self + vendors); retire once Role fills |
| Buyers — senior (clean Role) | `seg_05110b93` | 2 | Clean buyer segment; grows as Role fills |
| High-intent (raised their hand) | `seg_bbf75d3f` | 26 | Collaboration/guest cohort; the dotslash number |
| Practitioners | `seg_6708055e` | 26 | Overlaps Stream:Technical |
| Profile Known (has occupation) | `seg_c2e8a896` | 59 | Diagnostic denominator |
| Vendor & Sales (exclude) | `seg_b49b5921` | 9 | Advisory exclusion |
| Warm Contributors | `seg_dcd86d30` | 59 | Nurture pool |

## CONVERT
| Component | ID | Live? | Tracked | Note |
|---|---|---|---|---|
| Advisory page (from £5k) | `/advisory` | LIVE, **0 organic clicks** | CRM; Conversion-Gap | The money page; not converting from search yet |
| CRM / pipeline tracker | `08_Revenue/CRM_Pipeline_Tracker.md` | LIVE (weekly harvest) | itself | Convert SoT; leads consolidated 2026-08-23 |
| Warm Contributors nurture | `aut_494af722` | LIVE (7 enrolled) | Warm-Contributor Tracker | 1:1 exclusions honoured |
| Lead-magnet automation (Chapter 4) | `aut_84fd88d8` | LIVE, **12.5% open (leak)** | here | Top-of-funnel automation barely opening |
| Advisory-link click tracking | — | **NOT wired** | here | Returns empty every harvest |

## MEASURE
| Component | ID | Live? | Note |
|---|---|---|---|
| Growth Health Check (Mon 07:05) | `13_GROWTH_HEALTH_CHECK.md` | LIVE, **off-cadence + gaps** | Refreshes this map |
| Weekly beehiiv + GSC reports | `05_Weekly_Beehiiv_Reports/` `06_Search_Console_Reports/` | **GSC stopped 2026-07-06** | Restore the export |
| Welcome survey | `832c3443` | LIVE, **0 responses since 2026-04-16** | Silent stall |
| "Survey Follow up" welcome automation | `aut_fdd8e3d1` | LIVE, 311 enrolled, 53.6% open | **The dead welcome path; not in any funnel doc until now** |

---

## Open leaks & gaps (priority order)
1. **P1 — Welcome path: a redesign was built but never published (diagnosed 2026-08-24).** The LIVE `aut_fdd8e3d1` still runs the stale 2024 survey nudge, pointing at survey `832c3443` (0 responses since 16 Apr, now superseded by the subscribe-form fields + the polls). A COMPLETE redesign sits in STAGING (15-min delay, free-chapter button, stream poll), and the **Role poll has now been added to it (2026-08-24)** so both route via the live stream + role routers. **FIX = Al publishes the staging automation** (editor: app.beehiiv.com/automations/fdd8e3d1-565a-4553-9cd0-6a28071745ae/workflow). This also captures Role for popup signups (closing that gap). Then retire the 2024 survey `832c3443` and the overlapping lead-magnet automation `aut_84fd88d8` (12.5% open).
2. **P1 — Role capture depends on sending the nudge.** 7 role routers are LIVE but fire for nobody until the Role poll is shown; it is embedded in `post_cb1997b5` (schedule Wed 26 Aug). If that never sends, Role never fills.
3. **P2 — The 550 nudge pool never drained** (no Thursday nudge ever sent). Send `post_cb1997b5`, then re-surface both current polls on a schedule.
4. **P2 — §5 breach:** rating poll `poll_d99ab91d` name has an em dash (locked; rename in the Beehiiv UI).
5. **P3 — Instrument the money path:** wire advisory-link click tracking; the advisory page + free chapter both show 0 organic clicks.
6. **P3 — Cleanup:** delete 4 stale draft automations (`aut_2ccf87c5`, `aut_bcef91fc`, `aut_e79d7bea`, `aut_9df697dc`) + dormant `aut_2de16657`; retire the occupation advisory-target once Role fills; cull the 8 stale 2024 polls; strengthen or drop the referral program.
7. **P3 — Docs describing things never built:** the reply/click Gmail bridge + the podcast-guest intake (`27_REPLY_CLICK_KEYWORD_FLOW_DESIGN.md`) were never built; either build or formally shelve so a design doc stops reading as shipped funnel.

## How this stays tracked
- This file is the **single source of truth**. The Monday Growth Health Check updates the status/size columns and appends a dated segment snapshot (per the 2026-08-23 addendum).
- When a funnel object is built or changed, update the relevant row here in the same patch, and file a `GR-` line for Control.
- Trust the **live Beehiiv pull** over any doc stamp; several docs (`00_GROWTH_NEXT.md`, the CRM) were already stale against live state at build time.

**Last full audit:** 2026-08-24 (agent audit + live reconcile). Filed GR-2026-08-24-02.
