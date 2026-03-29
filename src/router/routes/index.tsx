import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import { GuestRoute } from '../guards/GuestRoute'
import { authRoutes } from './authRoutes'
import { SuspenseWrapper } from '../guards/LazyLoading'
import { learningRoutes } from './learningRoutes'

//Lazy Loading
const LandingPage = lazy(() => import('@/pages/LandingPage'))

export const router = createBrowserRouter([
  //Public
  {
    path: '/',
    element: (
      <SuspenseWrapper name="Landing Page">
        <GuestRoute redirectTo="/toeicup/dashboard">
          <LandingPage />
        </GuestRoute>
      </SuspenseWrapper>
    ),
  },

  //Authentication
  ...authRoutes,
  ...learningRoutes,
])
