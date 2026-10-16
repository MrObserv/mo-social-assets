#!/usr/bin/env node
// verify_cards.js: Content's acceptance for the 9:16 ebook cards, run on Al's machine.
// SHA-256 of DECODED RGB pixels, first 16 hex characters, the method Content
// uses. Checks the pinned 1200x630 cards are unchanged, then prints the 9:16
// cards for the handback. Exit code 1 on any problem.
//
//   node verify_cards.js <repo>/cards/2026-10-16_ebook_launch <fresh-build-dir>
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto"), sharp = require("sharp");
const [dir, fresh] = process.argv.slice(2);
if (!dir || !fresh) { console.error("usage: node verify_cards.js <cards-dir> <fresh-build-dir>"); process.exit(1); }
const PINNED = { "og_ebook_outcome-question_1200x630.png": "14480b949c27adfe", "og_ebook_signal-audit_1200x630.png": "515082f88e8a69a7" };
const NEW = ["og_ebook_outcome-question_1080x1920.png", "og_ebook_signal-audit_1080x1920.png"];
const pix = async (f) => { const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { h: crypto.createHash("sha256").update(data).digest("hex").slice(0, 16), w: info.width, ht: info.height, ct: fs.readFileSync(f)[25] }; };
(async () => {
  let bad = 0;
  console.log("NO REGRESSION, 1200x630 (pinned by Content):");
  for (const [f, want] of Object.entries(PINNED)) {
    const p = await pix(path.join(dir, f)); const ok = p.h === want; if (!ok) bad++;
    console.log("  " + (ok ? "SAME    " : "CHANGED ") + f + "  " + p.h + (ok ? "" : "  (want " + want + ")"));
  }
  console.log("\n9:16 CARDS:");
  for (const f of NEW) {
    const p = path.join(fresh, f);
    if (!fs.existsSync(p)) { console.log("  MISSING " + f); bad++; continue; }
    const q = await pix(p); const ok = q.w === 1080 && q.ht === 1920 && (q.ct === 2 || q.ct === 6); if (!ok) bad++;
    console.log("  " + (ok ? "OK  " : "BAD ") + f + "  " + q.w + "x" + q.ht + " type " + q.ct + "  " + q.h);
  }
  console.log("\n" + (bad ? bad + " PROBLEM(S)" : "ALL GOOD"));
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
