import { getDashboardWordSets } from '@/services/learning.service'
import { useQuery } from '@tanstack/react-query'

export const useGetDashboardWordSets = () => {
  return useQuery({
    queryKey: ['get-dashboard-word-sets'],
    queryFn: async () => {
      const response = await getDashboardWordSets()
      return response.data.data
    },
    staleTime: 300000,
  })
}
