import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/stores/global/authStore'

interface GuestRouteProps {
  children: ReactNode
  condition?: boolean
  redirectTo?: string
}

export function GuestRoute({ children, redirectTo = '/' }: GuestRouteProps) {
  const accessToken = useAuthStore((s) => s.accessToken)

  if (accessToken) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
