import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'components/container'
import {Frontmatter} from '@types'
/* -------------------------------------------------------------------------- */

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout(frontmatter: Frontmatter) {
  return (props: DefaultLayoutProps) => {
    const {children} = props

    const url = frontmatter.slug === 'index' ? 'https://eckertalex.dev' : `https://eckertalex.dev/${frontmatter.slug}`

    return (
      <>
        <NextSeo
          title={frontmatter.title}
          canonical={url}
          openGraph={{url, title: `${frontmatter.title} | eckertalex.dev`}}
        />
        <Container>
          <h1>{frontmatter.title}</h1>
          {children}
        </Container>
      </>
    )
  }
}
