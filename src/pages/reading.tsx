import {VStack} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {ReadingList} from 'features/reading-list/reading-list'
import {fetchReadings, Reading} from 'lib/gitrows'

export default function ReadingPage({readings}: {readings: Record<string, Reading[]>}) {
  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="All the blog posts I have read since June 2020."
        title={`Reading - ${metadata.author}`}
        url={`${metadata.siteUrl}/reading`}
      />
      <PageTitle as="h1">Reading</PageTitle>
      <ReadingList readings={readings} />
    </VStack>
  )
}

export async function getStaticProps() {
  const readings = await fetchReadings()

  return {
    props: {
      readings,
    },
    revalidate: 43200, // 12 hours
  }
}
