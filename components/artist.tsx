import {useColorModeValue as mode} from '@chakra-ui/react'
import {CustomLink} from '@/components/link'

type ArtistProps = {
  name: string
  artistUrl: string
}

function Artist(props: ArtistProps) {
  const {artistUrl, name} = props

  return (
    <CustomLink
      fontWeight="medium"
      color={mode('gray.900', 'gray.100')}
      href={artistUrl}
      isTruncated
      isExternal
      maxW={{sm: 64, md: 'full'}}
    >
      {name}
    </CustomLink>
  )
}

export {Artist}
