import Link from 'next/link'
import {
  Button,
  Flex,
  Heading,
  Text,
  Box,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {NavLayout} from '../layout/nav-layout'

export default function FourZeroFour() {
  return (
    <NavLayout title="404 | Alexander Eckert">
      <Flex
        flexDirection={{base: 'column', md: 'row'}}
        alignItems={{base: 'start', md: 'center'}}
        justifyContent={{base: 'start', md: 'center'}}
        marginTop={{md: 24}}
      >
        <Flex paddingTop={6} paddingBottom={8} paddingRight={8}>
          <Heading
            as="h1"
            fontSize={{base: '6xl', md: '8xl'}}
            fontWeight="extrabold"
            lineHeight="10"
            letterSpacing="tight"
            color={mode('gray.900', 'gray.100')}
            borderRight={{md: '2px'}}
            paddingX={{md: 6}}
          >
            404
          </Heading>
        </Flex>
        <Box maxWidth="md">
          <Text
            marginBottom={4}
            fontWeight="bold"
            fontSize={{base: 'xl', md: '2xl'}}
            lineHeight="base"
          >
            Sorry we couldn&apos;t find this page.
          </Text>
          <Text marginBottom={8}>
            But dont worry, you can find plenty of other things on our homepage.
          </Text>
          <Button
            display="inline"
            paddingX={4}
            paddingY={2}
            fontSize="small"
            fontWeight="medium"
            lineHeight="5"
            color="white"
            bgGradient="linear(to-tr, purple.500, accent.500)"
            _hover={{
              bgGradient: 'linear(to-tr, purple.400, accent.400)',
            }}
          >
            <Link href="/">Back to homepage</Link>
          </Button>
        </Box>
      </Flex>
    </NavLayout>
  )
}
