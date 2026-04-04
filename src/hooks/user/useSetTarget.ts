import { USER_MESSAGE } from '@/messages/user.message'
import { setTargetService } from '@/services/user.service'
import type { Target } from '@/types/user.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSetTarget = () => {
  return useMutation({
    mutationKey: ['target-setting'],
    mutationFn: async (payload: Target) => {
      const response = await setTargetService(payload)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(USER_MESSAGE.SET_TARGET(data.data.targetScore, data.data.wordsPerDay))
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
