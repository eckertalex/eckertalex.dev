import React from 'react'
import {Input, InputGroup, InputRightElement, VStack} from '@chakra-ui/react'
import {Search as SearchIcon} from 'lucide-react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {ReadingList} from 'features/reading-list/reading-list'
import {Statistics, computeStats, Stats} from 'features/reading-list/stats'
import {fetchReadings, Reading} from 'lib/gitrows'

function match(searchValue: string, reading: Reading) {
  return (
    (reading.description ?? '').toLowerCase().includes(searchValue.toLowerCase()) ||
    (reading.title ?? '').toLowerCase().includes(searchValue.toLowerCase()) ||
    (reading.author ?? '').toLowerCase().includes(searchValue.toLowerCase())
  )
}

function filterReadings(searchValue: string, allReadings: Record<string, Reading[]>): Record<string, Reading[]> {
  return Object.fromEntries(
    Object.entries(allReadings)
      .map(([day, readings]) => [day, readings.filter((reading) => match(searchValue, reading))])
      .filter(([, readings]) => readings.length > 0)
  )
}

export default function ReadingPage({readings, stats}: {readings: Record<string, Reading[]>; stats: Stats}) {
  const [searchValue, setSearchValue] = React.useState('')
  const filteredReadings = filterReadings(searchValue, readings)

  return (
    <VStack alignItems="start" marginBottom={8}>
      <PageSeo
        description="All the blog posts I have read since June 2020."
        title={`Reading - ${metadata.author}`}
        url={`${metadata.siteUrl}/reading`}
      />
      <PageTitle as="h1">Reading</PageTitle>
      <Statistics {...stats} />
      <InputGroup maxWidth="lg">
        <Input placeholder="Search posts" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <ReadingList readings={filteredReadings} />
    </VStack>
  )
}

export async function getStaticProps() {
  const readings = await fetchReadings()
  const stats = computeStats(readings)

  return {
    props: {
      readings,
      stats,
    },
    revalidate: 43200, // 12 hours
  }
}
