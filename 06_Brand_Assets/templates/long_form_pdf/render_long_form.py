"""render_long_form.py v1.0.0, 2026-09-23. Long_Form_PDF_Standard_v2.md section 6.

Resolves a long-form template's {{mo:...}} placeholders from design-tokens.json
through mo_tokens.py, gates the result, and (with --pdf) renders it in WeasyPrint.
The template holds no colour; this is the only place colour enters.

    python render_long_form.py reference_strategy_template.html --pdf "out.pdf"
    python render_long_form.py reference_strategy_template.html --html resolved.html

Placeholder grammar (anything else raises):
    {{mo:light.ink}}               token value            -> #16282D
    {{mo:dark.teal-bright}}        token value            -> #74DDCD
    {{mo:rgba:dark.teal:0.10}}     token at an alpha      -> rgba(47,158,141,0.10)
    {{mo:url:light.teal}}          token, URL-encoded     -> %232F9E8D  (for data: SVG)
    {{mo:raw:structure.radius.card}}  any scalar in the token file
    {{mo:mark:ring_mark:on_dark}}  mark resolved BY NAME  -> file:///.../marks/...svg

Gates, all of which raise:
    1. the TEMPLATE holds zero colour literals (hex, rgb(), named) outside nothing:
       comments included, because assert_no_retired scans comments too
    2. no placeholder survives resolution
    3. no retired hex in the output (mo_tokens.assert_no_retired)
    4. every hex in the output is a DECLARED token value, so nothing can enter
       by any other route
"""

import argparse
import os
import pathlib
import re
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
# templates/long_form_pdf/ -> 06_Brand_Assets/Design_Standards/producers/
sys.path.insert(0, os.path.normpath(os.path.join(_HERE, "..", "..", "Design_Standards", "producers")))
from mo_tokens import T  # noqa: E402

VERSION = "1.0.0"
PLACEHOLDER = re.compile(r"\{\{mo:([^}]+)\}\}")
HEX6 = re.compile(r"(?<![&\w])#[0-9a-fA-F]{6}\b")
HEX3 = re.compile(r"(?<![&\w])#[0-9a-fA-F]{3}\b")
RGB = re.compile(r"rgba?\(\s*\d")
NAMED = re.compile(r"(?:color|background|border[a-z-]*|fill|stroke)\s*[:=]\s*['\"]?[^;{'\"]*\b(white|black|red|teal|navy)\b", re.I)


def _token(ref):
    mode, _, name = ref.partition(".")
    if not name:
        raise ValueError("render_long_form: %r is not mode.token" % ref)
    return T.mode(mode)[name]          # unknown mode or token raises in mo_tokens


def _raw(path):
    node = T.raw
    for part in path.split("."):
        if not isinstance(node, dict) or part not in node:
            raise KeyError("render_long_form: no %r in design-tokens.json" % path)
        node = node[part]
    if isinstance(node, (dict, list)):
        raise TypeError("render_long_form: %r is not a scalar" % path)
    return str(node)


def resolve_one(expr):
    kind, _, rest = expr.partition(":")
    if kind == "rgba":
        ref, _, alpha = rest.rpartition(":")
        a = float(alpha)
        if not 0 <= a <= 1:
            raise ValueError("render_long_form: alpha %r out of range" % alpha)
        r, g, b = T.rgb(_token(ref))
        return "rgba(%d,%d,%d,%s)" % (r, g, b, alpha)
    if kind == "url":
        return "%23" + _token(rest).lstrip("#")
    if kind == "raw":
        return _raw(rest)
    if kind == "mark":
        name, _, variant = rest.partition(":")
        return pathlib.Path(T.mark(name, variant)).as_uri()
    if ":" in expr:
        raise ValueError("render_long_form: unknown placeholder kind %r" % kind)
    return _token(expr)


def template_literals(src):
    """Every colour literal in a template. Comments are NOT exempt."""
    return HEX6.findall(src) + HEX3.findall(src) + RGB.findall(src) + [m.group(0) for m in NAMED.finditer(src)]


def resolve(src, label="template"):
    lits = template_literals(src)
    if lits:
        raise AssertionError("render_long_form: %s holds %d colour literal(s): %s. "
                             "Colours come from tokens by name." % (label, len(lits), ", ".join(lits[:8])))
    out = PLACEHOLDER.sub(lambda m: resolve_one(m.group(1).strip()), src)
    left = re.findall(r"\{\{[^}]*\}\}", out)
    if left:
        raise AssertionError("render_long_form: unresolved placeholder(s): %s" % ", ".join(left[:5]))
    T.assert_no_retired(out, label + " (resolved)")
    declared = {v.upper() for pal in (T.light, T.dark) for v in pal.values()}
    stray = sorted({h.upper() for h in HEX6.findall(out)} - declared)
    if stray:
        raise AssertionError("render_long_form: undeclared hex in output: %s" % ", ".join(stray))
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description="Resolve and render a long-form PDF template.")
    ap.add_argument("template")
    ap.add_argument("--pdf", help="write the PDF here (needs WeasyPrint 69+)")
    ap.add_argument("--html", help="write the resolved HTML here")
    a = ap.parse_args(argv)
    with open(a.template, encoding="utf-8") as fh:
        src = fh.read()
    out = resolve(src, os.path.basename(a.template))
    n = len(PLACEHOLDER.findall(src))
    print("render_long_form v%s, tokens %s: %d placeholders resolved, gates passed"
          % (VERSION, T.version, n))
    if a.html:
        with open(a.html, "w", encoding="utf-8") as fh:
            fh.write(out)
        print("  html:", a.html)
    if a.pdf:
        import weasyprint
        major = int(weasyprint.__version__.split(".")[0])
        if major < 69:
            raise RuntimeError("render_long_form: WeasyPrint %s; the standard requires 69+"
                               % weasyprint.__version__)
        base = os.path.dirname(os.path.abspath(a.template))
        weasyprint.HTML(string=out, base_url=base).write_pdf(a.pdf)
        print("  pdf:", a.pdf)
    if not (a.html or a.pdf):
        print("  (gates only; pass --pdf or --html to write output)")


if __name__ == "__main__":
    main()
