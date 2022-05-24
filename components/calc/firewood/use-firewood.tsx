import {useLocalStorageValue} from '@react-hookz/web'
import {round} from '../../../lib/utils'

function solid2piled(solid: string) {
  return round(+solid * 1.4)
}

function solid2dumping(solid: string) {
  return round(+solid * 2)
}

function piled2solid(piled: string) {
  return round(+piled * 0.7)
}

function piled2dumping(piled: string) {
  return round(+piled * 1.4)
}

function dumping2solid(dumping: string) {
  return round(+dumping / 2)
}

function dumping2piled(dumping: string) {
  return round(+dumping / 0.7)
}

function useFirewood(initialValues: {solidMeter: string}) {
  const [solidMeter, setSolidMeter] = useLocalStorageValue(
    'calc/firewood__solidMeter',
    initialValues.solidMeter
  )
  const [piledMeter, setPiledMeter] = useLocalStorageValue(
    'calc/firewood__piledMeter',
    solid2piled(initialValues.solidMeter)
  )
  const [dumpingVolume, setDumpingVolume] = useLocalStorageValue(
    'calc/firewood__dumpingVolume',
    solid2piled(initialValues.solidMeter)
  )

  function onSolidMeterChange(solid: string) {
    setSolidMeter(solid)
    setPiledMeter(solid2piled(solid))
    setDumpingVolume(solid2dumping(solid))
  }

  function onPiledMeterChange(piled: string) {
    setPiledMeter(piled)
    setSolidMeter(piled2solid(piled))
    setDumpingVolume(piled2dumping(piled))
  }

  function onDumpingVolumeChange(dumping: string) {
    setSolidMeter(dumping2solid(dumping))
    setPiledMeter(dumping2piled(dumping))
    setDumpingVolume(dumping)
  }

  return [
    {
      solidMeter,
      piledMeter,
      dumpingVolume,
    },
    {
      onSolidMeterChange,
      onPiledMeterChange,
      onDumpingVolumeChange,
    },
  ] as const
}

export {useFirewood}
