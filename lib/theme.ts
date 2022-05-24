import {extendTheme} from '@chakra-ui/react'

export const colorModeStorageKey = '__eckertalex_color_mode__'
export const theme = extendTheme((theme) => ({
  ...theme,
  config: {
    ...theme.config,
    initialColorMode: 'dark',
  },
  fonts: {
    ...theme.fonts,
    heading: `"IBM Plex Sans", ${theme.fonts.heading}`,
    body: `"IBM Plex Sans", ${theme.fonts.body}`,
    mono: `"JetBrains Mono", ${theme.fonts.mono}`,
  },
  colors: {
    ...theme.colors,
    accent: {
      50: '#FFF5F7',
      100: '#FED7E2',
      200: '#FBB6CE',
      300: '#F687B3',
      400: '#ED64A6',
      500: '#D53F8C',
      600: '#B83280',
      700: '#97266D',
      800: '#702459',
      900: '#521B41',
    },
  },
}))
