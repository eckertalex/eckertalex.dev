import React from 'react'
import {InputGroup, Input, InputRightElement, VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {Search as SearchIcon} from 'lucide-react'
import {PageTitle} from 'layout/page-title'
import {PostList} from 'features/blog/post-list'

function SearchablePostList({posts, title}) {
  const [searchValue, setSearchValue] = React.useState('')
  const filteredBlogPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <VStack alignItems="start" spacing={4} marginBottom={8}>
        <PageTitle as="h1">{title}</PageTitle>
        <InputGroup maxWidth="lg">
          <Input placeholder="Search posts" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </VStack>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <PostList posts={filteredBlogPosts} />
    </>
  )
}

export {SearchablePostList}
