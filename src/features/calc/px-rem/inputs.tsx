import React from 'react'
import Link from 'next/link'
import {
  FormControl,
  FormLabel,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightElement,
  useColorModeValue as mode,
  createIcon,
} from '@chakra-ui/react'

type InputProps = {
  value: string
  onChange: (value: string) => void
}

function BaseInput({value, onChange}: InputProps) {
  function formatBase(x: string) {
    return `${x}px`
  }

  function parseBase(x: string) {
    return x.replace(/^\px/, '')
  }

  return (
    <FormControl id="base" width={32}>
      <FormLabel textAlign="center">Base</FormLabel>
      <NumberInput
        size="sm"
        onChange={(newBase) => {
          onChange(parseBase(newBase))
        }}
        value={formatBase(value)}
      >
        <NumberInputField textAlign="center" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

function PixelsInput({value, onChange}: InputProps) {
  return (
    <FormControl id="px" width={64}>
      <FormLabel fontWeight="semibold" textAlign="center">
        Pixels
      </FormLabel>
      <NumberInput size="lg" onChange={onChange} value={value}>
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
  )
}

function RemsInput({value, onChange}: InputProps) {
  return (
    <FormControl id="rem" width={64}>
      <FormLabel fontWeight="semibold" textAlign="center">
        REM
      </FormLabel>
      <NumberInput size="lg" onChange={onChange} value={value}>
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
  )
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

function SwitchHorizontalIconButton({label, to}: {label: string; to: string}) {
  return (
    <Link href={to} passHref>
      <IconButton as="a" aria-label={label} icon={<SwitchHorizontalIcon boxSize={8} />} size="lg" />
    </Link>
  )
}

export {BaseInput, PixelsInput, RemsInput, SwitchHorizontalIconButton}
