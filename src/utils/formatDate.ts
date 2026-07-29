export const formatDate = (date: Date | string | number, format: string = 'DD/MM/YYYY'): string => {
  const d = new Date(date)

  if (isNaN(d.getTime())) return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  const map: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched])
}
