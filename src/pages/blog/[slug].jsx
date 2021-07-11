import {Center} from '@chakra-ui/react'
import fs from 'fs'
import {MDXRemote} from 'next-mdx-remote'
import {formatSlug, getAllBlogPostsFrontMatter, getFileBySlug, getBlogPosts} from 'lib/mdx'
import {Post} from 'features/blog/post'
import {MDXComponents} from 'features/mdx/mdx-components'
import {PageTitle} from 'layout/page-title'
import {generateRss} from 'lib/generate-rss'

export default function Blog({post, prev, next}) {
  const {mdxSource, frontMatter} = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <Post frontMatter={frontMatter} next={next} prev={prev}>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </Post>
      ) : (
        <Center marginTop={24}>
          <PageTitle as="h1">
            Under Construction{' '}
            <span aria-label="roadwork sign" role="img">
              🚧
            </span>
          </PageTitle>
        </Center>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getBlogPosts()

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  }
}

// https://github.com/vercel/next.js/issues/12053
export async function getStaticProps({params}) {
  const allPosts = await getAllBlogPostsFrontMatter()
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug)

  // Rss
  const rss = generateRss(allPosts)
  fs.writeFileSync('./public/index.xml', rss)

  return {props: {post, prev, next}}
}
