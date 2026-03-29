import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { forgotPasswordSchema } from '../schemas/authSchema'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useSendMailForgot } from '@/hooks/auth/useForgotPass'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCountdown } from '@/hooks/auth/useCountDown'
import type { MailCount } from '@/types/auth.types'
import { dateDiff } from '@/utils/dateDiffHelper'
import { AUTH_MESSAGE } from '@/messages/auth.message'

const MAIL_COUNT_KEY = 'mail-count'

export default function ForgotPasswordForm() {
  const [count, setCount] = useState<MailCount>(() => {
    const saved = sessionStorage.getItem(MAIL_COUNT_KEY)
    if (!saved) return { newCount: 0, sendDate: null }
    try {
      const value = JSON.parse(saved)
      return { newCount: value.newCount, sendDate: value.sendDate }
    } catch {
      return { newCount: 0, sendDate: null }
    }
  })

  const { timeLeft, start, isRunning } = useCountdown(40)

  const { mutate: sendMail, isPending, isSuccess } = useSendMailForgot()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = () => {
    const waitTime = dateDiff(count?.sendDate ?? '', 'm')
    if (count?.newCount > 2 && waitTime < 5) {
      toast.info(AUTH_MESSAGE.FORGOT.TOO_MUCH_EMAIL)
    } else {
      sendMail(
        { email: form.getValues().email },
        {
          onSuccess: () => {
            start()
            setCount((prev) => {
              const newCount: MailCount = {
                newCount: prev?.newCount + 1,
                sendDate: new Date().toString(),
              }
              sessionStorage.setItem(MAIL_COUNT_KEY, JSON.stringify(newCount))
              return newCount
            })
          },
        },
      )
    }
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs" htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nhập email của bạn"
                      autoComplete="off"
                      className="text-xs"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        disabled={isRunning}
                        variant={'default'}
                        size={'xs'}
                        className={cn(count?.newCount > 0 ? '' : 'hidden', 'text-xs')}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        Gửi lại <span className={cn(!isRunning ? 'hidden' : '')}>{timeLeft}s</span>
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
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Field orientation="vertical">
          {isSuccess || count?.newCount > 0 ? (
            <p className="leading-7 not-first:mt-6">
              Your reset email is sent to your email.
              <br /> Please check Mail App to reset new password
            </p>
          ) : (
            <Button
              type="submit"
              form="form-rhf-demo"
              className="h-10 rounded-3xl"
              disabled={isPending}
            >
              <Spinner data-icon="inline-start" className={cn(isPending ? '' : 'hidden')} />
              Nhận email xác thực
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}
