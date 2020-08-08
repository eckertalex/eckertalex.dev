import React from 'react'

import SectionContainer from 'layouts/section-container'
import WeddingFooter from 'layouts/wedding-footer'
import WeddingDay from 'components/svgs/wedding-day'
import WeddingSchedule from 'components/wedding-schedule'
/* -------------------------------------------------------------------------- */

type WeddingContainerProps = {
  children: React.ReactNode
}

export default function WeddingContainer(props: WeddingContainerProps) {
  const {children} = props

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      <div>
        <SectionContainer>
          <main>
            <div className="flex flex-col">
              <div className="flex justify-center">
                <WeddingDay />
              </div>
              <h1 className="font-serif text-pink-300 text-center">Cassidy & Alexander</h1>
              <h3 className="font-serif text-green-300 text-center">
                13<sup>th</sup> August 2020
              </h3>
            </div>
            <img src="/static/img/wedding/us_with_bushes.jpg" alt="Cassidy & Alex" />
            <WeddingSchedule />
            <hr />
            {children}
          </main>
        </SectionContainer>
      </div>
      <div>
        <SectionContainer>
          <hr />
          <WeddingFooter />
        </SectionContainer>
      </div>
    </div>
  )
}
