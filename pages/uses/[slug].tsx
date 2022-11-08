import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '../../components/mdx-components'
import { allUses, Uses } from '../../.contentlayer/generated'
import { DefaultLayout } from '../../layout/default-layout'
import { GetStaticProps } from 'next'

export default function UsesPage({ page }: { page: Uses }) {
	const Component = useMDXComponent(page.body.code)

	return (
		<DefaultLayout title={page.title}>
			<Component components={MDXComponents} />
		</DefaultLayout>
	)
}

export const getStaticPaths = async () => {
	return {
		paths: allUses
			.filter((post) => post.slug !== 'uses')
			.map((p) => ({ params: { slug: p.slug } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = allUses
		.filter((post) => post.slug !== 'uses')
		.find((post) => post.slug === params?.slug)

	return { props: { page } }
}
