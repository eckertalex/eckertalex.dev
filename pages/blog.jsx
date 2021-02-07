import {getAllFilesFrontMatter} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {PostList} from '@/components/post-list'
import {PageSeo} from '@/components/seo'

export default function Blog({posts}) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <PostList posts={posts} title="All Posts" />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return {props: {posts}}
}
