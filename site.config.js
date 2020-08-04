/**
 * @type import('@types').Config
 */

const config = {
  meta: {
    title: 'eckertalex.dev',
    copyright: 'Alexander Eckert © 2017 - 2020',
  },
  seo: {
    description: 'Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.',
    canonical: 'https://eckertalex.dev',
    titleTemplate: '%s | eckertalex.dev',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://eckertalex.dev',
      title: 'eckertalex.dev',
      description: 'Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.',
      images: [
        {
          url: 'https://eckertalex.dev/static/img/og.png',
          alt: 'eckertalex.dev',
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      handle: '@eckertalex_',
      site: '@eckertalex_',
      cardType: 'summary_large_image',
    },
  },
  navigation: [
    {
      title: 'Blog',
      slug: '/blog',
    },
    {
      title: 'Reading List',
      slug: '/reading',
    },
    {
      title: 'Uses',
      slug: '/uses',
    },
    {
      title: 'About',
      slug: '/about',
    },
  ],
  externalLinks: [
    {
      name: 'Twitter',
      url: 'https://twitter.com/eckertalex_/',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/eckertalex/',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/eckertalex/',
    },
  ],
  projects: [
    {
      name: 'platform.react',
      url: 'https://github.com/eckertalex/platform.react',
      tags: ['React', 'JavaScript', 'TypeScript'],
    },
    {
      name: 'Borealis Theme',
      url: 'https://github.com/eckertalex/borealis-theme',
      tags: ['Theme'],
    },
    {
      name: 'Onionman',
      url: 'https://github.com/eckertalex/onionman',
      tags: ['Archived', 'JavaScript', 'Phaser'],
    },
    {
      name: 'Training Tracker',
      url: 'https://github.com/eckertalex/training_tracker',
      tags: ['Archived', 'Python', 'Django'],
    },
    {
      name: 'Real Snow - Unity Demo',
      url: 'https://github.com/eckertalex/real_snow',
      tags: ['Archived', 'C#', 'Unity3D'],
    },
    {
      name: 'Raytracer in C++',
      url: 'https://github.com/eckertalex/raytracer',
      tags: ['Archived', 'C++'],
    },
    {
      name: 'Battleship Game in C++',
      url: 'https://github.com/eckertalex/battleship372',
      tags: ['Archived', 'C++'],
    },
    {
      name: 'Music Player Game in C++',
      url: 'https://github.com/eckertalex/musicplayer372',
      tags: ['Archived', 'C++'],
    },
  ],
}

module.exports = config
