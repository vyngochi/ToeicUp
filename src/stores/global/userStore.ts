import { create } from 'zustand'
import { useAuthStore } from './authStore'
import { toast } from 'sonner'
import { USER_MESSAGE } from '@/messages/user.message'

interface UserStore {
  isUpdateGoalLoading: boolean
  isUpdateAvatarLoading: boolean
  targetScore: number | null
  wordsPerDay: number | null
  newAvatar: string | null
  updateGoal: (newTargetScore: number, newWordsPerDay: number) => Promise<void>
  updateAvatar: (newAvatar: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  isUpdateGoalLoading: false,
  isUpdateAvatarLoading: false,
  targetScore: null,
  wordsPerDay: null,
  newAvatar: null,

  updateGoal: async (newTargetScore: number, newWordsPerDay: number) => {
    set({ isUpdateGoalLoading: true })

    const user = useAuthStore.getState().user

    if (!user?.Id) return

    set({ targetScore: newTargetScore, wordsPerDay: newWordsPerDay })

    try {
      useAuthStore.setState((state) => ({
        user: state.user
          ? { ...state.user, TargetScore: newTargetScore, WordsPerDay: newWordsPerDay }
          : null,
      }))
    } catch {
      toast('Cập nhật mục tiêu thất bại')
    } finally {
      set({ isUpdateGoalLoading: false })
    }
  },

  updateAvatar: async (newAvatar: string) => {
    if (!newAvatar) return
    set({ isUpdateAvatarLoading: true })

    const user = useAuthStore.getState().user

    if (!user?.Id) return

    set({ newAvatar: newAvatar })

    try {
      useAuthStore.setState((state) => ({
        user: state.user ? { ...state.user, AvatarUrl: newAvatar } : null,
      }))
    } catch {
      toast(USER_MESSAGE.UPDATE_AVATAR.FAILED)
    } finally {
      set({ isUpdateAvatarLoading: false })
    }
  },
}))
