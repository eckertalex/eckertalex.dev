import siteMetadata from '@/data/siteMetadata'
import {kebabCase} from '@/lib/utils'
import {getAllTags} from '@/lib/tags'
import {Tag} from '@/components/tag'
import {CustomLink} from '@/components/link'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export default function Tags({tags}) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSeo
        description="Things I blog about"
        title={`Tags - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/tags`}
      />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <PageTitle>Tags</PageTitle>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div className="m-2" key={t}>
                <Tag text={t} />
                <CustomLink
                  className="mx-1 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  href={`/tags/${kebabCase(t)}`}
                >
                  {` (${tags[t]})`}
                </CustomLink>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return {props: {tags}}
}
