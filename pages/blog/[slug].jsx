import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate'
import {formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles} from '@/lib/mdx'
import {Post} from '@/components/post'
import {MDXComponents} from '@/components/mdx-components'
import {PageTitle} from '@/components/page-title'
import {generateRss} from '@/lib/generate-rss'

export default function Blog({post, prev, next}) {
  const {mdxSource, frontMatter} = post,
    content = hydrate(mdxSource, {
      components: MDXComponents,
    })

  return (
    <>
      {frontMatter.draft !== true ? (
        <Post frontMatter={frontMatter} next={next} prev={prev}>
          {content}
        </Post>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span aria-label="roadwork sign" role="img">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getFiles('blog')

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const allPosts = await getAllFilesFrontMatter('blog'),
    postIndex = allPosts.findIndex((post) => post.slug === params.slug),
    prev = allPosts[postIndex + 1] || null,
    next = allPosts[postIndex - 1] || null,
    post = await getFileBySlug('blog', params.slug),
    // Rss
    rss = generateRss(allPosts)
  fs.writeFileSync('./public/index.xml', rss)

  return {props: {post, prev, next}}
}
