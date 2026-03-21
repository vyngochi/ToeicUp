import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/global/authStore'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ returnUrl: location.pathname + location.search }} />
    )
  }

  return <>{children}</>
}
