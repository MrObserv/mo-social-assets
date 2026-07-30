#!/usr/bin/env node
/* Mastering Observability — visual template kit
 * Generates brand-standard PNGs from SVG templates.
 * Commands: blogthumb | ytthumb | bookends | diagram-sample
 * Source of truth: Voice Codex §17, §19.6, §19.7, §24.11, §24.15, §25.1
 * and the book figure briefs (01_Book/Production/Metrics_Mayhem_Figure_Briefs.md).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const BRAND_DIR = process.env.MO_BRAND_DIR || path.resolve(__dirname, "..", "..");
const C = {
  navy: "#0a0e17", navy2: "#0c1929", navy3: "#0e1f35",
  teal: "#0d7377", mid: "#14a3a8", mint: "#2dd4bf", bright: "#64ffda",
  ink: "#ffffff", grey: "#9fb0bd", greyDark: "#666666", greyLight: "#cccccc",
  amber: "#ffd166",
  axis: "#c2c9cc", gridLine: "#e9ecec", label: "#6c7a82",
};
const FONT = {
  display: "'Archivo Black','Arial Black','Liberation Sans',sans-serif",
  body: "'DM Sans','Liberation Sans','DejaVu Sans',sans-serif",
  mono: "'Space Mono','DejaVu Sans Mono','Noto Sans Mono',monospace",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const b64 = (p) => fs.readFileSync(p).toString("base64");
const mime = (p) => (p.endsWith(".svg") ? "image/svg+xml" : p.endsWith(".png") ? "image/png" : "image/jpeg");
const imgHref = (p) => `data:${mime(p)};base64,${b64(p)}`;

function bgDefs(w, h, glowCx) {
  return `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${C.navy}"/><stop offset="0.6" stop-color="${C.navy2}"/><stop offset="1" stop-color="${C.navy3}"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="${C.bright}" stop-opacity="0.05"/><stop offset="0.7" stop-color="${C.bright}" stop-opacity="0"/>
  </radialGradient>
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M60 0 L0 0 0 60" fill="none" stroke="${C.bright}" stroke-opacity="0.022" stroke-width="1"/>
  </pattern></defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <ellipse cx="${glowCx}" cy="${h / 2}" rx="${h * 0.68}" ry="${h * 0.68}" fill="url(#glow)"/>`;
}
const spaced = (s) => esc(s).split("").join(" "); // hair-space letterspacing fallback
function monoLabel(x, y, text, size, fill, anchor = "start", ls = 4) {
  return `<text x="${x}" y="${y}" font-family=${JSON.stringify(FONT.mono.replace(/"/g, "'"))} font-size="${size}" fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}" font-weight="700">${esc(text)}</text>`;
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

/* ---------- BLOG THUMBNAIL 1200x630 (Codex §25.1, §24.11) ---------- */
async function blogthumb(opts) {
  const W = 1200, H = 630;
  const eyebrow = opts.eyebrow || "THE OBSERVABILITY DIGEST";
  const lines = wrapLines(opts.title || "Untitled", 24);
  const sub = opts.sub || "";
  const titleSize = lines.length >= 3 ? 64 : 76;
  const startY = H / 2 - ((lines.length - 1) * (titleSize * 1.12)) / 2 + (sub ? -20 : 10);
  const logo = imgHref(path.join(BRAND_DIR, "logo-on-dark.svg"));
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(W, H, 1150);
  svg += monoLabel(60, 64, eyebrow, 19, C.bright);
  lines.forEach((ln, i) => {
    svg += `<text x="60" y="${startY + i * titleSize * 1.12}" font-family=${JSON.stringify(FONT.display.replace(/"/g, "'"))} font-size="${titleSize}" font-weight="800" fill="${C.ink}">${esc(ln)}</text>`;
  });
  if (sub) svg += `<text x="60" y="${startY + lines.length * titleSize * 1.12 + 8}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="26" fill="${C.grey}">${esc(sub)}</text>`;
  svg += monoLabel(60, H - 44, "METRICS & MAYHEM   ·   MASTERINGOBSERVABILITY.COM", 17, C.mid);
  svg += `<image href="${logo}" x="${W - 150}" y="${H - 150}" width="90" height="90" opacity="0.5"/>`;
  svg += `</svg>`;
  await renderPng(svg, opts.out || "blog_thumbnail.png");
}

/* ---------- YOUTUBE THUMBNAIL 1280x720 (Codex §19.6, §24.15) ---------- */
async function gradedImg(p) {
  // Codex §19.6: headshot graded toward the navy slate, desaturated backdrop
  const buf = await sharp(p).modulate({ saturation: 0.78, brightness: 0.95 }).png().toBuffer();
  return "data:image/png;base64," + buf.toString("base64");
}
async function ytthumb(opts) {
  const W = 1280, H = 720;
  const badge = opts.badge || "SIGNAL DROP";
  const lines = wrapLines((opts.title || "UNTITLED").toUpperCase(), 12);
  const sub = opts.sub || "";
  const headshot = opts.headshot ? await gradedImg(opts.headshot) : null;
  const titleSize = lines.length >= 3 ? 78 : 92;
  const startY = H / 2 - ((lines.length - 1) * (titleSize * 1.06)) / 2 + 20;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(W, H, 380);
  if (headshot) {
    svg += `<defs><linearGradient id="fade" x1="640" y1="0" x2="940" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <mask id="hsmask"><rect x="640" y="0" width="${W - 640}" height="${H}" fill="url(#fade)"/></mask></defs>`;
    svg += `<image href="${headshot}" x="640" y="0" width="${W - 640}" height="${H}" preserveAspectRatio="xMidYMid slice" mask="url(#hsmask)"/>`;
  }
  svg += monoLabel(56, 70, "METRICS & MAYHEM", 24, C.ink, "start", 5);
  svg += `<rect x="56" y="92" width="${badge.length * 16 + 36}" height="42" fill="${C.teal}"/>`;
  svg += `<text x="${56 + (badge.length * 16 + 36) / 2}" y="120" font-family=${JSON.stringify(FONT.mono.replace(/"/g, "'"))} font-size="20" font-weight="700" fill="${C.ink}" letter-spacing="3" text-anchor="middle">${esc(badge)}</text>`;
  lines.forEach((ln, i) => {
    svg += `<text x="56" y="${startY + i * titleSize * 1.06}" font-family=${JSON.stringify(FONT.display.replace(/"/g, "'"))} font-size="${titleSize}" font-weight="800" fill="${C.ink}">${esc(ln)}</text>`;
  });
  if (sub) svg += `<text x="56" y="${startY + (lines.length - 1) * titleSize * 1.06 + 56}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="30" font-weight="600" fill="${C.bright}">${esc(sub)}</text>`;
  svg += `<rect x="56" y="${H - 88}" width="160" height="6" fill="${C.mint}"/>`;
  svg += `</svg>`;
  await renderPng(svg, opts.out || "yt_thumbnail.png");
}

/* ---------- VERTICAL BOOKENDS 1080x1920 (Codex §19.7) ---------- */
function bookendBase(W, H) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(W, H, W / 2);
  svg += monoLabel(W / 2, 160, "METRICS & MAYHEM", 26, C.bright, "middle", 8);
  svg += monoLabel(W / 2, H - 96, "MASTERINGOBSERVABILITY.COM", 22, C.grey, "middle", 5);
  return svg;
}
function ctaBlock(W, y, label, line1, line2) {
  let s = `<rect x="${W / 2 - 30}" y="${y}" width="60" height="5" fill="${C.mint}"/>`;
  s += monoLabel(W / 2, y + 44, label, 22, C.mint, "middle", 6);
  s += `<text x="${W / 2}" y="${y + 92}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="36" font-weight="700" fill="${C.ink}" text-anchor="middle">${esc(line1)}</text>`;
  if (line2) s += `<text x="${W / 2}" y="${y + 130}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="24" fill="${C.grey}" text-anchor="middle">${esc(line2)}</text>`;
  return s;
}
async function bookends(opts) {
  // RETIRED (Codex 19.7, v1.9.20). Vertical bookends are now produced by the
  // canonical Python builder 00_Command_Center/thumbnail_builder.py (builder
  // v1.2.0), in the same run as the episode thumbnails, and shipped
  // automatically by episode-asset-watcher v5.4. This Node command is kept
  // only so old invocations fail loudly instead of drawing a stale design.
  console.error("DEPRECATED: `mo_visual_kit.js bookends` is retired per Codex 19.7 (v1.9.20).");
  console.error("Use: python3 00_Command_Center/thumbnail_builder.py --bookends-only --episode N --title ... --subtitle ... --next-title ... --slug <slug> --outdir <episode folder> --ship");
  process.exit(2);
  // eslint-disable-next-line no-unreachable
  const W = 1080, H = 1920;
  const slug = opts.slug || "episode";
  const badge = opts.badge || "SIGNAL DROP";
  const epTitle = opts.title || "Untitled Episode";
  const epSub = opts.sub || "";
  const epMarker = opts.marker || "";
  const logo = imgHref(path.join(BRAND_DIR, "logo-on-dark.svg"));
  // INTRO — no CTA
  let svg = bookendBase(W, H);
  svg += monoLabel(W / 2, 560, badge, 28, C.mint, "middle", 8);
  const tLines = wrapLines(epTitle, 16);
  const tSize = tLines.length >= 3 ? 72 : 84;
  const tY = 760 - ((tLines.length - 1) * tSize * 1.1) / 2;
  tLines.forEach((ln, i) => {
    svg += `<text x="${W / 2}" y="${tY + i * tSize * 1.1}" font-family=${JSON.stringify(FONT.display.replace(/"/g, "'"))} font-size="${tSize}" font-weight="800" fill="${C.ink}" text-anchor="middle">${esc(ln)}</text>`;
  });
  if (epSub) svg += `<text x="${W / 2}" y="${tY + tLines.length * tSize * 1.1 + 30}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="30" fill="${C.grey}" text-anchor="middle">${esc(epSub)}</text>`;
  if (epMarker) svg += monoLabel(W / 2, tY + tLines.length * tSize * 1.1 + 110, epMarker, 24, C.mid, "middle", 6);
  svg += `<image href="${logo}" x="${W / 2 - 60}" y="${H - 420}" width="120" height="120" opacity="0.3"/>`;
  svg += `</svg>`;
  await renderPng(svg, `bookend_intro_${slug}.png`);
  // OUTRO — "More signals soon." + four locked CTA blocks (book block mandatory)
  svg = bookendBase(W, H);
  svg += `<text x="${W / 2}" y="400" font-family=${JSON.stringify(FONT.display.replace(/"/g, "'"))} font-size="84" font-weight="800" fill="${C.ink}" text-anchor="middle">More signals</text>`;
  svg += `<text x="${W / 2}" y="500" font-family=${JSON.stringify(FONT.display.replace(/"/g, "'"))} font-size="84" font-weight="800" fill="${C.mint}" text-anchor="middle">soon.</text>`;
  svg += ctaBlock(W, 640, "THE BOOK", "Metrics & Mayhem", "A CTO's Guide to Observability That Actually Works");
  svg += ctaBlock(W, 830, "FULL EPISODE", opts.episodeRef || epTitle, "on Spotify & Apple");
  svg += ctaBlock(W, 1020, "NEWSLETTER", "masteringobservability.com", "");
  svg += ctaBlock(W, 1190, "FOLLOW THE SHOW", "Metrics & Mayhem", "");
  svg += `<image href="${logo}" x="${W / 2 - 60}" y="${H - 460}" width="120" height="120" opacity="0.3"/>`;
  svg += `</svg>`;
  await renderPng(svg, `bookend_outro_${slug}.png`);
}

/* ---------- DIAGRAM STARTER (book figure standard, dark + light) ---------- */
function diagramTheme(dark) {
  return dark
    ? { bg: C.navy, ink: C.ink, label: "#9fb0bd", axis: "#2a3a4a", grid: "#1a2836", barNeutral: "#3d5466", accent: C.bright, caption: "#9fb0bd" }
    : { bg: "#ffffff", ink: "#1a1a1a", label: C.label, axis: C.axis, grid: C.gridLine, barNeutral: C.greyLight, accent: C.teal, caption: C.greyDark };
}
async function diagramSample(opts) {
  // Sample: 4-bar trend with accent final bar — the Figure 1.1 idiom from the book.
  const W = 1600, H = 1080;
  for (const dark of [false, true]) {
    const T = diagramTheme(dark);
    const data = [["2023", 32], ["2024", 41], ["2025", 54], ["2026", 67]];
    const px = 250, pw = 1270, py = 250, ph = 590, maxV = 100;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
    svg += `<rect width="${W}" height="${H}" fill="${T.bg}"/>`;
    svg += `<text x="${px}" y="150" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="44" font-weight="700" fill="${T.ink}">Sample figure: the brand bar idiom</text>`;
    for (let v = 0; v <= maxV; v += 25) {
      const y = py + ph - (v / maxV) * ph;
      svg += `<line x1="${px}" y1="${y}" x2="${px + pw}" y2="${y}" stroke="${v === 0 ? T.axis : T.grid}" stroke-width="${v === 0 ? 2.4 : 1.6}"/>`;
      svg += `<text x="${px - 26}" y="${y + 8}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="23" fill="${T.label}" text-anchor="end">${v}%</text>`;
    }
    const bw = 180, gap = (pw - data.length * bw) / (data.length + 1);
    data.forEach(([lbl, v], i) => {
      const x = px + gap + i * (bw + gap), bh = (v / maxV) * ph, y = py + ph - bh;
      const last = i === data.length - 1;
      svg += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${last ? T.accent : T.barNeutral}"/>`;
      svg += `<text x="${x + bw / 2}" y="${y - 16}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="28" font-weight="700" fill="${last ? T.accent : T.label}" text-anchor="middle">${v}%</text>`;
      svg += `<text x="${x + bw / 2}" y="${py + ph + 44}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="26" fill="${T.label}" text-anchor="middle">${lbl}</text>`;
    });
    svg += `<text x="${px}" y="${H - 110}" font-family=${JSON.stringify(FONT.body.replace(/"/g, "'"))} font-size="24" fill="${T.caption}">Caption sits beneath the figure: one sentence of meaning, one of source. UK English.</text>`;
    svg += `</svg>`;
    await renderPng(svg, opts && opts.out ? opts.out : `diagram_sample_${dark ? "dark" : "light"}.png`);
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
  else console.log("usage: node mo_visual_kit.js blogthumb|ytthumb|bookends|diagram-sample [--title ...] [--sub ...] [--eyebrow ...] [--badge ...] [--slug ...] [--marker ...] [--headshot path] [--out file]");
})().catch((e) => { console.error(e); process.exit(1); });
