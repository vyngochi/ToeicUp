// import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import MainLayout from '@/layouts/MainLayout'

export const learningRoutes: RouteObject[] = [
  {
    path: 'toeicup',
    element: <MainLayout />,
    children: [{ path: 'dashboard', element: <div>heheheheh</div> }],
  },
]
