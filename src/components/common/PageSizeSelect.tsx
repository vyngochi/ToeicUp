import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  placeholder: string
  title?: string
  values: number[]
  onSelect: (v: string) => void
}
export function SelectPageSize({ placeholder, title, values, onSelect }: Props) {
  return (
    <Select defaultValue={values[0].toString()} onValueChange={onSelect}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {values.map((item, idx) => (
            <SelectItem key={idx} value={item.toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
