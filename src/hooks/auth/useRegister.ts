import { IS_VERIFIED, STORAGE_KEY } from '@/lib/env'
import { AUTH_MESSAGE } from '@/messages/auth.message'
import { registerService, verifyRegisterEmail } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { RegisterPayload, VerifyEmailPayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
import { removeStorage, setStorage } from '@/utils/sessionHelper'
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
      setStorage(JSON.stringify(true), IS_VERIFIED)
      removeStorage([STORAGE_KEY])
      setStep(1)
      toast.success(data.message)
      navigate('/verify-email')
    },
    onError: (error: any) => {
      const errorData = error.response.data
      if (errorData.errors?.email) {
        setStep(1)
      } else if (errorData.errors?.password) {
        setStep(2)
      }
      handleServerError(error)
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
      return response.data.data
    },
    onSuccess: (data) => {
      loginStore(data?.accessToken!, data?.user!, true)
      toast.success(AUTH_MESSAGE.REGISTER.SUCCESS)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}
