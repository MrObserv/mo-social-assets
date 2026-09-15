# v3.1.6 handover

Three files to copy, one document to read, one command to run.

## Copy

| From here | To |
|---|---|
| `design-tokens.json` | `06_Brand_Assets/Design_Standards/` |
| `producers/mo-tokens.js` | `06_Brand_Assets/Design_Standards/producers/` |
| `producers/mo_visual_kit.js` | `06_Brand_Assets/Design_Standards/producers/` |

`STANDARDS_AMENDMENTS.md` is not a file to copy — it holds paste-ready
replacement text for three `.md` standards I do not have.

## Verify

```powershell
cd 06_Brand_Assets\Design_Standards\producers
node mo_visual_kit.js preflight
node mo_visual_kit.js blogthumb --surface blog_og --eyebrow LEADERSHIP --title "The Panicking Room" --sub "What on-call does to a team" --out ..\samples\card_check6.png
```

The card should be 1200x630, have the teal glow back, and be **noticeably
larger than 72KB** — that is the banding fix. It will no longer be an indexed
PNG.

## What changed since 3.1.1

**Al's ruling: the wash stays on light.** 3.1.2 had suppressed it as
non-compliant (Content's D5). Al looked at the rendered result and reversed the
rule instead. Both opacities moved out of the producer into `structure.wash` —
a producer hardcoding `0.12` is the same defect class as one hardcoding a hex,
and the fact that it lived in `bgDefs()` is why its compliance was arguable.
The two `.md` standards still say "never on light"; amendments drafted.

**The font gate was failing because the fonts were fixed.** `assertFonts`
grepped `fc-list` for `Family:style=Style`. Correct RIBBI naming makes
fontconfig print parallel comma lists in which that substring never appears, so
the gate passed on Windows (no `fc-list`) and hard-broke Linux and CI. It now
asks fontconfig with a pattern instead of grepping it. `fonts.acceptance` was
wrong for the same reason.

**Every card this kit ever produced was banded.** Measured: indexed PNGs with
25–28 colours, and only 5–7 distinct values down through the wash. Cause was
`png({ quality: 90 })` — in sharp, quality on a PNG implies `palette: true`.
Now lossless truecolour. This is a second, independent reason the six evergreen
winners need re-rendering.

**`blog_og` and `og_card` were two names for one thing.** Invisible while
`blogthumb` hardcoded `og_card` for its canvas and `blog_og` for its lockup
separately. The moment the producer resolved both from the real surface,
`T.size('blog_og')` threw. Now declared once in `surface_aliases` rather than
fixed by duplicating canvas entries — two entries for one canvas is how the two
names arose.

**`byte_size` did not exist as a surface key.** It is now in `house_lane`, in
`surface_aliases`, and deliberately absent from `dual_mode` so `--mode dark`
throws on it. Same for `monthly_digest`, with the Beehiiv `monthly-digest`
hyphen mismatch cross-referenced so it is found by reading rather than by an
outage.

**`--surface` and `--eyebrow` are now required with no defaults.** `blogthumb`
called `lockupFor("blog_og")` literally, so every card returned the house
wordmark for the wrong reason and never reached the throw that stops a surface
defaulting into a wordmark. `--eyebrow` defaulted to THE OBSERVABILITY DIGEST,
right for one surface and wrong for four.

## Tested, not read

36 assertions, executed against the real token file with `fs`, `path`,
`sharp`, `child_process` and `process.argv` stubbed:

- All four writing-surface names resolve to a 1200x630 canvas.
- `blog_og` accepts `--mode dark`; `byte_size` and `monthly_digest` throw on it.
- An undeclared canvas throws and names both the surface and its alias.
- All six evergreen winners render with Content's exact values: correct canvas,
  house wordmark, their own eyebrow, exactly one wash ellipse at 0.12, no
  retired hex in the composed SVG, and truecolour PNG options.
- Missing `--surface` and missing `--eyebrow` each fail the render.
- `ytthumb` still renders dark and still carries METRICS & MAYHEM.
- Every gate was fed something bad and confirmed to throw, including
  `assertRenderClean` catching a retired hex hidden inside a base64 data URI.

**Two of those assertions caught real regressions in my own work** — the
`blog_og` canvas mismatch, and `byte_size` inheriting a dark variant through its
canvas alias. Both were fixed before this handover, which is the whole point of
running the code rather than reading it.

## Answering Content's question

**Yes, `byte_size` needed adding, and it needed more than the lockup lane.** It
was in no lane, no canvas and no alias. All three are now declared. The sweep
can run.
