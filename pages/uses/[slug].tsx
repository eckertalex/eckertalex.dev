import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from '../../components/mdx-components'
import {allUses} from '../../.contentlayer/generated'
import {DefaultLayout} from '../../layout/default-layout'

export default function Uses({page}) {
  const Component = useMDXComponent(page.body.code)

  return (
    <DefaultLayout title={page.title}>
      <Component components={MDXComponents} />
    </DefaultLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allUses
      .filter((post) => post.slug !== 'uses')
      .map((p) => ({params: {slug: p.slug}})),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const page = allUses
    .filter((post) => post.slug !== 'uses')
    .find((post) => post.slug === params.slug)

  return {props: {page}}
}
