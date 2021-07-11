import {VStack} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {ReadingList} from 'features/reading-list/reading-list'
import {fetchReading} from 'lib/gitrows'

export default function ReadingPage(props) {
  const {reading} = props

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="All the blog posts I have read since June 2020."
        title={`Reading - ${metadata.author}`}
        url={`${metadata.siteUrl}/reading`}
      />
      <PageTitle as="h1">Reading</PageTitle>
      <ReadingList reading={reading} />
    </VStack>
  )
}

export async function getStaticProps() {
  const reading = await fetchReading()

  return {
    props: {
      reading,
    },
    revalidate: 43200, // 12 hours
  }
}
