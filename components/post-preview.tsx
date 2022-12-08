import Link from 'next/link'
import { BlogPost } from '../.contentlayer/generated'

export function PostPreview(props: {
	post: Pick<BlogPost, 'slug' | 'title' | 'summary'>
}) {
	const { post } = props

	return (
		<Link href={`/blog/${post.slug}`} className="w-full">
			<div className="w-full mb-8">
				<h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
					{post.title}
				</h4>
				<p className="text-gray-600 dark:text-gray-400">{post.summary}</p>
			</div>
		</Link>
	)
}
