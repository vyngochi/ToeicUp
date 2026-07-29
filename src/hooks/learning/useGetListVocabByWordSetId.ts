import { getListVocabularyByWordSetId } from '@/services/learning.service'
import type { GetListVocabRequest } from '@/types/request.types'
import { useQuery } from '@tanstack/react-query'

export const useGetListVocabByWordSetId = (payload: GetListVocabRequest) => {
  return useQuery({
    queryKey: ['vocabs', payload],
    queryFn: async () => {
      const response = await getListVocabularyByWordSetId(payload)
      return response.data.data
    },
  })
}
