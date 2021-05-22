import Link from 'next/link'
import {Link as CuiLink, LinkProps as CuiLinkProps} from '@chakra-ui/react'

function CustomLink(props: CuiLinkProps) {
  const {href = '#', children, ...rest} = props

  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <CuiLink {...rest}>
        <Link href={href}>{children}</Link>
      </CuiLink>
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

export {CustomLink}
