import {
	VStack,
	Divider,
	useColorModeValue as mode,
	Heading,
} from '@chakra-ui/react'
import { NavLayout } from './nav-layout'
import React, { ReactNode } from 'react'

export function DefaultLayout({
	children,
	title,
	description,
}: {
	children: ReactNode
	title: string
	description?: string
}) {
	return (
		<NavLayout title={`${title} | Alexander Eckert`} description={description}>
			<VStack alignItems="start" spacing={8}>
				<Heading
					as="h1"
					fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
					fontWeight="extrabold"
					letterSpacing="tight"
					color={mode('gray.900', 'gray.100')}
				>
					{title}
				</Heading>
				<Divider borderColor={mode('gray.700', 'gray.200')} />
				<VStack alignItems="start" spacing={2}>
					{children}
				</VStack>
			</VStack>
		</NavLayout>
	)
}
