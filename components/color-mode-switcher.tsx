import {useColorMode, useColorModeValue, IconButton} from '@chakra-ui/react'
import {Moon as MoonIcon, Sun as SunIcon} from 'lucide-react'

function ColorModeSwitcher() {
  const {toggleColorMode} = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      isRound
      aria-label={`Switch to ${text} mode`}
    />
  )
}

export {ColorModeSwitcher}
