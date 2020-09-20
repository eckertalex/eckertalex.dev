const defaultTheme = require('tailwindcss/defaultTheme')
/* -------------------------------------------------------------------------- */

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.+(js|jsx|ts|tsx)', './pages/**/*.+(js|jsx|ts|tsx)', './layouts/**/*.+(js|jsx|ts|tsx)'],
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        yellow: 'var(--color-yellow)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Parisienne', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrainsMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
    textColor: ['responsive', 'hover', 'focus', 'dark'],
    borderColor: ['responsive', 'hover', 'focus', 'dark'],
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    ({addBase}) => {
      addBase([
        {
          '@font-face': {
            fontFamily: 'JetBrainsMono',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/static/fonts/JetBrainsMono-Regular.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'JetBrainsMono',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/static/fonts/JetBrainsMono-Italic.woff2?3.13") format("woff2")',
          },
        },
      ])
    },
  ],
}
