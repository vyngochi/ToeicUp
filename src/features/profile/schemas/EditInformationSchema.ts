import z from 'zod'

export const EditInformationSchema = z.object({
  email: z.email('Email không hợp lệ'),
  firstName: z.string().min(1, 'Tên không hợp lệ'),
  lastName: z.string().min(1, 'Họ không hợp lệ'),
  bio: z.string(),
})
