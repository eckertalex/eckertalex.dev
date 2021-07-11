import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {TopTracks} from 'features/spotify/top-tracks'
import {TopArtists} from 'features/spotify/top-artists'

export default function Dashboard() {
  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="My recent Spotify statistics. See my top artists, tracks, and what I am currently listening to."
        title={`Dashboard - ${metadata.author}`}
        url={`${metadata.siteUrl}/dashboard`}
      />
      <PageTitle as="h1">Dashboard</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <VStack alignItems="start" spacing={2}>
        <TopTracks />
        <TopArtists />
      </VStack>
    </VStack>
  )
}
