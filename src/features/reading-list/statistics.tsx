import React from 'react'
import {QuickStatistics} from 'features/reading-list/quick-statistics'
import {Chart} from 'features/reading-list/chart'
import {Statistics as StatisticsProps} from 'features/reading-list/util'

function Statistics({quickStatistics, chartData}: StatisticsProps) {
  return (
    <>
      <QuickStatistics {...quickStatistics} />
      <Chart {...chartData} />
    </>
  )
}

export {Statistics}
