#!/usr/bin/env node
// mo_carousel.js v1.0.0 (2026-10-12): THE carousel producer (Carousel_Standard.md v3.0).
// One JSON in; N slides, the LinkedIn document PDF and a manifest with alt text out.
// Light, house lane, from design-tokens.json. Declares no colour.
// Replaces templates/render_carousel.py (retired, retired palette) and the
// 2026-09-27 Conway's Law stopgap, whose layout this keeps: ring mark, counter,
// kicker rule, swipe cue, one vertical position for every point slide.
//
//   node mo_carousel.js build <spec.json> --out <dir> [--variant both|linkedin|instagram]
//   node mo_carousel.js check <spec.json>      gates only, writes nothing (no sharp needed)
//   node mo_carousel.js sample --out <dir>     the neutral sample in samples/
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
const VERSION = "1.0.0";

const SURFACE = "carousel";
if (T.modeFor(SURFACE) !== "light") throw new Error("mo_carousel: carousel no longer resolves light; re-read design-tokens.json mode");
const LOCKUP = T.lockupFor(SURFACE);
if (LOCKUP !== "MASTERING OBSERVABILITY") throw new Error("mo_carousel: carousel must be house lane (ruled 2026-10-12), got " + LOCKUP);
const [W, H] = T.size(SURFACE);

// Geometry, 1080x1350. Judged at a 375px phone feed (scale 0.347).
const M = 84, FW = W - 2 * M, DMAX = 840;          // display measure narrower than the body column
const RING = 88, TOP = 130, BOTTOM = H - 110;       // band between counter and footer
const VARIANTS = {
  linkedin: { line: "LINK IN COMMENTS", alt: "Link in comments." },
  instagram: { line: "LINK IN BIO", alt: "Link in bio." },
};

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

function frame(s, n, N) {
  if (n > 1) s.text(W - M, 84, `${n} / ${N}`, { role: "label", size: 26, fill: C.soft, ls: 2, anchor: "end", maxW: 200, what: "counter" });
  s.text(W / 2, H - 50, LOCKUP, { role: "label", size: 26, fill: C.deep, ls: 3, anchor: "middle", maxW: FW, what: "footer" });
}
function fitDisplay(s, str, sizes, maxLines, what) {
  for (const z of sizes) if (s.measure(str, "display", z, DMAX, -1).length <= maxLines) return z;
  throw new Error("mo_carousel: " + what + " does not fit " + maxLines + " lines even at " + sizes[sizes.length - 1] + "px: \"" + str + "\"");
}
function assertBand(top, bottom, what) {
  if (top < TOP - 0.5 || bottom > BOTTOM + 0.5) throw new Error("mo_carousel: " + what + " runs from y" + Math.round(top) + " to y" + Math.round(bottom) +
    "; the band is y" + TOP + " to y" + BOTTOM + ". Cut copy; the template does not shrink body text.");
}

function cover(spec, N) {
  const s = S.sheet(SURFACE, W, H, { margin: M });
  const c = spec.cover;
  s.add(S.ringMark(W - M - RING, 56, RING));
  S.kicker(s, M, 150, c.eyebrow, C.deep, W - M - RING - 24 - M);
  const z = fitDisplay(s, c.hook, [96, 92, 88, 84, 80], 4, "cover hook");
  const h = s.block(M, 400, c.hook, { role: "display", size: z, fill: C.ink, maxW: DMAX, lh: Math.round(z * 1.12), ls: -1, maxLines: 4, what: "cover hook" });
  const sub = s.block(M, h.last + Math.round(z * 0.3) + 84, c.sub, { role: "text", size: 44, fill: C.muted, maxW: FW, lh: 60, maxLines: 3, what: "cover sub" });
  const swipeY = H - 170;
  if (sub.last + 12 > swipeY - 72) throw new Error("mo_carousel: cover sub reaches y" + (sub.last + 12) + ", into the swipe cue at y" + swipeY + ". Shorten the hook or the sub.");
  s.text(M, swipeY, "SWIPE", { role: "label", size: 28, fill: C.deep, ls: 4, maxW: 200, what: "swipe cue" });
  s.add(`<path d="M${M + 150},${swipeY - 20} L${M + 180},${swipeY - 9} L${M + 150},${swipeY + 2} Z" fill="${C.deep}"/>`);
  frame(s, 1, N);
  return { name: "cover", s, hookPx: z, alt: c.alt || `Cover. ${S.sentence(S.plain(c.eyebrow))} ${S.sentence(c.hook)} ${S.sentence(c.sub)} Swipe.` };
}

/* Point slides are laid out in group coordinates, measured, and placed with
 * ONE offset (from the tallest group) so the numeral never jumps on swipe. */
function pointGroup(s, p, i, oy) {
  const acc = TONE[p.tone], n = String(i + 1).padStart(2, "0");
  s.text(M, oy + 150, n, { role: "display", size: 200, fill: acc, ls: -4, maxW: FW, what: "numeral" });
  s.text(M, oy + 250, p.label.toUpperCase(), { role: "label", size: 28, fill: acc, ls: 4, maxW: FW, what: "point label" });
  const h = s.block(M, oy + 350, p.head, { role: "display", size: 80, fill: C.ink, maxW: DMAX, lh: 90, ls: -1, maxLines: 3, what: "point head" });
  const b = s.block(M, h.last + 126, p.body, { role: "text", size: 44, fill: C.muted, maxW: FW, lh: 62, maxLines: 5, what: "point body" });
  let last = b.last + 44 * 0.24;
  if (p.source) {
    const ry = b.last + 52;
    s.add(`<rect x="${M}" y="${ry}" width="48" height="3" fill="${acc}"/>`);
    const src = s.block(M, ry + 50, p.source, { role: "small", size: 32, fill: C.muted, maxW: FW, lh: 44, maxLines: 2, what: "source line" });
    last = src.last + 32 * 0.24;
  }
  return { top: oy + 150 - 200 * 0.72, bottom: last };
}
function points(spec, N) {
  const probe = spec.points.map((p, i) => pointGroup(S.sheet(SURFACE, W, H, { margin: M }), p, i, 0));
  const tallest = Math.max(...probe.map((g) => g.bottom - g.top));
  const top0 = probe[0].top;
  const offset = Math.round((TOP + BOTTOM) / 2 - tallest / 2 - top0);
  return spec.points.map((p, i) => {
    const s = S.sheet(SURFACE, W, H, { margin: M });
    const g = pointGroup(s, p, i, offset);
    assertBand(g.top, g.bottom, "point " + (i + 1));
    frame(s, i + 2, N);
    const n = String(i + 1).padStart(2, "0");
    const alt = p.alt || `${n}, ${p.label.toLowerCase()}. ${S.sentence(p.head)} ${S.sentence(p.body)}${p.source ? " Source: " + S.sentence(p.source) : ""}`;
    return { name: p.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "point-" + n, s, offset, alt };
  });
}
function cta(spec, N, variant) {
  const v = VARIANTS[variant];
  const s = S.sheet(SURFACE, W, H, { margin: M });
  const c = spec.cta;
  S.kicker(s, M, 150, c.eyebrow, C.deep, FW - 220);
  const z = fitDisplay(s, c.head, [96, 92, 88, 84, 80], 4, "CTA head");
  const h = s.block(M, 420, c.head, { role: "display", size: z, fill: C.ink, maxW: DMAX, lh: Math.round(z * 1.12), ls: -1, maxLines: 4, what: "CTA head" });
  let y = h.last + Math.round(z * 0.3);
  if (c.sub) { const b = s.block(M, y + 84, c.sub, { role: "text", size: 44, fill: C.muted, maxW: FW, lh: 62, maxLines: 3, what: "CTA sub" }); y = b.last + 12; }
  y += 56;
  const bs = 40, tw = s.width(c.button, "strong", bs), bw = Math.ceil(tw + 96), bh = 96;
  if (bw > FW) throw new Error("mo_carousel: button \"" + c.button + "\" is wider than the column");
  // Radius 12 on a 1080 canvas is 4px at phone width: the Brand v3 button radius.
  s.add(`<rect x="${M}" y="${y}" width="${bw}" height="${bh}" rx="12" fill="${C.deep}"/>`);
  s.text(M + bw / 2, y + bh / 2 + bs * 0.35, c.button, { role: "strong", size: bs, fill: C.panel, maxW: bw - 95, anchor: "middle", what: "button" });
  s.items[s.items.length - 1].ground = C.deep;
  y += bh + 64;
  s.text(M, y, v.line, { role: "label", size: 28, fill: C.deep, ls: 4, maxW: FW, what: "link line" });
  assertBand(150 - 20, y + 8, "CTA slide");
  frame(s, N, N);
  return { name: "cta-" + variant, s, hookPx: z, variant,
    alt: c.alt ? c.alt + " " + v.alt : `${S.sentence(S.plain(c.eyebrow))} ${S.sentence(c.head)} ${c.sub ? S.sentence(c.sub) + " " : ""}${S.sentence(c.button)} ${v.alt}` };
}

/* Pure: spec in, composed and GATED slides out. No disk, no sharp. */
function compose(spec, { variants = ["linkedin", "instagram"] } = {}) {
  validate(spec);
  const N = spec.points.length + 2;
  const body = [cover(spec, N), ...points(spec, N)];
  const ctas = variants.map((v) => { if (!VARIANTS[v]) throw new Error("mo_carousel: variant must be linkedin or instagram, got " + v); return cta(spec, N, v); });
  const all = [...body, ...ctas];
  all.forEach((sl, i) => {
    sl.n = Math.min(i + 1, N);
    sl.svg = sl.s.svg();
    sl.check = gateSlide(sl);
    T.assertRenderClean(sl.svg, spec.slug + " " + sl.name);
    sl.file = `${spec.slug}_${sl.n}_${sl.name}_${W}x${H}.png`;
  });
  return { N, body, ctas, all };
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

async function build(spec, out, { variant = "both" } = {}) {
  const variants = variant === "both" ? ["linkedin", "instagram"] : [variant];
  const deck = compose(spec, { variants });
  fs.mkdirSync(out, { recursive: true });
  const pngs = {};
  for (const sl of deck.all) pngs[sl.name] = await S.render(sl.svg, path.join(out, sl.file));
  const manifest = { producer: "mo_carousel.js " + VERSION, kit: "mo_social.js " + S.VERSION, tokens: T.version,
    slug: spec.slug, slides: deck.N, size: [W, H], variants: {} };
  for (const v of variants) {
    const order = [...deck.body, deck.ctas.find((c) => c.variant === v)];
    const entry = { slides: order.map((sl) => ({ n: sl.n, file: sl.file, alt: sl.alt, check: sl.check })) };
    if (v === "linkedin") {
      entry.pdf = `${spec.slug}_linkedin_${W}x${H}.pdf`;
      await S.pdf(order.map((sl) => pngs[sl.name]), path.join(out, entry.pdf), { title: spec.cover.hook });
    }
    manifest.variants[v] = entry;
  }
  const mf = path.join(out, `${spec.slug}_manifest.json`);
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2) + "\n");
  console.log("mo_carousel " + VERSION + " (tokens " + T.version + "): " + deck.all.length + " PNGs, " + (manifest.variants.linkedin ? "1 PDF, " : "") + "manifest " + mf);
  return manifest;
}

module.exports = { VERSION, SURFACE, W, H, compose, build, validate };

if (require.main === module) {
  const o = S.args(process.argv.slice(2));
  const cmd = o._[0];
  const load = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
  const fail = (e) => { console.error(e.message); process.exit(1); };
  if (cmd === "build" && o._[1]) build(load(o._[1]), o.out || ".", { variant: o.variant || "both" }).catch(fail);
  else if (cmd === "check" && o._[1]) {
    try { const d = compose(load(o._[1])); d.all.forEach((sl) => console.log(sl.file, JSON.stringify(sl.check))); console.log("gates passed: " + d.all.length + " slides"); }
    catch (e) { fail(e); }
  } else if (cmd === "sample") build(load(path.join(__dirname, "samples", "carousel_sample.json")), o.out || ".").catch(fail);
  else {
    console.log("usage: node mo_carousel.js build <spec.json> --out <dir> [--variant both|linkedin|instagram]");
    console.log("       node mo_carousel.js check <spec.json>");
    console.log("       node mo_carousel.js sample --out <dir>");
    process.exit(cmd ? 1 : 0);
  }
}
