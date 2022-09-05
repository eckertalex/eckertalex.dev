import {HStack, VStack, Text, useColorModeValue as mode} from '@chakra-ui/react'
import {Link} from '../../components/link'
import {SocialIcons} from '../../components/social-icons'
import {NowPlaying} from '../../components/spotify/now-playing'

export function Footer() {
  return (
    <VStack
      as="footer"
      spacing={4}
      justifyContent="center"
      marginTop={16}
      paddingBottom={8}
    >
      <div>
        <NowPlaying />
      </div>
      <HStack spacing={8}>
        <SocialIcons href="https://github.com/eckertalex" kind="github" />
        <SocialIcons href="https://twitter.com/eckertalex_" kind="twitter" />
        <SocialIcons
          href="https://www.linkedin.com/in/eckertalex/"
          kind="linkedin"
        />
        <SocialIcons href="mailto:me@eckertalex.dev" kind="mail" />
      </HStack>
      <HStack spacing={{base: 8, md: 32}} alignItems="start">
        <VStack alignItems="start">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/reading">Reading</Link>
        </VStack>
        <VStack alignItems="start">
          <Link href="https://timeline.eckertalex.dev/">Timeline</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/bookmarks">Bookmarks</Link>
          <Link href="/calc">Calculators</Link>
        </VStack>
        <VStack alignItems="start">
          <Link href="/uses">Uses</Link>
          <Link href="/uses/vscode">VSCode</Link>
          <Link href="/uses/terminal">Terminal</Link>
          <Link href="/uses/git">Git</Link>
          <Link href="/uses/keyboard">Keyboard</Link>
        </VStack>
      </HStack>
      <HStack spacing={2} color={mode('gray.500', 'gray.400')} fontSize="small">
        <Link href="/">Alexander Eckert</Link>
        <Text>{` • `}</Text>
        <Text>{`© ${new Date().getFullYear()}`}</Text>
      </HStack>{' '}
      <HStack spacing={2} color={mode('gray.500', 'gray.400')} fontSize="small">
        <Link href="/impressum">Impressum</Link>
        <Text>{` • `}</Text>
        <Link href="/datenschutz">Datenschutz</Link>
        <Text>{` • `}</Text>
        <Link href="/credits">Credits</Link>
      </HStack>
    </VStack>
  )
}
