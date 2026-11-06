# Changelog

All notable changes to Architecta are documented here.

## 1.0.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Added `AGENTS.md` with guidance for AI coding assistants.
- Files check out with LF line endings on every platform.

## 1.0.0 - 2026-08-14

- Initial commercial release.
- Near-full-bleed front page on one shared track: a full-height lead slideshow with clickable progress ticks, a four-up ruled digest, a most-read rail, a full-width long-read split, a section spotlight rail, a four-up latest grid with two compact indices beside it, an ink statement band, section tiles, and ruled editorial rows.
- One container for the entire site, so the header, footer, and every page section align on the same measure.
- Strictly black-and-white design system: no hue anywhere, with links, focus, and active state carried by a darker step of the same neutral ramp.
- Optional monochrome media pipeline — photography ships in colour, and a single filter token desaturates covers, tiles, hero slides, thumbnails, portraits, and prose images, with a hover contrast lift and an ink wash over cover photography, plus a dark-mode variant.
- Zero-radius shape system with the radius tokens retained, so the theme can be softened in four lines. Author portraits are the one exception: round by default, and squared up by a single token.
- Bare glyph controls throughout: no chips, outlines, or glass pills; arrows step forward on hover and icon buttons fade.
- Article pages with an 820px reading column, a reading-progress bar, share and copy-link actions, an author box, and a related rail.
- Four story layouts selected per post with the `heroLayout` frontmatter field — `standard`, `banner`, `cover`, and `immersive` — sharing one title block, plus an overlay header mode for the immersive opening and an optional header menu that previews all four.
- Coauthored bylines: a `coauthors` frontmatter list gives every name a portrait in the stacked byline, an archive page that counts the post, an author box on the article, and a place in the search index. Cards print the lead name and count the rest so the meta row keeps its line.
- Meta rows set in one voice — byline, date, and read time share a face, size, and tracking, with the article page marking its date and read time with glyphs.
- Section, tag, author, archive, search, about, contact, privacy, and 404 pages.
- Configurable per-section archive layouts: featured, grid, and editorial list.
- Client-side search with a command palette that opens as an empty field and renders results only once a query is typed, plus a dedicated results page.
- Markdown content collections with validated frontmatter, rule-marked blockquotes, and captioned figures.
- Read time calculated from the article body at build time at a configurable reading speed, so no post carries it in frontmatter.
- Scroll-snap rails that page horizontally on small screens and collapse into a grid on large ones, with no carousel dependency.
- One local icon set (Phosphor Icons, MIT) covering UI glyphs and social marks, at the weight whose stroke matches the theme's hairlines.
- Responsive Astro images sized for the wide track, canonical URLs, sitemap, RSS, Open Graph, Twitter/X cards, and JSON-LD.
- Self-hosted Geist and Geist Mono, with mono capitals carrying small-size hierarchy.
- Accessible skip link, landmarks, focus states, and reduced-motion support.
- Provider-neutral newsletter and contact form configuration.
