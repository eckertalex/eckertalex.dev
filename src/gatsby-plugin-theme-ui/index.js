import baseTheme from '@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index'

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: `#1132ff`,
    modes: {
      dark: {
        ...baseTheme.colors.modes.dark,
        primary: `#ffde11`,
      },
    },
  },
}

export default theme
