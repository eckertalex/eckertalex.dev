import React from 'react'
import {Container, Heading, VStack, Stack, useMediaQuery} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {FirewoodUnitConverter} from 'features/calc/firewood/firewood-unit-converter'

export default function Firewood() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`Firewood Unit Converter - ${metadata.author}`} url={`${metadata.siteUrl}/calc/firewood`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        {'Firewood Unit Converter'}
      </Heading>
      <VStack spacing={16} width="full">
        <Stack
          flexDirection={isLargerThan768 ? 'row' : 'column'}
          justifyContent="space-between"
          alignItems={isLargerThan768 ? 'end' : 'center'}
          width="full"
          spacing={4}
        >
          <FirewoodUnitConverter />
        </Stack>
      </VStack>
    </Container>
  )
}
