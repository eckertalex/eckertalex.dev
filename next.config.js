// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  webpack: (config, {dev, isServer}) => {
    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
