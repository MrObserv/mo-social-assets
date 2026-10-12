// mo_social.js v1.0.0 (2026-10-12)
// Shared kit for the FEED surfaces: producers/mo_carousel.js and
// producers/mo_quote_card.js require it. Declares no colour: every value comes
// from design-tokens.json through mo-tokens.js, and text is measured with the
// per-face advance tables in mo_diagram.js 2.0.0.
//
// What lives here, once, so the two producers cannot drift apart:
//   sheet()   a canvas that records every string it places (the LEDGER), so
//             the gates read what was actually emitted, not what was meant.
//   gate()    text-fit, size floor and AA contrast, per string, against the
//             real background under it (ground plus the radial wash).
//   render()  SVG to truecolour PNG. Throws if byte 25 is not 2 or 6.
//   pdf()     LinkedIn document PDF from rendered PNGs, no extra dependency.
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const T = require(path.join(__dirname, "mo-tokens.js"));
const Dm = require(path.join(__dirname, "mo_diagram.js"));
if (!Dm.METRICS || !Dm.MO_DIAGRAM_VERSION) throw new Error(
  "mo_social: needs producers/mo_diagram.js 2.0.0 or later (measured text widths). Deploy it first.");
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_social.js");
const VERSION = "1.0.0";

const FONT = Dm.FONT, DW = Dm.DISPLAY_WEIGHT;
const C = {
  ink: T.light["ink"], muted: T.light["muted"], soft: T.light["soft"],
  teal: T.light["teal"], deep: T.light["teal-deep"], panel: T.light["panel"],
  high: T.light["semantic-high"], low: T.light["semantic-low"],
};
// Point accents carry MEANING, never decoration (Carousel_Standard.md).
const TONE = { problem: C.high, neutral: C.deep, fix: C.low };

// Text roles. Each maps to one face and one floor key in canvas.floors.
const ROLE = {
  display: { font: FONT.display, weight: DW, floor: "display_px" },
  text: { font: FONT.body, weight: 400, floor: "text_px" },
  strong: { font: FONT.body, weight: 700, floor: "text_px" },
  small: { font: FONT.body, weight: 400, floor: "small_px" },
  label: { font: FONT.mono, weight: 700, floor: "label_px" },
};

// The wash is mo_diagram's house background. The contrast gate needs its
// geometry, so it is READ from the emitted markup at load and the module
// refuses to start if it has changed shape, rather than gating against a
// stale copy of it.
const WASH = (() => {
  const P = Dm.palette("light");
  const bg = Dm.background(1000, 1000, { theme: "light" });
  const ok = /<ellipse cx="500" cy="420" rx="700" ry="700"/.test(bg) && /offset="0\.7"/.test(bg);
  if (!ok) throw new Error("mo_social: mo_diagram background() has changed shape; update WASH before gating contrast against it");
  return { colour: P.mint, ground: P.bg1, peak: P.wash, cx: 0.5, cy: 0.42, fade: 0.7 * 0.7 };
})();

// ---- colour maths (WCAG 2.x) ----------------------------------------------
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (h) => { const [r, g, b] = rgb(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
function contrast(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function blend(top, bottom, a) {
  const t = rgb(top), b = rgb(bottom);
  return "#" + t.map((v, i) => Math.round(v * a + b[i] * (1 - a)).toString(16).padStart(2, "0")).join("").toUpperCase();
}
// Background under a box: the wash's strongest point inside it.
function groundUnder(w, h, x0, y0, x1, y1) {
  const cx = WASH.cx * w, cy = WASH.cy * h;
  const nx = Math.max(x0, Math.min(cx, x1)), ny = Math.max(y0, Math.min(cy, y1));
  const d = Math.hypot(nx - cx, ny - cy) / (WASH.fade * h);
  const a = WASH.peak * Math.max(0, 1 - d);
  return blend(WASH.colour, WASH.ground, a);
}

// ---- house rules on copy ----------------------------------------------------
function assertCopy(str, where) {
  const s = String(str == null ? "" : str);
  if (!s.trim()) throw new Error("mo_social: " + where + " is empty");
  if (/\u2014/.test(s)) throw new Error("mo_social: " + where + " has an em dash; house rule is none (s5_lint would fail it)");
  if (/\s{2,}/.test(s.trim())) throw new Error("mo_social: " + where + " has a double space");
  return s.trim();
}
const sentence = (s) => { s = String(s).trim(); return /[.!?"\u201D]$/.test(s) ? s : s + "."; };
const plain = (s) => { s = String(s).toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1); };

// ---- the sheet: a canvas with a ledger ---------------------------------------
function sheet(surface, w, h, { margin } = {}) {
  const floors = ((T.raw.canvas || {}).floors || {})[surface];
  if (!floors) throw new Error("mo_social: design-tokens.json has no canvas.floors." + surface);
  const items = [];
  let inner = "";
  const s = {
    surface, w, h, margin, floors, items,
    add(markup) { inner += markup; },
    measure(str, role, size, maxW, ls = 0) {
      const r = ROLE[role];
      return Dm.wrap(str, maxW, size, { font: r.font, weight: r.weight, ls });
    },
    width(str, role, size, ls = 0) { const r = ROLE[role]; return Dm.wpx(str, size, { font: r.font, weight: r.weight, ls }); },
    text(x, y, str, { role, size, fill, maxW, ls = 0, anchor = "start", what = role, hang = 0 } = {}) {
      const r = ROLE[role];
      if (!r) throw new Error("mo_social: unknown text role " + role);
      if (!(maxW > 0)) throw new Error("mo_social: every string needs a box width (" + what + ")");
      items.push({ str, x, y, size, role, fill, maxW, ls, anchor, what, hang, font: r.font, weight: r.weight });
      inner += Dm.line(x, y, str, { size, fill, font: r.font, weight: r.weight, ls, anchor });
    },
    block(x, y, str, { role, size, fill, maxW, lh, ls = 0, maxLines = Infinity, what = role, hang = 0 } = {}) {
      const lines = s.measure(str, role, size, maxW, ls);
      if (lines.length > maxLines) throw new Error("mo_social: " + what + " wraps to " + lines.length +
        " lines at " + size + "px; the template allows " + maxLines + ". Shorten it: \"" + str + "\"");
      lines.forEach((ln, i) => s.text(i === 0 ? x - hang : x, y + i * lh, ln, { role, size, fill, maxW: i === 0 ? maxW + hang : maxW, ls, what, hang: i === 0 ? hang : 0 }));
      return { lines: lines.length, last: y + (lines.length - 1) * lh };
    },
    svg() {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
        Dm.background(w, h, { theme: "light" }) + inner + "</svg>";
    },
  };
  return s;
}

/* THE GATES, on the ledger. Throws listing every failure, not the first.
 *  fit       measured width within its box, and the box within the canvas
 *  floor     size at or over canvas.floors[surface] for its role
 *  contrast  4.5:1 against the real ground under it, wash included */
function gate(s, label) {
  const bad = [];
  let minC = Infinity;
  for (const it of s.items) {
    const wpx = s.width(it.str, it.role, it.size, it.ls);
    if (wpx > it.maxW + 0.5) bad.push(`fit: "${it.str}" is ${Math.round(wpx)}px in a ${Math.round(it.maxW)}px box (${it.what})`);
    const x0 = it.anchor === "middle" ? it.x - wpx / 2 : it.anchor === "end" ? it.x - wpx : it.x;
    const x1 = x0 + wpx, y0 = it.y - it.size * 0.78, y1 = it.y + it.size * 0.24;
    const m = s.margin == null ? 0 : s.margin * 0.5;
    // A hung opening quote is meant to sit in the margin by its own width.
    if (x0 < m - it.hang - 0.5 || x1 > s.w - m + 0.5 || y0 < 0 || y1 > s.h) bad.push(`frame: "${it.str}" leaves the canvas (${it.what})`);
    const floor = s.floors[ROLE[it.role].floor];
    if (!(floor > 0)) bad.push(`floor: no ${ROLE[it.role].floor} in canvas.floors.${s.surface}`);
    else if (it.size < floor) bad.push(`floor: "${it.str}" is ${it.size}px, under the ${floor}px ${ROLE[it.role].floor} floor (${it.what})`);
    const g = groundUnder(s.w, s.h, x0, y0, x1, y1);
    const c = contrast(it.fill, g);
    minC = Math.min(minC, c);
    if (c < 4.5) bad.push(`contrast: "${it.str}" ${it.fill} on ${g} is ${c.toFixed(2)}:1, under AA 4.5 (${it.what})`);
  }
  if (bad.length) throw new Error("mo_social: " + label + " failed " + bad.length + " gate(s):\n  " + bad.join("\n  "));
  return { strings: s.items.length, min_contrast: +minC.toFixed(2) };
}

function ringMark(x, y, px) {
  const v = px < T.raw.marks.ring_mark.crossover_px ? "small_on_light" : "on_light";
  const href = "data:image/svg+xml;base64," + fs.readFileSync(T.mark("ring_mark", v)).toString("base64");
  return `<image href="${href}" x="${x}" y="${y}" width="${px}" height="${px}"/>`;
}
function kicker(s, x, y, text, colour, maxW) {
  s.add(`<rect x="${x}" y="${y - 10}" width="70" height="3" fill="${colour}"/>`);
  s.text(x + 92, y, text, { role: "label", size: 28, fill: colour, ls: 3, maxW: maxW - 92, what: "eyebrow" });
}

// ---- output -----------------------------------------------------------------
/* PNG colour type is byte 25: 2 = RGB, 6 = RGBA, 3 = INDEXED (quantised). */
function assertTruecolour(png, label) {
  const t = png[25];
  if (t !== 2 && t !== 6) throw new Error("mo_social: " + label + " PNG colour type is " + t + ", not truecolour (2 or 6). Something passed palette or quality to sharp.");
  return t;
}
async function render(svg, out) {
  T.assertRenderClean(svg, out);
  const sharp = require("sharp");
  // density 72 and NO quality option: see mo_diagram.js render().
  const png = await sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9, palette: false }).toBuffer();
  assertTruecolour(png, out);
  fs.writeFileSync(out, png);
  return png;
}
/* A PDF with one full-page image per page, page size = pixel size in points.
 * Images go in as Flate-compressed RGB, so nothing is re-encoded lossily. */
async function pdf(pngs, out, { title = "", author = "Allan Mann" } = {}) {
  const sharp = require("sharp");
  const pages = [];
  for (const p of pngs) {
    const { data, info } = await sharp(p).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    if (info.channels !== 3) throw new Error("mo_social: pdf expects RGB pixels, got " + info.channels + " channels");
    pages.push({ data: zlib.deflateSync(data), w: info.width, h: info.height });
  }
  const buf = pdfBytes(pages, { title, author });
  fs.writeFileSync(out, buf);
  return buf;
}
function pdfBytes(pages, { title = "", author = "" } = {}) {
  const pstr = (s) => "(" + String(s).replace(/[\\()]/g, (c) => "\\" + c).replace(/[^\x20-\x7e]/g, "") + ")";
  const objs = [];            // index i holds object i+1
  const add = (o) => { objs.push(o); return objs.length; };
  const catalog = add(null), pagesId = add(null);
  const kids = [];
  for (const p of pages) {
    const img = add({ head: `<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${p.data.length} >>`, stream: p.data });
    const cs = Buffer.from(`q ${p.w} 0 0 ${p.h} 0 0 cm /Im0 Do Q`);
    const content = add({ head: `<< /Length ${cs.length} >>`, stream: cs });
    kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << /XObject << /Im0 ${img} 0 R >> >> /Contents ${content} 0 R >>`));
  }
  objs[catalog - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objs[pagesId - 1] = `<< /Type /Pages /Count ${kids.length} /Kids [${kids.map((k) => k + " 0 R").join(" ")}] >>`;
  const info = add(`<< /Title ${pstr(title)} /Author ${pstr(author)} /Producer ${pstr("mo_social.js " + VERSION)} >>`);
  const parts = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
  let off = parts[0].length;
  const xref = [];
  objs.forEach((o, i) => {
    xref.push(off);
    const chunk = typeof o === "string"
      ? Buffer.from(`${i + 1} 0 obj\n${o}\nendobj\n`, "latin1")
      : Buffer.concat([Buffer.from(`${i + 1} 0 obj\n${o.head}\nstream\n`, "latin1"), o.stream, Buffer.from("\nendstream\nendobj\n", "latin1")]);
    parts.push(chunk); off += chunk.length;
  });
  let x = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  xref.forEach((o) => { x += String(o).padStart(10, "0") + " 00000 n \n"; });
  x += `trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${off}\n%%EOF\n`;
  parts.push(Buffer.from(x, "latin1"));
  return Buffer.concat(parts);
}

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true; }
    else o._.push(argv[i]);
  }
  return o;
}
function assertSlug(slug) {
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(String(slug || ""))) throw new Error("mo_social: slug must be lower-case letters, digits, - and _, got \"" + slug + "\"");
  return slug;
}

module.exports = { VERSION, T, Dm, C, TONE, ROLE, WASH, contrast, blend, groundUnder, lum,
  assertCopy, sentence, plain, sheet, gate, ringMark, kicker, assertTruecolour, render, pdf, pdfBytes, args, assertSlug };
