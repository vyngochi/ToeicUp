import AuthLayout, { AuthLayoutNoTabs } from '@/layouts/AuthLayout'
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { SuspenseWrapper } from '../guards/LazyLoading'
import { GuestRoute } from '../guards/GuestRoute'

const LoginPage = lazy(() => import('@/features/authentication/components/LoginForm'))
const RegisterPage = lazy(() => import('@/features/authentication/components/Register'))
const ForgotPasswordPage = lazy(
  () => import('@/features/authentication/components/ForgotPasswordForm'),
)
const ResetPasswordPage = lazy(
  () => import('@/features/authentication/components/ResetPasswordForm'),
)
const VerifyEmailPage = lazy(() => import('@/features/authentication/components/VerifyEmail'))

const SetNewPasswordPage = lazy(() => import('@/features/authentication/components/SetNewPassword'))

export const authRoutes: RouteObject[] = [
  {
    element: (
      <GuestRoute redirectTo="/dashboard">
        <AuthLayout />
      </GuestRoute>
    ),
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
            ``
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    element: (
      <GuestRoute>
        <AuthLayoutNoTabs />
      </GuestRoute>
    ),
    children: [
      {
        path: '/reset-password',
        element: (
          <SuspenseWrapper name="Forgot Password Form">
            <ResetPasswordPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/verify-email',
        element: (
          <SuspenseWrapper name="Forgot Password Form">
            <VerifyEmailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/set-password',
        element: (
          <SuspenseWrapper name="Forgot Password Form">
            <SetNewPasswordPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]
