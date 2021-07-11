import {Divider, Text, VStack, HStack, Icon, useColorModeValue as mode} from '@chakra-ui/react'
import {getAllBlogPostsFrontMatter, getFileBySlug, FrontMatter, MDXPage} from 'lib/mdx'
import {PostList} from 'features/blog/post-list'
import {Link} from 'components/link'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {MDXComponents} from 'features/mdx/mdx-components'
import {MDXRemote} from 'next-mdx-remote'
import {ArrowRight as ArrowRightIcon} from 'lucide-react'
import metadata from 'metadata'

const MAX_DISPLAY = 3

export default function Home({posts, projects, hero}: {posts: FrontMatter[]; projects: MDXPage; hero: MDXPage}) {
  const {mdxSource: projectsMdxSource, frontMatter: projectsFrontMatter} = projects
  const {mdxSource: heroMdxSource, frontMatter: heroFrontMatter} = hero

  return (
    <VStack alignItems="start" spacing={4}>
      <PageSeo title={metadata.author} url={metadata.siteUrl} />
      <PageTitle as="h1">{heroFrontMatter.title}</PageTitle>
      <MDXRemote {...heroMdxSource} components={MDXComponents} />
      <VStack alignItems="start" spacing={4}>
        <PageTitle as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
          Latest Posts
        </PageTitle>
        <Text fontSize="lg" color={mode('gray.500', 'gray.400')}>
          {metadata.description}
        </Text>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <PostList posts={posts.slice(0, MAX_DISPLAY)} />
      </VStack>
      {posts.length > MAX_DISPLAY ? (
        <HStack width="full" justifyContent="end" fontSize="base" fontWeight="medium">
          <Link aria-label="all posts" color="accent.400" href="/blog">
            All Posts
          </Link>
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
  const posts = await getAllBlogPostsFrontMatter()
  const projects = await getFileBySlug('projects')
  const hero = await getFileBySlug('hero')

  return {props: {posts, projects, hero}}
}
