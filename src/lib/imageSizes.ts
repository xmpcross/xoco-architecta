/**
 * Responsive `sizes` strings, one per layout the theme renders covers in.
 *
 * A `sizes` value that understates the rendered width is the usual cause of a
 * soft cover: the browser picks the srcset candidate for the width it was
 * promised, then paints it into a wider box. Each string below is derived from
 * the same tokens the layout uses, so the two stay in step.
 *
 *   --gutter     1rem below 40rem, 1.25rem to 64rem, 1.5rem above — per side
 *   --container  120rem, so the track stops growing at 123rem of viewport
 *                (120rem plus the 3rem of gutter it carries at that size)
 *   --sidebar    20rem, plus the 3rem `.with-sidebar` gap: 23rem comes out of
 *                the track from 64rem up
 *   grid gap     1.25rem between cards
 *
 *   track  = min(100vw - 2 x gutter, 120rem)
 *   main   = track - 23rem   (from 64rem up; the whole track below it)
 *
 * When a page lays cards out in something other than the grid a variant
 * defaults to, pass the matching string to `PostCard`'s `sizes` prop rather
 * than letting the default under-request.
 */
export const cardSizes = {
  /**
   * `.grid-cards--3` on the full track — the archive, tag, and author grids.
   * Four columns from 96rem, three from 64rem, two from 40rem.
   */
  gridWide: "(min-width: 96rem) 24vw, (min-width: 64rem) 31vw, (min-width: 40rem) 47vw, 94vw",

  /**
   * `.grid-cards` inside the `.with-sidebar` main column — the category pages.
   * Three columns of a track that is already 23rem narrower than the full one.
   */
  gridMain:
    "(min-width: 123rem) 31.5rem, (min-width: 64rem) calc((100vw - 28.5rem) / 3), (min-width: 40rem) calc((100vw - 3.75rem) / 2), calc(100vw - 2rem)",

  /** An overlay card in a three-up `Rail` — the most-read and related rails. */
  overlayRail: "(min-width: 64rem) 33vw, 92vw",

  /**
   * An overlay card filling the `.with-sidebar` main column — the lead story on
   * a `featured` category page. Roughly three times the width of a rail card,
   * which is why it cannot share the string above.
   */
  overlayMain:
    "(min-width: 123rem) 97rem, (min-width: 64rem) calc(100vw - 26rem), (min-width: 40rem) calc(100vw - 2.5rem), calc(100vw - 2rem)",

  /**
   * The media column of a `list` card, which is a fixed 18rem from 48rem up and
   * full width below it.
   */
  listMedia: "(min-width: 48rem) 18rem, calc(100vw - 2rem)",
} as const;
