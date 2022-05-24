import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../components/mdx-components'
import {allOtherPages, OtherPage} from '../.contentlayer/generated'
import {DefaultLayout} from '../layout/default-layout'

export default function Datenschutz({page}: {page: OtherPage}) {
  const Component = useMDXComponent(page.body.code)

  return (
    <DefaultLayout
      title={page.title}
      description="Datenschutzbestimmungen für meine Webseite."
    >
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const datenschutz = allOtherPages.find((page) => page.slug === 'datenschutz')!

  return {props: {page: datenschutz}}
}
