import {globby} from 'globby'
import prettier from 'prettier'
import {writeFileSync} from 'fs'

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js'),
    pages = await globby([
      'src/pages/*.tsx',
      'src/pages/*.jsx',
      'src/pages/*.js',
      'src/data/**/*.mdx',
      'src/data/**/*.md',
      'public/tags/**/*.xml',
      '!src/pages/_*.tsx',
      '!src/pages/_*.jsx',
      '!src/pages/_*.js',
      '!src/pages/api',
      '!src/pages/404.tsx',
    ]),
    sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                    .replace('src/pages', '')
                    .replace('src/data', '')
                    .replace('public', '')
                    .replace('.tsx', '')
                    .replace('.jsx', '')
                    .replace('.js', '')
                    .replace('.mdx', '')
                    .replace('.md', '')
                    .replace('/index.xml', ''),
                  route = path === '/index' ? '' : path
                return `
                        <url>
                            <loc>${`https://eckertalex.dev${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `,
    formatted = prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    })

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted)
}

generate()
