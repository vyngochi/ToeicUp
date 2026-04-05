import type { ApiErrorResponse } from '@/types/system.types'
import { toast } from 'sonner'

export const extractFirstFieldError = (errors?: Record<string, string[]>) => {
  if (!errors) return null
  const firstKey = Object.keys(errors)[0]
  if (!firstKey) return null
  return errors[firstKey][0]
}

export const handleServerError = (error: any, customMsg?: string) => {
  const serverError = error.response?.data as ApiErrorResponse

  const errMsg = extractFirstFieldError(serverError?.errors)
  toast.error(errMsg || serverError?.message || customMsg || 'Lỗi kết nối server')
}
