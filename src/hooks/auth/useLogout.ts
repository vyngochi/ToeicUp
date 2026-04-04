import { AUTH_MESSAGE } from '@/messages/auth.message'
import { logoutService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => {
      const response = await logoutService()
      return response.data
    },
    onSuccess: (data) => {
      logout()
      queryClient.clear()
      toast.success(data.message || AUTH_MESSAGE.LOGOUT.SUCCESS)
      navigate('/login')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
