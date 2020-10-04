import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import links, {LinkItem} from 'data/links'
import {sortLinksByDateAdded} from 'utils/utils'
import Heading from 'components/heading'
/* -------------------------------------------------------------------------- */

type OthersProps = {
  papers: LinkItem[]
  podcasts: LinkItem[]
  blogs: LinkItem[]
}

export default function Others(props: OthersProps) {
  const {papers, podcasts, blogs} = props

  const url = 'https://eckertalex.dev/links/others'

  return (
    <>
      <NextSeo title="Links: Others" canonical={url} openGraph={{url, title: 'Links: Others | eckertalex.dev'}} />
      <Container>
        <h1>Links: Others</h1>
        <Heading as="h2" query="papers">
          Papers
        </Heading>
        {papers.map((paper) => (
          <p key={paper.url}>
            <strong>
              <a href={paper.url}>{paper.title}</a>
            </strong>{' '}
            by <strong>{paper.author}</strong>
          </p>
        ))}
        <Heading as="h2" query="podcasts">
          Podcasts
        </Heading>
        {podcasts.map((podcast) => (
          <p key={podcast.url}>
            <strong>
              <a href={podcast.url}>{podcast.title}</a>
            </strong>{' '}
            by <strong>{podcast.author}</strong>
          </p>
        ))}
        <Heading as="h2" query="blogs">
          Blogs
        </Heading>
        {blogs.map((blog) => (
          <p key={blog.url}>
            <strong>
              <a href={blog.url}>{blog.title}</a>
            </strong>{' '}
            by <strong>{blog.author}</strong>
          </p>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const papers = sortLinksByDateAdded(links.papers)
  const podcasts = sortLinksByDateAdded(links.podcasts)
  const blogs = sortLinksByDateAdded(links.blogs)

  return {
    props: {papers, podcasts, blogs},
  }
}
