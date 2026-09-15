# Content Production Skill — Spec (reverse-engineered from the live workflow)

**Filed:** 2026-08-06 (Growth). **Why:** the content pipeline works but lives in our heads and gets rebuilt every time, which is why we keep going backwards and forwards. This codifies it end to end into ONE runnable skill: research → write → diagrams → SEO → Beehiiv draft → social (Buffer) → file + present. Reverse-engineered from what Growth already does by hand across byte-sizes, Tech Tuesday deep-dives and Signal Drop companions. **Control develops this into the actual skill; this file is the contract.** Validate on one new blog first (§8), then build. ✅ **BUILT 2026-08-12 — runnable skill `mo-content-production` (this spec is now its source contract; update the skill via `save_skill` overwrite, not this file alone).**

## 1. What it produces (content type → its standard)
- **Byte-size** — short SEO explainer (~600 words), ≥2 in-body diagrams, web-only. Standard: `12_BYTESIZE_SERIES.md`.
- **Tech Tuesday deep-dive** — in-depth (~1,200–1,600 words), reference-backed, honest-ledger section, FAQ, 2–3 diagrams rendered **in-body (1200×680) and 16:9 (1920×1080) for the video**, emailed to the Technical stream + published as the crawlable anchor the TT video points at.
- **Signal Drop companion** — leadership-register newsletter from the episode pack, emailed to the Leadership stream + web.
- Obeys the **channel model:** Tech Tuesday = Tuesday / Technical; Signal Drop = Friday / Leadership; both-stream subscribers get both; digest monthly; byte-sizes web-only.

## 2. Inputs and where they come from
| Input | Source | Connector / location |
|---|---|---|
| Topic + demand signal | Reddit discussions, GSC queries + positions, curated reads, banked practitioner questions | `Feeds/Reddit` + `Feeds/Curation` Gmail labels; GSC via Chrome; `03_Podcast/QA_Bank/` |
| Episode material (companions) | recording pack Part 3/4, transcript | `03_Podcast/Episodes/NN…`; Otter MCP |
| Facts | primary sources | WebSearch / web_fetch |
| Practitioner sentiment (esp. vendor / opinion pieces) | Reddit + review aggregators (G2, Gartner Peer Insights, PeerSpot, Capterra, TrustRadius) | Reddit via **Claude in Chrome** (proven 2026-08-10; the Reddit API is gated + priced out and web_fetch 403s, so Chrome is the route; the Google-Alerts -> Gmail `Feeds/Reddit` bridge stays as the passive background net); reviews via WebSearch |
| Audience / stream | the two-track model + role / sub_stream segments | Beehiiv segments |
| Voice + rules | Voice Codex | glob `02_Voice_Codex/Current/` |
| Format standards | byte-size / diagram / CTA / publish-gate / SEO-to-revenue | `08_SEO_Improvement_Plan/` + `06_Brand_Assets/Design_Standards/` |

## 3. Canonical standards it must obey (the guardrails, by file)
- **Voice Codex** (`Current/`) — §5 (no em dashes, banlist), register.
- **Byte-size / deep-dive structure** — `12_BYTESIZE_SERIES.md`.
- **Diagrams** — `Architecture_Diagram_Standard.md` + `Diagram_Standard.md` (one gate; §2a build rules; 13-point checklist; two self-passes + fresh-eyes).
- **CTAs** — `08_CTA_HTML_SNIPPETS.md`: Block B (newsletter CTA), Block D (links hub), Block Q (pull-quote). Canonical snippets only, never hand-built.
- **Publish gate** — `BLOG_PUBLISH_QA_GATE.md`.
- **Routing** — `05_SEO_TO_REVENUE_MODEL.md` (advisory vs newsletter intent).

## 4. Pipeline (the steps the skill runs)
1. **Ideation + demand check.** Pull the topic; validate people are actually asking it (Reddit / GSC); pick the type, the target query and the cluster fit; confirm it does not duplicate a live page.
2. **Research + fact bank.** Gather from primary sources; defensible facts only; no vendor stat stated as fact; bank with citations. For vendor or opinion pieces, add REAL practitioner sentiment so it is not a fluff piece: pull Reddit threads via Claude in Chrome (not the blocked API or the email bridge) and triangulate with review aggregators, then write an honest ledger (genuine strengths + real gripes). Frame forum and review sentiment as aggregated user reporting, never as fact, and never reproduce Reddit content verbatim beyond a short attributed quote.
3. **Write to the type's standard.** Structure + Voice Codex voice; §5 lint (pass 1).
4. **Diagrams.** Build to the diagram standard (≥2 byte-size / 2–3 deep-dive); render in-body 1200×680 and, for deep-dives, 16:9 1920×1080 for the video; two self-passes + fresh-eyes; host in `mo-social-assets/MO Diagrams/`.
5. **OG card.** Render 1200×630 dark-asset; host in `mo-social-assets/Thumbnails/`.
6. **Beehiiv draft.** Body + Block Q + canonical CTA (Block B / D) + related-reading cluster + reciprocal back-links; meta title/description; slug; tags; audience/stream targeting; web-only or emailed per the model.
7. **QA gate (pass 2 + fresh-eyes).** Research validity, §5, the diagram gate, the publish gate (canonical CTA, `/p/` path, links live, subscribe-line rule).
8. **Social to Buffer.** Stage LinkedIn (personal + company, book link in the first comment), Instagram, TikTok, YouTube Shorts; carousel/cards where warranted; `saveToDraft`.
9. **File + present.** 04 record, tracker + cockpit updates; present the Beehiiv draft + Buffer drafts to Al.

## 5. Gates (non-negotiable, every run)
- Research-first (facts before format).
- Voice Codex §5.
- Diagram two-pass + fresh-eyes (the 13-point checklist).
- Blog publish QA gate.
- Human publish: Al clicks publish/schedule in Beehiiv; Al approves the Buffer slots.

## 6. Outputs
Beehiiv draft (web + email per model, meta/slug/tags set) · diagrams hosted (in-body + 16:9) · OG card hosted · Buffer drafts staged across channels · 04 record + trackers + cockpit updated · presented to Al for the publish click.

## 7. Human-in-the-loop / honest boundaries (what the skill cannot fully self-serve)
- **Publish/schedule = Al** (Beehiiv click).
- **Buffer slots fire on Al's approval.**
- **Binary hosting:** the skill renders into `mo-social-assets`, but the raw URL only resolves after the `auto_sync` push (Al), so hosting-dependent embeds carry a push step.
- **Native podcast player insert = Al** (Beehiiv `/podcast` editor action) for companions.
- **GSC request-indexing = Al.**

## 8. Validation before Control builds it
Run these steps by hand on **one new blog — the Wide Events Tech Tuesday deep-dive** — and confirm every step and gate produces the right artefact with no gap. That proving run is the acceptance test for this spec. Fix the spec against anything the run surfaces. Then hand to Control.

## 9. Open questions for the skill build (Control)
- Trigger: scheduled from ideation, or on-demand per topic?
- How much runs unattended vs stops at the gates for Al?
- Buffer + Beehiiv are MCP-driven; the skill packages those calls.
- Where the fresh-eyes pass runs (subagent).
