import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {PageTitle} from '../components/page-title'
import {TopTracks} from '../components/spotify/top-tracks'
import {TopArtists} from '../components/spotify/top-artists'
import {NavLayout} from '../layout/nav-layout'

export default function Dashboard() {
  return (
    <NavLayout
      title="Dashboard | Alexander Eckert"
      description="My recent Spotify statistics. See my top artists, tracks, and what I am currently listening to."
    >
      <VStack alignItems="start" spacing={8}>
        <PageTitle>Dashboard</PageTitle>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <VStack alignItems="start" spacing={2}>
          <TopTracks />
          <TopArtists />
        </VStack>
      </VStack>
    </NavLayout>
  )
}
