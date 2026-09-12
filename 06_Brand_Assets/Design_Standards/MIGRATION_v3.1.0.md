# v3.1.0 Migration — what has to happen for this to be real

**Written 2026-09-11.** Response to the five-gap review. The review's closing line is the correct diagnosis: *stating a single-source rule does not create one.* This file is the list of copies to delete.

Nothing here is optional. Until item 1 is done, v3 is a document.

---

## 1. Make one producer consume the token file

**Do `templates/mo_diagram.js` first.** It has 10 retired-token hits and already has a theme switch, so it is the smallest honest proof that the read path works.

Drop `producers/mo-tokens.js` beside it, then:

```js
const T = require('./mo-tokens.js');

// Delete the DARK and LIGHT palette objects entirely. Replace with:
const PAL = { dark: T.dark, light: T.light };

// At the top of the build, before anything renders:
T.assertNoRetired(require('fs').readFileSync(__filename, 'utf8'), 'mo_diagram.js');
```

That last line is the point. The build fails if a retired hex is still in the file, so the sweep cannot be half-done and forgotten. Add the same two lines to every producer as it is repointed.

**Python producers:** `from mo_tokens import T`, then `T.light["teal-deep"]`, `T.size("episode_square")`, `T.lockup_for("tech_tuesday")`, `T.duration("cold-open")`. Same assert: `T.assert_no_retired(open(__file__).read(), "thumbnail_builder.py")`.

| Producer | Hits | Order |
|---|---|---|
| `templates/mo_diagram.js` | 10 | **1st** |
| `templates/long_form_pdf/reference_strategy_template.html` | 13 | 2nd — blocks the first ebook |
| `Slide_System/mo_slide_template.js` | 8 | 3rd |
| `templates/mo_visual_kit.js` | 2 | 4th |
| `tools/thumbnail_builder.py` | 2 | 5th |
| `templates/mo_quote_card.js` | 1 | 6th |
| `templates/render_arch_kit.py` | 1 | 7th |

## 1b. BEFORE YOU REPOINT A PRODUCER: SIX OF THEM CANNOT RUN AT ALL

**Found by Control on 2026-09-11, auditing write paths before the mirror was switched on.** Six producers carry hardcoded paths to **sandbox sessions that no longer exist**. They are not broken by v3 and they were not broken by the mirror. They have been dead for some time and nobody noticed, because nothing runs them on a schedule.

| Producer | Baked-in dead path |
|---|---|
| `Design_Standards/render_podcast_intro.py` | `/sessions/pensive-friendly-edison/...` |
| `Design_Standards/render_podcast_outro.py` | `/sessions/pensive-friendly-edison/...` |
| `Design_Standards/render_signal_check.py` | `/sessions/pensive-friendly-edison/...` |
| `Design_Standards/synth_signal_check_audio.py` | `/sessions/pensive-friendly-edison/...` |
| `Slide_System/mo_slide_template.js` | `/sessions/dazzling-sharp-thompson/mnt/Projects/...` |
| `Meeting_Backgrounds/build_meeting_bg.py` | `/sessions/dazzling-sharp-thompson/...` |
| `Studio_Backgrounds/build_studio_backgrounds.py` | writes to `/sessions/dazzling-sharp-thompson/mnt/outputs/bg_v2` |

**`mo_slide_template.js` is 3rd on the §1 repointing list.** Whoever picks it up will hit the dead path before they reach the palette, so fix the path in the same pass or the token work stalls on something unrelated.

**A sandbox session path is the most perishable thing you can hardcode.** It is valid for one session and silently wrong forever after, and unlike a stale colour it produces no output at all rather than wrong output. **Resolve paths from `MM_PROJECT_ROOT` or a repo-relative root**, the way `tools/thumbnail_builder.py` and `tools/tt_thumbnail_builder.py` already do. Those two are the pattern to copy.

**This is the same class as everything else in this file.** A hardcoded path, a hardcoded palette and a hardcoded inbox list are one failure wearing three hats: **a value copied into a file that has no way of knowing when the value moved.**

## 2. Resolve the two trees — Al's decision, and the biggest one here

`mo-social-assets` mirrors `06_Brand_Assets` in full and has none of v3. **It is the tree Buffer pulls from, so every published asset currently renders from the retired palette.** Updating one copy of a mirrored system is the exact failure v3 was written to stop, and I did it.

**Recommendation:** `06_Brand_Assets` is canonical. `mo-social-assets` becomes a publish target written by a sync step and never hand-edited. Until that sync exists, every v3 file has to be copied to both, which is the hand-synced twin problem at repo scale.

This needs a CR and a decision before any producer work, because otherwise item 1 gets done twice or, worse, once.

> ## ⚖️ AL RULED 2026-09-11, AND HE RULED AGAINST THE RECOMMENDATION ABOVE.
>
> **`mo-social-assets` IS CANONICAL. `G:\...\06_Brand_Assets` becomes the read-only mirror.**
>
> **His reasoning, and it is the stronger argument:** git gives history, diffs, blame and rollback. `G:` gives none of those, and **the folder full of `.bak` files is the proof** — this estate has been hand-rolling version control on a drive that has no version control. The index's own tidy-up line, *"all `*.bak` files, versioning is the changelog's job"*, is the same observation from the other side. The repo is also the tree that actually serves published assets, so canonical and live are now the same tree instead of two.
>
> ### ⛔ THE SEEDING ORDER IS CRITICAL AND GETTING IT BACKWARDS IS UNRECOVERABLE
>
> **The repo does NOT contain v3.** No `design-tokens.json`, no `Brand_Design_System_v3.md`, no contrast audit, no `Long_Form_PDF_Standard_v2.md`, no `MIGRATION_v3.1.0.md`, no `producers/`, and none of the supersession banners written on 2026-09-11.
>
> **So a repo-to-G: mirror run TODAY would delete the entire v3 release and overwrite it with the retired palette.** The naming makes this easy to get wrong: "the repo is canonical" reads as "push the repo outward", and today that is precisely the destructive direction.
>
> 1. **ONE TIME, `G:` → repo.** Carry everything changed on 2026-09-11 into the repo. No deletions, no `/MIR`, no `/PURGE`: the repo holds files `G:` does not.
> 2. **Commit and push**, and verify the push landed by comparing refs. `sync_now.bat` already does this, and it exists because `git push` returns 0 when it pushes nothing.
> 3. **ONLY THEN reverse the flow**, repo → `G:`.
>
> **Until step 2 completes, `G:` is still effectively the source of truth and brand edits belong there.** After it, they belong in the repo and `G:` edits will be overwritten without warning.
>
> ### What this changes for the rest of the plan
>
> - **§1 producer work now happens IN THE REPO.** `tools/thumbnail_builder.py` already lives there and only there, so it was always going to be a repo edit.
> - **`producers/mo-tokens.js` and `mo_tokens.py` must reach the repo in the seed**, or item 1 has nothing to require.
> - **Anything that WRITES generated assets into the brand tree needs its output path checked.** Writing into a mirror means the output vanishes on the next sync. That has not been audited and is owed.
> - **`G:` brand paths in task prompts keep working**, because the mirror keeps them populated. That is the whole reason to keep mirroring rather than simply moving.

## 3. Strip palettes from the twelve per-asset standards

v3 line 7 says they stop carrying palettes. Twelve still do, `Diagram_Standard.md` heaviest at 10 hexes. Replace each palette block with:

> **Tokens.** This standard holds no colour values. See `Brand_Design_System_v3.md` and `design-tokens.json`. Producers read the token file; if a value you need is not in it, that is a CR, not a local definition.

Keep every production rule, QA gate and output path. Only the hexes go.

## 4. Long_Form_PDF_Standard_v2.md

Written. It exists now. v3's "supersedes in full" has been corrected to "supersedes on palette and display face", which is what was meant and what line 7 requires.

## 5. #5f6d75

Measured 5.01:1 on ground against soft's 5.04:1 — indistinguishable, same job, same grounds. **Folded into soft and added to the retired block.** It passed AA, so **the twelve shipped light diagrams are not re-rendered and the 2026-09-01 acceptance holds.** Remove it from `Diagram_Standard.md` and `mo_diagram.js` as part of item 1.

Same treatment for **#16333B**, an undocumented ghost-numeral navy, folded into dark-motif.

## 6. The two small ones

- `Slide_Design_System.md` is indexed at `../Slide_System/` now, not as a bare filename.
- `07_Website/Web_Design_Best_Practices.md` is named as superseded on tokens and has not been stamped. Add the supersession line and strip lines 65 to 70.

---

## The rule this review produced

**A single-source rule is not created by stating it. It is created by deleting the copies and making the build fail when one comes back.**

That is why `assertNoRetired` exists and why it belongs in every producer's build, not in a checklist. A QA point a human has to remember is the same class of thing as a hand-synced Canva kit.
