import Link from 'next/link'
import { Container } from '../components/container'

export default function Calc() {
	return (
		<Container
			title="Calculators - Alexander Eckert"
			description="A collection of useful calculators."
		>
			<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					Calculators
				</h1>
				<ul>
					<li>
						<Link
							className="text-black dark:text-white hover:underline"
							href="/calc/firewood"
						>
							{'Firewood unit converter'}
						</Link>
					</li>
					<li>
						<Link
							className="text-black dark:text-white hover:underline"
							href="/calc/px-rem"
						>
							{'PX \u21C4 REM converter'}
						</Link>
					</li>
				</ul>
			</div>
		</Container>
	)
}
