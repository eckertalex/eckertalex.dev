type TrackProps = {
  ranking: number
  artist: string
  songUrl: string
  title: string
}

export function Track(props: TrackProps) {
  const {ranking, songUrl, title, artist} = props

  return (
    <div className="flex flex-row items-baseline max-w-3xl w-full mt-2">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">{ranking}</p>
      <div className="flex flex-col pl-3">
        <a
          className="font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96 md:w-full"
          href={songUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}
        </a>
        <p className="text-gray-500 mb-4 truncate w-60 sm:w-96 md:w-full" color="gray.500">
          {artist}
        </p>
      </div>
    </div>
  )
}
