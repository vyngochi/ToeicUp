// import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import { ProtectedRoute } from '../guards/ProtectedRoute'
import ProfileLayout from '@/layouts/ProfileLayout'
import { lazy } from 'react'

const ProfilePage = lazy(() => import('@/pages/profile/infomation.page'))

export const profileRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute redirectTo="/login">
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [{ path: '/profile/information', element: <ProfilePage /> }],
  },
]
