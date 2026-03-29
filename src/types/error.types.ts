export type RegisterError = {
  email: string
  Email?: string[]
  Password?: string[]
  TargetScore?: string[]
  WordsPerDay?: string[]
}

export type VerifyError = {
  token: string
}
