# LinkedIn Company Page banner (v3.1 §10a)

Built 2026-10-07 from design-tokens 3.3.5 and the canonical producers, builder v1.1.0.

**Live file:** `linkedin_company_banner_1128x191.png`. It is light mode and carries the house lockup.

- **Kicker:** OBSERVABILITY ADVISORY · NEWSLETTER · PODCAST, set on two lines. This is the offer line chosen on 2026-10-07.
- **Wordmark:** MASTERING OBSERVABILITY, set in the lockup treatment.
- **Rings:** they bleed in from the right edge.

**Reproduce:**

```
node build_linkedin_company_banner.js ../../Design_Standards/producers .
python3 review_sheet.py ../../Design_Standards/marks
```

The build needs `sharp`. `node_modules` is not in the repo, so run `npm install` in `producers/` first, on the machine that runs the build.

## What the token note asks for, and how it is met

`safe_areas.linkedin_company_banner` says: "Drop the title entirely. Kicker, wordmark and rings only."

- **No display title and no URL.**
  - The Company Page name prints directly under the banner.
  - The Company Page has its own website button.
- **Kicker:** Space Mono 700, teal-deep, two lines. It is fitted to the column by measuring the rendered ink.
- **Wordmark:** set in the treatment from `Logo_and_Marks_Standard.md` §1, which is Space Mono 700, uppercase and tracked.
  - It is coloured soft, the same as the house lockup on The Signal card.
  - The banner carries no second ring mark, because the Company Page logo is already the ring mark.
- **Rings:** the texture from `Logo_and_Marks_Standard.md` §3, concentric rings bleeding off an edge.
  - The canvas's one radial wash is centred on the rings, away from the text, because nothing is read through the wash.
  - The outer ring stays inside the cover's height. The cover shows no edge on LinkedIn's white card, so rings sliced by the bottom edge would read as a fault.

## Why the text sits where it does

The token safe area is the full 1128x191, centred. That does not hold on the live Company Page. These measurements were taken on 2026-10-07 and are in banner pixels:

| Layout | Cover drawn | What shows | Logo |
|---|---|---|---|
| Desktop, 1440 viewport | 804x134 (x0.713) | the whole width | x33.7 to 213.3, from y99.7 down |
| Medium, 647 viewport | 576x134, background-size cover | x153.5 to 974.5 only | x187.7 to 370.1, from y99.8 down |
| Mobile web, 375 viewport | 374x64 (x0.332) | the whole width | x48.2 to 337.6, from y99.5 down |

The layout that follows from this:

- **Text column:** x411 to x934. That runs from the right edge of the widest logo plus 40, to the medium crop's right edge minus 40.
- **Kicker:** 25px authored, which displays at 17.8 CSS px on desktop. The label floor is 10.5px.
- **Wordmark:** 16px, which displays at 11.4 CSS px on desktop.

The native apps were not measured. Check the banner on a phone after upload.

## Gates

The build throws unless all 32 checks hold on the rendered pixels.

**On each text line:**

- it sits inside the column and inside the medium crop with 40px to spare;
- it is 12px clear of the top and bottom edges;
- it is 12px clear of all three logo positions.

**On the rings:**

- they sit right of the medium crop, both as rendered and in geometry;
- the centre dot is off the canvas;
- the outer ring stays inside the cover's height.

**On the file:**

- both text sizes meet the label floor as displayed on desktop;
- the PNG is truecolour.

Two negative runs were made, and each failed as intended:

- rings moved into the canvas;
- the text block pushed off the bottom.

## Review

`review_on_company_page.png` simulates all three layouts from the measured geometry. The Company Page logo is stood in by the repo ring mark on white.

## Replaces

This replaces the Company Page cover that has been live since 2024, which was never filed in this repo. It had:

- a pattern ground;
- a slogan that is not in the claim bank;
- the URL partly hidden by the logo;
- no house lockup treatment.
