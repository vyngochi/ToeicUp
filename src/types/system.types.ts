import 'axios'
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

export interface CommonResponse<T> {
  statusCode: number
  message: string
  data?: T
}

export interface ApiErrorResponse {
  statusCode: string
  message: string
  errors?: Record<string, string[]>
}
