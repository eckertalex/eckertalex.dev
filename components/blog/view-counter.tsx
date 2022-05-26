import {useEffect} from 'react'
import {Text, TextProps, useColorModeValue as mode} from '@chakra-ui/react'
import useSWR from 'swr'
import {fetcher} from '../../lib/fetcher'

function registerView(slug: string) {
  fetch(`/api/views/${slug}`, {
    method: 'POST',
  })
}

type ViewCounterProps = TextProps & {
  slug: string
}

export function ViewCounter(props: ViewCounterProps) {
  const {slug, ...rest} = props
  const {data} = useSWR<{total: number}>(`/api/views/${slug}`, fetcher)
  const views = data?.total

  useEffect(() => {
    registerView(slug)
  }, [slug])

  return (
    <Text {...rest} fontSize="sm" color={mode('gray.700', 'gray.300')}>
      {`${views ? new Number(views).toLocaleString() : '–––'} views`}
    </Text>
  )
}
