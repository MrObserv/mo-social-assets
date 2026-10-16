#!/usr/bin/env node
// mo_carousel.js v1.1.0 (2026-10-15): THE carousel producer (Carousel_Standard.md v3.1).
// One JSON in; N slides, the LinkedIn document PDF and a manifest with alt text out.
// Light, house lane, from design-tokens.json. Declares no colour.
// Replaces templates/render_carousel.py (retired, retired palette) and the
// 2026-09-27 Conway's Law stopgap, whose layout this keeps: ring mark, counter,
// kicker rule, swipe cue, one vertical position for every point slide.
//
// v1.1.0 adds the TikTok cut: 1080x1920 (9:16), surface carousel_tiktok. It is
// a second GEOMETRY run through the same slide functions, never a fork and
// never a crop. The 4:5 geometry is unchanged, value for value, so LinkedIn and
// Instagram renders are byte-identical SVG to v1.0.0 (proved by test, not
// asserted). TikTok rulings, Al 2026-10-15:
//   light, like the other two cuts (the image is the whole screen, so nothing
//     dark surrounds it and the Brand v3 §2 test says light);
//   safe box x 120-930, y 200-1520, from safe_areas.tiktok_photo: anything
//     that must be read sits inside it, and the producer THROWS otherwise;
//   no n / N counter (TikTok draws its own photo dots);
//   the wordmark moves to the top, beside the ring mark, on every slide (the
//     4:5 footer position is TikTok's caption zone).
//
//   node mo_carousel.js build <spec.json> --out <dir> [--variant both|linkedin|instagram|tiktok|all] [--proof]
//   node mo_carousel.js check <spec.json> [--variant ...]   gates only, writes nothing (no sharp needed)
//   node mo_carousel.js sample --out <dir>     the neutral sample in samples/
//
//   both = linkedin + instagram (the v1.0.0 default, unchanged). all = all three.
//   --proof also writes each TikTok slide under a mock of TikTok's interface to
//   <out>/proof/, for the overlay check by eye.
//
// Spec (all strings plain UK English, no em dashes):
// { "slug": "2026-10-13_carousel_example",
//   "cover":  { "eyebrow": "...", "hook": "...", "sub": "...", "alt": "optional" },
//   "points": [ { "tone": "problem|neutral|fix", "label": "...", "head": "...",
//                 "body": "...", "source": "optional", "alt": "optional" } ],   3 to 5
//   "cta":    { "eyebrow": "...", "head": "...", "sub": "optional", "button": "...",
//               "alt": "optional; the variant's link line is appended" } }
"use strict";
const fs = require("fs");
const path = require("path");
const S = require(path.join(__dirname, "mo_social.js"));
const { T, C, TONE } = S;
S.T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_carousel.js");
const VERSION = "1.1.0";

const SURFACE = "carousel";
if (T.modeFor(SURFACE) !== "light") throw new Error("mo_carousel: carousel no longer resolves light; re-read design-tokens.json mode");
const LOCKUP = T.lockupFor(SURFACE);
if (LOCKUP !== "MASTERING OBSERVABILITY") throw new Error("mo_carousel: carousel must be house lane (ruled 2026-10-12), got " + LOCKUP);
const [W, H] = T.size(SURFACE);

const SURFACE_TT = "carousel_tiktok";
if (T.modeFor(SURFACE_TT) !== "light") throw new Error("mo_carousel: carousel_tiktok no longer resolves light (ruled by Al 2026-10-15); re-read design-tokens.json mode");
if (T.lockupFor(SURFACE_TT) !== LOCKUP) throw new Error("mo_carousel: carousel_tiktok must be house lane, got " + T.lockupFor(SURFACE_TT));
const [WT, HT] = T.size(SURFACE_TT);
const SAFE_TT = (T.raw.safe_areas || {}).tiktok_photo;
if (!SAFE_TT || !Array.isArray(SAFE_TT.box) || SAFE_TT.box.length !== 4) throw new Error("mo_carousel: design-tokens.json has no safe_areas.tiktok_photo.box [x0, y0, x1, y1]");

/* GEOMETRY. One object per canvas; every slide function reads only this.
 * 4:5 values are v1.0.0's constants, unchanged: judged at a 375px phone feed
 * (scale 0.347). Do not edit them without re-running the no-regression test.
 * 9:16 is full width at 375px too, so the same 0.347 scale and the same
 * canvas.floors.carousel apply (the sheet is floored as "carousel"). */
const G45 = (() => {
  const M = 84, RING = 88;
  return {
    key: "4x5", surface: SURFACE, W, H, M, FW: W - 2 * M, DMAX: 840, RING,
    TOP: 130, BOTTOM: H - 110,                     // band between counter and footer
    coverKickerY: 150, coverKickerMaxW: W - M - RING - 24 - M, hookY: 400,
    swipeY: H - 170, ctaKickerY: 150, ctaKickerMaxW: W - 2 * M - 220, ctaHeadY: 420,
    headLines: 3, bodyLines: 5, ringOnEverySlide: false, counter: true, brandRow: "footer", safe: null, centre: false,
  };
})();
const G916 = (() => {
  const [x0, y0, x1, y1] = SAFE_TT.box;
  const M = x0, RING = 88, FW = x1 - x0;
  if (WT - x1 < x0) throw new Error("mo_carousel: tiktok safe box is narrower on the left than the right; the layout assumes a symmetric-or-wider right inset");
  const brandBase = y0 + Math.round(RING / 2) + 9;   // mono 26px baseline on the ring's centre line
  return {
    key: "9x16", surface: SURFACE_TT, W: WT, H: HT, M, FW, DMAX: FW, RING, R: x1,
    TOP: y0 + RING + 52, BOTTOM: y1,               // band under the brand row, down to the safe floor
    coverKickerY: y0 + RING + 92, coverKickerMaxW: FW, hookY: y0 + RING + 312,
    swipeY: y1 - 20, ctaKickerY: y0 + RING + 92, ctaKickerMaxW: FW, ctaHeadY: y0 + RING + 312,
    // Same grammar limits as 4:5. The column is 102px narrower, but none of
    // C1, C2 or C3 wraps past 3 head / 5 body lines in it (tested 2026-10-15),
    // so the standard keeps one grammar for all three cuts. A line that will
    // not fit throws, and goes back to Content; it is never cut or shrunk.
    headLines: 3, bodyLines: 5, ringOnEverySlide: true, centre: true, counter: false, brandRow: "top",
    brandBase, safe: { x0, y0, x1, y1 },
  };
})();
const GEOM = { linkedin: G45, instagram: G45, tiktok: G916 };

const VARIANTS = {
  linkedin: { line: "LINK IN COMMENTS", alt: "Link in comments." },
  instagram: { line: "LINK IN BIO", alt: "Link in bio." },
  tiktok: { line: "LINK IN BIO", alt: "Link in bio." },
};
const VARIANT_SETS = { both: ["linkedin", "instagram"], all: ["linkedin", "instagram", "tiktok"] };
function variantList(v) {
  const list = VARIANT_SETS[v] || [v];
  list.forEach((x) => { if (!VARIANTS[x]) throw new Error("mo_carousel: variant must be both, all, linkedin, instagram or tiktok, got " + x); });
  return list;
}

function validate(spec) {
  if (!spec || typeof spec !== "object") throw new Error("mo_carousel: spec must be a JSON object");
  S.assertSlug(spec.slug);
  for (const k of ["cover", "cta"]) if (!spec[k]) throw new Error("mo_carousel: spec." + k + " is missing");
  ["eyebrow", "hook", "sub"].forEach((k) => (spec.cover[k] = S.assertCopy(spec.cover[k], "cover." + k)));
  ["eyebrow", "head", "button"].forEach((k) => (spec.cta[k] = S.assertCopy(spec.cta[k], "cta." + k)));
  if (spec.cta.sub != null) spec.cta.sub = S.assertCopy(spec.cta.sub, "cta.sub");
  const pts = spec.points || [];
  const n = pts.length + 2;
  if (n < 5 || n > 7) throw new Error("mo_carousel: the deck is " + n + " slides (cover + " + pts.length + " points + CTA); the standard allows 5 to 7, so 3 to 5 points");
  pts.forEach((p, i) => {
    if (!TONE[p.tone]) throw new Error("mo_carousel: points[" + i + "].tone must be problem, neutral or fix, got " + p.tone);
    ["label", "head", "body"].forEach((k) => (p[k] = S.assertCopy(p[k], "points[" + i + "]." + k)));
    if (p.source != null) p.source = S.assertCopy(p.source, "points[" + i + "].source");
  });
  return spec;
}

// Floors are canvas.floors.carousel on BOTH geometries: same 0.347 scale.
const sheetFor = (g) => S.sheet(SURFACE, g.W, g.H, { margin: g.M });

function frame(g, s, n, N) {
  if (g.brandRow === "footer") {
    if (g.counter && n > 1) s.text(g.W - g.M, 84, `${n} / ${N}`, { role: "label", size: 26, fill: C.soft, ls: 2, anchor: "end", maxW: 200, what: "counter" });
    s.text(g.W / 2, g.H - 50, LOCKUP, { role: "label", size: 26, fill: C.deep, ls: 3, anchor: "middle", maxW: g.FW, what: "footer" });
    return;
  }
  // 9:16: ring mark top right of the safe box, wordmark beside it, every slide.
  const rx = g.R - g.RING, gap = 24;
  s.add(S.ringMark(rx, g.safe.y0, g.RING));
  s.marks = (s.marks || []).concat([{ x0: rx, y0: g.safe.y0, x1: rx + g.RING, y1: g.safe.y0 + g.RING, what: "ring mark" }]);
  s.text(rx - gap, g.brandBase, LOCKUP, { role: "label", size: 26, fill: C.deep, ls: 3, anchor: "end", maxW: rx - gap - g.M, what: "wordmark" });
}
function fitDisplay(g, s, str, sizes, maxLines, what) {
  for (const z of sizes) if (s.measure(str, "display", z, g.DMAX, -1).length <= maxLines) return z;
  throw new Error("mo_carousel: " + what + " does not fit " + maxLines + " lines even at " + sizes[sizes.length - 1] + "px: \"" + str + "\"");
}
function assertBand(g, top, bottom, what) {
  if (top < g.TOP - 0.5 || bottom > g.BOTTOM + 0.5) throw new Error("mo_carousel: " + what + " runs from y" + Math.round(top) + " to y" + Math.round(bottom) +
    "; the band is y" + g.TOP + " to y" + g.BOTTOM + " (" + g.key + "). Cut copy; the template does not shrink body text.");
}

function coverBody(g, s, c, z, hookY) {
  const h = s.block(g.M, hookY, c.hook, { role: "display", size: z, fill: C.ink, maxW: g.DMAX, lh: Math.round(z * 1.12), ls: -1, maxLines: 4, what: "cover hook" });
  const sub = s.block(g.M, h.last + Math.round(z * 0.3) + 84, c.sub, { role: "text", size: 44, fill: C.muted, maxW: g.FW, lh: 60, maxLines: 3, what: "cover sub" });
  return { top: hookY - z * 0.78, bottom: sub.last + 44 * 0.24, subLast: sub.last };
}
/* 9:16 only: the cover and CTA content is centred in the space between the
 * eyebrow and the cue below it, as the point slides already are. Without it
 * the content sat in the top half of a tall screen with the lower half empty.
 * Probed on a throwaway sheet, then placed once. 4:5 is not centred, so its
 * output is unchanged. */
function centredY(g, probe, defY, regionTop, regionBottom) {
  if (!g.centre) return defY;
  const e = probe(defY);
  return Math.round(defY + ((regionTop + regionBottom) / 2 - (e.top + e.bottom) / 2));
}
function cover(g, spec, N) {
  const s = sheetFor(g);
  const c = spec.cover;
  if (!g.ringOnEverySlide) s.add(S.ringMark(g.W - g.M - g.RING, 56, g.RING));
  S.kicker(s, g.M, g.coverKickerY, c.eyebrow, C.deep, g.coverKickerMaxW);
  const z = fitDisplay(g, s, c.hook, [96, 92, 88, 84, 80], 4, "cover hook");
  const swipeY = g.swipeY;
  const hookY = centredY(g, (y) => coverBody(g, sheetFor(g), c, z, y), g.hookY, g.coverKickerY + 60, swipeY - 100);
  const sub = coverBody(g, s, c, z, hookY);
  if (sub.subLast + 12 > swipeY - 72) throw new Error("mo_carousel: cover sub reaches y" + (sub.subLast + 12) + ", into the swipe cue at y" + swipeY + ". Shorten the hook or the sub.");
  s.text(g.M, swipeY, "SWIPE", { role: "label", size: 28, fill: C.deep, ls: 4, maxW: 200, what: "swipe cue" });
  s.add(`<path d="M${g.M + 150},${swipeY - 20} L${g.M + 180},${swipeY - 9} L${g.M + 150},${swipeY + 2} Z" fill="${C.deep}"/>`);
  frame(g, s, 1, N);
  return { name: "cover", s, hookPx: z, alt: c.alt || `Cover. ${S.sentence(S.plain(c.eyebrow))} ${S.sentence(c.hook)} ${S.sentence(c.sub)} Swipe.` };
}

/* Point slides are laid out in group coordinates, measured, and placed with
 * ONE offset (from the tallest group) so the numeral never jumps on swipe. */
function pointGroup(g, s, p, i, oy) {
  const acc = TONE[p.tone], n = String(i + 1).padStart(2, "0");
  s.text(g.M, oy + 150, n, { role: "display", size: 200, fill: acc, ls: -4, maxW: g.FW, what: "numeral" });
  s.text(g.M, oy + 250, p.label.toUpperCase(), { role: "label", size: 28, fill: acc, ls: 4, maxW: g.FW, what: "point label" });
  const h = s.block(g.M, oy + 350, p.head, { role: "display", size: 80, fill: C.ink, maxW: g.DMAX, lh: 90, ls: -1, maxLines: g.headLines, what: "point head" });
  const b = s.block(g.M, h.last + 126, p.body, { role: "text", size: 44, fill: C.muted, maxW: g.FW, lh: 62, maxLines: g.bodyLines, what: "point body" });
  let last = b.last + 44 * 0.24;
  if (p.source) {
    const ry = b.last + 52;
    s.add(`<rect x="${g.M}" y="${ry}" width="48" height="3" fill="${acc}"/>`);
    const src = s.block(g.M, ry + 50, p.source, { role: "small", size: 32, fill: C.muted, maxW: g.FW, lh: 44, maxLines: 2, what: "source line" });
    last = src.last + 32 * 0.24;
  }
  return { top: oy + 150 - 200 * 0.72, bottom: last };
}
function points(g, spec, N) {
  const probe = spec.points.map((p, i) => pointGroup(g, sheetFor(g), p, i, 0));
  const tallest = Math.max(...probe.map((q) => q.bottom - q.top));
  const top0 = probe[0].top;
  const offset = Math.round((g.TOP + g.BOTTOM) / 2 - tallest / 2 - top0);
  return spec.points.map((p, i) => {
    const s = sheetFor(g);
    const q = pointGroup(g, s, p, i, offset);
    assertBand(g, q.top, q.bottom, "point " + (i + 1));
    frame(g, s, i + 2, N);
    const n = String(i + 1).padStart(2, "0");
    const alt = p.alt || `${n}, ${p.label.toLowerCase()}. ${S.sentence(p.head)} ${S.sentence(p.body)}${p.source ? " Source: " + S.sentence(p.source) : ""}`;
    return { name: p.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "point-" + n, s, offset, alt };
  });
}
function ctaBody(g, s, c, v, z, headY) {
  const h = s.block(g.M, headY, c.head, { role: "display", size: z, fill: C.ink, maxW: g.DMAX, lh: Math.round(z * 1.12), ls: -1, maxLines: 4, what: "CTA head" });
  let y = h.last + Math.round(z * 0.3);
  if (c.sub) { const b = s.block(g.M, y + 84, c.sub, { role: "text", size: 44, fill: C.muted, maxW: g.FW, lh: 62, maxLines: 3, what: "CTA sub" }); y = b.last + 12; }
  y += 56;
  const bs = 40, tw = s.width(c.button, "strong", bs), bw = Math.ceil(tw + 96), bh = 96;
  if (bw > g.FW) throw new Error("mo_carousel: button \"" + c.button + "\" is wider than the column");
  // Radius 12 on a 1080 canvas is 4px at phone width: the Brand v3 button radius.
  s.add(`<rect x="${g.M}" y="${y}" width="${bw}" height="${bh}" rx="12" fill="${C.deep}"/>`);
  s.text(g.M + bw / 2, y + bh / 2 + bs * 0.35, c.button, { role: "strong", size: bs, fill: C.panel, maxW: bw - 95, anchor: "middle", what: "button" });
  s.items[s.items.length - 1].ground = C.deep;
  y += bh + 64;
  s.text(g.M, y, v.line, { role: "label", size: 28, fill: C.deep, ls: 4, maxW: g.FW, what: "link line" });
  return { top: headY - z * 0.78, bottom: y + 8 };
}
function cta(g, spec, N, variant) {
  const v = VARIANTS[variant];
  const s = sheetFor(g);
  const c = spec.cta;
  S.kicker(s, g.M, g.ctaKickerY, c.eyebrow, C.deep, g.ctaKickerMaxW);
  const z = fitDisplay(g, s, c.head, [96, 92, 88, 84, 80], 4, "CTA head");
  const headY = centredY(g, (y) => ctaBody(g, sheetFor(g), c, v, z, y), g.ctaHeadY, g.ctaKickerY + 60, g.BOTTOM - 40);
  const e = ctaBody(g, s, c, v, z, headY);
  assertBand(g, g.ctaKickerY - 20, e.bottom, "CTA slide");
  frame(g, s, N, N);
  return { name: "cta-" + variant, s, hookPx: z, variant,
    alt: c.alt ? c.alt + " " + v.alt : `${S.sentence(S.plain(c.eyebrow))} ${S.sentence(c.head)} ${c.sub ? S.sentence(c.sub) + " " : ""}${S.sentence(c.button)} ${v.alt}` };
}

/* The TikTok gate. Every string on the ledger, and the ring mark, must sit
 * wholly inside the ruled safe box. Same text box as mo_social gate():
 * measured width, cap line at 0.78 of the size above the baseline, descender
 * at 0.24 below. Throws listing every offender. */
function inBox(it, s) {
  const wpx = s.width(it.str, it.role, it.size, it.ls);
  const x0 = it.anchor === "middle" ? it.x - wpx / 2 : it.anchor === "end" ? it.x - wpx : it.x;
  return { x0, x1: x0 + wpx, y0: it.y - it.size * 0.78, y1: it.y + it.size * 0.24 };
}
function assertSafe(sl, g) {
  if (!g.safe) return null;
  const { x0, y0, x1, y1 } = g.safe, bad = [];
  const boxes = sl.s.items.map((it) => Object.assign(inBox(it, sl.s), { what: it.what, str: it.str }))
    .concat((sl.s.marks || []).map((m) => Object.assign({ str: "" }, m)));
  for (const b of boxes) {
    if (b.x0 < x0 - 0.5 || b.x1 > x1 + 0.5 || b.y0 < y0 - 0.5 || b.y1 > y1 + 0.5)
      bad.push(`${b.what} "${b.str}" spans x${Math.round(b.x0)}-${Math.round(b.x1)}, y${Math.round(b.y0)}-${Math.round(b.y1)}`);
  }
  if (bad.length) throw new Error("mo_carousel: " + sl.name + " (tiktok) has " + bad.length + " item(s) outside the safe box x" + x0 + "-" + x1 +
    ", y" + y0 + "-" + y1 + " (safe_areas.tiktok_photo):\n  " + bad.join("\n  "));
  return { box: [x0, y0, x1, y1], items: boxes.length };
}

/* Pure: spec in, composed and GATED slides out. No disk, no sharp. */
function compose(spec, { variants = ["linkedin", "instagram"] } = {}) {
  validate(spec);
  variants.forEach((v) => { if (!VARIANTS[v]) throw new Error("mo_carousel: variant must be linkedin, instagram or tiktok, got " + v); });
  const N = spec.points.length + 2;
  const geoms = [...new Set(variants.map((v) => GEOM[v]))];
  const bodies = {};
  geoms.forEach((g) => { bodies[g.key] = [cover(g, spec, N), ...points(g, spec, N)]; bodies[g.key].forEach((sl) => (sl.g = g)); });
  const ctas = variants.map((v) => { const sl = cta(GEOM[v], spec, N, v); sl.g = GEOM[v]; return sl; });
  const all = [...geoms.flatMap((g) => bodies[g.key]), ...ctas];
  all.forEach((sl) => {
    const g = sl.g;
    const order = bodies[g.key];
    const i = order.indexOf(sl);
    sl.n = i > -1 ? i + 1 : N;
    sl.svg = sl.s.svg();
    sl.check = gateSlide(sl);
    const safe = assertSafe(sl, g);
    if (safe) sl.check.safe = safe;
    T.assertRenderClean(sl.svg, spec.slug + " " + sl.name + " " + g.key);
    sl.file = `${spec.slug}_${sl.n}_${sl.name}_${g.W}x${g.H}.png`;
  });
  // v1.0.0 callers read deck.body: keep it the 4:5 body when there is one.
  const body = bodies[G45.key] || bodies[G916.key];
  return { N, body, bodies, ctas, all };
}
// The button label sits on teal-deep, not on the ground: gate it there.
function gateSlide(sl) {
  const s = sl.s, special = s.items.filter((it) => it.ground);
  special.forEach((it) => { const c = S.contrast(it.fill, it.ground); if (c < 4.5) throw new Error("mo_carousel: " + it.what + " is " + c.toFixed(2) + ":1 on its button"); });
  const rest = Object.assign({}, s, { items: s.items.filter((it) => !it.ground) });
  const r = S.gate(rest, sl.name);
  r.strings += special.length;
  return r;
}

/* A MOCK of TikTok's photo-post interface, for the overlay proof only. Never
 * part of a shipped slide. Geometry is the stricter published figure on each
 * edge: tabs to y131, the action column 150px wide on the right from y700,
 * the caption block from the bottom up to y1553, photo dots at y1560. Black
 * and white only, because it stands for the platform, not the brand. */
function tiktokChrome(w, h) {
  const col = w - 150;
  let m = `<g opacity="0.55"><rect x="0" y="0" width="${w}" height="131" fill="#000000"/>` +
    `<rect x="${col}" y="700" width="150" height="800" fill="#000000"/>` +
    `<rect x="0" y="1553" width="${w}" height="${h - 1553}" fill="#000000"/></g>`;
  m += `<g fill="#FFFFFF" font-family="sans-serif" font-weight="700">` +
    `<text x="${w / 2 - 60}" y="86" font-size="34" text-anchor="end">Following</text><text x="${w / 2 + 60}" y="86" font-size="34">For You</text>`;
  for (let i = 0; i < 5; i++) m += `<circle cx="${col + 75}" cy="${790 + i * 150}" r="40" fill="none" stroke="#FFFFFF" stroke-width="6"/>`;
  m += `<text x="40" y="1640" font-size="36">@masteringobservability</text>` +
    `<text x="40" y="1700" font-size="30" font-weight="400">Caption text runs here, two lines, then more...</text>` +
    `<text x="40" y="1760" font-size="28" font-weight="400">Original sound</text></g>`;
  for (let i = 0; i < 6; i++) m += `<circle cx="${w / 2 - 75 + i * 30}" cy="1580" r="7" fill="#FFFFFF" opacity="${i === 0 ? 1 : 0.5}"/>`;
  return m;
}
function proofSvg(sl) {
  const g = sl.g, [x0, y0, x1, y1] = [g.safe.x0, g.safe.y0, g.safe.x1, g.safe.y1];
  return sl.svg.replace(/<\/svg>$/, tiktokChrome(g.W, g.H) +
    `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="#FF0000" stroke-width="3" stroke-dasharray="14 10"/></svg>`);
}

async function build(spec, out, { variant = "both", proof = false } = {}) {
  const variants = variantList(variant);
  const deck = compose(spec, { variants });
  fs.mkdirSync(out, { recursive: true });
  const pngs = {};
  for (const sl of deck.all) pngs[sl.g.key + ":" + sl.name] = await S.render(sl.svg, path.join(out, sl.file));
  const manifest = { producer: "mo_carousel.js " + VERSION, kit: "mo_social.js " + S.VERSION, tokens: T.version,
    slug: spec.slug, slides: deck.N, size: [W, H], variants: {} };
  for (const v of variants) {
    const g = GEOM[v];
    const order = [...deck.bodies[g.key], deck.ctas.find((c) => c.variant === v)];
    const entry = { slides: order.map((sl) => ({ n: sl.n, file: sl.file, alt: sl.alt, check: sl.check })) };
    if (g !== G45) { entry.size = [g.W, g.H]; entry.surface = g.surface; entry.safe_box = SAFE_TT.box; }
    if (v === "linkedin") {
      entry.pdf = `${spec.slug}_linkedin_${W}x${H}.pdf`;
      await S.pdf(order.map((sl) => pngs[g.key + ":" + sl.name]), path.join(out, entry.pdf), { title: spec.cover.hook });
    }
    manifest.variants[v] = entry;
  }
  if (proof && variants.includes("tiktok")) {
    const pd = path.join(out, "proof");
    fs.mkdirSync(pd, { recursive: true });
    const order = [...deck.bodies[G916.key], deck.ctas.find((c) => c.variant === "tiktok")];
    for (const sl of order) await S.render(proofSvg(sl), path.join(pd, sl.file.replace(/\.png$/, "_proof.png")));
    manifest.variants.tiktok.proof = "proof/";
  }
  const mf = path.join(out, `${spec.slug}_manifest.json`);
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2) + "\n");
  console.log("mo_carousel " + VERSION + " (tokens " + T.version + "): " + deck.all.length + " PNGs, " + (manifest.variants.linkedin ? "1 PDF, " : "") + "manifest " + mf);
  return manifest;
}

module.exports = { VERSION, SURFACE, SURFACE_TT, W, H, WT, HT, G45, G916, compose, build, validate, tiktokChrome, proofSvg, variantList };

if (require.main === module) {
  const o = S.args(process.argv.slice(2));
  const cmd = o._[0];
  const load = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
  const fail = (e) => { console.error(e.message); process.exit(1); };
  if (cmd === "build" && o._[1]) build(load(o._[1]), o.out || ".", { variant: o.variant || "both", proof: !!o.proof }).catch(fail);
  else if (cmd === "check" && o._[1]) {
    try { const d = compose(load(o._[1]), { variants: variantList(o.variant || "all") }); d.all.forEach((sl) => console.log(sl.file, JSON.stringify(sl.check))); console.log("gates passed: " + d.all.length + " slides"); }
    catch (e) { fail(e); }
  } else if (cmd === "sample") build(load(path.join(__dirname, "samples", "carousel_sample.json")), o.out || ".").catch(fail);
  else {
    console.log("usage: node mo_carousel.js build <spec.json> --out <dir> [--variant both|linkedin|instagram|tiktok|all] [--proof]");
    console.log("       node mo_carousel.js check <spec.json> [--variant ...]");
    console.log("       node mo_carousel.js sample --out <dir>");
    process.exit(cmd ? 1 : 0);
  }
}
