import { api } from '@/configs/axios'
import type { Target, TargetSettingResponse } from '@/types/user.types'

export const setTargetService = (payload: Target) => {
  return api.put<TargetSettingResponse>('/api/Users/me/target', payload)
}
