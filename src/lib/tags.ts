import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import {kebabCase} from './utils'

const root = process.cwd()

export async function getAllTags() {
  const files = fs.readdirSync(path.join(root, 'src/data/blog'))
  const tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'src/data/blog', file), 'utf8')
    const {data} = matter(source)
    if (Array.isArray(data.tags)) {
      data.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag) {
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        }
      })
    }
  })

  return tagCount
}
