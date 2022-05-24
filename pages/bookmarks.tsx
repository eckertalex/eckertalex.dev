import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../components/mdx-components'
import {allOtherPages, OtherPage} from '../.contentlayer/generated'
import {DefaultLayout} from '../layout/default-layout'

export default function Bookmarks({page}: {page: OtherPage}) {
  const Component = useMDXComponent(page.body.code)

  return (
    <DefaultLayout
      title={page.title}
      description="I keep track of all the blog posts I have read since mid of 2020."
    >
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const bookmarks = allOtherPages.find((page) => page.slug === 'bookmarks')!

  return {props: {page: bookmarks}}
}
