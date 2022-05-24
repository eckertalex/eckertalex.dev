import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../../components/mdx-components'
import {allUses} from '../../.contentlayer/generated'
import {DefaultLayout} from '../../layout/default-layout'

export default function Uses({uses}) {
  const Component = useMDXComponent(uses.body.code)

  return (
    <DefaultLayout title="Uses">
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export function getStaticProps() {
  const uses = allUses.find((page) => page.slug === 'uses')

  return {props: {uses}}
}
