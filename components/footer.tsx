import React from 'react'

import config from 'site.config'
/* -------------------------------------------------------------------------- */

export default function Footer() {
  return <footer className="py-4 text-gray-700 dark:text-gray-400 text-center">{config.meta.copyright}</footer>
}
