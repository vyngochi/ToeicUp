import { sendMailForgotPassword } from '@/services/auth.service'
import type { ForgotPayload } from '@/types/auth.types'
import type { NormalizedError } from '@/types/system.types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSendMailForgot = () => {
  return useMutation({
    mutationKey: ['send-mail'],
    mutationFn: async (payload: ForgotPayload) => {
      const response = await sendMailForgotPassword(payload)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error: NormalizedError) => {
      toast.error(error.message)
    },
  })
}
