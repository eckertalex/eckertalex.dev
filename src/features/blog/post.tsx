import React from 'react'
import {
  Stack,
  VStack,
  HStack,
  Image,
  Divider,
  VisuallyHidden,
  Heading,
  Text,
  Box,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Container} from '@chakra-ui/react'
import dayjs from 'dayjs'
import {Link} from 'components/link'
import {PageTitle} from 'layout/page-title'
import {PostSeo} from 'features/seo/seo'
import {PostLinkTag} from 'features/blog/tag'
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  CornerDownRight as CornerDownRightIcon,
} from 'lucide-react'
import metadata from 'metadata'
import {FrontMatter} from 'lib/mdx'

const editUrl = (fileName: string) => `${metadata.siteRepo}/blob/dev/data/blog/${fileName}`
const discussUrl = (slug: string | null) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${metadata.siteUrl}/blog/${slug}`)}`

export function Post({
  children,
  frontMatter,
  next,
  prev,
}: {
  children: React.ReactNode
  frontMatter: FrontMatter
  next: FrontMatter
  prev: FrontMatter
}) {
  const {slug, fileName, date, title, tags} = frontMatter

  return (
    <Container maxW="container.lg">
      <PostSeo url={`${metadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <VStack as="header" marginY={6}>
          <dl>
            <VisuallyHidden as="dt">Published on</VisuallyHidden>
            <dd>
              <Text as="time" fontSize="base" fontWeight="medium" color={mode('gray.500', 'gray.400')} dateTime={date}>
                {dayjs(date).format('dddd, MMMM DD, YYYY')}
              </Text>
            </dd>
          </dl>
          <PageTitle as="h1">{title}</PageTitle>
          <dl>
            <VisuallyHidden as="dt">Author</VisuallyHidden>
            <HStack as="dd">
              <Image alt={metadata.author} boxSize={10} borderRadius="full" src={metadata.image} />
              <Box as="dl" fontSize="small" fontWeight="medium">
                <VisuallyHidden as="dt">Name</VisuallyHidden>
                <Box as="dd" color={mode('gray.900', 'gray.100')}>
                  {metadata.author}
                </Box>
                <VisuallyHidden as="dt">Twitter</VisuallyHidden>
                <dd>
                  <Link color="accent.400" href={metadata.twitter}>
                    {metadata.twitterHandle}
                  </Link>
                </dd>
              </Box>
            </HStack>
          </dl>
        </VStack>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <VStack alignItems="start" spacing={2} paddingY={8}>
          {children}
        </VStack>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <Text color={mode('gray.700', 'gray.300')} paddingY={4}>
          <Link href={discussUrl(slug)}>Discuss on Twitter</Link>
          {` • `}
          <Link href={editUrl(fileName)}>View on GitHub</Link>
        </Text>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <VStack as="footer" spacing={4} alignItems="start" fontSize="small" fontWeight="medium" paddingY={4}>
          {tags.length ? (
            <>
              <Heading
                as="h2"
                fontSize="x-small"
                letterSpacing="wide"
                color={mode('gray.500', 'gray.400')}
                textTransform="uppercase"
              >
                Tags
              </Heading>
              <HStack spacing={3}>
                {tags.map((tag) => (
                  <PostLinkTag key={tag} tag={tag} />
                ))}
              </HStack>
            </>
          ) : null}
          {next || prev ? (
            <Stack flexDirection={{base: 'column', md: 'row'}} justifyContent="space-between" width="full">
              {prev ? (
                <HStack>
                  <Icon as={ArrowLeftIcon} height={4} width={4} />
                  <div>
                    <Text
                      fontSize="x-small"
                      letterSpacing="wide"
                      textTransform="uppercase"
                      color={mode('gray.500', 'gray.400')}
                    >
                      Previous Article
                    </Text>
                    <Link color="accent.400" href={`/blog/${prev.slug}`}>
                      {prev.title}
                    </Link>
                  </div>
                </HStack>
              ) : (
                <div />
              )}
              {next ? (
                <HStack justifyContent="end">
                  <div>
                    <Text
                      textAlign="right"
                      fontSize="x-small"
                      letterSpacing="wide"
                      textTransform="uppercase"
                      color={mode('gray.500', 'gray.400')}
                    >
                      Next Article
                    </Text>
                    <Link color="accent.400" textAlign="right" href={`/blog/${next.slug}`}>
                      {next.title}
                    </Link>
                  </div>
                  <Icon as={ArrowRightIcon} height={4} width={4} />
                </HStack>
              ) : (
                <div />
              )}
            </Stack>
          ) : null}
          <HStack justifyContent="center" width="full">
            <Icon as={CornerDownRightIcon} height={4} width={4} />
            <Link color="accent.400" fontSize="small" fontWeight="medium" href="/blog">
              Back to the blog
            </Link>
          </HStack>
        </VStack>
      </article>
    </Container>
  )
}
