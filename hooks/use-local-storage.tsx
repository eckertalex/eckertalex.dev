/*
  adapted from https://github.com/streamich/react-use (licensed under `The Unlicense`)
 */
import React from 'react'

const isBrowser = typeof window !== 'undefined'
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

type parserOptions<T> =
  | {
      raw: true
    }
  | {
      raw: false
      serializer: (value: T) => string
      deserializer: (value: string) => T
    }

const useLocalStorage = <T,>(
  key: string,
  initialValue?: T,
  options?: parserOptions<T>
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void] => {
  if (!isBrowser) {
    return [initialValue as T, noop, noop]
  }
  if (!key) {
    throw new Error('useLocalStorage key may not be falsy')
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deserializer = React.useMemo(
    () => (options ? (options.raw ? (value: string) => value : options.deserializer) : JSON.parse),
    [options]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = React.useRef((key: string) => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify

      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        return deserializer(localStorageValue)
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue))
        return initialValue
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = React.useState<T | undefined>(() => initializer.current(key))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useLayoutEffect(() => setState(initializer.current(key)), [key])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === 'function'
            ? (valOrFunc as (prevState: T | undefined) => T | undefined)(state)
            : valOrFunc
        if (typeof newState === 'undefined') return
        let value: string

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState
            else value = JSON.stringify(newState)
          else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        else value = JSON.stringify(newState)

        localStorage.setItem(key, value)
        setState(deserializer(value))
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [deserializer, key, options, state]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = React.useCallback(() => {
    try {
      localStorage.removeItem(key)
      setState(undefined)
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState])

  return [state, set, remove]
}

export {useLocalStorage}
