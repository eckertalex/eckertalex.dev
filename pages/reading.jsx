import {VStack} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {ReadingList} from '@/components/reading-list'
import {fetchReading} from '@/lib/gitrows'

export default function ReadingPage(props) {
  const {reading} = props

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="All the blog posts I have read since June 2020."
        title={`Reading - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/reading`}
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
