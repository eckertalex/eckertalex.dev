import React from 'react'
import {NextSeo, ArticleJsonLd} from 'next-seo'

import Container from 'layouts/container'
import PostInfo from 'components/post-info'
import {FrontMatter} from '@types'
/* -------------------------------------------------------------------------- */

type PostLayoutProps = {
  children: React.ReactNode
  frontMatter: FrontMatter
}

export default function PostLayout(props: PostLayoutProps) {
  const {children, frontMatter} = props

  const url = `https://eckertalex.dev/${frontMatter.slug}`

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: frontMatter.date,
          },
          url,
          title: `${frontMatter.title} | eckertalex.dev`,
        }}
      />
      <ArticleJsonLd
        authorName="Alexander Eckert"
        dateModified={frontMatter.date}
        datePublished={frontMatter.date}
        description={frontMatter.summary}
        images={[]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Alexander Eckert"
        title={frontMatter.title}
        url={url}
      />
      <Container>
        <h1>{frontMatter.title}</h1>
        <PostInfo post={frontMatter} />
        {children}
      </Container>
    </>
  )
}
