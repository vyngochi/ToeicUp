import { Button } from '@/components/ui/button'
import DisconnectedImage from '/no-internet.gif'
export default function ServerConnectionFailed({ refetch }: { refetch: () => void }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-items-center gap-10">
        <img
          className="mb-10 rounded-3xl border"
          src={DisconnectedImage}
          alt="Server disconnected"
          width={200}
          height={200}
        />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Xin lỗi bạn, TOEIC Up kết nối đến Server thất bại 🥹, bạn thử lại sau ít phút nhé
        </h4>
        <Button onClick={refetch} size={'lg'}>
          Thử lại
        </Button>
      </div>
    </div>
  )
}
