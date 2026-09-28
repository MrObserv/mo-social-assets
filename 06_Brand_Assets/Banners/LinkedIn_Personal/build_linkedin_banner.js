// LinkedIn personal banner, Brand Design System v3.1 §10a.
// Composed ONLY from the canonical producer helpers (producers/mo_diagram.js themed light,
// producers/mo-tokens.js). No producer has a banner surface yet, so this composes one, the
// same way the carousel build does. Nothing is hand-placed by eye: every string is measured,
// and every position is proven on the rendered pixels before the file is accepted.
//
// Rules applied (design-tokens.json 3.3.3):
//   canvas.linkedin_personal_banner  1584x396
//   mode                              light (LinkedIn chrome is white, §10a)
//   lockup                            house lane: T.lockupFor() resolves MASTERING OBSERVABILITY
//   safe_areas.linkedin_personal_banner  safe 1128x396 centred; avatar exclusion d264 at x96,
//                                     bottom-left, half below the edge
//   claim                             from claim-bank.json, surfaces must include "banner"
//   ring mark                         crossover_px 40, judged at the smallest DISPLAYED size
//                                     (the og_card_rule precedent), not the authored size
//
// Reproduce: node build_linkedin_banner.js <path-to-producers> <out_dir> [C22|C02|C15|C01]
const path = require("path"), fs = require("fs");
const PROD = process.argv[2], OUT = process.argv[3] || ".", CLAIM_ID = process.argv[4] || "C22";
const Dm = require(path.join(PROD, "mo_diagram.js"));
const T = require(path.join(PROD, "mo-tokens.js"));
const sharp = require(require.resolve("sharp", { paths: [PROD] }));
const L = Dm.themed("light"), F = Dm.FONT, DW = Dm.DISPLAY_WEIGHT;
const SURFACE = "linkedin_personal_banner";
if (T.modeFor(SURFACE) !== "light") throw new Error("banner surface no longer resolves light; re-read design-tokens.json");
if (T.lockupFor(SURFACE) !== "MASTERING OBSERVABILITY") throw new Error("banner is no longer house lane");
const [W, H] = T.size(SURFACE);

// Safe area and token avatar exclusion, read from the token file, never typed.
const tokens = JSON.parse(fs.readFileSync(path.join(PROD, "..", "design-tokens.json"), "utf8"));
const SA = tokens.safe_areas[SURFACE];
const SAFE_X0 = (W - SA.safe[0]) / 2, SAFE_X1 = SAFE_X0 + SA.safe[0];
const AV = SA.avatar_exclusion, AV_R = AV.d / 2;
const TOKEN_AV = { cx: AV.x + AV_R, cy: AV.half_below ? H : H - AV_R, r: AV_R };
const CROSSOVER = tokens.marks && tokens.marks.ring_mark ? tokens.marks.ring_mark.crossover_px : 40;

// MEASURED avatars on Al's live profile, 2026-09-27, both converted to banner pixels.
//  Desktop: cover drawn 792x198, photo 152.6px at 27.7px from the left, 105.7px down
//           => d305, left 55, top 211.
//  Mobile web (375 CSS px viewport): cover drawn 375.4x93.8, full width, NO side crop;
//           photo 128px at x20, 19.8px below the cover top => d540, left 84, top 84.
//           The photo covers the left 40 per cent of the banner at almost every height.
// Both reach well past the token's d264 at x96. Token correction filed as a CR.
const COVER_SCALE_DESK = W / 792, COVER_SCALE_MOB = W / 375.4;
const DESK = circ(27.7 * COVER_SCALE_DESK, 105.7 * COVER_SCALE_DESK, 152.6 * COVER_SCALE_DESK);
const MOB = circ(20 * COVER_SCALE_MOB, 19.8 * COVER_SCALE_MOB, 128 * COVER_SCALE_MOB);
function circ(left, top, d) { return { cx: left + d / 2, cy: top + d / 2, r: d / 2 }; }
const AV_RIGHT = Math.max(TOKEN_AV.cx + TOKEN_AV.r, DESK.cx + DESK.r, MOB.cx + MOB.r);

const C = { deep: T.light["teal-deep"], navy: T.light["navy"] };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ff = (f) => JSON.stringify(f.replace(/"/g, "'"));

// Claim from the bank, surface-checked.
const bank = JSON.parse(fs.readFileSync(path.join(PROD, "..", "claim-bank.json"), "utf8"));
const claim = bank.claims.find((c) => c.id === CLAIM_ID);
if (!claim) throw new Error("claim " + CLAIM_ID + " not in the bank");
if (!(claim.surfaces || []).includes("banner")) throw new Error("claim " + CLAIM_ID + " is not permitted on a banner");
if (claim.status !== "approved") throw new Error("claim " + CLAIM_ID + " is not approved");

// Layout: one text column, right of every measured avatar and inside the safe area.
const X0 = Math.ceil(AV_RIGHT + 40), X1 = SAFE_X1 - 40, COL_W = X1 - X0;
// Kicker in Al's own words (his LinkedIn headline, trimmed). "& OBSERVABILITY" dropped: the claim
// and the footer already carry the word, and the full string does not fit the column.
const KICKER = "IT OPERATIONS LEADER";
const KICKER_SIZE = 24, KICKER_LS = 8, KICKER_CAP = 18, RULE_W = 64, RULE_GAP = 24; // label token: 12px/4px at 2x
const TITLE_SIZE = 52, TITLE_LH = 1.1, KICKER_TO_TITLE = 80;
const FOOTER_TOP = H - 34 - 16; // canonical footer: baseline h-34, size 16
// Ring mark: bleed decoration in the band right of the safe area (§10a: design the safe area, let the
// rest bleed). Sized so its SMALLEST display (mobile web, x0.237) stays at or over the crossover.
// Right margin 36px: the visible outer ring then clears the frame by the inner-ring radius
// (marks clear-space rule, 171 x 6/24 = 43px). Centred in the band it sat at 35px and read as jammed.
const MARK = Math.ceil(CROSSOVER * COVER_SCALE_MOB) + 2, MARK_X = W - MARK - 36;

function balanced(str, maxW, size) {
  const greedy = L.wrap(str, maxW, size);
  if (greedy.length !== 2) return greedy;
  const words = str.split(" ");
  let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" "), b = words.slice(i).join(" ");
    const wa = L.wpx(a, size), wb = L.wpx(b, size);
    if (wa > maxW || wb > maxW) continue;
    const score = Math.max(wa, wb);
    if (!best || score < best.score) best = { lines: [a, b], score };
  }
  return best ? best.lines : greedy;
}
function display(x, y, str, size, fill, maxW) {
  const lines = balanced(str, maxW, size);
  let svg = "";
  lines.forEach((ln, i) => { svg += `<text x="${x}" y="${y + i * size * TITLE_LH}" font-family=${ff(F.display)} font-size="${size}" font-weight="${DW}" letter-spacing="-1" fill="${fill}">${esc(ln)}</text>`; });
  return { svg, lines, bottom: y + (lines.length - 1) * size * TITLE_LH + size * 0.22 };
}
function kicker(x, y, text) {
  return `<rect x="${x}" y="${y - 11}" width="${RULE_W}" height="4" fill="${C.deep}"/>` +
    L.label(x + RULE_W + RULE_GAP, y, text, { size: KICKER_SIZE, fill: C.deep, ls: KICKER_LS });
}
function ring(y) {
  const p = T.ringMark("light", MARK);
  const href = "data:image/svg+xml;base64," + fs.readFileSync(p).toString("base64");
  return `<image href="${href}" x="${MARK_X}" y="${y}" width="${MARK}" height="${MARK}"/>`;
}
const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;

// Ink finder on a rendered PNG: extent of pixels matching pred inside a box.
async function ink(file, box, pred) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  let minX = W, maxX = -1, minY = H, maxY = -1;
  for (let y = box[1]; y < box[3]; y++) for (let x = box[0]; x < box[2]; x++) {
    const i = (y * info.width + x) * info.channels;
    if (pred(data[i], data[i + 1], data[i + 2])) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  return { minX, maxX, minY, maxY };
}
const isNavy = (r, g, b) => r < 90 && g < 90 && b < 90;
const isDeep = (r, g, b) => g - r > 40 && r < 120;           // teal-deep text on white
const inside = (p, c, pad) => Math.hypot(p[0] - c.cx, p[1] - c.cy) < c.r + pad;

(async () => {
  await T.assertFontsProbe(sharp);

  // 1. The canonical footer, UNCHANGED (L.footer: same string, size, colour, tracking), measured, then
  //    translated so its left edge sits on the text column. Centred on the canvas it ran through the
  //    mobile-web photo, which hid the lockup.
  const probeFile = path.join(OUT, `.footer_probe_${CLAIM_ID}.png`);
  await L.render(wrap(L.background(W, H, {}) + L.footer(W, H, { surface: SURFACE })), probeFile);
  const fp = await ink(probeFile, [0, FOOTER_TOP - 4, W, H], isDeep);
  fs.unlinkSync(probeFile);
  const FOOT_DX = X0 - fp.minX;

  // 2. Text block, centred vertically in the band above the footer.
  const probe = display(X0, 0, claim.text, TITLE_SIZE, C.navy, COL_W);
  if (probe.lines.length > 2) throw new Error("title wraps to " + probe.lines.length + " lines; it must hold two");
  const BLOCK_H = KICKER_CAP + KICKER_TO_TITLE + probe.bottom;
  const KICKER_Y = Math.round((FOOTER_TOP - BLOCK_H) / 2 + KICKER_CAP), TITLE_Y = KICKER_Y + KICKER_TO_TITLE;
  const t = display(X0, TITLE_Y, claim.text, TITLE_SIZE, C.navy, COL_W);
  const MARK_Y = Math.round((KICKER_Y - KICKER_CAP + t.bottom) / 2 - MARK / 2);
  if (KICKER_Y - KICKER_CAP < 48 || t.bottom > FOOTER_TOP - 40) throw new Error("text block crowds the top edge or the footer");

  const svg = wrap(L.background(W, H, {}) + kicker(X0, KICKER_Y, KICKER) + t.svg + ring(MARK_Y) +
    `<g transform="translate(${FOOT_DX},0)">${L.footer(W, H, { surface: SURFACE })}</g>`);
  const file = path.join(OUT, `linkedin_personal_banner_${CLAIM_ID}_1584x396.png`);
  await L.render(svg, file);

  // 3. Pixel gates on what actually rendered.
  const title = await ink(file, [0, TITLE_Y - TITLE_SIZE, W, Math.ceil(t.bottom)], isNavy);
  const kick = await ink(file, [0, KICKER_Y - KICKER_CAP - 12, SAFE_X1, KICKER_Y + 6], isDeep);
  const foot = await ink(file, [0, FOOTER_TOP - 4, W, H], isDeep);
  const gates = [
    ["title starts on the column", title.minX >= X0 - 4],
    ["title inside the column", title.maxX <= X1],
    ["kicker inside the column", kick.minX >= X0 - 1 && kick.maxX <= X1],
    ["footer aligned to the column", Math.abs(foot.minX - X0) <= 1],
    ["footer inside the safe area", foot.maxX <= SAFE_X1],
    ["ring outside the text, displays >= crossover everywhere", MARK_X > SAFE_X1 && MARK / COVER_SCALE_MOB >= CROSSOVER],
  ];
  // Every text ink box corner clear of all three avatar circles (+12px).
  for (const [nm, b] of [["title", title], ["kicker", kick], ["footer", foot]])
    for (const c of [[b.minX, b.minY], [b.minX, b.maxY], [b.maxX, b.minY], [b.maxX, b.maxY]])
      for (const [an, av] of [["token", TOKEN_AV], ["desktop", DESK], ["mobile web", MOB]])
        gates.push([`${nm} corner ${c} clear of ${an} photo`, !inside(c, av, 12)]);
  const failed = gates.filter((g) => !g[1]);
  if (failed.length) throw new Error("gates failed: " + failed.map((g) => g[0]).join("; "));
  console.log(`${CLAIM_ID}: ${gates.length} gates pass. title x ${title.minX}..${title.maxX}, kicker ${kick.minX}..${kick.maxX}, footer ${foot.minX}..${foot.maxX}, column ${X0}..${X1}, ring ${MARK}px at ${MARK_X}`);

  fs.writeFileSync(path.join(OUT, `linkedin_personal_banner_${CLAIM_ID}.json`), JSON.stringify({
    claim: claim.id, text: claim.text, lines: t.lines, kicker: KICKER, lockup: T.lockupFor(SURFACE),
    safe: [SAFE_X0, SAFE_X1], column: [X0, X1], titleSize: TITLE_SIZE,
    avatars: { token: TOKEN_AV, desktop: DESK, mobileWeb: MOB },
    kickerY: KICKER_Y, titleY: TITLE_Y, titleBottom: t.bottom, mark: { size: MARK, x: MARK_X, y: MARK_Y },
    footerDx: FOOT_DX, ink: { title, kicker: kick, footer: foot },
  }, null, 2));
})().catch((e) => { console.error(e.message); process.exit(1); });
