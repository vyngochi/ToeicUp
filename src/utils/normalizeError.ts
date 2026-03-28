// utils/normalizeError.ts
import type { ApiErrorResponse, NormalizedError } from '@/types/system.types'
import { AxiosError } from 'axios'

export const normalizeError = (err: AxiosError<ApiErrorResponse>): NormalizedError => {
  const status = err.response?.status ?? 500
  const data = err.response?.data

  const message = data?.message ?? extractFirstFieldError(data?.errors) ?? err.message

  return {
    status,
    message,
    errors: data?.errors,
  }
}

const extractFirstFieldError = (errors?: Record<string, string[]>): string | undefined => {
  if (!errors) return undefined
  return Object.values(errors)[0]?.[0]
}
