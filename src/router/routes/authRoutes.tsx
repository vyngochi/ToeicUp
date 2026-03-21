import AuthLayout from '@/layouts/AuthLayout'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { SuspenseWrapper } from '../guards/LazyLoading'

const LoginPage = lazy(() => import('@/features/authentication/components/LoginForm'))
const RegisterPage = lazy(() => import('@/features/authentication/components/Register'))
const ForgotPasswordPage = lazy(
  () => import('@/features/authentication/components/ForgotPasswordForm'),
)

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <SuspenseWrapper name="Login Form">
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/register',
        element: (
          <SuspenseWrapper name="Register Form">
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <SuspenseWrapper name="Forgot Password Form">
            <ForgotPasswordPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]
