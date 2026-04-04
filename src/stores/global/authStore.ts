import type { UserResponse } from '@/types/user.types'
import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  user: UserResponse | null
  isAuthenticated: boolean
  isLoggedWithGG: boolean
  setAccessToken: (token: string) => void
  login: (token: string, user: UserResponse, isAuthenticated: boolean) => void
  logout: () => void
  setIsLoggedWithGG: (v: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLoggedWithGG: false,
  isAuthenticated: false,
  setAccessToken: (token) => set({ accessToken: token }),
  login: (token, user) => set({ accessToken: token, user: user, isAuthenticated: true }),
  logout: () =>
    set({ accessToken: null, user: null, isAuthenticated: false, isLoggedWithGG: false }),
  setIsLoggedWithGG: (v: boolean) => set({ isLoggedWithGG: v }),
}))
