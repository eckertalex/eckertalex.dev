import React from 'react'
import {Box, IconButton, Theme, useToken} from '@chakra-ui/react'
import {useLocalStorage} from '@/hooks/use-local-storage'

function AccentPickerIcon({color}: {color: string}) {
  return <Box h={3} w={3} rounded="full" backgroundColor={`${color}.400`}></Box>
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
  const [accentColor, setAccentColor] = useLocalStorage<keyof Theme['colors']>('accent', 'pink')
  const nextAccentColor = React.useMemo(() => {
    let index = accentColors.indexOf(accentColor)
    index = (index + 1) % accentColors.length
    return accentColors[index]
  }, [accentColor])

  const [
    nextAccentColor50,
    nextAccentColor100,
    nextAccentColor200,
    nextAccentColor300,
    nextAccentColor400,
    nextAccentColor500,
    nextAccentColor600,
    nextAccentColor700,
    nextAccentColor800,
    nextAccentColor900,
  ] = useToken('colors', [
    `${nextAccentColor}.50`,
    `${nextAccentColor}.100`,
    `${nextAccentColor}.200`,
    `${nextAccentColor}.300`,
    `${nextAccentColor}.400`,
    `${nextAccentColor}.500`,
    `${nextAccentColor}.600`,
    `${nextAccentColor}.700`,
    `${nextAccentColor}.800`,
    `${nextAccentColor}.900`,
  ])

  function updateAccentColor() {
    document.getRootNode
    document.documentElement.style.setProperty('--chakra-colors-accent-50', nextAccentColor50)
    document.documentElement.style.setProperty('--chakra-colors-accent-100', nextAccentColor100)
    document.documentElement.style.setProperty('--chakra-colors-accent-200', nextAccentColor200)
    document.documentElement.style.setProperty('--chakra-colors-accent-300', nextAccentColor300)
    document.documentElement.style.setProperty('--chakra-colors-accent-400', nextAccentColor400)
    document.documentElement.style.setProperty('--chakra-colors-accent-500', nextAccentColor500)
    document.documentElement.style.setProperty('--chakra-colors-accent-600', nextAccentColor600)
    document.documentElement.style.setProperty('--chakra-colors-accent-700', nextAccentColor700)
    document.documentElement.style.setProperty('--chakra-colors-accent-800', nextAccentColor800)
    document.documentElement.style.setProperty('--chakra-colors-accent-900', nextAccentColor900)
    setAccentColor(nextAccentColor)
  }

  return (
    <IconButton
      icon={<AccentPickerIcon color={accentColor} />}
      isRound
      variant="ghost"
      onClick={updateAccentColor}
      aria-label={`Switch accent color to ${nextAccentColor}`}
    />
  )
}

export {AccentPicker}
