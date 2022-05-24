import {useCallback, useEffect, useMemo} from 'react'
import {Box, IconButton, Theme, useToken} from '@chakra-ui/react'
import {useLocalStorageValue} from '@react-hookz/web'

function AccentPickerIcon() {
  return <Box h={3} w={3} rounded="full" backgroundColor="accent.400"></Box>
}

const accentColors: (keyof Partial<Theme['colors']>)[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]

function AccentPicker() {
  const [accentColor, setAccentColor] = useLocalStorageValue<
    keyof Theme['colors']
  >('accent', 'pink')

  const [
    accentColor50,
    accentColor100,
    accentColor200,
    accentColor300,
    accentColor400,
    accentColor500,
    accentColor600,
    accentColor700,
    accentColor800,
    accentColor900,
  ] = useToken('colors', [
    `${accentColor}.50`,
    `${accentColor}.100`,
    `${accentColor}.200`,
    `${accentColor}.300`,
    `${accentColor}.400`,
    `${accentColor}.500`,
    `${accentColor}.600`,
    `${accentColor}.700`,
    `${accentColor}.800`,
    `${accentColor}.900`,
  ])

  const updateAccentColor = useCallback(() => {
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-50',
      accentColor50
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-100',
      accentColor100
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-200',
      accentColor200
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-300',
      accentColor300
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-400',
      accentColor400
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-500',
      accentColor500
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-600',
      accentColor600
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-700',
      accentColor700
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-800',
      accentColor800
    )
    document.documentElement.style.setProperty(
      '--chakra-colors-accent-900',
      accentColor900
    )
  }, [
    accentColor100,
    accentColor200,
    accentColor300,
    accentColor400,
    accentColor50,
    accentColor500,
    accentColor600,
    accentColor700,
    accentColor800,
    accentColor900,
  ])

  useEffect(() => {
    updateAccentColor()
  }, [updateAccentColor])

  const nextAccentColor = useMemo(() => {
    let index = accentColors.indexOf(accentColor ?? 'pink')
    index = (index + 1) % accentColors.length
    return accentColors[index]
  }, [accentColor])

  return (
    <IconButton
      icon={<AccentPickerIcon />}
      isRound
      variant="ghost"
      onClick={() => {
        setAccentColor(nextAccentColor)
      }}
      aria-label={`Switch accent color to ${nextAccentColor}`}
    />
  )
}

export {AccentPicker}
