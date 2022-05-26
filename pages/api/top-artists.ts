import {NextApiRequest, NextApiResponse} from 'next'
import {getTopArtists, Artist} from '../../lib/spotify'

export default async function fetchTopArtists(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getTopArtists()
  const {items}: {items: Artist[]} = await response.json()

  const artists = items.map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
  }))

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json(artists)
}
