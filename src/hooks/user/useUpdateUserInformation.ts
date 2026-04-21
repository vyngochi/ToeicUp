import { USER_MESSAGE } from '@/messages/user.message'
import { updateUserInformation } from '@/services/user.service'
import type { UpdateUserInformationPayload } from '@/types/user.types'
import { handleServerError } from '@/utils/handleServerError'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateUserInformation = () => {
  return useMutation({
    mutationKey: ['update-user-info'],
    mutationFn: async (payload: UpdateUserInformationPayload) => {
      return await updateUserInformation(payload)
    },
    onSuccess: (data) => {
      toast(data.data.message || USER_MESSAGE.UPDATE_SUCCESS)
    },
    onError: (error) => {
      handleServerError(error)
    },
  })
}
