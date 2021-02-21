import Link from 'next/link'

type CustomLinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export function CustomLink(props: CustomLinkProps) {
  const {href = '#', ...rest} = props

  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />
}
