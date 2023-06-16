import { notFound } from 'next/navigation'
import { allMiscs } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'

export default function ImpressumPage() {
	const page = allMiscs.find((miscPage) => miscPage.slug === 'impressum')

	if (!page) {
		notFound()
	}

	return (
		<article className="space-y-4">
			<h1 className="mt-2 scroll-m-20 text-4xl font-bold">{page.title}</h1>
			<Mdx code={page.body.code} />
		</article>
	)
}
