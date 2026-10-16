#!/usr/bin/env node
// verify_pixel_hashes.js: carousel no-regression, run on Al's machine.
// v2 (2026-10-16): compares BOTH the 4:5 and the 9:16 renders in Carousels/
// against a fresh build, now that the 9:16 renders are committed too. SHA-256 of
// DECODED RGB pixels, first 16 hex characters (Content's method).
//
//   node verify_pixel_hashes.js <repo>/Carousels <fresh-build-dir>
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto"), sharp = require("sharp");
const [ref, fresh] = process.argv.slice(2);
if (!ref || !fresh) { console.error("usage: node verify_pixel_hashes.js <repo>/Carousels <fresh-build-dir>"); process.exit(1); }
const SLUGS = ["2026-10-12_carousel_just-flaky", "2026-10-12_carousel_confidence-evidence", "2026-10-12_carousel_runbook-if-then"];
const pix = async (f) => { const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { h: crypto.createHash("sha256").update(data).digest("hex").slice(0, 16), w: info.width, ht: info.height, ct: fs.readFileSync(f)[25] }; };
(async () => {
  let bad = 0, n = 0;
  for (const size of ["1080x1350", "1080x1920"]) {
    console.log("\nNO REGRESSION, " + size + ":");
    const want = fs.readdirSync(ref).filter((f) => SLUGS.some((s) => f.startsWith(s)) && f.endsWith("_" + size + ".png")).sort();
    if (!want.length) { console.log("  (none committed at this size)"); continue; }
    for (const f of want) {
      n++;
      const nf = path.join(fresh, f);
      if (!fs.existsSync(nf)) { console.log("  MISSING  " + f); bad++; continue; }
      const a = await pix(path.join(ref, f)), b = await pix(nf);
      const ok = a.h === b.h && (b.ct === 2 || b.ct === 6); if (!ok) bad++;
      console.log("  " + (a.h === b.h ? "SAME    " : "CHANGED ") + f + "  " + a.h + (a.h === b.h ? "" : " -> " + b.h));
    }
  }
  console.log("\n" + n + " compared. " + (bad ? bad + " PROBLEM(S)" : "ALL GOOD"));
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
