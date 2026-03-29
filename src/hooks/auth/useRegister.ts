import { IS_VERIFIED } from '@/lib/env'
import { AUTH_MESSAGE } from '@/messages/auth.message'
import { registerService, verifyRegisterEmail } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { RegisterPayload, VerifyEmailPayload } from '@/types/auth.types'
import type { RegisterError, VerifyError } from '@/types/error.types'
import type { NormalizedError } from '@/types/system.types'
import { setStorage } from '@/utils/sessionHelper'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface Props {
  setStep: (v: number) => void
}
export const useRegister = ({ setStep }: Props) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (payload: RegisterPayload) => {
      const response = await registerService(payload)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setStorage(JSON.stringify(true), IS_VERIFIED)
      navigate('/verify-email')
    },
    onError: (error: NormalizedError<RegisterError>) => {
      if (error.errors?.Email || error.errors?.email) {
        setStep(1)
      } else if (error.errors?.Password) {
        setStep(2)
      }
      toast.error(error.errors?.email ?? error.errors?.Email ?? error.errors?.Password?.[0])
    },
  })
}

export const useVerifyEmailRegister = () => {
  const navigate = useNavigate()
  const loginStore = useAuthStore((s) => s.login)
  return useMutation({
    mutationKey: ['verify-email'],
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await verifyRegisterEmail(payload)
      return response.data
    },
    onSuccess: (data) => {
      loginStore(data.accessToken, data.user, true)
      toast.success(AUTH_MESSAGE.REGISTER.SUCCESS)
      navigate('/toeicup/dashboard')
    },
    onError: (error: NormalizedError<VerifyError>) => {
      toast.error(error.message || error.errors?.token)
    },
  })
}
