import {
	Heading,
	Flex,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { BlogPost } from '../../.contentlayer/generated'
import { fetcher } from '../../lib/fetcher'
import { Link } from '../link'

export function PostPreview(props: {
	post: Pick<BlogPost, 'slug' | 'title' | 'summary'>
}) {
	const { post } = props

	return (
		<>
			<Flex
				justifyContent="space-between"
				flexDirection={{ base: 'column', md: 'row' }}
			>
				<Heading as="h3" fontSize="2xl" fontWeight="bold" letterSpacing="tight">
					<Link
						color={mode('gray.900', 'gray.100')}
						href={`/blog/${post.slug}`}
					>
						{post.title}
					</Link>
				</Heading>
			</Flex>
			<Text color={mode('gray.500', 'gray.400')} maxWidth="none">
				{post.summary}
			</Text>
		</>
	)
}
