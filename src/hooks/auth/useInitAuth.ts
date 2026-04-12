import { AUTH_MESSAGE } from '@/messages/auth.message'
import { refreshService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useInitAuth = () => {
  const loginStore = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)

  return useQuery({
    queryKey: ['auth', 'init'],
    queryFn: async () => {
      try {
        const response = await refreshService()
        const data = response.data

        loginStore(data.data?.accessToken!, data.data?.user!, data.data?.isSettingGoal!)
      } catch (error: any) {
        if (error?.response?.data?.statusCode !== 400) {
          toast.error(error?.response?.data?.message || AUTH_MESSAGE.REFRESH.FAILED)
        }

        logout()

        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  })
}
