import { Container } from './container'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { BlogPost } from '../.contentlayer/generated'

export function PostLayout({
	children,
	post,
}: {
	children: React.ReactNode
	post: BlogPost
}) {
	return (
		<Container
			title={`${post.title} - Alexander Eckert`}
			description={post.summary}
			date={new Date(post.publishedAt).toISOString()}
			type="article"
		>
			<article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
					{post.title}
				</h1>
				<div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
					<div className="flex items-center">
						<Image
							alt="Alexander Eckert"
							height={24}
							width={24}
							sizes="20vw"
							src="/portrait.jpg"
							className="rounded-full"
						/>
						<p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
							{'Alexander Eckert / '}
							{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
						</p>
					</div>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
						{post.readingTime.text}
					</p>
				</div>
				<div className="w-full mt-4 prose dark:prose-dark max-w-none">
					{children}
				</div>
			</article>
		</Container>
	)
}
