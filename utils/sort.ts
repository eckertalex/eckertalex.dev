import {FrontMatter} from '@types'
import {LinkItem} from 'data/links'
/* -------------------------------------------------------------------------- */

export const sortPostsByDate = (posts: FrontMatter[]) =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const sortLinksByDate = (links: LinkItem[]) =>
  links.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
