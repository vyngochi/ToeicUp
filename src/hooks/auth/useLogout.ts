import { logoutService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { NormalizedError } from '@/types/system.types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => {
      const response = await logoutService()
      return response.data
    },
    onSuccess: () => {
      logout()
      toast.success('Logout successfully', { position: 'top-center' })
      navigate('/login')
    },
    onError: (error: NormalizedError) => {
      toast.error(error.message, { position: 'top-center' })
    },
  })
}
