# Monday Paste Checklist, CTAs for the 6 evergreen posts

> One screen. For each post: open it in beehiiv, paste the block at the END of the body (after the article, before any existing links), save, then paste the matching change-log entry into `04_CHANGE_LOG.md` and tick. §5-clean. Destinations verified live 2026-06-23.

## The two blocks to copy

**Use the branded HTML drop-ins** in `08_CTA_HTML_SNIPPETS.md`: in each beehiiv post add a **Custom HTML block** at the end of the body and paste Block A or Block B. No price in the CTA (it lives on `/advisory`). The plain-text versions below are a fallback only.

**BLOCK A (Advisory)**, paste on the 4 commercial posts:
```
Work with me
If you are leading observability in a regulated enterprise and want an honest read on what is working and what is theatre, I run a fixed-scope Observability Assessment for senior IT and engineering leaders. It ends in a written roadmap and a readout, not a sales deck.
Book a call or see how it works: https://www.masteringobservability.com/advisory
Not ready to talk? Start with a free chapter of Metrics & Mayhem: https://www.masteringobservability.com/metrics-and-mayhem/free-chapter
```

**BLOCK B (Newsletter)**, paste on the 2 informational posts:
```
Get the next one
If this was useful, Metrics & Mayhem sends one short, practical piece like it to IT operations leaders most weeks. No fluff, no vendor noise. Join free: https://masteringobservability.com
Or start with a free chapter of the book: https://www.masteringobservability.com/metrics-and-mayhem/free-chapter
```

## The 6 actions — STAGED via API 2026-06-24 (Growth). No manual paste needed; each is a draft awaiting Al's publish.
| # | Post | Block | Log | Status |
|---|---|---|---|---|
| 1 | /p/the-observability-cost-conundrum | BLOCK A | CHG-007 | ✅ staged to draft |
| 2 | /p/building-a-comprehensive-cost-effective-observability-strategy | BLOCK A | CHG-008 | ✅ staged to draft |
| 3 | /p/mastering-it-observability (Harmonising IT) | BLOCK A | CHG-009 | ✅ staged to draft |
| 4 | /p/the-power-of-business-aligned-observability | BLOCK A | CHG-010 | ✅ staged to draft |
| 5 | /p/what-is-grafana-alloy | BLOCK B | CHG-011 | ✅ staged to draft |
| 6 | /p/opentelemetry-collector-implementation-guide | BLOCK B | CHG-012 | ✅ staged to draft |

**How it was done:** rather than the manual Custom-HTML-block paste, the v2.0 Block A/B snippets were injected directly via the beehiiv API (`edit_post_content`, htmlSnippet) so they land in each post's draft. **Al's only step: open each post (or its `?draft=true` preview), eyeball it, and publish.** In-body subscribe buttons were restyled to v2.0 in place at the same time (CHG-013).

The two open meta fixes are also done in draft: **CHG-002** (Harmonising IT OG title "rafting"→"Crafting") and **CHG-005** (138-char Cost Strategy description re-pasted), both via `edit_post`. Confirm on publish.

## Pre-filled change-log entries (paste into 04_CHANGE_LOG.md as you go; set the date)
```
## CHG-007: Cost Conundrum, advisory CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/the-observability-cost-conundrum · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block A (Advisory, routes to /advisory + free chapter)
- Rationale: commercial-intent post; route to advisory per the SEO-to-Revenue model.

## CHG-008: Putting It All Together, advisory CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/building-a-comprehensive-cost-effective-observability-strategy · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block A (Advisory)
- Rationale: commercial-intent (cost strategy pillar).

## CHG-009: Harmonising IT, advisory CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/mastering-it-observability · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block A (Advisory)
- Rationale: commercial-intent (strategy); highest-traffic post, biggest CTA win.

## CHG-010: Business-Aligned Observability, advisory CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/the-power-of-business-aligned-observability · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block A (Advisory)
- Rationale: commercial-intent (business-KPI strategy).

## CHG-011: What Is Grafana Alloy, newsletter CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/what-is-grafana-alloy · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block B (Newsletter, routes to signup + free chapter)
- Rationale: informational, top-of-funnel; grow the list.

## CHG-012: OpenTelemetry Collector Guide, newsletter CTA
- Date: 2026-06-2X · Owner: Allan · URL: /p/opentelemetry-collector-implementation-guide · Status: Applied
- Old value (rollback): no CTA block at end of post
- New value: appended Block B (Newsletter)
- Rationale: informational how-to, top-of-funnel; grow the list.
```

## Definition of done
All 6 CTAs live, 6 change-log entries pasted and set to Applied, and the 2 meta fixes cleared. Next week's GSC + beehiiv check will show whether advisory-URL visits and signups move.
