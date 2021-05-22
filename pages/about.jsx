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
import {getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {MDXRemote} from 'next-mdx-remote'
import {SocialIcons} from '@/components/social-icons'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {MDXComponents} from '@/components/mdx-components'

export default function About({about}) {
  const {mdxSource, frontMatter} = about

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description={`${frontMatter.title} - ${siteMetadata.author}`}
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <Grid templateColumns={{md: 'repeat(3, 1fr)'}}>
        <VStack spacing={2} marginTop={8}>
          <Image borderRadius="full" boxSize={48} alt="Alexander Eckert" src={siteMetadata.image} />
          <Heading as="h3" fontSize="2xl" fontWeight="bold" letterSpacing="tight">
            {siteMetadata.author}
          </Heading>
          <Text color={mode('gray.500', 'gray.400')}>Senior Software Engineer</Text>
          <Text color={mode('gray.500', 'gray.400')}>LogMeIn Germany GmbH</Text>
          <HStack spacing={3} paddingTop={4}>
            <SocialIcons href={siteMetadata.twitter} kind="twitter" />
            <SocialIcons href={siteMetadata.github} kind="github" />
            <SocialIcons href={siteMetadata.keybase} kind="keybase" />
            <SocialIcons href={siteMetadata.linkedin} kind="linkedin" />
            <SocialIcons href={`mailto:${siteMetadata.email}`} kind="mail" />
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
