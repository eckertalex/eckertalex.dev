import '../styles/global.css'
import '../styles/prism.css'

import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App(props: AppProps) {
	const { Component, pageProps } = props

	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
