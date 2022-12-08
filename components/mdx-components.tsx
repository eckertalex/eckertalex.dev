import Image from 'next/image'
import Link from 'next/link'

const CustomLink = (
	props: React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
) => {
	const href = props.href
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		// @ts-ignore
		return <Link {...props} />
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export const MDXComponents = {
	Image,
	a: CustomLink,
}
