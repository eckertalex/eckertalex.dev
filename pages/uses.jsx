import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from '@/components/mdx-components'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export default function Uses({uses}) {
  const {mdxSource, frontMatter} = uses

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description={`${frontMatter.title} - ${siteMetadata.author}`}
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/uses`}
      />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <VStack alignItems="start" spacing={2}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </VStack>
    </VStack>
  )
}

export async function getStaticProps() {
  const uses = await getFileBySlug('uses')

  return {props: {uses}}
}
