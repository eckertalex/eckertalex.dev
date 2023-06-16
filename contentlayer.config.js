import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
	},
}

const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: 'blog/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		publishedAt: { type: 'string', required: true },
		description: { type: 'string', required: true },
	},
	computedFields,
}))

const Misc = defineDocumentType(() => ({
	name: 'Misc',
	filePathPattern: '*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
	},
	computedFields,
}))

const contentLayerConfig = makeSource({
	contentDirPath: 'content',
	documentTypes: [Post, Misc],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: {
						light: 'rose-pine-dawn',
						dark: 'rose-pine',
					},
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }]
						}
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section',
					},
				},
			],
		],
	},
})

export default contentLayerConfig
