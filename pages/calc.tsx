import Link from 'next/link'
import {Container, Heading, UnorderedList, ListItem} from '@chakra-ui/react'
import {NavLayout} from '../layout/nav-layout'

export default function Calc() {
  return (
    <NavLayout
      title="Calculators | Alexander Eckert"
      description="A collection of useful calculators."
    >
      <Container maxW="container.md" centerContent>
        <Heading as="h1" fontSize="3xl" marginBottom={16}>
          Calculators
        </Heading>
        <UnorderedList>
          <ListItem>
            <Link href="/calc/firewood">{'Firewood unit converter'}</Link>
          </ListItem>
          <ListItem>
            <Link href="/calc/px-rem">{'PX \u21C4 REM converter'}</Link>
          </ListItem>
        </UnorderedList>
      </Container>
    </NavLayout>
  )
}
