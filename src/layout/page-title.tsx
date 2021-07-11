import {Heading, HeadingProps, useColorModeValue as mode} from '@chakra-ui/react'

function PageTitle(props: HeadingProps) {
  const {children, ...rest} = props

  return (
    <Heading
      fontSize={{base: '3xl', sm: '4xl', md: '5xl'}}
      fontWeight="extrabold"
      letterSpacing="tight"
      color={mode('gray.900', 'gray.100')}
      {...rest}
    >
      {children}
    </Heading>
  )
}

export {PageTitle}
