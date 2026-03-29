// import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import MainLayout from '@/layouts/MainLayout'
import { ProtectedRoute } from '../guards/ProtectedRoute'

export const learningRoutes: RouteObject[] = [
  {
    path: 'toeicup',
    element: (
      <ProtectedRoute redirectTo="/login">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ path: 'dashboard', element: <div>heheheheh</div> }],
  },
]
