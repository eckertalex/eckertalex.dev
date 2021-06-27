import fs from 'fs'
import path from 'path'
import {kebabCase} from '@/lib/utils'
import {getAllFilesFrontMatter} from '@/lib/mdx'
import {getAllTags} from '@/lib/tags'
import siteMetadata from '@/data/siteMetadata'
import {SearchablePostList} from '@/components/searchable-post-list'
import {PageSeo} from '@/components/seo'
import {generateRss} from '@/lib/generate-rss'

const root = process.cwd()

export default function Tag({posts, tag}) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo title={`${tag} - ${siteMetadata.author}`} url={`${siteMetadata.siteUrl}/tags/${tag}`} />
      <SearchablePostList posts={posts} title={title} />
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const allPosts = await getAllFilesFrontMatter('blog'),
    filteredPosts = allPosts.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
    ),
    // Rss
    rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`),
    rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, {recursive: true})
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)

  return {props: {posts: filteredPosts, tag: params.tag}}
}
