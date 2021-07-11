import metadata from 'metadata'
import {FrontMatter} from 'lib/mdx'

function generateRssItem(post: FrontMatter) {
  return `
    <item>
      <guid>${metadata.siteUrl}/blog/${post.slug}</guid>
      <title>${post.title}</title>
      <link>${metadata.siteUrl}/blog/${post.slug}</link>
      <description>${post.summary}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${metadata.email} (${metadata.author})</author>
      ${post.tags.map((t) => `<category>${t}</category>`).join('')}
    </item>
  `
}

export function generateRss(posts: FrontMatter[], page = 'index.xml') {
  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${metadata.author}</title>
        <link>${metadata.siteUrl}/blog</link>
        <description>${metadata.description}</description>
        <language>${metadata.language}</language>
        <managingEditor>${metadata.email} (${metadata.author})</managingEditor>
        <webMaster>${metadata.email} (${metadata.author})</webMaster>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${metadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('')}
      </channel>
    </rss>
  `
}
