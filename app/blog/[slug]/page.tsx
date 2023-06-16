import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

import { siteConfig } from '@/config/site'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mdx } from '@/components/mdx-components'

type PostPageProps = {
	params: {
		slug: string
	}
}

async function getPostFromParams({ params }: PostPageProps) {
	const post = allPosts.find((post) => post.slug === params.slug)

	if (!post) {
		null
	}

	return post
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const post = await getPostFromParams({ params })

	if (!post) {
		return {}
	}

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			publishedTime: post.publishedAt,
			url: `https://eckertalex.dev/blog/${post.slug}`,
			images: [
				{
					url: siteConfig.ogImage,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: [siteConfig.ogImage],
			creator: '@eckertalex_',
		},
	}
}

export async function generateStaticParams(): Promise<
	PostPageProps['params'][]
> {
	return allPosts.map((post) => ({
		slug: post.slug,
	}))
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPostFromParams({ params })

	if (!post) {
		notFound()
	}

	return (
		<article className="space-y-4">
			<h1 className="mt-2 scroll-m-20 text-4xl font-bold">{post.title}</h1>
			<div className="flex flex-row items-center space-x-2">
				<Avatar>
					<AvatarImage src="/portrait.jpg" alt="eckertalex" />
					<AvatarFallback>AE</AvatarFallback>
				</Avatar>
				<div className="flex w-full flex-row items-center justify-between">
					<p className="text-sm text-muted-foreground">{'Alexander Eckert'}</p>
					<p className="text-sm text-muted-foreground">
						{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
					</p>
				</div>
			</div>
			<Mdx code={post.body.code} />
		</article>
	)
}
