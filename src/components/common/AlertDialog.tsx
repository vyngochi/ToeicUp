import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AlertModalProps {
  children?: React.ReactNode
  title: string
  description: string
  action: { closeButtonName?: string; buttonName: string; handleAction: () => void }
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AlertModal({
  children,
  description,
  title,
  action,
  open,
  onOpenChange,
}: AlertModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{action.closeButtonName || 'Đóng'}</AlertDialogCancel>
          <AlertDialogAction onClick={action.handleAction}>{action.buttonName}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
