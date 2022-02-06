import {useState} from 'react'
import {Menu as MenuIcon, X as XIcon} from 'lucide-react'
import {
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Box,
  Text,
  IconButton,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Link} from 'components/link'
import {ColorModeSwitcher} from 'features/preferences/color-mode-switcher'
import {AccentPicker} from 'features/preferences/accent-picker'
import {SocialIcons} from 'components/social-icons'
import {NowPlaying} from 'features/spotify/now-playing'
import metadata from 'metadata'

const headerNavLinks = [
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Reading',
    href: '/reading',
  },
  {
    title: 'Uses',
    href: '/uses',
  },
  {
    title: 'About',
    href: '/about',
  },
]

function MobileNav() {
  const [navShow, setNavShow] = useState(false)
  function onToggleNav() {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <Box display={{md: 'none'}}>
      <IconButton
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        type="button"
        icon={navShow ? <XIcon /> : <MenuIcon />}
        height={8}
        width={8}
      />
      <Box
        position="fixed"
        width="full"
        height="full"
        top="24"
        right="0"
        backgroundColor={mode('gray.200', 'gray.800')}
        opacity={0.95}
        zIndex={10}
        transform={`translateX(${
          navShow ? '0' : '100%'
        }) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)`}
        transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        transitionDuration="300ms"
      >
        <Box
          as="button"
          aria-label="toggle modal"
          position="fixed"
          width="full"
          height="full"
          cursor="auto"
          _focus={{
            outline: 'none',
          }}
          onClick={onToggleNav}
          type="button"
        />
        <Box as="nav" position="fixed" height="full" marginTop={8}>
          {headerNavLinks.map((link) => (
            <Box key={link.title} paddingX={12} paddingY={4}>
              <Text
                as={Link}
                href={link.href}
                onClick={onToggleNav}
                fontSize="2xl"
                fontWeight="bold"
                letterSpacing="widest"
                color={mode('gray.900', 'gray.100')}
              >
                {link.title}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function Footer() {
  return (
    <VStack as="footer" spacing={4} justifyContent="center" marginTop={16} paddingBottom={8}>
      <div>
        <NowPlaying />
      </div>
      <HStack spacing={8}>
        <SocialIcons href={metadata.github} kind="github" />
        <SocialIcons href={metadata.keybase} kind="keybase" />
        <SocialIcons href={metadata.linkedin} kind="linkedin" />
        <SocialIcons href={`mailto:${metadata.email}`} kind="mail" />
      </HStack>
      <HStack spacing={{base: 8, md: 32}} alignItems="start">
        <VStack alignItems="start">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/reading">Reading</Link>
        </VStack>
        <VStack alignItems="start">
          <Link href="/timeline">Timeline</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/bookmarks">Bookmarks</Link>
          <Link href="/calc">Calculators</Link>
        </VStack>
        <VStack alignItems="start">
          <Link href="/uses">Uses</Link>
          <Link href="/vscode">VSCode</Link>
          <Link href="/terminal">Terminal</Link>
          <Link href="/git">Git</Link>
          <Link href="/keyboard">Keyboard</Link>
        </VStack>
      </HStack>
      <HStack spacing={2} color={mode('gray.500', 'gray.400')} fontSize="small">
        <Link href="/">{metadata.author}</Link>
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

function Layout(props: {children: React.ReactNode}) {
  const {children} = props

  return (
    <Container maxW="container.lg" flexDirection="column" justifyContent="space-between" height="100vh">
      <Flex as="header" alignItems="center" justifyContent="space-between" paddingY={10}>
        <Link _hover={{textDecoration: 'none'}} href="/">
          <HStack alignItems="center" justifyContent="space-between">
            <Heading
              as="h1"
              fontSize="xl"
              fontStyle="italic"
              color="pink.400"
              background={mode('gray.800', 'white')}
              padding={2}
              rounded="sm"
            >
              AE
            </Heading>
            <Heading
              as="h1"
              fontSize="4xl"
              fontWeight="bold"
              color="accent.400"
              whiteSpace="nowrap"
              display={{base: 'none', lg: 'unset'}}
            >
              {metadata.author}
            </Heading>
          </HStack>
        </Link>
        <HStack spacing={6} lineHeight="5">
          <HStack spacing={6} display={{base: 'none', md: 'block'}}>
            {headerNavLinks.map((link) => (
              <Link
                padding={1}
                fontWeight="medium"
                color={mode('gray.700', 'gray.300')}
                href={link.href}
                key={link.title}
              >
                {link.title}
              </Link>
            ))}
          </HStack>
          <AccentPicker />
          <ColorModeSwitcher />
          <MobileNav />
        </HStack>
      </Flex>
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export {Layout}
