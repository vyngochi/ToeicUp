import { api } from '@/configs/axios'
import type { ListWordSetsResponse } from '@/types/learning.types'
import type { CommonRequest } from '@/types/request.types'
import type { CommonResponse } from '@/types/system.types'

export const getListWordSets = (payload: CommonRequest) => {
  return api.get<CommonResponse<ListWordSetsResponse>>('/api/learning/word-sets', {
    params: payload,
  })
}
