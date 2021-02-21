import {useState} from 'react'
import tinytime from 'tinytime'
import {CustomLink} from '@/components/link'
import {Tag} from '@/components/tag'
import {PageTitle} from '@/components/page-title'

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export function PostList({posts, title}) {
  const [searchValue, setSearchValue] = useState(''),
    filteredBlogPosts = posts.filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    )

  return (
    <div className="divide-y">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>{title}</PageTitle>
        <div className="relative max-w-lg">
          <input
            aria-label="Search posts"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-gray-100"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search posts"
            type="text"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
      <ul>
        {!filteredBlogPosts.length && 'No posts found.'}
        {filteredBlogPosts.map((frontMatter) => {
          const {slug, date, title, summary, tags} = frontMatter
          return (
            <li className="py-4" key={slug}>
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{postDateTemplate.render(new Date(date))}</time>
                  </dd>
                </dl>
                <div className="space-y-3 xl:col-span-3">
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">
                      <CustomLink className="text-gray-900 dark:text-gray-100" href={`/blog/${slug}`}>
                        {title}
                      </CustomLink>
                    </h3>
                    <div className="space-x-3">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose text-gray-500 max-w-none dark:text-gray-400">{summary}</div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
