import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import Filters from 'components/filters'
import blogPosts, {BlogPost} from 'data/blog-posts'
import {groupBy, getCountOccurrences} from 'utils/utils'
import Heading from 'components/heading'
/* -------------------------------------------------------------------------- */

type BlogPostsProps = {
  posts: {
    date: string
    posts: BlogPost[]
  }[]
  postCount: number
  dates: {
    name: string
    count: number
  }[]
  authors: {
    name: string
    count: number
  }[]
  tags: {
    name: string
    count: number
  }[]
  postSeries: {
    name: string
    count: number
  }[]
}

export default function BlogPosts(props: BlogPostsProps) {
  const {posts, postCount, dates, authors, tags, postSeries} = props
  const [date, setDate] = React.useState<string | null>(null)
  const [author, setAuthor] = React.useState<string | null>(null)
  const [tag, setTag] = React.useState<string | null>(null)
  const [currSeries, setSeries] = React.useState<string | null>(null)

  const filteredPosts = React.useMemo(
    () =>
      posts.map((month) => ({
        date: month.date,
        posts: month.posts
          .filter((post) => (date === null ? true : post.dateAdded === date))
          .filter((post) => (author === null ? true : post.author === author))
          .filter((post) => post.tags.some((t) => (tag === null ? true : tag === t)))
          .filter((post) => (currSeries === null ? true : post.series === currSeries)),
      })),
    [posts, date, author, tag, currSeries]
  )

  const url = 'https://eckertalex.dev/links/blog-posts'

  return (
    <>
      <NextSeo
        title="Links: Blog Posts"
        canonical={url}
        openGraph={{url, title: 'Links: Blog Posts | eckertalex.dev'}}
      />
      <Container>
        <h1>Links: Blog Posts</h1>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded"
            onClick={() => {
              setDate(null)
              setAuthor(null)
              setTag(null)
              setSeries(null)
            }}
          >
            Clear Filters
          </button>
        </div>
        <Heading as="h4" query="date-filter">
          Filter by Date
        </Heading>
        <Filters
          filters={dates}
          currentFilter={date ?? ''}
          setFilter={(d) => {
            if (d === date) {
              setDate(null)
            } else {
              setDate(d)
            }
          }}
        />
        <Heading as="h4" query="author-filter">
          Filter by Author
        </Heading>
        <Filters
          filters={authors}
          currentFilter={author ?? ''}
          setFilter={(a) => {
            if (a === author) {
              setAuthor(null)
            } else {
              setAuthor(a)
            }
          }}
        />
        <Heading as="h4" query="tag-filter">
          Filter by Tag
        </Heading>
        <Filters
          filters={tags}
          currentFilter={tag ?? ''}
          setFilter={(t) => {
            if (t === tag) {
              setTag(null)
            } else {
              setTag(t)
            }
          }}
        />
        <Heading as="h4" query="series-filter">
          Filter by Blog Series
        </Heading>
        <Filters
          filters={postSeries}
          currentFilter={currSeries ?? ''}
          setFilter={(s) => {
            if (s === currSeries) {
              setSeries(null)
            } else {
              setSeries(s)
            }
          }}
        />
        <p className="font-bold">
          Found <strong>{postCount}</strong> Results!
        </p>
        {filteredPosts.map((month) =>
          month.posts.length === 0 ? null : (
            <React.Fragment key={month.date}>
              <Heading as="h4" query={month.date}>
                {month.date}
              </Heading>
              {month.posts.map((post) => (
                <p key={post.url}>
                  <strong>
                    <a href={post.url}>{post.title}</a>
                  </strong>{' '}
                  by <strong>{post.author}</strong>
                </p>
              ))}
            </React.Fragment>
          )
        )}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const postCount = blogPosts.length
  const posts = Object.entries(groupBy('dateAdded', blogPosts)).map((month) => ({
    date: month[0],
    posts: month[1],
  }))

  const allDates = blogPosts.flatMap((post) => post.dateAdded)
  const dates = getCountOccurrences(allDates)

  const allAuthors = blogPosts.map((post) => post.author).sort()
  const authors = getCountOccurrences(allAuthors)

  const allTags = blogPosts.flatMap((post) => post.tags).sort()
  const tags = getCountOccurrences(allTags)

  const allPostSeries = blogPosts
    .map((post) => post.series ?? '')
    .filter((series) => series !== '')
    .sort()
  const postSeries = getCountOccurrences(allPostSeries)

  return {
    props: {
      posts,
      postCount,
      dates,
      authors,
      tags,
      postSeries,
    },
  }
}
