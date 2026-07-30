# Email Signature Standard (Outlook)

**Created:** 2026-06-08. The brand email signature. Reference implementation: `06_Brand_Assets/outlook_signature_2026-06.html` (and `_PASTE.txt`). Inherits the coding rules in `Email_Standard.md`; this file covers what the signature says and how it is laid out.

## Layout

Light theme (signatures sit on white reply chains). Two-cell table: circular headshot left, text block right, separated by a 3px teal `#0d7377` left-border on the text cell (the brand divider motif).

- **Headshot:** circular crop, 86x86 display, embedded as base64 so it survives copy-paste into Outlook. Source: the author headshot in `06_Brand_Assets`.
- **Name:** 17px bold, ink `#0f2b2d`.
- **Title:** 13px bold, teal `#0d7377`. Current: "Author, Metrics & Mayhem | Observability & AIOps Strategist". Update the title as roles change; keep the book credit first while the book is the lead brand asset.
- **Mobile:** 13px, click-to-call `tel:` link, muted `#44595b`.
- **Italic line:** one sharp line in Codex voice, grey `#5b7070`. Current: "Most teams can see everything and understand nothing. The work is the difference." Swap freely; keep it one line, no em dashes.
- **Link row:** 12.5px teal, middot-separated, "The Book" bold first. Links use the Codex §26.1 canonical URLs: Book, Free Chapter, Podcast, Newsletter, LinkedIn.

## Rules

1. Inherit every rule in `Email_Standard.md`: table layout, inline hex on every element, no rgba, no gradients.
2. **Embed the headshot as base64**, do not hotlink. Outlook strips many external images by default; base64 pastes reliably through a browser copy.
3. **Canonical URLs only** (§26.1). A URL change is a Codex bump, not an inline edit.
4. **Keep it to one compact block.** No legal disclaimer, no social-icon clutter, no second photo. Five links is the ceiling.
5. UK English, no em dashes, no AI tells.

## Install (Outlook)

Open `outlook_signature_2026-06.html` in a browser, select all (Ctrl+A), copy (Ctrl+C), paste into Outlook > Signatures > Edit signature. The embedded headshot comes through on paste. Set as default for new messages and replies.

## When to update

New role or title change, a new canonical link, or a refreshed tagline. Rebuild the single HTML file, re-copy the `_PASTE.txt`, and the install step is the same.
