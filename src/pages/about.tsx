import {GetStaticProps} from 'next'
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
import {getFileBySlug, MDXPage} from 'lib/mdx'
import metadata from 'metadata'
import {MDXRemote} from 'next-mdx-remote'
import {SocialIcons} from 'components/social-icons'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'
import {MDXComponents} from 'features/mdx/mdx-components'

export default function About({about}: {about: MDXPage}) {
  const {mdxSource, frontMatter} = about

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo title={`${frontMatter.title} - ${metadata.author}`} url={`${metadata.siteUrl}/about`} />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <Grid templateColumns={{md: 'repeat(3, 1fr)'}}>
        <VStack spacing={2} marginTop={8}>
          <Image borderRadius="full" boxSize={48} alt={metadata.author} src={metadata.image} />
          <Heading as="h3" fontSize="2xl" fontWeight="bold" letterSpacing="tight">
            {metadata.author}
          </Heading>
          <Text color={mode('gray.500', 'gray.400')}>Senior Software Engineer</Text>
          <Text color={mode('gray.500', 'gray.400')}>LogMeIn Germany GmbH</Text>
          <HStack spacing={3} paddingTop={4}>
            <SocialIcons href={metadata.twitter} kind="twitter" />
            <SocialIcons href={metadata.github} kind="github" />
            <SocialIcons href={metadata.keybase} kind="keybase" />
            <SocialIcons href={metadata.linkedin} kind="linkedin" />
            <SocialIcons href={`mailto:${metadata.email}`} kind="mail" />
          </HStack>
        </VStack>
        <GridItem colSpan={2} as={VStack} alignItems="start" spacing={2}>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </GridItem>
      </Grid>
    </VStack>
  )
}

export async function getStaticProps() {
  const about = await getFileBySlug('about')

  return {props: {about}}
}
