import {
  format,
  differenceInCalendarMonths,
  addMonths,
  subMonths,
  startOfMonth,
} from 'date-fns'
import {QuickStatistics} from './quick-statistics'
import {Reading, ReadingList} from '../../lib/gitrows'

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
  const startDate = new Date(readings[readings.length - 1].timestamp)
  const endDate = new Date(readings[0].timestamp)
  const monthsBetween = differenceInCalendarMonths(endDate, startDate)

  return [...Array(monthsBetween + 1).keys()].map((i) =>
    format(addMonths(startDate, i), 'MM/yy')
  )
}

function computeQuickStatistics(
  readingList: ReadingList,
  now = Date.now()
): QuickStatistics {
  const readings = Object.values(readingList).flat()

  const total = readings.length
  const oldest = format(
    new Date(readings[readings.length - 1].timestamp),
    'MMMM dd, y'
  )
  const currentMonth = readings.filter(
    (reading) => Number(reading.timestamp) > startOfMonth(now).valueOf()
  ).length
  const lastMonth = readings.filter(
    (reading) =>
      Number(reading.timestamp) > startOfMonth(subMonths(now, 1)).valueOf() &&
      Number(reading.timestamp) <= subMonths(now, 1).valueOf()
  ).length
  const lastMonthPct =
    lastMonth === 0 ? 0 : (100 * (currentMonth - lastMonth)) / lastMonth

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
      const date = format(new Date(reading.timestamp), 'MM/yy')
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
