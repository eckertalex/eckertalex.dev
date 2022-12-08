import { allBlogPosts } from 'contentlayer/generated'
import { GetServerSideProps } from 'next'
import RSS from 'rss'

export default function Feed() {
	return null
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
	const feed = new RSS({
		title: 'Alexander Eckert',
		site_url: 'https://eckertalex.dev',
		feed_url: 'https://eckertalex.dev/feed.xml',
	})

	allBlogPosts
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
		)
		.forEach((post) => {
			feed.item({
				title: post.title,
				url: `https://eckertalex.dev/blog/${post.slug}`,
				date: post.publishedAt,
				description: post.summary,
			})
		})

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	res.write(feed.xml({ indent: true }))
	res.end()

	return {
		props: {},
	}
}
