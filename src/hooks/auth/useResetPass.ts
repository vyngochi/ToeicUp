import { AUTH_MESSAGE } from '@/messages/auth.message'
import { resetPasswordService } from '@/services/auth.service'
import type { ResetPasswordPayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
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
    onSuccess: (data) => {
      toast.success(data.message || AUTH_MESSAGE.FORGOT.CHANGE_PASS)
      navigate('/login')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
    retry: false,
  })
}
