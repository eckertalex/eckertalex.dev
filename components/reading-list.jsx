import React from 'react'
import tinytime from 'tinytime'
import {ReadingListItem} from '@/components/reading-list-item'
import {HStack, Divider, Heading, List, ListItem} from '@chakra-ui/react'

const dateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

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
