import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '../../components/mdx-components'
import { allBlogPosts, BlogPost } from '../../.contentlayer/generated'
import { BlogPostLayout } from '../../layout/blog-post-layout'
import { GetStaticProps } from 'next'

export default function BlogPostPage({ post }: { post: BlogPost }) {
	const Component = useMDXComponent(post.body.code)

	return (
		<BlogPostLayout post={post}>
			<Component components={MDXComponents} />
		</BlogPostLayout>
	)
}

export const getStaticPaths = async () => {
	return {
		paths: allBlogPosts.map((p) => ({ params: { slug: p.slug } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = allBlogPosts.find((post) => post.slug === params?.slug)

	return { props: { post } }
}
