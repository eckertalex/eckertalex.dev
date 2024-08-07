import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PostLink } from "@/components/post-link";

export default function IndexPage() {
	const posts = allPosts
		.sort((a, b) =>
			new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
		)
		.slice(0, 3);

	return (
		<div className="flex flex-col gap-12">
			<section className="mt-8 flex flex-col-reverse gap-4 md:flex-row md:items-end">
				<div className="flex flex-1 flex-col items-start gap-2">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Hey, I'm Alexander
					</h1>
					<p className="text-xl text-muted-foreground">
						A developer who cares about the user.
					</p>
					<p className="text-xl text-muted-foreground">
						I am a software developer, father of two and husband to
						a wonderful wife.
					</p>
				</div>
				<Image
					alt="Alexander Eckert"
					width={88}
					height={88}
					quality={100}
					priority
					src="/portrait.jpg"
					className="rounded-md"
				/>
			</section>
			<section>
				<div className="mb-4 flex items-center">
					<h1 className="mt-2 flex-1 scroll-m-20 text-4xl font-bold">
						Latest Posts
					</h1>
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
