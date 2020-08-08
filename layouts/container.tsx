import React from 'react'

import SectionContainer from 'layouts/section-container'
import Header from 'layouts/header'
import Footer from 'layouts/footer'
/* -------------------------------------------------------------------------- */

type ContainerProps = {
  children: React.ReactNode
}

export default function Container(props: ContainerProps) {
  const {children} = props

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <div>
        <SectionContainer>
          <Header />
          <hr />
        </SectionContainer>
        <SectionContainer>
          <main className="py-4">{children}</main>
        </SectionContainer>
      </div>
      <div>
        <SectionContainer>
          <hr />
          <Footer />
        </SectionContainer>
      </div>
    </div>
  )
}
