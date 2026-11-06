export const categories = [
  "Projects",
  "Materials",
  "Urbanism",
  "Interiors",
  "Practice",
  "Preservation",
] as const;

export type Category = (typeof categories)[number];

/**
 * Controls how each category page presents its posts:
 * - "featured": a large lead story followed by a card grid
 * - "grid": the standard card grid
 * - "list": one image-led editorial row per post
 */
export type CategoryLayout = "featured" | "grid" | "list";

export const categoryLayouts: Record<Category, CategoryLayout> = {
  Projects: "featured",
  Materials: "grid",
  Urbanism: "list",
  Interiors: "grid",
  Practice: "list",
  Preservation: "featured",
};

export const categorySlug = (category: Category) =>
  category
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");

export const categoryMeta: Record<Category, { description: string }> = {
  Projects: {
    description:
      "Completed buildings read closely: the plan, the section, the compromise, and whether the idea survived the site.",
  },
  Materials: {
    description:
      "Concrete, timber, steel, glass, and brick — what each one costs, how it ages, and what it commits you to.",
  },
  Urbanism: {
    description:
      "Streets, blocks, density, and public space: the decisions that shape a city long after the architects leave.",
  },
  Interiors: {
    description:
      "Light, acoustics, circulation, and finish — the part of a building people actually touch every day.",
  },
  Practice: {
    description:
      "How studios work: drawing, models, contracts, fees, site visits, and the habits that keep a project honest.",
  },
  Preservation: {
    description:
      "Reuse, retrofit, and repair — keeping what already stands, and arguing properly about what should not come down.",
  },
};
