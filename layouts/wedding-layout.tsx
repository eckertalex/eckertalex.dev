import React from 'react'
import {NextSeo} from 'next-seo'

import WeddingContainer from 'layouts/wedding-container'
import {Frontmatter} from '@types'
/* -------------------------------------------------------------------------- */

type WeddingLayoutProps = {
  children: React.ReactNode
}

export default function WeddingLayout(frontmatter: Frontmatter) {
  return (props: WeddingLayoutProps) => {
    const {children} = props

    const url = `https://eckertalex.dev/${frontmatter.slug}`

    return (
      <>
        <NextSeo
          title={frontmatter.title}
          canonical={url}
          openGraph={{
            url,
            title: `${frontmatter.title} | eckertalex.dev`,
          }}
        />
        <WeddingContainer>{children}</WeddingContainer>
      </>
    )
  }
}
