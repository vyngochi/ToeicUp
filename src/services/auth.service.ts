import { api, refreshApi } from '@/configs/axios'
import type {
  LoginPayload,
  LoginWithGooglePayload,
  ForgotPayload,
  ResetPasswordPayload,
  RegisterPayload,
  VerifyEmailPayload,
  AuthResponse,
} from '@/types/auth.types'
import type { CommonResponse } from '@/types/system.types'

export const loginService = (payload: LoginPayload) => {
  return api.post<CommonResponse<AuthResponse>>('/api/auth/login', payload)
}

export const registerService = (payload: RegisterPayload) => {
  return api.post<CommonResponse<AuthResponse>>('/api/auth/register', payload)
}

export const verifyRegisterEmail = (payload: VerifyEmailPayload) => {
  return api.post<CommonResponse<AuthResponse>>('/api/auth/verify-email', payload)
}

export const loginGoogleService = (payload: LoginWithGooglePayload) => {
  return api.post<CommonResponse<AuthResponse>>('/api/auth/google', payload)
}

export const refreshService = () => {
  return refreshApi.post<CommonResponse<AuthResponse>>('/api/auth/refresh')
}

export const logoutService = () => {
  return api.post<CommonResponse<undefined>>('/api/auth/logout')
}

export const sendMailForgotPassword = (payload: ForgotPayload) => {
  return api.post<CommonResponse<undefined>>('/api/auth/forgot-password', payload)
}

export const resetPasswordService = (payload: ResetPasswordPayload) => {
  return api.post<CommonResponse<undefined>>('/api/auth/reset-password', payload)
}

export const setNewPassService = (payload: ResetPasswordPayload) => {
  return api.post<CommonResponse<undefined>>('/api/auth/set-password', payload)
}
