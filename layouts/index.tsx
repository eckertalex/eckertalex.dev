import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import {FrontMatter} from '@types'
/* -------------------------------------------------------------------------- */

type DefaultLayoutProps = {
  children: React.ReactNode
  frontMatter: FrontMatter
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const {children, frontMatter} = props

  const url = frontMatter.slug === 'index' ? 'https://eckertalex.dev' : `https://eckertalex.dev/${frontMatter.slug}`

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        canonical={url}
        openGraph={{url, title: `${frontMatter.title} | eckertalex.dev`}}
      />
      <Container>
        <h1>{frontMatter.title}</h1>
        {children}
      </Container>
    </>
  )
}
