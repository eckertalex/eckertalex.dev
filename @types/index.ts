import {NextSeoProps} from 'next-seo'
/* -------------------------------------------------------------------------- */

type Meta = {
  title: string
  copyright: string
}

type NavigationItem = {
  title: string
  slug: string
}

type ExternalLinksItem = {
  name: string
  url: string
}

type Project = {
  name: string
  url: string
  tags: string[]
}

export type Config = {
  meta: Meta
  seo: NextSeoProps
  navigation: NavigationItem[]
  externalLinks: ExternalLinksItem[]
  projects: Project[]
}

/* -------------------------------------------------------------------------- */

type ReadingTime = {
  text: string
  minutes: number
  time: number
  words: number
}

export type Frontmatter = {
  layout: string
  title: string
  date: string
  summary: string
  slug: string
  readingTime: ReadingTime
  __resourcePath: string
}
