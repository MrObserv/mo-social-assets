"""mo_tokens.py - the single read path for MO brand tokens.

v3.1.0 states: "Producers read design-tokens.json. They do not carry palettes."
This module is how they do that. A producer must not define a hex.

    from mo_tokens import T
    T.light["teal-deep"]
    T.size("episode_square")
    T.lockup_for("tech_tuesday")

Fails loudly. An unknown token raises rather than rendering the wrong colour,
because a silent fallback is how the old palettes survived four months.

Path: set MO_TOKENS, or drop design-tokens.json beside this file.
"""

import json
import os
import re

_HERE = os.path.dirname(os.path.abspath(__file__))
_PATH = os.environ.get("MO_TOKENS") or os.path.join(_HERE, "design-tokens.json")


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
    def __init__(self, path=_PATH):
        if not os.path.exists(path):
            raise FileNotFoundError(
                "mo_tokens: design-tokens.json not found at %s. Set MO_TOKENS." % path
            )
        with open(path, "r", encoding="utf-8") as fh:
            self.raw = json.load(fh)
        self.version = self.raw["version"]
        self.light = _Palette("light", self.raw["colour"]["light"])
        self.dark = _Palette("dark", self.raw["colour"]["dark"])
        self.retired = self.raw["colour"].get("retired", {})
        self.type = self.raw["type"]
        self.structure = self.raw["structure"]
        self.motion = self.raw["motion"]
        self.marks = self.raw["marks"]

    def mode(self, m):
        if m not in ("light", "dark"):
            raise ValueError("mo_tokens: mode must be light or dark, got %r" % m)
        return self.light if m == "light" else self.dark

    def mode_for(self, surface):
        """Which mode a named surface renders in, per the v3 rule."""
        return "dark" if surface in self.raw["mode"]["dark_surfaces"] else "light"

    def lockup_for(self, surface):
        """Which wordmark a surface carries."""
        return ("METRICS & MAYHEM" if surface in self.raw["lockup"]["podcast_lane"]
                else "MASTERING OBSERVABILITY")

    def size(self, name):
        s = self.raw["canvas"].get(name)
        if not s:
            raise KeyError("mo_tokens: no canvas size for %r" % name)
        return tuple(s)

    def duration(self, name):
        d = self.motion["durations_ms"].get(name)
        if d is None:
            raise KeyError("mo_tokens: no duration %r" % name)
        return d

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
