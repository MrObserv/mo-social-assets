# The Signal — newsletter assets

Hosting home for **The Signal**, the weekly Mastering Observability newsletter. Sibling to `Podcasts/` and `Tech_Tuesday/`. Image assets live here (the repo is the hosting source of truth; raw.githubusercontent URLs resolve after `sync_now.bat` / auto_sync pushes). Working docs and issue records live on G: at `04_Newsletter_and_Blog/The_Signal/`.

## Folder pattern
One folder per issue: `NNN_YYYY-MM-DD_<slug>/` (issue number first so issues sort in order).

Each issue folder holds its masthead card (`the-signal_issue-NNN_1200x630.png`) and any other per-issue visuals.

## Issue numbering (IMPORTANT)
The Signal is **not** a new newsletter. It started **21 February 2024** and has run weekly/twice-weekly since. The count was reset at 100+, so the 2026-08-21 rebrand issue is **Issue 101**, and the counter increments from there. Never label an issue "01" — it is a continuing publication, not a launch.

## Card standard
Cards are built by the canonical thumbnail builder (`00_Command_Center/thumbnail_builder.py`, `compose_signal`), per `06_Brand_Assets/Design_Standards/The_Signal_Card_Standard.md`. Dark navy + mint surface, Mastering Observability house lockup, THE SIGNAL masthead, "The weekly observability newsletter" descriptor, issue number + date, and that week's lead headline.
