import useSWR from 'swr'
import {Heading, Text, OrderedList, ListItem, useColorModeValue as mode} from '@chakra-ui/react'
import {fetcher} from '@/lib/fetcher'
import {Track} from '@/components/track'

export function TopTracks() {
  const {data: tracks = []} = useSWR<
    {
      artist: string
      songUrl: string
      title: string
    }[]
  >('/api/top-tracks', fetcher)

  if (!tracks.length) {
    return null
  }

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
      <OrderedList spacing={4} marginY={4}>
        {tracks.map((track) => (
          <ListItem key={track.songUrl} color="gray.500" marginLeft={6}>
            <Track {...track} />
          </ListItem>
        ))}
      </OrderedList>
    </>
  )
}
