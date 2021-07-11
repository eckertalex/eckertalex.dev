import React from 'react'
import tinytime from 'tinytime'
import {HStack, Divider, Heading, List, ListItem, Link, Text} from '@chakra-ui/react'

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

function ReadingList(props) {
  const {reading} = props

  return (
    <List w="full">
      {Object.keys(reading).map((groupDate) => (
        <React.Fragment key={groupDate}>
          <HStack color="gray.500">
            <Divider />
            <Heading flexShrink={0} as="h3" fontSize="xs" ml={4}>
              {dateTemplate.render(new Date(groupDate))}
            </Heading>
          </HStack>
          <ListItem mt={4}>
            <List spacing={10}>
              {reading[groupDate].map((reading) => (
                <ReadingListItem key={reading.timestamp} {...reading} />
              ))}
            </List>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  )
}

export {ReadingList}
