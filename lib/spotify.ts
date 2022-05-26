type ExternalUrls = {
  spotify: string
}

export type Artist = {
  name: string
  external_urls: ExternalUrls
}

export type Track = {
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

export type Song = {
  is_playing: boolean
  item: {
    name: string
    artists: Artist[]
    album: Album
    external_urls: ExternalUrls
  }
}

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term`
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken(): Promise<{access_token: string}> {
  if (!refresh_token) {
    throw new Error('Need `SPOTIFY_REFRESH_TOKEN` env variable')
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export async function getTopArtists() {
  const {access_token} = await getAccessToken()

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getTopTracks() {
  const {access_token} = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getNowPlaying() {
  const {access_token} = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
