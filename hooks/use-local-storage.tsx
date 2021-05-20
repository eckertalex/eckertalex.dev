import React from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const readValue = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = React.useState<T>(readValue)

  const setValue = (value: T) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value

      window.localStorage.setItem(key, JSON.stringify(newValue))

      setStoredValue(newValue)

      // dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      return
    }
  }

  React.useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  React.useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange)

    // this is a custom event, triggered in writeValueToLocalStorage
    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue]
}

export {useLocalStorage}
