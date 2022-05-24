import {Fragment} from 'react'
import {format, parseISO} from 'date-fns'
import {
  HStack,
  Divider,
  Heading,
  List,
  ListItem,
  Link,
  Text,
} from '@chakra-ui/react'
import {Reading, ReadingList as ReadingListType} from '../../lib/gitrows'

function ReadingListItem({reading}: {reading: Reading}) {
  const {author, timestamp, url, title, twitter, date, description} = reading
  return (
    <ListItem key={timestamp}>
      <Link
        href={url}
        color="accent.400"
        fontWeight="semibold"
        fontSize="xl"
        isExternal
      >
        {title}
      </Link>
      <HStack
        fontSize="sm"
        color="gray.500"
        divider={<Text>&nbsp;•&nbsp;</Text>}
        mb={2}
      >
        {author ? <Text>{author}</Text> : null}
        {twitter ? (
          <Link href={`https://twitter.com/${twitter}`} isExternal>
            @{twitter}
          </Link>
        ) : null}
        {date ? <Text>{format(parseISO(date), 'MMMM dd, y')}</Text> : null}
      </HStack>
      <Text>{description}</Text>
    </ListItem>
  )
}

function ReadingList(props: {readings: ReadingListType}) {
  const {readings} = props

  return (
    <List w="full">
      {Object.keys(readings).map((groupDate) => (
        <Fragment key={groupDate}>
          <HStack color="gray.500">
            <Divider />
            <Heading flexShrink={0} as="h3" fontSize="xs" ml={4}>
              {format(new Date(groupDate), 'MMMM dd, y')}
            </Heading>
          </HStack>
          <ListItem mt={4}>
            <List spacing={10}>
              {readings[groupDate].map((reading) => (
                <ReadingListItem key={reading.timestamp} reading={reading} />
              ))}
            </List>
          </ListItem>
        </Fragment>
      ))}
    </List>
  )
}

export {ReadingList}
