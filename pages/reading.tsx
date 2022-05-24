import {useState} from 'react'
import {Input, InputGroup, InputRightElement, VStack} from '@chakra-ui/react'
import {Search as SearchIcon} from 'lucide-react'
import {PageTitle} from '../components/page-title'
import {ReadingList} from '../components/reading-list/reading-list'
import {Statistics} from '../components/reading-list/statistics'
import {
  computeStatistics,
  Statistics as StatisticsProps,
} from '../components/reading-list/util'
import {
  fetchReadings,
  Reading,
  ReadingList as ReadingListType,
} from '../lib/gitrows'
import {NavLayout} from '../layout/nav-layout'

function match(searchValue: string, reading: Reading) {
  return (
    (reading.description ?? '')
      .toLowerCase()
      .includes(searchValue.toLowerCase()) ||
    (reading.title ?? '').toLowerCase().includes(searchValue.toLowerCase()) ||
    (reading.author ?? '').toLowerCase().includes(searchValue.toLowerCase())
  )
}

function filterReadings(
  searchValue: string,
  allReadings: ReadingListType
): ReadingListType {
  return Object.fromEntries(
    Object.entries(allReadings)
      .map(([day, readings]) => [
        day,
        readings.filter((reading) => match(searchValue, reading)),
      ])
      .filter(([, readings]) => readings.length > 0)
  )
}

type ReadingPageProps = {
  readings: ReadingListType
  statistics: StatisticsProps
}

export default function ReadingPage({readings, statistics}: ReadingPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredReadings = filterReadings(searchValue, readings)

  return (
    <NavLayout
      title="Reading | Alexander Eckert"
      description="All the blog posts I have read since June 2020."
    >
      <VStack alignItems="start" marginBottom={8}>
        <PageTitle>Reading</PageTitle>
        <Statistics {...statistics} />
        <InputGroup maxWidth="lg">
          <Input
            placeholder="Search posts"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <ReadingList readings={filteredReadings} />
      </VStack>
    </NavLayout>
  )
}

export async function getStaticProps() {
  const readings = await fetchReadings()
  const statistics = computeStatistics(readings)

  return {
    props: {
      readings,
      statistics,
    },
    revalidate: 43200, // 12 hours
  }
}
