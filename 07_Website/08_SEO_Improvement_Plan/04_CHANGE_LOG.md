> **SUBORDINATE to the canonical change control** (Content_System_Governance §3 + `00_Command_Center/Change_Requests.md` + `Ops_Log.md`). SEO structural changes go through the Control chat via a **[SEO]** Change Request; this file is an SEO-local working note only, not a parallel change-control system. (Recorded by Control 2026-06-22.)

# Content Change Log

System of record for content/SEO changes to masteringobservability.com. Each row's **Old value** is the rollback. Process: see `03_CHANGE_CONTROL_SOP.md`.
Status key: Proposed · Applied · Verified · Reverted · Pending fix

---

## CHG-001 — OpenTelemetry Collector Implementation Guide — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/opentelemetry-collector-implementation-guide · **Status:** Verified (2026-06-12)
- **Old meta title (rollback):** *(none — field was empty)*
- **New meta title:** OpenTelemetry Collector Implementation Guide
- **Old meta description (rollback):** *(none — field was empty)*
- **New meta description:** A step-by-step OpenTelemetry Collector guide: collect, process, and export metrics, logs, and traces for unified observability across modern systems.
- **Rationale:** highest-impression CTR gap (1,418 impressions, 0.28% CTR); page had no SEO meta.

## CHG-002 — Harmonising IT (Observability Strategy) — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/mastering-it-observability · **Status:** Applied — live 2026-06-24 (Al published; spot-check live values next GSC run)
- **Old meta title (rollback):** Harmonising IT: Crafting an Observability Strategy Like a Symphony
- **New meta title:** How to Craft an Observability Strategy Like a Symphony
- **Old meta description (rollback):** Discover how to align IT with business objectives using an Observability strategy, ensuring system performance and operational efficiency.
- **New meta description:** How to design an observability strategy that aligns IT with business goals, tunes signal over noise, and keeps systems performing under pressure.
- **Open issue:** RESOLVED in draft 2026-06-24 (Growth, via beehiiv API `edit_post`). OG title set to "Crafting an Observability Strategy Like a Symphony". Set Verified once Al publishes the draft and the live OG title is confirmed.

## CHG-003 — Business-Aligned Observability — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/the-power-of-business-aligned-observability · **Status:** Verified (2026-06-12)
- **Old meta title (rollback):** How Can Business-Aligned Observability Propel Your Competitive Edge?
- **New meta title:** Business-Aligned Observability: Win a Competitive Edge
- **Old meta description (rollback):** Discover how aligning Observability with business objectives can transform your organisation and learn strategies to enhance customer experience.
- **New meta description:** Map observability metrics to business KPIs. See how aligning IT signals with outcomes drives efficiency, customer experience, and competitive edge.
- **Rationale:** old title exceeded 60 chars and was truncated in search.

## CHG-004 — The Observability Cost Conundrum — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/the-observability-cost-conundrum · **Status:** Verified (2026-06-12)
- **Old meta title (rollback):** *(none — field was empty)*
- **New meta title:** The Observability Cost Conundrum: Paying Too Much?
- **Old meta description (rollback):** *(auto-truncated body text — "Annual Observability spending is projected to hit a whopping $4.1 billion by 2028...")*
- **New meta description:** Observability can eat 10-30% of your infrastructure budget. See why costs climb toward $4.1B by 2028 and how to tell if you are overpaying.
- **Rationale:** null title; 627 impressions at 0.32% CTR.

## CHG-005 — Putting It All Together (Cost Strategy 5/5) — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/building-a-comprehensive-cost-effective-observability-strategy · **Status:** Applied — live 2026-06-24 (Al published; spot-check live values next GSC run)
- **Old meta title (rollback):** Beyond the Numbers: Cost-Effective Observability Strategies
- **New meta title:** Build a Cost-Effective Observability Strategy
- **Old meta description (rollback):** This is part 5 of the Beyond the Numbers series. Learn to benchmark and optimize observability costs. Discover the 20-30% rule and cost-effective monitoring.
- **New meta description (target):** Benchmark your observability spend, apply the 20-30% rule, and build a strategy that controls cost without losing the visibility you need.
- **Open issue:** RESOLVED in draft 2026-06-24 (Growth, via beehiiv API `edit_post`). default_description set to the 138-char target above. Set Verified once Al publishes the draft and the live description is confirmed.

## CHG-006 — byte-size: What Is Grafana Alloy — meta title + description
- **Date:** 2026-06-12 · **Owner:** Allan · **Page:** /p/what-is-grafana-alloy · **Status:** Verified (2026-06-12)
- **Old meta title (rollback):** What is Grafana Alloy?
- **New meta title:** What Is Grafana Alloy? A Practical Observability Guide
- **Old meta description (rollback):** A quick review of Grafana Alloy, which has the latest observability solutions from Grafana Labs. Discover if it's the right tool for you.
- **New meta description:** A plain-English guide to Grafana Alloy: what it does, how it fits your observability stack, and whether it is the right collector for you.
- **Rationale:** ranks ~9 ("what is grafana alloy"); near page-one, strengthen keyword + value modifier.

## CHG-007 — Cost Conundrum — advisory CTA (Block A)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/the-observability-cost-conundrum · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post (htmlSnippet block can be deleted to revert).
- **New value:** appended v2.0 Block A (Advisory → /advisory + free chapter) as an htmlSnippet at end of body, before footnotes. Also restyled the two in-body "Subscribe to our Newsletter" buttons to v2.0 (see CHG-013).
- **Method:** beehiiv API `edit_post_content` (htmlSnippet). Lands in draft; Al publishes.

## CHG-008 — Putting It All Together — advisory CTA (Block A)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/building-a-comprehensive-cost-effective-observability-strategy · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post.
- **New value:** appended v2.0 Block A; restyled two in-body subscribe buttons to v2.0 (CHG-013).

## CHG-009 — Harmonising IT — advisory CTA (Block A)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/mastering-it-observability · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post.
- **New value:** appended v2.0 Block A at end of body (no in-body buttons on this post).

## CHG-010 — Business-Aligned Observability — advisory CTA (Block A)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/the-power-of-business-aligned-observability · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post.
- **New value:** appended v2.0 Block A after the closing poll; restyled the "Subscribe to The Observability Digest" button to v2.0 (CHG-013).

## CHG-011 — What Is Grafana Alloy — newsletter CTA (Block B)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/what-is-grafana-alloy · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post.
- **New value:** appended v2.0 Block B (Newsletter → signup + free chapter) at end of body. Restyled the "Contact Us!" (Calendly) and subscribe buttons to v2.0; the subscribe button's broken link `mastering-observability.beehiiv.com/subscribe` was repointed to canonical `https://www.masteringobservability.com/subscribe` and the "Subscribe of Free" typo corrected to "Subscribe for free" (CHG-013).

## CHG-012 — OpenTelemetry Collector Guide — newsletter CTA (Block B)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Page:** /p/opentelemetry-collector-implementation-guide · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** no CTA block at end of post.
- **New value:** inserted v2.0 Block B at end of the article body, before the References heading (no in-body buttons on this post).

## CHG-013 — In-body subscribe buttons restyled to v2.0 (brand)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Pages:** Cost Conundrum (×2), Putting It All Together (×2), Business-Aligned (×1), Grafana Alloy (×2) · **Status:** Applied — live 2026-06-24 (Al published)
- **Old value (rollback):** legacy buttons — old teal `#65BFAF`, Title Case labels; Grafana Alloy subscribe button pointed at the non-canonical `mastering-observability.beehiiv.com` with the typo "Subscribe of Free".
- **New value:** repainted to v2.0 button tokens (bg `#2F9E8D`, text `#0D2127`, radius 4) **in place** (Al's decision 2026-06-24 — keep position, restyle only); labels sentence-cased; Grafana Alloy subscribe link repointed to canonical and typo fixed. New in-body button rule recorded in `06_Brand_Assets/Design_Standards/Brand_Design_System_v2.md` and filed `[BRAND]` for Control.

## CHG-014 — Signal Drop posts: hook-first titles + Block B CTAs (Step 3)
- **Date:** 2026-06-24 · **Owner:** Allan (staged by Growth) · **Pages:** all 11 signal_drop-tagged posts · **Status:** #1 (Did Your Team Actually Hear You?) published live by Al; other 10 Staged to draft (pending publish)
- **Old value (rollback):** SEO `<title>` (default_title) mostly empty/brand-prefixed; no end-of-post CTA. Revert by clearing default_title/og_title/twitter_title and deleting the htmlSnippet block.
- **New value:** hook-first `<title>` = "<Hook> | Signal Drop" set on default_title + og_title + twitter_title (=60 chars, S5-clean); v2.0 Block B (newsletter) htmlSnippet appended at end of body, before any ad slot. Routing per CTA library (episodes -> newsletter growth).
- **Titles:** Did Your Team Actually Hear You? / Control Beats Perfection / The Last Person in the Queue / Your Team Mirrors You / Curate Who You Listen To / Accountability Is the Job / Your Role Changes Every Hour / The Line You Won't Cross / Progress Isn't Linear / The Cave You Won't Instrument / Anger Is Just Fear in a Hi-Vis Vest.
- **Method:** beehiiv API `edit_post` (seo) + `edit_post_content` (htmlSnippet). Drafts; Al publishes.

### Pre-existing data-quality issues surfaced during CHG-014 (NOT caused by this change; flag for cleanup)
- **Crossed slugs/meta (STILL OPEN — needs Al):** "Control Beats Perfection" lives at URL `/p/signal-drop-the-last-person-in-the-queue` while "The Last Person in the Queue" is at `/p/signal-drop-the-last-person-in-the-queue-1a0c`; their subtitles + descriptions are also crossed (Control's metadata reads as quiet-voices = the Last Person theme). Too tangled to auto-fix safely; Al to confirm which body is which, then Growth repairs (slug change needs a redirect).
- **Wrong subtitle (FIXED 2026-06-24, draft):** "Progress Isn't Linear" subtitle was "The Line You Won't Cross"'s; reset to "Reliability numbers never climb in a straight line. One bad month is not a failed strategy."
- **S5 alerting-vocab (FIXED 2026-06-24, draft):** only "The Cave You Won't Instrument" Twitter description had "page you"; rephrased to "...the exact part that calls you at 3am." ("Anger..." re-checked, was clean.)

## CHG-015 — New companion page: "Context, Intent, Headline" (Step 2)
- **Date:** 2026-06-24 · **Owner:** Allan (created by Growth) · **Page:** /p/metrics-mayhem-signal-drop-context-intent-headline · **Status:** PUBLISHED web-only 2026-06-24 (`post_99b44a1f-39e3-4fcd-8e29-fd7380377410`); display date back-dated to 2026-01-06; full tag cluster + OG card set
- **Old value (rollback):** post did not exist (the only live Signal Drop audio episode with no web companion). Delete the draft to revert.
- **New value:** full companion post created via `save_post` — hook-first SEO title "Context, Intent, Headline | Signal Drop", slug, meta, body (em-dash separator swapped for a rule, §5-clean), Block B newsletter CTA at foot, tagged newsletter + signal_drop.
- **Manual touches before publish (Al):** add the Spotify episode embed; set the Signal Drop OG card (thumbnail currently null).

## CHG-016 — Dormant "Metrics & Mayhem" publication (Step 4)
- **Date:** 2026-06-24 · **Owner:** Growth (recommendation) · **Status:** Recommend archive/delete; awaiting Al action in beehiiv
- Verified empty all-time (0 subs / 0 posts / $0). Recommendation + canonical-risk handling recorded in `04_Publication_Cleanup/DECISION.md`. Pub `pub_199a2744-1999-4773-a8c1-6213963cef54`. No connector delete tool, so deletion is an Al action.

---

## Open items (carry into the Monday block)
- **Delete the dormant publication** (CHG-016) in beehiiv, then record the outcome in `04_Publication_Cleanup/DECISION.md`.
- **Publish the 10 staged Signal Drop drafts** (CHG-014) — same flow as evergreen. #1 already live.
- **DONE 2026-06-24:** Al published all 6 posts; CHG-002, -005, -007..-013 are live. Remaining: spot-check the live OG title (CHG-002) + meta description (CHG-005) and confirm advisory/newsletter CTA links resolve, at the next GSC run, then mark Verified.
- **PARKED (Al 2026-06-24):** v2.0 thumbnail regen + legacy-cruft cleanup on the 6 evergreen posts — gated behind CTA measurement + next social re-promo. Tracked in `01_PROGRESS_TRACKER.md`.