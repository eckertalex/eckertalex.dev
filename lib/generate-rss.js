import siteMetadata from '@/data/siteMetadata'

function generateRssItem(post) {
  return `
    <item>
      <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
      <title>${post.title}</title>
      <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
      <description>${post.summary}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${siteMetadata.email} (${siteMetadata.author})</author>
      ${post.tags.map((t) => `<category>${t}</category>`).join('')}
    </item>
  `
}

export function generateRss(posts, page = 'index.xml') {
  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteMetadata.author}</title>
        <link>${siteMetadata.siteUrl}/blog</link>
        <description>${siteMetadata.description}</description>
        <language>${siteMetadata.language}</language>
        <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
        <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('')}
      </channel>
    </rss>
  `
}
