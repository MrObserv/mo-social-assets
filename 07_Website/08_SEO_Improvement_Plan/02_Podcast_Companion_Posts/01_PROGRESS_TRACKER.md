# SEO Improvement — Progress Tracker

**Updated weekly by the `beehiiv-seo-weekly-check` scheduled task.** Last manual update: 2026-06-09.
Status key: ⬜ not started · 🟡 in progress · ✅ done

## Baseline (2026-06-09)
- Active subscribers: **545** · 4-wk open: **33.88%** · 4-wk net subs: **−3** · Earnings: **$0**
- Published posts: 92 (44 Digest · 12 Signal Drop · 36 evergreen/other)
- Signal Drop pages live in beehiiv: **12** (target 17)

## Step 1 — Evergreen winners → tracker rows
- ✅ 1.1 Meta drafted for all 6 articles (2026-06-09 — see `01_Evergreen_Winners/`)
- ✅ 1.2 6 High-priority rows added to SEO tracker (2026-06-09 — rows 16-21, all checks OK)
- 🟡 1.3 Meta applied in beehiiv (verified 2026-06-12): 4 clean (OTel, Business-Aligned, Cost Conundrum, Grafana Alloy). The 2 remaining fixes (Harmonising IT OG title "rafting"→"Crafting"; Cost Strategy 138-char description) were **staged to draft via API on 2026-06-24** (CHG-002/-005) — set ✅ once Al publishes and the live values are confirmed.

## CTA routing on the 6 evergreen winners (SEO-to-Revenue Step 3 / fastest lever)
- ✅ Block A/B CTAs LIVE on all 6 evergreen posts (CHG-007..012) — staged via the beehiiv API 2026-06-24, **Al published all 6 the same day** (4× advisory Block A, 2× newsletter Block B per `06_CTA_LIBRARY.md` routing).
- ✅ In-body subscribe buttons restyled to v2.0 in place (CHG-013); Grafana Alloy broken subscribe link repointed to canonical + typo fixed. New in-body button rule added to `Brand_Design_System_v2.md`.
- ✅ Meta fixes CHG-002 (OG title) + CHG-005 (138-char description) applied + published 2026-06-24.
- ⬜ **Measure:** next GSC/beehiiv check reads advisory-page visits + signups by source against this as the before/after baseline. Keep this the only change on these 6 pages until measured (don't muddy attribution).

## Queued — v2.0 brand sweep of the evergreen set (PARKED, Al 2026-06-24)
- ⬜ Regenerate the 6 evergreen post thumbnails to v2.0 brand (1200×630, per `06_Brand_Assets/Design_Standards/Blog_Thumbnail_Standard.md`); set via `edit_post` `thumbnail_image_url`, re-publish (web-only, no email resend).
- ⬜ Same pass: clear the legacy cruft on these posts (dated "Invitation to Contribute" blocks, old social links / Google "virtual Coffee" link).
- **Gate:** do NOT start until (1) the CTA impact above is measured, and (2) there's a social re-promo of these posts coming up (thumbnails earn their keep on share cards, not in Google search — low priority for search traffic). Touch each post once.

## Step 2 — Podcast companion posts
- ✅ 2.1 Diff run (2026-06-15): real gap was ONE page, "Context, Intent, Headline" (Jan 6), not 5.
- ✅ 2.2 Companion post for the one missing episode created as a beehiiv DRAFT via API 2026-06-24 (`post_99b44a1f-39e3-4fcd-8e29-fd7380377410`), hook-first title + Block B CTA. CHG-015.
- ✅ 2.3 PUBLISHED web-only 2026-06-24 (Al), back-dated to the episode date (display 2026-01-06) so it slots into the archive. Live: /p/metrics-mayhem-signal-drop-context-intent-headline. Full tag cluster + Signal Drop OG card. Optional later: add the inline Spotify embed (body already links "Listen to the episode").
- ✅ 2.4 Back-catalogue complete: every live Signal Drop episode now has an indexable web page (11 episode pages + this companion).
- 🟡 2.4 Count reconciled: the live Signal Drop set is 11 episode pages (was tracked as 12; the 12th is the generic landing page). Once this companion publishes, that is the full back-catalogue of live episodes covered.
- 🟡 2.5 Back-catalogue backfill IN PROGRESS 2026-06-25 (Growth). **CORRECTION:** the five early episodes the 2026-06-21 SEO-chat note flagged DO exist; an earlier check using the partial podcast hub + web search wrongly concluded they did not. The anchor.fm RSS (21 items, ground truth) confirms a Nov-Dec 2025 back-catalogue: You Can't Market Trust (16 Dec), The Basics Are Not Optional (3 Dec), The Burnout You Don't Notice (29 Nov), Skip the Theatre (28 Nov), Your First or Your Last (27 Nov), plus a "Welcome" trailer (skipped). Built all five as lean companion beehiiv DRAFTS 2026-06-25 (first-person body, Block B CTA, Signal Drop cover thumbnail, Spotify listen link, signal_drop+newsletter tags, hook-first SEO titles), pending Al publish: You Can't Market Trust `post_ca6d157c`, The Basics Are Not Optional `post_6b7200a9`, The Burnout You Don't Notice `post_2ff9f452`, Skip the Theatre `post_addd50f1`, Your First or Your Last `post_c155289e`. With these + Context Intent Headline, every live episode has a companion. Lesson: the RSS feed is ground truth, not the partial hub.

**Findings 2026-06-15 (Claude, report only — confirm before ticking):** Diff run against the live podcast feed (see `02_Podcast_Companion_Posts/00_DIFF_live_vs_beehiiv.md`). Live catalogue is 13 Signal Drops (Dec 2025 to Jun 2026, with a Mar to Apr hiatus) plus 2 deep dives. 12 of 13 already have a `/p/` companion. **Only 1 is genuinely missing: "Context, Intent, Headline" (Jan 6, 2026)** — paste-ready draft in `02_Podcast_Companion_Posts/context-intent-headline.md`. Both deep dives already have blog companions. Eps 20 and 21 are in the content calendar with beehiiv sends scheduled (Jun 22 / ~Jun 26), so they self-resolve. The plan's "5 missing / target 17" looks over-stated; real gap is ~1 live page (back-catalogue pre-Dec-2025 unverifiable, Spotify/Apple JS-rendered). beehiiv connector cannot create posts (read-only), so publishing "Context, Intent, Headline" is a manual paste in beehiiv.

## Step 3 — Episode title standardisation (DONE 2026-06-24, staged)
- ✅ 3.1 11 hook-first `<title>` tags written + applied to default_title/og_title/twitter_title (the real set is 11 signal_drop posts, not 12 — the 12th was the generic landing page). CHG-014.
- ✅ 3.2 v2.0 Block B (newsletter) CTA added to all 11 Signal Drop posts.
- 🟡 3.3 Applied via API as drafts; #1 published live by Al, other 10 awaiting Al's publish.
- Flagged pre-existing data issues (see CHG-014): crossed slugs on Control Beats Perfection / The Last Person in the Queue; wrong subtitle on Progress Isn't Linear; "page you" §5 violations in two meta descriptions.

## Step 4 — Dormant publication
- ✅ 4.1 Verified empty (0 subs / 0 posts / $0, all-time) and recommendation recorded: archive/delete (nothing to consolidate). See `04_Publication_Cleanup/DECISION.md`. Pub `pub_199a2744-1999-4773-a8c1-6213963cef54`.
- ✅ 4.2 Canonical risk: latent only (no live content there); removed entirely on deletion. Pipeline already excludes it.
- 🟡 4.3 Awaiting Al's action — delete the publication in beehiiv (no connector delete tool). Surfaced to Daily Ops + Ops_Log.

## Step 5 — Low-value surfaces
- ⬜ 5.1 Custom Archive title added

## Weekly log (newest first)
| Date | Subs | 4-wk open | Net subs | SD pages live | GSC clicks (90d) | GSC avg pos | Notes |
|---|---|---|---|---|---|---|---|
| 2026-07-06 | 550 | 29.17% | +5 | 19 | 51 | 20.6 | Auto check. GSC recovered mid-session via the Edge browser connector (initial Chrome connection failed). Subs 547→550 (+3); net subs strengthened to +5 (best in the log), on 10 new / 5 churned. 4-wk open eased 32.22%→29.17% (-3.05pt), click 4.25%→3.83% (-0.42pt) after last week's jump. Published posts 106→117 (+11); SD episode pages 18→19 (20 raw "Signal Drop" hits incl. generic landing) — plan target of 17 stays exceeded. Flag: two posts share the exact title "Signal Drop: Your Role Changes Every Hour" (dated 2026-02-18 and 2026-06-28) — possible duplicate/re-publish, not de-duped here. GSC 3-mo: 51 clicks (+6 vs last week, +2 vs baseline) / 8,930 impr (-450 vs last week, -950 vs baseline) / 0.6% CTR (best in log) / avg pos 20.6 (worse again, now +1.1 vs baseline 19.5 — watch this drift). Conversion: free-chapter clicks 0 (0 impr), advisory clicks 0 (0 impr) — third straight read at zero organic presence for both money pages. Top signup source flipped to google organic (4, was 2), overtaking direct (2, was 3) for the first time in the log — first organic-led acquisition week. Page-one queries flat: signal drop 6.2, sunny mattu 7.3, what is grafana alloy 8.9/9.5. Open change-control (unchanged, still need Al): CHG-016 dormant pub deletion; CHG-002/CHG-005 spot-check to mark Verified; CHG-014's remaining staged drafts appear to be going live given the post-count jump — worth confirming. |
| 2026-06-30 | 547 | 32.22% | +2 | 18 | 45 | 19.9 | Auto check (GSC pulled live with Al present, Browser 2). Subs 545→547 (+2); first POSITIVE net in the log (+2 vs −1; 8 new, 6 churned). 4-wk open 28.77%→32.22% (+3.45pt), click 4.08%→4.25%. Published posts 95→106 (+11); SD episode pages 12→18 (19 raw "Signal Drop" titles incl. generic landing) — plan target of 17 now MET/exceeded. GSC 3-mo: 45 clicks / 9,380 impr / 0.5% CTR / avg pos 19.9 (baseline 49/9,880/0.5%/19.5 — flat-to-slightly-down, mostly rolling-window). Conversion: free-chapter clicks 0 (0 impr), advisory clicks 0 (0 impr) — both money pages have ZERO organic search presence; top signup source = website direct (3), google organic 2, new LinkedIn referral 1. Page-one queries: signal drop 6.3, sunny mattu 7.4, what is grafana alloy 8.9/9.6. Open change-control: CHG-002 + CHG-005 live, spot-check pending to mark Verified; CHG-014 10 drafts now appear published (post count + SD pages jumped); dormant pub CHG-016 + crossed-slug fix still need Al. |
| 2026-06-22 | 545 | 28.77% | −1 | 12 | — | — | Auto check. GSC skipped this run (Chrome not connected). Subs 544→545 (+1); 4-wk open 29.48%→28.77%, click 3.97%→4.08%; net subs improved −3→−1 (6 new, 7 churned). Published posts 95 (was 94). Signal Drop episode pages still 12 (gap 5 to 17). No step checkboxes ticked. Change log still has CHG-002 (OG title typo) and CHG-005 (description re-paste) pending fix. |
| 2026-06-15 | 544 | 29.48% | −3 | 12 | — | — | Auto check. Subs flat at 544; 4-wk open dropped 33.46%→29.48% and click 4.19%→3.97%; net subs −3 (4 new, 7 churned). Episode gap to 17 unchanged at 12 (a 13th "Signal Drop" hit is the pre-existing generic landing page, not an episode). Total published posts 94 (was 92 at baseline). No new step checkboxes ticked; 1.3 still has 2 meta fixes pending. Dormant pub confirmed empty (0/0/0). |
| 2026-06-12 | 544 | 33.46% | −4 | 12 | 49 | 19.5 | GSC baseline captured (9.88k impressions, 0.5% CTR, 261 queries). Biggest gap: Grafana Alloy + Cost Conundrum ~2k impressions at <0.35% CTR. Beehiiv connector read-only for posts. |
| 2026-06-09 | 545 | 33.88% | −3 | 12 | — | — | Baseline set. |
