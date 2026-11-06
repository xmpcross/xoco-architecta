import { getCollection } from "astro:content";
import { authorSlug, formatDate, postBylines, postHref, visiblePosts } from "@/lib/posts";

export async function GET() {
  const posts = visiblePosts(await getCollection("posts"));
  const index = posts.map((post) => ({
    title: post.data.title,
    excerpt: post.data.excerpt,
    href: postHref(post),
    category: post.data.category,
    /** Every name on the byline, so a coauthor's name finds the post too. */
    bylines: postBylines(post).map((byline) => ({
      name: byline.name,
      href: `/author/${authorSlug(byline.name)}/`,
    })),
    tags: post.data.tags,
    date: formatDate(post.data.date),
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
