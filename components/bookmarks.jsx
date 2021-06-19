import Link from 'next/link'
import {VStack, IconButton, Button, ButtonGroup, useMediaQuery} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export function Bookmarks({children, frontMatter, bookmarks}) {
  const {title, emoji, slug} = frontMatter
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo
        description={siteMetadata.description}
        title={`${emoji} ${title} - Bookmarks`}
        url={`${siteMetadata.siteUrl}/bookmarks/${slug}`}
      />
      <PageTitle as="h1">
        {emoji} {title} - Bookmarks
      </PageTitle>
      <ButtonGroup isAttached variant="outline">
        {bookmarks.map((group) => (
          <Link key={group.title} href={`/bookmarks/${group.slug}`} passHref>
            {isLargerThan1024 ? (
              <Button as="a" isActive={group.slug === slug} size="lg" leftIcon={group.emoji}>
                {group.title}
              </Button>
            ) : (
              <IconButton as="a" isActive={group.slug === slug} size="lg" icon={<>{group.emoji}</>}>
                {group.title}
              </IconButton>
            )}
          </Link>
        ))}
      </ButtonGroup>
      <VStack alignItems="start" spacing={2}>
        {children}
      </VStack>
    </VStack>
  )
}
