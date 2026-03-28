import 'axios'
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

export interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export interface NormalizedError {
  status: number
  message: string
  errors?: Record<string, string[]>
}
