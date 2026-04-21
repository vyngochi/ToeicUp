import { api } from '@/configs/axios'
import type { CommonResponse } from '@/types/system.types'
import type {
  Target,
  UpdateUserInformationPayload,
  UploadAvatarPayload,
  UploadAvatarResponse,
} from '@/types/user.types'

export const setTargetService = (payload: Target) => {
  return api.put<CommonResponse<Target>>('/api/user/set-goal', payload)
}

export const updateUserInformation = (payload: UpdateUserInformationPayload) => {
  return api.put<CommonResponse<undefined>>('/api/user/update-information', payload)
}

export const uploadAvatar = (payload: UploadAvatarPayload) => {
  return api.put<CommonResponse<UploadAvatarResponse>>('/api/user/upload-avatar', payload)
}
