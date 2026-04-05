export type UserResponse = {
  Id: string
  Email: string
  DisplayName: string
  Role: string
  TargetScore: number | null
  Streak: number
  IsActive: boolean
  AvatarUrl: string | null
  WordsPerDay: number | null
  IsLoginExternal: boolean | null
}

export type Target = {
  targetScore: number
  wordsPerDay: number
}
