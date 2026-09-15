/**
 * mo-tokens.js — the single read path for MO brand tokens (Node + browser).
 *
 * v3.1.0 states: "Producers read design-tokens.json. They do not carry palettes."
 * This module is how they do that. A producer must not define a hex.
 *
 * Node:     const T = require('./mo-tokens.js');  T.light.teal
 * Browser:  <script src="mo-tokens.js"></script>  MOTokens.ready.then(T => ...)
 *
 * Fails loudly. A missing token throws rather than rendering the wrong colour,
 * because a silent fallback is how the old palettes survived four months.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require);
  else root.MOTokens = factory(null);
})(typeof self !== 'undefined' ? self : this, function (req) {

  var RAW = null;

  function load() {
    if (RAW) return RAW;
    if (req) {
      var fs = req('fs'), path = req('path');
      // Walk up from this file looking for design-tokens.json. The previous
      // version checked __dirname only, so a producer in producers/ could not
      // see the token file one level up in Design_Standards/ and every run
      // needed MO_TOKENS set by hand. Bounded at 5 levels; MO_TOKENS still
      // wins when set, for an out-of-tree token file.
      var p = process.env.MO_TOKENS, tried = [];
      if (!p) {
        var dir = __dirname;
        for (var i = 0; i < 5; i++) {
          var c = path.join(dir, 'design-tokens.json');
          tried.push(c);
          if (fs.existsSync(c)) { p = c; break; }
          var up = path.dirname(dir);
          if (up === dir) break;
          dir = up;
        }
      }
      if (!p || !fs.existsSync(p)) throw new Error(
        'mo-tokens: design-tokens.json not found. Looked in:\n  ' +
        (tried.length ? tried.join('\n  ') : String(p)) +
        '\nSet MO_TOKENS to its full path, or run from inside the Design_Standards tree.');
      RAW = JSON.parse(fs.readFileSync(p, 'utf8'));
    }
    return RAW;
  }

  function api(raw) {
    var retired = raw.colour.retired || {};

    function guard(scope, name, val) {
      if (val === undefined) {
        throw new Error('mo-tokens: unknown token "' + name + '" in ' + scope +
          '. Tokens are not invented at the producer. Add it to design-tokens.json via a CR.');
      }
      return val;
    }

    var T = {
      version: raw.version,
      raw: raw,
      light: new Proxy(raw.colour.light, { get: function (o, k) { return typeof k === 'string' ? guard('light', k, o[k]) : o[k]; } }),
      dark:  new Proxy(raw.colour.dark,  { get: function (o, k) { return typeof k === 'string' ? guard('dark', k, o[k]) : o[k]; } }),
      type: raw.type,
      structure: raw.structure,
      motion: raw.motion,
      canvas: raw.canvas,
      marks: raw.marks,
      lockup: raw.lockup,

      /** Palette for a surface. mode: 'light' | 'dark'. */
      mode: function (m) {
        if (m !== 'light' && m !== 'dark') throw new Error('mo-tokens: mode must be light or dark, got ' + m);
        return m === 'light' ? T.light : T.dark;
      },

      /** Resolve a surface name to its CANVAS/MODE name.
       *
       *  This estate carries two names for one thing: `blog_og` is the
       *  lockup-lane name and `og_card` is the canvas name. While blogthumb
       *  hardcoded "og_card" for its size and its lockup key separately, the
       *  mismatch was invisible. The moment the producer started resolving
       *  from the real surface, T.size('blog_og') threw.
       *
       *  Declared in the token file as surface_aliases rather than fixed by
       *  duplicating canvas entries — two entries for one canvas is how the
       *  two names arose in the first place. */
      canvasNameFor: function (surface) {
        var a = (raw.surface_aliases || {})[surface];
        return a || surface;
      },

      /** Which mode a named surface renders in, per the v3 rule. */
      modeFor: function (surface) {
        if (!surface) throw new Error('mo-tokens: modeFor needs a surface name');
        var n = T.canvasNameFor(surface);
        return raw.mode.dark_surfaces.indexOf(n) > -1 ? 'dark' : 'light';
      },

      /** Resolve a requested mode for a dual-mode surface. Throws if the
       *  surface has no such variant, so a typo cannot silently ship. */
      /** Resolve a requested mode for a dual-mode surface. Throws if the
       *  surface has no such variant, so a typo cannot silently ship.
       *
       *  DOES NOT ALIAS, deliberately. Dual-mode is a property of the SURFACE,
       *  not of the canvas it renders on. Aliasing here briefly let byte_size
       *  inherit og_card's dual-mode permission and accept --mode dark, which
       *  the writing-renders-light rule forbids. Caught by test 2026-09-14.
       *  dual_mode is therefore keyed by surface name, and a surface that is
       *  genuinely dual-mode is listed in its own right. */
      variantFor: function (surface, requested) {
        var dual = (raw.mode.dual_mode || {})[surface];
        if (!requested) return dual ? dual.default : T.modeFor(surface);
        if (!dual) throw new Error('mo-tokens: "' + surface + '" is not dual-mode. It renders ' + T.modeFor(surface) + ' only.');
        if (requested !== dual.default && requested !== dual.variant) {
          throw new Error('mo-tokens: "' + surface + '" has no ' + requested + ' variant. Permitted: ' + dual.default + ', ' + dual.variant + '.');
        }
        return requested;
      },

      /** Which wordmark a surface carries. */
      lockupFor: function (surface) {
        if (raw.lockup.podcast_lane.indexOf(surface) > -1) return 'METRICS & MAYHEM';
        if (raw.lockup.house_lane.indexOf(surface) > -1) return 'MASTERING OBSERVABILITY';
        throw new Error('mo-tokens: surface "' + surface + '" is in neither lockup lane. ' +
          'Which wordmark it carries is a brand decision, not a default. Add it to design-tokens.json.');
      },

      /** Canvas size for a named asset, [w, h]. */
      size: function (name) {
        var key = T.canvasNameFor(name);
        var s = raw.canvas[key];
        if (!s) throw new Error('mo-tokens: no canvas size for "' + name + '"' +
          (key !== name ? ' (aliased to "' + key + '")' : '') +
          '. Add it to canvas, or map it in surface_aliases if it shares another surface\'s canvas.');
        return s;
      },

      /** Scan a string for retired hexes. Returns a list of findings. */
      findRetired: function (source) {
        var hits = [];
        Object.keys(retired).forEach(function (hex) {
          var m = String(source).match(new RegExp(hex, 'ig'));
          if (m) hits.push(hex + ' x' + m.length + ' (' + retired[hex] + ')');
        });
        return hits;
      },

      /** Throws if a producer still holds a retired hex. Call it in your build. */
      assertNoRetired: function (source, label) {
        var hits = T.findRetired(source);
        if (hits.length) {
          throw new Error('mo-tokens: retired tokens in ' + (label || 'source') + ':\n  ' + hits.join('\n  '));
        }
        return true;
      },

      /** Scan a COMPOSED RENDER, not a source file.
       *
       *  assertNoRetired reads the producer's own source. A mark that is
       *  base64-embedded at render time passes straight through it, so the
       *  build goes green while shipping retired hexes. This decodes every
       *  data: URI in the markup and scans the payload too, so the thing
       *  checked is the thing that ships.
       *
       *  Call it on the final SVG string immediately before rasterising.
       */
      assertRenderClean: function (markup, label) {
        var s = String(markup);
        var hits = T.findRetired(s).map(function (h) { return 'markup: ' + h; });
        var re = /data:(image\/svg\+xml|text\/[a-z+]+);base64,([A-Za-z0-9+\/=]+)/g, m, n = 0;
        while ((m = re.exec(s)) !== null) {
          n++;
          var decoded;
          try {
            decoded = (typeof Buffer !== 'undefined')
              ? Buffer.from(m[2], 'base64').toString('utf8')
              : atob(m[2]);
          } catch (e) { continue; }
          T.findRetired(decoded).forEach(function (h) {
            hits.push('embedded asset #' + n + ': ' + h);
          });
        }
        if (hits.length) {
          throw new Error('mo-tokens: retired tokens in the RENDER of ' + (label || 'asset') +
            ' (' + n + ' embedded asset(s) decoded and scanned):\n  ' + hits.join('\n  '));
        }
        return true;
      },

      /** Scan files on disk — use for templates, marks and any asset a
       *  producer reads rather than contains. */
      assertFilesClean: function (paths) {
        if (!req) throw new Error('mo-tokens: assertFilesClean is Node only');
        var fs = req('fs'), hits = [];
        paths.forEach(function (p) {
          if (!fs.existsSync(p)) throw new Error('mo-tokens: asset not found: ' + p +
            '. A missing mark is a build failure, not a silent skip.');
          T.findRetired(fs.readFileSync(p, 'utf8')).forEach(function (h) { hits.push(p + ': ' + h); });
        });
        if (hits.length) throw new Error('mo-tokens: retired tokens in assets:\n  ' + hits.join('\n  '));
        return true;
      },

      /** Resolve a mark by NAME from the manifest. Never search the tree —
       *  a search of the brand folder returns marks that predate the ring
       *  mark. Throws on an unlisted name and on a missing file. */
      mark: function (name, variant) {
        var m = raw.marks[name];
        if (!m || typeof m !== 'object' || Array.isArray(m)) throw new Error('mo-tokens: no mark named "' + name + '". Listed: ' +
          Object.keys(raw.marks).filter(function (k) {
            var v = raw.marks[k];
            return v && typeof v === 'object' && !Array.isArray(v) && v.role;
          }).join(', '));
        var rel = m[variant];
        if (!rel) throw new Error('mo-tokens: mark "' + name + '" has no "' + variant + '" variant. Has: ' +
          Object.keys(m).filter(function (k) { return typeof m[k] === 'string' && /\.svg$/.test(m[k]); }).join(', '));
        if (req) {
          var path = req('path'), fs = req('fs');
          var abs = path.join(process.env.MO_BRAND_DIR || path.join(__dirname, '..'), rel);
          if (!fs.existsSync(abs)) throw new Error('mo-tokens: mark file missing: ' + abs +
            '. The manifest lists it, so this is a missing file, not a wrong name.');
          return abs;
        }
        return rel;
      },

      /** Pick the ring-mark variant for a mode and a rendered size, applying
       *  the 40px crossover. Below it the hairlines vanish. */
      ringMark: function (mode, sizePx) {
        var M = raw.marks.ring_mark;
        if (sizePx < (M.min_px || 16)) {
          throw new Error('mo-tokens: ring mark below its ' + M.min_px + 'px minimum at ' +
            sizePx + 'px. It stops reading as a mark.');
        }
        var small = sizePx < (M.crossover_px || 40);
        var variant = (small ? 'small_on_' : 'on_') + (mode === 'dark' ? 'dark' : 'light');
        return T.mark('ring_mark', variant);
      },

      /** Fonts: a BEHAVIOURAL probe, not a registry lookup.
       *
       *  The earlier version shelled fc-list, which does not exist on Windows
       *  and which answers the wrong question anyway: what is installed, not
       *  what renders. Every producer carries a font-family fallback stack, so
       *  a missing face silently renders in whatever the engine substitutes.
       *
       *  This renders one short string twice — once in the required family,
       *  once in a family guaranteed not to exist. If the two PNGs are
       *  byte-identical, the required family did NOT resolve and the first
       *  render was a substitution. That is the same signal as three
       *  byte-identical thumbnails, turned into a gate.
       *
       *  Pass your sharp instance: await T.assertFontsProbe(require('sharp'))
       */
      assertFontsProbe: async function (sharp, opts) {
        var need = raw.fonts && raw.fonts.required;
        if (!need) return true;
        var probe = function (family, weight) {
          var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="90">' +
            '<text x="6" y="62" font-family="' + family + '" font-weight="' + weight +
            '" font-size="56">Handgloves 123</text></svg>';
          return sharp(Buffer.from(svg), { density: 96 }).png().toBuffer();
        };
        var WEIGHTS = { Thin: 100, Light: 300, Regular: 400, Medium: 500,
                        SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
        // A contrasting generic for the second baseline. See the ambiguity note
        // below: 'monospace' for proportional targets, 'sans-serif' for mono.
        var contrast = function (family) {
          return /mono/i.test(family) ? 'sans-serif' : 'monospace';
        };
        var families = Object.keys(need), missing = [], unproven = [], checked = [];
        for (var i = 0; i < families.length; i++) {
          var family = families[i], styles = need[family];
          for (var j = 0; j < styles.length; j++) {
            var w = WEIGHTS[styles[j]] || 400;
            var got = await probe(family, w);
            var base = await probe('__MO_NoSuchFont_' + i + j + '__', w);
            checked.push(family + ' ' + styles[j]);
            if (!got.equals(base)) continue;   // resolved: differs from the fallback
            /* got === base. THIS IS NOT PROOF OF FAILURE, and treating it as
             * proof produced a false positive on 2026-09-14 against a face
             * that demonstrably rendered correctly.
             *
             * The reason: fontconfig picks a BEST MATCH for the baseline too.
             * When the requested weight is the heaviest face installed, the
             * best match for a nonexistent family AT THAT WEIGHT is the target
             * face itself. Both renders are then identical because the
             * fallback IS the target, not because the target was missing.
             * Montserrat ExtraBold at weight 800 is exactly that case.
             *
             * So disambiguate against a baseline pinned to a CONTRASTING
             * generic, which the target cannot satisfy. If the target also
             * matches that, nothing about the request is being honoured and it
             * is a real failure. If it does not, the result is AMBIGUOUS and
             * is reported rather than thrown — a gate that cannot tell the
             * difference must say so, not guess. */
            var alt = await probe('__MO_NoSuchFont_alt_' + i + j + '__, ' + contrast(family), w);
            if (got.equals(alt)) missing.push(family + ' ' + styles[j] + ' (weight ' + w + ')');
            else unproven.push(family + ' ' + styles[j] + ' (weight ' + w + ')');
          }
        }
        if (missing.length) {
          throw new Error('mo-tokens: these faces did NOT resolve — the renderer substituted a fallback:\n  ' +
            missing.join('\n  ') +
            '\n\nProbed ' + checked.length + ' faces. Each was checked twice: against a ' +
            'nonexistent family, and against a nonexistent family pinned to a contrasting generic. ' +
            'These faces matched BOTH, so the family request is not being honoured at all.' +
            '\n\n' + (raw.fonts.trap || '') +
            '\n' + (raw.fonts.rule || ''));
        }
        return { probed: checked.length, faces: checked, unproven: unproven };
      },

      /** Registry check, where a registry exists. Skipped rather than thrown
       *  when fontconfig is absent — Windows has no fc-list and that is not
       *  itself a failure. Use assertFontsProbe for the real gate.
       *
       *  ASKS fontconfig rather than GREPPING it. The previous version dumped
       *  `fc-list` and tested /Family:style=Style/ against the whole blob.
       *  That regex encoded the OLD non-compliant naming: once the faces were
       *  correctly normalised, fontconfig began printing parallel comma lists
       *
       *    Montserrat-ExtraBold.ttf: Montserrat,Montserrat ExtraBold:style=ExtraBold,Regular
       *
       *  in which that literal substring never appears. So the gate started
       *  failing BECAUSE the fonts had been fixed properly — and only on
       *  platforms that have fc-list, which meant it passed on Windows and
       *  hard-broke Linux and CI. The exact mirror of the defect it exists to
       *  catch. Raised by Content Management 2026-09-14.
       *
       *  fc-list takes a pattern. Let it do the matching; it understands its
       *  own naming model and we demonstrably do not. */
      assertFonts: function () {
        if (!req) return { skipped: 'browser' };
        var cp = req('child_process');
        try {
          cp.execSync('fc-list -V', { stdio: ['ignore', 'ignore', 'ignore'] });
        } catch (e) {
          return { skipped: 'no fontconfig CLI on this platform — use assertFontsProbe(sharp)' };
        }
        var need = raw.fonts && raw.fonts.required, missing = [], checked = 0;
        if (!need) return true;
        Object.keys(need).forEach(function (family) {
          need[family].forEach(function (style) {
            var hit;
            try {
              hit = cp.execSync('fc-list ' + JSON.stringify(family + ':style=' + style),
                { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
            } catch (e) { hit = ''; }
            checked++;
            if (!String(hit).trim()) missing.push(family + ' ' + style);
          });
        });
        if (missing.length) {
          throw new Error('mo-tokens: missing font faces:\n  ' + missing.join('\n  ') +
            '\n\n' + (raw.fonts.trap || '') + '\nAcceptance: ' + (raw.fonts.acceptance || ''));
        }
        return { verified: 'fontconfig', queried: checked };
      }
    };
    return T;
  }

  if (req) return api(load());

  var ready = fetch('design-tokens.json')
    .then(function (r) { if (!r.ok) throw new Error('mo-tokens: cannot fetch design-tokens.json'); return r.json(); })
    .then(api);
  return { ready: ready };
});
