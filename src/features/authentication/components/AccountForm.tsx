import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'

export default function AccountForm({ control }: any) {
  return (
    <FieldGroup>
      <div className="flex gap-5">
        <Controller
          name="lastName"
          control={control}
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
              />
              {fieldState.invalid && <FieldError className="text-sm" errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="firstName"
          control={control}
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
              />
              {fieldState.invalid && <FieldError className="text-sm" errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
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
            />
            {fieldState.invalid && <FieldError className="text-sm" errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
