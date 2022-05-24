import {QuickStatistics} from './quick-statistics'
import {Chart} from './chart'
import {Statistics as StatisticsProps} from './util'

function Statistics({quickStatistics, chartData}: StatisticsProps) {
  return (
    <>
      <QuickStatistics {...quickStatistics} />
      <Chart {...chartData} />
    </>
  )
}

export {Statistics}
