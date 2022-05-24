import useSWR from 'swr'
import {
  VStack,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Spinner,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Link} from '../link'
import {fetcher} from '../../lib/fetcher'

type Track = {
  artist: string
  songUrl: string
  title: string
}

function Track(props: Track) {
  const {songUrl, title, artist} = props

  return (
    <VStack alignItems="start">
      <Link
        as="span"
        fontWeight="medium"
        color={mode('gray.900', 'gray.100')}
        href={songUrl}
        noOfLines={1}
        isExternal
        maxW={{sm: 64, md: 'full'}}
      >
        {title}
      </Link>
      <Text
        as="span"
        color="gray.500"
        noOfLines={1}
        maxW={{sm: 64, md: 'full'}}
      >
        {artist}
      </Text>
    </VStack>
  )
}

function TopTracks() {
  const {data: tracks = []} = useSWR<Track[]>('/api/top-tracks', fetcher)

  return (
    <>
      <Heading
        as="h2"
        fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}
        fontWeight="bold"
        letterSpacing="tight"
        color={mode('gray.900', 'gray.100')}
      >
        Top Tracks
      </Heading>
      <Text>Here&apos;s my top tracks on Spotify updated daily.</Text>
      {tracks.length ? (
        <OrderedList spacing={4} marginY={4}>
          {tracks.map((track) => (
            <ListItem key={track.songUrl} color="gray.500" marginLeft={6}>
              <Track {...track} />
            </ListItem>
          ))}
        </OrderedList>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export {TopTracks}
