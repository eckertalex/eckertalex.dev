import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Divider,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import {useMDXComponent} from 'next-contentlayer/hooks'
import {SocialIcons} from '../components/social-icons'
import {PageTitle} from '../components/page-title'
import {MDXComponents} from '../components/mdx-components'
import {allOtherPages, OtherPage} from '../.contentlayer/generated'
import {NavLayout} from '../layout/nav-layout'

export default function About({about}: {about: OtherPage}) {
  const Component = useMDXComponent(about.body.code)

  return (
    <NavLayout title={`${about.title} | | Alexander Eckert`}>
      <VStack alignItems="start" spacing={8}>
        <PageTitle>{about.title}</PageTitle>
        <Divider borderColor={mode('gray.700', 'gray.200')} />
        <Grid templateColumns={{md: 'repeat(3, 1fr)'}}>
          <VStack spacing={2} marginTop={8}>
            <Image
              borderRadius="full"
              boxSize={48}
              alt="Alexander Eckert"
              src="/static/img/portrait.jpg"
            />
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="tight"
            >
              Alexander Eckert
            </Heading>
            <Text color={mode('gray.500', 'gray.400')}>
              Senior Software Engineer
            </Text>
            <Text color={mode('gray.500', 'gray.400')}>
              GoTo Technologies Germany GmbH
            </Text>
            <HStack spacing={3} paddingTop={4}>
              <SocialIcons href="https://github.com/eckertalex" kind="github" />
              <SocialIcons
                href="https://keybase.io/eckertalex"
                kind="keybase"
              />
              <SocialIcons
                href="https://www.linkedin.com/in/eckertalex/"
                kind="linkedin"
              />
              <SocialIcons href="mailto:me@eckertalex.dev" kind="mail" />
            </HStack>
          </VStack>
          <GridItem colSpan={2} as={VStack} alignItems="start" spacing={2}>
            <Component components={MDXComponents} />
          </GridItem>
        </Grid>
      </VStack>
    </NavLayout>
  )
}

export async function getStaticProps() {
  const about = allOtherPages.find((page) => page.slug === 'about')!

  return {props: {about}}
}
