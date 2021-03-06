import useSWR from 'swr'
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
      <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Top Tracks
      </h2>
      <p>Here&apos;s my top tracks on Spotify updated daily.</p>
      {tracks.map((track, index) => (
        <Track key={track.songUrl} ranking={index + 1} {...track} />
      ))}
    </>
  )
}
