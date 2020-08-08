import React from 'react'
import NextLink from 'next/link'

import Post from 'components/post-preview'
// https://github.com/jescalan/babel-plugin-import-glob-array/issues/7
// @ts-ignore
import {frontMatter as posts} from '../pages/blog/*.mdx'
import {Frontmatter} from '@types'
import {sortByDate} from 'utils/sort'
import Heading from 'components/heading'
/* -------------------------------------------------------------------------- */

export default function BlogPreview() {
  return (
    <div className="pt-16">
      <div className="flex justify-between items-end">
        <Heading as="h3" query="latest-posts">
          Latest Posts
        </Heading>
        <NextLink href="/blog">
          <a>Read all posts</a>
        </NextLink>
      </div>
      <hr />
      {sortByDate(posts)
        .slice(0, 3)
        .map((post: Frontmatter) => (
          <Post key={post.title} post={post} />
        ))}
    </div>
  )
}
