import React from 'react'
/* -------------------------------------------------------------------------- */

type SectionContainerProps = {
  children: React.ReactNode
}

export default function SectionContainer(props: SectionContainerProps) {
  const {children} = props

  return <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
}
