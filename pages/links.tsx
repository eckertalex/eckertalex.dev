import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'components/container'
import links from 'data/links'
import {sortLinksByDate} from 'utils/sort'
/* -------------------------------------------------------------------------- */

export default function Links() {
  const url = 'https://eckertalex.dev/links'
  const [searchValue, setSearchValue] = React.useState('')

  const sortedLinks = sortLinksByDate(links)

  const filteredLinks = sortedLinks.filter((link) => link.title.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <>
      <NextSeo title="Links" canonical={url} openGraph={{url, title: 'Links | eckertalex.dev'}} />
      <Container>
        <h1>Links</h1>
        <input type="text" onChange={(ev) => setSearchValue(ev.target.value)} />
        {filteredLinks.map((link) => (
          <p key={link.url}>
            <strong>
              <a href={link.url}>{link.title}</a>
            </strong>{' '}
            by <strong>{link.author}</strong>
          </p>
        ))}
      </Container>
    </>
  )
}
