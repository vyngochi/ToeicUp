// src/hooks/useCountdown.ts
import { useState, useEffect, useRef } from 'react'

const COUNTDOWN_KEY = 'vt_forgot_countdown'

export function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const saved = sessionStorage.getItem(COUNTDOWN_KEY)
    if (!saved) return 0

    const { endTime } = JSON.parse(saved)
    const remaining = Math.ceil((endTime - Date.now()) / 1000)

    return remaining > 0 ? remaining : 0
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    const endTime = Date.now() + seconds * 1000
    sessionStorage.setItem(COUNTDOWN_KEY, JSON.stringify({ endTime }))
    setTimeLeft(seconds)
  }

  const clear = () => {
    sessionStorage.removeItem(COUNTDOWN_KEY)
    setTimeLeft(0)
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      sessionStorage.removeItem(COUNTDOWN_KEY)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          sessionStorage.removeItem(COUNTDOWN_KEY)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current!)
  }, [timeLeft > 0])

  const isRunning = timeLeft > 0

  return { timeLeft, isRunning, start, clear }
}
