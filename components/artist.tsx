type ArtistProps = {
  ranking: number
  name: string
  artistUrl: string
}

export function Artist(props: ArtistProps) {
  const {ranking, artistUrl, name} = props

  return (
    <div className="flex flex-row items-baseline max-w-3xl w-full mt-2">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">{ranking}</p>
      <div className="flex flex-col pl-3">
        <a
          className="font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96 md:w-full"
          href={artistUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {name}
        </a>
      </div>
    </div>
  )
}
