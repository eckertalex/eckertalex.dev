import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '../components/mdx-components'
import { allOtherPages, OtherPage } from '../.contentlayer/generated'
import { Container } from '../components/container'

export default function Impressum({ page }: { page: OtherPage }) {
	const Component = useMDXComponent(page.body.code)

	return (
		<Container
			title={`${page.title} - Alexander Eckert`}
			description="Impressum meiner Webseite."
		>
			<article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
					{page.title}
				</h1>
				<div className="w-full mt-4 prose dark:prose-dark max-w-none">
					<Component components={MDXComponents} />
				</div>
			</article>
		</Container>
	)
}

export const getStaticProps = async () => {
	const impressum = allOtherPages.find((page) => page.slug === 'impressum')!

	return { props: { page: impressum } }
}
