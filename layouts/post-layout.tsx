import React from 'react'
import {NextSeo, ArticleJsonLd} from 'next-seo'

import Container from 'components/container'
import PostInfo from 'components/post-info'
import {Frontmatter} from '@types'
/* -------------------------------------------------------------------------- */

type PostLayoutProps = {
  children: React.ReactNode
}

export default function PostLayout(frontmatter: Frontmatter) {
  return (props: PostLayoutProps) => {
    const {children} = props

    const url = `https://eckertalex.dev/${frontmatter.slug}`

    return (
      <>
        <NextSeo
          title={frontmatter.title}
          canonical={url}
          openGraph={{
            type: 'article',
            article: {
              publishedTime: frontmatter.date,
            },
            url,
            title: `${frontmatter.title} | eckertalex.dev`,
          }}
        />
        <ArticleJsonLd
          authorName="Alexander Eckert"
          dateModified={frontmatter.date}
          datePublished={frontmatter.date}
          description={frontmatter.summary}
          images={[]}
          publisherLogo="/static/favicons/android-chrome-192x192.png"
          publisherName="Alexander Eckert"
          title={frontmatter.title}
          url={url}
        />
        <Container>
          <h1>{frontmatter.title}</h1>
          <PostInfo post={frontmatter} />
          {children}
        </Container>
      </>
    )
  }
}
