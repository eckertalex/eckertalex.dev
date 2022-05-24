import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../components/mdx-components'
import {allOtherPages, OtherPage} from '../.contentlayer/generated'
import {DefaultLayout} from '../layout/default-layout'

export default function Credits({page}: {page: OtherPage}) {
  const Component = useMDXComponent(page.body.code)

  return (
    <DefaultLayout
      title={page.title}
      description="These credits are for all the projects and people that have inspired or helped me with my website."
    >
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const credits = allOtherPages.find((page) => page.slug === 'credits')!

  return {props: {page: credits}}
}
