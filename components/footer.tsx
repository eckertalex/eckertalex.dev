import Link from 'next/link'
import { NowPlaying } from './now-playing'

function ExternalLink({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	return (
		<a
			className="text-gray-500 hover:underline transition"
			target="_blank"
			rel="noopener noreferrer"
			href={href}
		>
			{children}
		</a>
	)
}

export function Footer() {
	return (
		<footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
			<hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
			<NowPlaying />
			<div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-8 sm:grid-cols-3">
				<div className="flex flex-col space-y-4">
					<Link className="text-gray-500 hover:underline transition" href="/">
						Home
					</Link>
					<Link
						className="text-gray-500 hover:underline transition"
						href="/blog"
					>
						Blog
					</Link>
					<Link
						className="text-gray-500 hover:underline transition"
						href="/about"
					>
						About
					</Link>
				</div>
				<div className="flex flex-col space-y-4">
					<ExternalLink href="https://twitter.com/eckertalex_">
						Twitter
					</ExternalLink>
					<ExternalLink href="https://github.com/eckertalex">
						GitHub
					</ExternalLink>
					<ExternalLink href="https://www.linkedin.com/in/eckertalex/">
						LinkedIn
					</ExternalLink>
				</div>
				<div className="flex flex-col space-y-4">
					<Link
						className="text-gray-500 hover:underline transition"
						href="/reading"
					>
						Reading
					</Link>
					<Link
						className="text-gray-500 hover:underline transition"
						href="/calc"
					>
						Calculators
					</Link>
				</div>
			</div>
			<div className="flex flex-col items-center w-full">
				<div className="mb-2 flex space-x-2">
					<div className="text-gray-500 text-sm">Alexander Eckert</div>
					<span className="text-gray-500">{` • `}</span>
					<div className="text-gray-500 text-sm">{`© ${new Date().getFullYear()}`}</div>
				</div>
				<div className="mb-2 flex space-x-2 dark:text-gray-400">
					<Link
						className="text-gray-500 text-sm hover:underline transition"
						href="/impressum"
					>
						Impressum
					</Link>
					<span className="text-gray-500">{` • `}</span>
					<Link
						className="text-gray-500 text-sm hover:underline transition"
						href="/datenschutz"
					>
						Datenschutz
					</Link>
				</div>
			</div>
		</footer>
	)
}
