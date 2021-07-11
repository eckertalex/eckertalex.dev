import {
  VStack,
  HStack,
  Heading,
  Text,
  List,
  ListItem,
  VisuallyHidden,
  Grid,
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import tinytime from 'tinytime'
import {Link} from 'components/link'
import {PostLinkTag} from 'features/blog/tag'
import {FrontMatter} from 'lib/mdx'

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export function PostList({posts}: {posts: FrontMatter[]}) {
  return (
    <List marginTop={4} spacing={4}>
      {!posts.length ? <ListItem>No posts found.</ListItem> : null}
      {posts.map((frontMatter) => {
        const {slug, date, title, summary, tags} = frontMatter
        return (
          <ListItem key={slug}>
            <Grid as="article" gap={{base: 2, xl: 0}} templateColumns={{md: 'repeat(4, 1fr)'}}>
              <dl>
                <VisuallyHidden as="dt">Published on</VisuallyHidden>
                <Text as="dd" fontSize="base" fontWeight="bold" color={mode('gray.500', 'gray.500')}>
                  <time dateTime={date}>{postDateTemplate.render(new Date(date))}</time>
                </Text>
              </dl>
              <GridItem colSpan={3} as={VStack} alignItems="start" spacing={4}>
                <div>
                  <Heading as="h3" fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                    <Link color={mode('gray.900', 'gray.100')} href={`/blog/${slug}`}>
                      {title}
                    </Link>
                  </Heading>
                  <HStack spacing={3}>
                    {tags.map((tag) => (
                      <PostLinkTag key={tag} tag={tag} />
                    ))}
                  </HStack>
                </div>
                <Text color={mode('gray.500', 'gray.400')} maxWidth="none">
                  {summary}
                </Text>
              </GridItem>
            </Grid>
          </ListItem>
        )
      })}
    </List>
  )
}
