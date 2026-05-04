import { getListWordSets } from '@/services/learning.service'
import type { CommonRequest } from '@/types/request.types'
import { useQuery } from '@tanstack/react-query'

export const useGetListWordSets = (payload: CommonRequest) => {
  return useQuery({
    queryKey: ['get-word-sets', payload.searchKey],
    queryFn: async () => {
      const response = await getListWordSets(payload)
      return response.data.data
    },
  })
}
