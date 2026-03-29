import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/stores/global/authStore'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = '/' }: ProtectedRouteProps) {
  const accessToken = useAuthStore((s) => s.accessToken)

  if (!accessToken) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
