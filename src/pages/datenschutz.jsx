import {Divider, VStack, useColorModeValue as mode} from '@chakra-ui/react'
import {getFileBySlug} from 'lib/mdx'
import metadata from 'metadata'
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from 'features/mdx/mdx-components'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function Datenschutz({datenschutz}) {
  const {mdxSource, frontMatter} = datenschutz

  return (
    <VStack alignItems="start" spacing={4}>
      <PageSeo title={`${frontMatter.title} - ${metadata.author}`} url={`${metadata.siteUrl}/datenschutz`} />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <VStack alignItems="start" spacing={2}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </VStack>
    </VStack>
  )
}

export async function getStaticProps() {
  const datenschutz = await getFileBySlug('datenschutz')

  return {props: {datenschutz}}
}
