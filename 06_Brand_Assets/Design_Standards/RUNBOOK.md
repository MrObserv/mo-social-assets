# What is left — one pass

Already done and committed: font normalisation (both trees + the Windows
store), `design-tokens.json` v3.1.1, `normalise_font_names.py`. Nothing below
repeats any of that.

## 1. Producers

Copy `producers\mo-tokens.js` and `producers\mo_visual_kit.js` into
`06_Brand_Assets\Design_Standards\producers\`, then in a NEW shell (so no
`MO_TOKENS` is set):

```
cd 06_Brand_Assets\Design_Standards\producers
node mo_visual_kit.js preflight
node mo_visual_kit.js blogthumb --title "The Panicking Room" --sub "What on-call does to a team" --out ..\samples\card_check3.png
```

It should run without the env var, and the card should be **1200x630**.

`preflight` may report Montserrat ExtraBold as AMBIGUOUS. That is not a
failure and it does not throw. The probe compares a render against a
nonexistent family; when the requested weight is the heaviest face installed,
the renderer fallback IS that face, so the two renders match for a reason that
has nothing to do with the font being missing. The probe now says so rather
than guessing.

## 2. Retire the two superseded kits

```
cd C:\Users\alman\OneDrive\Documents\GitHub\mo-social-assets
git rm 06_Brand_Assets/Design_Standards/templates/mo_visual_kit.js
git rm 06_Brand_Assets/Design_Standards/producers/mo_visual_kit.v3.js
```

They had DIVERGED, not aged. `templates/` had a font-file check but embedded
the retired eye mark on every card and never called `assertRenderClean`.
`producers/` resolved the ring mark and ran the gates but had no font check.
The new single file is the merge. Grep for callers of the `templates/` path
before committing.

## 3. Untrack what should never have been committed

Copy the staged `.gitignore` to the repo root first, then:

```
git rm -r --cached 06_Brand_Assets/Design_Standards/producers/node_modules
git rm -r --cached 06_Brand_Assets/Design_Standards/templates/node_modules
git rm 06_Brand_Assets/Design_Standards/templates/blog_thumbnail.png
git rm 06_Brand_Assets/Design_Standards/templates/fonttest.png
git rm 06_Brand_Assets/Design_Standards/templates/fonttest2.png
```

The three PNGs are byte-identical — the same test render saved three times.

## 4. The remaining staged files

| From here | To |
|---|---|
| `.gitignore` | repo root (replaces) |
| `SYNC.md` | `06_Brand_Assets/SYNC.md` (new) |
| `00_Design_Standards_Index.md` | `Design_Standards/` (replaces the 22KB original) |
| `Brand_Design_System_v2.md` | `Design_Standards/` (replaces) |

No stamp for `Long_Form_PDF_Standard_v2.md` — it is the CURRENT long-form
standard. The `v2` is its own version, not a predecessor of a v3. Stamping it
would retire something live.

## 5. Commit

```
git add -A
git commit -m "brand: single-home producer, untrack node_modules, supersede stamps

- mo_visual_kit.js is now the one kit, merged from the two that had diverged.
  Ring mark resolved by name; the retired eye-mark files are unreachable.
  density 72 so og_card rasterises at its declared 1200x630.
- mo-tokens.js walks up to find design-tokens.json; MO_TOKENS no longer needed
  in-tree. Font probe reports AMBIGUOUS instead of a false negative when the
  target face is also the renderer fallback.
- Untracked node_modules (committed in two places) and three identical scratch
  PNGs. Superseded stamps on the old index and Brand_Design_System_v2."
```

---

## Two Design calls still open — deliberately not in this runbook

- The ring mark is drawn at 44px on a 1200 og_card, landing near 20px at
  LinkedIn render width, under the 24px floor in the marks standard. Needs a
  number chosen.
- `logo-on-light.svg` / `logo-on-dark.svg` are the retired eye mark. Nothing
  reads them now. Archive rather than delete.
