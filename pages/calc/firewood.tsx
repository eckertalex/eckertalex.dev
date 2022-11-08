import {
	Container,
	Heading,
	VStack,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react'
import { FirewoodUnitConverter } from '../../components/calc/firewood/firewood-unit-converter'
import { NavLayout } from '../../layout/nav-layout'

export default function Firewood() {
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

	return (
		<NavLayout
			title="Firewood Unit Converter | Alexander Eckert"
			description="Convert your firewood between solid meter, piled meter, and dumping volume."
		>
			<Container maxW="container.md" centerContent>
				<Heading as="h1" fontSize="3xl" marginBottom={16}>
					{'Firewood Unit Converter'}
				</Heading>
				<VStack spacing={16} width="full">
					<Stack
						flexDirection={isLargerThan768 ? 'row' : 'column'}
						justifyContent="space-between"
						alignItems={isLargerThan768 ? 'end' : 'center'}
						width="full"
						spacing={4}
					>
						<FirewoodUnitConverter />
					</Stack>
				</VStack>
			</Container>
		</NavLayout>
	)
}
