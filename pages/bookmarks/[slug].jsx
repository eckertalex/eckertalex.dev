import {MDXRemote} from 'next-mdx-remote'
import {formatSlug, getFileBySlug, getFiles, getAllFilesFrontMatter} from '@/lib/mdx'
import {MDXComponents} from '@/components/mdx-components'
import {Bookmarks} from '@/components/bookmarks'

export default function Page({bookmarks, bookmark}) {
  const {mdxSource, frontMatter} = bookmark

  return (
    <Bookmarks frontMatter={frontMatter} bookmarks={bookmarks}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Bookmarks>
  )
}

export async function getStaticPaths() {
  const bookmarks = await getFiles('bookmarks')

  return {
    paths: bookmarks.map((bookmark) => ({
      params: {
        slug: formatSlug(bookmark),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const bookmarks = await getAllFilesFrontMatter('bookmarks')
  const bookmark = await getFileBySlug('bookmarks', params.slug)

  return {props: {bookmarks, bookmark}}
}
