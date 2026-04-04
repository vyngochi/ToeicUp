import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export default function SecurityForm({ control }: any) {
  const [isPassword, setIsPassword] = useState(true)
  const [isConfirm, setIsConfirm] = useState(true)
  return (
    <FieldGroup>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Mật khẩu</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Nhập mật khẩu"
                autoComplete="off"
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="confirm"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Xác nhận mật khẩu</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Nhập lại mật khẩu mới"
                autoComplete="off"
                type={isConfirm ? 'password' : 'text'}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="confirm"
                  title="confirm"
                  size="icon-xs"
                  onClick={() => setIsConfirm((prev) => !prev)}
                >
                  {isConfirm ? <EyeOffIcon /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
