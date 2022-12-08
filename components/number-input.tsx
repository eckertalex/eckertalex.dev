import clsx from 'clsx'

type NumberInputProps = {
	label: string
	value: string | number
	onChange: (value: string) => void
	size?: 'sm' | 'md'
}

export function NumberInput({
	label,
	value,
	onChange,
	size = 'md',
}: NumberInputProps) {
	return (
		<div>
			<label
				htmlFor={label}
				className="block font-medium text-center text-gray-700 dark:text-gray-300"
			>
				{label}
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					type="number"
					name={label}
					id={label}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					className={clsx(
						'block w-full text-center text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-gray-100',
						size === 'sm' && 'px-2 py-1',
						size === 'md' && 'px-4 py-2',
					)}
				/>
			</div>
		</div>
	)
}
