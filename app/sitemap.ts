import { allPosts } from "contentlayer/generated";

import { siteConfig } from "@/config/site";

export default async function sitemap() {
	const posts = allPosts.map((post) => ({
		url: `${siteConfig.url}/blog/${post.slug}`,
		lastModified: post.publishedAt,
	}));

	const routes = ["", "/about", "/blog"].map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...posts];
}
