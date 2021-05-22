import Document, {Head, Html, Main, NextScript, DocumentContext} from 'next/document'
import {ColorModeScript} from '@chakra-ui/react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="#1F2937" name="theme-color" />
          <meta content="#1F2937" name="msapplication-TileColor" />
          <meta content="/static/favicons/browserconfig.xml" name="msapplication-config" />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="76x76" />
          <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link color="#5bbad5" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/index.xml" rel="alternate" type="application/rss+xml" />
          <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono" rel="stylesheet" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
