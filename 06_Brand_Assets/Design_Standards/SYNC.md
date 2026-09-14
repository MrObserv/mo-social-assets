# Which tree is canonical

**Decision (Al, 2026-09-14): `MrObserv/mo-social-assets` is canonical.**
The working copy is:

    C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets\06_Brand_Assets

## What that means in practice

The repo is the source of truth for every file under `06_Brand_Assets`:
standards, `design-tokens.json`, marks, producers, templates.

That clone is where you edit, because that is where node and the fonts are. It
is not authoritative. A file that exists only there does not exist.

One caution about the location: it sits inside OneDrive. OneDrive syncs a git
working tree file by file, including `.git/`, and can capture a half-written
index mid-operation. It usually survives; when it does not, the repair is a
fresh clone. Moving the clone outside OneDrive removes the risk entirely —
your call, and nothing above depends on it.

## The rule

After any edit you intend to keep, push it. Before starting work,
pull. There is no sync script and no read-only marker — that was a deliberate
choice, so the discipline is yours.

## The failure mode this leaves open

Stated plainly so it is not a surprise later: the working copy will drift. Not through
carelessness but through ordinary work — a token nudged for one render, a mark
regenerated to check a crossover, an experiment left in place. None of it
reaches the repo, and because the repo is canonical, none of it is real. The
next clone is authoritative and silently lacks it.

When that bites, the cheap check is one command in the repo clone:

```
git status --porcelain
```

If that is not empty, your clone and the repo disagree, and the repo wins.

## What this decision does NOT cover

`07_Website/` is a separate tree with its own deploy path. The ring mark at
`07_Website/Pages/home/mo_ring_mark.svg` is a *copy*; the canonical file is
`06_Brand_Assets/Design_Standards/marks/mo_ring_mark_on_dark.svg`. Edit the
canonical one and re-copy. Never the reverse.
