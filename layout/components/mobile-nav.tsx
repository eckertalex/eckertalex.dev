import {
  Box,
  IconButton,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {X as XIcon, Menu as MenuIcon} from 'lucide-react'
import {useState} from 'react'
import {Link} from '../../components/link'

export function MobileNav({
  navLinks,
}: {
  navLinks: {title: string; href: string}[]
}) {
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
          {navLinks.map((link) => (
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
