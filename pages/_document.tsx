import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="preconnect"
						href="/fonts/ibm-plex-sans-var.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preconnect"
						href="/fonts/JetBrainsMono-Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<meta
						content="#1F2937"
						media="(prefers-color-scheme: dark)"
						name="theme-color"
					/>
					<meta
						content="#ffffff"
						media="(prefers-color-scheme: light)"
						name="theme-color"
					/>
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
					<link href="/feed.xml" rel="alternate" type="application/rss+xml" />
					<meta
						content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
						name="robots"
					/>
				</Head>
				<body className="bg-white dark:bg-black text-white dark:text-black">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
