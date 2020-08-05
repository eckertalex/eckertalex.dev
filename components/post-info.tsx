import React from 'react'
import tinytime from 'tinytime'

import {Frontmatter} from '@types'
/* -------------------------------------------------------------------------- */

type PostInfoProps = {
  post: Frontmatter
}

const dateStamp = tinytime('Written by Alexander Eckert on {dddd}, {MMMM} {DD}, {YYYY}')

export default function PostInfo(props: PostInfoProps) {
  const {post} = props

  return (
    <p className="text-gray-700 dark:text-gray-500 italic">
      <span className="text-lg">{dateStamp.render(new Date(post.date))} &mdash; </span>
      <span className="text-lg" role="img" aria-label="Coffee">
        ☕
      </span>
      <span className="text-lg"> {post.readingTime.text}</span>
    </p>
  )
}
