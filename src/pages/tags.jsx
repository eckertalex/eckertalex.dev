import React from 'react'
import {SimpleGrid} from '@chakra-ui/react'
import metadata from 'metadata'
import {getAllTags} from 'lib/tags'
import {PostLinkTag} from 'features/blog/tag'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function Tags({tags}) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSeo
        description="Things I blog about."
        title={`Tags - ${metadata.author}`}
        url={`${metadata.siteUrl}/tags`}
      />
      <PageTitle as="h1">Tags</PageTitle>
      <SimpleGrid columns={{sm: 2, md: 4, xl: 6}} spacing={2} marginTop={4}>
        {!sortedTags ? 'No tags found.' : null}
        {sortedTags.map((t) => (
          <div key={t}>
            <PostLinkTag tag={t} />
            {` (${tags[t]})`}
          </div>
        ))}
      </SimpleGrid>
    </>
  )
}

export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return {props: {tags}}
}
