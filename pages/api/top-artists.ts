import {NextApiRequest, NextApiResponse} from 'next'
import {getTopArtists} from '../../lib/spotify'

export default async function fetchTopArtists(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const {parsedBody} = await getTopArtists()

  const artists = parsedBody.map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
  }))

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json(artists)
}
