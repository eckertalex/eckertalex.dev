import React from 'react'
import {Container, Heading, VStack, HStack} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {usePxRem} from 'features/calc/px-rem/use-px-rem'
import {BaseInput, PixelsInput, RemsInput, SwitchHorizontalIconButton} from 'features/calc/px-rem/inputs'

export default function RemPx() {
  const [{base, pixels, rems}, {onBaseChange, onPixelsChange, onRemsChange}] = usePxRem({base: '16', pixels: '10'})

  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`REM \u21C4 PX - ${metadata.author}`} url={`${metadata.siteUrl}/calc/rem-px`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        {'REM \u21C4 PX converter'}
      </Heading>
      <VStack spacing={16} width="full">
        <BaseInput value={base} onChange={onBaseChange} />
        <HStack justifyContent="space-between" alignItems="end" width="full">
          <RemsInput value={rems} onChange={onRemsChange} />
          <SwitchHorizontalIconButton label="Switch to PX to REM" to="/calc/px-rem" />
          <PixelsInput value={pixels} onChange={onPixelsChange} />
        </HStack>
      </VStack>
    </Container>
  )
}
