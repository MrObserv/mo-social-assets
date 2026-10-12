#!/usr/bin/env node
/* Mastering Observability — concept / flow diagram helper
 * Companion to mo_visual_kit.js. Where mo_visual_kit renders DATA figures
 * (the bar idiom), this renders CONCEPT and FLOW diagrams: boxes, bands,
 * cards, spectrum bars, arrows — the class of diagram that embeds in blogs.
 *
 * WHY THIS EXISTS: concept diagrams used to be hand-built ad hoc, with fixed
 * strings placed by eye. Text overflowed its boxes and spacing drifted. Every
 * text element here is MEASURED and AUTO-WRAPPED so it cannot exit its box.
 * Never hand-place a fixed string in a diagram again — build it from these
 * helpers. See Diagram_Standard.md, "The text-fit rule" and "QA gate".
 *
 * ── REPOINTED TO BRAND DESIGN SYSTEM v3.2.0, 2026-09-16 ───────────────────
 *
 * This file used to carry two hardcoded palette objects. It was the last v3
 * consumer still declaring its own colour, and a diagram rendered off it was
 * live on a published post carrying the pre-v3 palette.
 *
 * It now declares NO COLOUR. Both palettes are assembled from
 * design-tokens.json at load. The fourteen mapping decisions are recorded in
 * the token file under consumers.mo_diagram_mapping — including the one that
 * needed a new token (the dark set had no border value at all) and the one Al
 * ruled personally (the old mid mint maps to teal, not teal-bright).
 *
 * Content Management scoped this as six retired hexes plus fourteen
 * undeclared. Measured against colour.retired it was ELEVEN retired: five of
 * the values they counted as undeclared were already on the retired list.
 *
 * FIVE DEFECTS FOUND WHILE REPOINTING, none of them flagged by anyone:
 *   1. render() passed density 96. sharp's default is 72, so every diagram
 *      this file ever produced came out 25 per cent oversized — the same
 *      defect that made a 1200x630 card rasterise at 1600x840.
 *   2. render() passed a PNG `quality`, which in sharp implies palette:true
 *      and quantises. Every diagram was banded, same as every card was.
 *   3. FONT.display named a non-brand display face. It was not in
 *      fonts.required, so it resolved to nothing and fell back silently —
 *      the blank-card class of defect. Named by role rather than by name
 *      here, following the estate convention for retired values. The brand
 *      display face comes from type.display.family.
 *   4. background() drew a three-stop linear gradient, a grid pattern and a
 *      glow. All three are retired by v3. Replaced by the flat ground plus
 *      the one radial wash, matching mo_visual_kit exactly.
 *   5. footer() hardcoded the house wordmark, so a diagram on a podcast
 *      surface would have carried the wrong one. Now lockupFor(surface).
 *
 * THEMES are unchanged as an API. One producer, two surfaces:
 *   theme: 'dark'   DEFAULT. Use for STANDALONE assets: OG cards, thumbnails,
 *                   social visuals, slide frames.
 *   theme: 'light'  Use for IN-BODY blog and email diagrams, so a figure does
 *                   not read as a heavy dark slab inside a light article.
 *
 * The theme is a PALETTE SWITCH and nothing else. Both themes run the exact
 * same drawing and text-fit helpers below, so there is one and only one place
 * a layout or wrapping bug can live. Do NOT hand-build a bespoke light
 * producer on top of these helpers ever again: pass theme: 'light'.
 *
 * Three equivalent ways to pick a theme, all preserved:
 *   1. per call    card(x, y, w, { theme: 'light', ... })
 *   2. per module  setTheme('light'), then call the helpers as normal
 *   3. bound API   const D = themed('light'); D.card(x, y, w, { ... })
 *
 * ── v2.0.0, 2026-10-09 (Greg's four items, Diagram_Standard.md "In-body") ──
 *   - IN-BODY CANVAS. diagram_inbody (1200 wide, stacked, one column) is the
 *     default for theme light. It is judged at the 600px email column, so
 *     every size on it is halved on screen. inbody() gives the helper set
 *     with in-body sizes, and canvas() GATES the composed SVG: on
 *     diagram_inbody any mono text under 24px, or any other text under 32px,
 *     throws. Published diagrams are not re-rendered (Al, 2026-10-05).
 *   - card() takes eyebrowSize; footer() takes size, anchor and margin. Both
 *     were fixed at 15 and 16px, under every floor this estate has.
 *   - The accent bar is clipped to the card's own rounded shape. It was a
 *     separate rounded rect, so it notched every corner it touched.
 *   - band() takes align: 'start' (default) or 'middle'.
 *   - wpx() measures from per-face advance tables taken from the repo fonts,
 *     plus letter-spacing. The old four-bucket estimate over-read DM Sans by
 *     10 to 15 per cent and under-read Space Mono lowercase. A 2 per cent
 *     margin keeps wrapping on the generous side.
 *
 * Canonical: Brand_Design_System_v3.md, Diagram_Standard.md, design-tokens.json.
 */
const MO_DIAGRAM_VERSION = "2.0.0";
const sharp = require("sharp");
const fs = require("fs");
const T = require("./mo-tokens.js");

/* Gate 1 — this file's own source. Runs at load, so a retired hex cannot be
 * reintroduced by an edit and survive to a render. Note it scans COMMENTS
 * too, which is why every retired value above is named by role rather than
 * written as a hex: documenting one would fail the gate. */
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_diagram.js");

/* ---------- palettes, ASSEMBLED FROM TOKENS ----------
 * Key names are unchanged from the hardcoded version so every existing caller
 * keeps working: K.teal, K.green, K.amber, K.bright, K.ink, K.grey all still
 * resolve. Only the values moved, and they now come from one place.
 *
 * `grid` and `glow` are deliberately ABSENT rather than repointed. The faint
 * mint grid is retired outright (Al, 2026-09-11) and the glow is now the
 * standard radial wash, drawn by background() from structure.wash. */
const D = T.dark, L = T.light;
const WASH = T.structure.wash;

const DARK = {
  key: "dark",
  navy: D["dark-ground"], navy2: D["dark-motif"], navy3: D["dark-panel"],
  bg1: D["dark-ground"], bg2: D["dark-motif"], bg3: D["dark-panel"],
  cardBg: D["dark-panel"], bandBg: D["dark-motif"],
  teal: D["teal"], mint: D["teal"], bright: D["teal-bright"],
  // The dark set has no pure-white token; headings on dark are white, body
  // text is on-dark-body. greyMute folded into on-dark-soft — a second grey
  // one step away was a distinction without a difference.
  ink: "#FFFFFF", grey: D["on-dark-soft"], greyMute: D["on-dark-soft"],
  body: D["on-dark-body"],
  green: D["semantic-low"],
  amber: D["semantic-high"],
  arrow: D["dark-border"],
  wash: WASH.dark,
  hairlineOpacity: 0.5, bandStrokeOpacity: 0.55,
};
const LIGHT = {
  key: "light",
  navy: L["panel"], navy2: L["panel"], navy3: L["tint"],
  bg1: L["panel"], bg2: L["panel"], bg3: L["ground"],
  // A card sits ON the ground, so it is panel. tint is a field, not a card.
  cardBg: L["panel"], bandBg: L["tint"],
  teal: L["teal-deep"], mint: L["teal"], bright: L["teal-deep"],
  ink: L["ink"], grey: L["soft"], greyMute: L["soft"],
  body: L["muted"],
  green: L["semantic-low"],
  amber: L["semantic-high"],
  arrow: L["border"],
  wash: WASH.light,
  hairlineOpacity: 1, bandStrokeOpacity: 0.9,
};
const PALETTES = { dark: DARK, light: LIGHT };
/* Historical export. `C` has always meant the dark palette; it still does, so
 * every existing `const { C } = require('./mo_diagram.js')` keeps working. */
const C = DARK;

let ACTIVE = "dark";
function setTheme(name) {
  if (!PALETTES[name]) throw new Error("mo_diagram: unknown theme '" + name + "' (use 'dark' or 'light')");
  ACTIVE = name;
  return PALETTES[name];
}
function getTheme() { return ACTIVE; }
function palette(t) {
  if (t && typeof t === "object") return t;      // a palette object passed straight in
  return PALETTES[t] || PALETTES[ACTIVE] || DARK;
}

/* Brand faces, from the token file. display previously named a non-brand face
 * that resolved to nothing and fell back silently. The fallbacks after the
 * brand name exist so a missing face degrades visibly rather than dropping
 * text. */
const FONT = {
  display: "'" + T.type.display.family + "','Liberation Sans',sans-serif",
  body: "'" + T.type.body.family + "','Liberation Sans','DejaVu Sans',sans-serif",
  mono: "'" + T.type.label.family + "','DejaVu Sans Mono','Noto Sans Mono',monospace",
};
const DISPLAY_WEIGHT = T.type.display.weight;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

/* ---------- MEASURE + WRAP (the whole point of this file) ----------
 * Theme-independent by design and UNCHANGED by the repoint. Both themes share
 * these, so text fit can never diverge between the dark asset and the light
 * in-body render. */
const METRICS = {
  // Advance widths per 1000 em for ASCII 32..126, measured 2026-10-09 from
  // the repo's own 06_Brand_Assets/fonts/*.ttf (the faces the renderer uses).
  body400: [266,250,291,804,580,786,734,159,373,373,480,550,182,541,198,392,684,312,576,591,607,610,628,534,608,628,202,227,550,550,550,524,1005,664,603,717,688,565,535,758,681,234,501,584,527,841,691,774,580,774,594,580,561,655,669,968,603,580,541,314,392,314,622,660,213,544,626,572,627,568,340,558,575,240,243,504,223,891,574,593,626,627,370,502,392,573,527,763,496,556,458,427,234,427,550],
  body700: [235,309,367,857,604,902,781,197,405,405,513,579,246,576,252,427,704,364,577,603,650,622,634,537,633,635,254,278,579,579,579,538,1046,709,638,738,707,583,556,778,714,272,541,653,558,886,729,784,614,784,631,604,597,685,706,1018,670,635,577,377,427,377,677,725,235,586,655,607,655,602,371,596,618,274,274,578,267,941,617,610,655,655,409,532,433,616,565,820,571,604,490,470,272,470,579],
  display800: [291,301,462,730,647,897,752,242,369,369,453,609,283,388,283,415,685,405,599,603,700,607,649,632,669,649,283,283,609,609,609,597,1036,786,769,730,826,672,642,770,806,339,557,752,610,954,806,846,737,846,740,647,635,786,766,1184,737,693,679,389,415,389,610,500,600,628,695,603,698,642,406,705,696,313,320,677,313,1045,696,666,695,695,443,547,447,692,620,956,619,620,556,414,314,414,609],
  mono700: [612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612,612],
};
const WPX_MARGIN = 1.02;
/* Which advance table a font + weight resolves to. Anything unrecognised
 * falls to the WIDEST table that could apply, so an unknown face over-reads
 * rather than clips. */
function faceOf(font, weight) {
  const f = String(font || FONT.body);
  if (f === FONT.mono || /mono/i.test(f)) return "mono700";
  if (f === FONT.display || f.indexOf(T.type.display.family) > -1) return "display800";
  return Number(weight) >= 600 ? "body700" : "body400";
}
/* Width in px of str at size. opts: { font, weight, ls } or a face key.
 * Called with (str, size) only, it measures DM Sans Regular, the body face. */
function wpx(str, size, opts = {}) {
  const face = typeof opts === "string" ? opts : faceOf(opts.font, opts.weight);
  const tbl = METRICS[face];
  const ls = (typeof opts === "object" && opts.ls) || 0;
  let w = 0, n = 0;
  for (const c of String(str)) {
    const i = c.charCodeAt(0) - 32;
    // Outside ASCII (middots, curly quotes, accents): the table's widest glyph.
    w += (i >= 0 && i < tbl.length ? tbl[i] : Math.max.apply(null, tbl)) * size / 1000;
    n++;
  }
  return (w + Math.max(0, n - 1) * ls) * WPX_MARGIN;
}
function wrap(str, maxW, size, opts = {}) {
  const words = String(str).split(/\s+/);
  const lines = []; let cur = "";
  for (const wd of words) {
    const t = cur ? cur + " " + wd : wd;
    if (wpx(t, size, opts) > maxW && cur) { lines.push(cur); cur = wd; }
    else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

/* Flat ground + ONE radial teal wash, both modes, opacity from the token
 * file. Replaces the three-stop gradient, the grid pattern and the separate
 * glow, all of which v3 retired. Matches mo_visual_kit's bgDefs so a diagram
 * and a card read as one system. */
function background(w, h, { theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  return `<defs>
    <radialGradient id="wash-${k}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${P.mint}" stop-opacity="${P.wash}"/><stop offset="0.7" stop-color="${P.mint}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${P.bg1}"/>
  <ellipse cx="${w / 2}" cy="${h * 0.42}" rx="${h * 0.7}" ry="${h * 0.7}" fill="url(#wash-${k})"/>`;
}

function line(x, y, str, { size = 22, fill = null, font = FONT.body, weight = 400, ls = 0, anchor = "start", italic = false, theme } = {}) {
  const col = fill == null ? palette(theme).ink : fill;
  return `<text x="${x}" y="${y}" font-family=${ff(font)} font-size="${size}" fill="${col}" font-weight="${weight}" letter-spacing="${ls}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ""}>${esc(str)}</text>`;
}
function label(x, y, str, { size = 20, fill = null, ls = 3, anchor = "start", theme } = {}) {
  const col = fill == null ? palette(theme).bright : fill;
  return line(x, y, str, { size, fill: col, font: FONT.mono, weight: 700, ls, anchor, theme });
}
function paragraph(x, y, str, maxW, { size = 22, fill = null, font = FONT.body, weight = 400, lh = null, anchor = "start", theme } = {}) {
  const col = fill == null ? palette(theme).ink : fill;
  const lineH = lh || Math.round(size * 1.4);
  const lines = wrap(str, maxW, size, { font, weight });
  let svg = "";
  lines.forEach((ln, i) => { svg += line(x, y + i * lineH, ln, { size, fill: col, font, weight, anchor, theme }); });
  return { svg, height: lines.length * lineH, lines: lines.length };
}

let CLIP_N = 0;
function card(x, y, w, { accent = null, eyebrow = "", heading = "", body = "", pad = 28, headSize = 26, bodySize = 21, eyebrowSize = 15, minH = 0, radius = 14, theme } = {}) {
  const P = palette(theme);
  const acc = accent == null ? P.teal : accent;
  const innerX = x + pad + 8;
  const innerW = w - pad * 2 - 8;
  let cy = y + pad;
  let inner = "";
  // The eyebrow sits on its own baseline: cap height above, one gap below.
  if (eyebrow) { cy += Math.round(eyebrowSize * 1.2); inner += label(innerX, cy, eyebrow, { size: eyebrowSize, fill: acc, ls: 2, theme }); cy += Math.round(eyebrowSize * 1.07); }
  if (heading) {
    const h = paragraph(innerX, cy + headSize, heading, innerW, { size: headSize, fill: P.ink, weight: 700, lh: Math.round(headSize * 1.25), theme });
    inner += h.svg; cy += headSize + h.height - Math.round(headSize * 1.25) + Math.max(14, Math.round(headSize * 0.45));
  }
  if (body) {
    const b = paragraph(innerX, cy + bodySize, body, innerW, { size: bodySize, fill: P.body, lh: Math.round(bodySize * 1.45), theme });
    inner += b.svg; cy += bodySize + b.height - Math.round(bodySize * 1.45);
  }
  const natural = (cy + pad) - y;
  const h = Math.max(natural, minH);
  // The accent bar is CLIPPED to the card's own shape, so it follows the
  // corner radius. As a separate rounded rect it notched every corner.
  const cid = "cc" + (++CLIP_N);
  let svg = `<defs><clipPath id="${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}"/></clipPath></defs>`;
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${P.cardBg}"/>`;
  svg += `<rect x="${x}" y="${y}" width="6" height="${h}" fill="${acc}" clip-path="url(#${cid})"/>`;
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="none" stroke="${P.arrow}" stroke-opacity="${P.hairlineOpacity}" stroke-width="1"/>`;
  return { svg: svg + inner, height: h, natural };
}
function cardRow(y, w, specs, { theme } = {}) {
  const natural = specs.map((s) => card(s.x, y, w, { theme, ...s }).natural);
  const minH = Math.max(...natural);
  let svg = ""; specs.forEach((s) => { svg += card(s.x, y, w, { theme, ...s, minH }).svg; });
  return { svg, height: minH };
}

function band(x, y, w, str, { pad = 26, size = 30, fill = null, accent = null, align = "start", theme } = {}) {
  if (align !== "start" && align !== "middle") throw new Error("mo_diagram: band align must be 'start' or 'middle', got '" + align + "'");
  const P = palette(theme);
  const col = fill == null ? P.ink : fill;
  const acc = accent == null ? P.bright : accent;
  const innerW = w - pad * 2;
  const tx = align === "middle" ? x + w / 2 : x + pad;
  const p = paragraph(tx, y + pad + size, str, innerW, { size, fill: col, weight: 700, lh: Math.round(size * 1.28), anchor: align, theme });
  const h = pad * 2 + size + (p.height - Math.round(size * 1.28)) + 4;
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${P.bandBg}" stroke="${acc}" stroke-opacity="${P.bandStrokeOpacity}" stroke-width="1.5"/>`;
  return { svg: svg + p.svg, height: h };
}

function spectrum(x, y, w, { h = 18, lowLabel = "", highLabel = "", size = 16, theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  let svg = `<defs><linearGradient id="spec-${k}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${P.green}"/><stop offset="1" stop-color="${P.amber}"/>
    </linearGradient></defs>`;
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#spec-${k})"/>`;
  if (lowLabel) svg += label(x, y + h + size + 8, lowLabel, { size, fill: P.green, ls: 2, theme });
  if (highLabel) svg += label(x + w, y + h + size + 8, highLabel, { size, fill: P.amber, ls: 2, anchor: "end", theme });
  return svg;
}

function arrow(x1, y1, x2, y2, { color = null, width = 2.4, theme } = {}) {
  const P = palette(theme), k = P.key || "dark";
  const col = color == null ? P.arrow : color;
  return `<defs><marker id="ah-${k}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="${col}"/></marker></defs>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${width}" marker-end="url(#ah-${k})"/>`;
}

/* The wordmark is RESOLVED, never typed. This used to hardcode the house
 * lockup, so a diagram built for a podcast surface would have carried the
 * wrong brand. Surface defaults to 'diagram', which is house lane. */
function footer(w, h, { theme, surface = "diagram", size = 16, anchor = "middle", margin = 60 } = {}) {
  const P = palette(theme);
  const text = T.lockupFor(surface) + "  \u00b7  MASTERINGOBSERVABILITY.COM";
  const x = anchor === "start" ? margin : anchor === "end" ? w - margin : anchor === "middle" ? w / 2 : null;
  if (x === null) throw new Error("mo_diagram: footer anchor must be start, middle or end, got '" + anchor + "'");
  if (wpx(text, size, { font: FONT.mono, ls: 3 }) > w - 2 * margin) throw new Error("mo_diagram: footer at " + size + "px does not fit " + w + "px less margins");
  return label(x, h - Math.max(34, Math.round(size * 1.7)), text, { size, fill: P.teal, ls: 3, anchor, theme });
}
/* Height of the footer band, so a fitted canvas leaves room for it. */
function footerBand(size = 16) { return Math.max(34, Math.round(size * 1.7)) + size + 34; }

/* FLOOR GATE, on the composed SVG. Reads every <text> element actually
 * emitted, so a bespoke line() that bypasses the helpers is still caught.
 * Floors come from the canvas entry's note in design-tokens.json. */
function floorsFor(name) {
  const f = (T.raw.canvas.floors || {})[name];
  return f || null;
}
function assertFloors(svg, name) {
  const f = floorsFor(name);
  if (!f) return 0;
  const re = /<text\b[^>]*font-family=("[^"]*"|'[^']*')[^>]*font-size="([0-9.]+)"[^>]*>([^<]*)</g;
  let m, n = 0; const bad = [];
  while ((m = re.exec(svg))) {
    n++;
    const mono = /mono/i.test(m[1]);
    const floor = mono ? f.label_px : f.text_px;
    if (Number(m[2]) < floor) bad.push((mono ? "mono " : "text ") + m[2] + "px < " + floor + ': "' + m[3].slice(0, 40) + '"');
  }
  if (bad.length) throw new Error("mo_diagram: " + name + " floor gate, " + bad.length + " string(s) below floor:\n  " + bad.join("\n  "));
  return n;
}

async function render(svg, out) {
  /* Gate 2 — the COMPOSED RENDER. assertNoRetired reads source; this decodes
   * every data: URI and scans the payload, so the thing checked is the thing
   * that ships. Inside render() so it cannot be skipped. */
  T.assertRenderClean(svg, out);
  /* density 72, NOT 96. sharp's default is 72; passing 96 scaled every
   * unitless SVG dimension by 96/72, so every diagram came out 25 per cent
   * oversized. Measured 2026-09-16.
   *
   * NO `quality` option. In sharp, quality on a PNG implies palette:true,
   * which quantises and bands a gradient. Same defect that banded every card
   * until 09-15. Acceptance is colour type, not file size: read byte 25. */
  await sharp(Buffer.from(svg), { density: 72 })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log("written:", out);
}
/* canvas(w, h, inner, { canvas, fitTo, footerSize, ... })
 *   canvas  token canvas name; 'diagram_inbody' turns the floor gate on.
 *   fitTo   y of the content's bottom edge. The frame is trimmed to it plus
 *           the footer band, and THROWS if that exceeds h: a stacked in-body
 *           diagram that outgrows its frame is too much diagram. */
function canvas(w, h, inner, { theme, surface, canvas: cname = null, fitTo = null, footerSize, footerAnchor } = {}) {
  const fs_ = footerSize || (cname && floorsFor(cname) ? floorsFor(cname).label_px : 16);
  let H = h;
  if (fitTo != null) {
    H = Math.ceil(fitTo + footerBand(fs_));
    if (H > h) throw new Error("mo_diagram: content ends at y" + fitTo + "; with the footer band it needs " + H + "px, over the " + h + "px frame");
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}">${background(w, H, { theme })}${inner}${footer(w, H, { theme, surface, size: fs_, anchor: footerAnchor || "middle" })}</svg>`;
  if (cname) assertFloors(svg, cname);
  return svg;
}

/* Bound API: `const D = themed('light')` gives the whole helper set with the
 * theme pre-applied, so a build script never repeats `theme:` on every call.
 * It binds THESE functions, it does not copy them. */
function themed(t) {
  const P = palette(t);
  const inj = (o) => Object.assign({}, o, { theme: (o && o.theme) || t });
  return {
    theme: t, C: P, P, FONT, wpx, wrap, render,
    background: (w, h, o) => background(w, h, inj(o)),
    line: (x, y, s, o) => line(x, y, s, inj(o)),
    label: (x, y, s, o) => label(x, y, s, inj(o)),
    paragraph: (x, y, s, mw, o) => paragraph(x, y, s, mw, inj(o)),
    card: (x, y, w, o) => card(x, y, w, inj(o)),
    cardRow: (y, w, specs, o) => cardRow(y, w, specs, inj(o)),
    band: (x, y, w, s, o) => band(x, y, w, s, inj(o)),
    spectrum: (x, y, w, o) => spectrum(x, y, w, inj(o)),
    arrow: (x1, y1, x2, y2, o) => arrow(x1, y1, x2, y2, inj(o)),
    footer: (w, h, o) => footer(w, h, inj(o)),
    canvas: (w, h, inner, o) => canvas(w, h, inner, inj(o)),
  };
}

/* In-body helper set: themed(t) with in-body DEFAULT sizes. Caller values
 * still win, and the canvas floor gate catches any that go under. */
function inbody(t = "light") {
  const B = themed(t);
  const f = floorsFor("diagram_inbody");
  if (!f) throw new Error("mo_diagram: design-tokens.json has no canvas.floors.diagram_inbody");
  const L = f.label_px, X = f.text_px;
  const d = (def) => (o) => Object.assign({}, def, o || {});
  const [IW, IH] = T.size("diagram_inbody");
  return Object.assign({}, B, {
    W: IW, H: IH, floors: f,
    line: (x, y, s, o) => B.line(x, y, s, d({ size: X })(o)),
    label: (x, y, s, o) => B.label(x, y, s, d({ size: L })(o)),
    paragraph: (x, y, s, mw, o) => B.paragraph(x, y, s, mw, d({ size: X })(o)),
    card: (x, y, w, o) => B.card(x, y, w, d({ pad: 40, eyebrowSize: L, headSize: 40, bodySize: X })(o)),
    cardRow: (y, w, specs, o) => B.cardRow(y, w, specs.map((s) => Object.assign({ pad: 40, eyebrowSize: L, headSize: 40, bodySize: X }, s)), o),
    band: (x, y, w, s, o) => B.band(x, y, w, s, d({ size: 40, pad: 36 })(o)),
    spectrum: (x, y, w, o) => B.spectrum(x, y, w, d({ size: L, h: 24 })(o)),
    footer: (w, h, o) => B.footer(w, h, d({ size: L })(o)),
    canvas: (w, h, inner, o) => B.canvas(w, h, inner, d({ canvas: "diagram_inbody" })(o)),
  });
}

module.exports = {
  C, DARK, LIGHT, PALETTES, palette, setTheme, getTheme, themed, inbody,
  FONT, DISPLAY_WEIGHT, METRICS, faceOf, wpx, wrap, background, line, label, paragraph, card, cardRow,
  band, spectrum, arrow, footer, footerBand, assertFloors, render, canvas, MO_DIAGRAM_VERSION,
};

if (require.main === module) {
  const argv = process.argv.slice(2);
  const o = {}; for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1]; i++; }
  const cmd = argv[0];
  const th = String(o.theme || "dark").toLowerCase();
  if (!PALETTES[th]) { console.error("mo_diagram: unknown theme '" + th + "' (use dark or light)"); process.exit(1); }
  const K = PALETTES[th];
  const cv = o.canvas || (th === "light" ? "inbody" : "concept");
  if (cv !== "inbody" && cv !== "concept") { console.error("mo_diagram: --canvas inbody|concept"); process.exit(1); }
  const [W, H] = T.size(cv === "inbody" ? "diagram_inbody" : "diagram_concept");
  if (cmd === "concept-sample" && cv === "inbody") {
    // The in-body default: ONE stacked column, judged at the 600px email column.
    const I = inbody(th), x0 = 60, fullW = W - 120;
    let inner = "", y = 70;
    inner += I.label(x0, y, "DIAGRAM STANDARD"); y += 30;
    const t = I.paragraph(x0, y + 48, "Measured, never hand-placed", fullW, { size: 48, weight: 700, font: FONT.display, lh: 58 });
    inner += t.svg; y += 48 + t.height - 58 + 26;
    const sub = I.paragraph(x0, y + 32, "Every string wraps to its box, read at the email column.", fullW, { fill: K.grey });
    inner += sub.svg; y += 32 + sub.height - 45 + 40;
    inner += I.spectrum(x0, y, fullW, { lowLabel: "SAFE TO AUTOMATE", highLabel: "DECIDE BY HAND" }); y += 24 + 24 + 8 + 40;
    [[K.green, "LOW BLAST RADIUS", "Automate the action", "Reversible, well-scoped changes. Let the system act and log it."],
     [K.amber, "HIGH BLAST RADIUS", "Human in the loop", "Wide, hard-to-reverse changes. A named person makes the call."]].forEach(([acc, e, hd, b]) => {
      const c = I.card(x0, y, fullW, { accent: acc, eyebrow: e, heading: hd, body: b });
      inner += c.svg; y += c.height + 24;
    });
    const b = I.band(x0, y + 6, fullW, "Automate the action. Never the accountability.", { align: "middle" });
    inner += b.svg; y += 6 + b.height;
    render(I.canvas(W, H, inner, { fitTo: y + 10 }), o.out || "concept_sample_inbody.png");
  } else if (cmd === "concept-sample") {
    const x0 = 60, colW = 340, gap = 30, fullW = W - 120;
    let inner = "";
    inner += label(x0, 74, "DIAGRAM STANDARD", { size: 20, fill: K.bright, ls: 3, theme: th });
    inner += line(x0, 116, "Auto-wrap in action: this text is measured, never hand-placed", { size: 26, fill: K.ink, weight: 700, theme: th });
    inner += line(x0, 148, "Every string wraps to its box. Nothing overflows. That is the whole rule.", { size: 18, fill: K.grey, theme: th });
    inner += spectrum(x0, 186, fullW, { lowLabel: "SAFE TO AUTOMATE", highLabel: "DECIDE BY HAND", theme: th });
    const row = cardRow(250, colW, [
      { x: x0, accent: K.green, eyebrow: "LOW BLAST RADIUS", heading: "Automate the action", body: "Reversible, well-scoped changes. Let the system act and log it." },
      { x: x0 + colW + gap, accent: K.amber, eyebrow: "HIGH BLAST RADIUS", heading: "Human in the loop", body: "Wide, hard-to-reverse changes. A named person makes the call." },
      { x: x0 + 2 * (colW + gap), accent: K.teal, eyebrow: "ALWAYS", heading: "Own the outcome", body: "Automation moves the work, never the responsibility for it." },
    ], { theme: th });
    inner += row.svg;
    const b = band(x0, 250 + row.height + 30, fullW, "Automate the action. Never automate the accountability.", { theme: th });
    inner += b.svg;
    render(canvas(W, H, inner, { theme: th }), o.out || (th === "dark" ? "concept_sample.png" : "concept_sample_light.png"));
  } else if (cmd === "tokens") {
    console.log("mo_diagram declares no colour. Palettes assembled from design-tokens.json " + T.version + ".");
    ["dark", "light"].forEach((k) => {
      console.log("\n" + k + ":");
      Object.entries(PALETTES[k]).forEach(([n, v]) => console.log("  " + n.padEnd(18) + v));
    });
  } else {
    console.log("usage: node mo_diagram.js concept-sample [--theme dark|light] [--canvas inbody|concept] [--out file.png]");
    console.log("       light defaults to --canvas inbody (stacked, 600px column); dark to concept");
    console.log("       node mo_diagram.js tokens        # show the assembled palettes");
  }
}
