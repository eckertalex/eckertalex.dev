const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withMdxEnhanced = require('next-mdx-enhanced')
const readingTime = require('reading-time')
const remarkSlug = require('remark-slug')
const remarkAutolinkHeadings = require('remark-autolink-headings')

const autolinkHeadingsOptions = {
  behavior: 'append',
  content: {
    type: 'element',
    tagName: 'span',
    properties: {
      style: {
        marginLeft: '0.5rem',
      },
    },
    children: [
      {
        type: 'text',
        value: '#',
      },
    ],
  },
}

function extendFrontmatterProcess(mdxContent, frontmatter) {
  return {
    ...frontmatter,
    slug: frontmatter.__resourcePath.replace('.mdx', ''),
    readingTime: readingTime(mdxContent),
  }
}

const nextConfig = {
  pageExtensions: ['ts', 'tsx'],

  webpack: (config, options) => {
    if (options.isServer) {
      require('./scripts/generate-sitemap')
      require('./scripts/generate-rss-feed')
    }

    return config
  },

  async redirects() {
    return [
      {
        source: '/wedding',
        destination: 'https://wedding.eckertalex.dev',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins(
  [
    withSourceMaps,
    withBundleAnalyzer,
    withMdxEnhanced({
      layoutPath: 'layouts',
      defaultLayout: true,
      fileExtensions: ['mdx'],
      remarkPlugins: [remarkSlug, [remarkAutolinkHeadings, autolinkHeadingsOptions]],
      rehypePlugins: [],
      extendFrontMatter: {
        process: extendFrontmatterProcess,
      },
    }),
  ],
  nextConfig
)
