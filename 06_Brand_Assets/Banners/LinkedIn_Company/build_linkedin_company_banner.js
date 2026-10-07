// LinkedIn Company Page banner, Brand Design System v3.1 §10a. v1.1.0, 2026-10-07.
// Composed ONLY from the canonical producer helpers (producers/mo_diagram.js themed light,
// producers/mo-tokens.js), the same way build_linkedin_banner.js composes the personal banner.
// Every string is measured on the rendered pixels and every position is gated before the file
// is accepted.
//
// Rules applied (design-tokens.json 3.3.5):
//   canvas.linkedin_company_banner   1128x191
//   mode                             light (LinkedIn chrome is white, §10a)
//   lockup                           house lane: T.lockupFor() resolves MASTERING OBSERVABILITY;
//                                    Metrics & Mayhem must not appear on a house asset
//   safe_areas note                  "Drop the title entirely. Kicker, wordmark and rings only."
//                                    No display title and no URL (the page has its own website
//                                    button). The kicker leads.
//   wordmark                         Logo_and_Marks_Standard §1: Space Mono 700, uppercase, tracked,
//                                    soft, as on the house lockup of The Signal card. The page logo
//                                    is the ring mark, so the banner carries no second mark.
//   rings                            Logo_and_Marks_Standard §3, texture: the concentric rings
//                                    bleeding off an edge, with the canvas's ONE radial wash centred
//                                    on them, off the text ("nothing is read through it").
//   label floor                      §4: 10.5px as displayed. Desktop shows the canvas at x0.713.
//
// Kicker: the offer line, chosen 2026-10-07.
//
// Reproduce: node build_linkedin_company_banner.js <path-to-producers> <out_dir>
const path = require("path"), fs = require("fs");
const PROD = process.argv[2], OUT = process.argv[3] || ".";
const Dm = require(path.join(PROD, "mo_diagram.js"));
const T = require(path.join(PROD, "mo-tokens.js"));
const sharp = require(require.resolve("sharp", { paths: [PROD] }));
const L = Dm.themed("light"), F = Dm.FONT, DW = Dm.DISPLAY_WEIGHT;
const SURFACE = "linkedin_company_banner";
if (T.modeFor(SURFACE) !== "light") throw new Error("company banner no longer resolves light; re-read design-tokens.json");
const WORDMARK = T.lockupFor(SURFACE);
if (WORDMARK !== "MASTERING OBSERVABILITY") throw new Error("company banner is no longer house lane");
const [W, H] = T.size(SURFACE);
const tokens = JSON.parse(fs.readFileSync(path.join(PROD, "..", "design-tokens.json"), "utf8"));
const CROSSOVER = tokens.marks && tokens.marks.ring_mark ? tokens.marks.ring_mark.crossover_px : 40;

// MEASURED on the live Company Page, 2026-10-07, in banner pixels. The token's safe area
// (the full 1128x191, centred) does not hold: the medium layout crops both sides, and the
// company logo drops into the lower left at every width.
//  Desktop, 1440 viewport: cover drawn 804x134 (x0.713), whole width visible;
//           logo 128px square at x33.7..213.3, from y99.7 down.
//  Medium, 647 viewport: cover 576x134 with background-size cover, so only x153.5..974.5 shows;
//           logo x187.7..370.1, from y99.8 down.
//  Mobile web, 375 viewport: cover drawn 374x64 (x0.332), whole width visible;
//           logo 96px at x48.2..337.6, from y99.5 down.
const VISIBLE = [153.5, 974.5];
const LOGOS = { desktop: [33.7, 99.7, 213.3, H], medium: [187.7, 99.8, 370.1, H], mobileWeb: [48.2, 99.5, 337.6, H] };
const SCALE_MOB = 374.2 / W;

// One text column: right of every measured logo plus 40, to the medium crop's right edge minus 40.
const X0 = Math.ceil(Math.max(...Object.values(LOGOS).map((b) => b[2])) + 40), X1 = Math.floor(VISIBLE[1] - 40);
const COL_W = X1 - X0;
const KICKER = ["OBSERVABILITY ADVISORY", "NEWSLETTER \u00b7 PODCAST"];
const C = { deep: T.light["teal-deep"], soft: T.light["soft"] };
const SCALE_DESK = 804 / W, LABEL_FLOOR = 10.5;
const wrapSvg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
const ls = (size) => Math.round(size / 3); // label tracking 4px at 12px, the token ratio

// Texture rings: the ring mark, resolved by name, scaled so its outer ring stays inside the cover's
// height (the cover has no visible edge on LinkedIn's white card, so rings cut by the bottom edge
// read as a fault) and centred just past the right edge, so the rings bleed in from the right only
// and the centre dot never shows. Clear of the medium crop, so it never meets text.
// Ring mark geometry, 24-unit viewBox: outer r10.5, centre dot r2.4 (Logo_and_Marks_Standard §1).
const RING_CY = Math.round(H / 2), RINGS = Math.floor((Math.min(RING_CY, H - RING_CY) - 10) * 24 / 10.5);
const RING_CX = W + Math.ceil(RINGS * 2.4 / 24) + 2;
function rings() {
  const p = T.ringMark("light", RINGS);
  return `<image href="data:image/svg+xml;base64,${fs.readFileSync(p).toString("base64")}" x="${RING_CX - RINGS / 2}" y="${RING_CY - RINGS / 2}" width="${RINGS}" height="${RINGS}"/>`;
}
// The ONE wash, from the producer's own background(), centred on the rings: background() centres
// its wash on (w/2, 0.42h), so it is called at twice the ring centre's x and the canvas clips it.
const ground = () => L.background(2 * RING_CX, H, {});

async function ink(file, box, pred) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  let minX = W, maxX = -1, minY = H, maxY = -1;
  for (let y = Math.max(0, box[1]); y < Math.min(H, box[3]); y++) for (let x = Math.max(0, box[0]); x < Math.min(W, box[2]); x++) {
    const i = (y * info.width + x) * info.channels;
    if (pred(data[i], data[i + 1], data[i + 2])) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  return { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}
const isDeep = (r, g, b) => g - r > 40 && r < 120 && b < 150;          // teal-deep text
const isSoft = (r, g, b) => Math.abs(r - 90) < 30 && Math.abs(g - 110) < 30 && Math.abs(b - 114) < 30 && g - r < 35; // soft text
const isRing = (r, g, b) => g - r > 30 && r > 120 && r < 215;          // ring texture strokes (light teal; text is darker, the wash paler)
async function measure(svgInner, pred) {
  const f = path.join(OUT, ".probe.png");
  await sharp(Buffer.from(wrapSvg(ground() + svgInner)), { density: 72 }).png().toFile(f);
  const m = await ink(f, [0, 0, X1 + 200, H], pred); fs.unlinkSync(f); return m;
}
async function fitAll(lines, start, min) {
  for (let s = start; s >= min; s -= 1) {
    const ms = [];
    for (const t of lines) ms.push(await measure(L.label(X0, 100, t, { size: s, fill: C.deep, ls: ls(s) }), isDeep));
    if (ms.every((m) => m.w <= COL_W)) return { size: s, ms };
  }
  throw new Error("kicker cannot fit the column at the minimum size");
}

(async () => {
  await T.assertFontsProbe(sharp);
  const k = await fitAll(KICKER, 34, 16);
  const KS = k.size, WS = 16, WM_LS = Math.round(WS * 3 / 12); // lockup wordmark tracking: 3px at 12px (Logo_and_Marks_Standard §1)
  const wmProbe = await measure(L.label(X0, 100, WORDMARK, { size: WS, fill: C.soft, ls: WM_LS }), isSoft);
  // Vertical rhythm from measured cap heights: kicker line 1, line 2, gap, wordmark; block centred.
  const kAsc = 100 - k.ms[0].minY, wAsc = 100 - wmProbe.minY;
  const LINE = Math.round(KS * 1.35), GAP = 26;
  const blockH = kAsc + LINE + GAP + wAsc;
  const top = Math.round((H - blockH) / 2);
  const K1 = top + kAsc, K2 = K1 + LINE, WY = K2 + GAP + wAsc;
  const svg = wrapSvg(ground() + rings() +
    L.label(X0, K1, KICKER[0], { size: KS, fill: C.deep, ls: ls(KS) }) +
    L.label(X0, K2, KICKER[1], { size: KS, fill: C.deep, ls: ls(KS) }) +
    L.label(X0, WY, WORDMARK, { size: WS, fill: C.soft, ls: WM_LS }));
  const file = path.join(OUT, "linkedin_company_banner_1128x191.png");
  await L.render(svg, file);

  // Pixel gates on what actually rendered. Text boxes stop at the medium crop, left of the rings.
  const XT = Math.floor(VISIBLE[1]);
  const kick1 = await ink(file, [0, 0, XT, K1 + 3], isDeep);
  const kick2 = await ink(file, [0, K1 + 4, XT, K2 + 3], isDeep);
  const word = await ink(file, [0, K2 + 4, XT, H], isSoft);
  // Searched right of the text column only: anti-aliased text edges share the ring colour.
  const ringInk = await ink(file, [X1 + 1, 0, W, H], isRing);
  const png = fs.readFileSync(file);
  const gates = [
    ["colour type is truecolour (byte 25 is 2 or 6)", png[25] === 2 || png[25] === 6],
    ["ring texture found", ringInk.maxX > 0],
    ["ring texture right of the medium crop (rendered)", ringInk.minX > VISIBLE[1]],
    ["outer ring right of the medium crop (geometry)", RING_CX - RINGS * 10.5 / 24 > VISIBLE[1]],
    ["ring centre dot off canvas", RING_CX - RINGS * 2.4 / 24 > W],
    ["outer ring inside the cover height", RING_CY - RINGS * 10.5 / 24 >= 0 && RING_CY + RINGS * 10.5 / 24 <= H],
    ["kicker displays at or over the label floor on desktop", KS * SCALE_DESK >= LABEL_FLOOR],
    ["wordmark displays at or over the label floor on desktop", WS * SCALE_DESK >= LABEL_FLOOR],
  ];
  for (const [nm, b] of [["kicker line 1", kick1], ["kicker line 2", kick2], ["wordmark", word]]) {
    gates.push([`${nm} found`, b.maxX > 0]);
    gates.push([`${nm} starts on the column`, b.minX >= X0 - 3]);
    gates.push([`${nm} ends inside the column`, b.maxX <= X1]);
    gates.push([`${nm} 12px clear of top and bottom`, b.minY >= 12 && b.maxY <= H - 12]);
    gates.push([`${nm} inside the medium crop with 40px`, b.minX >= VISIBLE[0] + 40 && b.maxX <= VISIBLE[1] - 40]);
    for (const [ln, r] of Object.entries(LOGOS))
      gates.push([`${nm} 12px clear of the ${ln} logo`, b.minX > r[2] + 12 || b.maxY < r[1] - 12]);
  }
  const failed = gates.filter((g) => !g[1]);
  if (failed.length) throw new Error("gates failed: " + failed.map((g) => g[0]).join("; "));
  console.log(`${gates.length} gates pass. column ${X0}..${X1}; kicker ${KS}px (${(KS * SCALE_DESK).toFixed(1)} CSS px on desktop) x ${Math.min(kick1.minX, kick2.minX)}..${Math.max(kick1.maxX, kick2.maxX)}; wordmark ${WS}px x ${word.minX}..${word.maxX}; rings ${RINGS}px centred ${RING_CX},${RING_CY}, ink from x${ringInk.minX}`);
  fs.writeFileSync(path.join(OUT, "linkedin_company_banner.json"), JSON.stringify({
    built: "2026-10-07", builder: "1.1.0", tokens: tokens.version, kicker: KICKER, wordmark: WORDMARK,
    column: [X0, X1], visibleMedium: VISIBLE, logos: LOGOS,
    sizes: { kicker: KS, wordmark: WS }, baselines: { kicker: [K1, K2], wordmark: WY },
    rings: { size: RINGS, cx: RING_CX, cy: RING_CY, inkFromX: ringInk.minX },
    ink: { kicker: [kick1, kick2], wordmark: word }, gates: gates.length,
  }, null, 2));
})().catch((e) => { console.error(e.message); process.exit(1); });
