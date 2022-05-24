import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightElement,
  useColorModeValue as mode,
} from '@chakra-ui/react'

type InputProps = {
  label: string
  value: string | number
  onChange: (value: string) => void
  unit?: string
  width?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

function Input({
  label,
  value,
  onChange,
  unit,
  width = 64,
  size = 'lg',
}: InputProps) {
  return (
    <FormControl id={label} width={width}>
      <FormLabel fontWeight="semibold" textAlign="center">
        {label}
      </FormLabel>
      <NumberInput size={size} onChange={onChange} value={value}>
        <NumberInputField textAlign="center" />
        {unit ? (
          <InputRightElement
            marginRight={6}
            color={mode('gray.500', 'gray.400')}
          >
            {unit}
          </InputRightElement>
        ) : null}
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export {Input}
