import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import GoalForm from './GoalForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { setTargetSchema } from '../schemas/authSchema'
import { useSetTarget } from '@/hooks/user/useSetTarget'
import { Spinner } from '@/components/ui/spinner'
import { useQueryClient } from '@tanstack/react-query'

interface TargetDialogProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (v: boolean) => void
}

export function TargetDialog({ children, isOpen, onOpenChange }: TargetDialogProps) {
  const { mutate: setTarget, isPending } = useSetTarget()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof setTargetSchema>>({
    resolver: zodResolver(setTargetSchema),
    mode: 'onTouched',
    defaultValues: {
      targetScore: 450,
      wordsPerDay: 5,
    },
  })

  const onSetTarget = () => {
    setTarget(form.getValues(), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth', 'refresh'] })
        onOpenChange(true)
      },
    })
  }

  return (
    <Dialog open={!isOpen} onOpenChange={onOpenChange}>
      {children}
      <form>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Chào mừng bạn đến với TOEIC Up</DialogTitle>
            <DialogDescription>
              Chọn mục tiêu điểm và số từ vựng cần học mỗi ngày bạn nhé
            </DialogDescription>
          </DialogHeader>
          <GoalForm control={form.control} />
          <DialogFooter>
            <Button disabled={isPending} onClick={onSetTarget}>
              {isPending && <Spinner />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
