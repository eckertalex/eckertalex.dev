import React from 'react'
import NextLink from 'next/link'

import {FrontMatter} from '@types'
import PostInfo from 'components/post-info'

type PostProps = {
  post: FrontMatter
}

export default function Post(props: PostProps) {
  const {post} = props

  return (
    <div className="mb-16">
      <NextLink href={post.slug}>
        <a className="text-2xl font-semibold">{post.title}</a>
      </NextLink>
      <PostInfo post={post} />
      <p>{post.summary}</p>
      <NextLink href={post.slug}>
        <a className="text-xl">
          <span>Read more </span>
          <span role="img" aria-label="Arrow Right">
            ➞
          </span>
        </a>
      </NextLink>
    </div>
  )
}
