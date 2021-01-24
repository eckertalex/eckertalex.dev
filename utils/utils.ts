import {FrontMatter} from '@types'
import {BlogPost} from 'data/blog-posts'
import {LinkItem} from 'data/links'

export function sortPostsByDate(posts: FrontMatter[]) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
export function sortLinksByDateAdded(links: LinkItem[]) {
  return links.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}

export function getCountOccurrences(arr: string[]) {
  return [...arr.reduce((map, key) => map.set(key, (map.get(key) || 0) + 1), new Map())].map((r) => ({
    name: r[0],
    count: r[1],
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy(groupBy: string, array: Record<string, any>[]) {
  return array.reduce((prev, curr, _, arr) => {
    const idx = curr[groupBy]
    if (!prev[idx]) {
      prev[idx] = arr.filter((item) => item[groupBy] === idx)
    }
    return prev
  }, {}) as BlogPost[]
}
