# LinkedIn personal banner (v3.1 §10a)

Built 2026-09-27 from design-tokens 3.3.3 and the canonical producers at repo head a7b8de8.

**Live file:** `linkedin_personal_banner_C22_1584x396.png`. Light mode. House lockup. Claim C22 from `claim-bank.json`, the positioning line shared with the business card. This is run 2 of C22.

**Reproduce:**

```
node build_linkedin_banner.js ../../Design_Standards/producers . C22
```

Alternates are one argument away: C02, C15 or C01. All four are banner-approved in the bank.

## Why the text sits in the right-hand column

The avatar was measured on the live profile. It is bigger than `safe_areas.linkedin_personal_banner.avatar_exclusion` says. All figures are in banner pixels:

| Source | Diameter | Left | Top | Right edge |
|---|---|---|---|---|
| Token | 264 | 96 | 264 | 360 |
| Desktop, measured | 305 | 55 | 211 | 360 |
| Mobile web, measured | 540 | 84 | 84 | 624 |

On mobile web the cover draws full width with no side crop, and the photo covers the left 40 per cent at almost every height.

The layout that follows from this:

- **Text column:** x665 to x1316. That is the mobile-web photo's right edge plus 40, running to the safe edge minus 40.
- **Footer:** the canonical `L.footer`, unchanged, translated onto the column.
- **Ring mark:** bleed decoration right of the safe area, sized so it never displays below the 40px crossover.

The native app was not measured. Check it on a phone after upload.

## Gates

The build throws unless every check holds on the rendered pixels. That is 42 checks per variant:

- Title, kicker and footer ink sit inside the column and the safe area.
- Every text corner clears all three avatar circles by 12px.
- The footer's left edge sits within 1px of the column.

It also checks that the claim is approved for banners, the mode is light and the lockup is house.

## Replaces

`06_Brand_Assets/linkedin-banner.png`, which is retired once the new banner is live. It had:

- a dark gradient and the retired mint;
- a headline that is not in the claim bank;
- a non-brand face;
- no house lockup.
