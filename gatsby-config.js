module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `eckertalex.dev`,
    // Default title of the page
    siteTitleAlt: `eckertalex.dev - A blog by Alexander Eckert`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://eckertalex.dev`,
    // Used for SEO
    siteDescription: `Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@eckertalex_`,
    // Links displayed in the header on the right side
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Links`,
            slug: `/links`,
          },
          {
            title: `Uses`,
            slug: `/uses`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/eckertalex_`,
          },
          {
            name: `GitHub`,
            url: `https://github.com/eckertalex/`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/eckertalex/`,
          },
        ],
        feedTitle: `eckertalex.dev`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `eckertalex.dev - A blog by Alexander Eckert`,
        short_name: `eckertalex.dev`,
        description: `Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
