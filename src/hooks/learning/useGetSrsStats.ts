import { getSrsStats } from '@/services/learning.service'
import type { SrsStatsResponse } from '@/types/learning.types'
import { useQuery } from '@tanstack/react-query'

export const useGetSrsStats = () => {
  return useQuery({
    queryKey: ['srs-stats'],
    queryFn: async () => {
      const response = await getSrsStats()
      return response.data.data as SrsStatsResponse
    },
    refetchOnWindowFocus: true,
  })
}
