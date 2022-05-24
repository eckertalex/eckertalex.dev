import {
  Heading,
  Text,
  List,
  ListItem,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Link} from '../link'
import {BlogPost} from '../../.contentlayer/generated'

export function PostList({
  posts,
}: {
  posts: Pick<BlogPost, 'slug' | 'title' | 'summary' | 'publishedAt'>[]
}) {
  return (
    <List marginTop={4} spacing={8}>
      {!posts.length ? <ListItem>No posts found.</ListItem> : null}
      {posts.map((post) => {
        return (
          <ListItem key={post.slug}>
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="tight"
            >
              <Link
                color={mode('gray.900', 'gray.100')}
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </Link>
            </Heading>
            <Text color={mode('gray.500', 'gray.400')} maxWidth="none">
              {post.summary}
            </Text>
          </ListItem>
        )
      })}
    </List>
  )
}
