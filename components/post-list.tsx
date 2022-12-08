import { BlogPost } from '../.contentlayer/generated'
import { PostPreview } from './post-preview'

export function PostList({
	posts,
}: {
	posts: Pick<BlogPost, 'slug' | 'title' | 'summary'>[]
}) {
	return (
		<ul>
			{posts.map((post) => {
				return (
					<li key={post.slug}>
						<PostPreview post={post} />
					</li>
				)
			})}
		</ul>
	)
}
