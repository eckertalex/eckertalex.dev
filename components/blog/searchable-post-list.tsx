import {useState} from 'react'
import {
  InputGroup,
  Input,
  InputRightElement,
  VStack,
  Icon,
  Flex,
  HStack,
} from '@chakra-ui/react'
import {Search as SearchIcon, Rss as RssIcon} from 'lucide-react'
import {PageTitle} from '../../components/page-title'
import {PostList} from './post-list'
import {BlogPost} from '../../.contentlayer/generated'
import {Link} from '../../components/link'

function SearchablePostList({
  posts,
  title,
}: {
  posts: Pick<BlogPost, 'slug' | 'title' | 'summary'>[]
  title: string
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <VStack alignItems="start" spacing={4} marginBottom={8}>
        <Flex justifyContent="space-between" width="full">
          <PageTitle>{title}</PageTitle>
          <HStack>
            <Icon as={RssIcon} color="orange.500" />
            <Link href="/feed.xml">RSS</Link>
          </HStack>
        </Flex>
        <InputGroup maxWidth="lg">
          <Input
            placeholder="Search articles"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <InputRightElement>
            <Icon as={SearchIcon} boxSize={4} color="gray.500" />
          </InputRightElement>
        </InputGroup>
      </VStack>
      <PostList posts={filteredBlogPosts} />
    </>
  )
}

export {SearchablePostList}
