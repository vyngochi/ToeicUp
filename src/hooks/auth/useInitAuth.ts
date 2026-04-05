import { refreshService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import { useQuery } from '@tanstack/react-query'

export const useInitAuth = () => {
  const loginStore = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const setIsSettingGoal = useAuthStore((s) => s.setIsSettingGoal)

  return useQuery({
    queryKey: ['auth', 'init'],
    queryFn: async () => {
      const response = await refreshService()
      const data = response.data.data
      if (data) {
        loginStore(data.accessToken, data.user, true)
        setIsSettingGoal(data.isSettingGoal!)
      } else {
        logout()
      }
      return data
    },
    retry: false,
    // staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
