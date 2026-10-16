#!/usr/bin/env node
// mo_share_card.js v1.0.0 (2026-10-16): the 9:16 share card (OG_Card_Standard.md v3).
// One JSON in; one 1080x1920 PNG and a manifest with alt text out. Light, house
// lane, from design-tokens.json. Declares no colour.
//
// Surface og_card_tiktok. It is the TikTok cut of the v3 share card, the
// 1200x630 card that is hand-instanced from 07_Website/Pages/brand/og_cards/
// og_book.html. It EXTENDS that card rather than forking it: same type roles
// (mono kicker with its rule, a two-tone display headline whose second part is
// teal-deep, a muted sub line), same cover treatment (radius and drop shadow
// scaled from og_book's 310px cover), same house wordmark. og_book.html itself
// is not touched, so the 1200x630 cards cannot move.
//
// Where it departs from og_book, deliberately (Design, 2026-10-16):
//   chrome is the TikTok carousel's (Al, 15 Oct): no domain line, ring mark and
//     wordmark at the top of the safe box. The domain sat at the bottom edge,
//     which is TikTok's caption zone, and the caption already says "Link in bio".
//   ground is the feed ground mo_social draws (panel plus one wash), not
//     og_book's tint surround and inset panel. Two reasons: the contrast gate
//     measures against the ground it knows, and an inset panel would spend
//     width the 810px safe column does not have. It also matches the TikTok
//     carousels these cards post beside.
//   one LINK IN BIO line, in the carousel CTA's link-line treatment.
//
// Layout is computed, never placed by eye. The words are laid as one block
// sitting on the safe floor; the cover takes the space between the brand row
// and the words, capped, and centred in it. So a longer sub shrinks the cover,
// not the type, and a sub too long to leave a usable cover THROWS.
//
//   node mo_share_card.js build <spec.json> --out <dir> [--proof]
//   node mo_share_card.js check <spec.json>     gates only, writes nothing
//
// Spec (plain UK English, no em dashes; cover is relative to the spec file):
// { "slug": "og_ebook_outcome-question",
//   "kicker": "Free ebook · Metrics & Mayhem",      rendered upper case, as og_book does
//   "head": "Can your team", "head_em": "explain why?",   head_em optional
//   "sub": "One question, a twenty-minute test, and what to do on Monday.",
//   "cover": "cover_outcome-question.png",
//   "alt": "... Link in bio." }                      required; must end with "Link in bio."
"use strict";
const fs = require("fs");
const path = require("path");
const S = require(path.join(__dirname, "mo_social.js"));
const { T, C } = S;
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_share_card.js");
const VERSION = "1.0.0";

const SURFACE = "og_card_tiktok";
if (T.modeFor(SURFACE) !== "light") throw new Error("mo_share_card: og_card_tiktok no longer resolves light; re-read design-tokens.json mode");
const LOCKUP = T.lockupFor(SURFACE);
if (LOCKUP !== "MASTERING OBSERVABILITY") throw new Error("mo_share_card: og_card_tiktok must be house lane, got " + LOCKUP);
const [W, H] = T.size(SURFACE);
const BOX = ((T.raw.safe_areas || {}).tiktok_photo || {}).box;
if (!Array.isArray(BOX) || BOX.length !== 4) throw new Error("mo_share_card: design-tokens.json has no safe_areas.tiktok_photo.box");
const FLOORS = T.raw.canvas.floors[SURFACE];
if (!FLOORS || !(FLOORS.judged_at_px > 0)) throw new Error("mo_share_card: canvas.floors." + SURFACE + " needs judged_at_px");
const SCALE = FLOORS.judged_at_px / W;          // 375 / 1080 = 0.347

const [X0, Y0, X1, Y1] = BOX, FW = X1 - X0;
const RING = 88;                                 // the carousel's 9:16 brand row
const LINK = "LINK IN BIO";
const COVER_MAX = 860;                           // px tall
// The hero must read at least as large on a phone as the cover already does on
// the 1200x630 card: 310px tall on a card LinkedIn shows ~552px wide, so ~143px
// seen. Expressed as displayed px and converted, so it follows the floors.
const COVER_MIN_SHOWN = 143;
const HEAD_SIZES = [104, 100, 96, 92, 88, 84, 80, 76, 72];

function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.length < 24 || b.toString("latin1", 1, 4) !== "PNG") throw new Error("mo_share_card: cover is not a PNG: " + file);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function validate(spec, dir) {
  if (!spec || typeof spec !== "object") throw new Error("mo_share_card: spec must be a JSON object");
  S.assertSlug(spec.slug);
  ["kicker", "head", "sub", "alt", "cover"].forEach((k) => (spec[k] = S.assertCopy(spec[k], k)));
  if (spec.head_em != null) spec.head_em = S.assertCopy(spec.head_em, "head_em");
  if (!/Link in bio\.$/.test(spec.alt)) throw new Error("mo_share_card: alt must end with \"Link in bio.\" so it matches the card's link line");
  const file = path.resolve(dir, spec.cover);
  if (!fs.existsSync(file)) throw new Error("mo_share_card: cover not found: " + file);
  return file;
}

/* The word block, from kicker baseline `ky`. Draws onto s; returns its extent. */
function words(s, spec, z, ky) {
  S.kicker(s, X0, ky, spec.kicker.toUpperCase(), C.deep, FW);
  const lh = Math.round(z * 1.08);
  let y = ky + 56 + Math.round(z * 0.78);
  const a = s.block(X0, y, spec.head, { role: "display", size: z, fill: C.ink, maxW: FW, lh, ls: -1, maxLines: 3, what: "headline" });
  let last = a.last;
  if (spec.head_em) {
    const b = s.block(X0, a.last + lh, spec.head_em, { role: "display", size: z, fill: C.deep, maxW: FW, lh, ls: -1, maxLines: 3, what: "headline (teal-deep)" });
    last = b.last;
  }
  const sub = s.block(X0, last + Math.round(z * 0.3) + 72, spec.sub, { role: "text", size: 44, fill: C.muted, maxW: FW, lh: 60, maxLines: 4, what: "sub line" });
  const linkY = sub.last + 88;
  s.text(X0, linkY, LINK, { role: "label", size: 28, fill: C.deep, ls: 4, maxW: FW, what: "link line" });
  return { top: ky - 28 * 0.78, linkY, bottom: linkY + 28 * 0.24 };
}
/* Largest size at which each headline part sits on ONE line, as og_book sets
 * it (the em part is display:block, so the card reads as two lines). Only if
 * no size achieves that does it fall back to the largest size within 4 lines,
 * so a long headline wraps rather than breaking "Can your / team" at 104px. */
function headSize(spec) {
  const parts = [spec.head].concat(spec.head_em ? [spec.head_em] : []);
  const lines = (z) => { const s = S.sheet(SURFACE, W, H, { margin: X0 }); return parts.map((p) => s.measure(p, "display", z, FW, -1).length); };
  for (const z of HEAD_SIZES) if (lines(z).every((n) => n === 1)) return z;
  for (const z of HEAD_SIZES) { const l = lines(z); if (l.every((n) => n <= 3) && l.reduce((a, b) => a + b, 0) <= 4) return z; }
  throw new Error("mo_share_card: the headline does not fit 4 lines even at " + HEAD_SIZES[HEAD_SIZES.length - 1] + "px. Tell Content; the template does not reword.");
}

/* Pure: spec in, composed and GATED card out. Reads the cover; no sharp. */
function compose(spec, { dir = "." } = {}) {
  const coverFile = validate(spec, dir);
  const z = headSize(spec);
  // 1. Probe the word block, then sit its link line on the safe floor, 20px up,
  //    as the carousel's swipe cue sits.
  const probe = words(S.sheet(SURFACE, W, H, { margin: X0 }), spec, z, 0);
  const ky = Math.round(Y1 - 20 - probe.linkY);
  // 2. The cover takes what is left between the brand row and the words.
  const regionTop = Y0 + RING + 56, regionBottom = Math.round(ky - 28 * 0.78 - 72);
  const [cw, ch] = pngSize(coverFile);
  let coverH = Math.min(COVER_MAX, regionBottom - regionTop);
  if (Math.round(coverH * cw / ch) > FW) coverH = Math.floor(FW * ch / cw);
  const coverMin = Math.ceil(COVER_MIN_SHOWN / SCALE);
  if (coverH < coverMin) throw new Error("mo_share_card: the words leave the cover " + coverH + "px tall (" + Math.round(coverH * SCALE) + "px on a phone), under " + coverMin +
    " (" + COVER_MIN_SHOWN + "px shown, what the 1200x630 card already gives it). The sub line is too long for this card. Tell Content; the template does not reword or shrink type.");
  const coverW = Math.round(coverH * cw / ch);
  const cx = Math.round(X0 + (FW - coverW) / 2), cy = Math.round(regionTop + (regionBottom - regionTop - coverH) / 2);

  const s = S.sheet(SURFACE, W, H, { margin: X0 });
  s.marks = [];
  // Brand row: the carousel's 9:16 chrome. The ring mark's variant is chosen by
  // its DISPLAYED size at 375px (marks.ring_mark.crossover_px applies to what
  // is seen), so 88px authored, 31px shown, is the small variant.
  const rx = X1 - RING;
  s.add(S.ringMark(rx, Y0, RING, { displayScale: SCALE }));
  s.marks.push({ x0: rx, y0: Y0, x1: X1, y1: Y0 + RING, what: "ring mark" });
  s.text(rx - 24, Y0 + Math.round(RING / 2) + 9, LOCKUP, { role: "label", size: 26, fill: C.deep, ls: 3, anchor: "end", maxW: rx - 24 - X0, what: "wordmark" });
  // Cover: og_book's radius (4 at 310px) and shadow (0 18 40 at 310px), scaled.
  const r = Math.round(coverH * 0.013), dy = Math.round(coverH * 0.058), sd = Math.round(coverH * 0.065);
  const href = "data:image/png;base64," + fs.readFileSync(coverFile).toString("base64");
  s.add(`<defs><filter id="coverShadow" x="-30%" y="-20%" width="160%" height="150%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${sd}" flood-color="${T.light["navy"]}" flood-opacity="0.22"/></filter>` +
    `<clipPath id="coverClip"><rect x="${cx}" y="${cy}" width="${coverW}" height="${coverH}" rx="${r}"/></clipPath></defs>` +
    `<rect x="${cx}" y="${cy}" width="${coverW}" height="${coverH}" rx="${r}" fill="${T.light["navy"]}" filter="url(#coverShadow)"/>` +
    `<image href="${href}" x="${cx}" y="${cy}" width="${coverW}" height="${coverH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#coverClip)"/>`);
  s.marks.push({ x0: cx, y0: cy, x1: cx + coverW, y1: cy + coverH, what: "cover" });
  const wb = words(s, spec, z, ky);

  const svg = s.svg();
  const check = S.gate(s, spec.slug);
  check.safe = S.assertSafe(s, BOX, "mo_share_card: " + spec.slug);
  T.assertRenderClean(svg, spec.slug);
  return { svg, check, s, file: `${spec.slug}_${W}x${H}.png`, alt: spec.alt, headPx: z,
    cover: { x: cx, y: cy, w: coverW, h: coverH, shown_px: Math.round(coverH * SCALE) },
    ring: { px: RING, shown_px: +(RING * SCALE).toFixed(1), variant: RING * SCALE < T.raw.marks.ring_mark.crossover_px ? "small_on_light" : "on_light" },
    words: { top: Math.round(wb.top), bottom: Math.round(wb.bottom) } };
}

async function build(spec, out, { dir = ".", proof = false } = {}) {
  const c = compose(spec, { dir });
  fs.mkdirSync(out, { recursive: true });
  await S.render(c.svg, path.join(out, c.file));
  const manifest = { producer: "mo_share_card.js " + VERSION, kit: "mo_social.js " + S.VERSION, tokens: T.version,
    slug: spec.slug, surface: SURFACE, size: [W, H], safe_box: BOX, file: c.file, alt: c.alt,
    check: c.check, cover: c.cover, ring: c.ring, head_px: c.headPx };
  if (proof) {
    fs.mkdirSync(path.join(out, "proof"), { recursive: true });
    await S.render(S.proofSvg(c.svg, BOX, W, H), path.join(out, "proof", c.file.replace(/\.png$/, "_proof.png")));
    manifest.proof = "proof/";
  }
  const mf = path.join(out, `${spec.slug}_${W}x${H}_manifest.json`);
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2) + "\n");
  console.log("mo_share_card " + VERSION + " (tokens " + T.version + "): " + c.file + ", manifest " + mf);
  return manifest;
}

module.exports = { VERSION, SURFACE, W, H, BOX, SCALE, compose, build, validate };

if (require.main === module) {
  const o = S.args(process.argv.slice(2));
  const cmd = o._[0], specPath = o._[1];
  const fail = (e) => { console.error(e.message); process.exit(1); };
  const load = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
  if (cmd === "build" && specPath) build(load(specPath), o.out || ".", { dir: path.dirname(path.resolve(specPath)), proof: !!o.proof }).catch(fail);
  else if (cmd === "check" && specPath) {
    try { const c = compose(load(specPath), { dir: path.dirname(path.resolve(specPath)) });
      console.log(c.file, JSON.stringify({ check: c.check, cover: c.cover, ring: c.ring, head_px: c.headPx })); console.log("gates passed"); }
    catch (e) { fail(e); }
  } else {
    console.log("usage: node mo_share_card.js build <spec.json> --out <dir> [--proof]");
    console.log("       node mo_share_card.js check <spec.json>");
    process.exit(cmd ? 1 : 0);
  }
}
