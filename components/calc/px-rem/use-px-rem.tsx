import { useLocalStorageValue } from '@react-hookz/web'
import { round } from '../../../lib/utils'

function px2rem(baseSize: string, targetSize: string) {
	return round(+targetSize / +baseSize)
}

function rem2px(baseSize: string, targetSize: string) {
	return round(+targetSize * +baseSize)
}

function usePxRem(initialValues: { base: string; pixels: string }) {
	const { value: base, set: setBase } = useLocalStorageValue(
		'calc/px-rem__base',
		{
			defaultValue: initialValues.base,
		},
	)
	const { value: pixels, set: setPixels } = useLocalStorageValue(
		'calc/px-rem__pixels',
		{
			defaultValue: initialValues.pixels,
		},
	)
	const { value: rems, set: setRems } = useLocalStorageValue(
		'calc/px-rem__rems',
		{
			defaultValue: px2rem(initialValues.base, initialValues.pixels),
		},
	)

	function onBaseChange(b: string) {
		setBase(b)
		setRems(px2rem(b, pixels ?? '0'))
	}

	function onPixelsChange(p: string) {
		setPixels(p)
		setRems(px2rem(base ?? '0', p))
	}

	function onRemsChange(r: string) {
		setRems(r)
		setPixels(rem2px(base ?? '0', r))
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

export { usePxRem }
