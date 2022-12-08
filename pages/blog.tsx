import { allBlogPosts, BlogPost } from '../.contentlayer/generated'
import { pick } from '../lib/utils'
import { Rss as RssIcon } from 'lucide-react'
import { Container } from '../components/container'
import { PostList } from 'components/post-list'

export default function Blog({ posts }: { posts: BlogPost[] }) {
	return (
		<Container
			title="Blog - Alexander Eckert"
			description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
		>
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
				<div className="flex w-full justify-between">
					<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
						Blog
					</h1>
					{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
					<a
						href="/feed.xml"
						className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:underline transition-all h-6"
					>
						<>
							<RssIcon className="h-4 w-4 mr-1 text-orange-500" />
							{'RSS'}
						</>
					</a>
				</div>
				<hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
				<PostList posts={posts} />
			</div>
		</Container>
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
