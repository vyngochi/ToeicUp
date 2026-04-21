export type UserResponse = {
  Id: string
  Email: string
  FirstName: string
  LastName: string
  DisplayName: string
  Role: string
  TargetScore: number | null
  Streak: number
  Bio: string
  IsActive: boolean
  AvatarUrl: string | null
  WordsPerDay: number | null
  IsLoginExternal: boolean | null
}

export type UploadAvatarResponse = { AvatarUrl: string | null }

export type Target = {
  targetScore: number
  wordsPerDay: number
}

export type UpdateUserInformationPayload = {
  email: string
  firstName: string
  lastName: string
  bio: string
}

export type UploadAvatarPayload = {
  avatarUrl: string
}
