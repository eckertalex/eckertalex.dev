import {
	Grid,
	GridItem,
	VStack,
	HStack,
	Heading,
	Text,
	Divider,
	useColorModeValue as mode,
	Box,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { SocialIcons } from '../components/social-icons'
import { PageTitle } from '../components/page-title'
import { MDXComponents } from '../components/mdx-components'
import { allOtherPages, OtherPage } from '../.contentlayer/generated'
import { NavLayout } from '../layout/nav-layout'
import portrait from 'public/static/img/portrait.jpg'

export default function About({ about }: { about: OtherPage }) {
	const Component = useMDXComponent(about.body.code)

	return (
		<NavLayout title={`${about.title} | Alexander Eckert`}>
			<VStack alignItems="start" spacing={8}>
				<PageTitle>{about.title}</PageTitle>
				<Divider borderColor={mode('gray.700', 'gray.200')} />
				<Grid templateColumns={{ md: 'repeat(3, 1fr)' }}>
					<VStack spacing={2} marginTop={8}>
						<Image
							alt="Alexander Eckert"
							src={portrait}
							width={192}
							style={{ borderRadius: '9999px' }}
						/>
						<Heading
							as="h3"
							fontSize="2xl"
							fontWeight="bold"
							letterSpacing="tight"
						>
							Alexander Eckert
						</Heading>
						<Text color={mode('gray.500', 'gray.400')}>
							Senior Software Engineer
						</Text>
						<Text color={mode('gray.500', 'gray.400')}>
							GoTo Technologies Germany GmbH
						</Text>
						<HStack spacing={3} paddingTop={4}>
							<SocialIcons href="https://github.com/eckertalex" kind="github" />
							<SocialIcons
								href="https://twitter.com/eckertalex_"
								kind="twitter"
							/>
							<SocialIcons
								href="https://www.linkedin.com/in/eckertalex/"
								kind="linkedin"
							/>
							<SocialIcons href="mailto:me@eckertalex.dev" kind="mail" />
						</HStack>
					</VStack>
					<GridItem colSpan={2} as={VStack} alignItems="start" spacing={2}>
						<Component components={MDXComponents} />
					</GridItem>
				</Grid>
			</VStack>
		</NavLayout>
	)
}

export const getStaticProps = async () => {
	const about = allOtherPages.find((page) => page.slug === 'about')!

	return { props: { about } }
}
