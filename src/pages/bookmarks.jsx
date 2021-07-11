import {MDXRemote} from 'next-mdx-remote'
import {getFileBySlug} from 'lib/mdx'
import {MDXComponents} from 'features/mdx/mdx-components'
import {Divider, VStack, useColorModeValue as mode} from '@chakra-ui/react'
import metadata from 'metadata'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function Page({bookmarks}) {
  const {mdxSource, frontMatter} = bookmarks

  return (
    <VStack alignItems="start" spacing={4}>
      <PageSeo title={`${frontMatter.title} - ${metadata.author}`} url={`${metadata.siteUrl}/bookmarks`} />
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
