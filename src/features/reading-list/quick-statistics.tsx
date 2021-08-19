import React from 'react'
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {QuickStatistics as QuickStatisticsProps} from 'features/reading-list/util'

function formatQuickStatisticsNumber(number: number, options: Intl.NumberFormatOptions = {}): string {
  return number.toLocaleString('en-US', {
    notation: 'compact',
    unitDisplay: 'short',
    ...options,
  })
}

function QuickStatistics({total, oldest, currentMonth, lastMonthPct}: QuickStatisticsProps) {
  return (
    <StatGroup borderWidth="1px" p={4} rounded="md" my={8} width="full" maxWidth="lg">
      <Stat flex={2} ml={2}>
        <StatLabel>Posts Read</StatLabel>
        <StatNumber fontSize="4xl">{formatQuickStatisticsNumber(total)}</StatNumber>
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
            {formatQuickStatisticsNumber(lastMonthPct, {
              signDisplay: 'exceptZero',
            })}
            %
          </StatHelpText>
        )}
      </Stat>
    </StatGroup>
  )
}

export {QuickStatistics}
