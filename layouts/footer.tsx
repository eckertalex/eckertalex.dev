import React from 'react'
import NextLink from 'next/link'

import config from 'site.config'

export default function Footer() {
  return (
    <footer className="py-4 text-gray-700 dark:text-gray-400 flex space-x-4 justify-center">
      <span>{config.meta.copyright}</span>
      <NextLink href="/impressum">
        <a>Impressum</a>
      </NextLink>
      <NextLink href="/datenschutz">
        <a>Datenschutz</a>
      </NextLink>
    </footer>
  )
}
