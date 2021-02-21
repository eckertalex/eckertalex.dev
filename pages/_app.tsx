import '@/styles/tailwind.css'

import {MDXProvider} from '@mdx-js/react'
import {ThemeProvider} from 'next-themes'
import {DefaultSeo} from 'next-seo'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {SEO} from '@/components/seo'
import {LayoutWrapper} from '@/components/layout-wrapper'
import {MDXComponents} from '@/components/mdx-components'

export default function App(props: AppProps) {
  const {Component, pageProps} = props

  return (
    <ThemeProvider attribute="class">
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
    </ThemeProvider>
  )
}
