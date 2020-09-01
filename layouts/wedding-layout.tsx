import React from 'react'
import {NextSeo} from 'next-seo'

import WeddingContainer from 'layouts/wedding-container'
import {FrontMatter} from '@types'
/* -------------------------------------------------------------------------- */

type WeddingLayoutProps = {
  children: React.ReactNode
  frontMatter: FrontMatter
}

export default function WeddingLayout(props: WeddingLayoutProps) {
  const {children, frontMatter} = props

  const url = `https://eckertalex.dev/${frontMatter.slug}`

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        canonical={url}
        openGraph={{
          url,
          title: `${frontMatter.title} | eckertalex.dev`,
        }}
      />
      <WeddingContainer>{children}</WeddingContainer>
    </>
  )
}
