"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { ArrowRightIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PostLink } from "@/components/post-link";

export default function NotFound() {
	const posts = allPosts
		.sort((a, b) =>
			new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
		)
		.slice(0, 3);
	const path = usePathname();

	return (
		<div className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
			<section className="flex h-96 flex-col justify-center md:h-auto">
				<h1 className="text-lg md:text-3xl md:font-semibold">
					Oh no, you found a page that's missing!
				</h1>
				<p className="text-lg text-muted-foreground md:text-3xl md:font-semibold">
					{`Sorry, "${path}" is not a page on `}
					<Link href="/" className="underline underline-offset-4">
						{siteConfig.url}
					</Link>
					.
				</p>
			</section>
			<section>
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="text-lg md:text-3xl md:font-semibold">
							Looking for something to read?
						</h1>
						<p className="text-lg text-muted-foreground md:text-3xl md:font-semibold">
							Have a look at these articles.
						</p>
					</div>
					<Link
						href="/blog"
						className={cn(
							buttonVariants({ variant: "link" }),
							"text-xl"
						)}
					>
						<span>Read all posts</span>
						<ArrowRightIcon className="ml-2 size-5" />
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
		</div>
	);
}
