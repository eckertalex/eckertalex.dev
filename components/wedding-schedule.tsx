import React from 'react'
import NextLink from 'next/link'
import spacetime from 'spacetime'

import Heading from 'components/heading'
/* -------------------------------------------------------------------------- */

const schedule = [
  {
    time: 'August 13, 2020 09:30:00',
    title: 'Cassidy getting ready in Pilgerzell',
    description: "Alex's sister Sarah will do Cassidy's hair and makeup with the help of Nga, Cassidy's Maid of Honor.",
  },
  {
    time: 'August 13, 2020 11:25:00',
    title: 'Cassidy leaves for the Residence in a 1965 Chevrolet Impala',
    description:
      "Alex's sister's boyfriend, Niklas, will drive Cassidy in his '65 Chevrolet to the City Residence of Fulda.",
    infoQuery: 'impala',
  },
  {
    time: 'August 13, 2020 11:50:00',
    title: 'Guests welcome Cassidy at the Residence',
    infoQuery: 'residence',
  },
  {
    time: 'August 13, 2020 12:00:00',
    title: 'Marriage at Residence Chapel',
    description:
      "We are allowed to record the important part of the ceremony and even do a livestream/video chat with Cassidy's Family",
    infoQuery: 'residence-chapel',
  },
  {
    time: 'August 13, 2020 12:30:00',
    title: 'Wedding Pictures in the Residence Garden',
    infoQuery: 'residence-garden',
  },
  {
    time: 'August 13, 2020 13:15:00',
    title: 'Wedding Pictures at the Cathedral',
    infoQuery: 'cathedral',
  },
  {
    time: 'August 13, 2020 13:30:00',
    title: 'Leaving for Oberweißenbrunn',
  },
  {
    time: 'August 13, 2020 14:00:00',
    title: 'Stopover/Pictures at the Wasserkuppe',
    infoQuery: 'wasserkuppe',
  },
  {
    time: 'August 13, 2020 15:00:00',
    title: 'Arrival in Oberweißenbrunn',
  },
  {
    time: 'August 13, 2020 15:15:00',
    title: 'Wedding Toast',
  },
  {
    time: 'August 13, 2020 15:45:00',
    title: 'Coffee and Cake in the Garden',
  },
  {
    time: 'August 13, 2020 17:00:00',
    title: 'Preparing BBQ',
  },
  {
    time: 'August 13, 2020 18:30:00',
    title: 'Dinner in the Garden',
    description:
      'We will have BBQ, Burgers, Pasta Salad, Salad, Baguette, and French Cheese. There will be plenty of wine, all kinds of beer, and later some schnaps.',
  },
  {
    time: 'August 13, 2020 20:00:00',
    title: 'Drinks and Relax',
    description: "Some of Alex's co-workers will come and share a beer or two.",
  },
]

export default function WeddingSchedule() {
  return (
    <>
      <Heading as="h1" className="font-serif" query="schedule">
        Schedule
      </Heading>
      {schedule.map((ev) => {
        const date = spacetime(ev.time, 'Europe/Berlin')

        return (
          <div key={ev.time}>
            <div className="flex flex-row mb-4">
              <div className="w-1/4 sm:w-1/6 xl:w-1/12 text-xl text-gray-900 dark:text-white">
                {date.format('{hour-24-pad}:{minute-pad}')}
              </div>
              <div className="max-w-xs sm:max-w-md md:max-w-xl">
                <div className="text-xl text-pink-500">
                  {ev.title}
                  {ev.infoQuery ? (
                    <NextLink href={`#${ev.infoQuery}`}>
                      <a> ⤷ More Info</a>
                    </NextLink>
                  ) : null}
                </div>
                {ev.description ? (
                  <div className="text-xl text-gray-600 dark:text-gray-500">{ev.description}</div>
                ) : null}
                <div className="text-gray-600 dark:text-gray-500">
                  <span>AK: {date.goto('America/Anchorage').format('{day-short} {time}')} | </span>
                  <span>AL: {date.goto('America/Chicago').format('{day-short} {time}')} | </span>
                  <span>AZ: {date.goto('America/Phoenix').format('{day-short} {time}')} | </span>
                  <span>UT: {date.goto('America/Denver').format('{day-short} {time}')}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
