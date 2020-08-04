import {Frontmatter} from '@types'
/* -------------------------------------------------------------------------- */

export const sortByDate = (posts: Frontmatter[]) =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
