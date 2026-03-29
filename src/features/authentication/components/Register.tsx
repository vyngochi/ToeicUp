import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { StepCircle } from '@/components/common/StepCircle'
import { StepLine } from '@/components/common/StepLine'
import AccountForm from './AccountForm'
import SecurityForm from './SecurityForm'
import { Fragment, useEffect, useState } from 'react'
import { registerSchema } from '../schemas/authSchema'
import { cn } from '@/lib/utils'
import GoalForm from './GoalForm'
import { decrypt, encrypt } from '@/utils/encryptStorageData'
import { getStorage, setStorage } from '@/utils/sessionHelper'
import { STEP_KEY, TEMPORARY_MAIL_KEY } from '@/lib/env'
import { STEP_FIELDS, STEPS } from '../data/registerData'
import { GoogleLogin } from '@react-oauth/google'
import { useLoginWithGoogle } from '@/hooks/auth/useLogin'
import styled from 'styled-components'
import { Spinner } from '@/components/ui/spinner'
import { useRegister } from '@/hooks/auth/useRegister'

export default function Register() {
  const { handleSuccess, isPending: signUpGGPending } = useLoginWithGoogle()

  const [step, setStep] = useState(() => {
    const saved = getStorage(STEP_KEY)
    return saved ? Number(saved) : 1
  })

  const { mutate: register, isPending } = useRegister({ setStep })

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
      targetScore: 450,
      wordsPerDay: 5,
    },
  })

  useEffect(() => {
    const saved = getStorage()

    if (!saved) return

    try {
      const decrypted = decrypt(saved)

      if (decrypted) {
        form.reset({
          ...decrypted,
          password: '',
          confirm: '',
        })
      }
    } catch (err) {
      console.error('Decrypt failed', err)
    }
  }, [])

  useEffect(() => {
    const subscription = form.watch((value) => {
      const { password, confirm, ...safeData } = value

      const encrypted = encrypt(safeData)

      setStorage(encrypted)
    })

    return () => subscription.unsubscribe()
  }, [form])

  useEffect(() => {
    setStorage(JSON.stringify(step), STEP_KEY)
  }, [step])

  const handleNext = async () => {
    const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS]
    const isValid = await form.trigger(fields as any)

    if (!isValid) return

    if (step < STEPS.length) {
      setStep(step + 1)
    }
  }

  function onSubmit() {
    setStorage(form.getValues().email, TEMPORARY_MAIL_KEY)
    register({
      ...form.getValues(),
      confirmPassword: form.getValues().confirm,
      fullName: form.getValues().firstName + form.getValues().lastName,
    })
  }

  const handleSignUpWithGG = (credentialResponse: any) => {
    handleSuccess(credentialResponse)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
          Đăng ký tài khoản
        </h2>
      </CardHeader>
      <div className="flex items-center justify-center">
        <div className="flex w-[80%]">
          {STEPS.map((s, index) => (
            <Fragment key={s.id}>
              <StepCircle
                step={s.id}
                isActive={step === s.id}
                isCompleted={step > s.id}
                title={s.title}
                className="h-6 w-6"
              />
              {index < STEPS.length - 1 && <StepLine className="mt-3" isCompleted={step > s.id} />}
            </Fragment>
          ))}
        </div>
      </div>

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <AccountForm control={form.control} />}
          {step === 2 && <SecurityForm control={form.control} />}
          {step === 3 && <GoalForm control={form.control} />}
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Field orientation="vertical">
          <div
            className={cn('gap-2', step === 1 ? 'justify-end' : 'grid grid-cols-2 justify-between')}
          >
            {step > 1 && (
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep(step - 1)}
                className="h-10 rounded-3xl"
              >
                Trở lại
              </Button>
            )}

            <Button
              type="button"
              className={cn('h-10 rounded-3xl', step === 1 && 'w-full')}
              onClick={step === STEPS.length ? form.handleSubmit(onSubmit) : handleNext}
              disabled={isPending}
            >
              {isPending && <Spinner />}
              {step === 3 ? 'Hoàn tất' : 'Tiếp theo'}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-400 italic">Hoặc</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <GGButtonStyle>
            {signUpGGPending ? (
              <Button>
                <Spinner />
                Đang đăng ký ...
              </Button>
            ) : (
              <GoogleLogin
                onSuccess={handleSignUpWithGG}
                onError={() => toast.error('Lỗi khi đăng ký với Google')}
                theme="outline"
                text="signup_with"
                shape="pill"
                width={400}
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

  span {
    font-family: 'Montserrat', sans-serif !important;
  }
`
