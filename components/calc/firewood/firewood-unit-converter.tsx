import { Icon, Stack, useMediaQuery } from '@chakra-ui/react'
import { ArrowLeftRight as ArrowLeftRightIcon } from 'lucide-react'
import { Input } from '../input'
import { useFirewood } from './use-firewood'

function FirewoodUnitConverter() {
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
	const [
		{ solidMeter, piledMeter, dumpingVolume },
		{ onSolidMeterChange, onPiledMeterChange, onDumpingVolumeChange },
	] = useFirewood({ solidMeter: '3' })

	return (
		<Stack
			flexDirection={isLargerThan768 ? 'row' : 'column'}
			justifyContent="space-between"
			alignItems={isLargerThan768 ? 'end' : 'center'}
			width="full"
			spacing={4}
		>
			<Input
				label="Festmeter"
				unit={`m\u00B3`}
				onChange={onSolidMeterChange}
				value={solidMeter ?? 0}
				width={48}
				size="md"
			/>
			<Icon as={ArrowLeftRightIcon} boxSize={10} />
			<Input
				label="Raummeter"
				unit={`m\u00B3`}
				onChange={onPiledMeterChange}
				value={piledMeter ?? 0}
				width={48}
				size="md"
			/>
			<Icon as={ArrowLeftRightIcon} boxSize={10} />
			<Input
				label="Schüttraummeter"
				unit={`m\u00B3`}
				onChange={onDumpingVolumeChange}
				value={dumpingVolume ?? 0}
				width={48}
				size="md"
			/>
		</Stack>
	)
}

export { FirewoodUnitConverter }
