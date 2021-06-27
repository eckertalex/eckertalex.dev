import {MDXRemote} from 'next-mdx-remote'
import {getFileBySlug} from '@/lib/mdx'
import {MDXComponents} from '@/components/mdx-components'
import {Divider, VStack, useColorModeValue as mode} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export default function Page({bookmarks}) {
  const {mdxSource, frontMatter} = bookmarks

  return (
    <VStack alignItems="start" spacing={4}>
      <PageSeo title={`${frontMatter.title} - ${siteMetadata.author}`} url={`${siteMetadata.siteUrl}/bookmarks`} />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <VStack alignItems="start" spacing={2}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </VStack>
    </VStack>
  )
}

export async function getStaticProps() {
  const bookmarks = await getFileBySlug('bookmarks')

  return {props: {bookmarks}}
}
