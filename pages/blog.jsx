import {getAllFilesFrontMatter} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {SearchablePostList} from '@/components/searchable-post-list'
import {PageSeo} from '@/components/seo'

export default function Blog({posts}) {
  return (
    <>
      <PageSeo
        description={siteMetadata.description}
        title={`Blog - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <SearchablePostList posts={posts} title="All Posts" />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return {props: {posts}}
}
