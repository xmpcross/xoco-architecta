# Customization Guide

Use this guide when adapting Architecta for a real publication.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, default metadata, canonical domain, language and date locale, contact details, social links, newsletter form settings, the pinned homepage lead, the About-page byline, and navigation labels.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

`siteConfig.featuredPosts` pins slugs to the homepage lead slideshow in slide order. Unknown or drafted slugs are skipped and any remaining slots fall back to the newest posts, so an empty array gives a purely chronological lead. Pick images that differ from one another — the lead is full-bleed and three near-identical photographs read as a stuck slideshow.

## Sections

Sections (the content collection calls them categories) live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename them there, then update demo posts so every `category` frontmatter value still matches the allowed list.

The `categoryLayouts` map in the same file controls how each section archive presents its posts. Every section must use one of three layouts:

- `featured` shows the newest post as a large overlay lead, followed by a card grid.
- `grid` uses the standard image-card grid.
- `list` displays one image-led editorial post per row.

Change a section's value in the map to switch its layout; no route or component duplication is required.

`categorySlug` derives URLs from the section name, lowercasing it and turning spaces and ampersands into hyphens — so `Light & Space` would become `/category/light-space/`.

Header and footer navigation are generated from that same list in [src/config/site.ts](./src/config/site.ts). You do not edit navigation labels or URLs separately unless you customize the layout components.

## Layout Track

The whole site sits on one container. `--container` (120rem) and `--gutter` in [src/styles/global.css](./src/styles/global.css) set it, and the header, footer, homepage, and every archive page use the same `.container` class, so they all align on the same measure.

The max-width only engages past roughly 1920px. Below that the page is effectively full-bleed with a small gutter; above it, the cap stops card grids stretching into unreadable widths. Lower `--container` for a more traditional centred column — nothing else needs to change.

Article bodies use `.container-reading` instead, capped by `--reading` (51.25rem), so long-form text keeps a comfortable measure regardless of how wide the page track is.

## Image Treatment

Photography is filtered by the theme, not by the image files, so a treatment applies to every photograph on the site without anyone editing a cover. Three tokens in `:root` control it, and out of the box they are pass-throughs — the theme ships in colour:

```css
--img-filter: none;
--img-filter-hover: none;
--img-overlay: transparent;
```

`--img-filter` is applied to covers, overlay cards, tiles, hero slides, sidebar thumbnails, author portraits, and images inside article prose. `--img-filter-hover` adds a little more contrast on hover so the treatment reads as intentional. `--img-overlay` is an ink wash multiplied over cover photography, which keeps a pale facade from reading as a blown-out white rectangle.

### Monochrome mode

For the strictly black-and-white treatment the rest of the design system is built around, put the grayscale values back in `:root`:

```css
--img-filter: grayscale(1) contrast(1.08) brightness(0.99);
--img-filter-hover: grayscale(1) contrast(1.16) brightness(1.02);
--img-overlay: rgb(12 12 11 / 0.14);
```

Nothing else needs editing — a colour cover dropped into a post lands monochrome on its own. The dark-mode block at `:root[data-theme="dark"]` redefines all three tokens separately, pulling photographs down so a bright facade does not glare out of a near-black page; adjust it to match if you switch light mode over.

## Shape

The theme is square. `--radius-tag`, `--radius-control`, `--radius-input`, and `--radius-block` are all `0`, and every block, control, tag, and media frame reads from them. Raise those four values to soften the entire theme in one place.

Author portraits are the exception: `--radius-avatar` is `50%`, so faces read as faces and a coauthored byline can stack its portraits into overlapping circles. Set it to `0` to square them up with everything else. `--avatar-ring` is the colour of the hairline ring that separates portraits in a stack — it matches the page surface, and the byline over a cover photograph swaps in the ink glass value instead.

`--frame` is `0` too: the ink bands (subscribe, statement, footer) run edge to edge. Give it a value to inset them from the page edge again.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  enabled: true,
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
}
```

The form submits only when `enabled` is `true` and `action` is non-empty. Otherwise the theme renders a clearly disabled preview. For production, connect it to your email provider or replace [src/components/NewsletterSignup.astro](./src/components/NewsletterSignup.astro) with provider-specific markup.

## Contact Form

The contact form follows the same safe-default pattern. Configure `siteConfig.contact` with `enabled: true`, a form endpoint in `action`, and the appropriate method. Until then, every control is disabled and no visitor data can be submitted. Contact email, office lines, and response time also live in `siteConfig`.

The default email, office, and social links are presentation-friendly examples. Replace them with real publication details before production; contact and newsletter form submission remain disabled until real endpoints are explicitly enabled.

## Post Frontmatter

Every post is validated by the schema in [src/content.config.ts](./src/content.config.ts). Beyond the obvious fields, a few are worth knowing about:

- Read time is not a frontmatter field. It is counted from the post body at build time, ignoring code blocks and Markdown syntax, at the reading speed set by `siteConfig.wordsPerMinute` (225 by default).
- `coauthors` adds names to the byline. Each entry takes the same `name` and `role` as `author`, and every name gets the same portrait, archive page, and author box as the lead author. Cards print the lead name and count the rest ("Malik Oyelaran +1") so a long byline cannot crowd the date out of the row; the article page prints every name in full, one author box each. Omit the field for a solo byline.
- `trending: true` promotes a post into the homepage most-read rail and the "Most read" index. Falls back to newest-first when too few posts are flagged.
- `draft: true` hides a post from every listing, feed, search index, and route.
- `cover.showInPost: false` keeps the cover for cards, rails, and social images but omits it from the article itself, so a post can run as a text-only document.
- `heroLayout` chooses the article's opening treatment. See [Story Layouts](#story-layouts) below.
- `updatedDate` renders an "Updated" line under the article body and drives `dateModified` in the article's JSON-LD.

## Story Layouts

`heroLayout` in a post's frontmatter picks one of four openings for its article page. All four are built from the same `cover` image and the same title block — only its placement, scale, and colour change — so switching a story from one to another is a one-line edit and never touches a component.

- `standard` (the default) opens with type: breadcrumbs, section tag, headline, standfirst, byline, then the cover at 3:2 inside the reading column. Nothing is cropped.
- `banner` runs the cover edge to edge as a strip above the headline, with the photo credit closing on the same right edge as the article body. The story opens with a picture without the picture taking over.
- `cover` gives the photograph the full width and lets it carry the headline, which sits in the scrim at the foot of the frame — left-aligned on the reading measure, so the headline starts on the same edge as the body copy beneath it.
- `immersive` fills the viewport with the photograph from the first pixel and rides the header on top of it: no bar background, light type, and the header out of the flow. The headline, standfirst, and byline are centred in the lower half. This is the only place in the theme where type is not aligned to the left edge of the track — there is nothing else on screen to align to.

The three photographic openings all set white type over a gradient scrim weighted to the part of the frame the text sits in. `immersive` scrims both ends and leaves the middle of the picture clear. Supply a cover that can carry type: a photograph that is bright and busy at the foot will fight the headline no matter how the scrim is tuned.

A post that sets `cover.showInPost: false` has no photograph to hang an opening on, so it always renders as `standard` regardless of `heroLayout`.

The demo assigns one post to each treatment and leaves the rest of the archive on `standard`:

| Layout      | Demo post                            |
| ----------- | ------------------------------------ |
| `standard`  | every post that does not set a value |
| `banner`    | A Bridge With Nothing to Prove       |
| `cover`     | The Museum That Hides Its Best Room  |
| `immersive` | The Brick That Outlived Its Argument |

`siteConfig.storyLayoutMenu` adds a "Layouts" menu to the header listing one post per treatment, so all four can be previewed without hunting through the archive. It is built from the archive at build time — the newest post using each layout — and treatments no post uses are left out. **Set it to `false` for a live site:** the menu disappears and the bar gives its slot back to a fourth inline section.

The openings live in [src/components/PostHero.astro](./src/components/PostHero.astro), and the title block they share is [src/components/PostHeroHead.astro](./src/components/PostHeroHead.astro). Their styles are the "Article openings" block in [src/styles/global.css](./src/styles/global.css).

## Homepage Composition

[src/pages/index.astro](./src/pages/index.astro) spends each story once. Every block takes from what the blocks above it left — lead, digest, most-read rail, long read, section spotlight, latest grid, ruled rows — so adding or removing a post never leaves a section empty and never prints the same headline twice. The two compact indices in the sidebar are the deliberate exception: they rank the whole archive, so they are allowed to repeat headlines.

Two blocks choose their own content. The long read is whichever remaining post has the longest read time, and the section spotlight is whichever section still has the deepest archive. Both fall back cleanly when the archive is small.

The homepage-only blocks live in [src/components/home](./src/components/home): the digest row, the long-read split, and the statement band. [src/components/RankedList.astro](./src/components/RankedList.astro) is the compact index and works anywhere a sidebar needs titles without thumbnails.

## Images

Posts keep images next to each Markdown file. Each cover needs useful alt text and a credit URL.

Source covers should be around 2400px wide. The homepage lead is full-bleed, so on a 1920px display it requests a 1920–2400px source; a 1200px file will visibly soften there. Astro generates the responsive variants during build, and the `widths` and `sizes` values on each `<Image>` are already tuned for the wide track — if you narrow `--container`, you can lower them.

Inline images in article prose are written as normal Markdown, with the credit as an italic line beneath. Wrap them in a `<figure>` if you want the styled caption treatment.

## Code Blocks

Fenced code blocks are highlighted at build time by Shiki using the light and dark theme pair in [src/config/code.ts](./src/config/code.ts). Both themes are emitted into the same markup and swapped by CSS, so code follows the reader's colour mode with no flash and no client-side highlighter. Change `codeThemes` to any [Shiki theme](https://shiki.style/themes) name to restyle code without touching a component.

A copy button is added to each block by a small script in [src/pages/post/\[slug\].astro](./src/pages/post/[slug].astro).

## Icons

Every icon in the theme — UI glyphs and social marks alike — comes from one local set: [Phosphor Icons](https://phosphoricons.com/) at regular weight, held as SVG files in [src/icons/phosphor](./src/icons/phosphor) and rendered by [src/components/ui/Icon.astro](./src/components/ui/Icon.astro). Nothing is requested at runtime and there is no icon font or sprite.

Phosphor's regular weight draws a 16/256 stroke, which lands on exactly 1px at a 16px icon — the same hairline the rest of the theme rules with. That is why this weight was chosen; switching to `light` or `bold` will read noticeably thinner or heavier than the rules around it.

To add an icon, drop `<name>.svg` into that folder and register it in the `icons` map in `Icon.astro`. Each file already carries `fill="currentColor"` and no intrinsic size, so colour comes from the surrounding text and size comes from the component's `size` prop.

To add a social network, add its mark, register it, then map the `siteConfig.socials` label to that icon name in [src/lib/socials.ts](./src/lib/socials.ts). Labels with no mapping fall back to a generic link glyph.

The MIT license notice ships in the icon folder.

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`
- `contact.astro`
- `privacy.astro`

Replace the starter copy with publication-specific masthead, advertising, privacy, and legal information.

## Search

Architecta includes static, client-side search with no database or hosted search service. The search button in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro) opens a command palette, while [src/pages/search.astro](./src/pages/search.astro) provides the full `/search/?q=...` results page.

The palette opens as an empty field: no default article list and no instructional copy. Results and a result count appear only once something is typed, and the panel collapses back to the field when the query is cleared.

At build time, [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) generates `/search-index.json` from every published post. The index contains the post title, excerpt, section, byline (every name on it, each with its archive URL), tags, date, and URL; it does not contain the full article body. The palette loads this index on the first keystroke, ranks title matches ahead of supporting metadata matches, and displays up to seven results. The full search page reads the `q` URL parameter and renders all matching posts.

Search can be opened from the header or with `Ctrl + K` on Windows and Linux, `Command + K` on macOS, or `/` while focus is outside a form control. Use the arrow keys to move through command-palette results and `Escape` to close it.

This approach is a good fit for publications with a few hundred posts and should remain comfortable around 1,000 posts. Filtering that amount of metadata in the browser is inexpensive, and the command palette limits the number of rendered results. For a large archive, consider limiting or paginating the full search page because a broad query can otherwise render many result cards at once.

For several thousand pages, full-body search, multilingual search, or richer filtering, consider replacing the built-in index with [Pagefind](https://pagefind.app/). Pagefind indexes the generated `dist` HTML after `astro build`, splits its static index into chunks, and does not require a search server. It is intentionally not included as a default dependency; adopting it requires adding Pagefind to the build and deployment pipeline and connecting its API to the existing search interface.

Because the built-in index is generated statically, newly published or edited posts become searchable after the next site build.

## Theme Tokens

Global colors, typography, borders, focus styles, dark mode, and motion rules live in [src/styles/global.css](./src/styles/global.css). Prefer editing tokens near the top of that file before changing individual components.

There is no colour in the palette. The "accent" used for links, focus, and active state is a darker step of the same neutral ramp, so hierarchy comes from weight and contrast. Introducing a hue means changing `--signal-*` and checking contrast in both modes.

## Typography

Architecta self-hosts [Geist](https://vercel.com/font) (variable weight, OFL-licensed) from `public/fonts/geist`. `--font-sans` covers headings and body; `--font-mono` uses Geist Mono.

Mono is load-bearing here rather than decorative. Because there is no second typeface and no colour, mono capitals carry the small-size hierarchy: section eyebrows, tags, dates, read times, buttons, navigation, and photo credits. The `.txt-mono` utility and `--ls-caps` set that treatment. If you swap typefaces, keep a mono pairing or those elements lose their distinction from body copy.

Sizes come from the `--fs-*` scale in `:root`, which steps up at the `40rem` and `64rem` breakpoints — change the scale there rather than per component. `--fs-display` is used only by the homepage lead. To swap typefaces, replace the `@font-face` rules and font tokens at the top of [src/styles/global.css](./src/styles/global.css) and drop your own font files in `public/fonts`.

## Scroll Reveal

Add the `reveal` class to any section to have it fade and rise into view as it scrolls into the viewport. Elements are fully visible without JavaScript or when the visitor has `prefers-reduced-motion` set; the reveal only activates progressively via a small IntersectionObserver script in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro). Avoid adding it to the lead or other above-the-fold content, since it delays first paint of content visitors already see on load.
