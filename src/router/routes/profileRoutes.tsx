// import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import { ProtectedRoute } from '../guards/ProtectedRoute'
import ProfileLayout from '@/layouts/ProfileLayout'
import { lazy } from 'react'

const ProfilePage = lazy(() => import('@/pages/profile/information.page'))
const SecurityPage = lazy(() => import('@/pages/profile/security.page'))
const SettingsPage = lazy(() => import('@/pages/profile/settings.page'))

export const profileRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute redirectTo="/login">
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/profile/information', element: <ProfilePage /> },
      { path: '/profile/security', element: <SecurityPage /> },
      { path: '/profile/settings', element: <SettingsPage /> },
    ],
  },
]
