import type { UserResponse } from '@/types/user.types'
import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  user: UserResponse | null
  isAuthenticated: boolean
  isSettingGoal: boolean
  setAccessToken: (token: string) => void
  login: (token: string, user: UserResponse, isAuthenticated: boolean) => void
  logout: () => void
  setIsSettingGoal: (v: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isSettingGoal: false,
  isAuthenticated: false,
  setAccessToken: (token) => set({ accessToken: token }),
  login: (token, user, isSettingGoal) =>
    set({ accessToken: token, user: user, isSettingGoal: isSettingGoal }),
  logout: () => set({ accessToken: null, user: null, isAuthenticated: false }),
  setIsSettingGoal: (v: boolean) => set({ isSettingGoal: v }),
}))
