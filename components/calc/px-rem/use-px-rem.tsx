import {useLocalStorageValue} from '@react-hookz/web'
import {round} from '../../../lib/utils'

function px2rem(baseSize: string, targetSize: string) {
  return round(+targetSize / +baseSize)
}

function rem2px(baseSize: string, targetSize: string) {
  return round(+targetSize * +baseSize)
}

function usePxRem(initialValues: {base: string; pixels: string}) {
  const [base, setBase] = useLocalStorageValue(
    'calc/px-rem__base',
    initialValues.base
  )
  const [pixels, setPixels] = useLocalStorageValue(
    'calc/px-rem__pixels',
    initialValues.pixels
  )
  const [rems, setRems] = useLocalStorageValue(
    'calc/px-rem__rems',
    px2rem(initialValues.base, initialValues.pixels)
  )

  function onBaseChange(b: string) {
    setBase(b)
    setRems(px2rem(b, pixels))
  }

  function onPixelsChange(p: string) {
    setPixels(p)
    setRems(px2rem(base, p))
  }

  function onRemsChange(r: string) {
    setRems(r)
    setPixels(rem2px(base, r))
  }

  return [
    {
      base,
      pixels,
      rems,
    },
    {
      onBaseChange,
      onPixelsChange,
      onRemsChange,
    },
  ] as const
}

export {usePxRem}
