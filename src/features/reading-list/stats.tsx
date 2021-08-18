import React from 'react'
import dayjs from 'dayjs'
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Reading} from 'lib/gitrows'

export function formatDate(date?: Date | string | number, defaultValue = '', options: Intl.DateTimeFormatOptions = {}) {
  if (!date) {
    return defaultValue
  }
  // https://css-tricks.com/how-to-convert-a-date-string-into-a-human-readable-format/
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

function formatStatNumber(number: number, options: Intl.NumberFormatOptions = {}): string {
  return number.toLocaleString('en-US', {
    notation: 'compact',
    unitDisplay: 'short',
    ...options,
  })
}

export type Stats = {
  total: number
  oldest: string
  currentMonth: number
  lastMonthPct: number
}

function computeStats(readingList: Record<string, Reading[]>, now = dayjs()): Stats {
  const readings = Object.values(readingList).flat()

  const total = readings.length
  const oldest = formatDate(readings[readings.length - 1].timestamp)
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

function Statistics({total, oldest, currentMonth, lastMonthPct}: Stats) {
  return (
    <StatGroup borderWidth="1px" p={4} rounded="md" my={8} width="full" maxWidth="lg">
      <Stat flex={2} ml={2}>
        <StatLabel>Posts Read</StatLabel>
        <StatNumber fontSize="4xl">{formatStatNumber(total)}</StatNumber>
        <StatHelpText fontSize="xs">Since {oldest}</StatHelpText>
      </Stat>
      <Stat textAlign="center">
        <StatLabel>This Month</StatLabel>
        <StatNumber>{currentMonth}</StatNumber>
        {lastMonthPct !== 0 && (
          <StatHelpText
            fontSize="xs"
            color={mode(lastMonthPct > 0 ? 'green.600' : 'red.600', lastMonthPct > 0 ? 'green.400' : 'red.400')}
          >
            <StatArrow type={lastMonthPct > 0 ? 'increase' : 'decrease'} />
            {formatStatNumber(lastMonthPct, {
              signDisplay: 'exceptZero',
            })}
            %
          </StatHelpText>
        )}
      </Stat>
    </StatGroup>
  )
}

export {Statistics, computeStats}
