# Beehiiv Templates (v2.0 brand + funnel)

**Built 2026-06-23 by the branding chat.** Three canonical beehiiv post templates in the **Mastering Observability** publication (`pub_51d69527-d6a4-44db-9fca-9b6cf2fee3e4`), themed to the v2.0 brand and with the revenue funnel baked in so no CTA is missed. These replace the 56-template clutter (cull list below).

## The three templates

| Template | beehiiv ID | Use | Baked-in CTA |
|---|---|---|---|
| **Bite-size (v2.0)** | `post_template_56ac7abe-e299-4a77-b81c-26af11e3a814` | Short definitional / how-to ("byte-size: What is X"). Top-of-funnel. | Block B (newsletter growth) |
| **Blog (v2.0)** | `post_template_573ef3ba-9b7a-4166-870a-6bf53a582265` | Long-form deep-dives and evergreen articles. | Block A (advisory). Swap to Block B for purely informational blogs per the routing rule. |
| **Newsletter — Signal Drop (v2.0)** | `post_template_32b777d5-a021-4361-a1e8-f24f86d1964f` | Every Signal Drop newsletter send. §9.2 structure. | Block C (footer: book first, advisory for the right reader) |
| **Observability Digest (v2.0)** | `post_template_5369eced-d530-4e8c-ba17-cec2f37c02d1` | Monthly (moving to fortnightly) Observability Digest. Hybrid POV-led structure: promise line, deep dive, on-the-blog roundup, from-my-feed, worth-your-attention, stream choice. Added 2026-06-24. | §26 canonical footer (book-first) baked in |

CTA source of truth: `08_CTA_HTML_SNIPPETS.md` (v2.0). Routing rule: `06_CTA_LIBRARY.md` / `05_SEO_TO_REVENUE_MODEL.md`. Links per Voice Codex §26.1.

## The brand applied (v2.0)
- **Fonts:** DM Sans body, Montserrat headings + post title, Space Mono labels (in the CTA eyebrows). Replaces the old Space Grotesk / Helvetica.
- **Colour:** ink `#16282D`, inline links darkened teal `#17695C` (AA-safe) underlined in teal `#2F9E8D`, divider rule teal `#2F9E8D`, buttons teal `#2F9E8D` with navy `#0D2127` text, tables/quotes tint `#EAF6F3`, table borders `#C9DCDC`.
- The CTA snippets carry the navy band `#0D2127` + bright teal `#74DDCD` eyebrow. Matches slides, site, studio/meeting backgrounds and signature.

## How to use
New post → start from template → pick by type above. The structure placeholders prompt the Voice Codex shape; fill them, keep the CTA snippet at the foot. **Test-send to Outlook (light + dark) and one consumer client before publishing** (Email Standard checklist). For a one-off web post, the raw CTA HTML is in `08_CTA_HTML_SNIPPETS.md`.

## Cull list (delete in the beehiiv UI — the API cannot delete templates)
The new three supersede the old set. Safe to delete once you have used the new ones once:
- **Replaced by Newsletter (v2.0):** "Newsletter Feb 2026", "The Signal (1)", "(2)", "(3)", "(4)", "Signal Drops" (both), "New - Signal Drop" (both), "New template (Signal Drop: Did Your Team Actually Hear You?)".
- **Replaced by Blog (v2.0):** "Blog Template Feb 2026", "Featured Interview (3)", "(4)".
- **Bite-size (v2.0):** new format, nothing to replace.
- The remaining ~40 (mostly older "Community Pulse", legacy issues) are not on-brand; review and delete in the template manager. Keep only the three v2.0 templates as live going forward.

## Publication-wide repaint to v2.0 (UI only — no API)
Beehiiv exposes theme-setting at post, template and subscribe-form level only. There is **no API to set the publication default theme**, so this one is a manual job in **Settings → Design (Brand / Theme)**. The three templates already carry v2.0; this only affects posts created without a template. Set:

- **Fonts:** Paragraph / body = **DM Sans**; H1-H4 + post title = **Montserrat**; lists/tables/quotes = DM Sans.
- **Colours:** body text `#16282D`; inline link `#17695C`, link underline `#2F9E8D`; content divider (rule) `#2F9E8D`; button background `#2F9E8D` with text `#0D2127`, border width 0, radius 4; table header background `#EAF6F3`, table border `#C9DCDC`, cell background `#FFFFFF`; quote background `#EAF6F3`.
- These mirror the token map applied to the three templates (`save_post_template_theme`, 2026-06-23).

## Not done here (flag for Control / you)
- **Content tags** were not attached (would need tag UUID lookup); add the right tags per template in beehiiv, or ask and I will wire them via the API.
- **Deleting old templates is manual** (no delete API) — see the cull list above.
- **Subscribe form** can be repainted to v2.0 via API (`save_subscribe_form_theme`, writes a draft you publish from the website editor). Say the word and I will do it.
