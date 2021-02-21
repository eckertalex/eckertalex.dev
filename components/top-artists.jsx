import useSWR from 'swr'
import {fetcher} from '@/lib/fetcher'
import {Artist} from '@/components/artist'

export function TopArtists() {
  const {data} = useSWR('/api/top-artists', fetcher)

  if (!data) {
    return null
  }

  return (
    <>
      <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Top Artists
      </h2>
      <p>Here&apos;s my top artists on Spotify.</p>
      {data.artists.map((artist, index) => (
        <Artist key={artist.artistUrl} ranking={index + 1} {...artist} />
      ))}
    </>
  )
}
