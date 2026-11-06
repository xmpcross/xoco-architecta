import { categories, categorySlug } from "./categories";

export const siteConfig = {
  name: "Architecta",
  tagline: "The built environment, read at full scale",
  title: "Architecta - An editorial Astro theme for architecture publications",
  description:
    "An Astro theme for architecture publications: buildings, materials, cities, interiors, practice, and preservation.",
  siteUrl: "https://architecta.xocoweb.workers.dev",
  authorName: "Andrei Alba",
  email: "hello@example.com",
  language: "en",
  dateLocale: "en-US",
  /**
   * Reading speed used to estimate the "min read" line on cards and articles.
   * Read time is counted from the post body at build time, so no post carries
   * it in frontmatter. Lower it for denser, more technical writing.
   */
  wordsPerMinute: 225,
  locale: "en_US",
  socialImage: "/og-image.png",
  /** Short bio shown in the footer and under the About page header. */
  bio: "A journal about the built environment — what gets drawn, what gets built, what it costs to stand up, and who has to live with it afterwards.",
  /**
   * Slugs pinned to the homepage hero slider, in slide order. Unknown or
   * drafted slugs are skipped, and any remaining slots fall back to the newest
   * posts — so leaving this empty gives you a purely chronological hero.
   */
  featuredPosts: [
    "the-concrete-that-refused-to-be-polite",
    "the-street-is-the-only-room-everyone-uses",
    "the-museum-that-hides-its-best-room",
  ],
  /**
   * Demo affordance. Adds a "Layouts" menu to the header listing one post per
   * article opening treatment, so all four `heroLayout` options can be previewed
   * without hunting through the archive. Set this to `false` on a live site: the
   * menu disappears and the bar goes back to four inline sections plus "More".
   */
  storyLayoutMenu: true,
  /**
   * The byline that fronts the About page. `name` has to match an
   * `author.name` used in post frontmatter: the block links to that author's
   * archive and is skipped entirely when the name has no published posts.
   */
  editor: {
    name: "Vera Lindqvist",
    title: "Who runs it",
    /** Shown under the byline on the About page. Falls back to a generic line. */
    bio: "Vera runs the desk and still files on completed buildings, which is how most of the standards here got set. She spent eleven years in practice before writing about it, and it shows in the assignments she hands out: read the section, name the constraint, say who paid for the compromise.",
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "The week in built work.",
    description:
      "One email every couple of weeks: new stories, site notes, and the drawings worth a second look. No spam, unsubscribe anytime.",
    terms: "By subscribing you agree to our Terms of Use and Privacy Policy.",
  },
  contact: {
    enabled: false,
    action: "",
    method: "post",
    office: ["Studio 4, Kiln Wharf", "London N1 7RU"],
    responseTime: "Usually within two business days.",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export const categoryNavigation = categories.map((category) => ({
  label: category,
  href: `/category/${categorySlug(category)}/`,
}));

/**
 * Inline section slots in the desktop bar. The story-layout preview menu takes
 * one of them while it is switched on, so the bar keeps its width instead of
 * spilling past the wordmark on a 1024px screen.
 */
const inlineSections = siteConfig.storyLayoutMenu ? 3 : 4;

/**
 * Desktop navigation. The first few categories sit inline; the rest fold into
 * a hover submenu so the bar keeps its rhythm no matter how many categories a
 * publication defines.
 */
export const primaryNavigation: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  ...categoryNavigation.slice(0, inlineSections),
  {
    label: "More",
    href: "/posts/",
    children: [
      ...categoryNavigation.slice(inlineSections),
      { label: "Authors", href: "/author/" },
      { label: "All posts", href: "/posts/" },
    ],
  },
];

export const footerNavigation = [
  {
    title: "Sections",
    links: categoryNavigation,
  },
  {
    title: "Archive",
    links: [
      { label: "All posts", href: "/posts/" },
      { label: "Authors", href: "/author/" },
      { label: "Search", href: "/search/" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
  {
    title: "Journal",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];
