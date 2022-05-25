/* eslint-disable @next/next/no-img-element */
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import {ColorModeScript} from '@chakra-ui/react'
import {theme, colorModeStorageKey} from '../lib/theme'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/ibm-plex-sans-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta content="#1F2937" name="theme-color" />
          <meta content="#1F2937" name="msapplication-TileColor" />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            color="#5bbad5"
            href="/static/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <link href="/index.xml" rel="alternate" type="application/rss+xml" />
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />
        </Head>
        <body>
          <ColorModeScript
            storageKey={colorModeStorageKey}
            initialColorMode={theme.config.initialColorMode}
          />
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID && (
              <>
                <script
                  id="chiffre:analytics"
                  src="https://chiffre.io/analytics.js"
                  data-chiffre-project-id={
                    process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID
                  }
                  data-chiffre-public-key={
                    process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY
                  }
                  crossOrigin="anonymous"
                  async
                ></script>
                <noscript>
                  <img
                    src={`https://chiffre.io/noscript/${process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID}`}
                    alt="Chiffre.io anonymous visit counting for clients without JavaScript"
                    crossOrigin="anonymous"
                  />
                </noscript>
              </>
            )}
        </body>
      </Html>
    )
  }
}
