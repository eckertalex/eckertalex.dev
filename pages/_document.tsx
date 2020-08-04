import React from 'react'
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
/* -------------------------------------------------------------------------- */

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="canonical" href="https://eckertalex.dev" />
          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta content="/static/favicons/browserconfig.xml" name="msapplication-config" />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var storageKey = 'darkMode';
                  var classNameDark = 'dark-mode';
                  var classNameLight = 'light-mode';

                  function setClassOnDocumentBody(darkMode) {
                    document.body.classList.add(darkMode ? classNameDark : classNameLight);
                    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
                  }

                  var preferDarkQuery = '(prefers-color-scheme: dark)';
                  var mql = window.matchMedia(preferDarkQuery);
                  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
                  var localStorageTheme = null;
                  try {
                    localStorageTheme = localStorage.getItem(storageKey);
                  } catch (err) {}
                  var localStorageExists = localStorageTheme !== null;
                  if (localStorageExists) {
                    localStorageTheme = JSON.parse(localStorageTheme);
                  }

                  if (localStorageExists) {
                    setClassOnDocumentBody(localStorageTheme);
                  } else if (supportsColorSchemeQuery) {
                    setClassOnDocumentBody(mql.matches);
                    localStorage.setItem(storageKey, mql.matches);
                  } else {
                    var isDarkMode = document.body.classList.contains(classNameDark);
                    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
                  }
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
