import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import Post from 'components/post-preview'
// https://github.com/jescalan/babel-plugin-import-glob-array/issues/7
// @ts-ignore
import {frontMatter as posts} from './blog/*.mdx'
import {FrontMatter} from '@types'
import {sortByDate} from 'utils/sort'
/* -------------------------------------------------------------------------- */

export default function Blog() {
  const url = 'https://eckertalex.dev/blog'

  return (
    <>
      <NextSeo title="Blog" canonical={url} openGraph={{url, title: 'Blog | eckertalex.dev'}} />
      <Container>
        <h1>Blog</h1>
        {sortByDate(posts).map((post: FrontMatter) => (
          <Post key={post.title} post={post} />
        ))}
      </Container>
    </>
  )
}
