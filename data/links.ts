export type LinkItem = {
  title: string
  url: string
  author: string
  dateAdded: string
  tags: string[]
}

export type Links = {
  blogs: LinkItem[]
  papers: LinkItem[]
  books: LinkItem[]
  onlineCourses: LinkItem[]
  podcasts: LinkItem[]
}

const links: Links = {
  blogs: [
    {
      title: 'fettblog.eu',
      url: 'https://fettblog.eu/',
      author: 'Stefan Baumgartner',
      dateAdded: 'July 1, 2020',
      tags: ['typescript'],
    },
    {
      title: 'mariusschulz.com',
      url: 'https://mariusschulz.com/',
      author: 'Marius Schulz',
      dateAdded: 'July 1, 2020',
      tags: ['typescript'],
    },
    {
      title: 'Overreacted.io',
      url: 'https://overreacted.io',
      author: 'Dan Abramov',
      dateAdded: 'June 1, 2020',
      tags: ['javascript', 'react'],
    },
    {
      title: 'kentcdodds.com',
      url: 'https://kentcdodds.com/',
      author: 'Kent C. Dodds',
      dateAdded: 'June 1, 2020',
      tags: ['react', 'testing', 'javascript'],
    },
    {
      title: 'jrsinclair.com',
      url: 'https://jrsinclair.com/',
      author: 'James Sinclair',
      dateAdded: 'June 1, 2020',
      tags: ['javascript', 'functional programming'],
    },
    {
      title: 'blog.isquaredsoftware.com',
      url: 'https://blog.isquaredsoftware.com/',
      author: 'Mark Erikson',
      dateAdded: 'June 1, 2020',
      tags: ['react', 'redux'],
    },
    {
      title: 'joshwcomeau.com',
      url: 'https://joshwcomeau.com/',
      author: 'Josh Comeau',
      dateAdded: 'June 1, 2020',
      tags: ['react', 'gatsby'],
    },
  ],
  papers: [
    {
      title: 'JavaScript: The First 20 Years',
      url: 'https://doi.org/10.1145/3386327',
      author: 'Allen Wirfs-Brock and Brendan Eich',
      dateAdded: 'July 1, 2020',
      tags: ['javascript'],
    },
  ],
  books: [
    {
      title: 'JavaScript Allongé',
      url: 'https://leanpub.com/javascriptallongesix/read',
      author: 'Reg Braithwaite',
      dateAdded: 'June 1, 2020',
      tags: ['javascript'],
    },
    {
      title: "Professor Frisby's Mostly Adequate Guide to Functional Programming",
      url: 'https://github.com/MostlyAdequate/mostly-adequate-guide',
      author: 'Brian Lonsdorf',
      dateAdded: 'June 1, 2020',
      tags: ['javascript', 'functional programming'],
    },
    {
      title: 'Eloquent JavaScript',
      url: 'https://eloquentjavascript.net/',
      author: 'Martijn Haverbeke',
      dateAdded: 'June 1, 2020',
      tags: ['javascript'],
    },
    {
      title: 'Just JavaScript',
      url: 'https://justjavascript.com/',
      author: 'Dan Abramov',
      dateAdded: 'June 1, 2020',
      tags: ['javascript'],
    },
  ],
  onlineCourses: [
    {
      title: 'Command Line Power User',
      url: 'https://commandlinepoweruser.com/',
      author: 'Wes Bos',
      dateAdded: 'June 1, 2020',
      tags: ['terminal'],
    },
    {
      title: 'CSS Grid',
      url: 'https://cssgrid.io/',
      author: 'Wes Bos',
      dateAdded: 'June 1, 2020',
      tags: ['css'],
    },
    {
      title: 'What the Flexbox?!',
      url: 'https://flexbox.io/',
      author: 'Wes Bos',
      dateAdded: 'June 1, 2020',
      tags: ['css'],
    },
    {
      title: 'JavaScript 30',
      url: 'https://javascript30.com/',
      author: 'Wes Bos',
      dateAdded: 'June 1, 2020',
      tags: ['javascript'],
    },
    {
      title: 'Testing JavaScript',
      url: 'https://testingjavascript.com/',
      author: 'Kent C. Dodds',
      dateAdded: 'June 1, 2020',
      tags: ['javascript', 'testing'],
    },
    {
      title: "The Beginner's Guide to React",
      url: 'https://egghead.io/courses/the-beginner-s-guide-to-react',
      author: 'Kent C. Dodds',
      dateAdded: 'June 1, 2020',
      tags: ['react'],
    },
    {
      title: 'Epic React',
      url: 'https://epicreact.dev/',
      author: 'Kent C. Dodds',
      dateAdded: 'June 1, 2020',
      tags: ['react'],
    },
    {
      title: 'Fullstack Advanced React & GraphQL',
      url: 'https://advancedreact.com/',
      author: 'Wes Bos',
      dateAdded: 'June 1, 2020',
      tags: ['react', 'graphql'],
    },
  ],
  podcasts: [
    {
      title: 'Syntax - Tasty Web Development Treats',
      url: 'https://syntax.fm/',
      author: 'Wes Bos and Scott Tolinksi',
      dateAdded: 'June 1, 2020',
      tags: ['react', 'javascript', 'web development'],
    },
    {
      title: 'React Podcast',
      url: 'https://reactpodcast.simplecast.com/',
      author: 'Michael Chan aka Chantastic',
      dateAdded: 'June 1, 2020',
      tags: ['react'],
    },
    {
      title: 'Developer Tea',
      url: 'https://spec.fm/podcasts/developer-tea',
      author: 'Spec.fm hosted by Jonathan Cutrell',
      dateAdded: 'June 1, 2020',
      tags: ['programming'],
    },
  ],
}

export default links
