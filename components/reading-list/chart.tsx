import React, {useContext} from 'react'
import {
  AnimatedAxis,
  AnimatedAreaSeries,
  XYChart,
  Tooltip,
  DataContext,
  lightTheme,
  darkTheme,
} from '@visx/xychart'
import {PatternLines} from '@visx/pattern'
import {useColorModeValue, useMediaQuery} from '@chakra-ui/react'
import {ChartData} from './util'

const patternId = 'reading-chart-pattern'

function ChartBackground() {
  const {theme, margin, width, height, innerWidth, innerHeight} =
    useContext(DataContext)

  // early return values not available in context
  if (width == null || height == null || margin == null || theme == null)
    return null

  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={['diagonal']}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={theme?.backgroundColor ?? '#fff'}
      />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.3}
      />
    </>
  )
}

function Chart({readTotalMonth, readPerMonth}: ChartData) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const theme = useColorModeValue(lightTheme, darkTheme)

  return (
    <XYChart
      theme={theme}
      height={300}
      xScale={{type: 'band'}}
      yScale={{type: 'linear'}}
    >
      <ChartBackground />
      <AnimatedAreaSeries
        dataKey="totalReadings"
        data={readTotalMonth}
        xAccessor={(month) => month.month}
        yAccessor={(month) => month.posts}
        fillOpacity={0.4}
      />
      <AnimatedAreaSeries
        dataKey="monthlyReadings"
        data={readPerMonth}
        xAccessor={(month) => month.month}
        yAccessor={(month) => month.posts}
        fillOpacity={0.4}
      />
      <AnimatedAxis orientation="left" animationTrajectory="center" />
      {isLargerThan768 ? (
        <AnimatedAxis orientation="bottom" animationTrajectory="center" />
      ) : null}
      <Tooltip<{month: string; posts: number}>
        showHorizontalCrosshair
        showVerticalCrosshair
        renderTooltip={({tooltipData, colorScale}) =>
          tooltipData?.nearestDatum?.datum ? (
            <>
              {tooltipData.nearestDatum.datum.month}
              <br />
              <br />
              {Object.keys(tooltipData?.datumByKey ?? {}).map((dataKey) => (
                <div key={dataKey}>
                  <em
                    style={{
                      color: colorScale?.(dataKey),
                    }}
                  >
                    {dataKey === 'totalReadings'
                      ? 'Total posts read: '
                      : `Posts read ${tooltipData.nearestDatum?.datum.month}: `}
                  </em>
                  {tooltipData?.datumByKey[dataKey].datum.posts}
                </div>
              ))}
            </>
          ) : null
        }
      />
    </XYChart>
  )
}

export {Chart}
