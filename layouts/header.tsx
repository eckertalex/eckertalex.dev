import React from 'react'
import NextLink from 'next/link'

import config from 'site.config'
import ThemeToggle from 'components/theme-toggle'

export default function Header() {
  return (
    <header className="pb-4 flex flex-col">
      <div className="flex justify-between items-center">
        <NextLink href="/">
          <a className="text-pink-500 dark:text-yellow hover:no-underline text-4xl">{config.meta.title}</a>
        </NextLink>
        <ThemeToggle />
      </div>
      <div className="pt-4 sm:flex sm:justify-between">
        <div className="space-x-6">
          {config.navigation.map((link) => (
            <NextLink key={link.slug} href={link.slug}>
              <a className="text-gray-700 dark:text-gray-400 hover:underline font-light">{link.title}</a>
            </NextLink>
          ))}
        </div>
        <div className="space-x-6">
          {config.externalLinks.map((link) => (
            <a key={link.url} href={link.url} className="text-gray-700 dark:text-gray-400 hover:underline font-light">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
