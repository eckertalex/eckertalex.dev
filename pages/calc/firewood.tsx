import { Container } from '../../components/container'
import { ArrowLeftRight as ArrowLeftRightIcon } from 'lucide-react'
import { NumberInput } from '../../components/number-input'
import { useFirewood } from '../../hooks/use-firewood'

export default function Firewood() {
	const [
		{ solidMeter, piledMeter, dumpingVolume },
		{ onSolidMeterChange, onPiledMeterChange, onDumpingVolumeChange },
	] = useFirewood({ solidMeter: '3' })

	return (
		<Container
			title="Firewood Unit Converter - Alexander Eckert"
			description="Convert your firewood between solid meter, piled meter, and dumping volume."
		>
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
					Firewood Unit Converter
				</h1>
				<div className="gap-16 w-full flex flex-col">
					<div className="flex flex-col gap-4 md:flex-row items-center md:items-end justify-center w-full">
						<NumberInput
							label="Festmeter"
							onChange={onSolidMeterChange}
							value={solidMeter ?? 0}
						/>
						<ArrowLeftRightIcon className="h-10 w-10 text-black dark:text-white rotate-90 md:rotate-0" />
						<NumberInput
							label="Raummeter"
							onChange={onPiledMeterChange}
							value={piledMeter ?? 0}
						/>
						<ArrowLeftRightIcon className="h-10 w-10 text-black dark:text-white rotate-90 md:rotate-0" />
						<NumberInput
							label="Schüttraummeter"
							onChange={onDumpingVolumeChange}
							value={dumpingVolume ?? 0}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}
