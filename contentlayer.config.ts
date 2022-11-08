import {
	defineDocumentType,
	ComputedFields,
	makeSource,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'

const computedFields: ComputedFields = {
	readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
	wordCount: {
		type: 'number',
		resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
	},
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
	},
}

const BlogPost = defineDocumentType(() => ({
	name: 'BlogPost',
	filePathPattern: 'blog/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		publishedAt: { type: 'string', required: true },
		summary: { type: 'string', required: true },
	},
	computedFields,
}))

const Uses = defineDocumentType(() => ({
	name: 'Uses',
	filePathPattern: 'uses/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		description: { type: 'string', required: true },
	},
	computedFields,
}))

const OtherPage = defineDocumentType(() => ({
	name: 'OtherPage',
	filePathPattern: '*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
	},
	computedFields,
}))

const contentLayerConfig = makeSource({
	contentDirPath: 'content',
	documentTypes: [BlogPost, Uses, OtherPage],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			[
				rehypePrismPlus,
				{
					showLineNumbers: true,
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'append',
					content: {
						type: 'element',
						tagName: 'span',
						properties: {
							style: {
								marginLeft: '0.5rem',
							},
						},
						children: [
							{
								type: 'text',
								value: '#',
							},
						],
					},
				},
			],
		],
	},
})

export default contentLayerConfig
