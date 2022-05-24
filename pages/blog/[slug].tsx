import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../../components/mdx-components'
import {allBlogPosts} from '../../.contentlayer/generated'
import {BlogPostLayout} from '../../layout/blog-post-layout'

export default function BlogPost({post}) {
  const Component = useMDXComponent(post.body.code)

  return (
    <BlogPostLayout post={post}>
      <Component components={MDXComponents} />
    </BlogPostLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allBlogPosts.map((p) => ({params: {slug: p.slug}})),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const post = allBlogPosts.find((post) => post.slug === params.slug)

  return {props: {post}}
}
