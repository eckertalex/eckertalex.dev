import React from 'react'
import {
  VStack,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightElement,
  createIcon,
  useColorModeValue as mode,
} from '@chakra-ui/react'

function px2rem(baseSize: string, targetSize: string) {
  return (+Number(targetSize) / Number(baseSize)).toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
}

function rem2px(baseSize: string, targetSize: string) {
  return (+Number(targetSize) * Number(baseSize)).toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
}

const SwitchHorizontalIcon = createIcon({
  displayName: 'SwitchHorizontalIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
  },
  path: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  ),
})

function PxRemForm() {
  const [base, setBase] = React.useState('16')
  const [pixels, setPixels] = React.useState('10')
  const [rems, setRems] = React.useState(px2rem(base, pixels))

  function parseBase(x: string) {
    return x.replace(/^\px/, '')
  }

  function formatBase(x: string) {
    return `${x}px`
  }

  function onBaseChange(b: string) {
    const newBase = parseBase(b)
    setBase(newBase)
    setRems(px2rem(newBase, pixels))
  }

  function onPixelsChange(p: string) {
    setPixels(p)
    setRems(px2rem(base, p))
  }

  function onRemsChange(r: string) {
    setRems(r)
    setPixels(rem2px(base, r))
  }

  return (
    <VStack spacing={16} width="full">
      <FormControl id="base" width={32}>
        <FormLabel textAlign="center">Base</FormLabel>
        <NumberInput size="sm" onChange={onBaseChange} value={formatBase(base)}>
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <HStack justifyContent="space-between" alignItems="end" width="full">
        <FormControl id="px" width={64}>
          <FormLabel fontWeight="semibold" textAlign="center">
            Pixels
          </FormLabel>
          <NumberInput size="lg" onChange={onPixelsChange} value={pixels}>
            <NumberInputField textAlign="center" />
            <InputRightElement marginRight={6} color={mode('gray.500', 'gray.400')}>
              px
            </InputRightElement>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <SwitchHorizontalIcon boxSize={12} />
        <FormControl id="rem" width={64}>
          <FormLabel fontWeight="semibold" textAlign="center">
            REM
          </FormLabel>
          <NumberInput size="lg" onChange={onRemsChange} value={rems}>
            <NumberInputField textAlign="center" />
            <InputRightElement marginRight={6} color={mode('gray.500', 'gray.400')}>
              rem
            </InputRightElement>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
    </VStack>
  )
}

export {PxRemForm}
