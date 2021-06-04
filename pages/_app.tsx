import {MDXProvider} from '@mdx-js/react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {DefaultSeo} from 'next-seo'
import {AppProps} from 'next/app'
import Head from 'next/head'
import splitbee from '@splitbee/web'
import {SEO} from '@/components/seo'
import {LayoutWrapper} from '@/components/layout-wrapper'
import {MDXComponents} from '@/components/mdx-components'
import {PrismGlobal} from '@/components/prism-gloabal'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  colors: {
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
})

splitbee.init({
  disableCookie: true,
  scriptUrl: '/bee.js',
  apiUrl: '/_hive',
})

export default function App(props: AppProps) {
  const {Component, pageProps} = props

  return (
    <ChakraProvider theme={theme}>
      <PrismGlobal />
      <MDXProvider
        // @ts-ignore
        components={MDXComponents}
      >
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </MDXProvider>
    </ChakraProvider>
  )
}
