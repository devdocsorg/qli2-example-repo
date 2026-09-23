# Copyright (c) 2026 DevDocs
# SPDX-License-Identifier: BSD-3-Clause
"""Configure the skeleton's Markdown site for hosted and direct-file browsing."""

# Optional string; default 'Project name not set'.
project = "QLI 2.0 repository skeleton"
# Optional list; default []. Render Markdown with MyST.
extensions = ["myst_parser"]
# Optional string; default 'index'. README owns the homepage content.
root_doc = "README"
# Optional integer; default 0. Preserve links to Markdown headings.
myst_heading_anchors = 4
# Optional boolean; default False. Reject unresolved cross-references.
nitpicky = True
# Optional list; default []. Do not parse build templates as documentation.
exclude_patterns = [".templates/**"]
# Optional list; default []. Resolve the additional HTML template locally.
templates_path = [".templates"]
# Optional mapping; default {}. Generate an entry point without a second source index.
html_additional_pages = {"index": "index.html"}
# Optional boolean; default True. Avoid fetch() of local files for search excerpts.
html_show_search_summary = False
# Optional boolean; default True. Page sources stay in the repository, not the site.
html_copy_source = False
# Optional boolean; default True. No copyright holder is configured, so omit the empty notice.
html_show_copyright = False
