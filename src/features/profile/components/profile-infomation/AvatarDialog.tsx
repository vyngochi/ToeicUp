import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function AvatarDialog({
  children,
  setIsOpenAvatar,
  setIsOpenAvatarDialog,
  isOpenAvatarDialog,
  setIsOpenUploadDialog,
}: {
  children: React.ReactNode
  setIsOpenAvatar: (v: boolean) => void
  setIsOpenAvatarDialog: (v: boolean) => void
  setIsOpenUploadDialog: (v: boolean) => void
  isOpenAvatarDialog: boolean
}) {
  const handleOpenAvatar = () => {
    setIsOpenAvatar(true)
    setIsOpenAvatarDialog(false)
  }

  const handleOpenUploadDialog = () => {
    setIsOpenUploadDialog(true)
    setIsOpenAvatarDialog(false)
  }
  return (
    <Dialog open={isOpenAvatarDialog} onOpenChange={setIsOpenAvatarDialog}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-bold">Tùy chỉnh Avatar</DialogTitle>
            <DialogDescription>Xem avatar hoặc upload ảnh mới</DialogDescription>
          </DialogHeader>
          <Button variant={'secondary'} onClick={handleOpenAvatar}>
            Xem ảnh đại diện
          </Button>
          <Button onClick={handleOpenUploadDialog}>Thay đổi ảnh đại diện</Button>
        </DialogContent>
      </form>
    </Dialog>
  )
}
