import { allBlogPosts } from 'contentlayer/generated'
import { GetServerSideProps } from 'next'

function createSitemap(slugs: string[]) {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
					.map((slug) => {
						return `
                <url>
                    <loc>${`https://eckertalex.dev/${slug}`}</loc>
                </url>
            `
					})
					.join('')}
    </urlset>
`
}

export default function Sitemap() {
	return null
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
	const allPosts = allBlogPosts
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
		)
		.map((post) => `blog/${post.slug}`)

	const allPages = [
		...allPosts,
		'',
		'about',
		'blog',
		'reading',
		'calc',
		'calc/firewood',
		'calc/px-rem',
		'datenschutz',
		'impressum',
	]

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	res.write(createSitemap(allPages))
	res.end()

	return {
		props: {},
	}
}
