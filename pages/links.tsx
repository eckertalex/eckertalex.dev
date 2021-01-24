import React from 'react'
import {NextSeo} from 'next-seo'
import NextLink from 'next/link'

import Container from 'layouts/container'
import links, {LinkItem} from 'data/links'
import {sortLinksByDateAdded} from 'utils/utils'
import LinksList from 'components/links-list'
import Heading from 'components/heading'

type LinksProps = {
  onlineCourses: LinkItem[]
  books: LinkItem[]
  papers: LinkItem[]
  podcasts: LinkItem[]
  blogs: LinkItem[]
}

export default function Links(props: LinksProps) {
  const {onlineCourses, books, papers, podcasts, blogs} = props

  const url = 'https://eckertalex.dev/links'

  return (
    <>
      <NextSeo title="Links" canonical={url} openGraph={{url, title: 'Links | eckertalex.dev'}} />
      <Container>
        <h1>Links</h1>
        <Heading as="h2" query="blog-posts">
          <NextLink href="links/blog-posts">
            <a>Blog Posts</a>
          </NextLink>
        </Heading>
        <LinksList title="Online Courses" links={onlineCourses} />
        <LinksList title="Books" links={books} />
        <LinksList title="Podcasts" links={podcasts} />
        <LinksList title="Blogs" links={blogs} />
        <LinksList title="Papers" links={papers} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const onlineCourses = sortLinksByDateAdded(links.onlineCourses)
  const books = sortLinksByDateAdded(links.books)
  const papers = sortLinksByDateAdded(links.papers)
  const podcasts = sortLinksByDateAdded(links.podcasts)
  const blogs = sortLinksByDateAdded(links.blogs)

  return {
    props: {
      onlineCourses,
      books,
      papers,
      podcasts,
      blogs,
    },
  }
}
