# Blog Publish QA Gate (Growth)

Run this on EVERY blog and byte-size before it is called done, and again as a mandatory second pass. Check against the live beehiiv draft, not the notes. Do not report a piece as ready until every line here is ticked or explicitly deferred with a reason. Created 2026-07-03 after a run that shipped a hand-built CTA button, an unverified internal link, and a wrong URL path. **Section 0 added 2026-07-12** after two byte-sizes (Business Event, BMC Helix) shipped as drafts with unfilled template scaffolds, duplicate H1s, and misplaced CTAs, because the content was appended after the template and never read back.

## 0. Render read-back + build method (DO THIS FIRST — it catches the rest)
- [ ] **Read the rendered draft back** with `get_post_content` (text or editor_html) after building. Never mark a piece done from the intended content or the notes: read what actually landed in the post. This single step catches every defect in this gate.
- [ ] **No template scaffold left in the body:** zero `[bracket]` placeholder lines, zero empty template headings (e.g. "Why it matters" / "The catch" / "[The first idea]" with placeholder text under them).
- [ ] **No duplicate title:** exactly one title. A `# byte-size: What Is X?` H1 *inside* the body (on top of the post title) means the content was appended after the template instead of filling it. Delete it.
- [ ] **Exactly one CTA, at the foot:** one canonical Block A/B/C snippet, positioned after the body and before Related/Sources. No CTA box above the title; no second hand-built CTA table.
- [ ] **Build method (why the defect happens):** a beehiiv template PREPENDS your `html_content`, so anything passed as `html_content` on a templated post lands BELOW the template footer. Correct method: create with a one-line marker paragraph, call `get_post_content` (editor_html) for the real block hashes, FILL the template's placeholder blocks with `edit_post_content`, then DELETE the marker. Never paste the whole article as `html_content` on a templated post.

## 1. SEO
- [ ] **Title validated against demand + a known question (added 2026-08-23).** The target keyword reflects REAL search demand (GSC queries/impressions where available, otherwise verified real-world search intent), AND the title's search intent MATCHES the body. The piece answers a SPECIFIC captured question from ideation — name it (a `_Briefs/` item, a Reddit/curation capture, a GSC query, or a QA-bank question). FAIL example (2026-08-23): an organisational-alignment piece titled "The Real Blockers in an OTel Rollout" — searchers of "OTel rollout" want technical adoption help, but the body is about ownership/governance, so the title mismatches both content and intent; retitle to match (e.g. "observability rollout").
- [ ] H1 present; SEO meta title is distinct and keyword-led (~60 char); slug is clean and matches the canonical.
- [ ] Meta description set (~155 char). OG title + OG description + Twitter title + Twitter description all set (not null).
- [ ] Content tags applied (controlled vocabulary). Primary + secondary keywords actually appear in the body/headings.
- [ ] Canonical URL uses the real beehiiv path **`/p/<slug>`** (NOT `/blog/`). Confirm from the save_post/get_post `url` field.
- [ ] Thumbnail / OG image set. Alt text on every in-body image.
- [ ] Scannable structure: H2 per section, one insight each; word count sane for the type.

## 2. Funnel (the part most often missed)
- [ ] There IS a CTA in the body. A blog with no CTA is a funnel leak. Never ship without one.
- [ ] CTA is the **canonical code snippet from `08_CTA_HTML_SNIPPETS.md`**, inserted as a beehiiv Custom HTML block (htmlSnippet). **Never hand-build a button.**
- [ ] Correct block by intent (`06_CTA_LIBRARY.md`): commercial → Block A (advisory); informational/POV/how-to/definitional → Block B (newsletter); newsletter sends → Block C. Bite-size → Block B.
- [ ] CTA URLs are the verified-live canonical ones: advisory `/advisory`, free chapter `/metrics-and-mayhem/free-chapter`, book `amzn.eu/d/0cAuR2K1`, newsletter `https://masteringobservability.com`. NOT `/subscribe` or any guess.
- [ ] Email capture = `popup` (never gated on editorial). Web-only unless a send is intended.
- [ ] **Every internal link target is PUBLISHED** (verify each with get_post; a link to a draft 404s). Get the real slug from get_post, do not assume the `what-is-x` pattern. Defer any link whose target is not yet live and note it.
- [ ] 2+ internal cluster links + the reciprocal back-link from at least one sibling once live.

## 3. Codex / voice
- [ ] Run `python3 00_Command_Center/s5_lint.py <body-file>`: 0 em dashes, 0 alerting-vocab (page/paged/pager — the human "gets the call"; "booking page" etc. are legit web pages, judge context), 0 banlist words (leverage, synergy, cutting-edge, world-class, paradigm, future-proof, unlock, harness, game-changer, fast-paced, ever-evolving, delve, significant improvement, considerable progress).
- [ ] UK English. Register correct for the surface (POV vs definitional). Book in references from launch onward where it fits.
- [ ] Claims defensible (Codex §11): no invented numbers; vendor/stage figures framed as claims, not fact; no pricing/named-customer overreach; confidentiality boundaries honoured.

## 4. Brand + assets
- [ ] Images on brand; OG/thumbnail is the branded dark-asset card or an approved photo. No unconsented identifiable faces in public shots.
- [ ] **Diagrams:** Conviction blog carries ≥1 light in-body diagram at the core-concept beat; **byte-size carries ≥2** light in-body technical/principle diagrams (Al 2026-07-16). Two-pass + fresh-eyes QA.
- [ ] **Pull-quotes (Block Q):** Conviction blog carries **≥2** verbatim pull-quotes (top-third thesis line + back-half turn/close), each a real line from the body, ≤ ~20 words, §5-clean, inserted as the Block Q htmlSnippet with `aria-hidden`. **Byte-sizes are EXEMPT** (diagram-heavy instead). Newsletter sends carry 1 (the hook). See `08_CTA_HTML_SNIPPETS.md` Block Q + `23_PULL_QUOTE_STANDARD_PROPOSAL_2026-07-16.md`.
- [ ] Everything filed in the post's per-post folder.

## 5. Process
- [ ] Second pass done: re-read the live draft with fresh eyes; only a pass that finds nothing ships (same discipline as the diagram two-pass rule).
- [ ] Handoffs filed (Daily Ops social, Control CRs) and any cross-console follow-ups routed.
- [ ] After any workspace-file write, re-read to confirm it landed (OneDrive on this workspace silently drops/truncates writes; prefer bash append + verify for `.md`).

---
**Lesson bank (do not repeat):** hand-built button instead of the Block B code snippet; internal link to an unpublished post (404); wrong URL path (`/blog/` vs `/p/`, `/subscribe` vs the real free-chapter URL); assuming a slug instead of reading it; reporting a file saved when the sync had reverted it; **unfilled template scaffold + duplicate H1 + misplaced/duplicate CTA from pasting the whole article as `html_content` on a templated post instead of filling the template's blocks (Business Event + BMC Helix, built 2026-07-06, caught + fixed 2026-07-12) — Section 0's render read-back is the guard.**
