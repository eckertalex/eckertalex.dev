import {VStack, Text} from '@chakra-ui/react'
import {useColorModeValue as mode} from '@chakra-ui/react'
import {CustomLink} from '@/components/link'

type TrackProps = {
  artist: string
  songUrl: string
  title: string
}

export function Track(props: TrackProps) {
  const {songUrl, title, artist} = props

  return (
    <VStack alignItems="start">
      <CustomLink
        as="span"
        fontWeight="medium"
        color={mode('gray.900', 'gray.100')}
        href={songUrl}
        isTruncated
        isExternal
        maxW={{sm: 64, md: 'full'}}
      >
        {title}
      </CustomLink>
      <Text as="span" color="gray.500" isTruncated maxW={{sm: 64, md: 'full'}}>
        {artist}
      </Text>
    </VStack>
  )
}
