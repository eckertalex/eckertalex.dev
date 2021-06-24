function formatDate(date, defaultValue = '', options = {}) {
  if (!date) {
    return defaultValue
  }
  // https://css-tricks.com/how-to-convert-a-date-string-into-a-human-readable-format/
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

function decodeReading(reading) {
  for (const key of Object.keys(reading)) {
    if (typeof reading[key] !== 'string') {
      continue
    }
    reading[key] = decodeURIComponent(reading[key])
  }
  return reading
}

async function fetchReading() {
  const Gitrows = require('gitrows')
  const gitrows = new Gitrows()

  return ((await gitrows.get(process.env.READING_LIST_CSV_URL)) ?? [])
    .map(decodeReading)
    .reverse()
    .reduce((list, reading) => {
      const date = formatDate(reading.timestamp)
      return {
        ...list,
        [date]: [...(list[date] ?? []), reading],
      }
    }, {})
}

export {fetchReading}
