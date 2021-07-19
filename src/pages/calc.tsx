import Link from 'next/link'
import {Container, Heading, UnorderedList, ListItem} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'

export default function Calc() {
  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`Calculators - ${metadata.author}`} url={`${metadata.siteUrl}/calc`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        Calculators
      </Heading>
      <UnorderedList>
        <ListItem>
          <Link href="/calc/px-rem">{'PX \u21C4 REM converter'}</Link>
        </ListItem>
        <ListItem>
          <Link href="/calc/rem-px">{'REM \u21C4 PX converter'}</Link>
        </ListItem>
      </UnorderedList>
    </Container>
  )
}
