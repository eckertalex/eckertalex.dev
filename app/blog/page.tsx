import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { RssIcon } from "lucide-react";

import { PostLink } from "@/components/post-link";

export default function BlogPage() {
	const posts = allPosts.sort((a, b) =>
		new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
	);

	return (
		<section>
			<div className="mb-4 flex items-end border-b pb-2">
				<h1 className="flex-1 scroll-m-20 text-4xl font-bold transition-colors">
					Blog
				</h1>
				<Link
					href="/rss.xml"
					className="flex items-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<RssIcon className="mr-1 size-4 text-orange-500" />
					<span>RSS</span>
				</Link>
			</div>
			<ul className="grid gap-4">
				{posts.map((post) => (
					<li key={post.slug}>
						<PostLink post={post} />
					</li>
				))}
			</ul>
		</section>
	);
}
