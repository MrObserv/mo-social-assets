"""mo_tokens.py - the single read path for MO brand tokens.

v3.1.0 states: "Producers read design-tokens.json. They do not carry palettes."
This module is how they do that. A producer must not define a hex.

    from mo_tokens import T
    T.light["teal-deep"]
    T.size("the_signal")            # alias-aware
    T.lockup_for("tech_tuesday")
    T.eyebrow_for("the_signal", 105)

Fails loudly. An unknown token raises rather than rendering the wrong colour,
because a silent fallback is how the old palettes survived four months.

Path: MO_TOKENS wins if set; otherwise walk UP from this file looking for
design-tokens.json.

---------------------------------------------------------------------------
Upgraded 2026-09-18. Five defects, all found by probing this reader rather
than reading it, and all of a kind this estate has hit before:

 1. PATH. _PATH looked only beside this file. design-tokens.json lives one
    level up in Design_Standards/, so every call raised FileNotFoundError
    unless MO_TOKENS was set by hand. mo-tokens.js fixed exactly this in its
    own loader and the Python side never followed. This is the reason nothing
    was consuming this module: it could not find the token file from its own
    home.
 2. lockup_for DEFAULTED. Any surface not in podcast_lane returned
    MASTERING OBSERVABILITY, including a surface in NEITHER lane, so a typo
    or a new surface silently acquired the house wordmark. The JS reader
    throws there on purpose: which wordmark a surface carries is a brand
    decision, not a default.
 3. NO ALIASING. size() and mode_for() read the raw surface name, so
    T.size("the_signal") raised even though the signal_masthead canvas
    existed. Same defect that was fixed in the JS reader on 2026-09-14.
 4. NO variant_for. Nothing enforced light-only on writing surfaces, so a
    Python producer could render a dark newsletter card and no gate objected.
 5. NO issue gate. The Signal's issue number is load-bearing and the rule
    lived only on the JS side, so the Python producer that ACTUALLY renders
    the masthead had no way to ask for it.
---------------------------------------------------------------------------
"""

import json
import os
import re

_HERE = os.path.dirname(os.path.abspath(__file__))


def _find_tokens():
    """MO_TOKENS, else walk up from here. Bounded at 5 levels.

    The previous version was os.path.join(_HERE, "design-tokens.json") and
    nothing else, which cannot succeed from producers/."""
    env = os.environ.get("MO_TOKENS")
    if env:
        return env, [env]
    tried = []
    d = _HERE
    for _ in range(5):
        cand = os.path.join(d, "design-tokens.json")
        tried.append(cand)
        if os.path.exists(cand):
            return cand, tried
        up = os.path.dirname(d)
        if up == d:
            break
        d = up
    return None, tried


class _Palette(dict):
    def __init__(self, scope, data):
        super().__init__(data)
        self._scope = scope

    def __getitem__(self, key):
        if key not in self:
            raise KeyError(
                "mo_tokens: unknown token %r in %s. Tokens are not invented at "
                "the producer. Add it to design-tokens.json via a CR." % (key, self._scope)
            )
        return dict.__getitem__(self, key)


class _Tokens:
    def __init__(self, path=None):
        tried = [path] if path else []
        if path is None:
            path, tried = _find_tokens()
        if not path or not os.path.exists(path):
            raise FileNotFoundError(
                "mo_tokens: design-tokens.json not found. Looked in:\n  %s\n"
                "Set MO_TOKENS to its full path, or run from inside the "
                "Design_Standards tree." % "\n  ".join(str(t) for t in tried)
            )
        with open(path, "r", encoding="utf-8") as fh:
            self.raw = json.load(fh)
        self.path = path
        self.version = self.raw["version"]
        self.light = _Palette("light", self.raw["colour"]["light"])
        self.dark = _Palette("dark", self.raw["colour"]["dark"])
        self.retired = self.raw["colour"].get("retired", {})
        self.type = self.raw["type"]
        self.structure = self.raw["structure"]
        self.motion = self.raw["motion"]
        self.marks = self.raw["marks"]

    # -- palette ------------------------------------------------------------
    def mode(self, m):
        if m not in ("light", "dark"):
            raise ValueError("mo_tokens: mode must be light or dark, got %r" % m)
        return self.light if m == "light" else self.dark

    @staticmethod
    def rgb(value):
        """"#0D2127" -> (13, 33, 39). Accepts a token value or a literal."""
        h = str(value).lstrip("#")
        if len(h) != 6:
            raise ValueError("mo_tokens: %r is not a 6-digit hex" % value)
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

    def wash(self, m):
        """The single radial teal wash opacity for a mode. Both values live in
        the token file: a producer that hardcodes 0.12 is the same defect as
        one that hardcodes a hex."""
        w = self.structure.get("wash", {})
        if m not in ("light", "dark"):
            raise ValueError("mo_tokens: wash mode must be light or dark, got %r" % m)
        if m not in w:
            raise KeyError("mo_tokens: no structure.wash value for %r" % m)
        return w[m]

    # -- surfaces -----------------------------------------------------------
    def canvas_name_for(self, surface):
        """Surface name -> CANVAS/MODE name. Declared, not duplicated."""
        return (self.raw.get("surface_aliases") or {}).get(surface) or surface

    def size(self, name):
        key = self.canvas_name_for(name)
        s = self.raw["canvas"].get(key)
        if not s:
            raise KeyError(
                "mo_tokens: no canvas size for %r%s. Add it to canvas, or map it "
                "in surface_aliases if it shares another surface's canvas."
                % (name, "" if key == name else " (aliased to %r)" % key)
            )
        return tuple(s)

    def mode_for(self, surface):
        """Which mode a named surface renders in, per the v3 rule."""
        if not surface:
            raise ValueError("mo_tokens: mode_for needs a surface name")
        n = self.canvas_name_for(surface)
        return "dark" if n in self.raw["mode"]["dark_surfaces"] else "light"

    def variant_for(self, surface, requested=None):
        """Resolve a requested mode for a dual-mode surface. Raises if the
        surface has no such variant, so a typo cannot silently ship.

        Does NOT alias: dual-mode is a property of the SURFACE, not of the
        canvas it renders on."""
        dual = (self.raw["mode"].get("dual_mode") or {}).get(surface)
        if not requested:
            return dual["default"] if dual else self.mode_for(surface)
        if not dual:
            raise ValueError(
                'mo_tokens: "%s" is not dual-mode. It renders %s only.'
                % (surface, self.mode_for(surface))
            )
        if requested not in (dual["default"], dual["variant"]):
            raise ValueError(
                'mo_tokens: "%s" has no %s variant. Permitted: %s, %s.'
                % (surface, requested, dual["default"], dual["variant"])
            )
        return requested

    def lockup_for(self, surface):
        """Which wordmark a surface carries. RAISES for a surface in neither
        lane: that is a brand decision, not a default."""
        lk = self.raw["lockup"]
        if surface in lk["podcast_lane"]:
            return "METRICS & MAYHEM"
        if surface in lk["house_lane"]:
            return "MASTERING OBSERVABILITY"
        raise KeyError(
            'mo_tokens: surface "%s" is in neither lockup lane. Which wordmark '
            "it carries is a brand decision, not a default. Add it to "
            "design-tokens.json." % surface
        )

    # -- the issue counter --------------------------------------------------
    def requires_issue(self, surface):
        """Does this surface have to carry an issue number?"""
        if not surface:
            raise ValueError("mo_tokens: requires_issue needs a surface name")
        ni = (self.raw.get("copy", {}).get("eyebrow_vocabulary", {})
              .get("newsletter_issue") or {})
        return surface in (ni.get("surfaces") or [])

    def eyebrow_for(self, surface, issue):
        """The eyebrow for a surface that carries an issue number.

        copy.eyebrow_vocabulary.newsletter is a TEMPLATE carrying {issue}, not
        a literal. Raises below the anchor: The Signal is a continuing
        publication and never restarts at 01."""
        if not self.requires_issue(surface):
            raise KeyError(
                'mo_tokens: "%s" does not carry an issue number. Surfaces that '
                "do are listed in copy.eyebrow_vocabulary.newsletter_issue."
                "surfaces." % surface
            )
        ev = self.raw["copy"]["eyebrow_vocabulary"]
        ni = ev["newsletter_issue"]
        tpl = str(ev["newsletter"])
        if "{issue}" not in tpl:
            raise ValueError(
                'mo_tokens: the newsletter eyebrow "%s" carries no {issue} '
                "placeholder. It is a template, not a literal, and a flattened "
                "one silently drops the number." % tpl
            )
        try:
            n = int(str(issue).strip())
        except (TypeError, ValueError):
            raise ValueError(
                "mo_tokens: issue must be a positive whole number, got %r" % issue
            )
        if n <= 0:
            raise ValueError(
                "mo_tokens: issue must be a positive whole number, got %r" % issue
            )
        floor = ni.get("first", 101)
        if n < floor:
            raise ValueError(
                "mo_tokens: issue %d is below the %d anchor. The Signal is a "
                "continuing publication and never restarts. Check the number."
                % (n, floor)
            )
        return tpl.replace("{issue}", str(n))

    # -- marks --------------------------------------------------------------
    def mark(self, name, variant):
        """Resolve a mark by NAME from the manifest. Never search the tree: a
        search of the brand folder returns marks that predate the ring mark."""
        m = self.marks.get(name)
        if not isinstance(m, dict):
            listed = sorted(k for k, v in self.marks.items()
                            if isinstance(v, dict) and v.get("role"))
            raise KeyError("mo_tokens: no mark named %r. Listed: %s"
                           % (name, ", ".join(listed)))
        rel = m.get(variant)
        if not rel:
            has = sorted(k for k, v in m.items()
                         if isinstance(v, str) and v.endswith(".svg"))
            raise KeyError('mo_tokens: mark %r has no %r variant. Has: %s'
                           % (name, variant, ", ".join(has)))
        base = os.environ.get("MO_BRAND_DIR") or os.path.dirname(_HERE)
        abs_path = os.path.join(base, rel)
        if not os.path.isfile(abs_path):
            raise FileNotFoundError(
                "mo_tokens: mark file missing: %s. The manifest lists it, so "
                "this is a missing file, not a wrong name." % abs_path
            )
        return abs_path

    def ring_mark(self, m, size_px):
        """Pick the ring-mark variant for a mode and a rendered size, applying
        the 40px crossover. Below it the hairlines vanish."""
        M = self.marks["ring_mark"]
        floor = M.get("min_px", 16)
        if size_px < floor:
            raise ValueError(
                "mo_tokens: ring mark below its %dpx minimum at %dpx. It stops "
                "reading as a mark." % (floor, size_px)
            )
        small = size_px < M.get("crossover_px", 40)
        variant = ("small_on_" if small else "on_") + ("dark" if m == "dark" else "light")
        return self.mark("ring_mark", variant)

    # -- gates --------------------------------------------------------------
    def assert_no_retired(self, source, label="source"):
        """Raise if a producer still holds a retired hex. Call it in your build."""
        hits = []
        for hex_val, why in self.retired.items():
            found = re.findall(re.escape(hex_val), str(source), re.I)
            if found:
                hits.append("%s x%d (%s)" % (hex_val, len(found), why))
        if hits:
            raise AssertionError(
                "mo_tokens: retired tokens in %s:\n  %s" % (label, "\n  ".join(hits))
            )
        return True


T = _Tokens()
