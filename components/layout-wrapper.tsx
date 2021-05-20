import {Container, Flex, HStack, Heading, useColorModeValue as mode} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata.json'
import {headerNavLinks} from '@/data/headerNavLinks'
import {CustomLink} from '@/components/link'
import {Footer} from '@/components/footer'
import {MobileNav} from '@/components/mobile-nav'
import {ColorModeSwitcher} from '@/components/color-mode-switcher'
import {AccentPicker} from '@/components/accent-picker'

function LayoutWrapper(props: React.PropsWithChildren<unknown>) {
  const {children} = props

  return (
    <Container maxW="container.lg" flexDirection="column" justifyContent="space-between" height="100vh">
      <Flex as="header" alignItems="center" justifyContent="space-between" paddingY={10}>
        <CustomLink _hover={{textDecoration: 'none'}} href="/">
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
              {siteMetadata.author}
            </Heading>
          </HStack>
        </CustomLink>
        <HStack spacing={6} lineHeight="5">
          <HStack spacing={6} display={{base: 'none', md: 'block'}}>
            {headerNavLinks.map((link) => (
              <CustomLink
                padding={1}
                fontWeight="medium"
                color={mode('gray.700', 'gray.300')}
                href={link.href}
                key={link.title}
              >
                {link.title}
              </CustomLink>
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

export {LayoutWrapper}
