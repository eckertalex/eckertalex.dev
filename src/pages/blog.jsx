import {getAllFilesFrontMatter} from 'lib/mdx'
import metadata from 'metadata'
import {SearchablePostList} from 'features/blog/searchable-post-list'
import {PageSeo} from 'features/seo/seo'

export default function Blog({posts}) {
  return (
    <>
      <PageSeo title={`Blog - ${metadata.author}`} url={`${metadata.siteUrl}/blog`} />
      <SearchablePostList posts={posts} title="All Posts" />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return {props: {posts}}
}
