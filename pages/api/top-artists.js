import {getTopArtists} from '@/lib/spotify'

export default async function fetchTopArtists(_, res) {
  const response = await getTopArtists()
  const {items} = await response.json()

  const artists = items.slice(0, 10).map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json({artists})
}
