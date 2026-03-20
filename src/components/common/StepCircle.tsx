import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepCircleProps {
  step: number
  isCompleted: boolean
  isActive: boolean
}

export function StepCircle({ step, isCompleted, isActive }: StepCircleProps) {
  return (
    <div
      className={cn(
        // Base
        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500',
        // Completed
        isCompleted && 'border-blue-600 bg-blue-600 text-white',
        // Active
        isActive && !isCompleted && 'border-blue-600 bg-white text-blue-600',
        // Inactive
        !isCompleted && !isActive && 'border-gray-300 bg-white text-gray-400',
      )}
    >
      {isCompleted ? (
        <Check className="h-5 w-5" />
      ) : (
        <span className="text-sm font-medium">{step}</span>
      )}
    </div>
  )
}
