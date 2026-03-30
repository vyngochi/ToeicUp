import { useEffect, useState } from 'react'

export const useInitAppTimeout = () => {
  const [timeoutReached, setTimeoutReached] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return timeoutReached
}
