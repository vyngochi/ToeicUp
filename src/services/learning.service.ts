import { api } from '@/configs/axios'
import type { ListWordSetsResponse } from '@/types/learning.types'
import type { CommonRequest, GetListVocabRequest } from '@/types/request.types'
import type { Vocab, VocabDef } from '@/types/response/list-vocab.types'
import type { CommonResponse, PaginatedResponse } from '@/types/system.types'

export const getListWordSetsWithTopics = (payload: CommonRequest) => {
  return api.get<CommonResponse<ListWordSetsResponse>>('/api/learning/word-sets', {
    params: payload,
  })
}

export const getListVocabularyByWordSetId = (payload: GetListVocabRequest) => {
  return api.get<CommonResponse<PaginatedResponse<Vocab<VocabDef>[]>>>(
    `/api/learning/vocabulary/${payload.wordSetId}`,
    {
      params: {
        pageSize: payload.pageSize,
        pageIndex: payload.pageIndex,
      },
    },
  )
}

export const getSrsStats = () => {
  return api.get<CommonResponse<any>>('/api/learning/srs/stats')
}
