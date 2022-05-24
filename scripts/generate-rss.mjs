import {writeFileSync} from 'fs'
import RSS from 'rss'
import {allBlogPosts} from '../.contentlayer/generated/BlogPost/_index.mjs'

async function generate() {
  const feed = new RSS({
    title: 'Alexander Eckert',
    site_url: 'https://eckertalex.dev',
    feed_url: 'https://eckertalex.dev/feed.xml',
  })

  allBlogPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://eckertalex.dev/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary,
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({indent: true}))
}

generate()
