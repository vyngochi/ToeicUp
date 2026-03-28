type TimeUnit = 's' | 'm' | 'h'

export function dateDiff(pastDate: string | Date, unit: TimeUnit = 's'): number {
  const diff = Date.now() - new Date(pastDate).getTime()

  switch (unit) {
    case 's':
      return Math.floor(diff / 1000)
    case 'm':
      return Math.floor(diff / 1000 / 60)
    case 'h':
      return Math.floor(diff / 1000 / 60 / 60)
  }
}
