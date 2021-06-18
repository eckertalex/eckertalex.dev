import useSWR from 'swr'
import {Heading, Text, OrderedList, ListItem, Spinner, useColorModeValue as mode} from '@chakra-ui/react'
import {fetcher} from '@/lib/fetcher'
import {Artist} from '@/components/artist'

export function TopArtists() {
  const {data: artists = []} = useSWR<
    {
      name: string
      artistUrl: string
    }[]
  >('/api/top-artists', fetcher)

  return (
    <>
      <Heading
        as="h2"
        fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}
        fontWeight="bold"
        letterSpacing="tight"
        color={mode('gray.900', 'gray.100')}
      >
        Top Artists
      </Heading>
      <Text>Here&apos;s my top artists on Spotify.</Text>
      {artists.length ? (
        <OrderedList spacing={4} my={4}>
          {artists.map((artist) => (
            <ListItem key={artist.artistUrl} color="gray.500" marginLeft={6}>
              <Artist {...artist} />
            </ListItem>
          ))}
        </OrderedList>
      ) : (
        <Spinner />
      )}
    </>
  )
}
