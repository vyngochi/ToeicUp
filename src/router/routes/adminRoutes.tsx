// import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import MainLayout from '@/layouts/MainLayout'
import { ProtectedRoute } from '../guards/ProtectedRoute'
import { lazy } from 'react'
import WordSetAdmin from '@/pages/admin/vocabulary-management'

const WordSetAdminPage = lazy(
  () => import('./../../pages/admin/vocabulary-management/word-set-admin/word-set-admin.page'),
)

const VocabAdminPage = lazy(
  () => import('./../../pages/admin/vocabulary-management/vocab-admin/vocab-admin.page'),
)

export const adminRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute redirectTo="/login">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <div>heheheheh</div> },
      {
        path: 'admin',
        element: <WordSetAdmin />,
        children: [
          { index: true, element: <Navigate to="word-set" replace /> },
          { path: 'word-set', element: <WordSetAdminPage /> },
          { path: 'vocab/:word-set-name/:wordSetId', element: <VocabAdminPage /> },
        ],
      },
    ],
  },
]
