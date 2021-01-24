import React from 'react'
import NextLink from 'next/link'

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
  query: string
}

export default function Heading(props: HeadingProps) {
  const {as: As, children, className, query} = props

  return (
    <As id={query} className={className}>
      {children}
      <NextLink href={`#${query}`}>
        <a className="ml-2">#</a>
      </NextLink>
    </As>
  )
}
