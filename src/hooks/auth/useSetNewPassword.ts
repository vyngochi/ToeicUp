import { setNewPassService } from '@/services/auth.service'
import type { ResetPasswordPayload as SetNewPasswordPayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useSetNewPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['set-new-pass'],
    mutationFn: async (payload: SetNewPasswordPayload) => {
      const response = await setNewPassService(payload)
      return response.data
    },
    onSuccess: () => {
      toast.success('Your password is set')
      navigate('/login')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
