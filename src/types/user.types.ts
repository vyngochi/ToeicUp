export type UserResponse = {
  id: string
  email: string
  displayName: string
  targetScore: number | null
  streak: number
  avatarUrl: string | null
  wordsPerDay: number
}

export type Target = {
  targetScore: number
  wordsPerDay: number
}

export type TargetSettingResponse = {
  message: string
  data: Target
}
