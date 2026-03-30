import { refreshService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import { useQuery } from '@tanstack/react-query'

export const useInitAuth = () => {
  const loginStore = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)

  return useQuery({
    queryKey: ['auth', 'refresh'],
    queryFn: async () => {
      try {
        const res = await refreshService()
        loginStore(res.data.accessToken, res.data.user, true)
        return res.data
      } catch (error) {
        logout()
        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  })
}
