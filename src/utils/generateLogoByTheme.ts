import type { Theme } from '@/stores/global/themeStore'
import LogoLight from '@/assets/images/toeicup-logo.png'
import LogoDark from '@/assets/images/toeicup-logo-white.png'

export const generateLogo = (theme: Theme) => {
  return theme === 'light' ? LogoLight : LogoDark
}
