import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {getFileBySlug} from 'lib/mdx'
import metadata from 'metadata'
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from 'features/mdx/mdx-components'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function VSCode({vscode}) {
  const {mdxSource, frontMatter} = vscode

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description="My Visual Studio Code configuration."
        title={`${frontMatter.title} - ${metadata.author}`}
        url={`${metadata.siteUrl}/vscode`}
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
  const vscode = await getFileBySlug('vscode')

  return {props: {vscode}}
}
