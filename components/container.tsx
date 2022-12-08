import Head from 'next/head'
import { useRouter } from 'next/router'
import { ColorModeSwitcher } from '../components/color-mode-switcher'
import { Footer } from './footer'
import { MobileMenu } from './mobile-menu'
import Link from 'next/link'
import clsx from 'clsx'

function NavItem({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<Link
			href={href}
			className={clsx(
				isActive
					? 'font-semibold text-gray-800 dark:text-gray-200'
					: 'font-normal text-gray-600 dark:text-gray-400',
				'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
			)}
		>
			<span className="capsize">{children}</span>
		</Link>
	)
}

type Meta = {
	title: string
	description: string
	image: string
	type: string
	date?: string
}

export function Container(
	props: Partial<Meta> & {
		children: React.ReactNode
	},
) {
	const { children, ...customMeta } = props
	const router = useRouter()
	const meta: Meta = {
		// @ts-ignore
		title: 'Alexander Eckert - Software Engineer',
		// @ts-ignore
		description:
			'Personal blog by Alexander Eckert. I write about React, JavaScript, and TypeScript.',
		// @ts-ignore
		image: 'https://eckertalex.dev/static/img/og.png',
		// @ts-ignore
		type: 'website',
		...customMeta,
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-900">
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta
					property="og:url"
					content={`https://eckertalex.dev${router.asPath}`}
				/>
				<link rel="canonical" href={`https://eckertalex.dev${router.asPath}`} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Alexander Eckert" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@eckertalex_" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
				{meta.date && (
					<meta property="article:published_time" content={meta.date} />
				)}
			</Head>
			<div className="flex flex-col justify-center px-8">
				<nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
					<a href="#skip" className="skip-nav">
						Skip to content
					</a>
					<div className="ml-[-0.60rem]">
						<MobileMenu />
						<NavItem href="/">Home</NavItem>
						<NavItem href="/blog">Blog</NavItem>
						<NavItem href="/about">About</NavItem>
					</div>
					<ColorModeSwitcher />
				</nav>
			</div>
			<main
				id="skip"
				className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
			>
				{children}
				<Footer />
			</main>
		</div>
	)
}
