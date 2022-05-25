import {ChakraProvider, createLocalStorageManager} from '@chakra-ui/react'
import {AppProps} from 'next/app'
import {PrismGlobal} from '../components/prism-global'
import {theme, colorModeStorageKey} from '../lib/theme'

const manager = createLocalStorageManager(colorModeStorageKey)

export default function App(props: AppProps) {
  const {Component, pageProps} = props

  return (
    <ChakraProvider theme={theme} colorModeManager={manager}>
      <PrismGlobal />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
