import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { siteConfig } from "../content/siteConfig.ts";
import { excludeDrafts } from "../utils/collections";

export const GET: APIRoute = async () => {
  const blog = await getCollection("blog", excludeDrafts);

  return rss({
    title: `${siteConfig.name}'s Blog`,
    description: siteConfig.description,
    site: siteConfig.site,
    trailingSlash: false,
    items: blog.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}`,
      };
    }),
  });
};
