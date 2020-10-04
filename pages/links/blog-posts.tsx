import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import Filters from 'components/filters'
import dataLinks, {LinkItem} from 'data/links'
import {sortLinksByDateAdded, getCountOccurrences} from 'utils/utils'
/* -------------------------------------------------------------------------- */

type BlogPostsProps = {
  blogPosts: LinkItem[]
  authors: {
    name: string
    count: number
  }[]
}

export default function BlogPosts(props: BlogPostsProps) {
  const {authors, blogPosts} = props
  const [author, setAuthor] = React.useState<string>('All')

  const filteredBlogPosts = React.useMemo(
    () => blogPosts.filter((blogPost) => (author === 'All' ? true : blogPost.author === author)),
    [blogPosts, author]
  )

  const url = 'https://eckertalex.dev/links/blog-posts'

  return (
    <>
      <NextSeo
        title="Links: Blog Posts"
        canonical={url}
        openGraph={{url, title: 'Links: Blog Posts | eckertalex.dev'}}
      />
      <Container>
        <h1>Links: Blog Posts</h1>
        <Filters filters={authors} currentFilter={author} setFilter={(author) => setAuthor(author)} />
        {filteredBlogPosts.map((blogPost) => (
          <p key={blogPost.url}>
            <strong>
              <a href={blogPost.url}>{blogPost.title}</a>
            </strong>{' '}
            by <strong>{blogPost.author}</strong>
          </p>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = sortLinksByDateAdded(dataLinks).filter((link) => link.category === 'blog-post')
  const allAuthors = blogPosts.map((post) => post.author)
  const uniqueAuthors = [...new Set(allAuthors)]

  const authors = [{name: 'All', count: uniqueAuthors.length}, ...getCountOccurrences(allAuthors)]

  return {
    props: {
      authors,
      blogPosts,
    },
  }
}
