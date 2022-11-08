import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '../../components/mdx-components'
import { allUses, Uses } from '../../.contentlayer/generated'
import { DefaultLayout } from '../../layout/default-layout'

export default function UsesPage({ uses }: { uses: Uses }) {
	const Component = useMDXComponent(uses.body.code)

	return (
		<DefaultLayout title="Uses">
			<Component components={MDXComponents} />
		</DefaultLayout>
	)
}

export const getStaticProps = async () => {
	const uses = allUses.find((page) => page.slug === 'uses')

	return { props: { uses } }
}
