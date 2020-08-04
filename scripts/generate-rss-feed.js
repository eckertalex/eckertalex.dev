const fs = require('fs')
const {join} = require('path')
const {promisify} = require('util')
const matter = require('gray-matter')
const {Feed} = require('feed')
/* -------------------------------------------------------------------------- */

const POSTS_DIR = join(process.cwd(), 'pages/blog')

function getPostSlugs(dir) {
  return fs.readdirSync(dir)
}

function getAllPosts() {
  return getPostSlugs(POSTS_DIR)
}

function getPostBySlug(slug) {
  if (!slug) {
    return false
  }

  const fullPath = join(POSTS_DIR, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)

  return {
    ...data,
    slug,
    content,
  }
}

;(async () => {
  const author = {
    name: 'Alexander Eckert',
    email: 'eckertalex@protonmail.com',
    link: 'https://eckertalex.dev',
  }

  const feed = new Feed({
    title: 'eckertalex.dev',
    description: 'Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.',
    id: 'https://eckertalex.dev',
    link: 'https://eckertalex.dev',
    language: 'en',
    image: 'https://eckertalex.dev/static/img/og.png',
    favicon: 'https://eckertalex.dev/static/favicons/favicon.ico',
    copyright: 'Alexander Eckert © 2017 - 2020',
    feedLinks: {
      rss: 'https://eckertalex.dev/rss.xml',
    },
    author: author,
  })

  getAllPosts().forEach((post) => {
    const frontmatter = getPostBySlug(post)
    const slug = frontmatter.slug.replace('.mdx', '')

    feed.addItem({
      title: frontmatter.title,
      id: slug,
      link: `https://eckertalex.dev/blog/${slug}`,
      description: frontmatter.summary,
      content: `${frontmatter.summary} - To read in full, please visit https://eckertalex.dev/blog/${slug}`,
      author: [author],
      date: new Date(frontmatter.date),
    })
  })

  feed.addCategory('Programming')
  feed.addCategory('Technology')
  feed.addCategory('Web Development')
  feed.addCategory('Development')

  promisify(fs.writeFile)('public/rss.xml', feed.rss2())
    .then(() => console.log('✅ RSS feed successfully created!'))
    .catch((err) => console.error(err))
})()
