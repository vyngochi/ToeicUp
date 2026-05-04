import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface InputInlineProps {
  onSearch: (v: string) => void
}
export function InputInline({ onSearch }: InputInlineProps) {
  const [text, setText] = useState('')
  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Tìm kiếm bộ từ vựng"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(text)}
      />
      <Button onClick={() => onSearch(text)}>Tìm kiếm</Button>
    </Field>
  )
}
