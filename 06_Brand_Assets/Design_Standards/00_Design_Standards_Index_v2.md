# Design Standards Index

**One line per standard. History lives in the changelog, not here.**

Updated 2026-09-11. Owner: Growth. Canonical tokens: `design-tokens.json`. Canonical system: `Brand_Design_System_v3.md`.

## Foundations

| Standard | Covers |
|---|---|
| `Brand_Design_System_v3.md` | **v3.1.0, ratified 2026-09-11.** Tokens, modes, type, structure, motion. Supersedes v2.0 and every palette table in the files below. |
| `design-tokens.json` | Machine-readable tokens. Every producer reads this. Never hand-edit a producer palette. |
| `Logo_and_Marks_Standard.md` | Ring mark, crosshair, lens wash, lockup by lane. |
| `Contrast_Audit_2026-09-11.md` | Every pairing measured against WCAG AA. Re-run on any colour change. |
| `producers/mo-tokens.js` · `producers/mo_tokens.py` | The read path. A producer that defines a hex is a defect. |

## Web, email and documents

| Standard | Covers |
|---|---|
| `Email_Standard.md` | Beehiiv HTML email, 600px single column, dark-mode handling. |
| `Email_Signature_Standard.md` | Outlook signature, text only. |
| `Long_Form_PDF_Standard_v2.md` | Ebooks, lead magnets, client deliverables. A4, dark cover, light interior. |
| `../Slide_System/Slide_Design_System.md` | Eleven deck masters, running order, dark-slide budget. |
| Pull-quote block | `07_Website/08_SEO_Improvement_Plan/23_PULL_QUOTE_STANDARD_PROPOSAL_2026-07-16.md` |

## Diagrams

| Standard | Covers |
|---|---|
| `Diagram_Standard.md` | Families 1 and 2, eighteen-pattern catalogue, arrow grammar, theme flag. |
| `Architecture_Diagram_Standard.md` | Family 3. C4 and OTel, four modes, line-icon language. |
| Shared QA gate | Fourteen points, carried verbatim in both files. Neither is ahead of the other. |

## Social, static

| Standard | Covers |
|---|---|
| `Blog_Thumbnail_Standard.md` | Blog and byte-size OG cards, 1200x630. |
| `OG_Card_Standard.md` | Episode OG cards. Not the blog card. |
| `The_Signal_Card_Standard.md` | Newsletter masthead, 1200x630, continuing issue number. |
| `Carousel_Standard.md` | LinkedIn and Instagram, 1080x1350, 5 to 7 slides. |
| `Quote_Card_Standard.md` | 1080x1080. Verbatim body line, producer-built. |

## Podcast and video

| Standard | Covers |
|---|---|
| `Episode_Launch_Pack_Standard.md` | What ships with an episode. |
| `Tech_Tuesday_Standard.md` | Series identity, terminal motif, TUE chip. |
| Square episode art | 3000x3000 both series. Waveform = Signal Drop, terminal = Tech Tuesday. |
| `YouTube_Thumbnail_Standard.md` | 1280x720, three approved variants. |
| `Shortform_Bookend_Standard.md` | Generic 9:16 intro and outro. |
| `Video_Card_System_Standard.md` | Four burned card types, SRT timing. |
| `Podcast_Intro_Standard.md` | Cold open, 7s. |
| `Podcast_Outro_Standard.md` | End card. |
| `Podcast_Signal_Check_Standard.md` | Q&A bumper, 2.4s. Supersedes the Q&A transition. |
| `Hero_Thumbnail_Standard.md` | **PARKED POC.** Not production. |

## Production

| Standard | Covers |
|---|---|
| `Thumbnail_Producer_Routing.md` | Which producer builds what. |
| `Blog_Newsletter_Folder_Standard.md` | Where assets are filed. |
| `Shortform_Video_Publishing_Standard.md` | Clip publishing and packs. |

## Stamped as superseded, pending edit

`07_Website/Web_Design_Best_Practices.md` — superseded on tokens by v3. Not yet stamped. Add the supersession line at the top and strip lines 65 to 70.

## Retired

`Brand_Design_System_v2.md` (tokens superseded by v3) · `Long_Form_PDF_Standard.md` v1.0 (pre-v2.0 palette, retired wholesale 2026-09-11) · `Podcast_QA_Transition_Standard.md` (superseded by Signal Check) · `Canva_Brand_Kit_Setup.md` and `Canva_Library_Audit_2026-07-01.md` (Canva retired 2026-09-11; quote card and carousel move to producers) · all `*.bak` files (move to `_archive/`, versioning is the changelog's job).

## QA, applies to everything

Rendering is not shipping. Open it at full size and at the size it will actually be seen. Two passes minimum, fresh eyes on the second, an independent challenge for anything client-facing. Diagrams clear the fourteen-point gate. Codex §5 applies to every word on every asset.
