#!/usr/bin/env python3
"""Import a standalone HTML page into the site.

Does two things:

1. Pulls every base64-embedded image out of the HTML and writes it to
   assets/img/<slug>/ as a real image file, replacing the data: URI with a
   relative path. The same image used twice collapses to one file.
2. Injects the site's back-to-hub bar at the top of <body>.

Usage:
    py tools/import-page.py <source.html> <year> <slug> "<breadcrumb>"

Example:
    py tools/import-page.py "../Drink Menu.html" 2026 drink-menu "Christmas Cheer Carnival 2026"

Writes to pages/<year>/<slug>.html and assets/img/<slug>/.
Run it from the root of this repo. The source file is never modified.
"""

import base64
import hashlib
import os
import re
import sys

DATA_URI = re.compile(
    r"data:image/(png|jpe?g|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=\s]+?)(?=[\"'\)])",
    re.IGNORECASE,
)

EXT = {
    "png": "png",
    "jpg": "jpg",
    "jpeg": "jpg",
    "gif": "gif",
    "webp": "webp",
    "svg+xml": "svg",
}

BAR_MARKER = "site-hubbar"

# Keeps the page out of search results. See robots.txt for the other half.
NOINDEX = '<meta name="robots" content="noindex, nofollow">'

BAR_TEMPLATE = """
<style>
.site-hubbar{{position:relative;z-index:2147483647;display:flex;align-items:center;gap:.6rem;
  flex-wrap:wrap;padding:.55rem 1rem;background:#1d2a24;color:#f3e8d2;
  font:600 .82rem/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  letter-spacing:.02em;border-bottom:2px solid #c8a24a;box-sizing:border-box}}
.site-hubbar a{{color:#f3e8d2;text-decoration:none;border-bottom:1px solid transparent;padding-bottom:1px}}
.site-hubbar a:hover,.site-hubbar a:focus{{border-bottom-color:#c8a24a;color:#fff}}
.site-hubbar .sep{{color:#7e8b82}}
.site-hubbar .here{{color:#c8a24a}}
</style>
<div class="site-hubbar">
  <a href="{root}index.html">&#8592; Glave Family Happenings</a>
  <span class="sep">/</span>
  <a href="{root}year.html?y={year}">{year}</a>
  <span class="sep">/</span>
  <span class="here">{crumb}</span>
</div>
"""


def slug_images(html, slug, root_prefix, img_dir):
    """Replace every data: image URI with a written-out file path."""
    seen = {}

    def replace(match):
        kind = match.group(1).lower()
        payload = re.sub(r"\s+", "", match.group(2))
        try:
            raw = base64.b64decode(payload)
        except Exception:
            return match.group(0)  # leave anything that will not decode alone

        digest = hashlib.sha1(raw).hexdigest()[:10]
        if digest not in seen:
            name = "{}.{}".format(digest, EXT.get(kind, "png"))
            os.makedirs(img_dir, exist_ok=True)
            with open(os.path.join(img_dir, name), "wb") as fh:
                fh.write(raw)
            seen[digest] = name
            print("  wrote assets/img/{}/{}  ({:,} bytes)".format(slug, name, len(raw)))

        return "{}assets/img/{}/{}".format(root_prefix, slug, seen[digest])

    return DATA_URI.sub(replace, html), len(seen)


def inject_noindex(html):
    """Add the robots meta to <head>. It only counts if it is in the head,
    and it goes after the charset declaration, which belongs first."""
    if 'name="robots"' in html:
        return html

    anchor = (re.search(r"<meta[^>]*charset[^>]*>", html, re.IGNORECASE)
              or re.search(r"<head[^>]*>", html, re.IGNORECASE))
    if anchor:
        return html[: anchor.end()] + "\n" + NOINDEX + html[anchor.end():]
    return NOINDEX + html


def inject_bar(html, root_prefix, year, crumb):
    if BAR_MARKER in html:
        return html  # already imported once; do not stack bars

    bar = BAR_TEMPLATE.format(root=root_prefix, year=year, crumb=crumb)
    match = re.search(r"<body[^>]*>", html, re.IGNORECASE)
    if match:
        return html[: match.end()] + bar + html[match.end():]
    return bar + html


def main():
    if len(sys.argv) != 5:
        print(__doc__)
        return 1

    source, year, slug, crumb = sys.argv[1:5]
    root_prefix = "../../"  # pages/<year>/<slug>.html back to the repo root
    img_dir = os.path.join("assets", "img", slug)
    dest = os.path.join("pages", year, slug + ".html")

    with open(source, "r", encoding="utf-8", errors="replace") as fh:
        html = fh.read()

    before = len(html)
    print("{} ({:,} bytes)".format(os.path.basename(source), before))

    html, count = slug_images(html, slug, root_prefix, img_dir)
    html = inject_noindex(html)
    html = inject_bar(html, root_prefix, year, crumb)

    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w", encoding="utf-8") as fh:
        fh.write(html)

    after = len(html)
    print("  -> {}  ({:,} bytes, {} image{} extracted, {:.0f}% smaller)".format(
        dest, after, count, "" if count == 1 else "s",
        100 * (1 - after / before) if before else 0))
    return 0


if __name__ == "__main__":
    sys.exit(main())
