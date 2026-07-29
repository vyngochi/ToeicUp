import { api } from '@/configs/axios'
import type { CommonRequest } from '@/types/request.types'
import type { ListAllWordSetAdmin } from '@/types/response/list-wordset.types'
import type { CommonResponse } from '@/types/system.types'

export const adminGetAllWordSets = (payload: CommonRequest) => {
  return api.get<CommonResponse<ListAllWordSetAdmin>>('/api/admin/all-word-sets', {
    params: payload,
  })
}

export const deleteWordSet = (wordSetId: string) => {
  return api.put<CommonResponse<undefined>>(`/api/admin/word-set/delete/${wordSetId}`)
}
