import { cn } from '@/lib/utils'

interface StepLineProps {
  isCompleted: boolean
  className?: string | undefined
}

export function StepLine({ isCompleted, className }: StepLineProps) {
  return (
    <div className={cn('relative mx-2 h-0.5 flex-1 bg-gray-200', className)}>
      {/* Fill animation khi completed */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 bg-blue-600 transition-all duration-700',
          isCompleted ? 'w-full' : 'w-0',
        )}
      />
    </div>
  )
}
