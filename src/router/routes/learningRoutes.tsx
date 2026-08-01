// import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
// import { SuspenseWrapper } from '../guards/LazyLoading'
import MainLayout from '@/layouts/MainLayout'
import { ProtectedRoute } from '../guards/ProtectedRoute'
import { lazy } from 'react'
import VocabularyPage from '@/pages/learning/vocabulary'

const WordSetPage = lazy(() => import('../../pages/learning/vocabulary/word-sets.page'))
const WordTablePage = lazy(() => import('../../pages/learning/vocabulary/word-table.page'))
const SrsReviewPage = lazy(() => import('../../pages/learning/vocabulary/srs-review.page'))
const FlashcardDashboardPage = lazy(
  () => import('../../pages/learning/vocabulary/flashcard-dashboard.page'),
)
const DashboardPage = lazy(() => import('../../pages/learning/dashboard.page'))

export const learningRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute redirectTo="/login">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      {
        path: 'vocabulary',
        element: <VocabularyPage />,
        children: [
          { index: true, element: <Navigate to="word-sets" replace /> },
          { path: 'word-sets', element: <WordSetPage /> },
          { path: 'word-set/:name/:wordSetId', element: <WordTablePage /> },
          { path: 'flashcard', element: <FlashcardDashboardPage /> },
        ],
      },
    ],
  },
  {
    path: 'learning/srs-review',
    element: (
      <ProtectedRoute redirectTo="/login">
        <SrsReviewPage />
      </ProtectedRoute>
    ),
  },
]
