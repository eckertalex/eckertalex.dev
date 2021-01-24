import React from 'react'

import {LinkItem} from 'data/links'
import Heading from 'components/heading'

type LinksListProps = {
  title: string
  links: LinkItem[]
}

export default function LinksList(props: LinksListProps) {
  const {links, title} = props

  return (
    <>
      <Heading as="h2" query={title}>
        {title}
      </Heading>
      {links.map((link) => (
        <p key={link.url}>
          <strong>
            <a href={link.url}>{link.title}</a>
          </strong>{' '}
          by <strong>{link.author}</strong>
        </p>
      ))}
    </>
  )
}
