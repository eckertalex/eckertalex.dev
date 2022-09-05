// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const {withContentlayer} = require('next-contentlayer')
const withBundleAnalyzer = require('@next/bundle-analyzer')

module.exports = withContentlayer(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })({
    swcMinify: true,
    reactStrictMode: true,
    experimental: {
      esmExternals: true,
      legacyBrowsers: false,
      browsersListForSwc: true,
      images: {allowFutureImage: true},
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
  })
)

// https://nextjs.org/docs/advanced-features/security-headers
const ContentSecurityPolicy = `
  default-src 'self' chiffre.io vitals.vercel-insights.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' chiffre.io;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]
