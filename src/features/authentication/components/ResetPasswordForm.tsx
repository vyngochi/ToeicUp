import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema } from '../schemas/authSchema'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useResetPassword } from '@/hooks/auth/useResetPass'
import { useLocation } from 'react-router-dom'

export default function ResetPasswordForm() {
  const { mutate: reset, isPending } = useResetPassword()
  const location = useLocation()
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  })

  const onSubmit = () => {
    const token = new URLSearchParams(location.search).get('token') ?? ''

    reset({
      token: token,
      newPassword: form.getValues().password,
      confirmPassword: form.getValues().confirm,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-center text-lg font-semibold tracking-tight first:mt-0 md:text-3xl">
          Quên mật khẩu
        </h2>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="form-rhf-demo-title">
                    Mật khẩu
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nhập mật khẩu mới"
                    autoComplete="off"
                    className="text-xs"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="form-rhf-demo-title">
                    Xác nhận mật khẩu
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nhập lại mật khẩu mới"
                    autoComplete="off"
                    className="text-xs"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Field orientation="vertical">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="h-10 rounded-3xl"
            disabled={isPending}
          >
            <Spinner data-icon="inline-start" className={cn(isPending ? '' : 'hidden')} />
            Đổi mật khẩu
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
