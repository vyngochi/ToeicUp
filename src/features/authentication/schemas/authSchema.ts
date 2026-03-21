// features/auth/schemas/loginSchema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
})

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Tên không hợp lệ'),
    lastName: z.string().trim().min(1, 'Họ không hợp lệ'),
    email: z.email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
    confirm: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
    targetScore: z
      .number({ error: 'Vui lòng chọn mục tiêu điểm' })
      .refine((v) => [450, 600, 750, 900].includes(v), 'Mục tiêu không hợp lệ')
      .optional(),

    wordsPerDay: z
      .number({ error: 'Vui lòng chọn số từ mỗi ngày' })
      .refine((v) => [5, 10, 20, 30].includes(v), 'Số từ không hợp lệ')
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.password || !data.confirm) return true
      return data.password === data.confirm
    },
    {
      message: 'Mật khẩu không khớp',
      path: ['confirm'],
    },
  )
