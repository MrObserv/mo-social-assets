# LinkedIn Company Page banner (v3.1 §10a)

Built 2026-10-07 from design-tokens 3.3.5 and the canonical producers, builder v1.2.0.

**Live file:** `linkedin_company_banner_1128x191.png`. This is option B, chosen on 2026-10-07. It is light mode, on the `tint` ground, and carries the house lane. It has three elements:

- **Eyebrow:** MASTERING OBSERVABILITY, in the lockup treatment.
- **Headline:** the offer line, "Observability advisory, newsletter and podcast.", set in the display face over two lines, with display tracking -1.5px.
- **Rings:** they bleed in from the right edge.

**Reproduce:**

```
node build_linkedin_company_banner.js ../../Design_Standards/producers .
node build_linkedin_company_banner.js ../../Design_Standards/producers _iterations A
node build_linkedin_company_banner.js ../../Design_Standards/producers _iterations C
python3 review_sheet.py ../../Design_Standards/marks
python3 _iterations/compare_sheet.py ../../Design_Standards/marks A B C
```

The build needs `sharp`. `node_modules` is not in the repo, so run `npm install` in `producers/` first, on the machine that runs the build.

## History: why v1.1.0 was replaced the same day

v1.1.0 went live on a white ground. In the phone app it read badly, for three reasons:

- **No band.** LinkedIn's card is white, so a white cover shows no band at all. The text floated over the logo, and the rings looked sliced.
- **Type too small.** The type landed at about 9dp and 6dp on a 412dp phone.
- **Not judged on the phone.** The design system's light-mode rule was met, but the simulation never showed the phone app, so the failure was not seen until the cover was live.

v1.2.0 made three options. They are kept in `_iterations/`, and `_iterations/compare_options_ABC.png` shows each as the phone app and desktop draw it:

- **A:** `tint` ground, kicker-led in Space Mono. It stays on the system apart from the `tint` ground.
- **B:** `tint` ground, with the offer line as a display headline. **Chosen.**
- **C:** navy ground, kicker-led. It breaks "LinkedIn is light".

## Deviation, recorded

`safe_areas.linkedin_company_banner` says: "Drop the title entirely. Kicker, wordmark and rings only."

Two deviations, both chosen on 2026-10-07.

1. **A headline.** B sets the offer line as a display headline.
   - The note gives no reason for dropping the title.
   - On the phone, the kicker-only layout failed: the type landed at about 9dp and 6dp.
   - The headline lands at about 15.7dp on a phone and 30.6 CSS px on desktop.
2. **The `tint` ground.** The ground is `tint` (#EAF6F3), which §3 assigns to tinted panels.
   - The canvas token is `ground` (#F6F8F7).
   - §3 records that a flat tint field was built and rejected for light cards on 14 Sep.
   - `ground` is too close to LinkedIn's white card to make a band, which was the v1.1 failure, so B uses `tint`.

Recorded here so that they read as decisions and not as drift. Design should either amend the note and §3 for this surface or rule against them.

## Everything else that is on the system

- **Mode:** light. The ground is the light palette's `tint`, so the cover reads as a band against LinkedIn's white card.
- **Wordmark:** MASTERING OBSERVABILITY, set as the eyebrow in the treatment from `Logo_and_Marks_Standard.md` §1: Space Mono 700, uppercase, with 3px tracking at 12px. It is in teal-deep.
- **No second ring mark:** the Company Page logo is already the ring mark.
- **Rings:** the texture from `Logo_and_Marks_Standard.md` §3, concentric rings bleeding off an edge.
  - The canvas's one radial wash comes from the producer's own `background()`, given a palette object whose ground is `tint`. It is centred on the rings, away from the text.
  - The outer ring stays inside the cover's height.
- **No URL:** the Company Page has its own website button.

## Why the text sits where it does

The token safe area is the full 1128x191, centred, and it does not hold on the live Company Page. These are measured positions in banner pixels. The web layouts were measured in the browser on 2026-10-07, and the phone app from a screenshot of the live page the same day.

| Layout | Cover drawn | What shows | Logo |
|---|---|---|---|
| Desktop, 1440 viewport | 804x134 (x0.713) | the whole width | x33.7 to 213.3, from y99.7 down |
| Medium, 647 viewport | 576x134, background-size cover | x153.5 to 974.5 only | x187.7 to 370.1, from y99.8 down |
| Mobile web, 375 viewport | 374x64 (x0.332) | the whole width | x48.2 to 337.6, from y99.5 down |
| Phone app, 412dp | the whole width (x0.365) | the whole width | visible rings x71 to 308, from y122 down |

The phone-app logo's white square did not show against the white v1.1 cover, so it is probably a little larger than the rings. On `tint` it will show, so check it after upload.

From these, the text column runs from x411 to x934. That runs from the rightmost logo edge (medium, x370.1) plus 40, to the medium crop's right edge minus 40.

## Gates

The build throws unless all 34 checks hold on the rendered pixels.

- **Each text line:**
  - sits inside the column;
  - is 12px clear of the top and bottom edges;
  - is 12px clear of all four logo positions.
- **The rings:**
  - sit right of the medium crop, both as rendered and in geometry;
  - keep the centre dot off the canvas;
  - keep the outer ring inside the cover's height.
- **The file:**
  - both text sizes meet the 10.5px label floor as displayed on desktop;
  - the headline holds a phone-app floor of 14dp, the view v1.1 failed;
  - a ground pixel matches the ground token, so a ground that silently falls back to white fails;
  - the PNG is truecolour.

The eyebrow lands at about 6.6dp in the phone app. That is accepted, because the Company Page name repeats it in large type directly below.

Negative runs failed as intended:

- rings moved into the canvas;
- the text block pushed off the bottom;
- the ground left at the palette's white;
- the phone floor raised above the headline's size.

## Review

`review_on_company_page.png` simulates all four layouts. The Company Page logo is stood in by the repo ring mark on white.

## Replaces

**v1.1.0** (white ground, kicker-led), live for part of 2026-10-07. It replaced the cover that had been live since 2024, which was never filed in this repo. That cover had:

- a pattern ground;
- a slogan that is not in the claim bank;
- the URL partly hidden by the logo.
