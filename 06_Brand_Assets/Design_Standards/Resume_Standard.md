# Resume Standard v1.1 (2026-10-27)

Owner: Brand console. Consumer: Job chat (job-application skill, Stage 2).
Editable source: `Resume_Template.html` (plain HTML, `<meta name="mo-template" content="resume 1.1.0">`, `data-template-version="1.1.0"` on `<main>`).
Offline view copy: `Resume_Template (offline).html`. Fonts embedded. Never edited.
Cover letter: `Cover_Letter_Template.html` (cover-letter 1.0.0).
Design-system view: `Allan Mann Resume 2-page.dc.html`, Components #resume. Not a build input.

## Rule zero
Content comes from `Master/Allan Mann - Master Resume.md`. Tailoring changes words only. The layout is fixed.

## Export
- Canonical export is WeasyPrint on `Resume_Template.html`. The template carries its own `@page { size: A4; margin: 16mm }` and `orphans/widows: 3`, so a browser and WeasyPrint read the same rules. There is no runtime component.
- Browser print is for parity checks only: A4, margins Default, Headers and footers OFF, Background graphics ON.

## Layout (fixed)
- A4, 16 mm margins, single column, light only. No logo, no ring mark, no photo, no icons, no columns, no tables.
- Hard limit: 2 pages. Reference build measures 1.91 pages (browser, 27 Oct). Job chat measured v1.0 at 1.93 (WeasyPrint).
- Name in the body, never in a header or footer: Montserrat 800, 26 pt, #0D2127.
- Headline: DM Sans 700, 11.5 pt, #17695C. Editable per role, one line, 80 characters or fewer.
- Contact line, one row: London, UK | +44 755 219 6185 | email | masteringobservability.com | linkedin.com/in/allanmann1. UAE number (+971 58 539 4768) only for Gulf roles.
- One 2 px #2F9E8D rule under the header. Plus a 1 px #DCE7E5 divider under every role block except the last. No other decoration.
- Pages 2 and later: a footer at bottom right, `Allan Mann · 2 of 2`, Space Mono 700, 7 pt, #5A6E72. Never on page 1.
- Section heads: Space Mono 700, 8.5 pt caps, #17695C. Names, in this order: Professional Summary, Skills, Professional Experience, Education & Development, Publications and Community.
- Body: DM Sans 9.5 pt / 1.42, #16282D. Ligatures OFF (fi/fl break ATS text extraction).
- Role block: employer (Montserrat 800) left, dates right as "Mon YYYY – Mon YYYY" or "Mon YYYY – Present". Title (teal 700) left, location right, on the next line. Never put location in the employer line.
- Lesson line: the `data-slot="lesson"` element (DM Sans italic, #3B5257). At most 3 in the document.
- Skills: one chip per skill, `white-space: nowrap`. One vendor per chip. Up to 14 chips and 4 rows. Chips may be swapped per role from the master's Skills list.
- A role header and title never split from the first paragraph across a page break.

## What the Job chat may change in the template
- Text inside any `data-slot` element.
- It may clone or remove an element with `data-slot` body, lesson, skill or publication, with the style attribute byte-identical.
- A whole `data-slot="role"` section may be cloned for a new employer, on Allan's instruction only.
- Nothing else. A style attribute is never edited. No new element types. Fonts, sizes, spacing and margins never change to make text fit.

## Length budget
- Summary: 3 short paragraphs. The current role leads.
- Current role: 1 to 3 paragraphs. The next three roles: 2 to 4 paragraphs each. Older roles and the career break: 1 paragraph.
- Total text, everything inside `<main>` included: 900 words or fewer. Reference build: 868. The page gate decides; the word count is a guide only.
- Roles are shortened, never removed. The career break always stays.

## Content rules
- Years: "over twenty years". Never "Twenty-five" or "25+" (the career starts in 2005).
- The current role is NatWest. No earlier role may say "most recently" or "currently".
- Regulators: PRA, FCA, MAS, ASIC, HKMA.
- The podcast appears under Publications only, never inside a role.
- En dash only between dates. Em dash nowhere.

## Deliverables per application
1. `Allan Mann - Resume - <Company>.pdf`: WeasyPrint render, 2 pages or fewer.
2. `Allan Mann - Resume - <Company>.docx`, built to the DOCX spec below.
3. `Allan Mann - Resume - <Company>.html`: the filled working copy, re-bundled. It stays in the application folder as proof of what the PDF was built from and is never sent.
4. Cover letter, when one is sent: `Allan Mann - Cover Letter - <Company>.pdf` from `Cover_Letter_Template.html`, 1 page.
The working `3. Resume.md` stays in the application folder.

## DOCX spec
- A4, 16 mm margins. Calibri: body 10.5 pt, name 20 pt bold (Word Title or Heading 1), section heads Heading 2.
- Skills: one comma-separated line.
- Role line: employer left, dates on a right-aligned tab stop. Title and location on the next line, with location on the same tab. No tables, no text boxes.
- Lesson lines in italic. Hyperlinks kept.
- Footer from page 2, using Word's different-first-page setting: "Allan Mann · 2 of 2".
- Gate: convert with LibreOffice; the result must be 2 pages or fewer. Fix with words, never with font or size.

## Gates before handover
1. Page count of 2 or fewer, measured on the PDF and on the DOCX converted with LibreOffice.
2. No em dashes.
3. None of "Twenty-five", "25+", "Most recently", "Currently producing".
4. Extracted PDF text gives the name, email and every date in reading order, and "fi"/"fl" words are intact.
5. Every en dash sits between two dates (or a date and "Present").
A gate that words cannot fix goes back to the Brand console as a question.

## Changelog
- 1.1.0 (2026-10-27): Answers to the Job chat's 21 questions. Dropped the doc-page runtime in favour of plain HTML with its own @page. Added data-slot markers, a version marker, the page-2 footer, the DOCX spec, a cover letter template and gate 5. The summary now leads with NatWest. Hairline dividers documented. Current-role budget set to 1 to 3 paragraphs, plus a 900-word ceiling. Chips nowrap, up to 4 rows. Last role block's spacing aligned with the others.
- 1.0.0 (2026-10-26): First issue.
