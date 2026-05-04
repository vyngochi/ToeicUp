import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useSetPasswordMe } from '@/hooks/auth/useSetPasswordMe'
import { changePasswordSchema } from '../../schemas/ChangePasswordMeSchema'
import { Spinner } from '@/components/ui/spinner'

export default function ChangePassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const { mutate: setPassMe, isPending } = useSetPasswordMe()

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const handleSetPasswordMe = (values: z.infer<typeof changePasswordSchema>) => {
    setPassMe(values)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="change-pass-form" onSubmit={form.handleSubmit(handleSetPasswordMe)}>
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-password">Mật khẩu mới</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="new-password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu mới"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Toggle password visibility"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                      >
                        {isPasswordVisible ? <EyeOffIcon /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">Xác nhận mật khẩu</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="confirm-password"
                      type={isConfirmVisible ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu mới"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="Toggle confirm password visibility"
                        onClick={() => setIsConfirmVisible((prev) => !prev)}
                      >
                        {isConfirmVisible ? <EyeOffIcon /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="change-pass-form"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending && <Spinner />}
          Đổi mật khẩu
        </Button>
      </CardFooter>
    </Card>
  )
}
