import { USER_MESSAGE } from '@/messages/user.message'
import { setTargetService } from '@/services/user.service'
import { useUserStore } from '@/stores/global/userStore'
import type { Target } from '@/types/user.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSetTarget = () => {
  const updateGoal = useUserStore((s) => s.updateGoal)
  return useMutation({
    mutationKey: ['target-setting'],
    mutationFn: async (payload: Target) => {
      const response = await setTargetService(payload)
      return response.data
    },
    onSuccess: async (data) => {
      await updateGoal(data.data?.targetScore!, data.data?.wordsPerDay!)
      toast.success(
        data.message || USER_MESSAGE.SET_TARGET(data.data?.targetScore!, data.data?.wordsPerDay!),
      )
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
