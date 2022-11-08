import {
	Container,
	Flex,
	HStack,
	Heading,
	useColorModeValue as mode,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ColorModeSwitcher } from '../components/color-mode-switcher'
import { AccentPicker } from '../components/accent-picker'
import { Link } from '../components/link'
import { Footer } from './components/footer'
import { MobileNav } from './components/mobile-nav'

const headerNavLinks = [
	{
		title: 'Blog',
		href: '/blog',
	},
	{
		title: 'Reading',
		href: '/reading',
	},
	{
		title: 'Uses',
		href: '/uses',
	},
	{
		title: 'About',
		href: '/about',
	},
]

export function NavLayout(props: {
	children: React.ReactNode
	title?: string
	description?: string
	date?: string
	type?: string
}) {
	const { children, ...customMeta } = props
	const router = useRouter()

	const meta = {
		title: 'Alexander Eckert',
		author: 'Alexander Eckert',
		baseUrl: 'https://eckertalex.dev',
		description:
			'Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.',
		keywords:
			'bio,homepage,engineer,developer,remote,typescript,react,open-source,open source,privacy,security,web,blog,writer,writing',
		image: '/static/img/og.png',
		type: 'website',
		...customMeta,
	}

	return (
		<Container
			maxW="container.lg"
			flexDirection="column"
			justifyContent="space-between"
			height="100vh"
		>
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta content={meta.keywords} name="keywords" />
				<meta property="og:url" content={`${meta.baseUrl}${router.asPath}`} />
				<link rel="canonical" href={`${meta.baseUrl}${router.asPath}`} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content={meta.author} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={`${meta.baseUrl}${meta.image}`} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={`${meta.baseUrl}${meta.image}`} />
				{meta.date && (
					<meta property="article:published_time" content={meta.date} />
				)}
				<meta content="width=device-width, initial-scale=1" name="viewport" />
			</Head>
			<Flex
				as="header"
				alignItems="center"
				justifyContent="space-between"
				paddingY={10}
			>
				<Link _hover={{ textDecoration: 'none' }} href="/">
					<HStack alignItems="center" justifyContent="space-between">
						<Heading
							as="h1"
							fontSize="xl"
							fontStyle="italic"
							color="pink.400"
							background={mode('gray.800', 'white')}
							padding={2}
							rounded="sm"
						>
							AE
						</Heading>
						<Heading
							as="h1"
							fontSize="4xl"
							fontWeight="bold"
							color="accent.400"
							whiteSpace="nowrap"
							display={{ base: 'none', lg: 'unset' }}
						>
							{meta.author}
						</Heading>
					</HStack>
				</Link>
				<HStack spacing={6} lineHeight="5">
					<HStack spacing={6} display={{ base: 'none', md: 'block' }}>
						{headerNavLinks.map((link) => (
							<Link
								padding={1}
								fontWeight="medium"
								color={mode('gray.700', 'gray.300')}
								href={link.href}
								key={link.title}
							>
								{link.title}
							</Link>
						))}
					</HStack>
					<AccentPicker />
					<ColorModeSwitcher />
					<MobileNav navLinks={headerNavLinks} />
				</HStack>
			</Flex>
			<main>{children}</main>
			<Footer />
		</Container>
	)
}
