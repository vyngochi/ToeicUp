import { adminGetAllWordSets } from '@/services/admin/vocabulary.service'
import type { CommonRequest } from '@/types/request.types'
import { useQuery } from '@tanstack/react-query'

export const useGetAllWordSets = (payload: CommonRequest) => {
  return useQuery({
    queryKey: ['admin-word-sets', payload],
    queryFn: async () => {
      const response = await adminGetAllWordSets(payload)
      return response.data
    },
    refetchOnWindowFocus: false,
  })
}
