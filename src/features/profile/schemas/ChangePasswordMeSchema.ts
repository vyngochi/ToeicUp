import z from 'zod'

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
      .max(128, { message: 'Mật khẩu không được vượt quá 128 ký tự' }),
    confirmPassword: z.string().min(1, { message: 'Vui lòng điền mật khẩu xác nhận' }),
  })
  .refine(
    (data) => {
      if (!data.newPassword || !data.confirmPassword) return true
      return data.newPassword === data.confirmPassword
    },
    {
      message: 'Mật khẩu không khớp',
      path: ['confirmPassword'],
    },
  )
