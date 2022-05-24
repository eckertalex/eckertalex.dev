import {Tag as CuiTag, TagProps} from '@chakra-ui/react'

export function Tag({children, ...rest}: TagProps) {
  return (
    <CuiTag colorScheme="accent" {...rest}>
      {children}
    </CuiTag>
  )
}
