import { refreshService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/global/authStore'
import type { ApiErrorResponse } from '@/types/system.types'
import { normalizeError } from '@/utils/normalizeError'
import axios, { AxiosError } from 'axios'

type QueueItem = {
  resolve: (token: string | null) => void
  reject: (err: Error | null) => void
}
let isRefreshing = false
let failedQueue: QueueItem[] = []

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND,
  withCredentials: true,
})

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

function processQueue(error: AxiosError<ApiErrorResponse> | null, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ApiErrorResponse>) => {
    if (err.response?.status === 401 && err.config && !err.config._retry) {
      if (isRefreshing)
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
      isRefreshing = true
      try {
        const data = await refreshService()
        useAuthStore.getState().setAccessToken(data.data.accessToken)
        processQueue(null, data.data.accessToken)
        err.config._retry = true
        return api(err.config)
      } catch (error: any) {
        processQueue(error.message ?? error.errors, null)
        useAuthStore.getState().logout()
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(normalizeError(err))
  },
)

export { api, refreshApi }
