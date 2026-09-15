# Tech Tuesday — SEO + positioning (settled)

**Owner:** Growth (SEO) · **Settles:** ID-2026-07-05-02 · **Created 2026-07-11.** Decides how Tech Tuesday relates to the byte-size "What Is X?" series, whether it needs its own hub, and the keyword angle, so scripts ship without splitting search equity. Reads with `12_BYTESIZE_SERIES.md`, `11_FORWARD_SEO_STEP6.md` (cluster map), and `06_Brand_Assets/Design_Standards/Tech_Tuesday_Standard.md`.

---

## The decision in one line

**Tech Tuesday is the video-first, forefront-topic lane of the SAME explainer franchise as byte-size — not a separate SEO surface. One topic = one crawlable page (the byte-size `/p/what-is-x`), one video (YouTube + Spotify). Never two MO pages competing for the same "what is X" query.**

## 1. Is it a byte-size-style series with its own hub? No separate search hub.

Tech Tuesday keeps ONE identity as a video/podcast franchise (its own YouTube playlist + Spotify show, the terminal-motif brand, the §1.5 Fifth Gear register) — that is where a "hub" makes sense, on the video platforms. It does **not** get its own website hub or its own set of ranking URLs, because that would put a second MO page against the same "what is X" search intent the byte-size already targets. Two of our own pages fighting for one query is keyword cannibalisation; it splits links and rankings and helps no one.

So the hub split is:
- **Search hub = the existing byte-size hub/tag** (`byte_size`, plus the proposed nav entry + tag-archive intro in `12_BYTESIZE_SERIES.md` §2). The written anchor of every TT explainer lives here.
- **Video hub = a Tech Tuesday YouTube playlist + the Spotify feed placement** (own show vs Signal Drop feed still to confirm with Podcast Ideas per ID-2026-07-05-03). This is the franchise's home, discovered by video/podcast search, not web search.
- **A `tech_tuesday` content tag** on the byte-size posts that are TT topics, so the TT written pieces are filterable as a sub-lens without a competing URL.

## 2. How it relates to the "What Is X?" byte-size series

A Tech Tuesday explainer's WRITTEN companion **is** a byte-size. It uses the byte-size series contract verbatim (`12_BYTESIZE_SERIES.md`): title `byte-size: What Is <X>?`, meta title `What Is <X>? A Practical Observability Guide`, slug `what-is-<x>`, tag `byte_size` (+ `tech_tuesday`), the 7-part shape, the honest-ledger section, Block B CTA, the disclosure + Sources rules. Per DO-2026-07-09-01 that written post lives in `04_Newsletter_and_Blog/YYYY-MM-DD_<topic>/` as the crawlable anchor; the franchise folder `03_Podcast/Tech_Tuesday/TT##_<slug>/` holds only the video/audio assets + a cross-link to it.

What Tech Tuesday ADDS on top of a plain byte-size:
- **Format:** a video-led explainer (Fifth Gear oral register, terminal brand), not just a written page.
- **Topic bias:** the forefront / edge of observability — new or emerging tech and the AI-ops frontier (MCP, OTel Profiles, observing an AI agent, wide events) — rather than the settled foundational tools the general byte-size backlog covers (eBPF, OpenTelemetry, Prometheus).
- **A second discovery surface:** YouTube + Spotify search for the video, on top of web search for the byte-size page.

So: **byte-size is the written-search franchise; Tech Tuesday is a video-first franchise whose written output flows INTO the byte-size franchise.** Same page, two front doors.

## 3. The keyword angle

- **Written anchor:** the proven informational head term `what is <x>` / `<x> explained` / `<x> in observability`, exactly the byte-size pattern. One page owns it.
- **Video:** keyword-led YouTube title + first description line and Spotify title per the forward-SEO rules (`11_FORWARD_SEO_STEP6.md` §F) — lead with the topic keyword, keep the brand hook as the A/B alt. The video description links to the byte-size page (passes discovery to the ranking anchor).
- **The byte-size page embeds or links the TT video**, so the one ranking URL carries both the text (for search) and the video (for dwell + video-rich results).
- **Pattern, not vendor:** same rule as byte-size — target the generic definitional query, never "X vs Y" hit pieces.

## 4. Cluster fit (no new cluster)

TT topics slot into the existing Step-6 map (`11_FORWARD_SEO_STEP6.md`), they do not need a new one:
- **MCP** -> C6 AI-ops governance & accountability (pillar: who-owns-the-decision). Already live: `/p/what-is-mcp`.
- **Observing an AI agent** -> C6 (or C5 where it is convergence-led); cross-link the other pillar.
- **OTel Profiles (the fourth signal)** -> C4 Observability practice & tooling.
- **Wide events / three pillars** -> C4.

Each TT written anchor follows the byte-size internal-link rule: link up to its cluster pillar + 1 sibling, reciprocal link back once live.

## 5. Guardrails (so scripts can ship)

1. **One anchor per topic.** Never create a second MO web page (a "Tech Tuesday hub page", a landing page) targeting the same `what is X` query as the topic's byte-size. The byte-size `/p/` page is the single search anchor.
2. **The TT folder never duplicates the written post** — it cross-links to the `04_` anchor (DO-2026-07-09-01).
3. **Video description always links back** to the byte-size anchor, so YouTube/Spotify discovery feeds the ranking page.
4. **If a TT topic is not a clean "What Is X?" explainer** (an opinion/pattern piece), it still gets exactly one written anchor (a byte-size or a blog) plus the video — the one-anchor rule holds regardless of format.

## 6. Status vs shipped episodes

TT01 (MCP) already conforms: its written anchor is the live `byte-size: What Is MCP?` (`/p/what-is-mcp`, C6), with the franchise assets in `TT01_MCP/` cross-linking to the `04_` folder. TT02 (agent observability) should get its `what-is-...` byte-size anchor built to this doc before or alongside its launch. This positioning governs TT03+ at scripting time.
