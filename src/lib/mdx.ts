import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemoteSerializeResult} from 'next-mdx-remote'

const root = process.cwd()

function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

async function getBlogPosts() {
  return fs.readdirSync(path.join(root, 'src/data/blog'))
}

function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
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

type GrayMatter = {
  title: string
  date: string
  tags: string[]
  draft: boolean
  summary: string
  images: string[]
}

export type FrontMatter = GrayMatter & {
  wordCount: number
  readingTime: number
  slug: string | null
  fileName: string
}

export type MDXPage = {
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: FrontMatter
}

async function getFileBySlug(type: string, slug?: string): Promise<MDXPage> {
  const filePath = slug ? path.join(root, 'src/data', type, `${slug}.mdx`) : path.join(root, 'src/data', `${type}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const {data, content} = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-toc'),
        [require('remark-autolink-headings'), autolinkHeadingsOptions],
      ],
      rehypePlugins: [],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content).minutes,
      slug: slug || null,
      fileName: slug ? `${slug}.mdx` : `${type}.mdx`,
      ...(data as GrayMatter),
    },
  }
}

async function getAllBlogPostsFrontMatter() {
  const files = fs.readdirSync(path.join(root, 'src/data/blog'))
  const allFrontMatter: FrontMatter[] = []

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'src/data/blog', file), 'utf8')
    const {data, content} = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({
        wordCount: content.split(/\s+/gu).length,
        readingTime: readingTime(content).minutes,
        slug: formatSlug(file),
        fileName: `${file}.mdx`,
        ...(data as GrayMatter),
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}

export {getBlogPosts, formatSlug, getFileBySlug, getAllBlogPostsFrontMatter}
