import { PostList } from '../components/post-list'
import { pick } from '../lib/utils'
import { ArrowRight as ArrowRightIcon } from 'lucide-react'
import { allBlogPosts, BlogPost } from '../.contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../components/container'

const MAX_DISPLAY = 3

export default function Home({
	posts,
}: {
	posts: Pick<BlogPost, 'slug' | 'title' | 'summary'>[]
}) {
	return (
		<Container>
			<div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
				<div className="flex flex-col-reverse sm:flex-row items-start">
					<div className="flex flex-col pr-8">
						<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
							Alexander Eckert
						</h1>
						<h2 className="text-gray-700 dark:text-gray-200 mb-4">
							Senior Software Engineer
						</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-16">
							I am a software developer living in Germany. I mainly program in
							JavaScript and TypeScript. My favorite Framework is React.
						</p>
					</div>
					<div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
						<Image
							alt="Alexander Eckert"
							height={176}
							width={176}
							src="/portrait.jpg"
							sizes="30vw"
							priority
							className="rounded-full"
						/>
					</div>
				</div>
				<h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
					Latest Posts
				</h3>
				<PostList posts={posts.slice(0, MAX_DISPLAY)} />
				<Link
					href="/blog"
					className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
				>
					<>
						{'Read all posts'}
						<ArrowRightIcon className="h-6 w-6 ml-1" />
					</>
				</Link>
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
