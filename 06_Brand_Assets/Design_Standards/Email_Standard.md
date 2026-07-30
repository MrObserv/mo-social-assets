# Email Standard (Beehiiv HTML blocks)

**Created:** 2026-06-08, after an Outlook test of the welcome email rendered body text near-invisible (dark-on-dark). Applies to any custom HTML pasted into Beehiiv: welcome automations, snippets inside issues, promo blocks. The web pages standard (free chapter, thank-you, advisory) is separate; pages can use full CSS, email cannot.

## The theme rule: hybrid

Full-dark emails fight Outlook and lose. The house pattern is **hybrid**: a dark navy brand band top (eyebrow, headline) and a dark footer (canonical links), with a **light body** for the reading text. The brand moment survives in every client; the words stay readable even when a client meddles. Reference implementation: `04_Newsletter_and_Blog/_Newsletter/welcome_email_2026-06.html`.

## Coding rules (all mandatory)

1. **Tables, not divs**, for structure. `role="presentation"`, cellpadding/cellspacing 0. Outlook renders with the Word engine and ignores most div layout.
2. **Explicit hex colour on every text element.** No inheritance: every `<p>`, `<a>`, `<h*>`, `<span>` carries its own `color:#hhhhhh`. This was the welcome-email bug: paragraphs inheriting from a wrapper div rendered black on navy in Outlook.
3. **No rgba(), no gradients, no shadows, no background images.** Outlook drops rgba entirely (element falls back to default colour) and does not render CSS gradients. Solid hex only. The 4px teal edge is a solid table row, not a gradient.
4. **bgcolor attribute AND background-color style** on every coloured `<td>`.
5. **Inline styles only.** Beehiiv strips `<style>` and `<script>` from HTML blocks; many clients strip them anyway.
6. **600px single column**, `width="600"` plus `max-width:100%`. Font stacks with fallbacks: `'DM Sans',Helvetica,Arial,sans-serif` and `'Space Mono','Courier New',monospace` (brand fonts render where installed, degrade gracefully).
7. **Links underlined in the light body** (`text-decoration:underline`) for accessibility; footer links on dark may drop the underline.
8. **Canonical URLs from Codex §26.1 only**; book pitch line §26.2 verbatim. URL changes are a Codex bump, not an inline edit.

## Mobile rules (most reads happen here)

9. **Fluid-hybrid container:** inner table `width="100%"` with `style="max-width:600px"`, wrapped in an MSO conditional ghost table at `width="600"` so Outlook desktop still caps. Never a fixed `width="600"` alone.
10. **24px side gutters**, body text ≥15px, headline ≤36px so nothing forces a zoom at 360px.
11. **`word-break:break-word`** on any paragraph carrying long URLs (the §26.3 footer block) and on long letterspaced mono lines.
12. **Verify at phone width** (~375px) as part of the test checklist, not just desktop.

## Dark-mode behaviour (accepted, not fought)

Outlook and Gmail dark modes transform colours and there is no bulletproof override. The hybrid pattern accepts this: a light body inverts to readable light-on-dark; the dark bands generally survive or invert to something acceptable. Do not chase pixel-perfect dark-mode parity; chase legibility in both modes.

## Test checklist (before any email goes live)

- [ ] Beehiiv test send to Outlook (desktop or corporate web: the audience proxy) in light AND dark mode
- [ ] Beehiiv test send to one consumer client (Gmail or Apple Mail)
- [ ] Every paragraph readable in all four views
- [ ] Links resolve to the §26.1 canonical URLs
- [ ] Subject and preview text set (preview ~120 chars)
- [ ] Voice check: UK English, no em dashes, no AI tells, no emojis outside the locked §26.2 line

## Sources (researched 2026-06-08)

Email on Acid and Litmus dark-mode guides; Microsoft Q&A confirms no supported override for Outlook dark-mode colour transformation. Details: emailonacid.com/blog/article/email-development/dark-mode-for-email, litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers.
