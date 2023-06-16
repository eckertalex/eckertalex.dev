import Link from 'next/link'
import { Post } from 'contentlayer/generated'

export function PostLink({ post }: { post: Post }) {
	return (
		<Link href={`/blog/${post.slug}`}>
			<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
				{post.title}
			</h2>
			<p className="leading-7 text-muted-foreground">{post.description}</p>
		</Link>
	)
}
