import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'

export default function SecurityForm({ control }: any) {
  return (
    <FieldGroup>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Mật khẩu</FieldLabel>
            <Input
              {...field}
              id="form-rhf-demo-title"
              aria-invalid={fieldState.invalid}
              placeholder="Nhập mật khẩu"
              autoComplete="off"
            />
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
            <Input
              {...field}
              id="form-rhf-demo-title"
              aria-invalid={fieldState.invalid}
              placeholder="Xác nhận mật khẩu"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
