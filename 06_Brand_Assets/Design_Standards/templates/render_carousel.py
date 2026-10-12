#!/usr/bin/env python3
"""RETIRED 2026-10-12.

This renderer drew carousels on the retired dark palette, so everything it
produced was off-brand. It refuses to run so nothing ships from it by accident.
The carousel producer is producers/mo_carousel.js (Carousel_Standard.md v3.0).
The old source is in git history before this commit.
"""
import sys

sys.exit(
    "render_carousel.py is RETIRED (2026-10-12). Use: "
    "node 06_Brand_Assets/Design_Standards/producers/mo_carousel.js build <spec.json> --out <dir>. "
    "See Carousel_Standard.md v3.0 for the spec format."
)
