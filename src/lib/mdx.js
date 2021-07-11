import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import {serialize} from 'next-mdx-remote/serialize'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkAutolinkHeadings from 'remark-autolink-headings'

const root = process.cwd()

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'src/data', type))
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

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

export async function getFileBySlug(type, slug) {
  const filePath = slug ? path.join(root, 'src/data', type, `${slug}.mdx`) : path.join(root, 'src/data', `${type}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const {data, content} = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, remarkToc, [remarkAutolinkHeadings, autolinkHeadingsOptions]],
      inlineNotes: true,
      rehypePlugins: [],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: slug ? `${slug}.mdx` : `${type}.mdx`,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, 'src/data', type))
  const allFrontMatter = []

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'src/data', type, file), 'utf8'),
      {data} = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({...data, slug: formatSlug(file)})
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
