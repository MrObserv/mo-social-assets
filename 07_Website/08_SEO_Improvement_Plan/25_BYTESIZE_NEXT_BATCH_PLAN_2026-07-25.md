# byte-size Next-Batch Plan

**Filed:** 2026-07-25 (Growth). **Trigger:** the tooling run is fully live (16 byte-sizes published), the pipeline is empty (only BMC Helix in draft), so we need the next batch. **Grounds:** the QA_Bank practitioner questions, the Tech Tuesday forefront research, the live-cluster gaps, and the end-to-end open-source stack infographic Al banked 2026-07-24. **Standard:** `12_BYTESIZE_SERIES.md` (≥2 diagrams each, pull-quote exempt, §5-clean, disclosure on vendor pieces, one topic = one crawlable anchor + one video).

---

## 1. What's live vs what's next

**Live (16):** eBPF, OpenTelemetry, Distributed Tracing, Odigos, Prometheus, Grafana, Loki, Jaeger, Grafana Alloy, MCP, AI Agent, Business Event, Agent Observability, plus older Shift-Left and LLM pieces. **In draft:** BMC Helix.

**The gap the infographic exposes.** The "Observability Course for Beginners" learning path (Foundations → Metrics → Prometheus → Grafana → Logs → Traces → OpenTelemetry → Kubernetes → SLOs → Capstone) is the exact spine of an end-to-end open-source cloud-native stack, and it maps almost one-to-one onto what we have already published. The missing rungs are the next targets: **Kubernetes Observability, SLOs/SLIs, Alertmanager, ELK, Tempo.**

## 2. The batch (priority order)

**Tier 1 — trending, each doubles as a Tech Tuesday written anchor (one build feeds two channels):**
1. **What Is OpenTelemetry Profiling?** (continuous profiling, "the fourth signal"). Standard just landed: public alpha March 2026, GA targeted Q3. Answers the banked question *"Is continuous profiling worth the overhead in production?"* Anchor for TT03. **Build first.**
2. **What Are Wide Events?** (observability 2.0, three-pillars debate). Answers *"Are the three pillars dead? Should I move to wide events?"* Anchor for TT04.
3. **What Is AIOps?** Answers *"Is AI actually improving IT ops or just adding noise?"* Caps the AI/agent cluster (MCP → AI Agent → Agent Observability → AIOps). Highest raw search intent.

**Tier 2 — close the open-source stack cluster (compounding SEO):**
4. **What Is the OpenTelemetry Collector?** (points at the deep Collector guide; closes the OTel loop).
5. **What Is Tempo?** (completes the Grafana LGTM stack alongside Loki, Grafana, Prometheus).
6. **What Is Kubernetes Observability?** (the infographic's rung 8; high intent, cloud-native core).

**Tier 3 — foundational concepts, evergreen:**
7. What Is an SLO/SLI? · 8. What Is Cardinality? · 9. What Is Sampling? (8 and 9 tie into the observability-cost angle) · What Is Alertmanager? · What Is the ELK Stack?

**Hub asset (the anchor that ties it together):** upgrade the existing *"The Open-Source Observability Stack: A Field Guide"* into an **end-to-end learning-path hub** that links every byte-size in stack order (metrics → logs → traces → OTel → K8s → SLOs). This becomes the cluster home and a genuinely useful asset for the client local build.

## 3. SEO

- **Cluster fit:** byte-size sits in C4 (practice & tooling); the hub anchors the cluster and links down to each member, each member links back up + to 2 siblings (the compounding rule, `12_BYTESIZE_SERIES.md` §2).
- **Query targets:** generic "what is X" long-tail, never "X vs Y" (the neutral definitional angle is what ranks and keeps the byline honest). Profiling → "opentelemetry profiles / continuous profiling"; Wide Events → "wide events / observability 2.0"; AIOps → "what is aiops".
- **Anchor/video rule:** Tier-1 pieces are the written anchors for TT03/04; the video is the second front door on YouTube. One topic = one crawlable page + one video, never two competing MO URLs.
- **Internal-link debt to clear as we build:** the hub upgrade + reciprocal links from Grafana Alloy and the OTel Collector guide to the new entries.

## 4. Resourcing

- **Cadence:** 1-2 byte-size per month per the series standard, slotted into the existing pipeline (does not displace the weekly Signal Drop). Tier-1 three across roughly the next 6-8 weeks, paced to the TT03/04 record days so the anchor and video ship together.
- **Split of effort:** Engagement drafts the vendor/tool read into the per-post folder; Growth runs the SEO pass, builds via the Bite-size template, wires the cluster links. Each piece carries **≥2 diagrams** held to the full diagram QA gate (two self passes + fresh-eyes review) — the diagrams are the heaviest single cost and the reason byte-sizes land.
- **Efficiency lever:** building the Tier-1 three as Tech Tuesday anchors means one research/diagram effort produces the written page + the video script spine. That is the cheapest way to feed both channels.
- **Capacity flag:** with the new job reducing Al's hours, the realistic throughput is ~2-3 finished byte-sizes/month if diagrams stay at the current QA bar. If we want the full Tier-1+2 (6 pieces) faster, the constraint is diagram production, not writing.

## 5. Support / what's needed to ship each one

- **OG card** rendered + hosted (mo-social-assets repo → raw URL), per the asset-hosting path.
- **Diagram QA** pass (the fresh-eyes gate) before publish.
- **Publish decision (open, needs Al):** byte-size is currently held **web-only** until the Technical stream is populated, then it becomes the Technical-stream email content rather than a full-list blast. Decision pending: keep holding web-only, or start emailing the new batch. (Раised in the Growth Pipeline pack; still Al's call.)
- **Social amplification pack** per piece (X + company LinkedIn + light personal), handed to Daily Ops for Buffer, so discovery happens while email is held.
- **Structural, filed for Control:** the byte-size series hub/tag treatment (nav entry + tag-archive intro), so the cluster reads as a destination, not a tag.

## 6. Recommended first move

Build **What Is OpenTelemetry Profiling?** next: it answers a banked question, it is the TT03 anchor Al is already teasing in the Ep 25 newsletter, and it is the "the standard just landed" moment. One build, two channels, timely.

---

**Filed to Control** via `Change_Requests_Inbox/Growth.md` [SEO]: adopt this batch + priority order; the open-source stack hub upgrade; the byte-size series hub/tag treatment. Publish-vs-hold decision flagged for Al.
