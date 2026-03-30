import { USER_MESSAGE } from '@/messages/user.message'
import { setTargetService } from '@/services/user.service'
import type { NormalizedError } from '@/types/system.types'
import type { Target } from '@/types/user.types'
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
    onError: (error: NormalizedError<{ message: string }>) => {
      toast.error(error.errors?.message || error.message)
    },
  })
}
