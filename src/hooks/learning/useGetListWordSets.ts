import { getListWordSetsWithTopics } from '@/services/learning.service'
import type { CommonRequest } from '@/types/request.types'
import { useQuery } from '@tanstack/react-query'

export const useGetListWordSetsWithTopics = (payload: CommonRequest) => {
  return useQuery({
    queryKey: ['get-word-sets', payload.searchKey],
    queryFn: async () => {
      const response = await getListWordSetsWithTopics(payload)
      return response.data.data
    },
    refetchOnWindowFocus: false,
    staleTime: 300000,
  })
}
