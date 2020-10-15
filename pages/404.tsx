import React from 'react'
import NextLink from 'next/link'

import NotFoundIllustration from 'components/svgs/not-found'
import Container from 'layouts/container'
/* -------------------------------------------------------------------------- */

export default function PageNotFound404() {
  return (
    <Container>
      <div className="text-center max-w-xl mx-auto">
        <NotFoundIllustration />

        <h1>Page Not Found</h1>

        <NextLink href="/">
          <a className="text-5xl">Return Home</a>
        </NextLink>
      </div>
    </Container>
  )
}
