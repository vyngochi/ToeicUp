import { TEMPORARY_MAIL_KEY } from '@/lib/env'
import { AUTH_MESSAGE } from '@/messages/auth.message'
import { loginGoogleService, loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { LoginPayload, LoginWithGooglePayload } from '@/types/auth.types'
import type { NormalizedError } from '@/types/system.types'
import { removeStorage } from '@/utils/sessionHelper'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogin = () => {
  const loginStore = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['Login'],
    mutationFn: async (payload: LoginPayload) => {
      const response = await loginService(payload)
      return response.data
    },
    onSuccess: (data) => {
      toast.success('Login successfully', { position: 'top-center' })
      loginStore(data.accessToken, data.user, true)
      removeStorage([TEMPORARY_MAIL_KEY])
      navigate('/toeicup/dashboard')
    },
    onError: (error: NormalizedError) => {
      toast.error(error.message, { position: 'top-center' })
    },
  })
}

export const useLoginWithGoogleServer = () => {
  const navigate = useNavigate()
  const loginStore = useAuthStore((s) => s.login)
  return useMutation({
    mutationKey: ['LoginWithGoogle'],
    mutationFn: async (payload: LoginWithGooglePayload) => {
      const response = await loginGoogleService(payload)
      return response.data
    },
    onSuccess: (data) => {
      loginStore(data.accessToken, data.user, true)
      toast.success(AUTH_MESSAGE.LOGIN.SUCCESS)
      navigate('/toeicup/dashboard')
    },
    onError: (error: NormalizedError) => {
      toast.error(error.message)
    },
  })
}

export const useLoginWithGoogle = () => {
  const mutation = useLoginWithGoogleServer()

  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential

    await mutation.mutateAsync({ idToken: idToken })
  }

  return { handleSuccess, isPending: mutation.isPending }
}
