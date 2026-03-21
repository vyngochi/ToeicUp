export const STEPS = [
  { id: 1, title: 'Tài khoản' },
  { id: 2, title: 'Bảo mật' },
  { id: 3, title: 'Mục tiêu' },
]

export const STEP_FIELDS = {
  1: ['firstName', 'lastName', 'email'],
  2: ['password', 'confirm'],
  3: ['targetScore', 'wordsPerDay'],
} as const
