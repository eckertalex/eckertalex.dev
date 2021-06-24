import tinytime from 'tinytime'
import {Link, HStack, Text, ListItem} from '@chakra-ui/react'

const dateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

function ReadingListItem(props) {
  const {author, timestamp, url, title, twitter, date, description} = props
  return (
    <ListItem key={timestamp}>
      <Link href={url} color="accent.400" fontWeight="semibold" fontSize="xl" isExternal>
        {title}
      </Link>
      <HStack fontSize="sm" color="gray.500" divider={<Text>&nbsp;•&nbsp;</Text>} mb={2}>
        {author ? <Text>{author}</Text> : null}
        {twitter ? (
          <Link href={`https://twitter.com/${twitter}`} isExternal>
            @{twitter}
          </Link>
        ) : null}
        {date ? <Text>{dateTemplate.render(new Date(date))}</Text> : null}
      </HStack>
      <Text>{description}</Text>
    </ListItem>
  )
}

export {ReadingListItem}
