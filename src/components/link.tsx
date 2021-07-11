import NextLink from 'next/link'
import {Link as CuiLink, LinkProps as CuiLinkProps} from '@chakra-ui/react'

function Link(props: CuiLinkProps) {
  const {href = '#', children, ...rest} = props

  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <CuiLink {...rest}>{children}</CuiLink>
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <CuiLink href={href} {...rest}>
        {children}
      </CuiLink>
    )
  }

  return (
    <CuiLink href={href} isExternal {...rest}>
      {children}
    </CuiLink>
  )
}

export {Link}
