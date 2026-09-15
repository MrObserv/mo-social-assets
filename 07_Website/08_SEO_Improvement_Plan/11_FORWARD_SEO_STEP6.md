# Step 6: Forward SEO (make every episode ship SEO-ready by default)

**Owner:** Growth (SEO) · **Created 2026-06-26** · Restores the "Step 6 Forward SEO" workstream lost in the Change_Requests corruption (flagged in `Ops_Log` for Control). Turns SEO from an after-the-fact fix into a default of the weekly podcast pipeline. Guardrails: codex §5 (no em dash, no alerting vocab), defensible numbers only (no vendor numbers), §19.6 thumbnails, and SEO supports the episode title / Hard Stop voice, never overwrites it. Aligned with the in-flight Q&A §19.5 / [CODEX] work.

---

## A. Audit of Part 3 (launch pack) + the §25.5.1 template
Assessed against Ep 21's pack (representative). The pack is well-built; the gaps are search + reach, not quality.

1. **Search-facing fields lead with the brand hook, not the keyword.** YouTube title, Spotify title, Beehiiv meta title and slug all use the metaphor (e.g., "You're Going To Have To Suffer Today"); the searched topic (e.g., "pre-mortem") is buried in the body. **Fix:** the YouTube title, the Beehiiv meta title, and the FIRST line of the YouTube + Spotify descriptions must lead with the target keyword. Keep the hook as the YouTube A/B alt and the OG/social title.
2. **No declared target keyword / intent / cluster.** The pack writes assets with no stated keyword, so targeting is inconsistent. **Fix:** add the SEO front-matter block (section C) to the top of Part 3.
3. **No episode-to-content internal links.** The pack carries the §26.3 canonical block (external CTAs only). There are no "related episode / blog" out-links and no reciprocal in-links, so episodes never build a cluster or pass internal link equity. **This is the biggest reach miss.** **Fix:** mandate 1-2 internal links out (cluster pillar + one sibling) and one reciprocal in-link.
4. **CTA not intent-routed per episode.** Book-first §26.3 is present, but no Block A/B/C decision. **Fix:** Signal Drops default to Block B (newsletter); commercial-intent episodes to Block A. State it in the pack.
5. **Descriptions open with narrative, not keyword.** YouTube weights the first ~100 chars; Spotify truncates the preview. **Fix:** keyword-led first line on both.
6. **Tags are ad hoc.** Ep 21's were good by luck. **Fix:** a tag formula (section C).
7. **§5 leakage.** The alerting summon-verb (and its variants) reached the pack text and the audio (the script's habit question listed "who [summon-verb]"). **Fix:** every TEXT asset runs `s5_lint.py` before launch; the script's habit-question template uses "who gets the call", never the alerting verb.
8. **Tag taxonomy split.** The companion used `signal-drop` (hyphen) while the site/tracker uses `signal_drop` (underscore), splitting the tag archive. **Fix:** standardise on `signal_drop`.
9. **Chapters:** Ep 21 had them (good for SEO + retention). **Fix:** make chapters mandatory in the template.

---

## B. Topic-cluster map (slot every episode + blog)
Six clusters. Each has a pillar (the URL that should rank for the head term); members link UP to the pillar and SIDEWAYS to one sibling; the pillar links DOWN to its strongest members. Growth slots each new episode into a cluster at launch.

| Cluster | Pillar (head term) | Members (episodes + blogs) |
|---|---|---|
| **C1 Observability cost & strategy** | Harmonising IT (highest traffic) / Putting It All Together | Cost Conundrum, Putting It All Together, Business-Aligned Observability |
| **C2 Incident & on-call leadership** | **How to Lead an Incident Response Team** (`/p/how-to-lead-an-incident-response-team`, DRAFT built 2026-07-12, Block A; links down to Accountability + Position + Six-Week Decay) | **Ep 21 launch pre-mortem**, Anger Is Just Fear, The Cave You Won't Instrument, Control Beats Perfection, Accountability Is the Job, Your Role Changes Every Hour, The Alert That Just Says "We Need To Talk", Position Before the Page |
| **C3 Ops communication & team culture** | **Operational Communication for IT Leaders** (`/p/operational-communication-for-it-leaders`, DRAFT built 2026-07-12, Block A; links down to Did Your Team + Team Mirrors + Skip the Theatre) | Did Your Team Actually Hear You, Context Intent Headline, The Last Person in the Queue, Your Team Mirrors You, Curate Who You Listen To, Skip the Theatre, You Can't Market Trust, The Burnout You Don't Notice, Progress Isn't Linear, The Line You Won't Cross, The Basics Are Not Optional, Your First or Your Last |
| **C4 Observability practice & tooling** | OpenTelemetry Collector Guide | What Is Grafana Alloy, OTel Collector Guide |
| **C5 AIOps & convergence** | SecOps Is Buying Observability (deep dive) | The Regulator Is Not the Brake on AIOps, the convergence deep dive, June Digest topic |
| **C6 AI-ops governance & accountability** | When The Agent Acts, Who Owns The Decision? (LIVE, `/p/ai-agent-accountability-who-owns-the-decision`) — pillar links DOWN to all members | **What Is an AI Agent?** (byte-size front door, DRAFT), **Causal AI vs Generative AI** (byte-size, DRAFT), **What Is MCP** (byte-size, LIVE), **There Is No Agreed Pattern For Running AI Agents Yet** (blog, DRAFT), AI-agent-accountability carousel (social amplifier, not a ranking URL). **Built + internally linked 2026-07-11 (Growth):** all members link UP to the pillar + cross-link as siblings; pillar links DOWN. Publish members BEFORE the pillar down-link edit. OG cards in `mo-social-assets/Thumbnails/`. |

**C5 vs C6 (kept separate, Control call 2026-07-10, ID-2026-07-02-04):** C5 is the *analysis* side (AI doing root-cause, SecOps/observability convergence); C6 is the *governance* side (who is accountable, who owns the agent, what it is allowed to touch). Distinct search intents, so distinct pillars. Where a single piece spans both, give it one home cluster and add ONE cross-link to the other pillar (e.g. "The Regulator Is Not the Brake on AIOps" lives in C5 but cross-links to the C6 pillar). Do not double-count members. C6 pillar carries **Block A (advisory)**; its definitional members (byte-size) carry **Block B (newsletter)**.

**Gap to action (commercial-intent pillars): DONE 2026-07-12.** Both C2 and C3 pillars are drafted (Block A advisory) and link down to their strongest published members. Remaining: publish them, then run the reciprocal in-link sweep (each member adds a link UP to its pillar), and attach the OG cards (in `mo-social-assets/Thumbnails/blog_lead_incident_response_og.png` + `blog_ops_communication_og.png`, attach after auto_sync).

**Linking rule (every episode):** out = 1 link to its cluster pillar + 1 to a sibling; in = add a "related" link to the new episode from the pillar and one sibling once live.

---

## C. Standard SEO front-matter block (fill per episode AND per blog)
```
SEO front-matter
- Target keyword: <primary>   | secondary: <2-3 variants>
- Search intent: informational | commercial | navigational
- Cluster + pillar: <C#> / <pillar URL>
- Meta title (<=60, keyword-led): <...>
- Meta description (<=160): <...>
- Slug: <keep codex hook-slug for episodes; keyword-slug for blogs>
- Internal links OUT: <pillar URL> + <sibling URL>
- Reciprocal link IN: <where you will add a link back to this>
- CTA (routed): Block A (advisory) | Block B (newsletter) | Block C (footer)
- Tags: brand set (metrics and mayhem, allan mann, mastering observability, signal drop) + 4-6 keyword/cluster tags
```
Rule of thumb: **slug + episode title stay in Allan's voice; the keyword lives in the meta title, the first description line, the body, and the tags.**

---

## D. Weekly per-episode SEO checklist (fill Thursday T-1, before the Friday launch)
- [ ] SEO front-matter block completed (section C) and pasted at the top of Part 3.
- [ ] YouTube title leads with the keyword; brand hook kept as the A/B alt.
- [ ] YouTube + Spotify descriptions open with the keyword in line 1.
- [ ] Beehiiv companion meta title keyword-led; og/twitter title = hook; meta description <=160.
- [ ] Chapters present (YouTube).
- [ ] Internal links: pillar + 1 sibling out; reciprocal in queued.
- [ ] One intent-routed CTA (Block A/B/C) on canonical §26.1 links.
- [ ] Tags use the formula; taxonomy is `signal_drop` (underscore).
- [ ] `python3 00_Command_Center/s5_lint.py` clean on every text asset (no em dash, no alerting vocab).
- [ ] Thumbnail per §19.6 (headshot rule, one-second test).
- [ ] Defensible numbers only (no vendor figures stated as fact).

---

## E. Make it weekly (cadence wiring, structural -> Control)
Wire a **Growth/SEO pass** into the §25.6 cadence at **Thursday T-1** (edit + asset prep), so it runs every week before the Friday launch, not ad hoc:
1. Bake the section C front-matter block + the section A fixes into the §25.5.1 recording-pack template (Part 3), so every generated pack ships with the SEO block and the keyword-led title rule.
2. Add the section D checklist as a Part 5 gate (codex-compliance wrap), and have the asset-watcher / pack builder run `s5_lint.py` on the Part 3/4 text.
3. Add a Thursday "Growth SEO pass" step to the weekly cadence (planner / friday-launch-checklist pre-step) that surfaces the episode to Growth to fill the front-matter before Friday.
These are template + scheduled-task edits = Control. Filed via `Change_Requests_Inbox/Growth.md` [SEO].

*(Lint note: this doc trips `s5_lint` only on the grandfathered episode title "Position Before the Page", which is an allowed proper-noun exception per §5 grandfathering.)*

---

## F. Enforcement (Ep 22 lesson, 2026-07-04)

Ep 22's pack carried the section C SEO front-matter block, yet the actual assets still shipped hook-led (YouTube title, both description first lines, Beehiiv meta title), and the auto-built clip tags carried a stale alert-fatigue set unrelated to the episode. Writing the front-matter block is not enough; it has to drive the assets. Sharpened rules:

1. The keyword-led rule applies to the RENDERED ASSETS, not just the front-matter: the YouTube primary title, the first line of the YouTube and Spotify descriptions, and the Beehiiv meta title must each lead with the target keyword. The hook stays as the YouTube A/B alt and the OG / X / Spotify title.
2. Clip (Part 4) tags and hashtags are built from THIS episode's Part 3 SEO front-matter (target keyword + cluster tags), never a fixed default. A clip carrying tags for a different theme (e.g. alert fatigue on an automation episode) fails the gate.
3. Part 5 launch gate (add to the checklist, must pass before Friday): YouTube primary title keyword-led (not the hook); YouTube + Spotify description line 1 keyword-led; Beehiiv meta title keyword-led; clip tags match the episode keyword; internal links are real published /p/ URLs (verified), not categories.

Owner: these are §25.5.1 template + episode-asset-watcher behaviours, built by the **Control** console. The Podcast Ideas console only ideates; it never builds packs. Filed via the Growth inbox.
