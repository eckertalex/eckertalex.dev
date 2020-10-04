import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import links, {LinkItem} from 'data/links'
import {sortLinksByDateAdded} from 'utils/utils'
/* -------------------------------------------------------------------------- */

type BooksProps = {
  books: LinkItem[]
}

export default function Books(props: BooksProps) {
  const {books} = props

  const url = 'https://eckertalex.dev/links/books'

  return (
    <>
      <NextSeo title="Links: Books" canonical={url} openGraph={{url, title: 'Links: Books | eckertalex.dev'}} />
      <Container>
        <h1>Links: Books</h1>
        {books.map((book) => (
          <p key={book.url}>
            <strong>
              <a href={book.url}>{book.title}</a>
            </strong>{' '}
            by <strong>{book.author}</strong>
          </p>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const books = sortLinksByDateAdded(links.books)

  return {
    props: {
      books,
    },
  }
}
