# Post feed block: settings to match the design

Set these on the native beehiiv post block in the home page editor. The block stays dynamic:
it fills itself from your posts. You are only changing how it is painted.

Your current block is set to IBM Plex Sans and `#2F8F8B`, which is why it clashes with blocks 1, 2 and 3.

---

## First, a tidiness recommendation

Your published home page carried **four** feed blocks: "Learning: Byte-Size Series",
"Most Recent Signals", "Latest Articles", and "The Pod" podcast RSS.

Four feeds on one page is most of why it reads as cluttered. The design has **one**.

Suggested: keep **one post feed** titled something like "The thinking, in public", set to 2 columns
and 6 posts, filtered to your substantive writing. Byte-size, Signals and the podcast already have
routes from block 2's "Three ways in" cards, so nothing becomes unreachable.

If you want two, make the second the podcast RSS and put it directly above block 2.

---

## Typography

| Setting | Value |
|---|---|
| Title font | **Montserrat** |
| Title weight | **700** |
| Title size | text-lg (or 20px) |
| Title colour | `#0D2127` |
| Title transform | normal-case |
| Subtitle font | **DM Sans** |
| Subtitle size | text-sm (or 15px) |
| Subtitle colour | `#3B5257` |
| Author font | **DM Sans** |
| Author size | text-xs |
| Author colour | `#63797D` |
| Timestamp colour | `#63797D` |

## Tags

| Setting | Value |
|---|---|
| Tags enabled | on |
| Tag font | **Space Mono** |
| Tag text colour | `#17695C` |
| Tag background | transparent |
| Tag border radius | 2px |

## Card and layout

| Setting | Value |
|---|---|
| Columns | **2** |
| Card background | `#F6F8F7` |
| Card padding | 0 |
| Gap | 24px |
| Divider colour | `#C9DCDC` |
| Divider style | solid |
| Divider thickness | 1px |
| Image enabled | on |
| Image border radius | **4px** |
| Image width | 100% |
| Card structure | Image Top |
| Read time | off |

## Load more button

| Setting | Value |
|---|---|
| Background | `#2F9E8D` |
| Text colour | `#0D2127` |
| Border width | **0** |
| Border radius | **4px** |
| Text | Load more |

These are the same button tokens as blocks 1, 2 and 3, taken from `Brand_Design_System_v2.md`.

## Search input, if you keep it enabled

| Setting | Value |
|---|---|
| Background | `#FFFFFF` |
| Border colour | `#C9DCDC` |
| Border radius | 4px |
| Text colour | `#16282D` |
| Placeholder colour | `#63797D` |

## Empty state

| Setting | Value |
|---|---|
| Background | `#F6F8F7` |
| Text colour | `#3B5257` |
| Text | No posts found |

---

## The heading above the feed

The native block has no heading of its own, so add a Text block directly above it, or leave the
heading to the custom blocks. If you add one, match block 2's section headings:

- Font **Montserrat**, weight **800**
- Colour `#0D2127`
- Size around 28px to 36px

An eyebrow above it, if you want the full treatment: **Space Mono**, 12px, letter-spacing 4px,
uppercase, colour `#17695C`.

---

## Final page order

```
Block 1    hero, proof strip, Allan Mann credibility
Block 3    why this exists, free chapter
Feed       native post block, styled per this sheet   <- dynamic
Block 2    three ways in, advisory, closing CTA
```

## One remaining mismatch, and it is unavoidable

The native block builds its own card markup, so it will never be pixel-identical to the static
cards in the prototype. What these settings buy you is the same fonts, the same colours, the same
button, the same borders and the same rhythm. It will read as one page.

The alternative, hardcoded HTML cards, matches the prototype exactly and then goes stale the moment
you publish. For a page that fronts a weekly publication, dynamic and consistent beats static and
identical.
