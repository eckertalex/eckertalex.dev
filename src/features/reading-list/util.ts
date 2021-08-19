import {QuickStatistics} from 'features/reading-list/quick-statistics'
import dayjs from 'dayjs'
import {Reading, ReadingList} from 'lib/gitrows'

export type QuickStatistics = {
  total: number
  oldest: string
  currentMonth: number
  lastMonthPct: number
}

type Data = {
  month: string
  posts: number
}

export type ChartData = {
  readPerMonth: Data[]
  readTotalMonth: Data[]
}

export type Statistics = {
  quickStatistics: QuickStatistics
  chartData: ChartData
}

function getMonths(readings: Reading[]): string[] {
  const startDate = dayjs(readings[readings.length - 1].timestamp)
  const endDate = dayjs(readings[0].timestamp)
  const monthsBetween = endDate.diff(startDate, 'month')

  return [...Array(monthsBetween + 1).keys()].map((i) => startDate.add(i, 'month').format("MM/'YY"))
}

function computeQuickStatistics(readingList: ReadingList, now = dayjs()): QuickStatistics {
  const readings = Object.values(readingList).flat()

  const total = readings.length
  const oldest = dayjs(readings[readings.length - 1].timestamp).format('MMMM DD, YYYY')
  const currentMonth = readings.filter((reading) => Number(reading.timestamp) > now.startOf('month').valueOf()).length
  const lastMonth = readings.filter(
    (reading) =>
      Number(reading.timestamp) > now.subtract(1, 'month').startOf('month').valueOf() &&
      Number(reading.timestamp) <= now.subtract(1, 'month').valueOf()
  ).length
  const lastMonthPct = lastMonth === 0 ? 0 : (100 * (currentMonth - lastMonth)) / lastMonth

  return {
    total,
    oldest,
    currentMonth,
    lastMonthPct,
  }
}

function computeChartData(readingList: ReadingList): ChartData {
  const readings = Object.values(readingList).flat()

  const readPerMonth = getMonths(readings).map((month) => {
    const ps = readings.filter((reading) => {
      const date = dayjs(reading.timestamp).format("MM/'YY")
      return date === month
    }).length

    return {
      month,
      posts: ps,
    }
  })

  const readTotalMonth = readPerMonth.reduce<Data[]>((list, {month, posts}) => {
    return [
      ...list,
      {
        month,
        posts: (list?.[list.length - 1]?.posts ?? 0) + posts,
      },
    ]
  }, [])

  return {readPerMonth, readTotalMonth}
}

function computeStatistics(readingList: ReadingList): Statistics {
  const quickStatistics = computeQuickStatistics(readingList)
  const chartData = computeChartData(readingList)

  return {
    quickStatistics,
    chartData,
  }
}

export {computeStatistics}
