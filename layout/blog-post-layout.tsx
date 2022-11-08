import { NavLayout } from './nav-layout'
import {
	VStack,
	HStack,
	Stack,
	Divider,
	VisuallyHidden,
	Text,
	Heading,
	useColorModeValue as mode,
	Container,
} from '@chakra-ui/react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Link } from '../components/link'
import { BlogPost } from '../.contentlayer/generated'
import portrait from 'public/static/img/portrait.jpg'

const editUrl = (slug: string) =>
	`https://github.com/eckertalex/eckertalex.dev/edit/dev/content/blog/${slug}.mdx`

export function BlogPostLayout({
	children,
	post,
}: {
	children: React.ReactNode
	post: BlogPost
}) {
	return (
		<NavLayout
			title={`${post.title} | Alexander Eckert`}
			description={post.summary}
			date={new Date(post.publishedAt).toISOString()}
			type="article"
		>
			<Container maxW="container.lg">
				<article>
					<VStack as="header" marginY={6}>
						<Heading
							as="h1"
							fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
							fontWeight="extrabold"
							letterSpacing="tight"
							color={mode('gray.900', 'gray.100')}
						>
							{post.title}
						</Heading>
						<Stack
							as="dl"
							direction={{ base: 'column', sm: 'row' }}
							justifyContent="space-between"
							width="full"
						>
							<HStack>
								<VisuallyHidden as="dt">Author</VisuallyHidden>
								<HStack as="dd">
									<Image
										alt="Alexander Eckert"
										width={24}
										src={portrait}
										style={{ borderRadius: '9999px' }}
									/>
									<dl>
										<VisuallyHidden as="dt">Name</VisuallyHidden>
										<Text
											as="dd"
											fontSize="sm"
											color={mode('gray.900', 'gray.100')}
										>
											Alexander Eckert
										</Text>
									</dl>
								</HStack>
								<Text>/</Text>
								<VisuallyHidden as="dt">Published on</VisuallyHidden>
								<dd>
									<Text
										as="time"
										fontSize="sm"
										color={mode('gray.900', 'gray.100')}
										dateTime={post.publishedAt}
									>
										{format(parseISO(post.publishedAt), 'EEEE, MMMM dd, y')}
									</Text>
								</dd>
							</HStack>
							<VisuallyHidden as="dt">Reading Time</VisuallyHidden>
							<Text as="dd" fontSize="sm" color={mode('gray.700', 'gray.300')}>
								{post.readingTime.text}
							</Text>
						</Stack>
					</VStack>
					<Divider borderColor={mode('gray.700', 'gray.200')} />
					<VStack alignItems="start" spacing={2} paddingY={8}>
						{children}
					</VStack>
					<Divider borderColor={mode('gray.700', 'gray.200')} />
					<HStack
						as="footer"
						justifyContent="end"
						fontSize="small"
						fontWeight="medium"
					>
						<Text color={mode('gray.700', 'gray.300')} paddingTop={4}>
							<Link href={editUrl(post.slug)}>Edit on GitHub</Link>
						</Text>
					</HStack>
				</article>
			</Container>
		</NavLayout>
	)
}
