import React from 'react'
import {Container, Heading, VStack, HStack} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {usePxRem} from 'features/calc/px-rem/use-px-rem'
import {BaseInput, PixelsInput, RemsInput, SwitchHorizontalIconButton} from 'features/calc/px-rem/inputs'

export default function PxRem() {
  const [{base, pixels, rems}, {onBaseChange, onPixelsChange, onRemsChange}] = usePxRem({base: '16', pixels: '10'})

  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`PX \u21C4 REM - ${metadata.author}`} url={`${metadata.siteUrl}/calc/px-rem`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        {'PX \u21C4 REM converter'}
      </Heading>
      <VStack spacing={16} width="full">
        <BaseInput value={base} onChange={onBaseChange} />
        <HStack justifyContent="space-between" alignItems="end" width="full">
          <PixelsInput value={pixels} onChange={onPixelsChange} />
          <SwitchHorizontalIconButton label="Switch to REM to PX" to="/calc/rem-px" />
          <RemsInput value={rems} onChange={onRemsChange} />
        </HStack>
      </VStack>
    </Container>
  )
}
