# Beehiiv Ecosystem Health Check

**Filed:** 2026-07-30 (Growth). **Why:** Al's call after the ecosystem drifted (stranded automation, unprofiled list, 404 assets, unconfirmed auth) while attention was elsewhere. This is the standing monitor so it does not happen again, and it is written to be **run by a live agent** on a schedule. Folds into the twice-weekly Growth Health Check (`13_GROWTH_HEALTH_CHECK.md`); this file is the Beehiiv-specific check list, each item with a threshold, a measurement method (Beehiiv MCP), and an escalation.

**Verdict format each run:** every check returns GREEN / AMBER / RED + one line. Any RED escalates to Al.

---

## 1. Profiling coverage (the fuel gauge)
- **Check:** % of active subscribers with a known Role or Occupation. `Profile Known` segment ÷ total active.
- **Method:** `get_segment(seg_c2e8a896)` num_members ÷ `get_publication_stats` active_subscriptions.
- **Threshold:** RED < 25%, AMBER 25-50%, GREEN > 50%. **Today: ~11% (RED).**
- **Escalate:** if flat or falling week-on-week, the re-ask / inflow is not working.

## 2. Stream fill rate (is new capture working)
- **Check:** the two Role-field stream segments (`seg_eca55c0b` Technical, `seg_566d2362` Leadership) are growing as people sign up.
- **Method:** `list_segments`, watch num_members over time.
- **Threshold:** RED if either is still <5 after 2 weeks of live signups (means the form role step is being skipped or signups are flat). **Today: 1 and 1 (RED).**

## 3. Automation enrolment (the stranded-flow trap)
- **Check:** every LIVE automation has enrolled_count > 0, and no `segment_action`-triggered flow has a populated target segment but 0 enrolled (the exact bug that left the Warm nurture stranded — segment_action does NOT retro-enrol existing members).
- **Method:** `list_automations(state=live)`; for each, compare enrolled_count against the trigger's target segment size.
- **Threshold:** RED if a live automation has 0 enrolled while its target segment has members.
- **Escalate:** name the automation + the catch-up enrolment needed.

## 4. Deliverability + authentication
- **Check:** SPF, DKIM and DMARC pass on the sending domain; bounce rate, unsubscribe rate and spam-complaint rate within bounds.
- **Method:** auth = Beehiiv Settings (manual/quarterly confirm, cannot be read via MCP); rates = `get_publication_stats` + recent `get_post_stats`.
- **Threshold:** RED if auth unconfirmed, or bounce > 3%, or unsub > 0.5% on a send, or any spam complaints. AMBER if auth not re-checked in 90 days.
- **Note:** 2026 bulk-sender rules (Gmail/Microsoft) hard-reject unauthenticated mail, so unconfirmed auth is a RED, not a nicety.

## 5. List hygiene (the numbers-draggers)
- **Check:** count of hard-bounced and long-unengaged (no open or click in 90 days) active subscribers. These drag deliverability and inflate the anonymous denominator.
- **Method:** `list_subscriptions(status=needs_attention/inactive)` + engagement filters.
- **Action ladder (never hard-delete; hard-delete is prohibited):** (1) one last **re-engagement email**; (2) non-openers after that → **unsubscribe/suppress** (removes them from the active count and protects reputation), logged. A quarterly **sunset flow** automates this.
- **Threshold:** RED if unengaged > 30% of active and no sunset step exists.

## 6. Inflow integrity
- **Check:** new subscribers are capturing Role at signup, and the recommendations-network leak (joiners who bypass the form) is quantified.
- **Method:** compare new-signup count vs new-with-role count each week (`list_subscriptions(subscribed_after=...)`).
- **Threshold:** RED if <50% of new signups carry a role after the form fix is live.

## 7. Asset integrity (the 404 trap)
- **Check:** every image `data-src` in a live/scheduled post resolves (the raw-URL push gap that left the Profiling diagrams broken until sync).
- **Method:** on any post edit, honour Beehiiv's `unreachable_image` warning; before publish, confirm the mo-social-assets push actually landed (git pushed, not just staged), not just that the file exists locally.
- **Threshold:** RED on any unreachable embed in a post about to publish.

---

## Enrichment note (the 89% anonymous)
Email alone gives **company, not role**. Layered plan:
1. **Domain split (DIY, no tool):** bucket anonymous emails into freemail (gmail/outlook/yahoo/icloud/hotmail — unenrichable from email) vs corporate. Corporate domains → attach the **company** as a custom field (firmographic segmentation for advisory: which banks/enterprises are on the list). Growth can run this from `list_subscriptions`.
2. **Role (the stream split):** only the **P4 re-ask** reliably gets this. Email cannot.
3. **Deep title/seniority enrichment:** needs a paid enrichment API (Apollo, Clearbit, Hunter). **No MCP connector exists** (registry checked 2026-07-30), so this is a future build gated on an account, not a quick win. A custom LinkedIn-scraping skill is not recommended (ToS + reliability).

---

## Ownership + agent readiness
Run inside the twice-weekly Growth Health Check now; target state is a **scheduled live agent** that runs checks 1-7, writes a GREEN/AMBER/RED line each, and escalates any RED to Al. This file is the check contract that agent implements. **Filed to Control** to wire into `13_GROWTH_HEALTH_CHECK.md` and the scheduled-task roster.
