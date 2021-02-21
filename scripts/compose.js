const fs = require('fs'),
  args = process.argv.slice(2),
  title = args[0],
  ext = typeof args[1] !== 'undefined' ? args[1] : 'mdx',
  // Remove special characters and replace space with -
  fileName = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-'),
  d = new Date(),
  date = [d.getFullYear(), `0${d.getMonth() + 1}`.slice(-2), `0${d.getDate()}`.slice(-2)].join('-'),
  frontMatter = `---
title: "${title}"
date: "${date}"
tags: []
draft: true
summary:
images: []
---
`

fs.writeFile(`data/blog/${fileName}.${ext}`, frontMatter, (err) => {
  if (err) throw err
})
