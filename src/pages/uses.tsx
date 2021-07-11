import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {getFileBySlug, MDXPage} from 'lib/mdx'
import metadata from 'metadata'
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from 'features/mdx/mdx-components'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function Uses({uses}: {uses: MDXPage}) {
  const {mdxSource, frontMatter} = uses

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="All the hardware and software I am using."
        title={`${frontMatter.title} - ${metadata.author}`}
        url={`${metadata.siteUrl}/uses`}
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
