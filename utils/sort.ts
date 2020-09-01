import {FrontMatter} from '@types'
/* -------------------------------------------------------------------------- */

export const sortByDate = (posts: FrontMatter[]) =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
