import querystring from 'querystring'
import {get, post} from 'lib/fetcher'

type ExternalUrls = {
  spotify: string
}

type Artist = {
  name: string
  external_urls: ExternalUrls
}

type Track = {
  artists: Artist[]
  external_urls: ExternalUrls
  name: string
}

type Album = {
  name: string
  images: {
    url: string
  }[]
}

type Song = {
  is_playing: boolean
  item: {
    name: string
    artists: Artist[]
    album: Album
    external_urls: ExternalUrls
  }
}

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term`
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

async function getAccessToken() {
  const response = await post<string, {access_token: string}>(
    TOKEN_ENDPOINT,
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return response.parsedBody?.access_token ?? ''
}

export async function getTopArtists() {
  const access_token = await getAccessToken()

  const response = await get<{items: Artist[]}>(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return {
    ...response,
    parsedBody: response.parsedBody?.items ?? [],
  }
}

export async function getTopTracks() {
  const access_token = await getAccessToken()

  const response = await get<{items: Track[]}>(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return {
    ...response,
    parsedBody: response.parsedBody?.items ?? [],
  }
}

export async function getNowPlaying() {
  const access_token = await getAccessToken()

  return get<Song>(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
