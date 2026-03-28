import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/global/authStore'
import type { ReactNode } from 'react'

interface GuestRouteProps {
  children: ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
  const accessToken = useAuthStore((s) => s.accessToken)

  if (accessToken) {
    return <Navigate to="/toeicup/dashboard" replace />
  }

  return <>{children}</>
}
