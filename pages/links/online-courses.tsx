import React from 'react'
import {NextSeo} from 'next-seo'

import Container from 'layouts/container'
import dataLinks, {LinkItem} from 'data/links'
import {sortLinksByDateAdded} from 'utils/utils'
/* -------------------------------------------------------------------------- */

type OnlineCoursesProps = {
  onlineCourses: LinkItem[]
}

export default function OnlineCourses(props: OnlineCoursesProps) {
  const {onlineCourses} = props

  const url = 'https://eckertalex.dev/links/online-courses'

  return (
    <>
      <NextSeo
        title="Links: Online Courses"
        canonical={url}
        openGraph={{url, title: 'Links: Online Courses | eckertalex.dev'}}
      />
      <Container>
        <h1>Links: Online Courses</h1>
        {onlineCourses.map((onlineCourse) => (
          <p key={onlineCourse.url}>
            <strong>
              <a href={onlineCourse.url}>{onlineCourse.title}</a>
            </strong>{' '}
            by <strong>{onlineCourse.author}</strong>
          </p>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const onlineCourses = sortLinksByDateAdded(dataLinks).filter((link) => link.category === 'online-course')

  return {
    props: {
      onlineCourses,
    },
  }
}
