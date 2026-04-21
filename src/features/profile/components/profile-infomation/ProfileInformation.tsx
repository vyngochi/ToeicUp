import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/global/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundPen } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import type z from 'zod'
import { EditInformationSchema } from '../../schemas/EditInformationSchema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useUpdateUserInformation } from '@/hooks/user/useUpdateUserInformation'
import { Spinner } from '@/components/ui/spinner'
import AvatarConfig from './AvatarConfig'

export default function ProfileInformation() {
  const [isEditing, setIsEditing] = useState(false)

  const user = useAuthStore((s) => s.user)
  const [initialData, _] = useState(user)
  const { mutate: update, isPending } = useUpdateUserInformation()

  const form = useForm<z.infer<typeof EditInformationSchema>>({
    resolver: zodResolver(EditInformationSchema),
    defaultValues: {
      email: user?.Email,
      firstName: user?.FirstName,
      lastName: user?.LastName,
      bio: user?.Bio,
    },
  })

  const values = form.watch()

  const isChanged =
    values.email !== initialData?.Email ||
    values.firstName !== initialData.FirstName ||
    values.lastName !== initialData.LastName ||
    values.bio !== initialData.Bio

  const isDisabledField = isPending || !isEditing

  const handleUpdateUserInformation = () => {
    update(form.getValues(), { onSuccess: () => setIsEditing(false) })
  }
  return (
    <div className="w-full flex-col justify-items-center p-5 lg:p-10 xl:p-20">
      <div className="flex w-full items-center justify-between">
        <div className="relative w-fit">
          <AvatarConfig user={user} />
        </div>

        <Button size={'sm'} variant={'outline'} onClick={() => setIsEditing(true)}>
          <UserRoundPen />
          Chỉnh sửa
        </Button>
      </div>

      <form method="post" className="mt-10 w-full">
        <FieldGroup>
          <div className="flex flex-col gap-3 md:flex-row">
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Họ</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nhập họ của bạn"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isDisabledField}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-sm" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Tên</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nhập tên của bạn"
                    autoComplete="off"
                    className="text-sm"
                    disabled={isDisabledField}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-sm" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nhập email của bạn"
                  autoComplete="off"
                  className="text-sm"
                  disabled={isDisabledField}
                />
                {fieldState.invalid && (
                  <FieldError className="text-sm" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Bio</FieldLabel>
                <Textarea
                  {...field}
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="text-sm"
                  disabled={isDisabledField}
                />
                {fieldState.invalid && (
                  <FieldError className="text-sm" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <div className={cn('mt-5 flex w-full justify-between', !isEditing ? 'hidden' : '')}>
        <Button
          className="bg-blue-200"
          disabled={!isChanged || isPending}
          onClick={handleUpdateUserInformation}
        >
          {isPending && <Spinner />}
          Lưu thay đổi
        </Button>
        <Button variant={'outline'} onClick={() => setIsEditing(false)}>
          Hủy
        </Button>
      </div>
    </div>
  )
}
