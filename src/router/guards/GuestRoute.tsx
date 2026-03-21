import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/global/authStore'
import type { ReactNode } from 'react'

interface GuestRouteProps {
  children: ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
