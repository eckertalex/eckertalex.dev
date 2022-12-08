import { Moon as MoonIcon, Sun as SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ColorModeSwitcher() {
	const [mounted, setMounted] = useState(false)
	const { theme, resolvedTheme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
			onClick={() =>
				setTheme(
					theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark',
				)
			}
		>
			{mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
				<SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
			) : (
				<MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
			)}
		</button>
	)
}
