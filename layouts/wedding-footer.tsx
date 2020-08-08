import React from 'react'

import config from 'site.config'
import ThemeToggle from 'components/theme-toggle'
/* -------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="flex justify-between">
        <span className="text-gray-700 dark:text-gray-400 flex justify-center">{config.meta.copyright}</span>
        <ThemeToggle />
      </div>
    </footer>
  )
}
