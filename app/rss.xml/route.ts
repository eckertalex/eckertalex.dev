import { allPosts } from "contentlayer/generated";
import RSS from "rss";

import { siteConfig } from "@/config/site";

export async function GET() {
	const rss = new RSS({
		title: siteConfig.name,
		description: siteConfig.description,
		site_url: siteConfig.url,
		feed_url: `${siteConfig.url}/rss.xml`,
	});

	allPosts
		.sort((a, b) =>
			new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
		)
		.forEach((post) => {
			rss.item({
				title: post.title,
				url: `${siteConfig.url}/blog/${post.slug}`,
				date: post.publishedAt,
				description: post.description,
			});
		});

	return new Response(rss.xml({ indent: true }), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
