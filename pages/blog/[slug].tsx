import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '../../components/mdx-components'
import { allBlogPosts, BlogPost } from '../../.contentlayer/generated'
import { PostLayout } from '../../components/post-layout'
import { GetStaticProps } from 'next'

export default function BlogPostPage({ post }: { post: BlogPost }) {
	const Component = useMDXComponent(post.body.code)

	return (
		<PostLayout post={post}>
			<Component components={MDXComponents} />
		</PostLayout>
	)
}

export const getStaticPaths = async () => {
	return {
		paths: allBlogPosts.map((p) => ({ params: { slug: p.slug } })),
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = allBlogPosts.find((post) => post.slug === params?.slug)

	if (!post) {
		return { notFound: true }
	}

	return { props: { post } }
}
