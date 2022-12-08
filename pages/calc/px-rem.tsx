import { usePxRem } from '../../hooks/use-px-rem'
import { ArrowLeftRight as ArrowLeftRightIcon } from 'lucide-react'
import { Container } from '../../components/container'
import { NumberInput } from '../../components/number-input'

export default function PxRem() {
	const [
		{ base, pixels, rems },
		{ onBaseChange, onPixelsChange, onRemsChange },
	] = usePxRem({ base: '16', pixels: '10' })

	return (
		<Container
			title="PX \u21C4 REM | Alexander Eckert"
			description="Convert PX to REM and REM to PX with a custom base value."
		>
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
					{'PX \u21C4 REM converter'}
				</h1>
				<div className="gap-16 w-full flex flex-col">
					<NumberInput
						label="Base (px)"
						size="sm"
						value={base ?? '0'}
						onChange={onBaseChange}
					/>
					<div className="flex flex-col gap-4 md:flex-row items-center md:items-end justify-center w-full">
						<NumberInput
							label="Pixels (px)"
							onChange={onPixelsChange}
							value={pixels ?? '0'}
						/>
						<ArrowLeftRightIcon className="h-10 w-10 text-black dark:text-white rotate-90 md:rotate-0" />
						<NumberInput
							label="REM (rem)"
							onChange={onRemsChange}
							value={rems ?? '0'}
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}
