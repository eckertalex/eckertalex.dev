import { allBlogPosts, BlogPost } from '../../.contentlayer/generated'
import { pick } from '../../lib/utils'
import { NavLayout } from '../../layout/nav-layout'
import { SearchablePostList } from '../../components/blog/searchable-post-list'

export default function Blog({ posts }: { posts: BlogPost[] }) {
	return (
		<NavLayout title="Blog | Alexander Eckert">
			<SearchablePostList title="All Posts" posts={posts} />
		</NavLayout>
	)
}

export const getStaticProps = async () => {
	const posts = allBlogPosts
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
		)
		.map((post) => pick(['slug', 'title', 'summary'], post))

	return { props: { posts } }
}
