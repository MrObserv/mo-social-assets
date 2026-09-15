# Cluster + Pipeline Audit — 2026-07-12 (Growth)

**Why:** Al flagged (2026-07-12) that recent blog work drifted from the standards — pieces authored straight into Beehiiv, in a newsletter register, with non-standard "records" instead of the folder template, and no confidence in C1-C6 completeness. This audit pulls the live state (beehiiv connector) and checks it against `11_FORWARD_SEO_STEP6.md` (cluster map), `Blog_Newsletter_Folder_Standard.md`, `12_BYTESIZE_SERIES.md`, and the Content System Operations Manual (Flow D). **Pass 1 = this doc; Pass 2 = independent subagent verification (see foot).**

## 1. The blog pipeline (what we are supposed to do)
`transcript-to-pipeline` (Sun 15:00) → **blog brief** in `04_Newsletter_and_Blog/_Briefs/` (thesis, section beats, evidence Allan can cite, DON'T-ECHO boundary, routed CTA) → `weekly-blog-draft` (Tue) creates the per-post folder + writes `_Blog_Draft_<slug>.md` **and** `_Blog_SEO_Pass_<slug>.md` INTO it → **Growth** builds the Beehiiv post from that draft on the Blog v2.0 template, wires the cluster, stamps `post_` id into `Content_Calendar` → Al publishes. The `.md` draft in the folder is the source of truth; Beehiiv is downstream.

## 2. C1-C6 status (live-verified via beehiiv)

| Cluster | Pillar | Pillar state | Members | Cluster health |
|---|---|---|---|---|
| **C1 Cost & strategy** | Putting It All Together (`post_a09f7913`) / Harmonising IT | LIVE (evergreen 2024, updated 2026-07-01) | Leveraging Open Source (live), Benchmarking Costs (live), Business-Aligned, Cost Conundrum | Mature/live. Gap: no single declared pillar URL; internal links to pillar not wired. Not a build gap. |
| **C2 Incident & on-call leadership** | How to Lead an Incident Response Team (`post_9250cbd7`) | **DRAFT** (deep-dive v2, 2026-07-12) | 8 Signal Drops all LIVE (Position, Accountability, Your Role, The Cave, Anger, Control Beats Perfection, The Alert, + Six-Week Decay, Curiosity) | Pillar built, unpublished. 3 down-links wired; reciprocal UP-links NOT done; OG card unattached. |
| **C3 Ops comms & culture** | Operational Communication for IT Leaders (`post_5f02c5d4`) | **DRAFT** (deep-dive v2, 2026-07-12) | 12 Signal Drops all LIVE (Did Your Team, Team Mirrors, Skip the Theatre, Curate, Last Person, First or Last, Basics, Burnout, Progress, Line, You Can't Market Trust, Context/Intent/Headline) | Same as C2: built, unpublished, up-links not done, OG unattached. |
| **C4 Practice & tooling** | OTel Collector Implementation Guide (`post_f10a3d4a`) | LIVE | byte-size series LIVE (eBPF, OTel, Distributed Tracing, Prometheus, Grafana, Loki, Jaeger, Odigos, Grafana Alloy) + stack hub | **Best-formed cluster.** Built via the proper pipeline (briefs + per-post folders). Wired both ways. Minor leftover reciprocal link. |
| **C5 AIOps & convergence** | SecOps Is Buying Observability (`post_345a9446`) | LIVE | The Regulator Is Not the Brake on AIOps (`post_9fa0d8ec`, live), convergence deep dive, June Digest | Live but thin. Gap: cross-link to C6 pillar per the split rule. |
| **C6 AI-ops governance** | When The Agent Acts (`post_0048bb2f`) | LIVE | MCP byte-size (LIVE); What Is an AI Agent (DRAFT), Causal AI vs Generative AI (DRAFT), No Agreed Pattern (DRAFT blog); carousel | Internal links fully wired this session. Gap: 3 members unpublished; pillar down-link edit STAGED (publish members first); OG cards unattached. |

## 3. Transcript-to-pipeline briefs → what became a blog (9 briefs)
- **who-owns-the-agent** → LIVE blog = C6 pillar. ✓
- **exit-time-resilience-number** → LIVE blog. ✓
- **financial-engineering-not-real-engineering** → SCHEDULED (12 Jul). ✓
- **no-agreed-pattern-for-agents** → DRAFT blog (C6). ✓
- observability-2-is-not-a-product → became a **social** Nuclear (Post_Queue #18), not a blog.
- own-the-signal-choose-the-platform → **social** (#20).
- correlated-incident-response-vs-silos → **social** (#16). *(NB: this is a C2 incident-leadership topic — a candidate to build as a C2 member blog, not just social.)*
- profiling-is-the-fourth-signal → Tech Tuesday candidate.
- the-half-army-of-agents → **brief only, unbuilt.**

## 4. Standards / pipeline compliance (the core problem)
- **Pipeline-built pieces adhere:** Odigos (`2026-06-24_odigos-bite-size/` has a real `_Blog_Draft_` + OG) and the 2026-06-26 byte-size series were built brief → per-post-folder → Beehiiv. Correct.
- **My 2026-07 session pieces DEVIATE:** MCP, Causal AI vs Generative AI, What Is an AI Agent, No Agreed Pattern, C2, C3 — built **straight into Beehiiv with no brief**, and filed a non-standard `_Blog_Record_` note instead of the standard `_Blog_Draft_` + `_Blog_SEO_Pass_`. The `.md` source of truth in the folder does not exist for these.
- **Business Event + BMC Helix** (built 2026-07-06, not by me) shipped with the template-scaffold bug; I repaired the bodies 2026-07-12 but did **not** re-check them against the byte-size 7-part structure (§12).
- **C2/C3 v1** came out as short newsletter-shaped pieces precisely because there was no brief and no pillar structure to anchor them; rebuilt as deep-dives v2, but still with no brief/draft/SEO-pass on file.

## 5. Remediation (to get back on the rails)
1. **Retrofit the standard artefacts** for every 2026-07 piece I built: a retrospective brief in `_Briefs/`, the `_Blog_Draft_<slug>.md` (the body = source of truth), and `_Blog_SEO_Pass_<slug>.md`, in the per-post folder; retire the non-standard `_Blog_Record_` files.
2. **Re-check the two repaired byte-sizes** (Business Event, BMC Helix) against the §12 seven-part structure.
3. **Publish + reciprocal in-link sweep** for C2, C3, C6 (members link UP to their pillar; attach OG cards after sync).
4. **Consider `correlated-incident-response-vs-silos` as a C2 member blog** (currently only social).
5. **Guardrail (added to `BLOG_PUBLISH_QA_GATE.md` §0 + here):** no build without (a) a brief, (b) re-reading the relevant standard at the top of the build, (c) folder-first (`.md` draft before Beehiiv). This directly counters the long-session re-read drift the governance warns about.

## 6. Pass 2 — independent verification
An independent agent re-pulled the live beehiiv states and re-checked the brief→blog mapping and standards compliance. Findings appended below.

**Verification result (independent agent, 2026-07-12):** Pass 1 confirmed on every substantive claim — all six pillar states + the C6 member states matched live beehiiv exactly; the standards deviation is CONFIRMED (all six 2026-07 pieces have only a `_Blog_Record_` file, no `_Blog_Draft_`, while the pipeline-built odigos folder does have a real `_Blog_Draft_`); the brief count is exactly 9 as claimed. Two caveats the second pass surfaced:

1. **The two retired v1 pillars (`post_eef683c4`, `post_e613e84d`) no longer resolve via `get_post` ("Resource not found")** and are not on the recent-posts page. They are either deleted or hidden-and-unfetchable. Immaterial to the funnel — the canonical slugs (`how-to-lead-an-incident-response-team`, `operational-communication-for-it-leaders`) are correctly held by the v2 deep-dives — but confirm in the editor that no husk is lingering.
2. **The `_Blog_SEO_Pass_` artefact is not evidenced in ANY folder examined, including the pipeline-built odigos folder.** So the confirmed, system-wide-followed part of the standard is the `_Blog_Draft_` body `.md` (which I skipped); the separate `_Blog_SEO_Pass_` file appears not to be produced consistently even by the pipeline. Remediation should therefore prioritise the `_Blog_Draft_` body (definitely standard, definitely skipped) and treat the SEO-pass file as a separate question for Control about whether the standard is actually enforced.
