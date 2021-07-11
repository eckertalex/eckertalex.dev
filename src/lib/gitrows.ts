function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function decodeReading(reading: Reading) {
  Object.keys(reading).forEach((key: string) => {
    if (typeof reading[key] === 'string') {
      reading[key] = decodeURIComponent(reading[key])
    }
  })

  return reading
}

export type Reading = Record<string, string>

async function fetchReadings() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Gitrows = require('gitrows')
  const gitrows = new Gitrows()

  return (((await gitrows.get(process.env.READING_LIST_CSV_URL)) as Reading[]) ?? [])
    .map(decodeReading)
    .reduceRight<Record<string, Reading[]>>((list, reading) => {
      const date = formatDate(reading.timestamp)
      return {
        ...list,
        [date]: [...(list[date] ?? []), reading],
      }
    }, {})
}

export {fetchReadings}
