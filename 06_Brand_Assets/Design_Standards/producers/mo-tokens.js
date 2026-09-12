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
      var p = process.env.MO_TOKENS || path.join(__dirname, 'design-tokens.json');
      if (!fs.existsSync(p)) throw new Error('mo-tokens: design-tokens.json not found at ' + p + '. Set MO_TOKENS.');
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
        return raw.mode.dark_surfaces.indexOf(surface) > -1 ? 'dark' : 'light';
      },

      /** Which wordmark a surface carries. */
      lockupFor: function (surface) {
        return raw.lockup.podcast_lane.indexOf(surface) > -1
          ? 'METRICS & MAYHEM' : 'MASTERING OBSERVABILITY';
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
