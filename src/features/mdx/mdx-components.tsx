import React from 'react'
import Image from 'next/image'
import {
  Box,
  Heading,
  Divider,
  Text,
  Table,
  Td,
  Tr,
  UnorderedList,
  OrderedList,
  ListItem,
  Code as CuiCode,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {Link} from 'components/link'
import {Tag} from 'features/blog/tag'
import {Code} from 'features/mdx/code'

const MDXComponents = {
  a: A,
  blockquote: BlockQuote,
  code: Code,
  i: I,
  u: U,
  abbr: Abbr,
  cite: Cite,
  del: Del,
  em: Em,
  ins: Ins,
  kbd: Kbd,
  mark: Mark,
  s: S,
  samp: Samp,
  sub: Sub,
  sup: Sup,
  strong: Strong,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: Hr,
  inlineCode: InlineCode,
  ol: Ol,
  ul: Ul,
  li: Li,
  p: P,
  pre: Pre,
  table: Table,
  td: Td,
  tr: Tr,
  Image,
  Tag,
}

function A({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Link color="accent.400" {...rest}>
      {children}
    </Link>
  )
}

function P({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text marginTop="1.25rem !important" {...rest}>
      {children}
    </Text>
  )
}

function Pre({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Box as="pre" width="full" maxWidth="full" margin={0} padding={0} {...rest}>
      {children}
    </Box>
  )
}

function Strong({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="strong" {...rest}>
      {children}
    </Text>
  )
}

function I({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="i" {...rest}>
      {children}
    </Text>
  )
}

function U({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="u" {...rest}>
      {children}
    </Text>
  )
}

function Abbr({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="abbr" {...rest}>
      {children}
    </Text>
  )
}

function Cite({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="cite" {...rest}>
      {children}
    </Text>
  )
}

function Del({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="del" {...rest}>
      {children}
    </Text>
  )
}

function Em({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="em" {...rest}>
      {children}
    </Text>
  )
}

function Ins({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="ins" {...rest}>
      {children}
    </Text>
  )
}

function Kbd({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="kbd" {...rest}>
      {children}
    </Text>
  )
}

function Mark({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="mark" {...rest}>
      {children}
    </Text>
  )
}

function S({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="s" {...rest}>
      {children}
    </Text>
  )
}

function Samp({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="samp" {...rest}>
      {children}
    </Text>
  )
}

function Sub({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="sub" {...rest}>
      {children}
    </Text>
  )
}

function Sup({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text as="sup" {...rest}>
      {children}
    </Text>
  )
}

function Hr() {
  return <Divider borderColor={mode('gray.700', 'gray.200')} />
}

function useGenericHeadingColor() {
  return mode('gray.900', 'gray.100')
}

function H1({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h1"
      marginTop="3.5rem !important"
      fontSize={{base: '3xl', sm: '4xl', md: '5xl'}}
      fontWeight="extrabold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function H2({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h2"
      marginTop="3rem !important"
      fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}
      fontWeight="bold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function H3({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h3"
      marginTop="2.5rem !important"
      fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}
      fontWeight="bold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function H4({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h4"
      marginTop="2rem !important"
      fontSize={{base: 'lg', sm: 'xl', md: '2xl'}}
      fontWeight="bold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function H5({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h5"
      marginTop="1.5rem !important"
      fontSize={{base: 'md', sm: 'lg', md: 'xl'}}
      fontWeight="bold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function H6({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h6"
      fontSize={{base: 'sm', sm: 'md', md: 'lg'}}
      fontWeight="bold"
      letterSpacing="tight"
      color={useGenericHeadingColor()}
      {...rest}
    >
      {children}
    </Heading>
  )
}

function BlockQuote({children, ...rest}: {children: React.ReactNode}) {
  return (
    <Text
      as="blockquote"
      fontWeight="medium"
      fontStyle="italic"
      color={mode('gray.900', 'gray.100')}
      borderLeftWidth="thick"
      borderLeftColor={mode('accent.200', 'accent.700')}
      paddingLeft={6}
      marginTop="1.25rem !important"
      sx={{
        'p:first-of-type': {
          margin: '0 !important',
        },
        'p:first-of-type::before': {
          content: 'open-quote',
        },
        'p:last-of-type::after': {
          content: 'close-quote',
        },
      }}
      {...rest}
    >
      {children}
    </Text>
  )
}

function Ol({children, ...rest}: {children: React.ReactNode}) {
  return (
    <OrderedList spacing={4} marginTop={4} {...rest}>
      {children}
    </OrderedList>
  )
}

function Ul({children, ...rest}: {children: React.ReactNode}) {
  return (
    <UnorderedList spacing={4} marginTop={4} {...rest}>
      {children}
    </UnorderedList>
  )
}

function Li({children, ...rest}: {children: React.ReactNode}) {
  return (
    <ListItem marginLeft={6} {...rest}>
      {children}
    </ListItem>
  )
}

function InlineCode({children, ...rest}: {children: React.ReactNode}) {
  return (
    <CuiCode colorScheme="accent" {...rest}>
      {children}
    </CuiCode>
  )
}

export {MDXComponents}
