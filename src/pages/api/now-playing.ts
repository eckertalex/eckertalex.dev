import {NextApiRequest, NextApiResponse} from 'next'
import {getNowPlaying} from 'lib/spotify'

type NowPlaying = {
  album?: string
  albumImageUrl?: string
  artist?: string
  isPlaying?: boolean
  songUrl?: string
  title?: string
}

export default async function fetchNowPlaying(_: NextApiRequest, res: NextApiResponse<NowPlaying>) {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({isPlaying: false})
  }

  const song = response.parsedBody
  const title = song?.item?.name
  const isPlaying = song?.is_playing
  const artist = song?.item?.artists.map((artist) => artist.name).join(', ')
  const album = song?.item?.album.name
  const albumImageUrl = song?.item?.album.images[0].url
  const songUrl = song?.item?.external_urls.spotify

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}
