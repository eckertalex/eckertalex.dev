import {
  Divider,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {PostList} from '../components/blog/post-list'
import {Link} from '../components/link'
import {useMDXComponent} from 'next-contentlayer/hooks'
import {PageTitle} from '../components/page-title'
import {MDXComponents} from '../components/mdx-components'
import {pick} from '../lib/utils'
import {ArrowRight as ArrowRightIcon} from 'lucide-react'
import {
  allBlogPosts,
  allOtherPages,
  BlogPost,
  OtherPage,
} from '../.contentlayer/generated'
import {NavLayout} from '../layout/nav-layout'

const MAX_DISPLAY = 3

export default function Home({
  posts,
  projects,
  hero,
}: {
  posts: BlogPost[]
  projects: OtherPage
  hero: OtherPage
}) {
  const HeroComponent = useMDXComponent(hero.body.code)
  const ProjectsComponent = useMDXComponent(projects.body.code)

  return (
    <NavLayout>
      <VStack alignItems="start" spacing={4}>
        <PageTitle>{hero.title}</PageTitle>
        <HeroComponent components={MDXComponents} />
        <VStack alignItems="start" spacing={4}>
          <PageTitle as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
            Latest Posts
          </PageTitle>
          <Text fontSize="lg" color={mode('gray.500', 'gray.400')}>
            Personal blog by Alexander Eckert. I write about React, JavaScript,
            and TypeScript.
          </Text>
          <Divider borderColor={mode('gray.700', 'gray.200')} />
          <PostList posts={posts.slice(0, MAX_DISPLAY)} />
        </VStack>
        {posts.length > MAX_DISPLAY ? (
          <HStack
            width="full"
            justifyContent="end"
            fontSize="base"
            fontWeight="medium"
          >
            <Link aria-label="all posts" color="accent.400" href="/blog">
              All Posts
            </Link>
            <Icon as={ArrowRightIcon} color="accent.400" height={4} width={4} />
          </HStack>
        ) : null}
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <PageTitle as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
          {projects.title}
        </PageTitle>
        <ProjectsComponent components={MDXComponents} />
      </VStack>
    </NavLayout>
  )
}

export async function getStaticProps() {
  const posts = allBlogPosts
    .map((post) => pick(['slug', 'title', 'summary', 'publishedAt'], post))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
  const projects = allOtherPages.find((page) => page.slug === 'projects')!
  const hero = allOtherPages.find((page) => page.slug === 'hero')!

  return {props: {posts, projects, hero}}
}
