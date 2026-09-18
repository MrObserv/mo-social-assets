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
 * Canonical: Brand_Design_System_v3.md, Diagram_Standard.md, design-tokens.json.
 */
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
function wpx(str, size) {
  let w = 0;
  for (const c of String(str)) {
    w += /[iIlj.,:!|']/.test(c) ? 0.30 * size
       : /[mMW]/.test(c) ? 0.92 * size
       : /[A-Z0-9]/.test(c) ? 0.66 * size
       : 0.55 * size;
  }
  return w;
}
function wrap(str, maxW, size) {
  const words = String(str).split(/\s+/);
  const lines = []; let cur = "";
  for (const wd of words) {
    const t = cur ? cur + " " + wd : wd;
    if (wpx(t, size) > maxW && cur) { lines.push(cur); cur = wd; }
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
  const lines = wrap(str, maxW, size);
  let svg = "";
  lines.forEach((ln, i) => { svg += line(x, y + i * lineH, ln, { size, fill: col, font, weight, anchor, theme }); });
  return { svg, height: lines.length * lineH, lines: lines.length };
}

function card(x, y, w, { accent = null, eyebrow = "", heading = "", body = "", pad = 28, headSize = 26, bodySize = 21, minH = 0, theme } = {}) {
  const P = palette(theme);
  const acc = accent == null ? P.teal : accent;
  const innerX = x + pad + 8;
  const innerW = w - pad * 2 - 8;
  let cy = y + pad;
  let inner = "";
  if (eyebrow) { cy += 18; inner += label(innerX, cy, eyebrow, { size: 15, fill: acc, ls: 2, theme }); cy += 16; }
  if (heading) {
    const h = paragraph(innerX, cy + headSize, heading, innerW, { size: headSize, fill: P.ink, weight: 700, lh: Math.round(headSize * 1.25), theme });
    inner += h.svg; cy += headSize + h.height - Math.round(headSize * 1.25) + 14;
  }
  if (body) {
    const b = paragraph(innerX, cy + bodySize, body, innerW, { size: bodySize, fill: P.body, lh: Math.round(bodySize * 1.45), theme });
    inner += b.svg; cy += bodySize + b.height - Math.round(bodySize * 1.45);
  }
  const natural = (cy + pad) - y;
  const h = Math.max(natural, minH);
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${P.cardBg}" stroke="${P.arrow}" stroke-opacity="${P.hairlineOpacity}" stroke-width="1"/>`;
  svg += `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${acc}"/>`;
  return { svg: svg + inner, height: h, natural };
}
function cardRow(y, w, specs, { theme } = {}) {
  const natural = specs.map((s) => card(s.x, y, w, { theme, ...s }).natural);
  const minH = Math.max(...natural);
  let svg = ""; specs.forEach((s) => { svg += card(s.x, y, w, { theme, ...s, minH }).svg; });
  return { svg, height: minH };
}

function band(x, y, w, str, { pad = 26, size = 30, fill = null, accent = null, theme } = {}) {
  const P = palette(theme);
  const col = fill == null ? P.ink : fill;
  const acc = accent == null ? P.bright : accent;
  const innerW = w - pad * 2;
  const p = paragraph(x + pad, y + pad + size, str, innerW, { size, fill: col, weight: 700, lh: Math.round(size * 1.28), theme });
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
function footer(w, h, { theme, surface = "diagram" } = {}) {
  const P = palette(theme);
  const text = T.lockupFor(surface) + "  \u00b7  MASTERINGOBSERVABILITY.COM";
  return label(w / 2, h - 34, text, { size: 16, fill: P.teal, ls: 3, anchor: "middle", theme });
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
function canvas(w, h, inner, { theme, surface } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${background(w, h, { theme })}${inner}${footer(w, h, { theme, surface })}</svg>`;
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

module.exports = {
  C, DARK, LIGHT, PALETTES, palette, setTheme, getTheme, themed,
  FONT, DISPLAY_WEIGHT, wpx, wrap, background, line, label, paragraph, card, cardRow,
  band, spectrum, arrow, footer, render, canvas,
};

if (require.main === module) {
  const argv = process.argv.slice(2);
  const o = {}; for (let i = 0; i < argv.length; i++) if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1]; i++; }
  const cmd = argv[0];
  const th = String(o.theme || "dark").toLowerCase();
  if (!PALETTES[th]) { console.error("mo_diagram: unknown theme '" + th + "' (use dark or light)"); process.exit(1); }
  const K = PALETTES[th];
  const [W, H] = T.size("diagram_concept");
  if (cmd === "concept-sample") {
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
    console.log("usage: node mo_diagram.js concept-sample [--theme dark|light] [--out file.png]");
    console.log("       node mo_diagram.js tokens        # show the assembled palettes");
  }
}
