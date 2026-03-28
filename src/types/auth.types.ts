import type { UserResponse } from './user.types'

//Login
export type LoginPayload = {
  email: string
  password: string
}

export type LoginWithGooglePayload = {
  idToken: string
}

export type LoginResponse = {
  accessToken: string
  expiresIn: number
  rawRefreshToken: string | null
  user: UserResponse
}

//Logout
export type LogoutResponse = {
  message: string
}

//Forgot
export type MailCount = {
  newCount: number
  sendDate: string | null
}
export type ForgotPayload = {
  email: string
}

//Reset
export type ResetPasswordPayload = {
  token: string
  newPassword: string
  confirmPassword: string
}
