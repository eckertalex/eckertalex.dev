/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import NextLink from 'next/link'

type AProps = React.AnchorHTMLAttributes<unknown>

export default function A(props: AProps) {
  const href = props.href
  const isInternalLink = href ? href.startsWith('/') || href.startsWith('#') : false

  if (isInternalLink) {
    return (
      <NextLink href={href || ''} passHref>
        <a {...props} />
      </NextLink>
    )
  }

  return <a {...props} />
}
