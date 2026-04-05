import { api } from '@/configs/axios'
import type { CommonResponse } from '@/types/system.types'
import type { Target } from '@/types/user.types'

export const setTargetService = (payload: Target) => {
  return api.put<CommonResponse<Target>>('/api/user/set-goal', payload)
}
