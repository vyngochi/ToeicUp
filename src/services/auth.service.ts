import { api, refreshApi } from '@/configs/axios'
import type {
  LogoutResponse,
  LoginPayload,
  LoginResponse,
  LoginWithGooglePayload,
  LogoutResponse as ForgotResponse,
  ForgotPayload,
  LogoutResponse as ResetResponse,
  ResetPasswordPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  LoginResponse as VeifyEmailResponse,
} from '@/types/auth.types'

export const loginService = (payload: LoginPayload) => {
  return api.post<LoginResponse>('/api/Auth/login', payload)
}

export const registerService = (payload: RegisterPayload) => {
  return api.post<RegisterResponse>('/api/Auth/register', payload)
}

export const verifyRegisterEmail = (payload: VerifyEmailPayload) => {
  return api.post<VeifyEmailResponse>('/api/Auth/verify-email', payload)
}

export const loginGoogleService = (payload: LoginWithGooglePayload) => {
  return api.post<LoginResponse>('/api/Auth/google', payload)
}

export const refreshService = () => {
  return refreshApi.post<LoginResponse>('/api/Auth/refresh')
}

export const logoutService = () => {
  return api.post<LogoutResponse>('/api/Auth/logout')
}

export const sendMailForgotPassword = (payload: ForgotPayload) => {
  return api.post<ForgotResponse>('/api/Auth/forgot-password', payload)
}

export const resetPasswordService = (payload: ResetPasswordPayload) => {
  return api.post<ResetResponse>('/api/Auth/reset-password', payload)
}

export const setNewPassService = (payload: ResetPasswordPayload) => {
  return api.post<ResetResponse>('/api/Auth/set-password', payload)
}
