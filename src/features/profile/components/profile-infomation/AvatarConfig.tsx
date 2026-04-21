import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarDialog } from './AvatarDialog'
import { UserRoundPen } from 'lucide-react'
import type { UserResponse } from '@/types/user.types'
import { useState } from 'react'
import UploadDialog from './AvatarUpload'

interface AvatarConfigProps {
  user: UserResponse | null
}

export default function AvatarConfig({ user }: AvatarConfigProps) {
  const [isOpenAvatarDialog, setIsOpenAvatarDialog] = useState(false)
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false)
  const [zoom, setZoom] = useState(1)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()

    const zoomStep = 0.1

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + zoomStep, 3))
    } else {
      setZoom((prev) => Math.max(prev - zoomStep, 1))
    }
  }

  return (
    <>
      <Avatar className="h-15 w-15 md:h-25 md:w-25 xl:h-40 xl:w-40">
        <AvatarImage
          src={user?.AvatarUrl ?? 'https://github.com/shadcn.png'}
          className="object-cover"
        />
        <AvatarFallback>
          <span>TOEIC UP</span>
        </AvatarFallback>
      </Avatar>

      <AvatarDialog
        isOpenAvatarDialog={isOpenAvatarDialog}
        setIsOpenAvatarDialog={setIsOpenAvatarDialog}
        setIsOpenAvatar={setIsOpenAvatar}
        setIsOpenUploadDialog={setIsOpenUploadDialog}
      >
        <button
          onClick={() => setIsOpenAvatarDialog(!isOpenAvatarDialog)}
          className="absolute right-0 bottom-0 rounded-full bg-white p-1 shadow-md transition hover:scale-105 dark:bg-gray-800"
        >
          <UserRoundPen className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </AvatarDialog>

      {isOpenUploadDialog && (
        <UploadDialog isOpen={isOpenUploadDialog} setIsOpen={setIsOpenUploadDialog} />
      )}

      {isOpenAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={() => setIsOpenAvatar(false)}
            className="absolute top-5 right-5 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
          >
            ✕
          </button>

          <div
            className="flex h-screen w-screen items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            <img
              src={user?.AvatarUrl ?? 'https://github.com/shadcn.png'}
              className="max-h-[20vh] max-w-[20vw] cursor-grab rounded-3xl border-2 object-contain select-none active:cursor-grabbing"
              draggable={false}
              style={{
                transform: `scale(${zoom})`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
