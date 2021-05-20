import {Divider, Text, VStack, HStack, Icon, useColorModeValue as mode} from '@chakra-ui/react'
import {getAllFilesFrontMatter, getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {PostList} from '@/components/post-list'
import {CustomLink} from '@/components/link'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {MDXComponents} from '@/components/mdx-components'
import {MDXRemote} from 'next-mdx-remote'
import {ArrowRight as ArrowRightIcon} from 'lucide-react'

const MAX_DISPLAY = 3

export default function Home({posts, projects, hero}) {
  const {mdxSource: projectsMdxSource, frontMatter: projectsFrontMatter} = projects
  const {mdxSource: heroMdxSource, frontMatter: heroFrontMatter} = hero

  return (
    <VStack alignItems="start" spacing={4}>
      <PageSeo
        description={siteMetadata.description}
        title={`${siteMetadata.author} - ${siteMetadata.description}`}
        url={siteMetadata.siteUrl}
      />
      <PageTitle as="h1">{heroFrontMatter.title}</PageTitle>
      <MDXRemote {...heroMdxSource} components={MDXComponents} />
      <VStack alignItems="start" spacing={4}>
        <PageTitle as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
          Latest Posts
        </PageTitle>
        <Text fontSize="lg" color={mode('gray.500', 'gray.400')}>
          {siteMetadata.description}
        </Text>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <PostList posts={posts.slice(0, MAX_DISPLAY)} />
      </VStack>
      {posts.length > MAX_DISPLAY ? (
        <HStack width="full" justifyContent="end" fontSize="base" fontWeight="medium">
          <CustomLink aria-label="all posts" color="accent.400" href="/blog">
            All Posts
          </CustomLink>
          <Icon as={ArrowRightIcon} color="accent.400" height={4} width={4} />
        </HStack>
      ) : null}
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <PageTitle as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
        {projectsFrontMatter.title}
      </PageTitle>
      <MDXRemote {...projectsMdxSource} components={MDXComponents} />
    </VStack>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog'),
    projects = await getFileBySlug('projects'),
    hero = await getFileBySlug('hero')

  return {props: {posts, projects, hero}}
}
