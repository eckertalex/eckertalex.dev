import {Tag as CuiTag, TagProps, Link as CuiLink} from '@chakra-ui/react'
import {kebabCase} from '@/lib/utils'

function Tag({children, ...rest}: TagProps) {
  return (
    <CuiTag colorScheme="accent" {...rest}>
      {children}
    </CuiTag>
  )
}

function PostLinkTag(props: {tag: string}) {
  const {tag} = props

  const kebabCaseTag = kebabCase(tag)

  return (
    <CuiTag as={CuiLink} href={`/tags/${kebabCaseTag}`} marginTop={2} colorScheme="accent">
      {kebabCaseTag}
    </CuiTag>
  )
}

export {Tag, PostLinkTag}
