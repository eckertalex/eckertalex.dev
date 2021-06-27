import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {TopTracks} from '@/components/top-tracks'
import {TopArtists} from '@/components/top-artists'

export default function Dashboard() {
  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="My recent Spotify statistics. See my top artists, tracks, and what I am currently listening to."
        title={`Dashboard - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/dashboard`}
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
