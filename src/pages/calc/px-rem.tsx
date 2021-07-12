import {Container, Heading} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PxRemForm} from 'features/calc/px-rem/px-rem-form'

export default function PxRem() {
  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`PX \u21C4 REM - ${metadata.author}`} url={`${metadata.siteUrl}/calc/px-rem`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        {'PX \u21C4 REM converter'}
      </Heading>
      <PxRemForm />
    </Container>
  )
}
