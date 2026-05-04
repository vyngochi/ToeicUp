import { setPasswordMe } from '@/services/auth.service'
import type { SetPasswordMePayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSetPasswordMe = () => {
  return useMutation({
    mutationKey: ['setPasswordMe'],
    mutationFn: async (payload: SetPasswordMePayload) => {
      const response = await setPasswordMe(payload)

      return response.data.message
    },
    onSuccess(data) {
      toast(data)
    },
    onError(error) {
      handleServerError(error)
    },
  })
}
