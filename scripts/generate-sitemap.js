const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const {promisify} = require('util')
/* -------------------------------------------------------------------------- */

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby(['pages/**/*.+(js|jsx|ts|tsx|mdx)', '!pages/_*.+(js|jsx|ts|tsx|mdx)'])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace('.jsx', '')
                  .replace('.js', '')
                  .replace('.tsx', '')
                  .replace('.ts', '')
                  .replace('.mdx', '')

                const route = path === '/index' ? '' : path

                return `
                        <url>
                            <loc>${`https://eckertalex.dev${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  promisify(fs.writeFile)('public/sitemap.xml', formatted)
    .then(() => console.log('✅ Sitemap successfully created!'))
    .catch((err) => console.error(err))
})()
