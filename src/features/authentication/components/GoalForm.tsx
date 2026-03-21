import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Controller } from 'react-hook-form'
import { cn } from '@/lib/utils'

const SCORE_GOALS = [
  { value: 450, label: '450+', desc: 'Cơ bản' },
  { value: 600, label: '600+', desc: 'Trung bình' },
  { value: 750, label: '750+', desc: 'Khá' },
  { value: 900, label: '900+', desc: 'Xuất sắc' },
]

const WORD_GOALS = [
  { value: 5, label: '5 từ' },
  { value: 10, label: '10 từ' },
  { value: 20, label: '20 từ' },
  { value: 30, label: '30 từ' },
]

export default function GoalForm({ control }: any) {
  return (
    <FieldGroup>
      <Controller
        name="targetScore"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Mục tiêu điểm TOEIC</FieldLabel>

            <div className="flex gap-2">
              {SCORE_GOALS.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => field.onChange(goal.value)}
                  className={cn(
                    'flex flex-1 flex-col items-center rounded-lg border px-3 py-2.5 transition-all',
                    field.value === goal.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  )}
                >
                  <span className="text-sm font-semibold">{goal.label}</span>
                  <span className="text-xs opacity-70">{goal.desc}</span>
                </button>
              ))}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="wordsPerDay"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Số từ vựng học mỗi ngày</FieldLabel>

            <div className="flex gap-2">
              {WORD_GOALS.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => field.onChange(goal.value)}
                  className={cn(
                    'flex flex-1 items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                    field.value === goal.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  )}
                >
                  {goal.label}
                </button>
              ))}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
