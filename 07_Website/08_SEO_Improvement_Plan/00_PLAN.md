# Metrics & Mayhem — SEO & Content Improvement Plan

**Owner:** Allan Mann · **Created:** 2026-06-09 · **Source data:** beehiiv (Mastering Observability publication, 545 active subs) reconciled against `07_Website/00_SEO_Metadata_Tracker.xlsx`

## Why this plan exists

The email list is mature but flat-to-shrinking (net −3 over the last 4 weeks) and monetises at $0, so **organic/SEO is the realistic growth lever**. The current SEO tracker governs only 12 hub/system pages, while the articles already winning organic traffic have no SEO governance at all. This plan closes that gap and fixes three reconciliation mismatches surfaced on 2026-06-09.

## Folder map (this directory)

| Folder | Purpose |
|---|---|
| `00_PLAN.md` | This file — the step-by-step plan |
| `01_PROGRESS_TRACKER.md` | Live checklist + weekly log; updated weekly by the automated check |
| `02_SEARCH_CONSOLE_BASELINE.md` | Google Search Console baseline (rankings, impressions, CTR) |
| `03_CHANGE_CONTROL_SOP.md` | How content/SEO changes are proposed, applied, verified, reverted |
| `04_CHANGE_LOG.md` | System of record for every content/SEO change + its rollback value |
| `06_Search_Console_Reports/` | Dated weekly GSC snapshots written by the automated check |
| `01_Evergreen_Winners/` | Meta drafts for the 6 high-traffic articles to promote into the tracker |
| `02_Podcast_Companion_Posts/` | Web/SEO pages for the ~5 episodes live on Spotify/Apple/YouTube but missing from beehiiv |
| `03_Episode_Title_Standardisation/` | Rewritten `<title>` tags for the 12 Signal Drop posts |
| `04_Publication_Cleanup/` | Decision + action on the dormant "Metrics & Mayhem" beehiiv publication |
| `05_Weekly_Beehiiv_Reports/` | Dated snapshots the weekly scheduled task writes here |

---

## The plan — step by step

### Step 1 — Promote the evergreen winners (Priority: HIGH)
**Folder:** `01_Evergreen_Winners/`
These six articles pull real organic traffic with zero SEO governance today:

| Web views | Article |
|---|---|
| 552 | Harmonising IT: Crafting an Observability Strategy Like a Symphony |
| 544 | How Business-Aligned Observability Can Propel Your Competitive Edge |
| 399 | byte-size: What is Grafana Alloy |
| 344 | The Observability Cost Conundrum |
| 258 | OpenTelemetry Collector Implementation Guide |
| 250 | Putting It All Together: Cost-Effective Observability |

1.1 Draft a meta title (≤60 char) + description (≤160 char) + OG image plan for each — one file per article in this folder.
1.2 Add each as a **High-priority row** in `00_SEO_Metadata_Tracker.xlsx` (per-post rows — the tracker has none today).
1.3 Apply the meta in beehiiv; mark "Done" in the tracker.

### Step 2 — Close the podcast gap (Priority: HIGH)
**Folder:** `02_Podcast_Companion_Posts/`
17 episodes live on Spotify/Apple/YouTube; beehiiv only mirrors 12 → ~5 episodes have **no indexable web page**.

2.1 List all 17 platform episodes; diff against the 12 beehiiv Signal Drop posts to identify the missing ~5.
2.2 Draft a companion web post for each missing episode (title, summary, embed, CTA) — one file per episode here.
2.3 Publish in beehiiv; confirm each has a canonical URL + Signal Drop OG image.
2.4 Reconcile the tracker's "17 eps" note with the live count so they match.

### Step 3 — Standardise episode titles (Priority: MEDIUM)
**Folder:** `03_Episode_Title_Standardisation/`
Live titles read "Metrics & Mayhem | Signal Drop: <hook>" — brand boilerplate twice over buries the hook that drives search CTR.

3.1 Rewrite each of the 12 `<title>` tags to lead with the episode idea (e.g. "The Line You Won't Cross — Signal Drop").
3.2 Add a real CTA to each Signal Drop post (opens are strong at 31–50%, but CTR is near-zero at 0–4% — they engage but route nobody to the site/book).
3.3 Apply in beehiiv.

### Step 4 — Resolve the dormant publication (Priority: MEDIUM)
**Folder:** `04_Publication_Cleanup/`
A second beehiiv publication, "Metrics & Mayhem" (metricsandmayhem.beehiiv.com), is empty — 0 subs, 0 posts, 0 podcasts.

4.1 Decide: archive/delete, or consolidate into Mastering Observability.
4.2 If kept, ensure it never publishes duplicate content at a second domain (canonical conflict risk).
4.3 Record the decision + action here.

### Step 5 — Tidy low-value surfaces (Priority: LOW)
The 44 Observability Digest issues are curation, not rank targets. No SEO effort needed; confirm Archive/Tags default OG is acceptable. Add a custom Archive title for long-tail reach (already noted in tracker).

---

### Step 6 — Forward SEO: every episode SEO-ready by default (Priority: HIGH, ongoing)
**Detail:** `11_FORWARD_SEO_STEP6.md`. Restored 2026-06-26 after the Change_Requests corruption lost it (Ops_Log note for Control). A standard SEO front-matter block on every episode + blog, a 5-cluster topic map with internal linking, one intent-routed CTA, a weekly pre-Friday SEO checklist, and a Growth/SEO pass wired into the §25.6 cadence (template + task edits filed `[SEO]` for Control). First applied to Ep 21 (`03_Podcast/Episodes/21_*/21_SEO_launch_pack.md`).

---

## Definition of done
- All 6 evergreen winners have per-post rows in the tracker, marked "Done".
- 17 episodes each have an indexable beehiiv page; tracker count matches.
- 12 Signal Drop titles rewritten + CTAs added.
- Dormant publication decision recorded and actioned.
- Weekly beehiiv report running and filing snapshots to `05_Weekly_Beehiiv_Reports/`.
