import { create } from 'zustand'
import { defaultHeroContent, type HeroContent } from '@/data/landingContent'

interface LandingState {
  heroContent: HeroContent
  updateHeroContent: (content: Partial<HeroContent>) => void
  resetHeroContent: () => void
}

export const useLandingStore = create<LandingState>((set) => ({
  heroContent: defaultHeroContent,

  updateHeroContent: (content) =>
    set((s) => ({
      heroContent: { ...s.heroContent, ...content },
    })),

  resetHeroContent: () => set({ heroContent: defaultHeroContent }),
}))
