import {PropsWithChildren} from 'react'
import {NavLayout} from './nav-layout'
import {
  VStack,
  HStack,
  Stack,
  Image,
  Divider,
  VisuallyHidden,
  Text,
  Heading,
  useColorModeValue as mode,
  Container,
} from '@chakra-ui/react'
import {format, parseISO} from 'date-fns'
import {Link} from '../components/link'
import {BlogPost} from '../.contentlayer/generated'
import {ViewCounter} from '../components/blog/view-counter'

const editUrl = (slug) =>
  `https://github.com/eckertalex/eckertalex.dev/edit/dev/data/blog/${slug}.mdx`

export function BlogPostLayout({
  children,
  post,
}: PropsWithChildren<{post: BlogPost}>) {
  return (
    <NavLayout
      title={`${post.title} | Alexander Eckert`}
      description={post.summary}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <Container maxW="container.lg">
        <article>
          <VStack as="header" marginY={6}>
            <Heading
              as="h1"
              fontSize={{base: '3xl', sm: '4xl', md: '5xl'}}
              fontWeight="extrabold"
              letterSpacing="tight"
              color={mode('gray.900', 'gray.100')}
            >
              {post.title}
            </Heading>
            <Stack
              as="dl"
              direction={{base: 'column', sm: 'row'}}
              justifyContent="space-between"
              width="full"
            >
              <HStack>
                <VisuallyHidden as="dt">Author</VisuallyHidden>
                <HStack as="dd">
                  <Image
                    alt="Alexander Eckert"
                    boxSize={6}
                    borderRadius="full"
                    src="/static/img/portrait.jpg"
                  />
                  <dl>
                    <VisuallyHidden as="dt">Name</VisuallyHidden>
                    <Text
                      as="dd"
                      fontSize="sm"
                      color={mode('gray.900', 'gray.100')}
                    >
                      Alexander Eckert
                    </Text>
                  </dl>
                </HStack>
                <Text>/</Text>
                <VisuallyHidden as="dt">Published on</VisuallyHidden>
                <dd>
                  <Text
                    as="time"
                    fontSize="sm"
                    color={mode('gray.900', 'gray.100')}
                    dateTime={post.publishedAt}
                  >
                    {format(parseISO(post.publishedAt), 'EEEE, MMMM dd, y')}
                  </Text>
                </dd>
              </HStack>
              <HStack>
                <VisuallyHidden as="dt">Reading Time</VisuallyHidden>
                <Text
                  as="dd"
                  fontSize="sm"
                  color={mode('gray.700', 'gray.300')}
                >
                  {post.readingTime.text}
                </Text>
                <Text>/</Text>
                <VisuallyHidden as="dt">Views</VisuallyHidden>
                <ViewCounter slug={post.slug} />
              </HStack>
            </Stack>
          </VStack>
          <Divider borderColor={mode('gray.700', 'gray.200')} />
          <VStack alignItems="start" spacing={2} paddingY={8}>
            {children}
          </VStack>
          <Divider borderColor={mode('gray.700', 'gray.200')} />
          <HStack
            as="footer"
            justifyContent="end"
            fontSize="small"
            fontWeight="medium"
          >
            <Text color={mode('gray.700', 'gray.300')} paddingTop={4}>
              <Link href={editUrl(post.slug)}>Edit on GitHub</Link>
            </Text>
          </HStack>
        </article>
      </Container>
    </NavLayout>
  )
}
