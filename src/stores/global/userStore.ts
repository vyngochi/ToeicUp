import { create } from 'zustand'
import { useAuthStore } from './authStore'
import { toast } from 'sonner'

interface UserStore {
  isUpdateGoalLoading: boolean
  targetScore: number | null
  wordsPerDay: number | null
  updateGoal: (newTargetScore: number, newWordsPerDay: number) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  isUpdateGoalLoading: false,
  targetScore: null,
  wordsPerDay: null,

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
}))
