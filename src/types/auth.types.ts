import type { UserResponse } from './user.types'

//Login
export type LoginPayload = {
  email: string
  password: string
}

export type LoginWithGooglePayload = {
  idToken: string
}

export type AuthResponse = {
  accessToken: string
  isSettingGoal: boolean | null
  user: UserResponse
}

//Register
export type RegisterPayload = {
  email: string
  password: string
  firstName: string
  lastName: string
  confirmPassword: string
  targetScore: number
  wordsPerDay: number
}

export type RegisterResponse = {
  userId: string
  email: string
  displayName: string
  message: string
}

export type VerifyEmailPayload = {
  token: string
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
