import React from 'react'

import Header from 'layouts/header'
import Footer from 'layouts/footer'
/* -------------------------------------------------------------------------- */

type ContainerProps = {
  children: React.ReactNode
}

export default function Container(props: ContainerProps) {
  const {children} = props

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <div className="container px-4">
        <div>
          <Header />
          <hr />
          <main>{children}</main>
        </div>
        <hr />
        <Footer />
      </div>
    </div>
  )
}
