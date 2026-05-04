import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface LazySpinnerProps {
  name: string
}
export const DotEffect = () => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  })

  return dots
}
const LazySpinner = ({ name = 'TOEIC Up' }: LazySpinnerProps) => {
  return (
    <StyledWrapper>
      <div className="loader" />
      <h3>
        Loading {name} <DotEffect />
      </h3>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  min-height: 100vh;

  .loader {
    width: 50px;
    height: 50px;
    position: relative;
    z-index: 1000;
  }

  .loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: #999;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  .loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: rgb(224, 162, 37);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
`

export default LazySpinner
