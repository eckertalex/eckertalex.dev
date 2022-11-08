import { List, ListItem } from '@chakra-ui/react'
import { BlogPost } from '../../.contentlayer/generated'
import { PostPreview } from './post-preview'

export function PostList({
	posts,
}: {
	posts: Pick<BlogPost, 'slug' | 'title' | 'summary'>[]
}) {
	return (
		<List marginTop={4} spacing={8}>
			{!posts.length ? <ListItem>No posts found.</ListItem> : null}
			{posts.map((post) => {
				return (
					<ListItem key={post.slug}>
						<PostPreview post={post} />
					</ListItem>
				)
			})}
		</List>
	)
}
