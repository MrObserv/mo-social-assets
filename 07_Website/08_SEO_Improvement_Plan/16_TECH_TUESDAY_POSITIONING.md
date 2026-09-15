# Tech Tuesday — SEO + positioning (settles ID-2026-07-05-02)

**Owner:** Growth. **Date:** 2026-07-10. **Purpose:** settle three questions before more Tech Tuesday scripts ship: (1) is Tech Tuesday a byte-size-style series with its own hub, (2) how does it relate to the written "What Is X?" byte-size series, (3) what is the keyword angle. Decision doc, not a script.

## Decision in one line
Tech Tuesday is the **video/audio explainer surface** of the same topic universe the **written "What Is X?" byte-size** series already owns. Same questions, two mediums, one cluster. They cross-link and reinforce; they do not compete.

## 1. Relationship to the "What Is X?" byte-size series
- **Same topic universe, different medium.** The byte-size posts (`/p/what-is-ebpf`, `/p/what-is-mcp`, `/p/what-is-odigos`, ...) are the **canonical indexable text**. Tech Tuesday is the **video-first explainer** (YouTube + Spotify) on the §1.5 Fifth Gear register, one concept explained well.
- **Pairing rule:** every Tech Tuesday topic that is also a "what is X" question gets a matching byte-size post on the `/p/what-is-<topic>` slug, and the two cross-link both ways. MCP is the reference pair, now live: byte-size `/p/what-is-mcp` <-> Tech Tuesday 01 on Spotify (`1Nw5DzeSbMEayrR2ti1ioj`). The Odigos byte-size now links to both, seeding the cluster.
- **Division of labour:** the byte-size carries the **SEO weight** (indexable prose, internal links, the Google web result). Tech Tuesday carries **reach + brand** (YouTube discovery, Spotify, a second SERP surface) and is biased to **forefront/emerging** terms where being early wins the ranking before the topic gets crowded.

## 2. Own hub? Yes, but a video hub, not a second text corpus
- **Do** give Tech Tuesday its own **series hub** (a landing/series page: brand identity, episode list, embedded players, one-line summaries). Value: a branded home for the franchise, a subscribe surface, and internal-link equity into the byte-size posts.
- **Do NOT** create a second thin text page per episode that competes with the byte-size for the same keyword. Each Tech Tuesday episode page = the **video/audio embed + a short summary + a canonical link to the matching byte-size**. The byte-size stays the canonical text for the query; the episode page points to it (rel=canonical to the byte-size where the topic is identical, or a clearly distinct video-first summary if not).
- Net: **one indexable text asset per topic** (the byte-size), plus a video surface. No duplicate-content self-competition.

## 3. Keyword angle + SERP strategy
- **Intent:** informational, top-of-funnel "what is X" queries. Same intent as the byte-size, which is the point.
- **Two SERP surfaces for one query:** the byte-size targets the **Google web result**; the Tech Tuesday video targets **Google video results + YouTube's own search**. Optimise the YouTube title/description/tags for the exact "what is X" query so the video ranks alongside the text. Occupying two positions for one query is the whole advantage of running both.
- **Topic selection bias:** lead with **forefront terms** where MO can rank before the SERP thickens: MCP (live), OTel profiles (the fourth signal), observing an AI agent (OTel GenAI conventions), wide events / observability 2.0. These are the Episode_Candidates already recut to Fifth Gear.
- **AI-native cluster:** MCP <-> observing AI agents <-> wide events form a tight internal-link cluster around "AI-native observability". Build these as a linked set (byte-size + Tech Tuesday each), not standalone posts, so the cluster compounds. Odigos is the current entry point into it.

## 4. Operating rules (per Tech Tuesday episode)
1. Ship the **byte-size post first or alongside** the episode, on `/p/what-is-<topic>`, with the OG card, intent CTA, and §5/brand check (normal blog-build gate).
2. **Cross-link both ways:** byte-size links to the episode (Spotify/YouTube); episode description links to the byte-size.
3. **YouTube SEO:** title = the exact query ("What Is X?"), description leads with a one-paragraph answer + the byte-size link, tags match the topic keyword and cluster.
4. **Hub:** add the episode to the Tech Tuesday hub with a one-line summary + embeds.
5. **Cluster link:** link the episode/byte-size to its AI-native siblings where relevant.

## 5. Needs Al / Control (site + structure, not Growth's to build alone)
- **Hub page build** (`/tech-tuesday` or similar) is a site change: needs Al/Control. Growth supplies copy, episode list, and the internal-link plan.
- **Canonical tags** between an episode page and its byte-size are a site/beehiiv config decision: confirm the pattern with Al before the second episode page exists.
- Cadence (fortnightly vs monthly, video-first) is still Al's open call per ID-2026-07-05-03; positioning above holds at any cadence.

**Status:** positioning settled (answers to ID-2026-07-05-02). MCP pair is the live reference implementation. Hub build + canonical pattern flagged to Al/Control.
