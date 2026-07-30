# Blog & Newsletter Folder Standard (`04_Newsletter_and_Blog/`)

**Canonical structure for `04_Newsletter_and_Blog/`.** Adopted 2026-06-24 (Control). The folder kept drifting into a loose dump; this is the rule that keeps it tidy. Sibling to `Blog_Thumbnail_Standard.md`.

## The rule: the top level holds FOLDERS ONLY
No loose files at the top of `04_Newsletter_and_Blog/` except this-pattern folders and a `README.md`. Everything lives in one of:

| Location | Holds | Written by |
|---|---|---|
| `YYYY-MM-DD_<topic-slug>/` (per-post folder) | one blog post: body `.md`, blog pack `.docx`, its SEO pass, thumbnails, diagrams, a `_archive/` | `weekly-blog-draft` (draft + SEO pass); Growth |
| `_Briefs/` | blog briefs (`YYYY-MM-DD_Blog_Brief_<slug>.md`) | `transcript-to-pipeline`; Growth |
| `_Newsletter/` | newsletter production packs (`beehiiv_production_pack*`, `Beehiiv_Prod_Pack.pdf`), welcome/automation emails (`welcome_email_*`), and their thumbnails | Growth / manual |
| `Observability_Digest/` | the monthly digest drafts + `Observability_Digest_TEMPLATE.md` | `observability-digest-build-reminder` flow / Growth |
| named topic folders (e.g. `DIY_AIOps_research/`, `House of Lords Dinner/`) | research / event material | as relevant |
| `_archive/` | superseded one-offs | Control / Growth |

## Naming
- Per-post folder: `YYYY-MM-DD_<topic-slug>/` (date = publish-or-draft date).
- Inside it: `YYYY-MM-DD_Blog_Draft_<slug>.md`, `YYYY-MM-DD_Blog_SEO_Pass_<slug>.md`, blog pack `.docx`, `thumbnail_*`, `diagram_*`.
- Brief: `YYYY-MM-DD_Blog_Brief_<slug>.md` in `_Briefs/`.

## Who writes where (the controls)
- `transcript-to-pipeline` writes briefs into `_Briefs/` (never the top level).
- `weekly-blog-draft` creates the per-post folder `YYYY-MM-DD_<slug>/` (allowed self-serve per governance §3a) and writes the draft + SEO pass INTO it (never the top level).
- `weekly-social-production` writes the Beehiiv DRAFT via the MCP (not a file here) and the full social copy to `Social_<date>.md` in the EPISODE folder, not here.
- Growth/Daily-Ops may create per-post and per-issue folders themselves (governance §3a: empty, naming-standard, no moves, logged).

## Hygiene guard
`codex-drift-scan` (Sunday) flags any loose file sitting at the top level of `04_Newsletter_and_Blog/` that is not one of the folders above, so drift is caught weekly. Control tidies flagged files into the right home.
