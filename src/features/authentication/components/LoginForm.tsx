import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { getStorage, setStorage } from '@/utils/sessionHelper'
import { loginSchema } from '../schemas/authSchema'
import { TEMPORARY_MAIL_KEY } from '@/lib/env'
import { useLogin, useLoginWithGoogle } from '@/hooks/auth/useLogin'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { GoogleLogin } from '@react-oauth/google'
import styled from 'styled-components'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOffIcon } from 'lucide-react'

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin()
  const [isPassword, setIsPassword] = useState(true)
  const { handleSuccess, isPending: loginGGPending } = useLoginWithGoogle()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const email = getStorage(TEMPORARY_MAIL_KEY)
    if (!email) return
    form.reset({ email: email })
  }, [])

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.email) {
        setStorage(value.email, TEMPORARY_MAIL_KEY)
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = () => {
    login({ email: form.getValues().email, password: form.getValues().password })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-center text-lg font-semibold tracking-tight first:mt-0 md:text-3xl">
          Chào mừng bạn trở lại
        </h2>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nhập email của bạn"
                    autoComplete="off"
                    className="text-xs"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="form-rhf-demo-title">
                    Mật khẩu
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nhập mật khẩu của bạn"
                      autoComplete="off"
                      className="text-xs"
                      type={isPassword ? 'password' : 'text'}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label="password"
                        title="password"
                        size="icon-xs"
                        onClick={() => setIsPassword((prev) => !prev)}
                      >
                        {isPassword ? <EyeOffIcon /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="mt-3">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <FieldLabel className="text-xs" htmlFor="terms-checkbox-basic">
                Ghi nhớ đăng nhập
              </FieldLabel>
            </Field>
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
            Đăng nhập
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-600 italic">Hoặc</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <GGButtonStyle>
            {loginGGPending ? (
              <Button>
                <Spinner />
                Đang đăng nhập ...
              </Button>
            ) : (
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => toast.error('Lỗi khi đăng nhập với Google')}
                theme="outline"
                text="signin_with"
                shape="pill"
                // width={400}
              />
            )}
          </GGButtonStyle>
        </Field>
      </CardFooter>
    </Card>
  )
}

const GGButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }

  span {
    font-family: 'Montserrat', sans-serif !important;
  }
`
