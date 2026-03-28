import { AUTH_MESSAGE } from '@/messages/auth.message'
import { resetPasswordService } from '@/services/auth.service'
import type { ResetPasswordPayload } from '@/types/auth.types'
import type { NormalizedError } from '@/types/system.types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useResetPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['reset-pass'],
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await resetPasswordService(payload)
      return response.data
    },
    onSuccess: () => {
      toast.success(AUTH_MESSAGE.FORGOT.CHANGE_PASS)
      navigate('/login')
    },
    onError: (error: NormalizedError) => {
      toast.error(error.message)
    },
    retry: false,
  })
}
