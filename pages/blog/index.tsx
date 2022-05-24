import {allBlogPosts} from '../../.contentlayer/generated'
import {pick} from '../../lib/utils'
import {NavLayout} from '../../layout/nav-layout'
import {SearchablePostList} from '../../components/blog/searchable-post-list'

export default function Blog({posts}) {
  return (
    <NavLayout title="Blog | Alexander Eckert">
      <SearchablePostList title="All Posts" posts={posts} />
    </NavLayout>
  )
}

export function getStaticProps() {
  const posts = allBlogPosts
    .map((post) => pick(['slug', 'title', 'summary', 'publishedAt'], post))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )

  return {props: {posts}}
}
