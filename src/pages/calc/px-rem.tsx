import React from 'react'
import {Container, Heading, VStack, Stack, useMediaQuery} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {usePxRem} from 'features/calc/px-rem/use-px-rem'
import {BaseInput, PixelsInput, RemsInput} from 'features/calc/px-rem/inputs'
import {Icon} from '@chakra-ui/react'
import {ArrowLeftRight as ArrowLeftRightIcon} from 'lucide-react'

export default function PxRem() {
  const [{base, pixels, rems}, {onBaseChange, onPixelsChange, onRemsChange}] = usePxRem({base: '16', pixels: '10'})
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

  return (
    <Container maxW="container.md" centerContent>
      <PageSeo title={`PX \u21C4 REM - ${metadata.author}`} url={`${metadata.siteUrl}/calc/px-rem`} />
      <Heading as="h1" fontSize="3xl" marginBottom={16}>
        {'PX \u21C4 REM converter'}
      </Heading>
      <VStack spacing={16} width="full">
        <BaseInput value={base} onChange={onBaseChange} />
        <Stack
          flexDirection={isLargerThan768 ? 'row' : 'column'}
          justifyContent="space-between"
          alignItems={isLargerThan768 ? 'end' : 'center'}
          width="full"
          spacing={4}
        >
          <PixelsInput value={pixels} onChange={onPixelsChange} />
          <Icon as={ArrowLeftRightIcon} boxSize={12} transform={isLargerThan768 ? undefined : 'rotate(90deg)'} />
          <RemsInput value={rems} onChange={onRemsChange} />
        </Stack>
      </VStack>
    </Container>
  )
}
