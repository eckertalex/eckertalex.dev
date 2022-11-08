import { Input } from '../input'

type InputProps = {
	value: string
	onChange: (value: string) => void
}

function BaseInput({ value, onChange }: InputProps) {
	function formatBase(x: string) {
		return `${x}px`
	}

	function parseBase(x: string) {
		return x.replace(/^\px/, '')
	}

	return (
		<Input
			label="Base"
			width={32}
			size="sm"
			onChange={(newBase) => {
				onChange(parseBase(newBase))
			}}
			value={formatBase(value)}
		/>
	)
}

function PixelsInput({ value, onChange }: InputProps) {
	return <Input unit="px" label="Pixels" onChange={onChange} value={value} />
}

function RemsInput({ value, onChange }: InputProps) {
	return <Input unit="rem" label="REM" onChange={onChange} value={value} />
}

export { BaseInput, PixelsInput, RemsInput }
