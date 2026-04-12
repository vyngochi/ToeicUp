import { AUTH_MESSAGE } from '@/messages/auth.message'
import { setNewPassService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { ResetPasswordPayload as SetNewPasswordPayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useSetNewPassword = () => {
  const navigate = useNavigate()
  const loginStore = useAuthStore((s) => s.login)
  return useMutation({
    mutationKey: ['set-new-pass'],
    mutationFn: async (payload: SetNewPasswordPayload) => {
      const response = await setNewPassService(payload)
      return response.data
    },
    onSuccess: (data) => {
      loginStore(data.data?.accessToken!, data.data?.user!, data.data?.isSettingGoal!)
      toast.success(data.message || AUTH_MESSAGE.SET_PASSWORD.SUCCESS)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
