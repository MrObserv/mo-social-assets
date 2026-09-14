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

      // PATH RESOLUTION CORRECTED 2026-09-14.
      // This previously looked ONLY beside itself: path.join(__dirname, 'design-tokens.json').
      // design-tokens.json actually lives one level up in Design_Standards/, while this
      // module lives in producers/, so every producer failed on the first real run.
      // Now it tries both, nearest first, so it works whether the token file sits beside
      // this module or one directory up. MO_TOKENS still overrides everything.
      var p = process.env.MO_TOKENS || null;
      var tried = [];
      if (!p) {
        var candidates = [
          path.join(__dirname, 'design-tokens.json'),
          path.join(__dirname, '..', 'design-tokens.json')
        ];
        for (var ci = 0; ci < candidates.length; ci++) {
          tried.push(candidates[ci]);
          if (fs.existsSync(candidates[ci])) { p = candidates[ci]; break; }
        }
        if (!p) p = candidates[candidates.length - 1];
      }
      // The error names every path tried, because "not found at <one path>" sends you
      // looking in the wrong place when the real problem is which paths were searched.
      if (!fs.existsSync(p)) {
        throw new Error(
          'mo-tokens: design-tokens.json not found. Tried: ' +
          (tried.length ? tried.join(' , ') : p) +
          '. Set MO_TOKENS to its absolute path to override.'
        );
      }
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

      /** Which mode a named surface renders in, per the v3 rule. */
      modeFor: function (surface) {
        if (!surface) throw new Error('mo-tokens: modeFor needs a surface name');
        return raw.mode.dark_surfaces.indexOf(surface) > -1 ? 'dark' : 'light';
      },

      /** Resolve a requested mode for a dual-mode surface. Throws if the
       *  surface has no such variant, so a typo cannot silently ship. */
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
        var s = raw.canvas[name];
        if (!s) throw new Error('mo-tokens: no canvas size for "' + name + '"');
        return s;
      },

      /** Throws if a producer still holds a retired hex. Call it in your build. */
      assertNoRetired: function (source, label) {
        var hits = [];
        Object.keys(retired).forEach(function (hex) {
          var re = new RegExp(hex.replace('#', '#'), 'ig');
          var m = String(source).match(re);
          if (m) hits.push(hex + ' x' + m.length + ' (' + retired[hex] + ')');
        });
        if (hits.length) {
          throw new Error('mo-tokens: retired tokens in ' + (label || 'source') + ':\n  ' + hits.join('\n  '));
        }
        return true;
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
