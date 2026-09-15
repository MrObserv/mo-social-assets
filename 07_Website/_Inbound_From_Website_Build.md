# Inbound from the website build satellite: standing index

**MECHANISM CHANGED 2026-09-06, after the first delivery proved the original design impossible. Read this before writing anything.**

**Maintained by: the Content Management console (Growth lane). The satellite does NOT write to this file.**

## Why it changed

This file was originally designed as an append-only log the satellite would add entries to. **The satellite cannot append.** Its Google Drive connector creates files and changes metadata; it cannot append to or rewrite an existing file's content. It correctly declined to improvise a second file, because a satellite inventing its own files is how the June 2026 append corruption repeats.

The design was wrong, not the satellite's handling of it.

## The mechanism now: one new file per session

**The satellite creates a NEW file per working session:**

```
07_Website/_inbound/YYYY-MM-DD_<short-slug>.md
```

A create, not an append, so it is within what the connector can do, and single-writer is preserved absolutely: **each file has exactly one writer and is never written twice.** If a session needs to correct an earlier file, it writes a new one naming what it corrects. Nothing is ever edited in place.

This console reads `_inbound/`, verifies, routes anything needing a change request, and records the file below.

## What goes in each file

```
# <what you did>, YYYY-MM-DD

**Scope taken:** which option, and why
**Read:** the files you actually opened, honestly
**Produced:** EVERY file you wrote, by full path, with none left out
**Live state checked:** what you verified against beehiiv rather than against a file
**Proposals needing a change request:** numbered, each with the live value captured for rollback
**Questions:** only what you genuinely cannot resolve
**Not done, and why:** the honest list
```

## The Ops_Log line

`Ops_Log.md` "Job runs" is also an append, so the satellite cannot write it either. **Until it has an append-capable path, it supplies its intended log line as the last section of its inbound file and this console appends it on the satellite's behalf, saying so in the line.** That is a declared deviation from the self-record convention, not a silent one.

## Standing reminders, unchanged

- You cannot deploy this site. beehiiv serves it. You produce a change pack; Al applies it.
- Capture the old value before proposing any change to a live one. That is the rollback.
- Never write to any file in `Change_Requests_Inbox/`. Raise it in your inbound file and it gets routed.
- Declare every file you produced. A file that exists and is not listed is invisible work.

---

## Index of received deliveries

| Date | Inbound file | Produced | Harvested by this console |
|---|---|---|---|
| 2026-09-06 | supplied in chat, not filed, mechanism now fixed | `32_FRONT_END_AND_CONVERSION_PACK_2026-09-06.md`, `33_RECOMMENDATIONS_PRUNE_2026-09-06.md` | `34_SATELLITE_HARVEST_2026-09-06.md` |
