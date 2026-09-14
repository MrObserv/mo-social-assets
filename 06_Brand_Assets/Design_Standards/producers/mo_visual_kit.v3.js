#!/usr/bin/env node
/* Mastering Observability — visual template kit (v3)
 * Commands: blogthumb | ytthumb | bookends | diagram-sample
 *
 * REPOINTED to Brand Design System v3.1.0, 2026-09-12.
 * This file contains NO colour values and NO canvas sizes. Everything comes
 * from design-tokens.json via mo-tokens.js. If a value you need is not in
 * the token file, that is a CR — not a local definition.
 *
 * MODE RULE (Al, 2026-09-14): writing renders light, everything else dark.
 * A card fronting written material uses the website palette, so the card and
 * the page it opens are one surface. og_card is dual-mode with LIGHT as the
 * default; --mode dark is the exception for an OG card fronting a non-writing
 * asset. Neither the default nor the permitted variant is decided in this
 * file — both come from the token file.
 *
 * Token map from the pre-v3 file: MIGRATION_v3.1.0.md §1a.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const T = require("./mo-tokens.js");

// The build fails if a retired hex is anywhere in this file. This is what
// makes the single-source rule real rather than aspirational.
T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_visual_kit.js");

const BRAND_DIR = process.env.MO_BRAND_DIR || path.resolve(__dirname, "..", "..");
const WHITE = "#ffffff"; // not a brand token; the absence of ink
const px = (v) => parseFloat(String(v));

/* Resolve a surface into everything that draws it. Nothing below this
 * function knows whether it is drawing light or dark. */
function surface(name, override) {
  const mode = override || T.modeFor(name);
  const P = T.mode(mode);
  const dark = mode === "dark";
  return {
    mode, dark,
    ground:  dark ? P["dark-ground"] : P["ground"],
    panel:   dark ? P["dark-panel"]  : P["panel"],
    motif:   dark ? P["dark-motif"]  : P["hairline"],
    // Two-step accent, 2.03x apart. Primary carries the eyebrow and the
    // payoff; secondary carries rules and underlines.
    accent:  dark ? P["teal-bright"] : P["teal-deep"],
    accent2: P["teal"],
    // Filled chip that white text sits on. teal-deep is the only brand teal
    // white clears on (6.54:1); it currently lives in the light set only.
    // OWED CR: promote teal-deep to a shared token — it is one teal ramp.
    badge:   T.light["teal-deep"],
    ink:     dark ? WHITE : P["ink"],
    body:    dark ? P["on-dark-body"] : P["muted"],
    soft:    dark ? P["on-dark-soft"] : P["soft"],
    rule:    dark ? P["on-dark-body"] : P["border"],
    ruleOpacity: dark ? 0.22 : 1,
    high:    P["semantic-high"],
    low:     P["semantic-low"],
    logo:    dark ? "logo-on-dark.svg" : "logo-on-light.svg",
  };
}

const FONT = {
  display: "'" + T.type.display.family + "','Liberation Sans',sans-serif",
  body:    "'" + T.type.body.family + "','Liberation Sans','DejaVu Sans',sans-serif",
  mono:    "'" + T.type.label.family + "','DejaVu Sans Mono','Noto Sans Mono',monospace",
};
const DISPLAY_WEIGHT = T.type.display.weight; // 900. Archivo Black is retired.

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const b64 = (p) => fs.readFileSync(p).toString("base64");
const mime = (p) => (p.endsWith(".svg") ? "image/svg+xml" : p.endsWith(".png") ? "image/png" : "image/jpeg");
const imgHref = (p) => `data:${mime(p)};base64,${b64(p)}`;
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

/* Flat ground + ONE radial teal wash. The three-stop navy gradient and the
 * faint mint grid are both retired (ratified reversal, 2026-09-11). */
function bgDefs(S, w, h, glowCx, glowCy) {
  const op = S.dark ? 0.20 : 0.12;
  return `<defs>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="${S.accent2}" stop-opacity="${op}"/><stop offset="0.7" stop-color="${S.accent2}" stop-opacity="0"/>
  </radialGradient></defs>
  <rect width="${w}" height="${h}" fill="${S.ground}"/>
  <ellipse cx="${glowCx}" cy="${glowCy === undefined ? h / 2 : glowCy}" rx="${h * 0.68}" ry="${h * 0.68}" fill="url(#glow)"/>`;
}

function monoLabel(x, y, text, size, fill, anchor = "start", ls = 4) {
  return `<text x="${x}" y="${y}" font-family=${ff(FONT.mono)} font-size="${size}" fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}" font-weight="${T.type.label.weight}">${esc(text)}</text>`;
}
/* The v3 kicker: a 70px rule, then mono caps. Same object on every surface. */
function kicker(x, y, text, size, ruleColour, textColour) {
  return `<rect x="${x}" y="${y - 8}" width="70" height="2" fill="${ruleColour}"/>` +
         monoLabel(x + 92, y, text, size, textColour);
}
function wrapLines(text, maxChars) {
  const words = String(text).split(/\s+/); const lines = []; let cur = "";
  for (const w of words) { if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }
  if (cur) lines.push(cur); return lines;
}
async function renderPng(svg, out, quality) {
  await sharp(Buffer.from(svg), { density: 96 }).png({ quality: quality || 90 }).toFile(out);
  console.log("written:", out);
}

/* ---------- BLOG / OG CARD — light under v3 ---------- */
async function blogthumb(opts) {
  const S = surface("og_card", T.variantFor("og_card", opts.mode));
  const [W, H] = T.size("og_card");
  const eyebrow = opts.eyebrow || "THE OBSERVABILITY DIGEST";
  const lines = wrapLines(opts.title || "Untitled", 24);
  const sub = opts.sub || "";
  const titleSize = lines.length >= 3 ? 64 : 76;
  const startY = H / 2 - ((lines.length - 1) * (titleSize * 1.12)) / 2 + (sub ? -20 : 10);
  const logo = imgHref(path.join(BRAND_DIR, S.logo));
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(S, W, H, W / 2, 0);
  svg += kicker(60, 66, eyebrow, 19, S.accent2, S.accent);
  lines.forEach((ln, i) => {
    svg += `<text x="60" y="${startY + i * titleSize * 1.12}" font-family=${ff(FONT.display)} font-size="${titleSize}" font-weight="${DISPLAY_WEIGHT}" letter-spacing="-2" fill="${S.ink}">${esc(ln)}</text>`;
  });
  if (sub) svg += `<text x="60" y="${startY + lines.length * titleSize * 1.12 + 8}" font-family=${ff(FONT.body)} font-size="26" fill="${S.body}">${esc(sub)}</text>`;
  svg += `<line x1="60" y1="${H - 78}" x2="${W - 60}" y2="${H - 78}" stroke="${S.rule}" stroke-opacity="${S.ruleOpacity}" stroke-width="1"/>`;
  svg += monoLabel(60, H - 44, T.lockupFor("blog_og"), 17, S.soft);
  svg += monoLabel(W - 128, H - 44, "MASTERINGOBSERVABILITY.COM", 17, S.accent, "end");
  svg += `<image href="${logo}" x="${W - 104}" y="${H - 66}" width="44" height="44"/>`;
  svg += `</svg>`;
  await renderPng(svg, opts.out || "blog_thumbnail.png");
}

/* ---------- YOUTUBE THUMBNAIL — dark, it sits in YouTube's chrome ---------- */
async function gradedImg(p) {
  const buf = await sharp(p).modulate({ saturation: 0.78, brightness: 0.95 }).png().toBuffer();
  return "data:image/png;base64," + buf.toString("base64");
}
async function ytthumb(opts) {
  const S = surface("youtube_thumbnail");
  const [W, H] = T.size("youtube_thumbnail");
  const badge = opts.badge || "SIGNAL DROP";
  const lines = wrapLines((opts.title || "UNTITLED").toUpperCase(), 12);
  const sub = opts.sub || "";
  const headshot = opts.headshot ? await gradedImg(opts.headshot) : null;
  const titleSize = lines.length >= 3 ? 78 : 92;
  const startY = H / 2 - ((lines.length - 1) * (titleSize * 1.06)) / 2 + 20;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(S, W, H, 380);
  if (headshot) {
    svg += `<defs><linearGradient id="fade" x1="640" y1="0" x2="940" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <mask id="hsmask"><rect x="640" y="0" width="${W - 640}" height="${H}" fill="url(#fade)"/></mask></defs>`;
    svg += `<image href="${headshot}" x="640" y="0" width="${W - 640}" height="${H}" preserveAspectRatio="xMidYMid slice" mask="url(#hsmask)"/>`;
  }
  // Podcast lane carries METRICS & MAYHEM; the token file decides, not this file.
  svg += monoLabel(56, 70, T.lockupFor("youtube_thumbnail"), 24, S.ink, "start", 5);
  const bw = badge.length * 16 + 36;
  svg += `<rect x="56" y="92" width="${bw}" height="42" rx="${px(T.structure.radius.button)}" fill="${S.badge}"/>`;
  svg += `<text x="${56 + bw / 2}" y="120" font-family=${ff(FONT.mono)} font-size="20" font-weight="700" fill="${WHITE}" letter-spacing="3" text-anchor="middle">${esc(badge)}</text>`;
  lines.forEach((ln, i) => {
    svg += `<text x="56" y="${startY + i * titleSize * 1.06}" font-family=${ff(FONT.display)} font-size="${titleSize}" font-weight="${DISPLAY_WEIGHT}" letter-spacing="-2.5" fill="${S.ink}">${esc(ln)}</text>`;
  });
  if (sub) svg += `<text x="56" y="${startY + (lines.length - 1) * titleSize * 1.06 + 56}" font-family=${ff(FONT.body)} font-size="30" font-weight="600" fill="${S.accent}">${esc(sub)}</text>`;
  svg += `<rect x="56" y="${H - 88}" width="160" height="6" fill="${S.accent2}"/>`;
  svg += `</svg>`;
  await renderPng(svg, opts.out || "yt_thumbnail.png");
}

/* ---------- VERTICAL BOOKENDS — retired, kept so old calls fail loudly ---------- */
async function bookends() {
  console.error("DEPRECATED: bookends is retired per Codex 19.7 (v1.9.20).");
  console.error("Use: python3 00_Command_Center/thumbnail_builder.py --bookends-only --episode N --title ... --slug <slug> --outdir <episode folder> --ship");
  process.exit(2);
}

/* ---------- DIAGRAM STARTER ---------- */
async function diagramSample(opts) {
  const [W, H] = T.size("diagram_figure");
  for (const name of ["diagram_concept", "youtube_thumbnail"]) {
    const S = surface(name);
    const data = [["2023", 32], ["2024", 41], ["2025", 54], ["2026", 67]];
    const ox = 250, pw = 1270, oy = 250, ph = 590, maxV = 100;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
    svg += `<rect width="${W}" height="${H}" fill="${S.dark ? S.ground : S.panel}"/>`;
    svg += `<text x="${ox}" y="150" font-family=${ff(FONT.body)} font-size="44" font-weight="700" fill="${S.ink}">Sample figure: the brand bar idiom</text>`;
    for (let v = 0; v <= maxV; v += 25) {
      const y = oy + ph - (v / maxV) * ph;
      svg += `<line x1="${ox}" y1="${y}" x2="${ox + pw}" y2="${y}" stroke="${v === 0 ? S.rule : S.motif}" stroke-width="${v === 0 ? 2.4 : 1.6}"/>`;
      svg += `<text x="${ox - 26}" y="${y + 8}" font-family=${ff(FONT.body)} font-size="23" fill="${S.soft}" text-anchor="end">${v}%</text>`;
    }
    const bw = 180, gap = (pw - data.length * bw) / (data.length + 1);
    data.forEach(([lbl, v], i) => {
      const x = ox + gap + i * (bw + gap), bh = (v / maxV) * ph, y = oy + ph - bh;
      const last = i === data.length - 1;
      svg += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${last ? S.accent : S.panel}"/>`;
      svg += `<text x="${x + bw / 2}" y="${y - 16}" font-family=${ff(FONT.body)} font-size="28" font-weight="700" fill="${last ? S.accent : S.soft}" text-anchor="middle">${v}%</text>`;
      svg += `<text x="${x + bw / 2}" y="${oy + ph + 44}" font-family=${ff(FONT.body)} font-size="26" fill="${S.soft}" text-anchor="middle">${lbl}</text>`;
    });
    svg += `<text x="${ox}" y="${H - 110}" font-family=${ff(FONT.body)} font-size="24" fill="${S.soft}">Caption sits beneath the figure: one sentence of meaning, one of source. UK English.</text>`;
    svg += `</svg>`;
    await renderPng(svg, opts && opts.out ? opts.out : `diagram_sample_${S.mode}.png`);
    if (opts && opts.out) break;
  }
}

/* ---------- CLI ---------- */
function parseArgs(argv) {
  const o = {}; for (let i = 0; i < argv.length; i++) { if (argv[i].startsWith("--")) { o[argv[i].slice(2)] = argv[i + 1]; i++; } } return o;
}
(async () => {
  const [cmd, ...rest] = process.argv.slice(2);
  const opts = parseArgs(rest);
  if (cmd === "blogthumb") await blogthumb(opts);
  else if (cmd === "ytthumb") await ytthumb(opts);
  else if (cmd === "bookends") await bookends(opts);
  else if (cmd === "diagram-sample") await diagramSample(opts);
  else if (cmd === "tokens") {
    console.log("Brand Design System v" + T.version + " — this producer defines no colours.");
    console.log("og_card: " + T.modeFor("og_card") + " by default, --mode light for the in-body companion.");
    console.log("youtube_thumbnail: " + T.modeFor("youtube_thumbnail") + ".");
  }
  else console.log("usage: node mo_visual_kit.js blogthumb|ytthumb|diagram-sample|tokens [--title ...] [--sub ...] [--eyebrow ...] [--badge ...] [--headshot path] [--mode light|dark] [--out file]");
})().catch((e) => { console.error(e.message || e); process.exit(1); });
