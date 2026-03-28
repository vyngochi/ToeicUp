import { useEffect, useRef, useState } from 'react'

export const useStepScroll = () => {
  const [activeStep, setActiveStep] = useState(0)
  const stepRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    stepRef.current.forEach((el, idx) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(idx + 1)
          }
        },
        { threshold: 0.6, rootMargin: '0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return { activeStep, stepRef }
}
