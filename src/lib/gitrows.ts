export type Reading = Record<string, string>
export type ReadingList = Record<string, Reading[]>

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

async function fetchReadings() {
  const Gitrows = require('gitrows')
  const gitrows = new Gitrows()

  return (((await gitrows.get(process.env.READING_LIST_CSV_URL)) as Reading[]) ?? [])
    .map(decodeReading)
    .reduceRight<ReadingList>((list, reading) => {
      const date = formatDate(reading.timestamp)
      return {
        ...list,
        [date]: [...(list[date] ?? []), reading],
      }
    }, {})
}

export {fetchReadings}
