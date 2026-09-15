# Conversion Gap Closure — 2026-07-13 (Growth)

**Trigger:** GSC 2026-07-06 flags the clearest unaddressed gap in the SEO-to-revenue model: `/advisory` and `/metrics-and-mayhem/free-chapter` have **zero organic search presence** (0 clicks, 0 impressions, three reads running). CTAs and content improvements elsewhere cannot compensate if the conversion pages themselves surface for nothing.

## What the gap actually is (root cause)

The money pages are structurally invisible to search, for three separate reasons:

1. **`/free-chapter` is a gated lead magnet.** The body is walled behind an email gate, so there is little crawlable content and nothing to rank (already flagged as GR-2026-06-26-05: gated capture walls off the body, hurting SEO + AI-answer surfacing). Landing pages like this are not meant to rank on their own.
2. **`/advisory` is a thin commercial offer page.** It targets no informational query, so even indexed it surfaces for nothing. Offer pages convert clicks; they rarely earn search impressions themselves.
3. **No content ranks for BUYER-intent queries.** Our evergreen winners rank for *informational* cost queries (observability cost, what is Grafana Alloy) and now route to advisory by CTA. Nothing ranks for commercial queries a buyer types ("observability maturity assessment", "fractional observability leader", "observability consultant"). So the advisory funnel has no organic top of its own.

## What is already done (verified, do not redo)

- **CTA routing is live.** CHG-007 and CHG-008 (24 Jun) appended Block A (advisory + free chapter) to the two commercial evergreen pages — the Cost Conundrum (2,058 impressions/quarter) and Putting It All Together — so our biggest commercial-intent traffic already routes to the money pages via clicks. CHG-009..013 applied Block A / v2.0 CTAs across the other evergreen winners.
- So the fix is NOT more CTA routing. It is giving the money pages an organic on-ramp and making them crawlable.

## The fix, by owner

### Growth-lane (done this session)
- **Built the commercial-intent on-ramp:** "The Observability Maturity Assessment" (`04_Newsletter_and_Blog/2026-07-13_observability-maturity-assessment/`) — a Conviction blog targeting "observability maturity model / assessment" (a real buyer query mapping to Allan's £5k-15k assessment offer), routing to advisory + free chapter (Block A), with the five-level ladder diagram. This is the advisory funnel's organic top. Brief + draft + SEO pass + diagram complete; Beehiiv draft to build.
- **Money-page meta drafts** (below) for Al/Control to apply.
- Reciprocal in-links from the cost series into the new on-ramp on the next link sweep.

### Control / Al-lane (filed as a [SEO] CR)
1. **Ungate `/free-chapter` for crawlability** (or publish a crawlable, indexable intro/summary version of the chapter page that ranks for "observability book / free chapter" and gates only the download). Closes root cause 1; extends GR-2026-06-26-05.
2. **Apply the money-page meta** (drafts below) so both pages at least present correctly when linked/shared.
3. **Add the buyer-query commercial targets** ("observability maturity assessment", "fractional observability leader", "observability consultant / assessment") to the brief pipeline (workstream 4 of the SEO-to-Revenue model), so the advisory funnel keeps gaining organic tops, not just the one built today.
4. **Conversion instrumentation** (already filed under SEO-2026-06-23-01): surface advisory-page sessions from organic + free-chapter clicks in the health check, so we can see this gap closing.

## Money-page meta drafts (for application)

**/advisory**
- Meta title (<=60): `Observability Advisory: Maturity Assessments & Strategy`
- Meta description (<=160): `Independent, tool-agnostic observability advisory: maturity assessments, cost reviews, and a shortest-path plan to the reliability and spend you need.`
- OG title: `Observability Advisory & Maturity Assessments`
- OG description: `An outside read on where your observability actually stands, and the shortest path to the level that changes your incidents and your spend.`

**/metrics-and-mayhem/free-chapter**
- Meta title (<=60): `Free Chapter: Mastering Observability`
- Meta description (<=160): `Read the opening chapter of Mastering Observability free: the practitioner approach to cost-effective, decision-led observability. No fluff, no vendor pitch.`
- OG title: `Mastering Observability, Free Chapter`
- OG description: `The approach in Allan Mann's own words: start from the question you are answering, not the tool you are buying.`

## How we will know it worked
- `/advisory` and `/free-chapter` (or the crawlable chapter page) begin to register impressions in GSC.
- The maturity-assessment on-ramp ranks for "observability maturity" queries and drives advisory-page sessions from organic.
- Conversion review (monthly): organic -> advisory sessions and free-chapter clicks move off zero.
