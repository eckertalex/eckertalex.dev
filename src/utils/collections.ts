import type { CollectionEntry } from "astro:content";

/**
 * Filter blog posts by published date and order them.
 *
 * @param posts Collection of blog posts
 * @returns Collection of blog posts sorted by date
 */
export function sortPostsByPubDate(
  posts: CollectionEntry<"blog">[] | null,
): CollectionEntry<"blog">[] {
  if (!posts) {
    return [];
  }

  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/**
 * Exclude draft posts from the collection. If the site is built in production mode, draft posts are excluded by default.
 *
 * @param post Blog post
 * @returns True if the post is not a draft
 */
export function excludeDrafts({ data }: CollectionEntry<"blog">): boolean {
  return !data.draft;
}
