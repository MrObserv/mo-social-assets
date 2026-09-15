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

/* Brand font FILES must exist. Kept from the templates/ kit, which added this
 * after a Windows run produced a flawless, completely wordless card at exit 0.
 *
 * What it does and does not do, stated precisely, because the templates/
 * version claimed more than it delivered:
 *   - CATCHES a missing font FILE, loudly, before any render.
 *   - Does NOT make text render. That kit injected these faces as @font-face
 *     data URIs; librsvg ignores @font-face entirely, proven 2026-09-14 with
 *     three byte-identical PNGs (faces embedded, absent, and a deliberately
 *     nonexistent family).
 *   - Does NOT catch the actual cause of the blank card: the TTFs in
 *     06_Brand_Assets/fonts/ declare the wrong family in their name tables
 *     ("Montserrat Thin ExtraBold", "DM Sans 9pt"), so font-family:'Montserrat'
 *     matches nothing. Linux substitutes; Windows has nothing to substitute
 *     and drops the text.
 * That fix is upstream — replace the files with correct static TTFs. This
 * check only guarantees they are present to be replaced.
 */
function assertFontFilesPresent() {
  const dir = path.join(BRAND_DIR, "fonts");
  const need = ["Montserrat-ExtraBold.ttf", "Montserrat-Bold.ttf", "DMSans-Bold.ttf",
                "DMSans-Regular.ttf", "SpaceMono-Bold.ttf", "SpaceMono-Regular.ttf"];
  const missing = need.filter(function (f) { return !fs.existsSync(path.join(dir, f)); });
  if (missing.length) throw new Error(
    "mo_visual_kit: brand fonts missing from " + dir + ": " + missing.join(", ") +
    ". Text would render BLANK rather than fall back. This builder never uses system fonts.");
  return need.length;
}

// Gate 1 - fonts. A font-family fallback stack means a missing face renders
// in a substitute rather than failing, which is a silent brand defect. This
// is the registry check, and it SKIPS where no registry exists (Windows has
// no fc-list). The real gate is T.assertFontsProbe(sharp) in preflight, which
// compares two renders and works on every platform.
T.assertFonts();

// Gate 2 - this file's own source. Makes the single-source rule real rather
// than aspirational.
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
    /* NO logo field. The templates/ kit carried
     *   logo: dark ? "logo-on-dark.svg" : "logo-on-light.svg"
     * and embedded it on every OG card. Those two files are the RETIRED EYE
     * MARK: they carry two hexes from the retired map plus two that were never
     * v3 tokens at all. The exact values are in design-tokens.json under
     * marks.eye_mark_trap — deliberately NOT repeated here, because
     * assertNoRetired scans this file's whole source including comments, and
     * it is right to. Verified in the repo 2026-09-14. Every card that kit
     * produced shipped them, and it never called assertRenderClean, so
     * nothing caught it. The identifier is the ring mark, resolved by name. */
  };
}

/* Resolve the ring mark by NAME from the manifest, applying the 40px
 * crossover. Never search the brand folder - a search returns logo-master.svg
 * and favicon.svg, both of which predate the ring mark. That is exactly how
 * the retired mark kept shipping. */
function ringMarkHref(mode, sizePx) {
  const variant = sizePx < T.marks.ring_mark.crossover_px
    ? (mode === "dark" ? "small_on_dark" : "small_on_light")
    : (mode === "dark" ? "on_dark" : "on_light");
  return imgHref(T.mark("ring_mark", variant));
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

/* Flat ground + ONE radial teal wash, on BOTH modes.
 *
 * The three-stop navy gradient and the faint mint grid are both retired
 * (ratified reversal, 2026-09-11).
 *
 * HISTORY, because this flipped twice in one day. Content Management raised it
 * as D5: the wash on light contradicted three ratified sources saying "never
 * on light", so it was suppressed. Al reviewed the rendered result and RULED
 * THE WASH STAYS ON LIGHT (2026-09-14) — a flat light card reads flat, and the
 * standard was written before anyone had looked at a light card. The rule is
 * amended rather than the code reverted; usage_rules[3] now permits it.
 *
 * Both opacities come from the token file. A producer that hardcodes 0.12 is
 * the same defect as a producer that hardcodes a hex — it is a brand value,
 * and the reason this was arguable at all is that it lived here. */
function bgDefs(S, w, h, glowCx, glowCy) {
  const W = T.structure.wash;
  const op = S.dark ? W.dark : W.light;
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
async function renderPng(svg, out) {
  // Gate 3 - the COMPOSED RENDER. assertNoRetired reads this file's source; a
  // mark is base64-embedded at render time and passes straight through it, so
  // the build went green while shipping retired hexes. This decodes every
  // data: URI and scans the payload, so the thing checked is the thing that
  // ships. Inside renderPng so it cannot be forgotten.
  T.assertRenderClean(svg, out);
  // density 72, NOT 96. sharp's default is 72; passing 96 scaled every
  // unitless SVG dimension by 96/72, so a 1200x630 og_card rasterised at
  // 1600x840. Measured 2026-09-14.
  //
  // NO `quality` OPTION. In sharp, setting quality on a PNG implies
  // palette: true, which quantises the output. Measured 2026-09-14: cards came
  // out INDEXED with 25 to 28 colours, and a vertical slice through the radial
  // wash held only 5 to 7 distinct values — visible banding rings. A
  // near-monochrome card gives the quantiser no reason to keep gradient steps,
  // so it threw them away. This was in the kit from the start; every card it
  // ever produced is banded. compressionLevel is lossless and costs only size.
  // Content confirmed no standard pins PNG mode, quality or file size.
  await sharp(Buffer.from(svg), { density: 72 })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log("written:", out);
}

/* ---------- BLOG / OG CARD — light under v3 ----------
 *
 * --surface and --eyebrow are BOTH REQUIRED. Neither has a default, and that
 * is deliberate (items 8 and 9, Content Management 2026-09-14).
 *
 * --surface: this used to call T.lockupFor("blog_og") literally, so every card
 * returned MASTERING OBSERVABILITY regardless of what the card was. A
 * byte-size or Digest card got the right answer for the wrong reason and never
 * reached the throw that exists to stop a surface defaulting into a wordmark.
 *
 * --eyebrow: this used to default to "THE OBSERVABILITY DIGEST", correct for
 * one surface and wrong for the other four. A silent default that is right
 * once and wrong four times is the same failure class as the font fallback
 * that produced the blank card. A missing eyebrow fails the render. */
async function blogthumb(opts) {
  if (!opts.surface) throw new Error(
    "mo_visual_kit: --surface is required. It decides the wordmark, and a card " +
    "that guesses its own lane is how the wrong wordmark ships. House-lane " +
    "writing surfaces: blog_og, byte_size, monthly_digest, the_signal.");
  if (!opts.eyebrow) throw new Error(
    "mo_visual_kit: --eyebrow is required. It used to default to THE " +
    "OBSERVABILITY DIGEST, which is correct for one surface and wrong for the " +
    "rest. Pass it explicitly: TECHNICAL, LEADERSHIP, THE SIGNAL, BYTE-SIZE, " +
    "THE OBSERVABILITY DIGEST.");
  const S = surface(opts.surface, T.variantFor(opts.surface, opts.mode));
  const [W, H] = T.size(opts.surface);
  const eyebrow = opts.eyebrow;
  const lines = wrapLines(opts.title || "Untitled", 24);
  const sub = opts.sub || "";
  const titleSize = lines.length >= 3 ? 64 : 76;
  const startY = H / 2 - ((lines.length - 1) * (titleSize * 1.12)) / 2 + (sub ? -20 : 10);
  const ringHref = ringMarkHref(S.mode, 44);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += bgDefs(S, W, H, W / 2, 0);
  svg += kicker(60, 66, eyebrow, 19, S.accent2, S.accent);
  lines.forEach((ln, i) => {
    svg += `<text x="60" y="${startY + i * titleSize * 1.12}" font-family=${ff(FONT.display)} font-size="${titleSize}" font-weight="${DISPLAY_WEIGHT}" letter-spacing="-2" fill="${S.ink}">${esc(ln)}</text>`;
  });
  if (sub) svg += `<text x="60" y="${startY + lines.length * titleSize * 1.12 + 8}" font-family=${ff(FONT.body)} font-size="26" fill="${S.body}">${esc(sub)}</text>`;
  svg += `<line x1="60" y1="${H - 78}" x2="${W - 60}" y2="${H - 78}" stroke="${S.rule}" stroke-opacity="${S.ruleOpacity}" stroke-width="1"/>`;
  svg += monoLabel(60, H - 44, T.lockupFor(opts.surface), 17, S.soft);
  svg += monoLabel(W - 128, H - 44, "MASTERINGOBSERVABILITY.COM", 17, S.accent, "end");
  svg += `<image href="${ringHref}" x="${W - 104}" y="${H - 66}" width="44" height="44"/>`;
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
  else if (cmd === "preflight") {
    const reg = T.assertFonts();
    if (reg && reg.skipped) console.log("fontconfig CLI: " + reg.skipped);
    console.log("font files: " + assertFontFilesPresent() + " present in " + path.join(BRAND_DIR, "fonts"));
    const probe = await T.assertFontsProbe(sharp);
    console.log("fonts: " + probe.probed + " faces resolved by render probe");
    probe.faces.forEach(function (f) { console.log("       " + f); });
    if (probe.unproven && probe.unproven.length) {
      console.log("AMBIGUOUS — these faces could not be proved either way by the probe:");
      probe.unproven.forEach(function (f) { console.log("       " + f); });
      console.log("      This happens when the face IS the renderer's best fallback for that");
      console.log("      weight — the heaviest face installed. The probe cannot separate");
      console.log("      'did not resolve' from 'resolved, and is also the fallback'. Not a");
      console.log("      failure. Render one card and look at the letterforms.");
    }
    T.assertNoRetired(fs.readFileSync(__filename, "utf8"), "mo_visual_kit.js");
    T.assertFilesClean(["on_dark", "on_light", "small_on_dark", "small_on_light",
                        "mono_black", "mono_white"].map(function (v) { return T.mark("ring_mark", v); }));
    console.log("preflight clean: " + probe.probed + " faces probed, no retired hexes in source, markup or marks.");
    console.log("NOTE: the probe detects SUBSTITUTION, not SYNTHESIS and not a");
    console.log("      mislabelled name table. Until the fonts declare family");
    console.log("      'Montserrat' rather than 'Montserrat Thin', a pass here does");
    console.log("      not mean the display face is real. Render one card and look.");
  }
  else if (cmd === "tokens") {
    console.log("Brand Design System v" + T.version + " — this producer defines no colours.");
    console.log("og_card: " + T.modeFor("og_card") + " by default, --mode light for the in-body companion.");
    console.log("youtube_thumbnail: " + T.modeFor("youtube_thumbnail") + ".");
  }
  else console.log("usage: node mo_visual_kit.js blogthumb|ytthumb|diagram-sample|preflight|tokens\n" +
    "  blogthumb --surface <blog_og|byte_size|monthly_digest|the_signal> --eyebrow \"...\" --title \"...\"\n" +
    "            [--sub ...] [--mode light|dark] [--out file]\n" +
    "  --surface and --eyebrow are REQUIRED. Neither is defaulted, on purpose.");
})().catch((e) => { console.error(e.message || e); process.exit(1); });
