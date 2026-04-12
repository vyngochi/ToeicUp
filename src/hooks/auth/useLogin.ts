import { TEMPORARY_MAIL_KEY } from '@/lib/env'
import { AUTH_MESSAGE } from '@/messages/auth.message'
import { loginGoogleService, loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { LoginPayload, LoginWithGooglePayload } from '@/types/auth.types'
import { handleServerError } from '@/utils/handleServerError'
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
      loginStore(data.data?.accessToken!, data.data?.user!, data.data?.isSettingGoal!)
      toast.success(data.message || AUTH_MESSAGE.LOGIN.SUCCESS)
      removeStorage([TEMPORARY_MAIL_KEY])
      navigate('/dashboard')
    },
    onError: (error: any) => {
      handleServerError(error)
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
      loginStore(data.data?.accessToken!, data.data?.user!, data.data?.isSettingGoal!)
      toast.success(data.message || AUTH_MESSAGE.LOGIN.SUCCESS)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      handleServerError(error)
    },
  })
}

export const useLoginWithGoogle = () => {
  const mutation = useLoginWithGoogleServer()

  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential
    await mutation.mutateAsync({ idToken: idToken })
  }

  return { handleSuccess, isPending: mutation.isPending, isSuccess: mutation.isSuccess }
}
