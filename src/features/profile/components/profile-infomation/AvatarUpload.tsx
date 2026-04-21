import { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Crop, X } from 'lucide-react'
import Cropper, { type Area } from 'react-easy-crop'
import { Slider } from '@/components/ui/slider'
import { getCroppedImage } from '@/utils/cropImage'
import { useUploadAvatar } from '@/hooks/user/useUploadAvatar'
import { Spinner } from '@/components/ui/spinner'

export default function UploadDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}) {
  const { mutate: uploadAvatar, isPending } = useUploadAvatar()
  const [isCrop, setIsCrop] = useState(false)
  const [image, setImage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = (crop: any) => setCrop(crop)
  const onZoomChange = (zoom: number) => setZoom(zoom)

  const onCropCompleteInternal = useCallback((_: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setImage(URL.createObjectURL(file))
    }
  }

  const handleUploadImage = async () => {
    const reader = new FileReader()

    const croppedImageBlob = await getCroppedImage(image, croppedAreaPixels)

    if (croppedImageBlob) {
      reader.readAsDataURL(croppedImageBlob)
    } else {
      const response = await fetch(image)
      const img = await response.blob()
      reader.readAsDataURL(img)
    }

    reader.onloadend = () => {
      const base64String = reader.result as string
      uploadAvatar({ avatarUrl: base64String }, { onSuccess: () => setIsOpen(false) })
    }
  }

  const onDeleteFile = () => {
    setFile(null)
    setImage('')
    setCroppedAreaPixels(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload ảnh</DialogTitle>
        </DialogHeader>

        {!file && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-gray-400">
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={onSelectFile}
            />

            <label htmlFor="upload" className="flex cursor-pointer flex-col items-center gap-2">
              <span className="text-sm text-gray-500">Kéo thả hoặc click để chọn ảnh</span>
            </label>
          </div>
        )}

        {file && !isCrop && (
          <div className="flex justify-center">
            <div className="flex flex-col gap-5">
              <div className="relative mt-4 w-fit">
                <Button
                  size={'icon-xs'}
                  className="absolute top-2 -right-2 z-10 h-6 w-6 rounded-full border-amber-700"
                  onClick={onDeleteFile}
                  variant={'destructive'}
                >
                  <X />
                </Button>
                <img src={image} className="relative mt-4 max-h-40 rounded border-2 object-cover" />
              </div>
              <Button variant="outline" onClick={() => setIsCrop(true)}>
                <Crop /> Điều chỉnh
              </Button>
            </div>
          </div>
        )}

        {file && isCrop && (
          <>
            <div className="relative h-75 w-full">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropCompleteInternal}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">-</span>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
              />
              <span className="text-sm">+</span>
            </div>
          </>
        )}

        <Button className="mt-4" disabled={!file || isPending} onClick={handleUploadImage}>
          {isPending && <Spinner />}
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  )
}
