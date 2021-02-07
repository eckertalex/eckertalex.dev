import useSWR from 'swr'
import {fetcher} from '@/lib/fetcher'
import {Track} from '@/components/track'

export function TopTracks() {
  const {data} = useSWR('/api/top-tracks', fetcher)

  if (!data) {
    return null
  }

  return (
    <>
      <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Top Tracks
      </h2>
      <p>Here's my top tracks on Spotify updated daily.</p>
      {data.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  )
}
