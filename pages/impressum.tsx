import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../components/mdx-components'
import {allOtherPages, OtherPage} from '../.contentlayer/generated'
import {DefaultLayout} from '../layout/default-layout'

export default function Impressum({page}: {page: OtherPage}) {
  const Component = useMDXComponent(page.body.code)

  return (
    <DefaultLayout title={page.title} description="Impressum meiner Webseite.">
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const impressum = allOtherPages.find((page) => page.slug === 'impressum')!

  return {props: {page: impressum}}
}
