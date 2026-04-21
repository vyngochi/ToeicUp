import { uploadAvatar } from '@/services/user.service'
import type { UploadAvatarPayload } from '@/types/user.types'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/stores/global/userStore'
import { toast } from 'sonner'
import { USER_MESSAGE } from '@/messages/user.message'
import { handleServerError } from '@/utils/handleServerError'

export const useUploadAvatar = () => {
  const updateAvatar = useUserStore((s) => s.updateAvatar)
  return useMutation({
    mutationKey: ['upload-avatar'],
    mutationFn: async (payload: UploadAvatarPayload) => {
      const response = await uploadAvatar(payload)
      return response.data.data
    },
    onSuccess: (data) => {
      updateAvatar(data?.AvatarUrl!)
      toast(USER_MESSAGE.UPDATE_AVATAR.SUCCESS)
    },
    onError: (error) => {
      handleServerError(error)
    },
  })
}
