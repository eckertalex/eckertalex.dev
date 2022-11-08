import NextLink from 'next/link'
import { Link as CuiLink, LinkProps as CuiLinkProps } from '@chakra-ui/react'

function Link(props: CuiLinkProps) {
	const { href = '#', ...rest } = props
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<NextLink href={href} passHref legacyBehavior>
				<CuiLink {...rest} />
			</NextLink>
		)
	}

	return <CuiLink href={href} isExternal {...rest} />
}

export { Link }
