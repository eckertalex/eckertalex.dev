import {
  Stack,
  VStack,
  HStack,
  Image,
  Divider,
  VisuallyHidden,
  Heading,
  Text,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Container} from '@chakra-ui/react'
import tinytime from 'tinytime'
import {CustomLink} from '@/components/link'
import {PageTitle} from '@/components/page-title'
import {BlogSeo} from '@/components/seo'
import {PostLinkTag} from '@/components/tag'
import siteMetadata from '@/data/siteMetadata'
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  CornerDownRight as CornerDownRightIcon,
} from 'lucide-react'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`,
  discussUrl = (slug) =>
    `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`,
  postDateTemplate = tinytime('{dddd}, {MMMM} {DD}, {YYYY}')

export function Post({children, frontMatter, next, prev}) {
  const {slug, fileName, date, title, tags} = frontMatter

  return (
    <Container maxW="container.lg">
      <BlogSeo url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <VStack as="header" marginY={6}>
          <dl>
            <VisuallyHidden as="dt">Published on</VisuallyHidden>
            <dd>
              <Text as="time" fontSize="base" fontWeight="medium" color={mode('gray.500', 'gray.400')} dateTime={date}>
                {postDateTemplate.render(new Date(date))}
              </Text>
            </dd>
          </dl>
          <PageTitle as="h1">{title}</PageTitle>
          <dl>
            <VisuallyHidden as="dt">Author</VisuallyHidden>
            <HStack as="dd">
              <Image alt="Alexander Eckert" boxSize={10} borderRadius="full" src={siteMetadata.image} />
              <dl fontSize="small" fontWeight="medium">
                <VisuallyHidden as="dt">Name</VisuallyHidden>
                <dd color={mode('gray.900', 'gray.100')}>{siteMetadata.author}</dd>
                <VisuallyHidden as="dt">Twitter</VisuallyHidden>
                <dd>
                  <CustomLink color="accent.400" href={siteMetadata.twitter}>
                    {siteMetadata.twitter.replace('https://twitter.com/', '@')}
                  </CustomLink>
                </dd>
              </dl>
            </HStack>
          </dl>
        </VStack>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <VStack alignItems="start" spacing={2} paddingY={8}>
          {children}
        </VStack>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <Text color={mode('gray.700', 'gray.300')} paddingY={4}>
          <CustomLink href={discussUrl(slug)}>Discuss on Twitter</CustomLink>
          {` • `}
          <CustomLink href={editUrl(fileName)}>View on GitHub</CustomLink>
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
                    <CustomLink color="accent.400" href={`/blog/${prev.slug}`}>
                      {prev.title}
                    </CustomLink>
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
                    <CustomLink color="accent.400" textAlign="right" href={`/blog/${next.slug}`}>
                      {next.title}
                    </CustomLink>
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
            <CustomLink color="accent.400" fontSize="small" fontWeight="medium" href="/blog">
              Back to the blog
            </CustomLink>
          </HStack>
        </VStack>
      </article>
    </Container>
  )
}
